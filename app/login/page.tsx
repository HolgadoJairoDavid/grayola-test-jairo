import Link from "next/link";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import Image from "next/image";
import { Icons } from "@/components/ui/icons";
import { signIn, signUp, signInWithGoogle } from "./actions";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <>
    <div className="absolute bg-slate-100 w-[50%] h-screen left-0" />
      <div className="flex top-10 bottom-10 h-[90%] w-[70%] shadow-xl absolute rounded-2xl">
      <div
        className="container relative flex items-center justify-center lg:px-0 bg-white"
      >

        <div className="">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <h3 className="text-7xl font-bold text-center">Grayola</h3>
            <div className="flex flex-col space-y-2 text-center justify-center">
              <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back - Ready to Start?
              </h1>
              <p className="text-sm text-muted-foreground w-full">
              Create an account or log in
              </p>
            </div>
            <UserAuthForm
              signIn={signIn}
              signUp={signUp}
              continueWith={signInWithGoogle}
              />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
                >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
                >
                Privacy Policy
              </Link>
              .
            </p>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-slate-100 z-10 hidden md:block w-full justify-center items-center">
           <Image src="/Group.svg" alt="" width={700} height={700} className="pt-[25%] pl-[10%] pr-[10%]"/>
      </div> 
      </div>
    </>
  );
}