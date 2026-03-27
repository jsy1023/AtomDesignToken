import { Sidemenu, NavList, NavItem } from "@/app/templates/Sidemenu/Sidemenu";

export default function SidemenuDemo() {
  return (
    <div className="w-full h-64 border border-[var(--color-border-standard)] rounded overflow-hidden flex">
      <Sidemenu minWidth={220}>
        <NavList>
          <p className="px-4 py-2 text-sm font-bold opacity-50">카테고리</p>
          <NavItem href="#">대시보드</NavItem>
          <NavItem href="#">사용자 관리</NavItem>
          <NavItem href="#">설정</NavItem>
        </NavList>
        <NavList>
          <p className="px-4 py-2 text-sm font-bold opacity-50">기타</p>
          <NavItem href="#">도움말</NavItem>
          <NavItem href="#">로그아웃</NavItem>
        </NavList>
      </Sidemenu>
      <div className="flex-1 p-6 text-[var(--color-text-sub)] text-sm flex items-center justify-center">
        메인 콘텐츠 영역
      </div>
    </div>
  );
}
