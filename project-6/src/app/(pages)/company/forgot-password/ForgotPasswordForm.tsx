"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import {
  ForgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/schemas/auth.schema";

export const ForgotPasswordForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = (formData: ForgotPasswordFormValues) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "success") {
          router.push(`/company/otp`);
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
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-[15px] mt-[20px]"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-black text-[14px] font-[500]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Ví dụ: abc@gmail.com"
            className={`mt-[5px] w-full h-[46px] border rounded-[4px] px-[20px] outline-none
 placeholder:text-[#A6A6A6]
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
        <div>
          <button
            type="submit"
            className="h-[48px] w-full bg-[#0088FF] hover:bg-[#0077EE] active:bg-[#0066CC]
 rounded-[4px] text-white text-[16px] font-[700] cursor-pointer"
          >
            Gửi mã OTP
          </button>
        </div>
        <div className="text-center">
          <span className="mr-[10px] text-[#6E6F70]">Bạn đã nhớ mật khẩu?</span>
          <Link href="/company/login" className="text-[#5A8CFF] underline">
            Đăng nhập
          </Link>
        </div>
      </form>
    </>
  );
};
