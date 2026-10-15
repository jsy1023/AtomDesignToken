'use client';

import React, { useEffect } from 'react';
import { useThemeEditor, EditorTab } from './ThemeEditorProvider';
import { ColorEditorTab } from './tabs/ColorEditorTab';
import { TypographyEditorTab } from './tabs/TypographyEditorTab';
import { LivePreviewTab } from './tabs/LivePreviewTab';
import { ExportTab } from './tabs/ExportTab';
import {
  X,
  RotateCcw,
  Palette,
  Type,
  Eye,
  Download,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export function ThemeEditorDrawer() {
  const { isOpen, setIsOpen, activeTab, setActiveTab, resetTheme, isDirty, mounted } = useThemeEditor();

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!mounted) return null;

  const tabs: { id: EditorTab; label: string; icon: React.ElementType }[] = [
    { id: 'colors', label: '색상', icon: Palette },
    { id: 'typography', label: '타이포그래피', icon: Type },
    { id: 'preview', label: '미리보기', icon: Eye },
    { id: 'export', label: '코드 내보내기', icon: Download },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="에디터 닫기"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(false);
            }
          }}
          className="fixed inset-0 bg-neutral-900/40 dark:bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300"
        />
      )}

      {/* Slide-over Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[480px] bg-white dark:bg-neutral-900 shadow-2xl border-l border-neutral-200 dark:border-neutral-800 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="디자인 시스템 스타일 에디터"
      >
        {/* 1. Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  스타일 & 타이포 에디터
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  실시간 연동
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                색상, h1~h6, 본문 텍스트 스타일을 즉각 정의합니다
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isDirty && (
              <button
                type="button"
                onClick={resetTheme}
                title="기본값으로 되돌리기"
                className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="닫기"
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Navigation Tabs */}
        <div className="px-4 border-b border-neutral-200/80 dark:border-neutral-800 shrink-0 bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 transition-all shrink-0 ${
                    isActive
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Tab Contents Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {activeTab === 'colors' && <ColorEditorTab />}
          {activeTab === 'typography' && <TypographyEditorTab />}
          {activeTab === 'preview' && <LivePreviewTab />}
          {activeTab === 'export' && <ExportTab />}
        </div>

        {/* 4. Drawer Footer */}
        <div className="p-3.5 px-5 border-t border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>로컬에 자동 저장됨</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-1.5 text-xs font-bold rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
          >
            완료
          </button>
        </div>
      </aside>
    </>
  );
}
