import Link from "next/link";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { HeaderCompany } from "@/app/components/header/HeaderMenu/HeaderCompany";
import { HeaderTopCompany } from "@/app/components/header/HeaderMenu/HeaderTopCompany";
import { HeaderITJobs } from "@/app/components/header/HeaderMenu/HeaderITJobs";

export const HeaderMenu = (props: { showMenu: boolean }) => {
  const { showMenu } = props;

  return (
    <>
      <nav
        className={
          "lg:block " +
          (showMenu
            ? "fixed top-0 left-0 w-[280px] h-[100vh] z-[999] bg-[#000065]"
            : "hidden")
        }
      >
        <ul className="flex gap-x-[30px] flex-wrap">
          <HeaderITJobs />
          <HeaderTopCompany />
          <HeaderCompany />
        </ul>
      </nav>
    </>
  );
};
