"use server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {
  "use server";
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const value = await supabase.auth?.signInWithPassword({
    email,
    password,
  });
  if (value?.error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/");
};

export const signUp = async (formData: FormData) => {
  "use server";

  const supabase = createClient();
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // console.log("email", email);
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    return redirect("/login?message=Could not authenticate user");
  }

  const response = await supabase
  .from("users")
  .insert([
    {
      email
    }
  ])
  .select()

  if (response.error) {
    console.error(response.error);
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/login?message=Check email to continue sign in process");
};

export async function signInWithGoogle() {
  "use server";
  const supabase = createClient();
  // console.log('google');
  const origin = headers().get("origin");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${origin}/auth/callback`,
    },
  });

  console.log(data)

  if (error) {
    // console.log(error);
    redirect("/error");
  }
  // console.log("data", data);
  redirect(data.url);
}

export async function getUser() {
  "use server";
  const supabase = createClient();

  const {data: {user}} = await supabase.auth.getUser()

  if (!user) throw new Error("Invalid user.");

  return user

}