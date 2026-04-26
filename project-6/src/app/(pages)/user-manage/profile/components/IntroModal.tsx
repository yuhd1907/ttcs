"use client";

import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import EditorMCE from "@/app/components/editor/EditorMCE";

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue?: string;
  onSave?: (content: string) => void;
}

interface FormValues {
  description: string;
}

export const IntroModal: React.FC<IntroModalProps> = ({
  isOpen,
  onClose,
  initialValue = "",
  onSave,
}) => {
  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      description: initialValue,
    },
  });

  const description = watch("description");

  const charCount = useMemo(() => {
    const text = (description || "").replace(/<[^>]*>/g, "");
    return text.length;
  }, [description]);

  useEffect(() => {
    if (isOpen) {
      reset({ description: initialValue });
    }
  }, [isOpen, initialValue, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: FormValues) => {
    if (onSave) {
      onSave(data.description);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[800px] mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h3 className="text-[18px] font-[700] text-[#121212]">Giới thiệu bản thân</h3>
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
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
          {/* Tip Box */}
          <div className="mb-5 flex items-start gap-3 bg-[#FFF9F0] border border-[#FFE7C4] rounded-[8px] p-3">
            <div className="w-5 h-5 bg-[#FF9800] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 18V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[14px] text-[#444] leading-relaxed">
              <span className="font-[700] text-[#FF9800]">Tip:</span> Tóm tắt kinh nghiệm chuyên môn, chú ý làm nổi bật các kỹ năng và điểm mạnh.
            </p>
          </div>

          {/* TinyMCE Editor with Controller */}
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

          {/* Character Count */}
          <div className="mt-2 text-[12px] text-[#999]">
            {charCount}/2500 ký tự
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
            onClick={handleSubmit(onSubmit)}
            className="h-10 px-10 bg-[#0D8EFF] hover:bg-[#0076E5] text-white rounded-[8px] text-[14px] font-[700] transition-all"
          >
            Lưu
          </button>
        </div>

      </div>
    </div>
  );
};
