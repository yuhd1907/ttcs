import { Skill } from "@/interface/skill.interface";

interface SuggestionDropDownProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onSelect: (item: T) => void;
  isVisible: boolean;
}

export const SuggestionDropDown = <T,>({
  items,
  renderItem,
  onSelect,
  isVisible,
}: SuggestionDropDownProps<T>) => {
  if (!isVisible || items.length === 0) return null;

  return (
    <>
      <div
        className={
          "absolute z-50 w-full mt-[5px] bg-white border" +
          " border-[#DEDEDE] rounded-[4px] max-h-[200px]" +
          " overflow-y-auto"
        }
      >
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => onSelect(item)}
              className="px-4 py-2 hover:bg-[#F0F7FF] cursor-pointer text-[14px] transition-colors"
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
