import Link from "next/link";

export const AuthButtons = () => {
  return (
    <>
      {/*Chưa đăng nhập*/}
      <Link
        href="/user/login"
        className="text-[#FFFFFF] font-[600] sm:text-[16px] text-[12px]"
      >
        Đăng nhập
      </Link>
      <span className="text-[#FFFFFF] font-[600] sm:text-[16px] text-[12px]">
        {" "}
        /{" "}
      </span>
      <Link
        href="/user/register"
        className="text-[#FFFFFF] font-[600] sm:text-[16px] text-[12px]"
      >
        Đăng ký
      </Link>
    </>
  );
};
