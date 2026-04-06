"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRef, createContext, useContext, useState } from "react";


gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies

// Navigation을 베이스 interface로 정의
export interface Navigation {
  children: React.ReactNode;
}

export interface NavLink extends Navigation {
  href: string;
}

/**
 * NavContextProps: 네비게이션 상태를 하위 컴포넌트와 공유하기 위한 인터페이스
 * - isOpen: 메뉴가 열려 있는지 여부
 * - setOpen: 메뉴 상태를 변경하는 함수
 */
interface NavContextProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

// NavContext: 상위 NavItem의 상태를 하 하위 NavTrigger와 NavContainer에 전달하는 통로(우체국)
const NavContext = createContext<NavContextProps | undefined>(undefined);

/**
 * useNavContext: Context 정보를 쉽고 안전하게 꺼내 쓰기 위한 전용 커스텀 훅
 * - 부모인 NavItem이 없을 경우(undefined)에도 에러가 나지 않도록 기본값을 반환하는 안전 장치 포함
 */
const useNavContext = () => {
  const context = useContext(NavContext);
  if (!context) {
    // 부모를 찾지 못했을 때 앱이 멈추지 않도록 기본 상태 반환
    return { isOpen: false, setOpen: () => {} };
  }
  return context;
};

// 최상위 Navigation 레이아웃 컴포넌트
const Navigation = ({ children }: Navigation) => {
  return (
        <nav className="nav-menu flex items-center justify-between">
            {children}
        </nav>
    )
}

// 로고나 브랜드명을 위한 컴포넌트
const NavBrand = ({children, href}: NavLink) => {
  return (
    <Link href={href} className="flex items-center h-full font-bold text-xl">{children}</Link>
  )
}

/**
 * NavItem: 개별 메뉴 항목 및 서브 메뉴의 상태를 관리하는 부모 컨테이너
 * - 각각의 NavItem은 자신만의 isOpen 상태를 독립적으로 가짐
 */
const NavItem = ({children}: Navigation) => {
  const [isOpen, setIsOpen] = useState(false);
  const setOpen = (open: boolean) => setIsOpen(open);

  // 마우스가 메뉴 전체 영역을 완전히 벗어날 때 호출 (메뉴 닫기)
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <NavContext.Provider value={{ isOpen, setOpen }}>
      <li 
        className={`nav-item`}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </li>
    </NavContext.Provider>
  )
}

// 메뉴 항목들을 가로로 정렬해주는 리스트 컨테이너
const NavList = ({children}: Navigation) => {
  return (
    <ul className="flex items-center gap-0">{children}</ul>
  )
}

// 일반적인 링크 메뉴 컴포넌트
const NavLink = ({children, href}: NavLink) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href} className={`nav-link ${active ? "active" : ""}`}>{children}</Link>
  )
}

/**
 * NavTrigger: 서브 메뉴를 여는 트리거 버튼
 * - 마우스를 올렸을 때(onMouseEnter) 부모 NavItem의 상태를 열림(true)으로 변경
 */
const NavTrigger = ({children}: Navigation) => {
    const { isOpen, setOpen } = useNavContext();
    
    // 트리거 영역에 진입했을 때만 메뉴 열기 실행
    const handleMouseEnter = () => setOpen(true);

    return (
        <div 
            className="nav-link flex items-center gap-1"
            onMouseEnter={handleMouseEnter}
        >
            {children}
            {/* 상태에 따라 화살표 아이콘 회전 애니메이션 클래스 적용 */}
            <KeyboardArrowDownIcon className={`nav-arrow ${isOpen ? "open" : ""}`} />
        </div>
    )
}

/**
 * NavContainer: 서브 메뉴의 실제 내용물이 담기는 컨테이너
 * - GSAP을 사용하여 나타날 때 부드러운 애니메이션 효과 적용
 */
const NavContainer = ({children}: Navigation) => {
    const { isOpen } = useNavContext();
    const containerContentRef = useRef<HTMLUListElement>(null);

    // 메뉴가 열릴 때 실행되는 GSAP 애니메이션
    useGSAP(() => {
        if (isOpen && containerContentRef.current) {
            gsap.fromTo(containerContentRef.current, 
                { opacity: 0, y: -10 },      // 시작 상태: 투명하고 살짝 위쪽
                { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" } // 도착 상태: 불투명하고 제자리
            );
        }
    }, [isOpen]);
    

    // 닫혀 있을 때는 아예 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <div className="nav-container">
          {/* 실제 박스 형태를 가진 내부 리스트 */}
          <ul ref={containerContentRef} className="nav-content">
            {children}
          </ul>
        </div>
    )
}


export {
  Navigation,
  NavBrand,
  NavList,
  NavItem,
  NavLink,
  NavTrigger,
  NavContainer
}