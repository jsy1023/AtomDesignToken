'use client';

import React from 'react';
import { ThemeEditorProvider } from './ThemeEditorProvider';
import { ThemeFloatingButton } from './ThemeFloatingButton';
import { ThemeEditorDrawer } from './ThemeEditorDrawer';

/**
 * 전역 어디서나 우측 하단 플로팅 버튼과 우측 슬라이드 에디터를 렌더링하고,
 * 전체 애플리케이션에 테마 컨텍스트를 제공하는 루트 래퍼입니다.
 */
export function ThemeEditorRoot({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeEditorProvider>
      {children}
      <ThemeFloatingButton />
      <ThemeEditorDrawer />
    </ThemeEditorProvider>
  );
}
