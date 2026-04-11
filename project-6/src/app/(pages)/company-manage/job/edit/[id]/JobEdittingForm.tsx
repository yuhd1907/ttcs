/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { JobSchema, JobFormData } from "@/schemas/job.schema";
import { toast, Toaster } from "sonner";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobFormFields } from "@/app/components/job-form/JobFormFields";

export const JobEdittingForm = () => {
  const params = useParams();
  const id = params.id;

  const [isPending, setIsPending] = useState(false);
  const [job, setJob] = useState<JobFormData | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(JobSchema) as any,
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/edit/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setJob(data.job);
      });
  }, [id]);

  useEffect(() => {
    if (job) {
      reset({
        name: job.name || "",
        minSalary: job.minSalary || 0,
        maxSalary: job.maxSalary || 0,
        level: job.level || "",
        workingForm: job.workingForm || "",
        technologies: Array.isArray(job.technologies)
          ? job.technologies.join(", ")
          : job.technologies || "",
        specialization: job.specialization || "",
        fields: Array.isArray(job.fields)
          ? job.fields.join(", ")
          : job.fields || "",
        images: job.images || [],
        description: job.description || "",
      });
    }
  }, [job, reset]);

  const onSubmitSuccess = (values: JobFormData) => {
    setIsPending(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "images" && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    if (values.images && values.images.length > 0) {
      values.images.forEach((file: any) => {
        const actualFile = file instanceof File || file instanceof Blob ? file : file.file;
        if (actualFile) {
          formData.append("images", actualFile);
        }
      });
    }

    const edittingPromise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/job/edit/${id}`,
      {
        method: "PATCH",
        body: formData,
        credentials: "include",
      },
    )
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          return data;
        }
        throw new Error(data.message || "Có lỗi xảy ra");
      })
      .finally(() => setIsPending(false));

    toast.promise(edittingPromise, {
      loading: "Đang lưu...",
      success: (data) => data.message,
      error: (err) => err.message,
    });
  };

  return (
    <>
      <Toaster richColors position={"top-right"} />
      {job && (
        <form
          onSubmit={handleSubmit(onSubmitSuccess)}
          className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]"
        >
          <JobFormFields
            register={register}
            control={control}
            errors={errors}
            isPending={isPending}
            buttonText="Cập nhật"
          />
        </form>
      )}
    </>
  );
};

