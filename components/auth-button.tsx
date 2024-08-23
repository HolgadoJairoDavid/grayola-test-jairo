"use client"; 

import { createClient } from "@/utils/supabase/client";
import {
  LogOut
} from "lucide-react";
import Link from "next/link";
import { User } from "@/app/types";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: {user} } = await supabase.auth.getUser();
      setUser({
        id: user?.id || "",
        email: user?.email || "",
      });
      await supabase.from("users").upsert({
        email: user?.email,
      }).select()
    };

    fetchUser();
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login"; // redirect
  };

  return user ? (
    <div className="flex items-center gap-4 truncate w-full justify-between">
      <span className="font-semibold shrink">{user?.email}</span>
      <button
        onClick={signOut}
        className="py-2 px-4 rounded-md bg-btn-background transition-colors duration-500 ease hover:bg-slate-200"
      >
        <LogOut />
      </button>
    </div>
  ) : null
}