import { z } from "zod";

export const UserProfileSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Vui lòng nhập họ tên!" })
    .min(2, { message: "Họ và tên quá ngắn" })
    .regex(/^[A-Za-zÀ-ỹ\s]+$/, { message: "Họ tên không hợp lệ" }),
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email!" })
    .email({ message: "Email không đúng định dạng" }),
  phone: z
    .string()
    .min(1, { message: "Vui lòng nhập số điện thoại" })
    .regex(/^(\+84|0)(3|5|7|8|9)([0-9]{8})$/, {
      message: "Số điện thoại không đúng định dạng VN",
    }),
  avatar: z.any().optional(),
  description: z.string().optional(),
});

export type UserProfileFormValues = z.infer<typeof UserProfileSchema>;
