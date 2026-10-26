'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Terminal, Copy, Check, ArrowRight, BookOpen, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';

export function GuideHero() {
  const { theme } = useThemeEditor();
  const primaryColor = theme?.color?.primary || '#3182f6';
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-12 md:py-16 border-b border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-mono text-neutral-400 mb-3">
          공식 활용 가이드 · W3C DTCG & CSS 표준 준수
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            라이브러리 활용 및 통합 가이드
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            검증된 W3C 표준 디자인 토큰과 단 1줄의 CSS로 React, Vue, HTML 어디서든 동일하게 동작하는 UI를 빠르게 구축하는 실전 사용법을 안내합니다.
          </p>
        </div>

        {/* Quick Commands & CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
          {/* CLI Copy 1 */}
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-neutral-900 dark:bg-neutral-950 text-neutral-100 border border-neutral-800 shadow-md font-mono text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>npm i atomsystem</span>
            </div>
            <button
              onClick={() => copyText('npm i atomsystem', 'npm')}
              className="p-1 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
              title="복사하기"
            >
              {copied === 'npm' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* CLI Copy 2 */}
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-neutral-900 dark:bg-neutral-950 text-neutral-100 border border-neutral-800 shadow-md font-mono text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>npx atomsystem init</span>
            </div>
            <button
              onClick={() => copyText('npx atomsystem init', 'init')}
              className="p-1 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
              title="복사하기"
            >
              {copied === 'init' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Studio Link */}
          <Link
            href="/studio"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs text-white shadow-md transition hover:opacity-90 active:scale-95"
            style={{ backgroundColor: primaryColor }}
          >
            <span>스튜디오에서 테마 조합하기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
