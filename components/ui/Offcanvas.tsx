'use client';

import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export type OffcanvasPlacement = 'left' | 'right' | 'top' | 'bottom';
export type OffcanvasSize = 'sm' | 'md' | 'lg' | 'full';

export interface OffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: string;
  placement?: OffcanvasPlacement;
  size?: OffcanvasSize;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  backdropClassName?: string;
  inline?: boolean; // For Studio stage or documentation preview embedding
  componentType?: string;
  value?: string;
  style?: React.CSSProperties;
}

export const Offcanvas: React.FC<OffcanvasProps> = ({
  isOpen,
  onClose,
  title,
  description,
  placement = 'right',
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
  footer,
  className = '',
  backdropClassName = '',
  inline = false,
  componentType,
  value,
  style,
}) => {
  // Handle Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (inline) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, inline, handleKeyDown]);

  // Size mappings based on placement
  const sizeClasses: Record<OffcanvasPlacement, Record<OffcanvasSize, string>> = {
    right: {
      sm: 'w-72 max-w-[85vw]',
      md: 'w-96 max-w-[90vw]',
      lg: 'w-[480px] max-w-[95vw]',
      full: 'w-full',
    },
    left: {
      sm: 'w-72 max-w-[85vw]',
      md: 'w-96 max-w-[90vw]',
      lg: 'w-[480px] max-w-[95vw]',
      full: 'w-full',
    },
    top: {
      sm: 'h-48 max-h-[70vh]',
      md: 'h-72 max-h-[80vh]',
      lg: 'h-96 max-h-[90vh]',
      full: 'h-full',
    },
    bottom: {
      sm: 'h-48 max-h-[70vh]',
      md: 'h-72 max-h-[80vh]',
      lg: 'h-96 max-h-[90vh]',
      full: 'h-full',
    },
  };

  // Placement position classes
  const placementClasses: Record<OffcanvasPlacement, string> = {
    right: 'inset-y-0 right-0 border-l animate-in slide-in-from-right duration-250',
    left: 'inset-y-0 left-0 border-r animate-in slide-in-from-left duration-250',
    top: 'inset-x-0 top-0 border-b animate-in slide-in-from-top duration-250',
    bottom: 'inset-x-0 bottom-0 border-t animate-in slide-in-from-bottom duration-250',
  };

  // 1. Inline Mode: Render framed interactive mockup inside stage/doc container
  if (inline) {
    return (
      <div
        className={`w-full max-w-md rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-lg overflow-hidden flex flex-col transition-all ${className}`}
        style={style}
        data-component="offcanvas"
        data-type={componentType}
        data-value={value}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="p-4 border-b border-(--border-subtle) flex items-start justify-between gap-3 bg-(--bg-secondary)/30">
            <div className="min-w-0 flex-1">
              {title && (
                <h3 className="font-bold text-sm text-(--text-primary) truncate">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-(--text-secondary) mt-0.5 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                onClick={onClose}
                className="p-1 h-auto text-(--text-muted) hover:text-(--text-primary) shrink-0"
                aria-label="닫기"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-4 flex-1 overflow-y-auto text-xs text-(--text-secondary) space-y-3">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-3.5 border-t border-(--border-subtle) bg-(--bg-secondary)/40 flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    );
  }

  // 2. Overlay / Modal Portal Mode
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 ${backdropClassName}`}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <div
        className={`fixed z-50 flex flex-col bg-(--bg-primary) border-(--border-subtle) shadow-2xl overflow-hidden ${placementClasses[placement]} ${sizeClasses[placement][size]} ${className}`}
        style={style}
        data-component="offcanvas"
        data-type={componentType}
        data-value={value}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="p-4 sm:p-5 border-b border-(--border-subtle) flex items-start justify-between gap-3 shrink-0">
            <div className="min-w-0 flex-1">
              {title && (
                <h3 className="font-bold text-sm sm:text-base text-(--text-primary) tracking-tight">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-(--text-secondary) mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                onClick={onClose}
                className="p-1.5 h-auto text-(--text-muted) hover:text-(--text-primary) shrink-0 rounded-(--radius-sm)"
                aria-label="닫기"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm text-(--text-secondary)">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-(--border-subtle) bg-(--bg-secondary)/30 flex items-center justify-end gap-2 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Compound Components for Modular Layouts
export const OffcanvasHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`p-4 border-b border-(--border-subtle) flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);

export const OffcanvasBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`flex-1 overflow-y-auto p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const OffcanvasFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`p-4 border-t border-(--border-subtle) bg-(--bg-secondary)/30 flex items-center justify-end gap-2 ${className}`} {...props}>
    {children}
  </div>
);
