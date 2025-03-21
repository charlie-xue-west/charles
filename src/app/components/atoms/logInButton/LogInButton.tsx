"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const LogInButton = () => {
  const router = useRouter();
  const handleLogIn = () => {
    router.push("/login");
  };

  return (
    <Button
      variant="text"
      color="inherit"
      size="small"
      className="max-w-3xs"
      onClick={handleLogIn}
    >
      Log In
    </Button>
  );
};
