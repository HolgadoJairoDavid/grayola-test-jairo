"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { getAllUsers } from "@/app/dashboard/actions"
import { getUser } from "@/app/login/actions";
import { User } from "@/app/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "View projects",
    href: "/projects",
    description: "View the current projects and keep the track of them.",
  },
  {
    title: "Create project",
    href: "/projects/create",
    description: "When inspiration comes to mind...create a new project.",
  },
];
const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null); 
    useEffect(()=>{
        async function fetchAllUsers (){
            const fetchCurrentUser = await getUser();
            setUser({
                id: fetchCurrentUser.id || "",
                email: fetchCurrentUser.email || "", 
            });
        }
        
        fetchAllUsers()
    }, [])
  
  if (pathname === "/login") return null;
  return (
    <NavigationMenu className="max-w-7xl flex justify-start mt-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} transition-color duration-200 ease bg-transparent ${pathname === "/" ? "border-b-2 border-slate-950 rounded-none" : "border-none"}`}>
              <p className="hover:bg-slate-200 px-3 py-1 rounded-md transition-color duration-200 ease">
              Overview
              </p>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
        <Link href="/projects" legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} transition-color duration-200 ease bg-transparent ${pathname === "/projects" ? "border-b-2 border-slate-950 rounded-none" : "border-none"}`}>
              <p className="hover:bg-slate-200 px-3 py-1 rounded-md transition-color duration-200 ease">
              Projects
              </p>
            </NavigationMenuLink>
          </Link>

          {/* <Link href="/projects">
            <NavigationMenuTrigger className="bg-transparent hover:bg-slate-300">Projects</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    className="hover:bg-neutral-100"
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </Link> */}
        </NavigationMenuItem> 
        {user?.email == "admingrayola@grayola.io" && <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} transition-color duration-200 ease bg-transparent ${pathname === "/dashboard" ? "border-b-2 border-slate-950 rounded-none" : "border-none"}`}>
              <p className="hover:bg-slate-200 px-3 py-1 rounded-md transition-color duration-200 ease">
              Dashboard
              </p>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;