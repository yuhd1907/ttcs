"use client";

import React from "react";
import { CiCirclePlus } from "react-icons/ci";

interface SectionCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onAdd?: () => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  subtitle,
  icon,
  onAdd,
}) => {
  return (
    <div className="bg-white border border-[#DEDEDE] rounded-[12px] px-5 py-4 flex items-center justify-between group hover:border-[#0D8EFF] hover:shadow-sm transition-all duration-200">
      {/* Text + icon */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex-shrink-0">{icon}</div>
        <div className="min-w-0">
          <h3 className="text-[15px] font-[700] text-[#121212] leading-tight">
            {title}
          </h3>
          <p className="text-[13px] text-[#757575] mt-0.5 truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Add button - Downsized to w-7 h-7 */}
      <button
        onClick={onAdd}
        className="ml-4 flex-shrink-0 text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
        title={`Thêm ${title}`}
      >
        <CiCirclePlus className="text-[30px]" />
      </button>
    </div>
  );
};
