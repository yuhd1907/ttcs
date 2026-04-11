"use client";

import { FaBars } from "react-icons/fa6";
import { HeaderMenu } from "./HeaderMenu/HeaderMenu";
import { useState } from "react";
import { HeaderAccount } from "@/app/components/header/HeaderAccount/HeaderAccount";
import { HeaderLogo } from "@/app/components/header/HeaderLogo/HeaderLogo";

export const Header = () => {
  const [showMenu, setShowmenu] = useState(false);

  const handleOnClick = () => {
    setShowmenu(!showMenu);
  };

  return (
    <>
      <header className="bg-[#000071] py-[15px]">
        <div className="container mx-auto px-[16px]">
          {/* Wrap */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <HeaderLogo />

            {/* Menu */}
            <HeaderMenu showMenu={showMenu} />

            {/* Account */}
            <HeaderAccount />

            {/* Mobile Menu Button */}
            <button
              onClick={handleOnClick}
              className="text-white text-[20px] ml-[12px] lg:hidden inline-block"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
