'use client';

import React from 'react';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { StudioStatusBanner } from '@/components/studio/layout/StudioShell';
import { useStudio } from '@/components/studio/context/StudioContext';
import { exportStudioToCSS, exportStudioToTokensJson } from '@/lib/services/studioEngine';

export function CodeExportWorkspace() {
  const { paletteVariables, components, statusTokens } = useStudio();

  return (
    <main className="flex-1 h-full overflow-y-auto p-5 sm:p-7 studio-scrollbar flex flex-col gap-6">
      <StudioStatusBanner />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-(--text-secondary)">
            <span>tokens/token.json (W3C DTCG Format)</span>
          </div>
          <CodeHighlight
            code={exportStudioToTokensJson(paletteVariables, components, statusTokens)}
            language="json"
            className="max-h-[520px] text-xs"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-(--text-secondary)">
            <span>css/atom-ui.css (Scoped Variable CSS)</span>
          </div>
          <CodeHighlight
            code={exportStudioToCSS(paletteVariables, components, statusTokens)}
            language="css"
            className="max-h-[520px] text-xs"
          />
        </div>
      </div>
    </main>
  );
}
