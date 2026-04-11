import { LoginForm } from "@/app/(pages)/user/login/LoginForm";

// Trong layout.tsx hoặc page.tsx
export const metadata = {
  title: "Trang Đăng Nhập",
  description: "Đăng nhập ngay để tìm kiếm việc...",
};

const UserLogin = () => {
  return (
    <>
      {/* Section 15 */}
      <div className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] border-[1px] rounded-[8px] px-[20px] py-[50px] max-w-[602px] mx-auto">
            <h1 className="text-black text-[20px] font-[700] text-center">
              Đăng nhập (Ứng viên)
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
      {/* End of Section 15 */}
    </>
  );
};

export default UserLogin;
