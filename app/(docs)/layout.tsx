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
    <body className={`flex theme-${theme} h-full`}>
      <nav className="w-60 bg-fillCard text-textStandard">
        <ul>
          <li className="px-4 py-2">
            <p>Getting Started</p>
          </li>

          <li className="px-4 py-2">
            <p>About</p>
          </li>
          <li className="px-4 py-2">
            <ul>
              <p className="px-4 py-2">Design System</p>
              <li className="px-4 py-2">
                <p>Atomic</p>
              </li>
              <li className="px-4 py-2">
                <p>Molecules</p>
              </li>
            </ul>
          </li>
          <li className="px-4 py-2">
            <p>Design Token</p>
          </li>
          <li className="px-4 py-2">
            <p>Version</p>
          </li>
        </ul>
      </nav>
      <div className="w-full bg-fillWrapper text-textStandard flex justify-center">
        <div className="max-w-[800px] w-full py-24">{children}</div>
      </div>
    </body>
  );
};

export default DocsLayout;
