import Link from "next/link";
import { PiSuitcase } from "react-icons/pi";
import { GrPerformance } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { workingFormMap } from "@/config/workingForm";

export const CardJobItem = (props: {
  item: any
}) => {
  const { item } = props;

  return (
    <>
      <Link href={`/job/detail/${item._id}`} className="">
        <div className="bg-[#F0F4F8] px-[12px] py-[8px] rounded-[8px] duration-300 )] h-full flex flex-col justify-between">
          <div>
            <div className="text-[14px] text-[#A6AEC5] font-[400]">
              {item.timeSince}
            </div>
            <div className="mt-[12px] text-[18px] font-[700] line-clamp-1">
              {item.title}
            </div>
            <div className="flex items-center gap-[12px] mt-[12px]">
              <div className="w-[48px] h-[48px] border border-[1px] border-[#DEDEDE] rounded-[4px] )]">
                <img
                  src={item.companyLogo}
                  alt={item.companyName}
                  className="w-full h-full object-contain"
                />
              </div>
              <span>{item.companyName}</span>
            </div>
            <div className="flex items-center gap-[12px] mt-[12px] text-[#0ab305] pb-[12px] border-b border-dashed border-[#DEDEDE]">
              <AiOutlineDollarCircle className="text-[20px] font-[500]" />
              <span className="font-[500] text-[16px]">
                {item.minSalary} - {item.maxSalary} USD
              </span>
            </div>
          </div>
          <div className="mt-[12px] flex flex-col gap-[4px]">
            <div className="flex items-center gap-[8px]">
              <PiSuitcase />
              <Link href={`/search?keyword=${encodeURIComponent(item.specialization)}`} className="hover:text-[#0088FF]">{item.specialization}</Link>
            </div>
            <div className="flex items-center gap-[8px]">
              <GrPerformance />
              <span>{workingFormMap.get(item.workingForm) || item.workingForm}</span>
            </div>
            <div className="flex items-center gap-[8px]">
              <IoLocationOutline />
              <span>{item.location}</span>
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-[8px] mt-[12px]">
              {item.technologies.map((tech: string) => (
                <div className="flex items-center justify-center border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] hover:border-black">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
