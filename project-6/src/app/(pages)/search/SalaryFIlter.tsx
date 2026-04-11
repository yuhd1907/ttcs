"use client";

import React, { useState, useRef, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useClickOutside } from "@/hooks/useClickOutside";
import { FaAngleDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const SalaryFilter = ({
  onActiveChange,
  onApply,
}: {
  onActiveChange?: (active: boolean) => void;
  onApply?: (range: number[] | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [salaryRange, setSalaryRange] = useState([500, 10000]);
  const [appliedRange, setAppliedRange] = useState<number[] | null>(null);
  const popoverRef = useRef(null);

  useClickOutside(popoverRef, () => setIsOpen(false));

  const formatSalary = (value) => {
    return new Intl.NumberFormat("en-US").format(value) + "$";
  };

  const handleApply = () => {
    setAppliedRange([...salaryRange]);
    setIsOpen(false);
    onActiveChange?.(true);
    onApply?.([...salaryRange]);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAppliedRange(null);
    setSalaryRange([500, 10000]);
    onActiveChange?.(false);
    onApply?.(null);
  };

  const isApplied = appliedRange !== null;

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full focus:outline-none transition-colors cursor-pointer ${isApplied
            ? "bg-white border border-[#3D88FF] text-[#3D88FF] hover:bg-[#3D88FF]/10"
            : "bg-white border border-gray-300 hover:bg-gray-50"
          }`}
      >
        <span
          className={`text-[16px] ${isApplied ? "text-[#3D88FF]" : "text-gray-700"}`}
        >
          {isApplied
            ? `${formatSalary(appliedRange[0])} - ${formatSalary(appliedRange[1])}`
            : "Mức lương"}
        </span>
        {isApplied ? (
          <IoClose
            className="w-4 h-4 text-[#3D88FF] hover:text-[#3D88FF]/70 cursor-pointer"
            onClick={handleClear}
          />
        ) : (
          <FaAngleDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg p-5 z-50">
          <div className="text-gray-800 font-semibold mb-6">
            {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
          </div>

          <div className="mb-6 px-2">
            <Slider
              range
              min={500}
              max={10000}
              step={500}
              value={salaryRange}
              onChange={setSalaryRange}
              trackStyle={[{ backgroundColor: "#22c55e", height: 6 }]}
              handleStyle={[
                {
                  borderColor: "#e5e7eb",
                  height: 20,
                  width: 20,
                  marginTop: -7,
                  backgroundColor: "white",
                  opacity: 1,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                },
                {
                  borderColor: "#e5e7eb",
                  height: 20,
                  width: 20,
                  marginTop: -7,
                  backgroundColor: "white",
                  opacity: 1,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                },
              ]}
              railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
            />
          </div>

          <button
            onClick={handleApply}
            className="w-full py-2 text-[#3D88FF] font-medium bg-white border border-[#3D88FF] rounded-md hover:bg-[#3D88FF]/10 transition-colors"
          >
            Áp dụng
          </button>
        </div>
      )}
    </div>
  );
};

export default SalaryFilter;
