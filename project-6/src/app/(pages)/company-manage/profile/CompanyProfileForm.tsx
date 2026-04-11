"use client";

import { useAuth } from "@/hooks/useAuth";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import EditorMCE from "@/app/components/editor/EditorMCE";
import { useProvinces } from "@/hooks/useProvinces";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CompanyProfileSchema,
  CompanyProfileValues,
} from "@/schemas/company.schema";
import { Province } from "@/interface/location.interface";
import CompanyField from "@/app/(pages)/company-manage/profile/CompanyField";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export const CompanyProfileForm = () => {
  const { infoCompany } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CompanyProfileValues>({
    resolver: zodResolver(CompanyProfileSchema),
    defaultValues: {
      companyName: infoCompany?.companyName || "",
      avatar: infoCompany?.avatar ? [infoCompany.avatar] : [],
      province: infoCompany?.province || "",
      address: infoCompany?.address || "",
      model: infoCompany?.model || "",
      employees: infoCompany?.employees || "",
      workingTime: infoCompany?.workingTime || "",
      overtime: infoCompany?.overtime || "",
      email: infoCompany?.email || "",
      phone: infoCompany?.phone || "",
      field: infoCompany?.field || "",
      description: infoCompany?.description || "",
    },
  });

  const [isPending, setIsPending] = useState(false);
  const { provinceList } = useProvinces();



  useEffect(() => {
    if (infoCompany) {
      reset({
        companyName: infoCompany.companyName || "",
        avatar: infoCompany.avatar ? [infoCompany.avatar] : [],
        province: infoCompany.province || "",
        address: infoCompany.address || "",
        model: infoCompany.model || "",
        employees: infoCompany.employees || "",
        workingTime: infoCompany.workingTime || "",
        overtime: infoCompany.overtime || "",
        email: infoCompany.email || "",
        phone: infoCompany.phone || "",
        field: infoCompany.field || "",
        description: infoCompany.description || "",
      });
    }
  }, [infoCompany, reset]);

  const onSubmitSucess = (values: CompanyProfileValues) => {
    const formData = new FormData();
    console.log(
      Object.entries(values).forEach(([key, value]) => {
        if (key !== "avatar" && value !== undefined) {
          formData.append(key, value.toString());
        }
      }),
    );
    if (values.avatar && values.avatar.length > 0) {
      const avatarItem = values.avatar[0];
      if (avatarItem instanceof File || avatarItem instanceof Blob) {
        formData.append("avatar", avatarItem);
      }
    }

    const updatePromise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/profile`,
      {
        method: "PATCH",
        body: formData,
        credentials: "include",
      },
    )
      .then(async (res) => {
        const data = await res.json();
        if (data.code !== "success") {
          throw new Error("Có lỗi xảy ra khi lưu!");
        }
        return "Cập nhật thông tin thành công!";
      })
      .finally(() => {
        setIsPending(false);
      });

    toast.promise(updatePromise, {
      loading: "Đang lưu thông tin...",
      success: (message) => {
        return message;
      },
      error: (err) => {
        return err.message;
      },
    });
  };

  return (
    <>
      <Toaster richColors position={"top-right"} />
      {infoCompany && (
        <form
          onSubmit={handleSubmit(onSubmitSucess)}
          className="mt-[20px] grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="companyName"
              className="block text-black text-[14px] font-[500]"
            >
              Tên công ty *
            </label>
            <input
              type="text"
              id="companyName"
              {...register("companyName")}
              placeholder="LG Electronics Development Vietnam (LGEDV)"
              className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.companyName
     ? "border-red-500 ]"
     : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
            />
            {errors.companyName && (
              <p className="text-[#AE1210] text-[12px] mt-[4px]">
                {errors.companyName.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="logo"
              className="block text-black text-[14px] font-[500]"
            >
              Logo
            </label>
            <div className={"inner-upload-image"}>
              <Controller
                name={"avatar"}
                control={control}
                render={({ field }) => (
                  <FilePond
                    files={field.value as (File | Blob | string)[]}
                    maxFiles={1}
                    allowMultiple={false}
                    allowRemove={true}
                    labelIdle={"+"}
                    acceptedFileTypes={["image/*"]}
                    imagePreviewHeight={150}
                    onupdatefiles={(fileItems) => {
                      const actualFiles = fileItems.map(
                        (fileItem) => fileItem.file,
                      );
                      field.onChange(actualFiles);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="province"
              className="block text-black text-[14px] font-[500]"
            >
              Thành phố
            </label>
            <select
              id="province"
              {...register("province")}
              className="mt-[5px] w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] px-[20px] outline-none focus:border-[#0088FF]"
            >
              <option value="">-- Chọn thành phố --</option>
              {provinceList.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label
              htmlFor="address"
              className="block text-black text-[14px] font-[500]"
            >
              Địa chỉ *
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.address
     ? "border-red-500 ]"
     : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
              placeholder="Tầng 15, tòa Keangnam Landmark 72, Mễ Trì, Nam Tu Liem"
            />
            {errors.address && (
              <p className="text-[#AE1210] text-[12px] mt-[4px]">
                {errors.address.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="model"
              className="block text-black text-[14px] font-[500]"
            >
              Mô hình công ty *
            </label>
            <input
              type="text"
              id="model"
              {...register("model")}
              placeholder="Outsourcing"
              className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.model ? "border-red-500 ]" : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
            />
            {errors.model && (
              <p className="text-[#AE1210] text-[12px] mt-[4px]">
                {errors.model.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="employees"
              className="block text-black text-[14px] font-[500]"
            >
              Quy mô công ty *
            </label>
            <input
              type="text"
              id="employees"
              {...register("employees")}
              placeholder="151 - 300 nhân viên"
              className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.employees
     ? "border-red-500 ]"
     : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
            />
            {errors.employees && (
              <p className="text-[#AE1210] text-[12px] mt-[4px]">
                {errors.employees.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="workingTime"
              className="block text-black text-[14px] font-[500]"
            >
              Thời gian làm việc *
            </label>
            <input
              type="text"
              id="workingTime"
              {...register("workingTime")}
              placeholder="Thứ 2 - Thứ 6"
              className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.workingTime
     ? "border-red-500 ]"
     : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
            />
            {errors.workingTime && (
              <p className="text-[#AE1210] text-[12px] mt-[4px]">
                {errors.workingTime.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="overtime"
              className="block text-black text-[14px] font-[500]"
            >
              Làm việc ngoài giờ *
            </label>
            <input
              type="text"
              id="overtime"
              {...register("overtime")}
              placeholder="Không có OT"
              className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.overtime
     ? "border-red-500 ]"
     : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
            />
            {errors.overtime && (
              <p className="text-[#AE1210] text-[12px] mt-[4px]">
                {errors.overtime.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="email"
              className="block text-black text-[14px] font-[500]"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="contact@abc.com"
              className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.email ? "border-red-500 ]" : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
            />
            {errors.email && (
              <p className="text-[#AE1210] text-[12px] mt-[4px]">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="phone"
              className="block text-black text-[14px] font-[500]"
            >
              Số điện thoại *
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone")}
              placeholder="01234567890"
              className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.phone ? "border-red-500 ]" : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
            />
            {errors.phone && (
              <p className="text-[#AE1210] text-[12px] mt-[4px]">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <Controller
              control={control}
              name={"field"}
              render={({ field }) => (
                <CompanyField
                  value={field.value || ""}
                  onChange={field.onChange}
                  errors={errors.field?.message}
                />
              )}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-black text-[14px] font-[500]"
            >
              Mô tả chỉ tiết
            </label>
            <Controller
              control={control}
              name={"description"}
              render={({ field }) => (
                <EditorMCE
                  value={field.value || ""}
                  onEditorChange={(content: string) => field.onChange(content)}
                />
              )}
            />
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
