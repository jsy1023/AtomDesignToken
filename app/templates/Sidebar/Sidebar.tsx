"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { createContext, useContext, useRef, useState } from "react";

// Icons
import MenuIcon from '@mui/icons-material/Menu';

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies

// Navigation을 베이스 interface로 정의
export interface Sidebar {
  children: React.ReactNode;
  minWidth?: number
}

export interface NavLink {
  children: React.ReactNode;
  href: string;
}

interface SideContext {
  isOpen: boolean;
  setToggle: (open: boolean) => void;
}

const SideContext = createContext<SideContext | undefined>(undefined);

const useSideContext = () => {
  const context = useContext(SideContext);
  if (!context) {
    return { isOpen: false, setToggle: () => {} };
  }
  return context;
}

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const setToggle = (open: boolean) => setIsOpen(open);

  return (
    <SideContext.Provider value={{ isOpen, setToggle }}>
      {children}
    </SideContext.Provider>
  );
};

const SidebarToggle = () => {
  const { isOpen, setToggle } = useSideContext();
  return (
      <button className="cursor-pointer" onClick={() => setToggle(!isOpen)}><MenuIcon className="text-text-sub" sx={{fontSize: "20px"}}/></button>
  )
}

const Sidebar = ({ children, minWidth }: Sidebar) => {
  const { isOpen } = useSideContext();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (sidebarRef.current) {
        if (isOpen) {
            // 열릴 때: 나타나면서 제자리로
            gsap.to(sidebarRef.current, { 
                display: "flex",
                opacity: 1, 
                x: 0, 
                width: minWidth, 
                minWidth: minWidth,
                duration: 0.3, 
                ease: "power2.out" 
            });
        } else {
            // 닫힐 때: 사라지면서 왼쪽으로, 너비도 0으로
            gsap.to(sidebarRef.current, { 
                opacity: 0, 
                x: -20, 
                width: 0, 
                minWidth: 0,
                duration: 0.3, 
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(sidebarRef.current, { display: "none" });
                }
            });
        }
    }
  }, [isOpen]);


  return (
      <aside ref={sidebarRef} className={`nav-side flex flex-col overflow-auto h-full`} style={{ width: isOpen ? minWidth : 0, minWidth: isOpen ? minWidth : 0 }}>
          {children}
      </aside>
    )
}


const SideNavBrand = ({children, href}: NavLink) => {
  return (
    <Link href={href} className="flex items-center">{children}</Link>
  )
}

const SideNavList = ({children}: Sidebar) => {
  return (
    <ul className="nav-list flex flex-col">{children}</ul>
  )
}


const SideNavItem = ({children}: Sidebar) => {
  return (
    <li>{children}</li>
  )
}

const SideNavLink = ({children, href}: NavLink) => {
  
    const pathname = usePathname();
    const active = pathname === href;

  return (
    <Link href={href} className={`nav-link text-nowrap ${active ? "active" : ""}`}>{children}</Link>
  )
}


export {
  Sidebar,
  SidebarProvider,
  SidebarToggle,
  SideNavBrand,
  SideNavList,
  SideNavItem,
  SideNavLink
}