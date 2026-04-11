"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import React, { useState, useRef, useEffect } from "react";

const MultiSelectDropdown = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const toggleOption = (optionValue) => {
    if (selected.includes(optionValue)) {
      onChange(selected.filter((item) => item !== optionValue));
    } else {
      onChange([...selected, optionValue]);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange([]);
  };

  const renderTriggerContent = () => {
    if (selected.length === 0) {
      return (
        <>
          <span className="text-[16px] text-gray-700">{label}</span>
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
        </>
      );
    }

    // Hiển thị tên item đầu tiên + số lượng item còn lại
    const firstItem = options.find((opt) => opt.value === selected[0])?.label;
    const countText = selected.length > 1 ? `, +${selected.length - 1}` : "";

    return (
      <>
        <span className="text-[16px] text-[#3D88FF]">
          {firstItem}
          {countText}
        </span>
        {/* Nút X để xóa filter */}
        <button
          onClick={handleClear}
          className="ml-1 text-[#3D88FF] hover:text-blue-700 focus:outline-none"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </>
    );
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Nút Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border focus:outline-none transition-colors cursor-pointer ${
          selected.length > 0
            ? "border-[#3D88FF] bg-[#3D88FF]/10" // Style khi có lựa chọn (viền xanh, nền xanh nhạt)
            : "border-gray-300 bg-white hover:bg-gray-50" // Style mặc định
        }`}
      >
        {renderTriggerContent()}
      </button>

      {/* Bảng Dropdown chọn nhiều */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg z-50 py-2">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => toggleOption(option.value)}
                className="w-4 h-4 text-[#3D88FF] bg-gray-100 border-gray-300 rounded focus:ring-[#3D88FF] accent-[#3D88FF]"
              />
              <span className="ml-3 text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
