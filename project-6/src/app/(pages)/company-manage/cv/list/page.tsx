"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaEnvelope, FaPhone, FaBriefcase, FaEye, FaCheckCircle,
  FaTimesCircle, FaHourglassHalf, FaSearch, FaTrash
} from "react-icons/fa";
import Swal from "sweetalert2";

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

const statusConfig = {
  pending:  { label: "Chờ xem",  color: "text-orange-500", icon: <FaHourglassHalf className="mr-1" /> },
  reviewed: { label: "Đã xem",   color: "text-blue-500",   icon: <FaEye className="mr-1" /> },
  accepted: { label: "Đã duyệt", color: "text-green-500",  icon: <FaCheckCircle className="mr-1" /> },
  rejected: { label: "Từ chối",  color: "text-red-500",    icon: <FaTimesCircle className="mr-1" /> },
};

const CompanyManageCVList = () => {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchApplications = (p = 1) => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/applications?page=${p}&size=9`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setApplications(data.data || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchApplications(page); }, [page]);

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

  const filtered = applications.filter(
    (a) =>
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.jobTitle?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-[60px]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-black text-[28px] font-[700]">Quản lý CV ứng tuyển</h1>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên, email, vị trí..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <div key={key} className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm flex items-center gap-2 shadow-sm">
              <span className={cfg.color}>{cfg.icon}</span>
              <span className="text-gray-600">{cfg.label}:</span>
              <span className="font-bold">{applications.filter((a) => a.status === key).length}</span>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-20">Chưa có đơn ứng tuyển nào.</div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {filtered.map((app) => {
              const cfg = statusConfig[app.status] || statusConfig.pending;
              return (
                <div
                  key={app.id}
                  className="border border-[#DEDEDE] rounded-[8px] flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow"
                  style={{ background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)" }}
                >
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Job title */}
                    <h3 className="text-[16px] font-[700] text-center text-[#121212] line-clamp-2 mb-3">
                      {app.jobTitle || "—"}
                    </h3>

                    {/* Candidate info */}
                    <div className="flex flex-col gap-1 text-[13px] text-gray-700">
                      <div><span className="font-[600]">Ứng viên:</span> {app.fullName}</div>
                      <div className="flex items-center gap-1"><FaEnvelope className="text-gray-400" />{app.email}</div>
                      <div className="flex items-center gap-1"><FaPhone className="text-gray-400" />{app.phone}</div>
                    </div>

                    {/* Status badge */}
                    <div className={`flex items-center justify-center mt-3 text-[13px] font-[600] ${cfg.color}`}>
                      {cfg.icon}{cfg.label}
                    </div>

                    {/* Date */}
                    <div className="text-center text-[11px] text-gray-400 mt-1">
                      Nộp: {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-center gap-2 mt-4 flex-wrap">
                      <button
                        onClick={() => router.push(`/company-manage/cv/detail/${app.id}`)}
                        className="bg-[#0088FF] text-white text-[12px] px-4 py-2 rounded-[4px] hover:bg-blue-700 transition-colors"
                      >
                        Xem CV
                      </button>
                      {app.status !== "accepted" && (
                        <button
                          onClick={() => handleStatusChange(app.id, "accepted")}
                          className="bg-[#47BE02] text-white text-[12px] px-4 py-2 rounded-[4px] hover:bg-green-700 transition-colors"
                        >
                          Duyệt
                        </button>
                      )}
                      {app.status !== "rejected" && (
                        <button
                          onClick={() => handleStatusChange(app.id, "rejected")}
                          className="bg-[#FF5100] text-white text-[12px] px-4 py-2 rounded-[4px] hover:bg-red-700 transition-colors"
                        >
                          Từ chối
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  p === page ? "bg-blue-500 text-white" : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyManageCVList;