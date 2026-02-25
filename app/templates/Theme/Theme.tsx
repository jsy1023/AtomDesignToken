"use client";

import { useEffect, useState } from "react";
import { Radio } from "../Form/Form";
import { themes } from "@/build/typescript/theme";

export const ThemeSelector = () => {
  const [selectedThemes, setSelectedThemes] = useState<Record<string, string>>({});
  const [isThemeLoading, setThemeLoading] = useState(false);

  useEffect(() => {
    const chageThemeValue = () => {
      const newThemes: Record<string, string> = {};
      Object.entries(themes).forEach(([group, groupThemes]) => {
        const storedKey = group === "global" ? "theme" : `theme-${group}`;
        const storedTheme = localStorage.getItem(storedKey) || groupThemes[0];
        newThemes[group] = storedTheme;
      });
      setSelectedThemes(newThemes);
    };

    chageThemeValue();
    setThemeLoading(true);
  }, []);

  const handleThemeChange = (group: string, theme: string) => {
    if (typeof window !== "undefined") {
      const storedKey = group === "global" ? "theme" : `theme-${group}`;
      localStorage.setItem(storedKey, theme);
      window.dispatchEvent(new Event("storage"));
      setSelectedThemes((prev) => ({ ...prev, [group]: theme }));
    }
  };

  if (isThemeLoading === false) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(themes).map(([group, groupThemes]) => (
        <div key={group} className="flex flex-col gap-2">
          <p className="font-bold capitalize">{group} Theme</p>
          <div className="flex gap-4 flex-wrap">
            {groupThemes.map((theme) => (
              <Radio
                name={`theme-${group}`}
                value={theme}
                key={theme}
                onChange={() => handleThemeChange(group, theme)}
                defaultChecked={theme === selectedThemes[group]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const ThemeProvider = () => {
  const [theme, setTheme] = useState<Record<string, string>>({});
  const [isThemeLoading, setThemeLoading] = useState(false);

  useEffect(() => {
    const listenStorageChange = () => {
      const newThemes: Record<string, string> = {};
      Object.entries(themes).forEach(([group, groupThemes]) => {
        const storedKey = group === "global" ? "theme" : `theme-${group}`;
        const currentTheme = localStorage.getItem(storedKey) || groupThemes[0];
        newThemes[group] = currentTheme;
        
        document.documentElement.classList.remove(...groupThemes);
        document.documentElement.classList.add(currentTheme);
      });
      setTheme(newThemes);
    };

    listenStorageChange();
    window.addEventListener("storage", listenStorageChange);
    setThemeLoading(true);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, []);

  if (isThemeLoading === false) {
    return null;
  }
};
