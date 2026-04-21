"use client";

import { IntroSection } from "./sections/IntroSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { SkillsSection } from "./sections/SkillsSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { CertificatesSection } from "./sections/CertificatesSection";
import { AwardsSection } from "./sections/AwardsSection";

import { InfoUser } from "@/interface/user.interface";

export const CVBuilderSection = (
  { infoUser, onUpdate }:
    {
      infoUser: InfoUser | null,
      onUpdate?: (data: InfoUser) => void
    }
) => {
  return (
    <div className="flex flex-col gap-3">
      <IntroSection infoUser={infoUser} onUpdate={onUpdate} />
      <EducationSection infoUser={infoUser} onUpdate={onUpdate} />
      <ExperienceSection infoUser={infoUser} onUpdate={onUpdate} />
      <SkillsSection infoUser={infoUser} onUpdate={onUpdate} />
      <LanguagesSection infoUser={infoUser} onUpdate={onUpdate} />
      <ProjectsSection infoUser={infoUser} onUpdate={onUpdate} />
      <CertificatesSection infoUser={infoUser} onUpdate={onUpdate} />
      <AwardsSection infoUser={infoUser} onUpdate={onUpdate} />
    </div>
  );
};
