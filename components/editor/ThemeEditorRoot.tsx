'use client';

import React from 'react';
import { ThemeEditorProvider } from './ThemeEditorProvider';
import { ThemeFloatingButton } from './ThemeFloatingButton';
import { ThemeEditorDrawer } from './ThemeEditorDrawer';

/**
 * 전역 어디서나 우측 하단 플로팅 버튼과 우측 슬라이드 에디터를 렌더링하는 루트 컴포넌트입니다.
 */
export function ThemeEditorRoot() {
  return (
    <ThemeEditorProvider>
      <ThemeFloatingButton />
      <ThemeEditorDrawer />
    </ThemeEditorProvider>
  );
}
