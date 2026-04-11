/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { JobSchema, JobFormData } from "@/schemas/job.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobFormFields } from "@/app/components/job-form/JobFormFields";

export const JobCreatingForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(JobSchema) as any,
    defaultValues: {
      name: "",
      minSalary: 0,
      maxSalary: 0,
      level: "",
      workingForm: "",
      technologies: "",
      specialization: "",
      fields: "",
      images: [],
      description: "",
      cityName: "",
    },
  });

  const [isPending, setIsPending] = useState(false);

  const onSubmitSuccess = (values: JobFormData) => {
    setIsPending(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "images" && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    if (values.images && values.images.length > 0) {
      values.images.forEach((fileItem: any) => {
        const file = fileItem.file || fileItem;
        if (file) formData.append("images", file);
      });
    }

    const creatingPromise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/job/create`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    )
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          reset();
          return data;
        }
        throw new Error(data.message || "Có lỗi xảy ra");
      })
      .finally(() => setIsPending(false));

    toast.promise(creatingPromise, {
      loading: "Đang lưu...",
      success: (data) => data.message,
      error: (err) => err.message,
    });
  };

  return (
    <>
      <Toaster richColors position={"top-right"} />
      <form
        onSubmit={handleSubmit(onSubmitSuccess)}
        id={"JobCreatingForm"}
        className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]"
      >
        <JobFormFields
          register={register}
          control={control}
          errors={errors}
          isPending={isPending}
          buttonText="Tạo mới"
        />
      </form>
    </>
  );
};

