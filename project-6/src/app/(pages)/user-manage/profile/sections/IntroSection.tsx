import { useState } from "react";
import { SectionCard } from "../components/SectionCard";
import { IntroModal } from "../components/IntroModal";
import { CiEdit } from "react-icons/ci";
import { PiUserCircle } from "react-icons/pi";

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
            <div className="w-[44px] h-[44px] bg-[#F0F7FF] rounded-[10px] flex items-center justify-center">
              <PiUserCircle className="text-[28px] text-[#80BFFF]" />
            </div>
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
