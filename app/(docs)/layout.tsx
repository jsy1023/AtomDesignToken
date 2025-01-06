"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  const [windowSize, setWindowSize] = useState<number>(); // 초기값 설정
  const [theme, setTheme] = useState<string>(""); // 테마 상태 추가
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  // 윈도우 사이즈 추적
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth); // 윈도우 사이즈 업데이트
    };

    window.addEventListener("resize", handleResize); // 리사이즈 이벤트 리스너 추가

    return () => window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 리스너 제거
  }, [windowSize]);

  // 초기 토글 값 설정

  useEffect(() => {
    if (window.innerWidth > 768) {
      setToggleMenu(true);
    } else {
      setToggleMenu(false);
    }

    // console.log(
    //   `one Time Work!: ${toggleMenu}, windowSize:${window.innerWidth}`
    // );
  }, []);

  // theme setting
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
  }, []);

  return (
    <div className={`flex theme-${theme} h-full`}>
      <nav
        className={`w-full max-w-80 h-full bg-fillCard text-textStandard fixed z-20 left-0 top-0 md:relative ${toggleMenu ? "block" : "hidden"}`}
      >
        <div className="brand">
          <div className="flex items-center justify-between">
            <div>
              <Image
                src={"/images/global/logo.png"}
                alt="Logo"
                width={180}
                height={45}
                draggable="false"
              ></Image>
            </div>
            <button className="p-4">
              <span
                className="material-symbols-outlined"
                onClick={() => setToggleMenu(false)}
                style={{ fontSize: "16px" }}
              >
                close
              </span>
            </button>
          </div>
        </div>
        <ul>
          <li>
            <Link href={"/"} className="px-4 py-2">
              Getting started
            </Link>
            <p></p>
          </li>

          {/* <li className="px-4 py-2">
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
          </li> */}
        </ul>
      </nav>
      <div
        onClick={() => setToggleMenu(false)}
        className={`fixed bg-black opacity-80 w-full h-full left-0 top-0 z-10 md:select-none md:pointer-events-none md:hidden ${toggleMenu ? "block" : "hidden"}`}
      ></div>
      <div className="w-full bg-fillWrapper text-textStandard flex justify-center relative">
        <button
          className={`absolute shadow-md rounded-full bg-fillCard w-12 h-12 top-6 left-6  ${toggleMenu ? "hidden" : "block"} `}
        >
          <span
            className="material-symbols-outlined"
            onClick={() => setToggleMenu(true)}
            style={{ fontSize: "16px" }}
          >
            menu
          </span>
        </button>

        <div className="max-w-[800px] w-full py-24">{children}</div>
      </div>
    </div>
  );
};

export default DocsLayout;
