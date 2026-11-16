import React from 'react';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  bordered?: boolean;
  blur?: boolean;
  variable?: string;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      sticky = false,
      bordered = true,
      blur = true,
      variable = 'default',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        data-component="navbar"
        data-variable={variable}
        className={`atom-navbar atom-navbar--${variable} ${
          sticky ? 'sticky top-0 z-40' : 'relative'
        } ${bordered ? 'border-b border-(--border-subtle)' : ''} ${
          blur ? 'backdrop-blur-md bg-(--bg-primary)/85' : 'bg-(--bg-primary)'
        } w-full transition-colors ${className}`}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {children}
        </div>
      </nav>
    );
  }
);
Navbar.displayName = 'Navbar';

export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
}

export const NavbarBrand = React.forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ href, className = '', children, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={`flex items-center gap-2.5 font-bold text-base text-(--text-primary) tracking-tight select-none cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </div>
    );

    if (href) {
      return (
        <a href={href} className="no-underline">
          {content}
        </a>
      );
    }
    return content;
  }
);
NavbarBrand.displayName = 'NavbarBrand';

export interface NavbarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavbarNav = React.forwardRef<HTMLDivElement, NavbarNavProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`hidden md:flex items-center gap-1 text-sm font-medium ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavbarNav.displayName = 'NavbarNav';

export interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ active = false, className = '', children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`px-3 py-1.5 rounded-(--radius-sm) transition-colors text-sm font-medium ${
          active
            ? 'text-(--atom-color-primary,#3182f6) font-semibold bg-(--atom-color-primary-subtle,rgba(49,130,246,0.1))'
            : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
        } ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }
);
NavbarLink.displayName = 'NavbarLink';

export interface NavbarActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavbarActions = React.forwardRef<HTMLDivElement, NavbarActionsProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center gap-2 sm:gap-3 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavbarActions.displayName = 'NavbarActions';

export interface NavbarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const NavbarToggle = React.forwardRef<HTMLButtonElement, NavbarToggleProps>(
  ({ isOpen = false, onToggle, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onToggle}
        aria-label="Toggle navigation menu"
        className={`md:hidden p-2 rounded-(--radius-sm) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition ${className}`}
        {...props}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    );
  }
);
NavbarToggle.displayName = 'NavbarToggle';
