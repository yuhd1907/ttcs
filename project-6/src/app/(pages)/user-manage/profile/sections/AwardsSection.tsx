"use client";

import { useState } from "react";
import { SectionCard } from "../components/SectionCard";
import { AwardsModal } from "../components/AwardsModal";
import { CiEdit, CiTrash, CiCirclePlus } from "react-icons/ci";
import { FaAward } from "react-icons/fa";

import { InfoUser } from "@/interface/user.interface";

export const AwardsSection = ({ infoUser, onUpdate }: { infoUser: InfoUser | null, onUpdate?: (data: InfoUser) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [awards, setAwards] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const displayAwards = awards.length > 0 ? awards : (infoUser?.awards || []);

  const handleSave = (data: any) => {
    const isEditing = editingId !== null;
    const currentList = awards.length > 0 ? awards : (infoUser?.awards || []);

    let updatedList = [];
    if (isEditing) {
      updatedList = currentList.map(award =>
        award.id === editingId ? { ...data, id: editingId } : award
      );
    } else {
      const newItem = { ...data, id: `award-${Date.now()}` };
      updatedList = [newItem, ...currentList];
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cv-profile`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...infoUser, awards: updatedList  }),
    })
      .then(res => res.json())
      .then(resData => {
        setAwards(updatedList);

        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, awards: updatedList });
        }

        setIsModalOpen(false);
        setEditingId(null);
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id: string) => {
    const currentList = awards.length > 0 ? awards : (infoUser?.awards || []);
    const updatedList = currentList.filter(award => award.id !== id);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cv-profile`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...infoUser, awards: updatedList  }),
    })
      .then(res => res.json())
      .then(data => {
        setAwards(updatedList);
        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, awards: updatedList });
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      {displayAwards.length > 0 ? (
        <div className="bg-white border border-[#DEDEDE] rounded-[12px] p-5 group hover:border-[#0D8EFF] hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[18px] font-[700] text-[#121212]">Giải thưởng</h3>
            <button
              onClick={() => {
                setEditingId(null);
                setIsModalOpen(true);
              }}
              className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors cursor-pointer"
              title="Thêm giải thưởng"
            >
              <CiCirclePlus className="text-[24px]" />
            </button>
          </div>

          <div className="mt-2">
            {displayAwards.map((award, index) => (
              <div key={award.id || index} className="border-t border-[#F0F0F0] py-4 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-[16px] font-[700] text-[#121212] break-words">{award.name}</h4>
                    <p className="text-[14px] text-[#333333] mt-1 break-words">{award.organization}</p>
                    <p className="text-[14px] text-[#757575] mt-1 break-words">
                      {award.month}/{award.year}
                    </p>
                    {award.description && (
                      <div 
                        className="text-[14px] text-[#222222] mt-3 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: award.description }}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    <button
                      className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors cursor-pointer"
                      title="Chỉnh sửa"
                      onClick={() => {
                        setEditingId(award.id);
                        setIsModalOpen(true);
                      }}
                    >
                      <CiEdit className="text-[24px]" />
                    </button>
                    <button
                      className="text-[#444444] hover:text-[#111111] transition-colors cursor-pointer"
                      title="Xoá"
                      onClick={() => handleDelete(award.id)}
                    >
                      <CiTrash className="text-[24px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <SectionCard
          title="Giải thưởng"
          subtitle="Thể hiện giải thưởng hoặc thành tích mà bạn đạt được"
          icon={
            <div className="w-[44px] h-[44px] bg-[#F0F7FF] rounded-[10px] flex items-center justify-center">
              <FaAward className="text-[24px] text-[#80BFFF]" />
            </div>
          }
          onAdd={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
        />
      )}
      <AwardsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        initialValues={editingId !== null ? displayAwards.find(a => a.id === editingId) : undefined}
        onSave={handleSave}
      />
    </>
  );
};
