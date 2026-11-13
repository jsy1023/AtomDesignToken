'use client';

import React from 'react';
import { usePathname } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';

  // Extract activeId: /components/[id] -> id
  const match = pathname?.match(/^\/components\/([^\/?#]+)/);
  const activeId = match ? match[1] : '';

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between transition-colors">
      {/* Global Header */}
      <Header brandColor={brandColor} />

      {/* Main 3-Column Documentation Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-1 flex gap-8 items-start">
        {/* 1. Left Column: Components Sidebar (Persisted across component page transitions) */}
        <DocsSidebar activeId={activeId} />

        {/* 2. Center Column & Right TOC (Page Content) */}
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 mt-12 py-6 px-6 text-center text-xs text-neutral-500">
        <p>© 2026 AtomDesignToken · W3C Design Tokens Community Group Standard</p>
      </footer>
    </div>
  );
}
