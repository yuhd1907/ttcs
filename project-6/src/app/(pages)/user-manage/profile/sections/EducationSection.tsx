"use client";

import { useState } from "react";
import { SectionCard } from "../components/SectionCard";
import { EducationModal } from "../components/EducationModal";
import { CiEdit, CiTrash, CiCirclePlus } from "react-icons/ci";

import { InfoUser } from "@/interface/user.interface";

const getDegreeLabel = (val: string) => {
  const options: Record<string, string> = {
    college: "Cao đẳng",
    bachelor: "Cử nhân",
    master: "Thạc Sĩ",
    doctorate: "Tiến Sĩ",
    other: "Khác"
  };
  return options[val] || val;
};

export const EducationSection = (
  { infoUser, onUpdate }:
    { infoUser: InfoUser | null, onUpdate?: (data: InfoUser) => void }
) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educations, setEducations] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const displayEducations = educations.length > 0 ? educations : (infoUser?.educations || []);

  const handleSave = (formData: any) => {
    const isEditing = editingId !== null;
    // Lấy danh sách hiện tại (ưu tiên state local, nếu chưa có thì lấy từ props)
    const currentList = educations.length > 0 ? educations : (infoUser?.educations || []);

    let updatedList = [];

    if (isEditing) {
      // Cập nhật riêng học vấn đang sửa
      updatedList = currentList.map(edu =>
        edu.id === editingId ? { ...formData, id: editingId } : edu
      );
    } else {
      // Thêm học vấn mới vào đầu danh sách (tạo id giả lập cho json-server)
      const newItem = { ...formData, id: `edu-${Date.now()}` };
      updatedList = [newItem, ...currentList];
    }

    // Với json-server (cấu trúc `user` object) ta gửi PATCH với mảng educations mới
    fetch("http://localhost:5000/user", {
      method: "PATCH",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ educations: updatedList }),
    })
      .then(res => res.json())
      .then(data => {
        // Cập nhật State nội bộ
        setEducations(updatedList);

        // Gọi hàm onUpdate để đồng bộ lên component cha
        if (infoUser && onUpdate) {
          onUpdate({
            ...infoUser,
            educations: updatedList
          });
        }

        // Đóng Modal
        setIsModalOpen(false);
        setEditingId(null);
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id: string) => {

    const currentList = educations.length > 0 ? educations : (infoUser?.educations || []);
    const updatedList = currentList.filter(edu => edu.id !== id);

    fetch("http://localhost:5000/user", {
      method: "PATCH",
      // credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ educations: updatedList }),
    })
      .then(res => res.json())
      .then(data => {
        setEducations(updatedList);
        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, educations: updatedList });
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      {displayEducations.length > 0 ? (
        <div className="bg-white border border-[#DEDEDE] rounded-[12px] p-5 group hover:border-[#0D8EFF] hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[18px] font-[700] text-[#121212]">Học vấn</h3>
            <button
              onClick={() => {
                setEditingId(null);
                setIsModalOpen(true);
              }}
              className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
              title="Thêm học vấn"
            >
              <CiCirclePlus className="text-[24px]" />
            </button>
          </div>

          <div className="mt-2">
            {displayEducations.map((edu, index) => (
              <div key={edu.id || index} className="border-t border-[#F0F0F0] py-4 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-[16px] font-[700] text-[#121212]">{edu.school}</h4>
                    <p className="text-[14px] text-[#333333] mt-1">
                      {getDegreeLabel(edu.degree)} - {edu.major}
                    </p>
                    <p className="text-[14px] text-[#757575] mt-1">
                      {edu.fromMonth}/{edu.fromYear} - {edu.isCurrentlyStudying ? "Hiện tại" : `${edu.toMonth}/${edu.toYear}`}
                    </p>
                    {edu.details && (
                      <div 
                        className="text-[14px] text-[#222222] mt-3 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: edu.details }}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <button
                      className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
                      title="Chỉnh sửa"
                      onClick={() => {
                        setEditingId(edu.id);
                        setIsModalOpen(true);
                      }}
                    >
                      <CiEdit className="text-[24px]" />
                    </button>
                    <button
                      className="text-[#444444] hover:text-[#111111] transition-colors"
                      title="Xoá"
                      onClick={() => handleDelete(edu.id)}
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
          title="Học vấn"
          subtitle="Chia sẻ trình độ học vấn của bạn"
          onAdd={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
          icon={
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="44" height="44" rx="10" fill="#F0F7FF" />
              <path d="M22 12L32 17L22 22L12 17L22 12Z" fill="#B3D9FF" />
              <path d="M12 17V24" stroke="#B3D9FF" strokeWidth="2" strokeLinecap="round" />
              <path d="M17 19.5V26C17 26 19 28 22 28C25 28 27 26 27 26V19.5" stroke="#80BFFF" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="25" r="2" fill="#B3D9FF" />
            </svg>
          }
        />
      )}

      <EducationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        initialValues={editingId !== null ? displayEducations.find(e => e.id === editingId) : undefined}
        onSave={handleSave}
      />
    </>
  );
};
