import React, { ElementType } from 'react';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  children?: React.ReactNode;
}

export interface LayoutHeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
}

export interface LayoutSidebarProps extends React.HTMLAttributes<HTMLElement> {
  width?: 'sm' | 'md' | 'lg';
}

export interface LayoutContentProps extends React.HTMLAttributes<HTMLElement> {}

export interface LayoutFooterProps extends React.HTMLAttributes<HTMLElement> {}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'vertical' | 'horizontal';
  gap?: '1' | '2' | '3' | '4' | '6' | '8' | '12';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: '1' | '2' | '3' | '4' | '6' | '8';
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'none';
}

const SIDEBAR_WIDTH_MAP = {
  sm: 'w-48 lg:w-56',
  md: 'w-60 lg:w-64',
  lg: 'w-72 lg:w-80',
};

const STACK_GAP_MAP: Record<string, string> = {
  '1': 'gap-[var(--atom-space-1,4px)]',
  '2': 'gap-[var(--atom-space-2,8px)]',
  '3': 'gap-[var(--atom-space-3,12px)]',
  '4': 'gap-[var(--atom-space-4,16px)]',
  '6': 'gap-[var(--atom-space-6,24px)]',
  '8': 'gap-[var(--atom-space-8,32px)]',
  '12': 'gap-[var(--atom-space-12,48px)]',
};

const STACK_ALIGN_MAP = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const STACK_JUSTIFY_MAP = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

const GRID_COLS_MAP = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-12',
};

const SECTION_SPACING_MAP = {
  none: '',
  sm: 'py-[var(--atom-space-4,16px)] sm:py-[var(--atom-space-6,24px)]',
  md: 'py-[var(--atom-space-8,32px)] sm:py-[var(--atom-space-12,48px)]',
  lg: 'py-[var(--atom-space-12,48px)] sm:py-[var(--atom-space-16,64px)]',
};

const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  sticky = true,
  className = '',
  children,
  ...props
}) => (
  <header
    className={`${
      sticky ? 'sticky top-0 z-40 backdrop-blur-md bg-(--bg-primary)/90' : ''
    } border-b border-(--border-subtle) transition-colors ${className}`.trim()}
    {...props}
  >
    {children}
  </header>
);

const LayoutSidebar: React.FC<LayoutSidebarProps> = ({
  width = 'md',
  className = '',
  children,
  ...props
}) => (
  <aside
    className={`shrink-0 border-r border-(--border-subtle) bg-(--bg-primary) transition-colors ${SIDEBAR_WIDTH_MAP[width]} ${className}`.trim()}
    {...props}
  >
    {children}
  </aside>
);

const LayoutContent: React.FC<LayoutContentProps> = ({
  className = '',
  children,
  ...props
}) => (
  <main className={`flex-1 w-full transition-colors ${className}`.trim()} {...props}>
    {children}
  </main>
);

const LayoutFooter: React.FC<LayoutFooterProps> = ({
  className = '',
  children,
  ...props
}) => (
  <footer
    className={`border-t border-(--border-subtle) bg-(--bg-primary) transition-colors ${className}`.trim()}
    {...props}
  >
    {children}
  </footer>
);

export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  gap = '4',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  children,
  ...props
}) => {
  const dirClass = direction === 'horizontal' ? 'flex flex-row' : 'flex flex-col';
  const gapClass = STACK_GAP_MAP[gap] || STACK_GAP_MAP['4'];
  const alignClass = STACK_ALIGN_MAP[align] || '';
  const justifyClass = STACK_JUSTIFY_MAP[justify] || '';
  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';

  return (
    <div
      className={`${dirClass} ${gapClass} ${alignClass} ${justifyClass} ${wrapClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export const Grid: React.FC<GridProps> = ({
  cols = 3,
  gap = '4',
  className = '',
  children,
  ...props
}) => {
  const colsClass = GRID_COLS_MAP[cols] || GRID_COLS_MAP[3];
  const gapClass = STACK_GAP_MAP[gap] || STACK_GAP_MAP['4'];
  return (
    <div className={`grid ${colsClass} ${gapClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

export const Section: React.FC<SectionProps> = ({
  spacing = 'md',
  className = '',
  children,
  ...props
}) => {
  const spacingClass = SECTION_SPACING_MAP[spacing];
  return (
    <section className={`w-full ${spacingClass} ${className}`.trim()} {...props}>
      {children}
    </section>
  );
};

export const Layout: React.FC<LayoutProps> & {
  Header: React.FC<LayoutHeaderProps>;
  Sidebar: React.FC<LayoutSidebarProps>;
  Content: React.FC<LayoutContentProps>;
  Footer: React.FC<LayoutFooterProps>;
  Stack: React.FC<StackProps>;
  Grid: React.FC<GridProps>;
  Section: React.FC<SectionProps>;
} = ({ as: Component = 'div', className = '', children, ...props }) => {
  return (
    <Component
      className={`min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col font-sans transition-colors ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};

Layout.Header = LayoutHeader;
Layout.Sidebar = LayoutSidebar;
Layout.Content = LayoutContent;
Layout.Footer = LayoutFooter;
Layout.Stack = Stack;
Layout.Grid = Grid;
Layout.Section = Section;

Layout.displayName = 'Layout';
