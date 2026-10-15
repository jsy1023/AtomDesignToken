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
import { applyThemeToDOM } from '@/lib/services/themeEngine';

export type EditorTab = 'colors' | 'typography' | 'design-md' | 'preview' | 'export';

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
  applyColorPreset: (preset: ColorPreset) => void;
  applyFullTheme: (newTheme: ThemeConfig) => void;
  resetTheme: () => void;
  isDirty: boolean;
  mounted: boolean;
}

const ThemeEditorContext = createContext<ThemeEditorContextValue | null>(null);

const STORAGE_KEY = 'atom_design_system_theme_v2';

export function ThemeEditorProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<EditorTab>('colors');
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [mounted, setMounted] = useState(false);

  // 로컬 스토리지에서 초기 테마 로드
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
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

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
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
        applyColorPreset,
        applyFullTheme,
        resetTheme,
        isDirty,
        mounted,
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
