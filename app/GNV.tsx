
"use client"

import { Navigation, NavBrand, NavItem, NavList, NavLink } from "./templates/Navigation/Navigation";
import Image from "next/image";
import { SidebarProvider, SidebarToggle } from "./templates/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export const GNV = ({children}: {children: React.ReactNode}) => {
    const pathname = usePathname();
    return (
        <SidebarProvider>
          <Navigation>
            <div className="flex items-center">
              <NavBrand href="/"><Image
                  src="/images/global/logoSymbol.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  draggable="false"
                />
              </NavBrand>
              {pathname.startsWith("/docs") && <SidebarToggle/>}
            </div>
              <NavList>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/docs">Docs</NavLink>
                </NavItem>
              </NavList>
          </Navigation>
          {children}
        </SidebarProvider>
    )
}