import { useState, useEffect } from "react";
import { masterDataService } from "@/services/masterDataService";
import { City } from "@/interface/location.interface";
import { Skill } from "@/interface/skill.interface";
import { JobCategory } from "@/interface/specialization.interface";

export interface JobField {
  id?: string;
  name: string;
  slug: string;
}

export const useMasterData = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [fields, setFields] = useState<JobField[]>([]);
  const [specializations, setSpecializations] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await masterDataService.getAllMasterData();

        if (result.success) {
          setCities(result.cities || []);
          setSkills(result.skills || []);
          setFields(result.fields || []);
          setSpecializations(result.specializations || []);
        } else {
          setError(result.error || "Không thể tải dữ liệu");
        }
      } catch (err) {
        console.error("Error in useMasterData:", err);
        setError("Lỗi khi tải dữ liệu tĩnh");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    cities,
    skills,
    fields,
    specializations,
    loading,
    error,
    isEmpty: !cities.length && !skills.length && !fields.length && !specializations.length,
  };
};

