"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoChevronDownOutline, IoCloseOutline } from "react-icons/io5";
import { useJobFields } from "@/hooks/useJobFields";

interface GeneralInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EXPERIENCE_OPTIONS = [
  { label: "< 1 năm", value: "less_than_1" },
  ...Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1} năm`,
    value: `${i + 1}_year`,
  })),
  { label: "> 10 năm", value: "more_than_10" },
];

const LEVEL_OPTIONS = [
  { label: "Fresher", value: "fresher" },
  { label: "Junior", value: "junior" },
  { label: "Middle", value: "middle" },
  { label: "Senior", value: "senior" },
  { label: "Lead", value: "lead" },
  { label: "Manager", value: "manager" },
];

const WORK_TYPE_OPTIONS = [
  { label: "Tại văn phòng", value: "office" },
  { label: "Linh hoạt", value: "hybrid" },
  { label: "Làm từ xa", value: "remote" },
];

const CURRENCY_OPTIONS = ["USD", "VND"];
const MAX_JOB_FIELDS = 5;

/** Reusable multi-select chip dropdown */
function ChipSelect({
  label,
  required,
  placeholder,
  options,
  selected,
  onToggle,
  onRemove,
  hint,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  options: { label: string; value: string }[];
  selected: string[];
  onToggle: (v: string) => void;
  onRemove: (v: string) => void;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const available = options.filter((o) => !selected.includes(o.value));
  const getLabel = (v: string) => options.find((o) => o.value === v)?.label ?? v;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div>
      <label className="block text-[14px] font-semibold text-gray-800 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div ref={ref} className="relative">
        <div
          onClick={() => setOpen((p) => !p)}
          className={`min-h-[48px] w-full border rounded-md px-3 py-2 flex flex-wrap items-center gap-2 cursor-pointer transition-all pr-10 ${
            open ? "border-green-500 ring-1 ring-green-500" : "border-gray-300"
          }`}
        >
          {selected.length === 0 && (
            <span className="text-gray-400 text-[15px] select-none">{placeholder}</span>
          )}
          {selected.map((val) => (
            <span
              key={val}
              className="flex items-center gap-1 bg-gray-100 text-gray-700 text-[13px] px-3 py-1 rounded-full font-medium"
            >
              {getLabel(val)}
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(val); }}
                className="text-gray-400 hover:text-gray-700 ml-0.5"
              >
                <IoCloseOutline className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          <IoChevronDownOutline className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>

        {open && available.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden max-h-48 overflow-y-auto">
            {available.map((opt) => (
              <div
                key={opt.value}
                onClick={() => onToggle(opt.value)}
                className="px-4 py-3 text-[15px] text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {hint && <p className="text-[12px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}



export default function GeneralInfoModal({ isOpen, onClose }: GeneralInfoModalProps) {
  const { jobFields } = useJobFields();

  const [experience, setExperience] = useState("");
  const [level, setLevel] = useState("");
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [jobFieldSelected, setJobFieldSelected] = useState<string[]>([]);

  const [desiredCurrency, setDesiredCurrency] = useState("USD");
  const [desiredMin, setDesiredMin] = useState("");
  const [desiredMax, setDesiredMax] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState("USD");
  const [currentSalary, setCurrentSalary] = useState("");

  const workTypeRef = useRef<HTMLDivElement>(null);
  const [isWorkTypeOpen, setIsWorkTypeOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (workTypeRef.current && !workTypeRef.current.contains(e.target as Node))
        setIsWorkTypeOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!isOpen) return null;

  const toggleWorkType = (value: string) =>
    setWorkTypes((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]);
  const removeWorkType = (value: string) =>
    setWorkTypes((prev) => prev.filter((v) => v !== value));

  const availableWorkTypes = WORK_TYPE_OPTIONS.filter((o) => !workTypes.includes(o.value));
  const getWorkTypeLabel = (v: string) => WORK_TYPE_OPTIONS.find((o) => o.value === v)?.label ?? v;

  const formatCurrency = (val: string) => {
    const numericString = val.replace(/\D/g, "");
    if (!numericString) return "";
    return parseInt(numericString, 10).toLocaleString("vi-VN");
  };

  const jobFieldOptions = jobFields.map((f) => ({ label: f.name, value: String(f.id) }));
  const toggleJobField = (v: string) => {
    if (jobFieldSelected.includes(v)) {
      setJobFieldSelected((prev) => prev.filter((x) => x !== v));
    } else if (jobFieldSelected.length < MAX_JOB_FIELDS) {
      setJobFieldSelected((prev) => [...prev, v]);
    }
  };
  const removeJobField = (v: string) =>
    setJobFieldSelected((prev) => prev.filter((x) => x !== v));

  const handleSave = () => {
    console.log({ experience, level, workTypes, jobFieldSelected, desiredMin, desiredMax, desiredCurrency, currentSalary, currentCurrency });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-5 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-[22px] font-bold text-gray-900">Thông tin chung</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <IoCloseOutline className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 overflow-y-auto flex flex-col gap-6">
          {/* Tổng số năm kinh nghiệm */}
          <div>
            <label className="block text-[14px] font-semibold text-gray-800 mb-2">
              Tổng số năm kinh nghiệm <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-[15px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 appearance-none cursor-pointer transition-all bg-white"
              >
                <option value="" disabled>Chọn năm</option>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <IoChevronDownOutline className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Cấp bậc hiện tại */}
          <div>
            <label className="block text-[14px] font-semibold text-gray-800 mb-2">
              Cấp bậc hiện tại <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-[15px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 appearance-none cursor-pointer transition-all bg-white"
              >
                <option value="" disabled>Chọn cấp bậc</option>
                {LEVEL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <IoChevronDownOutline className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Hình thức làm việc mong muốn */}
          <div>
            <label className="block text-[14px] font-semibold text-gray-800 mb-2">
              Hình thức làm việc mong muốn <span className="text-red-500">*</span>
            </label>
            <div ref={workTypeRef} className="relative">
              <div
                onClick={() => setIsWorkTypeOpen((prev) => !prev)}
                className={`min-h-[48px] w-full border rounded-md px-3 py-2 flex flex-wrap items-center gap-2 cursor-pointer transition-all pr-10 ${
                  isWorkTypeOpen ? "border-green-500 ring-1 ring-green-500" : "border-gray-300"
                }`}
              >
                {workTypes.length === 0 && (
                  <span className="text-gray-400 text-[15px] select-none">Chọn hình thức</span>
                )}
                {workTypes.map((val) => (
                  <span key={val} className="flex items-center gap-1 bg-gray-100 text-gray-700 text-[13px] px-3 py-1 rounded-full font-medium">
                    {getWorkTypeLabel(val)}
                    <button onClick={(e) => { e.stopPropagation(); removeWorkType(val); }} className="text-gray-400 hover:text-gray-700 ml-0.5">
                      <IoCloseOutline className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                <IoChevronDownOutline className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              {isWorkTypeOpen && availableWorkTypes.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                  {availableWorkTypes.map((opt) => (
                    <div key={opt.value} onClick={() => toggleWorkType(opt.value)} className="px-4 py-3 text-[15px] text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-[12px] text-gray-400 mt-1">Cho phép chọn nhiều</p>
          </div>

          {/* Lĩnh vực đã làm việc */}
          <ChipSelect
            label="Lĩnh vực đã làm việc"
            required
            placeholder="Chọn lĩnh vực"
            options={jobFieldOptions}
            selected={jobFieldSelected}
            onToggle={toggleJobField}
            onRemove={removeJobField}
            hint={`${jobFieldSelected.length}/${MAX_JOB_FIELDS} Lĩnh vực`}
          />

          {/* Mức lương */}
          <div className="grid grid-cols-2 gap-6">
            {/* Mức lương mong muốn */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Mức lương mong muốn (theo tháng) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                {/* Currency box */}
                <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-3 bg-white min-w-[80px] focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all">
                  <select
                    value={desiredCurrency}
                    onChange={(e) => setDesiredCurrency(e.target.value)}
                    className="text-[14px] text-gray-700 outline-none bg-transparent cursor-pointer appearance-none pr-5 w-full"
                  >
                    {CURRENCY_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <IoChevronDownOutline className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                </div>
                {/* Min Amount */}
                <input
                  type="text"
                  value={desiredMin}
                  onChange={(e) => setDesiredMin(formatCurrency(e.target.value))}
                  className="w-[140px] border border-gray-300 rounded-md px-4 py-3 text-[15px] text-gray-800 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-white"
                />
                <span className="text-gray-500 font-medium">-</span>
                {/* Max Amount */}
                <input
                  type="text"
                  value={desiredMax}
                  onChange={(e) => setDesiredMax(formatCurrency(e.target.value))}
                  className="w-[140px] border border-gray-300 rounded-md px-4 py-3 text-[15px] text-gray-800 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-white"
                />
              </div>
            </div>

            {/* Mức lương hiện tại */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Mức lương hiện tại (theo tháng)
              </label>
              <div className="flex items-center gap-2">
                {/* Currency box */}
                <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-3 bg-white min-w-[80px] focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all">
                  <select
                    value={currentCurrency}
                    onChange={(e) => setCurrentCurrency(e.target.value)}
                    className="text-[14px] text-gray-700 outline-none bg-transparent cursor-pointer appearance-none pr-5 w-full"
                  >
                    {CURRENCY_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <IoChevronDownOutline className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                </div>
                {/* Amount box */}
                <input
                  type="text"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(formatCurrency(e.target.value))}
                  className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-[15px] text-gray-800 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-gray-200 flex justify-end gap-4 items-center">
          <button onClick={onClose} className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Huỷ
          </button>
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-2.5 rounded text-[15px] font-medium transition-colors">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
