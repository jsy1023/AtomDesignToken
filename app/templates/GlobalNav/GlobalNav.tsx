"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const GlobalNav = ({
  type = "sidebar",
  navMenu,
}: {
  type?: "sidebar" | "topmenu" | "mobile";
  navMenu: {
    name: string;
    path?: string;
    subItems?: { name: string; path: string }[];
    label?: boolean;
  }[];
}) => {
  const [windowSize, setWindowSize] = useState<number>(); // 초기값 설정
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);
  const pathname = usePathname();
  const [openSubMenu, setOpenSubMenu] = useState<Record<string, boolean>>({});

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
    } else {
      setToggleMenu(false);
    }
  }, []);

  const toggleSubMenu = (menuName: string) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <>
      <nav
        className={clsx(
          `fixed top-0 md:relative w-full  bg-[var(--background-card)] text-text-standard z-20 left-0 ${toggleMenu ? "block" : "hidden"}`,
          { "h-full max-w-80 overflow-auto": type == "sidebar" },
          { "h-auto flex flex-row items-center": type == "topmenu" }
        )}
      >
        {/* brand */}
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
            {type == "sidebar" ? (
              <button className="p-4 cursor-pointer">
                <span
                  className="material-symbols-outlined text-[var(--text-standard)]"
                  onClick={() => setToggleMenu(false)}
                  style={{ fontSize: "16px" }}
                >
                  close
                </span>
              </button>
            ) : null}
          </div>
        </div>

        {/* List */}
        <ul
          className={clsx("", {
            "flex flex-row": type == "topmenu",
          })}
        >
          {navMenu.map((menu, idx) => {
            switch (true) {
              case menu.label === true && type == "sidebar":
                return (
                  <p
                    key={menu.name + idx}
                    className="px-4 text-sm text-sub mt-2 mb-0"
                  >
                    {menu.name}
                  </p>
                );
              default:
                if (!menu.path) return null;
                return (
                  <li className="relative group" key={menu.name}>
                    <div
                      className={clsx("flex justify-between items-center pr-4")}
                    >
                      <Link
                        href={menu.path}
                        className={clsx(
                          "px-4 py-2 block text-[var(--text-standard)]",
                          {
                            "text-primary":
                              menu.path == pathname ||
                              menu.subItems?.some(
                                (sub) => sub.path === pathname
                              ),
                          }
                        )}
                      >
                        {menu.name}
                      </Link>
                      {menu.subItems && type == "sidebar" ? (
                        <button
                          className="cursor-pointer"
                          onClick={() => toggleSubMenu(menu.name)}
                        >
                          <span
                            className={clsx(
                              "material-symbols-outlined text-[var(--text-sub)] transition-transform",
                              {
                                "rotate-90": openSubMenu[menu.name],
                              }
                            )}
                            style={{ fontSize: "16px" }}
                          >
                            keyboard_arrow_right
                          </span>
                        </button>
                      ) : null}
                    </div>
                    {menu.subItems ? (
                      <ul
                        className={clsx(
                          "block",
                          {
                            "hidden absolute top-[42px] group-hover:block hover:block bg-[var(--background-card)]":
                              type == "topmenu",
                          },
                          {
                            hidden:
                              !openSubMenu[menu.name] && type == "sidebar",
                          }
                        )}
                      >
                        {menu.subItems.map((submenu) => {
                          return (
                            <li key={submenu.name}>
                              <Link
                                className={clsx(
                                  "px-4 py-2 block text-[var(--text-standard)]",
                                  {
                                    "text-primary": submenu.path == pathname,
                                  },
                                  { "pl-12 ": type == "sidebar" }
                                )}
                                href={submenu.path}
                              >
                                {submenu.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
            }
          })}
        </ul>
      </nav>
      <button
        className={`fixed shadow-md rounded-full bg-[var(--background-card)] w-12 h-12 top-6 left-6 z-10 cursor-pointer ${toggleMenu ? "hidden" : "block"} `}
        onClick={() => setToggleMenu(true)}
      >
        <span
          className="material-symbols-outlined text-[var(--text-standard)]"
          style={{ fontSize: "16px" }}
        >
          menu
        </span>
      </button>
    </>
  );
};

export default GlobalNav;
