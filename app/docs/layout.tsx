import Navigation, {
  NavItems,
} from "../templates/Navigation/Navigation";
import Link from "next/link";
import { Card } from "../templates/Card/Card";
import { ThemeSelector } from "../templates/Theme/Theme";
import TOC from "../templates/TOC/TOC";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex w-full h-full min-h-0 pt-[64px]">
        <Navigation
          id="sidebar"
          type="sidenav"
          className={`min-h-0 fixed top-[64px] left-0 z-40
             w-full h-[calc(100dvh-64px)] overflow-auto
             md:relative md:top-0 md:w-[320px] md:h-full border-r bg-white`}
        >
          <div className="flex flex-col h-full w-full overflow-auto">
            <p className="px-4 py-2 text-[var(--text-sidenav-standard)] font-bold">
              시작하기
            </p>
            <div className="px-4">
              <NavItems
                navMenu={[
                  { name: "소개", path: "/docs" },
                  { name: "설치하기", path: "/docs/install" },
                  { name: "아토믹 디자인", path: "/docs/atomicdesign" },
                ]}
              />
            </div>
            <p className="px-4 py-2 text-[var(--text-sidenav-standard)] font-bold">
              디자인 토큰
            </p>
            <div className="px-4">
              <NavItems
                navMenu={[
                  { name: "컬러", path: "/docs/token/color" },
                  { name: "간격", path: "/docs/token/spacing" },
                  { name: "텍스트", path: "/docs/token/typo" },
                ]}
              />
            </div>
            <p className="px-4 py-2 text-[var(--text-sidenav-standard)] font-bold">
              component
            </p>
            <div className="px-4">
              <NavItems
                navMenu={[
                  { name: "네비게이션", path: "/docs/components/global-nav" },
                  { name: "모달창", path: "/docs/components/modal" },
                  { name: "목차", path: "/docs/components/toc" },
                  { name: "입력창", path: "/docs/components/input" },
                  { name: "선택창", path: "/docs/components/select" },
                  { name: "체크박스", path: "/docs/components/checkbox" },
                  { name: "라디오", path: "/docs/components/radio" },
                  { name: "배지", path: "/docs/components/badge" },
                  { name: "버튼", path: "/docs/components/button" },
                  { name: "테이블", path: "/docs/components/table" },
                  { name: "페이지네이션", path: "/docs/components/pagination" },
                  { name: "콜랩스", path: "/docs/components/collapse" },
                  { name: "카드", path: "/docs/components/card" },
                  { name: "토스트 알림", path: "/docs/components/toast" },
                  { name: "탭", path: "/docs/components/tab" },
                ]}
              />
            </div>
          </div>
        </Navigation>
        <div className="relative w-full h-full bg-bg-wrapper grid grid-cols-1 md:grid-cols-4 overflow-auto scroll-smooth">
          <div className="col-span-3 flex flex-1 px-4 flex-col items-center order-2 md:order-1">
            <div className="w-full max-w-[800px] min-w-0 h-full p-4 py-12">
              {children}
            </div>
            <footer className="w-full py-4 px-8 ">
              Built by
              <Link
                href={"https://www.atomground.com"}
                target="_blank"
                className="text-primary"
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
      </div>
    </main>
  );
};

export default DocsLayout;
