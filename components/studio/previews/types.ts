import React from 'react';
import {
  ComponentInteractiveStatus,
  ComponentTypeSpec,
  ComponentVariable,
} from '@/lib/data/studioData';

export interface StudioPreviewItemProps {
  componentId: string;
  variable: ComponentVariable;
  type?: ComponentTypeSpec;
  typeId?: string;
  activeTypeId: string;
  size: 'sm' | 'md' | 'lg';
  iconSlot: 'none' | 'left' | 'right' | 'icon-only';
  getPaletteValue: (paletteId: string) => string;
  status: ComponentInteractiveStatus;
  locale: string;
  b: Record<string, string>;
  statusWrapperStyle: React.CSSProperties;
  isHover: boolean;
  isActive: boolean;
  isFocus: boolean;
  isDisabled: boolean;
  isLoading: boolean;
}

export function computeStatusWrapperStyle(status: ComponentInteractiveStatus): {
  isHover: boolean;
  isActive: boolean;
  isFocus: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  statusWrapperStyle: React.CSSProperties;
} {
  const isHover = status === 'hover';
  const isActive = status === 'active';
  const isFocus = status === 'focus';
  const isDisabled = status === 'disabled';
  const isLoading = status === 'loading';

  const statusWrapperStyle: React.CSSProperties = {
    ...(isHover ? { filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' } : {}),
    ...(isActive ? { transform: 'scale(0.97)' } : {}),
    ...(isFocus ? { outline: '2px solid var(--accent-primary)', outlineOffset: '3px' } : {}),
    ...(isDisabled ? { opacity: 0.45, cursor: 'not-allowed', pointerEvents: 'none' } : {}),
    ...(isLoading ? { opacity: 0.85, cursor: 'wait' } : {}),
  };

  return { isHover, isActive, isFocus, isDisabled, isLoading, statusWrapperStyle };
}
