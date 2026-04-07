import { Sidebar, SideNavList, SideNavItem, SideNavLink, SidebarProvider, SidebarToggle } from "@/app/templates/Sidebar/Sidebar";

export default function SidemenuDemo() {
  return (
    <SidebarProvider>
      <div className="w-full h-80 border border-[var(--color-border-standard)] rounded-lg overflow-hidden flex flex-col bg-bg-card">
        {/* 상단 헤더 영역 - 토글 버튼 포함 */}
        <div className="h-12 border-b border-[var(--color-border-standard)] flex items-center px-4 bg-bg-card z-10">
          <SidebarToggle />
          <span className="ml-3 font-semibold text-sm">대시보드 데모</span>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* 사이드바 영역 */}
          <Sidebar minWidth={200}>
            <SideNavList>
              <p className="px-4 py-3 text-[11px] font-bold opacity-40 uppercase tracking-wider">Main</p>
              <SideNavItem>
                <SideNavLink href="#">홈</SideNavLink>
              </SideNavItem>
              <SideNavItem>
                <SideNavLink href="#">대시보드</SideNavLink>
              </SideNavItem>
              <SideNavItem>
                <SideNavLink href="#">프로필</SideNavLink>
              </SideNavItem>
            </SideNavList>

            <SideNavList>
              <p className="px-4 py-3 text-[11px] font-bold opacity-40 uppercase tracking-wider">System</p>
              <SideNavItem>
                <SideNavLink href="#">설정</SideNavLink>
              </SideNavItem>
              <SideNavItem>
                <SideNavLink href="#">알림</SideNavLink>
              </SideNavItem>
              <SideNavItem>
                <SideNavLink href="#">로그아웃</SideNavLink>
              </SideNavItem>
            </SideNavList>
          </Sidebar>

          {/* 콘텐츠 영역 */}
          <div className="flex-1 p-8 bg-bg-wrapper text-[var(--color-text-sub)] text-sm transition-all">
            <h3 className="text-text-main font-bold text-lg mb-4">환영합니다!</h3>
            <p>상단의 메뉴 버튼을 눌러 사이드바 애니메이션을 테스트해보세요.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="h-20 bg-bg-card border border-[var(--color-border-standard)] rounded-md opacity-50"></div>
              <div className="h-20 bg-bg-card border border-[var(--color-border-standard)] rounded-md opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
