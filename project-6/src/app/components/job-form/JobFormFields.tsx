/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller } from "react-hook-form";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import EditorMCE from "@/app/components/editor/EditorMCE";
import Technology from "./Technology";
import Specialization from "./Specialization";
import Fields from "./Fields";
import { useProvinces } from "@/hooks/useProvinces";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

interface JobFormFieldsProps {
  register: any;
  control: any;
  errors: any;
  isPending: boolean;
  buttonText: string;
}

export const JobFormFields = ({
  register,
  control,
  errors,
  isPending,
  buttonText,
}: JobFormFieldsProps) => {
  const { provinceList } = useProvinces();
  return (
    <>
      <div className="sm:col-span-2">
        <label
          htmlFor="name"
          className="block text-black text-[14px] font-[500]"
        >
          Tên công việc *
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.name ? "border-red-500" : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
        />
        {errors.name && (
          <p className="text-[#AE1210] text-[12px] mt-[4px]">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between border border-[#DEDEDE] rounded-[4px] px-[20px] h-[46px] mt-[10px]">
        <label
          htmlFor="isInternship"
          className="text-black text-[14px] font-[500] cursor-pointer select-none"
        >
          Chấp nhận internship
        </label>
        <input
          type="checkbox"
          id="isInternship"
          {...register("isInternship")}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
      </div>
      <div className="hidden sm:block"></div>

      <div className="">
        <label
          htmlFor="minSalary"
          className="block text-black text-[14px] font-[500]"
        >
          Mức lương tối thiểu ($) *
        </label>
        <input
          type="text"
          id="minSalary"
          {...register("minSalary")}
          className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.minSalary
     ? "border-red-500"
     : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
        />
        {errors.minSalary && (
          <p className="text-[#AE1210] text-[12px] mt-[4px]">
            {errors.minSalary.message}
          </p>
        )}
      </div>

      <div className="">
        <label
          htmlFor="maxSalary"
          className="block text-black text-[14px] font-[500]"
        >
          Mức lương tối đa ($) *
        </label>
        <input
          type="text"
          id="maxSalary"
          {...register("maxSalary")}
          className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.maxSalary
     ? "border-red-500"
     : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
        />
        {errors.maxSalary && (
          <p className="text-[#AE1210] text-[12px] mt-[4px]">
            {errors.maxSalary.message}
          </p>
        )}
      </div>

      <div className="">
        <label
          htmlFor="level"
          className="block text-black text-[14px] font-[500]"
        >
          Cấp bậc *
        </label>
        <select
          id="level"
          {...register("level")}
          className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.level ? "border-red-500" : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
        >
          <option value="">Chọn cấp bậc</option>
          <option value="intern">Intern</option>
          <option value="fresher">Fresher</option>
          <option value="junior">Junior</option>
          <option value="middle">Middle</option>
          <option value="senior">Senior</option>
          <option value="manager">Manager</option>
        </select>
        {errors.level && (
          <p className="text-[#AE1210] text-[12px] mt-[4px]">
            {errors.level.message}
          </p>
        )}
      </div>

      <div className="">
        <label
          htmlFor="workingForm"
          className="block text-black text-[14px] font-[500]"
        >
          Hình thức làm việc *
        </label>
        <select
          id="workingForm"
          {...register("workingForm")}
          className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${
   errors.workingForm
     ? "border-red-500"
     : "border-[#DEDEDE] focus:border-[#0088FF]"
 }`}
        >
          <option value="">Chọn hình thức</option>
          <option value="office">Tại văn phòng</option>
          <option value="remote">Làm từ xa</option>
          <option value="flexible">Linh hoạt</option>
        </select>
        {errors.workingForm && (
          <p className="text-[#AE1210] text-[12px] mt-[4px]">
            {errors.workingForm.message}
          </p>
        )}
      </div>

      <div className="">
        <label
          htmlFor="cityName"
          className="block text-black text-[14px] font-[500]"
        >
          Địa điểm (Tỉnh/Thành phố)
        </label>
        <select
          id="cityName"
          {...register("cityName")}
          className="mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none border-[#DEDEDE] focus:border-[#0088FF]"
        >
          <option value="">-- Chọn tỉnh thành --</option>
          {provinceList.map((p: any) => (
            <option key={p.id || p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>



      <Controller
        control={control}
        name={"specialization"}
        render={({ field }) => (
          <Specialization
            value={field.value}
            onChange={field.onChange}
            errors={errors.specialization?.message}
          />
        )}
      />

      <Controller
        control={control}
        name={"technologies"}
        render={({ field }) => (
          <Technology
            value={field.value}
            onChange={field.onChange}
            errors={errors.technologies?.message}
          />
        )}
      />

      <Controller
        control={control}
        name={"fields"}
        render={({ field }) => (
          <Fields
            value={field.value}
            onChange={field.onChange}
            errors={errors.fields?.message}
          />
        )}
      />

      <div className="sm:col-span-2">
        <label
          htmlFor="images"
          className="block text-black text-[14px] font-[500]"
        >
          Danh sách ảnh
        </label>
        <div className={"inner-upload-multi-images"}>
          <Controller
            control={control}
            name={"images"}
            render={({ field }) => (
              <FilePond
                files={field.value as (File | Blob | string)[]}
                allowMultiple={true}
                maxFiles={8}
                allowRemove={true}
                onupdatefiles={(fileItems) => {
                  const actualFiles = fileItems.map(
                    (fileItem) => fileItem.file,
                  );
                  field.onChange(actualFiles);
                }}
                labelIdle="+"
                acceptedFileTypes={["image/*"]}
              />
            )}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="description"
          className="block text-black text-[14px] font-[500]"
        >
          Mô tả chi tiết
        </label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <EditorMCE
              id={"description"}
              value={field.value}
              onEditorChange={(content: string) => field.onChange(content)}
            />
          )}
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className={`h-12 px-8 rounded text-white text-base font-bold transition-all duration-200 
 ${
   isPending
     ? "bg-gray-400 cursor-not-allowed"
     : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
 }`}
        >
          {isPending ? "Đang lưu..." : buttonText}
        </button>
      </div>
    </>
  );
};
