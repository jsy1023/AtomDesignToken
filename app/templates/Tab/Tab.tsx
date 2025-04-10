"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Tab = ({
  tabs,
  tabClass,
  tabNavItemClass,
  tabNavItemActiveClass,
  tabContents,
  tabContentClass,
  tabContentItem,
  expectionValue,
  expectionLayout,
}: {
  tabs: Array<{ id: string; target: string[]; tabItem: React.ReactNode }>;
  tabClass: string;
  tabNavItemClass?: string;
  tabNavItemActiveClass?: string;
  tabContents: Array<{ id: string; tag: string; content: React.ReactNode }>;
  tabContentClass: string;
  tabContentItem?: string;
  expectionValue?: string;
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
    <div className="flex flex-col">
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
