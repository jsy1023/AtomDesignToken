'use client';

import React from 'react';
import Link from 'next/link';
import { GALLERY_COMPONENTS, ComponentCategory } from '@/lib/data/components';
import { Search, BookOpen, Layers, Terminal, Sparkles, ChevronDown, ExternalLink } from 'lucide-react';

interface DocsSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeId: string;
  onSelectComponent: (id: string) => void;
}

export function DocsSidebar({
  searchQuery,
  onSearchChange,
  activeId,
  onSelectComponent
}: DocsSidebarProps) {
  const formComps = GALLERY_COMPONENTS.filter((c) => c.category === 'form');
  const feedbackComps = GALLERY_COMPONENTS.filter((c) => c.category === 'feedback');
  const navComps = GALLERY_COMPONENTS.filter((c) => c.category === 'navigation');
  const dataComps = GALLERY_COMPONENTS.filter((c) => c.category === 'data');

  const scrollToSection = (id: string) => {
    onSelectComponent(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderCompItem = (comp: (typeof GALLERY_COMPONENTS)[number]) => (
    <div
      key={comp.id}
      className={`group flex items-center justify-between rounded-xl px-2.5 py-1 transition ${
        activeId === comp.id
          ? 'bg-blue-600 text-white font-bold shadow-xs'
          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-850'
      }`}
    >
      <button
        onClick={() => scrollToSection(comp.id)}
        className="flex-1 text-left text-xs py-0.5 flex items-center justify-between pr-1"
      >
        <span>{comp.name.split(' (')[0]}</span>
        <span className="text-[10px] font-mono opacity-60">.{comp.id}</span>
      </button>
      <Link
        href={`/components/${comp.id}`}
        title={`${comp.name} 개별 상세 페이지`}
        className={`p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition shrink-0 ${
          activeId === comp.id ? 'text-white' : 'text-neutral-400 hover:text-blue-600'
        }`}
      >
        <ExternalLink className="w-3 h-3" />
      </Link>
    </div>
  );

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
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-neutral-100 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 3. Getting Started Links */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">시작하기</span>
        <button
          onClick={() => scrollToSection('getting-started')}
          className={`px-3 py-1.5 rounded-xl text-left text-xs font-medium transition flex items-center gap-2 ${
            activeId === 'getting-started'
              ? 'bg-blue-600 text-white font-bold shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-850'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>빠른 설치 & CLI 설정</span>
        </button>
      </div>

      {/* 4. Form & Inputs Group */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Form & Inputs</span>
        {formComps.map(renderCompItem)}
      </div>

      {/* 5. Feedback & Overlays */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Feedback & Overlays</span>
        {feedbackComps.map(renderCompItem)}
      </div>

      {/* 6. Navigation & Layout */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Navigation & Layout</span>
        {navComps.map(renderCompItem)}
      </div>

      {/* 7. Data Display */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Data Display</span>
        {dataComps.map(renderCompItem)}
      </div>
    </aside>
  );
}
