import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GuideHero } from '@/components/guide/GuideHero';
import { GuideAgentMechanism } from '@/components/guide/GuideAgentMechanism';
import { GuideBestPractices } from '@/components/guide/GuideBestPractices';
import { GuideFrameworkTabs } from '@/components/guide/GuideFrameworkTabs';
import { GuideInteractivePlayground } from '@/components/guide/GuideInteractivePlayground';
import { GuideWorkflowSection } from '@/components/guide/GuideWorkflowSection';

export const metadata: Metadata = {
  title: '라이브러리 활용 가이드 | AtomDesignToken',
  description: '수레바퀴를 다시 만들지 않고 검증된 토큰과 시멘틱 클래스로 React, Vue, HTML에서 가장 빠르고 견고하게 UI를 구축하는 실전 활용 가이드.',
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Universal Header */}
      <Header />

      {/* Main Content Sections */}
      <main>
        <GuideHero />
        {/* 2nd Section: AI Agent Library Reference Mechanism */}
        <GuideAgentMechanism />
        <GuideBestPractices />
        <GuideFrameworkTabs />
        <GuideInteractivePlayground />
        <GuideWorkflowSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-subtle)] py-8 text-center text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">AtomSystem</span> - Agent-Driven Universal Design Token & UI Library
          </div>
          <div className="flex gap-4">
            <span>W3C DTCG Format</span>
            <span>•</span>
            <span>Style Dictionary v4</span>
            <span>•</span>
            <span>Framework Agnostic</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
