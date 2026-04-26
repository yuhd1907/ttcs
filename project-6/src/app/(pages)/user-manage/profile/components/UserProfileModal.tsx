"use client";
import { toast } from "sonner";

import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserProfileSchema,
  UserProfileFormValues,
} from "@/schemas/user.schema";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  infoUser: any;
  onUpdate?: (data: any) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  infoUser,
  onUpdate,
}) => {
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(UserProfileSchema),
  });

  useEffect(() => {
    if (infoUser && isOpen) {
      reset({
        username: infoUser.username || "",
        email: infoUser.email || "",
        phone: infoUser.phone || "",
        avatar: infoUser.avatar ? [infoUser.avatar] : [],
        position: infoUser.position || "",
        gender: infoUser.gender || "",
        birth_date: infoUser.birth_date || "",
        city: infoUser.city || "",
        address: infoUser.address || "",
        personal_link: infoUser.personal_link || "",
      });
    }
  }, [infoUser, isOpen, reset]);

  const onSubmit = (values: UserProfileFormValues) => {
    setIsPending(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "avatar" && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    if (values.avatar && values.avatar.length > 0) {
      const avatarItem = values.avatar[0];
      if (avatarItem instanceof File || avatarItem instanceof Blob) {
        formData.append("avatar", avatarItem);
      }
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 'success') {
          if (onUpdate) {
            onUpdate(data.data);
          }
          toast.success("Cập nhật thông tin thành công!");
          onClose();
        } else {
          toast.error(data.message || "Có lỗi xảy ra");
        }
      })
      .catch((err) => {
        toast.error("Không thể kết nối đến server");
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[850px] mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h3 className="text-[18px] font-[700] text-[#121212]">Thông tin cá nhân</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#757575] transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 py-5 max-h-[80vh] overflow-y-auto"
        >
          {/* ── FilePond (left) | Fields (right) ── */}
          <div className="flex gap-5 items-start">
            {/* LEFT: Avatar FilePond */}
            <Controller
              name="avatar"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="w-[180px] flex-shrink-0">
                  <div className="inner-upload-image">
                    <FilePond
                      files={value || []}
                      onupdatefiles={(fileItems) => {
                        const files = fileItems.map((item) => item.file);
                        onChange(files);
                      }}
                      maxFiles={1}
                      allowMultiple={false}
                      labelIdle="+"
                      acceptedFileTypes={["image/*"]}
                      imagePreviewHeight={150}
                    />
                  </div>
                </div>
              )}
            />

            {/* RIGHT: Form fields */}
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              {/* Họ và Tên */}
              <div>
                <input
                  type="text"
                  id="username"
                  {...register("username")}
                  placeholder="Họ và Tên *"
                  className={`w-full h-[46px] border rounded-[8px] px-4 text-[14px] outline-none transition-colors placeholder:text-[#999]
                    ${errors.username ? "border-[#E53935] bg-[#FFF5F5]" : "border-[#E0E0E0] focus:border-[#0D8EFF]"}`}
                />
                {errors.username && (
                  <p className="text-[#E53935] text-[12px] mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* Chức danh */}
              <div>
                <input
                  type="text"
                  {...register("position")}
                  placeholder="Chức danh *"
                  className={`w-full h-[46px] border rounded-[8px] px-4 text-[14px] outline-none transition-colors placeholder:text-[#999]
                    ${errors.position ? "border-[#E53935] bg-[#FFF5F5]" : "border-[#E0E0E0] focus:border-[#0D8EFF]"}`}
                />
                {errors.position && (
                  <p className="text-[#E53935] text-[12px] mt-1">{errors.position.message}</p>
                )}
              </div>

              {/* Email | Số điện thoại */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="Địa chỉ email"
                    className="w-full h-[46px] border border-[#E0E0E0] rounded-[8px] px-4 text-[14px] outline-none bg-[#F7F7F7] text-[#888] placeholder:text-[#999] cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="phone"
                    {...register("phone")}
                    placeholder="Số điện thoại *"
                    className={`w-full h-[46px] border rounded-[8px] px-4 text-[14px] outline-none transition-colors placeholder:text-[#999]
                      ${errors.phone ? "border-[#E53935] bg-[#FFF5F5]" : "border-[#E0E0E0] focus:border-[#0D8EFF]"}`}
                  />
                  {errors.phone && (
                    <p className="text-[#E53935] text-[12px] mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Ngày sinh | Giới tính */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="date"
                    {...register("birth_date")}
                    className={`w-full h-[46px] border rounded-[8px] px-4 text-[14px] text-[#444] outline-none transition-colors
                      ${errors.birth_date ? "border-[#E53935] bg-[#FFF5F5]" : "border-[#E0E0E0] focus:border-[#0D8EFF]"}`}
                  />
                  {errors.birth_date && (
                    <p className="text-[#E53935] text-[12px] mt-1">{errors.birth_date.message}</p>
                  )}
                </div>
                <div className="relative">
                  <select
                    {...register("gender")}
                    className={`w-full h-[46px] border rounded-[8px] px-4 text-[14px] text-[#444] outline-none transition-colors bg-white appearance-none cursor-pointer
                      ${errors.gender ? "border-[#E53935] bg-[#FFF5F5]" : "border-[#E0E0E0] focus:border-[#0D8EFF]"}`}
                  >
                    <option value="">Giới tính *</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {errors.gender && (
                    <p className="text-[#E53935] text-[12px] mt-1">{errors.gender.message}</p>
                  )}
                </div>
              </div>

              {/* Tỉnh/TP | Địa chỉ */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select
                    {...register("city")}
                    className={`w-full h-[46px] border rounded-[8px] px-4 text-[14px] text-[#444] outline-none transition-colors bg-white appearance-none cursor-pointer
                      ${errors.city ? "border-[#E53935] bg-[#FFF5F5]" : "border-[#E0E0E0] focus:border-[#0D8EFF]"}`}
                  >
                    <option value="">Tỉnh/Thành phố hiện tại *</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Khác">Tỉnh/Thành khác</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {errors.city && (
                    <p className="text-[#E53935] text-[12px] mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    {...register("address")}
                    placeholder="Địa chỉ (Tên đường, quận/huyện,...)"
                    className="w-full h-[46px] border border-[#E0E0E0] rounded-[8px] px-4 text-[14px] outline-none placeholder:text-[#999] focus:border-[#0D8EFF] transition-colors"
                  />
                </div>
              </div>

              {/* Link cá nhân */}
              <div>
                <input
                  type="url"
                  {...register("personal_link")}
                  placeholder="Link cá nhân (Linkedin, portfolio,...)"
                  className="w-full h-[46px] border border-[#E0E0E0] rounded-[8px] px-4 text-[14px] outline-none placeholder:text-[#999] focus:border-[#0D8EFF] transition-colors"
                />
              </div>

            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-5 mt-3 border-t border-[#F0F0F0]">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-6 border border-[#E0E0E0] rounded-[8px] text-[14px] font-[600] text-[#444] hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={`h-10 px-10 rounded-[8px] text-[14px] font-[700] text-white transition-all
                ${isPending ? "bg-gray-300 cursor-not-allowed" : "bg-[#0D8EFF] hover:bg-[#0076E5] cursor-pointer"}`}
            >
              {isPending ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
