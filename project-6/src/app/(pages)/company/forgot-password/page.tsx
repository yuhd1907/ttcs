import { ForgotPasswordForm } from "./ForgotPasswordForm";

const CompanyForgotPassword = () => {
  return (
    <div className="mt-[60px]">
      <div className="container mx-auto px-[16px]">
        <>
          <div className="border border-[#DEDEDE] border-[1px] rounded-[8px] px-[20px] py-[50px] max-w-[602px] mx-auto">
            <h1 className="text-black text-[20px] font-[700] text-center">
              Quên mật khẩu (Nhà tuyển dụng)
            </h1>
            <span className={"block text-center mt-[15px] mb-[40px]"}>
              Vui lòng nhập email để tiếp tục
            </span>
            <ForgotPasswordForm />
          </div>
        </>
      </div>
    </div>
  );
};

export default CompanyForgotPassword;
