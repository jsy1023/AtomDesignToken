'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import {
  Terminal,
  Copy,
  Check,
  ArrowRight,
  Palette,
  Layers,
  BookOpen,
  SlidersHorizontal,
  Code2
} from 'lucide-react';

export default function Home() {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#18181b';
  const radius = theme?.borderRadius || '8px';
  const [copiedCli, setCopiedCli] = useState(false);

  const copyCli = () => {
    navigator.clipboard.writeText('npx atomsystem init');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const features = [
    {
      title: '디자인 토큰 명세',
      desc: 'W3C DTCG 표준 기반 색상, 타이포그래피, 곡률, 간격, 그림자 CSS 변수 카탈로그.',
      href: '/tokens',
      linkText: '토큰 명세서 보기',
      icon: Palette,
    },
    {
      title: '컴포넌트 갤러리',
      desc: '버튼, 인풋, 모달, 바텀시트, 탭 등 시맨틱 토큰과 결합된 10대 프로덕션 UI 컴포넌트.',
      href: '/components',
      linkText: '컴포넌트 보기',
      icon: Layers,
    },
    {
      title: 'UX 인터랙션 패턴',
      desc: '대시보드, 폼 유효성, 결제, 온보딩 등 검증된 실무 UX 패턴 및 안티패턴 체크리스트.',
      href: '/patterns',
      linkText: 'UX 패턴 탐색',
      icon: Code2,
    },
    {
      title: '라이브러리 활용 가이드',
      desc: 'React, Vue, Vanilla HTML 어디서나 의존성 없이 스타일을 공유하고 빌드하는 실전 지침.',
      href: '/guide',
      linkText: '활용 가이드 보기',
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between transition-colors">
      {/* Global Minimal Header */}
      <Header brandColor={brandColor} />

      {/* Main Content Area */}
      <main className="max-w-5xl w-full mx-auto px-6 py-16 flex-1 flex flex-col gap-14">
        {/* Hero Section - Minimalist & Content-first */}
        <section className="space-y-4 max-w-2xl">
          <div className="text-xs font-mono text-neutral-400">
            W3C DTCG Standard · Universal Design Token System
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            플랫폼에 독립적인 디자인 토큰과<br />
            실무 UX 패턴 라이브러리
          </h1>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            AtomDesignToken은 피그마 및 마크다운 기반의 디자인 결정을 단일 진실 공급원(SSOT)으로 관리하고, CSS 변수와 프레임워크 독립적 시맨틱 클래스로 컴파일하여 일관된 제품 경험을 구축합니다.
          </p>

          {/* Quickstart Command */}
          <div className="pt-2 flex items-center gap-3">
            <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-xs font-mono">
              <span className="text-neutral-400">$</span>
              <span className="text-[var(--text-primary)]">npx atomsystem init</span>
              <button
                type="button"
                onClick={copyCli}
                className="text-neutral-400 hover:text-[var(--text-primary)] transition ml-2"
                title="명령어 복사"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <Link
              href="/tokens"
              style={{ borderRadius: radius }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-semibold hover:opacity-90 transition shadow-xs"
            >
              <span>시작하기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Feature Cards Grid - Clean, Content-centric */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.href}
                href={f.href}
                style={{ borderRadius: radius }}
                className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--border-strong)] transition-colors flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold text-sm">
                    <Icon className="w-4 h-4 text-neutral-400 group-hover:text-[var(--text-primary)] transition-colors" />
                    <span>{f.title}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="text-xs font-medium text-neutral-400 group-hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
                  <span>{f.linkText}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </section>

        {/* Studio Link Callout - Minimal Bar */}
        <section 
          style={{ borderRadius: radius }}
          className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
        >
          <div className="space-y-0.5">
            <span className="font-semibold text-[var(--text-primary)]">프롬프트 빌더 스튜디오</span>
            <p className="text-neutral-400">선택한 토큰과 패턴을 기반으로 AI에게 전달할 규격화된 프롬프트를 자동 생성합니다.</p>
          </div>
          <Link
            href="/studio"
            className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-[var(--text-primary)] flex items-center gap-1 shrink-0"
          >
            <span>스튜디오 바로가기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </main>

      {/* Minimal Clean Footer */}
      <footer className="border-t border-[var(--border-subtle)] py-6 text-xs text-neutral-400">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AtomDesignToken — Single Source of Truth for Design Tokens & Patterns</span>
          <div className="flex items-center gap-4 text-neutral-500">
            <Link href="/tokens" className="hover:text-[var(--text-primary)]">토큰</Link>
            <Link href="/components" className="hover:text-[var(--text-primary)]">컴포넌트</Link>
            <Link href="/patterns" className="hover:text-[var(--text-primary)]">UX 패턴</Link>
            <Link href="/guide" className="hover:text-[var(--text-primary)]">가이드</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
