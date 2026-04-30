"use client";

import React, { useRef, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { FcViewDetails } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function CVSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
      // Logic upload file sẽ được xử lý ở đây
    }
  };

  const handleFileNameClick = () => {
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      router.push(`/user-manage/cv/preview?fileUrl=${encodeURIComponent(fileUrl)}`);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      <h2 className="text-[17px] font-bold text-gray-900 mb-5">CV của bạn</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="text-gray-300">
          {selectedFile ? (
            <FcViewDetails className="w-8 h-8" />
          ) : (
            <FaFileAlt className="w-8 h-8" />
          )}
        </div>
        <div 
          onClick={handleFileNameClick}
          className={`font-semibold text-[15px] ${
            selectedFile ? "text-black underline cursor-pointer" : "text-gray-400"
          }`}
        >
          {selectedFile ? selectedFile.name : "Bạn chưa đính kèm CV nào"}
        </div>
      </div>

      <div className="border-t border-dashed border-gray-300 pt-6">
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button 
          onClick={handleUploadClick}
          className="flex items-center gap-2 border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
        >
          <FiUpload className="w-4 h-4" />
          <span className="text-sm font-medium">Tải CV lên</span>
        </button>
        <p className="text-gray-500 text-[13px] mt-4">
          Hỗ trợ định dạng .pdf, dưới 3MB và không chứa mật
          khẩu bảo vệ
        </p>

        <div className="mt-5 flex items-center gap-2">
          <span className="text-gray-800 text-[13px] font-medium">
            Trạng thái:
          </span>
          <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide">
            Không hợp lệ
          </span>
        </div>
      </div>
    </div>
  );
}
