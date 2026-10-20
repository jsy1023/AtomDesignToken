import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { FolderTree, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SNMP MIB Explorer - AtomDesignToken Consumer Example',
  description: '독립 실행형 SNMP MIB 파서 및 OID 계층 트리 검색엔진 (AtomDesignToken 라이브러리 기반)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)] antialiased">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-primary)]/90 border-b border-[var(--border-subtle)]">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center text-white shadow-md">
                <FolderTree className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-neutral-900 dark:text-neutral-100">
                    SNMP MIB Explorer
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
                    Standalone Example
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Powered by <span className="font-semibold text-blue-600 dark:text-blue-400">atomsystem</span> Design Token Library
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NPM Package Consumer Mode</span>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
