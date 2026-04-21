"use client";

import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

interface LanguageItem {
  language: string;
  level: string;
}

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItems?: LanguageItem[];
  onSave?: (items: LanguageItem[]) => void;
}

const LANGUAGE_OPTIONS = [
  { value: "vietnamese", label: "Tiếng Việt" },
  { value: "english", label: "Tiếng Anh" },
  { value: "japanese", label: "Tiếng Nhật" },
  { value: "german", label: "Tiếng Đức" },
  { value: "spanish", label: "Tiếng Tây Ban Nha" },
  { value: "korean", label: "Tiếng Hàn" },
  { value: "chinese", label: "Tiếng Trung" },
  { value: "french", label: "Tiếng Pháp" },
];

const LEVEL_OPTIONS = [
  { value: "beginner", label: "Sơ cấp" },
  { value: "intermediate", label: "Trung cấp" },
  { value: "advanced", label: "Nâng cao" },
  { value: "proficient", label: "Thành thạo" },
];

const MAX_LANGUAGES = 5;

const getLabelByValue = (
  options: { value: string; label: string }[],
  value: string
) => options.find((o) => o.value === value)?.label || value;

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  initialItems = [],
  onSave,
}) => {
  const [items, setItems] = useState<LanguageItem[]>(initialItems);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    if (isOpen) {
      setItems(initialItems);
      setSelectedLanguage("");
      setSelectedLevel("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!selectedLanguage || !selectedLevel) return;
    if (items.length >= MAX_LANGUAGES) return;
    // Prevent duplicate languages
    if (items.some((item) => item.language === selectedLanguage)) return;

    setItems((prev) => [
      ...prev,
      { language: selectedLanguage, level: selectedLevel },
    ]);
    setSelectedLanguage("");
    setSelectedLevel("");
  };

  const handleRemove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(items);
    }
    onClose();
  };

  // Filter out already-added languages from dropdown
  const availableLanguages = LANGUAGE_OPTIONS.filter(
    (opt) => !items.some((item) => item.language === opt.value)
  );

  const selectClasses =
    "w-full h-[46px] border border-[#E0E0E0] rounded-[8px] px-4 text-[14px] text-[#444] outline-none transition-colors bg-white appearance-none cursor-pointer focus:border-[#0D8EFF]";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[800px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h3 className="text-[18px] font-[700] text-[#121212]">Ngoại ngữ</h3>
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
          {/* Counter */}
          <p className="text-[14px] font-[700] text-[#121212] mb-4">
            Danh sách ngôn ngữ ({items.length}/{MAX_LANGUAGES})
          </p>

          {/* Add Row */}
          <div className="flex items-center gap-3 mb-4">
            {/* Language dropdown */}
            <div className="flex-1 relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={selectClasses}
                disabled={items.length >= MAX_LANGUAGES}
              >
                <option value="">Tìm ngôn ngữ</option>
                {availableLanguages.map((opt) => (
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

            {/* Level dropdown */}
            <div className="flex-1 relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className={selectClasses}
                disabled={items.length >= MAX_LANGUAGES}
              >
                <option value="">Chọn trình độ</option>
                {LEVEL_OPTIONS.map((opt) => (
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

            {/* Add button */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={!selectedLanguage || !selectedLevel || items.length >= MAX_LANGUAGES}
              className={`w-[46px] h-[46px] flex-shrink-0 flex items-center justify-center rounded-[8px] text-white transition-all ${
                !selectedLanguage || !selectedLevel || items.length >= MAX_LANGUAGES
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#0D8EFF] hover:bg-[#0076E5] cursor-pointer"
              }`}
            >
              <CiCirclePlus className="text-[24px]" />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 min-h-[200px]">
            {items.map((item, index) => (
              <div
                key={`${item.language}-${index}`}
                className="inline-flex items-center gap-1.5 h-[32px] px-3 bg-[#F5F5F5] border border-[#E0E0E0] rounded-full text-[13px] text-[#444]"
              >
                <span>
                  {getLabelByValue(LANGUAGE_OPTIONS, item.language)}{" "}
                  <span className="text-[#0D8EFF]">
                    ({getLabelByValue(LEVEL_OPTIONS, item.level)})
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="w-4 h-4 flex items-center justify-center text-[#999] hover:text-[#E53935] transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
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
            className="h-10 px-10 bg-[#0D8EFF] hover:bg-[#0076E5] text-white rounded-[8px] text-[14px] font-[700] transition-all cursor-pointer"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
