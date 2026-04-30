'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { InfoUser } from '@/interface/user.interface';
import { Template1 } from './Template1';
import { Template2 } from './Template2';
import { useAuth } from '@/hooks/useAuth';

export default function CVBuilderPage() {
  const router = useRouter();
  const [selectedLayout, setSelectedLayout] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const { isLogin, infoUser } = useAuth();

  const handleUseCV = async () => {
    if (!infoUser) return;
    setIsSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/generate-cv-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intro: infoUser.intro,
          educations: infoUser.educations,
          experiences: infoUser.experiences,
          skills: infoUser.skills,
          languages: infoUser.languages,
          projects: infoUser.projects,
          certificates: infoUser.certificates,
          awards: infoUser.awards,
        }),
        credentials: "include",
      });

      const text = await res.text();
      if (!text) {
        toast.error("Server không phản hồi. Vui lòng thử lại.");
        return;
      }
      const data = JSON.parse(text);

      if (data.code === "success") {
        toast.success("Đã lưu và tạo PDF CV thành công!");
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Có lỗi xảy ra khi tạo PDF");
      }
    } catch (error) {
      console.error(error);
      toast.error("Không thể kết nối đến máy chủ");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadCV = async () => {
    if (!infoUser) return;
    setIsDownloading(true);
    const toastId = toast.loading("Đang yêu cầu server tạo PDF...");
    
    try {
      // Gọi API tạo PDF và lưu lên Cloudinary
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/generate-cv-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intro: infoUser.intro,
          educations: infoUser.educations,
          experiences: infoUser.experiences,
          skills: infoUser.skills,
          languages: infoUser.languages,
          projects: infoUser.projects,
          certificates: infoUser.certificates,
          awards: infoUser.awards,
        }),
        credentials: "include",
      });

      const text = await response.text();
      if (!text) throw new Error("Server không phản hồi.");
      const data = JSON.parse(text);
      if (data.code !== "success") {
        throw new Error(data.message || "Lỗi khi tạo PDF từ server");
      }

      // Nhận link PDF từ Cloudinary
      const pdfUrl = data.data;
      
      // Mở sang tab mới hoặc tải về
      window.open(pdfUrl, '_blank');

      toast.success("Tạo CV thành công!", { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Có lỗi xảy ra.", { id: toastId });
    } finally {
      setIsDownloading(false);
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[520px] relative overflow-hidden animate-in zoom-in duration-200">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 flex flex-col items-center text-center">
              {/* Illustration */}
              <div className="mb-6">
                <img
                  src="https://itviec.com/assets/profile/cv-template-uses-3fd7b05ce4dc094e6eb0c6d165ba63310722eaab6a305cbadd1605dca2415dc5.svg"
                  alt="CV Illustration"
                  className="w-48 h-auto"
                />
              </div>

              {/* Title */}
              <h2 className="text-[22px] font-bold text-gray-900 mb-4 leading-tight">
                Dùng CV này để nhận cơ hội việc làm mới
              </h2>

              {/* Description */}
              <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                Dùng CV này trên ITviec để ứng tuyển, nhận lời mời công việc và được nhiều nhà tuyển dụng nhìn thấy hơn. Xem lại và dùng CV ngay.
              </p>

              {/* File Info Box */}
              <div className="w-full bg-[#f0f7ff] border border-[#d1e9ff] rounded-lg py-3 px-4 flex items-center justify-center gap-2 mb-8">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0D8EFF]">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="text-[#0D8EFF] font-medium underline truncate">
                  {infoUser.username.trim().replace(/\s+/g, '_')}_cv.pdf
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={handleUseCV}
                disabled={isSaving}
                className={`w-full text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2
                  ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-[#0D8EFF] hover:bg-[#0076E5]"}`}
              >
                {isSaving && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isSaving ? "Đang xử lý..." : "Sử dụng CV này"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}