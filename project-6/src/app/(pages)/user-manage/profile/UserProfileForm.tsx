"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Toaster, toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserProfileSchema,
  UserProfileFormValues,
} from "@/schemas/user.schema";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export const UserProfileForm = () => {
  const { infoUser } = useAuth();
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
    if (infoUser) {
      console.log(infoUser);
      reset({
        username: infoUser.username || "",
        email: infoUser.email || "",
        phone: infoUser.phone || "",
        avatar: infoUser.avatar ? [infoUser.avatar] : [],
      });
    }
  }, [infoUser, reset]);

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

    const updatePromise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
      {
        method: "PATCH",
        body: formData,
        credentials: "include",
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code !== "success") {
          throw new Error("Có lỗi xảy ra khi lưu!");
        }
        return data.message;
      })
      .finally(() => {
        setIsPending(false);
      });

    toast.promise(updatePromise, {
      loading: "Đang lưu thay đổi...",
      success: (message) => message,
      error: (err) => err.message || "Có lỗi xảy ra!",
    });
  };

  return (
    <>
      <Toaster richColors position={"top-right"} />
      {infoUser && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 grid sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-4"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="username"
              className="block text-black text-sm font-medium mb-1.5"
            >
              Họ tên *
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className={`box-border w-full h-12 border rounded px-5 outline-none transition-colors
 ${
   errors.username
     ? "border-red-500 ]"
     : "border-gray-300 focus:border-blue-500"
 }`}
            />
            {errors.username && (
              <p className="text-red-600 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="avatar"
              className="block text-black text-sm font-medium mb-1.5"
            >
              Avatar
            </label>
            <Controller
              name="avatar"
              control={control}
              render={({ field: { onChange, value } }) => (
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
              )}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-black text-sm font-medium mb-1.5"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`box-border w-full h-12 border rounded px-5 outline-none transition-colors
 ${
   errors.email ? "border-red-500 ]" : "border-gray-300 focus:border-blue-500"
 }`}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-black text-sm font-medium mb-1.5"
            >
              Số điện thoại *
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone")}
              className={`box-border w-full h-12 border rounded px-5 outline-none transition-colors
 ${
   errors.phone ? "border-red-500 ]" : "border-gray-300 focus:border-blue-500"
 }`}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className={`h-12 px-8 rounded text-white text-base font-bold transition-all duration-200 
 ${isPending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}`}
            >
              {isPending ? "Đang lưu..." : "Cập nhật thông tin"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};
