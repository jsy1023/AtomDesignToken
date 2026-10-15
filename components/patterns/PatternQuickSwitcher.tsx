'use client';

import React from 'react';
import { PATTERNS_COLLECTION, PatternItem } from '@/lib/data/patterns';
import { ChevronLeft, ChevronRight, Layers, ArrowLeft } from 'lucide-react';

interface PatternQuickSwitcherProps {
  currentPatternId: string;
  onSelectPattern: (id: string) => void;
  onBackToGrid?: () => void;
  filteredList?: PatternItem[];
}

export function PatternQuickSwitcher({
  currentPatternId,
  onSelectPattern,
  onBackToGrid,
  filteredList = PATTERNS_COLLECTION,
}: PatternQuickSwitcherProps) {
  const currentIndex = filteredList.findIndex((p) => p.id === currentPatternId);
  const currentItem = filteredList[currentIndex] || filteredList[0];

  const prevItem = currentIndex > 0 ? filteredList[currentIndex - 1] : null;
  const nextItem = currentIndex < filteredList.length - 1 ? filteredList[currentIndex + 1] : null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
      {/* Left: Back button or Breadcrumb */}
      <div className="flex items-center gap-2">
        {onBackToGrid && (
          <button
            type="button"
            onClick={onBackToGrid}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>목록으로</span>
          </button>
        )}

        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <Layers className="w-3.5 h-3.5 text-blue-500" />
          <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">
            {currentIndex + 1}
          </span>
          <span>/</span>
          <span>{filteredList.length}</span>
        </div>
      </div>

      {/* Center: Quick Pattern Dropdown Select */}
      <div className="flex-1 max-w-xs min-w-[200px]">
        <select
          value={currentPatternId}
          onChange={(e) => onSelectPattern(e.target.value)}
          className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 truncate cursor-pointer"
        >
          {filteredList.map((p, idx) => (
            <option key={p.id} value={p.id}>
              {idx + 1}. {p.title} ({p.platform.toUpperCase()})
            </option>
          ))}
        </select>
      </div>

      {/* Right: Prev & Next Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={!prevItem}
          onClick={() => prevItem && onSelectPattern(prevItem.id)}
          title={prevItem ? `이전: ${prevItem.title}` : '이전 패턴 없음'}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-95"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">이전 패턴</span>
        </button>

        <button
          type="button"
          disabled={!nextItem}
          onClick={() => nextItem && onSelectPattern(nextItem.id)}
          title={nextItem ? `다음: ${nextItem.title}` : '다음 패턴 없음'}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-95 shadow-xs"
        >
          <span className="hidden sm:inline">다음 패턴</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
