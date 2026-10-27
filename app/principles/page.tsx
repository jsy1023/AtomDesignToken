'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { PRINCIPLES_DATA } from '@/lib/data/principles';
import {
  ShieldCheck,
  Check,
  X,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export default function PrinciplesPage() {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';
  const radius = theme?.borderRadius || '8px';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체 원칙' },
    { id: 'core', label: '핵심 원칙' },
    { id: 'architecture', label: '아키텍처' },
    { id: 'token', label: '토큰 규격' },
    { id: 'accessibility', label: '접근성' },
  ];

  const filteredPrinciples = selectedCategory === 'all'
    ? PRINCIPLES_DATA
    : PRINCIPLES_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col justify-between transition-colors">
      <Header brandColor={brandColor} />

      <main className="max-w-5xl w-full mx-auto px-6 py-12 flex-1 flex flex-col gap-10">
        {/* Hero Section */}
        <section className="space-y-4 border-b border-(--border-subtle) pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-emerald-500 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Core Philosophy
            </span>
            <span>•</span>
            <span>W3C DTCG Aligned</span>
            <span>•</span>
            <span>Zero Runtime</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--text-primary)">
            디자인 시스템 설계 원칙 (Principles)
          </h1>

          <p className="text-sm text-(--text-secondary) leading-relaxed max-w-3xl">
            AtomDesignToken은 임시방편적인 절차적 하드코딩을 배제하고, 플랫폼에 독립적인 단일 진실 공급원(SSOT)과 브라우저 네이티브 기술을 결합하여 유지보수 가능하고 확장성 높은 엔터프라이즈 UI를 구축하기 위한 6대 핵심 규격을 따릅니다.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md text-xs transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-(--bg-secondary) text-(--text-primary) font-bold'
                    : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Principles Flat Specification List */}
        <section className="divide-y divide-(--border-subtle)">
          {filteredPrinciples.map((item) => (
            <article key={item.id} className="py-8 space-y-4">
              {/* Header */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-(--text-muted)">
                  <span className="font-bold text-(--text-primary)">{item.number}</span>
                  <span>/</span>
                  <span className="uppercase">{item.category}</span>
                  {item.w3cRef && (
                    <>
                      <span>•</span>
                      <span className="text-blue-500 font-sans">{item.w3cRef}</span>
                    </>
                  )}
                </div>

                <h2 className="text-xl font-bold tracking-tight text-(--text-primary)">
                  {item.title}
                </h2>
                <p className="text-xs font-medium text-(--text-secondary)">
                  {item.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-(--text-secondary) leading-relaxed">
                {item.description}
              </p>

              {/* Do & Don't Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                {/* DO */}
                <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                    <Check className="w-4 h-4" />
                    <span>권장 지침 (DO)</span>
                  </div>
                  <ul className="space-y-1.5 text-(--text-secondary) pl-1">
                    {item.dos.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-mono text-[11px] mt-0.5">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DONT */}
                <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
                    <X className="w-4 h-4" />
                    <span>지양 패턴 (DON&apos;T)</span>
                  </div>
                  <ul className="space-y-1.5 text-(--text-secondary) pl-1">
                    {item.donts.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-500 font-mono text-[11px] mt-0.5">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Bottom Banner */}
        <section className="pt-6 border-t border-(--border-subtle) flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-base font-bold text-(--text-primary)">
              토큰 명세서 및 UX 패턴 가이드 살펴보기
            </h3>
            <p className="text-xs text-(--text-secondary)">
              설계 원칙이 실제 코드 및 UI 컴포넌트에 어떻게 구체화되었는지 직접 확인할 수 있습니다.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/tokens"
              style={{ borderRadius: radius }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-(--bg-secondary) border border-(--border-strong) text-(--text-primary) text-xs font-semibold hover:border-(--text-primary) transition-colors"
            >
              <span>토큰 명세서</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/guide"
              style={{ backgroundColor: brandColor, borderRadius: radius }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>활용 가이드</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-(--border-subtle) py-6 text-xs text-neutral-400">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AtomDesignToken — Core Principles & Architecture</span>
          <div className="flex items-center gap-4 text-neutral-500">
            <Link href="/" className="hover:text-(--text-primary)">홈으로</Link>
            <Link href="/tokens" className="hover:text-(--text-primary)">토큰</Link>
            <Link href="/motion" className="hover:text-(--text-primary)">모션</Link>
            <Link href="/dependencies" className="hover:text-(--text-primary)">디펜던시</Link>
            <a
              href="https://www.designtokens.org/tr/2025.10/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--text-primary) inline-flex items-center gap-1 transition-colors"
            >
              <span>W3C DTCG</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
