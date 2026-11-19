'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  INITIAL_PALETTE_VARIABLES,
  INITIAL_SEMANTIC_STATUS_TOKENS,
  INITIAL_STUDIO_COMPONENTS,
  PaletteVariable,
  resolveStudioComponentId,
  SemanticStatusToken,
  StudioComponentDefinition,
  StudioRegistry,
} from '@/lib/data/studioData';

export const STUDIO_REGISTRY_UPDATED_EVENT = 'atom-studio-registry-updated';

export function emitStudioRegistryUpdated(registry?: StudioRegistry): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(STUDIO_REGISTRY_UPDATED_EVENT, { detail: registry }));
}

export function getStudioComponentById(
  components: StudioComponentDefinition[],
  rawId: string
): StudioComponentDefinition | undefined {
  const normalized = (rawId || '').trim().toLowerCase();
  const resolved = resolveStudioComponentId(normalized);
  return components.find((c) => c.id === resolved || c.id === normalized);
}

export function useStudioRegistry() {
  const [statusTokens, setStatusTokens] = useState<SemanticStatusToken[]>(INITIAL_SEMANTIC_STATUS_TOKENS);
  const [paletteVariables, setPaletteVariables] = useState<PaletteVariable[]>(INITIAL_PALETTE_VARIABLES);
  const [components, setComponents] = useState<StudioComponentDefinition[]>(INITIAL_STUDIO_COMPONENTS);
  const [activeThemeId, setActiveThemeId] = useState<string>('ocean-blue');
  const [discoveredFiles, setDiscoveredFiles] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const applyRegistry = useCallback((reg?: StudioRegistry | null) => {
    if (!reg) return;
    if (Array.isArray(reg.statusTokens) && reg.statusTokens.length > 0) {
      setStatusTokens(reg.statusTokens);
    }
    if (Array.isArray(reg.paletteVariables) && reg.paletteVariables.length > 0) {
      setPaletteVariables(reg.paletteVariables);
    }
    if (Array.isArray(reg.components) && reg.components.length > 0) {
      setComponents(reg.components);
    }
    if (reg.activeThemeId) {
      setActiveThemeId(reg.activeThemeId);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/studio/registry', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.registry) {
        applyRegistry(data.registry);
      }
      if (Array.isArray(data?.discoveredFiles)) {
        setDiscoveredFiles(data.discoveredFiles);
      }
    } catch {
      // Keep static fallback safely when offline/static export
    } finally {
      setIsLoaded(true);
    }
  }, [applyRegistry]);

  useEffect(() => {
    refresh();

    const handleUpdated = (ev: Event) => {
      const customEv = ev as CustomEvent<StudioRegistry | undefined>;
      if (customEv.detail && Array.isArray(customEv.detail.components)) {
        applyRegistry(customEv.detail);
      } else {
        refresh();
      }
    };

    window.addEventListener(STUDIO_REGISTRY_UPDATED_EVENT, handleUpdated);
    return () => window.removeEventListener(STUDIO_REGISTRY_UPDATED_EVENT, handleUpdated);
  }, [refresh, applyRegistry]);

  return {
    statusTokens,
    paletteVariables,
    components,
    activeThemeId,
    discoveredFiles,
    isLoaded,
    refresh,
  };
}
