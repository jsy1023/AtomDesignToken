"use client";

import { useEffect, useState } from "react";
import { Radio } from "../Input/Input";

export const ThemeSelector = ({
  type,
}: {
  type: "all" | "theme" | "input";
}) => {
  const themes = ["standard", "dark"];
  const [selectedTheme, setSelectedTheme] = useState("standard");
  const inputThemes = ["inputStandard", "inputCircle"];
  const [selectedInputTheme, setSelectedInputTheme] = useState("inputStandard");

  useEffect(() => {
    const chageThemeValue = () => {
      const storedTheme = localStorage.getItem("theme") || "standard";
      const storedInputTheme =
        localStorage.getItem("inputTheme") || "inputStandard";

      setSelectedTheme(storedTheme);
      setSelectedInputTheme(storedInputTheme);
    };

    chageThemeValue();
  }, []);

  // main theme
  const handleThemeChange = (theme: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      window.dispatchEvent(new Event("storage"));
      setSelectedTheme(theme);
    }
  };
  // input theme
  const handleInputThemeChange = (theme: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("inputTheme", theme);
      window.dispatchEvent(new Event("storage"));
      setSelectedInputTheme(theme);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <p>theme 선택</p>
      <div className="flex flex-col gap-4">
        {type == "all" || type == "theme" ? (
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
        ) : null}
        {type == "all" || type == "input" ? (
          <div className="flex gap-4">
            {inputThemes.map((inputTheme) => (
              <Radio
                name="inputTheme"
                value={inputTheme}
                key={inputTheme}
                onChange={() => handleInputThemeChange(inputTheme)}
                defaultChecked={inputTheme == selectedInputTheme}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const ThemeWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const [theme, setTheme] = useState<string | null>(null); // 테마 상태 추가
  const [inputTheme, setInputTheme] = useState<string | null>(null); // 테마 상태 추가
  // theme setting
  useEffect(() => {
    // 로컬 스토리지에서 테마 가져오기
    const listenStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "standard");
      setInputTheme(localStorage.getItem("inputTheme") || "inputStandard");
    };
    listenStorageChange();
    window.addEventListener("storage", listenStorageChange);

    return () => window.removeEventListener("storage", listenStorageChange);
  }, [theme]);

  return (
    <div className={`${className} ${theme} ${inputTheme}`}>{children}</div>
  );
};
