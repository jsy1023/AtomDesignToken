'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { PatternItem, PATTERNS_COLLECTION } from '@/lib/data/patterns';
import { DeviceMockupView } from './DeviceMockupView';
import { PatternQuickSwitcher } from './PatternQuickSwitcher';
import {
  ArrowLeft,
  Copy,
  Check,
  Download,
  CheckCircle2,
  AlertTriangle,
  Monitor,
  Smartphone,
  Layers,
  Sparkles,
  Code2
} from 'lucide-react';

interface PatternDetailViewProps {
  pattern: PatternItem;
  onBack: () => void;
  onSelectPattern?: (id: string) => void;
  allPatterns?: PatternItem[];
}

export function PatternDetailView({
  pattern,
  onBack,
  onSelectPattern,
  allPatterns = PATTERNS_COLLECTION,
}: PatternDetailViewProps) {
  const [copied, setCopied] = useState(false);
  const isWeb = pattern.platform === 'web';
  const currentVariant = pattern.variants[0];

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(currentVariant?.markdown || pattern.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const text = currentVariant?.markdown || pattern.summary;
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `ux-pattern-${pattern.id}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Quick Pattern Switcher Bar */}
      {onSelectPattern && (
        <PatternQuickSwitcher
          currentPatternId={pattern.id}
          onSelectPattern={onSelectPattern}
          onBackToGrid={onBack}
          filteredList={allPatterns}
        />
      )}

      {/* 1. Top Navigation Bar: Back Button & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-(--border-subtle) ">
        <Button
          variant="secondary"
          size="sm"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-(--accent-primary)" />
          <span>전체 패턴 목록으로 돌아가기</span>
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 font-bold text-xs shadow-md shadow-blue-500/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '복사완료!' : 'AI 지시용 .md 복사'}</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadMarkdown}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold"
          >
            <Download className="w-4 h-4" />
            <span>.md 다운로드</span>
          </Button>
        </div>
      </div>

      {/* 2. Pattern Header Info */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
              isWeb
                ? 'bg-(--accent-primary)/10  text-(--accent-primary) dark:text-(--accent-primary) border-(--accent-primary)/20 dark:border-blue-800'
                : 'bg-emerald-50 dark:bg-emerald-950/60 text-(--atom-color-success) dark:text-(--atom-color-success) border-emerald-200 dark:border-emerald-800'
            }`}
          >
            {isWeb ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{isWeb ? 'WEB 전용 화면' : '모바일 전용 화면'}</span>
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--bg-secondary)  text-(--text-secondary) ">
            {pattern.categoryName}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-(--text-primary)  tracking-tight">
          {pattern.title}
        </h1>
        <p className="text-sm text-(--text-secondary) dark:text-(--text-muted) leading-relaxed max-w-3xl">
          {pattern.summary}
        </p>
      </div>

      {/* 3. Main 2-Column Split: Realistic Device Screen (Left 7~8 cols) + Best Practices & Prompt (Right 4~5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Device Mockup Canvas */}
        <div className="lg:col-span-7 xl:col-span-8 flex justify-center w-full">
          <DeviceMockupView patternId={pattern.id} defaultPlatform={pattern.platform} />
        </div>

        {/* Right: Checklist & Specification Panel */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
          {/* Best Practices Checklist */}
          <div className="p-5 rounded-2xl bg-(--bg-primary) border border-(--border-subtle)/80  shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-(--atom-color-success) dark:text-(--atom-color-success) font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>필수 구현 베스트 프랙티스 (Checklist)</span>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs text-(--text-secondary)">
              {pattern.checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--atom-color-success) mt-1.5 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Anti-Patterns */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-(--atom-color-destructive) dark:text-(--atom-color-destructive) font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>치명적 안티패턴 (절대 방지 사항)</span>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs text-rose-900 dark:text-rose-200/90">
              {pattern.antiPatterns.map((item, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Components */}
          <div className="p-5 rounded-2xl bg-(--bg-primary) border border-(--border-subtle)/80  shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-(--accent-primary) dark:text-(--accent-primary) font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>연계 추천 컴포넌트</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pattern.recommendedComponentIds.map((comp) => (
                <span
                  key={comp}
                  className="px-2.5 py-1 rounded-lg bg-(--bg-secondary)  border border-(--border-subtle)  font-mono text-xs text-(--text-primary) font-bold"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
