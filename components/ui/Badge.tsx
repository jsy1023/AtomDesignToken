import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'destructive' | 'neutral' | (string & {});
  variable?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', variable, className = '', children, ...props }, ref) => {
    const activeVariable = variable || variant;
    return (
      <span
        ref={ref}
        data-component="badge"
        data-variable={activeVariable}
        className={`atom-badge atom-badge-${variant} atom-badge--${activeVariable} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
