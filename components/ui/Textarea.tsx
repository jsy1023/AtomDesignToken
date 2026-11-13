import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ maxLength, label, value, className = '', ...props }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="atom-textarea-group">
        {label && <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">{label}</label>}
        <textarea ref={ref} value={value} maxLength={maxLength} className={`atom-textarea ${className}`} {...props} />
        {maxLength && (
          <div className="atom-textarea-counter">
            {currentLength} / {maxLength}자
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
