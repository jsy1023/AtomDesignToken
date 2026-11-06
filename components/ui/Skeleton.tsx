import React from 'react';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  circle = false,
  className = '',
}) => {
  return (
    <div
      className={`atom-skeleton ${circle ? '!rounded-full' : ''} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
};
