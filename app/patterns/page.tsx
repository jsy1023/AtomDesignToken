'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { PATTERNS_COLLECTION, PatternItem, PatternPlatform } from '@/lib/data/patterns';
import { PatternCard } from '@/components/patterns/PatternCard';
import { PatternDetailView } from '@/components/patterns/PatternDetailView';
import {
  Sparkles,
  Search,
  Monitor,
  Smartphone,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  Terminal,
  Code2
} from 'lucide-react';

export default function PatternsPage() {
  // Navigation State: null = 1depth (Cards Grid), string = 2depth (Detailed Pattern Screen)
  const [selectedPatternId, setSelectedPatternId] = useState<string | null>(null);

  // Platform Filter: 'all' | 'web' | 'mobile'
  const [platformFilter, setPlatformFilter] = useState<'all' | PatternPlatform>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Selected Pattern Object for 2depth
  const selectedPattern = PATTERNS_COLLECTION.find((p) => p.id === selectedPatternId);

  // Filtered Patterns List
  const filteredPatterns = PATTERNS_COLLECTION.filter((p) => {
    const matchesPlatform = platformFilter === 'all' || p.platform === platformFilter;
    const matchesSearch =
      searchFilter === '' ||
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const webCount = PATTERNS_COLLECTION.filter((p) => p.platform === 'web').length;
  const mobileCount = PATTERNS_COLLECTION.filter((p) => p.platform === 'mobile').length;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#090a0f] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between transition-colors">
      {/* Global Header */}
      <Header />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-1 flex flex-col gap-8">
        {/* 2DEPTH VIEW: Detailed Interactive Screen */}
        {selectedPattern ? (
          <PatternDetailView pattern={selectedPattern} onBack={() => setSelectedPatternId(null)} />
        ) : (
          /* 1DEPTH VIEW: Cards Grid with Wireframe & Platform Filter */
          <div className="flex flex-col gap-8">
            {/* Hero Section */}
            <section className="flex flex-col gap-4 border-b border-neutral-200/80 dark:border-neutral-800 pb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-600 dark:text-blue-400 w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>실무 베스트 UX 패턴 컬렉션 · 와이어프레임 & 2Depth 실동작 프리뷰</span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    웹 / 모바일 실무 UX 패턴
                  </h1>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl leading-relaxed">
                    실제 프로덕션 환경의 베스트 프랙티스를 와이어프레임으로 확인하고, 카드를 클릭하여 <strong>WEB 브라우저</strong> 또는 <strong>스마트폰 화면</strong> 그대로 즉시 체험해보세요.
                  </p>
                </div>

                <Link
                  href="/studio"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition whitespace-nowrap self-start lg:self-end"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>스튜디오에서 3단계 빌드하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="flex flex-wrap items-center justify-between gap-4">
              {/* Platform Filter Tabs (All / WEB / Mobile) */}
              <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-neutral-200/70 dark:bg-neutral-800 border border-neutral-300/60 dark:border-neutral-700">
                <button
                  onClick={() => setPlatformFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    platformFilter === 'all'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <span>전체 ({PATTERNS_COLLECTION.length})</span>
                </button>

                <button
                  onClick={() => setPlatformFilter('web')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    platformFilter === 'web'
                      ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>🖥️ WEB ({webCount})</span>
                </button>

                <button
                  onClick={() => setPlatformFilter('mobile')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    platformFilter === 'mobile'
                      ? 'bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>📱 모바일 ({mobileCount})</span>
                </button>
              </div>

              {/* Search Filter Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="패턴 검색 (예: 대시보드, 송금, 항공권...)"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </section>

            {/* Patterns Grid (Wireframe + Description + 2depth Click) */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatterns.map((pattern) => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  onSelect={(id) => setSelectedPatternId(id)}
                />
              ))}
            </section>

            {filteredPatterns.length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <Search className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm text-neutral-700 dark:text-neutral-300">검색된 패턴이 없습니다</h3>
                <p className="text-xs text-neutral-400 mt-1">다른 검색어를 입력하시거나 필터를 변경해보세요.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 mt-12 py-6 px-6 text-center text-xs text-neutral-500">
        <p>© 2026 AtomDesignToken · W3C Design Tokens Community Group Standard</p>
      </footer>
    </div>
  );
}
