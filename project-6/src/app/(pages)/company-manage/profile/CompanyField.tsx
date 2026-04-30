import { useEffect, useRef, useState } from "react";
import { SuggestionDropDown } from "@/app/components/suggestionDropdown/SuggestionDropDown";
import { useClickOutside } from "@/hooks/useClickOutside";
import { FieldOption } from "@/interface/field.interface";
import { toSlugHelpter } from "@/helper/Slug.helpter";

interface CompanyFieldProps {
  value: string;
  onChange: (value: string) => void;
  errors?: string;
}

const CompanyField = ({ value, onChange, errors }: CompanyFieldProps) => {
  const [fieldList, setFieldList] = useState<FieldOption[]>([]);
  const [showFieldSuggestion, setShowFieldSuggestion] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  useClickOutside(fieldRef, () => setShowFieldSuggestion(false));

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/master-data/fields`)
      .then((res) => res.json())
      .then((data: FieldOption[]) => {
        setFieldList(Array.isArray(data) ? data : []);
      })
      .catch(() => setFieldList([]));
  }, []);

  return (
    <div ref={fieldRef} className="sm:col-span-2 relative">
      <label
        htmlFor="field"
        className="block text-black text-[14px] font-[500]"
      >
        Lĩnh vực công ty *
      </label>
      <input
        type="text"
        id="field"
        value={value || ""}
        onFocus={() => setShowFieldSuggestion(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setShowFieldSuggestion(true);
        }}
        className={`mt-[5px] w-[100%] h-[46px] border rounded-[4px] px-[20px] outline-none
 ${errors ? "border-red-500 ]" : "border-[#DEDEDE] focus:border-[#0088FF]"}`}
      />
      <SuggestionDropDown
        items={fieldList.filter((item) =>
          item.slug.includes(toSlugHelpter(value || "")),
        )}
        renderItem={(item) => item.name}
        onSelect={(item) => {
          onChange(item.name);
          setShowFieldSuggestion(false);
        }}
        isVisible={showFieldSuggestion}
      />
      {errors && (
        <p className="text-[#AE1210] text-[12px] mt-[4px]">{errors}</p>
      )}
    </div>
  );
};

export default CompanyField;
