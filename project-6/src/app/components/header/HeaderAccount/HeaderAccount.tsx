import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { MenuUser } from "@/app/components/header/HeaderAccount/MenuUser";
import { AuthButtons } from "@/app/components/header/HeaderAccount/AuthButtons";
import { MenuCompany } from "@/app/components/header/HeaderAccount/MenuCompany";
import { InfoUser, InfoCompany } from "@/interface/user.interface";

export const HeaderAccount = () => {
  const {
    isLogin,
    infoUser,
    infoCompany,
  }: {
    isLogin: boolean | null;
    infoUser: InfoUser | null;
    infoCompany: InfoCompany | null;
  } = useAuth();

  return (
    <>
      <div className="inline-flex items-center gap-x-[5px] text-white font-[600] sm:text-[16px] text-[12px] relative group/sub-1">
        {isLogin && infoUser ? (
          <MenuUser infoUser={infoUser} />
        ) : isLogin && infoCompany ? (
          <MenuCompany infoCompany={infoCompany} />
        ) : (
          <AuthButtons />
        )}
      </div>
    </>
  );
};
