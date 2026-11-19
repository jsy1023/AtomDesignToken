'use client';

import React from 'react';
import { Button, NativeSelect } from '@/components/ui';
import { Check, Moon, Palette, RotateCcw, Save, Sliders, Sun } from 'lucide-react';
import { StudioTab, useStudio } from '@/components/studio/context/StudioContext';
import { formatLocaleText } from '@/lib/utils/localeFormat';

export function StudioTopBar() {
  const {
    locale,
    t,
    activeTab,
    handleSelectTab,
    themes,
    selectedThemeId,
    handleSelectTheme,
    handleToggleThemeMode,
    handleResetAll,
    handleSaveToProject,
    isSaving,
    saveSuccess,
  } = useStudio();

  const isDark = themes.find((th) => th.id === selectedThemeId)?.mode === 'dark';

  return (
    <header className="shrink-0 w-full bg-(--bg-primary) border-b border-(--border-subtle) px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 z-20 shadow-xs">
      {/* Left: Studio View Switcher Dropdown & Connection Status */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle) shadow-2xs">
          <Sliders className="w-3.5 h-3.5 text-(--accent-primary) shrink-0" />
          <NativeSelect
            value={activeTab}
            onChange={(e) => handleSelectTab(e.target.value as StudioTab)}
            className="text-xs sm:text-sm font-bold bg-transparent border-0 h-auto p-0 cursor-pointer text-(--text-primary) tracking-tight"
            aria-label="스튜디오 메뉴 선택"
          >
            <option value="components">
              {locale === 'ko' ? '🧩 컴포넌트 스튜디오' : '🧩 Component Studio'}
            </option>
            <option value="themes">
              {locale === 'ko' ? '🎨 디자인 테마 스튜디오' : '🎨 Design Theme Studio'}
            </option>
            <option value="palette">
              {locale === 'ko' ? '🎛️ 팔레트 토큰 관리자' : '🎛️ Palette Manager'}
            </option>
            <option value="preview">
              {locale === 'ko' ? '📜 W3C JSON & CSS 내보내기' : '📜 W3C JSON & CSS Export'}
            </option>
            <option value="brand">
              {locale === 'ko' ? '🏢 브랜드 셋팅' : '🏢 Brand Settings'}
            </option>
          </NativeSelect>
        </div>

        <span
          className="whitespace-nowrap font-mono text-[11px] px-2 py-0.5 rounded bg-(--atom-color-success)/10 text-(--atom-color-success) font-semibold border border-(--atom-color-success)/20 flex items-center gap-1.5 shadow-2xs"
          title="로컬 파일시스템 연동 (/studio)"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-(--atom-color-success) inline-block" />
          <span>{locale === 'ko' ? '로컬 연결됨' : 'Connected'}</span>
        </span>
      </div>

      {/* Right: Quick Tools & Project Save */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle) text-xs">
          <Palette className="w-3.5 h-3.5 text-(--accent-primary) shrink-0" />
          <span className="text-(--text-secondary) text-[11px] font-semibold hidden sm:inline whitespace-nowrap">
            {locale === 'ko' ? '테마:' : 'Theme:'}
          </span>
          <NativeSelect
            value={selectedThemeId}
            onChange={(e) => handleSelectTheme(e.target.value)}
            className="text-xs font-semibold bg-transparent border-0 h-auto p-0 cursor-pointer min-w-0"
          >
            {themes.map((th) => (
              <option key={th.id} value={th.id}>
                {formatLocaleText(th.name, locale)}
              </option>
            ))}
          </NativeSelect>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleToggleThemeMode}
          className="flex items-center gap-1 text-xs py-1 px-2.5 h-7"
          title="라이트 / 다크 모드 빠른 전환"
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-(--atom-color-warning)" />
              <span className="hidden md:inline">{locale === 'ko' ? '라이트' : 'Light'}</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-(--accent-primary)" />
              <span className="hidden md:inline">{locale === 'ko' ? '다크' : 'Dark'}</span>
            </>
          )}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleResetAll}
          className="flex items-center gap-1 text-xs py-1 px-2.5 h-7"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t('reset')}</span>
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={handleSaveToProject}
          disabled={isSaving}
          className="flex items-center gap-1.5 text-xs py-1 px-3 h-7 font-bold bg-(--accent-primary) text-(--bg-primary)"
        >
          {saveSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-(--atom-color-success)" />
              <span>{t('saveSuccess')}</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? t('saving') : t('saveToProject')}</span>
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
