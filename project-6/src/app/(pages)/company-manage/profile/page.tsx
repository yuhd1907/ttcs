import { Metadata } from "next";
import { CompanyProfileForm } from "@/app/(pages)/company-manage/profile/CompanyProfileForm";

export const metadata: Metadata = {
  title: "Trang thông tin công ty",
  description: "Mô tả trang thông tin công ty...",
};

const CompanyManageProfile = () => {
  return (
    <>
      {/* Section 9 */}
      <div className="mt-[60px] container mx-auto px-[16px]">
        <div className="border border-[#DEDEDE] border-[1px] p-[20px] rounded-[8px]">
          <h1 className="text-black text-[20px] font-[700]">
            Thông tin công ty
          </h1>
          <CompanyProfileForm />
        </div>
      </div>
      {/* End of Section 9 */}
    </>
  );
};

export default CompanyManageProfile;
