"use client";

import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import EditorMCE from "@/app/components/editor/EditorMCE";

interface ExperienceFormValues {
  position: string;
  company: string;
  isCurrentlyWorking: boolean;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  description: string;
  projectDetails: string;
}

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<ExperienceFormValues>;
  onSave?: (data: ExperienceFormValues) => void;
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

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  initialValues,
  onSave,
}) => {
  const { register, handleSubmit, control, reset, watch } =
    useForm<ExperienceFormValues>({
      defaultValues: {
        position: "",
        company: "",
        isCurrentlyWorking: false,
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        description: "",
        projectDetails: "",
        ...initialValues,
      },
    });

  const isCurrentlyWorking = watch("isCurrentlyWorking");
  const description = watch("description");
  const projectDetails = watch("projectDetails");

  const descCharCount = useMemo(() => {
    const text = (description || "").replace(/<[^>]*>/g, "");
    return text.length;
  }, [description]);

  const projCharCount = useMemo(() => {
    const text = (projectDetails || "").replace(/<[^>]*>/g, "");
    return text.length;
  }, [projectDetails]);

  useEffect(() => {
    if (isOpen) {
      reset({
        position: "",
        company: "",
        isCurrentlyWorking: false,
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        description: "",
        projectDetails: "",
        ...initialValues,
      });
    }
  }, [isOpen, initialValues, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: ExperienceFormValues) => {
    if (onSave) {
      onSave(data);
    }
    onClose();
  };

  const selectClasses = (hasError?: boolean, disabled?: boolean) =>
    `w-full h-[46px] border rounded-[8px] px-4 text-[14px] text-[#444] outline-none transition-colors bg-white appearance-none ${
      disabled
        ? "bg-[#F5F5F5] text-[#BDBDBD] cursor-not-allowed border-[#E0E0E0]"
        : hasError
        ? "border-[#0D8EFF] bg-[#FFF5F5] cursor-pointer"
        : "border-[#E0E0E0] focus:border-[#0D8EFF] cursor-pointer"
    }`;

  const inputClasses =
    "w-full h-[46px] border border-[#E0E0E0] rounded-[8px] px-4 text-[14px] outline-none transition-colors placeholder:text-[#999] focus:border-[#0D8EFF]";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[800px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h3 className="text-[18px] font-[700] text-[#121212]">Kinh nghiệm làm việc</h3>
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
          <div className="px-6 py-5 max-h-[75vh] overflow-y-auto flex flex-col gap-6">
            
            {/* Chức danh */}
            <div>
              <input
                type="text"
                {...register("position")}
                placeholder="Chức danh *"
                className={inputClasses}
              />
            </div>

            {/* Tên công ty */}
            <div>
              <input
                type="text"
                {...register("company")}
                placeholder="Tên công ty *"
                className={inputClasses}
              />
            </div>

            {/* Checkbox: Tôi đang làm việc tại đây */}
            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name="isCurrentlyWorking"
                render={({ field }) => (
                  <input
                    type="checkbox"
                    id="isCurrentlyWorking"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-4 h-4 accent-[#0D8EFF] cursor-pointer"
                  />
                )}
              />
              <label
                htmlFor="isCurrentlyWorking"
                className="text-[14px] text-[#444] cursor-pointer select-none"
              >
                Tôi đang làm việc tại đây
              </label>
            </div>

            {/* Từ | Đến */}
            <div className="grid grid-cols-2 gap-6">
              {/* Từ */}
              <div>
                <p className="text-[14px] font-[600] text-[#121212] mb-2">
                  Từ <span className="text-[#0D8EFF]">*</span>
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
                    isCurrentlyWorking ? "text-[#BDBDBD]" : "text-[#121212]"
                  }`}
                >
                  Đến {(!isCurrentlyWorking) && <span className="text-[#0D8EFF]">*</span>}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <select
                      {...register("toMonth")}
                      disabled={isCurrentlyWorking}
                      className={selectClasses(false, isCurrentlyWorking)}
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
                          stroke={isCurrentlyWorking ? "#CCC" : "#999"}
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
                      disabled={isCurrentlyWorking}
                      className={selectClasses(false, isCurrentlyWorking)}
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
                          stroke={isCurrentlyWorking ? "#CCC" : "#999"}
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

            {/* Mô tả chi tiết */}
            <div>
              <p className="text-[14px] font-[600] text-[#121212] mb-1">
                Mô tả chi tiết
              </p>
              
              <div className="flex items-start gap-1.5 mb-2">
                <div className="w-[18px] h-[18px] bg-[#FF9800] rounded-[4px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M12 18V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[13px] text-[#444]">
                  <span className="font-[600] text-[#FF9800]">Tips:</span> Tóm lược lĩnh vực công ty bạn đã làm, nêu các trách nhiệm và kết quả đạt được trong công việc. Sử dụng phần "Dự án" bên dưới để mô tả dự án đã tham gia.
                </p>
              </div>

              <div className="border border-[#E0E0E0] rounded-[8px] overflow-hidden">
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <EditorMCE
                      value={field.value}
                      onEditorChange={(content: string) => field.onChange(content)}
                    />
                  )}
                />
              </div>
              <div className="mt-2 text-[12px] text-[#999]">
                {descCharCount}/2500 ký tự
              </div>
            </div>

            {/* Dự án */}
            <div>
              <p className="text-[14px] font-[600] text-[#121212] mb-1">
                Dự án
              </p>
              
              <div className="flex items-start gap-1.5 mb-2">
                <div className="w-[18px] h-[18px] bg-[#FF9800] rounded-[4px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M12 18V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[13px] text-[#444]">
                  <span className="font-[600] text-[#FF9800]">Tips:</span> Mô tả dự án, vai trò của bạn, công nghệ sử dụng và số thành viên.
                </p>
              </div>

              <div className="border border-[#E0E0E0] rounded-[8px] overflow-hidden">
                <Controller
                  control={control}
                  name="projectDetails"
                  render={({ field }) => (
                    <EditorMCE
                      value={field.value}
                      onEditorChange={(content: string) => field.onChange(content)}
                    />
                  )}
                />
              </div>
              <div className="mt-2 text-[12px] text-[#999]">
                {projCharCount}/2500 ký tự
              </div>
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

