"use client";

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { useProvinces } from "@/hooks/useProvinces";
import { InfoUser } from "@/interface/user.interface";

interface BasicInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  infoUser: InfoUser | null;
}

export default function BasicInfoModal({
  isOpen,
  onClose,
  infoUser,
}: BasicInfoModalProps) {
  const { provinceList } = useProvinces();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    if (infoUser) {
      setFormData({
        fullName: infoUser.username || "",
        phone: infoUser.phone || "",
        city: infoUser.city || "",
      });
    }
  }, [infoUser]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    console.log("Saving Basic Info:", formData);

    try {
      const res = await fetch("http://localhost:5000/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        console.log("Đã lưu thành công vào database.json");
      } else {
        console.error("Lỗi khi lưu vào database.json");
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-200">
          <h2 className="text-[22px] font-bold text-gray-900">
            Hoàn thành thông tin cơ bản
          </h2>
        </div>

        {/* Content */}
        <div className="px-8 py-6 flex flex-col gap-5">
          {/* Note */}
          <div className="flex items-start gap-3">
            <div className="bg-[#f97316] text-white p-1 rounded flex-shrink-0 mt-0.5">
              <FaStar className="w-3 h-3" />
            </div>
            <p className="text-gray-700 text-[15px] leading-relaxed">
              <span className="font-bold text-[#f97316]">Ghi chú:</span> Hoàn
              thiện nhanh thông tin cá nhân để nhà tuyển dụng liên hệ khi có cơ
              hội phù hợp với bạn.
            </p>
          </div>

          {/* Name Input */}
          <div className="border border-gray-300 rounded-md px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <label className="block text-[12px] text-gray-500 mb-1">
              Họ và Tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full outline-none text-[15px] text-gray-900"
            />
          </div>

          {/* Phone Input */}
          <div className="border border-gray-300 rounded-md px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <label className="block text-[12px] text-gray-500 mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full outline-none text-[15px] text-gray-900"
            />
          </div>

          {/* City Select */}
          <div>
            <div className="border border-gray-300 rounded-md px-4 py-3 relative focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
              <label className="block text-[12px] text-gray-500 mb-1">
                Nơi làm việc mong muốn <span className="text-red-500">*</span>
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full outline-none text-[15px] text-gray-900 bg-transparent cursor-pointer appearance-none pr-6"
              >
                <option value=""></option>
                {provinceList?.map((province) => (
                  <option
                    key={province.id}
                    value={province.name}
                  >
                    {province.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-2.5 rounded text-[15px] font-medium transition-colors"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
