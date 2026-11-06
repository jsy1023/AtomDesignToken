import React from 'react';

export interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'success';
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'primary',
  className = '',
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={`atom-progress ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={`atom-progress-bar atom-progress-${variant}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
