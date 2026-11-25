'use client';

import React from 'react';
import { ThemeEditorProvider } from './ThemeEditorProvider';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

/**
 * 전체 애플리케이션에 테마 컨텍스트 및 W3C DTCG 토큰을 제공하는 루트 래퍼입니다.
 */
export function ThemeEditorRoot({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeEditorProvider>
      {children}
      <ThemeSwitcher variant="floating" />
    </ThemeEditorProvider>
  );
}
