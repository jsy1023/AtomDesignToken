import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "./templates/Theme/Theme";
import { getStarCount } from "@/lib/github";
import { Toast } from "./templates/Toast/Toast";
import { Modal } from "./templates/Modal/Modal";
import Navigation, { NavItems } from "./templates/Navigation/Navigation";
import Link from "next/link";
import Image from "next/image";
import FloatingThemeSelector from "./components/floating-theme-selector";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stars = await getStarCount();
  return (
    <html lang="ko" className="w-full h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="w-full h-full bg-bg-wrapper">
        <Navigation
          type="topnav"
          className="fixed flex items-center justify-between w-full h-[64px] px-6 z-50 border-b bg-white/80 backdrop-blur-md"
        >
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/global/logoSymbol.svg"
                alt="Logo"
                width={32}
                height={32}
                draggable="false"
              />
            </Link>
            <NavItems
              type="topnav"
              navMenu={[
                { name: "Home", path: "/" },
                { name: "Docs", path: "/docs" },
              ]}
            />
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/jsy1023/AtomDesignToken"
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors bg-white/50 py-1.5 px-3 rounded-full border border-[var(--nav-border)]"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                className="text-[var(--text-topnav-standard)]"
              >
                <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
              </svg>
              <span>{stars}</span>
            </Link>
          </div>
        </Navigation>
        {children}
        <FloatingThemeSelector />
        <div id="modal-root"></div>
        <Toast />
        <Modal />
      </body>
      <GoogleAnalytics gaId="G-6GGTDRQ47W" />
      <ThemeProvider />
    </html>
  );
}
