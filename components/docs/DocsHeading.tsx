import React from 'react';

export interface DocsHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * DocsHeading
 * Encapsulates documentation-specific heading hierarchy and typography styles.
 * Keeps documentation title sizing elegant, readable, and distinct from raw UI library elements.
 */
export function DocsHeading({
  level = 1,
  as,
  children,
  className = '',
  ...props
}: DocsHeadingProps) {
  const Tag = as || (`h${level}` as const);
  const headingClasses = {
    1: 'docs-h1',
    2: 'docs-h2',
    3: 'docs-h3',
    4: 'docs-h4',
  }[level];

  return (
    <Tag className={`${headingClasses} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
