import { Metadata } from "next";
import { UserProfileForm } from "@/app/(pages)/user-manage/profile/UserProfileForm";

export const metadata: Metadata = {
  title: "Thông tin cá nhân",
  description: "Mô tả trang thông tin cá nhân...",
};

const UserManageProfile = () => {
  return (
    <>
      {/* Section 13 */}
      <div className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] border-[1px] rounded-[8px] p-[20px]">
            <h2 className="text-black text-[20px] font-[700]">
              Thông tin cá nhân
            </h2>
            <UserProfileForm />
          </div>
        </div>
      </div>
      {/* End of Section 13 */}
    </>
  );
};

export default UserManageProfile;
