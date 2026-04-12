"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplyFormData, ApplySchema } from "@/schemas/apply.schema";
import Swal from "sweetalert2";

const ApplicationForm = () => {
  const params = useParams();
  const router = useRouter();
  const jobID = params.id;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ApplyFormData>({
    resolver: zodResolver(ApplySchema),
  });

  const selectedFile = watch("cv");

  const onSubmit = async (data: ApplyFormData) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("jobId", jobID as string);

    if (data.coverLetter) {
      formData.append("coverLetter", data.coverLetter);
    }

    if (data.cv && data.cv[0]) {
      formData.append("cv", data.cv[0]);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/apply`, {
        method: "POST",
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

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      {/* Nút Quay lại ở góc trái trên */}
      <div className="max-w-3xl mx-auto mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Quay lại
        </button>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
            Ứng tuyển vị trí Kỹ sư Phần mềm
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

            {/* Upload CV */}
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
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer`}
              >
                {isSubmitting ? "Đang gửi..." : "Gửi Đơn Ứng Tuyển"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
