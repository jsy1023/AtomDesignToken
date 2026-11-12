'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Terminal,
  Check,
  Copy,
  ChevronDown,
  Menu,
  X,
  Globe,
  Star,
} from 'lucide-react';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { NAVIGATION_DEPTH, NavGroup } from '@/lib/data/navigation';
import { useI18n, LOCALES } from '@/lib/i18n';

interface HeaderProps {
  brandColor?: string;
  rightExtra?: React.ReactNode;
}

export function Header({ brandColor, rightExtra }: HeaderProps) {
  const pathname = usePathname();
  const { theme } = useThemeEditor();
  const { locale, setLocale, t } = useI18n();
  const activeBrandColor = brandColor || theme?.color?.primary || '#18181b';
  const [copiedCli, setCopiedCli] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch GitHub Star Count
  useEffect(() => {
    fetch('https://api.github.com/repos/jsy1023/AtomDesignToken')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => {
        // Fallback gracefully
      });
  }, []);

  const copyCli = () => {
    navigator.clipboard.writeText('npx atomsystem init');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const getNavLabel = (groupId: string, fallback: string) => {
    switch (groupId) {
      case 'foundations':
        return t('nav.foundations', fallback);
      case 'library':
        return t('nav.library', fallback);
      case 'engineering':
        return t('nav.engineering', fallback);
      default:
        return fallback;
    }
  };

  const getSubNavTitle = (href: string, fallback: string) => {
    switch (href) {
      case '/principles':
        return t('nav.principles', fallback);
      case '/tokens':
        return t('nav.tokens', fallback);
      case '/motion':
        return t('nav.motion', fallback);
      case '/components':
      case '/components/button':
        return t('nav.components', fallback);
      case '/icons':
        return t('nav.icons', fallback);
      case '/blocks':
        return t('nav.blocks', fallback);
      case '/patterns':
        return t('nav.patterns', fallback);
      case '/dependencies':
        return t('nav.dependencies', fallback);
      case '/guide':
        return t('nav.guide', fallback);
      default:
        return fallback;
    }
  };

  // Close dropdown on outside click or route change
  useEffect(() => {
    setOpenGroup(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = (groupId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenGroup(groupId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenGroup(null);
    }, 150);
  };

  const isGroupActive = (group: NavGroup) => {
    return group.items.some((item) => pathname?.startsWith(item.href));
  };

  return (
    <header className="sticky top-0 z-40 bg-(--bg-primary)/95 backdrop-blur-md border-b border-(--border-subtle) transition-colors">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 h-11 flex items-center justify-between">
        {/* Left: Brand Logo & 2-Depth Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span 
              className="w-3 h-3 rounded-[3px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: activeBrandColor }}
            />
            <span className="font-semibold text-xs tracking-tight text-(--text-primary)">
              AtomDesignToken
            </span>
          </Link>

          {/* Desktop 2-Depth Navigation */}
          <nav
            ref={dropdownRef}
            className="hidden md:flex items-center gap-0.5 text-xs"
            onMouseLeave={handleMouseLeave}
          >
            {NAVIGATION_DEPTH.map((group) => {
              const active = isGroupActive(group);
              const isOpen = openGroup === group.id;
              const hasMultipleItems = group.items.length > 1;

              if (!hasMultipleItems) {
                // Direct link (e.g. Studio)
                const singleItem = group.items[0];
                const isSingleActive = pathname?.startsWith(singleItem.href);
                return (
                  <Link
                    key={group.id}
                    href={singleItem.href}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                      isSingleActive
                        ? 'text-(--text-primary) font-medium bg-(--bg-secondary)'
                        : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)/50'
                    }`}
                  >
                    <span>{group.label}</span>
                    {singleItem.badge && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded font-mono bg-(--bg-secondary) text-(--text-primary) font-medium border border-(--border-subtle)">
                        {singleItem.badge}
                      </span>
                    )}
                  </Link>
                );
              }

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.id)}
                >
                  <button
                    type="button"
                    onClick={() => setOpenGroup(isOpen ? null : group.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                      active || isOpen
                        ? 'text-(--text-primary) font-medium bg-(--bg-secondary)'
                        : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)/50'
                    }`}
                  >
                    <span>{getNavLabel(group.id, group.label)}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : 'opacity-60'
                      }`}
                    />
                  </button>

                  {/* Depth 2 Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute left-0 top-full pt-1.5 w-64 z-50">
                      <div className="p-1.5 rounded-lg bg-(--bg-primary) border border-(--border-subtle) shadow-md space-y-0.5">
                        <div className="px-2.5 py-1 text-[11px] font-mono text-(--text-secondary) uppercase tracking-wider">
                          {group.englishLabel}
                        </div>
                        {group.items.map((sub) => {
                          const isSubActive = pathname?.startsWith(sub.href);
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block px-2.5 py-1.5 rounded-md transition-colors ${
                                isSubActive
                                  ? 'bg-(--bg-secondary) text-(--text-primary)'
                                  : 'hover:bg-(--bg-secondary)/60 text-(--text-secondary) hover:text-(--text-primary)'
                              }`}
                            >
                              <div className="font-medium text-xs text-(--text-primary)">
                                {getSubNavTitle(sub.href, sub.title)}
                              </div>
                              <p className="text-xs text-(--text-secondary) leading-snug line-clamp-1">
                                {sub.description}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {rightExtra}

          {/* Language Switcher: KO | EN | JA */}
          <div className="flex items-center rounded-md border border-(--border-subtle) bg-(--bg-secondary) p-0.5 text-xs font-mono">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLocale(l.code)}
                className={`px-1.5 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  locale === l.code
                    ? 'bg-(--bg-primary) text-(--text-primary) font-bold shadow-xs'
                    : 'text-(--text-muted) hover:text-(--text-primary)'
                }`}
                title={l.label}
              >
                {l.shortLabel}
              </button>
            ))}
          </div>

          {/* GitHub Star Link */}
          <a
            href="https://github.com/jsy1023/AtomDesignToken"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-(--border-subtle) bg-(--bg-secondary) hover:bg-(--bg-primary) text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors group"
            title="GitHub에서 Star 누르기"
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Star</span>
            <span className="font-mono text-[11px] px-1 py-0.2 rounded bg-(--bg-primary) border border-(--border-subtle) text-(--text-primary) font-semibold">
              {starCount !== null ? starCount : '★'}
            </span>
          </a>

          <button 
            type="button"
            onClick={copyCli}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-(--border-subtle) bg-(--bg-secondary) hover:bg-(--bg-primary) text-xs font-mono text-(--text-secondary) hover:text-(--text-primary) transition-colors"
            title="명령어 복사"
          >
            <Terminal className="w-3 h-3 text-(--text-secondary)" />
            <span className="hidden sm:inline">npx atomsystem init</span>
            <span className="sm:hidden">CLI</span>
            {copiedCli ? (
              <Check className="w-2.5 h-2.5 text-emerald-500" />
            ) : (
              <Copy className="w-2.5 h-2.5 text-(--text-muted)" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1 rounded text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (2-Depth) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-(--border-subtle) bg-(--bg-primary) px-6 py-4 space-y-5 max-h-[80vh] overflow-y-auto">
          {NAVIGATION_DEPTH.map((group) => (
            <div key={group.id} className="space-y-1.5">
              <div className="text-[11px] font-mono text-(--text-muted) uppercase font-semibold">
                {group.label} ({group.englishLabel})
              </div>
              <div className="grid grid-cols-1 gap-1 pl-2 border-l border-(--border-subtle)">
                {group.items.map((sub) => {
                  const isActive = pathname?.startsWith(sub.href);
                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`py-1.5 px-2 rounded-md text-xs transition-colors ${
                        isActive
                          ? 'font-bold text-(--text-primary) bg-(--bg-secondary)'
                          : 'text-(--text-secondary) hover:text-(--text-primary)'
                      }`}
                    >
                      <span>{sub.title}</span>
                      <span className="text-[11px] text-(--text-muted) ml-2">
                        {sub.description}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
