"use client";

import { useState } from "react";
import { SectionCard } from "../components/SectionCard";
import { ExperienceModal } from "../components/ExperienceModal";
import { CiEdit, CiTrash, CiCirclePlus } from "react-icons/ci";
import { PiBriefcase } from "react-icons/pi";

import { InfoUser } from "@/interface/user.interface";

export const ExperienceSection = ({ infoUser, onUpdate }: { infoUser: InfoUser | null, onUpdate?: (data: InfoUser) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const displayExperiences = experiences.length > 0 ? experiences : (infoUser?.experiences || []);

  const handleSave = (data: any) => {
    const isEditing = editingId !== null;
    const currentList = experiences.length > 0 ? experiences : (infoUser?.experiences || []);

    let updatedList = [];
    if (isEditing) {
      updatedList = currentList.map(exp =>
        exp.id === editingId ? { ...data, id: editingId } : exp
      );
    } else {
      const newItem = { ...data, id: `exp-${Date.now()}` };
      updatedList = [newItem, ...currentList];
    }

    fetch("http://localhost:5000/user", {
      method: "PATCH",
      // credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experiences: updatedList }),
    })
      .then(res => res.json())
      .then(resData => {
        setExperiences(updatedList);

        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, experiences: updatedList });
        }

        setIsModalOpen(false);
        setEditingId(null);
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id: string) => {
    const currentList = experiences.length > 0 ? experiences : (infoUser?.experiences || []);
    const updatedList = currentList.filter(exp => exp.id !== id);

    fetch("http://localhost:5000/user", {
      method: "PATCH",
      // credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experiences: updatedList }),
    })
      .then(res => res.json())
      .then(data => {
        setExperiences(updatedList);
        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, experiences: updatedList });
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      {displayExperiences.length > 0 ? (
        <div className="bg-white border border-[#DEDEDE] rounded-[12px] p-5 group hover:border-[#0D8EFF] hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[18px] font-[700] text-[#121212]">Kinh nghiệm làm việc</h3>
            <button
              onClick={() => {
                setEditingId(null);
                setIsModalOpen(true);
              }}
              className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
              title="Thêm kinh nghiệm"
            >
              <CiCirclePlus className="text-[24px]" />
            </button>
          </div>

          <div className="mt-2">
            {displayExperiences.map((exp, index) => (
              <div key={exp.id || index} className="border-t border-[#F0F0F0] py-4 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-[16px] font-[700] text-[#121212]">{exp.position}</h4>
                    <p className="text-[14px] text-[#333333] mt-1">
                      {exp.company}
                    </p>
                    <p className="text-[14px] text-[#757575] mt-1">
                      {exp.fromMonth}/{exp.fromYear} - {exp.isCurrentlyWorking ? "Hiện tại" : `${exp.toMonth}/${exp.toYear}`}
                    </p>
                    {exp.description && (
                      <div
                        className="text-[14px] text-[#222222] mt-3 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
                    {exp.projectDetails && (
                      <div className="mt-3">
                        <p className="text-[16px] font-[700] text-[#121212]">Dự án:</p>
                        <div
                          className="text-[14px] text-[#222222] mt-2 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: exp.projectDetails }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <button
                      className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
                      title="Chỉnh sửa"
                      onClick={() => {
                        setEditingId(exp.id);
                        setIsModalOpen(true);
                      }}
                    >
                      <CiEdit className="text-[24px]" />
                    </button>
                    <button
                      className="text-[#444444] hover:text-[#111111] transition-colors"
                      title="Xoá"
                      onClick={() => handleDelete(exp.id)}
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
          title="Kinh nghiệm làm việc"
          subtitle="Thể hiện những thông tin chi tiết về quá trình làm việc"
          icon={
            <div className="w-[44px] h-[44px] bg-[#F0F7FF] rounded-[10px] flex items-center justify-center">
              <PiBriefcase className="text-[26px] text-[#80BFFF]" />
            </div>
          }
          onAdd={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
        />
      )}

      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        initialValues={editingId !== null ? displayExperiences.find(e => e.id === editingId) : undefined}
        onSave={handleSave}
      />
    </>
  );
};
