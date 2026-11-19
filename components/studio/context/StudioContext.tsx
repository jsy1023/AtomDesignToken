'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import {
  ComponentInteractiveStatus,
  ComponentTypeSpec,
  ComponentVariable,
  getComponentStatusProperties,
  getComponentTypes,
  INITIAL_PALETTE_VARIABLES,
  INITIAL_SEMANTIC_STATUS_TOKENS,
  INITIAL_STUDIO_COMPONENTS,
  PaletteVariable,
  resolveStudioComponentId,
  SemanticStatusToken,
  StudioComponentDefinition,
  StudioRegistry,
} from '@/lib/data/studioData';
import { INITIAL_STUDIO_THEMES, StudioTheme, studioThemeToThemeConfig } from '@/lib/data/themeData';
import { applyThemeToDOM, injectWebfontLink } from '@/lib/services/themeEngine';
import { exportStudioToCSS, exportStudioToTokensJson } from '@/lib/services/studioEngine';
import {
  ComponentCatalogService,
  PaletteColorFamilyItem,
  PaletteRepository,
  StudioPersistenceClient,
} from '@/lib/services/studioStore';
import { emitStudioRegistryUpdated } from '@/lib/hooks/useStudioRegistry';

export type StudioTab = 'components' | 'themes' | 'palette' | 'preview' | 'brand';
export type PaletteCategoryFilter = 'all' | 'status' | 'color' | 'size' | 'radius' | 'typography';

interface StudioContextValue {
  locale: string;
  t: ReturnType<typeof useTranslations>;
  activeTab: StudioTab;
  handleSelectTab: (tab: StudioTab) => void;

  // Environment / persistence status
  isLocalHost: boolean | null;
  setIsLocalHost: React.Dispatch<React.SetStateAction<boolean | null>>;
  hostname: string;
  copiedCli: boolean;
  copyStudioCommand: () => void;
  isSaving: boolean;
  saveSuccess: boolean;
  statusMessage: string | null;
  setStatusMessage: React.Dispatch<React.SetStateAction<string | null>>;
  handleSaveToProject: () => Promise<void>;
  handleResetAll: () => void;

  // Themes
  themes: StudioTheme[];
  selectedThemeId: string;
  handleSelectTheme: (themeId: string) => void;
  handleCreateTheme: (newTheme: StudioTheme) => void;
  handleUpdateTheme: (updated: StudioTheme) => void;
  handleDeleteTheme: (themeId: string) => void;
  handleToggleThemeMode: () => void;

  // Registry core state
  statusTokens: SemanticStatusToken[];
  paletteVariables: PaletteVariable[];
  components: StudioComponentDefinition[];
  filteredComponents: StudioComponentDefinition[];
  currentComponent: StudioComponentDefinition;
  currentVariable: ComponentVariable;
  currentTypes: ComponentTypeSpec[];
  currentType: ComponentTypeSpec;
  currentStatusProps: ReturnType<typeof getComponentStatusProperties>;

  // Component selection & filters
  selectedComponentId: string;
  selectedVariableId: string;
  selectedTypeId: string;
  setSelectedTypeId: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  handleSelectComponent: (compId: string) => void;
  handleSelectVariable: (varId: string) => void;

  // Stage interaction controls
  stageStatuses: Record<string, ComponentInteractiveStatus>;
  setStageStatuses: React.Dispatch<React.SetStateAction<Record<string, ComponentInteractiveStatus>>>;
  stageVariables: Record<string, string>;
  setStageVariables: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  stageSizes: Record<string, 'sm' | 'md' | 'lg'>;
  setStageSizes: React.Dispatch<React.SetStateAction<Record<string, 'sm' | 'md' | 'lg'>>>;
  stageIconSlots: Record<string, 'none' | 'left' | 'right' | 'icon-only'>;
  setStageIconSlots: React.Dispatch<React.SetStateAction<Record<string, 'none' | 'left' | 'right' | 'icon-only'>>>;
  inspectorStatusTab: ComponentInteractiveStatus | 'all';
  handleSelectInspectorStatus: (st: ComponentInteractiveStatus | 'all') => void;
  codeSnippetLang: 'react' | 'html' | 'vue';
  setCodeSnippetLang: React.Dispatch<React.SetStateAction<'react' | 'html' | 'vue'>>;
  copiedVarCode: string | null;
  handleCopyCode: (code: string, varId: string) => void;

