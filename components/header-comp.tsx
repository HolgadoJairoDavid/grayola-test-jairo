"use client";
import Link from "next/link";
import { Icons } from "./ui/icons";
import AuthButton from "./auth-button";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar"

const HeaderComponent = () => {
  const pathname = usePathname();
  if (pathname === "/login") return null;
  return (
    <header
      className="gap-4 items-center w-full pt-2 px-8
    border-b fixed top-0 bg-slate-100 z-50"
    style={{zIndex: 10000000}}
    >
      <div className="flex pt-2">
      <Link href={"/"} className="flex w-fit">
        <Icons.grayola className="h-7" />
        <p className="text-slate-900 text-3xl font-thin ml-6 mr-6">|</p>
      </Link>

      <AuthButton />
      </div>
      <Navbar />
    </header>
  );
}
export default HeaderComponent;