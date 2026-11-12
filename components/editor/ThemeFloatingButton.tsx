'use client';

import React from 'react';
import { useThemeEditor } from './ThemeEditorProvider';
import { SlidersHorizontal } from 'lucide-react';

export function ThemeFloatingButton() {
  const { isOpen, toggleOpen, mounted, isLocalOnly } = useThemeEditor();

  // 로컬 개발 환경(localhost, 127.0.0.1 등)에서만 렌더링
  if (!mounted || !isLocalOnly) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        type="button"
        onClick={toggleOpen}
        aria-label="디자인 시스템 스타일 에디터 열기"
        aria-expanded={isOpen}
        title="테마 에디터"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-(--radius-sm) border text-xs font-medium transition-colors ${
          isOpen
            ? 'bg-(--text-primary) text-(--bg-primary) border-(--text-primary)'
            : 'bg-(--bg-primary) hover:bg-(--bg-secondary) border-(--border-subtle) hover:border-(--border-strong) text-(--text-secondary) hover:text-(--text-primary)'
        }`}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">테마 에디터</span>
      </button>
    </div>
  );
}
