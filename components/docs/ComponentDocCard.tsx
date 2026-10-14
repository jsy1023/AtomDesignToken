'use client';

import React, { useState } from 'react';
import { GalleryComponent } from '@/lib/data/components';
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
  Layers
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
    <section
      id={component.id}
      className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-6"
    >
      {/* 1. Header: Component Title, Badges, Description */}
      <div className="flex flex-col gap-2 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              {component.name}
            </h2>
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              .atom-{component.id}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {component.source}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {component.category}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
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
              : 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50 text-blue-900 dark:text-blue-200'
          }`}
        >
          {component.callout.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          ) : component.callout.type === 'tip' ? (
            <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          )}
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-[11px] uppercase tracking-wider">{component.callout.title}</span>
            <p className="leading-relaxed opacity-90">{component.callout.text}</p>
          </div>
        </div>
      )}

      {/* 3. Live Interactive Preview Canvas */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
          <span>인터랙티브 라이브 프리뷰</span>
        </span>
        <div className="w-full min-h-[140px] p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-center shadow-inner overflow-hidden">
          {renderPreview()}
        </div>
      </div>

      {/* 4. Code Snippet Block (React / HTML Tabs + Copy) */}
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden text-neutral-200">
        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950/70 text-xs font-semibold">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSnippetTab('react')}
              className={`px-3 py-1 rounded-lg transition ${
                snippetTab === 'react'
                  ? 'bg-neutral-800 text-blue-400 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              React / Next.js
            </button>
            <button
              onClick={() => setSnippetTab('html')}
              className={`px-3 py-1 rounded-lg transition ${
                snippetTab === 'html'
                  ? 'bg-neutral-800 text-emerald-400 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Vanilla HTML
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition px-2.5 py-1 rounded-md hover:bg-neutral-800"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사 완료!' : '코드 복사'}</span>
          </button>
        </div>

        <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-neutral-300">
          <code>{activeSnippet}</code>
        </pre>
      </div>

      {/* 5. API Props Specification Table */}
      {component.propsSpec && component.propsSpec.length > 0 && (
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            API Props 규격 명세
          </span>
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-850 text-neutral-700 dark:text-neutral-300 font-bold border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="p-3 w-1/4">Property</th>
                  <th className="p-3 w-1/3">Type</th>
                  <th className="p-3 w-1/6">Default</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {component.propsSpec.map((prop, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-850/50 transition-colors">
                    <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{prop.name}</td>
                    <td className="p-3 font-mono text-[11px] text-purple-600 dark:text-purple-400">{prop.type}</td>
                    <td className="p-3 font-mono text-neutral-500 dark:text-neutral-400">{prop.defaultValue}</td>
                    <td className="p-3 text-neutral-700 dark:text-neutral-300">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
