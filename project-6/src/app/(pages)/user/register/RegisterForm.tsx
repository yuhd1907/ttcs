"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  UserRegisterSchema,
  UserRegisterFormValues,
} from "@/schemas/auth.schema";

export const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFormValues>({
    resolver: zodResolver(UserRegisterSchema),
  });

  const onRegister = (data: UserRegisterFormValues) => {
    console.log(data);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code === "error") {
          toast.error(data.message);
        } else if (data.code === "success") {
          toast.success(data.message);
          router.push("/user/login");
        }
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onRegister)}
      className="grid grid-cols-1 gap-[15px] mt-[20px]"
      id="userRegisterForm"
    >
      <div>
        <label
          htmlFor="fullName"
          className="block text-black text-[14px] font-[500]"
        >
          Họ tên *
        </label>
        <input
          type="text"
          id="fullName"
          {...register("fullName")}
          className={`mt-[5px] w-full h-[46px] border border-[#DEDEDE] rounded-[4px] px-[20px]
 ${
   errors.fullName
     ? "border-red-500 ]"
     : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
        />
        {errors.fullName && (
          <p className="text-[#AE1210] text-[12px] mt-[4px]">
            {errors.fullName.message}
          </p>
        )}
      </div>
      <div>
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
          className={`mt-[5px] w-full h-[46px] border border-[#DEDEDE] rounded-[4px] px-[20px]
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
          className={`mt-[5px] w-full h-[46px] border border-[#DEDEDE] rounded-[4px] px-[20px]
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

      <button
        type="submit"
        className="h-[48px] w-full bg-[#0088FF] rounded-[4px] text-white text-[16px] font-[700] cursor-pointer"
      >
        Đăng ký
      </button>
    </form>
  );
};
