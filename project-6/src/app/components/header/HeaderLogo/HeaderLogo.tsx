import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <>
      <Link href="/" className="w-[82px] h-[32px]">
        <img src={"/assets/images/logo.png"} alt={"it-viec"} />
      </Link>
    </>
  );
};
