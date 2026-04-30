import Link from "next/link";
import { useRouter } from "next/navigation";
import { InfoUser } from "@/interface/user.interface";

export const MenuUser = ({ infoUser }: { infoUser: InfoUser }) => {
  const router = useRouter();

  const handleLogout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/user/login");
      });
  };

  return (
    <>
      <Link href={"#"} className={"flex items-center gap-x-[8px]"}>
        {infoUser.avatar ? (
          <img
            src={infoUser.avatar}
            alt={infoUser.username}
            className="rounded-full object-cover w-[32px] h-[32px]"
          />
        ) : (
          <span className="w-[32px] h-[32px] rounded-full bg-white/20 flex items-center justify-center text-white text-[14px] font-bold">
            {infoUser.username?.charAt(0)?.toUpperCase() || "U"}
          </span>
        )}
        {infoUser.username}
      </Link>
      <ul
        className={
          "absolute top-[100%] right-[8px] w-[210px]" +
          " bg-[#000071] hidden group-hover/sub-1:block z-[999]"
        }
      >
        <li
          className={
            "px-[16px] py-[10px] flex items-center" +
            " justify-between hover:bg-[#000096] relative group/sub-2"
          }
        >
          <Link href={"/user-manage/profile"}>Thông tin cá nhân</Link>
        </li>
        <li
          className={
            "px-[16px] py-[10px] flex items-center" +
            " justify-between hover:bg-[#000096] relative group/sub-2"
          }
        >
          <Link href={"/user-manage/cv/info"}>Quản lý Hồ sơ đính kèm</Link>
        </li>
        <li
          className={
            "px-[16px] py-[10px] flex items-center" +
            " justify-between hover:bg-[#000096] relative group/sub-2"
          }
        >
          <Link href={"/user-manage/cv/list"}>Quản lý CV đã gửi</Link>
        </li>
        <li
          className={
            "px-[16px] py-[10px] flex items-center" +
            " justify-between hover:bg-[#000096] relative cursor-pointer" +
            " group/sub-2"
          }
          onClick={handleLogout}
        >
          Đăng xuất
        </li>
      </ul>
    </>
  );
};
