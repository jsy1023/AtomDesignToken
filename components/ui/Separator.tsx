import React from 'react';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  label,
  className = '',
}) => {
  if (label && orientation === 'horizontal') {
    return (
      <div className={`atom-separator-with-label ${className}`}>
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`atom-separator atom-separator-${orientation} ${className}`}
    />
  );
};
