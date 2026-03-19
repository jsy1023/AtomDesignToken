"use client";

import { useEffect, useState } from "react";
import { themes } from "@/build/typescript/theme";
import { Dropdown, DropdownItem } from "../templates/Dropdown/Dropdown";
import { Button } from "../templates/Button/Button";
import { Radio } from "../templates/Form/Form";

export default function FloatingThemeSelector() {
  const [currentThemes, setCurrentThemes] = useState<Record<string, string>>({});

  useEffect(() => {
    const initThemes: Record<string, string> = {};
    Object.entries(themes).forEach(([group, groupThemes]) => {
      const storedKey = group === "global" ? "theme" : `theme-${group}`;
      const storedTheme = localStorage.getItem(storedKey) || groupThemes[0];
      initThemes[group] = storedTheme;
    });
    setCurrentThemes(initThemes);
  }, []);

  const handleThemeChange = (group: string, theme: string) => {
    if (typeof window !== "undefined") {
      const storedKey = group === "global" ? "theme" : `theme-${group}`;
      localStorage.setItem(storedKey, theme);
      window.dispatchEvent(new Event("storage"));
      
      setCurrentThemes((prev) => ({ ...prev, [group]: theme }));
      
      const groupThemes = themes[group as keyof typeof themes];
      document.documentElement.classList.remove(...groupThemes);
      document.documentElement.classList.add(theme);
    }
  };

  const trigger = (
    <Button
      type="primary"
      className="!w-16 !h-16 !rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all !p-0"
    >
      <span className="material-symbols-outlined !text-3xl">palette</span>
    </Button>
  );

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <Dropdown
        trigger={trigger}
        position="top-right"
        className="floating-theme-dropdown"
        contentClassName="!w-72 !p-6"
      >
        <div className="flex flex-col gap-6">
          <p className="font-header border-b pb-2 text-text-standard">Theme Settings</p>
          {Object.entries(themes).map(([group, groupThemes]) => (
            <div key={group} className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {group} theme
              </p>
              <div className="flex flex-col gap-2">
                {groupThemes.map((theme) => (
                  <DropdownItem 
                    key={theme}
                    onClick={() => handleThemeChange(group, theme)}
                  >
                    <Radio
                      name={`floating-theme-${group}`}
                      value={theme}
                      onChange={() => handleThemeChange(group, theme)}
                      checked={theme === currentThemes[group]}
                    />
                  </DropdownItem>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Dropdown>
    </div>
  );
}
