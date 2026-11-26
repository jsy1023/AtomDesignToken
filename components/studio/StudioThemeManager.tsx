'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { formatLocaleText } from '@/lib/utils/localeFormat';
import { Button, Input, Badge } from '@/components/ui';
import { StudioTheme, ThemeCategory } from '@/lib/data/themeData';
import { PaletteVariable, INITIAL_PALETTE_VARIABLES } from '@/lib/data/studioData';
import { useStudio } from '@/components/studio/context/StudioContext';
import { StudioThemeEditorModal } from './StudioThemeEditorModal';
import {
  Palette,
  Sparkles,
  Check,
  Plus,
  Trash2,
  Copy,
  Sun,
  Moon,
  Search,
  Edit2,
  Link2,
} from 'lucide-react';

export interface StudioThemeManagerProps {
  themes?: StudioTheme[];
  activeThemeId?: string;
  paletteVariables?: PaletteVariable[];
  onSelectTheme?: (themeId: string) => void;
  onCreateTheme?: (newTheme: StudioTheme) => void;
  onUpdateTheme?: (updatedTheme: StudioTheme) => void;
  onDeleteTheme?: (themeId: string) => void;
}

export function StudioThemeManager(props: StudioThemeManagerProps = {}) {
  const studio = useStudio();
  const themes = props.themes ?? studio.themes;
  const activeThemeId = props.activeThemeId ?? studio.selectedThemeId;
  const paletteVariables = props.paletteVariables ?? studio.paletteVariables;
  const onSelectTheme = props.onSelectTheme ?? studio.handleSelectTheme;
  const onCreateTheme = props.onCreateTheme ?? studio.handleCreateTheme;
  const onUpdateTheme = props.onUpdateTheme ?? studio.handleUpdateTheme;
  const onDeleteTheme = props.onDeleteTheme ?? studio.handleDeleteTheme;

  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editorState, setEditorState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit' | 'duplicate';
    baseTheme?: StudioTheme | null;
  }>({ isOpen: false, mode: 'create', baseTheme: null });

  const availablePalettes = paletteVariables || INITIAL_PALETTE_VARIABLES;
  const colorPalettes = availablePalettes.filter((p) => p.category === 'color' || p.category === 'status');

  const filteredThemes = themes.filter((t) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'dark'
        ? t.mode === 'dark'
        : selectedCategory === 'custom'
        ? t.isCustom
        : t.category === selectedCategory;

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const activeTheme = themes.find((t) => t.id === activeThemeId) || themes[0];

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle)">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-bold border border-(--accent-primary)/20 flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THEME TOKEN MANAGER</span>
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
              총 {themes.length}개 테마 지원
            </span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-(--text-primary) flex items-center gap-2">
            <Palette className="w-5 h-5 text-(--accent-primary)" />
            <span>{locale === 'ko' ? '디자인 테마 스튜디오' : 'Design Theme Studio'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-(--text-secondary) mt-1">
            {locale === 'ko'
              ? '프라이머리 브랜드 토큰, 서피스, 텍스트, 모서리 곡률 토큰을 자유롭게 수정하여 저장하고 실시간 적용할 수 있습니다.'
              : 'Fine-tune primary brand tokens, surfaces, text, and border radius with live reflection.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setEditorState({ isOpen: true, mode: 'create', baseTheme: null })}
            className="flex items-center gap-1.5 bg-(--accent-primary) text-(--bg-primary)"
          >
            <Plus className="w-4 h-4" />
            <span>{locale === 'ko' ? '새 테마 만들기' : 'Create New Theme'}</span>
          </Button>
        </div>
      </div>

      {/* 2. Active Theme Highlight Banner */}
      {activeTheme && (
        <div className="p-4 rounded-(--radius) bg-(--bg-primary) border-2 border-(--accent-primary)/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              style={{ backgroundColor: activeTheme.colors.primary }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-md font-bold text-sm"
            >
              {activeTheme.mode === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-(--text-primary) truncate">
                  {locale === 'ko' ? '현재 활성화된 테마:' : 'Active Theme:'} {formatLocaleText(activeTheme.name, locale)}
                </span>
                <Badge variant="primary" className="text-[11px] shrink-0">ACTIVE</Badge>
                <Badge variant="neutral" className="text-[11px] shrink-0 uppercase font-mono">{activeTheme.mode}</Badge>
              </div>
              <p className="text-xs text-(--text-secondary) truncate mt-0.5">{activeTheme.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditorState({ isOpen: true, mode: 'edit', baseTheme: activeTheme })}
              className="text-xs py-1.5 px-3 h-auto flex items-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5 text-(--accent-primary)" />
              <span>이 테마의 토큰 수정</span>
            </Button>

            <div className="flex items-center gap-1.5 p-1.5 rounded-(--radius-sm) bg-(--bg-secondary)/50 border border-(--border-subtle)">
              {[
                { color: activeTheme.colors.primary, title: 'Primary Brand' },
                { color: activeTheme.colors.bgPrimary, title: 'Background Primary' },
                { color: activeTheme.colors.bgSecondary, title: 'Surface Secondary' },
                { color: activeTheme.colors.textPrimary, title: 'Text Primary' },
              ].map((sw) => (
                <span
                  key={sw.title}
                  style={{ backgroundColor: sw.color }}
                  className="w-5 h-5 rounded-full border border-(--border-subtle) shadow-xs"
                  title={sw.title}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Filter Toolbar & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: locale === 'ko' ? '전체' : 'All' },
            { id: 'fintech', label: locale === 'ko' ? '핀테크' : 'Fintech' },
            { id: 'lifestyle', label: locale === 'ko' ? '라이프스타일' : 'Lifestyle' },
            { id: 'developer', label: locale === 'ko' ? '테크/개발자' : 'Developer' },
            { id: 'dark', label: locale === 'ko' ? '다크 모드' : 'Dark Mode' },
            { id: 'custom', label: locale === 'ko' ? '커스텀' : 'Custom' },
          ].map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id as ThemeCategory)}
              className="text-xs h-auto py-1.5 px-3"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-muted)" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="테마 검색..."
            className="text-xs pl-8 pr-3 py-1.5 w-full"
          />
        </div>
      </div>

      {/* 4. Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredThemes.map((t) => {
          const isActive = t.id === activeThemeId;

          return (
            <div
              key={t.id}
              className={`rounded-(--radius) bg-(--bg-primary) border flex flex-col justify-between overflow-hidden transition-all ${
                isActive
                  ? 'border-(--accent-primary) ring-2 ring-(--accent-primary)/30 shadow-md'
                  : 'border-(--border-subtle) hover:border-(--border-strong)'
              }`}
            >
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-base text-(--text-primary)">
                        {formatLocaleText(t.name, locale)}
                      </span>
                      {isActive && (
                        <Badge variant="primary" className="text-[10px] py-0 px-1.5 font-mono">ACTIVE</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Badge variant="secondary" className="text-[10px] uppercase font-mono py-0">
                        {t.mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
                      </Badge>
                      <Badge variant="neutral" className="text-[10px] uppercase font-mono py-0">
                        곡률: {t.borderRadius}
                      </Badge>
                      {t.isCustom && (
                        <Badge variant="warning" className="text-[10px] py-0 font-mono">Custom</Badge>
                      )}
                    </div>
                  </div>
                  <span
                    style={{ backgroundColor: t.brandColor }}
                    className="w-6 h-6 rounded-full border border-(--border-subtle) shadow-xs shrink-0"
                    title={t.brandColor}
                  />
                </div>

                <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-2 min-h-[32px]">
                  {t.description}
                </p>

                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-(--text-muted)">
                    <span className="font-bold uppercase flex items-center gap-1">
                      <Link2 className="w-3 h-3 text-(--accent-primary)" />
                      <span>Palette Linked</span>
                    </span>
                    <span className="truncate max-w-[150px] font-mono opacity-80">
                      {t.paletteBindings?.primary || 'var(--atom-palette-blue-500)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 p-1 rounded bg-(--bg-secondary)/60 border border-(--border-subtle)/50">
                    {[
                      { c: t.colors.primary, label: 'Primary' },
                      { c: t.colors.bgPrimary, label: 'Background', bordered: true },
                      { c: t.colors.bgSecondary, label: 'Surface', bordered: true },
                      { c: t.colors.textPrimary, label: 'Text' },
                      { c: t.colors.borderSubtle, label: 'Border', bordered: true },
                      { c: t.colors.statusSuccess, label: 'Success' },
                    ].map((sw) => (
                      <div
                        key={sw.label}
                        style={{ backgroundColor: sw.c }}
                        className={`flex-1 h-5 rounded-xs ${sw.bordered ? 'border border-(--border-subtle)' : ''}`}
                        title={`${sw.label}: ${sw.c}`}
                      />
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: t.colors.bgSecondary,
                    borderColor: t.colors.borderSubtle,
                    borderRadius: t.borderRadius,
                  }}
                  className="p-3 border flex items-center justify-between gap-2 shadow-xs transition-colors"
                >
                  <Button
                    style={{ backgroundColor: t.colors.primary, borderRadius: t.borderRadius, color: 'var(--bg-primary)' }}
                    size="sm"
                    className="text-xs py-1 px-2.5 h-auto font-medium shadow-xs"
                  >
                    Button
                  </Button>
                  <span
                    style={{ backgroundColor: t.colors.primaryLight, color: t.colors.primary, borderRadius: t.borderRadius }}
                    className="text-[11px] font-mono px-2 py-0.5 font-bold"
                  >
                    Badge
                  </span>
                  <span style={{ color: t.colors.textPrimary }} className="text-xs font-semibold">
                    Aa 가나다
                  </span>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-(--border-subtle) bg-(--bg-secondary)/30 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditorState({ isOpen: true, mode: 'edit', baseTheme: t })}
                    className="text-xs py-1 px-2 h-auto text-(--accent-primary) hover:underline flex items-center gap-1 font-semibold"
                    title="이 테마의 토큰 편집 및 저장"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>토큰 수정</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditorState({ isOpen: true, mode: 'duplicate', baseTheme: t })}
                    className="text-xs py-1 px-1.5 h-auto text-(--text-secondary) hover:text-(--text-primary) flex items-center gap-1"
                    title="이 테마 복제"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  {themes.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteTheme(t.id)}
                      className="text-xs py-1 px-1.5 h-auto text-(--text-secondary) hover:text-(--atom-color-destructive) flex items-center gap-1"
                      title="테마 삭제"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>

                <Button
                  variant={isActive ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => onSelectTheme(t.id)}
                  className={`text-xs py-1 px-3 h-auto font-semibold flex items-center gap-1.5 ${
                    isActive ? 'bg-(--accent-primary) text-(--bg-primary)' : ''
                  }`}
                >
                  {isActive ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>적용 중</span>
                    </>
                  ) : (
                    <span>테마 적용</span>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <StudioThemeEditorModal
        isOpen={editorState.isOpen}
        mode={editorState.mode}
        baseTheme={editorState.baseTheme}
        themes={themes}
        colorPalettes={colorPalettes}
        locale={locale}
        onClose={() => setEditorState((prev) => ({ ...prev, isOpen: false }))}
        onCreateTheme={onCreateTheme}
        onUpdateTheme={onUpdateTheme}
      />
    </div>
  );
}
