"use client";

import { useEffect, useState } from "react";
import { Radio } from "../Form/Form";
import { themes } from "@/build/typescript/theme";

export const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(themes[0]);

  const [isThemeLoading, setThemeLoading] = useState(false);

  useEffect(() => {
    const chageThemeValue = () => {
      const storedTheme = localStorage.getItem("theme") || themes[0];
      setSelectedTheme(storedTheme);;
    };

    chageThemeValue();
    setThemeLoading(true);
  }, []);

  // main theme
  const handleThemeChange = (theme: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      window.dispatchEvent(new Event("storage"));
      setSelectedTheme(theme);
    }
  };
  if (isThemeLoading == false) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <p>theme 선택</p>
      <div className="flex flex-col gap-4">
        
          <div className="flex gap-4">
            {themes.map((theme) => (
              <Radio
                name="mainTheme"
                value={theme}
                key={theme}
                onChange={() => handleThemeChange(theme)}
                defaultChecked={theme == selectedTheme}
              />
            ))}
          </div>
        
      </div>
    </div>
  );
};

export const ThemeProvider = () => {
  const [theme, setTheme] = useState<string | null>(null); // 테마 상태 추가
  const [isThemeLoading, setThemeLoading] = useState(false);
  // theme setting
  useEffect(() => {
    // 로컬 스토리지에서 테마 가져오기
    const listenStorageChange = () => {
      const currentTheme = localStorage.getItem("theme") || themes[0];
      setTheme(currentTheme);
      document.documentElement.classList.remove(...themes);
      document.documentElement.classList.add(currentTheme);
    };
    listenStorageChange();
    window.addEventListener("storage", listenStorageChange);
    setThemeLoading(true);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, [theme]);

  if (isThemeLoading == false) {
    return null;
  }
};
