import React from 'react';
import type { ComponentInteractiveStatus } from '@/lib/data/studioData';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'destructive' | 'neutral' | (string & {});
  variable?: 'primary' | 'success' | 'warning' | 'destructive' | 'neutral' | (string & {});
  status?: ComponentInteractiveStatus;
  componentType?: string; // Type: e.g. 'error-status', 'pending-status', 'success-status', 'info-tag'
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', variable, status = 'default', componentType, className = '', children, ...props }, ref) => {
    const activeVariable = variable || variant;
    const statusClass = status && status !== 'default' ? `atom-status--${status}` : '';
    return (
      <span
        ref={ref}
        data-component="badge"
        data-variable={activeVariable}
        data-status={status}
        data-type={componentType}
        className={`atom-badge atom-badge-${variant} atom-badge--${activeVariable} ${statusClass} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
