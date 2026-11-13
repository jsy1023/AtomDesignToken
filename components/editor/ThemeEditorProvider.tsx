'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ThemeConfig,
  ColorConfig,
  TypographyConfig,
  TypographyLevelConfig,
  ColorPreset,
  DEFAULT_THEME_CONFIG,
} from '@/lib/data/themeEditorDefaults';
import { applyThemeToDOM, isDarkColor } from '@/lib/services/themeEngine';
import { AWESOME_DESIGN_MD_THEMES } from '@/lib/data/awesomeThemes';

export type EditorTab = 'colors' | 'typography' | 'tokens' | 'icons' | 'preview' | 'export';

interface ThemeEditorContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  activeTab: EditorTab;
  setActiveTab: (tab: EditorTab) => void;
  theme: ThemeConfig;
  updateColor: (key: keyof ColorConfig, value: string) => void;
  updateTypographyLevel: (
    level: keyof Omit<TypographyConfig, 'fontFamily'>,
    field: keyof TypographyLevelConfig,
    value: number | string
  ) => void;
  updateFontFamily: (fontFamily: string) => void;
  updateBorderRadius: (radius: string) => void;
  updateButtonSpacing: (field: 'paddingY' | 'paddingX', value: string) => void;
  updateSelectedIcon: (iconName: string) => void;
  applyColorPreset: (preset: ColorPreset) => void;
  applyFullTheme: (newTheme: ThemeConfig) => void;
  resetTheme: () => void;
  isDirty: boolean;
  mounted: boolean;
  isLocalOnly: boolean;
}

const ThemeEditorContext = createContext<ThemeEditorContextValue | null>(null);

const STORAGE_KEY = 'atom_design_system_theme_v2';

