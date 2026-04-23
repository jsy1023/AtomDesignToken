import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "./templates/Theme/Theme";
import { Toast } from "./templates/Toast/Toast";
import { Modal } from "./templates/Modal/Modal";
import FloatingThemeSelector from "./components/floating-theme-selector";
import { GNV } from "./GNV";

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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="w-full h-full bg-bg-wrapper flex flex-col">        
        
        <div id="modal-root"></div>
        <Toast />
        <Modal />
        <GNV>
          {children}
        </GNV>
        <FloatingThemeSelector />
      </body>
      <GoogleAnalytics gaId="G-6GGTDRQ47W" />
      <ThemeProvider />
    </html>
  );
}
