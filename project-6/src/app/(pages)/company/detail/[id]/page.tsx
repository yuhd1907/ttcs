"use client";

import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CardJobItem } from "@/app/components/card/CardJobItem";

const CompanyDetail = () => {
  const params = useParams();
  const id = params.id;
  const [company, setCompany] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setErrorMsg(null);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/company/${id}`, {
        credentials: "include",
      })
        .then(async (res) => {
          if (!res.ok) {
            let msg = "Failed to fetch";
            try {
              const errData = await res.json();
              msg = errData.message || msg;
            } catch(e) {}
            throw new Error(msg);
          }
          return res.json();
        })
        .then((data) => {
          setCompany(data);
        })
        .catch(err => {
          console.log("Fetch company error:", err);
          setErrorMsg(err.message);
        })
        .finally(() => {
          setLoading(false);
        });

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/company/${id}/jobs?size=10`, {
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch jobs");
          return res.json();
        })
        .then((data) => {
          if (data.code === "success") {
            setJobs(data.jobList || []);
            setTotalJobs(data.totalElements || 0);
          }
        })
        .catch(err => console.log(err));
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-[#121212]">Đang tải thông tin...</div>;
  }

  if (errorMsg) {
    return (
      <div className="text-center py-20 text-[#121212] flex flex-col items-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">Lỗi truy xuất dữ liệu</h2>
        <p>{errorMsg}</p>
        <p className="mt-4 text-sm text-gray-500">ID: {id}</p>
      </div>
    );
  }

  if (!company) {
    return <div className="text-center py-20 text-[#121212]">Không tìm thấy thông tin công ty.</div>;
  }

  return (
    <>
      <div className="bg-[#000071]">
        <div className="container mx-auto px-[16px] flex flex-wrap gap-[16px] py-[32px]">
          <div className="w-[160px] h-[160px] bg-white rounded-[4px] p-2 flex items-center justify-center">
            {company.avatar ? (
              <img
                src={company.avatar}
                alt={company.companyName}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400">No Logo</span>
            )}
          </div>
          <div className="sm:flex-1">
            <h2 className="text-white text-[28px] font-[700]">
              {company.companyName}
            </h2>
            <div className="flex gap-[6px] items-center mt-[8px]">
              <FaLocationDot className="text-white shrink-0" />
              <span className="text-white text-[14px] font-[400]">
                {company.address || "Đang cập nhật"}
              </span>
            </div>
            <div className="flex gap-[6px] items-center mt-[8px]">
              <FaBriefcase className="text-white shrink-0" />
              <span className="text-white text-[14px] font-[400]">
                {totalJobs} việc làm đang tuyển dụng
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-[16px] mt-[30px] flex flex-col lg:flex-row gap-[24px] items-start pb-[40px]">
        {/* Left block */}
        <div className="w-full lg:w-[65%] flex flex-col gap-[20px]">
          {/* Section 6 */}
          <div className="border border-[1px] border-[#D9DCDB] rounded-[8px] p-[20px] bg-white">
            <div>
              <h2 className="text-[#121212] text-[22px] font-[700] pb-[16px] border-b border-dashed border-[#D9DCDB]">
                Thông tin chung
              </h2>
            </div>
            {/* Company general info */}
            <div className="mt-[20px] grid md:grid-cols-3 grid-cols-2 gap-x-[10px] gap-y-[24px]">
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Mô hình công ty
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  {company.model || "Chưa cập nhật"}
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Lĩnh vực công ty
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  {company.field || "Chưa cập nhật"}
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Tỉnh thành
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  {company.province || "Chưa cập nhật"}
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Quy mô công ty
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  {company.employees || "Chưa cập nhật"}
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Thời gian làm việc
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  {company.workingTime || "Chưa cập nhật"}
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Làm việc ngoài giờ
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  {company.overtime || "Không có OT"}
                </span>
              </div>
            </div>
          </div>
          {/* End of Section 6 */}

          {/* Section 7 */}
          {company.description && (
            <div className="border border-[1px] border-[#D9DCDB] rounded-[8px] p-[20px] bg-white">
              <h2 className="text-[#121212] text-[22px] font-[700] pb-[16px] border-b border-dashed border-[#D9DCDB]">
                Giới thiệu công ty
              </h2>
              <div
                className="mt-[20px] prose max-w-none"
                dangerouslySetInnerHTML={{ __html: company.description }}
              />
            </div>
          )}
          {/* End of Section 7 */}

          {/* Section 7.5: Location */}
          {company.address && (
            <div className="border border-[1px] border-[#D9DCDB] rounded-[8px] p-[20px] bg-white">
              <h2 className="text-[#121212] text-[22px] font-[700] pb-[16px] border-b border-dashed border-[#D9DCDB]">
                Địa điểm
              </h2>
              <div className="mt-[20px] flex flex-col md:flex-row gap-[20px]">
                {/* Left Column */}
                <div className="w-full md:w-[35%]">
                  <h3 className="text-[#121212] text-[18px] font-[700]">
                    Trụ sở chính
                  </h3>
                  <div className="mt-[16px] border border-[1px] border-red-500 rounded-[4px] p-[16px] flex gap-[8px] items-start">
                    <IoLocationOutline className="text-red-500 text-[20px] shrink-0 mt-[2px]" />
                    <span className="text-[#121212] text-[14px] font-[500] leading-[1.5]">
                      {company.address}
                    </span>
                  </div>
                </div>
                {/* Right Column (Map) */}
                <div className="w-full md:w-[65%] h-[250px] md:h-auto min-h-[250px] rounded-[8px] overflow-hidden border border-[1px] border-[#D9DCDB]">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(company.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          )}
          {/* End of Section 7.5 */}
        </div>

        {/* Right block */}
        <div className="w-full lg:w-[32%]">
          {/* Section 8 */}
          <h2 className="text-[#121212] text-[20px] lg:text-[24px] font-[700]">
            Công ty có {totalJobs} việc làm
          </h2>
          <div className="grid grid-cols-1 gap-[20px] mt-[20px]">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <CardJobItem key={job._id} item={job} />
              ))
            ) : (
              <div className="text-gray-500 italic py-4">Chưa có công việc nào.</div>
            )}
          </div>
          {/* End of Section 8 */}
        </div>
      </div>
    </>
  );
};

export default CompanyDetail;
