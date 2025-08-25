"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Tab = ({
  tabs,
  tabClass = "w-full bg-[var(--background-wrapper)] border-b border-[var(--color-border)] relative z-0 h-[57px]",
  tabNavItemClass = "p-4",
  tabNavItemActiveClass = "bg-[var(--background-card)] border border-[var(--color-border)] border-b-[var(--background-card)] relative z-10",
  tabContents,
  tabContentClass = "bg-[var(--background-card)] p-4 border border-t-0  border-[var(--color-border)] -mt-[1px]",
  tabContentItem = "text-[var(--text-standard)]",
  expectionValue,
  expectionLayout,
}: {
  /**탭 네비게이션을 정의내립니다.
   */
  tabs: Array<{
    /** id는 탭 메뉴의 고유 값입니다. 고유 값을 통해 Active 상태 값을 관리합니다.*/
    id: string;
    /** target은 배열로 제공되며, 타겟의 배열과 동일한 내용을 tabContent로 적용됩니다.*/
    target: string[];
    /** 탭 메뉴의 ReactNode 내용을 받습니다.*/
    tabItem: React.ReactNode;
  }>;
  /** 탭 메뉴의 tailwinds css 스타일 지정을 위한 class를 받습니다.*/
  tabClass?: string;
  /** 탭 메뉴의 각각의 tailwinds css 스타일 지정을 위한 class를 받습니다.*/
  tabNavItemClass?: string;
  /** 탭 메뉴의 활성화 상태의 tailwinds css 스타일 지정을 위한 class를 받습니다.*/
  tabNavItemActiveClass?: string;
  /** 탭 메뉴의 콘텐츠 값을 정의내립니다.*/
  tabContents: Array<{
    /** 고유 ID 값입니다.*/
    id: string;
    /** 태그 값으로 tabs target에서 선택된 내용만 화면에 제공됩니다.*/
    tag: string;
    /** 탭 메뉴의 콘텐츠 ReactNode 정보를 받습니다.*/
    content: React.ReactNode;
  }>;
  /** 탭 메뉴의 콘텐츠 레이아웃을 위한한 tailwinds css 스타일 지정을 위한 class를 받습니다. */
  tabContentClass?: string;
  /** 탭 메뉴의 콘텐츠의 각 개별 요소를 위한 tailwinds css 스타일 지정을 위한 class를 받습니다. */
  tabContentItem?: string;
  /** 예외 레이아웃을 사용할 콘텐츠의 tag값을 입력받습니다. */
  expectionValue?: string;
  /** 예외 레이아웃에 사용하기 위한 tailwinds css 스타일 지정을 위한 class를 받습니다. */
  expectionLayout?: string;
}) => {
  const [activeContent, setActiveContent] = useState(tabs[0].target);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const tabContentRef = useRef<HTMLDivElement>(null);

  const handleTabActive = (target: string[], id: string) => {
    setActiveContent(target);
    setActiveTab(id);
  };

  // 👇 activeContent가 변경된 이후에 실행
  useGSAP(() => {
    if (tabContentRef.current) {
      gsap.fromTo(
        tabContentRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power4.out",
        }
      );
    }
  }, [activeContent]);

  return (
    <div className="flex flex-col w-full">
      <div className={tabClass}>
        {tabs.map((tab) => {
          return (
            <button
              key={tab.id}
              id={tab.id}
              onClick={() => handleTabActive(tab.target, tab.id)}
              className={`cursor-pointer ${tabNavItemClass} ${
                activeTab == tab.id
                  ? `text-primary ${tabNavItemActiveClass}`
                  : ""
              }`}
            >
              {tab.tabItem}
            </button>
          );
        })}
      </div>
      <div ref={tabContentRef} className={tabContentClass}>
        {tabContents.map((tabContent) => {
          return activeContent.includes(tabContent.tag) ? (
            <div
              key={tabContent.id}
              id={tabContent.tag}
              className={`w-full sm:w-auto ${tabContentItem} ${
                activeTab == expectionValue ? expectionLayout : null
              }`}
            >
              {tabContent.content}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Tab;
