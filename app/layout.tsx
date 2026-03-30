import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "./templates/Theme/Theme";
import { getStarCount } from "@/lib/github";
import { Toast } from "./templates/Toast/Toast";
import { Modal } from "./templates/Modal/Modal";
import { Navigation, NavBrand, NavItem, NavList } from "./templates/Navigation/Navigation";
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
  return (
    <html lang="ko" className="w-full h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="w-full h-full bg-bg-wrapper flex flex-col">        
        <Navigation>
          <NavBrand href="/"><Image
                src="/images/global/logoSymbol.svg"
                alt="Logo"
                width={32}
                height={32}
                draggable="false"
              />
            </NavBrand>
            <NavList>
              <NavItem href="/">Home</NavItem>
              <NavItem href="/docs">Docs</NavItem>
            </NavList>
        </Navigation>
        {children}
        <div id="modal-root"></div>
        <Toast />
        <Modal />
        <FloatingThemeSelector />
      </body>
      <GoogleAnalytics gaId="G-6GGTDRQ47W" />
      <ThemeProvider />
    </html>
  );
}
