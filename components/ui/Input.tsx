import React from 'react';
import type { ComponentInteractiveStatus } from '@/lib/data/studioData';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variable?: string;
  status?: ComponentInteractiveStatus;
  componentType?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, variable = 'standard', status = 'default', componentType, leftIcon, className = '', id, disabled, style, ...props }, ref) => {
    const inputId = id || React.useId();
    const isActuallyDisabled = disabled || status === 'disabled' || status === 'loading';
    const statusClass = status && status !== 'default' ? `atom-status--${status}` : '';

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--atom-text-primary)]">
            {label}
          </label>
        )}
        <div className="relative w-full">
          {leftIcon && (
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-muted) pointer-events-none z-10 flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            data-component="input"
            data-variable={variable}
            data-status={status}
            data-type={componentType}
            disabled={isActuallyDisabled}
            aria-disabled={isActuallyDisabled}
            aria-invalid={!!error || variable === 'error'}
            style={{ ...(leftIcon ? { paddingLeft: '2.25rem' } : {}), ...style }}
            className={`atom-input ${error ? 'atom-input-error' : ''} atom-input--${variable} ${statusClass} ${leftIcon ? '!pl-9' : ''} ${className}`}
            {...props}
          />
        </div>
        {error ? (
          <span className="text-xs text-[var(--atom-destructive,#dc2626)]">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-[var(--atom-text-secondary,#8b95a1)]">{helperText}</span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
