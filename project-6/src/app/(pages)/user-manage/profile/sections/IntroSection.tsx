import { useState } from "react";
import { SectionCard } from "../components/SectionCard";
import { IntroModal } from "../components/IntroModal";
import { CiEdit } from "react-icons/ci";

import { InfoUser } from "@/interface/user.interface";

export const IntroSection = ({ infoUser, onUpdate }: { infoUser: InfoUser | null, onUpdate?: (data: InfoUser) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (content: string) => {
    fetch("http://localhost:5000/user", {
      method: "PATCH",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ intro: content }),
    })
      .then(res => res.json())
      .then(data => {
        if (onUpdate) {
          onUpdate(data);
        }
        setIsModalOpen(false);
      })
  };

  return (
    <>
      {infoUser?.intro ? (
        <div className="bg-white border border-[#DEDEDE] rounded-[12px] p-5 group hover:border-[#0D8EFF] hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-[700] text-[#121212]">Giới thiệu bản thân</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
              title="Chỉnh sửa giới thiệu"
            >
              <CiEdit className="text-[24px]" />
            </button>
          </div>
          <hr className="border-[#F0F0F0] mt-3 mb-4" />
          <div
            className="text-[14px] text-[#222222] leading-relaxed [&>p]:mb-2 last:[&>p]:mb-0"
            dangerouslySetInnerHTML={{ __html: infoUser.intro }}
          />
        </div>
      ) : (
        <SectionCard
          title="Giới thiệu bản thân"
          subtitle="Giới thiệu điểm mạnh và số năm kinh nghiệm của bạn"
          onAdd={() => setIsModalOpen(true)}
          icon={
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="44" height="44" rx="10" fill="#F0F7FF" />
              <path d="M22 22C25.3137 22 28 19.3137 28 16C28 12.6863 25.3137 10 22 10C18.6863 10 16 12.6863 16 16C16 19.3137 18.6863 22 22 22Z" fill="#B3D9FF" />
              <path d="M30 34C30 29.5817 26.4183 26 22 26C17.5817 26 14 29.5817 14 34" stroke="#B3D9FF" strokeWidth="2" strokeLinecap="round" />
              <circle cx="22" cy="16" r="5" fill="#80BFFF" opacity="0.6" />
            </svg>
          }
        />
      )}

      <IntroModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialValue={infoUser?.intro || ""}
      />
    </>
  );
};
