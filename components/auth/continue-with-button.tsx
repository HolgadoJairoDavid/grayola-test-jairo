"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useState } from "react";

interface ContinueWithButtonProps extends ButtonProps {
  continueWithAction: () => Promise<void>;
  pendingText?: string;
}

const ContinueWithButton = ({
  children,
  continueWithAction,
  pendingText,
  variant,
  ...props
}: ContinueWithButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await continueWithAction();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      type="button"
      aria-disabled={isLoading}
      onClick={handleClick}
      variant={variant}
      {...props}
    >
      {isLoading && pendingText ? (
        pendingText
      ) : isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      {children}
    </Button>
  );
};

export default ContinueWithButton;