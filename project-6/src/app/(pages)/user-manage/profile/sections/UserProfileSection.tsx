"use client";

import { InfoUser } from "@/interface/user.interface";
import { useState } from "react";
import Image from "next/image";
import { CiEdit, CiMail, CiCalendar, CiPhone } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { UserProfileModal } from "../components/UserProfileModal";

export const UserProfileSection = ({ infoUser, onUpdate }: { infoUser: InfoUser | null, onUpdate?: (data: InfoUser) => void }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!infoUser) return null;

  return (
    <>
      {/* ── Profile Header Card ── */}
      <div className="bg-white border border-[#DEDEDE] rounded-[12px] p-6 mb-4 relative">
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-5 right-5 text-[#0D8EFF] hover:text-[#0076E5] cursor-pointer transition-colors"
        >
          <CiEdit className="text-[25px]" />
        </button>

        <div className="flex items-center gap-5 mb-5">
          <div className="w-[72px] h-[72px] rounded-full bg-[#E6F3FF] flex items-center justify-center flex-shrink-0 overflow-hidden">
            {infoUser.avatar ? (
              <Image
                src={infoUser.avatar}
                alt={infoUser.username}
                width={72}
                height={72}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#B3D9FF" />
                <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#B3D9FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          <div>
            <h2 className="text-[22px] font-[700] text-[#121212] leading-tight">{infoUser.username}</h2>
            <p className="text-[14px] text-[#757575] mt-0.5">{infoUser.position || "Cập nhật chức danh"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <div className="flex items-center gap-2 text-[14px]">
            <CiMail className="text-[16px] text-[#BDBDBD]" />
            {infoUser.email ? (
              <span className="text-[#757575] truncate max-w-[180px]">{infoUser.email}</span>
            ) : (
              <span className="text-[#BDBDBD]">Email</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[14px]">
            <CiPhone className="text-[16px] text-[#BDBDBD]" />
            {infoUser.phone ? (
              <span className="text-[#757575]">{infoUser.phone}</span>
            ) : (
              <span className="text-[#BDBDBD]">Số điện thoại</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[14px]">
            <CiCalendar className="text-[16px] text-[#BDBDBD]" />
            {infoUser.birth_date ? (
              <span className="text-[#757575]">{infoUser.birth_date}</span>
            ) : (
              <span className="text-[#BDBDBD]">Ngày sinh</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[14px]">
            <IoPersonOutline className="text-[16px] text-[#BDBDBD]" />
            {infoUser.gender ? <span className="text-[#757575]">
              {infoUser.gender === "male" ? "Nam" : infoUser.gender === "female" ? "Nữ" : "Khác"}</span>
              : <span className="text-[#BDBDBD]">Giới tính</span>}
          </div>

          <div className="flex items-center gap-2 text-[14px]">
            <GoLocation className="text-[16px] text-[#BDBDBD]" />
            {infoUser.city ? (
              <span className="text-[#757575]">
                {infoUser.city}{infoUser.address ? `, ${infoUser.address}` : ''}
              </span>
            ) : (
              <span className="text-[#BDBDBD]">Địa chỉ hiện tại</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[14px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#BDBDBD] flex-shrink-0">
               <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {infoUser.personal_link ? (
              <a href={infoUser.personal_link} target="_blank" rel="noopener noreferrer" className="text-[#0D8EFF] hover:underline truncate max-w-[180px]">
                Link cá nhân
              </a>
            ) : (
              <span className="text-[#BDBDBD]">Link cá nhân</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[14px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#BDBDBD] flex-shrink-0">
              <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {infoUser.cv_url ? (
              <a href={infoUser.cv_url} target="_blank" rel="noopener noreferrer" className="text-[#28a745] hover:underline truncate max-w-[180px] font-medium">
                Xem CV đã đính kèm
              </a>
            ) : (
              <span className="text-[#BDBDBD]">Chưa đính kèm CV</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Edit Modal ── */}
      <UserProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        infoUser={infoUser}
        onUpdate={onUpdate}
      />
    </>
  );
};
