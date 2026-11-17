'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PatternItem } from '@/lib/data/patterns';
import { Button, Checkbox } from '@/components/ui';
import { DeviceMockupView } from './DeviceMockupView';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import {
  Monitor,
  Smartphone,
  Copy,
  Check,
  Download,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Code2,
  BookOpen,
  Eye,
  FileText
} from 'lucide-react';

interface PatternDocsLayoutProps {
  pattern: PatternItem;
  allPatterns: PatternItem[];
  onSelectPattern: (id: string) => void;
}

type DocsTab = 'preview' | 'guidelines' | 'spec';

export function PatternDocsLayout({
  pattern,
  allPatterns,
  onSelectPattern,
}: PatternDocsLayoutProps) {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || 'var(--accent-primary)';
  const radius = theme?.borderRadius || '12px';

  const [activeTab, setActiveTab] = useState<DocsTab>('preview');
  const [copiedMd, setCopiedMd] = useState(false);
  const [checkedRules, setCheckedRules] = useState<Record<string, boolean>>({});

  const isWeb = pattern.platform === 'web';
  const currentVariant = pattern.variants[0];

  // Pagination (Previous & Next Pattern)
  const currentIndex = allPatterns.findIndex((p) => p.id === pattern.id);
  const prevPattern = currentIndex > 0 ? allPatterns[currentIndex - 1] : null;
  const nextPattern = currentIndex < allPatterns.length - 1 ? allPatterns[currentIndex + 1] : null;

  const handleCopyMarkdown = () => {
    const text = currentVariant?.markdown || pattern.summary;
    navigator.clipboard.writeText(text);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
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

  const toggleCheck = (idx: number) => {
    setCheckedRules((prev) => ({
      ...prev,
      [`${pattern.id}-${idx}`]: !prev[`${pattern.id}-${idx}`],
    }));
  };

  return (
    <article className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
      {/* 1. Breadcrumb & Meta Bar */}
      <div className="flex items-center justify-between text-xs text-(--text-secondary) gap-2 flex-wrap">
        <nav className="flex items-center gap-1.5 font-medium">
          <Link href="/patterns" className="hover:text-(--text-primary) dark:hover:text-(--text-primary) transition">
            UX 패턴 가이드
          </Link>
          <span>/</span>
          <span className="text-(--text-muted)">{pattern.categoryName}</span>
          <span>/</span>
          <span className="text-(--text-primary) font-bold">{pattern.title}</span>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold shadow-xs"
          >
            {copiedMd ? <Check className="w-3.5 h-3.5 text-(--atom-color-success)" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedMd ? '복사됨' : 'AI 명세 복사'}</span>
          </Button>

          <Link
            href="/blocks"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-(--border-subtle) hover:bg-(--bg-secondary) text-(--text-primary) transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>디자인 블록 보기</span>
          </Link>
        </div>
      </div>

      {/* 2. Article Header */}
      <header className="border-b border-[var(--border-subtle)] pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${
              isWeb
                ? 'bg-(--accent-primary)/10  text-(--accent-primary) dark:text-(--accent-primary) border-(--accent-primary)/20 dark:border-blue-800'
                : 'bg-emerald-50 dark:bg-emerald-950/60 text-(--atom-color-success) dark:text-(--atom-color-success) border-emerald-200 dark:border-emerald-800'
            }`}
          >
            {isWeb ? <Monitor className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
            <span>{isWeb ? 'WEB 전용 패턴' : '모바일 전용 패턴'}</span>
          </span>
          <span className="text-[11px] font-medium text-(--text-muted)">
            카테고리: {pattern.categoryName}
          </span>
        </div>

        <h1 className="docs-h1">
          {pattern.title}
        </h1>
        <p className="docs-lead max-w-3xl">
          {pattern.summary}
        </p>
      </header>

      {/* 3. Clean Modern Docs Tabs */}
      <div className="flex flex-col gap-6">
        <div 
          style={{ borderColor: 'var(--border-subtle)' }}
          className="flex items-center gap-2 border-b select-none overflow-x-auto"
        >
          <Button
            variant={activeTab === 'preview' ? 'primary' : 'ghost'}
            size="sm"
            type="button"
            onClick={() => setActiveTab('preview')}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-bold"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>인터랙티브 데모 (Demo)</span>
          </Button>

          <Button
            variant={activeTab === 'guidelines' ? 'primary' : 'ghost'}
            size="sm"
            type="button"
            onClick={() => setActiveTab('guidelines')}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-bold"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>구현 가이드 & 체크리스트</span>
          </Button>

          <Button
            variant={activeTab === 'spec' ? 'primary' : 'ghost'}
            size="sm"
            type="button"
            onClick={() => setActiveTab('spec')}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-bold"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>AI 마크다운 명세</span>
          </Button>
        </div>

        {/* TAB 1: INTERACTIVE PREVIEW */}
        {activeTab === 'preview' && (
          <section className="space-y-4">
            <div 
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)', borderRadius: radius }}
              className="p-4 sm:p-6 border shadow-xs"
            >
              <DeviceMockupView
                patternId={pattern.id}
                defaultPlatform={pattern.platform}
              />
            </div>
            <p className="text-xs text-(--text-muted) text-center">
              실시간 반응형 뷰포트 전환 및 클릭 인터랙션을 직접 테스트할 수 있습니다.
            </p>
          </section>
        )}

        {/* TAB 2: GUIDELINES & ANTI-PATTERNS */}
        {activeTab === 'guidelines' && (
          <section className="space-y-6">
            {/* Checklist & Anti-patterns 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Checklist */}
              <div 
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)', borderRadius: radius }}
                className="p-5 border shadow-xs flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                  <CheckCircle2 className="w-4 h-4 text-(--atom-color-success)" />
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">
                    필수 구현 체크리스트 ({currentVariant?.checklist?.length || 0})
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {currentVariant?.checklist?.map((item, idx) => {
                    const isChecked = !!checkedRules[`${pattern.id}-${idx}`];
                    return (
                      <div key={idx} className="p-1">
                      <Checkbox
                        checked={isChecked}
                        onChange={() => toggleCheck(idx)}
                        label={
                          <span className={isChecked ? 'line-through opacity-80' : ''}>
                            {item}
                          </span>
                        }
                      />
                    </div>
                    );
                  })}
                </div>
              </div>

              {/* Anti-Patterns */}
              <div 
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)', borderRadius: radius }}
                className="p-5 border shadow-xs flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                  <AlertTriangle className="w-4 h-4 text-(--atom-color-destructive)" />
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">
                    주의해야 할 안티패턴 ({currentVariant?.antiPatterns?.length || 0})
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {currentVariant?.antiPatterns?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 text-xs text-rose-800 dark:text-rose-300"
                    >
                      <span className="font-bold text-(--atom-color-destructive) dark:text-(--atom-color-destructive) mt-0.5">✕</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Tokens & Rules */}
            <div 
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)', borderRadius: radius }}
              className="p-5 border shadow-xs space-y-3"
            >
              <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                <FileText className="w-4 h-4 text-(--accent-primary)" />
                <span>권장 설계 및 디자인 토큰 매핑</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                본 패턴은 AtomDesignToken의 시맨틱 토큰(<code>--bg-secondary</code>, <code>--accent-primary</code>, <code>--border-subtle</code> 등)과 100% 호환되며 테마 에디터에서 선택한 테마 색상 및 곡률을 동적으로 상속합니다.
              </p>
            </div>
          </section>
        )}

        {/* TAB 3: MARKDOWN SPEC */}
        {activeTab === 'spec' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-(--text-secondary)">
                AI Agent 코드 생성 및 프롬프트 주입용 마크다운 명세
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={handleCopyMarkdown}
                  className="px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  {copiedMd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMd ? '복사 완료' : '전체 복사'}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.md 다운로드</span>
                </Button>
              </div>
            </div>

            <div 
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)', borderRadius: radius }}
              className="border p-4 shadow-xs overflow-x-auto"
            >
              <pre className="text-xs font-mono text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap select-all">
                {currentVariant?.markdown || pattern.summary}
              </pre>
            </div>
          </section>
        )}
      </div>

      {/* 4. Bottom Pagination (Previous / Next Article) */}
      <footer className="mt-8 pt-6 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPattern ? (
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => onSelectPattern(prevPattern.id)}
            style={{ borderRadius: radius }}
            className="p-4 h-auto text-left flex flex-col items-start gap-1 group"
          >
            <span className="text-[11px] text-(--text-muted) flex items-center gap-1">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              <span>이전 패턴</span>
            </span>
            <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-(--accent-primary) transition">
              {prevPattern.title}
            </span>
          </Button>
        ) : (
          <div />
        )}

        {nextPattern && (
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => onSelectPattern(nextPattern.id)}
            style={{ borderRadius: radius }}
            className="p-4 h-auto text-right flex flex-col items-end gap-1 group ml-auto w-full"
          >
            <span className="text-[11px] text-(--text-muted) flex items-center gap-1">
              <span>다음 패턴</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-(--accent-primary) transition">
              {nextPattern.title}
            </span>
          </Button>
        )}
      </footer>
    </article>
  );
}
