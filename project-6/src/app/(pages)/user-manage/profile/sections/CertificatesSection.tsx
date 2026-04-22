"use client";

import { useState } from "react";
import { SectionCard } from "../components/SectionCard";
import { CertificateModal } from "../components/CertificateModal";
import { CiEdit, CiTrash, CiCirclePlus } from "react-icons/ci";
import { FiExternalLink } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";

import { InfoUser } from "@/interface/user.interface";

export const CertificatesSection = ({ infoUser, onUpdate }: { infoUser: InfoUser | null, onUpdate?: (data: InfoUser) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const displayCertificates = certificates.length > 0 ? certificates : (infoUser?.certificates || []);

  const handleSave = (data: any) => {
    const isEditing = editingId !== null;
    const currentList = certificates.length > 0 ? certificates : (infoUser?.certificates || []);

    let updatedList = [];
    if (isEditing) {
      updatedList = currentList.map(cert =>
        cert.id === editingId ? { ...data, id: editingId } : cert
      );
    } else {
      const newItem = { ...data, id: `cert-${Date.now()}` };
      updatedList = [newItem, ...currentList];
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cv-profile`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...infoUser, certificates: updatedList  }),
    })
      .then(res => res.json())
      .then(resData => {
        setCertificates(updatedList);

        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, certificates: updatedList });
        }

        setIsModalOpen(false);
        setEditingId(null);
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id: string) => {
    const currentList = certificates.length > 0 ? certificates : (infoUser?.certificates || []);
    const updatedList = currentList.filter(cert => cert.id !== id);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cv-profile`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...infoUser, certificates: updatedList  }),
    })
      .then(res => res.json())
      .then(data => {
        setCertificates(updatedList);
        if (infoUser && onUpdate) {
          onUpdate({ ...infoUser, certificates: updatedList });
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      {displayCertificates.length > 0 ? (
        <div className="bg-white border border-[#DEDEDE] rounded-[12px] p-5 group hover:border-[#0D8EFF] hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[18px] font-[700] text-[#121212]">Chứng chỉ</h3>
            <button
              onClick={() => {
                setEditingId(null);
                setIsModalOpen(true);
              }}
              className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
              title="Thêm chứng chỉ"
            >
              <CiCirclePlus className="text-[24px]" />
            </button>
          </div>

          <div className="mt-2">
            {displayCertificates.map((cert, index) => (
              <div key={cert.id || index} className="border-t border-[#F0F0F0] py-4 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-[16px] font-[700] text-[#121212]">{cert.name}</h4>
                    <p className="text-[14px] text-[#333333] mt-1">{cert.organization}</p>
                    <p className="text-[14px] text-[#757575] mt-1">
                      {cert.month}/{cert.year}
                    </p>
                    {cert.description && (
                      <div 
                        className="text-[14px] text-[#222222] mt-3 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: cert.description }}
                      />
                    )}
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[14px] text-[#4f46e5] hover:text-[#4338ca] hover:underline mt-4 font-[500]"
                      >
                        Xem chứng chỉ <FiExternalLink className="text-[16px]" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <button
                      className="text-[#0D8EFF] hover:text-[#0076E5] transition-colors"
                      title="Chỉnh sửa"
                      onClick={() => {
                        setEditingId(cert.id);
                        setIsModalOpen(true);
                      }}
                    >
                      <CiEdit className="text-[24px]" />
                    </button>
                    <button
                      className="text-[#444444] hover:text-[#111111] transition-colors"
                      title="Xoá"
                      onClick={() => handleDelete(cert.id)}
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
          title="Chứng chỉ"
          subtitle="Bổ sung chứng chỉ liên quan đến kỹ năng của bạn"
          icon={
            <div className="w-[44px] h-[44px] bg-[#F0F7FF] rounded-[10px] flex items-center justify-center">
              <TbCertificate className="text-[24px] text-[#80BFFF]" />
            </div>
          }
          onAdd={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
        />
      )}

      <CertificateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        initialValues={editingId !== null ? displayCertificates.find(c => c.id === editingId) : undefined}
        onSave={handleSave}
      />
    </>
  );
};
