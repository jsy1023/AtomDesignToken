import Link from "next/link";

// Navigation을 베이스 interface로 정의
export interface Sidemenu {
  children: React.ReactNode;
  minWidth?: number
}

export interface NavLink {
  children: React.ReactNode;
  href: string;
}


const Sidemenu = ({ children, minWidth }: Sidemenu) => {
  return (
        <aside className={`nav-side flex flex-col overflow-auto h-full`} style={{minWidth: `${minWidth}px`}}>
            {children}
        </aside>
    )
}


const NavBrand = ({children, href}: NavLink) => {
  return (
    <Link href={href} className="flex items-center">{children}</Link>
  )
}

const NavList = ({children}: Sidemenu) => {
  return (
    <ul className="nav-list flex flex-col">{children}</ul>
  )
}


const NavItem = ({children, href}: NavLink) => {
  return (
    <Link href={href} className="nav-item text-nowrap">{children}</Link>
  )
}


export {
  Sidemenu,
  NavBrand,
  NavList,
  NavItem
}