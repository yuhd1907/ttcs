"use client";

import SearchFilters from "@/app/(pages)/search/SearchFilters";
import { FilterValues } from "@/app/(pages)/search/SearchFilters";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CardJobItem } from "@/app/components/card/CardJobItem";

export const SearchContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [jobList, setJobList] = useState([]);
  const filterValuesRef = useRef<FilterValues>({
    levels: [],
    workTypes: [],
    salaryRange: null,
    jobFields: [],
  });

  const skill = searchParams.get("skill") || "";
  const province = searchParams.get("province") || "";
  const keyword = searchParams.get("keyword") || "";
  const specialization = searchParams.get("specialization") || "";
  const companyName = searchParams.get("companyName") || "";
  const level = searchParams.get("level") || "";
  const workType = searchParams.get("workType") || "";
  const salaryMin = searchParams.get("salaryMin") || "";
  const salaryMax = searchParams.get("salaryMax") || "";
  const jobField = searchParams.get("jobField") || "";

  useEffect(() => {
    const params = new URLSearchParams();
    if (skill) params.set("skill", skill);
    if (province) params.set("province", province);
    if (keyword) params.set("keyword", keyword);
    if (specialization) params.set("specialization", specialization);
    if (companyName) params.set("companyName", companyName);
    if (level) params.set("level", level);
    if (workType) params.set("workType", workType);
    if (salaryMin) params.set("salaryMin", salaryMin);
    if (salaryMax) params.set("salaryMax", salaryMax);
    if (jobField) params.set("jobField", jobField);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/job/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setJobList(data.jobList));
  }, [skill, province, keyword, specialization, companyName, level, workType, salaryMin, salaryMax, jobField]);

  const handleFilterChange = (values: FilterValues) => {
    filterValuesRef.current = values;
  };

  const handleApply = () => {
    const filters = filterValuesRef.current;
    const params = new URLSearchParams();

    if (skill) params.set("skill", skill);
    if (province) params.set("province", province);
    if (keyword) params.set("keyword", keyword);
    if (specialization) params.set("specialization", specialization);
    if (companyName) params.set("companyName", companyName);
    if (filters.levels.length > 0) params.set("level", filters.levels.join(","));
    if (filters.workTypes.length > 0) params.set("workType", filters.workTypes.join(","));
    if (filters.salaryRange) {
      params.set("salaryMin", String(filters.salaryRange[0]));
      params.set("salaryMax", String(filters.salaryRange[1]));
    }
    if (filters.jobFields.length > 0) params.set("jobField", filters.jobFields.join(","));

    router.push(`/search?${params.toString()}`);
  };

  return (
    <>
      <section className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          {/* All of finding result */}
          <h2 className="text-[28px] text-[#121212] font-[700]">
            {`${jobList.length} việc làm `}
            <span className="text-[#0088FF]">
              {`${skill || specialization || companyName || keyword} `}
            </span>
            {province && <span className="">tại {province}</span>}
          </h2>

          {/* Filter */}
          <div
            className="bg-white mt-[30px] w-[100%] px-[20px] py-[10px] rounded-[8px]"
            style={{
              boxShadow: "0px 4px 24px 0px #0000001F",
            }}
          >
            <div className="flex items-center justify-between">
              <SearchFilters onChange={handleFilterChange} />
              <button
                onClick={handleApply}
                className="bg-[#0088FF] text-white px-[24px] py-[10px] rounded-[8px] font-[600] text-[14px] hover:bg-[#006ECC] transition-colors whitespace-nowrap cursor-pointer"
              >
                Áp dụng
              </button>
            </div>
          </div>

          {/* List of jobs */}
          <div className="grid lg:grid-cols-2 grid-cols-1 mt-[30px] gap-[20px]">
            {jobList.map((job: any) => (
              <CardJobItem key={job._id} item={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};