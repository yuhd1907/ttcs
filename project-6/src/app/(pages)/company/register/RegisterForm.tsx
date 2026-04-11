"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import {
  CompanyRegisterSchema,
  CompanyRegisterFormValues,
} from "@/schemas/auth.schema";

export const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyRegisterFormValues>({
    resolver: zodResolver(CompanyRegisterSchema),
  });

  const onRegister = (data: CompanyRegisterFormValues) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "success") {
          toast.success(data.message);
          router.push("/company/login");
        } else if (data.code === "error") {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
      });
  };

  return (
    <>
      <Toaster richColors position={"top-right"} />
      <form
        onSubmit={handleSubmit(onRegister)}
        className="grid grid-cols-1 gap-[15px] mt-[20px]"
      >
        <div className="">
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
            className={`mt-[5px] w-full h-[46px] border rounded-[4px] px-[20px] outline-none
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
            className={`mt-[5px] w-full h-[46px] border rounded-[4px] px-[20px] outline-none
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
            htmlFor="password"
            className="block text-black text-[14px] font-[500]"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className={`mt-[5px] w-full h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.password
     ? "border-red-500 ]"
     : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
          />
          {errors.password && (
            <p className="text-[#AE1210] text-[12px] mt-[4px]">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="">
          <button
            type="submit"
            className="h-[48px] w-full bg-[#0088FF] hover:bg-[#0077EE] active:bg-[#0066CC]
 rounded-[4px] text-white text-[16px] font-[700] cursor-pointer"
          >
            Đăng ký
          </button>
        </div>
      </form>
    </>
  );
};
