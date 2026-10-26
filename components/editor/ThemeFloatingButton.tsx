'use client';

import React from 'react';
import { useThemeEditor } from './ThemeEditorProvider';
import { SlidersHorizontal } from 'lucide-react';

export function ThemeFloatingButton() {
  const { isOpen, toggleOpen, mounted } = useThemeEditor();

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        type="button"
        onClick={toggleOpen}
        aria-label="디자인 시스템 스타일 에디터 열기"
        aria-expanded={isOpen}
        title="스타일 에디터"
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all shadow-sm active:scale-95 ${
          isOpen
            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent'
            : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border-[var(--border-strong)] text-[var(--text-primary)]'
        }`}
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
        <span className="hidden sm:inline">테마 에디터</span>
      </button>
    </div>
  );
}
