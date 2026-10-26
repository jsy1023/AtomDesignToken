'use client';

import React, { useMemo } from 'react';
import { PatternItem, PatternPlatform, PATTERNS_COLLECTION } from '@/lib/data/patterns';
import { PATTERN_CATEGORY_FILTERS } from './PatternSplitLayout';
import { Search, Monitor, Smartphone, Layers, ChevronRight } from 'lucide-react';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';

interface PatternDocsSidebarProps {
  patterns: PatternItem[];
  selectedPatternId: string;
  onSelectPattern: (id: string) => void;
  platformFilter: 'all' | PatternPlatform;
  setPlatformFilter: (platform: 'all' | PatternPlatform) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function PatternDocsSidebar({
  patterns,
  selectedPatternId,
  onSelectPattern,
  platformFilter,
  setPlatformFilter,
  searchQuery,
  setSearchQuery,
}: PatternDocsSidebarProps) {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';

  // 카테고리별 그룹핑
  const categoryGroups = useMemo(() => {
    // 1. 검색어 및 플랫폼 필터링
    const q = searchQuery.toLowerCase().trim();
    const filtered = patterns.filter((p) => {
      const matchPlatform = platformFilter === 'all' || p.platform === platformFilter;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q);
      return matchPlatform && matchSearch;
    });

    // 2. 그룹별 묶기
    const groups: { categoryId: string; label: string; items: PatternItem[] }[] = [];

    // 'all'을 제외한 카테고리 필터 기준
    PATTERN_CATEGORY_FILTERS.filter((c) => c.id !== 'all').forEach((catDef) => {
      const items = filtered.filter((p) =>
        'match' in catDef && (catDef.match as readonly string[]).includes(p.categoryName)
      );
      if (items.length > 0) {
        groups.push({
          categoryId: catDef.id,
          label: catDef.label,
          items,
        });
      }
    });

    // 매칭되지 않은 기타 패턴이 있다면 추가
    const matchedIds = new Set(groups.flatMap((g) => g.items.map((i) => i.id)));
    const others = filtered.filter((p) => !matchedIds.has(p.id));
    if (others.length > 0) {
      groups.push({
        categoryId: 'others',
        label: '기타 패턴',
        items: others,
      });
    }

    return groups;
  }, [patterns, platformFilter, searchQuery]);

  return (
    <aside 
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}
      className="w-full lg:w-72 shrink-0 border-r lg:min-h-[calc(100vh-64px)] p-4 flex flex-col gap-4 text-xs select-none"
    >
      {/* 1. Search Bar */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="패턴 검색 (대시보드, 폼...)"
          style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-neutral-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-[10px]"
          >
            ✕
          </button>
        )}
      </div>

      {/* 2. Platform Filter Pills */}
      <div 
        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}
        className="grid grid-cols-3 gap-1 p-1 rounded-lg border text-[11px] font-semibold text-center"
      >
        <button
          type="button"
          onClick={() => setPlatformFilter('all')}
          style={platformFilter === 'all' ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-strong)' } : {}}
          className={`py-1 rounded transition ${platformFilter === 'all' ? 'border shadow-xs font-bold' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'}`}
        >
          전체 ({patterns.length})
        </button>
        <button
          type="button"
          onClick={() => setPlatformFilter('web')}
          style={platformFilter === 'web' ? { backgroundColor: 'var(--bg-secondary)', color: brandColor, borderColor: 'var(--border-strong)' } : {}}
          className={`py-1 rounded transition flex items-center justify-center gap-1 ${platformFilter === 'web' ? 'border shadow-xs font-bold' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'}`}
        >
          <Monitor className="w-3 h-3" />
          <span>WEB</span>
        </button>
        <button
          type="button"
          onClick={() => setPlatformFilter('mobile')}
          style={platformFilter === 'mobile' ? { backgroundColor: 'var(--bg-secondary)', color: brandColor, borderColor: 'var(--border-strong)' } : {}}
          className={`py-1 rounded transition flex items-center justify-center gap-1 ${platformFilter === 'mobile' ? 'border shadow-xs font-bold' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'}`}
        >
          <Smartphone className="w-3 h-3" />
          <span>모바일</span>
        </button>
      </div>

      {/* 3. Docs Tree Navigation List */}
      <div className="flex-1 overflow-y-auto space-y-5 pr-1 scrollbar-thin">
        {categoryGroups.map((group) => (
          <div key={group.categoryId} className="space-y-1">
            {/* Category Header */}
            <div className="px-2 py-1 text-[11px] font-bold tracking-tight text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
              <span>{group.label}</span>
              <span className="text-[10px] font-normal text-neutral-400">
                {group.items.length}
              </span>
            </div>

            {/* Pattern Links */}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isSelected = selectedPatternId === item.id;
                const isWeb = item.platform === 'web';

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectPattern(item.id)}
                    style={
                      isSelected
                        ? {
                            backgroundColor: `${brandColor}18`,
                            color: brandColor,
                            borderLeftColor: brandColor,
                          }
                        : {}
                    }
                    className={`w-full text-left px-2.5 py-1.5 rounded-md transition-all flex items-center justify-between gap-2 border-l-2 ${
                      isSelected
                        ? 'font-bold border-l-2'
                        : 'border-l-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    <span className="truncate text-xs">{item.title}</span>
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-mono shrink-0 ${
                        isWeb
                          ? 'text-blue-500 bg-blue-50 dark:bg-blue-950/50'
                          : 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50'
                      }`}
                    >
                      {isWeb ? 'WEB' : 'APP'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {categoryGroups.length === 0 && (
          <div className="text-center py-8 text-neutral-400 text-xs">
            일치하는 UX 패턴이 없습니다.
          </div>
        )}
      </div>
    </aside>
  );
}
