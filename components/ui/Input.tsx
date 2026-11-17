import React from 'react';
import type { ComponentInteractiveStatus } from '@/lib/data/studioData';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variable?: string;
  status?: ComponentInteractiveStatus;
  componentType?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, variable = 'standard', status = 'default', componentType, className = '', id, disabled, ...props }, ref) => {
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
          className={`atom-input ${error ? 'atom-input-error' : ''} atom-input--${variable} ${statusClass} ${className}`}
          {...props}
        />
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
