"use client";

import { useState } from "react";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { CategoryItemProps, Role } from "@/interface/it-category.interface";

export const CategoryItem = ({ category, roles }: CategoryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`min-h-[64px] border-[1px] border-[#DEDEDE] rounded-[4px] px-[24px] py-[10px] flex flex-col transition-all duration-300 ${
        isOpen ? "gap-[10px] bg-white " : "justify-center"
      }`}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between cursor-pointer group hover:text-[#2563EB]"
      >
        <span className={`text-[16px] font-[600] transition-colors`}>
          {category}
        </span>
        <div className="transition-transform duration-300">
          {isOpen ? (
            <IoMdRemoveCircleOutline className="text-[24px]" />
          ) : (
            <IoMdAddCircleOutline className="text-[24px]" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "max-h-[220px] opacity-100 pt-[10px]" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-[8px]">
          {roles.map((role: Role) => (
            <div
              key={role.slug}
              className="hover:text-[#2563EB] cursor-pointer"
            >
              {role.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
