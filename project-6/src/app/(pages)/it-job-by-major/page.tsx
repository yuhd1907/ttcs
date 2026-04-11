"use client";

import Link from "next/link";
import { useRoles } from "@/hooks/useRoles";
import React from "react";
import { ITCategoryData, Role } from "@/interface/it-category.interface";

const ITJobByMajor = () => {
  const { categories } = useRoles();

  return (
    <>
      <div className="container mx-auto px-[16px]">
        <h1 className="text-[28px] font-bold mt-[21px] pb-[16px]">
          Tìm việc làm IT theo chuyên môn
        </h1>
        {(categories as unknown as ITCategoryData[]).map((cat: ITCategoryData) => (
          <React.Fragment key={cat.id}>
            <div className="flex items-center mt-8 mb-4">
              <h2 className="text-[18px] font-bold whitespace-nowrap pr-4">
                {cat.category}
              </h2>
              <hr className="flex-1 border-t border-[#dedede]" />
            </div>
            <ul className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-2 mt-6">
              {cat.roles.map((role: Role) => (
                <li key={role.slug} className={"cursor-pointer"}>
                  <Link href={`/search?role=${role.slug}`}>{role.name}</Link>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ITJobByMajor;
