'use client';

import React from 'react';
import { StudioBrandSettings } from '@/components/studio/StudioBrandSettings';
import { StudioStatusBanner } from '@/components/studio/layout/StudioShell';

export default function StudioBrandPage() {
  return (
    <main className="flex-1 h-full overflow-y-auto p-5 sm:p-7 studio-scrollbar flex flex-col gap-6">
      <StudioStatusBanner />
      <StudioBrandSettings />
    </main>
  );
}
