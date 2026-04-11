"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import {
  ResetPasswordSchema,
  ResetPasswordFormValues,
} from "@/schemas/auth.schema";

export const ResetPasswordForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onResetPassword = (data: ResetPasswordFormValues) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: data.password }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "success") {
          toast.success(data.message);
          router.push("/user/login");
        }
      });
  };

  return (
    <>
      <Toaster richColors position={"top-right"} />
      <form
        onSubmit={handleSubmit(onResetPassword)}
        className="grid grid-cols-1 gap-[15px] mt-[20px]"
      >
        <div className="">
          <label
            htmlFor="new-password"
            className="block text-black text-[14px] font-[500]"
          >
            Mật khẩu mới:
          </label>
          <input
            type="password"
            id="new-password"
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
          <label
            htmlFor="confirmPassword"
            className="block text-black text-[14px] font-[500]"
          >
            Xác nhận mật khẩu:
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className={`mt-[5px] w-full h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.confirmPassword
     ? "border-red-500 ]"
     : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
          />
          {errors.confirmPassword && (
            <p className="text-[#AE1210] text-[12px] mt-[4px]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="">
          <button
            type="submit"
            className="h-[48px] w-full bg-[#0088FF] hover:bg-[#0077EE] active:bg-[#0066CC]
 rounded-[4px] text-white text-[16px] font-[700] cursor-pointer"
          >
            Xác nhận
          </button>
        </div>
      </form>
    </>
  );
};
