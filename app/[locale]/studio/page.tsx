'use client';

import React from 'react';
import { StudioThemeManager } from '@/components/studio/StudioThemeManager';
import { StudioBrandSettings } from '@/components/studio/StudioBrandSettings';
import { StudioStatusBanner } from '@/components/studio/layout/StudioShell';
import { ComponentStudioWorkspace } from '@/components/studio/workspace/ComponentStudioWorkspace';
import { PaletteManagerWorkspace } from '@/components/studio/workspace/PaletteManagerWorkspace';
import { CodeExportWorkspace } from '@/components/studio/workspace/CodeExportWorkspace';
import { useStudio } from '@/components/studio/context/StudioContext';

export default function LocalStudioPage() {
  const {
    activeTab,
    themes,
    selectedThemeId,
    paletteVariables,
    handleSelectTheme,
    handleCreateTheme,
    handleUpdateTheme,
    handleDeleteTheme,
  } = useStudio();

  if (activeTab === 'themes') {
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

  if (activeTab === 'palette') {
    return <PaletteManagerWorkspace />;
  }

  if (activeTab === 'preview') {
    return <CodeExportWorkspace />;
  }

  if (activeTab === 'brand') {
    return (
      <main className="flex-1 h-full overflow-y-auto p-5 sm:p-7 studio-scrollbar flex flex-col gap-6">
        <StudioStatusBanner />
        <StudioBrandSettings />
      </main>
    );
  }

  return <ComponentStudioWorkspace />;
}
