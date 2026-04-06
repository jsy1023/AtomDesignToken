import { Sidebar, SideNavList, SideNavItem } from "@/app/templates/Sidebar/Sidebar";

export default function SidemenuDemo() {
  return (
    <div className="w-full h-64 border border-[var(--color-border-standard)] rounded overflow-hidden flex">
      <Sidebar minWidth={220}>
        <SideNavList>
          <p className="px-4 py-2 text-sm font-bold opacity-50">카테고리</p>
          <SideNavItem href="#">대시보드</SideNavItem>
          <SideNavItem href="#">사용자 관리</SideNavItem>
          <SideNavItem href="#">설정</SideNavItem>
        </SideNavList>
        <SideNavList>
          <p className="px-4 py-2 text-sm font-bold opacity-50">기타</p>
          <SideNavItem href="#">도움말</SideNavItem>
          <SideNavItem href="#">로그아웃</SideNavItem>
        </SideNavList>
      </Sidebar>
      <div className="flex-1 p-6 text-[var(--color-text-sub)] text-sm flex items-center justify-center">
        메인 콘텐츠 영역
      </div>
    </div>
  );
}
