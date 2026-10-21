'use client';

import React from 'react';
import { RotateCcw, Layers, Database, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { LIBRARY_PHILOSOPHY } from '@/lib/data/libraryGuideData';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';

const ICON_MAP: Record<string, React.ReactNode> = {
  RotateCcw: <RotateCcw className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export function GuideBestPractices() {
  const { theme } = useThemeEditor();
  const primaryColor = theme?.color?.primary || '#3182f6';

  return (
    <section className="py-14 md:py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 mb-3">
            Core Principles
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            라이브러리를 제대로 쓰는 4가지 황금률
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {LIBRARY_PHILOSOPHY.introText}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LIBRARY_PHILOSOPHY.principles.map((item) => {
            return (
              <div
                key={item.id}
                className="group relative rounded-3xl p-6 sm:p-7 border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-neutral-400/40 dark:hover:border-neutral-600/40 transition-all shadow-xs hover:shadow-md"
              >
                {/* Header row in card */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div 
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {ICON_MAP[item.icon] || <Sparkles className="w-5 h-5" />}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-5 font-medium">
                  {item.subtitle}
                </p>

                {/* Problem vs Solution comparison */}
                <div className="space-y-3 mb-5">
                  <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/15 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block mb-0.5">
                        바퀴를 다시 깎을 때의 문제
                      </span>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {item.problem}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                        라이브러리 활용 해결책
                      </span>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Golden Key Rule Footer */}
                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                  <span className="text-[11px] text-neutral-400 font-semibold">실천 수칙</span>
                  <span className="text-right font-mono text-[11px] text-neutral-800 dark:text-neutral-200">
                    {item.keyRule}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
