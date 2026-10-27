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
} from 'lucide-react';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { NAVIGATION_DEPTH, NavGroup } from '@/lib/data/navigation';

interface HeaderProps {
  brandColor?: string;
  rightExtra?: React.ReactNode;
}

export function Header({ brandColor, rightExtra }: HeaderProps) {
  const pathname = usePathname();
  const { theme } = useThemeEditor();
  const activeBrandColor = brandColor || theme?.color?.primary || '#18181b';
  const [copiedCli, setCopiedCli] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copyCli = () => {
    navigator.clipboard.writeText('npx atomsystem init');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
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
    <header className="sticky top-0 z-40 bg-(--bg-primary) border-b border-(--border-subtle) transition-colors">
      <div className="max-w-7xl w-full mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: Brand Logo & 2-Depth Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span 
              className="w-4 h-4 rounded-sm flex items-center justify-center shrink-0"
              style={{ backgroundColor: activeBrandColor }}
            />
            <span className="font-bold text-sm tracking-tight text-(--text-primary)">
              AtomDesignToken
            </span>
          </Link>

          {/* Desktop 2-Depth Navigation */}
          <nav
            ref={dropdownRef}
            className="hidden md:flex items-center gap-1 text-xs"
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
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                      isSingleActive
                        ? 'text-(--text-primary) font-bold bg-(--bg-secondary)'
                        : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)/50'
                    }`}
                  >
                    <span>{group.label}</span>
                    {singleItem.badge && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold border border-purple-500/20">
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
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                      active || isOpen
                        ? 'text-(--text-primary) font-bold bg-(--bg-secondary)'
                        : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)/50'
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : 'opacity-60'
                      }`}
                    />
                  </button>

                  {/* Depth 2 Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute left-0 top-full pt-1.5 w-72 z-50">
                      <div className="p-1.5 rounded-xl bg-(--bg-primary) border border-(--border-subtle) shadow-xl space-y-0.5">
                        <div className="px-3 py-1 text-[10px] font-mono text-(--text-muted) uppercase">
                          {group.englishLabel}
                        </div>
                        {group.items.map((sub) => {
                          const isSubActive = pathname?.startsWith(sub.href);
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block px-3 py-2 rounded-lg transition-colors ${
                                isSubActive
                                  ? 'bg-(--bg-secondary) text-(--text-primary)'
                                  : 'hover:bg-(--bg-secondary)/60 text-(--text-secondary) hover:text-(--text-primary)'
                              }`}
                            >
                              <div className="font-semibold text-xs text-(--text-primary)">
                                {sub.title}
                              </div>
                              <p className="text-[11px] text-(--text-muted) mt-0.5 leading-snug line-clamp-1">
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
          <button 
            type="button"
            onClick={copyCli}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-(--border-strong) bg-(--bg-secondary) hover:bg-(--bg-primary) text-xs font-mono text-(--text-secondary) hover:text-(--text-primary) transition-colors"
            title="명령어 복사"
          >
            <Terminal className="w-3 h-3 text-(--text-muted)" />
            <span className="hidden sm:inline">npx atomsystem init</span>
            <span className="sm:hidden">CLI</span>
            {copiedCli ? (
              <Check className="w-3 h-3 text-emerald-500" />
            ) : (
              <Copy className="w-3 h-3 text-(--text-muted)" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
