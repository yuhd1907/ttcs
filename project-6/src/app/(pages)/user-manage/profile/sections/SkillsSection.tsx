"use client";

import { useState, useRef, useEffect } from "react";
import { SectionCard } from "../components/SectionCard";
import { HardSkillsModal } from "../components/HardSkillsModal";
import { SoftSkillsModal } from "../components/SoftSkillsModal";
import { CiEdit, CiTrash, CiCirclePlus } from "react-icons/ci";
import { FaCode } from "react-icons/fa";

import { InfoUser } from "@/interface/user.interface";

export const SkillsSection = ({ infoUser, onUpdate }: { infoUser: InfoUser | null, onUpdate?: (data: InfoUser) => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [modalType, setModalType] = useState<"hard" | "soft" | null>(null);

  const [skillsGroups, setSkillsGroups] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const displaySkills = skillsGroups.length > 0 ? skillsGroups : (infoUser?.skills || []);
  const sortedSkills = [...displaySkills].sort((a, b) => {
    if (a.type === "hard" && b.type === "soft") return -1;
    if (a.type === "soft" && b.type === "hard") return 1;
    return 0;
  });

  const handleOpenDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectSkillType = (type: "hard" | "soft") => {
    setEditingId(null);
    setModalType(type);
    setIsDropdownOpen(false);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setEditingId(null);
  };

  const handleSaveModal = (groupName: string, items: any[]) => {
    const isEditing = editingId !== null;
    const currentList = skillsGroups.length > 0 ? skillsGroups : (infoUser?.skills || []);

    let updatedGroups = [];
    if (isEditing) {
      updatedGroups = currentList.map(group =>
        group.id === editingId ? { type: modalType, groupName, items, id: editingId } : group
      );
    } else {
      const newGroup = { type: modalType, groupName, items, id: `skill-group-${Date.now()}` };
      updatedGroups = [newGroup, ...currentList];
    }

    fetch("http://localhost:5000/user", {
      method: "PATCH",
      // credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: updatedGroups }),
    })
      .then(res => res.json())
      .then(resData => {
        setSkillsGroups(updatedGroups);

        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, skills: updatedGroups });
        }

        handleCloseModal();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id: string) => {
    const currentList = skillsGroups.length > 0 ? skillsGroups : (infoUser?.skills || []);
    const updatedGroups = currentList.filter(group => group.id !== id);

    fetch("http://localhost:5000/user", {
      method: "PATCH",
      // credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: updatedGroups }),
    })
      .then(res => res.json())
      .then(data => {
        setSkillsGroups(updatedGroups);
        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, skills: updatedGroups });
        }
      })
      .catch(err => console.error(err));
  };

  const DropdownMenu = () => (
    <div className="absolute right-0 top-[100%] mt-2 z-50 w-[240px] bg-white border border-[#E0E0E0] rounded-[8px] shadow-lg py-2 animate-in fade-in zoom-in duration-200 origin-top-right">
      <div className="px-4 py-2">
        <span className="text-[13px] font-[600] text-[#999] uppercase tracking-wide">
          Thêm nhóm:
        </span>
      </div>

      <button
        type="button"
        className="w-full text-left px-4 py-2.5 text-[15px] text-[#121212] hover:bg-[#F5F9FF] hover:text-[#0D8EFF] transition-colors flex items-center"
        onClick={() => handleSelectSkillType("hard")}
      >
        <span className="mr-2 text-[18px]">+</span> Kỹ năng chính
      </button>

      <button
        type="button"
        className="w-full text-left px-4 py-2.5 text-[15px] text-[#121212] hover:bg-[#F5F9FF] hover:text-[#0D8EFF] transition-colors flex items-center"
        onClick={() => handleSelectSkillType("soft")}
      >
        <span className="mr-2 text-[18px]">+</span> Kỹ năng mềm
      </button>
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {displaySkills.length > 0 ? (
        <div className="bg-white border border-[#DEDEDE] rounded-[12px] p-5 group hover:border-[#0D8EFF] hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between mb-4 relative">
            <h3 className="text-[18px] font-[700] text-[#121212]">Kỹ năng</h3>
            <div className="relative">
              <button
                onClick={handleOpenDropdown}
                className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
                title="Thêm kỹ năng"
              >
                <CiCirclePlus className="text-[24px]" />
              </button>
              {isDropdownOpen && <DropdownMenu />}
            </div>
          </div>

          <div className="bg-[#F5F9FF] rounded-[8px] p-3 flex items-center gap-2 mb-6 border border-[#E6F0FF]">
            <CiEdit className="text-[20px] text-[#2563EB]" />
            <p className="text-[14px]">
              <span className="text-[#2563EB] font-[500] cursor-pointer hover:underline">Cập nhật nhanh</span>{" "}
              <span className="text-[#555]">số năm kinh nghiệm cho kỹ năng</span>
            </p>
          </div>

          <div>
            {sortedSkills.map((group, index) => (
              <div key={group.id || index} className="border-t border-[#F0F0F0] py-6 first:pt-0 first:border-t-0 last:pb-0">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-[16px] font-[700] text-[#121212]">{group.groupName}</h4>
                  <div className="flex items-center gap-3">
                    <button
                      className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
                      title="Chỉnh sửa"
                      onClick={() => {
                        setEditingId(group.id);
                        setModalType(group.type);
                      }}
                    >
                      <CiEdit className="text-[24px]" />
                    </button>
                    <button
                      className="text-[#444444] hover:text-[#111111] transition-colors"
                      title="Xoá"
                      onClick={() => handleDelete(group.id)}
                    >
                      <CiTrash className="text-[24px]" />
                    </button>
                  </div>
                </div>

                {group.type === "hard" ? (
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item: any, i: number) => (
                      <div
                        key={i}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#E0E0E0] rounded-full text-[14px] text-[#222]"
                      >
                        <span className="font-[700]">{item.skill}</span>
                        {item.experience && (
                          <span className="text-[#555] font-[400]">({item.experience})</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {group.items.map((item: any, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-[15px] text-[#121212]">
                        <div className="w-1.5 h-1.5 bg-[#121212] rounded-full mt-0.5"></div>
                        <span>{item.skill}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative">
          <SectionCard
            title="Kỹ năng"
            subtitle="Liệt kê các kỹ năng chuyên môn của bạn"
            icon={
              <div className="w-[44px] h-[44px] bg-[#F0F7FF] rounded-[10px] flex items-center justify-center">
                <FaCode className="text-[24px] text-[#80BFFF]" />
              </div>
            }
            onAdd={handleOpenDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 top-[100%] translate-y-0 z-[60]">
               <DropdownMenu />
            </div>
          )}
        </div>
      )}

      {/* Modals rendered separately */}
      <HardSkillsModal
        isOpen={modalType === "hard"}
        onClose={handleCloseModal}
        initialItems={editingId !== null ? displaySkills.find(g => g.id === editingId)?.items : undefined}
        onSave={handleSaveModal}
      />

      <SoftSkillsModal
        isOpen={modalType === "soft"}
        onClose={handleCloseModal}
        initialItems={editingId !== null ? displaySkills.find(g => g.id === editingId)?.items : undefined}
        onSave={(groupName, items) => {
          handleSaveModal(groupName, items);
        }}
      />
    </div>
  );
};
