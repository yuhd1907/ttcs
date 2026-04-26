"use client";

import React, { useEffect, useState } from "react";
import { EXPERIENCE_MAP, skillLabel } from "@/config/cvLabels";

interface SkillDetail {
  skill: string;
  experience: string;
  groupId: string;
  itemIndex: number;
}

interface QuickExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  skills: any[];
  onSave: (updatedSkills: any[]) => void;
}

export const QuickExperienceModal: React.FC<QuickExperienceModalProps> = ({
  isOpen,
  onClose,
  skills,
  onSave,
}) => {
  const [localSkills, setLocalSkills] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      setLocalSkills(JSON.parse(JSON.stringify(skills)));
    }
  }, [isOpen, skills]);

  if (!isOpen) return null;

  const handleExperienceChange = (groupId: string, itemIndex: number, newExp: string) => {
    setLocalSkills((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          const newItems = [...group.items];
          newItems[itemIndex] = { ...newItems[itemIndex], experience: newExp };
          return { ...group, items: newItems };
        }
        return group;
      })
    );
  };

  const handleSave = () => {
    onSave(localSkills);
    onClose();
  };

  // Flatten hard skills for display
  const hardSkillsList: SkillDetail[] = [];
  localSkills.forEach((group) => {
    if (group.type === "hard") {
      group.items.forEach((item: any, index: number) => {
        hardSkillsList.push({
          skill: item.skill,
          experience: item.experience,
          groupId: group.id,
          itemIndex: index,
        });
      });
    }
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[800px] mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h3 className="text-[18px] font-[700] text-[#121212]">Cập nhật kinh nghiệm kỹ năng</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#757575] transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F5F5] text-[12px] font-[600] text-[#757575] uppercase tracking-wider">
                <th className="px-4 py-3 border-b border-[#E0E0E0]">KỸ NĂNG</th>
                <th className="px-4 py-3 border-b border-[#E0E0E0]">NĂM KINH NGHIỆM</th>
              </tr>
            </thead>
            <tbody>
              {hardSkillsList.length > 0 ? (
                hardSkillsList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB]">
                    <td className="px-4 py-4 border-b border-[#F0F0F0] text-[15px] font-[500] text-[#333]">
                      {skillLabel(item.skill)}
                    </td>
                    <td className="px-4 py-4 border-b border-[#F0F0F0]">
                      <div className="relative">
                        <select
                          value={item.experience}
                          onChange={(e) => handleExperienceChange(item.groupId, item.itemIndex, e.target.value)}
                          className="w-full h-[40px] border border-[#E0E0E0] rounded-[6px] px-4 text-[14px] text-[#333] outline-none focus:border-[#0D8EFF] appearance-none cursor-pointer"
                        >
                          {Object.entries(EXPERIENCE_MAP).map(([val, label]) => (
                            <option key={val} value={val}>
                              {label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-4 py-10 text-center text-gray-500">
                    Chưa có kỹ năng chính nào để cập nhật kinh nghiệm.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-4 px-6 py-4 border-t border-[#F0F0F0]">
          <button
            type="button"
            onClick={onClose}
            className="text-[14px] font-[600] text-[#444] hover:text-[#0D8EFF] transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="h-[42px] px-10 bg-[#0D8EFF] hover:bg-[#0076E5] text-white rounded-[6px] text-[14px] font-[700] transition-all cursor-pointer flex items-center justify-center"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
