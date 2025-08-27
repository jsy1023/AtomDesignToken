import { Toast } from "@/app/templates/Toast/Toast";
import { Modal } from "../templates/Modal/Modal";
import Navigation, {
  NavItems,
  NavToggleButton,
} from "../templates/Navigation/Navigation";
import Link from "next/link";
import Image from "next/image";
import { Card } from "../templates/Card/Card";
import { ThemeSelector } from "../templates/Theme/Theme";
import TOC from "../templates/TOC/TOC";

// lib/github.ts
export async function getStarCount() {
  const res = await fetch(
    "https://api.github.com/repos/jsy1023/AtomDesignToken",
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 }, // 1시간마다 캐싱 갱신
    }
  );

  if (!res.ok) {
    throw new Error("GitHub 데이터 fetch 실패");
  }

  const data = await res.json();
  return data.stargazers_count;
}

const DocsLayout = async ({ children }: { children: React.ReactNode }) => {
  const stars = await getStarCount();

  return (
    <>
      <main className="flex flex-col w-full h-full">
        <Navigation className="fixed flex items-center justify-between w-full py-2 px-4 z-50 border-b h-[64px] overflow-hidden">
          <div className="flex">
            <Link href={"/"}>
              <Image
                src={"/images/global/logoSymbol.svg"}
                alt="Logo"
                width={42}
                height={42}
                draggable="false"
              ></Image>
            </Link>
            <NavToggleButton
              targetId="sidebar"
              className="w-12 h-12 top-6 left-6 cursor-pointer z-50"
            >
              <span
                className="material-symbols-outlined text-[var(--text-standard)]"
                style={{ fontSize: "16px" }}
              >
                menu
              </span>
            </NavToggleButton>
          </div>
          <Link
            href={"https://github.com/jsy1023/AtomDesignToken"}
            target="_blank"
            className="flex items-center gap-1"
          >
            <span>{stars}</span>
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              display="inline-block"
              overflow="visible"
              className="text-[var(--text-standard)]"
            >
              <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
            </svg>
          </Link>
        </Navigation>
        <div className="flex w-full h-full min-h-0 pt-[64px]">
          <Navigation
            id="sidebar"
            className="min-h-0 fixed top-[64px] left-0 z-40
             w-full h-[calc(100dvh-64px)] overflow-auto
             md:relative md:top-0 md:w-[320px] md:h-full border-r"
          >
            <div className="flex flex-col h-full w-full overflow-auto">
              <p className="px-4 py-2">시작하기</p>
              <div className="px-4">
                <NavItems
                  navMenu={[
                    { name: "소개", path: "/" },
                    { name: "설치하기", path: "/install" },
                    { name: "아토믹 디자인", path: "/atomicdesign" },
                  ]}
                />
              </div>
              <p className="px-4 py-2">디자인 토큰</p>
              <div className="px-4">
                <NavItems
                  navMenu={[
                    { name: "컬러", path: "/token/color" },
                    { name: "간격", path: "/token/spacing" },
                    { name: "텍스트", path: "/token/typo" },
                  ]}
                />
              </div>
              <p className="px-4 py-2">component</p>
              <div className="px-4">
                <NavItems
                  navMenu={[
                    { name: "네비게이션", path: "/components/global-nav" },
                    { name: "모달창", path: "/components/modal" },
                    { name: "목차", path: "/components/toc" },
                    { name: "입력창", path: "/co mponents/input" },
                    { name: "선택창", path: "/components/select" },
                    { name: "체크박스", path: "/components/checkbox" },
                    { name: "라디오", path: "/components/radio" },
                    { name: "배지", path: "/components/badge" },
                    { name: "버튼", path: "/components/button" },
                    { name: "테이블", path: "/components/table" },
                    { name: "페이지네이션", path: "/components/pagination" },
                    { name: "콜랩스", path: "/components/collapse" },
                    { name: "카드", path: "/components/card" },
                    { name: "토스트 알림", path: "/components/toast-message" },
                    { name: "탭", path: "/components/tab" },
                  ]}
                />
              </div>
            </div>
          </Navigation>
          <div className="relative w-full h-full bg-[var(--background-wrapper)] grid grid-cols-1 md:grid-cols-4 overflow-auto scroll-smooth">
            <div className="col-span-3 flex flex-col items-center order-2 md:order-1">
              <div className="max-w-[800px] min-w-0 h-full p-4 py-12">
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
                <Card className="mb-4">
                  <ThemeSelector type="all" />
                </Card>
                <TOC />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Toast />
      <Modal />
    </>
  );
};

export default DocsLayout;
