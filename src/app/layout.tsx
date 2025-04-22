import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Box } from "@mui/material";
import "./globals.css";
import { SiteHeader, StoreProvider } from "@components";
import { useEffect } from "react";
import { login, loginError, logout, setUser } from "@lib/redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charles",
  description: "Welcome to Charles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/getUserInfo");

        if (response.ok) {
          const user = await response.json();
          dispatch(setUser(user));
          dispatch(login());
        } else {
          dispatch(logout());
        }
      } catch (error: unknown) {
        dispatch(loginError(error));
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  const backgroundStyle = {
    backgroundImage: "url('./sunset.jpg')",
    backgroundSize: "cover",
    height: "100%",
  };

  return (
    <StoreProvider>
      <html lang="en" className="h-full">
        <body
          className={`h-full ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SiteHeader />
          <Box sx={backgroundStyle}>{children}</Box>
        </body>
      </html>
    </StoreProvider>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
