"use client";

import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

interface SkillItem {
  skill: string;
  experience: string;
}

interface SkillGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "hard" | "soft"; // Added to determine if experience dropdown is shown
  title: string;
  tipText: string;
  defaultGroupName: string;
  initialItems?: SkillItem[];
  onSave?: (groupName: string, items: SkillItem[]) => void;
}

const MOCK_SKILLS = [
  { value: "react", label: "ReactJS" },
  { value: "node", label: "NodeJS" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "figma", label: "Figma" },
  { value: "communication", label: "Giao tiếp" },
  { value: "teamwork", label: "Làm việc nhóm" },
];

const EXPERIENCE_OPTIONS = [
  { value: "no-exp", label: "Chưa có kinh nghiệm" },
  { value: "under-1", label: "Dưới 1 năm" },
  { value: "1-3", label: "1 - 3 năm" },
  { value: "3-5", label: "3 - 5 năm" },
  { value: "over-5", label: "Trên 5 năm" },
];

const MAX_SKILLS = 20;

const getLabelByValue = (
  options: { value: string; label: string }[],
  value: string
) => options.find((o) => o.value === value)?.label || value;

export const SkillGroupModal: React.FC<SkillGroupModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  tipText,
  defaultGroupName,
  initialItems = [],
  onSave,
}) => {
  const [groupName, setGroupName] = useState(defaultGroupName);
  const [items, setItems] = useState<SkillItem[]>(initialItems);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedExp, setSelectedExp] = useState("");

  useEffect(() => {
    if (isOpen) {
      setGroupName(defaultGroupName);
      setItems(initialItems);
      setSelectedSkill("");
      setSelectedExp("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, defaultGroupName]);

  if (!isOpen) return null;

  const handleAdd = () => {
    // If hard skill, require experience. If soft skill, experience is not required.
    if (!selectedSkill) return;
    if (type === "hard" && !selectedExp) return;
    if (items.length >= MAX_SKILLS) return;
    
    // Prevent duplicate
    if (items.some((item) => item.skill === selectedSkill)) return;

    setItems((prev) => [
      ...prev,
      { skill: selectedSkill, experience: type === "hard" ? selectedExp : "" },
    ]);
    setSelectedSkill("");
    setSelectedExp("");
  };

  const handleRemove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(groupName, items);
    }
    onClose();
  };

  const availableSkills = MOCK_SKILLS.filter(
    (opt) => !items.some((item) => item.skill === opt.value)
  );

  const canSave = groupName.trim() !== "" && items.length > 0;

  const selectClasses =
    "w-full h-[46px] border border-[#E0E0E0] rounded-[8px] px-4 text-[14px] text-[#444] outline-none transition-colors bg-white appearance-none cursor-pointer focus:border-[#0D8EFF]";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[800px] mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h3 className="text-[18px] font-[700] text-[#121212]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#757575] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
          
          {/* Tip Box */}
          <div className="flex items-start gap-1.5 mb-5">
            <div className="w-[18px] h-[18px] bg-[#FF9800] rounded-[4px] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M12 18V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[14px] text-[#444] leading-relaxed">
              <span className="font-[600] text-[#FF9800]">Tips:</span> {tipText}
            </p>
          </div>

          {/* Tên nhóm */}
          <div className="mb-6">
            <p className="text-[14px] font-[600] text-[#121212] mb-2">
              Tên nhóm <span className="text-[#E53935]">*</span>
            </p>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Tên nhóm *"
              className="w-full h-[46px] border border-[#E0E0E0] rounded-[8px] px-4 text-[14px] outline-none transition-colors placeholder:text-[#999] focus:border-[#0D8EFF]"
            />
          </div>

          {/* Danh sách kỹ năng */}
          <div>
            <p className="text-[14px] font-[700] text-[#121212] mb-3">
              Danh sách kỹ năng ({items.length}/{MAX_SKILLS})
            </p>

            <div className="flex items-center gap-3 mb-5">
              {/* Skill dropdown */}
              <div className="flex-1 relative">
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className={selectClasses}
                  disabled={items.length >= MAX_SKILLS}
                >
                  <option value="">Nhập kỹ năng</option>
                  {availableSkills.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Exp dropdown (Only for hard skills) */}
              {type === "hard" && (
                <div className="flex-1 relative">
                  <select
                    value={selectedExp}
                    onChange={(e) => setSelectedExp(e.target.value)}
                    className={selectClasses}
                    disabled={items.length >= MAX_SKILLS}
                  >
                    <option value="">Chọn kinh nghiệm</option>
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Add button (Red background) */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={!selectedSkill || (type === "hard" && !selectedExp) || items.length >= MAX_SKILLS}
                className={`w-[46px] h-[46px] flex-shrink-0 flex items-center justify-center rounded-[8px] text-white transition-all ${
                  (!selectedSkill || (type === "hard" && !selectedExp) || items.length >= MAX_SKILLS)
                    ? "bg-[#FFE5E5] text-[#FF9999] cursor-not-allowed"
                    : "bg-[#E53935] hover:bg-[#D32F2F] cursor-pointer"
                }`}
                style={(!selectedSkill || (type === "hard" && !selectedExp) || items.length >= MAX_SKILLS) ? {backgroundColor: '#EF9A9A'} : {}}
              >
                <CiCirclePlus className="text-[24px]" />
              </button>
            </div>

            {/* Tags area / Empty state */}
            {items.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center">
                <div className="w-[80px] h-[80px] mb-3 opacity-50 relative">
                  {/* Custom empty box icon referencing the screenshot */}
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="35" width="40" height="30" rx="4" fill="#E0E0E0" />
                    <path d="M30 35L20 25H60L50 35" fill="#D6D6D6" />
                    <circle cx="40" cy="25" r="10" fill="#BDBDBD" />
                    <path d="M36 21L44 29" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    <path d="M44 21L36 29" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    <path d="M35 45H45" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-[14px] text-[#999] font-[500]">Chưa có kỹ năng nào</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 min-h-[160px] content-start">
                {items.map((item, index) => (
                  <div
                    key={`${item.skill}-${index}`}
                    className="inline-flex items-center gap-1.5 h-[36px] px-3 bg-[#F5F5F5] border border-[#E0E0E0] rounded-full text-[13px] text-[#444]"
                  >
                    <span className="font-[500] text-[#121212]">
                      {getLabelByValue(MOCK_SKILLS, item.skill)}
                    </span>
                    {type === "hard" && (
                      <>
                        <span className="text-[#999] mx-0.5">•</span>
                        <span className="text-[#666]">
                          {getLabelByValue(EXPERIENCE_OPTIONS, item.experience)}
                        </span>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="w-5 h-5 flex items-center justify-center text-[#999] hover:text-[#E53935] hover:bg-[#FFE5E5] rounded-full transition-colors ml-1"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#F0F0F0]">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-6 border border-[#E0E0E0] rounded-[8px] text-[14px] font-[600] text-[#444] hover:bg-gray-50 transition-colors"
          >
            Huỷ
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className={`h-10 px-10 rounded-[8px] text-[14px] font-[700] transition-all
              ${canSave 
                ? "bg-[#E53935] hover:bg-[#D32F2F] text-white cursor-pointer" 
                : "bg-[#BDBDBD] text-white cursor-not-allowed"
              }`}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
