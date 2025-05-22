import Link from "next/link";

import GlobalNav from "@/app/templates/GlobalNav/GlobalNav";
import { Toast } from "@/app/templates/Toast/Toast";
import { ThemeSelector } from "../templates/Theme/Theme";
import { Card } from "../templates/Card/Card";
import TOC from "../templates/TOC/TOC";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GlobalNav
        navMenu={[
          { name: "시작하기", path: "/" },
          { name: "설치하기", path: "/install" },
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
          { name: "테이블", path: "/component/table" },
          { name: "네비게이션", path: "/component/global-nav" },
          { name: "토스트 알림", path: "/component/toast-message" },
          { name: "탭", path: "/component/tab" },
          { name: "버튼", path: "/component/button" },
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
    </>
  );
};

export default DocsLayout;
