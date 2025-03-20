"use client";

import { CameraRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

export const HomeButton = () => {
  const router = useRouter();
  const handleSignin = () => {
    router.push("/");
  };

  return (
    <IconButton
      color="inherit"
      size="small"
      className="max-w-3xs"
      onClick={handleSignin}
    >
      <CameraRounded />
    </IconButton>
  );
};
