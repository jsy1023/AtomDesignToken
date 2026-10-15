'use client';

import React from 'react';
import { useThemeEditor } from '../ThemeEditorProvider';
import { COLOR_PRESETS, ColorConfig } from '@/lib/data/themeEditorDefaults';
import { Sparkles, Palette, Layers } from 'lucide-react';

interface ColorFieldProps {
  label: string;
  fieldKey: keyof ColorConfig;
  value: string;
  description?: string;
  onChange: (key: keyof ColorConfig, val: string) => void;
}

function ColorField({ label, fieldKey, value, description, onChange }: ColorFieldProps) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 hover:bg-neutral-50 dark:hover:bg-neutral-800/70 transition-colors">
      <div className="flex flex-col pr-2 min-w-0">
        <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">
          {label}
        </span>
        {description && (
          <span className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">
            {description}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className="w-20 px-2 py-1 text-xs font-mono font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
        />
        <label className="relative w-8 h-8 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-600 shadow-xs cursor-pointer shrink-0">
          <input
            type="color"
            value={value.startsWith('#') ? value : '#3182f6'}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0"
          />
        </label>
      </div>
    </div>
  );
}

export function ColorEditorTab() {
  const { theme, updateColor, updateBorderRadius, applyColorPreset } = useThemeEditor();

  const radiusOptions = ['0px', '6px', '10px', '14px', '20px', '9999px'];

  return (
    <div className="space-y-6">
      {/* 1. Quick Presets */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            브랜드 추천 프리셋
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {COLOR_PRESETS.map((preset) => {
            const isSelected = theme.color.primary === preset.colors.primary;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyColorPreset(preset)}
                className={`p-2.5 text-left rounded-xl border transition-all text-xs flex flex-col gap-1.5 ${
                  isSelected
                    ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-800 dark:text-neutral-100 truncate">
                    {preset.name.split(' ')[0]}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-xs border border-white/40"
                      style={{ backgroundColor: preset.colors.primary }}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-xs border border-white/40"
                      style={{ backgroundColor: preset.colors.primaryLight }}
                    />
                  </div>
                </div>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 line-clamp-1">
                  {preset.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Brand Accent Colors */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Palette className="w-4 h-4 text-blue-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            브랜드 액센트 (Brand Accent)
          </h3>
        </div>
        <div className="space-y-2">
          <ColorField
            label="Primary Brand Color"
            fieldKey="primary"
            value={theme.color.primary}
            description="메인 CTA 버튼, 활성 탭, 강조 텍스트"
            onChange={updateColor}
          />
          <ColorField
            label="Primary Hover"
            fieldKey="primaryHover"
            value={theme.color.primaryHover}
            description="마우스 호버 시 딥 톤"
            onChange={updateColor}
          />
          <ColorField
            label="Primary Subtle / Light"
            fieldKey="primaryLight"
            value={theme.color.primaryLight}
            description="배지 배경, 활성 아이템 하이라이트"
            onChange={updateColor}
          />
        </div>
      </div>

      {/* 3. Surface & Background */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Layers className="w-4 h-4 text-emerald-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            배경 및 표면 (Surface)
          </h3>
        </div>
        <div className="space-y-2">
          <ColorField
            label="Background Primary"
            fieldKey="bgPrimary"
            value={theme.color.bgPrimary}
            description="최상위 페이지 기본 배경색"
            onChange={updateColor}
          />
          <ColorField
            label="Background Secondary"
            fieldKey="bgSecondary"
            value={theme.color.bgSecondary}
            description="카드 및 서브 컨테이너 표면색"
            onChange={updateColor}
          />
        </div>
      </div>

      {/* 4. Text & Border */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            텍스트 & 테두리 (Text & Border)
          </h3>
        </div>
        <div className="space-y-2">
          <ColorField
            label="Text Primary"
            fieldKey="textPrimary"
            value={theme.color.textPrimary}
            description="주요 제목 및 헤드라인"
            onChange={updateColor}
          />
          <ColorField
            label="Text Secondary"
            fieldKey="textSecondary"
            value={theme.color.textSecondary}
            description="본문 서술 텍스트 및 레이블"
            onChange={updateColor}
          />
          <ColorField
            label="Text Muted"
            fieldKey="textMuted"
            value={theme.color.textMuted}
            description="비활성 및 캡션 텍스트"
            onChange={updateColor}
          />
          <ColorField
            label="Border Subtle"
            fieldKey="borderSubtle"
            value={theme.color.borderSubtle}
            description="부드러운 카드 구분선"
            onChange={updateColor}
          />
          <ColorField
            label="Border Strong"
            fieldKey="borderStrong"
            value={theme.color.borderStrong}
            description="인풋 아웃라인 및 버튼 테두리"
            onChange={updateColor}
          />
        </div>
      </div>

      {/* 5. Border Radius */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            모서리 둥글기 (Border Radius)
          </h3>
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            {theme.borderRadius}
          </span>
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {radiusOptions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => updateBorderRadius(r)}
              className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                theme.borderRadius === r
                  ? 'border-blue-600 bg-blue-600 text-white font-bold'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
              }`}
            >
              {r === '9999px' ? 'Full' : r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
