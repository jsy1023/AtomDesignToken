'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Layers, Terminal, Check, Copy, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  brandColor?: string;
  rightExtra?: React.ReactNode;
}

export function Header({ brandColor = '#2563eb', rightExtra }: HeaderProps) {
  const pathname = usePathname();
  const [copiedCli, setCopiedCli] = useState(false);

  const copyCli = () => {
    navigator.clipboard.writeText('npx atomsystem init');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const isPatterns = pathname?.startsWith('/patterns');
  const isComponents = pathname?.startsWith('/components');

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#090a0f]/80 border-b border-neutral-200/70 dark:border-neutral-800/70 transition-colors">
      <div className="max-w-7xl w-full mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: brandColor }}
          >
            <LayoutGrid className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-neutral-900 dark:text-neutral-100">
              AtomDesignToken
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
              Agent-Native
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-6 text-sm font-medium">
          <Link 
            href="/patterns" 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              isPatterns 
                ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/60 shadow-xs' 
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isPatterns ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-400'}`} />
            <span>UX 패턴</span>
          </Link>
          <Link 
            href="/components" 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              isComponents 
                ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 shadow-xs' 
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
            }`}
          >
            <Layers className={`w-3.5 h-3.5 ${isComponents ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400'}`} />
            <span>컴포넌트 갤러리</span>
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {rightExtra}
          <button 
            onClick={copyCli}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition active:scale-95"
            title="명령어 복사"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden sm:inline">npx atomsystem init</span>
            <span className="sm:hidden">CLI</span>
            {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
