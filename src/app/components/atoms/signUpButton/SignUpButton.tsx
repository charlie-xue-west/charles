"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const SignUpButton = () => {
  const router = useRouter();
  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <Button
      variant="text"
      color="inherit"
      size="small"
      className="max-w-3xs"
      onClick={handleSignUp}
    >
      Sign Up
    </Button>
  );
};
