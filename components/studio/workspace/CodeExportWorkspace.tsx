'use client';

import React, { useMemo, useState } from 'react';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { StudioStatusBanner } from '@/components/studio/layout/StudioShell';
import { useStudio } from '@/components/studio/context/StudioContext';
import { exportStudioToCSS, exportStudioToTokensJson } from '@/lib/services/studioEngine';
import { Button } from '@/components/ui';

type TokenLayerSlice = 'all' | 'palette' | 'theme' | 'components';

const LAYER_OPTIONS: { id: TokenLayerSlice; label: string }[] = [
  { id: 'all', label: 'Unified SSOT' },
  { id: 'palette', label: 'palette' },
  { id: 'theme', label: 'theme' },
  { id: 'components', label: 'components' },
];

export function CodeExportWorkspace() {
  const { paletteVariables, components, statusTokens, selectedThemeId, themes } = useStudio();
  const [layerSlice, setLayerSlice] = useState<TokenLayerSlice>('all');

  const fullTokensJson = useMemo(
    () =>
      exportStudioToTokensJson(paletteVariables, components, statusTokens, {
        activeThemeId: selectedThemeId,
        themes,
      }),
    [components, paletteVariables, selectedThemeId, statusTokens, themes]
  );

  const slicedTokensJson = useMemo(() => {
    if (layerSlice === 'all') return fullTokensJson;
    try {
      const parsed = JSON.parse(fullTokensJson);
      return JSON.stringify({ [layerSlice]: parsed[layerSlice] }, null, 2);
    } catch {
      return fullTokensJson;
    }
  }, [fullTokensJson, layerSlice]);

  return (
    <main className="flex-1 h-full overflow-y-auto p-5 sm:p-7 studio-scrollbar flex flex-col gap-6">
      <StudioStatusBanner />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-(--text-secondary)">
            <span>tokens/tokens.json (Unified W3C DTCG SSOT)</span>
            <div className="flex items-center gap-1">
              {LAYER_OPTIONS.map((opt) => (
                <Button
                  key={opt.id}
                  variant={layerSlice === opt.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setLayerSlice(opt.id)}
                  className="text-[11px] font-mono h-6 px-2"
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
          <CodeHighlight
            code={slicedTokensJson}
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
