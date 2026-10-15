'use client';

import React, { useState } from 'react';
import { useThemeEditor } from '../ThemeEditorProvider';
import {
  TypographyConfig,
  TypographyLevelConfig,
  FONT_FAMILY_PRESETS,
} from '@/lib/data/themeEditorDefaults';
import { Type, Sliders, Eye } from 'lucide-react';

type LevelKey = keyof Omit<TypographyConfig, 'fontFamily'>;

const LEVEL_METADATA: Record<
  LevelKey,
  { label: string; tag: string; defaultSample: string; minSize: number; maxSize: number }
> = {
  h1: {
    label: 'Heading 1',
    tag: 'h1',
    defaultSample: '제목 1: 피그마 해방, 말로 디자인하는 시대',
    minSize: 24,
    maxSize: 64,
  },
  h2: {
    label: 'Heading 2',
    tag: 'h2',
    defaultSample: '제목 2: 원클릭 토큰 시스템 아키텍처',
    minSize: 20,
    maxSize: 48,
  },
  h3: {
    label: 'Heading 3',
    tag: 'h3',
    defaultSample: '제목 3: W3C 표준 DTCG 토큰 호환',
    minSize: 16,
    maxSize: 36,
  },
  h4: {
    label: 'Heading 4',
    tag: 'h4',
    defaultSample: '제목 4: 컴포넌트 갤러리 및 패턴 카탈로그',
    minSize: 14,
    maxSize: 28,
  },
  h5: {
    label: 'Heading 5',
    tag: 'h5',
    defaultSample: '제목 5: 프레임워크 무관한 CSS 변수',
    minSize: 12,
    maxSize: 24,
  },
  h6: {
    label: 'Heading 6',
    tag: 'h6',
    defaultSample: '제목 6: 서브 레이블 및 보조 헤더',
    minSize: 11,
    maxSize: 20,
  },
  body: {
    label: 'Body (본문)',
    tag: 'body',
    defaultSample: '모든 디자이너와 프론트엔드 개발자가 일관된 토큰 규격으로 빠르고 정교한 UI를 빌드할 수 있습니다.',
    minSize: 12,
    maxSize: 20,
  },
  sm: {
    label: 'Small (스몰 텍스트)',
    tag: 'sm',
    defaultSample: '보조 정보, 메타데이터, 타임스탬프 또는 부가 설명 텍스트입니다.',
    minSize: 10,
    maxSize: 16,
  },
  xs: {
    label: 'Micro (초소형 텍스트)',
    tag: 'xs',
    defaultSample: 'CAPTION / 뱃지 / 툴팁 마이크로 텍스트',
    minSize: 9,
    maxSize: 14,
  },
};

const WEIGHT_OPTIONS = [
  { label: '400 Regular', value: 400 },
  { label: '500 Medium', value: 500 },
  { label: '600 SemiBold', value: 600 },
  { label: '700 Bold', value: 700 },
  { label: '800 ExtraBold', value: 800 },
  { label: '900 Black', value: 900 },
];

