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
    <section className="relative overflow-hidden py-14 md:py-20 border-b border-[var(--border-subtle)] bg-gradient-to-b from-neutral-50/70 via-transparent to-transparent dark:from-neutral-900/40">
      {/* Decorative background glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
            style={{ backgroundColor: primaryColor }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            공식 활용 가이드
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            수레바퀴를 다시 발명하지 않는 법
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            W3C DTCG & CSS 표준 준수
          </span>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.2] mb-5">
            수레바퀴를 다시 만들지 마세요.{' '}
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400"
            >
              Atomsystem으로 스마트하게 굴리세요.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
            세상에 없던 버튼과 모달을 바닥부터 다시 코딩하느라 시간을 낭비하지 마세요. 
            검증된 W3C 표준 디자인 토큰과 단 1줄의 CSS로 React, Vue, Vanilla HTML 어디서든 동일하게 작동하는 실전 사용법을 안내합니다.
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
