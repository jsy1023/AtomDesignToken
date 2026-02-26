"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

interface NavItemsAttr {
  type?: "topnav" | "sidenav";
  navMenu: {
    name: string;
    path?: string;
  }[];
}

// Custom CSS classes are now used via css/navigation.css

const handleNavToggle = (targetId: string) => {
  const el = document.getElementById(targetId);
  if (el) {
    const isHidden = el.style.display === "none" || el.style.display === "";
    el.style.display = isHidden ? "block" : "none";
  }
};

const Navigation = ({
  children,
  id,
  className,
  type = "topnav",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  type?: "topnav" | "sidenav";
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const mobileClose = (e: React.MouseEvent) => {
    if (isMobile) {
      if (id) {
        handleNavToggle(id);
      }
    }
  };

  return (
    <nav
      id={id ? id : undefined}
      className={`nav-container nav-${type} ${className} overflow-auto`}
      onClick={mobileClose}
    >
      {children}
    </nav>
  );
};

const NavItems = ({ navMenu, type = "sidenav" }: NavItemsAttr) => {
  const pathname = usePathname();

  return (
    <ul className={clsx({ "flex flex-row items-center gap-4": type === "topnav" })}>
      {navMenu.map((menu) => {
        return (
          <li className="relative group" key={menu.name}>
            <div className={clsx("flex justify-between items-center pr-4")}>
              <Link
                href={menu.path || "#"}
                className={`${pathname === menu.path ? "nav-text-active" : "nav-text-standard"} px-4 py-2 block hover:opacity-80 transition-opacity`}
              >
                {menu.name}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const NavToggleButton = ({
  children,
  targetId,
  className,
}: {
  children: React.ReactNode;
  targetId: string;
  className?: string;
}) => {
  return (
    <button className={className} onClick={() => handleNavToggle(targetId)}>
      {children}
    </button>
  );
};

const Sidebar = ({ navMenu, type = "sidenav" }: NavItemsAttr) => {
  return (
    <nav
      className={clsx(
        `relative nav-container nav-${type} w-full md:w-[320px] h-full z-20 left-0 overflow-auto`
      )}
    >
      <ul>
        {navMenu.map((menu, idx) => {
          return (
            <li className="relative group" key={menu.name + idx}>
              <div className={clsx("flex justify-between items-center pr-4")}>
                <Link
                  href={menu.path || "#"}
                  className={clsx(
                    `px-4 py-2 block nav-text-standard hover:opacity-80 transition-opacity`
                  )}
                >
                  {menu.name}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const GlobalNav = ({
  type = "sidebar",
  navMenu,
  brand = true,
}: {
  type?: "sidebar" | "topmenu" | "mobile";
  navMenu: {
    name: string;
    path?: string;
    subItems?: { name: string; path: string }[];
    label?: boolean;
  }[];
  brand?: boolean;
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

  const navType = type === "sidebar" ? "sidenav" : "topnav";

  return (
    <nav
      className={clsx(
        `fixed top-0 md:relative w-full nav-container nav-${navType} z-20 left-0 ${toggleMenu ? "block" : "hidden"}`,
        { [`h-full max-w-80 overflow-auto border-r nav-border`]: type == "sidebar" },
        { [`h-auto flex flex-row items-center border-b nav-border`]: type == "topmenu" }
      )}
    >
      {/* brand */}
      {brand ? (
        <div className="brand">
          <div className={`flex items-center justify-between`}>
            <Link href={"/"}>
              <Image
                src={"/images/global/logo.png"}
                alt="Logo"
                width={180}
                height={45}
                draggable="false"
              ></Image>
            </Link>
            <button
              className={`fixed shadow-md rounded-full nav-bg border nav-border w-12 h-12 top-6 left-6 cursor-pointer z-50`}
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <span
                className={`material-symbols-outlined nav-text-standard`}
                style={{ fontSize: "16px" }}
              >
                menu
              </span>
            </button>
          </div>
        </div>
      ) : null}
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
                  className={`px-4 text-sm nav-text-sub mt-2 mb-0`}
                >
                  {menu.name}
                </p>
              );
            default:
              return (
                <li className="relative group" key={menu.name}>
                  <div
                    className={clsx("flex justify-between items-center pr-4")}
                  >
                    <Link
                      href={menu.path || "#"}
                      className={clsx(
                        `px-4 py-2 block nav-text-standard`,
                        {
                          "nav-text-active":
                            (menu.path && menu.path == pathname) ||
                            menu.subItems?.some((sub) => sub.path === pathname),
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
                            `material-symbols-outlined nav-text-sub transition-transform`,
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
                          [`hidden absolute top-[42px] group-hover:block hover:block nav-bg border nav-border`]:
                            type == "topmenu",
                        },
                        {
                          hidden: !openSubMenu[menu.name] && type == "sidebar",
                        }
                      )}
                    >
                      {menu.subItems.map((submenu) => {
                        return (
                          <li key={submenu.name}>
                            <Link
                              className={clsx(
                                `px-4 py-2 block nav-text-standard`,
                                {
                                  "nav-text-active": submenu.path == pathname,
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
  );
};
export default Navigation;
export { Sidebar, GlobalNav, NavToggleButton, NavItems };
