import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const ApplySchema = z.object({
  fullName: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .max(11, "Số điện thoại không quá 11 số")
    .regex(/^(0|84)(3|5|7|8|9)([0-9]{8})$/, "Số điện thoại không đúng định dạng Việt Nam"),
  cv: z
    .any()
    .refine((files) => files?.length === 1, "Vui lòng tải lên CV của bạn")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Kích thước file tối đa là 5MB`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Chỉ chấp nhận định dạng PDF"
    ),
  coverLetter: z.string().optional(),
});

export type ApplyFormData = z.infer<typeof ApplySchema>;
