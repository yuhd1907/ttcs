"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplyFormData, ApplySchema } from "@/schemas/apply.schema";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ApplicationForm = () => {
  const params = useParams();
  const router = useRouter();
  const jobID = params.id;
  const { infoUser } = useAuth();
  const [jobTitle, setJobTitle] = useState<string>("");
  const [allowUngraduated, setAllowUngraduated] = useState<boolean>(true); // mặc định cho phép

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<ApplyFormData>({
    resolver: zodResolver(ApplySchema),
  });

  useEffect(() => {
    if (jobID) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/job/${jobID}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.name) {
            setJobTitle(data.name);
          }
          // Lấy trạng thái cho phép sinh viên chưa tốt nghiệp
          if (data && typeof data.allowUngraduated === "boolean") {
            setAllowUngraduated(data.allowUngraduated);
          } else {
            setAllowUngraduated(false); // mặc định: không cho phép
          }
        })
        .catch((err) => console.error("Error fetching job details:", err));
    }
  }, [jobID]);

  useEffect(() => {
    if (infoUser) {
      if (infoUser.username) {
        setValue("fullName", infoUser.username);
      }
      if (infoUser.email) {
        setValue("email", infoUser.email);
      }
      if (infoUser.phone) {
        setValue("phone", infoUser.phone);
      }
    }
  }, [infoUser, setValue]);

  const selectedFile = watch("cv");
  const useProfileCv = watch("useProfileCv");

  const onSubmit = async (data: ApplyFormData) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("jobId", jobID as string);

    if (data.coverLetter) {
      formData.append("coverLetter", data.coverLetter);
    }

    if (!data.useProfileCv && data.cv && data.cv[0]) {
      formData.append("cv", data.cv[0]);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/apply`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const result = await res.json();

      if (result.code === "success") {
        Swal.fire({
          title: "Nộp đơn thành công!",
          text: "Đơn ứng tuyển của bạn đã được gửi đến nhà tuyển dụng.",
          icon: "success",
          confirmButtonText: "Xem lại tin",
          confirmButtonColor: "#0088FF",
        }).then(() => {
          router.push(`/job/detail/${jobID}`);
        });
      } else {
        Swal.fire({
          title: "Thất bại!",
          text: result.message || "Có lỗi xảy ra khi gửi đơn.",
          icon: "error",
          confirmButtonColor: "#0088FF",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Lỗi kết nối!",
        text: "Không thể kết nối đến server. Vui lòng thử lại.",
        icon: "error",
        confirmButtonColor: "#0088FF",
      });
    }
  };

  // CV bị đánh giá không hợp lệ — chặn toàn bộ
  const isBlockedByInvalidCv = infoUser?.cvStatus === "INVALID";

  // Chưa tốt nghiệp + job yêu cầu đã tốt nghiệp
  const isBlockedByGraduation =
    !allowUngraduated && infoUser?.cvGraduated === false;

  // Tổng hợp: có bất kỳ lý do nào chặn?
  const isBlocked = isBlockedByInvalidCv || isBlockedByGraduation;

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      {/* Nút Quay lại */}
      <div className="max-w-3xl mx-auto mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại
        </button>
      </div>

      {/* Thông báo CV không hợp lệ — chặn tất cả job */}
      {isBlockedByInvalidCv && (
        <div className="max-w-3xl mx-auto mb-4 bg-red-50 border border-red-300 rounded-xl p-6 flex gap-4 items-start">
          <span className="text-3xl">&#x274C;</span>
          <div>
            <h3 className="text-red-800 font-bold text-base mb-1">
              CV của bạn không hợp lệ — Không thể ứng tuyển
            </h3>
            <p className="text-red-700 text-sm leading-relaxed">
              Hệ thống AI đã đánh giá CV của bạn là <strong>KHÔNG HỢP LỆ</strong>.
              Bạn không thể nộp đơn vào bất kỳ vị trí nào cho đến khi cập nhật CV hợp lệ.
            </p>
            <p className="text-red-600 text-xs mt-2">
              Vui lòng vào <strong>Hồ sơ cá nhân → CV của bạn</strong> để tải lên CV mới và chờ hệ thống xét duyệt lại.
            </p>
          </div>
        </div>
      )}

      {/* Thông báo chặn khi chưa tốt nghiệp */}
      {!isBlockedByInvalidCv && isBlockedByGraduation && (
        <div className="max-w-3xl mx-auto mb-4 bg-orange-50 border border-orange-300 rounded-xl p-6 flex gap-4 items-start">
          <span className="text-3xl">&#x26A0;&#xFE0F;</span>
          <div>
            <h3 className="text-orange-800 font-bold text-base mb-1">
              Bạn không đủ điều kiện nộp đơn
            </h3>
            <p className="text-orange-700 text-sm leading-relaxed">
              Công việc này <strong>yêu cầu ứng viên đã tốt nghiệp</strong>.
              Theo kết quả xét duyệt CV, hệ thống xác định bạn <strong>chưa tốt nghiệp</strong>.
            </p>
            <p className="text-orange-600 text-xs mt-2">
              Bạn có thể tìm các việc làm <strong>chấp nhận sinh viên</strong> hoặc internship phù hợp hơn.
            </p>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
            Ứng tuyển vị trí {jobTitle}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Họ và Tên */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Họ và Tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                {...register("fullName")}
                className={`w-full px-4 py-2 border ${errors.fullName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                placeholder="Nguyễn Văn A"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Số điện thoại */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className={`w-full px-4 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                  placeholder="0987654321"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Sử dụng CV trong hồ sơ nếu hợp lệ */}
            {infoUser?.cvStatus === "VALID" && infoUser?.cvUrl && (
              <div className="flex items-center space-x-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <input
                  type="checkbox"
                  id="useProfileCv"
                  {...register("useProfileCv")}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="useProfileCv" className="text-sm font-medium text-blue-800 cursor-pointer select-none">
                  Sử dụng CV chính trong hồ sơ cá nhân của bạn (Trạng thái: Hợp lệ)
                </label>
              </div>
            )}

            {/* Upload CV */}
            {!useProfileCv && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tải lên CV (PDF) <span className="text-red-500">*</span>
                </label>
                <div
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.cv ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"
                    } border-dashed rounded-lg hover:border-blue-500 transition-colors cursor-pointer`}
                >
                  <div className="space-y-1 text-center">
                    <svg
                      className={`mx-auto h-12 w-12 ${errors.cv ? "text-red-400" : "text-gray-400"
                        }`}
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="cv-upload"
                        className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none px-1"
                      >
                        <span>
                          {selectedFile && selectedFile[0]
                            ? selectedFile[0].name
                            : "Tải file lên"}
                        </span>
                        <input
                          id="cv-upload"
                          type="file"
                          accept=".pdf"
                          {...register("cv")}
                          className="sr-only"
                        />
                      </label>
                      {!selectedFile?.[0] && (
                        <p className="pl-1">hoặc kéo thả vào đây</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Chỉ chấp nhận file PDF lên đến 5MB
                    </p>
                  </div>
                </div>
                {errors.cv && (
                  <p className="mt-1 text-sm text-red-500">{errors.cv.message as string}</p>
                )}
              </div>
            )}

            {/* Cover Letter */}
            <div>
              <label
                htmlFor="coverLetter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Thư giới thiệu (Cover Letter)
              </label>
              <textarea
                id="coverLetter"
                {...register("coverLetter")}
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="Hãy chia sẻ lý do bạn phù hợp với công việc này..."
              ></textarea>
            </div>

            {/* Nút Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || isBlocked}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white ${
                  isBlocked
                    ? "bg-gray-400 cursor-not-allowed"
                    : isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer`}
              >
                {isBlockedByInvalidCv
                  ? "CV không hợp lệ — Không thể ứng tuyển"
                  : isBlockedByGraduation
                  ? "Không đủ điều kiện nộp đơn"
                  : isSubmitting
                  ? "Đang gửi..."
                  : "Gửi Đơn Ứng Tuyển"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
