import React from 'react';
import { createRoot } from 'react-dom/client';
import { StudioLocaleProvider } from './shims/next-intl';
import { ThemeEditorProvider } from '@/components/editor/ThemeEditorProvider';
import { StudioProvider, useStudio } from '@/components/studio/context/StudioContext';
import { StudioShell } from '@/components/studio/layout/StudioShell';
import { ComponentStudioWorkspace } from '@/components/studio/workspace/ComponentStudioWorkspace';
import { ThemeManagerWorkspace } from '@/components/studio/workspace/ThemeManagerWorkspace';
import { PaletteManagerWorkspace } from '@/components/studio/workspace/PaletteManagerWorkspace';
import { CodeExportWorkspace } from '@/components/studio/workspace/CodeExportWorkspace';
import { BrandSettingsWorkspace } from '@/components/studio/workspace/BrandSettingsWorkspace';

function StudioRouterView() {
  const { activeTab } = useStudio();

  switch (activeTab) {
    case 'themes':
      return <ThemeManagerWorkspace />;
    case 'palette':
      return <PaletteManagerWorkspace />;
    case 'preview':
      return <CodeExportWorkspace />;
    case 'brand':
      return <BrandSettingsWorkspace />;
    case 'components':
    default:
      return <ComponentStudioWorkspace />;
  }
}

function App() {
  return (
    <StudioLocaleProvider>
      <ThemeEditorProvider>
        <StudioProvider>
          <StudioShell>
            <StudioRouterView />
          </StudioShell>
        </StudioProvider>
      </ThemeEditorProvider>
    </StudioLocaleProvider>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
