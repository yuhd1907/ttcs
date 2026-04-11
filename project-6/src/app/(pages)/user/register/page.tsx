import { Metadata } from "next";
import { RegisterForm } from "@/app/(pages)/user/register/RegisterForm";

export const metadata: Metadata = {
  title: "Đăng ký (Ứng viên)",
  description: "Mô tả trang đằng ký dàng cho ứng viên",
};

const UserRegister = () => {
  return (
    <>
      {/* Section 15 */}
      <div className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] border-[1px] rounded-[8px] px-[20px] py-[50px] max-w-[602px] mx-auto">
            <h1 className="text-black text-[20px] font-[700] text-center">
              Đăng ký (Ứng viên)
            </h1>
            <RegisterForm />
          </div>
        </div>
      </div>
      {/* End of Section 15 */}
    </>
  );
};

export default UserRegister;
