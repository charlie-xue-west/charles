"use client";

import { HomeButton, LogInButton } from "@components";
import { AppRedux } from "@lib/redux";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export const SiteHeader = () => {
  // using because MUI style take precedent over tailwind
  const appBarStyle = {
    flexDirection: "row",
  };
  const settings = [
    { name: "Profile", url: "/profile" },
    { name: "Hub", url: "/hub" },
    { name: "Settings", url: "/settings" },
    { name: "Logout", url: "/logout" },
  ];

  const authState = useSelector((state: AppRedux) => state.auth);
  const isAuthenticated = authState.isAuthenticated;

  // const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={appBarStyle}
      position="absolute"
      color="secondary"
      className="flex justify-between p-[8px] absolute"
    >
      <HomeButton />
      {!isAuthenticated ? (
        <LogInButton />
      ) : (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                <Link href={setting.url}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.name}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
    </AppBar>
  );
};
