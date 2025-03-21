import { HomeButton, LogInButton } from "@components";
import { AppBar } from "@mui/material";

export const SiteHeader = () => {
  // using because MUI style take precedent over tailwind
  const appBarStyle = {
    flexDirection: "row",
  };

  return (
    <AppBar
      sx={appBarStyle}
      position="absolute"
      color="secondary"
      className="flex justify-between p-[8px] absolute"
    >
      <HomeButton />
      <LogInButton />
    </AppBar>
  );
};