export function ThemeEditorProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpenState] = useState(false);
  const [activeTab, setActiveTab] = useState<EditorTab>('colors');
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [mounted, setMounted] = useState(false);
  const [isLocalOnly, setIsLocalOnly] = useState(false);

  // 로컬 호스트 및 개발 환경 여부 감지
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isDevEnv = process.env.NODE_ENV === 'development';
      const isLocalhost =
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.endsWith('.local') ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.');
      const searchParams = new URLSearchParams(window.location.search);
      const isForceEnabled = searchParams.get('dev_editor') === 'true';

      setIsLocalOnly(isDevEnv || isLocalhost || isForceEnabled);
    }
  }, []);

  const setIsOpen = useCallback((open: boolean) => {
    // 로컬 환경이 아니면 에디터를 열지 않음
    if (!open) {
      setIsOpenState(false);
      return;
    }
    if (isLocalOnly) {
      setIsOpenState(true);
    }
  }, [isLocalOnly]);

  const toggleOpen = useCallback(() => {
    if (isOpen) {
      setIsOpenState(false);
    } else if (isLocalOnly) {
      setIsOpenState(true);
    }
  }, [isOpen, isLocalOnly]);

  // 로컬 스토리지에서 초기 테마 로드
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.trim() !== '') {
        const parsed = JSON.parse(saved);
        // Stale theme self-healing: 다크 배경인데 카드가 흰색(#f8f9fa 등)으로 남아있다면 최신 토큰으로 보정
        if (parsed?.color?.bgPrimary && isDarkColor(parsed.color.bgPrimary) && !isDarkColor(parsed.color.bgSecondary)) {
          const match = AWESOME_DESIGN_MD_THEMES.find(
            (t) => t.color.bgPrimary === parsed.color.bgPrimary && t.color.primary === parsed.color.primary
          );
          if (match) {
            parsed.color = { ...parsed.color, ...match.color };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
            } catch {
              // ignore
            }
          }
        }
        setTheme(parsed);
        applyThemeToDOM(parsed);
        return;
      }
    } catch {
      // ignore parse error
    }
    applyThemeToDOM(DEFAULT_THEME_CONFIG);
  }, []);

  // 테마 변경 시 로컬 스토리지 저장 및 DOM 주입
  const persistAndApply = useCallback((newTheme: ThemeConfig) => {
    setTheme(newTheme);
    applyThemeToDOM(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTheme));
    } catch {
      // ignore storage error
    }
  }, []);


  const updateColor = useCallback(
    (key: keyof ColorConfig, value: string) => {
      setTheme((prev) => {
        const next: ThemeConfig = {
          ...prev,
          color: {
            ...prev.color,
            [key]: value,
          },
        };
        persistAndApply(next);
        return next;
      });
    },
    [persistAndApply]
  );

  const updateTypographyLevel = useCallback(
    (
      level: keyof Omit<TypographyConfig, 'fontFamily'>,
      field: keyof TypographyLevelConfig,
      value: number | string
    ) => {
      setTheme((prev) => {
        const next: ThemeConfig = {
          ...prev,
          typography: {
            ...prev.typography,
            [level]: {
              ...prev.typography[level],
              [field]: value,
            },
          },
        };
        persistAndApply(next);
        return next;
      });
    },
    [persistAndApply]
  );

  const updateFontFamily = useCallback(
    (fontFamily: string) => {
      setTheme((prev) => {
        const next: ThemeConfig = {
          ...prev,
          typography: {
            ...prev.typography,
            fontFamily,
          },
        };
        persistAndApply(next);
        return next;
      });
    },
    [persistAndApply]
  );

  const updateBorderRadius = useCallback(
    (radius: string) => {
      setTheme((prev) => {
        const next: ThemeConfig = {
          ...prev,
          borderRadius: radius,
        };
        persistAndApply(next);
        return next;
      });
    },
    [persistAndApply]
  );

  const updateButtonSpacing = useCallback(
    (field: 'paddingY' | 'paddingX', value: string) => {
      setTheme((prev) => {
        const next: ThemeConfig = {
          ...prev,
          buttonSpacing: {
            paddingY: prev.buttonSpacing?.paddingY || '8px',
            paddingX: prev.buttonSpacing?.paddingX || '16px',
            [field]: value,
          },
        };
        persistAndApply(next);
        return next;
      });
    },
    [persistAndApply]
  );

  const updateSelectedIcon = useCallback(
    (iconName: string) => {
      setTheme((prev) => {
        const next: ThemeConfig = {
          ...prev,
          selectedIcon: iconName,
        };
        persistAndApply(next);
        return next;
      });
    },
    [persistAndApply]
  );

  const applyColorPreset = useCallback(
    (preset: ColorPreset) => {
      setTheme((prev) => {
        const next: ThemeConfig = {
          ...prev,
          color: { ...preset.colors },
          borderRadius: preset.borderRadius,
        };
        persistAndApply(next);
        return next;
      });
    },
    [persistAndApply]
  );

  const applyFullTheme = useCallback(
    (newTheme: ThemeConfig) => {
      persistAndApply(newTheme);
    },
    [persistAndApply]
  );

  const resetTheme = useCallback(() => {
    persistAndApply(DEFAULT_THEME_CONFIG);
  }, [persistAndApply]);

  const isDirty = JSON.stringify(theme) !== JSON.stringify(DEFAULT_THEME_CONFIG);

  return (
    <ThemeEditorContext.Provider
      value={{
        isOpen,
        setIsOpen,
        toggleOpen,
        activeTab,
        setActiveTab,
        theme,
        updateColor,
        updateTypographyLevel,
        updateFontFamily,
        updateBorderRadius,
        updateButtonSpacing,
        updateSelectedIcon,
        applyColorPreset,
        applyFullTheme,
        resetTheme,
        isDirty,
        mounted,
        isLocalOnly,
      }}
    >
      {children}
    </ThemeEditorContext.Provider>
  );
}

export function useThemeEditor() {
  const context = useContext(ThemeEditorContext);
  if (!context) {
    throw new Error('useThemeEditor must be used within a ThemeEditorProvider');
  }
  return context;
}
