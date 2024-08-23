"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "../ui/icons";
import ContinueWithButton from "@/components/auth/continue-with-button";
import { SubmitButton } from "./submit-button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  signIn: (formData: FormData) => Promise<never>;
  signUp: (formData: FormData) => Promise<never>;
  continueWith: () => Promise<void>;
}

export function UserAuthForm({
  signIn,
  signUp,
  continueWith,
  className,
  ...props
}: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Your email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
          </div>

          <SubmitButton
            formAction={signIn}
            type="submit"
            className="bg-[#75fa00ab] text-black hover:bg-[#7bdcb5]/70"
          >
            Sign In
          </SubmitButton>

          <SubmitButton formAction={signUp} type="submit" variant={"outline"}>
            Sign Up
          </SubmitButton>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <ContinueWithButton
        variant="outline"
        type="button"
        continueWithAction={continueWith}
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </ContinueWithButton>
    </div>
  );
}