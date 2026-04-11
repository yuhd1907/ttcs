"use client";

import Link from "next/link";
import { FaUserTie, FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { ChangeEvent, useEffect, useState } from "react";
import { workingFormMap } from "@/config/workingForm";
import DeleteButton from "@/app/components/button/DeleteButton";
import { capitalizeHelpter } from "@/helper/Capitalize.helpter";
import { Job } from "@/interface/job.interface";

export const JobList = () => {
  const [jobList, setJobList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageValue = event.target.value;
    setPage(parseInt(pageValue));
  };

  const handleDelete = (JobID: string) => {
    setJobList((prevList) => prevList.filter((job: Job) => job._id != JobID));
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/list?page=${page}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "success") {
          setJobList(data.jobList);
          setTotalPages(data.totalPages);
        }
      });
  }, [page]);

  return (
    <>
      {/* Job List */}
      <div className="container mx-auto px-[16px] mt-[20px] grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
        {jobList.map((job: Job) => {
          return (
            <div
              key={job._id}
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col"
              style={{
                background:
                  "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)",
              }}
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-[0] left-[0] w-[100%] h-auto"
              />
              <div className="mt-[20px] flex-1">
                <div
                  className={
                    "relative mt-[20px] w-[116px] h-[116px] bg-white" +
                    " mx-auto rounded-[8px] p-[10px]"
                  }
                  style={{ boxShadow: "0px 4px 24px 0px #0000001F" }}
                >
                  <img
                    src={job.companyLogo}
                    alt={job.name}
                    className={"w-[100%] h-[100%] object-contain"}
                  />
                </div>
                <h3 className="text-[18px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] mt-[10px]">
                  {job.name}
                </h3>
                <div className="mt-[12px] text-[16px] text-[#0088FF] font-[600] text-center">
                  {job.minSalary}$ - {job.maxSalary}$
                </div>
                <div className="flex flex-col gap-[8px] mt-[6px]">
                  <div className="flex justify-center items-center gap-[8px]">
                    <FaUserTie className="md:text-[14px] text-[12px]" />
                    <span className="text-[14px] text-[#121212] font-[400]">
                      {capitalizeHelpter(job.level)}
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-[8px]">
                    <FaBriefcase className="text-[14px]" />
                    <span className="text-[14px] text-[#121212] font-[400]">
                      {workingFormMap.get(job.workingForm)}
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-[8px]">
                    <FaLocationDot className="text-[14px]" />
                    <span className="text-[14px] text-[#121212] font-[400]">
                      {job.address}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[8px] px-[8px] mt-[13px]">
                {job.technologies.map((technology: string) => (
                  <span
                    key={technology}
                    className="border border-[1px] border-[#DEDEDE] rounded-[20px] px-[16px] py-[6px] text-[12px] text-[#414042] font-[400]"
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <div className="my-[20px] flex justify-center gap-[12px]">
                <Link
                  href={`/company-manage/job/edit/${job._id}`}
                  className="flex items-center h-[34px] px-[20px] bg-[#FFB200] rounded-[4px] text-[#000000] text-[14px] font-[400]"
                >
                  Sửa
                </Link>
                <DeleteButton
                  api={`${process.env.NEXT_PUBLIC_API_URL}/company/job/delete/${job._id}`}
                  id={job._id}
                  onDeleteSuccess={handleDelete}
                />
              </div>
            </div>
          );
        })}
      </div>
      {/*End of Job List*/}

      {/* Pagination */}
      <div className="mt-[30px] container mx-auto px-[16px]">
        <select
          name=""
          id=""
          value={page}
          onChange={handleChange}
          className="h-[44px] border border-[1px] border-[#DEDEDE] rounded-[8px] px-[18px]"
        >
          {Array(totalPages)
            .fill("")
            .map((item, index) => (
              <option value={index + 1} key={index + 1}>
                Trang {index + 1}
              </option>
            ))}
        </select>
      </div>
      {/* End of Pagination */}
    </>
  );
};
