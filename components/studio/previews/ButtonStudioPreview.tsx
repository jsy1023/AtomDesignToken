'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { formatLocaleText } from '@/lib/utils/localeFormat';
import { StudioPreviewItemProps } from './types';

export function ButtonStudioPreview({
  variable,
  type,
  activeTypeId,
  size,
  iconSlot,
  getPaletteValue,
  locale,
  b,
  statusWrapperStyle,
  isHover,
  isActive,
  isFocus,
  isDisabled,
  isLoading,
}: StudioPreviewItemProps) {
  const typeId = activeTypeId;
  const themeColor = getPaletteValue(b.background || '--atom-color-primary');
  let bg = getPaletteValue(b.background || '');
  let textColor = getPaletteValue(b.textColor || '');
  let borderColor = getPaletteValue(b.borderColor || '');
  let borderRadius = getPaletteValue(b.borderRadius || '');
  const borderStyle = 'solid';
  let borderWidth = '1px';
  let boxShadow = 'var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.05))';
  let backdropFilter: string | undefined = undefined;
  let textDecoration: string | undefined = undefined;
  const backgroundImage: string | undefined = undefined;

  if (typeId.includes('pill')) {
    borderRadius = '9999px';
  } else if (typeId.includes('outline')) {
    if (!isHover && !isActive) bg = 'transparent';
    borderColor = themeColor;
    textColor = themeColor;
    borderWidth = '1.5px';
    if (isHover) {
      bg = `color-mix(in srgb, ${themeColor} 12%, transparent)`;
      textColor = themeColor;
    } else if (isActive) {
      bg = `color-mix(in srgb, ${themeColor} 20%, transparent)`;
      textColor = themeColor;
    }
  } else if (typeId.includes('ghost')) {
    if (!isHover && !isActive) {
      bg = 'transparent';
      borderColor = 'transparent';
    }
    textColor = themeColor;
    borderColor = 'transparent';
    boxShadow = 'none';
    if (isHover) {
      bg = `color-mix(in srgb, ${themeColor} 12%, transparent)`;
      textColor = themeColor;
    } else if (isActive) {
      bg = `color-mix(in srgb, ${themeColor} 20%, transparent)`;
      textColor = themeColor;
    }
  } else if (typeId.includes('soft')) {
    bg = `color-mix(in srgb, ${themeColor} 12%, transparent)`;
    borderColor = 'transparent';
    textColor = themeColor;
    boxShadow = 'none';
    if (isHover) {
      bg = `color-mix(in srgb, ${themeColor} 22%, transparent)`;
      textColor = themeColor;
    } else if (isActive) {
      bg = `color-mix(in srgb, ${themeColor} 30%, transparent)`;
      textColor = themeColor;
    }
  } else if (typeId.includes('elevated')) {
    boxShadow = isHover
      ? '0 10px 25px -3px rgba(0, 0, 0, 0.18), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      : '0 4px 14px 0 rgba(0, 0, 0, 0.12)';
  } else if (typeId.includes('glassmorphic') || typeId.includes('glass')) {
    bg = isHover
      ? `color-mix(in srgb, ${themeColor} 18%, rgba(255, 255, 255, 0.4))`
      : `color-mix(in srgb, ${themeColor} 10%, rgba(255, 255, 255, 0.25))`;
    backdropFilter = 'blur(12px)';
    borderColor = `color-mix(in srgb, ${themeColor} 35%, transparent)`;
    boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.08)';
    textColor = themeColor;
  } else if (typeId.includes('link')) {
    bg = 'transparent';
    borderColor = 'transparent';
    boxShadow = 'none';
    textColor = themeColor;
    textDecoration = isHover ? 'underline' : 'none';
  } else if (typeId.includes('neumorphic')) {
    bg = 'var(--bg-secondary, #f3f4f6)';
    textColor = themeColor;
    borderColor = 'transparent';
    boxShadow = isActive
      ? 'inset 3px 3px 6px rgba(0,0,0,0.18), inset -3px -3px 6px rgba(255,255,255,0.7)'
      : '5px 5px 12px rgba(0,0,0,0.08), -5px -5px 12px rgba(255,255,255,0.8)';
  } else if (typeId.includes('floating-action') || typeId.includes('fab')) {
    borderRadius = '9999px';
    boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
  }

  if (isHover) {
    if (
      b.hoverBackground &&
      !typeId.includes('outline') &&
      !typeId.includes('ghost') &&
      !typeId.includes('soft') &&
      !typeId.includes('link') &&
      !typeId.includes('glassmorphic') &&
      !typeId.includes('neumorphic')
    ) {
      bg = getPaletteValue(b.hoverBackground);
    }
    if (
      b.hoverTextColor &&
      !typeId.includes('outline') &&
      !typeId.includes('ghost') &&
      !typeId.includes('soft') &&
      !typeId.includes('link') &&
      !typeId.includes('glassmorphic') &&
      !typeId.includes('neumorphic')
    ) {
      textColor = getPaletteValue(b.hoverTextColor);
    }
    if (b.hoverBorderColor) borderColor = getPaletteValue(b.hoverBorderColor);
  } else if (isActive) {
    if (
      b.activeBackground &&
      !typeId.includes('outline') &&
      !typeId.includes('ghost') &&
      !typeId.includes('soft') &&
      !typeId.includes('link') &&
      !typeId.includes('glassmorphic') &&
      !typeId.includes('neumorphic')
    ) {
      bg = getPaletteValue(b.activeBackground);
    }
    if (
      b.activeTextColor &&
      !typeId.includes('outline') &&
      !typeId.includes('ghost') &&
      !typeId.includes('soft') &&
      !typeId.includes('link') &&
      !typeId.includes('glassmorphic') &&
      !typeId.includes('neumorphic')
    ) {
      textColor = getPaletteValue(b.activeTextColor);
    }
    if (b.activeBorderColor) borderColor = getPaletteValue(b.activeBorderColor);
  } else if (isFocus) {
    if (b.focusBackground) bg = getPaletteValue(b.focusBackground);
    if (b.focusBorderColor) borderColor = getPaletteValue(b.focusBorderColor);
  } else if (isDisabled) {
    if (b.disabledBackground) bg = getPaletteValue(b.disabledBackground);
    if (b.disabledTextColor) textColor = getPaletteValue(b.disabledTextColor);
    if (b.disabledBorderColor) borderColor = getPaletteValue(b.disabledBorderColor);
  }

  let padX = getPaletteValue(b.paddingX || '--atom-space-4');
  let padY = getPaletteValue(b.paddingY || '--atom-space-2');
  let fontSize = '14px';
  let iconClass = 'w-4 h-4 shrink-0';

  if (size === 'sm') {
    padX = '10px';
    padY = '6px';
    fontSize = '12px';
    iconClass = 'w-3.5 h-3.5 shrink-0';
  } else if (size === 'lg') {
    padX = '24px';
    padY = '12px';
    fontSize = '16px';
    iconClass = 'w-5 h-5 shrink-0';
  }

  if (typeId.includes('link')) {
    padX = '0px';
  }

  const isFab = typeId.includes('floating-action') || typeId.includes('fab');
  if (isFab) {
    padX = size === 'sm' ? '10px' : size === 'lg' ? '18px' : '14px';
    padY = padX;
  }

  const focusOutline = isFocus
    ? `2px solid ${b.focusBorderColor ? getPaletteValue(b.focusBorderColor) : 'var(--accent-primary)'}`
    : undefined;

  const labelText = isLoading
    ? locale === 'ko'
      ? '로딩 중...'
      : 'Loading...'
    : formatLocaleText(variable?.name, locale) || (locale === 'ko' ? '버튼' : 'Button');

  return (
    <Button
      componentType={type?.id || activeTypeId}
      variable={variable?.id}
      disabled={isDisabled || isLoading}
      data-token-bg={b.background}
      data-token-text={b.textColor}
      data-token-border={b.borderColor}
      data-token-radius={b.borderRadius}
      data-token-px={b.paddingX}
      data-token-py={b.paddingY}
      style={{
        backgroundColor: bg,
        backgroundImage,
        color: textColor,
        border: `${borderWidth} ${borderStyle} ${borderColor}`,
        borderRadius,
        paddingLeft: padX,
        paddingRight: padX,
        paddingTop: padY,
        paddingBottom: padY,
        fontSize,
        outline: focusOutline,
        outlineOffset: focusOutline ? '2px' : undefined,
        boxShadow,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        textDecoration,
        ...statusWrapperStyle,
      }}
      className={`font-medium transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${
        isFab ? 'rounded-full aspect-square' : ''
      }`}
    >
      {isLoading && <Loader2 className={`${iconClass} animate-spin`} />}
      {!isLoading && (iconSlot === 'left' || (isFab && iconSlot === 'none')) && (
        <Sparkles className={iconClass} />
      )}
      {iconSlot !== 'icon-only' && !isFab && <span>{labelText}</span>}
      {!isLoading && iconSlot === 'right' && <ArrowRight className={iconClass} />}
      {!isLoading && iconSlot === 'icon-only' && !isFab && <Sparkles className={iconClass} />}
    </Button>
  );
}
