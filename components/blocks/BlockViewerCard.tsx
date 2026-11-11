'use client';

import React, { useState } from 'react';
import {
  Code2,
  Eye,
  Copy,
  Check,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Tag,
} from 'lucide-react';
import { BlockItem } from '@/lib/data/blocks';

interface BlockViewerCardProps {
  block: BlockItem;
  children: React.ReactNode;
}

export function BlockViewerCard({ block, children }: BlockViewerCardProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'react' | 'html'>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  return (
    <div
      id={block.id}
      className="scroll-mt-20 rounded-2xl bg-(--bg-primary) border border-(--border-subtle) shadow-xs overflow-hidden transition-all duration-200"
    >
      {/* Block Header Info */}
      <div className="p-5 sm:p-6 border-b border-(--border-subtle)">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-(--accent-primary)/10 text-(--accent-primary)">
              {block.badge}
            </span>
            <span className="text-xs text-(--text-muted) font-medium">{block.englishTitle}</span>
          </div>

          {/* Tokens used tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-(--text-muted) flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3" />
              토큰 바인딩:
            </span>
            {block.tokensUsed.map((token) => (
              <span
                key={token}
                className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)"
              >
                {token}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-(--text-primary) tracking-tight mb-1.5">
          {block.title}
        </h3>
        <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
          {block.description}
        </p>

        {/* Feature Highlights Pill */}
        <div className="flex flex-wrap gap-2 mt-4">
          {block.features.map((feat, idx) => (
            <span
              key={idx}
              className="text-[11px] text-(--text-secondary) bg-(--bg-secondary)/70 px-2.5 py-1 rounded-lg border border-(--border-subtle)"
            >
              ✓ {feat}
            </span>
          ))}
        </div>
      </div>

      {/* Control Bar: Viewport selector & Code tabs */}
      <div className="px-4 py-2.5 bg-(--bg-secondary)/60 border-b border-(--border-subtle) flex items-center justify-between gap-3 overflow-x-auto">
        {/* Left: View Mode Tabs */}
        <div className="flex items-center gap-1 bg-(--bg-primary) p-0.5 rounded-lg border border-(--border-subtle) shrink-0">
          <button
            onClick={() => setActiveTab('preview')}
            data-tab="preview"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'preview'
                ? 'bg-(--accent-primary) text-white shadow-xs'
                : 'text-(--text-secondary) hover:text-(--text-primary)'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>라이브 프리뷰</span>
          </button>
          <button
            onClick={() => setActiveTab('react')}
            data-tab="react"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'react'
                ? 'bg-(--accent-primary) text-white shadow-xs'
                : 'text-(--text-secondary) hover:text-(--text-primary)'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>React (TSX)</span>
          </button>
          <button
            onClick={() => setActiveTab('html')}
            data-tab="html"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'html'
                ? 'bg-(--accent-primary) text-white shadow-xs'
                : 'text-(--text-secondary) hover:text-(--text-primary)'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>HTML & CSS</span>
          </button>
        </div>

        {/* Right: Viewport resizing (Only in preview mode) & Copy button */}
        <div className="flex items-center gap-2">
          {activeTab === 'preview' && (
            <div className="hidden sm:flex items-center gap-0.5 bg-(--bg-primary) p-0.5 rounded-lg border border-(--border-subtle)">
              <button
                onClick={() => setViewport('desktop')}
                title="데스크톱 뷰 (100%)"
                className={`p-1.5 rounded-md transition-colors ${
                  viewport === 'desktop'
                    ? 'bg-(--bg-secondary) text-(--text-primary)'
                    : 'text-(--text-muted) hover:text-(--text-primary)'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                title="태블릿 뷰 (768px)"
                className={`p-1.5 rounded-md transition-colors ${
                  viewport === 'tablet'
                    ? 'bg-(--bg-secondary) text-(--text-primary)'
                    : 'text-(--text-muted) hover:text-(--text-primary)'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                title="모바일 뷰 (390px)"
                className={`p-1.5 rounded-md transition-colors ${
                  viewport === 'mobile'
                    ? 'bg-(--bg-secondary) text-(--text-primary)'
                    : 'text-(--text-muted) hover:text-(--text-primary)'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={() =>
              handleCopy(
                activeTab === 'html' ? block.codeSnippets.htmlCss : block.codeSnippets.react
              )
            }
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-(--bg-primary) hover:bg-(--border-subtle) text-(--text-primary) border border-(--border-subtle) transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500">복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-(--text-muted)" />
                <span>코드 복사</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-8 bg-(--bg-secondary)/30 flex justify-center items-center min-h-[380px]">
        {activeTab === 'preview' ? (
          <div
            className={`w-full transition-all duration-300 mx-auto ${getViewportMaxWidth()} ${
              viewport !== 'desktop'
                ? 'border-2 border-dashed border-(--border-strong) rounded-2xl p-2 bg-(--bg-primary) shadow-sm'
                : ''
            }`}
          >
            {children}
          </div>
        ) : (
          <div className="w-full bg-(--bg-primary) rounded-xl border border-(--border-subtle) overflow-hidden">
            <div className="px-4 py-2 border-b border-(--border-subtle) bg-(--bg-secondary)/50 text-[11px] font-mono text-(--text-muted) flex justify-between items-center">
              <span>{activeTab === 'react' ? `${block.id}.tsx` : `${block.id}.html`}</span>
              <span>{activeTab === 'react' ? 'TypeScript React' : 'Vanilla HTML / Tailwind'}</span>
            </div>
            <pre className="p-4 text-xs font-mono text-(--text-primary) overflow-x-auto leading-relaxed max-h-96">
              <code>
                {activeTab === 'react' ? block.codeSnippets.react : block.codeSnippets.htmlCss}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
