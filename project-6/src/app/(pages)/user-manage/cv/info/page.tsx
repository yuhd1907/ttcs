"use client";

import React from "react";
import { FaPen } from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";
import CVSection from "./sections/CVSection";
import BasicInfoSection from "./sections/BasicInfoSection";
import GeneralInfoSection from "./sections/GeneralInfoSection";
import CoverLetterSection from "./sections/CoverLetterSection";

export default function ManageCV() {
  const { infoUser } = useAuth();

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto mt-[60px] mb-[48px]">
      <h1 className="text-2xl font-bold text-gray-900">Quản lý CV</h1>

      {/* Banner */}
      <div className="flex items-center gap-3">
        <div className="bg-purple-700 text-white p-1.5 rounded flex-shrink-0 mt-0.5">
          <FaPen className="w-3.5 h-3.5" />
        </div>
        <p className="text-gray-700 text-[15px] leading-relaxed">
          <span className="font-bold text-purple-700">Bạn nên biết:</span> ITviec luôn
          gửi CV gần nhất cho nhà tuyển dụng khi bạn ứng tuyển hoặc chấp nhận
          chia sẻ CV qua Lời mời công việc.
        </p>
      </div>

      <CVSection />
      <BasicInfoSection infoUser={infoUser} />
      <GeneralInfoSection />
      <CoverLetterSection />
    </div>
  );
}
