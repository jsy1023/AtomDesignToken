import type { Metadata } from "next";
import "./globals.css";
import "@/app/component/component.css";
import "@/app/styles/input.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeWrapper } from "./component/Theme/Theme";

export const metadata: Metadata = {
  title: "Design System",
  description: "Design System for atomground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="w-full h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <ThemeWrapper className="w-full h-full">{children}</ThemeWrapper>
      <GoogleAnalytics gaId="G-TB8EG3XKBV" />
    </html>
  );
}
