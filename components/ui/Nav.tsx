import React, { useState, useRef, useEffect } from 'react';

export type NavVariant = 'default' | 'pills' | 'tabs' | 'segmented';
export type NavSize = 'sm' | 'md' | 'lg';
export type NavOrientation = 'horizontal' | 'vertical';

const NavContext = React.createContext<{
  variant: NavVariant;
  size: NavSize;
  orientation: NavOrientation;
}>({
  variant: 'default',
  size: 'md',
  orientation: 'horizontal',
});

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
  variant?: NavVariant;
  size?: NavSize;
  orientation?: NavOrientation;
  fluid?: boolean;
}

/**
 * 🧭 Nav (Universal Navigation Component)
 * AtomSystem 표준 탐색(네비게이션) 원자 컴포넌트입니다.
 * - variant: default (기본 텍스트 링크), pills (알약형 필터/버튼), tabs (언더라인 탭), segmented (박스형 분할 컨트롤)
 * - orientation: horizontal (가로), vertical (세로)
 */
export const Nav = React.forwardRef<HTMLElement, NavProps>(
  (
    {
      variant = 'default',
      size = 'md',
      orientation = 'horizontal',
      fluid = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isPills = variant === 'pills';
    const isSegmented = variant === 'segmented';
    const isTabs = variant === 'tabs';

    const containerStyle = isSegmented
      ? 'p-1 rounded-(--radius) bg-(--bg-secondary)/80 border border-(--border-subtle)'
      : isPills
      ? 'p-1.5 rounded-(--radius) bg-(--bg-secondary)/60 border border-(--border-subtle) flex-wrap'
      : isTabs
      ? 'border-b border-(--border-subtle) gap-6'
      : 'gap-1';

    const orientationStyle = orientation === 'vertical' ? 'flex-col' : 'flex-row items-center';

    return (
      <NavContext.Provider value={{ variant, size, orientation }}>
        <nav
          ref={ref}
          data-component="nav"
          data-variant={variant}
          data-orientation={orientation}
          className={`atom-nav atom-nav--${variant} flex ${orientationStyle} ${containerStyle} ${
            fluid ? 'w-full' : ''
          } ${className}`}
          {...props}
        >
          {children}
        </nav>
      </NavContext.Provider>
    );
  }
);
Nav.displayName = 'Nav';

export interface NavItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  active?: boolean;
}

export const NavItem = React.forwardRef<HTMLLIElement, NavItemProps>(
  ({ active = false, className = '', children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        data-component="nav-item"
        className={`list-none inline-flex items-center relative ${className}`}
        {...props}
      >
        {children}
      </li>
    );
  }
);
NavItem.displayName = 'NavItem';

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  variant?: NavVariant;
  size?: NavSize;
  asButton?: boolean;
  onClick?: (e: React.MouseEvent<any>) => void;
}

export const NavLink = React.forwardRef<HTMLAnchorElement & HTMLButtonElement, NavLinkProps>(
  (
    {
      active = false,
      disabled = false,
      icon,
      badge,
      variant: overrideVariant,
      size: overrideSize,
      asButton = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(NavContext);
    const variant = overrideVariant || context.variant;
    const size = overrideSize || context.size;

    const sizeClasses =
      size === 'sm'
        ? 'text-xs px-2.5 py-1'
        : size === 'lg'
        ? 'text-base px-4 py-2.5'
        : 'text-sm px-3 py-1.5';

    let variantClasses = '';
    if (variant === 'pills' || variant === 'segmented') {
      variantClasses = active
        ? 'bg-(--accent-primary) text-(--bg-primary) font-semibold shadow-xs'
        : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)';
    } else if (variant === 'tabs') {
      variantClasses = active
        ? 'text-(--accent-primary) font-bold border-b-2 border-(--accent-primary) -mb-[1px]'
        : 'text-(--text-secondary) hover:text-(--text-primary) border-b-2 border-transparent -mb-[1px]';
    } else {
      // default
      variantClasses = active
        ? 'text-(--text-primary) font-semibold bg-(--bg-secondary)'
        : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)/60';
    }

    const baseClasses = `inline-flex items-center gap-1.5 rounded-(--radius-sm) font-medium transition cursor-pointer select-none no-underline ${sizeClasses} ${variantClasses} ${
      disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''
    } ${className}`;

    if (asButton) {
      return (
        <button
          ref={ref as any}
          type="button"
          disabled={disabled}
          aria-current={active ? 'page' : undefined}
          data-component="nav-link"
          className={baseClasses}
          {...(props as any)}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {badge && <span className="shrink-0 ml-1">{badge}</span>}
        </button>
      );
    }

    return (
      <a
        ref={ref as any}
        aria-current={active ? 'page' : undefined}
        data-component="nav-link"
        className={baseClasses}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {badge && <span className="shrink-0 ml-1">{badge}</span>}
      </a>
    );
  }
);
NavLink.displayName = 'NavLink';

export interface NavDropdownProps {
  label: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  align?: 'left' | 'right';
  icon?: React.ReactNode;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({
  label,
  active = false,
  children,
  className = '',
  triggerClassName = '',
  align = 'left',
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-component="nav-dropdown"
      className={`relative inline-block ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-current={active ? 'page' : undefined}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-(--radius-sm) text-sm font-medium transition cursor-pointer select-none ${
          active || isOpen
            ? 'text-(--text-primary) font-semibold bg-(--bg-secondary)'
            : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)/60'
        } ${triggerClassName}`}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'opacity-60'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="menu"
          className={`absolute top-full mt-1.5 ${
            align === 'right' ? 'right-0' : 'left-0'
          } w-72 p-2 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-xl z-50 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export interface NavDropdownItemProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  active?: boolean;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  asButton?: boolean;
}

export const NavDropdownItem = React.forwardRef<HTMLAnchorElement & HTMLButtonElement, NavDropdownItemProps>(
  (
    {
      active = false,
      icon,
      title,
      description,
      badge,
      asButton = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const itemContent = (
      <>
        {icon && <span className="shrink-0 w-4 h-4 text-(--accent-primary) mt-0.5">{icon}</span>}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-xs font-semibold ${active ? 'text-(--accent-primary)' : 'text-(--text-primary)'}`}>
              {title}
            </span>
            {badge && <span className="shrink-0">{badge}</span>}
          </div>
          {description && (
            <p className="text-[11px] text-(--text-secondary) truncate mt-0.5 leading-snug">
              {description}
            </p>
          )}
        </div>
      </>
    );

    const baseClass = `w-full flex items-start gap-2.5 p-2 rounded-(--radius-sm) transition text-left cursor-pointer no-underline ${
      active
        ? 'bg-(--accent-primary)/10 text-(--accent-primary)'
        : 'hover:bg-(--bg-secondary) text-(--text-primary)'
    } ${className}`;

    if (asButton) {
      return (
        <button
          ref={ref as any}
          type="button"
          role="menuitem"
          className={baseClass}
          {...(props as any)}
        >
          {itemContent}
        </button>
      );
    }

    return (
      <a
        ref={ref as any}
        role="menuitem"
        className={baseClass}
        {...props}
      >
        {itemContent}
      </a>
    );
  }
);
NavDropdownItem.displayName = 'NavDropdownItem';
