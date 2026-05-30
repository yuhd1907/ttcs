import { useState, useEffect } from "react";
import { Province } from "@/interface/location.interface";

export const useProvinces = () => {
  const [provinceList, setProvinceList] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Thử sử dụng backend API trước, nếu không được thì sử dụng local JSON server
    const fetchProvinces = async () => {
      try {
        // Thử backend API đầu tiên
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const response = await fetch(`${backendUrl}/api/public/master-data/cities`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setProvinceList(data);
        } else {
          throw new Error("Backend API failed");
        }
      } catch (err) {
        try {
          // Fallback to local JSON server
          const response = await fetch(`http://localhost:5000/province/list`);
          const data = await response.json();
          setProvinceList(data.provinceList || []);
        } catch (fallbackErr) {
          console.error("Error fetching provinces:", fallbackErr);
          setError("Không thể tải danh sách tỉnh thành");
          setProvinceList([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  return { provinceList, loading, error };
};
