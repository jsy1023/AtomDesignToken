'use client';

import React from 'react';

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`inline-flex items-center p-1 rounded-(--radius) bg-(--bg-secondary) text-xs border border-(--border-subtle) ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);
TabsList.displayName = 'TabsList';

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ active = false, className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`px-3 py-1.5 rounded-(--radius-sm) font-medium text-xs transition-colors ${
        active
          ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs font-semibold'
          : 'text-(--text-secondary) hover:text-(--text-primary)'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ active = false, className = '', children, ...props }, ref) => {
    if (!active) return null;
    return (
      <div
        ref={ref}
        className={`p-4 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) text-xs ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = 'TabsContent';
