import { useState, useEffect } from "react";
import { Skill } from "@/interface/skill.interface";

export const useSkills = () => {
  const [skillList, setSkillList] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Thử sử dụng backend API trước, nếu không được thì sử dụng local JSON server
    const fetchSkills = async () => {
      try {
        // Thử backend API đầu tiên
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const response = await fetch(`${backendUrl}/api/public/master-data/skills`);

        if (response.ok) {
          const data = await response.json();
          setSkillList(data);
        } else {
          throw new Error("Backend API failed");
        }
      } catch (err) {
        try {
          // Fallback to local JSON server
          const response = await fetch(`http://localhost:5000/skills/list`);
          const data: { skillList: Skill[] } = await response.json();
          setSkillList(data.skillList || []);
        } catch (fallbackErr) {
          console.error("Error fetching skills:", fallbackErr);
          setError("Không thể tải danh sách kỹ năng");
          setSkillList([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skillList, loading, error };
};
