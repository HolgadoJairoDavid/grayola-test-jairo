"use client";

import { usePathname } from "next/navigation";
import { Icons } from "./ui/icons";

const Footer = () => {

  const pathname = usePathname()
  if (pathname === "/login") return null
  return (
    <footer className="flex flex-col gap-2 mt-4 text-sm text-neutral-500 w-full py-8 items-center bg-slate-100">
      <div className="grid grid-cols-2 w-40">
        <div>
        <a href="https://github.com/HolgadoJairoDavid" target="_blank">
        <Icons.gitHub className="h-7 hover:scale-105 translate-x-1" />
        </a>

        </div>
       <div>
       <a href="https://www.linkedin.com/in/jairo-holgado-a28589261/" target="_blank">
        <Icons.linkedin  className="h-7 hover:scale-105 translate-x-1"/>
        </a>
       </div>
      </div>

      <span className="">
      Developed and designed by Jairo Holgado
      </span>
    </footer>
  );
};
export default Footer;