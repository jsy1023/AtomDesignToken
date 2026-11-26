import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { useStudioLocaleControl } from './next-intl';

export function Header() {
  const { locale, setLocale } = useStudioLocaleControl();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains('dark') || root.getAttribute('data-theme') === 'dark');
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    if (next) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  };

  return (
    <header className="h-12 px-4 border-b border-(--border-subtle) bg-(--bg-primary) flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-(--radius-sm) bg-(--accent-primary) text-white flex items-center justify-center font-mono text-xs font-bold">
          A
        </div>
        <span className="font-semibold text-sm tracking-tight">AtomSystem</span>
        <Badge variant="success">Local Studio</Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocale(locale === 'ko' ? 'en' : locale === 'en' ? 'ja' : 'ko')}
          className="text-xs font-mono"
        >
          {locale.toUpperCase()}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          aria-label="Toggle color mode"
          className="px-2"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>
    </header>
  );
}
