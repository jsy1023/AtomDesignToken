'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Button,
  Input,
  Badge,
} from '@/components/ui';
import {
  Palette,
  Sparkles,
  Check,
  Plus,
  Copy,
  Sliders,
  ShieldCheck,
  RefreshCw,
  X,
} from 'lucide-react';
import {
  generateColorPalette50to900,
  GeneratedPaletteResult,
  PaletteScaleStepNumber,
  PALETTE_SCALE_STEPS,
} from '@/lib/services/paletteGenerator';
import { PaletteVariable } from '@/lib/data/studioData';

export interface PaletteScaleGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddScale: (newVariables: PaletteVariable[], family: string) => void;
  existingFamilies?: string[];
  locale?: string;
}

const PRESET_ANCHORS = [
  { name: '인디고', hex: '#6366f1', family: 'indigo' },
  { name: '오렌지', hex: '#f97316', family: 'orange' },
  { name: '시안', hex: '#06b6d4', family: 'cyan' },
  { name: '퍼플', hex: '#a855f7', family: 'purple' },
  { name: '핑크', hex: '#ec4899', family: 'pink' },
  { name: '틸(Teal)', hex: '#14b8a6', family: 'teal' },
  { name: '라임', hex: '#84cc16', family: 'lime' },
];

export const PaletteScaleGeneratorModal: React.FC<PaletteScaleGeneratorModalProps> = ({
  isOpen,
  onClose,
  onAddScale,
  existingFamilies = [],
  locale = 'ko',
}) => {
  const [baseHex, setBaseHex] = useState('#6366f1');
  const [familyName, setFamilyName] = useState('indigo');
  const [anchorStepOverride, setAnchorStepOverride] = useState<PaletteScaleStepNumber | null>(null);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Generate 50 ~ 900 scale dynamically with intelligent anchor placement
  const result: GeneratedPaletteResult = useMemo(() => {
    return generateColorPalette50to900(baseHex, familyName, anchorStepOverride || undefined);
  }, [baseHex, familyName, anchorStepOverride]);

  if (!isOpen) return null;

  const handleCopyHex = (hex: string, step: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 1500);
  };

  const handleApply = () => {
    onAddScale(result.paletteVariables, result.family);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-2xl p-6 flex flex-col gap-5 my-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3.5">
          <div>
            <h3 className="font-bold text-base text-(--text-primary) flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-(--accent-primary)" />
              <span>{locale === 'ko' ? '50~900 자동 컬러 팔레트 생성기' : 'Color Palette 50-900 Generator'}</span>
            </h3>
            <p className="text-xs text-(--text-secondary) mt-0.5">
              {locale === 'ko'
                ? '하나의 단일 색상을 입력하면 W3C DTCG 표준 10단계(50~900) 계층 팔레트를 시각적 인지 명도 곡선에 맞춰 자동 연산합니다.'
                : 'Input a single color to automatically generate a perceptual 10-step scale (50-900).'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            isIconOnly
            onClick={onClose}
            className="text-(--text-muted) hover:text-(--text-primary)"
            aria-label="닫기"
          >
            ✕
          </Button>
        </div>

        {/* Base Input & Family Name Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-(--radius-sm) bg-(--bg-secondary)/40 border border-(--border-subtle)">
          {/* Base Color Input & Dynamic Anchor Step */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-(--text-primary)">
                {locale === 'ko' ? '기준 베이스 색상 (Base Color)' : 'Base Color'}
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-bold border border-(--accent-primary)/20">
                  {result.anchorStep} ANCHOR {anchorStepOverride ? '(수동 지정)' : '(명도 자동 판별)'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                style={{ backgroundColor: result.baseHex }}
                className="w-8 h-8 rounded border border-(--border-subtle) shrink-0 shadow-xs"
                title={result.baseHex}
              />
              <Input
                value={baseHex}
                onChange={(e) => {
                  setBaseHex(e.target.value);
                  setAnchorStepOverride(null);
                }}
                placeholder="var(--accent-primary)"
                className="font-mono text-xs"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1 pt-0.5">
              <span className="text-[10px] text-(--text-muted) mr-1">추천:</span>
              {PRESET_ANCHORS.map((preset) => (
                <span
                  key={preset.hex}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setBaseHex(preset.hex);
                    setFamilyName(preset.family);
                    setAnchorStepOverride(null);
                  }}
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded cursor-pointer transition border border-(--border-subtle) bg-(--bg-primary) hover:border-(--accent-primary) flex items-center gap-1"
                >
                  <span
                    style={{ backgroundColor: preset.hex }}
                    className="w-2 h-2 rounded-full inline-block"
                  />
                  <span>{preset.name}</span>
                </span>
              ))}
            </div>

            {/* Anchor Step Selector Bar (50 ~ 900) */}
            <div className="pt-2 border-t border-(--border-subtle)/60 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-(--text-secondary) font-semibold flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-(--accent-primary)" />
                  <span>{locale === 'ko' ? '기준 색상 배치 계층 (Anchor Step)' : 'Base Anchor Step'}</span>
                </span>
                <span className="text-[10px] font-mono text-(--text-muted)">
                  명도 {Math.round(result.baseLightness)}% ➔ 추천: <strong className="text-(--accent-primary)">{result.detectedAnchorStep}</strong>
                </span>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
                {PALETTE_SCALE_STEPS.map((step) => {
                  const isCurrentAnchor = result.anchorStep === step;
                  const isAutoDetected = result.detectedAnchorStep === step;
                  return (
                    <Button
                      key={step}
                      variant={isCurrentAnchor ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setAnchorStepOverride(step)}
                      className={`text-[10px] font-mono py-1 px-0.5 h-auto relative ${
                        isCurrentAnchor
                          ? 'bg-(--accent-primary) text-(--bg-primary) font-bold shadow-2xs'
                          : 'text-(--text-secondary) bg-(--bg-primary) hover:bg-(--bg-secondary) border border-(--border-subtle)'
                      }`}
                      title={`${step} 단계에 기준 색상 고정${isAutoDetected ? ' (명도 기준 자동 추천 계층)' : ''}`}
                    >
                      <span>{step}</span>
                      {isAutoDetected && !isCurrentAnchor && (
                        <span className="absolute -top-1 -right-0.5 w-1.5 h-1.5 rounded-full bg-(--accent-primary)" title="명도 기반 추천" />
                      )}
                    </Button>
                  );
                })}
              </div>
              {anchorStepOverride && (
                <div className="flex justify-end pt-0.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAnchorStepOverride(null)}
                    className="text-[10px] text-(--accent-primary) h-auto py-0.5 px-1 hover:underline"
                  >
                    <RefreshCw className="w-2.5 h-2.5 mr-1" />
                    <span>{locale === 'ko' ? '명도 기반 자동 감지로 리셋' : 'Reset to auto-detect'}</span>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Color Family Name Input */}
          <div className="space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--text-primary)">
                {locale === 'ko' ? '팔레트 그룹 식별자 (Family Name)' : 'Family Identifier'}
              </label>
              <Input
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                placeholder="예: indigo, teal, brand"
                className="font-mono text-xs"
              />
              <p className="text-[10px] text-(--text-muted)">
                생성되는 CSS 변수 접두사: <code className="font-mono text-(--accent-primary)">--atom-palette-{result.family}-*</code>
              </p>
            </div>

            {/* Smart Perception Information Box */}
            <div className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) text-[11px] space-y-1 text-(--text-secondary)">
              <div className="font-semibold text-(--text-primary) flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-(--accent-primary)" />
                <span>{locale === 'ko' ? '지능형 명도 분석 결과' : 'Perceptual Lightness Analysis'}</span>
              </div>
              <p className="text-[10px] text-(--text-muted) leading-relaxed">
                {locale === 'ko'
                  ? `기준 색상(#${result.baseHex.replace('#', '')})의 명도가 ${Math.round(result.baseLightness)}%로 판별되어 ${result.anchorStep} 계층에 배치되었습니다. 50부터 900까지 명도가 역전 없이 완벽하게 단조 감소합니다.`
                  : `Base color has ${Math.round(result.baseLightness)}% lightness, optimally anchored at step ${result.anchorStep}.`}
              </p>
            </div>
          </div>
        </div>

        {/* 10-Step Scale Visualizer Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-(--text-primary)">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-(--accent-primary)" />
              <span>{locale === 'ko' ? '자동 생성된 10단계 계층 팔레트' : 'Generated 10-Step Hierarchy'}</span>
            </span>
            <span className="font-mono text-[11px] text-(--text-muted)">
              {result.steps.length} {locale === 'ko' ? '단계 완료' : 'steps'}
            </span>
          </div>

          {/* Responsive Swatch Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {result.steps.map((st) => {
              const isCopied = copiedStep === st.step;
              return (
                <div
                  key={st.step}
                  onClick={() => handleCopyHex(st.value, st.step)}
                  className={`p-2 rounded-(--radius-sm) border border-(--border-subtle) bg-(--bg-primary) flex flex-col gap-1.5 cursor-pointer hover:border-(--accent-primary) hover:shadow-xs transition select-none ${
                    st.isBaseAnchor ? 'ring-2 ring-(--accent-primary) ring-offset-1' : ''
                  }`}
                  title={`${st.name} (${st.value}) - 클릭하여 HEX 복사`}
                >
                  {/* Swatch Box */}
                  <div
                    style={{ backgroundColor: st.value }}
                    className="w-full h-12 rounded border border-black/10 flex flex-col items-center justify-center shadow-inner relative"
                  >
                    <span
                      style={{ color: st.bestTextColor }}
                      className="font-mono text-[11px] font-bold"
                    >
                      {st.step}
                    </span>
                    {st.isBaseAnchor && (
                      <span className="absolute bottom-1 text-[8px] uppercase tracking-tighter px-1 py-0.2 rounded bg-black/75 text-white font-mono font-bold shadow-2xs">
                        BASE
                      </span>
                    )}
                  </div>

                  {/* Hex & Copy */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-(--text-primary) font-semibold truncate">
                      {st.value}
                    </span>
                    {isCopied ? (
                      <Check className="w-3 h-3 text-(--atom-color-success) shrink-0" />
                    ) : (
                      <Copy className="w-3 h-3 text-(--text-muted) opacity-60 hover:opacity-100 shrink-0" />
                    )}
                  </div>

                  {/* Contrast ratio */}
                  <div className="text-[9px] font-mono text-(--text-muted) flex items-center justify-between pt-0.5 border-t border-(--border-subtle)/50">
                    <span>명도비</span>
                    <span className="font-semibold">{st.contrastRatioWithWhite}:1</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scale Details Summary Table */}
        <div className="p-3 rounded-(--radius-sm) bg-(--bg-secondary)/30 border border-(--border-subtle) text-xs space-y-1.5">
          <span className="font-bold text-[11px] text-(--text-secondary) uppercase tracking-wider block">
            {locale === 'ko' ? '등록될 CSS 토큰 식별자 미리보기' : 'Generated CSS Variable Aliases'}
          </span>
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
            {result.steps.map((st) => (
              <span
                key={st.id}
                className={`px-2 py-0.5 rounded border ${
                  st.isBaseAnchor
                    ? 'bg-(--accent-primary)/10 text-(--accent-primary) border-(--accent-primary)/40 font-bold'
                    : 'bg-(--bg-primary) border-(--border-subtle) text-(--text-secondary)'
                }`}
              >
                var({st.id}) <span className="opacity-75">[{st.value}]</span>
                {st.isBaseAnchor && <span className="ml-1 text-[9px] uppercase font-bold text-(--accent-primary)">★BASE</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-(--border-subtle)">
          <Button variant="secondary" size="sm" onClick={onClose}>
            {locale === 'ko' ? '취소' : 'Cancel'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleApply}
            className="flex items-center gap-1.5 bg-(--accent-primary) text-(--bg-primary) font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>
              {locale === 'ko'
                ? `'${result.family}' 10단계 팔레트 토큰에 일괄 추가`
                : `Add '${result.family}' 10-step scale to palette`}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
