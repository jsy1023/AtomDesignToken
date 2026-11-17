import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className = '', id, disabled, checked, onChange, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex items-start gap-2.5 select-none">
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            data-component="checkbox"
            className={["peer appearance-none w-4 h-4 rounded-(--radius-sm) border border-(--border-strong) bg-(--bg-primary) checked:bg-(--accent-primary) checked:border-(--accent-primary) focus:outline-none focus:ring-2 focus:ring-(--accent-primary)/30 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed", className].filter(Boolean).join(" ")}
            {...props}
          />
          <svg
            className="pointer-events-none absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        {(label || description || error) && (
          <div className="flex flex-col gap-0.5 leading-none">
            {label && (
              <label
                htmlFor={checkboxId}
                className={["text-xs font-medium cursor-pointer", disabled ? "text-(--text-muted) cursor-not-allowed" : "text-(--text-primary)"].join(" ")}
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-[11px] text-(--text-secondary)">{description}</span>
            )}
            {error && <span className="text-[11px] text-(--atom-color-destructive)">{error}</span>}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
