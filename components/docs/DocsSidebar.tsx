'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { useI18n } from '@/lib/i18n';
import { GALLERY_COMPONENTS, GalleryComponent } from '@/lib/data/components';
import { resolveStudioComponentId } from '@/lib/data/studioData';
import { useStudioRegistry } from '@/lib/hooks/useStudioRegistry';
import { Input, Badge } from '@/components/ui';
import { Search, BookOpen, Layers, Layout, Palette, Type, Box } from 'lucide-react';

interface DocsSidebarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeId: string;
}

export function DocsSidebar({
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
  activeId
}: DocsSidebarProps) {
  const { theme } = useThemeEditor();
  const { t, dictionary, locale } = useI18n();
  const brandColor = theme?.color?.primary || 'var(--accent-primary)';
  const radius = theme?.borderRadius || '12px';

  const [internalQuery, setInternalQuery] = useState('');
  const query = externalSearchQuery !== undefined ? externalSearchQuery : internalQuery;
  const setQuery = externalOnSearchChange || setInternalQuery;

  const { components: studioComponents } = useStudioRegistry();
  const knownResolvedIds = new Set(
    GALLERY_COMPONENTS.map((c) => resolveStudioComponentId(c.id))
  );

  const mergedGallery: Pick<GalleryComponent, 'id' | 'name' | 'category'>[] = [
    ...GALLERY_COMPONENTS,
    ...studioComponents
      .filter((sc) => !knownResolvedIds.has(sc.id) && !GALLERY_COMPONENTS.some((g) => g.id === sc.id))
      .map((sc) => ({
        id: sc.id,
        name: sc.name,
        category: (sc.category.toLowerCase() as GalleryComponent['category']) || 'form',
      })),
  ];

  const filtered = mergedGallery.filter((comp) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const localized = dictionary?.sidebar?.components?.[comp.id] || '';
    return (
      comp.name.toLowerCase().includes(q) ||
      localized.toLowerCase().includes(q) ||
      comp.id.toLowerCase().includes(q) ||
      comp.category.toLowerCase().includes(q)
    );
  });

  const formComps = filtered.filter((c) => c.category === 'form');
  const feedbackComps = filtered.filter((c) => c.category === 'feedback');
  const navComps = filtered.filter((c) => c.category === 'navigation');
  const dataComps = filtered.filter((c) => c.category === 'data');
  const layoutComps = filtered.filter((c) => c.category === 'layout');

  const renderCompItem = (comp: Pick<GalleryComponent, 'id' | 'name' | 'category'>) => {
    const isActive = activeId === comp.id;
    const localizedName = dictionary?.sidebar?.components?.[comp.id]
      || (locale === 'en' ? comp.name.match(/\(([^)]+)\)/)?.[1] || comp.name.split(' (')[0] : comp.name.split(' (')[0]);

    return (
      <Link
        key={comp.id}
        href={`/components/${comp.id}`}
        style={isActive ? { backgroundColor: brandColor, borderRadius: radius } : { borderRadius: radius }}
        className={`px-3 py-2 text-left text-sm font-medium transition flex items-center justify-between ${
          isActive
            ? 'text-(--bg-primary) bg-(--text-primary) font-semibold shadow-xs'
            : 'text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)'
        }`}
      >
        <span>{localizedName}</span>
        <span className={`text-xs font-mono ${isActive ? 'text-(--bg-primary)/80' : 'opacity-60'}`}>
          .{comp.id}
        </span>
      </Link>
    );
  };

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-5 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 select-none">
      {/* 1. Version Badge & Quick Meta */}
      <div className="flex items-center justify-between pb-3 border-b border-(--border-subtle)">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-(--accent-primary)" />
          <span className="font-bold text-sm text-(--text-primary)">
            {t('sidebar.apiReference', 'API Reference')}
          </span>
        </div>
        <Badge variant="neutral" className="font-mono text-xs">
          v1.2.4 (Latest)
        </Badge>
      </div>

      {/* 2. Fast Component Search Box */}
      <Input
        type="text"
        leftIcon={<Search className="w-4 h-4 text-(--text-secondary)" />}
        placeholder={t('sidebar.searchPlaceholder', '컴포넌트 검색 (Cmd + K)...')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full text-xs"
      />

      {/* 3. Foundational Essentials: Layout, Structure, Font, Color (맨 위에 배치) */}
      <div className="flex flex-col gap-1 pb-2 border-b border-(--border-subtle)">
        <span className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wider px-2">
          {t('sidebar.foundationsGroup', 'Foundations (기초 규격)')}
        </span>
        
        {/* Layout & Spacing Guide */}
        <Link
          href="/components/layout-spacing"
          style={activeId === 'layout-spacing' ? { backgroundColor: brandColor, borderRadius: radius } : { borderRadius: radius }}
          className={`px-3 py-2 text-left text-sm font-medium transition flex items-center justify-between ${
            activeId === 'layout-spacing'
              ? 'text-(--bg-primary) bg-(--text-primary) font-semibold shadow-xs'
              : 'text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)'
          }`}
        >
          <span className="flex items-center gap-2">
            <Layout className={`w-4 h-4 ${activeId === 'layout-spacing' ? 'text-(--bg-primary)' : 'text-(--accent-primary)'}`} />
            <span>{t('sidebar.layoutAndSpacing', 'Layout & Spacing')}</span>
          </span>
          <span className={`text-xs font-mono ${activeId === 'layout-spacing' ? 'text-(--bg-primary)/80' : 'opacity-60'}`}>
            .spacing
          </span>
        </Link>

        {/* Color Tokens */}
        <Link
          href="/components/color-status"
          style={activeId === 'color-status' ? { backgroundColor: brandColor, borderRadius: radius } : { borderRadius: radius }}
          className={`px-3 py-2 text-left text-sm font-medium transition flex items-center justify-between ${
            activeId === 'color-status'
              ? 'text-(--bg-primary) bg-(--text-primary) font-semibold shadow-xs'
              : 'text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)'
          }`}
        >
          <span className="flex items-center gap-2">
            <Palette className={`w-4 h-4 ${activeId === 'color-status' ? 'text-(--bg-primary)' : 'text-(--atom-color-success)'}`} />
            <span>{t('sidebar.colorAndStatus', 'Color & Status')}</span>
          </span>
          <span className={`text-xs font-mono ${activeId === 'color-status' ? 'text-(--bg-primary)/80' : 'opacity-60'}`}>
            .color
          </span>
        </Link>

        {/* Typography / Font Tokens */}
        <Link
          href="/components/typography"
          style={activeId === 'typography' ? { backgroundColor: brandColor, borderRadius: radius } : { borderRadius: radius }}
          className={`px-3 py-2 text-left text-sm font-medium transition flex items-center justify-between ${
            activeId === 'typography'
              ? 'text-(--bg-primary) bg-(--text-primary) font-semibold shadow-xs'
              : 'text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)'
          }`}
        >
          <span className="flex items-center gap-2">
            <Type className={`w-4 h-4 ${activeId === 'typography' ? 'text-(--bg-primary)' : 'text-(--accent-primary)'}`} />
            <span>{t('sidebar.fontAndTypography', 'Font & Typography')}</span>
          </span>
          <span className={`text-xs font-mono ${activeId === 'typography' ? 'text-(--bg-primary)/80' : 'opacity-60'}`}>
            .typography
          </span>
        </Link>

        {/* Layout & Structure Components (Container, Layout) */}
        {layoutComps.map(renderCompItem)}
      </div>

      {/* 4. Form & Inputs Group */}
      {formComps.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wider px-2">
            {t('sidebar.formGroup', 'Form & Inputs')}
          </span>
          {formComps.map(renderCompItem)}
        </div>
      )}

      {/* 5. Feedback & Overlays */}
      {feedbackComps.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wider px-2">
            {t('sidebar.feedbackGroup', 'Feedback & Overlays')}
          </span>
          {feedbackComps.map(renderCompItem)}
        </div>
      )}

      {/* 6. Navigation & Menus */}
      {navComps.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wider px-2">
            {t('sidebar.navGroup', 'Navigation & Menus')}
          </span>
          {navComps.map(renderCompItem)}
        </div>
      )}

      {/* 7. Data Display */}
      {dataComps.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wider px-2">
            {t('sidebar.dataGroup', 'Data Display')}
          </span>
          {dataComps.map(renderCompItem)}
        </div>
      )}
    </aside>
  );
}
