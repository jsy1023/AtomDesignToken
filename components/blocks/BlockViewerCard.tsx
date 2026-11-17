'use client';

import React, { useState } from 'react';
import { Button, Card, Badge } from '@/components/ui';
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
    <Card
      id={block.id}
      className="scroll-mt-20 overflow-hidden"
    >
      {/* 1. Shadcn Block Toolbar */}
      <div className="px-5 py-3 border-b border-(--border-subtle) bg-(--bg-secondary)/40 flex flex-wrap items-center justify-between gap-3">
        {/* Left: ID & Title */}
        <div className="flex items-center gap-3">
          <Badge variant="neutral" className="font-mono text-xs">
            {block.id}
          </Badge>
          <h2 className="text-sm font-semibold text-(--text-primary)">
            {block.title}
          </h2>
        </div>

        {/* Right Toolbar */}
        <div className="flex items-center gap-2">
          {/* Viewport Resizer */}
          {activeTab === 'preview' && (
            <div className="hidden sm:flex items-center gap-0.5 bg-(--bg-primary) p-0.5 rounded border border-(--border-subtle)">
              <Button
                variant={viewport === 'desktop' ? 'primary' : 'ghost'}
                size="sm"
                isIconOnly
                onClick={() => setViewport('desktop')}
                title="Desktop 100%"
                className="p-1 h-auto"
              >
                <Monitor className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant={viewport === 'tablet' ? 'primary' : 'ghost'}
                size="sm"
                isIconOnly
                onClick={() => setViewport('tablet')}
                title="Tablet 768px"
                className="p-1 h-auto"
              >
                <Tablet className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant={viewport === 'mobile' ? 'primary' : 'ghost'}
                size="sm"
                isIconOnly
                onClick={() => setViewport('mobile')}
                title="Mobile 390px"
                className="p-1 h-auto"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}

          {/* Preview / Code Tabs */}
          <div className="flex items-center gap-1 bg-(--bg-primary) p-0.5 rounded border border-(--border-subtle)">
            <Button
              variant={activeTab === 'preview' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('preview')}
              data-tab="preview"
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium h-auto"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </Button>
            <Button
              variant={activeTab === 'react' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('react')}
              data-tab="react"
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium h-auto"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>React</span>
            </Button>
            <Button
              variant={activeTab === 'html' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('html')}
              data-tab="html"
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium h-auto"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>HTML</span>
            </Button>
          </div>

          {/* CLI Add Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCli}
            title={cliCommand}
            className="hidden lg:flex items-center gap-1 text-xs font-mono"
          >
            <Terminal className="w-3 h-3 text-(--text-primary)" />
            <span>{copiedCli ? 'Copied' : cliCommand}</span>
          </Button>

          {/* Copy Code Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleCopyCode(
                activeTab === 'html' ? block.codeSnippets.htmlCss : block.codeSnippets.react
              )
            }
            className="flex items-center gap-1 text-xs font-medium"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-(--atom-color-success)" />
                <span className="text-(--atom-color-success) font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-(--text-secondary)" />
                <span>Copy Code</span>
              </>
            )}
          </Button>
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
    </Card>
  );
}
