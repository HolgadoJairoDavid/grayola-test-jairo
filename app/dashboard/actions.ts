"use server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";
import { User } from "../types";

export const getAllUsers = async () => {
  "use server";
  const supabase = createClient()
  const { data: users, error } = await supabase
  .from('users')
  .select('*')
  return users
};

export const updateUser = async (
  formData: User
) => {
  "use server";
  const supabase = createClient();
  await supabase.from("users").update(
    {
      role: formData?.role
    }
  )
  .eq("email",formData?.email)
  .select()
}