"use client";

import React, { useState, useRef, useMemo } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { useJobFields } from "@/hooks/useJobFields";

const JobFieldFilter = ({
  onActiveChange,
  onSelectionChange,
}: {
  onActiveChange?: (active: boolean) => void;
  onSelectionChange?: (selected: string[]) => void;
}) => {
  const { jobFields, isLoading } = useJobFields();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  // Chuyển searchTerm thành dạng slug để so sánh
  const toSlug = (str: string) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  // Lọc danh sách theo slug
  const filteredFields = useMemo(() => {
    if (!searchTerm.trim()) return jobFields;
    const slugSearch = toSlug(searchTerm);
    return jobFields.filter(
      (field) =>
        field.slug.includes(slugSearch) ||
        field.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, jobFields]);

  const toggleOption = (slug: string) => {
    let newSelected: string[];
    if (selected.includes(slug)) {
      newSelected = selected.filter((item) => item !== slug);
    } else {
      newSelected = [...selected, slug];
    }
    setSelected(newSelected);
    onActiveChange?.(newSelected.length > 0);
    onSelectionChange?.(newSelected);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected([]);
    onActiveChange?.(false);
    onSelectionChange?.([]);
  };

  const getSelectedLabel = () => {
    if (selected.length === 0) return null;
    const firstItem = jobFields.find((f) => f.slug === selected[0]);
    const countText = selected.length > 1 ? `, +${selected.length - 1}` : "";
    return `${firstItem?.name}${countText}`;
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border focus:outline-none transition-colors cursor-pointer ${selected.length > 0
            ? "border-[#3D88FF] bg-[#3D88FF]/10"
            : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
      >
        {selected.length > 0 ? (
          <>
            <span className="text-[16px] text-[#3D88FF] max-w-[150px] truncate">
              {jobFields.find((f) => f.slug === selected[0])?.name}
            </span>
            {selected.length > 1 && (
              <span className="text-[16px] text-[#3D88FF] flex-shrink-0">
                +{selected.length - 1}
              </span>
            )}
            <IoClose
              className="w-4 h-4 text-[#3D88FF] hover:text-[#3D88FF]/70 cursor-pointer flex-shrink-0"
              onClick={handleClear}
            />
          </>
        ) : (
          <>
            <span className="text-[16px] text-gray-700">Lĩnh vực</span>
            <FaAngleDown className="w-4 h-4 text-gray-500" />
          </>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg z-50">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm lĩnh vực..."
              className="w-full px-3 py-2 text-[16px] border border-gray-300 rounded-md focus:outline-none focus:border-[#3D88FF] focus:ring-1 focus:ring-[#3D88FF] transition-colors"
              autoFocus
            />
          </div>

          {/* Options List */}
          <div className="max-h-[240px] overflow-y-auto py-1">
            {isLoading ? (
              <div className="px-4 py-3 text-[16px] text-gray-400 text-center">
                Đang tải...
              </div>
            ) : filteredFields.length > 0 ? (
              filteredFields.map((field) => (
                <label
                  key={field.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(field.slug)}
                    onChange={() => toggleOption(field.slug)}
                    className="w-4 h-4 text-[#3D88FF] bg-gray-100 border-gray-300 rounded focus:ring-[#3D88FF] accent-[#3D88FF]"
                  />
                  <span className="ml-3 text-[16px] text-gray-700">
                    {field.name}
                  </span>
                </label>
              ))
            ) : (
              <div className="px-4 py-3 text-[16px] text-gray-400 text-center">
                Không tìm thấy lĩnh vực
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFieldFilter;
