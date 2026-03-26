"use client";
import Tab from "@/app/templates/Tab/Tab";

export default function TabDemo() {
  return (
    <div className="w-full">
      <Tab
        tabs={[
          { id: "tab1", target: ["content1"], tabItem: "탭 1" },
          { id: "tab2", target: ["content2"], tabItem: "탭 2" },
          { id: "tab3", target: ["content3"], tabItem: "탭 3" },
        ]}
        tabContents={[
          { id: "c1", tag: "content1", content: <p>탭 1의 콘텐츠입니다.</p> },
          { id: "c2", tag: "content2", content: <p>탭 2의 콘텐츠입니다.</p> },
          { id: "c3", tag: "content3", content: <p>탭 3의 콘텐츠입니다.</p> },
        ]}
      />
    </div>
  );
}
