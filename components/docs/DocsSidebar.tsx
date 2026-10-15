'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { GALLERY_COMPONENTS } from '@/lib/data/components';
import { Search, BookOpen, Layers } from 'lucide-react';

interface DocsSidebarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeId: string;
}

export function DocsSidebar({
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
  activeId
}: DocsSidebarProps) {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';
  const radius = theme?.borderRadius || '12px';

  const [internalQuery, setInternalQuery] = useState('');
  const query = externalSearchQuery !== undefined ? externalSearchQuery : internalQuery;
  const setQuery = externalOnSearchChange || setInternalQuery;

  const filtered = GALLERY_COMPONENTS.filter((comp) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      comp.name.toLowerCase().includes(q) ||
      comp.id.toLowerCase().includes(q) ||
      comp.category.toLowerCase().includes(q)
    );
  });

  const formComps = filtered.filter((c) => c.category === 'form');
  const feedbackComps = filtered.filter((c) => c.category === 'feedback');
  const navComps = filtered.filter((c) => c.category === 'navigation');
  const dataComps = filtered.filter((c) => c.category === 'data');

  const renderCompItem = (comp: (typeof GALLERY_COMPONENTS)[number]) => {
    const isActive = activeId === comp.id;
    return (
      <Link
        key={comp.id}
        href={`/components/${comp.id}`}
        style={isActive ? { backgroundColor: brandColor, borderRadius: radius } : { borderRadius: radius }}
        className={`px-3 py-1.5 text-left text-xs font-medium transition flex items-center justify-between ${
          isActive
            ? 'text-white font-bold shadow-xs'
            : 'text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] hover:text-[var(--text-primary)]'
        }`}
      >
        <span>{comp.name.split(' (')[0]}</span>
        <span className={`text-[10px] font-mono ${isActive ? 'text-white/80' : 'opacity-60'}`}>
          .{comp.id}
        </span>
      </Link>
    );
  };

  return (
    <aside className="w-64 shrink-0 flex flex-col gap-5 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 select-none">
      {/* 1. Version Badge & Quick Meta */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-extrabold text-xs text-neutral-900 dark:text-white">API Reference</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
          v1.2.4 (Latest)
        </span>
      </div>

      {/* 2. Fast Component Search Box */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="컴포넌트 검색 (Cmd + K)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-neutral-100 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 3. Overview & Navigation */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">개요 및 갤러리</span>
        <Link
          href="/components"
          className={`px-3 py-1.5 rounded-xl text-left text-xs font-medium transition flex items-center justify-between ${
            activeId === 'overview'
              ? 'bg-blue-600 text-white font-bold shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-850 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            <span>컴포넌트 갤러리 홈</span>
          </div>
          <span className="text-[10px] font-mono opacity-60">10개</span>
        </Link>
      </div>

      {/* 4. Form & Inputs Group */}
      {formComps.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Form & Inputs</span>
          {formComps.map(renderCompItem)}
        </div>
      )}

      {/* 5. Feedback & Overlays */}
      {feedbackComps.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Feedback & Overlays</span>
          {feedbackComps.map(renderCompItem)}
        </div>
      )}

      {/* 6. Navigation & Layout */}
      {navComps.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Navigation & Layout</span>
          {navComps.map(renderCompItem)}
        </div>
      )}

      {/* 7. Data Display */}
      {dataComps.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Data Display</span>
          {dataComps.map(renderCompItem)}
        </div>
      )}
    </aside>
  );
}
