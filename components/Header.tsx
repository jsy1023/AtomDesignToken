'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Check, Copy } from 'lucide-react';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';

interface HeaderProps {
  brandColor?: string;
  rightExtra?: React.ReactNode;
}

export function Header({ brandColor, rightExtra }: HeaderProps) {
  const pathname = usePathname();
  const { theme } = useThemeEditor();
  const activeBrandColor = brandColor || theme?.color?.primary || '#18181b';
  const [copiedCli, setCopiedCli] = useState(false);

  const copyCli = () => {
    navigator.clipboard.writeText('npx atomsystem init');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const navItems = [
    { href: '/principles', label: '원칙' },
    { href: '/tokens', label: '디자인 토큰' },
    { href: '/motion', label: '모션' },
    { href: '/components', label: '컴포넌트' },
    { href: '/patterns', label: 'UX 패턴' },
    { href: '/dependencies', label: '디펜던시' },
    { href: '/guide', label: '가이드' },
    { href: '/studio', label: '스튜디오' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-(--bg-primary) border-b border-(--border-subtle) transition-colors">
      <div className="max-w-7xl w-full mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span 
              className="w-4 h-4 rounded-sm flex items-center justify-center shrink-0"
              style={{ backgroundColor: activeBrandColor }}
            />
            <span className="font-bold text-sm tracking-tight text-(--text-primary)">
              AtomDesignToken
            </span>
          </Link>

          {/* Navigation Links - Clean Minimal Monotone */}
          <nav className="hidden lg:flex items-center gap-0.5 text-xs">
            {navItems.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? 'text-(--text-primary) font-semibold bg-(--bg-secondary)'
                      : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {rightExtra}
          <button 
            type="button"
            onClick={copyCli}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border-strong)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] text-xs font-mono text-neutral-600 dark:text-neutral-300 transition"
            title="명령어 복사"
          >
            <Terminal className="w-3 h-3 text-neutral-400" />
            <span className="hidden sm:inline">npx atomsystem init</span>
            <span className="sm:hidden">CLI</span>
            {copiedCli ? (
              <Check className="w-3 h-3 text-emerald-500" />
            ) : (
              <Copy className="w-3 h-3 text-neutral-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
