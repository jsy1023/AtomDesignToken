'use client';

import React from 'react';
import {
  Checkbox,
  Input,
  NativeSelect,
  RadioGroup,
  Slider,
  Textarea,
  TokenOption,
  TokenSelect,
} from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { StudioPreviewItemProps } from './types';

export function InputStudioPreview({
  getPaletteValue,
  b,
  statusWrapperStyle,
  isHover,
  isFocus,
  isDisabled,
  isLoading,
}: StudioPreviewItemProps) {
  let bg = getPaletteValue(b.background || '');
  let textColor = getPaletteValue(b.textColor || '');
  let borderColor = getPaletteValue(b.borderColor || '');

  if (isHover) {
    if (b.hoverBackground) bg = getPaletteValue(b.hoverBackground);
    if (b.hoverBorderColor) borderColor = getPaletteValue(b.hoverBorderColor);
  } else if (isFocus) {
    if (b.focusBackground) bg = getPaletteValue(b.focusBackground);
    if (b.focusBorderColor) borderColor = getPaletteValue(b.focusBorderColor);
  } else if (isDisabled) {
    if (b.disabledBackground) bg = getPaletteValue(b.disabledBackground);
    if (b.disabledTextColor) textColor = getPaletteValue(b.disabledTextColor);
    if (b.disabledBorderColor) borderColor = getPaletteValue(b.disabledBorderColor);
  }

  const focusOutline = isFocus
    ? `2px solid ${b.focusBorderColor ? getPaletteValue(b.focusBorderColor) : 'var(--accent-primary)'}`
    : undefined;

  return (
    <div className="w-full max-w-sm relative" style={statusWrapperStyle}>
      <Input
        type="text"
        disabled={isDisabled || isLoading}
        defaultValue="Sample Input Value"
        style={{
          backgroundColor: bg,
          color: textColor,
          border: `1px solid ${borderColor}`,
          borderRadius: getPaletteValue(b.borderRadius || ''),
          paddingLeft: getPaletteValue(b.paddingX || ''),
          paddingRight: getPaletteValue(b.paddingX || ''),
          paddingTop: getPaletteValue(b.paddingY || ''),
          paddingBottom: getPaletteValue(b.paddingY || ''),
          outline: focusOutline,
          outlineOffset: focusOutline ? '1px' : undefined,
        }}
        className="w-full text-sm outline-none font-mono"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-(--text-muted)" />
        </div>
      )}
    </div>
  );
}

export function TextareaStudioPreview({ getPaletteValue, b }: StudioPreviewItemProps) {
  return (
    <Textarea
      defaultValue="Sample multi-line textarea with dynamic radius & borders."
      rows={3}
      style={{
        backgroundColor: getPaletteValue(b.background || ''),
        border: `1px solid ${getPaletteValue(b.borderColor || '')}`,
        borderRadius: getPaletteValue(b.borderRadius || ''),
        padding: getPaletteValue(b.padding || ''),
      }}
      className="w-full max-w-sm text-sm outline-none font-mono"
    />
  );
}

export function SwitchStudioPreview({ variable, getPaletteValue, b }: StudioPreviewItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        style={{
          backgroundColor: getPaletteValue(b.activeBackground || ''),
          borderRadius: getPaletteValue(b.borderRadius || ''),
        }}
        className="w-12 h-6 p-0.5 flex items-center justify-end cursor-pointer shadow-xs transition-colors"
      >
        <div
          style={{
            backgroundColor: getPaletteValue(b.thumbColor || ''),
            borderRadius: getPaletteValue(b.borderRadius || ''),
          }}
          className="w-5 h-5 shadow-xs"
        />
      </div>
      <span className="text-xs font-semibold text-(--text-primary)">{variable?.name}</span>
    </div>
  );
}

export function CheckboxStudioPreview({ getPaletteValue, locale, b }: StudioPreviewItemProps) {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        defaultChecked
        label={locale === 'ko' ? '선택된 체크박스' : 'Checked Checkbox'}
        style={{
          accentColor: getPaletteValue(b.checkedBackground || ''),
          borderRadius: getPaletteValue(b.borderRadius || ''),
        }}
      />
      <Checkbox
        label={locale === 'ko' ? '미선택 체크박스' : 'Unchecked Checkbox'}
        style={{
          borderRadius: getPaletteValue(b.borderRadius || ''),
        }}
      />
    </div>
  );
}

export function SelectStudioPreview({ getPaletteValue, locale, b }: StudioPreviewItemProps) {
  return (
    <div className="w-full max-w-xs">
      <NativeSelect
        style={{
          backgroundColor: getPaletteValue(b.background || ''),
          border: `1px solid ${getPaletteValue(b.borderColor || '')}`,
          color: getPaletteValue(b.textColor || ''),
          borderRadius: getPaletteValue(b.borderRadius || ''),
          padding: getPaletteValue(b.padding || ''),
        }}
        className="w-full text-sm"
      >
        <option>{locale === 'ko' ? '옵션 1' : 'Option 1'}</option>
        <option>{locale === 'ko' ? '옵션 2' : 'Option 2'}</option>
        <option>{locale === 'ko' ? '옵션 3' : 'Option 3'}</option>
      </NativeSelect>
    </div>
  );
}

export function RadioStudioPreview({ variable, locale }: StudioPreviewItemProps) {
  return (
    <RadioGroup
      name={`preview-radio-${variable?.id}`}
      value="opt1"
      options={[
        { value: 'opt1', label: locale === 'ko' ? '라디오 옵션 A' : 'Radio Option A' },
        { value: 'opt2', label: locale === 'ko' ? '라디오 옵션 B' : 'Radio Option B' },
      ]}
      onChange={() => {}}
    />
  );
}

export function SliderStudioPreview() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-2">
      <div className="flex justify-between text-xs font-mono text-(--text-secondary)">
        <span>Volume</span>
        <span>65%</span>
      </div>
      <Slider value={65} onChange={() => {}} />
    </div>
  );
}

export function TokenSelectStudioPreview({
  activeTypeId,
  size,
  locale,
  statusWrapperStyle,
  isDisabled,
}: StudioPreviewItemProps) {
  const [previewTokenVal, setPreviewTokenVal] = React.useState('--atom-palette-blue-500');
  const sampleTokens: TokenOption[] = [
    { id: '--atom-palette-blue-500', name: 'Blue 500 (Primary)', value: 'var(--accent-primary)', category: 'color', family: 'blue' },
    { id: '--atom-palette-blue-600', name: 'Blue 600 (Hover)', value: 'var(--accent-primary-hover)', category: 'color', family: 'blue' },
    { id: '--atom-palette-emerald-500', name: 'Emerald 500 (Success)', value: '#10b981', category: 'color', family: 'emerald' },
    { id: '--atom-palette-rose-500', name: 'Rose 500 (Destructive)', value: '#ef4444', category: 'color', family: 'rose' },
    { id: '--atom-radius-md', name: 'Radius Medium', value: '8px', category: 'radius', family: 'radius' },
  ];
  const variantMode = activeTypeId.includes('filled')
    ? 'filled'
    : activeTypeId.includes('subtle')
    ? 'subtle'
    : 'outlined';

  return (
    <div className="w-full max-w-sm transition-all" style={statusWrapperStyle}>
      <TokenSelect
        options={sampleTokens}
        value={previewTokenVal}
        onChange={(val) => setPreviewTokenVal(val)}
        variant={variantMode}
        size={size}
        disabled={isDisabled}
        label={locale === 'ko' ? '실시간 토큰 검색' : 'Live Token Picker'}
      />
    </div>
  );
}
