"use client";

import Link from "next/link";
import { GrPerformance } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { PiSuitcase } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Job } from "@/interface/job.interface";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const jobContainer = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [job, setJob] = useState<Job>();
  const [sameJobs, setSameJobs] = useState<Job[]>([]);

  const { user, token } = useAuth();
  const [matchAnalysis, setMatchAnalysis] = useState<{ score: number, reason: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMatch = async () => {
    if (!token || !id) return;
    setIsAnalyzing(true);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/match-job/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (data.status === 'Success') {
            setMatchAnalysis(data.data);
        } else {
            console.error("Match error:", data.message);
        }
    } catch (e) {
        console.error(e);
    } finally {
        setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    // Giữ nguyên logic gọi API của job bằng id từ params và env variable
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/job/${id}`)
        .then((res) => res.json())
        .then((data) => setJob(data));

      // Gọi API công việc tương tự từ backend thật
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/job/${id}/similar`)
        .then((res) => res.json())
        .then((data) => setSameJobs(Array.isArray(data) ? data : []));
    }
  }, [id]);

  const handleApply = () => {
    router.push(`/apply/${id}`);
  }

  return (
    <>
      {/* Job detail */}
      <div className="mt-[30px]">
        <div className="container mx-auto px-[16px]">
          <div className="flex flex-wrap lg:gap-x-[20px] gap-y-[20px]">
            {/* Left */}
            <div className="lg:w-[65%] w-[100%]">
              {/* Part 1 */}
              <div
                className="border border-[1px] border-[#DEDEDE]
 rounded-[8px] p-[20px] )]"
              >
                {/* General 1*/}
                <div className="">
                  <h1
                    className="text-[#121212] sm:text-[28px]
 text-[24px] font-[700]"
                  >
                    {job?.name}
                  </h1>
                  <div className="mt-[10px] text-[#414042] text-[16px]">
                    <Link
                      href={`/company/detail/${job?.companyId}`}
                      className="hover:text-[#0D8EFF] transition-colors"
                    >
                      {job?.companyName}
                    </Link>
                  </div>
                  <div className="flex items-center gap-[12px] text-[#0ab305] mt-[10px]">
                    <AiOutlineDollarCircle className="text-[20px] font-[500]" />
                    <span className="font-[500] text-[16px]">
                      {job?.minSalary.toLocaleString("vi-VN")} - {job?.maxSalary.toLocaleString("vi-VN")} USD
                    </span>
                  </div>
                </div>
                {/* Submit button */}
                <div className="sm:mt-[20px] mt-[10px] w-[100%]">
                  <button
                    onClick={handleApply}
                    className="w-[100%] h-[48px] rounded-[4px]
                              text-[#FFFFFF] text-[16px] font-[700]
                              bg-[#0088FF] opacity-[.95] hover:opacity-[1] cursor-pointer"
                  >
                    Ứng tuyển
                  </button>
                </div>
                {/* Images */}
                <div className="grid grid-cols-3 lg:gap-[16px] gap-[8px] mt-[20px]">
                  {job?.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt=""
                      className="aspect-[232/145] object-contain rounded-[4px]"
                    />
                  ))}
                </div>

                {/* General 1 */}
                <div className="flex flex-col gap-[4px] mt-[20px] pb-[18px] border-b border-dashed border-[#DEDEDE]">
                  <div className="flex items-center gap-[8px]">
                    <IoLocationOutline className="text-[16px] text-[#A6A6A6]" />
                    <Link href={"/"} className="text-[16px]">
                      {job?.companyAddress}
                    </Link>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <GrPerformance className="text-[16px] text-[#A6A6A6]" />
                    <Link href={"/"} className="text-[16px]">
                      {job?.workingForm}
                    </Link>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <BsClock className="text-[16px] text-[#A6A6A6]" />
                    <Link href={"/"} className="text-[16px]">
                      {job?.timeSince}
                    </Link>
                  </div>
                </div>

                {/* General 2 */}
                <div className="mt-[20px] flex flex-col gap-y-[10px]">
                  <div className="flex items-center gap-[12px]">
                    <span className="text-[#121212] text-[14px]">Kĩ năng:</span>
                    <div className="flex flex-wrap gap-[8px]">
                      {job?.technologies.map((tag) => (
                        <Link
                          key={tag}
                          href={`/search?skill=${encodeURIComponent(tag)}`}
                          className="border border-[#DEDEDE] rounded-[20px]
 px-[10px] py-[4px] text-[12px] text-[#414042] hover:border-black cursor-pointer"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <span className="text-[#121212] text-[14px]">
                      Chuyên môn:
                    </span>
                    <Link
                      href={`/search?keyword=${encodeURIComponent(job?.specialization || "")}`}
                      className="border border-[#DEDEDE] rounded-[20px]
 px-[10px] py-[4px] text-[12px] text-[#414042] hover:border-black cursor-pointer"
                    >
                      {job?.specialization}
                    </Link>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <span className="text-[#121212] text-[14px]">
                      Lĩnh vực:
                    </span>
                    <div className="flex flex-wrap gap-[8px]">
                      {job?.fields.map((tag) => (
                        <span
                          key={tag}
                          className="border border-[#DEDEDE] rounded-[20px]
 px-[10px] py-[4px] text-[12px] text-[#414042] bg-[#F7F7F7]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 2 */}
              <div className="mt-[20px] border border-[1px] border-[#DEDEDE] rounded-[8px] p-[20px] )] flex flex-col gap-[20px]">
                {/* Section 1 */}
                <div
                  className="job-description"
                  dangerouslySetInnerHTML={{ __html: job?.description || "" }}
                />
              </div>

              {/* Part 3 */}
              <div className="mt-[20px] rounded-[8px]">
                <h2 className="text-[#000000] text-[20px] font-[700]">
                  Việc làm tương tự dành cho bạn
                </h2>
                <div className="grid lg:grid-cols-2 grid-cols-1 mt-[30px] gap-[20px]">
                  {Array.isArray(sameJobs) && sameJobs.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => router.push(`/job/detail/${item._id}`)}
                      className="cursor-pointer"
                    >
                      <div className="bg-[#F0F4F8] px-[12px] py-[8px] rounded-[8px] duration-300 h-full flex flex-col justify-between">
                        <div>
                          <div className="text-[14px] text-[#A6AEC5] font-[400]">
                            {item.timeSince || "Đăng gần đây"}
                          </div>
                          <div className="mt-[12px] text-[18px] font-[700]">
                            {item.name}
                          </div>
                          <div className="flex items-center gap-[12px] mt-[12px]">
                            <div className="w-[48px] h-[48px] border border-[1px] border-[#DEDEDE] rounded-[4px]">
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
                              {item.minSalary.toLocaleString("vi-VN")} - {item.maxSalary.toLocaleString("vi-VN")} USD
                            </span>
                          </div>
                        </div>
                        <div className="mt-[12px] flex flex-col gap-[4px]">
                          <div className="flex items-center gap-[8px]">
                            <PiSuitcase />
                            <Link
                              href={`/search?keyword=${encodeURIComponent(item.specialization || "")}`}
                              className="text-[14px] hover:text-[#0088FF]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.specialization}
                            </Link>
                          </div>
                          <div className="flex items-center gap-[8px]">
                            <GrPerformance />
                            <div className="text-[14px]">{item.workingForm}</div>
                          </div>
                          <div className="flex items-center gap-[8px]">
                            <IoLocationOutline />
                            <div className="text-[14px]">{item.companyAddress}</div>
                          </div>
                          <div className="flex items-center gap-[8px] mt-[12px]">
                            {item.technologies.slice(0, 3).map((tech, index) => (
                              <Link
                                key={index}
                                href={`/search?skill=${encodeURIComponent(tech)}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center justify-center border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] hover:border-black text-[12px] bg-white"
                              >
                                {tech}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="lg:w-[32%] w-[100%]">
              
              {/* AI Matching Box */}
              {user && (
                <div className="bg-white border border-[#DEDEDE] rounded-[8px] p-[20px] mb-[20px]">
                  <h3 className="text-[16px] font-[700] mb-3 flex items-center gap-2">
                    <span className="text-[20px]">🤖</span> AI Phân Tích Độ Phù Hợp
                  </h3>
                  {!matchAnalysis ? (
                    <button
                      onClick={analyzeMatch}
                      disabled={isAnalyzing}
                      className="w-full h-[40px] rounded-[4px] bg-[#f0f7ff] text-[#0088FF] font-[600] border border-[#0088FF] hover:bg-[#e0f0ff] transition-colors disabled:opacity-50"
                    >
                      {isAnalyzing ? "Đang phân tích..." : "Phân tích CV của bạn"}
                    </button>
                  ) : (
                    <div className="flex flex-col items-center">
                       <div className="text-[32px] font-[800] text-[#0088FF]">{matchAnalysis.score}%</div>
                       <div className="text-[13px] text-[#A6A6A6] font-[600]">Mức độ phù hợp</div>
                       <div className="mt-3 text-[14px] text-[#414042] leading-relaxed p-3 bg-[#F9F9F9] border border-[#DEDEDE] rounded-[8px] italic w-full">
                         {matchAnalysis.reason}
                       </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-white border border-[#DEDEDE] rounded-[8px] p-[20px] )]">
                <div className="flex gap-x-[12px] items-center">
                  {job?.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-[80px] h-[80px] object-contain rounded-[4px] border border-[#DEDEDE]"
                    />
                  ) : (
                    <div className="w-[80px] h-[80px] rounded-[4px] border border-[#DEDEDE] bg-[#F7F7F7] flex items-center justify-center text-[#A6A6A6] text-[12px]">
                      Logo
                    </div>
                  )}
                  <div>
                    <Link
                      href={`/company/detail/${job?.companyId}`}
                      className="text-[#0D8EFF] text-[18px] font-[700] hover:opacity-80"
                    >
                      {job?.companyName}
                    </Link>
                  </div>
                </div>
                <div className="mt-[18px]">
                  <div className="py-[8px] flex justify-between items-center border-b border-dashed border-[#DEDEDE]">
                    <div className="text-[#A6A6A6]">Mô hình</div>
                    <div>{job?.companyModel}</div>
                  </div>
                  <div className="py-[8px] flex justify-between items-center border-b border-dashed border-[#DEDEDE]">
                    <div className="text-[#A6A6A6]">Lĩnh vực</div>
                    <div>{job?.companyField}</div>
                  </div>
                  <div className="py-[8px] flex justify-between items-center border-b border-dashed border-[#DEDEDE]">
                    <div className="text-[#A6A6A6]">Quy mô</div>
                    <div>{job?.companyEmployees}</div>
                  </div>
                  <div className="py-[8px] flex justify-between items-center border-b border-dashed border-[#DEDEDE]">
                    <div className="text-[#A6A6A6]">Thời gian làm việc</div>
                    <div>{job?.companyWorkingTime}</div>
                  </div>
                  <div className="py-[8px] flex justify-between items-center border-b border-dashed border-[#DEDEDE]">
                    <div className="text-[#A6A6A6]">Làm việc ngoài giờ</div>
                    <div>{job?.companyWorkOvertime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default jobContainer