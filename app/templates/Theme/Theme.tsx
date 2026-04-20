"use client";

import { useEffect, useState } from "react";
import { Radio } from "../Radio/Radio";

import { themes } from "@/build/typescript/theme";
import { Button } from "../Button/Button";
import { ModalContent } from "../Modal/Modal";

export const ThemeSelector = () => {
  const [selectedThemes, setSelectedThemes] = useState<Record<string, string>>({});
  const [tempThemes, setTempThemes] = useState<Record<string, string>>({});
  const [isThemeLoading, setThemeLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const chageThemeValue = () => {
      const newThemes: Record<string, string> = {};
      Object.entries(themes).forEach(([group, groupThemes]) => {
        const storedKey = group === "global" ? "theme" : `theme-${group}`;
        const storedTheme = localStorage.getItem(storedKey) || groupThemes[0];
        newThemes[group] = storedTheme;
      });
      setSelectedThemes(newThemes);
      setTempThemes(newThemes);
    };

    chageThemeValue();
    setThemeLoading(true);
  }, []);

  const handleTempThemeChange = (group: string, theme: string) => {
    setTempThemes((prev) => ({ ...prev, [group]: theme }));
  };

  const handleApply = () => {
    if (typeof window !== "undefined") {
      Object.entries(tempThemes).forEach(([group, theme]) => {
        const storedKey = group === "global" ? "theme" : `theme-${group}`;
        localStorage.setItem(storedKey, theme);
      });
      window.dispatchEvent(new Event("storage"));
      setSelectedThemes(tempThemes);
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => {
    setTempThemes(selectedThemes); // Reset to current applied themes
    setIsModalOpen(true);
  };

  if (isThemeLoading === false) {
    return null;
  }

  return (
    <>
      <Button type="primary" onClick={handleOpenModal} style={{ width: "100%" }}>
        <div className="flex items-center justify-center gap-2">
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>palette</span>
          <span>테마 설정</span>
        </div>
      </Button>
      <ModalContent
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        modalTitle="테마 설정"
        modalFooter={
          <div className="flex justify-end gap-2 w-full mt-4">
            <Button type="gray" onClick={() => setIsModalOpen(false)}>취소</Button>
            <Button type="primary" onClick={handleApply}>적용</Button>
          </div>
        }
      >
        <div className="flex flex-col gap-6 p-4">
          {Object.entries(themes).map(([group, groupThemes]) => (
            <div key={group} className="flex flex-col gap-3">
              <p className="font-bold capitalize">{group} Theme</p>
              <div className="flex gap-4 flex-wrap">
                {groupThemes.map((theme) => (
                  <Radio
                    name={`theme-${group}-modal`}
                    value={theme}
                    key={theme}
                    onChange={() => handleTempThemeChange(group, theme)}
                    checked={theme === tempThemes[group]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ModalContent>
    </>
  );
};

export const ThemeProvider = () => {
  const [isThemeLoading, setThemeLoading] = useState(false);

  useEffect(() => {
    const listenStorageChange = () => {
      Object.entries(themes).forEach(([group, groupThemes]) => {
        const storedKey = group === "global" ? "theme" : `theme-${group}`;
        const currentTheme = localStorage.getItem(storedKey) || groupThemes[0];
        
        document.documentElement.classList.remove(...groupThemes);
        document.documentElement.classList.add(currentTheme);
      });
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
