import { z } from "zod";

export const UserProfileSchema = z.object({
  avatar: z.any().optional(),
  username: z
    .string()
    .min(1, { message: "Vui lòng nhập họ tên!" })
    .min(2, { message: "Hộ và tên quá ngắn" })
    .regex(/^[A-Za-zÀ-ỹ\s]+$/, { message: "Họ tên không hợp lệ" }),
  position: z
    .string()
    .min(1, { message: "Vui lòng nhập chức danh!" })
    .min(2, { message: "Chức danh quá ngắn" })
    .regex(/^[A-Za-zÀ-ỹ\s]+$/, { message: "Chức danh không hợp lệ" }),
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
  gender: z.string().min(1, { message: "Vui lòng chọn giới tính!" }),
  birth_date: z.string().min(1, { message: "Vui lòng chọn ngày sinh!" }),
  city: z.string().min(1, { message: "Vui lòng chọn tỉnh/thành phố!" }),
  address: z.string().optional(),
  personal_link: z.string().optional(),

});

export type UserProfileFormValues = z.infer<typeof UserProfileSchema>;
