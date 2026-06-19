'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { InfoUser } from '@/interface/user.interface';
import { Template1 } from './Template1';
import { Template2 } from './Template2';
import { useAuth } from '@/hooks/useAuth';
import { applyPageBreaks } from './cvUtils';

export default function CVBuilderPage() {
  const router = useRouter();
  const [selectedLayout, setSelectedLayout] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const { isLogin, infoUser } = useAuth();

  // ───────────────────────────────────────────────
  // Tạo tên file an toàn từ họ và tên người dùng
  // ───────────────────────────────────────────────
  const getSafeFileName = () => {
    const name = (infoUser?.username || 'user').trim();
    // Giữ tiếng Việt, chỉ thay khoảng trắng bằng dấu gạch ngang
    return `${name.replace(/\s+/g, '-')}-cv`;
  };

  // ───────────────────────────────────────────────
  // Core: chụp Template → PNG/JPEG → PDF blob
  // mode: 'download' = chất lượng cao (pixelRatio 2)
  //       'upload'   = nén nhỏ (pixelRatio 1.2, JPEG 75%) để vừa giới hạn Cloudinary 10MB
  // ───────────────────────────────────────────────
  const generatePdfBlob = async (mode: 'download' | 'upload' = 'download'): Promise<Blob | null> => {
    const el = printAreaRef.current;
    if (!el) return null;

    // Đảm bảo element sẵn sàng và nằm trong viewport (dù bị z-index che)
    await document.fonts.ready;
    await new Promise((r) => setTimeout(r, 500));

    try {
      const { toPng, toJpeg } = await import('html-to-image');
      const { default: jsPDF } = await import('jspdf');

      // Áp dụng auto-pagination (đẩy element xuống nếu bị cắt ngang trang)
      applyPageBreaks(el);

      // Tạm thời hiển thị rõ để chụp
      const prevOpacity = el.style.opacity;
      el.style.opacity = '1';

      // Capture options
      const options = {
        cacheBust: true,
        useCORS: true, // Quan trọng để load ảnh avatar từ Cloudinary
        style: {
          opacity: '1',
          transform: 'none',
        }
      };

      // Gọi lần 1 để preload font/images vào canvas
      await toPng(el, { ...options, pixelRatio: 1 }).catch(() => {});
      await new Promise((r) => setTimeout(r, 200));

      let dataUrl: string;
      let imgFormat = 'JPEG';
      if (mode === 'upload') {
        dataUrl = await toJpeg(el, { ...options, quality: 0.75, pixelRatio: 1.2 });
      } else {
        // Sử dụng JPEG thay vì PNG cho bản tải xuống để tránh dung lượng quá lớn (>10MB)
        dataUrl = await toJpeg(el, { ...options, quality: 0.85, pixelRatio: 2 });
      }

      // Restore opacity
      el.style.opacity = prevOpacity;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;
      await new Promise((r) => {
        img.onload = r;
        img.onerror = r; // Tránh treo nếu lỗi
      });

      if (img.width === 0 || img.height === 0) {
        throw new Error('Ảnh capture bị rỗng.');
      }

      const totalHeightMm = (img.height / img.width) * pageW;

      if (totalHeightMm <= pageH * 2) {
        // Nếu nội dung không dài quá 2 trang, nén lại hiển thị trong đúng 1 trang duy nhất
        pdf.addImage(dataUrl, imgFormat, 0, 0, pageW, pageH);
      } else {
        // Nếu dài hơn 2 trang, tự động chia thành nhiều trang
        let offsetY = 0;
        let pageIdx = 0;
        while (offsetY < totalHeightMm) {
          if (pageIdx > 0) pdf.addPage();
          pdf.addImage(dataUrl, imgFormat, 0, -offsetY, pageW, totalHeightMm);
          offsetY += pageH;
          pageIdx++;
        }
      }

      return pdf.output('blob');
    } catch (error) {
      console.error('Lỗi generatePdfBlob:', error);
      throw error;
    }
  };



  // ───────────────────────────────────────────────
  // Nút ⬇: Tải CV về máy
  // ───────────────────────────────────────────────
  const handleDownloadCV = async () => {
    if (!infoUser) return;
    setIsDownloading(true);
    const toastId = toast.loading('Đang tạo file PDF...');
    try {
      // 'download' = chất lượng cao, không giới hạn kích thước
      const blob = await generatePdfBlob('download');
      if (!blob) throw new Error('Không thể tạo PDF');

      const fileName = getSafeFileName();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`Đã tải ${fileName}.pdf!`, { id: toastId });
    } catch (err: any) {
      console.error(err);
      toast.error('Lỗi xuất PDF: ' + err.message, { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  // ───────────────────────────────────────────────
  // Nút "Dùng mẫu CV": Tạo PDF → upload Cloudinary
  // ───────────────────────────────────────────────
  const handleUseCV = async () => {
    if (!infoUser) return;
    setIsSaving(true);
    const toastId = toast.loading('Đang tạo và lưu CV...');
    try {
      // 'upload' = nén JPEG pixelRatio 1.2 → ~2-4MB, vừa giới hạn 10MB của Cloudinary
      const blob = await generatePdfBlob('upload');
      if (!blob) throw new Error('Không thể tạo PDF');

      // Chuyển blob → base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const fileName = getSafeFileName();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/save-cv-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64Pdf: base64, fileName }),
        credentials: 'include',
      });

      const text = await res.text();
      if (!text) throw new Error('Server không phản hồi');
      const data = JSON.parse(text);

      if (data.code === 'success') {
        toast.success('Đã lưu CV lên hệ thống thành công!', { id: toastId });
        setIsModalOpen(false);
      } else {
        throw new Error(data.message || 'Lỗi khi lưu CV');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Có lỗi xảy ra', { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLogin === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white text-lg">
        Đang tải thông tin...
      </div>
    );
  }

  if (!infoUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white text-lg">
        Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full font-sans bg-gray-900">

      {/* Header */}
      <header className="h-14 bg-[#1E2329] text-white flex items-center justify-between px-6">
        <button className="text-sm font-medium hover:text-gray-200 transition cursor-pointer" onClick={() => router.push('/user-manage/profile')}>
          &lt; Trở lại cập nhật hồ sơ
        </button>
        <div className="flex-1" />
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">

        {/* Cột trái: Chọn mẫu */}
        <div className="w-[380px] bg-[#1e2329] p-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">

            {/* Thumbnail Mẫu 1 */}
            <div onClick={() => setSelectedLayout(1)} className="cursor-pointer relative flex flex-col items-center">
              <div className={`w-full aspect-[1/1.4] bg-white overflow-hidden p-1 border-4 transition-all ${selectedLayout === 1 ? 'border-green-500' : 'border-transparent'}`}>
                <div className="scale-[0.25] origin-top-left w-[400%] h-[400%] pointer-events-none">
                  <Template1 user={infoUser} />
                </div>
              </div>
              <span className="text-gray-300 mt-2 text-sm font-medium">Mẫu Tiêu chuẩn</span>
              {selectedLayout === 1 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shadow-lg">✓</div>
              )}
            </div>

            {/* Thumbnail Mẫu 2 */}
            <div onClick={() => setSelectedLayout(2)} className="cursor-pointer relative flex flex-col items-center">
              <div className={`w-full aspect-[1/1.4] bg-white overflow-hidden p-1 border-4 transition-all ${selectedLayout === 2 ? 'border-green-500' : 'border-transparent'}`}>
                <div className="scale-[0.25] origin-top-left w-[400%] h-[400%] pointer-events-none">
                  <Template2 user={infoUser} />
                </div>
              </div>
              <span className="text-gray-300 mt-2 text-sm font-medium">Mẫu Hiện đại</span>
              {selectedLayout === 2 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shadow-lg">✓</div>
              )}
            </div>

          </div>
        </div>

        {/* Cột phải: Preview */}
        <div className="flex-1 flex flex-col bg-[#2e343c] relative">
          <div className="flex-1 overflow-y-auto flex justify-center py-10 px-4 pb-28">
            <div className="transform scale-[0.7] sm:scale-[0.85] origin-top shadow-2xl">
              {selectedLayout === 1 ? <Template1 user={infoUser} /> : <Template2 user={infoUser} />}
            </div>
          </div>

          {/* Khu vực CV ẩn — dùng cho html-to-image capture */}
          <div
            ref={printAreaRef}
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '794px',
              minHeight: '1122px',
              background: 'white',
              overflow: 'visible',
              zIndex: -9999,
              opacity: 0.01,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            {selectedLayout === 1 ? <Template1 user={infoUser} /> : <Template2 user={infoUser} />}
          </div>

          {/* Footer Toolbar */}
          <div className="absolute bottom-0 w-full bg-[#1e2329] h-16 flex items-center justify-between px-6 border-t border-gray-700 shadow-[0_-5px_15px_rgba(0,0,0,0.2)]">

            <div className="flex-1" />

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className={`p-2 rounded transition flex items-center justify-center ${isDownloading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                title="Tải CV về máy"
              >
                {isDownloading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0D8EFF] hover:bg-[#0076E5] text-white font-medium py-2 px-6 rounded transition shadow-md"
              >
                Dùng mẫu CV này
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Modal xác nhận dùng CV */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[520px] relative overflow-hidden animate-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 flex flex-col items-center text-center">
              <div className="mb-6">
                <img
                  src="https://itviec.com/assets/profile/cv-template-uses-3fd7b05ce4dc094e6eb0c6d165ba63310722eaab6a305cbadd1605dca2415dc5.svg"
                  alt="CV Illustration"
                  className="w-48 h-auto"
                />
              </div>

              <h2 className="text-[22px] font-bold text-gray-900 mb-4 leading-tight">
                Dùng CV này để nhận cơ hội việc làm mới
              </h2>

              <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                Dùng CV này trên ITviec để ứng tuyển, nhận lời mời công việc và được nhiều nhà tuyển dụng nhìn thấy hơn.
              </p>

              <div className="w-full bg-[#f0f7ff] border border-[#d1e9ff] rounded-lg py-3 px-4 flex items-center justify-center gap-2 mb-8">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0D8EFF] shrink-0">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[#0D8EFF] font-medium truncate">
                  {getSafeFileName()}.pdf
                </span>
              </div>

              <button
                onClick={handleUseCV}
                disabled={isSaving}
                className={`w-full text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2
                  ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0D8EFF] hover:bg-[#0076E5]'}`}
              >
                {isSaving && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isSaving ? 'Đang xử lý...' : 'Sử dụng CV này'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}