'use client';

import React, { useState } from 'react';
import { DownloadCloud, Sliders, CheckCircle, Copy, Check, ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { WORKFLOW_STEPS } from '@/lib/data/libraryGuideData';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';

const WORKFLOW_ICONS: Record<string, React.ReactNode> = {
  DownloadCloud: <DownloadCloud className="w-6 h-6" />,
  Sliders: <Sliders className="w-6 h-6" />,
  CheckCircle: <CheckCircle className="w-6 h-6" />,
};

export function GuideWorkflowSection() {
  const { theme } = useThemeEditor();
  const primaryColor = theme?.color?.primary || '#3182f6';
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCommand = (cmd: string, idx: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(idx);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section className="py-14 md:py-20 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-3">
            Quick 3-Steps
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            3단계로 끝내는 라이브러리 도입 로드맵
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            복잡한 환경설정 없이 단 3분 만에 실무 프로젝트에 토큰 기반 UI를 배포할 수 있습니다.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {WORKFLOW_STEPS.map((item, idx) => (
            <div
              key={item.step}
              className="relative rounded-3xl p-6 sm:p-7 border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-neutral-300 dark:text-neutral-700 font-mono">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {item.badge}
                  </span>
                </div>

                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  {WORKFLOW_ICONS[item.icon] || <CheckCircle className="w-6 h-6" />}
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {item.command && (
                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-neutral-900 text-neutral-200 text-xs font-mono">
                    <span className="truncate">{item.command}</span>
                    <button
                      onClick={() => copyCommand(item.command!, item.step)}
                      className="shrink-0 p-1 hover:text-white text-neutral-400"
                      title="명령어 복사"
                    >
                      {copiedCmd === item.step ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ & Closing Banner */}
        <div className="rounded-3xl p-8 sm:p-10 border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
              <HelpCircle className="w-4 h-4" />
              자주 묻는 질문 (FAQ)
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              "기존 사내 프로젝트의 스타일과 충돌하면 어쩌죠?"
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              AtomSystem의 모든 CSS 클래스는 <code className="font-mono text-blue-400">.atom-*</code> 접두사로 엄격히 네임스페이스 격리되어 있으며, 기존 부트스트랩이나 Tailwind 스타일과 전혀 충돌하지 않습니다. 점진적으로 필요한 화면부터 안전하게 도입할 수 있습니다.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tokens"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-neutral-900 hover:bg-neutral-100 transition"
              >
                <span>토큰 카탈로그 탐색</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white transition border border-neutral-700"
              >
                <span>AI 스튜디오로 이동</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