  // Mutations
  getPaletteValue: (paletteId: string) => string;
  handleUpdateBinding: (propertyKey: string, newPaletteId: string) => void;
  handleCreateType: (draft: { id: string; name: string; description: string; whenToUse: string }) => void;
  handleDeleteType: (typeId: string) => void;
  handleCreateVariable: (draft: { id: string; name: string; description: string }) => void;
  handleCreatePalette: (draft: {
    id: string;
    name: string;
    category: PaletteVariable['category'];
    value: string;
    description: string;
    family: string;
  }) => void;
  handleSaveEditPalette: (tokenId: string, patch: { name: string; value: string; description: string }) => void;
  handleDeletePalette: (palId: string) => void;
  handleAddPaletteScale: (newTokens: PaletteVariable[], family: string) => void;
  handleUpdateFontToken: (tokenId: string, value: string, cdnUrl?: string) => void;
  handleSubmittedComponent: (result: {
    component: StudioComponentDefinition;
    registry: StudioRegistry;
    filesWritten: string[];
  }) => void;

  // Palette filter & view state
  paletteCategoryFilter: PaletteCategoryFilter;
  setPaletteCategoryFilter: React.Dispatch<React.SetStateAction<PaletteCategoryFilter>>;
  colorFamilyFilter: string;
  setColorFamilyFilter: React.Dispatch<React.SetStateAction<string>>;
  paletteSearchQuery: string;
  setPaletteSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  displayedPalettes: PaletteVariable[];
  dynamicFamilyKeys: string[];
  colorFamilies: PaletteColorFamilyItem[];
  copiedPaletteId: string | null;
  handleCopyPalette: (id: string) => void;

  // Modals state
  isAddTypeOpen: boolean;
  setIsAddTypeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddVariableOpen: boolean;
  setIsAddVariableOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddPaletteOpen: boolean;
  setIsAddPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPaletteGeneratorOpen: boolean;
  setIsPaletteGeneratorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitComponentOpen: boolean;
  setIsSubmitComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingPalette: PaletteVariable | null;
  setEditingPalette: React.Dispatch<React.SetStateAction<PaletteVariable | null>>;
}

const StudioContext = createContext<StudioContextValue | null>(null);

function resolveTabFromRoute(pathname: string | null, urlTab: string | null): StudioTab {
  if (pathname?.endsWith('/studio/themes')) return 'themes';
  if (pathname?.endsWith('/studio/palette')) return 'palette';
  if (pathname?.endsWith('/studio/code')) return 'preview';
  if (pathname?.endsWith('/studio/brand')) return 'brand';
  if (
    urlTab === 'themes' ||
    urlTab === 'palette' ||
    urlTab === 'preview' ||
    urlTab === 'components' ||
    urlTab === 'brand'
  ) {
    return urlTab;
  }
  return 'components';
}

