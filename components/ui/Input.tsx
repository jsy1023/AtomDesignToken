import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || React.useId();
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
          aria-invalid={!!error}
          className={`atom-input ${error ? 'atom-input-error' : ''} ${className}`}
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
