'use client';

import React from 'react';
import { useThemeEditor } from './ThemeEditorProvider';
import { Palette, Sparkles } from 'lucide-react';

export function ThemeFloatingButton() {
  const { isOpen, toggleOpen, mounted } = useThemeEditor();

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover (left of button) */}
      <div className="absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-neutral-900/90 dark:bg-white/95 text-white dark:text-neutral-900 text-xs font-semibold shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap flex items-center gap-1.5 translate-x-1 group-hover:translate-x-0">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>디자인 토큰 & 타이포 에디터</span>
      </div>

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-label="디자인 시스템 스타일 에디터 열기"
        aria-expanded={isOpen}
        className={`relative flex items-center justify-center w-14 h-14 rounded-2xl shadow-2xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${
          isOpen
            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 scale-95 shadow-blue-500/20'
            : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white hover:scale-105 hover:shadow-indigo-500/40 shadow-blue-600/30'
        }`}
      >
        {/* Glow pulse animation */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-40 blur-sm animate-pulse -z-10" />
        )}

        <Palette className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'group-hover:rotate-12'}`} />

        {/* Small live indicator badge */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-neutral-900" />
        </span>
      </button>
    </div>
  );
}
