
import Link from "next/link";
import TOC from "../templates/TOC/TOC";
import { Sidemenu, NavItem, NavList } from "../templates/Sidemenu/Sidemenu";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-1 w-full h-full overflow-hidden">
        <Sidemenu minWidth={240}>
          <NavList>
            <p>시작하기</p>
            <NavItem href="/docs">소개</NavItem>
            <NavItem href="/docs/install">설치하기</NavItem>
            <NavItem href="/docs/atomicdesign">아토믹 디자인</NavItem>
          </NavList>
          <NavList>
            <p>디자인 토큰</p>
            <NavItem href="/docs/token/color">컬러</NavItem>
            <NavItem href="/docs/token/spacing">간격</NavItem>
            <NavItem href="/docs/token/typo">텍스트</NavItem>
          </NavList>
          <NavList>
            <p>component</p>
            <NavItem href="/docs/components/navigation">네비게이션</NavItem>
            <NavItem href="/docs/components/sidemenu">사이드메뉴</NavItem>
            <NavItem href="/docs/components/modal">모달창</NavItem>
            <NavItem href="/docs/components/toc">목차</NavItem>
            <NavItem href="/docs/components/input">입력창</NavItem>
            <NavItem href="/docs/components/select">선택창</NavItem>
            <NavItem href="/docs/components/checkbox">체크박스</NavItem>
            <NavItem href="/docs/components/radio">라디오</NavItem>
            <NavItem href="/docs/components/badge">배지</NavItem>
            <NavItem href="/docs/components/button">버튼</NavItem>
            <NavItem href="/docs/components/table">테이블</NavItem>
            <NavItem href="/docs/components/pagination">페이지네이션</NavItem>
            <NavItem href="/docs/components/collapse">콜랩스</NavItem>
            <NavItem href="/docs/components/card">카드</NavItem>
            <NavItem href="/docs/components/toast">토스트 알림</NavItem>
            <NavItem href="/docs/components/tab">탭</NavItem>
          </NavList>
        </Sidemenu>
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
