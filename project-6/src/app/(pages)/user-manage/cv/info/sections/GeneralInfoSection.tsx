"use client";

import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import GeneralInfoModal from "../modal/GeneralInfoModal";

export default function GeneralInfoSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-300 rounded-lg p-6 relative">
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-6 right-6 text-blue-500 hover:text-blue-600 transition-colors"
        >
          <CiEdit className="w-6 h-6" />
        </button>
        <h2 className="text-[17px] font-bold text-gray-900 mb-6">
          Thông tin chung
        </h2>

        <div className="grid grid-cols-[250px_1fr] gap-y-5 text-[15px] items-center">
          <div className="text-gray-600">Tổng số năm kinh nghiệm</div>
          <div className="text-gray-400 font-medium">Thêm thông tin</div>

          <div className="text-gray-600">Cấp bậc hiện tại</div>
          <div className="text-gray-400 font-medium">Thêm thông tin</div>

          <div className="text-gray-600 self-start mt-1">
            Hình thức làm việc mong muốn
          </div>
          <div className="text-gray-400 font-medium">Thêm thông tin</div>
        </div>
      </div>

      <GeneralInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
