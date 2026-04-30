"use client";

import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

export default function CVSection() {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      <h2 className="text-[17px] font-bold text-gray-900 mb-5">CV của bạn</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="text-gray-300">
          <FaFileAlt className="w-8 h-8" />
        </div>
        <div className="font-semibold text-gray-400 text-[15px]">
          Bạn chưa đính kèm CV nào
        </div>
      </div>

      <div className="border-t border-dashed border-gray-300 pt-6">
        <button className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors">
          <FiUpload className="w-4 h-4" />
          <span className="text-sm font-medium">Tải CV lên</span>
        </button>
        <p className="text-gray-500 text-[13px] mt-4">
          Hỗ trợ định dạng .doc, .docx hoặc .pdf, dưới 3MB và không chứa mật
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
