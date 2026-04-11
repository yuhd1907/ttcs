"use client";

import Link from "next/link";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast, Toaster} from "sonner";
import {useRouter} from "next/navigation";
import { LoginSchema, LoginFormValues } from "@/schemas/auth.schema";

export const LoginForm = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }} = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onLogin = (data: LoginFormValues) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if(data.code === 'success') {
          toast.success(data.message);
          router.push('/');
        }
        else if(data.code === 'error') {
          toast.error(data.message);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <>
      <Toaster richColors position={'top-right'}/>
      <form onSubmit={handleSubmit(onLogin)} className="grid grid-cols-1 gap-[15px] mt-[20px]">
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
            {...register('email')}
            className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
            ${errors.email 
              ? 'border-red-500 focus:shadow-[0_0_0_4px_#F6CCD0_!important]' 
              : 'border-[#DEDEDE] focus:border-[#0088FF]'}`}
          />
          {errors.email && (
            <p className="text-[#AE1210] text-[12px] mt-[4px]">{errors.email.message}</p>
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
            {...register('password')}
            className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
            ${errors.password
              ? 'border-red-500 focus:shadow-[0_0_0_4px_#F6CCD0_!important]'
              : 'border-[#DEDEDE] focus:border-[#0088FF]'}`}
          />
          {errors.password && (
            <p className="text-[#AE1210] text-[12px] mt-[4px]">{errors.password.message}</p>
          )}
        </div>
        <div className={'flex justify-end'}>
          <Link
            href={'/user/forgot-password'}
            className={'text-[#5A8CFF] hover:text-[#3B6EDB] underline'}
          >
            Quên mật khẩu
          </Link>
        </div>
        <div className="">
          <button
            className="h-[48px] w-[100%] bg-[#0088FF] hover:bg-[#0077EE] active:bg-[#0066CC]
             rounded-[4px] text-white text-[16px] font-[700] cursor-pointer"
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </>
  )
}