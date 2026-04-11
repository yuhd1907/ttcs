import { FaAngleDown } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Skill } from "@/interface/skill.interface";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SuggestionDropDown } from "@/app/components/suggestionDropdown/SuggestionDropDown";
import { useSkills } from "@/hooks/useSkills";
import { Selector } from "@/interface/selector.interface";

const Technology = ({ value, onChange, errors }: Selector) => {
  const { skillList: techSuggestions } = useSkills();
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const techRef = useRef<HTMLDivElement>(null);

  const selectedTechs = value ? value.split(", ").filter(Boolean) : [];

  const handleAddTech = (tech: string) => {
    if (!selectedTechs.includes(tech)) {
      const newTechList = [...selectedTechs, tech].join(", ");
      onChange(newTechList);
    }
    setInputValue("");
    setShowSuggestion(false);
  };

  const handleRemoveTech = (tech: string) => {
    const newTechList = selectedTechs.filter((t) => t !== tech).join(", ");
    onChange(newTechList);
  };

  useClickOutside(techRef, () => setShowSuggestion(false));

  return (
    <>
      <div ref={techRef} className="sm:col-span-2 relative">
        <label
          htmlFor="technologies"
          className="block text-black text-[14px] font-[500]"
        >
          Các công nghệ *
        </label>
        <div
          className={`mt-[5px] w-full min-h-[46px] border border-[1px] border-[#DEDEDE] rounded-[4px] px-[20px] py-[6px]
 flex flex-wrap gap-2 cursor-pointer
 ${errors ? "border-red-500" : "border-[#DEDEDE] focus-within:border-[#0088FF]"} `}
        >
          {selectedTechs.map((tech) => (
            <span
              key={tech}
              className="bg-[#E0EFFF] text-[#0088FF] px-3 py-[2px] rounded-[4px] text-[13px] font-[500] flex items-center gap-2"
            >
              {tech}
              <FaTimes
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTech(tech);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            </span>
          ))}
          <input
            type="text"
            id="technologies"
            value={inputValue}
            onFocus={() => setShowSuggestion(true)}
            onChange={(e) => setInputValue(e.target.value)}
            className={`flex-1 outline-none`}
            autoComplete="off"
          />
          <FaAngleDown
            className={
              "absolute right-[15px] top-[40px]" + " text-[14px] text-gray-400"
            }
          />
        </div>
        <SuggestionDropDown
          items={techSuggestions.filter(
            (tech) =>
              tech.name.toLowerCase().includes(inputValue.toLowerCase()) &&
              !selectedTechs.includes(tech.name),
          )}
          renderItem={(tech) => tech.name}
          onSelect={(tech) => handleAddTech(tech.name)}
          isVisible={showSuggestion}
        />
        {errors && (
          <p className="text-[#AE1210] text-[12px] mt-[4px]">{errors}</p>
        )}
      </div>
    </>
  );
};

export default Technology;
