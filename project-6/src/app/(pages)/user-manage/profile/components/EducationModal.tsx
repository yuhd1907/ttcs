"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

interface EducationFormValues {
  school: string;
  degree: string;
  major: string;
  isCurrentlyStudying: boolean;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  details: string;
}

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<EducationFormValues>;
  onSave?: (data: EducationFormValues) => void;
}

const MONTHS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1).padStart(2, "0"),
  label: `Tháng ${i + 1}`,
}));

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => ({
  value: String(currentYear - i),
  label: String(currentYear - i),
}));

const DEGREE_OPTIONS = [
  { value: "college", label: "Cao đẳng" },
  { value: "bachelor", label: "Cử nhân" },
  { value: "master", label: "Thạc Sĩ" },
  { value: "doctorate", label: "Tiến Sĩ" },
  { value: "other", label: "Khác" },
];

export const EducationModal: React.FC<EducationModalProps> = ({
  isOpen,
  onClose,
  initialValues,
  onSave,
}) => {
  const { register, handleSubmit, control, reset, watch } =
    useForm<EducationFormValues>({
      defaultValues: {
        school: "",
        degree: "",
        major: "",
        isCurrentlyStudying: false,
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        details: "",
        ...initialValues,
      },
    });

  const isCurrentlyStudying = watch("isCurrentlyStudying");

  useEffect(() => {
    if (isOpen) {
      reset({
        school: "",
        degree: "",
        major: "",
        isCurrentlyStudying: false,
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        details: "",
        ...initialValues,
      });
    }
  }, [isOpen, initialValues, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: EducationFormValues) => {
    if (onSave) {
      onSave(data);
    }
    onClose();
  };

  const selectClasses = (hasError?: boolean) =>
    `w-full h-[46px] border rounded-[8px] px-4 text-[14px] text-[#444] outline-none transition-colors bg-white appearance-none cursor-pointer ${
      hasError
        ? "border-[#E53935] bg-[#FFF5F5]"
        : "border-[#E0E0E0] focus:border-[#0D8EFF]"
    }`;

  const inputClasses =
    "w-full h-[46px] border border-[#E0E0E0] rounded-[8px] px-4 text-[14px] outline-none transition-colors placeholder:text-[#999] focus:border-[#0D8EFF]";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[800px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h3 className="text-[18px] font-[700] text-[#121212]">Học vấn</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#757575] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-5 max-h-[75vh] overflow-y-auto flex flex-col gap-4">
            {/* Trường */}
            <div>
              <input
                type="text"
                {...register("school")}
                placeholder="Trường *"
                className={inputClasses}
              />
            </div>

            {/* Trình độ | Ngành học */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <select {...register("degree")} className={selectClasses()}>
                  <option value="">Trình độ *</option>
                  {DEGREE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  {...register("major")}
                  placeholder="Ngành học *"
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Checkbox: Tôi đang theo học tại đây */}
            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name="isCurrentlyStudying"
                render={({ field }) => (
                  <input
                    type="checkbox"
                    id="isCurrentlyStudying"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-4 h-4 accent-[#0D8EFF] cursor-pointer"
                  />
                )}
              />
              <label
                htmlFor="isCurrentlyStudying"
                className="text-[14px] text-[#444] cursor-pointer select-none"
              >
                Tôi đang theo học tại đây
              </label>
            </div>

            {/* Từ | Đến */}
            <div className="grid grid-cols-2 gap-6">
              {/* Từ */}
              <div>
                <p className="text-[14px] font-[600] text-[#121212] mb-2">
                  Từ <span className="text-[#E53935]">*</span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <select
                      {...register("fromMonth")}
                      className={selectClasses()}
                    >
                      <option value="">Tháng</option>
                      {MONTHS.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#999"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      {...register("fromYear")}
                      className={selectClasses()}
                    >
                      <option value="">Năm</option>
                      {YEARS.map((y) => (
                        <option key={y.value} value={y.value}>
                          {y.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#999"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Đến */}
              <div>
                <p
                  className={`text-[14px] font-[600] mb-2 ${
                    isCurrentlyStudying ? "text-[#BDBDBD]" : "text-[#121212]"
                  }`}
                >
                  Đến <span className="text-[#E53935]">*</span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <select
                      {...register("toMonth")}
                      disabled={isCurrentlyStudying}
                      className={`${selectClasses()} ${
                        isCurrentlyStudying
                          ? "bg-[#F5F5F5] text-[#BDBDBD] cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <option value="">Tháng</option>
                      {MONTHS.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke={isCurrentlyStudying ? "#CCC" : "#999"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      {...register("toYear")}
                      disabled={isCurrentlyStudying}
                      className={`${selectClasses()} ${
                        isCurrentlyStudying
                          ? "bg-[#F5F5F5] text-[#BDBDBD] cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <option value="">Năm</option>
                      {YEARS.map((y) => (
                        <option key={y.value} value={y.value}>
                          {y.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke={isCurrentlyStudying ? "#CCC" : "#999"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin chi tiết khác */}
            <div>
              <textarea
                {...register("details")}
                placeholder="Thông tin chi tiết khác"
                rows={3}
                className="w-full border border-[#E0E0E0] rounded-[8px] px-4 py-3 text-[14px] outline-none placeholder:text-[#999] focus:border-[#0D8EFF] transition-colors resize-none"
              />
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
              type="submit"
              className="h-10 px-10 bg-[#0D8EFF] hover:bg-[#0076E5] text-white rounded-[8px] text-[14px] font-[700] transition-all cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
