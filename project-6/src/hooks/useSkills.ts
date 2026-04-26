import { useState, useEffect } from "react";
import { Skill } from "@/interface/skill.interface";

export const useSkills = () => {
  const [skillList, setSkillList] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${backendUrl}/api/public/master-data/skills`);
      const data = await response.json();
      setSkillList(data);
    };

    fetchSkills();
  }, []);

  return { skillList };
};
