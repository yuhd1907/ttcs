import { z } from "zod";

export const JobSchema = z
  .object({
    name: z.string().min(1, "Tên công việc là bắt buộc"),
    minSalary: z.coerce.number().min(0, "Lương không được âm"),
    maxSalary: z.coerce.number().min(0, "Lương không được âm"),
    level: z.string().min(1, "Vui lòng chọn cấp bậc"),
    workingForm: z.string().min(1, "Vui lòng chọn hình thức làm việc"),
    technologies: z.string().min(1, "Vui lòng nhập các công nghệ"),
    specialization: z.string().min(1, "Vui lòng nhập vị trí chuyên môn"),
    fields: z.string().min(1, "Vui lòng nhập lĩnh vực làm việc"),
    images: z.array(z.any()).default([]),
    description: z.string().optional(),
    cityName: z.string().optional(),
  })
  .refine((data) => data.maxSalary >= data.minSalary, {
    message: "Lương tối đa phải lớn hơn hoặc bằng lương tối thiểu",
    path: ["maxSalary"],
  });

export type JobFormData = z.infer<typeof JobSchema>;
