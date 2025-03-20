import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppBar, Box } from "@mui/material";
import { HomeButton, SignUpButton } from "@components";
import "./globals.css";

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
  const backgroundStyle = {
    backgroundImage: "url('./sunset.jpg')",
    backgroundSize: "cover",
    height: "100%",
  };

  // using because MUI style take precedent over tailwind
  const appBarStyle = {
    flexDirection: "row",
  };

  return (
    <html lang="en" className="h-full">
      <body
        className={`h-full ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Box sx={backgroundStyle}>
          <AppBar
            sx={appBarStyle}
            position="absolute"
            color="secondary"
            className="flex justify-between p-[8px] absolute"
          >
            <HomeButton />
            <SignUpButton />
          </AppBar>
          {children}
        </Box>
      </body>
    </html>
  );
}
