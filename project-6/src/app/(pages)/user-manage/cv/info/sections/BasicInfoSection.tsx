"use client";

import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { IoWarningOutline } from "react-icons/io5";
import { InfoUser } from "@/interface/user.interface";
import BasicInfoModal from "../modal/BasicInfoModal";

interface BasicInfoSectionProps {
  infoUser: InfoUser | null;
}

export default function BasicInfoSection({ infoUser }: BasicInfoSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/user");
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu từ database.json", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          Thông tin cơ bản
        </h2>

        <div className="grid grid-cols-[250px_1fr] gap-y-5 text-[15px]">
          <div className="text-gray-600">Họ và Tên</div>
          <div className="font-semibold text-gray-900">{infoUser?.username}</div>

          <div className="text-gray-600">Số điện thoại</div>
          {infoUser?.phone ? (
            <div className="font-semibold text-gray-900">{infoUser.phone}</div>
          ) : (
            <div className="flex items-center gap-2 text-[#f97316]">
              <IoWarningOutline className="w-4 h-4" />
              <span className="font-medium">Thêm thông tin</span>
            </div>
          )}

          <div className="text-gray-600">Nơi làm việc mong muốn</div>
          {(infoUser?.wantToWorkIn || infoUser?.city || userData?.wantToWorkIn) ? (
            <div className="font-semibold text-gray-900">
              {infoUser?.wantToWorkIn || infoUser?.city || userData?.wantToWorkIn}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#f97316]">
              <IoWarningOutline className="w-4 h-4" />
              <span className="font-medium">Thêm thông tin</span>
            </div>
          )}
        </div>
      </div>

      <BasicInfoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchData();
        }}
        infoUser={infoUser}
      />
    </>
  );
}
