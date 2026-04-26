'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InfoUser } from '@/interface/user.interface';
import { Template1 } from './Template1';
import { Template2 } from './Template2';

export default function CVBuilderPage() {
  const router = useRouter();
  const [user, setUser] = useState<InfoUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLayout, setSelectedLayout] = useState(1);
  const [selectedColor, setSelectedColor] = useState('blue');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === 'success' && data.infoUser) {
          setUser(data.infoUser);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white text-lg">
        Đang tải thông tin...
      </div>
    );
  }

  if (!user) {
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
                  <Template1 user={user} />
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
                  <Template2 user={user} />
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
              {selectedLayout === 1 ? <Template1 user={user} /> : <Template2 user={user} />}
            </div>
          </div>

          {/* Footer Toolbar */}
          <div className="absolute bottom-0 w-full bg-[#1e2329] h-16 flex items-center justify-between px-6 border-t border-gray-700 shadow-[0_-5px_15px_rgba(0,0,0,0.2)]">


            <div className="flex-1" />

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition" onClick={() => window.print()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition shadow-md">
                Dùng mẫu CV này
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}