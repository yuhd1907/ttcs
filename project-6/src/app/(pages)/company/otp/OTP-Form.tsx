"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { OTPSchema, OTPFormValues } from "@/schemas/auth.schema";

const OTPForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(OTPSchema),
  });

  const onSubmitSuccess = (data: OTPFormValues) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code === "error") {
          toast.error(data.message);
        } else if (data.code === "success") {
          router.push("/company/reset-password");
        }
      });
  };

  return (
    <>
      <Toaster richColors position={"top-right"} />
      <form
        onSubmit={handleSubmit(onSubmitSuccess)}
        className={"grid grid-cols-1 gap-[15px] mt-[20px]"}
      >
        <div>
          <label
            htmlFor={"otp"}
            className="block text-black text-[14px] font-[500]"
          >
            Mã OTP:
          </label>
          <input
            type="text"
            id="otp"
            inputMode={"numeric"}
            maxLength={6}
            autoComplete={"one-time-code"}
            {...register("otp")}
            placeholder={"Ví dụ: 123456"}
            className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 placeholder:text-[#A6A6A6]
 ${
   errors.otp ? "border-red-500 ]" : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
          />
          {errors.otp && (
            <p className="text-[#AE1210] text-[12px] mt-[4px]">
              {errors.otp.message}
            </p>
          )}
        </div>
        <div>
          <button
            className="h-[48px] w-[100%] bg-[#0088FF] hover:bg-[#0077EE] active:bg-[#0066CC]
 rounded-[4px] text-white text-[16px] font-[700] cursor-pointer"
          >
            Xác thực
          </button>
        </div>
        <div className={"text-center"}>
          <span className={"mr-[10px] text-[#6E6F70]"}>
            Bạn đã nhớ mật khẩu?
          </span>
          <Link href={"/company/login"} className={"text-[#5A8CFF] underline"}>
            Đăng nhập
          </Link>
        </div>
      </form>
    </>
  );
};

export default OTPForm;
