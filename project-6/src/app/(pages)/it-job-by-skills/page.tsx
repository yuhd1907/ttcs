"use client";

import Link from "next/link";
import { useSkills } from "@/hooks/useSkills";
import { Skill } from "@/interface/skill.interface";

const ITJobBySkills = () => {
  const { skillList: skills } = useSkills();

  return (
    <>
      <div className="container mx-auto px-[16px]">
        <h1 className="text-[28px] font-bold border-b border-[#dedede] mt-[21px] pb-[16px]">
          Tìm việc làm IT theo kỹ năng
        </h1>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 mt-6">
          {skills.map((skill: Skill) => (
            <li key={skill.slug} className="text-[14px]">
              <Link
                href={`/search?skill=${encodeURIComponent(skill.name)}`}
                className="hover:underline flex items-center"
              >
                {skill.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ITJobBySkills;
