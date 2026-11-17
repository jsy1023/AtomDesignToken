'use client';
import { Button, Input } from '@/components/ui';

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

import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';

export const PATTERN_CATEGORY_FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'analytics', label: '분석 및 대시보드', match: ['Analytics & SaaS'] },
  { id: 'settings', label: '설정 및 폼', match: ['Settings & Configuration'] },
  { id: 'fintech', label: '결제 및 핀테크', match: ['Fintech & Pay', 'Commerce & Order'] },
  { id: 'auth', label: '인증 및 온보딩', match: ['Identity & Security', 'User Onboarding'] },
  { id: 'content', label: '에디터 및 콘텐츠', match: ['Content & Publishing', 'Documentation & DX'] },
  { id: 'media', label: '미디어 및 파일', match: ['Communication', 'File & Media'] },
  { id: 'mobility', label: '탐색 및 예약', match: ['Location & Mobility', 'Travel & Booking', 'Discovery'] },
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
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || 'var(--accent-primary)';
  const radius = theme?.borderRadius || '16px';
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
      <aside 
        style={{ borderRadius: radius }}
        className="w-full lg:w-[380px] shrink-0 bg-[var(--bg-secondary)] border border-[var(--border-strong)] p-4 shadow-sm flex flex-col gap-4"
      >
        {/* Search & Platform Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-(--text-muted) absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder="패턴 검색 (대시보드, 폼, 송금...)"
              className="w-full pl-9 pr-3 py-2 text-xs font-medium"
            />
          </div>

          {/* Platform Segmented Buttons */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-(--bg-secondary)  border border-(--border-subtle)  text-xs font-bold">
            <Button
              variant={platformFilter === 'all' ? 'primary' : 'ghost'}
              size="sm"
              type="button"
              onClick={() => setPlatformFilter('all')}
              className={`py-1.5 text-center ${platformFilter === 'all' ? 'font-bold' : 'text-(--text-secondary)'}`}
            >
              전체 ({patterns.length})
            </Button>
            <Button
              variant={platformFilter === 'web' ? 'primary' : 'ghost'}
              size="sm"
              type="button"
              onClick={() => setPlatformFilter('web')}
              className={`py-1.5 text-center flex items-center justify-center gap-1 ${platformFilter === 'web' ? 'font-bold' : 'text-(--text-secondary)'}`}
            >
              <Monitor className="w-3 h-3" />
              <span>WEB</span>
            </Button>
            <Button
              variant={platformFilter === 'mobile' ? 'primary' : 'ghost'}
              size="sm"
              type="button"
              onClick={() => setPlatformFilter('mobile')}
              className={`py-1.5 text-center flex items-center justify-center gap-1 ${platformFilter === 'mobile' ? 'font-bold' : 'text-(--text-secondary)'}`}
            >
              <Smartphone className="w-3 h-3" />
              <span>모바일</span>
            </Button>
          </div>

          {/* Category Filter Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {PATTERN_CATEGORY_FILTERS.map((cat) => (
              <Button
                key={cat.id}
                variant={categoryFilter === cat.id ? 'primary' : 'outline'}
                size="sm"
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-2.5 py-1 h-auto text-[11px] whitespace-nowrap transition ${
                  categoryFilter === cat.id
                    ? 'font-bold shadow-xs'
                    : 'text-(--text-secondary)'
                }`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Pattern List Counter */}
        <div className="flex items-center justify-between text-[11px] text-(--text-muted) border-t border-neutral-100 /80 pt-2">
          <span>검색 결과 {filteredPatterns.length}개</span>
          {onSwitchToGrid && (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={onSwitchToGrid}
              className="hover:text-(--accent-primary) transition h-auto p-0 text-[11px]"
            >
              그리드 모드로 보기
            </Button>
          )}
        </div>

        {/* Scrollable Pattern List */}
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filteredPatterns.map((p) => {
            const isSelected = selectedPattern?.id === p.id;
            const isWeb = p.platform === 'web';

            return (
              <Button
                key={p.id}
                variant={isSelected ? 'primary' : 'outline'}
                size="sm"
                type="button"
                onClick={() => onSelectPattern(p.id)}
                style={{
                  borderRadius: radius,
                }}
                className={`w-full text-left p-3 h-auto transition flex items-start gap-3 justify-start font-normal ${
                  isSelected
                    ? 'bg-(--accent-primary) text-white font-semibold shadow-xs'
                    : 'bg-white  hover:bg-(--bg-secondary) text-(--text-primary)'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                    isWeb
                      ? 'bg-(--accent-primary)/10 text-(--accent-primary)'
                      : 'bg-(--atom-color-success)/10 text-(--atom-color-success)'
                  }`}
                >
                  {isWeb ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-xs truncate">
                      {p.title}
                    </span>
                    <span className="text-[10px] font-mono opacity-70 shrink-0">
                      {p.platform.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] opacity-80 line-clamp-1 mt-0.5 leading-snug">
                    {p.summary}
                  </p>
                </div>
              </Button>
            );
          })}

          {filteredPatterns.length === 0 && (
            <div className="text-center py-10 text-xs text-(--text-muted)">
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
            <div 
              style={{ borderRadius: radius }}
              className="p-5 bg-[var(--bg-secondary)] border border-[var(--border-strong)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                      selectedPattern.platform === 'web'
                        ? 'bg-(--accent-primary)/10  text-(--accent-primary) dark:text-(--accent-primary) border-(--accent-primary)/20/80'
                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-(--atom-color-success) dark:text-(--atom-color-success) border-emerald-200/80'
                    }`}
                  >
                    {selectedPattern.platform === 'web' ? (
                      <Monitor className="w-3.5 h-3.5" />
                    ) : (
                      <Smartphone className="w-3.5 h-3.5" />
                    )}
                    <span>{selectedPattern.platform === 'web' ? 'WEB 브라우저 패턴' : '모바일 앱 패턴'}</span>
                  </span>
                  <span className="text-xs font-semibold text-(--text-secondary)">
                    {selectedPattern.categoryName}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-(--text-primary) ">
                  {selectedPattern.title}
                </h1>
                <p className="text-xs sm:text-sm text-(--text-secondary) dark:text-(--text-muted) mt-1.5 leading-relaxed max-w-2xl">
                  {selectedPattern.summary}
                </p>
              </div>

              {/* Action Buttons: Copy Markdown & Download */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold"
                >
                  {copiedMd ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-(--atom-color-success)" />
                      <span className="text-(--atom-color-success) dark:text-(--atom-color-success)">복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-(--text-secondary)" />
                      <span>명세 복사</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.md 다운로드</span>
                </Button>
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
              <div className="p-5 rounded-3xl bg-(--bg-primary) border border-(--border-subtle)/80  shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-(--atom-color-success) dark:text-(--atom-color-success) font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>필수 구현 베스트 UX 체크리스트</span>
                </div>
                <ul className="space-y-2 text-xs text-(--text-secondary) leading-relaxed">
                  {selectedPattern.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-(--atom-color-success) shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Anti-Patterns */}
              <div className="p-5 rounded-3xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-(--atom-color-destructive) dark:text-(--atom-color-destructive) font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>치명적 안티패턴 (절대 방지 사항)</span>
                </div>
                <ul className="space-y-2 text-xs text-(--text-secondary) leading-relaxed">
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
          <div className="p-12 text-center text-(--text-muted)">패턴을 선택해주세요.</div>
        )}
      </section>
    </div>
  );
}
