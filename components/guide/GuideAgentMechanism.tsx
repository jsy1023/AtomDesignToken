'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  FileSearch, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  FileCode, 
  Check, 
  Copy, 
  BrainCircuit,
  Eye,
  Workflow
} from 'lucide-react';
import { AI_REFERENCE_PIPELINE, AgentReferenceStep } from '@/lib/data/libraryGuideData';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';

const STEP_ICONS: Record<string, React.ReactNode> = {
  FileSearch: <FileSearch className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
};

export function GuideAgentMechanism() {
  const { theme } = useThemeEditor();
  const primaryColor = theme?.color?.primary || '#3182f6';

  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const activeStep: AgentReferenceStep = AI_REFERENCE_PIPELINE.steps[activeStepIdx];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeStep.outputCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-16 md:py-24 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 relative overflow-hidden">
      {/* Decorative subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-3 shadow-2xs">
            <BrainCircuit className="w-4 h-4 text-purple-500 animate-pulse" />
            <span>AI Agent 동작 메커니즘 (작동 원리)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            AI는 이 라이브러리를 어떻게 참조할까요?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {AI_REFERENCE_PIPELINE.description}
          </p>
        </div>

        {/* 4 Steps Interactive Pipeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {AI_REFERENCE_PIPELINE.steps.map((item, idx) => {
            const isSelected = idx === activeStepIdx;
            return (
              <button
                key={item.step}
                onClick={() => {
                  setActiveStepIdx(idx);
                  setCopiedCode(false);
                }}
                className={`relative text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[var(--bg-card)] border-blue-500/60 shadow-lg ring-2 ring-blue-500/20'
                    : 'bg-[var(--bg-card)]/70 border-[var(--border-subtle)] hover:border-neutral-400/40 dark:hover:border-neutral-600/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold text-white shadow-xs"
                      style={{ backgroundColor: isSelected ? primaryColor : '#71717a' }}
                    >
                      {item.step}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {item.stageName.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-neutral-400'}>
                    {isSelected ? '상세 분석 중' : '클릭하여 확인'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-blue-500' : 'text-neutral-400'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Breakdown Box for Active Step */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-2xl overflow-hidden">
          {/* Top Info Bar */}
          <div className="px-6 py-4 bg-neutral-900/90 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: primaryColor }}
              >
                {STEP_ICONS[activeStep.icon] || <Bot className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
                  {activeStep.badge} • {activeStep.stageName}
                </span>
                <h4 className="text-sm font-bold text-white">
                  {activeStep.title}
                </h4>
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-200 transition active:scale-95"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">복사 완료</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>예제 코드 복사</span>
                </>
              )}
            </button>
          </div>

          {/* Grid Layout: Left Reasoning & References / Right Output Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
            {/* Left 5 Cols: Ingestion & AI Reasoning */}
            <div className="lg:col-span-5 p-6 space-y-5">
              {/* Referenced Files List */}
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2.5">
                  📂 AI가 직접 스캔/참조하는 원천 파일 (SSOT)
                </span>
                <div className="space-y-2">
                  {activeStep.referencedFiles.map((f, i) => (
                    <div 
                      key={i}
                      className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 text-xs flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-2 font-mono text-blue-300 font-bold">
                        <FileCode className="w-3.5 h-3.5 text-blue-400" />
                        <span>{f.name}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        {f.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Prompt & Internal Thought */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/30 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase block mb-1">
                    인입 상황 (Trigger)
                  </span>
                  <p className="text-xs text-neutral-200 font-medium">
                    {activeStep.inputPrompt}
                  </p>
                </div>
                <div className="pt-2 border-t border-blue-900/30">
                  <span className="text-[10px] font-bold text-amber-400 uppercase block mb-1">
                    AI 내부 추론 메커니즘
                  </span>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {activeStep.aiThinking}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Output Code Preview */}
            <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-neutral-950">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 font-mono">
                  <span>실제 합성/참조된 산출물 ({activeStep.outputLanguage})</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                    Deterministic Output
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/70 overflow-x-auto max-h-[360px]">
                  <pre className="text-xs font-mono text-emerald-300 leading-relaxed">
                    <code>{activeStep.outputCode}</code>
                  </pre>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
                <span>✨ 임의 헥스코드 하드코딩 0건 (100% 라이브러리 토큰 기반)</span>
                <span className="text-neutral-500 font-mono">단계 {activeStep.step} / 04</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