const TAB_TO_ROUTE: Record<StudioTab, string> = {
  components: '/studio',
  themes: '/studio/themes',
  palette: '/studio/palette',
  preview: '/studio/code',
  brand: '/studio/brand',
};

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const t = useTranslations('studioPage');
  const { theme, resetTheme, applyFullTheme, updateFontFamily } = useThemeEditor();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlTab = searchParams.get('tab');
  const urlComponent = searchParams.get('component');
  const urlVariable = searchParams.get('variable');
  const urlTheme = searchParams.get('theme');
  const resolvedUrlComp = urlComponent ? resolveStudioComponentId(urlComponent) : '';

  const activeTab = useMemo(() => resolveTabFromRoute(pathname, urlTab), [pathname, urlTab]);

  // Themes & Core Registry State
  const [themes, setThemes] = useState<StudioTheme[]>(INITIAL_STUDIO_THEMES);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(() =>
    urlTheme && INITIAL_STUDIO_THEMES.some((th) => th.id === urlTheme) ? urlTheme : 'ocean-blue'
  );
  const [statusTokens, setStatusTokens] = useState<SemanticStatusToken[]>(INITIAL_SEMANTIC_STATUS_TOKENS);
  const [paletteVariables, setPaletteVariables] = useState<PaletteVariable[]>(INITIAL_PALETTE_VARIABLES);
  const [components, setComponents] = useState<StudioComponentDefinition[]>(INITIAL_STUDIO_COMPONENTS);

  const [selectedComponentId, setSelectedComponentId] = useState<string>(() =>
    resolvedUrlComp && INITIAL_STUDIO_COMPONENTS.some((c) => c.id === resolvedUrlComp)
      ? resolvedUrlComp
      : 'button'
  );
  const [selectedVariableId, setSelectedVariableId] = useState<string>(() => {
    const comp =
      INITIAL_STUDIO_COMPONENTS.find((c) => c.id === (resolvedUrlComp || 'button')) ||
      INITIAL_STUDIO_COMPONENTS[0];
    if (urlVariable && comp.variables.some((v) => v.id === urlVariable)) {
      return urlVariable;
    }
    return comp.variables[0]?.id || 'primary';
  });
  const [selectedTypeId, setSelectedTypeId] = useState<string>(
    () => getComponentTypes(resolvedUrlComp || 'button')[0]?.id || 'solid'
  );

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [paletteCategoryFilter, setPaletteCategoryFilter] =
    useState<PaletteCategoryFilter>('status');
  const [colorFamilyFilter, setColorFamilyFilter] = useState('all');
  const [paletteSearchQuery, setPaletteSearchQuery] = useState('');
  const [copiedPaletteId, setCopiedPaletteId] = useState<string | null>(null);

  // Modals
  const [isAddTypeOpen, setIsAddTypeOpen] = useState(false);
  const [isAddVariableOpen, setIsAddVariableOpen] = useState(false);
  const [isAddPaletteOpen, setIsAddPaletteOpen] = useState(false);
  const [isPaletteGeneratorOpen, setIsPaletteGeneratorOpen] = useState(false);
  const [isSubmitComponentOpen, setIsSubmitComponentOpen] = useState(false);
  const [editingPalette, setEditingPalette] = useState<PaletteVariable | null>(null);

  // Interactive Stage Controls
  const [stageStatuses, setStageStatuses] = useState<Record<string, ComponentInteractiveStatus>>({});
  const [inspectorStatusTab, setInspectorStatusTab] =
    useState<ComponentInteractiveStatus | 'all'>('default');
  const [stageVariables, setStageVariables] = useState<Record<string, string>>({});
  const [stageSizes, setStageSizes] = useState<Record<string, 'sm' | 'md' | 'lg'>>({});
  const [stageIconSlots, setStageIconSlots] = useState<
    Record<string, 'none' | 'left' | 'right' | 'icon-only'>
  >({});
  const [codeSnippetLang, setCodeSnippetLang] = useState<'react' | 'html' | 'vue'>('react');
  const [copiedVarCode, setCopiedVarCode] = useState<string | null>(null);

  // Status & Environment Guard
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLocalHost, setIsLocalHost] = useState<boolean | null>(null);
  const [hostname, setHostname] = useState('');
  const [copiedCli, setCopiedCli] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      setHostname(host);
      setIsLocalHost(
        host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host.endsWith('.local')
      );
    }
  }, []);

  // Sync URL query params -> state (back/forward)
  useEffect(() => {
    if (resolvedUrlComp && components.some((c) => c.id === resolvedUrlComp)) {
      setSelectedComponentId((prev) => (prev !== resolvedUrlComp ? resolvedUrlComp : prev));
    }
    if (urlVariable) {
      setSelectedVariableId((prev) => (prev !== urlVariable ? urlVariable : prev));
    }
    if (urlTheme && themes.some((th) => th.id === urlTheme)) {
      setSelectedThemeId((prev) => (prev !== urlTheme ? urlTheme : prev));
    }
  }, [resolvedUrlComp, urlVariable, urlTheme, components, themes]);

  // Initial mount: apply active theme + hydrate live SSOT project registry
  useEffect(() => {
    const initial = themes.find((th) => th.id === selectedThemeId);
    if (initial) {
      const cfg = studioThemeToThemeConfig(initial, paletteVariables);
      applyThemeToDOM(cfg);
    }

    let cancelled = false;
    StudioPersistenceClient.loadRegistry().then((data) => {
      if (cancelled || !data?.registry) return;
      const reg = data.registry;
      if (Array.isArray(reg.themes) && reg.themes.length > 0) {
        setThemes(reg.themes);
      }
      if (Array.isArray(reg.statusTokens) && reg.statusTokens.length > 0) {
        setStatusTokens(reg.statusTokens);
      }
      if (Array.isArray(reg.paletteVariables) && reg.paletteVariables.length > 0) {
        setPaletteVariables(reg.paletteVariables);
      }
      if (Array.isArray(reg.components) && reg.components.length > 0) {
        setComponents(reg.components);
        if (resolvedUrlComp) {
          const matched = reg.components.find((c) => c.id === resolvedUrlComp);
          if (matched) {
            setSelectedComponentId(matched.id);
            const tList = getComponentTypes(matched.id, matched.types);
            setSelectedTypeId(tList[0]?.id || 'standard');
            if (!urlVariable || !matched.variables.some((v) => v.id === urlVariable)) {
              setSelectedVariableId(matched.variables[0]?.id || 'default');
            }
          }
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Synchronize Webfont CDN & CSS font-family variables
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const sansToken = paletteVariables.find((p) => p.id === '--atom-font-sans');
    const monoToken = paletteVariables.find((p) => p.id === '--atom-font-mono');

    if (sansToken) {
      injectWebfontLink(sansToken.cdnUrl, 'atom-studio-font-sans-cdn');
      document.documentElement.style.setProperty('--atom-font-sans', sansToken.value);
      document.documentElement.style.setProperty('--font-sans', sansToken.value);
      if (sansToken.value && theme?.typography?.fontFamily !== sansToken.value) {
        updateFontFamily(sansToken.value);
      }
    }

    if (monoToken) {
      injectWebfontLink(monoToken.cdnUrl, 'atom-studio-font-mono-cdn');
      document.documentElement.style.setProperty('--atom-font-mono', monoToken.value);
      document.documentElement.style.setProperty('--font-mono', monoToken.value);
    }
  }, [paletteVariables, theme?.typography?.fontFamily, updateFontFamily]);

  const updateUrl = useCallback(
    (newTab?: StudioTab, newComponent?: string, newVariable?: string, newTheme?: string) => {
      const targetTab = newTab !== undefined ? newTab : activeTab;
      const targetRoute = TAB_TO_ROUTE[targetTab] || '/studio';
      const params = new URLSearchParams();
      const compId = newComponent !== undefined ? newComponent : selectedComponentId;
      const varId = newVariable !== undefined ? newVariable : selectedVariableId;
      const themeId = newTheme !== undefined ? newTheme : selectedThemeId;

      if (targetTab === 'components') {
        if (compId) params.set('component', compId);
        if (varId) params.set('variable', varId);
      }
      if (themeId && themeId !== 'ocean-blue') {
        params.set('theme', themeId);
      }

      const qs = params.toString();
      const targetUrl = qs ? `${targetRoute}?${qs}` : targetRoute;
      if (targetTab !== activeTab) {
        router.push(targetUrl, { scroll: false });
      } else {
        router.replace(targetUrl, { scroll: false });
      }
    },
    [activeTab, router, selectedComponentId, selectedThemeId, selectedVariableId]
  );

  const handleSelectTab = useCallback(
    (tab: StudioTab) => {
      updateUrl(tab, selectedComponentId, selectedVariableId, selectedThemeId);
    },
    [selectedComponentId, selectedThemeId, selectedVariableId, updateUrl]
  );

  const handleSelectComponent = useCallback(
    (compId: string) => {
      const comp = components.find((c) => c.id === compId);
      const firstVarId = comp?.variables[0]?.id || 'default';
      const firstTypeId = getComponentTypes(compId, comp?.types)[0]?.id || 'solid';
      setSelectedComponentId(compId);
      setSelectedVariableId(firstVarId);
      setSelectedTypeId(firstTypeId);
      updateUrl('components', compId, firstVarId, selectedThemeId);
    },
    [components, selectedThemeId, updateUrl]
  );

  const handleSelectVariable = useCallback(
    (varId: string) => {
      setSelectedVariableId(varId);
      updateUrl('components', selectedComponentId, varId, selectedThemeId);
    },
    [selectedComponentId, selectedThemeId, updateUrl]
  );

  const handleSelectTheme = useCallback(
    (themeId: string) => {
      setSelectedThemeId(themeId);
      const targetTheme = themes.find((th) => th.id === themeId);
      if (targetTheme) {
        const cfg = studioThemeToThemeConfig(targetTheme, paletteVariables);
        applyThemeToDOM(cfg);
        applyFullTheme(cfg);
      }
      updateUrl(activeTab, selectedComponentId, selectedVariableId, themeId);
    },
    [
      activeTab,
      applyFullTheme,
      paletteVariables,
      selectedComponentId,
      selectedVariableId,
      themes,
      updateUrl,
    ]
  );

  const handleCreateTheme = (newTheme: StudioTheme) => {
    setThemes((prev) => [...prev, newTheme]);
    handleSelectTheme(newTheme.id);
  };

  const handleUpdateTheme = (updated: StudioTheme) => {
    setThemes((prev) => prev.map((th) => (th.id === updated.id ? updated : th)));
    if (selectedThemeId === updated.id) {
      const cfg = studioThemeToThemeConfig(updated, paletteVariables);
      applyThemeToDOM(cfg);
      applyFullTheme(cfg);
    }
  };

  const handleDeleteTheme = (themeId: string) => {
    if (themes.length <= 1) return;
    setThemes((prev) => prev.filter((th) => th.id !== themeId));
    if (selectedThemeId === themeId) {
      const remaining = themes.filter((th) => th.id !== themeId);
      handleSelectTheme(remaining[0].id);
    }
  };

  const handleToggleThemeMode = () => {
    const cur = themes.find((th) => th.id === selectedThemeId);
    if (!cur) return;
    const targetMode = cur.mode === 'dark' ? 'light' : 'dark';
    const opp = themes.find((th) => th.mode === targetMode);
    if (opp) handleSelectTheme(opp.id);
  };

  const currentComponent =
    components.find((c) => c.id === selectedComponentId) || components[0];
  const currentVariable =
    currentComponent.variables.find((v) => v.id === selectedVariableId) ||
    currentComponent.variables[0];
  const currentTypes = getComponentTypes(currentComponent.id, currentComponent.types);
  const currentType =
    currentTypes.find((tp) => tp.id === selectedTypeId) || currentTypes[0];
  const currentStatusProps = getComponentStatusProperties(
    currentComponent.id,
    inspectorStatusTab,
    currentComponent.properties
  );

  const handleSelectInspectorStatus = (st: ComponentInteractiveStatus | 'all') => {
    setInspectorStatusTab(st);
    if (st !== 'all') {
      setStageStatuses((prev) => ({ ...prev, [currentVariable.id]: st }));
    }
  };

  const getPaletteValue = useCallback(
    (paletteId: string): string => {
      const activeTheme = themes.find((th) => th.id === selectedThemeId);
      return PaletteRepository.resolveValue(paletteVariables, paletteId, activeTheme);
    },
    [paletteVariables, selectedThemeId, themes]
  );

  const handleUpdateBinding = (propertyKey: string, newPaletteId: string) => {
    setComponents((prev) =>
      ComponentCatalogService.updateTokenBinding(
        prev,
        currentComponent.id,
        currentVariable.id,
        propertyKey,
        newPaletteId
      )
    );
  };

  const handleCreateType = (draft: {
    id: string;
    name: string;
    description: string;
    whenToUse: string;
  }) => {
    const res = ComponentCatalogService.createType(components, currentComponent.id, draft);
    if (!res) return;
    setComponents(res.components);
    setSelectedTypeId(res.createdType.id);
    setIsAddTypeOpen(false);
    setTimeout(() => {
      document
        .getElementById(`live-stage-type-${res.createdType.id}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
  };

  const handleDeleteType = (typeId: string) => {
    setComponents((prev) =>
      ComponentCatalogService.deleteType(prev, currentComponent.id, typeId)
    );
    if (selectedTypeId === typeId) {
      const remaining = currentTypes.filter((tp) => tp.id !== typeId);
      setSelectedTypeId(remaining[0]?.id || '');
    }
  };

  const handleCreateVariable = (draft: {
    id: string;
    name: string;
    description: string;
  }) => {
    const res = ComponentCatalogService.createVariable(
      components,
      currentComponent.id,
      currentVariable,
      draft
    );
    if (!res) return;
    setComponents(res.components);
    setSelectedVariableId(res.createdVar.id);
    updateUrl('components', currentComponent.id, res.createdVar.id, selectedThemeId);
    setIsAddVariableOpen(false);
  };

  const handleCreatePalette = (draft: {
    id: string;
    name: string;
    category: PaletteVariable['category'];
    value: string;
    description: string;
    family: string;
  }) => {
    if (!draft.name.trim() || !draft.id.trim() || !draft.value.trim()) return;
    setPaletteVariables((prev) => PaletteRepository.createToken(prev, draft));
    setIsAddPaletteOpen(false);
  };

  const handleSaveEditPalette = (
    tokenId: string,
    patch: { name: string; value: string; description: string }
  ) => {
    setPaletteVariables((prev) => PaletteRepository.updateToken(prev, tokenId, patch));
    setEditingPalette(null);
  };

  const handleDeletePalette = (palId: string) => {
    setPaletteVariables((prev) => PaletteRepository.deleteToken(prev, palId));
  };

  const handleAddPaletteScale = (newTokens: PaletteVariable[], family: string) => {
    setPaletteVariables((prev) => PaletteRepository.addScale(prev, newTokens));
    setColorFamilyFilter(family);
    setPaletteCategoryFilter('color');
  };

  const handleUpdateFontToken = (tokenId: string, value: string, cdnUrl?: string) => {
    setPaletteVariables((prev) =>
      PaletteRepository.upsertFontToken(prev, tokenId, value, cdnUrl)
    );
  };

  const handleSubmittedComponent = ({
    component,
    registry,
    filesWritten,
  }: {
    component: StudioComponentDefinition;
    registry: StudioRegistry;
    filesWritten: string[];
  }) => {
    if (Array.isArray(registry.statusTokens) && registry.statusTokens.length > 0) {
      setStatusTokens(registry.statusTokens);
    }
    if (Array.isArray(registry.paletteVariables) && registry.paletteVariables.length > 0) {
      setPaletteVariables(registry.paletteVariables);
    }
    if (Array.isArray(registry.components) && registry.components.length > 0) {
      setComponents(registry.components);
    }
    const firstTypeId = component.types?.[0]?.id || 'standard';
    const firstVarId = component.variables?.[0]?.id || 'default';
    setSelectedComponentId(component.id);
    setSelectedTypeId(firstTypeId);
    setSelectedVariableId(firstVarId);
    updateUrl('components', component.id, firstVarId, selectedThemeId);
    emitStudioRegistryUpdated(registry);
    setStatusMessage(
      locale === 'ko'
        ? `✅ '${component.id}' 등록 및 프로젝트 반영 완료 (${filesWritten.join(', ')})`
        : `✅ Registered '${component.id}' (${filesWritten.join(', ')})`
    );
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleCopyCode = (code: string, varId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedVarCode(varId);
    setTimeout(() => setCopiedVarCode(null), 2000);
  };

  const handleCopyPalette = (id: string) => {
    navigator.clipboard.writeText(`var(${id})`);
    setCopiedPaletteId(id);
    setTimeout(() => setCopiedPaletteId(null), 1800);
  };

  const copyStudioCommand = () => {
    navigator.clipboard.writeText('npx atomsystem studio');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleSaveToProject = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const tokensJson = exportStudioToTokensJson(paletteVariables, components, statusTokens, {
        activeThemeId: selectedThemeId,
        themes,
      });
      const cssString = exportStudioToCSS(paletteVariables, components, statusTokens);
      const registryPayload: StudioRegistry = {
        version: '0.14.2',
        updatedAt: new Date().toISOString(),
        activeThemeId: selectedThemeId,
        statusTokens,
        paletteVariables,
        components,
        themes,
      };
      const data = await StudioPersistenceClient.saveProject({
        registry: registryPayload,
        tokensJson,
        cssString,
      });
      emitStudioRegistryUpdated(data?.registry || registryPayload);
      setSaveSuccess(true);
      setStatusMessage(t('saveSuccessMsg'));
      setTimeout(() => {
        setSaveSuccess(false);
        setStatusMessage(null);
      }, 3500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatusMessage(`${t('saveFailMsg')}${message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetAll = () => {
    setPaletteVariables(INITIAL_PALETTE_VARIABLES);
    setComponents(INITIAL_STUDIO_COMPONENTS);
    handleSelectTheme('ocean-blue');
    resetTheme();
  };

  const filteredComponents = useMemo(
    () =>
      ComponentCatalogService.filterComponents(components, {
        category: categoryFilter,
        query: searchQuery,
      }),
    [categoryFilter, components, searchQuery]
  );

  const displayedPalettes = useMemo(
    () =>
      PaletteRepository.filterTokens(paletteVariables, {
        category: paletteCategoryFilter,
        family: colorFamilyFilter,
        query: paletteSearchQuery,
      }),
    [colorFamilyFilter, paletteCategoryFilter, paletteSearchQuery, paletteVariables]
  );

  const colorFamilies = useMemo(
    () => PaletteRepository.extractColorFamilies(paletteVariables, locale),
    [locale, paletteVariables]
  );

  const dynamicFamilyKeys = useMemo(
    () => colorFamilies.filter((f) => f.id !== 'all').map((f) => f.id),
    [colorFamilies]
  );

  const value: StudioContextValue = {
    locale,
    t,
    activeTab,
    handleSelectTab,
    isLocalHost,
    setIsLocalHost,
    hostname,
    copiedCli,
    copyStudioCommand,
    isSaving,
    saveSuccess,
    statusMessage,
    setStatusMessage,
    handleSaveToProject,
    handleResetAll,
    themes,
    selectedThemeId,
    handleSelectTheme,
    handleCreateTheme,
    handleUpdateTheme,
    handleDeleteTheme,
    handleToggleThemeMode,
    statusTokens,
    paletteVariables,
    components,
    filteredComponents,
    currentComponent,
    currentVariable,
    currentTypes,
    currentType,
    currentStatusProps,
    selectedComponentId,
    selectedVariableId,
    selectedTypeId,
    setSelectedTypeId,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    handleSelectComponent,
    handleSelectVariable,
    stageStatuses,
    setStageStatuses,
    stageVariables,
    setStageVariables,
    stageSizes,
    setStageSizes,
    stageIconSlots,
    setStageIconSlots,
    inspectorStatusTab,
    handleSelectInspectorStatus,
    codeSnippetLang,
    setCodeSnippetLang,
    copiedVarCode,
    handleCopyCode,
    getPaletteValue,
    handleUpdateBinding,
    handleCreateType,
    handleDeleteType,
    handleCreateVariable,
    handleCreatePalette,
    handleSaveEditPalette,
    handleDeletePalette,
    handleAddPaletteScale,
    handleUpdateFontToken,
    handleSubmittedComponent,
    paletteCategoryFilter,
    setPaletteCategoryFilter,
    colorFamilyFilter,
    setColorFamilyFilter,
    paletteSearchQuery,
    setPaletteSearchQuery,
    displayedPalettes,
    dynamicFamilyKeys,
    colorFamilies,
    copiedPaletteId,
    handleCopyPalette,
    isAddTypeOpen,
    setIsAddTypeOpen,
    isAddVariableOpen,
    setIsAddVariableOpen,
    isAddPaletteOpen,
    setIsAddPaletteOpen,
    isPaletteGeneratorOpen,
    setIsPaletteGeneratorOpen,
    isSubmitComponentOpen,
    setIsSubmitComponentOpen,
    editingPalette,
    setEditingPalette,
  };

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) {
    throw new Error('useStudio must be used inside <StudioProvider>');
  }
  return ctx;
}
