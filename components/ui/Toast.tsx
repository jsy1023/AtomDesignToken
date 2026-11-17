'use client';

import React, { useEffect, useState } from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { Button } from './Button';
import type { ComponentInteractiveStatus } from '@/lib/data/studioData';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger' | 'action';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: ToastVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: ToastAction | React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  duration?: number;
  isOpen?: boolean;
  inline?: boolean;
  componentType?: string;
  value?: string;
  status?: ComponentInteractiveStatus;
}

const defaultIcons: Record<ToastVariant, React.ReactNode> = {
  info: <Info className="w-5 h-5 text-(--accent-primary) shrink-0" />,
  success: <CheckCircle2 className="w-5 h-5 text-(--atom-color-success,var(--accent-primary)) shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-(--atom-color-warning,#f59e0b) shrink-0" />,
  danger: <AlertCircle className="w-5 h-5 text-(--atom-color-destructive,#ef4444) shrink-0" />,
  action: <Info className="w-5 h-5 text-(--accent-primary) shrink-0" />,
};

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  description,
  children,
  icon,
  action,
  onClose,
  showCloseButton = true,
  duration = 0,
  isOpen = true,
  inline = false,
  componentType,
  value,
  status = 'default',
  className = '',
  style,
  ...props
}) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (visible && duration > 0 && onClose) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const resolvedIcon = icon !== undefined ? icon : defaultIcons[variant] || defaultIcons.info;
  const statusClass = status && status !== 'default' ? `atom-status--${status}` : '';

  const content = (
    <div
      role="status"
      aria-live="polite"
      data-component="toast"
      data-variant={variant}
      data-status={status}
      data-type={componentType}
      data-value={value || variant}
      className={`atom-toast atom-toast--${variant} ${statusClass} flex items-start gap-3 p-4 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-lg text-(--text-primary) transition-all duration-200 select-none ${className}`}
      style={style}
      {...props}
    >
      {resolvedIcon && <div className="mt-0.5">{resolvedIcon}</div>}

      <div className="flex-1 min-w-0 pr-1">
        {title && (
          <div className="font-semibold text-sm leading-tight text-inherit">
            {title}
          </div>
        )}
        {(description || children) && (
          <div className={`text-xs text-inherit opacity-85 leading-relaxed ${title ? 'mt-1' : ''}`}>
            {description || children}
          </div>
        )}
      </div>

      {action && (
        <div className="shrink-0 pl-1">
          {React.isValidElement(action) ? (
            action
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={(action as ToastAction).onClick}
              className="text-xs font-medium px-2 py-1 h-auto"
            >
              {(action as ToastAction).label}
            </Button>
          )}
        </div>
      )}

      {showCloseButton && onClose && (
        <div className="shrink-0 -mr-1 -mt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setVisible(false);
              onClose();
            }}
            aria-label="알림 닫기"
            className="p-1 h-auto w-auto text-inherit opacity-70 hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );

  if (inline) {
    return <div className="w-full">{content}</div>;
  }

  return content;
};

Toast.displayName = 'Toast';
