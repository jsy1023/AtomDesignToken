'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { BLOCKS_COLLECTION, BLOCK_CATEGORIES, BlockItem } from '@/lib/data/blocks';
import { Search, Layers, ChevronRight } from 'lucide-react';

interface BlocksSidebarProps {
  activeId: string;
}

export function BlocksSidebar({ activeId }: BlocksSidebarProps) {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || 'var(--accent-primary)';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlocks = BLOCKS_COLLECTION.filter((block) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      block.title.toLowerCase().includes(q) ||
      block.englishTitle.toLowerCase().includes(q) ||
      block.id.toLowerCase().includes(q)
    );
  });

  return (
    <aside className="w-64 border-r border-(--border-subtle) bg-(--bg-primary) p-4 flex flex-col shrink-0 h-full overflow-y-auto">
      {/* 1. Header & Search */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <Link
            href="/blocks"
            className="flex items-center gap-1.5 text-xs font-semibold text-(--text-primary) hover:text-(--accent-primary) transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>디자인 블록 카탈로그</span>
          </Link>
          <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
            {BLOCKS_COLLECTION.length}
          </span>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="블록 검색..."
            className="w-full text-xs pl-7 pr-2.5 py-1.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) focus:outline-none focus:border-(--border-strong) transition-colors"
          />
        </div>
      </div>

      {/* 2. Block List by Category */}
      <div className="space-y-4 text-xs">
        {BLOCK_CATEGORIES.filter((cat) => cat.id !== 'all').map((cat) => {
          const categoryBlocks = filteredBlocks.filter((b) => b.category === cat.id);
          if (categoryBlocks.length === 0) return null;

          return (
            <div key={cat.id} className="space-y-1">
              <div className="text-[11px] font-mono font-medium text-(--text-secondary) uppercase tracking-wider px-2 py-0.5">
                {cat.name}
              </div>
              <div className="space-y-0.5">
                {categoryBlocks.map((block) => {
                  const isActive = activeId === block.id;
                  return (
                    <Link
                      key={block.id}
                      href={`/blocks/${block.id}`}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-(--radius-sm) text-xs transition-colors ${
                        isActive
                          ? 'bg-(--text-primary) text-(--bg-primary) font-medium'
                          : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
                      }`}
                    >
                      <span className="truncate">{block.title}</span>
                      <ChevronRight className={`w-3 h-3 shrink-0 ${isActive ? 'text-(--bg-primary)' : 'opacity-30'}`} />
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
