"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { PiSuitcase } from "react-icons/pi";
import { GrPerformance } from "react-icons/gr";
import { BsBuilding } from "react-icons/bs";
import { workingFormMap } from "@/config/workingForm";

interface JobDetail {
  _id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  name: string;
  minSalary: number;
  maxSalary: number;
  level: string;
  workingForm: string;
  specialization: string[];
  technologies: string[];
  fields: string[];
  description: string;
  images: string[];
  address: string;
}

const JobContainer = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/job/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Không tìm thấy bài tuyển dụng");
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-gray-500 text-lg">
        Đang tải...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-red-500 text-lg mb-4">{error || "Không tìm thấy bài tuyển dụng"}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-[#0088FF] text-white rounded-[4px]"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="mt-[30px] mb-[60px]">
      <div className="container mx-auto px-[16px]">
        <div className="flex flex-wrap lg:gap-x-[20px] gap-y-[20px]">

          {/* ---- Left ---- */}
          <div className="lg:w-[65%] w-[100%]">

            {/* Part 1 – Tổng quan */}
            <div className="border border-[#DEDEDE] rounded-[8px] p-[24px]">
              <h1 className="text-[#121212] sm:text-[28px] text-[22px] font-[700]">
                {job.name}
              </h1>
              <Link
                href={`/company/detail/${job.companyId}`}
                className="mt-[8px] block text-[#0088FF] text-[16px] font-[500] hover:underline"
              >
                {job.companyName}
              </Link>

              {/* Lương */}
              <div className="flex items-center gap-[8px] text-[#0ab305] mt-[12px]">
                <AiOutlineDollarCircle className="text-[20px]" />
                <span className="font-[500] text-[16px]">
                  {job.minSalary?.toLocaleString("vi-VN")} -{" "}
                  {job.maxSalary?.toLocaleString("vi-VN")} USD
                </span>
              </div>

              {/* Ứng tuyển */}
              <div className="mt-[20px]">
                <button className="w-full h-[48px] rounded-[4px] text-white text-[16px] font-[700] bg-[#0088FF] hover:bg-[#006ECC] transition-colors">
                  Ứng tuyển ngay
                </button>
              </div>

              {/* Ảnh công ty */}
              {job.images && job.images.length > 0 && (
                <div className="grid grid-cols-3 gap-[12px] mt-[20px]">
                  {job.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="aspect-[232/145] object-cover rounded-[4px]"
                    />
                  ))}
                </div>
              )}

              {/* Thông tin phụ */}
              <div className="flex flex-col gap-[8px] mt-[20px] pb-[18px] border-b border-dashed border-[#DEDEDE]">
                {job.address && (
                  <div className="flex items-center gap-[8px] text-[15px]">
                    <IoLocationOutline className="text-[#A6A6A6] shrink-0" />
                    <span>{job.address}</span>
                  </div>
                )}
                {job.workingForm && (
                  <div className="flex items-center gap-[8px] text-[15px]">
                    <GrPerformance className="text-[#A6A6A6] shrink-0" />
                    <span>{workingFormMap.get(job.workingForm) || job.workingForm}</span>
                  </div>
                )}
                {job.level && (
                  <div className="flex items-center gap-[8px] text-[15px]">
                    <PiSuitcase className="text-[#A6A6A6] shrink-0" />
                    <span>Cấp bậc: {job.level}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="mt-[20px] flex flex-col gap-y-[12px]">
                {job.technologies && job.technologies.length > 0 && (
                  <div className="flex items-start gap-[12px]">
                    <span className="text-[#121212] text-[14px] shrink-0 mt-[4px]">Kỹ năng:</span>
                    <div className="flex flex-wrap gap-[8px]">
                      {job.technologies.map((tech) => (
                        <Link
                          key={tech}
                          href={`/search?skill=${encodeURIComponent(tech)}`}
                          className="border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] text-[13px] text-[#414042] hover:border-[#0088FF] hover:text-[#0088FF] transition-colors"
                        >
                          {tech}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {job.specialization && job.specialization.length > 0 && (
                  <div className="flex items-center gap-[12px]">
                    <span className="text-[#121212] text-[14px] shrink-0">Chuyên môn:</span>
                    <div className="flex flex-wrap gap-[8px]">
                      {job.specialization.map((spec) => (
                        <Link
                          key={spec}
                          href={`/search?specialization=${encodeURIComponent(spec)}`}
                          className="border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] text-[13px] text-[#414042] hover:border-[#0088FF] hover:text-[#0088FF] transition-colors"
                        >
                          {spec}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {job.fields && job.fields.length > 0 && (
                  <div className="flex items-center gap-[12px]">
                    <span className="text-[#121212] text-[14px] shrink-0">Lĩnh vực:</span>
                    <div className="flex flex-wrap gap-[8px]">
                      {job.fields.map((f) => (
                        <span
                          key={f}
                          className="border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] text-[13px] text-[#414042] bg-[#F7F7F7]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Part 2 – Mô tả */}
            <div className="mt-[20px] border border-[#DEDEDE] rounded-[8px] p-[24px]">
              <h2 className="text-[20px] font-[700] mb-[16px]">Mô tả công việc</h2>
              <div
                className="job-description prose max-w-none text-[15px] text-[#414042] leading-[1.7]"
                dangerouslySetInnerHTML={{ __html: job.description || "" }}
              />
            </div>
          </div>

          {/* ---- Right – Thông tin công ty ---- */}
          <div className="lg:w-[32%] w-[100%]">
            <div className="bg-white border border-[#DEDEDE] rounded-[8px] p-[20px] sticky top-[80px]">
              <div className="flex gap-[12px] items-center">
                {job.companyLogo ? (
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="w-[64px] h-[64px] object-contain rounded-[4px] border border-[#DEDEDE]"
                  />
                ) : (
                  <div className="w-[64px] h-[64px] bg-[#F0F4F8] rounded-[4px] flex items-center justify-center">
                    <BsBuilding className="text-[28px] text-[#A6A6A6]" />
                  </div>
                )}
                <div>
                  <Link
                    href={`/company/detail/${job.companyId}`}
                    className="text-[#121212] text-[16px] font-[700] hover:text-[#0088FF]"
                  >
                    {job.companyName}
                  </Link>
                </div>
              </div>

              <div className="mt-[16px] flex flex-col gap-[0px]">
                {job.address && (
                  <div className="py-[10px] flex justify-between items-center border-b border-dashed border-[#DEDEDE]">
                    <div className="text-[#A6A6A6] text-[14px]">Địa chỉ</div>
                    <div className="text-[14px] text-right max-w-[60%]">{job.address}</div>
                  </div>
                )}
                {job.workingForm && (
                  <div className="py-[10px] flex justify-between items-center border-b border-dashed border-[#DEDEDE]">
                    <div className="text-[#A6A6A6] text-[14px]">Hình thức</div>
                    <div className="text-[14px]">{workingFormMap.get(job.workingForm) || job.workingForm}</div>
                  </div>
                )}
                {job.level && (
                  <div className="py-[10px] flex justify-between items-center">
                    <div className="text-[#A6A6A6] text-[14px]">Cấp bậc</div>
                    <div className="text-[14px]">{job.level}</div>
                  </div>
                )}
              </div>

              <Link
                href={`/company/detail/${job.companyId}`}
                className="mt-[16px] block text-center py-[10px] border border-[#0088FF] text-[#0088FF] rounded-[4px] text-[14px] font-[500] hover:bg-[#0088FF] hover:text-white transition-colors"
              >
                Xem trang công ty
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobContainer;