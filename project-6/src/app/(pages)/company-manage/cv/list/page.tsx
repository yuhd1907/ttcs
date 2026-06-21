"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaEnvelope, FaPhone, FaBriefcase, FaEye, FaCheckCircle,
  FaTimesCircle, FaHourglassHalf, FaSearch
} from "react-icons/fa";
import Swal from "sweetalert2";
import { CardJobItem } from "@/app/components/card/CardJobItem";

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  cvUrl: string;
  coverLetter: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  createdAt: string;
  jobId: string;
  jobTitle: string;
}

interface Job {
  _id: string;
  name: string;
  minSalary: number;
  maxSalary: number;
  level: string;
  workingForm: string;
  address?: string;
  technologies: string[];
  applicantCount: number;
  timeSince?: string;
  companyLogo?: string;
  companyName?: string;
  companyId?: string;
  specialization?: string[];
  isInternship?: boolean;
}

const statusConfig = {
  pending:  { label: "Chờ xem",  color: "text-orange-500", icon: <FaHourglassHalf className="mr-1" /> },
  reviewed: { label: "Đã xem",   color: "text-blue-500",   icon: <FaEye className="mr-1" /> },
  accepted: { label: "Đã duyệt", color: "text-green-500",  icon: <FaCheckCircle className="mr-1" /> },
  rejected: { label: "Từ chối",  color: "text-red-500",    icon: <FaTimesCircle className="mr-1" /> },
};

const CompanyManageCVList = () => {
  const router = useRouter();
  
  // Jobs State (Left Column)
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsPage, setJobsPage] = useState(1);
  const [jobsTotalPages, setJobsTotalPages] = useState(1);
  const [jobSearch, setJobSearch] = useState("");

  // Selected Job State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Applications State (Right Column)
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [appSearch, setAppSearch] = useState("");
  const [appPage, setAppPage] = useState(1);
  const [appTotalPages, setAppTotalPages] = useState(1);

  // Fetch Jobs
  const fetchJobs = (p = 1, searchVal = "") => {
    setJobsLoading(true);
    const query = new URLSearchParams();
    query.append("page", p.toString());
    if (searchVal.trim()) {
      query.append("search", searchVal.trim());
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/list?${query.toString()}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "success") {
          setJobs(data.jobList || []);
          setJobsTotalPages(data.totalPages || 1);
        }
        setJobsLoading(false);
      })
      .catch(() => setJobsLoading(false));
  };

  // Fetch Applications for Selected Job
  const fetchApplications = (jobId: string, p = 1) => {
    setApplicationsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/applications/job/${jobId}?page=${p}&size=6`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "success") {
          setApplications(data.data || []);
          setAppTotalPages(data.totalPages || 1);
        } else {
          setApplications([]);
          setAppTotalPages(1);
        }
        setApplicationsLoading(false);
      })
      .catch(() => {
        setApplications([]);
        setApplicationsLoading(false);
      });
  };

  // Fetch jobs on load & page change
  useEffect(() => {
    fetchJobs(jobsPage, jobSearch);
  }, [jobsPage]);

  // Handle job search click/enter
  const handleJobSearch = () => {
    setJobsPage(1);
    fetchJobs(1, jobSearch);
  };

  // Fetch applications when selected job or page changes
  useEffect(() => {
    if (selectedJob) {
      fetchApplications(selectedJob._id, appPage);
    } else {
      setApplications([]);
      setAppTotalPages(1);
    }
  }, [selectedJob, appPage]);

  const handleStatusChange = (id: string, status: string) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/applications/${id}/status?status=${status}`,
      { 
        method: "PATCH", 
        credentials: "include" 
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "success") {
          setApplications((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status: status as Application["status"] } : a))
          );
          Swal.fire({ title: "Cập nhật thành công!", icon: "success", timer: 1500, showConfirmButton: false });
        }
      });
  };

  // Filter applications by candidate name/email locally
  const filteredApplications = applications.filter(
    (a) =>
      a.fullName.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.email.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.phone.toLowerCase().includes(appSearch.toLowerCase())
  );

  return (
    <div className="mt-[60px] min-h-screen bg-[#F7F9FC] pb-12">
      <div className="container mx-auto px-4 pt-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-black text-[32px] font-[800] tracking-tight">Quản lý CV ứng tuyển</h1>
          <p className="text-gray-500 text-[15px] mt-1">Chọn công việc để xem và xét duyệt danh sách hồ sơ CV ứng tuyển tương ứng.</p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Job Posts List (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white border border-[#EBEBEB] rounded-[12px] p-5 shadow-[0px_8px_24px_rgba(149,157,165,0.04)]">
            <div className="flex flex-col gap-4 mb-5">
              <h2 className="text-[#121212] text-[18px] font-[700]">Danh sách công việc</h2>
              
              {/* Job Search Input */}
              <div className="relative flex items-center">
                <FaSearch className="absolute left-3 text-gray-400 text-[14px]" />
                <input
                  type="text"
                  placeholder="Tìm kiếm công việc..."
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleJobSearch()}
                  className="w-full pl-9 pr-24 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0088FF] transition-all"
                />
                <button
                  onClick={handleJobSearch}
                  className="absolute right-1 px-4 py-1.5 bg-[#0088FF] text-white text-[12px] font-[600] rounded-md hover:bg-blue-600 transition-colors"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>

            {jobsLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#0088FF] border-t-transparent" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center text-gray-400 py-16 text-[14px]">Không tìm thấy công việc nào.</div>
            ) : (
              <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    onClickCapture={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedJob(job);
                      setAppPage(1);
                      setAppSearch("");
                    }}
                    className={`cursor-pointer rounded-[8px] transition-all duration-300 transform hover:scale-[1.01] ${
                      selectedJob?._id === job._id
                        ? "ring-2 ring-[#0088FF] ring-offset-2"
                        : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    <CardJobItem item={job} />
                  </div>
                ))}

                {/* Jobs Pagination */}
                {jobsTotalPages > 1 && (
                  <div className="flex justify-center gap-1.5 mt-6 border-t border-gray-100 pt-4">
                    {Array.from({ length: jobsTotalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setJobsPage(p)}
                        className={`w-8 h-8 rounded-md text-xs font-semibold transition-colors ${
                          p === jobsPage
                            ? "bg-[#0088FF] text-white"
                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Applications List (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white border border-[#EBEBEB] rounded-[12px] p-5 shadow-[0px_8px_24px_rgba(149,157,165,0.04)] min-h-[500px] flex flex-col">
            {!selectedJob ? (
              <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
                <div className="w-[80px] h-[80px] bg-[#F0F4F8] rounded-full flex items-center justify-center text-[#0088FF] mb-4">
                  <FaBriefcase className="text-[32px]" />
                </div>
                <h3 className="text-[18px] text-[#121212] font-[700] mb-2">Chưa chọn công việc</h3>
                <p className="text-gray-400 text-[14px] max-w-[320px]">Vui lòng chọn một công việc ở cột bên trái để hiển thị danh sách hồ sơ CV ứng tuyển tương ứng.</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                {/* Header for selected job */}
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <div className="text-[13px] font-[600] text-[#0088FF] uppercase tracking-wider mb-1">Đang xem ứng viên của vị trí:</div>
                  <h2 className="text-[#121212] text-[20px] font-[800] line-clamp-2">{selectedJob.name}</h2>
                </div>

                {/* Sub-header: Search & Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  {/* Local App Search */}
                  <div className="relative flex-1 max-w-xs">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]" />
                    <input
                      type="text"
                      placeholder="Tìm theo tên, email, sđt..."
                      value={appSearch}
                      onChange={(e) => setAppSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0088FF]"
                    />
                  </div>

                  {/* Stats Row */}
                  <div className="flex gap-2 flex-wrap text-[12px]">
                    {Object.entries(statusConfig).map(([key, cfg]) => {
                      const count = applications.filter((a) => a.status === key).length;
                      return (
                        <div key={key} className="bg-[#F8FAFC] border border-gray-100 rounded-md px-3 py-1 flex items-center gap-1.5">
                          <span className={`${cfg.color} text-[10px]`}>{cfg.icon}</span>
                          <span className="text-gray-500 font-[500]">{cfg.label}:</span>
                          <span className="font-bold text-[#121212]">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Applications grid list */}
                {applicationsLoading ? (
                  <div className="flex-1 flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#0088FF] border-t-transparent" />
                  </div>
                ) : filteredApplications.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-20 text-center text-gray-400 text-[14px]">
                    {appSearch ? "Không tìm thấy ứng viên trùng khớp với từ khoá tìm kiếm." : "Chưa có đơn ứng tuyển nào cho công việc này."}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                      {filteredApplications.map((app) => {
                        const cfg = statusConfig[app.status] || statusConfig.pending;
                        return (
                          <div
                            key={app.id}
                            className="border border-[#EBEBEB] rounded-[8px] flex flex-col bg-white shadow-sm hover:shadow-md transition-all duration-300"
                            style={{ background: "linear-gradient(180deg, #F9FBFC 2.38%, #FFFFFF 70.43%)" }}
                          >
                            <div className="p-4 flex-1 flex flex-col justify-between">
                              <div>
                                {/* Candidate Details */}
                                <h4 className="text-[16px] font-[700] text-[#121212] line-clamp-1 mb-3">
                                  {app.fullName}
                                </h4>

                                <div className="flex flex-col gap-2 text-[13px] text-gray-600">
                                  <div className="flex items-center gap-2 truncate">
                                    <FaEnvelope className="text-gray-400 shrink-0 text-[12px]" />
                                    <span className="truncate">{app.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <FaPhone className="text-gray-400 shrink-0 text-[12px]" />
                                    <span>{app.phone}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 pt-3 border-t border-gray-100">
                                <div className="flex items-center justify-between text-[12px]">
                                  <span className="text-gray-400">Nộp: {new Date(app.createdAt).toLocaleDateString("vi-VN")}</span>
                                  <div className={`flex items-center font-[600] ${cfg.color}`}>
                                    {cfg.icon}
                                    <span>{cfg.label}</span>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mt-4 flex-wrap">
                                  <button
                                    onClick={() => router.push(`/company-manage/cv/detail/${app.id}`)}
                                    className="flex-1 bg-[#0088FF] text-white text-[12px] font-[600] py-1.5 px-3 rounded-md hover:bg-blue-600 transition-colors"
                                  >
                                    Xem CV
                                  </button>
                                  {app.status !== "accepted" && (
                                    <button
                                      onClick={() => handleStatusChange(app.id, "accepted")}
                                      className="bg-[#47BE02] text-white text-[12px] font-[600] py-1.5 px-3 rounded-md hover:bg-green-600 transition-colors"
                                    >
                                      Duyệt
                                    </button>
                                  )}
                                  {app.status !== "rejected" && (
                                    <button
                                      onClick={() => handleStatusChange(app.id, "rejected")}
                                      className="bg-[#FF5100] text-white text-[12px] font-[600] py-1.5 px-3 rounded-md hover:bg-red-600 transition-colors"
                                    >
                                      Từ chối
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Applications Pagination */}
                    {appTotalPages > 1 && (
                      <div className="flex justify-center gap-2 mt-8 pt-4 border-t border-gray-100">
                        {Array.from({ length: appTotalPages }, (_, i) => i + 1).map((p) => (
                          <button
                            key={p}
                            onClick={() => setAppPage(p)}
                            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                              p === appPage
                                ? "bg-[#0088FF] text-white"
                                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CompanyManageCVList;