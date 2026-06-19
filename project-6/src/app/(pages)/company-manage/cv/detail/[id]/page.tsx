"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaDownload, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";

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
  cvGraduated?: boolean | null;  // true=đã TN, false=chưa TN, null=chưa xác định
  cvStatus?: string;             // NONE | PENDING | VALID | INVALID
}

const statusLabel: Record<string, { label: string; color: string }> = {
  pending:  { label: "Chờ xem",  color: "bg-orange-100 text-orange-700" },
  reviewed: { label: "Đã xem",   color: "bg-blue-100 text-blue-700" },
  accepted: { label: "Đã duyệt", color: "bg-green-100 text-green-700" },
  rejected: { label: "Từ chối",  color: "bg-red-100 text-red-700" },
};

const CompanyManageCVDetail = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/applications/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => { setApp(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleStatus = (status: string) => {
    const label = status === "accepted" ? "Duyệt" : "Từ chối";
    Swal.fire({
      title: `${label} đơn này?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: label,
      cancelButtonText: "Hủy",
      confirmButtonColor: status === "accepted" ? "#47BE02" : "#FF5100",
    }).then((result) => {
      if (!result.isConfirmed) return;
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/applications/${id}/status?status=${status}`, {
        method: "PATCH",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === "success") {
            setApp((prev) => prev ? { ...prev, status } : prev);
            Swal.fire({ title: "Đã cập nhật!", icon: "success", timer: 1200, showConfirmButton: false });
          }
        });
    });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
    </div>
  );

  if (!app) return (
    <div className="text-center py-20 text-gray-500">Không tìm thấy đơn ứng tuyển.</div>
  );

  const statusInfo = statusLabel[app.status] || statusLabel.pending;

  return (
    <div className="mt-[60px]">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <button
          onClick={() => router.push("/company-manage/cv/list")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <FaArrowLeft /> Quay lại danh sách
        </button>

        {/* Candidate info card */}
        <div className="border border-[#DEDEDE] rounded-[8px] p-6 mb-5 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
            <h2 className="text-[20px] font-[700] text-black">Thông tin ứng viên</h2>
            <span className={`text-[13px] font-[600] px-3 py-1 rounded-full ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>

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

          {/* Trạng thái tốt nghiệp (từ AI xét duyệt CV) */}
          {app.cvStatus === "VALID" && (
            <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-[13px] text-gray-500 font-medium">Tình trạng tốt nghiệp (AI):</span>
              {app.cvGraduated === true && (
                <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-[12px] font-semibold px-3 py-1 rounded-full">
                  <span>&#x2705;</span> Đã tốt nghiệp
                </span>
              )}
              {app.cvGraduated === false && (
                <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-[12px] font-semibold px-3 py-1 rounded-full">
                  <span>&#x23F3;</span> Chưa tốt nghiệp
                </span>
              )}
              {app.cvGraduated == null && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 text-[12px] font-semibold px-3 py-1 rounded-full">
                  Chưa xác định
                </span>
              )}
            </div>
          )}

          {/* Cover Letter */}
          {app.coverLetter && (
            <div className="mt-5">
              <h3 className="text-[15px] font-[600] text-gray-700 mb-2">Thư giới thiệu:</h3>
              <p className="text-[14px] text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4 whitespace-pre-line leading-relaxed">
                {app.coverLetter}
              </p>
            </div>
          )}

          {/* CV Preview */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-[600] text-gray-700">File CV (PDF):</h3>
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
              className="w-full h-[700px] rounded-[8px] border border-gray-200"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end mt-6 flex-wrap">
            {app.status !== "rejected" && (
              <button
                onClick={() => handleStatus("rejected")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-500 text-red-500 font-[600] text-[14px] hover:bg-red-500 hover:text-white transition-all"
              >
                <FaTimesCircle /> Từ chối
              </button>
            )}
            {app.status !== "accepted" && (
              <button
                onClick={() => handleStatus("accepted")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0D8EFF] text-white font-[600] text-[14px] hover:bg-blue-700 transition-all"
              >
                <FaCheckCircle /> Chấp nhận
              </button>
            )}
          </div>
        </div>

        {/* Job info card */}
        <div className="border border-[#DEDEDE] rounded-[8px] p-6 bg-white shadow-sm">
          <h2 className="text-[20px] font-[700] text-black mb-4">Thông tin công việc</h2>
          <div className="text-[15px]">
            <span className="text-gray-500">Vị trí ứng tuyển:</span>
            <span className="ml-2 font-[600] text-black">{app.jobTitle || "—"}</span>
          </div>
          {app.jobId && (
            <a
              href={`/job/detail/${app.jobId}`}
              target="_blank"
              className="flex items-center gap-1 text-[13px] text-blue-600 hover:underline mt-3"
            >
              <FaExternalLinkAlt /> Xem chi tiết bài tuyển dụng
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyManageCVDetail;
