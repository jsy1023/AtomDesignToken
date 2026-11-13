'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { ALL_ICON_NAMES, ICON_CATEGORIES, getLucideIcon } from '@/lib/data/icons';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import {
  Search,
  Check,
  Copy,
  Sparkles,
  Sliders,
  Terminal,
  ExternalLink,
  Layers,
  Code2,
} from 'lucide-react';

const PAGE_SIZE = 120;

export default function IconsCatalogPage() {
  const { theme, updateSelectedIcon, setIsOpen, setActiveTab } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';
  const currentIcon = theme.selectedIcon || 'Sparkles';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [page, setPage] = useState(1);

  // Active icon component
  const CurrentIconComp = getLucideIcon(currentIcon) || Sparkles;

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

  // Reset page when filter/search changes
  const paginatedIcons = useMemo(() => {
    return filteredIcons.slice(0, page * PAGE_SIZE);
  }, [filteredIcons, page]);

  const hasMore = paginatedIcons.length < filteredIcons.length;

  const handleCopyName = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  const handleSelectIcon = (name: string) => {
    updateSelectedIcon(name);
  };

  const handleOpenThemeEditor = () => {
    setActiveTab('icons');
    setIsOpen(true);
  };

  const codeSnippet = `import { ${currentIcon} } from 'lucide-react';

export function ExampleWidget() {
  return (
    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-(--radius) bg-(--bg-primary) text-(--text-primary) border border-(--border-subtle)">
      <${currentIcon} className="w-4 h-4 text-(--accent-primary)" />
      <span>${currentIcon} 아이콘</span>
    </button>
  );
}`;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between transition-colors">
      <Header brandColor={brandColor} />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 space-y-6">
        {/* Header Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-(--border-subtle)">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
              <Sparkles className="w-3.5 h-3.5 text-(--accent-primary)" />
              <span>3,875+ Free Open-Source Icons (Lucide System)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
              시스템 아이콘(Icons) 카탈로그 & 테마 연동
            </h1>
            <p className="text-xs sm:text-sm text-(--text-secondary) max-w-2xl leading-relaxed">
              모든 오픈소스 무료 아이콘 3,800여 개를 지원합니다. 원하는 아이콘을 선택하면 테마 에디터 및 컴포넌트 시스템에 즉시 바인딩됩니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenThemeEditor}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-(--radius-sm) bg-(--text-primary) text-(--bg-primary) hover:opacity-90 transition-opacity text-xs font-semibold cursor-pointer shrink-0"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>테마 에디터에서 선택</span>
            </button>
          </div>
        </div>

        {/* Active Selection Banner & Code Preview */}
        <div className="p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-secondary)/30 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-(--radius) bg-(--accent-primary)/10 border border-(--accent-primary)/30 text-(--accent-primary) flex items-center justify-center shrink-0">
              <CurrentIconComp className="w-7 h-7" />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="text-[11px] font-mono text-(--text-muted) uppercase">
                현재 선택된 시스템 아이콘
              </div>
              <div className="text-lg font-bold font-mono text-(--text-primary) truncate">
                {currentIcon}
              </div>
              <div className="text-xs text-(--text-secondary)">
                클릭하여 즉시 변경 가능하며 전역 테마에 자동 저장됩니다.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-(--radius-sm) border border-(--border-subtle) overflow-hidden bg-(--bg-primary)">
            <div className="px-3 py-1.5 bg-(--bg-secondary)/60 border-b border-(--border-subtle) flex items-center justify-between text-xs font-mono text-(--text-muted)">
              <div className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-(--text-secondary)" />
                <span>React Import 스니펫</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(codeSnippet);
                  setCopiedSnippet(true);
                  setTimeout(() => setCopiedSnippet(false), 2000);
                }}
                className="inline-flex items-center gap-1 text-[11px] hover:text-(--text-primary) cursor-pointer"
              >
                {copiedSnippet ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSnippet ? '복사됨' : '복사'}</span>
              </button>
            </div>
            <CodeHighlight code={codeSnippet} language="tsx" className="p-3 text-[11px] max-h-28 overflow-y-auto" />
          </div>
        </div>

        {/* Toolbar: Search & Categories */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="3,800+ 아이콘 영문명 검색 (e.g. check, user, star, arrow, heart)..."
                className="w-full text-xs pl-8 pr-3 py-2 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) focus:outline-none focus:border-(--border-strong) transition-colors"
              />
            </div>

            <div className="text-xs font-mono text-(--text-secondary) shrink-0">
              총 <strong className="text-(--text-primary)">{filteredIcons.length.toLocaleString()}</strong>개 검색됨
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {ICON_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCat(cat.id);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-(--radius-sm) whitespace-nowrap transition-colors cursor-pointer text-xs ${
                  selectedCat === cat.id
                    ? 'bg-(--text-primary) text-(--bg-primary) font-semibold'
                    : 'bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle)'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Icons Grid */}
        {paginatedIcons.length === 0 ? (
          <div className="py-20 text-center rounded-(--radius) border border-dashed border-(--border-subtle)">
            <h3 className="text-sm font-semibold text-(--text-primary)">검색된 아이콘이 없습니다.</h3>
            <p className="text-xs text-(--text-secondary) mt-1">다른 영문 키워드나 카테고리를 선택해 보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {paginatedIcons.map((name) => {
              const IconComp = getLucideIcon(name);
              if (!IconComp) return null;
              const isSelected = currentIcon === name;
              const isCopied = copiedName === name;

              return (
                <div
                  key={name}
                  onClick={() => handleSelectIcon(name)}
                  className={`group relative p-3 rounded-(--radius-sm) border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-(--accent-primary)/10 border-(--accent-primary) text-(--accent-primary)'
                      : 'bg-(--bg-primary) border-(--border-subtle) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-strong) hover:bg-(--bg-secondary)/50'
                  }`}
                  title={`${name} 클릭하여 선택`}
                >
                  <IconComp className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                  
                  <span className="text-[11px] font-mono truncate w-full text-center">
                    {name}
                  </span>

                  {/* Copy Action Button */}
                  <button
                    onClick={(e) => handleCopyName(name, e)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 rounded bg-(--bg-secondary) hover:bg-(--border-subtle) text-(--text-secondary) hover:text-(--text-primary) transition-opacity"
                    title="이름 복사"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>

                  {isSelected && (
                    <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-(--accent-primary)" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="pt-4 text-center">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 rounded-(--radius-sm) bg-(--bg-secondary) hover:bg-(--border-subtle) text-(--text-primary) border border-(--border-subtle) transition-colors text-xs font-semibold cursor-pointer"
            >
              더 많은 아이콘 보기 ({paginatedIcons.length} / {filteredIcons.length})
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
