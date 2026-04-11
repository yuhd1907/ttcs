import { z } from "zod";

// Login Schema - dùng chung cho user và company
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email!" })
    .email({ message: "Email không đúng định dạng!" }),
  password: z
    .string()
    .min(1, { message: "Vui lòng nhập mật khẩu!" })
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message:
        "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ít nhất 1 ký tự đặc biệt",
    }),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;

// Register Schema cho User
export const UserRegisterSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: "Vui lòng nhập họ tên!" })
    .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự" })
    .regex(/^[A-Za-zÀ-ỹ\s]+$/, { message: "Họ và tên không hợp lệ!" }),
  email: z
    .string()
    .nonempty({ message: "Vui lòng nhập email!" })
    .email({ message: "Email không đúng định dạng" }),
  password: z
    .string()
    .nonempty({ message: "Vui lòng nhập mật khẩu!" })
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message:
        "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ít nhất 1 ký tự đặc biệt",
    }),
});

export type UserRegisterFormValues = z.infer<typeof UserRegisterSchema>;

// Register Schema cho Company
export const CompanyRegisterSchema = z.object({
  companyName: z
    .string()
    .min(1, { message: "Vui lòng nhập tên công ty!" })
    .min(2, { message: "Tên công ty phải có ít nhất 2 kí tự" }),
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email!" })
    .email({ message: "Email không đúng định dạng" }),
  password: z
    .string()
    .min(1, { message: "Vui lòng nhập mật khẩu!" })
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message:
        "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ít nhất 1 ký tự đặc biệt",
    }),
});

export type CompanyRegisterFormValues = z.infer<typeof CompanyRegisterSchema>;

// Forgot Password Schema - dùng chung
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email!" })
    .email({ message: "Email không đúng định dạng!" }),
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

// Reset Password Schema - dùng chung
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Vui lòng nhập mật khẩu!" })
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
          "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ít nhất 1 ký tự đặc biệt",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Vui lòng xác nhận lại mật khẩu!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp!",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

// OTP Schema - dùng chung
export const OTPSchema = z.object({
  otp: z
    .string()
    .nonempty({ message: "Vui lòng nhập mã OTP" })
    .max(6, { message: "Mã OTP chỉ có 6 ký tự" }),
});

export type OTPFormValues = z.infer<typeof OTPSchema>;
