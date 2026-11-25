import React, { useEffect, useState } from 'react';
import { emitStudioNavigation, STUDIO_NAV_EVENT } from './next-navigation';

export function usePathname(): string {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', sync);
    window.addEventListener(STUDIO_NAV_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(STUDIO_NAV_EVENT, sync);
    };
  }, []);

  return pathname;
}

export function useRouter() {
  return {
    push: (href: string) => {
      window.history.pushState({}, '', href);
      emitStudioNavigation();
    },
    replace: (href: string) => {
      window.history.replaceState({}, '', href);
      emitStudioNavigation();
    },
    back: () => window.history.back(),
  };
}

export function Link({
  href,
  children,
  className,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const router = useRouter();
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (href.startsWith('/')) {
          e.preventDefault();
          router.push(href);
        }
        rest.onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
