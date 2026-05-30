import { useState, useEffect } from "react";
import { Company } from "@/interface/company.interface";

export const useCompanies = () => {
  const [companyList, setCompanyList] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${backendUrl}/api/public/company/list`, {
        credentials: "include",
      });
      const data = await response.json();
      setCompanyList(data);
    };

    fetchCompanies();
  }, []);

  return { companyList };
};
