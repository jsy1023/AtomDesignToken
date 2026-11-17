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
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { Button } from '@/components/ui/Button';

const STEP_ICONS: Record<string, React.ReactNode> = {
  FileSearch: <FileSearch className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
};

export function GuideAgentMechanism() {
  const { theme } = useThemeEditor();
  const primaryColor = theme?.color?.primary || 'var(--accent-primary)';

  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const activeStep: AgentReferenceStep = AI_REFERENCE_PIPELINE.steps[activeStepIdx];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeStep.outputCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-12 md:py-16 border-b border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 space-y-2">
          <div className="text-xs font-mono text-(--text-muted)">
            AI Agent Reference Pipeline
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            AI Agent 동작 메커니즘
          </h2>
          <p className="text-sm sm:text-base text-(--text-secondary) dark:text-(--text-muted) leading-relaxed">
            {AI_REFERENCE_PIPELINE.description}
          </p>
        </div>

        {/* 4 Steps Interactive Pipeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {AI_REFERENCE_PIPELINE.steps.map((item, idx) => {
            const isSelected = idx === activeStepIdx;
            return (
              <Button
                key={item.step}
                variant={isSelected ? 'primary' : 'outline'}
                size="md"
                onClick={() => {
                  setActiveStepIdx(idx);
                  setCopiedCode(false);
                }}
                className={`relative text-left p-5 h-auto rounded-2xl border transition-all cursor-pointer flex flex-col justify-between items-start font-normal ${
                  isSelected
                    ? 'bg-[var(--bg-card)] border-(--accent-primary)/60 shadow-lg ring-2 ring-blue-500/20 text-(--text-primary)'
                    : 'bg-[var(--bg-card)]/70 border-[var(--border-subtle)] text-(--text-secondary)'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 w-full">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-(--accent-primary)/10 text-(--accent-primary)">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-mono text-(--text-muted)">{item.stageName}</span>
                  </div>
                  <h3 className="font-bold text-sm text-(--text-primary) mb-1.5">{item.title}</h3>
                  <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-2">{item.summary}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-(--border-subtle) w-full flex items-center justify-between text-[11px] font-mono text-(--text-muted)">
                  <span>{item.referencedFiles?.[0]?.name || ''}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-(--accent-primary)" />
                </div>
              </Button>
            );
          })}
        </div>

        {/* Detailed Breakdown Box for Active Step */}
        <div className="rounded-3xl border border-(--border-subtle) bg-(--bg-primary) text-(--text-primary) shadow-2xl overflow-hidden">
          {/* Top Info Bar */}
          <div className="px-6 py-4 bg-(--bg-secondary) border-b border-(--border-subtle) flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: primaryColor }}
              >
                {STEP_ICONS[activeStep.icon] || <Bot className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-(--accent-primary)">
                  {activeStep.badge} • {activeStep.stageName}
                </span>
                <h4 className="text-sm font-bold text-white">
                  {activeStep.title}
                </h4>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-(--text-primary) h-auto"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-(--atom-color-success)" />
                  <span className="text-(--atom-color-success)">복사 완료</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-(--text-muted)" />
                  <span>스니펫 복사</span>
                </>
              )}
            </Button>
          </div>

          {/* Grid Layout: Left Reasoning & References / Right Output Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
            {/* Left 5 Cols: Ingestion & AI Reasoning */}
            <div className="lg:col-span-5 p-6 space-y-5">
              {/* Referenced Files List */}
              <div>
                <span className="text-[11px] font-bold text-(--text-muted) uppercase tracking-wider block mb-2.5">
                  AI가 직접 스캔/참조하는 원천 파일 (SSOT)
                </span>
                <div className="space-y-2">
                  {activeStep.referencedFiles.map((f, i) => (
                    <div 
                      key={i}
                      className="p-3 rounded-xl bg-(--bg-secondary) border border-(--border-subtle) text-xs flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-2 font-mono text-(--accent-primary) font-bold">
                        <FileCode className="w-3.5 h-3.5 text-(--accent-primary)" />
                        <span>{f.name}</span>
                      </div>
                      <p className="text-[11px] text-(--text-muted) leading-relaxed">
                        {f.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Prompt & Internal Thought */}
              <div className="p-4 rounded-xl bg-(--accent-primary)/10 border border-(--accent-primary)/20 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-(--accent-primary) uppercase block mb-1">
                    인입 상황 (Trigger)
                  </span>
                  <p className="text-xs text-(--text-primary) font-medium">
                    {activeStep.inputPrompt}
                  </p>
                </div>
                <div className="pt-2 border-t border-(--accent-primary)/20">
                  <span className="text-[10px] font-bold text-(--atom-color-warning) uppercase block mb-1">
                    AI 내부 추론 메커니즘
                  </span>
                  <p className="text-xs text-(--text-secondary) leading-relaxed">
                    {activeStep.aiThinking}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Output Code Preview */}
            <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-(--bg-primary)">
              <div>
                <div className="flex items-center justify-between text-xs text-(--text-muted) mb-3 font-mono">
                  <span>실제 합성/참조된 산출물 ({activeStep.outputLanguage})</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-secondary)">
                    Deterministic Output
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-(--bg-secondary) border border-(--border-subtle) overflow-x-auto max-h-[360px]">
                  <CodeHighlight
                    code={activeStep.outputCode}
                    language={activeStep.outputLanguage || 'typescript'}
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-(--border-subtle) text-[11px] text-(--text-muted) flex items-center justify-between">
                <span>임의 헥스코드 하드코딩 0건 (100% 라이브러리 토큰 기반)</span>
                <span className="text-(--text-secondary) font-mono">단계 {activeStep.step} / 04</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
