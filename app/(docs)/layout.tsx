import Link from "next/link";

import GlobalNav from "@/app/templates/GlobalNav/GlobalNav";
import { Toast } from "@/app/templates/Toast/Toast";
import { ThemeSelector } from "../templates/Theme/Theme";
import { Card } from "../templates/Card/Card";
import TOC from "../templates/TOC/TOC";
import { Modal } from "../templates/Modal/Modal";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GlobalNav
        navMenu={[
          { name: "시작하기", label: true },
          { name: "소개", path: "/" },
          { name: "설치하기", path: "/install" },
          { name: "아토믹 디자인", path: "/atomicdesign" },
          { name: "디자인 토큰", label: true },
          { name: "컬러", path: "/token/color" },
          { name: "간격", path: "/token/spacing" },
          { name: "텍스트", path: "/token/typo" },
          { name: "component", label: true },
          { name: "네비게이션", path: "/component/global-nav" },
          { name: "모달창", path: "/component/modal" },
          { name: "목차", path: "/component/toc" },
          {
            name: "입력 양식",
            path: "/component/input",
            subItems: [
              { name: "입력창", path: "/component/input" },
              { name: "선택창", path: "/component/select" },
              { name: "체크박스", path: "/component/checkbox" },
              { name: "라디오", path: "/component/radio" },
            ],
          },
          { name: "배지", path: "/component/badge" },
          { name: "버튼", path: "/component/button" },
          { name: "테이블", path: "/component/table" },
          { name: "페이지네이션", path: "/component/pagination" },
          { name: "콜랩스", path: "/component/collapse" },
          { name: "토스트 알림", path: "/component/toast-message" },
          { name: "탭", path: "/component/tab" },
        ]}
      />
      <div className="w-full bg-[var(--background-wrapper)] grid grid-cols-1 md:grid-cols-4 overflow-auto scroll-smooth">
        <div className="col-span-3 flex flex-col items-center order-2 md:order-1">
          <div className="max-w-[800px] min-w-0 h-full p-4">{children}</div>
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
            <Card className="mb-4">
              <ThemeSelector type="all" />
            </Card>
            <TOC />
          </div>
        </div>
      </div>
      <Toast />
      <Modal />
    </>
  );
};

export default DocsLayout;
