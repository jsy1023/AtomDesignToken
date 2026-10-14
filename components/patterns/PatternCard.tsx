'use client';

import React from 'react';
import { PatternItem } from '@/lib/data/patterns';
import { WireframeGraphic } from './WireframeGraphic';
import { Monitor, Smartphone, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';

interface PatternCardProps {
  pattern: PatternItem;
  onSelect: (patternId: string) => void;
}

export function PatternCard({ pattern, onSelect }: PatternCardProps) {
  const isWeb = pattern.platform === 'web';

  return (
    <div
      onClick={() => onSelect(pattern.id)}
      className="group cursor-pointer rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500/80 dark:hover:border-blue-500/80 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        {/* 1. Wireframe Graphic Section */}
        <div className="mb-4 overflow-hidden rounded-xl bg-neutral-100/60 dark:bg-neutral-950/60 p-1 group-hover:ring-2 group-hover:ring-blue-500/20 transition-all">
          <WireframeGraphic wireframeType={pattern.wireframeType} platform={pattern.platform} />
        </div>

        {/* 2. Platform & Category Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
              isWeb
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200/80 dark:border-blue-800'
                : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-800'
            }`}
          >
            {isWeb ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{isWeb ? 'WEB' : '모바일'}</span>
          </span>

          <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
            {pattern.categoryName}
          </span>
        </div>

        {/* 3. Title */}
        <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-1">
          {pattern.title}
        </h3>

        {/* 4. Description */}
        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4">
          {pattern.summary}
        </p>
      </div>

      {/* 5. Footer: Recommended Components & Action CTA */}
      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1 overflow-hidden">
          <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 mr-1 flex items-center gap-0.5">
            <Layers className="w-3 h-3" />
            권장:
          </span>
          <div className="flex gap-1 flex-wrap">
            {pattern.recommendedComponentIds.slice(0, 3).map((comp) => (
              <span
                key={comp}
                className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-mono"
              >
                {comp}
              </span>
            ))}
            {pattern.recommendedComponentIds.length > 3 && (
              <span className="text-[10px] text-neutral-400">+{pattern.recommendedComponentIds.length - 3}</span>
            )}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
        >
          <span>실행 화면</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
