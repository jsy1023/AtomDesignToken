'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Sparkles } from 'lucide-react';
import { useStudio } from '@/components/studio/context/StudioContext';
import { StudioRemoteGuard } from './StudioRemoteGuard';
import { StudioTopBar } from './StudioTopBar';
import { StudioSidebar } from './StudioSidebar';
import { StudioModalsHost } from '@/components/studio/modals/StudioModalsHost';

export function StudioStatusBanner() {
  const { statusMessage, saveSuccess } = useStudio();
  if (!statusMessage) return null;

  return (
    <div
      className={`p-3 rounded-(--radius) text-xs font-medium flex items-center gap-2 shrink-0 ${
        saveSuccess
          ? 'bg-(--atom-color-success)/10 text-(--atom-color-success) border border-(--atom-color-success)/20'
          : 'bg-(--accent-primary)/10 text-(--accent-primary) border border-(--accent-primary)/20'
      }`}
    >
      <Sparkles className="w-4 h-4 shrink-0" />
      <span>{statusMessage}</span>
    </div>
  );
}

export function StudioShell({ children }: { children: React.ReactNode }) {
  const { isLocalHost } = useStudio();

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col h-screen overflow-hidden">
      <Header />

      {isLocalHost === false ? (
        <StudioRemoteGuard />
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          <StudioTopBar />
          <div className="flex-1 w-full flex flex-col md:flex-row overflow-hidden animate-in fade-in">
            <StudioSidebar />
            <div className="flex-1 min-w-0 h-full flex flex-col overflow-hidden">{children}</div>
          </div>
        </div>
      )}

      <StudioModalsHost />
    </div>
  );
}
