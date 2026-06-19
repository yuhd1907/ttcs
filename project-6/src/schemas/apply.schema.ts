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
  cv: z.any().optional(),
  useProfileCv: z.boolean().optional(),
  coverLetter: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.useProfileCv) {
    return;
  }

  if (!data.cv || data.cv.length !== 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Vui lòng tải lên CV của bạn",
      path: ["cv"],
    });
    return;
  }

  const file = data.cv[0];
  if (file.size > MAX_FILE_SIZE) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Kích thước file tối đa là 5MB",
      path: ["cv"],
    });
  }

  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Chỉ chấp nhận định dạng PDF",
      path: ["cv"],
    });
  }
});

export type ApplyFormData = z.infer<typeof ApplySchema>;
