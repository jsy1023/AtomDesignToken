"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    <div className={`flex theme-${theme} h-full`}>
      <nav className="w-80 bg-fillCard text-textStandard">
        <div className="brand">
          <Image
            src={"/images/global/logo.png"}
            alt="Logo"
            width={180}
            height={45}
            draggable="false"
          ></Image>
          <Link
            href={"https://www.atomground.com/"}
            prefetch={false}
            target="_blank"
          >
            <button className="flex w-full px-4 py-2 justify-between">
              homepage
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "16px" }}
              >
                arrow_outward
              </span>
            </button>
          </Link>
          <p className="px-4"></p>
        </div>
        <ul>
          <li>
            <Link href={"/"} className="px-4 py-2">
              Getting started
            </Link>
            <p></p>
          </li>

          <li className="px-4 py-2">
            <p>About</p>
          </li>
          <li className="">
            <ul className="px-4">
              <p className="py-2">Design System</p>
              <li className="px-4 py-2">
                <p>Atomic</p>
              </li>
              <li>
                <Link href={"/component"} className="px-4 py-2">
                  Molecules | component
                </Link>
                <p></p>
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
    </div>
  );
};

export default DocsLayout;
