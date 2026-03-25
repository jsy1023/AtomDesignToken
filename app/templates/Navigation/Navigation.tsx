import Link from "next/link";

// Navigation을 베이스 interface로 정의
export interface Navigation {
  children: React.ReactNode;
}

export interface NavLink extends Navigation {
  href: string;
}


const Navigation = ({ children }: Navigation) => {
  return (
        <nav className="nav-menu flex items-center justify-between">
            {children}
        </nav>
    )
}


const NavBrand = ({children, href}: NavLink) => {
  return (
    <Link href={href} className="flex items-center">{children}</Link>
  )
}

const NavList = ({children}: Navigation) => {
  return (
    <ul className="flex items-center gap-0">{children}</ul>
  )
}


const NavItem = ({children, href}: NavLink) => {
  return (
    <Link href={href} className="nav-item">{children}</Link>
  )
}


export {
  Navigation,
  NavBrand,
  NavList,
  NavItem
}