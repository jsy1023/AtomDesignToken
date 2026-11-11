'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { BlocksSidebar } from '@/components/blocks/BlocksSidebar';
import { BlockItem } from '@/lib/data/blocks';
import {
  RealtimeChartBlock,
  InteractiveChatBlock,
  CardListBlock,
  SliderShowcaseBlock,
  PricingPlanBlock,
  MetricStatsBlock,
  FileExplorerBlock,
} from '@/components/blocks';
import { Button } from '@/components/ui';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import {
  Terminal,
  Copy,
  Check,
  Monitor,
  Tablet,
  Smartphone,
  Code2,
  Sparkles,
  Layers,
  ArrowLeft,
  ChevronRight,
  Sliders,
  ExternalLink,
} from 'lucide-react';

interface BlockDetailPageContentProps {
  block: BlockItem;
}

export function BlockDetailPageContent({ block }: BlockDetailPageContentProps) {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [codeTab, setCodeTab] = useState<'react' | 'html'>('react');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const cliCommand = `npx atomsystem add ${block.id}`;

  const handleCopyCode = () => {
    const code = codeTab === 'react' ? block.codeSnippets.react : block.codeSnippets.htmlCss;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const getViewportMaxWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'max-w-full';
    }
  };

  const renderBlock = () => {
    switch (block.id) {
      case 'realtime-chart':
        return <RealtimeChartBlock />;
      case 'interactive-chat':
        return <InteractiveChatBlock />;
      case 'card-list':
        return <CardListBlock />;
      case 'interactive-slider':
        return <SliderShowcaseBlock />;
      case 'pricing-table':
        return <PricingPlanBlock />;
      case 'metric-stats':
        return <MetricStatsBlock />;
      case 'file-explorer':
        return <FileExplorerBlock />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col font-sans transition-colors">
      <Header />

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto overflow-hidden">
        {/* 1. Left Docs Sidebar */}
        <div className="hidden lg:block h-[calc(100vh-45px)] sticky top-11">
          <BlocksSidebar activeId={block.id} />
        </div>

        {/* 2. Main Content Area */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto max-w-5xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-(--text-secondary) mb-4">
            <Link href="/blocks" className="hover:text-(--text-primary) transition-colors">
              Blocks
            </Link>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="capitalize">{block.category}</span>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="text-(--text-primary) font-semibold">{block.id}</span>
          </div>

          {/* Header & Meta */}
          <div className="space-y-3 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
                {block.title}
              </h1>
              <span className="font-mono text-xs px-2 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
                {block.badge}
              </span>
            </div>
            <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed">
              {block.summary}
            </p>

            {/* CLI Install Box */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-(--radius-sm) border border-(--border-subtle) bg-(--bg-secondary)/40 font-mono text-xs text-(--text-primary)">
                <Terminal className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>{cliCommand}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCli}
                className="text-xs flex items-center gap-1"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCli ? '복사됨' : '복사'}</span>
              </Button>
            </div>
          </div>

          {/* Live Interactive Preview Container */}
          <section className="space-y-3 mb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
                라이브 인터랙티브 프리뷰
              </h2>

              {/* Viewport Resizer Controls */}
              <div className="hidden sm:flex items-center gap-0.5 bg-(--bg-secondary) p-0.5 rounded-(--radius-sm) border border-(--border-subtle)">
                <button
                  onClick={() => setViewport('desktop')}
                  className={`p-1 rounded-(--radius-sm) transition-colors ${
                    viewport === 'desktop'
                      ? 'bg-(--bg-primary) text-(--text-primary)'
                      : 'text-(--text-secondary) hover:text-(--text-primary)'
                  }`}
                  title="Desktop 100%"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewport('tablet')}
                  className={`p-1 rounded-(--radius-sm) transition-colors ${
                    viewport === 'tablet'
                      ? 'bg-(--bg-primary) text-(--text-primary)'
                      : 'text-(--text-secondary) hover:text-(--text-primary)'
                  }`}
                  title="Tablet 768px"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewport('mobile')}
                  className={`p-1 rounded-(--radius-sm) transition-colors ${
                    viewport === 'mobile'
                      ? 'bg-(--bg-primary) text-(--text-primary)'
                      : 'text-(--text-secondary) hover:text-(--text-primary)'
                  }`}
                  title="Mobile 390px"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Clean White Preview Box */}
            <div className="p-4 sm:p-6 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex justify-center items-center">
              <div className={`w-full transition-all duration-300 mx-auto ${getViewportMaxWidth()}`}>
                {renderBlock()}
              </div>
            </div>
          </section>

          {/* Lego Assembly Pipeline: Components & Tokens & Template */}
          <section className="space-y-3 mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
              레고 조립 구조 (Token → Component → Block → Template)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {/* 1. Tokens Used */}
              <div className="p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) flex flex-col justify-between">
                <div>
                  <div className="font-semibold text-(--text-primary) mb-0.5">
                    주입된 토큰 (Tokens)
                  </div>
                  <p className="text-[11px] text-(--text-secondary) mb-2.5">블록의 곡률, 간격, 컬러의 원천</p>
                  <div className="flex flex-wrap gap-1">
                    {block.tokensUsed.map((token) => (
                      <span key={token} className="font-mono text-[11px] px-1.5 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-secondary)">
                        {token}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Components Used */}
              <div className="p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) flex flex-col justify-between">
                <div>
                  <div className="font-semibold text-(--text-primary) mb-0.5">
                    조합된 컴포넌트 (Components)
                  </div>
                  <p className="text-[11px] text-(--text-secondary) mb-2.5">블록을 구성하는 기초 레고 피스</p>
                  <div className="flex flex-wrap gap-1.5">
                    {block.componentsUsed.map((comp) => (
                      <Link
                        key={comp}
                        href={`/components/${comp.toLowerCase()}`}
                        className="font-mono text-xs font-medium text-(--text-primary) hover:underline"
                      >
                        .{comp}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Template Usage */}
              <div className="p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) flex flex-col justify-between">
                <div>
                  <div className="font-semibold text-(--text-primary) mb-0.5">
                    결합 템플릿 (Template)
                  </div>
                  <p className="text-[11px] text-(--text-secondary) mb-2.5">이 블록이 꽂히는 실제 화면</p>
                  <div className="text-xs text-(--text-secondary) leading-relaxed">
                    {block.templateUsage}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Key Specs Section */}
          <section className="space-y-3 mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
              핵심 설계 기능 및 접근성 (Features & A11y)
            </h2>
            <ul className="space-y-1.5 p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) text-xs text-(--text-secondary)">
              {block.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-(--text-muted) select-none">•</span>
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Code Snippets Section */}
          <section className="space-y-3 mb-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
                소스 코드 (Installation & Usage)
              </h2>

              <div className="flex items-center gap-2">
                <div className="flex rounded-(--radius-sm) border border-(--border-subtle) p-0.5 bg-(--bg-secondary) text-xs">
                <Button
                  variant={codeTab === 'react' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCodeTab('react')}
                  className="px-2.5 py-1 text-xs"
                >
                  React / Next.js
                </Button>
                <Button
                  variant={codeTab === 'html' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCodeTab('html')}
                  className="px-2.5 py-1 text-xs"
                >
                  HTML & CSS
                </Button>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-(--radius-sm) text-xs font-medium bg-(--bg-primary) hover:bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-(--text-secondary)" />
                      <span>코드 복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) overflow-hidden">
              <div className="px-4 py-2 border-b border-(--border-subtle) bg-(--bg-secondary)/40 text-xs font-mono text-(--text-secondary) flex justify-between items-center">
                <span>{codeTab === 'react' ? `${block.id}.tsx` : `${block.id}.html`}</span>
                <span>Zero-Runtime CSS Tokens</span>
              </div>
              <CodeHighlight
                code={codeTab === 'react' ? block.codeSnippets.react : block.codeSnippets.htmlCss}
                language={codeTab === 'react' ? 'tsx' : 'html'}
                className="p-4 max-h-[460px]"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
