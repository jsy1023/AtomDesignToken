'use client';

import React from 'react';
import { useThemeEditor } from '../ThemeEditorProvider';
import { useI18n } from '@/lib/i18n';
import { Sliders, Sparkles, Box, Maximize2, Zap, Shield } from 'lucide-react';

export function TokensEditorTab() {
  const { theme, updateBorderRadius, updateButtonSpacing } = useThemeEditor();
  const { locale } = useI18n();

  const currentPy = theme.buttonSpacing?.paddingY || '8px';
  const currentPx = theme.buttonSpacing?.paddingX || '16px';

  const pyPresets = [
    { label: locale === 'ja' ? '4px (超密着)' : locale === 'en' ? '4px (Tight)' : '4px (초밀착)', value: '4px' },
    { label: locale === 'ja' ? '6px (コンパクト)' : locale === 'en' ? '6px (Compact)' : '6px (콤팩트)', value: '6px' },
    { label: locale === 'ja' ? '8px (標準)' : locale === 'en' ? '8px (Default)' : '8px (표준)', value: '8px' },
    { label: locale === 'ja' ? '10px (ミディアム)' : locale === 'en' ? '10px (Medium)' : '10px (미디엄)', value: '10px' },
    { label: locale === 'ja' ? '12px (広め)' : locale === 'en' ? '12px (Relaxed)' : '12px (여유)', value: '12px' },
    { label: locale === 'ja' ? '16px (ワイド)' : locale === 'en' ? '16px (Wide)' : '16px (와이드)', value: '16px' },
  ];

  const pxPresets = [
    { label: locale === 'ja' ? '8px (超密着)' : locale === 'en' ? '8px (Tight)' : '8px (초밀착)', value: '8px' },
    { label: locale === 'ja' ? '12px (スリム)' : locale === 'en' ? '12px (Slim)' : '12px (슬림)', value: '12px' },
    { label: locale === 'ja' ? '16px (標準)' : locale === 'en' ? '16px (Default)' : '16px (표준)', value: '16px' },
    { label: locale === 'ja' ? '20px (ミディアム)' : locale === 'en' ? '20px (Medium)' : '20px (미디엄)', value: '20px' },
    { label: locale === 'ja' ? '24px (ワイド)' : locale === 'en' ? '24px (Wide)' : '24px (와이드)', value: '24px' },
    { label: locale === 'ja' ? '32px (ラージ)' : locale === 'en' ? '32px (Large)' : '32px (라지)', value: '32px' },
  ];

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
              {locale === 'ja' ? `リアルタイム角丸: ${theme.borderRadius || '10px'}` : locale === 'en' ? `Live Radius: ${theme.borderRadius || '10px'}` : `실시간 라운딩 프리뷰: ${theme.borderRadius || '10px'}`}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Button Spacing Tokens (상하단 & 좌우) */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Sliders className="w-4 h-4 text-blue-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {locale === 'ja' ? 'ボタン余白トークン (Button Spacing)' : locale === 'en' ? 'Button Spacing Tokens' : '버튼 여백 토큰 (Button Spacing)'}
          </h3>
        </div>

        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-4">
          {/* Vertical Padding (Y) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                {locale === 'ja' ? '上下余白 (--atom-btn-py)' : locale === 'en' ? 'Vertical Padding (--atom-btn-py)' : '상하단 여백 (--atom-btn-py)'}
              </span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                {currentPy}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {pyPresets.map((p) => {
                const isSelected = currentPy === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => updateButtonSpacing('paddingY', p.value)}
                    className={`py-1.5 px-2 text-xs rounded-lg border font-medium transition-all ${
                      isSelected
                        ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Horizontal Padding (X) */}
          <div className="space-y-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                {locale === 'ja' ? '左右余白 (--atom-btn-px)' : locale === 'en' ? 'Horizontal Padding (--atom-btn-px)' : '좌우 여백 (--atom-btn-px)'}
              </span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                {currentPx}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {pxPresets.map((p) => {
                const isSelected = currentPx === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => updateButtonSpacing('paddingX', p.value)}
                    className={`py-1.5 px-2 text-xs rounded-lg border font-medium transition-all ${
                      isSelected
                        ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Button Spacing Visualizer Preview */}
          <div className="pt-2 flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800">
            <span className="text-[11px] text-neutral-500 font-mono">
              {locale === 'ja' ? `リアルタイムボタンサイズ: padding ${currentPy} ${currentPx}` : locale === 'en' ? `Live Button Size: padding ${currentPy} ${currentPx}` : `실시간 버튼 크기: padding ${currentPy} ${currentPx}`}
            </span>
            <button
              type="button"
              style={{
                padding: `${currentPy} ${currentPx}`,
                borderRadius: theme.borderRadius || '10px',
                backgroundColor: theme.color.primary || '#3182f6',
              }}
              className="text-white text-xs font-semibold shadow-xs transition-all duration-200 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{locale === 'ja' ? 'リアルタイムボタン余白プレビュー' : locale === 'en' ? 'Live Button Padding Preview' : '실시간 버튼 패딩 프리뷰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Spacing Scale Tokens */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Maximize2 className="w-4 h-4 text-purple-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {locale === 'ja' ? 'スペーシングスケールトークン (4pt Scale)' : locale === 'en' ? 'Spacing Scale Tokens (4pt Scale)' : '간격 척도 토큰 (4pt Spacing Scale)'}
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
