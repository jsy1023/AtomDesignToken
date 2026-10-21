'use client';

import React, { useState } from 'react';
import { Atom, Code2, Globe, Bot, Copy, Check, Info, FileCode } from 'lucide-react';
import { FRAMEWORK_SNIPPETS, FrameworkSnippet } from '@/lib/data/libraryGuideData';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';

const TAB_ICONS: Record<string, React.ReactNode> = {
  Atom: <Atom className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Bot: <Bot className="w-4 h-4" />,
};

export function GuideFrameworkTabs() {
  const { theme } = useThemeEditor();
  const primaryColor = theme?.color?.primary || '#3182f6';

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
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-3">
            Implementation Guides
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-3">
            프레임워크별 실전 도입 가이드
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            프로젝트 환경에 맞는 탭을 선택하고 복사해 즉시 사용하세요. CSS 한 줄이면 어떤 환경이든 동일한 고품질 UI가 렌더링됩니다.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/60 backdrop-blur-xs max-w-fit mb-6">
          {FRAMEWORK_SNIPPETS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setCopiedSnippet(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-400'}>
                  {TAB_ICONS[tab.icon] || <Atom className="w-4 h-4" />}
                </span>
                <span>{tab.name}</span>
                {isActive && (
                  <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Code Snippet Card */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-xl">
            {/* Window Topbar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900/90 border-b border-neutral-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-400">
                <FileCode className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-neutral-200">{activeSnippet.fileName}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono transition active:scale-95"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>코드 복사</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-5 overflow-x-auto max-h-[460px]">
              <pre className="text-xs font-mono text-neutral-300 leading-relaxed">
                <code>{activeSnippet.code}</code>
              </pre>
            </div>
          </div>

          {/* Right: Key Tips & Guidelines */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl p-6 border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                <Info className="w-4 h-4" />
                도입 핵심 팁
              </div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-4">
                {activeSnippet.name} 사용 시 유의사항
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                {activeSnippet.description}
              </p>

              <ul className="space-y-3">
                {activeSnippet.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
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
            <div className="rounded-3xl p-5 border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/30 text-xs">
              <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1">
                💡 프레임워크가 바뀌어도 스타일은 그대로
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                컴포넌트의 HTML 마크업 구조와 클래스명(<code className="font-mono text-blue-600 dark:text-blue-400">.atom-btn</code> 등)이 프레임워크에 구애받지 않으므로, React 코드를 Vue나 순수 HTML로 옮겨도 CSS 수정이 전혀 필요 없습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
