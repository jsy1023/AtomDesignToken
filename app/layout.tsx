import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design System",
  description: "Design System for atomground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="ko">{children}</html>;
}
