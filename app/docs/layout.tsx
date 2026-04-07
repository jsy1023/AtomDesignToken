
import Link from "next/link";
import TOC from "../templates/TOC/TOC";
import { Sidebar, SideNavItem, SideNavLink, SideNavList } from "../templates/Sidebar/Sidebar";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-1 w-full h-full overflow-hidden">
        <Sidebar minWidth={240}>
          <SideNavList>
            <SideNavItem>
              <p className="pl-2 pt-2">시작하기</p>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs">소개</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/install">설치하기</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/atomicdesign">아토믹 디자인</SideNavLink>
            </SideNavItem>
          </SideNavList>
          <SideNavList>
            <SideNavItem>
              <p className="pl-2 pt-2">디자인 토큰</p>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/token/color">컬러</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/token/spacing">간격</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/token/typo">텍스트</SideNavLink>
            </SideNavItem>
          </SideNavList>
          <SideNavList>
            <SideNavItem>
              <p className="pl-2 pt-2">component</p>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/navigation">네비게이션</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/sidebar">사이드메뉴</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/modal">모달창</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/toc">목차</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/input">입력창</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/select">선택창</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/checkbox">체크박스</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/radio">라디오</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/badge">배지</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/button">버튼</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/table">테이블</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/pagination">페이지네이션</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/collapse">콜랩스</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/card">카드</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/toast">토스트 알림</SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink href="/docs/components/tab">탭</SideNavLink>
            </SideNavItem>
          </SideNavList>
        </Sidebar>
        <div className="relative w-full h-full bg-bg-wrapper grid grid-cols-1 md:grid-cols-4 overflow-auto scroll-smooth">
          <div className="col-span-3 flex flex-1 px-4 flex-col items-center order-2 md:order-1">
            <div className="w-full max-w-[800px] min-w-0 h-full p-4 py-12">
              {children}
            </div>
            <footer className="w-full py-4 px-8 text-text-sub text-sm">
              Built by
              <Link
                href={"https://www.atomground.com"}
                target="_blank"
                className="text-primary ml-1 mr-1"
              >
                atomground
              </Link>
              . MIT License
            </footer>
          </div>
          <div className="relative col-span-1 p-4 order-1 md:order-2 ">
            <div className="sticky top-[16px]">
              <TOC />
            </div>
          </div>
        </div>
    </main>
  );
};

export default DocsLayout;
