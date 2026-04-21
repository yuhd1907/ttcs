"use client";

import { useState, useRef, useEffect } from "react";
import { SectionCard } from "../components/SectionCard";
import { HardSkillsModal } from "../components/HardSkillsModal";
import { SoftSkillsModal } from "../components/SoftSkillsModal";
import { CiEdit, CiTrash, CiCirclePlus } from "react-icons/ci";

import { InfoUser } from "@/interface/user.interface";

export const SkillsSection = ({ infoUser, onUpdate }: { infoUser: InfoUser | null, onUpdate?: (data: InfoUser) => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [modalType, setModalType] = useState<"hard" | "soft" | null>(null);

  const [skillsGroups, setSkillsGroups] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const displaySkills = skillsGroups.length > 0 ? skillsGroups : (infoUser?.skills || []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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

  return (
    <div className="relative" ref={dropdownRef}>
      {displaySkills.length > 0 ? (
        <div className="bg-white border border-[#DEDEDE] rounded-[12px] p-5 group hover:border-[#0D8EFF] hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between mb-4 relative">
            <h3 className="text-[18px] font-[700] text-[#121212]">Kỹ năng</h3>
            <button
              onClick={handleOpenDropdown}
              className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
              title="Thêm kỹ năng"
            >
              <CiCirclePlus className="text-[24px]" />
            </button>

            {isDropdownOpen && (
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
            )}
          </div>

          <div className="bg-[#F5F9FF] rounded-[8px] p-3 flex items-center gap-2 mb-6 border border-[#E6F0FF]">
            <CiEdit className="text-[20px] text-[#2563EB]" />
            <p className="text-[14px]">
              <span className="text-[#2563EB] font-[500] cursor-pointer hover:underline">Cập nhật nhanh</span>{" "}
              <span className="text-[#555]">số năm kinh nghiệm cho kỹ năng</span>
            </p>
          </div>

          <div>
            {displaySkills.map((group, index) => (
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
                        <div className="w-1.5 h-1.5 bg-[#E53935] rounded-full mt-0.5"></div>
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
        <SectionCard
          title="Kỹ năng"
          subtitle="Liệt kê các kỹ năng chuyên môn của bạn"
          icon={
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="44" height="44" rx="10" fill="#F0F7FF" />
              <path d="M28 14C29.6569 14 31 15.3431 31 17C31 18.6569 29.6569 20 28 20C27.2316 20 26.5308 19.7159 26 19.25L18.25 24C18.7159 24.5308 19 25.2316 19 26C19 27.6569 17.6569 29 16 29C14.3431 29 13 27.6569 13 26C13 24.3431 14.3431 23 16 23C16.7684 23 17.4692 23.2841 18 23.75L25.75 19C25.2841 18.4692 25 17.7684 25 17C25 15.3431 26.3431 14 28 14Z" fill="#B3D9FF" />
              <circle cx="28" cy="17" r="3" fill="#80BFFF" opacity="0.7" />
              <circle cx="16" cy="26" r="3" fill="#80BFFF" opacity="0.7" />
            </svg>
          }
          onAdd={handleOpenDropdown}
        />
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
