'use client';

import React, { useEffect } from 'react';
import { useThemeEditor, EditorTab } from './ThemeEditorProvider';
import { useI18n } from '@/lib/i18n';
import { ColorEditorTab } from './tabs/ColorEditorTab';
import { TypographyEditorTab } from './tabs/TypographyEditorTab';
import { TokensEditorTab } from './tabs/TokensEditorTab';
import { IconsEditorTab } from './tabs/IconsEditorTab';
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
  CheckCircle2,
  Sliders,
} from 'lucide-react';

export function ThemeEditorDrawer() {
  const { isOpen, setIsOpen, activeTab, setActiveTab, resetTheme, isDirty, mounted, isLocalOnly } = useThemeEditor();
  const { t, locale } = useI18n();

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

  // 로컬 개발 환경(localhost 등)에서만 렌더링
  if (!mounted || !isLocalOnly) return null;

  const tabLabels: Record<EditorTab, { ko: string; en: string; ja: string }> = {
    colors: { ko: '색상', en: 'Colors', ja: 'カラー' },
    typography: { ko: '타이포', en: 'Typography', ja: 'タイポ' },
    tokens: { ko: '곡률/간격', en: 'Tokens', ja: 'トークン' },
    icons: { ko: '아이콘', en: 'Icons', ja: 'アイコン' },
    preview: { ko: '미리보기', en: 'Preview', ja: 'プレビュー' },
    export: { ko: '내보내기', en: 'Export', ja: 'エクスポート' },
  };

  const tabs: { id: EditorTab; label: string; icon: React.ElementType }[] = [
    { id: 'colors', label: tabLabels.colors[locale] || tabLabels.colors.ko, icon: Palette },
    { id: 'typography', label: tabLabels.typography[locale] || tabLabels.typography.ko, icon: Type },
    { id: 'tokens', label: tabLabels.tokens[locale] || tabLabels.tokens.ko, icon: Sliders },
    { id: 'icons', label: tabLabels.icons[locale] || tabLabels.icons.ko, icon: Sparkles },
    { id: 'preview', label: tabLabels.preview[locale] || tabLabels.preview.ko, icon: Eye },
    { id: 'export', label: tabLabels.export[locale] || tabLabels.export.ko, icon: Download },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label={t('common.close', '에디터 닫기')}
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
        aria-label={locale === 'ja' ? 'デザインシステムスタイルエディタ' : locale === 'en' ? 'Design System Style Editor' : '디자인 시스템 스타일 에디터'}
      >
        {/* 1. Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-(--radius-sm) bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {locale === 'ja' ? 'スタイル＆タイポエディタ' : locale === 'en' ? 'Style & Typography Editor' : '스타일 & 타이포 에디터'}
                </h2>
                <span className="text-[11px] font-mono text-neutral-500">
                  {locale === 'ja' ? 'リアルタイム' : locale === 'en' ? 'Live' : '실시간'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {locale === 'ja'
                  ? 'カラー、タイポグラフィ、トークンを即時調整します'
                  : locale === 'en'
                  ? 'Customize colors, typography, and tokens in real time'
                  : '색상, 타이포그래피, 토큰을 즉시 조절합니다'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isDirty && (
              <button
                type="button"
                onClick={resetTheme}
                title={locale === 'ja' ? 'デフォルトに戻す' : locale === 'en' ? 'Reset to defaults' : '기본값으로 되돌리기'}
                className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t('common.close', '닫기')}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Navigation Tabs */}
        <div 
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}
          className="px-4 border-b shrink-0"
        >
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={isActive ? { borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' } : {}}
                  className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 transition-all shrink-0 ${
                    isActive
                      ? 'border-b-2 font-bold'
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
          {activeTab === 'tokens' && <TokensEditorTab />}
          {activeTab === 'icons' && <IconsEditorTab />}
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
