"use client";

import { useEffect, useState, useRef } from "react";
import { themes } from "@/build/typescript/theme";
import { Button } from "../templates/Button/Button";
import { Radio } from "../templates/Form/Form";

export default function FloatingThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentThemes, setCurrentThemes] = useState<Record<string, string>>({});

  useEffect(() => {
    // 테마 초기값 설정
    const initThemes: Record<string, string> = {};
    Object.entries(themes).forEach(([group, groupThemes]) => {
      const storedKey = group === "global" ? "theme" : `theme-${group}`;
      const storedTheme = localStorage.getItem(storedKey) || groupThemes[0];
      initThemes[group] = storedTheme;
    });
    setCurrentThemes(initThemes);
  }, []);

  useEffect(() => {
    // 바깥 클릭 시 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (group: string, theme: string) => {
    if (typeof window !== "undefined") {
      const storedKey = group === "global" ? "theme" : `theme-${group}`;
      localStorage.setItem(storedKey, theme);
      window.dispatchEvent(new Event("storage")); // ThemeProvider 리스너 작동 트리거
      
      // 즉시 UI 반영을 위한 상태 업데이트
      setCurrentThemes((prev) => ({ ...prev, [group]: theme }));
      
      // 테마 변경 시 문서 전체 테마 클래스 교체 (ThemeProvider에 의존할 수도 있지만 즉각성 확보)
      const groupThemes = themes[group as keyof typeof themes];
      document.documentElement.classList.remove(...groupThemes);
      document.documentElement.classList.add(theme);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]" ref={dropdownRef}>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-4 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Theme Settings</h3>
            {Object.entries(themes).map(([group, groupThemes]) => (
              <div key={group} className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  {group} theme
                </p>
                <div className="flex flex-col gap-2">
                  {groupThemes.map((theme) => (
                    <label 
                      key={theme} 
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200"
                    >
                      <Radio
                        name={`floating-theme-${group}`}
                        value={theme}
                        onChange={() => handleThemeChange(group, theme)}
                        checked={theme === currentThemes[group]}
                      />
                      <span className="text-sm font-medium text-gray-700">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <Button
        type="primary"
        onClick={() => setIsOpen(!isOpen)}
        className="!w-16 !h-16 !rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all !p-0"
      >
        <span className="material-symbols-outlined !text-3xl">palette</span>
      </Button>
    </div>
  );
}
