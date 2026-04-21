"use client";

import { useEffect, useState } from "react";
import { UserProfileSection } from "@/app/(pages)/user-manage/profile/sections/UserProfileSection";
import { CVBuilderSection } from "@/app/(pages)/user-manage/profile/CVBuilderSection";
import { ProfileSidebar } from "@/app/(pages)/user-manage/profile/ProfileSidebar";
import { InfoUser } from "@/interface/user.interface";

const ProfileClient = () => {
  const [infoUser, setInfoUser] = useState<InfoUser | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then(res => res.json())
      .then(data => {
        setInfoUser(data);
      })
  }, []);

  return (
    <div className="mt-[60px] mb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* ── Left column ── */}
          <div className="lg:w-[calc(65%-10px)] w-full flex flex-col gap-4">
            {/* Personal info card (with edit modal) */}
            <UserProfileSection infoUser={infoUser} onUpdate={setInfoUser} />

            {/* CV builder sections */}
            <CVBuilderSection infoUser={infoUser} onUpdate={setInfoUser} />
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
