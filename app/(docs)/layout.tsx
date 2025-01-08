"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
        className={`fixed w-full max-w-80 h-full bg-fill-card text-text-standard z-20 left-0 top-0 md:relative ${toggleMenu ? "block" : "hidden"}`}
      >
        <div className="brand">
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <Image
                src={"/images/global/logo.png"}
                alt="Logo"
                width={180}
                height={45}
                draggable="false"
              ></Image>
            </Link>
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
            <Link href={"/"} className="px-4 py-2 block">
              시작하기
            </Link>
          </li>
          <li>
            <Link href={"/component/input"} className="px-4 py-2 block">
              입력창
            </Link>
          </li>
        </ul>
      </nav>
      <button
        className={`fixed shadow-md rounded-full bg-fill-card w-12 h-12 top-6 left-6 z-10 ${toggleMenu ? "hidden" : "block"} `}
      >
        <span
          className="material-symbols-outlined"
          onClick={() => setToggleMenu(true)}
          style={{ fontSize: "16px" }}
        >
          menu
        </span>
      </button>

      <div className="w-full bg-fill-wrapper text-text-standard flex justify-center relative overflow-auto">
        <div className="max-w-[800px] w-full px-4 py-12 lg:px-0 lg:py-24">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
