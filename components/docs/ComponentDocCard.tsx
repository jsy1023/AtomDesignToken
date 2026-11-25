'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GalleryComponent } from '@/lib/data/components';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import {
  Button,
  Card,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui';
import {
  Copy,
  Check,
  Code2,
  Terminal,
  Info,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ComponentDocCardProps {
  component: GalleryComponent;
  renderPreview: () => React.ReactNode;
}

export function ComponentDocCard({ component, renderPreview }: ComponentDocCardProps) {
  const [snippetTab, setSnippetTab] = useState<'react' | 'html'>('react');
  const [copied, setCopied] = useState(false);

  const activeSnippet = snippetTab === 'react' ? component.reactSnippet : component.htmlSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      id={component.id}
      className="scroll-mt-28 p-6 sm:p-8 flex flex-col gap-6"
    >
      {/* 1. Header: Component Title, Badges, Description */}
      <div className="flex flex-col gap-2 pb-4 border-b border-(--border-subtle)">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h2 className="docs-h2">
              {component.name}
            </h2>
            <Badge variant="primary" className="font-mono text-xs">
              .atom-{component.id}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="neutral" className="text-xs font-mono uppercase">
              {component.source}
            </Badge>
            <Badge variant="neutral" className="text-xs font-mono uppercase">
              {component.category}
            </Badge>
            <Link
              href={`/components/${component.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-(--atom-color-primary,var(--accent-primary)) hover:opacity-90 active:scale-95 rounded-lg transition shadow-xs"
            >
              <span>상세 가이드 & 케이스</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-(--text-secondary) dark:text-(--text-muted) leading-relaxed">
          {component.description}
        </p>
      </div>

      {/* 2. Accessibility / Implementation Callout (Note / Tip / Warning) */}
      {component.callout && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
            component.callout.type === 'warning'
              ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200'
              : component.callout.type === 'tip'
              ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200'
              : 'bg-(--accent-primary)/10/60 dark:bg-(--accent-primary)/10 border-(--accent-primary)/20 dark:border-blue-900/50 text-(--accent-primary) dark:text-blue-200'
          }`}
        >
          {component.callout.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4 text-(--atom-color-warning) shrink-0 mt-0.5" />
          ) : component.callout.type === 'tip' ? (
            <Sparkles className="w-4 h-4 text-(--atom-color-success) shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 text-(--accent-primary) shrink-0 mt-0.5" />
          )}
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-[11px] uppercase tracking-wider">{component.callout.title}</span>
            <p className="leading-relaxed opacity-90">{component.callout.text}</p>
          </div>
        </div>
      )}

      {/* 3. Live Interactive Preview Canvas */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-(--text-secondary) uppercase tracking-wider flex items-center gap-1.5">
          <span>인터랙티브 라이브 프리뷰</span>
        </span>
        <div className="w-full min-h-[140px] p-6 rounded-2xl bg-neutral-50  border border-(--border-subtle)/80  flex items-center justify-center shadow-inner overflow-hidden">
          {renderPreview()}
        </div>
      </div>

      {/* 4. Code Snippet Block (React / HTML Tabs + Copy) */}
      <div className="rounded-2xl bg-(--bg-secondary) border border-(--border-subtle) overflow-hidden text-(--text-primary)">
        <div className="flex items-center justify-between px-4 py-2 border-b border-(--border-subtle) bg-(--bg-primary)/70 text-xs font-semibold">
          <div className="flex items-center gap-1">
            <Button
              variant={snippetTab === 'react' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSnippetTab('react')}
              className="text-xs h-auto py-1 px-3"
            >
              React / Next.js
            </Button>
            <Button
              variant={snippetTab === 'html' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSnippetTab('html')}
              className="text-xs h-auto py-1 px-3"
            >
              Vanilla HTML
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs text-(--text-muted) hover:text-white transition px-2.5 py-1 h-auto"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-(--atom-color-success)" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사 완료!' : '코드 복사'}</span>
          </Button>
        </div>

        <CodeHighlight
          code={activeSnippet}
          language={snippetTab === 'react' ? 'tsx' : 'html'}
          className="p-4"
        />
      </div>

      {/* 5. API Props Specification Table */}
      {component.propsSpec && component.propsSpec.length > 0 && (
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-xs font-bold text-(--text-secondary) uppercase tracking-wider">
            API Props 규격 명세
          </span>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Property</TableHead>
                <TableHead className="w-1/3">Type</TableHead>
                <TableHead className="w-1/6">Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {component.propsSpec.map((prop, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-mono font-bold text-(--accent-primary)">{prop.name}</TableCell>
                  <TableCell className="font-mono text-[11px] text-(--accent-primary)">{prop.type}</TableCell>
                  <TableCell className="font-mono text-(--text-secondary)">{prop.defaultValue}</TableCell>
                  <TableCell className="text-(--text-secondary)">{prop.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 6. Footer: Link to Dedicated Component Detail Page */}
      <div className="pt-2 border-t border-(--border-subtle) flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-(--bg-secondary)/40 p-4 rounded-(--radius) border border-(--border-subtle)">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-(--text-primary)">
            {component.name} 전용 가이드 & 사용 패턴
          </span>
          <p className="text-[11px] text-(--text-secondary)">
            실무 사용 케이스, 안티패턴 방지(Do's & Don'ts), React/Vue/HTML 코드 및 연관 UX 패턴 확인
          </p>
        </div>
        <Link href={`/components/${component.id}`}>
          <Button
            variant="primary"
            size="sm"
            className="inline-flex items-center gap-1.5 shrink-0"
          >
            <span>개별 상세 페이지 이동</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
