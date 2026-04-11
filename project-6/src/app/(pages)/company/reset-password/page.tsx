import { ResetPasswordForm } from "@/app/(pages)/company/reset-password/ResetPasswordForm";

const CompanyResetPassword = () => {
  return (
    <>
      <div className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] border-[1px] rounded-[8px] px-[20px] py-[50px] max-w-[602px] mx-auto">
            <h1 className="text-black text-[20px] font-[700] text-center">
              Đổi mật khẩu (Nhà tuyển dụng)
            </h1>
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyResetPassword;
