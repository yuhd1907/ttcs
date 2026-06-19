import { useState, useEffect } from "react";
import { Company } from "@/interface/company.interface";

export const useCompanies = () => {
  const [companyList, setCompanyList] = useState<Company[]>([]);

  useEffect(() => {
    // TODO: bật lại khi backend có GET /api/public/company/list (xem project-6-backend/BACKEND_TODO.md mục 1)
    // const fetchCompanies = async () => {
    //   const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    //   const response = await fetch(`${backendUrl}/api/public/company/list`, {
    //     credentials: "include",
    //   });
    //   const data = await response.json();
    //   setCompanyList(data);
    // };
    //
    // fetchCompanies();
  }, []);

  return { companyList };
};
