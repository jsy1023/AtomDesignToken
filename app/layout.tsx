import type { Metadata } from "next";
import "./globals.css";
import "@/app/component/component.css";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      <body className="w-full h-full">{children}</body>
      <GoogleAnalytics gaId="G-TB8EG3XKBV" />
    </html>
  );
}
