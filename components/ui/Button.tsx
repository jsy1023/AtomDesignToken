import React from 'react';

type ComponentInteractiveStatus =
  | 'default'
  | 'hover'
  | 'active'
  | 'focus'
  | 'disabled'
  | 'loading';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'danger' | 'success' | 'warning' | 'info' | (string & {});
  variable?: 'primary' | 'secondary' | 'destructive' | 'danger' | 'warning' | 'success' | 'info' | 'ghost' | 'outline' | (string & {});
  status?: ComponentInteractiveStatus;
  componentType?: string; // Type: e.g. 'primary-cta', 'secondary-action', 'destructive-action'
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
      variable,
      status = 'default',
      componentType,
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
    const activeVariable = variable || (variant === 'danger' ? 'destructive' : variant);
    const normalizedVariant = activeVariable === 'danger' ? 'destructive' : activeVariable;
    const variantClass = normalizedVariant === 'primary' ? 'atom-btn-primary' : `atom-btn-${normalizedVariant}`;
    const dangerClass = activeVariable === 'danger' || activeVariable === 'destructive' ? 'atom-btn-danger' : '';
    const variableClass = `atom-button--${activeVariable}`;
    const typeClass = componentType ? `atom-btn--type-${componentType}` : '';
    const statusClass = status && status !== 'default' ? `atom-status--${status}` : '';
    const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-1.5' : size === 'lg' ? 'text-base px-5 py-3' : '';
    const iconClass = isIconOnly ? 'p-2 aspect-square inline-flex items-center justify-center' : '';

    const isActuallyDisabled = disabled || status === 'disabled' || loading || status === 'loading';
    const isActuallyLoading = loading || status === 'loading';

    const customStyle: React.CSSProperties = {
      ...style,
      ...(paddingX ? { paddingLeft: paddingX, paddingRight: paddingX } : {}),
      ...(paddingY ? { paddingTop: paddingY, paddingBottom: paddingY } : {}),
    };

    const alignClass = className.includes('justify-start') || className.includes('text-left')
      ? 'atom-btn--left'
      : className.includes('justify-between')
      ? 'atom-btn--between'
      : '';

    return (
      <button
        ref={ref}
        data-component="button"
        data-variable={activeVariable}
        data-status={status}
        data-type={componentType}
        disabled={isActuallyDisabled}
        aria-disabled={isActuallyDisabled}
        aria-busy={isActuallyLoading}
        className={`atom-btn ${typeClass} ${variantClass} ${dangerClass} ${variableClass} ${statusClass} ${sizeClass} ${iconClass} ${alignClass} ${className}`}
        style={customStyle}
        {...props}
      >
        {isActuallyLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
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
