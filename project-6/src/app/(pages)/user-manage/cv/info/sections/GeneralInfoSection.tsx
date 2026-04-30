"use client";

import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import GeneralInfoModal, { EXPERIENCE_OPTIONS, LEVEL_OPTIONS, WORK_TYPE_OPTIONS } from "../modal/GeneralInfoModal";
import { useJobFields } from "@/hooks/useJobFields";

export default function GeneralInfoSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const { jobFields } = useJobFields();

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

  const getLabel = (options: { label: string, value: string }[], value: string) => {
    return options.find((opt) => opt.value === value)?.label || value;
  };

  const getJobFieldLabels = (ids: string[]) => {
    if (!ids || !jobFields) return [];
    return ids.map(id => {
      const field = jobFields.find(f => String(f.id) === id);
      return field ? field.name : id;
    });
  };

  const hasData = userData && Object.keys(userData).length > 0;

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
          <div className="text-gray-900 font-medium">
            {userData?.experience ? getLabel(EXPERIENCE_OPTIONS, userData.experience) : <span className="text-gray-400 font-medium">Thêm thông tin</span>}
          </div>

          <div className="text-gray-600">Cấp bậc hiện tại</div>
          <div className="text-gray-900 font-medium">
            {userData?.level ? getLabel(LEVEL_OPTIONS, userData.level) : <span className="text-gray-400 font-medium">Thêm thông tin</span>}
          </div>

          <div className="text-gray-600">
            Hình thức làm việc mong muốn
          </div>
          <div>
            {userData?.workTypes && userData.workTypes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userData.workTypes.map((type: string) => (
                  <span key={type} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[13px] font-medium">
                    {getLabel(WORK_TYPE_OPTIONS, type)}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-400 font-medium">Thêm thông tin</span>
            )}
          </div>

          <div className="text-gray-600">
            Lĩnh vực đã làm việc
          </div>
          <div>
            {userData?.jobFieldSelected && userData.jobFieldSelected.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {getJobFieldLabels(userData.jobFieldSelected).map((label: string, idx: number) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[13px] font-medium">
                    {label}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-400 font-medium">Thêm thông tin</span>
            )}
          </div>

          <div className="text-gray-600">Mức lương mong muốn</div>
          <div className="text-gray-900 font-medium">
            {userData?.desiredMin || userData?.desiredMax ? (
              `${userData.desiredMin || "0"} - ${userData.desiredMax || "0"} ${userData.desiredCurrency || "USD"}/tháng`
            ) : (
              <span className="text-gray-400 font-medium">Thêm thông tin</span>
            )}
          </div>

          <div className="text-gray-600">Mức lương hiện tại</div>
          <div className="text-gray-900 font-medium">
            {userData?.currentSalary ? (
              `${userData.currentSalary} ${userData.currentCurrency || "USD"}/tháng`
            ) : (
              <span className="text-gray-400 font-medium">Thêm thông tin</span>
            )}
          </div>
        </div>
      </div>

      <GeneralInfoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchData();
        }}
      />
    </>
  );
}
