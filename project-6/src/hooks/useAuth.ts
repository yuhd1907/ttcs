import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { InfoUser, InfoCompany } from "@/interface/user.interface";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [infoUser, setInfoUser] = useState<InfoUser | null>(null);
  const [infoCompany, setInfoCompany] = useState<InfoCompany | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const pathName = usePathname();

  useEffect(() => {
    const handleUserUpdate = () => {
      setRefetchTrigger((prev) => prev + 1);
    };

    window.addEventListener("userUpdate", handleUserUpdate);
    return () => window.removeEventListener("userUpdate", handleUserUpdate);
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
      credentials: "include",
    })
      .then(async (res) => {
        // Nếu response rỗng hoặc không phải JSON (ví dụ 204 No Content) thì xử lý an toàn
        const text = await res.text();
        if (!text) return { code: "error" };
        try {
          return JSON.parse(text);
        } catch {
          return { code: "error" };
        }
      })
      .then((data) => {
        if (data.code === "error") {
          setIsLogin(false);
        } else if (data.code === "success") {
          setIsLogin(true);
          if (data.infoUser) {
            setInfoUser(data.infoUser);
            setInfoCompany(null);
          } else if (data.infoCompany) {
            setInfoCompany(data.infoCompany);
            setInfoUser(null);
          }
        }
      })
      .catch((error) => {
        console.error("Lỗi khi kiểm tra đăng nhập:", error);
        setIsLogin(false);
      });
  }, [pathName, refetchTrigger]);

  return { isLogin, infoUser, infoCompany };
};
