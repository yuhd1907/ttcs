import { useState, useEffect } from "react";
import { FieldOption } from "@/interface/field.interface";

export const useJobFields = () => {
  const [jobFields, setJobFields] = useState<FieldOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobFields = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${backendUrl}/api/public/master-data/fields`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setJobFields(data);
        }
      } catch (error) {
        console.error("Error fetching job fields:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobFields();
  }, []);

  return { jobFields, isLoading };
};