export function TypographyEditorTab() {
  const { theme, updateTypographyLevel, updateFontFamily } = useThemeEditor();
  const [selectedLevel, setSelectedLevel] = useState<LevelKey>('h1');

  const currentLevelConfig = theme.typography[selectedLevel];
  const currentMeta = LEVEL_METADATA[selectedLevel];

  const levels: LevelKey[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'sm', 'xs'];

  return (
    <div className="space-y-6">
      {/* 1. Font Family Selector */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Type className="w-4 h-4 text-blue-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            글꼴 서체 (Font Family)
          </h3>
        </div>
        <select
          value={theme.typography.fontFamily}
          onChange={(e) => updateFontFamily(e.target.value)}
          className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {FONT_FAMILY_PRESETS.map((font) => (
            <option key={font.name} value={font.value}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Level Selector Chips */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            편집 대상 텍스트 태그
          </h3>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
            {currentMeta.label}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl;
            const size = theme.typography[lvl].fontSize;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`py-2 px-1 text-center rounded-xl border transition-all flex flex-col items-center gap-0.5 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                }`}
              >
                <span className="text-xs uppercase">{lvl}</span>
                <span className="text-[10px] opacity-75 font-mono">{size}px</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Level Detail Controls */}
      <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-850/60 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-neutral-500" />
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              {currentMeta.label} ({currentMeta.tag.toUpperCase()}) 스타일 설정
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-mono">
            {currentLevelConfig.fontSize}px / {currentLevelConfig.lineHeight} / w{currentLevelConfig.fontWeight}
          </span>
        </div>

        {/* Font Size */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-neutral-600 dark:text-neutral-400 font-medium">크기 (Font Size)</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={8}
                max={96}
                value={currentLevelConfig.fontSize}
                onChange={(e) =>
                  updateTypographyLevel(selectedLevel, 'fontSize', Number(e.target.value) || 12)
                }
                className="w-14 px-1.5 py-0.5 text-right font-mono text-xs rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
              />
              <span className="text-neutral-400 text-xs">px</span>
            </div>
          </div>
          <input
            type="range"
            min={currentMeta.minSize}
            max={currentMeta.maxSize}
            step={1}
            value={currentLevelConfig.fontSize}
            onChange={(e) =>
              updateTypographyLevel(selectedLevel, 'fontSize', Number(e.target.value))
            }
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Line Height */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-neutral-600 dark:text-neutral-400 font-medium">행간 (Line Height)</span>
            <span className="font-mono text-xs text-neutral-800 dark:text-neutral-200">
              {currentLevelConfig.lineHeight}
            </span>
          </div>
          <input
            type="range"
            min={1.0}
            max={2.2}
            step={0.05}
            value={currentLevelConfig.lineHeight}
            onChange={(e) =>
              updateTypographyLevel(selectedLevel, 'lineHeight', parseFloat(e.target.value))
            }
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Font Weight */}
        <div>
          <span className="block text-xs text-neutral-600 dark:text-neutral-400 font-medium mb-1.5">
            굵기 (Font Weight)
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {WEIGHT_OPTIONS.map((w) => (
              <button
                key={w.value}
                type="button"
                onClick={() => updateTypographyLevel(selectedLevel, 'fontWeight', w.value)}
                className={`py-1.5 px-2 text-[11px] rounded-lg border transition-all text-center ${
                  currentLevelConfig.fontWeight === w.value
                    ? 'border-blue-600 bg-blue-600 text-white font-bold'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                }`}
              >
                {w.label.split(' ')[0]} ({w.value})
              </button>
            ))}
          </div>
        </div>

        {/* Letter Spacing */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-neutral-600 dark:text-neutral-400 font-medium">자간 (Letter Spacing)</span>
            <span className="font-mono text-xs text-neutral-800 dark:text-neutral-200">
              {currentLevelConfig.letterSpacing}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {['-0.03em', '-0.02em', '-0.01em', '0em', '0.02em'].map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => updateTypographyLevel(selectedLevel, 'letterSpacing', sp)}
                className={`py-1 text-[11px] font-mono rounded-lg border transition-all ${
                  currentLevelConfig.letterSpacing === sp
                    ? 'border-blue-600 bg-blue-600 text-white font-bold'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Live Sample Box */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Eye className="w-4 h-4 text-emerald-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            실시간 렌더링 미리보기
          </h3>
        </div>
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
          <div
            style={{
              fontFamily: theme.typography.fontFamily,
              fontSize: `${currentLevelConfig.fontSize}px`,
              lineHeight: currentLevelConfig.lineHeight,
              fontWeight: currentLevelConfig.fontWeight,
              letterSpacing: currentLevelConfig.letterSpacing,
              color: theme.color.textPrimary,
            }}
            className="transition-all break-words"
          >
            {currentMeta.defaultSample}
          </div>
        </div>
      </div>
    </div>
  );
}
