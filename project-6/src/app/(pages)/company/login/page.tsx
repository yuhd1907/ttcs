import { Metadata } from "next";
import { LoginForm } from "@/app/(pages)/company/login/LoginForm";

export const metadata: Metadata = {
  title: "Trang đăng nhập (Công ty)",
  description: "Mô tả cho trang đăng nhập của công ty",
};

const CompanyLogin = () => {
  return (
    <>
      {/* Section 15 */}
      <div className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] border-[1px] rounded-[8px] px-[20px] py-[50px] max-w-[602px] mx-auto">
            <h1 className="text-black text-[20px] font-[700] text-center">
              Đăng nhập (Nhà tuyển dụng)
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
      {/* End of Section 15 */}
    </>
  );
};

export default CompanyLogin;
