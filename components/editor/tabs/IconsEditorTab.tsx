'use client';

import React, { useState, useMemo } from 'react';
import { useThemeEditor } from '../ThemeEditorProvider';
import { ALL_ICON_NAMES, ICON_CATEGORIES, getLucideIcon } from '@/lib/data/icons';
import { Search, Check, Sparkles } from 'lucide-react';

export function IconsEditorTab() {
  const { theme, updateSelectedIcon } = useThemeEditor();
  const currentIcon = theme.selectedIcon || 'Sparkles';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredIcons = useMemo(() => {
    let list = ALL_ICON_NAMES;

    if (selectedCat !== 'all') {
      const cat = ICON_CATEGORIES.find((c) => c.id === selectedCat);
      if (cat && cat.keywords.length > 0) {
        list = list.filter((name) => {
          const lower = name.toLowerCase();
          return cat.keywords.some((kw) => lower.includes(kw));
        });
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((name) => name.toLowerCase().includes(q));
    }

    return list;
  }, [searchQuery, selectedCat]);

  // Display only top 120 for instant rendering performance in the drawer
  const visibleIcons = filteredIcons.slice(0, 120);

  const CurrentIconComp = getLucideIcon(currentIcon) || Sparkles;

  return (
    <div className="space-y-4">
      {/* Current Selected Banner */}
      <div className="p-3 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle) flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-(--radius-sm) bg-(--accent-primary)/10 text-(--accent-primary) flex items-center justify-center">
            <CurrentIconComp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-(--text-secondary)">시스템 활성 아이콘</div>
            <div className="text-xs font-mono font-bold text-(--text-primary)">
              {currentIcon}
            </div>
          </div>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--bg-primary) text-(--text-muted) border border-(--border-subtle)">
          {filteredIcons.length}개 검색됨
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="아이콘 영문명 검색 (e.g. check, heart, arrow)..."
          className="w-full text-xs pl-7 pr-3 py-1.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) focus:outline-none focus:border-(--border-strong) transition-colors"
        />
      </div>

      {/* Categories chips */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
        {ICON_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-2 py-1 rounded-(--radius-sm) whitespace-nowrap transition-colors cursor-pointer ${
              selectedCat === cat.id
                ? 'bg-(--text-primary) text-(--bg-primary) font-semibold'
                : 'bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle)'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid of icons */}
      <div className="grid grid-cols-4 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
        {visibleIcons.map((iconName) => {
          const IconComp = getLucideIcon(iconName);
          if (!IconComp) return null;
          const isSelected = currentIcon === iconName;

          return (
            <button
              key={iconName}
              onClick={() => updateSelectedIcon(iconName)}
              title={iconName}
              className={`p-2 rounded-(--radius-sm) flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-(--accent-primary)/10 border-(--accent-primary) text-(--accent-primary) font-bold'
                  : 'bg-(--bg-primary) border-(--border-subtle) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-strong)'
              }`}
            >
              <IconComp className="w-4 h-4 shrink-0" />
              <span className="text-[10px] font-mono truncate w-full text-center">
                {iconName}
              </span>
            </button>
          );
        })}
      </div>

      {filteredIcons.length > visibleIcons.length && (
        <div className="text-[11px] text-center text-(--text-secondary)">
          상위 {visibleIcons.length}개 표시 중 (전체 3,800+개는 검색 또는 /icons 페이지에서 확인 가능)
        </div>
      )}
    </div>
  );
}
