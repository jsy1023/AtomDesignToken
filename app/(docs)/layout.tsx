"use client";

import { useEffect, useState } from "react";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(""); // 테마 상태 추가

  useEffect(() => {
    // 로컬 스토리지에서 테마 가져오기

    const listenStorageChange = () => {
      if (localStorage.getItem("theme") === null) {
        setTheme("default");
      } else {
        setTheme(localStorage.getItem("theme") || "default");
      }
    };
    window.addEventListener("storage", listenStorageChange);

    return () => window.removeEventListener("storage", listenStorageChange);
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <body className={`flex theme-${theme}`}>
      <nav className="w-60 bg-fillCard text-textStandard">
        <ul>
          <span>Getting Started</span>
          <li>
            <span>About</span>
          </li>
          <li>
            <span>Design System</span>
          </li>
          <li>
            <span>Design Token</span>
          </li>
        </ul>
      </nav>
      <div className="w-full">{children}</div>
    </body>
  );
};

export default DocsLayout;
