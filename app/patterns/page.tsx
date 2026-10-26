'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { PATTERNS_COLLECTION, PatternItem, PatternPlatform } from '@/lib/data/patterns';
import { PatternCard } from '@/components/patterns/PatternCard';
import { PatternDetailView } from '@/components/patterns/PatternDetailView';
import { PatternSplitLayout, PATTERN_CATEGORY_FILTERS } from '@/components/patterns/PatternSplitLayout';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import {
  Sparkles,
  Search,
  Monitor,
  Smartphone,
  ArrowRight,
  Columns2,
  LayoutGrid,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

type ViewMode = 'split' | 'grid' | 'detail';

function PatternsContent() {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';
  const radius = theme?.borderRadius || '14px';

  const searchParams = useSearchParams();
  const urlPatternId = searchParams.get('id');

  // View Mode: 'split' (Master-Detail, Default) | 'grid' (Overview Cards) | 'detail' (Full Screen)
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [selectedPatternId, setSelectedPatternId] = useState<string>(
    urlPatternId || 'complex-form-settings'
  );

  // Platform & Category & Search Filters for Grid Mode
  const [platformFilter, setPlatformFilter] = useState<'all' | PatternPlatform>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Sync URL query param when pattern changes
  const handleSelectPattern = (id: string, newMode?: ViewMode) => {
    setSelectedPatternId(id);
    if (newMode) setViewMode(newMode);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('id', id);
      window.history.pushState({}, '', url.toString());
    }
  };

  useEffect(() => {
    if (urlPatternId && PATTERNS_COLLECTION.some((p) => p.id === urlPatternId)) {
      setSelectedPatternId(urlPatternId);
    }
  }, [urlPatternId]);

  // Filtered patterns for Grid Mode
  const filteredPatterns = useMemo(() => {
    return PATTERNS_COLLECTION.filter((p) => {
      const matchesPlatform = platformFilter === 'all' || p.platform === platformFilter;

      const currentCatDef = PATTERN_CATEGORY_FILTERS.find((c) => c.id === categoryFilter);
      const matchesCategory =
        categoryFilter === 'all' ||
        (currentCatDef && 'match' in currentCatDef && (currentCatDef.match as readonly string[]).includes(p.categoryName));

      const q = searchFilter.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q);

      return matchesPlatform && matchesCategory && matchesSearch;
    });
  }, [platformFilter, categoryFilter, searchFilter]);

  const selectedPattern = PATTERNS_COLLECTION.find((p) => p.id === selectedPatternId) || PATTERNS_COLLECTION[0];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between transition-colors">
      {/* Global Header */}
      <Header brandColor={brandColor} />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 flex flex-col gap-6">
        {/* Top Header Hero Bar */}
        <section className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-6">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div 
              style={{ backgroundColor: `${brandColor}15`, color: brandColor, borderColor: `${brandColor}30` }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>실무 베스트 UX 패턴 탐색기 · 총 {PATTERNS_COLLECTION.length}개 프로덕션 패턴</span>
            </div>

            {/* View Mode Segmented Controls */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-xs font-bold shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('split')}
                style={viewMode === 'split' ? { color: brandColor } : undefined}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'split'
                    ? 'bg-[var(--bg-primary)] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span>분할 뷰 (Split)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                style={viewMode === 'grid' ? { color: brandColor } : undefined}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-[var(--bg-primary)] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>카드 그리드 (Grid)</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
                웹 & 모바일 실무 UX 패턴 컬렉션
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-2xl leading-relaxed">
                좌측 목록에서 패턴을 클릭하여 화면 전환 없이 즉각 실시간 디바이스 목업을 체험하고, 필수 구현 체크리스트와 안티패턴 명세를 확인하세요.
              </p>
            </div>

            <Link
              href="/studio"
              style={{ backgroundColor: brandColor, borderRadius: radius }}
              className="inline-flex items-center gap-2 px-4 py-2 text-white text-xs font-bold shadow-md active:scale-95 transition whitespace-nowrap self-start lg:self-end"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>스튜디오 위저드 열기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 1. VIEW MODE: SPLIT MASTER-DETAIL (Recommended UX) */}
        {viewMode === 'split' && (
          <PatternSplitLayout
            patterns={PATTERNS_COLLECTION}
            selectedPatternId={selectedPatternId}
            onSelectPattern={(id) => handleSelectPattern(id)}
            onSwitchToGrid={() => setViewMode('grid')}
          />
        )}

        {/* 2. VIEW MODE: FULL DETAIL VIEW */}
        {viewMode === 'detail' && selectedPattern && (
          <PatternDetailView
            pattern={selectedPattern}
            onBack={() => setViewMode('grid')}
            onSelectPattern={(id) => handleSelectPattern(id, 'detail')}
            allPatterns={PATTERNS_COLLECTION}
          />
        )}

        {/* 3. VIEW MODE: CARDS GRID OVERVIEW */}
        {viewMode === 'grid' && (
          <div className="flex flex-col gap-6">
            {/* Filter Bar */}
            <section className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Platform Filters */}
                <div 
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}
                  className="inline-flex items-center gap-1 p-1 rounded-xl border text-xs font-bold"
                >
                  <button
                    type="button"
                    onClick={() => setPlatformFilter('all')}
                    style={platformFilter === 'all' ? { backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-strong)' } : {}}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      platformFilter === 'all'
                        ? 'border shadow-xs font-bold'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    전체 ({PATTERNS_COLLECTION.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlatformFilter('web')}
                    style={platformFilter === 'web' ? { backgroundColor: 'var(--bg-primary)', color: 'var(--accent-primary)', borderColor: 'var(--border-strong)' } : {}}
                    className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                      platformFilter === 'web'
                        ? 'border shadow-xs font-bold'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>WEB</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlatformFilter('mobile')}
                    style={platformFilter === 'mobile' ? { backgroundColor: 'var(--bg-primary)', color: 'var(--accent-primary)', borderColor: 'var(--border-strong)' } : {}}
                    className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                      platformFilter === 'mobile'
                        ? 'border shadow-xs font-bold'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>모바일</span>
                  </button>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="패턴 검색 (대시보드, 폼, 송금...)"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                    className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                  />
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {PATTERN_CATEGORY_FILTERS.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id)}
                    style={categoryFilter === cat.id ? { backgroundColor: 'var(--accent-primary)', color: '#ffffff' } : {}}
                    className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition text-xs ${
                      categoryFilter === cat.id
                        ? 'font-bold shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/80'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Grid Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatterns.map((pattern) => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  onSelect={(id) => handleSelectPattern(id, 'split')}
                />
              ))}
            </section>

            {filteredPatterns.length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <Search className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm text-neutral-700 dark:text-neutral-300">검색된 패턴이 없습니다</h3>
                <p className="text-xs text-neutral-400 mt-1">다른 검색어를 입력하시거나 카테고리 필터를 변경해보세요.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] mt-12 py-6 px-6 text-center text-xs text-[var(--text-secondary)]">
        <p>© 2026 AtomDesignToken · W3C Design Tokens Community Group Standard</p>
      </footer>
    </div>
  );
}

export default function PatternsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-secondary)] p-8">Loading patterns...</div>}>
      <PatternsContent />
    </Suspense>
  );
}
