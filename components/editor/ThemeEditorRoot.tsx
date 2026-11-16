'use client';

import React from 'react';
import { ThemeEditorProvider } from './ThemeEditorProvider';

/**
 * 전체 애플리케이션에 테마 컨텍스트 및 W3C DTCG 토큰을 제공하는 루트 래퍼입니다.
 * (기존 우측 하단 플로팅 테마 에디터는 전용 로컬 스튜디오(/studio)로 일원화되어 제거됨)
 */
export function ThemeEditorRoot({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeEditorProvider>
      {children}
    </ThemeEditorProvider>
  );
}
