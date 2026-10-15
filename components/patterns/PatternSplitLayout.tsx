'use client';

import React, { useState, useMemo } from 'react';
import { PatternItem, PatternPlatform } from '@/lib/data/patterns';
import { DeviceMockupView } from './DeviceMockupView';
import { PatternQuickSwitcher } from './PatternQuickSwitcher';
import {
  Search,
  Monitor,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Download,
  Layers,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';

export const PATTERN_CATEGORY_FILTERS = [
  { id: 'all', label: '전체 카테고리' },
  { id: 'analytics', label: '📊 분석/대시보드', match: ['Analytics & SaaS'] },
  { id: 'settings', label: '⚙️ 폼/환경설정', match: ['Settings & Configuration'] },
  { id: 'fintech', label: '💳 핀테크/결제', match: ['Fintech & Pay', 'Commerce & Order'] },
  { id: 'auth', label: '🔐 온보딩/인증', match: ['Identity & Security', 'User Onboarding'] },
  { id: 'content', label: '✍️ 콘텐츠/에디터', match: ['Content & Publishing', 'Documentation & DX'] },
  { id: 'media', label: '📁 파일/커뮤니케이션', match: ['Communication', 'File & Media'] },
  { id: 'mobility', label: '🗺️ 예약/탐색', match: ['Location & Mobility', 'Travel & Booking', 'Discovery'] },
] as const;

interface PatternSplitLayoutProps {
  patterns: PatternItem[];
  selectedPatternId: string;
  onSelectPattern: (id: string) => void;
  onSwitchToGrid?: () => void;
}

export function PatternSplitLayout({
  patterns,
  selectedPatternId,
  onSelectPattern,
  onSwitchToGrid,
}: PatternSplitLayoutProps) {
  const [platformFilter, setPlatformFilter] = useState<'all' | PatternPlatform>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedMd, setCopiedMd] = useState(false);

  // Filter logic
  const filteredPatterns = useMemo(() => {
    return patterns.filter((p) => {
      const matchPlatform = platformFilter === 'all' || p.platform === platformFilter;

      const currentCatDef = PATTERN_CATEGORY_FILTERS.find((c) => c.id === categoryFilter);
      const matchCategory =
        categoryFilter === 'all' ||
        (currentCatDef && 'match' in currentCatDef && (currentCatDef.match as readonly string[]).includes(p.categoryName));

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q);

      return matchPlatform && matchCategory && matchSearch;
    });
  }, [patterns, platformFilter, categoryFilter, searchQuery]);

  // Selected pattern or fallback to first
  const selectedPattern =
    filteredPatterns.find((p) => p.id === selectedPatternId) ||
    patterns.find((p) => p.id === selectedPatternId) ||
    filteredPatterns[0] ||
    patterns[0];

  const currentVariant = selectedPattern?.variants[0];

  const handleCopyMarkdown = () => {
    if (!selectedPattern) return;
    const text = currentVariant?.markdown || selectedPattern.summary;
    navigator.clipboard.writeText(text);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    if (!selectedPattern) return;
    const text = currentVariant?.markdown || selectedPattern.summary;
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `ux-pattern-${selectedPattern.id}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
      {/* 1. Left Master List Sidebar */}
      <aside className="w-full lg:w-[380px] shrink-0 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-4 shadow-sm flex flex-col gap-4">
        {/* Search & Platform Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="패턴 검색 (대시보드, 폼, 송금...)"
              className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-400"
            />
          </div>

          {/* Platform Segmented Buttons */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold">
            <button
              type="button"
              onClick={() => setPlatformFilter('all')}
              className={`py-1.5 rounded-lg transition text-center ${
                platformFilter === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              전체 ({patterns.length})
            </button>
            <button
              type="button"
              onClick={() => setPlatformFilter('web')}
              className={`py-1.5 rounded-lg transition text-center flex items-center justify-center gap-1 ${
                platformFilter === 'web'
                  ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>WEB</span>
            </button>
            <button
              type="button"
              onClick={() => setPlatformFilter('mobile')}
              className={`py-1.5 rounded-lg transition text-center flex items-center justify-center gap-1 ${
                platformFilter === 'mobile'
                  ? 'bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>모바일</span>
            </button>
          </div>

          {/* Category Filter Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {PATTERN_CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition font-medium ${
                  categoryFilter === cat.id
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern List Counter */}
        <div className="flex items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-100 dark:border-neutral-800/80 pt-2">
          <span>검색 결과 {filteredPatterns.length}개</span>
          {onSwitchToGrid && (
            <button
              type="button"
              onClick={onSwitchToGrid}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              그리드 모드로 보기
            </button>
          )}
        </div>

        {/* Scrollable Pattern List */}
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filteredPatterns.map((p) => {
            const isSelected = selectedPattern?.id === p.id;
            const isWeb = p.platform === 'web';

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPattern(p.id)}
                className={`w-full p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-1.5 ${
                  isSelected
                    ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 shadow-xs ring-1 ring-blue-500/30'
                    : 'border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50/50'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                      isWeb
                        ? 'bg-blue-100/70 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200'
                        : 'bg-emerald-100/70 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200'
                    }`}
                  >
                    {isWeb ? <Monitor className="w-2.5 h-2.5" /> : <Smartphone className="w-2.5 h-2.5" />}
                    <span>{isWeb ? 'WEB' : '모바일'}</span>
                  </span>

                  <span className="text-[10px] text-neutral-400 font-medium truncate">
                    {p.categoryName}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-bold text-xs truncate ${
                      isSelected
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-neutral-900 dark:text-neutral-100'
                    }`}
                  >
                    {p.title}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isSelected ? 'text-blue-600 translate-x-0.5' : 'text-neutral-300'
                    }`}
                  />
                </div>

                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 leading-relaxed">
                  {p.summary}
                </p>
              </button>
            );
          })}

          {filteredPatterns.length === 0 && (
            <div className="text-center py-10 text-xs text-neutral-400">
              조건에 맞는 UX 패턴이 없습니다.
            </div>
          )}
        </div>
      </aside>

      {/* 2. Right Detail Content Area */}
      <section className="flex-1 w-full flex flex-col gap-6">
        {selectedPattern ? (
          <>
            {/* Quick Switcher Bar */}
            <PatternQuickSwitcher
              currentPatternId={selectedPattern.id}
              onSelectPattern={onSelectPattern}
              onBackToGrid={onSwitchToGrid}
              filteredList={filteredPatterns}
            />

            {/* Pattern Header Information */}
            <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                      selectedPattern.platform === 'web'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200/80'
                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200/80'
                    }`}
                  >
                    {selectedPattern.platform === 'web' ? (
                      <Monitor className="w-3.5 h-3.5" />
                    ) : (
                      <Smartphone className="w-3.5 h-3.5" />
                    )}
                    <span>{selectedPattern.platform === 'web' ? 'WEB 브라우저 패턴' : '모바일 앱 패턴'}</span>
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">
                    {selectedPattern.categoryName}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                  {selectedPattern.title}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed max-w-2xl">
                  {selectedPattern.summary}
                </p>
              </div>

              {/* Action Buttons: Copy Markdown & Download */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 transition active:scale-95 shadow-xs"
                >
                  {copiedMd ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      <span>명세 복사</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition active:scale-95 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.md 다운로드</span>
                </button>
              </div>
            </div>

            {/* Interactive Device Mockup Screen */}
            <div className="w-full">
              <DeviceMockupView
                patternId={selectedPattern.id}
                defaultPlatform={selectedPattern.platform}
              />
            </div>

            {/* Checklist & Anti-Patterns 2-Column Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Checklist */}
              <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>필수 구현 베스트 UX 체크리스트</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {selectedPattern.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Anti-Patterns */}
              <div className="p-5 rounded-3xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>치명적 안티패턴 (절대 방지 사항)</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {selectedPattern.antiPatterns.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="p-12 text-center text-neutral-400">패턴을 선택해주세요.</div>
        )}
      </section>
    </div>
  );
}
