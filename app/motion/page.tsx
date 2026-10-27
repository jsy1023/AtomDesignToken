'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import {
  DURATION_TOKENS,
  EASING_TOKENS,
  MOTION_PATTERNS,
} from '@/lib/data/motion';
import {
  Play,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Zap,
} from 'lucide-react';

export default function MotionPage() {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';
  const radius = theme?.borderRadius || '8px';

  const [copiedVar, setCopiedVar] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>('250ms');
  const [selectedEasing, setSelectedEasing] = useState<string>('cubic-bezier(0.2, 0, 0, 1)');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePatternId, setActivePatternId] = useState<string | null>(null);

  const handleCopy = (variable: string) => {
    navigator.clipboard.writeText(variable);
    setCopiedVar(variable);
    setTimeout(() => setCopiedVar(null), 2000);
  };

  const triggerPlay = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 20);
  };

  const triggerPattern = (patternId: string) => {
    setActivePatternId(patternId);
    setTimeout(() => setActivePatternId(null), 800);
  };

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col justify-between transition-colors">
      <Header brandColor={brandColor} />

      <main className="max-w-5xl w-full mx-auto px-6 py-12 flex-1 flex flex-col gap-10">
        {/* Hero Section */}
        <section className="space-y-4 border-b border-(--border-subtle) pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-blue-500 font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Motion &amp; Timing Tokens
            </span>
            <span>•</span>
            <span>W3C DTCG Duration &amp; Cubic-Bezier</span>
            <span>•</span>
            <span>Zero-Jank CSS Transitions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--text-primary)">
            모션 및 트랜지션 명세 (Motion)
          </h1>

          <p className="text-sm text-(--text-secondary) leading-relaxed max-w-3xl">
            디자인 시스템의 모션은 단순한 시각적 효과가 아닌, 사용자의 시선을 유도하고 시스템 상태 변화를 직관적으로 전달하는 인터랙션 문법입니다. 일관된 지속 시간(Duration)과 가속도 곡선(Easing) 토큰을 통해 자연스러운 사용자 경험을 제공합니다.
          </p>
        </section>

        {/* 1. Interactive Motion Playground */}
        <section className="p-6 bg-(--bg-secondary) border border-(--border-subtle) rounded-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-(--border-subtle) pb-4">
            <div>
              <h2 className="text-base font-bold text-(--text-primary) flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                실시간 모션 테스트 플레이그라운드
              </h2>
              <p className="text-xs text-(--text-secondary) mt-0.5">
                지속 시간과 이징 곡선을 선택하고 애니메이션을 트리거해보세요.
              </p>
            </div>

            <button
              onClick={triggerPlay}
              style={{ backgroundColor: brandColor }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-xs shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>재생하기</span>
            </button>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <span className="text-(--text-muted) text-[11px]">지속 시간 (Duration)</span>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-3 py-1.5 bg-(--bg-primary) border border-(--border-subtle) rounded-lg text-(--text-primary) text-xs"
              >
                {DURATION_TOKENS.map((d) => (
                  <option key={d.name} value={d.value}>
                    {d.name} ({d.value})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <span className="text-(--text-muted) text-[11px]">이징 곡선 (Easing)</span>
              <select
                value={selectedEasing}
                onChange={(e) => setSelectedEasing(e.target.value)}
                className="w-full px-3 py-1.5 bg-(--bg-primary) border border-(--border-subtle) rounded-lg text-(--text-primary) text-xs"
              >
                {EASING_TOKENS.map((e) => (
                  <option key={e.name} value={e.value}>
                    {e.name} ({e.curve})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Animation Stage */}
          <div className="h-28 bg-(--bg-primary) border border-(--border-subtle) rounded-lg p-4 flex items-center relative overflow-hidden">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs select-none`}
              style={{
                backgroundColor: brandColor,
                borderRadius: radius,
                transform: isPlaying ? 'translateX(min(60vw, 480px)) rotate(45deg)' : 'translateX(0px) rotate(0deg)',
                transitionProperty: 'transform',
                transitionDuration: selectedDuration,
                transitionTimingFunction: selectedEasing,
              }}
            >
              Motion
            </div>
            <div className="absolute right-4 bottom-2 text-[10px] font-mono text-(--text-muted)">
              transition: transform {selectedDuration} {selectedEasing};
            </div>
          </div>
        </section>

        {/* 2. Duration Tokens Table */}
        <section className="space-y-3">
          <div className="border-b border-(--border-subtle) pb-2">
            <h2 className="text-lg font-bold text-(--text-primary)">
              지속 시간 토큰 (Duration Tokens)
            </h2>
            <p className="text-xs text-(--text-secondary)">
              컴포넌트의 면적과 성격에 따라 100ms ~ 500ms 범위의 체계적인 단위를 제공합니다.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                  <th className="py-2.5 px-3 font-medium">토큰 이름</th>
                  <th className="py-2.5 px-3 font-medium">CSS 변수</th>
                  <th className="py-2.5 px-3 font-medium">값 (Value)</th>
                  <th className="py-2.5 px-3 font-medium hidden sm:table-cell">성격 및 권장 용도</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-subtle)">
                {DURATION_TOKENS.map((t) => (
                  <tr key={t.name} className="hover:bg-(--bg-secondary)/60 transition-colors">
                    <td className="py-3 px-3 font-semibold text-(--text-primary)">
                      {t.name}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleCopy(`var(${t.variable})`)}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-(--bg-secondary) hover:bg-(--border-subtle) text-(--text-primary) font-mono text-[11px] transition-colors"
                        title="클릭하여 복사"
                      >
                        {copiedVar === `var(${t.variable})` ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-(--text-muted)" />
                        )}
                        <span>var({t.variable})</span>
                      </button>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-blue-500">
                      {t.value}
                    </td>
                    <td className="py-3 px-3 text-(--text-secondary) hidden sm:table-cell">
                      <span>{t.description} — <strong className="text-(--text-primary)">{t.usage}</strong></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Easing Tokens Table */}
        <section className="space-y-3">
          <div className="border-b border-(--border-subtle) pb-2">
            <h2 className="text-lg font-bold text-(--text-primary)">
              이징 곡선 토큰 (Easing Tokens)
            </h2>
            <p className="text-xs text-(--text-secondary)">
              물리적 세계의 질량과 감속을 시뮬레이션하는 표준 3차 베지에(cubic-bezier) 곡선입니다.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                  <th className="py-2.5 px-3 font-medium">토큰 이름</th>
                  <th className="py-2.5 px-3 font-medium">CSS 변수</th>
                  <th className="py-2.5 px-3 font-medium">Cubic Bezier 공식</th>
                  <th className="py-2.5 px-3 font-medium hidden md:table-cell">동작 특성 및 적용</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-subtle)">
                {EASING_TOKENS.map((t) => (
                  <tr key={t.name} className="hover:bg-(--bg-secondary)/60 transition-colors">
                    <td className="py-3 px-3 font-semibold text-(--text-primary)">
                      {t.name}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleCopy(`var(${t.variable})`)}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-(--bg-secondary) hover:bg-(--border-subtle) text-(--text-primary) font-mono text-[11px] transition-colors"
                        title="클릭하여 복사"
                      >
                        {copiedVar === `var(${t.variable})` ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-(--text-muted)" />
                        )}
                        <span>var({t.variable})</span>
                      </button>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-amber-600 dark:text-amber-400">
                      {t.value}
                    </td>
                    <td className="py-3 px-3 text-(--text-secondary) hidden md:table-cell">
                      <span>{t.description} — <strong className="text-(--text-primary)">{t.usage}</strong></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Real-World Motion Patterns */}
        <section className="space-y-4">
          <div className="border-b border-(--border-subtle) pb-2">
            <h2 className="text-lg font-bold text-(--text-primary)">
              실무 UX 모션 패턴 예시
            </h2>
            <p className="text-xs text-(--text-secondary)">
              모달, 바텀시트, 팝업 등에 사용되는 실전 인터랙션 프리셋을 클릭하여 테스트하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {MOTION_PATTERNS.map((p) => {
              const isTriggered = activePatternId === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => triggerPattern(p.id)}
                  className="p-4 bg-(--bg-secondary) border border-(--border-subtle) hover:border-(--border-strong) rounded-lg cursor-pointer transition-colors space-y-3 flex flex-col justify-between group"
                >
                  <div className="space-y-1">
                    <span className="font-semibold text-(--text-primary) group-hover:text-blue-500 transition-colors">
                      {p.title}
                    </span>
                    <p className="text-[11px] text-(--text-secondary) leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Interactive Mini Box */}
                  <div className="h-16 bg-(--bg-primary) border border-(--border-subtle) rounded flex items-center justify-center overflow-hidden">
                    <div
                      className="w-8 h-8 rounded bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center transition-all"
                      style={{
                        transform: isTriggered
                          ? p.sampleType === 'scale'
                            ? 'scale(1.2)'
                            : p.sampleType === 'slide'
                            ? 'translateY(-12px)'
                            : 'opacity(0.3)'
                          : 'scale(1) translateY(0px) opacity(1)',
                        transitionDuration: '300ms',
                        transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
                      }}
                    >
                      UI
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-(--text-muted) flex items-center justify-between">
                    <span>클릭하여 테스트</span>
                    <RotateCcw className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-(--border-subtle) py-6 text-xs text-neutral-400">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AtomDesignToken — Motion &amp; Transition Specifications</span>
          <div className="flex items-center gap-4 text-neutral-500">
            <Link href="/" className="hover:text-(--text-primary)">홈으로</Link>
            <Link href="/principles" className="hover:text-(--text-primary)">원칙</Link>
            <Link href="/tokens" className="hover:text-(--text-primary)">토큰</Link>
            <Link href="/dependencies" className="hover:text-(--text-primary)">디펜던시</Link>
            <a
              href="https://www.designtokens.org/tr/2025.10/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--text-primary) inline-flex items-center gap-1 transition-colors"
            >
              <span>W3C DTCG</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
