'use client';

import React from 'react';
import { Button, NativeSelect } from '@/components/ui';
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
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) shadow-xs">
      {/* Left: Back button or Breadcrumb */}
      <div className="flex items-center gap-2">
        {onBackToGrid && (
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={onBackToGrid}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>목록으로</span>
          </Button>
        )}

        <div className="flex items-center gap-1.5 text-xs text-(--text-muted)">
          <Layers className="w-3.5 h-3.5 text-(--accent-primary)" />
          <span className="font-mono font-bold text-(--text-primary)">
            {currentIndex + 1}
          </span>
          <span>/</span>
          <span>{filteredList.length}</span>
        </div>
      </div>

      {/* Center: Quick Pattern Dropdown Select */}
      <div className="flex-1 max-w-xs min-w-[200px]">
        <NativeSelect
          value={currentPatternId}
          onChange={(e) => onSelectPattern(e.target.value)}
          className="w-full text-xs font-semibold"
        >
          {filteredList.map((p, idx) => (
            <option key={p.id} value={p.id}>
              {idx + 1}. {p.title} ({p.platform.toUpperCase()})
            </option>
          ))}
        </NativeSelect>
      </div>

      {/* Right: Prev & Next Buttons */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          type="button"
          disabled={!prevItem}
          onClick={() => prevItem && onSelectPattern(prevItem.id)}
          className="flex items-center gap-1 text-xs"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">이전 패턴</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          type="button"
          disabled={!nextItem}
          onClick={() => nextItem && onSelectPattern(nextItem.id)}
          className="flex items-center gap-1 text-xs"
        >
          <span className="hidden sm:inline">다음 패턴</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
