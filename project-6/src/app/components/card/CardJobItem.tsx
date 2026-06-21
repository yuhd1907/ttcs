import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiSuitcase } from "react-icons/pi";
import { GrPerformance } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { workingFormMap } from "@/config/workingForm";
import { FiCheckSquare } from "react-icons/fi";

export const CardJobItem = (props: {
  item: any
}) => {
  const { item } = props;
  const router = useRouter();

  const specializationText = Array.isArray(item.specialization)
    ? item.specialization[0]
    : item.specialization;

  return (
    <>
      <Link href={`/job/detail/${item._id}`} className="">
        <div className="bg-[#F0F4F8] px-[12px] py-[8px] rounded-[8px] duration-300 h-full flex flex-col justify-between">
          <div>
            <div className="text-[14px] text-[#A6AEC5] font-[400]">
              {item.timeSince}
            </div>
            <div className="mt-[12px] text-[18px] font-[700] line-clamp-1">
              {item.name || item.title}
            </div>
            {typeof item.applicantCount !== 'undefined' && (
              <div className="mt-[4px] text-[13px] font-[600] text-[#0088FF]">
                Số lượng ứng tuyển: {item.applicantCount}
              </div>
            )}
            <div 
              className="flex items-center gap-[12px] mt-[12px] cursor-pointer hover:text-[#0088FF] transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (item.companyId) {
                  router.push(`/company/detail/${item.companyId}`);
                }
              }}
            >
              <div className="w-[48px] h-[48px] border border-[1px] border-[#DEDEDE] rounded-[4px] shrink-0">
                <img
                  src={item.companyLogo}
                  alt={item.companyName}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-[500] line-clamp-1">{item.companyName}</span>
            </div>
            <div className="flex items-center gap-[12px] mt-[12px] text-[#0ab305] pb-[12px] border-b border-dashed border-[#DEDEDE]">
              <AiOutlineDollarCircle className="text-[20px] font-[500]" />
              <span className="font-[500] text-[16px]">
                {item.minSalary} - {item.maxSalary} USD
              </span>
            </div>
          </div>
          <div className="mt-[12px] flex flex-col gap-[4px]">
            {item.isInternship && (
              <div className="flex items-center gap-[8px]">
                <FiCheckSquare />
                <span>Chấp nhận intern</span>
              </div>
            )}
            <div className="flex items-center gap-[8px]">
              <PiSuitcase />
              {/* Dùng span + onClick thay vì Link lồng bên trong Link để tránh lỗi <a> nested <a> */}
              <span
                className="hover:text-[#0088FF] cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/search?keyword=${encodeURIComponent(specializationText || "")}`);
                }}
              >
                {specializationText}
              </span>
            </div>
            {item.isInternship ? (
              <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[4px] text-[14px]">
                <div className="flex items-center gap-[8px]">
                  <GrPerformance />
                  <span>
                    {workingFormMap.get(item.workingForm) || item.workingForm}
                  </span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoLocationOutline />
                  <span>{item.address || item.location}</span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-[8px]">
                  <GrPerformance />
                  <span>
                    {workingFormMap.get(item.workingForm) || item.workingForm}
                  </span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoLocationOutline />
                  <span>{item.address || item.location}</span>
                </div>
              </>
            )}
            <div className="flex flex-1 flex-wrap items-center gap-[8px] mt-[12px]">
              {(item.technologies || []).map((tech: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-center border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] hover:border-black"
                >
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
