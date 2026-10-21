'use client';

import React, { useState } from 'react';
import { Play, Sparkles, Check, Copy, Sliders, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';

export function GuideInteractivePlayground() {
  const { theme } = useThemeEditor();
  const primaryColor = theme?.color?.primary || '#3182f6';

  const [btnState, setBtnState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [inputValue, setInputValue] = useState('');
  const [copiedClass, setCopiedClass] = useState<string | null>(null);

  const handleTestClick = () => {
    setBtnState('loading');
    setTimeout(() => {
      setBtnState('success');
      setTimeout(() => setBtnState('idle'), 2000);
    }, 800);
  };

  const copyClass = (className: string) => {
    navigator.clipboard.writeText(className);
    setCopiedClass(className);
    setTimeout(() => setCopiedClass(null), 2000);
  };

  return (
    <section className="py-14 md:py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3">
              Interactive Preview
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              표준 시멘틱 클래스 실시간 체험
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
              우측 상단 테마 에디터에서 브랜드 컬러를 바꾸면 아래 컴포넌트들에 즉시 실시간 주입됩니다.
            </p>
          </div>

          <Link
            href="/components"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            <span>전체 10대 컴포넌트 갤러리 보기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Playground Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Buttons & Badges */}
          <div className="rounded-3xl p-6 border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">버튼 및 뱃지 세트</h4>
                <button
                  onClick={() => copyClass('.atom-btn.atom-btn-primary')}
                  className="text-[10px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 flex items-center gap-1 font-mono"
                  title="클래스명 복사"
                >
                  {copiedClass === '.atom-btn.atom-btn-primary' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  .atom-btn
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="atom-badge atom-badge-primary">기본 뱃지</span>
                  <span className="atom-badge atom-badge-success">성공</span>
                  <span className="atom-badge atom-badge-warning">주의</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button 
                    onClick={handleTestClick}
                    disabled={btnState === 'loading'}
                    className="atom-btn atom-btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {btnState === 'loading' && <span className="animate-spin text-xs">⏳</span>}
                    {btnState === 'success' && <Check className="w-4 h-4 text-white" />}
                    <span>
                      {btnState === 'idle' && 'Primary 버튼 클릭해보기'}
                      {btnState === 'loading' && '처리 중...'}
                      {btnState === 'success' && '작동 성공!'}
                    </span>
                  </button>

                  <button className="atom-btn atom-btn-secondary w-full">
                    Secondary 버튼
                  </button>
                  <button className="atom-btn atom-btn-outline w-full">
                    Outline 버튼
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-neutral-400">
              클릭 시 능동적 마이크로 인터랙션 및 라운딩 자동 적용
            </div>
          </div>

          {/* Card 2: Interactive Input & Form */}
          <div className="rounded-3xl p-6 border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">인풋 & 폼 컨트롤</h4>
                <button
                  onClick={() => copyClass('.atom-input')}
                  className="text-[10px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 flex items-center gap-1 font-mono"
                  title="클래스명 복사"
                >
                  {copiedClass === '.atom-input' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  .atom-input
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    프로젝트명 입력
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="예: Toss Payments 클론"
                    className="atom-input w-full"
                  />
                </div>

                <div className="p-3 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 text-xs text-neutral-600 dark:text-neutral-300">
                  <span className="font-semibold block mb-0.5">입력된 값:</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    {inputValue || '(입력 대기 중)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-neutral-400">
              포커스 시 브랜드 컬러 링(Ring) 자동 애니메이션
            </div>
          </div>

          {/* Card 3: Interactive Card Container */}
          <div className="atom-card atom-card-interactive p-6 flex flex-col justify-between cursor-pointer group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="atom-badge atom-badge-primary text-[10px]">
                  .atom-card-interactive
                </span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>

              <h4 className="atom-title-3 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                인터랙티브 카드 컨테이너
              </h4>
              <p className="atom-body-2 text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                마우스를 올리면 부드러운 섀도우 상승과 테두리 하이라이트가 발동됩니다. 추가 CSS 코딩 없이 클래스 하나로 완성됩니다.
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-neutral-400">
              <span>호버 인터랙션 내장</span>
              <span className="font-mono text-blue-500 font-bold">Hover Me →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
