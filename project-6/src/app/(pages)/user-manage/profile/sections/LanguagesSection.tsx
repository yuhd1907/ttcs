"use client";

import { useState } from "react";
import { SectionCard } from "../components/SectionCard";
import { LanguageModal } from "../components/LanguageModal";
import { CiEdit } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";

import { InfoUser } from "@/interface/user.interface";

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

const getLabelByValue = (
  options: { value: string; label: string }[],
  value: string
) => options.find((o) => o.value === value)?.label || value;

export const LanguagesSection = ({ infoUser, onUpdate }: { infoUser: InfoUser | null, onUpdate?: (data: InfoUser) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [languages, setLanguages] = useState<any[] | null>(null);

  const displayLanguages = languages !== null ? languages : (infoUser?.languages || []);

  const handleSave = (items: any[]) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cv-profile`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...infoUser, languages: items  }),
    })
      .then(res => res.json())
      .then(resData => {
        setLanguages(items);
        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, languages: items });
        }
        setIsModalOpen(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      {displayLanguages.length > 0 ? (
        <div className="bg-white border border-[#DEDEDE] rounded-[12px] p-5 group hover:border-[#0D8EFF] hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-[700] text-[#121212]">Ngoại ngữ</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
              title="Chỉnh sửa ngoại ngữ"
            >
              <CiEdit className="text-[24px]" />
            </button>
          </div>

          <div className="border-t border-[#F0F0F0] pt-4 flex flex-wrap gap-2">
            {displayLanguages.map((item, index) => (
              <div
                key={item.id || index}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F5F5F5] rounded-full text-[14px] text-[#222]"
              >
                <span className="font-[600]">
                  {getLabelByValue(LANGUAGE_OPTIONS, item.language)}
                </span>
                <span className="text-[#555] font-[400]">
                  ({getLabelByValue(LEVEL_OPTIONS, item.level)})
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <SectionCard
          title="Ngoại ngữ"
          subtitle="Liệt kê các ngôn ngữ mà bạn biết"
          onAdd={() => setIsModalOpen(true)}
          icon={
            <div className="w-[44px] h-[44px] bg-[#F0F7FF] rounded-[10px] flex items-center justify-center">
              <TbWorld className="text-[24px] text-[#80BFFF]" />
            </div>
          }
        />
      )}

      <LanguageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialItems={displayLanguages}
        onSave={handleSave}
      />
    </>
  );
};
