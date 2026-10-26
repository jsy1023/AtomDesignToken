'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { PATTERNS_COLLECTION, PatternPlatform } from '@/lib/data/patterns';
import { PatternDocsSidebar } from '@/components/patterns/PatternDocsSidebar';
import { PatternDocsLayout } from '@/components/patterns/PatternDocsLayout';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';

function PatternsDocsContent() {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';

  const searchParams = useSearchParams();
  const urlPatternId = searchParams.get('id');

  const [selectedPatternId, setSelectedPatternId] = useState<string>(
    urlPatternId || 'complex-form-settings'
  );
  const [platformFilter, setPlatformFilter] = useState<'all' | PatternPlatform>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // URL query sync
  const handleSelectPattern = (id: string) => {
    setSelectedPatternId(id);
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

  const selectedPattern =
    PATTERNS_COLLECTION.find((p) => p.id === selectedPatternId) || PATTERNS_COLLECTION[0];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between transition-colors">
      {/* Universal Header */}
      <Header brandColor={brandColor} />

      {/* Docs 2-Column Layout */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start">
        {/* Left Sticky Docs Sidebar */}
        <PatternDocsSidebar
          patterns={PATTERNS_COLLECTION}
          selectedPatternId={selectedPattern.id}
          onSelectPattern={handleSelectPattern}
          platformFilter={platformFilter}
          setPlatformFilter={setPlatformFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Right Docs Article */}
        <PatternDocsLayout
          pattern={selectedPattern}
          allPatterns={PATTERNS_COLLECTION}
          onSelectPattern={handleSelectPattern}
        />
      </main>

      {/* Clean Docs Footer */}
      <footer className="border-t border-[var(--border-subtle)] py-6 text-center text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-bold text-[var(--text-primary)]">AtomSystem</span> - 실무 검증 UX 인터랙션 패턴 가이드
          </div>
          <div className="flex gap-4">
            <span>총 {PATTERNS_COLLECTION.length}개 실무 패턴</span>
            <span>•</span>
            <span>디바이스 인터랙티브 뷰</span>
            <span>•</span>
            <span>체크리스트 & 안티패턴</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function PatternsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] text-neutral-400 text-xs">
          UX 패턴 가이드 문서를 불러오는 중...
        </div>
      }
    >
      <PatternsDocsContent />
    </Suspense>
  );
}
