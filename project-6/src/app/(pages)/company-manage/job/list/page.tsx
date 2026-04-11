import Link from "next/link";
import { JobList } from "@/app/(pages)/company-manage/job/list/JobList";

export const metadata = {
  title: "Quản lý danh sách công việc",
  description: "Mô tả trang quản lý danh sách công viêc",
};

const CompanyManageJobList = () => {
  return (
    <>
      {/* Section 10 - Quản lý công việc dành cho HR */}
      {/* Title */}
      <div className="mt-[60px] container mx-auto px-[16px] flex sm:flex-row flex-col gap-y-[20px] justify-between">
        <h1 className="text-[#121212] text-[28px] font-[700]">
          Quản lý công việc
        </h1>
        <Link
          href={"/company-manage/job/create"}
          className="h-[34px] w-[107px] px-[20px] bg-[#0088FF] rounded-[4px] text-white text-[14px] font-[400] opacity-[.9] flex items-center hover:opacity-[1]"
        >
          Thêm mới
        </Link>
      </div>

      {/* List of jobs */}
      <JobList />
      {/* End of Section 10 */}
    </>
  );
};

export default CompanyManageJobList;
