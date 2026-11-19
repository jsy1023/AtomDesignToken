'use client';

import React from 'react';
import { StudioThemeManager } from '@/components/studio/StudioThemeManager';
import { StudioStatusBanner } from '@/components/studio/layout/StudioShell';
import { useStudio } from '@/components/studio/context/StudioContext';

export default function StudioThemesPage() {
  const {
    themes,
    selectedThemeId,
    paletteVariables,
    handleSelectTheme,
    handleCreateTheme,
    handleUpdateTheme,
    handleDeleteTheme,
  } = useStudio();

  return (
    <main className="flex-1 h-full overflow-y-auto p-5 sm:p-7 studio-scrollbar flex flex-col gap-6">
      <StudioStatusBanner />
      <StudioThemeManager
        themes={themes}
        activeThemeId={selectedThemeId}
        paletteVariables={paletteVariables}
        onSelectTheme={handleSelectTheme}
        onCreateTheme={handleCreateTheme}
        onUpdateTheme={handleUpdateTheme}
        onDeleteTheme={handleDeleteTheme}
      />
    </main>
  );
}
