'use client';

import React from 'react';
import { Button, Input } from '@/components/ui';
import {
  Building2,
  Component,
  FileCode,
  Layers,
  Palette,
  Plus,
  Ruler,
  Search,
  Sparkles,
  Square,
  Type,
} from 'lucide-react';
import { StudioTab, useStudio } from '@/components/studio/context/StudioContext';
import { formatLocaleText } from '@/lib/utils/localeFormat';

const COMPONENT_CATEGORIES = ['all', 'Form', 'Layout', 'Navigation', 'Data', 'Feedback'] as const;

export function StudioSidebar() {
  const {
    locale,
    t,
    activeTab,
    handleSelectTab,
    filteredComponents,
    selectedComponentId,
    handleSelectComponent,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    setIsSubmitComponentOpen,
    paletteVariables,
    paletteSearchQuery,
    setPaletteSearchQuery,
    paletteCategoryFilter,
    setPaletteCategoryFilter,
    colorFamilyFilter,
    setColorFamilyFilter,
    colorFamilies,
  } = useStudio();

  const categoryLabel = (cat: string) => {
    if (cat === 'all') return t('categoryAll');
    if (locale !== 'ko') return cat;
    if (cat === 'Form') return '폼';
    if (cat === 'Layout') return '레이아웃';
    if (cat === 'Navigation') return '네비게이션';
    if (cat === 'Data') return '데이터';
    if (cat === 'Feedback') return '피드백';
    return cat;
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0 border-r border-(--border-subtle) bg-(--bg-secondary)/30 flex flex-col h-full min-h-0 overflow-y-auto studio-scrollbar">
      {/* 1. Compact Segmented Studio Mode Menu */}
      <div className="shrink-0 flex flex-col gap-1 p-2 border-b border-(--border-subtle)/60 bg-(--bg-primary)">
        {[
          {
            id: 'components' as StudioTab,
            icon: Component,
            label: locale === 'ko' ? '컴포넌트' : 'Components',
            title: t('tabComponents'),
          },
          {
            id: 'themes' as StudioTab,
            icon: Sparkles,
            label: locale === 'ko' ? '테마' : 'Themes',
            title: t('tabThemes'),
          },
          {
            id: 'palette' as StudioTab,
            icon: Palette,
            label: locale === 'ko' ? '팔레트' : 'Palette Tokens',
            title: t('tabPalette'),
          },
          {
            id: 'preview' as StudioTab,
            icon: FileCode,
            label: locale === 'ko' ? '코드' : 'Code Export',
            title: t('tabJson'),
          },
          {
            id: 'brand' as StudioTab,
            icon: Building2,
            label: locale === 'ko' ? '브랜드' : 'Brand Settings',
            title: t('tabBrand'),
          },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleSelectTab(item.id)}
              title={item.title}
              aria-label={item.title}
              className={`w-full flex items-center justify-start py-2 px-3 h-auto gap-2.5 text-xs font-semibold rounded-(--radius-sm) ${
                isActive
                  ? 'bg-(--text-primary) text-(--bg-primary) shadow-2xs'
                  : 'text-(--text-secondary) hover:text-(--text-primary)'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Button>
          );
        })}
      </div>

      {/* 2. UI Components List (Expanded Scrollable Area) */}
      {activeTab === 'components' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="shrink-0 p-2.5 pb-2 border-b border-(--border-subtle)/30 bg-(--bg-primary)">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchComponent')}
              leftIcon={<Search className="w-3.5 h-3.5" />}
              className="w-full text-xs pr-3 py-1"
            />
          </div>

          <div className="flex-1 px-2.5 py-2 space-y-0.5">
            {filteredComponents.map((comp) => {
              const isSelected = comp.id === selectedComponentId;
              return (
                <Button
                  key={comp.id}
                  variant={isSelected ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleSelectComponent(comp.id)}
                  className={`w-full !justify-between text-left px-2.5 py-1.5 h-auto text-xs font-medium ${
                    isSelected
                      ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                      : 'hover:bg-(--bg-secondary) text-(--text-primary)'
                  }`}
                >
                  <span className="truncate text-left">{formatLocaleText(comp.name, locale)}</span>
                  <span className="text-[10px] font-mono opacity-60 ml-2 shrink-0">
                    {comp.variables.length} vars
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Palette Categories Sidebar */}
      {activeTab === 'palette' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="shrink-0 sticky top-[49px] z-10 p-2.5 pb-2 border-b border-(--border-subtle)/30 bg-(--bg-primary)/95 backdrop-blur-xs">
            <span className="text-xs font-mono font-bold text-(--text-secondary) uppercase tracking-wider block mb-1.5">
              팔레트 카테고리
            </span>
            <Input
              type="text"
              value={paletteSearchQuery}
              onChange={(e) => setPaletteSearchQuery(e.target.value)}
              placeholder="팔레트 검색..."
              leftIcon={<Search className="w-3.5 h-3.5" />}
              className="w-full text-xs pr-3 py-1"
            />
          </div>

          <div className="flex-1 px-2.5 py-2 space-y-0.5">
            <Button
              variant={paletteCategoryFilter === 'status' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setPaletteCategoryFilter('status')}
              className={`w-full !justify-between text-left p-2.5 h-auto text-xs font-medium ${
                paletteCategoryFilter === 'status'
                  ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                  : 'hover:bg-(--bg-secondary) text-(--text-primary)'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>{locale === 'ko' ? '상태 시맨틱 토큰' : 'Semantic Status Tokens'}</span>
              </span>
              <span className="text-[10px] font-mono opacity-60">5</span>
            </Button>

            <Button
              variant={paletteCategoryFilter === 'color' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => {
                setPaletteCategoryFilter('color');
                setColorFamilyFilter('all');
              }}
              className={`w-full !justify-between text-left p-2.5 h-auto text-xs font-medium ${
                paletteCategoryFilter === 'color' && colorFamilyFilter === 'all'
                  ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                  : 'hover:bg-(--bg-secondary) text-(--text-primary)'
              }`}
            >
              <span className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>{locale === 'ko' ? '컬러 팔레트' : 'Color Palette (50-900)'}</span>
              </span>
              <span className="text-[10px] font-mono opacity-60">
                {paletteVariables.filter((p) => p.category === 'color').length}
              </span>
            </Button>

            {paletteCategoryFilter === 'color' && (
              <div className="pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-(--border-subtle) ml-3 my-1">
                {colorFamilies.map((fam) => (
                  <Button
                    key={fam.id}
                    variant={colorFamilyFilter === fam.id ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setColorFamilyFilter(fam.id)}
                    className="w-full text-left px-2 py-1.5 h-auto text-[11px] font-medium flex items-center !justify-between"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        style={{ backgroundColor: fam.color }}
                        className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                      />
                      <span className="truncate">{formatLocaleText(fam.label, locale)}</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-60">10</span>
                  </Button>
                ))}
              </div>
            )}

            <Button
              variant={paletteCategoryFilter === 'size' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setPaletteCategoryFilter('size')}
              className={`w-full !justify-between text-left p-2.5 h-auto text-xs font-medium ${
                paletteCategoryFilter === 'size'
                  ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                  : 'hover:bg-(--bg-secondary) text-(--text-primary)'
              }`}
            >
              <span className="flex items-center gap-2">
                <Ruler className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>{locale === 'ko' ? '사이즈 & 여백' : 'Size & Spacing'}</span>
              </span>
              <span className="text-[10px] font-mono opacity-60">
                {
                  paletteVariables.filter((p) => p.category === 'size' || p.category === 'spacing')
                    .length
                }
              </span>
            </Button>

            <Button
              variant={paletteCategoryFilter === 'radius' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setPaletteCategoryFilter('radius')}
              className={`w-full !justify-between text-left p-2.5 h-auto text-xs font-medium ${
                paletteCategoryFilter === 'radius'
                  ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                  : 'hover:bg-(--bg-secondary) text-(--text-primary)'
              }`}
            >
              <span className="flex items-center gap-2">
                <Square className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>{locale === 'ko' ? '모서리 곡률' : 'Border Radius'}</span>
              </span>
              <span className="text-[10px] font-mono opacity-60">
                {paletteVariables.filter((p) => p.category === 'radius').length}
              </span>
            </Button>

            <Button
              variant={paletteCategoryFilter === 'typography' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setPaletteCategoryFilter('typography')}
              className={`w-full !justify-between text-left p-2.5 h-auto text-xs font-medium ${
                paletteCategoryFilter === 'typography'
                  ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                  : 'hover:bg-(--bg-secondary) text-(--text-primary)'
              }`}
            >
              <span className="flex items-center gap-2">
                <Type className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>{locale === 'ko' ? '타이포그래피' : 'Typography'}</span>
              </span>
              <span className="text-[10px] font-mono opacity-60">
                {paletteVariables.filter((p) => p.category === 'typography').length}
              </span>
            </Button>

            <Button
              variant={paletteCategoryFilter === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setPaletteCategoryFilter('all')}
              className={`w-full !justify-between text-left p-2.5 h-auto text-xs font-medium ${
                paletteCategoryFilter === 'all'
                  ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                  : 'hover:bg-(--bg-secondary) text-(--text-primary)'
              }`}
            >
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>{locale === 'ko' ? '전체 목록' : 'All Tokens'}</span>
              </span>
              <span className="text-[10px] font-mono opacity-60">{paletteVariables.length}</span>
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
