"use client";

import { useState } from "react";
import { SectionCard } from "../components/SectionCard";
import { ProjectsModal } from "../components/ProjectsModal";
import { CiEdit, CiTrash, CiCirclePlus } from "react-icons/ci";
import { FiExternalLink } from "react-icons/fi";
import { GoProjectRoadmap } from "react-icons/go";

import { InfoUser } from "@/interface/user.interface";

export const ProjectsSection = ({ infoUser, onUpdate }: { infoUser: InfoUser | null, onUpdate?: (data: InfoUser) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const displayProjects = projects.length > 0 ? projects : (infoUser?.projects || []);

  const handleSave = (data: any) => {
    const isEditing = editingId !== null;
    const currentList = projects.length > 0 ? projects : (infoUser?.projects || []);

    let updatedList = [];
    if (isEditing) {
      updatedList = currentList.map(proj =>
        proj.id === editingId ? { ...data, id: editingId } : proj
      );
    } else {
      const newItem = { ...data, id: `proj-${Date.now()}` };
      updatedList = [newItem, ...currentList];
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cv-profile`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...infoUser, projects: updatedList  }),
    })
      .then(res => res.json())
      .then(resData => {
        setProjects(updatedList);

        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, projects: updatedList });
        }

        setIsModalOpen(false);
        setEditingId(null);
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id: string) => {
    const currentList = projects.length > 0 ? projects : (infoUser?.projects || []);
    const updatedList = currentList.filter(proj => proj.id !== id);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cv-profile`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...infoUser, projects: updatedList  }),
    })
      .then(res => res.json())
      .then(data => {
        setProjects(updatedList);
        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, projects: updatedList });
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      {displayProjects.length > 0 ? (
        <div className="bg-white border border-[#DEDEDE] rounded-[12px] p-5 group hover:border-[#0D8EFF] hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[18px] font-[700] text-[#121212]">Dự án nổi bật</h3>
            <button
              onClick={() => {
                setEditingId(null);
                setIsModalOpen(true);
              }}
              className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
              title="Thêm dự án"
            >
              <CiCirclePlus className="text-[24px]" />
            </button>
          </div>

          <div className="mt-2">
            {displayProjects.map((project, index) => (
              <div key={project.id || index} className="border-t border-[#F0F0F0] py-4 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-[16px] font-[700] text-[#121212]">{project.name}</h4>
                    <p className="text-[14px] text-[#757575] mt-1">
                      {project.fromMonth}/{project.fromYear}
                      {project.toMonth && project.toYear ? ` - ${project.toMonth}/${project.toYear}` : (project.isCurrentlyWorking ? ' - Hiện tại' : '')}
                    </p>
                    {project.description && (
                      <div
                        className="text-[14px] text-[#222222] mt-3 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                      />
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[14px] text-[#4f46e5] hover:text-[#4338ca] hover:underline mt-4 font-[500]"
                      >
                        Xem dự án <FiExternalLink className="text-[16px]" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <button
                      className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
                      title="Chỉnh sửa"
                      onClick={() => {
                        setEditingId(project.id);
                        setIsModalOpen(true);
                      }}
                    >
                      <CiEdit className="text-[24px]" />
                    </button>
                    <button
                      className="text-[#444444] hover:text-[#111111] transition-colors"
                      title="Xoá"
                      onClick={() => handleDelete(project.id)}
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
          title="Dự án nổi bật"
          subtitle="Giới thiệu dự án nổi bật của bạn"
          icon={
            <div className="w-[44px] h-[44px] bg-[#F0F7FF] rounded-[10px] flex items-center justify-center">
              <GoProjectRoadmap className="text-[24px] text-[#80BFFF]" />
            </div>
          }
          onAdd={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
        />
      )}

      <ProjectsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        initialValues={editingId !== null ? displayProjects.find(p => p.id === editingId) : undefined}
        onSave={handleSave}
      />
    </>
  );
};
