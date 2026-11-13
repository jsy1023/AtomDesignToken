import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 
    | 'primary' 
    | 'secondary' 
    | 'outline' 
    | 'ghost' 
    | 'destructive' 
    | 'success' 
    | 'warning';
  size?: 'sm' | 'md' | 'lg';
  isIconOnly?: boolean;
  loading?: boolean;
  /** 버튼 상하단 내부 여백 커스텀 토큰값 (예: var(--atom-space-2), 8px) */
  paddingY?: string;
  /** 버튼 좌우 내부 여백 커스텀 토큰값 (예: var(--atom-space-4), 16px) */
  paddingX?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isIconOnly = false,
      loading = false,
      paddingY,
      paddingX,
      disabled,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const variantClass = variant === 'primary' ? 'atom-btn-primary' : `atom-btn-${variant}`;
    const sizeClass = size === 'sm' ? 'atom-btn-sm' : size === 'lg' ? 'atom-btn-lg' : '';
    const iconClass = isIconOnly ? 'atom-btn-icon' : '';

    const customStyle: React.CSSProperties = {
      ...(paddingY ? { paddingTop: paddingY, paddingBottom: paddingY } : {}),
      ...(paddingX ? { paddingLeft: paddingX, paddingRight: paddingX } : {}),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        className={`atom-btn ${variantClass} ${sizeClass} ${iconClass} ${className}`.trim()}
        style={customStyle}
        {...props}
      >
        {loading && (
          <svg className={`animate-spin h-4 w-4 ${isIconOnly ? '' : '-ml-1 mr-2'}`} fill="none" viewBox="0 0 24 24">
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
