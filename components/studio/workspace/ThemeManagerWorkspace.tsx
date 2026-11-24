'use client';

import React from 'react';
import { StudioThemeManager } from '@/components/studio/StudioThemeManager';
import { StudioStatusBanner } from '@/components/studio/layout/StudioShell';

export function ThemeManagerWorkspace() {
  return (
    <main className="flex-1 h-full overflow-y-auto p-5 sm:p-7 studio-scrollbar flex flex-col gap-6">
      <StudioStatusBanner />
      <StudioThemeManager />
    </main>
  );
}
