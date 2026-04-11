import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { JobCategory, RoleOption } from "@/interface/specialization.interface";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SuggestionDropDown } from "@/app/components/suggestionDropdown/SuggestionDropDown";
import { useRoles } from "@/hooks/useRoles";
import { Selector } from "@/interface/selector.interface";

const Specialization = ({ value, onChange, errors }: Selector) => {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const { roleList } = useRoles();
  const [inputValue, setInputValue] = useState(value);
  const specializationRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useClickOutside(specializationRef, () => setShowSuggestion(false));

  return (
    <div ref={specializationRef} className="sm:col-span-2 relative">
      <label
        htmlFor="specialization"
        className="block text-black text-[14px] font-[500]"
      >
        Chuyên môn *
      </label>
      <div
        className={`mt-[5px] w-full min-h-[46px] border border-[1px] border-[#DEDEDE] rounded-[4px] px-[20px] py-[6px]
 flex flex-wrap gap-2 cursor-pointer
 ${errors ? "border-red-500" : "border-[#DEDEDE] focus-within:border-[#0088FF]"} `}
      >
        <input
          type="text"
          id="specialization"
          value={inputValue}
          onFocus={() => {
            if (!inputValue || inputValue.trim() === "") {
              setShowSuggestion(true);
            }
          }}
          onChange={(e) => {
            const newValue = e.target.value;
            setInputValue(newValue);
            onChange(newValue);
            if (!newValue || newValue.trim() === "") {
              setShowSuggestion(true);
            }
          }}
          className={`flex-1 outline-none`}
        />
        <FaAngleDown
          className={
            "absolute right-[15px] top-[40px]" + " text-[14px] text-gray-400"
          }
        />
      </div>
      <SuggestionDropDown
        items={roleList.filter((role) =>
          role.name.toLowerCase().includes(inputValue.toLowerCase()),
        )}
        renderItem={(role) => role.name}
        onSelect={(role) => {
          setInputValue(role.name);
          onChange(role.name);
          setShowSuggestion(false);
        }}
        isVisible={showSuggestion}
      />
      {errors && (
        <p className="text-[#AE1210] text-[12px] mt-[4px]">{errors}</p>
      )}
    </div>
  );
};

export default Specialization;
