import Link from "next/link";
import { FaUserTie } from "react-icons/fa";

export const CardCompanyItem = () => {
  return (
    <>
      <Link
        href="#"
        className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col bg-gradient-to-b from-[#F6F6F6] from-[2.38%] to-[#FFFFFF] to-[70.43%]"
      >
        <img
          src="/assets/images/item-bg.png"
          alt=""
          className="absolute top-0 left-0 w-full h-auto"
        />
        <div className="relative md:w-[160px] w-[125px] md:h-[160px] h-[125px] mx-auto md:mt-[32px] mt-[20px] bg-white rounded-[8px] px-[10px] )]">
          <img
            src="/assets/images/company-1.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="md:mt-[24px] mt-[16px] flex-1">
          <h3 className="md:text-[18px] text-[14px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
            LG Electronics Development Vietnam (LGEDV)
          </h3>
        </div>
        <div className="md:mt-[24px] mt-[16px] bg-[#F7F7F7] flex md:flex-row flex-col md:justify-between gap-y-[12px] items-center px-[15px] py-[12px]">
          <div className="md:text-[14px] text-[12px] text-[#414042] font-[400]">
            Ho Chi Minh
          </div>
          <div className="flex gap-[6px] items-center">
            <FaUserTie className="fa-solid fa-user-tie text-[#000096] md:text-[14px] text-[12px]" />
            <span className="md:text-[14px] text-[12px] text-[#121212] font-[400]">
              5 Việc làm
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};
