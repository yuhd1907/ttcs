"use client";

import React, { useState, useEffect } from "react";
import MultiSelectDropdown from "@/app/components/multi-select-dropdown/MultiSelectDropdown";
import SalaryFilter from "./SalaryFIlter";
import JobFieldFilter from "./JobFieldFilter";

export interface FilterValues {
  levels: string[];
  workTypes: string[];
  salaryRange: number[] | null;
  jobFields: string[];
}

const jobLevelOptions = [
  { value: "intern", label: "Intern" },
  { value: "fresher", label: "Fresher" },
  { value: "junior", label: "Junior" },
  { value: "middle", label: "Middle" },
  { value: "senior", label: "Senior" },
  { value: "manager", label: "Manager" },
];

const workTypeOptions = [
  { value: "office", label: "Tại văn phòng" },
  { value: "remote", label: "Làm từ xa" },
  { value: "flexible", label: "Linh hoạt" },
];

const SearchFilters = ({ onChange }: { onChange?: (values: FilterValues) => void }) => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<number[] | null>(null);
  const [selectedJobFields, setSelectedJobFields] = useState<string[]>([]);
  const [hasSalary, setHasSalary] = useState(false);
  const [hasJobField, setHasJobField] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    onChange?.({
      levels: selectedLevels,
      workTypes: selectedWorkTypes,
      salaryRange,
      jobFields: selectedJobFields,
    });
  }, [selectedLevels, selectedWorkTypes, salaryRange, selectedJobFields]);

  const hasAnyFilter =
    selectedLevels.length > 0 ||
    selectedWorkTypes.length > 0 ||
    hasSalary ||
    hasJobField;

  const handleClearAll = () => {
    setSelectedLevels([]);
    setSelectedWorkTypes([]);
    setSalaryRange(null);
    setSelectedJobFields([]);
    setHasSalary(false);
    setHasJobField(false);
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="inline-flex sm:flex-row flex-col flex-wrap sm:gap-x-[12px] gap-y-[12px] items-center">
      <MultiSelectDropdown
        label="Cấp bậc"
        options={jobLevelOptions}
        selected={selectedLevels}
        onChange={setSelectedLevels}
      />
      <MultiSelectDropdown
        label="Hình thức làm việc"
        options={workTypeOptions}
        selected={selectedWorkTypes}
        onChange={setSelectedWorkTypes}
      />
      <SalaryFilter key={`salary-${resetKey}`} onActiveChange={setHasSalary} onApply={(range) => setSalaryRange(range)} />
      <JobFieldFilter
        key={`field-${resetKey}`}
        onActiveChange={setHasJobField}
        onSelectionChange={setSelectedJobFields}
      />
      {hasAnyFilter && (
        <button
          onClick={handleClearAll}
          className="text-[16px] text-gray-500 underline hover:text-gray-700 transition-colors ml-1 cursor-pointer"
        >
          Xóa
        </button>
      )}
    </div>
  );
};

export default SearchFilters;
