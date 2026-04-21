import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "Thông tin cá nhân",
  description: "Quản lý thông tin cá nhân và CV của bạn.",
};

const UserManageProfile = () => {
  return <ProfileClient />;
};

export default UserManageProfile;
