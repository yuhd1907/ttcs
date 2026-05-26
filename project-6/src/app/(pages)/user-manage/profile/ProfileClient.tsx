"use client";

import { useEffect, useState } from "react";
import { UserProfileSection } from "@/app/(pages)/user-manage/profile/sections/UserProfileSection";
import { CVBuilderSection } from "@/app/(pages)/user-manage/profile/CVBuilderSection";
import { ProfileSidebar } from "@/app/(pages)/user-manage/profile/ProfileSidebar";
import { InfoUser } from "@/interface/user.interface";

import { Toaster } from "sonner";

const ProfileClient = () => {
  const [infoUser, setInfoUser] = useState<InfoUser | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
      credentials: "include",
    })
      .then(async res => {
        const text = await res.text();
        if (!text) return null;
        try { return JSON.parse(text); } catch { return null; }
      })
      .then(data => {
        if (data?.code === 'success' && data.infoUser) {
          setInfoUser(data.infoUser);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-[60px] mb-12">
      <Toaster richColors position="top-right" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* ── Left column ── */}
          <div className="lg:w-[calc(65%-10px)] w-full flex flex-col gap-4">
            {/* Personal info card (with edit modal) */}
            <UserProfileSection 
              infoUser={infoUser} 
              onUpdate={(data) => {
                setInfoUser(data);
                window.dispatchEvent(new Event("userUpdate"));
              }} 
            />

            {/* CV builder sections */}
            <CVBuilderSection 
              infoUser={infoUser} 
              onUpdate={(data) => {
                setInfoUser(data);
                window.dispatchEvent(new Event("userUpdate"));
              }} 
            />
          </div>

          {/* ── Right sidebar ── */}
          <div className="lg:w-[calc(35%-10px)] w-full flex-shrink-0">
            <ProfileSidebar infoUser={infoUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;
