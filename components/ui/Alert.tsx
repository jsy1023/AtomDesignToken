'use client';

import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, Bell, X } from 'lucide-react';
import { Button } from './Button';
import type { ComponentInteractiveStatus } from '@/lib/data/studioData';

export type AlertType = 'soft' | 'outlined' | 'solid' | 'accent-border';
export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive' | 'neutral';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  componentType?: AlertType | (string & {});
  variant?: AlertVariant | (string & {});
  variable?: AlertVariant | (string & {});
  status?: ComponentInteractiveStatus;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
}

const TONE_TOKEN_MAP: Record<string, { color: string; bgVar: string; borderVar: string }> = {
  info: {
    color: 'var(--accent-primary, var(--atom-color-primary, var(--accent-primary)))',
    bgVar: 'var(--atom-color-primary-subtle, rgba(49, 130, 246, 0.08))',
    borderVar: 'var(--accent-primary, var(--atom-color-primary, var(--accent-primary)))',
  },
  success: {
    color: 'var(--atom-color-success, #10b981)',
    bgVar: 'var(--atom-color-success-subtle, rgba(16, 185, 129, 0.08))',
    borderVar: 'var(--atom-color-success, #10b981)',
  },
  warning: {
    color: 'var(--atom-color-warning, #f59e0b)',
    bgVar: 'var(--atom-color-warning-subtle, rgba(245, 158, 11, 0.08))',
    borderVar: 'var(--atom-color-warning, #f59e0b)',
  },
  destructive: {
    color: 'var(--atom-color-destructive, var(--atom-color-danger, #ef4444))',
    bgVar: 'var(--atom-color-danger-subtle, rgba(239, 68, 68, 0.08))',
    borderVar: 'var(--atom-color-destructive, var(--atom-color-danger, #ef4444))',
  },
  neutral: {
    color: 'var(--text-primary)',
    bgVar: 'var(--bg-secondary)',
    borderVar: 'var(--border-strong)',
  },
};

const DEFAULT_ICONS: Record<string, React.ReactNode> = {
  info: <Info className="w-4 h-4 shrink-0" />,
  success: <CheckCircle2 className="w-4 h-4 shrink-0" />,
  warning: <AlertTriangle className="w-4 h-4 shrink-0" />,
  destructive: <AlertCircle className="w-4 h-4 shrink-0" />,
  neutral: <Bell className="w-4 h-4 shrink-0" />,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      componentType = 'soft',
      variant = 'info',
      variable,
      status = 'default',
      title,
      description,
      icon,
      action,
      onClose,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const rawTone = (variable || variant || 'info').toLowerCase();
    const activeTone = rawTone === 'danger' || rawTone === 'error' ? 'destructive' : rawTone;
    const toneMeta = TONE_TOKEN_MAP[activeTone] || TONE_TOKEN_MAP.info;
    const resolvedIcon = icon !== undefined ? icon : DEFAULT_ICONS[activeTone] || DEFAULT_ICONS.info;

    const typeKey = (componentType || 'soft').toLowerCase();
    const isSolid = typeKey.includes('solid');
    const isOutlined = typeKey.includes('outline');
    const isAccentBorder = typeKey.includes('accent');

    const computedTypeStyle: React.CSSProperties = isSolid
      ? {
          backgroundColor: toneMeta.color,
          borderColor: toneMeta.color,
          color: activeTone === 'neutral' ? 'var(--bg-primary)' : '#ffffff',
        }
      : isOutlined
      ? {
          backgroundColor: 'var(--bg-primary)',
          borderColor: toneMeta.borderVar,
          color: 'var(--text-primary)',
        }
      : isAccentBorder
      ? {
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)',
          borderLeftWidth: '4px',
          borderLeftColor: toneMeta.borderVar,
          color: 'var(--text-primary)',
        }
      : {
          backgroundColor: `color-mix(in srgb, ${toneMeta.color} 10%, var(--bg-primary))`,
          borderColor: `color-mix(in srgb, ${toneMeta.color} 28%, transparent)`,
          color: 'var(--text-primary)',
        };

    const statusClass = status && status !== 'default' ? `atom-status--${status}` : '';
    const iconColor = isSolid ? (activeTone === 'neutral' ? 'var(--bg-primary)' : '#ffffff') : toneMeta.color;

    return (
      <div
        ref={ref}
        role="alert"
        data-component="alert"
        data-type={componentType}
        data-variable={activeTone}
        data-status={status}
        className={`atom-alert atom-alert--${activeTone} atom-alert--type-${typeKey} ${statusClass} w-full rounded-(--radius) border p-4 flex items-start justify-between gap-3 transition-all ${className}`.trim()}
        style={{
          ...computedTypeStyle,
          ...style,
        }}
        {...props}
      >
        <div className="flex items-start gap-2.5 min-w-0 flex-1">
          {resolvedIcon && (
            <span className="mt-0.5 shrink-0" style={{ color: iconColor }}>
              {resolvedIcon}
            </span>
          )}
          <div className="min-w-0 flex-1 space-y-1">
            {title && (
              <div className="font-bold text-sm leading-snug text-inherit">
                {title}
              </div>
            )}
            {(description || children) && (
              <div className="text-xs leading-relaxed opacity-90 text-inherit">
                {description || children}
              </div>
            )}
            {action && <div className="pt-1.5">{action}</div>}
          </div>
        </div>

        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            isIconOnly
            onClick={onClose}
            aria-label="닫기"
            className="h-6 w-6 p-0 shrink-0 text-inherit opacity-70 hover:opacity-100"
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
