import Link from "next/link";
import { JobEdittingForm } from "@/app/(pages)/company-manage/job/edit/[id]/JobEdittingForm";

export const metadata = {
  title: "Chỉnh sửa công việc",
  description: "Mô tả trang chỉnh sửa công việc",
};

const CompanyManageJobCreate = () => {
  return (
    <>
      {/* Section 10 */}
      <div className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] border-[1px] p-[20px] rounded-[8px]">
            <div className="flex sm:flex-row flex-col justify-between items-center gap-y-[20px]">
              <h1 className="text-black text-[20px] font-[700]">
                Chỉnh sửa công việc
              </h1>
              <Link
                href="/company-manage/job/list"
                className="text-[#0088FF] text-[14px] font-[400] underline"
              >
                Quay lại danh sách
              </Link>
            </div>
            <div className="mt-[20px]">
              <JobEdittingForm />
            </div>
          </div>
        </div>
      </div>
      {/* End of Section 10 */}
    </>
  );
};

export default CompanyManageJobCreate;
