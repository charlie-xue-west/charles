import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Box } from "@mui/material";
import "./globals.css";
import { SiteHeader } from "@components";

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

  return (
    <html lang="en" className="h-full">
      <body
        className={`h-full ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        <Box sx={backgroundStyle}>{children}</Box>
      </body>
    </html>
  );
}
