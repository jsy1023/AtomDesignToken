'use client';

import React, { useState } from 'react';
import { Atom, Code2, Globe, Bot, Copy, Check, Info, FileCode } from 'lucide-react';
import { FRAMEWORK_SNIPPETS, FrameworkSnippet } from '@/lib/data/libraryGuideData';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { Button } from '@/components/ui/Button';

const TAB_ICONS: Record<string, React.ReactNode> = {
  Atom: <Atom className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Bot: <Bot className="w-4 h-4" />,
};

export function GuideFrameworkTabs() {
  const { theme } = useThemeEditor();
  const primaryColor = theme?.color?.primary || 'var(--accent-primary)';

  const [activeTabId, setActiveTabId] = useState<string>(FRAMEWORK_SNIPPETS[0].id);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const activeSnippet: FrameworkSnippet = 
    FRAMEWORK_SNIPPETS.find((s) => s.id === activeTabId) || FRAMEWORK_SNIPPETS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section className="py-14 md:py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) dark:text-(--accent-primary) mb-3">
            Implementation Guides
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-(--text-primary)  tracking-tight mb-3">
            프레임워크별 실전 도입 가이드
          </h2>
          <p className="text-sm sm:text-base text-(--text-secondary) dark:text-(--text-muted)">
            프로젝트 환경에 맞는 탭을 선택하고 복사해 즉시 사용하세요. CSS 한 줄이면 어떤 환경이든 동일한 고품질 UI가 렌더링됩니다.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-(--bg-tertiary)/60 /60 backdrop-blur-xs max-w-fit mb-6">
          {FRAMEWORK_SNIPPETS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <Button
                key={tab.id}
                variant={isActive ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setActiveTabId(tab.id);
                  setCopiedSnippet(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 h-auto text-xs font-bold ${
                  isActive
                    ? 'bg-(--bg-primary) text-(--text-primary)  shadow-xs'
                    : 'text-(--text-secondary) dark:text-(--text-muted) hover:text-(--text-primary)'
                }`}
              >
                <span className={isActive ? 'text-(--accent-primary) dark:text-(--accent-primary)' : 'text-(--text-muted)'}>
                  {TAB_ICONS[tab.icon] || <Atom className="w-4 h-4" />}
                </span>
                <span>{tab.name}</span>
                {isActive && (
                  <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) dark:text-(--accent-primary) font-semibold">
                    {tab.badge}
                  </span>
                )}
              </Button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Code Snippet Card */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-(--border-subtle) bg-(--bg-primary) shadow-xl">
            {/* Window Topbar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-(--bg-secondary) border-b border-(--border-subtle) text-xs font-mono">
              <div className="flex items-center gap-2 text-(--text-muted)">
                <FileCode className="w-4 h-4 text-(--accent-primary)" />
                <span className="font-semibold text-(--text-primary)">{activeSnippet.fileName}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 text-(--text-primary) text-xs font-mono h-auto"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-(--atom-color-success)" />
                    <span className="text-(--atom-color-success)">복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-(--text-muted)" />
                    <span>코드 복사</span>
                  </>
                )}
              </Button>
            </div>

            {/* Code Body */}
            <div className="p-5 overflow-x-auto max-h-[460px]">
              <CodeHighlight
                code={activeSnippet.code}
                language={activeSnippet.language || 'typescript'}
              />
            </div>
          </div>

          {/* Right: Key Tips & Guidelines */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl p-6 border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-(--accent-primary) dark:text-(--accent-primary) uppercase tracking-wider mb-2">
                <Info className="w-4 h-4" />
                도입 핵심 팁
              </div>
              <h4 className="text-base font-bold text-(--text-primary)  mb-4">
                {activeSnippet.name} 사용 시 유의사항
              </h4>
              <p className="text-xs text-(--text-secondary) dark:text-(--text-muted) leading-relaxed mb-4">
                {activeSnippet.description}
              </p>

              <ul className="space-y-3">
                {activeSnippet.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-(--text-secondary) leading-relaxed">
                    <span 
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Box */}
            <div className="rounded-3xl p-5 border border-dashed border-(--border-strong)  bg-neutral-50/50 /30 text-xs">
              <span className="font-bold text-(--text-primary) block mb-1">
                프레임워크가 바뀌어도 스타일은 그대로
              </span>
              <p className="text-(--text-secondary) dark:text-(--text-muted) leading-relaxed">
                컴포넌트의 HTML 마크업 구조와 클래스명(<code className="font-mono text-(--accent-primary) dark:text-(--accent-primary)">.atom-btn</code> 등)이 프레임워크에 구애받지 않으므로, React 코드를 Vue나 순수 HTML로 옮겨도 CSS 수정이 전혀 필요 없습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
