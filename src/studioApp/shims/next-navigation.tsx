import { useEffect, useState } from 'react';

export const STUDIO_NAV_EVENT = 'atom-studio-nav';

export function emitStudioNavigation() {
  window.dispatchEvent(new Event(STUDIO_NAV_EVENT));
}

export function useSearchParams(): URLSearchParams {
  const [search, setSearch] = useState(() => window.location.search);

  useEffect(() => {
    const sync = () => setSearch(window.location.search);
    window.addEventListener('popstate', sync);
    window.addEventListener(STUDIO_NAV_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(STUDIO_NAV_EVENT, sync);
    };
  }, []);

  return new URLSearchParams(search);
}
