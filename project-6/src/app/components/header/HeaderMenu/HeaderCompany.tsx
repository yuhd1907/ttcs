import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";

export const HeaderCompany = () => {
  return (
    <>
      <li className="inline-flex lg:w-auto w-full lg:justify-start justify-between lg:p-0 p-[10px] gap-x-[8px] items-center relative text-[16px] text-white font-[600] group/sub-4">
        <Link
          href="#"
          className="text-[#FFFFFF] sm:text-[16px] text-[12px] font-[600] capitalize"
        >
          Nhà tuyển dụng
        </Link>
        <FaAngleDown className="text-[#FFFFFF] text-[16px]" />
        <ul className="absolute top-[100%] left-[0] w-[260px] rounded-[4px] bg-[#000065] hidden group-hover/sub-4:block z-[999]">
          <li className="sm:text-[16px] text-[12px] py-[10px] px-[16px] rounded-[4px] bg-[#000065] flex items-center justify-between hover:bg-[#000096]">
            <Link href={"/company/login"}>Đăng Nhập</Link>
          </li>
          <li className=" sm:text-[16px] text-[12px] py-[10px] px-[16px] rounded-[4px] bg-[#000065] flex items-center justify-between hover:bg-[#000096]">
            <Link href={"/company/register"}>Đăng Ký </Link>
          </li>
        </ul>
      </li>
    </>
  );
};
