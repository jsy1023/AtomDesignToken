import React, { ElementType } from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  gutters?: boolean;
  center?: boolean;
  as?: ElementType;
  children?: React.ReactNode;
}

const SIZE_MAP: Record<NonNullable<ContainerProps['size']>, string> = {
  sm: 'max-w-(--atom-container-sm,640px)',
  md: 'max-w-(--atom-container-md,768px)',
  lg: 'max-w-(--atom-container-lg,1024px)',
  xl: 'max-w-(--atom-container-xl,1280px)',
  '2xl': 'max-w-(--atom-container-2xl,1536px)',
  full: 'max-w-full',
};

export const Container: React.FC<ContainerProps> = ({
  size = 'xl',
  gutters = true,
  center = true,
  as: Component = 'div',
  className = '',
  children,
  ...props
}) => {
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.xl;
  const gutterClass = gutters
    ? 'px-[var(--atom-layout-gutter,16px)] sm:px-[var(--atom-layout-gutter-lg,24px)]'
    : '';
  const centerClass = center ? 'mx-auto' : '';

  return (
    <Component
      className={`w-full ${sizeClass} ${gutterClass} ${centerClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};

Container.displayName = 'Container';
