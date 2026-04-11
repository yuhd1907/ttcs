import { z } from "zod";

// Company Profile Schema
export const CompanyProfileSchema = z.object({
  companyName: z
    .string()
    .min(1, "Vui lòng nhập tên công ty!")
    .min(3, "Tên công ty quá ngắn"),
  avatar: z.any().optional(),
  province: z.string().optional(),
  address: z.string().min(1, "Vui lòng nhập địa chỉ cụ thể!"),
  model: z.string().min(1, "Vui lòng nhập mô hình hoạt động!"),
  employees: z.string().min(1, "Vui lòng nhập quy mô nhân sự!"),
  workingTime: z.string().min(1, "Vui lòng nhập thời gian làm việc!"),
  overtime: z.string().min(1, "Vui lòng nhập thông tin làm việc ngoài giờ!"),
  email: z
    .string()
    .min(1, "Vui lòng nhập email liên hệ!")
    .email("Email không đúng định dạng!"),
  phone: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại!")
    .regex(/^(\+84|0)[35789][0-9]{8}$/, "Số điện thoại không hợp lệ (VN)"),
  field: z.string().min(1, "Vui lòng nhập lĩnh vực công ty!"),
  description: z.string().optional(),
});

export type CompanyProfileValues = z.infer<typeof CompanyProfileSchema>;
