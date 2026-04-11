import Link from "next/link";
import { useRouter } from "next/navigation";
import { InfoCompany } from "@/interface/user.interface";

export const MenuCompany = ({ infoCompany }: { infoCompany: InfoCompany }) => {
  const router = useRouter();

  const handleLogout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/company/login");
      });
  };

  return (
    <>
      <Link href={"#"} className={""}>
        {infoCompany!.companyName}
      </Link>
      <ul
        className={
          "absolute top-[100%] right-[8px] w-[200px]" +
          " bg-[#000071] hidden group-hover/sub-1:block z-[999]"
        }
      >
        <li
          className={
            "px-[16px] py-[10px] flex items-center" +
            " justify-between hover:bg-[#000096] relative group/sub-2"
          }
        >
          <Link href={"/company-manage/profile"}>Thông tin công ty</Link>
        </li>
        <li
          className={
            "px-[16px] py-[10px] flex items-center" +
            " justify-between hover:bg-[#000096] relative group/sub-2"
          }
        >
          <Link href={"/company-manage/job/list"}>Quản lý việc làm</Link>
        </li>
        <li
          className={
            "px-[16px] py-[10px] flex items-center" +
            " justify-between hover:bg-[#000096] relative group/sub-2"
          }
        >
          <Link href={"/company-manage/cv/list"}>Quản lý CV</Link>
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
