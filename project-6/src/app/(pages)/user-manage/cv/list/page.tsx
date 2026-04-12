"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaEye,
  FaTrash, FaInbox, FaSignInAlt
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

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; icon: React.ReactNode }
> = {
  pending:  { label: "Chờ xem",  bg: "bg-orange-50", text: "text-orange-600", icon: <FaHourglassHalf /> },
  reviewed: { label: "Đã xem",   bg: "bg-blue-50",   text: "text-blue-600",   icon: <FaEye /> },
  accepted: { label: "Đã duyệt", bg: "bg-green-50",  text: "text-green-600",  icon: <FaCheckCircle /> },
  rejected: { label: "Từ chối",  bg: "bg-red-50",    text: "text-red-600",    icon: <FaTimesCircle /> },
};

const UserManageCVList = () => {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  useEffect(() => {
    // Lấy email đã lưu khi đăng nhập
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      // Chưa đăng nhập → chưa có email
      setNotLoggedIn(true);
      setLoading(false);
      return;
    }

    // Gọi public API tra cứu theo email (không cần token)
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/public/applications/by-email?email=${encodeURIComponent(userEmail)}`
    )
      .then((res) => res.json())
      .then((data) => {
        setApplications(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = (appId: string, email: string) => {
    Swal.fire({
      title: "Xóa đơn ứng tuyển?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#FF0000",
    }).then((result) => {
      if (!result.isConfirmed) return;
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/public/applications/${appId}?email=${encodeURIComponent(email)}`,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.code === "success") {
            setApplications((prev) => prev.filter((a) => a.id !== appId));
            Swal.fire({ title: "Đã xóa!", icon: "success", timer: 1200, showConfirmButton: false });
          } else {
            Swal.fire({ title: "Lỗi!", text: data.message, icon: "error" });
          }
        });
    });
  };

  // Loading skeleton
  if (loading) return (
    <div className="mt-[60px]">
      <div className="container mx-auto px-4">
        <h1 className="text-[#121212] text-[28px] font-[700] mb-6">CV đã nộp</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-[8px] p-5 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
              <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto mb-2" />
              <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Chưa đăng nhập
  if (notLoggedIn) return (
    <div className="mt-[60px]">
      <div className="container mx-auto px-4">
        <h1 className="text-[#121212] text-[28px] font-[700] mb-6">CV đã nộp</h1>
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <FaSignInAlt className="text-5xl text-gray-300" />
          <p className="text-gray-500 text-[16px]">Bạn cần đăng nhập để xem các đơn ứng tuyển.</p>
          <button
            onClick={() => router.push("/user/login")}
            className="bg-[#0088FF] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-[60px]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-[#121212] text-[28px] font-[700]">CV đã nộp</h1>
            {applications.length > 0 && (
              <p className="text-gray-500 text-[14px] mt-1">
                Tổng: <span className="font-bold text-black">{applications.length}</span> đơn ứng tuyển
              </p>
            )}
          </div>
          {/* Summary badges */}
          {applications.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {Object.entries(statusConfig).map(([key, cfg]) => {
                const count = applications.filter((a) => a.status === key).length;
                if (count === 0) return null;
                return (
                  <span key={key} className={`text-[12px] font-[600] px-3 py-1 rounded-full flex items-center gap-1 ${cfg.bg} ${cfg.text}`}>
                    {cfg.icon} {cfg.label}: {count}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Empty state */}
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <FaInbox className="text-5xl text-gray-300" />
            <p className="text-gray-500 text-[16px]">Bạn chưa nộp đơn ứng tuyển nào.</p>
            <button
              onClick={() => router.push("/search")}
              className="bg-[#0088FF] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Tìm việc ngay
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {applications.map((app) => {
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

                    {/* Status badge */}
                    <div className={`flex items-center justify-center gap-1.5 text-[13px] font-[600] rounded-full px-3 py-1.5 mx-auto mb-3 ${cfg.bg} ${cfg.text}`}>
                      {cfg.icon}
                      <span>{cfg.label}</span>
                    </div>

                    {/* Application date */}
                    <div className="text-center text-[12px] text-gray-400 mb-4">
                      Nộp ngày: {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center gap-2 mt-auto">
                      <Link
                        href={`/user-manage/cv/detail/${app.id}`}
                        className="bg-[#0088FF] text-white text-[12px] px-4 py-2 rounded-[4px] hover:bg-blue-700 transition-colors"
                      >
                        Xem chi tiết
                      </Link>
                      <button
                        onClick={() => handleDelete(app.id, app.email)}
                        className="bg-[#FF0000] text-white text-[12px] px-4 py-2 rounded-[4px] hover:bg-red-700 transition-colors flex items-center gap-1"
                      >
                        <FaTrash size={10} /> Xóa
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManageCVList;
