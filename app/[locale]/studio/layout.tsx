'use client';

import React, { Suspense } from 'react';
import { StudioProvider } from '@/components/studio/context/StudioContext';
import { StudioShell } from '@/components/studio/layout/StudioShell';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono">로딩 중...</div>}>
      <StudioProvider>
        <StudioShell>{children}</StudioShell>
      </StudioProvider>
    </Suspense>
  );
}
