import React from 'react';

export type SidebarVariant = 'default' | 'pills' | 'bordered' | 'floating';
export type SidebarSize = 'sm' | 'md' | 'lg';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  variable?: string;
  variant?: SidebarVariant | string;
  size?: SidebarSize;
  width?: string;
  collapsedWidth?: string;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      collapsed = false,
      variable = 'default',
      variant,
      size = 'md',
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
    const activeVar = variant || variable;

    return (
      <aside
        ref={ref}
        data-component="sidebar"
        data-variable={activeVar}
        data-collapsed={collapsed}
        style={{ width: currentWidth, ...style }}
        className={`atom-sidebar atom-sidebar--${activeVar} shrink-0 bg-(--bg-secondary)/40 border-r border-(--border-subtle) flex flex-col h-full transition-[width] duration-200 select-none ${className}`}
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

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ label, collapsible = false, defaultOpen = true, className = '', children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
      <div ref={ref} data-component="sidebar-group" className={`space-y-1 ${className}`} {...props}>
        {label && (
          <div
            onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
            className={`px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-(--text-muted) truncate flex items-center justify-between ${
              collapsible ? 'cursor-pointer select-none hover:text-(--text-primary)' : ''
            }`}
          >
            <span>{label}</span>
            {collapsible && (
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        )}
        {(!collapsible || isOpen) && children}
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

export interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  active?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  label?: React.ReactNode;
}

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ active = false, icon, badge, label, className = '', children, ...props }, ref) => {
    return (
      <li ref={ref} data-active={active} className={`list-none ${className}`} {...props}>
        {children ? (
          children
        ) : (
          <div
            className={`flex items-center justify-between px-3 py-2 rounded-(--radius-sm) text-xs sm:text-sm font-medium transition cursor-pointer select-none ${
              active
                ? 'bg-(--accent-primary) text-(--bg-primary) font-semibold shadow-xs'
                : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {icon && <span className="shrink-0 w-4 h-4 flex items-center justify-center">{icon}</span>}
              <span className="truncate">{label}</span>
            </div>
            {badge && <span className="shrink-0 ml-2">{badge}</span>}
          </div>
        )}
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

export interface SidebarSubMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
}

export const SidebarSubMenu: React.FC<SidebarSubMenuProps> = ({
  label,
  icon,
  badge,
  defaultOpen = false,
  className = '',
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div data-component="sidebar-sub-menu" className={`space-y-0.5 ${className}`} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-3 py-2 rounded-(--radius-sm) text-xs sm:text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && <span className="shrink-0 w-4 h-4 flex items-center justify-center">{icon}</span>}
          <span className="truncate">{label}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {badge && <span>{badge}</span>}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 text-(--text-muted) ${
              isOpen ? 'rotate-90' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="pl-6 pr-1 py-0.5 space-y-0.5 border-l border-(--border-subtle) ml-4">
          {children}
        </div>
      )}
    </div>
  );
};
SidebarSubMenu.displayName = 'SidebarSubMenu';

// 🔄 SideMenu Aliases for 100% unified naming & backwards compatibility
export const SideMenu = Sidebar;
export const SideMenuGroup = SidebarGroup;
export const SideMenuItem = SidebarMenuItem;
export const SideSubMenu = SidebarSubMenu;
