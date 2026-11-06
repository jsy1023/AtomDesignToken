import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className = '',
}) => {
  return (
    <nav className={`atom-breadcrumb ${className}`} aria-label="Breadcrumb">
      <ol className="atom-breadcrumb-list">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li className={`atom-breadcrumb-item ${isLast ? 'atom-breadcrumb-current' : ''}`}>
                {isLast || !item.href ? (
                  <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                ) : (
                  <a href={item.href}>{item.label}</a>
                )}
              </li>
              {!isLast && <li className="atom-breadcrumb-separator">{separator}</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
