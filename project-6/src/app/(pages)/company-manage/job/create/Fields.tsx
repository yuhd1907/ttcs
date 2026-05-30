import { FaAngleDown } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SuggestionDropDown } from "@/app/components/suggestionDropdown/SuggestionDropDown";
import { FieldOption } from "@/interface/field.interface";
import { toSlugHelpter } from "@/helper/Slug.helpter";
import { Selector } from "@/interface/selector.interface";

export const Fields = ({ value, onChange, errors }: Selector) => {
  const [fieldSuggestions, setFieldSuggestions] = useState<FieldOption[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const fieldRef = useRef<HTMLDivElement>(null);

  const selectedFieldNames = value ? value.split(", ").filter(Boolean) : [];
  const keyword = toSlugHelpter(inputValue);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/master-data/fields`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: FieldOption[]) =>
        setFieldSuggestions(Array.isArray(data) ? data : []),
      )
      .catch(() => setFieldSuggestions([]));
  }, []);

  const handleAddField = (fieldName: string) => {
    if (!selectedFieldNames.includes(fieldName)) {
      onChange([...selectedFieldNames, fieldName].join(", "));
    }
    setInputValue("");
    setShowSuggestion(false);
  };

  const handleRemoveField = (fieldName: string) => {
    onChange(
      selectedFieldNames.filter((name) => name !== fieldName).join(", "),
    );
  };

  useClickOutside(fieldRef, () => setShowSuggestion(false));

  return (
    <div ref={fieldRef} className="sm:col-span-2 relative">
      <label
        htmlFor="fields"
        className="block text-black text-[14px] font-[500]"
      >
        Lĩnh vực *
      </label>
      <div
        className={`mt-[5px] w-full min-h-[46px] border border-[1px] rounded-[4px] px-[20px] py-[6px]
 flex flex-wrap gap-2 cursor-pointer
 ${errors ? "border-red-500 ]" : "border-[#DEDEDE] focus:border-[#0088FF]"}`}
      >
        {selectedFieldNames.map((fieldName) => (
          <span
            key={fieldName}
            className="bg-[#FFF1F2] text-[#BE123C] px-3 py-[2px] rounded-[4px] text-[13px] font-[500] flex items-center gap-2"
          >
            {fieldName}
            <FaTimes
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveField(fieldName);
              }}
              className="cursor-pointer hover:text-red-500"
            />
          </span>
        ))}
        <input
          type="text"
          id="fields"
          value={inputValue}
          onFocus={() => setShowSuggestion(true)}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              const val = inputValue.replace(',', '').trim();
              if (val) handleAddField(val);
            }
          }}
          className="flex-1 min-w-[120px] outline-none bg-transparent"
        />
        <FaAngleDown className="absolute right-[5px] top-[40px] text-[14px] text-gray-400" />
      </div>

      <SuggestionDropDown
        items={fieldSuggestions.filter(
          (field) =>
            field.slug.toLowerCase().includes(keyword) &&
            !selectedFieldNames.includes(field.name),
        )}
        renderItem={(field) => field.name}
        onSelect={(field) => handleAddField(field.name)}
        isVisible={showSuggestion}
      />

      {errors && (
        <p className="text-[#AE1210] text-[12px] mt-[4px]">{errors}</p>
      )}
    </div>
  );
};

export default Fields;
