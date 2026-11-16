import React from 'react';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  variable?: string;
  width?: string;
  collapsedWidth?: string;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      collapsed = false,
      variable = 'default',
      width = '260px',
      collapsedWidth = '72px',
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const currentWidth = collapsed ? collapsedWidth : width;

    return (
      <aside
        ref={ref}
        data-component="sidebar"
        data-variable={variable}
        data-collapsed={collapsed}
        style={{ width: currentWidth, ...style }}
        className={`atom-sidebar atom-sidebar--${variable} shrink-0 bg-(--bg-secondary)/40 border-r border-(--border-subtle) flex flex-col h-full transition-[width] duration-200 select-none ${className}`}
        {...props}
      >
        {children}
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`h-16 px-4 shrink-0 flex items-center justify-between border-b border-(--border-subtle)/70 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarHeader.displayName = 'SidebarHeader';

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex-1 overflow-y-auto px-3 py-4 space-y-6 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarContent.displayName = 'SidebarContent';

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`space-y-1 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
SidebarGroup.displayName = 'SidebarGroup';

export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-(--text-muted) truncate ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

export const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <ul ref={ref} className={`space-y-0.5 list-none m-0 p-0 ${className}`} {...props}>
        {children}
      </ul>
    );
  }
);
SidebarMenu.displayName = 'SidebarMenu';

export interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <li ref={ref} className={`list-none ${className}`} {...props}>
        {children}
      </li>
    );
  }
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  collapsed?: boolean;
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  (
    {
      active = false,
      icon,
      badge,
      collapsed = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-current={active ? 'page' : undefined}
        title={collapsed && typeof children === 'string' ? children : undefined}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-(--radius-sm) text-xs sm:text-sm font-medium transition cursor-pointer ${
          collapsed ? 'justify-center px-2' : 'justify-between'
        } ${
          active
            ? 'bg-(--atom-color-primary,#3182f6) text-white font-semibold shadow-xs'
            : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-primary)'
        } ${className}`}
        {...props}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && <span className="shrink-0 w-4 h-4 flex items-center justify-center">{icon}</span>}
          {!collapsed && <span className="truncate">{children}</span>}
        </div>
        {!collapsed && badge && <span className="shrink-0">{badge}</span>}
      </button>
    );
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-3 shrink-0 border-t border-(--border-subtle)/70 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarFooter.displayName = 'SidebarFooter';

export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  collapsed?: boolean;
  onToggle?: () => void;
}

export const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ collapsed = false, onToggle, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
        className={`p-1.5 rounded-(--radius-sm) text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition ${className}`}
        {...props}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    );
  }
);
SidebarToggle.displayName = 'SidebarToggle';
