"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

type Props = ButtonProps & {
  pendingText?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export function SubmitButton({
  children,
  pendingText,
  variant,
  ...props
}: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;
  // console.log(isPending);
  return (
    <Button
      disabled={isPending}
      type={props.type ?? "submit"}
      aria-disabled={pending}
      formAction={props.formAction}
      variant={variant}
      {...props}
    >
      {isPending && pendingText ? (
        pendingText
      ) : isPending ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      {children}
    </Button>
  );
}
