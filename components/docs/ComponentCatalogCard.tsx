'use client';

import React from 'react';
import Link from 'next/link';
import { GalleryComponent } from '@/lib/data/components';
import { ArrowRight, Code2, Sparkles } from 'lucide-react';

interface ComponentCatalogCardProps {
  component: GalleryComponent;
  renderPreview: () => React.ReactNode;
}

export function ComponentCatalogCard({ component, renderPreview }: ComponentCatalogCardProps) {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:shadow-md hover:border-blue-500/50 transition-all flex flex-col justify-between gap-5 group">
      {/* 1. Header: Title, Semantic Class, Category */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              {component.name}
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
              .atom-{component.id}
            </span>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
            {component.category}
          </span>
        </div>

        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {component.description}
        </p>
      </div>

      {/* 2. Interactive Mini Preview Canvas */}
      <div className="w-full min-h-[140px] rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-center p-4 shadow-inner overflow-hidden">
        {renderPreview()}
      </div>

      {/* 3. Key Use Cases preview */}
      {component.useCases && component.useCases.length > 0 && (
        <div className="flex flex-col gap-1.5 pt-1 border-t border-neutral-100 dark:border-neutral-800/60">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            실무 주요 케이스
          </span>
          <div className="flex flex-col gap-1 text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
            {component.useCases.slice(0, 2).map((uc, idx) => (
              <div key={idx} className="flex items-start gap-1.5 line-clamp-1">
                <span className="text-blue-500 font-bold">•</span>
                <span className="truncate">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Action Link to Dedicated Component Detail Page */}
      <Link
        href={`/components/${component.id}`}
        className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-blue-600 text-neutral-800 hover:text-white dark:bg-neutral-800 dark:hover:bg-blue-600 dark:text-neutral-200 dark:hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-xs"
      >
        <Code2 className="w-3.5 h-3.5" />
        <span>코드 복사 및 상세 가이드 보기</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
