"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaDownload, FaExternalLinkAlt, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaEye } from "react-icons/fa";

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  cvUrl: string;
  coverLetter: string;
  status: string;
  createdAt: string;
  jobId: string;
  jobTitle: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending:  { label: "Chờ nhà tuyển dụng xem", color: "bg-orange-100 text-orange-700", icon: <FaHourglassHalf /> },
  reviewed: { label: "Nhà tuyển dụng đã xem",  color: "bg-blue-100 text-blue-700",    icon: <FaEye /> },
  accepted: { label: "Đã được chấp nhận",       color: "bg-green-100 text-green-700",  icon: <FaCheckCircle /> },
  rejected: { label: "Bị từ chối",              color: "bg-red-100 text-red-700",      icon: <FaTimesCircle /> },
};

const UserManageCVDetail = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/applications/${id}`)
      .then((res) => res.json())
      .then((data) => { setApp(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
    </div>
  );

  if (!app) return (
    <div className="text-center py-20 text-gray-500">Không tìm thấy đơn ứng tuyển.</div>
  );

  const cfg = statusConfig[app.status] || statusConfig.pending;

  return (
    <div className="mt-[60px]">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back */}
        <button
          onClick={() => router.push("/user-manage/cv/list")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <FaArrowLeft /> Quay lại danh sách
        </button>

        {/* Status banner */}
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-5 text-[14px] font-[600] ${cfg.color}`}>
          {cfg.icon}
          <span>Trạng thái đơn: {cfg.label}</span>
        </div>

        {/* Candidate info */}
        <div className="border border-[#DEDEDE] rounded-[8px] p-6 mb-5 bg-white shadow-sm">
          <h2 className="text-[20px] font-[700] text-black mb-5">Thông tin của bạn</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-[15px]">
            <div>
              <span className="text-gray-500">Họ tên:</span>
              <span className="ml-2 font-[600] text-black">{app.fullName}</span>
            </div>
            <div>
              <span className="text-gray-500">Email:</span>
              <span className="ml-2 font-[600] text-black">{app.email}</span>
            </div>
            <div>
              <span className="text-gray-500">Số điện thoại:</span>
              <span className="ml-2 font-[600] text-black">{app.phone}</span>
            </div>
            <div>
              <span className="text-gray-500">Ngày nộp:</span>
              <span className="ml-2 font-[600] text-black">
                {new Date(app.createdAt).toLocaleString("vi-VN")}
              </span>
            </div>
          </div>

          {/* Cover Letter */}
          {app.coverLetter && (
            <div className="mt-5">
              <h3 className="text-[15px] font-[600] text-gray-700 mb-2">Thư giới thiệu đã gửi:</h3>
              <p className="text-[14px] text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4 whitespace-pre-line leading-relaxed">
                {app.coverLetter}
              </p>
            </div>
          )}

          {/* CV file */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-[600] text-gray-700">File CV đã nộp:</h3>
              <a
                href={app.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[13px] text-blue-600 hover:underline"
              >
                <FaDownload /> Tải về
              </a>
            </div>
            <iframe
              src={app.cvUrl}
              title="CV Preview"
              className="w-full h-[650px] rounded-[8px] border border-gray-200 bg-gray-50"
            />
          </div>
        </div>

        {/* Job info */}
        <div className="border border-[#DEDEDE] rounded-[8px] p-6 bg-white shadow-sm">
          <h2 className="text-[20px] font-[700] text-black mb-4">Thông tin công việc đã ứng tuyển</h2>
          <div className="text-[15px] mb-3">
            <span className="text-gray-500">Vị trí:</span>
            <span className="ml-2 font-[600] text-black">{app.jobTitle || "—"}</span>
          </div>
          {app.jobId && (
            <Link
              href={`/job/detail/${app.jobId}`}
              target="_blank"
              className="flex items-center gap-1 text-[13px] text-blue-600 hover:underline"
            >
              <FaExternalLinkAlt /> Xem bài tuyển dụng
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManageCVDetail;
