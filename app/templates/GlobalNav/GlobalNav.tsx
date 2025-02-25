"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const GlobalNav = () => {
  const [windowSize, setWindowSize] = useState<number>(); // 초기값 설정

  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const pathname = usePathname();
  const navMenu = [
    { name: "시작하기", path: "/" },
    { name: "설치하기", path: "/install" },
    { name: "입력창", path: "/component/input" },
    { name: "선택창", path: "/component/select" },
    { name: "체크박스", path: "/component/checkbox" },
    { name: "라디오", path: "/component/radio" },
    { name: "버튼", path: "/component/button" },
  ];

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

  return (
    <>
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
          {navMenu.map((menu) => {
            return (
              <li key={menu.name}>
                <Link
                  href={menu.path}
                  className={clsx("px-4 py-2 block", {
                    "text-primary": menu.path == pathname,
                  })}
                >
                  {menu.name}
                </Link>
              </li>
            );
          })}
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
    </>
  );
};

export default GlobalNav;
