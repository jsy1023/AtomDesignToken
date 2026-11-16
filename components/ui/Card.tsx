import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  variable?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ interactive = false, variable = 'elevated', className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-component="card"
        data-variable={variable}
        className={`atom-card ${interactive ? 'atom-card-interactive cursor-pointer' : ''} atom-card--${variable} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
