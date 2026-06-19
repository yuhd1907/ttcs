"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { FcViewDetails } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type CvStatus = "NONE" | "PENDING" | "VALID" | "INVALID" | null | undefined;

function getCvStatusBadge(status: CvStatus, hasCV: boolean) {
  if (!hasCV) {
    return (
      <span className="bg-gray-400 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide">
        Chưa có CV
      </span>
    );
  }

  switch (status) {
    case "PENDING":
      return (
        <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide animate-pulse">
          Đang xét duyệt
        </span>
      );
    case "VALID":
      return (
        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide">
          Hợp lệ
        </span>
      );
    case "INVALID":
      return (
        <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide">
          Không hợp lệ
        </span>
      );
    default:
      return (
        <span className="bg-gray-400 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide">
          Chưa xét duyệt
        </span>
      );
  }
}

function getCvGraduatedBadge(graduated: boolean | null | undefined) {
  if (graduated === true) {
    return (
      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium ml-2">
        ✅ Đã tốt nghiệp
      </span>
    );
  }
  if (graduated === false) {
    return (
      <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium ml-2">
        ⏳ Chưa tốt nghiệp
      </span>
    );
  }
  return null; // null/undefined = chưa xác định, không hiển thị
}

export default function CVSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { infoUser } = useAuth();

  // Auto-refresh khi đang PENDING
  useEffect(() => {
    if (infoUser?.cvStatus === "PENDING") {
      const interval = setInterval(() => {
        window.dispatchEvent(new Event("userUpdate"));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [infoUser?.cvStatus]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Kiểm tra định dạng
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Chỉ hỗ trợ file PDF!");
      return;
    }

    // Kiểm tra dung lượng (tối đa 3MB)
    if (file.size > 3 * 1024 * 1024) {
      toast.error("File CV không được vượt quá 3MB!");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Đang tải CV lên...");

    try {
      const formData = new FormData();
      formData.append("cv", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      const text = await res.text();
      if (!text) throw new Error("Server không phản hồi");
      const data = JSON.parse(text);

      if (data.code === "success") {
        toast.success(
          "Tải CV thành công! Hệ thống đang xét duyệt...",
          { id: toastId }
        );
        // Cập nhật lại thông tin user
        window.dispatchEvent(new Event("userUpdate"));
      } else {
        throw new Error(data.message || "Lỗi khi tải CV");
      }
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra khi tải CV", { id: toastId });
    } finally {
      setIsUploading(false);
      // Reset input để có thể chọn lại cùng file
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileNameClick = () => {
    if (infoUser?.cvUrl) {
      window.open(infoUser.cvUrl, "_blank");
    }
  };

  const cvStatus = infoUser?.cvStatus as CvStatus;
  const hasCV = !!infoUser?.cvUrl;

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      <h2 className="text-[17px] font-bold text-gray-900 mb-5">CV của bạn</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="text-gray-300">
          {hasCV ? (
            <FcViewDetails className="w-8 h-8" />
          ) : (
            <FaFileAlt className="w-8 h-8" />
          )}
        </div>
        <div
          onClick={handleFileNameClick}
          className={`font-semibold text-[15px] ${
            hasCV
              ? "text-black underline cursor-pointer"
              : "text-gray-400"
          }`}
        >
          {hasCV
            ? infoUser.cvUrl!.substring(infoUser.cvUrl!.lastIndexOf("/") + 1)
            : "Bạn chưa đính kèm CV nào"}
        </div>
      </div>

      <div className="border-t border-dashed border-gray-300 pt-6">
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
        <button
          onClick={handleUploadClick}
          disabled={isUploading}
          className={`flex items-center gap-2 border px-4 py-2 rounded transition-colors ${
            isUploading
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-blue-500 text-blue-500 hover:bg-blue-50"
          }`}
        >
          <FiUpload className="w-4 h-4" />
          <span className="text-sm font-medium">
            {isUploading ? "Đang tải lên..." : "Tải CV lên"}
          </span>
        </button>
        <p className="text-gray-500 text-[13px] mt-4">
          Hỗ trợ định dạng .pdf, dưới 3MB và không chứa mật khẩu bảo vệ
        </p>

        {/* Trạng thái CV */}
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <span className="text-gray-800 text-[13px] font-medium">
            Trạng thái:
          </span>
          {getCvStatusBadge(cvStatus, hasCV)}
          {cvStatus === "VALID" && getCvGraduatedBadge(infoUser?.cvGraduated)}
          {hasCV && cvStatus !== "NONE" && cvStatus !== "PENDING" && infoUser?.cvInvalidReason && (
            <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium border ${
              infoUser.cvInvalidReason.startsWith("[Dự phòng]")
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              Cơ chế: {infoUser.cvInvalidReason.startsWith("[Dự phòng]") ? "Dự phòng (Fallback)" : "AI Gemini"}
            </span>
          )}
        </div>

        {/* Cảnh báo dự phòng khi hợp lệ */}
        {cvStatus === "VALID" && infoUser?.cvInvalidReason && infoUser.cvInvalidReason.startsWith("[Dự phòng]") && (
          <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-yellow-700 text-[13px] leading-relaxed">
              <span className="font-semibold">Lưu ý: </span>
              {infoUser.cvInvalidReason.replace(/^\[(Gemini|Dự phòng)\]\s*/, "")}
            </p>
          </div>
        )}

        {/* Lý do không hợp lệ */}
        {cvStatus === "INVALID" && infoUser?.cvInvalidReason && (
          <div className="mt-3 bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-600 text-[13px] leading-relaxed">
              <span className="font-semibold">Lý do: </span>
              {infoUser.cvInvalidReason.replace(/^\[(Gemini|Dự phòng)\]\s*/, "")}
            </p>
          </div>
        )}

        {/* Gợi ý khi đang xét duyệt */}
        {cvStatus === "PENDING" && (
          <p className="mt-3 text-yellow-600 text-[13px] italic">
            Hệ thống đang xét duyệt CV của bạn, vui lòng chờ trong giây lát...
          </p>
        )}

        {/* Tiêu chí xét duyệt */}
        {(cvStatus === "INVALID" || !hasCV) && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-blue-700 text-[12px] font-semibold mb-1">
              Tiêu chí để CV hợp lệ:
            </p>
            <ul className="text-blue-600 text-[12px] list-disc list-inside space-y-0.5">
              <li>Có họ tên và ít nhất 1 thông tin liên hệ (email, SĐT, LinkedIn, GitHub)</li>
              <li>Có bằng cấp CNTT/kỹ thuật hoặc chứng chỉ IT quốc tế</li>
              <li>Nếu không có bằng cấp IT: phải có dự án hoặc kinh nghiệm làm việc thực tế trong ngành IT</li>
              <li>Mô tả dự án/công việc đủ chi tiết, không sơ sài (“Học Java” không được tính)</li>
              <li>Nội dung rõ ràng, có cấu trúc, không có nội dung rác/spam</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
