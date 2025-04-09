import type { Metadata } from "next";
import "./globals.css";
import "@/app/styles/input.css";
import "@/app/styles/common.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeWrapper } from "@/app/templates/Theme/Theme";

export const metadata: Metadata = {
  title: { template: `%s | Atomic Design`, default: "Atom Design System" },
  description: "Design System for atomground",
  keywords: [
    "AtomicDesign",
    "Design System",
    "Design Token",
    "tailwinds",
    "UI/UX",
    "React",
    "Component",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      <body className="w-full h-full">
        <ThemeWrapper className="w-full h-full flex">{children}</ThemeWrapper>
      </body>
      <GoogleAnalytics gaId="G-TB8EG3XKBV" />
    </html>
  );
}
