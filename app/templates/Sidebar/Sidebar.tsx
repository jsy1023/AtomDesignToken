"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

// Navigation을 베이스 interface로 정의
export interface Sidemenu {
  children: React.ReactNode;
  minWidth?: number
}

export interface NavLink {
  children: React.ReactNode;
  href: string;
}


const Sidebar = ({ children, minWidth }: Sidemenu) => {
  return (
        <aside className={`nav-side flex flex-col overflow-auto h-full`} style={{minWidth: `${minWidth}px`}}>
            {children}
        </aside>
    )
}


const SideNavBrand = ({children, href}: NavLink) => {
  return (
    <Link href={href} className="flex items-center">{children}</Link>
  )
}

const SideNavList = ({children}: Sidemenu) => {
  return (
    <ul className="nav-list flex flex-col">{children}</ul>
  )
}


const SideNavItem = ({children, href}: NavLink) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href} className={`nav-item text-nowrap ${active ? "text-primary!" : ""}`}>{children}</Link>
  )
}


export {
  Sidebar,
  SideNavBrand,
  SideNavList,
  SideNavItem
}