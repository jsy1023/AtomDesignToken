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
  Terminal,
} from 'lucide-react';
import { BlockItem } from '@/lib/data/blocks';
import { CodeHighlight } from '@/components/common/CodeHighlight';

interface BlockViewerCardProps {
  block: BlockItem;
  children: React.ReactNode;
}

export function BlockViewerCard({ block, children }: BlockViewerCardProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'react' | 'html'>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const cliCommand = `npx atomsystem add ${block.id}`;

  const handleCopyCode = (code: string) => {
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

  return (
    <div
      id={block.id}
      className="scroll-mt-20 rounded-lg bg-(--bg-primary) border border-(--border-subtle) overflow-hidden"
    >
      {/* 1. Shadcn Block Toolbar */}
      <div className="px-5 py-3 border-b border-(--border-subtle) bg-(--bg-secondary)/40 flex flex-wrap items-center justify-between gap-3">
        {/* Left: ID & Title */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-(--text-primary) px-2 py-0.5 rounded border border-(--border-subtle) bg-(--bg-primary)">
            {block.id}
          </span>
          <h2 className="text-sm font-semibold text-(--text-primary)">
            {block.title}
          </h2>
        </div>

        {/* Right Toolbar */}
        <div className="flex items-center gap-2">
          {/* Viewport Resizer */}
          {activeTab === 'preview' && (
            <div className="hidden sm:flex items-center gap-0.5 bg-(--bg-primary) p-0.5 rounded border border-(--border-subtle)">
              <button
                onClick={() => setViewport('desktop')}
                title="Desktop 100%"
                className={`p-1.5 rounded transition-colors ${
                  viewport === 'desktop'
                    ? 'bg-(--bg-secondary) text-(--text-primary)'
                    : 'text-(--text-secondary) hover:text-(--text-primary)'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                title="Tablet 768px"
                className={`p-1.5 rounded transition-colors ${
                  viewport === 'tablet'
                    ? 'bg-(--bg-secondary) text-(--text-primary)'
                    : 'text-(--text-secondary) hover:text-(--text-primary)'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                title="Mobile 390px"
                className={`p-1.5 rounded transition-colors ${
                  viewport === 'mobile'
                    ? 'bg-(--bg-secondary) text-(--text-primary)'
                    : 'text-(--text-secondary) hover:text-(--text-primary)'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Preview / Code Tabs */}
          <div className="flex items-center gap-1 bg-(--bg-primary) p-0.5 rounded border border-(--border-subtle)">
            <button
              onClick={() => setActiveTab('preview')}
              data-tab="preview"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'bg-(--bg-secondary) text-(--text-primary) font-semibold'
                  : 'text-(--text-secondary) hover:text-(--text-primary)'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('react')}
              data-tab="react"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === 'react'
                  ? 'bg-(--bg-secondary) text-(--text-primary) font-semibold'
                  : 'text-(--text-secondary) hover:text-(--text-primary)'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>React</span>
            </button>
            <button
              onClick={() => setActiveTab('html')}
              data-tab="html"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === 'html'
                  ? 'bg-(--bg-secondary) text-(--text-primary) font-semibold'
                  : 'text-(--text-secondary) hover:text-(--text-primary)'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>HTML</span>
            </button>
          </div>

          {/* CLI Add Button */}
          <button
            onClick={handleCopyCli}
            title={cliCommand}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-(--bg-primary) hover:bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle) transition-colors"
          >
            <Terminal className="w-3 h-3 text-(--text-primary)" />
            <span>{copiedCli ? 'Copied' : cliCommand}</span>
          </button>

          {/* Copy Code Button */}
          <button
            onClick={() =>
              handleCopyCode(
                activeTab === 'html' ? block.codeSnippets.htmlCss : block.codeSnippets.react
              )
            }
            className="flex items-center gap-1 px-3 py-1 rounded text-xs font-medium bg-(--bg-primary) hover:bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) transition-colors"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-(--text-secondary)" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Main Viewport */}
      <div className="p-4 sm:p-6 bg-(--bg-secondary)/30 flex justify-center items-center">
        {activeTab === 'preview' ? (
          <div
            className={`w-full transition-all duration-300 mx-auto ${getViewportMaxWidth()} ${
              viewport !== 'desktop'
                ? 'border border-(--border-strong) rounded-lg p-2 bg-(--bg-primary) shadow-sm'
                : ''
            }`}
          >
            {children}
          </div>
        ) : (
          <div className="w-full bg-(--bg-primary) rounded-md border border-(--border-subtle) overflow-hidden">
            <div className="px-4 py-2 border-b border-(--border-subtle) bg-(--bg-secondary)/50 text-xs font-mono text-(--text-secondary) flex justify-between items-center">
              <span>{activeTab === 'react' ? `${block.id}.tsx` : `${block.id}.html`}</span>
              <span>{activeTab === 'react' ? 'React + Tailwind TSX' : 'HTML / Tailwind'}</span>
            </div>
            <CodeHighlight
              code={activeTab === 'react' ? block.codeSnippets.react : block.codeSnippets.htmlCss}
              language={activeTab === 'react' ? 'tsx' : 'html'}
              className="p-4 max-h-[480px]"
            />
          </div>
        )}
      </div>

      {/* 3. Block Meta Footer */}
      <div className="px-5 py-2.5 bg-(--bg-primary) border-t border-(--border-subtle) flex flex-wrap items-center justify-between gap-2 text-xs text-(--text-secondary)">
        <p className="line-clamp-1 max-w-xl">{block.description}</p>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-(--text-muted)">Tokens:</span>
          {block.tokensUsed.map((token) => (
            <span
              key={token}
              className="font-mono text-xs px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle)"
            >
              {token}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
