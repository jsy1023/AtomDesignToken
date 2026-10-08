"use client";

import React, { useState } from 'react';
import { MarkdownGuideEditor } from '../studio/components/MarkdownGuideEditor';
import { FinanceShowcaseContent } from './finance/FinanceShowcaseContent';
import { DashboardShowcaseContent } from './dashboard/DashboardShowcaseContent';
import { CreditCard, LayoutDashboard, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ShowcasesHubPage() {
  const [activeTemplate, setActiveTemplate] = useState<'finance' | 'dashboard'>('finance');

  return (
    <div className="flex flex-col md:flex-row w-screen h-[calc(100vh-64px)] bg-bg-wrapper text-text-standard overflow-hidden">
      {/* 1. Left Sidebar: Markdown Guide Importer & Realtime Editor */}
      <aside className="w-full md:w-[380px] lg:w-[420px] h-[360px] md:h-full flex flex-col shrink-0 z-20 shadow-xl border-b md:border-b-0 md:border-r border-border-standard bg-bg-card">
        <MarkdownGuideEditor />
      </aside>

      {/* 2. Right Main Viewport: Live Interactive Showcase Template */}
      <main className="flex-1 flex flex-col min-w-0 bg-bg-wrapper overflow-hidden relative">
        {/* Top Control Bar: Template Switcher & Direct Links */}
        <header className="h-14 px-6 border-b border-border-standard bg-bg-card/90 backdrop-blur-md flex items-center justify-between shrink-0 z-10 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-text-sub flex items-center gap-1.5">
              <Sparkles size={14} className="text-primary" /> 실시간 반영 쇼케이스:
            </span>

            {/* Template Selector Tabs */}
            <div className="flex items-center gap-1 bg-bg-wrapper p-1 rounded-common border border-border-standard text-xs">
              <button
                type="button"
                id="showcase-tab-finance"
                data-testid="showcase-tab-finance"
                onClick={() => setActiveTemplate('finance')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-common font-bold transition-all ${
                  activeTemplate === 'finance'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-text-sub hover:bg-bg-hover'
                }`}
              >
                <CreditCard size={14} />
                가계부 앱 (Finance)
              </button>
              <button
                type="button"
                id="showcase-tab-dashboard"
                data-testid="showcase-tab-dashboard"
                onClick={() => setActiveTemplate('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-common font-bold transition-all ${
                  activeTemplate === 'dashboard'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-text-sub hover:bg-bg-hover'
                }`}
              >
                <LayoutDashboard size={14} />
                웹 대시보드 (Dashboard)
              </button>
            </div>
          </div>

          {/* Fullscreen Direct Page Link */}
          <div className="flex items-center gap-2">
            <Link
              href={activeTemplate === 'finance' ? '/showcases/finance' : '/showcases/dashboard'}
              target="_blank"
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-text-sub hover:text-primary transition-colors border border-border-standard rounded-common hover:bg-bg-hover"
            >
              <span>단독 전체화면 열기</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </header>

        {/* Live Template Container */}
        <div className="flex-1 w-full h-full overflow-y-auto">
          <React.Suspense fallback={<div className="p-8 text-center text-text-sub">로딩 중...</div>}>
            {activeTemplate === 'finance' ? (
              <div className="w-full min-h-full flex justify-center py-6">
                <div className="w-full max-w-lg">
                  <FinanceShowcaseContent />
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <DashboardShowcaseContent />
              </div>
            )}
          </React.Suspense>
        </div>
      </main>
    </div>
  );
}
