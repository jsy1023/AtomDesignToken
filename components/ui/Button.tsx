import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  isIconOnly?: boolean;
  paddingX?: string;
  paddingY?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      isIconOnly = false,
      paddingX,
      paddingY,
      disabled,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const variantClass = variant === 'primary' ? 'atom-btn-primary' : `atom-btn-${variant}`;
    const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-1.5' : size === 'lg' ? 'text-base px-5 py-3' : '';
    const iconClass = isIconOnly ? 'p-2 inline-flex items-center justify-center' : '';

    const customStyle: React.CSSProperties = {
      ...style,
      ...(paddingX ? { paddingLeft: paddingX, paddingRight: paddingX } : {}),
      ...(paddingY ? { paddingTop: paddingY, paddingBottom: paddingY } : {}),
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        style={customStyle}
        className={`atom-btn ${variantClass} ${sizeClass} ${iconClass} ${className}`.trim()}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
