"use client";

import { HomeButton, LogInButton } from "@components";
import { AppRedux } from "@lib/redux";
import { AppBar } from "@mui/material";
import { useSelector } from "react-redux";

export const SiteHeader = () => {
  // using because MUI style take precedent over tailwind
  const appBarStyle = {
    flexDirection: "row",
  };

  const authState = useSelector((state: AppRedux) => state.auth);
  const isAuthenticated = authState.isAuthenticated;

  return (
    <AppBar
      sx={appBarStyle}
      position="absolute"
      color="secondary"
      className="flex justify-between p-[8px] absolute"
    >
      <HomeButton />
      {isAuthenticated && <LogInButton />}
    </AppBar>
  );
};
