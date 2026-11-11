'use client';

import React from 'react';
import { useThemeEditor } from '../ThemeEditorProvider';
import { Sliders, Sparkles, Box, Maximize2, Zap, Shield } from 'lucide-react';

export function TokensEditorTab() {
  const { theme, updateBorderRadius } = useThemeEditor();

  const radiusPresets = [
    { label: 'None (플랫)', value: '0px' },
    { label: 'SM (6px)', value: '6px' },
    { label: 'MD (10px)', value: '10px' },
    { label: 'LG (14px)', value: '14px' },
    { label: 'XL (20px)', value: '20px' },
    { label: 'Full (알약형)', value: '9999px' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Border Radius Tokens */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Box className="w-4 h-4 text-blue-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            곡률 토큰 (Border Radius)
          </h3>
        </div>

        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              기본 컴포넌트 곡률 (--atom-radius-md)
            </span>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
              {theme.borderRadius || '10px'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {radiusPresets.map((r) => {
              const isSelected = (theme.borderRadius || '10px') === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => updateBorderRadius(r.value)}
                  className={`py-2 px-2.5 text-xs rounded-lg border font-medium transition-all ${
                    isSelected
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Radius Visualizer Preview */}
          <div className="pt-2 flex items-center justify-center">
            <div
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold transition-all duration-200 shadow-sm"
              style={{ borderRadius: theme.borderRadius || '10px' }}
            >
              실시간 라운딩 프리뷰: {theme.borderRadius || '10px'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Spacing Scale Tokens */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Maximize2 className="w-4 h-4 text-purple-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            간격 척도 토큰 (4pt Spacing Scale)
          </h3>
        </div>

        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2 text-xs">
          {[
            { token: '--atom-space-1', px: '4px', desc: '초소형 패딩, 칩 여백' },
            { token: '--atom-space-2', px: '8px', desc: '버튼 내부 아이콘 간격' },
            { token: '--atom-space-3', px: '12px', desc: '인풋 필드 Y축 패딩' },
            { token: '--atom-space-4', px: '16px', desc: '기본 카드 패딩 & 컨테이너 간격' },
            { token: '--atom-space-6', px: '24px', desc: '섹션 그리드 갭 (Gap)' },
          ].map((s) => (
            <div
              key={s.token}
              className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
            >
              <div className="flex items-center gap-2">
                <div
                  className="bg-purple-500/20 border border-purple-500/40 rounded-xs shrink-0"
                  style={{ width: s.px, height: '16px' }}
                />
                <span className="font-mono text-neutral-700 dark:text-neutral-300 font-semibold">
                  {s.token}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-neutral-400">{s.desc}</span>
                <span className="font-mono font-bold text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                  {s.px}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Shadow Elevation Tokens */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Shield className="w-4 h-4 text-emerald-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            그림자 엘리베이션 토큰 (Elevation Shadows)
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { name: 'Shadow SM', class: 'shadow-xs', desc: '일반 카드' },
            { name: 'Shadow MD', class: 'shadow-md', desc: '호버 & 드롭다운' },
            { name: 'Shadow LG', class: 'shadow-xl', desc: '모달 & 팝오버' },
          ].map((sh) => (
            <div
              key={sh.name}
              className={`p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-center ${sh.class}`}
            >
              <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{sh.name}</div>
              <div className="text-[10px] text-neutral-400 mt-0.5">{sh.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
