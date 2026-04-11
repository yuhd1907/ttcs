import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";

export const HeaderTopCompany = () => {
  return (
    <>
      <li className="inline-flex lg:w-auto w-full lg:justify-start justify-between lg:p-0 p-[10px] gap-x-[8px] items-center relative text-[#FFFFFF] text-[16px] font-[600] group/sub-3">
        <Link href="#" className="sm:text-[16px] text-[12px] capitalize">
          Top công ty IT
        </Link>
        <FaAngleDown className="text-[#FFFFFF] text-[16px]"></FaAngleDown>
        <ul className="absolute top-[100%] left-[0] w-[280px] rounded-[4px] bg-[#000065] hidden group-hover/sub-3:block z-[999]">
          <li className="sm:text-[16px] text-[12px] py-[10px] px-[16px] rounded-[4px] bg-[#000065] flex items-center justify-between hover:bg-[#000096]">
            FPT Software
          </li>
          <li className="sm:text-[16px] text-[12px] py-[10px] px-[16px] rounded-[4px] bg-[#000065] flex items-center justify-between hover:bg-[#000096]">
            Techcombank
          </li>
          <li className="sm:text-[16px] text-[12px] py-[10px] px-[16px] rounded-[4px] bg-[#000065] flex items-center justify-between hover:bg-[#000096]">
            MB Bank
          </li>
        </ul>
      </li>
    </>
  );
};
