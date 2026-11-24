'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import {
  ComponentInteractiveStatus,
  ComponentTypeSpec,
  ComponentVariable,
} from '@/lib/data/studioData';
import {
  computeStatusWrapperStyle,
  resolveStudioPreviewRenderer,
} from './previews';

export interface StudioLivePreviewProps {
  componentId: string;
  variable: ComponentVariable;
  type?: ComponentTypeSpec;
  typeId?: string;
  size?: 'sm' | 'md' | 'lg';
  iconSlot?: 'none' | 'left' | 'right' | 'icon-only';
  getPaletteValue: (paletteId: string) => string;
  status?: ComponentInteractiveStatus;
}

export function StudioLivePreview({
  componentId,
  variable,
  type,
  typeId: typeIdProp,
  size = 'md',
  iconSlot = 'none',
  getPaletteValue,
  status = 'default',
}: StudioLivePreviewProps) {
  const locale = useLocale();
  const b = variable?.tokenBindings || {};
  const activeTypeId = (type?.id || typeIdProp || variable?.type?.id || '').toLowerCase();

  const {
    isHover,
    isActive,
    isFocus,
    isDisabled,
    isLoading,
    statusWrapperStyle,
  } = computeStatusWrapperStyle(status);

  const PreviewRenderer = resolveStudioPreviewRenderer(componentId);

  return (
    <PreviewRenderer
      componentId={componentId}
      variable={variable}
      type={type}
      typeId={typeIdProp}
      activeTypeId={activeTypeId}
      size={size}
      iconSlot={iconSlot}
      getPaletteValue={getPaletteValue}
      status={status}
      locale={locale}
      b={b}
      statusWrapperStyle={statusWrapperStyle}
      isHover={isHover}
      isActive={isActive}
      isFocus={isFocus}
      isDisabled={isDisabled}
      isLoading={isLoading}
    />
  );
}
