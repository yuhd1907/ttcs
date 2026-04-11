"use client";

import { useRoles } from "@/hooks/useRoles";
import CategoryItem from "@/app/(pages)/(home)/CategoryItem";
import { ITCategoryData } from "@/interface/it-category.interface";

export const ITCategory = () => {
  const { categories: rawCategories } = useRoles();
  const categories = rawCategories as unknown as ITCategoryData[];

  const leftCol = categories.filter((_, index) => index % 2 === 0);
  const rightCol = categories.filter((_, index) => index % 2 !== 0);

  return (
    <div className="mt-[60px] mb-[60px]">
      <div className="container mx-auto px-[16px]">
        <h2 className="text-[#121212] text-[28px] font-[700] text-center mb-[30px]">
          Tổng hợp chuyên môn ngành IT
        </h2>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[24px] gap-y-[12px] items-start">
          <div className={"flex flex-col gap-y-[12px]"}>
            {leftCol.map((cat) => (
              <CategoryItem
                key={cat.id}
                category={cat.category}
                roles={cat.roles}
              />
            ))}
          </div>
          <div className={"flex flex-col gap-y-[12px]"}>
            {rightCol.map((cat) => (
              <CategoryItem
                key={cat.id}
                category={cat.category}
                roles={cat.roles}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
