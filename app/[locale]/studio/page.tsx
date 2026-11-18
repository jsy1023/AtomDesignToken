'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { StudioLivePreview } from '@/components/studio/StudioLivePreview';
import { StudioThemeManager } from '@/components/studio/StudioThemeManager';
import { StudioBrandSettings } from '@/components/studio/StudioBrandSettings';
import { formatLocaleText } from '@/lib/utils/localeFormat';
import {
  Button,
  Input,
  Card,
  Badge,
  NativeSelect,
  Textarea,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarLink,
  NavbarActions,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenuButton,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
  NavDropdownItem,
  Checkbox,
  RadioGroup,
  Slider,
  Progress,
  Skeleton,
  Tooltip,
  Accordion,
  Breadcrumb,
  Pagination,
  Separator,
  Calendar,
  SideMenu,
  SideMenuGroup,
  SideMenuItem,
  SideSubMenu,
} from '@/components/ui';
import {
  PaletteVariable,
  ComponentVariable,
  StudioComponentDefinition,
  SemanticStatusToken,
  INITIAL_PALETTE_VARIABLES,
  INITIAL_STUDIO_COMPONENTS,
  INITIAL_SEMANTIC_STATUS_TOKENS,
  resolveTypeSpec,
  resolveVariableRole,
  SEMANTIC_VARIABLE_DICTIONARY,
  COMPONENT_STATUS_PRESETS,
  ComponentInteractiveStatus,
  getComponentStatusProperties,
} from '@/lib/data/studioData';
import {
  exportStudioToTokensJson,
  exportStudioToCSS,
} from '@/lib/services/studioEngine';
import {
  Sliders,
  Sparkles,
  Save,
  Check,
  RotateCcw,
  Palette,
  FileCode,
  ShieldCheck,
  Eye,
  Plus,
  Trash2,
  Edit2,
  Terminal,
  ExternalLink,
  Layers,
  Component,
  Search,
  Ruler,
  Type,
  Square,
  Copy,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Info,
  Activity,
  Sun,
  Moon,
  Building2,
} from 'lucide-react';
import { StudioTheme, INITIAL_STUDIO_THEMES, studioThemeToThemeConfig } from '@/lib/data/themeData';
import { applyThemeToDOM } from '@/lib/services/themeEngine';

export type StudioTab = 'components' | 'themes' | 'palette' | 'preview' | 'brand';

function LocalStudioContent() {
  const locale = useLocale();
  const t = useTranslations('studioPage');
  const { theme, resetTheme, applyFullTheme } = useThemeEditor();
  const brandColor = theme?.color?.primary || 'var(--accent-primary)';

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlTab = searchParams.get('tab');
  const urlComponent = searchParams.get('component');
  const urlVariable = searchParams.get('variable');
  const urlTheme = searchParams.get('theme');

  // Themes State
  const [themes, setThemes] = useState<StudioTheme[]>(INITIAL_STUDIO_THEMES);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(() => {
    if (urlTheme && INITIAL_STUDIO_THEMES.some((th) => th.id === urlTheme)) {
      return urlTheme;
    }
    return 'ocean-blue';
  });

  // State initialized with URL searchParams if present
  const [activeTab, setActiveTab] = useState<StudioTab>(() => {
    if (urlTab === 'themes' || urlTab === 'palette' || urlTab === 'preview' || urlTab === 'components' || urlTab === 'brand') {
      return urlTab;
    }
    return 'components';
  });
  const [paletteVariables, setPaletteVariables] = useState<PaletteVariable[]>(INITIAL_PALETTE_VARIABLES);
  const [components, setComponents] = useState<StudioComponentDefinition[]>(INITIAL_STUDIO_COMPONENTS);

  const [selectedComponentId, setSelectedComponentId] = useState<string>(() => {
    if (urlComponent && INITIAL_STUDIO_COMPONENTS.some((c) => c.id === urlComponent)) {
      return urlComponent;
    }
    return 'button';
  });

  const [selectedVariableId, setSelectedVariableId] = useState<string>(() => {
    const comp = INITIAL_STUDIO_COMPONENTS.find((c) => c.id === (urlComponent || 'button')) || INITIAL_STUDIO_COMPONENTS[0];
    if (urlVariable && comp.variables.some((v) => v.id === urlVariable)) {
      return urlVariable;
    }
    return comp.variables[0]?.id || 'primary';
  });

  // Keep state in sync with URL changes (back/forward navigation)
  useEffect(() => {
    if (urlTab && (urlTab === 'components' || urlTab === 'themes' || urlTab === 'palette' || urlTab === 'preview' || urlTab === 'brand')) {
      setActiveTab((prev) => (prev !== urlTab ? urlTab : prev));
    }
    if (urlComponent && components.some((c) => c.id === urlComponent)) {
      setSelectedComponentId((prev) => (prev !== urlComponent ? urlComponent : prev));
    }
    if (urlVariable) {
      setSelectedVariableId((prev) => (prev !== urlVariable ? urlVariable : prev));
    }
    if (urlTheme && themes.some((th) => th.id === urlTheme)) {
      setSelectedThemeId((prev) => (prev !== urlTheme ? urlTheme : prev));
    }
  }, [urlTab, urlComponent, urlVariable, urlTheme, components, themes]);

  // Synchronize active theme with DOM on initial mount
  useEffect(() => {
    const initial = themes.find((th) => th.id === selectedThemeId);
    if (initial) {
      const cfg = studioThemeToThemeConfig(initial, paletteVariables);
      applyThemeToDOM(cfg);
    }
  }, []);

  // Stage View Mode: Focus (1 selected Value) vs All (Stack of all Variants)
  const [stageViewMode, setStageViewMode] = useState<'focus' | 'all'>('focus');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Palette & Status Management View Filters
  const [statusTokens, setStatusTokens] = useState<SemanticStatusToken[]>(INITIAL_SEMANTIC_STATUS_TOKENS);
  const [paletteCategoryFilter, setPaletteCategoryFilter] = useState<'all' | 'status' | 'color' | 'size' | 'radius' | 'typography'>('status');
  const [colorFamilyFilter, setColorFamilyFilter] = useState<string>('all');
  const [paletteSearchQuery, setPaletteSearchQuery] = useState<string>('');
  const [copiedPaletteId, setCopiedPaletteId] = useState<string | null>(null);

  // Modals / Dialogs
  const [isAddVariableOpen, setIsAddVariableOpen] = useState(false);
  const [newVariableName, setNewVariableName] = useState('');
  const [newVariableKey, setNewVariableKey] = useState('');
  const [newVariableDesc, setNewVariableDesc] = useState('');

  const [isAddPaletteOpen, setIsAddPaletteOpen] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState('');
  const [newPaletteId, setNewPaletteId] = useState('');
  const [newPaletteCategory, setNewPaletteCategory] = useState<'color' | 'size' | 'spacing' | 'radius' | 'typography'>('color');
  const [newPaletteFamily, setNewPaletteFamily] = useState<string>('blue');
  const [newPaletteValue, setNewPaletteValue] = useState('var(--accent-primary)');
  const [newPaletteDesc, setNewPaletteDesc] = useState('');

  // Editing Palette Variable Modal State
  const [editingPalette, setEditingPalette] = useState<PaletteVariable | null>(null);
  const [editPaletteName, setEditPaletteName] = useState('');
  const [editPaletteValue, setEditPaletteValue] = useState('');
  const [editPaletteDesc, setEditPaletteDesc] = useState('');

  const handleOpenEditPalette = (pal: PaletteVariable) => {
    setEditingPalette(pal);
    setEditPaletteName(pal.name);
    setEditPaletteValue(pal.value);
    setEditPaletteDesc(pal.description || '');
  };

  const handleSaveEditPalette = () => {
    if (!editingPalette) return;
    const trimmedVal = editPaletteValue.trim();
    const trimmedName = editPaletteName.trim() || editingPalette.name;
    const trimmedDesc = editPaletteDesc.trim();

    setPaletteVariables((prev) =>
      prev.map((p) =>
        p.id === editingPalette.id
          ? {
              ...p,
              name: trimmedName,
              value: trimmedVal || p.value,
              description: trimmedDesc,
            }
          : p
      )
    );
    setEditingPalette(null);
  };

  // Editing Variable Name
  const [editingVariableId, setEditingVariableId] = useState<string | null>(null);
  const [editingVariableName, setEditingVariableName] = useState('');

  // Interactive Status State per Live Stage variable ('default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading')
  const [stageStatuses, setStageStatuses] = useState<Record<string, ComponentInteractiveStatus>>({});
  // Active Status tab in the Inspector panel (Default, Hover, Active, Focus, Disabled, All)
  const [inspectorStatusTab, setInspectorStatusTab] = useState<ComponentInteractiveStatus | 'all'>('default');

  const [codeSnippetLang, setCodeSnippetLang] = useState<'react' | 'html' | 'vue'>('react');
  const [copiedVarCode, setCopiedVarCode] = useState<string | null>(null);

  const handleCopyCode = (code: string, varId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedVarCode(varId);
    setTimeout(() => setCopiedVarCode(null), 2000);
  };

  // Status & Environment Guard
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLocalHost, setIsLocalHost] = useState<boolean | null>(null);
  const [hostname, setHostname] = useState<string>('');
  const [copiedCli, setCopiedCli] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      setHostname(host);
      const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host.endsWith('.local');
      setIsLocalHost(isLocal);
    }
  }, []);

  const copyStudioCommand = () => {
    navigator.clipboard.writeText('npx atomsystem studio');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  // Helper to update Router URL parameters
  const updateUrl = (newTab?: string, newComponent?: string, newVariable?: string, newTheme?: string) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    const tab = newTab !== undefined ? newTab : activeTab;
    const compId = newComponent !== undefined ? newComponent : selectedComponentId;
    const varId = newVariable !== undefined ? newVariable : selectedVariableId;
    const themeId = newTheme !== undefined ? newTheme : selectedThemeId;

    if (tab === 'components') {
      params.delete('tab');
      if (compId) params.set('component', compId);
      if (varId) params.set('variable', varId);
    } else {
      params.set('tab', tab);
      params.delete('component');
      params.delete('variable');
    }

    if (themeId && themeId !== 'ocean-blue') {
      params.set('theme', themeId);
    } else if (themeId === 'ocean-blue') {
      params.delete('theme');
    }

    const qs = params.toString();
    const target = qs ? `${pathname}?${qs}` : pathname;
    router.replace(target, { scroll: false });
  };

  const handleSelectTab = (tab: StudioTab) => {
    setActiveTab(tab);
    updateUrl(tab, selectedComponentId, selectedVariableId, selectedThemeId);
  };

  const handleSelectComponent = (compId: string) => {
    const comp = components.find((c) => c.id === compId);
    const firstVarId = comp?.variables[0]?.id || 'default';
    setSelectedComponentId(compId);
    setSelectedVariableId(firstVarId);
    updateUrl('components', compId, firstVarId, selectedThemeId);
  };

  const handleSelectVariable = (varId: string) => {
    setSelectedVariableId(varId);
    updateUrl('components', selectedComponentId, varId, selectedThemeId);
  };

  // Theme Handlers
  const handleSelectTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
    const targetTheme = themes.find((th) => th.id === themeId);
    if (targetTheme) {
      const cfg = studioThemeToThemeConfig(targetTheme, paletteVariables);
      applyThemeToDOM(cfg);
      applyFullTheme(cfg);
    }
    updateUrl(activeTab, selectedComponentId, selectedVariableId, themeId);
  };

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
    if (opp) {
      handleSelectTheme(opp.id);
    }
  };

  // Active Component & Variable
  const currentComponent = components.find((c) => c.id === selectedComponentId) || components[0];
  const currentVariable = currentComponent.variables.find((v) => v.id === selectedVariableId) || currentComponent.variables[0];

  // Inspector status sync
  const currentVarStatus = stageStatuses[currentVariable.id] || 'default';

  const handleSelectInspectorStatus = (st: ComponentInteractiveStatus | 'all') => {
    setInspectorStatusTab(st);
    if (st !== 'all') {
      setStageStatuses((prev) => ({ ...prev, [currentVariable.id]: st }));
    }
  };

  // Helper to resolve palette value
  const getPaletteValue = (paletteId: string): string => {
    const activeTheme = themes.find((t) => t.id === selectedThemeId);
    if (activeTheme) {
      if (paletteId === '--atom-color-primary' || paletteId === '--atom-palette-blue-500') {
        return activeTheme.colors.primary;
      }
      if (paletteId === '--atom-color-primary-hover' || paletteId === '--atom-palette-blue-600') {
        return activeTheme.colors.primaryHover || activeTheme.colors.primary;
      }
      if (paletteId === '--atom-palette-blue-50') {
        return activeTheme.colors.primaryLight || `${activeTheme.colors.primary}20`;
      }
    }
    return paletteVariables.find((p) => p.id === paletteId)?.value || paletteId;
  };

  // Update token binding for current component variable
  const handleUpdateBinding = (propertyKey: string, newPaletteId: string) => {
    setComponents((prev) =>
      prev.map((comp) => {
        if (comp.id !== currentComponent.id) return comp;
        return {
          ...comp,
          variables: comp.variables.map((v) => {
            if (v.id !== currentVariable.id) return v;
            return {
              ...v,
              tokenBindings: {
                ...v.tokenBindings,
                [propertyKey]: newPaletteId,
              },
            };
          }),
        };
      })
    );
  };

  // Add new variable to current component
  const handleCreateVariable = () => {
    if (!newVariableName.trim() || !newVariableKey.trim()) return;
    const cleanKey = newVariableKey.trim().toLowerCase().replace(/\s+/g, '-');

    const initialBindings: Record<string, string> = {};
    currentComponent.properties.forEach((prop) => {
      initialBindings[prop.key] = currentVariable?.tokenBindings[prop.key] || prop.defaultPaletteId;
    });

    const newVar: ComponentVariable = {
      id: cleanKey,
      name: newVariableName.trim(),
      description: newVariableDesc.trim(),
      type: resolveTypeSpec(currentComponent.id, cleanKey, newVariableName.trim()),
      variableRole: resolveVariableRole(cleanKey),
      tokenBindings: initialBindings,
    };

    setComponents((prev) =>
      prev.map((comp) => {
        if (comp.id !== currentComponent.id) return comp;
        return {
          ...comp,
          variables: [...comp.variables, newVar],
        };
      })
    );

    setSelectedVariableId(cleanKey);
    updateUrl('components', currentComponent.id, cleanKey, selectedThemeId);
    setIsAddVariableOpen(false);
    setNewVariableName('');
    setNewVariableKey('');
    setNewVariableDesc('');

    setTimeout(() => {
      const el = document.getElementById(`live-stage-${cleanKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Delete variable
  const handleDeleteVariable = (varId: string) => {
    if (currentComponent.variables.length <= 1) return;
    setComponents((prev) =>
      prev.map((comp) => {
        if (comp.id !== currentComponent.id) return comp;
        const filtered = comp.variables.filter((v) => v.id !== varId);
        return { ...comp, variables: filtered };
      })
    );
    if (selectedVariableId === varId) {
      const remaining = currentComponent.variables.filter((v) => v.id !== varId);
      const nextVarId = remaining[0]?.id || 'default';
      setSelectedVariableId(nextVarId);
      updateUrl('components', currentComponent.id, nextVarId, selectedThemeId);
    }
  };

  // Save renamed variable
  const handleSaveRename = (varId: string) => {
    if (!editingVariableName.trim()) return;
    setComponents((prev) =>
      prev.map((comp) => {
        if (comp.id !== currentComponent.id) return comp;
        return {
          ...comp,
          variables: comp.variables.map((v) => {
            if (v.id !== varId) return v;
            return {
              ...v,
              name: editingVariableName.trim(),
              type: resolveTypeSpec(comp.id, varId, editingVariableName.trim()),
            };
          }),
        };
      })
    );
    setEditingVariableId(null);
    setEditingVariableName('');
  };

  // Add Palette Variable
  const handleCreatePalette = () => {
    if (!newPaletteName.trim() || !newPaletteId.trim() || !newPaletteValue.trim()) return;
    const cleanId = newPaletteId.startsWith('--') ? newPaletteId : `--atom-${newPaletteId}`;

    const newPal: PaletteVariable = {
      id: cleanId,
      name: newPaletteName.trim(),
      category: newPaletteCategory,
      value: newPaletteValue.trim(),
      description: newPaletteDesc.trim(),
      family: newPaletteFamily,
    };

    setPaletteVariables((prev) => [...prev, newPal]);
    setIsAddPaletteOpen(false);
    setNewPaletteName('');
    setNewPaletteId('');
    setNewPaletteValue('var(--accent-primary)');
    setNewPaletteDesc('');
  };

  // Delete Palette Variable
  const handleDeletePalette = (palId: string) => {
    setPaletteVariables((prev) => prev.filter((p) => p.id !== palId));
  };

  // Copy Palette variable string
  const handleCopyPalette = (id: string, val: string) => {
    navigator.clipboard.writeText(`var(${id})`);
    setCopiedPaletteId(id);
    setTimeout(() => setCopiedPaletteId(null), 1800);
  };

  // Save Studio to Project Files (FS API)
  const handleSaveToProject = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const tokensJson = exportStudioToTokensJson(paletteVariables, components, statusTokens);
      const cssString = exportStudioToCSS(paletteVariables, components, statusTokens);

      const res = await fetch('/api/studio/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokensJson, cssString }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setSaveSuccess(true);
      setStatusMessage(t('saveSuccessMsg'));
      setTimeout(() => {
        setSaveSuccess(false);
        setStatusMessage(null);
      }, 3500);
    } catch (err: any) {
      console.error('Save to project error:', err);
      setStatusMessage(`${t('saveFailMsg')}${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered lists
  const filteredComponents = components.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const displayedPalettes = paletteVariables.filter((p) => {
    const matchesCat = paletteCategoryFilter === 'all' || p.category === paletteCategoryFilter;
    const matchesFamily = colorFamilyFilter === 'all' || p.family === colorFamilyFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(paletteSearchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(paletteSearchQuery.toLowerCase()) ||
      p.value.toLowerCase().includes(paletteSearchQuery.toLowerCase());
    return matchesCat && matchesFamily && matchesSearch;
  });

  const colorFamilies = [
    { id: 'all', label: locale === 'ko' ? '전체' : 'All', color: 'var(--text-primary)' },
    { id: 'blue', label: locale === 'ko' ? '블루' : 'Blue', color: '#3182f6' },
    { id: 'gray', label: locale === 'ko' ? '그레이' : 'Gray', color: '#64748b' },
    { id: 'emerald', label: locale === 'ko' ? '에메랄드' : 'Emerald', color: '#10b981' },
    { id: 'rose', label: locale === 'ko' ? '로즈' : 'Rose', color: '#f43f5e' },
    { id: 'amber', label: locale === 'ko' ? '앰버' : 'Amber', color: '#f59e0b' },
    { id: 'purple', label: locale === 'ko' ? '퍼플' : 'Purple', color: '#8b5cf6' },
  ];

  // Resolve status-specific properties for inspector
  const currentStatusProps = getComponentStatusProperties(
    currentComponent.id,
    inspectorStatusTab,
    currentComponent.properties
  );

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col h-screen overflow-hidden">
      {/* 1. Global Navigation Header */}
      <Header />

      {/* 2. Non-Local Host Warning Banner & Fallback Guide */}
      {isLocalHost === false ? (
        <main className="flex-1 overflow-y-auto p-6 md:p-12 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            {t('remoteGuardTitle')}
          </h2>
          <p className="text-sm text-(--text-secondary) max-w-lg mb-8 leading-relaxed">
            {t('remoteGuardDesc')} (현재 호스트: <code className="font-mono bg-(--bg-secondary) px-2 py-0.5 rounded text-xs">{hostname}</code>)
          </p>

          <Card className="w-full max-w-md p-6 bg-(--bg-secondary)/40 border border-(--border-subtle) rounded-(--radius) text-left mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-(--accent-primary)" />
              <span className="text-xs font-mono font-bold uppercase text-(--text-secondary)">
                로컬 개발 서버 실행 방법
              </span>
            </div>
            <p className="text-xs text-(--text-secondary) mb-4">
              터미널에서 아래 명령어를 실행하여 로컬 포트(localhost:3000)에서 실행하세요.
            </p>
            <div className="flex items-center justify-between p-3 rounded bg-(--bg-primary) border border-(--border-subtle) font-mono text-xs">
              <code>npx atomsystem studio</code>
              <Button
                variant="secondary"
                size="sm"
                onClick={copyStudioCommand}
                className="text-xs py-1 px-2.5 h-auto flex items-center gap-1"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCli ? t('copiedCli') : t('copyCli')}</span>
              </Button>
            </div>
          </Card>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="secondary" size="sm">
                {t('returnHome')}
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsLocalHost(true)}
              className="text-xs"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              <span>미리보기 모드로 계속 진행</span>
            </Button>
          </div>
        </main>
      ) : (
        /* Unified Sidebar + Main Studio Layout (Independent Scrolling) */
        <div className="flex-1 w-full flex flex-col md:flex-row overflow-hidden border-t border-(--border-subtle) animate-in fade-in">
          {/* ================= LEFT SIDEBAR (Independent Scrollable Container) ================= */}
          <aside className="w-full md:w-72 lg:w-80 shrink-0 border-r border-(--border-subtle) bg-(--bg-secondary)/30 flex flex-col h-full overflow-hidden">
            {/* 1. Main Studio Mode Navigation Menu (Fixed Top in Sidebar) */}
            <div className="shrink-0 p-4 border-b border-(--border-subtle)/60 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-(--text-muted) uppercase tracking-wider block px-1">
                {locale === 'ko' ? '스튜디오 메뉴' : 'Studio Menu'}
              </span>
              <div className="flex flex-col gap-1">
                <Button
                  variant={activeTab === 'components' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleSelectTab('components')}
                  className={`w-full justify-start text-left px-3 py-2 text-xs sm:text-sm font-semibold gap-2.5 ${
                    activeTab === 'components'
                      ? 'bg-(--text-primary) text-(--bg-primary)'
                      : 'text-(--text-secondary) hover:text-(--text-primary)'
                  }`}
                >
                  <Component className="w-4 h-4" />
                  <span>{t('tabComponents')}</span>
                </Button>

                <Button
                  variant={activeTab === 'themes' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleSelectTab('themes')}
                  className={`w-full justify-start text-left px-3 py-2 text-xs sm:text-sm font-semibold gap-2.5 ${
                    activeTab === 'themes'
                      ? 'bg-(--text-primary) text-(--bg-primary)'
                      : 'text-(--text-secondary) hover:text-(--text-primary)'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('tabThemes')}</span>
                </Button>

                <Button
                  variant={activeTab === 'palette' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleSelectTab('palette')}
                  className={`w-full justify-start text-left px-3 py-2 text-xs sm:text-sm font-semibold gap-2.5 ${
                    activeTab === 'palette'
                      ? 'bg-(--text-primary) text-(--bg-primary)'
                      : 'text-(--text-secondary) hover:text-(--text-primary)'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span>{t('tabPalette')}</span>
                </Button>

                <Button
                  variant={activeTab === 'preview' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleSelectTab('preview')}
                  className={`w-full justify-start text-left px-3 py-2 text-xs sm:text-sm font-semibold gap-2.5 ${
                    activeTab === 'preview'
                      ? 'bg-(--text-primary) text-(--bg-primary)'
                      : 'text-(--text-secondary) hover:text-(--text-primary)'
                  }`}
                >
                  <FileCode className="w-4 h-4" />
                  <span>{t('tabJson')}</span>
                </Button>

                <Button
                  variant={activeTab === 'brand' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleSelectTab('brand')}
                  className={`w-full justify-start text-left px-3 py-2 text-xs sm:text-sm font-semibold gap-2.5 ${
                    activeTab === 'brand'
                      ? 'bg-(--text-primary) text-(--bg-primary)'
                      : 'text-(--text-secondary) hover:text-(--text-primary)'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>{t('tabBrand')}</span>
                </Button>
              </div>
            </div>

            {/* 2. UI Components Tree/List (Scrollable inside Left Sidebar only) */}
            {activeTab === 'components' && (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Search & Category Filter (Fixed inside Component Section) */}
                <div className="shrink-0 p-4 pb-2.5 space-y-2.5 border-b border-(--border-subtle)/30">
                  <div className="flex items-center justify-between px-0.5">
                    <span className="text-xs font-mono font-bold text-(--text-secondary) uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-(--accent-primary)" />
                      {locale === 'ko' ? 'UI 컴포넌트' : 'UI Components'}
                    </span>
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">
                      {filteredComponents.length}
                    </span>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-muted)" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('searchComponent')}
                      className="w-full text-xs pl-8 pr-3 py-1.5"
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap gap-1">
                    {['all', 'Form', 'Layout', 'Feedback'].map((cat) => (
                      <Button
                        key={cat}
                        variant={categoryFilter === cat ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setCategoryFilter(cat)}
                        className={`text-[10px] font-mono px-2 py-0.5 h-6 rounded cursor-pointer transition ${
                          categoryFilter === cat
                            ? 'bg-(--accent-primary) text-(--bg-primary) font-semibold'
                            : 'bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle)'
                        }`}
                      >
                        {cat === 'all'
                          ? t('categoryAll')
                          : locale === 'ko'
                            ? (cat === 'Form' ? '폼' : cat === 'Layout' ? '레이아웃' : cat === 'Feedback' ? '피드백' : cat)
                            : cat}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Independent Scrollable Component Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  {filteredComponents.map((comp) => {
                    const isSelected = comp.id === selectedComponentId;
                    return (
                      <Button
                        key={comp.id}
                        variant={isSelected ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => handleSelectComponent(comp.id)}
                        className={`w-full justify-between text-left p-2.5 h-auto text-xs font-medium ${
                          isSelected
                            ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                            : 'hover:bg-(--bg-secondary) text-(--text-primary)'
                        }`}
                      >
                        <span className="truncate">{formatLocaleText(comp.name, locale)}</span>
                        <span className="text-[10px] font-mono opacity-60 ml-2">
                          {comp.variables.length} vars
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Palette Left Sidebar Navigation (When Palette Tab is Active) */}
            {activeTab === 'palette' && (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <div className="shrink-0 p-4 pb-2.5 border-b border-(--border-subtle)/30">
                  <span className="text-xs font-mono font-bold text-(--text-secondary) uppercase tracking-wider block mb-2">
                    팔레트 카테고리
                  </span>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-muted)" />
                    <Input
                      type="text"
                      value={paletteSearchQuery}
                      onChange={(e) => setPaletteSearchQuery(e.target.value)}
                      placeholder="팔레트 검색..."
                      className="w-full text-xs pl-8 pr-3 py-1.5"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  {/* Category 0: Status Semantic Tokens */}
                  <Button
                    variant={paletteCategoryFilter === 'status' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setPaletteCategoryFilter('status')}
                    className={`w-full justify-between text-left p-2.5 h-auto text-xs font-medium ${
                      paletteCategoryFilter === 'status'
                        ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                        : 'hover:bg-(--bg-secondary) text-(--text-primary)'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-(--accent-primary)" />
                      <span>{locale === 'ko' ? '상태 시맨틱 토큰' : 'Semantic Status Tokens'}</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-60">5</span>
                  </Button>

                  {/* Category 1: Color Families */}
                  <Button
                    variant={paletteCategoryFilter === 'color' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      setPaletteCategoryFilter('color');
                      setColorFamilyFilter('all');
                    }}
                    className={`w-full justify-between text-left p-2.5 h-auto text-xs font-medium ${
                      paletteCategoryFilter === 'color' && colorFamilyFilter === 'all'
                        ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                        : 'hover:bg-(--bg-secondary) text-(--text-primary)'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Palette className="w-3.5 h-3.5 text-(--accent-primary)" />
                      <span>{locale === 'ko' ? '컬러 팔레트' : 'Color Palette (50-900)'}</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-60">
                      {paletteVariables.filter((p) => p.category === 'color').length}
                    </span>
                  </Button>

                  {/* Sub-families when in color view */}
                  {paletteCategoryFilter === 'color' && (
                    <div className="pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-(--border-subtle) ml-3 my-1">
                      {colorFamilies.map((fam) => (
                        <Button
                          key={fam.id}
                          variant={colorFamilyFilter === fam.id ? 'primary' : 'ghost'}
                          size="sm"
                          onClick={() => setColorFamilyFilter(fam.id)}
                          className="w-full text-left px-2 py-1.5 h-auto text-[11px] font-medium flex items-center justify-between"
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span
                              style={{ backgroundColor: fam.color }}
                              className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                            />
                            <span className="truncate">{formatLocaleText(fam.label, locale)}</span>
                          </span>
                          <span className="text-[10px] font-mono opacity-60">10</span>
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Category 2: Size & Spacing */}
                  <Button
                    variant={paletteCategoryFilter === 'size' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setPaletteCategoryFilter('size')}
                    className={`w-full justify-between text-left p-2.5 h-auto text-xs font-medium ${
                      paletteCategoryFilter === 'size'
                        ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                        : 'hover:bg-(--bg-secondary) text-(--text-primary)'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Ruler className="w-3.5 h-3.5 text-(--accent-primary)" />
                      <span>{locale === 'ko' ? '사이즈 & 여백' : 'Size & Spacing'}</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-60">
                      {paletteVariables.filter((p) => p.category === 'size' || p.category === 'spacing').length}
                    </span>
                  </Button>

                  {/* Category 3: Border Radius */}
                  <Button
                    variant={paletteCategoryFilter === 'radius' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setPaletteCategoryFilter('radius')}
                    className={`w-full justify-between text-left p-2.5 h-auto text-xs font-medium ${
                      paletteCategoryFilter === 'radius'
                        ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                        : 'hover:bg-(--bg-secondary) text-(--text-primary)'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Square className="w-3.5 h-3.5 text-(--accent-primary)" />
                      <span>{locale === 'ko' ? '모서리 곡률' : 'Border Radius'}</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-60">
                      {paletteVariables.filter((p) => p.category === 'radius').length}
                    </span>
                  </Button>

                  {/* Category 4: Typography */}
                  <Button
                    variant={paletteCategoryFilter === 'typography' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setPaletteCategoryFilter('typography')}
                    className={`w-full justify-between text-left p-2.5 h-auto text-xs font-medium ${
                      paletteCategoryFilter === 'typography'
                        ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                        : 'hover:bg-(--bg-secondary) text-(--text-primary)'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Type className="w-3.5 h-3.5 text-(--accent-primary)" />
                      <span>{locale === 'ko' ? '타이포그래피' : 'Typography'}</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-60">
                      {paletteVariables.filter((p) => p.category === 'typography').length}
                    </span>
                  </Button>

                  {/* Category 5: All Palettes Table */}
                  <Button
                    variant={paletteCategoryFilter === 'all' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setPaletteCategoryFilter('all')}
                    className={`w-full justify-between text-left p-2.5 h-auto text-xs font-medium ${
                      paletteCategoryFilter === 'all'
                        ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                        : 'hover:bg-(--bg-secondary) text-(--text-primary)'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-(--accent-primary)" />
                      <span>{locale === 'ko' ? '전체 목록' : 'All Tokens'}</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-60">
                      {paletteVariables.length}
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </aside>

          {/* ================= RIGHT MAIN WORKSPACE (Independent Scrollable Container) ================= */}
          <main className="flex-1 h-full overflow-y-auto p-5 sm:p-7 flex flex-col gap-6">
            {/* Header & Global Project Save Bar */}
            <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-(--border-subtle) pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-(--atom-color-success)/10 text-(--atom-color-success) dark:text-(--atom-color-success) font-bold border border-(--atom-color-success)/20 flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--atom-color-success) inline-block" />
                    {t('badgeConnected')}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
                    {t('badgeFs')}
                  </span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-(--text-primary)">
                  {t('title')}
                </h1>
                <p className="text-xs sm:text-sm text-(--text-secondary) mt-0.5">
                  {t('desc')}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                {/* Theme Quick Switcher */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle) text-xs shadow-xs">
                  <Palette className="w-3.5 h-3.5 text-(--accent-primary) shrink-0" />
                  <span className="text-(--text-secondary) text-[11px] font-semibold hidden md:inline">
                    {locale === 'ko' ? '테마:' : 'Theme:'}
                  </span>
                  <NativeSelect
                    value={selectedThemeId}
                    onChange={(e) => handleSelectTheme(e.target.value)}
                    className="text-xs font-semibold bg-transparent border-0 h-auto p-0 cursor-pointer min-w-0"
                  >
                    {themes.map((th) => (
                      <option key={th.id} value={th.id}>
                        {formatLocaleText(th.name, locale)}
                      </option>
                    ))}
                  </NativeSelect>
                </div>

                {/* Quick Light/Dark Toggle */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleToggleThemeMode}
                  className="flex items-center gap-1 text-xs py-1.5 px-2.5 h-auto"
                  title="라이트 / 다크 모드 빠른 전환"
                >
                  {themes.find((t) => t.id === selectedThemeId)?.mode === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span className="hidden sm:inline">{locale === 'ko' ? '라이트' : 'Light'}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="hidden sm:inline">{locale === 'ko' ? '다크' : 'Dark'}</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setPaletteVariables(INITIAL_PALETTE_VARIABLES);
                    setComponents(INITIAL_STUDIO_COMPONENTS);
                    handleSelectTheme('ocean-blue');
                    resetTheme();
                  }}
                  className="flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('reset')}</span>
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveToProject}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-(--accent-primary) text-(--bg-primary)"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-(--atom-color-success)" />
                      <span>{t('saveSuccess')}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? t('saving') : t('saveToProject')}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Status notification banner */}
            {statusMessage && (
              <div
                className={`p-3 rounded-(--radius) text-xs font-medium flex items-center gap-2 shrink-0 ${
                  saveSuccess
                    ? 'bg-(--atom-color-success)/10 text-(--atom-color-success) dark:text-(--atom-color-success) border border-(--atom-color-success)/20'
                    : 'bg-(--atom-color-destructive)/10 text-(--atom-color-destructive) dark:text-(--atom-color-destructive) border border-(--atom-color-destructive)/20'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* TAB 1: Component Studio (Stage & Token Inspector) */}
            {activeTab === 'components' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-10">
                {/* Central Stage: Stacked Repeated Live Stages for all Variables (7 cols) */}
                <div className="lg:col-span-7 min-w-0 flex flex-col gap-6">
                  {/* Top Bar: Component Info + Add Variable Button + View Mode */}
                  <div className="p-4 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle) flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-(--accent-primary)" />
                        <div>
                          <h2 className="text-sm font-bold text-(--text-primary)">
                            {formatLocaleText(currentComponent.name, locale)}
                          </h2>
                          <p className="text-xs text-(--text-secondary)">
                            {locale === 'ko'
                              ? `선택된 Value: ${currentVariable?.name} (${selectedVariableId})`
                              : `Selected Value: ${currentVariable?.name} (${selectedVariableId})`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* View Mode Toggle: Focus vs All Variants */}
                        <div className="flex items-center p-0.5 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle)">
                          <Button
                            variant={stageViewMode === 'focus' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setStageViewMode('focus')}
                            className={`text-[11px] py-1 px-2.5 h-auto font-medium transition ${
                              stageViewMode === 'focus' ? 'bg-(--accent-primary) text-white font-bold shadow-xs' : 'text-(--text-secondary)'
                            }`}
                          >
                            {locale === 'ko' ? '단일 집중 뷰 (Focus)' : 'Focus'}
                          </Button>
                          <Button
                            variant={stageViewMode === 'all' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setStageViewMode('all')}
                            className={`text-[11px] py-1 px-2.5 h-auto font-medium transition ${
                              stageViewMode === 'all' ? 'bg-(--accent-primary) text-white font-bold shadow-xs' : 'text-(--text-secondary)'
                            }`}
                          >
                            {locale === 'ko' ? '전체 비교 뷰 (All)' : 'All'}
                          </Button>
                        </div>

                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setIsAddVariableOpen(true)}
                          className="text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t('addVariableBtn')}</span>
                        </Button>
                      </div>
                    </div>

                    {/* Value Tabs (변수 세그먼트 전환 바 - 중앙과 인스펙터를 1:1로 일체화) */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-(--border-subtle)/60 pb-0.5">
                      <span className="text-[10px] font-mono font-bold text-(--text-muted) uppercase shrink-0 mr-1">
                        VALUE:
                      </span>
                      {currentComponent.variables.map((v) => {
                        const isCurrentVal = v.id === selectedVariableId;
                        return (
                          <Button
                            key={v.id}
                            variant={isCurrentVal ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => handleSelectVariable(v.id)}
                            className={`text-xs py-1.5 px-3 h-auto whitespace-nowrap font-semibold transition-all shrink-0 ${
                              isCurrentVal
                                ? 'bg-(--accent-primary) text-white font-bold shadow-xs'
                                : 'bg-(--bg-primary) hover:bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)'
                            }`}
                          >
                            <span>{formatLocaleText(v.name, locale)}</span>
                            <span className="font-mono text-[10px] opacity-75 ml-1.5">
                              ({v.id})
                            </span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Stage Cards (단일 집중 모드에서는 선택된 1개만, 전체 비교 모드에서는 전체 렌더링) */}
                  <div className="flex flex-col gap-6">
                    {(stageViewMode === 'focus'
                      ? [currentVariable]
                      : currentComponent.variables
                    ).map((v, index) => {
                      const isSelected = v.id === selectedVariableId;
                      const isEditing = editingVariableId === v.id;
                      const typeSpec = resolveTypeSpec(currentComponent.id, v.id, v.name);
                      const roleKey = resolveVariableRole(v.id);
                      const varDef = SEMANTIC_VARIABLE_DICTIONARY[roleKey];
                      const activeStatus = stageStatuses[v.id] || 'default';
                      const currentStatusObj = COMPONENT_STATUS_PRESETS.find((s) => s.status === activeStatus) || COMPONENT_STATUS_PRESETS[0];

                      return (
                        <div
                          key={v.id}
                          id={`live-stage-${v.id}`}
                          onClick={() => handleSelectVariable(v.id)}
                          className={`p-6 rounded-(--radius) bg-(--bg-secondary)/20 border transition-all cursor-pointer flex flex-col gap-4 ${
                            isSelected
                              ? 'border-(--accent-primary) ring-2 ring-(--accent-primary)/20 shadow-md'
                              : 'border-(--border-subtle) hover:border-(--border-strong)'
                          }`}
                        >
                          {/* Stage Header */}
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) font-bold">
                                #{index + 1}
                              </span>
                              {isEditing ? (
                                <div
                                  className="flex items-center gap-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Input
                                    type="text"
                                    value={editingVariableName}
                                    onChange={(e) => setEditingVariableName(e.target.value)}
                                    className="text-xs px-2 py-1 font-bold"
                                    autoFocus
                                  />
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleSaveRename(v.id)}
                                    className="p-1 h-auto"
                                  >
                                    <Check className="w-3 h-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-sm text-(--text-primary)">
                                    {formatLocaleText(v.name, locale)}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    isIconOnly
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingVariableId(v.id);
                                      setEditingVariableName(v.name);
                                    }}
                                    className="opacity-50 hover:opacity-100 p-0.5 h-auto w-auto"
                                    title="Rename Variable"
                                  >
                                    <Edit2 className="w-3 h-3 text-(--text-muted)" />
                                  </Button>
                                </div>
                              )}
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">
                                value="{v.id}"
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant={isSelected ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectVariable(v.id);
                                }}
                                className="text-xs py-1 px-2.5 h-auto font-medium"
                              >
                                {isSelected ? (locale === 'ko' ? '✓ 편집 중' : '✓ Selected') : (locale === 'ko' ? '토큰 편집' : 'Inspect')}
                              </Button>
                              {currentComponent.variables.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  isIconOnly
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteVariable(v.id);
                                  }}
                                  className="opacity-60 hover:opacity-100 hover:text-(--atom-color-destructive) p-1 h-auto w-auto"
                                  title={t('deleteVariable')}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* 3-Tier Architecture Badges (1. Type & 2. Value) */}
                          <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-(--radius-sm) bg-(--bg-secondary)/60 border border-(--border-subtle) text-xs">
                            {/* 1. Type: ~상황에는 이 컴포넌트를 쓴다 */}
                            <div
                              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20 shrink-0"
                              title={typeSpec.whenToUse}
                            >
                              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">TYPE</span>
                              <span className="text-[11px] font-bold">{formatLocaleText(typeSpec.name, locale)}</span>
                            </div>

                            {/* 2. Value: primary, secondary, warning, success, danger 등 시스템 시맨틱 Value */}
                            <div
                              className={`flex items-center gap-1.5 px-2 py-0.5 rounded font-semibold border shrink-0 ${varDef.badgeColorClass}`}
                              title={varDef.meaning}
                            >
                              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">VALUE</span>
                              <span className="text-[11px] font-bold">{formatLocaleText(varDef.label, locale)}</span>
                            </div>

                            <span className="text-xs text-(--text-secondary) truncate flex-1 min-w-[200px]" title={locale === 'ko' ? typeSpec.whenToUse : (typeSpec.whenToUseEn || typeSpec.whenToUse)}>
                              💡 <strong className="text-(--text-primary)">{locale === 'ko' ? '상황:' : 'Context:'}</strong> {locale === 'ko' ? typeSpec.whenToUse : (typeSpec.whenToUseEn || typeSpec.whenToUse)}
                            </span>
                          </div>

                          {/* 3. Status Bar: hover, disabled 같은 상태 정보 구조 및 실시간 변경 */}
                          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle)">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) font-bold border border-(--border-subtle)">
                                STATUS
                              </span>
                              <span className="text-xs font-semibold text-(--text-primary) whitespace-nowrap">
                                {locale === 'ko' ? '상태 시뮬레이션:' : 'Simulate Status:'}
                              </span>
                            </div>

                            {/* Status Pills */}
                            <div className="flex flex-wrap items-center gap-1.5">
                              {COMPONENT_STATUS_PRESETS.map((st) => {
                                const isCurrentSt = activeStatus === st.status;
                                return (
                                  <Button
                                    key={st.status}
                                    variant={isCurrentSt ? 'primary' : 'secondary'}
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectVariable(v.id);
                                      setStageStatuses((prev) => ({ ...prev, [v.id]: st.status }));
                                      setInspectorStatusTab(st.status);
                                    }}
                                    className={`text-[11px] py-1 px-2 h-auto font-medium transition-all ${
                                      isCurrentSt
                                        ? 'bg-(--accent-primary) text-(--bg-primary) font-bold shadow-2xs'
                                        : 'hover:bg-(--bg-secondary) text-(--text-secondary)'
                                    }`}
                                    title={`${st.description} (${st.behavior})`}
                                  >
                                    {formatLocaleText(st.label, locale)}
                                  </Button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="text-[11px] text-(--text-muted) px-1 flex items-center gap-1.5">
                            <span>⚡ <strong>[{formatLocaleText(currentStatusObj.label, locale)}] {locale === 'ko' ? '상태 정보:' : 'Status Info:'}</strong> {locale === 'ko' ? currentStatusObj.description : (currentStatusObj.descriptionEn || currentStatusObj.description)} — <em>{locale === 'ko' ? currentStatusObj.behavior : (currentStatusObj.behaviorEn || currentStatusObj.behavior)}</em></span>
                          </div>

                          {/* Dynamic Component Live Preview with Active Status */}
                          <div className="p-8 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex items-center justify-center min-h-[180px] transition-all">
                            <StudioLivePreview
                              componentId={currentComponent.id}
                              variable={v}
                              getPaletteValue={getPaletteValue}
                              status={activeStatus}
                            />
                          </div>

                          {/* Code Snippet for this variable (Connecting Type · Value · Status to Code) */}
                          {(() => {
                            const baseName = currentComponent.name.split(' ')[0];
                            const isDefaultStatus = activeStatus === 'default';
                            const varLabel = formatLocaleText(v.name, locale);
                            const placeholderText = locale === 'ko' ? '내용을 입력하세요' : 'Enter text...';
                            let generatedCode = '';

                            if (codeSnippetLang === 'react') {
                              const statusProp = isDefaultStatus ? '' : ` status="${activeStatus}"`;
                              if (currentComponent.id === 'input') {
                                generatedCode = `<Input componentType="${typeSpec.id}" value="${v.id}"${statusProp} placeholder="${placeholderText}" />`;
                              } else if (currentComponent.id === 'badge') {
                                generatedCode = `<Badge componentType="${typeSpec.id}" value="${v.id}"${statusProp}>\n  ${varLabel}\n</Badge>`;
                              } else if (currentComponent.id === 'chart') {
                                generatedCode = `<Chart type="${v.id.includes('bar') ? 'bar' : v.id.includes('area') ? 'area' : 'line'}" variant="${v.id.includes('success') ? 'success' : v.id.includes('danger') ? 'danger' : 'primary'}" data={chartData}${statusProp} />`;
                              } else if (currentComponent.id === 'offcanvas') {
                                const placement = v.id.includes('left') ? 'left' : v.id.includes('bottom') ? 'bottom' : 'right';
                                generatedCode = `<Offcanvas isOpen={isOpen} onClose={() => setIsOpen(false)} placement="${placement}" title="${varLabel}"${statusProp}>\n  <div className="p-4">{/* Content */}</div>\n</Offcanvas>`;
                              } else if (currentComponent.id === 'toast') {
                                const isAction = v.id.includes('action') || v.id.includes('undo');
                                const actionProp = isAction ? ` action={{ label: '실행 취소', onClick: () => {} }}` : '';
                                generatedCode = `<Toast variant="${v.id.includes('success') ? 'success' : v.id.includes('warning') ? 'warning' : v.id.includes('danger') ? 'danger' : 'info'}" title="${varLabel}"${actionProp} onClose={() => {}}${statusProp}>\n  ${placeholderText}\n</Toast>`;
                              } else {
                                generatedCode = `<${baseName} componentType="${typeSpec.id}" value="${v.id}"${statusProp}>\n  ${varLabel}\n</${baseName}>`;
                              }
                            } else if (codeSnippetLang === 'html') {
                              const statusAttr = isDefaultStatus ? '' : ` data-status="${activeStatus}"`;
                              const tag = currentComponent.id === 'button' ? 'button' : currentComponent.id === 'input' ? 'input' : 'div';
                              const disabledAttr = (activeStatus === 'disabled' || activeStatus === 'loading') && (tag === 'button' || tag === 'input') ? ' disabled' : '';
                              if (tag === 'input') {
                                generatedCode = `<input class="atom-input atom-input--${v.id}" data-component="input" data-type="${typeSpec.id}" data-value="${v.id}"${statusAttr}${disabledAttr} placeholder="${placeholderText}" />`;
                              } else {
                                generatedCode = `<${tag} class="atom-${currentComponent.id} atom-${currentComponent.id}--${v.id}" data-component="${currentComponent.id}" data-type="${typeSpec.id}" data-value="${v.id}"${statusAttr}${disabledAttr}>\n  ${varLabel}\n</${tag}>`;
                              }
                            } else {
                              const statusProp = isDefaultStatus ? '' : ` status="${activeStatus}"`;
                              generatedCode = `<Atom${baseName} component-type="${typeSpec.id}" value="${v.id}"${statusProp}>\n  ${varLabel}\n</Atom${baseName}>`;
                            }

                            return (
                              <div className="space-y-1.5 pt-1 border-t border-(--border-subtle)/40">
                                <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <FileCode className="w-3.5 h-3.5 text-(--accent-primary)" />
                                    <span className="font-semibold text-(--text-primary)">
                                      {locale === 'ko' ? '실제 코드 연결:' : 'Actual Code Binding:'}
                                    </span>
                                    {/* Language Switcher Tabs */}
                                    <div className="inline-flex items-center rounded-(--radius-sm) bg-(--bg-secondary) p-0.5 border border-(--border-subtle) text-[10px] font-mono">
                                      {(['react', 'html', 'vue'] as const).map((lang) => (
                                        <Button
                                          key={lang}
                                          variant={codeSnippetLang === lang ? 'primary' : 'ghost'}
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setCodeSnippetLang(lang);
                                          }}
                                          className={`px-2 py-0.5 h-auto text-[10px] font-bold ${
                                            codeSnippetLang === lang
                                              ? 'bg-(--accent-primary) text-(--bg-primary)'
                                              : 'text-(--text-secondary) hover:text-(--text-primary)'
                                          }`}
                                        >
                                          {lang === 'react' ? 'React (TSX)' : lang === 'html' ? 'HTML / CSS' : 'Vue / Svelte'}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* One-click Copy Button */}
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCopyCode(generatedCode, v.id);
                                    }}
                                    className="text-[11px] py-1 px-2.5 h-auto flex items-center gap-1 font-semibold shrink-0"
                                    title={locale === 'ko' ? '코드 복사' : 'Copy Code'}
                                  >
                                    {copiedVarCode === v.id ? (
                                      <>
                                        <Check className="w-3 h-3 text-(--atom-color-success)" />
                                        <span className="text-(--atom-color-success)">{locale === 'ko' ? '복사 완료!' : 'Copied!'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>{locale === 'ko' ? '코드 복사' : 'Copy Code'}</span>
                                      </>
                                    )}
                                  </Button>
                                </div>
                                <CodeHighlight code={generatedCode} language={codeSnippetLang === 'html' ? 'html' : 'tsx'} className="text-xs" />
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Panel: Status-Specific Token Binding Inspector (5 cols) */}
                <div className="lg:col-span-5 min-w-0 sticky top-4 self-start p-4 sm:p-5 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle) flex flex-col gap-4">
                  {/* Panel Title & Current Selection */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-(--border-subtle)">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-sm sm:text-base text-(--text-primary) flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-(--accent-primary)" />
                        <span>{locale === 'ko' ? '토큰 바인딩 인스펙터' : 'Token Binding Inspector'}</span>
                      </h3>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-xs font-semibold text-(--text-primary)">
                          {formatLocaleText(currentComponent.name, locale)}
                        </span>
                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                          TYPE: {formatLocaleText(resolveTypeSpec(currentComponent.id, currentVariable?.id || 'primary', currentVariable?.name).name, locale)}
                        </span>
                        
                        {/* Interactive Value Switcher */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-(--text-muted)">VALUE:</span>
                          <NativeSelect
                            value={currentVariable?.id}
                            onChange={(e) => handleSelectVariable(e.target.value)}
                            className="text-xs font-mono font-bold py-0.5 px-2 h-auto"
                          >
                            {currentComponent.variables.map((v) => (
                              <option key={v.id} value={v.id}>
                                {formatLocaleText(v.name, locale)} ({v.id})
                              </option>
                            ))}
                          </NativeSelect>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Selection Bar for Editing (각 상태별 토큰값 수정) */}
                  <div className="p-3.5 rounded-(--radius-sm) bg-(--bg-secondary)/40 border border-(--border-subtle) flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-(--accent-primary)" />
                        <span className="text-xs font-bold text-(--text-primary)">
                          {locale === 'ko' ? '수정할 상태 선택' : 'Select Status to Edit'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-bold border border-(--accent-primary)/20">
                        STATUS: {inspectorStatusTab.toUpperCase()}
                      </span>
                    </div>

                    {/* Status Tabs */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {[
                        { status: 'default', label: locale === 'ko' ? '기본' : 'Default' },
                        { status: 'hover', label: locale === 'ko' ? '호버' : 'Hover' },
                        { status: 'active', label: locale === 'ko' ? '클릭' : 'Active' },
                        { status: 'focus', label: locale === 'ko' ? '포커스' : 'Focus' },
                        { status: 'disabled', label: locale === 'ko' ? '비활성' : 'Disabled' },
                        { status: 'all', label: locale === 'ko' ? '전체' : 'All' },
                      ].map((item) => {
                        const isCurrent = inspectorStatusTab === item.status;
                        return (
                          <Button
                            key={item.status}
                            variant={isCurrent ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => handleSelectInspectorStatus(item.status as ComponentInteractiveStatus | 'all')}
                            className={`text-xs py-2 px-2 h-auto font-semibold transition-all whitespace-nowrap text-center ${
                              isCurrent
                                ? 'bg-(--accent-primary) text-(--bg-primary) shadow-xs font-bold'
                                : 'bg-(--bg-primary) hover:bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)'
                            }`}
                          >
                            <span>{item.label}</span>
                          </Button>
                        );
                      })}
                    </div>

                    <p className="text-[11px] text-(--text-secondary) leading-relaxed mt-0.5">
                      ⚡ <strong>[{inspectorStatusTab.toUpperCase()}]</strong> {locale === 'ko' ? '상태에 적용되는 디자인 토큰을 아래에서 수정하세요. 수정 즉시 스테이지 및 실제 코드/CSS에 실시간 반영됩니다.' : 'Modify tokens applied to this state below. Reflects in preview and CSS immediately.'}
                    </p>
                  </div>

                  {/* Status-specific Property Bindings List */}
                  <div className="space-y-3.5 pt-2 border-t border-(--border-subtle)">
                    <div className="flex items-center justify-between text-xs font-bold text-(--text-secondary) px-0.5">
                      <span>{locale === 'ko' ? `[${inspectorStatusTab.toUpperCase()}] 적용 토큰 목록` : `[${inspectorStatusTab.toUpperCase()}] Token List`}</span>
                      <span className="text-[11px] font-mono text-(--text-muted)">{currentStatusProps.length}{locale === 'ko' ? '개 속성' : ' properties'}</span>
                    </div>

                    {currentStatusProps.map((prop) => {
                      // Fallback logic if token binding not explicitly set yet
                      let boundPaletteId = currentVariable?.tokenBindings[prop.key];
                      if (!boundPaletteId) {
                        if (prop.key === 'hoverBackground') {
                          boundPaletteId = currentVariable?.tokenBindings.background ? `${currentVariable.tokenBindings.background}-hover` : prop.defaultPaletteId;
                        } else if (prop.key === 'hoverTextColor') {
                          boundPaletteId = currentVariable?.tokenBindings.textColor || prop.defaultPaletteId;
                        } else if (prop.key === 'hoverBorderColor') {
                          boundPaletteId = currentVariable?.tokenBindings.borderColor || prop.defaultPaletteId;
                        } else if (prop.key === 'activeBackground') {
                          boundPaletteId = currentVariable?.tokenBindings.hoverBackground || currentVariable?.tokenBindings.background || prop.defaultPaletteId;
                        } else if (prop.key === 'focusBorderColor') {
                          boundPaletteId = currentVariable?.tokenBindings.borderColor || '--atom-color-primary';
                        } else if (prop.key === 'disabledBackground') {
                          boundPaletteId = currentVariable?.tokenBindings.background || '--atom-palette-gray-200';
                        } else if (prop.key === 'disabledTextColor') {
                          boundPaletteId = currentVariable?.tokenBindings.textColor || '--atom-palette-gray-400';
                        } else {
                          boundPaletteId = prop.defaultPaletteId;
                        }
                      }

                      const matchedPalette = paletteVariables.find((p) => p.id === boundPaletteId);
                      const relevantPalettes = prop.category === 'color'
                        ? paletteVariables.filter((p) => p.category === 'color' || p.category === 'status')
                        : paletteVariables.filter((p) => p.category === prop.category);

                      return (
                        <div key={prop.key} className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) space-y-2 shadow-2xs">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-(--text-primary) flex items-center gap-2">
                              {prop.category === 'color' && (
                                <span
                                  style={{ backgroundColor: matchedPalette?.value || '#ccc' }}
                                  className="w-4 h-4 rounded-full border border-(--border-subtle) shrink-0 shadow-2xs"
                                />
                              )}
                              <span>{formatLocaleText(prop.label, locale)}</span>
                            </span>
                            <span className="font-mono text-[10px] text-(--text-muted)">
                              {matchedPalette?.value}
                            </span>
                          </div>

                          {/* Palette Selector Dropdown */}
                          <div className="flex items-center gap-2 min-w-0">
                            <NativeSelect
                              value={boundPaletteId}
                              onChange={(e) => handleUpdateBinding(prop.key, e.target.value)}
                              className="flex-1 text-xs font-mono min-w-0 truncate"
                            >
                              <option value="" disabled>
                                {t('selectPalettePlaceholder')}
                              </option>
                              {relevantPalettes.map((pal) => (
                                <option key={pal.id} value={pal.id}>
                                  {formatLocaleText(pal.name, locale)} ({pal.value})
                                </option>
                              ))}
                            </NativeSelect>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Design Theme Studio (Theme Presets & Custom Themes) */}
            {activeTab === 'themes' && (
              <StudioThemeManager
                themes={themes}
                activeThemeId={selectedThemeId}
                paletteVariables={paletteVariables}
                onSelectTheme={handleSelectTheme}
                onCreateTheme={handleCreateTheme}
                onUpdateTheme={handleUpdateTheme}
                onDeleteTheme={handleDeleteTheme}
              />
            )}

            {/* TAB 2: Palette Management Page (Categorized & 50-900 Full Scales) */}
            {activeTab === 'palette' && (
              <div className="flex flex-col gap-6 pb-10">
                {/* 1. Header Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle)">
                  <div>
                    <h2 className="text-base font-bold text-(--text-primary) flex items-center gap-2">
                      <Palette className="w-4 h-4 text-(--accent-primary)" />
                      <span>{t('paletteManagerTitle')}</span>
                    </h2>
                    <p className="text-xs text-(--text-secondary) mt-0.5">
                      {t('paletteManagerDesc')}
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsAddPaletteOpen(true)}
                    className="text-xs flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('addPaletteBtn')}</span>
                  </Button>
                </div>

                {/* 2. Color Palette 50-900 Grid Visualizer */}
                {(paletteCategoryFilter === 'color' || paletteCategoryFilter === 'status') && (
                  <div className="space-y-6">
                    {/* Status Tokens Row */}
                    {paletteCategoryFilter === 'status' && (
                      <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3">
                          <div>
                            <h3 className="text-sm font-bold text-(--text-primary) flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-(--accent-primary)" />
                              <span>{locale === 'ko' ? '시맨틱 상태 토큰' : 'Semantic Status Tokens'}</span>
                            </h3>
                            <p className="text-xs text-(--text-secondary) mt-0.5">
                              {locale === 'ko' ? '원천 팔레트와 1:1 결합되어 시스템 전역에 의미를 부여하는 최상위 상태 토큰' : 'Top-level status tokens bound to source palettes imparting system-wide meaning'}
                            </p>
                          </div>
                          <span className="text-xs font-mono text-(--text-muted)">
                            {statusTokens.length} {locale === 'ko' ? '상태' : 'states'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                          {statusTokens.map((st) => {
                            const pal = paletteVariables.find((p) => p.id === st.paletteId);
                            const isCopied = copiedPaletteId === st.id;
                            return (
                              <div
                                key={st.id}
                                className="p-3.5 rounded-(--radius-sm) bg-(--bg-secondary)/30 border border-(--border-subtle) flex flex-col gap-2.5 relative group hover:border-(--accent-primary) transition"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-xs text-(--text-primary)">
                                    {formatLocaleText(st.name, locale)}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    isIconOnly
                                    onClick={() => handleCopyPalette(st.id, pal?.value || '')}
                                    className="p-1 h-auto"
                                    title="var() 복사"
                                  >
                                    {isCopied ? <Check className="w-3.5 h-3.5 text-(--atom-color-success)" /> : <Copy className="w-3.5 h-3.5 text-(--text-muted)" />}
                                  </Button>
                                </div>

                                <div
                                  style={{ backgroundColor: pal?.value || '#3182f6' }}
                                  className="w-full h-12 rounded border border-black/10 shadow-xs flex items-center justify-center text-white font-mono text-xs font-bold"
                                >
                                  {pal?.value}
                                </div>

                                <div className="text-[11px] font-mono text-(--text-muted) truncate">
                                  {st.id}
                                </div>
                                <p className="text-[10px] text-(--text-secondary) line-clamp-2 leading-relaxed">
                                  {st.description}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Color Families 50-900 Full Spectrum */}
                    {(colorFamilyFilter === 'all'
                      ? ['blue', 'gray', 'emerald', 'rose', 'amber', 'purple']
                      : [colorFamilyFilter]
                    ).map((famKey) => {
                      const famPalettes = paletteVariables.filter((p) => p.family === famKey);
                      if (famPalettes.length === 0) return null;

                      return (
                        <div
                          key={famKey}
                          className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-3"
                        >
                          <div className="flex items-center justify-between border-b border-(--border-subtle) pb-2">
                            <h3 className="text-xs font-mono font-bold uppercase text-(--text-secondary) flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-(--accent-primary)" />
                              <span>{famKey} Family (50 ~ 900)</span>
                            </h3>
                            <span className="text-xs font-mono text-(--text-muted)">
                              {famPalettes.length} 스텝
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                            {famPalettes.map((pal) => {
                              const isCopied = copiedPaletteId === pal.id;
                              return (
                                <div
                                  key={pal.id}
                                  className="group relative rounded-(--radius-sm) border border-(--border-subtle) overflow-hidden bg-(--bg-primary) hover:shadow-md transition-all flex flex-col"
                                >
                                  {/* Color Swatch */}
                                  <div
                                    style={{ backgroundColor: pal.value }}
                                    className="h-16 w-full flex items-center justify-center relative"
                                  >
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-1 flex items-center gap-1 rounded shadow-xs">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        isIconOnly
                                        onClick={() => handleCopyPalette(pal.id, pal.value)}
                                        className="text-white p-1 h-auto hover:scale-110"
                                        title="var() 복사"
                                      >
                                        {isCopied ? <Check className="w-3.5 h-3.5 text-(--atom-color-success)" /> : <Copy className="w-3.5 h-3.5" />}
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        isIconOnly
                                        onClick={() => handleOpenEditPalette(pal)}
                                        className="text-white p-1 h-auto hover:scale-110 text-(--accent-primary)"
                                        title="팔레트 값 수정"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        isIconOnly
                                        onClick={() => handleDeletePalette(pal.id)}
                                        className="text-white p-1 h-auto hover:scale-110 text-rose-400"
                                        title="팔레트 삭제"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Info Footer */}
                                  <div className="p-2 flex flex-col gap-0.5 text-left">
                                    <span className="font-bold text-[11px] text-(--text-primary) truncate">
                                      {pal.name.replace(/ \(.*\)/, '')}
                                    </span>
                                    <span className="font-mono text-[10px] text-(--text-muted) truncate">
                                      {pal.value}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 3-B. SIZE & SPACING VIEW */}
                {(paletteCategoryFilter === 'size' || (paletteCategoryFilter === 'all' && false)) && (
                  <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-(--text-primary) flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-(--accent-primary)" />
                          <span>{locale === 'ko' ? '사이즈 & 여백 팔레트' : 'Spacing & Size Scale'}</span>
                        </h3>
                        <p className="text-xs text-(--text-secondary) mt-0.5">
                          {locale === 'ko' ? '패딩, 마진, 아이템 간격(gap)에 사용되는 4px 기반 W3C 규격 토큰' : '4px-based W3C standard tokens for padding, margin, and gap'}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-(--text-muted)">
                        {displayedPalettes.filter((p) => p.category === 'size' || p.category === 'spacing').length} {locale === 'ko' ? '토큰' : 'tokens'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {displayedPalettes
                        .filter((p) => p.category === 'size' || p.category === 'spacing')
                        .map((pal) => (
                          <div
                            key={pal.id}
                            className="p-3.5 rounded-(--radius-sm) bg-(--bg-secondary)/30 border border-(--border-subtle) flex flex-col gap-2 hover:border-(--accent-primary) transition"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-(--text-primary)">{formatLocaleText(pal.name, locale)}</span>
                              <div className="flex items-center gap-1">
                                <span className="font-mono text-xs font-bold text-(--accent-primary)">{pal.value}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  isIconOnly
                                  onClick={() => handleOpenEditPalette(pal)}
                                  className="p-1 h-auto text-(--text-muted) hover:text-(--accent-primary)"
                                  title="값 수정"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  isIconOnly
                                  onClick={() => handleDeletePalette(pal.id)}
                                  className="p-1 h-auto text-(--text-muted) hover:text-rose-500"
                                  title="삭제"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            {/* Visual Size Bar */}
                            <div className="h-4 bg-(--bg-secondary) rounded flex items-center px-1 overflow-hidden">
                              <div
                                style={{ width: pal.value }}
                                className="h-2 bg-(--accent-primary) rounded max-w-full"
                              />
                            </div>
                            <span className="font-mono text-[10px] text-(--text-muted) truncate">{pal.id}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* 3-C. BORDER RADIUS VIEW */}
                {(paletteCategoryFilter === 'radius' || (paletteCategoryFilter === 'all' && false)) && (
                  <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-(--text-primary) flex items-center gap-2">
                          <Square className="w-4 h-4 text-(--accent-primary)" />
                          <span>{locale === 'ko' ? '모서리 곡률 팔레트' : 'Border Radius Scale'}</span>
                        </h3>
                        <p className="text-xs text-(--text-secondary) mt-0.5">
                          {locale === 'ko' ? '버튼, 카드, 모달 등 서피스 컴포넌트의 모서리 둥글기를 일관되게 규정하는 토큰' : 'Tokens defining consistent border radiuses for buttons, cards, and surfaces'}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-(--text-muted)">
                        {displayedPalettes.filter((p) => p.category === 'radius').length} {locale === 'ko' ? '토큰' : 'tokens'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {displayedPalettes
                        .filter((p) => p.category === 'radius')
                        .map((pal) => (
                          <div
                            key={pal.id}
                            className="p-4 rounded-(--radius-sm) bg-(--bg-secondary)/30 border border-(--border-subtle) flex flex-col items-center text-center gap-3 hover:border-(--accent-primary) transition"
                          >
                            <div
                              style={{ borderRadius: pal.value }}
                              className="w-16 h-16 bg-(--accent-primary)/15 border-2 border-(--accent-primary) flex items-center justify-center font-mono text-xs font-bold text-(--accent-primary)"
                            >
                              {pal.value}
                            </div>
                            <div className="w-full">
                              <div className="font-bold text-xs text-(--text-primary)">{formatLocaleText(pal.name, locale)}</div>
                              <div className="font-mono text-[10px] text-(--text-muted) truncate">{pal.id}</div>
                            </div>
                            <div className="w-full flex items-center justify-between pt-1 border-t border-(--border-subtle)/40">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenEditPalette(pal)}
                                className="p-1 h-auto text-[10px] text-(--text-secondary) hover:text-(--accent-primary) flex items-center gap-1"
                              >
                                <Edit2 className="w-2.5 h-2.5" />
                                <span>{locale === 'ko' ? '수정' : 'Edit'}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                isIconOnly
                                onClick={() => handleDeletePalette(pal.id)}
                                className="p-1 h-auto text-(--text-muted) hover:text-rose-500"
                                title="삭제"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* 3-D. TYPOGRAPHY VIEW */}
                {(paletteCategoryFilter === 'typography' || (paletteCategoryFilter === 'all' && false)) && (
                  <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-(--text-primary) flex items-center gap-2">
                          <Type className="w-4 h-4 text-(--accent-primary)" />
                          <span>{locale === 'ko' ? '타이포그래피 팔레트' : 'Typography Scale'}</span>
                        </h3>
                        <p className="text-xs text-(--text-secondary) mt-0.5">
                          {locale === 'ko' ? '폰트 크기, 행간, 두께의 조화로운 위계를 정의하는 토큰' : 'Tokens defining typographic hierarchy across size, leading, and weight'}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-(--text-muted)">
                        {displayedPalettes.filter((p) => p.category === 'typography').length} {locale === 'ko' ? '토큰' : 'tokens'}
                      </span>
                    </div>

                    <div className="divide-y divide-(--border-subtle)">
                      {displayedPalettes
                        .filter((p) => p.category === 'typography')
                        .map((pal) => (
                          <div
                            key={pal.id}
                            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-(--bg-secondary)/30 px-2 rounded transition"
                          >
                            <div className="min-w-[200px]">
                              <div className="font-bold text-sm text-(--text-primary)">{formatLocaleText(pal.name, locale)}</div>
                              <div className="font-mono text-xs text-(--text-muted)">{pal.id}</div>
                            </div>

                            {/* Live Type Preview */}
                            <div
                              style={{
                                fontSize: pal.id.includes('size') ? pal.value : undefined,
                                fontWeight: pal.id.includes('weight') ? pal.value : undefined,
                              }}
                              className="text-(--text-primary) truncate flex-1"
                            >
                              피그마 없는 시대, 코드로 직접 디자인을 구축하는 AtomDesignToken
                            </div>

                            <span className="font-mono text-xs font-bold text-(--accent-primary) px-2 py-1 rounded bg-(--bg-secondary) shrink-0">
                              {pal.value}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* 3-E. ALL TOKENS TABLE VIEW */}
                {paletteCategoryFilter === 'all' && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="p-3">{t('thPaletteName')}</TableHead>
                        <TableHead className="p-3">{t('thPaletteCategory')}</TableHead>
                        <TableHead className="p-3">{t('thPaletteValue')}</TableHead>
                        <TableHead className="p-3">{t('paletteDescLabel')}</TableHead>
                        <TableHead className="p-3 text-right">{t('thPaletteAction')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayedPalettes.map((pal) => (
                        <TableRow key={pal.id} className="hover:bg-(--bg-secondary)/30 transition-colors">
                          <TableCell className="p-3">
                            <div className="font-semibold text-(--text-primary)">{formatLocaleText(pal.name, locale)}</div>
                            <div className="font-mono text-xs text-(--text-muted)">{pal.id}</div>
                          </TableCell>
                          <TableCell className="p-3">
                            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
                              {pal.category}
                            </span>
                          </TableCell>
                          <TableCell className="p-3">
                            <div className="flex items-center gap-2">
                              {pal.category === 'color' && (
                                <span
                                  style={{ backgroundColor: pal.value }}
                                  className="w-4 h-4 rounded border border-(--border-subtle) shrink-0 shadow-xs"
                                />
                              )}
                              <span className="font-mono font-semibold text-(--text-primary)">
                                {pal.value}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="p-3 text-xs text-(--text-secondary)">
                            {pal.description || '-'}
                          </TableCell>
                          <TableCell className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenEditPalette(pal)}
                                className="text-xs text-(--text-secondary) hover:text-(--accent-primary) h-auto p-1 font-medium flex items-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>{locale === 'ko' ? '수정' : 'Edit'}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeletePalette(pal.id)}
                                className="text-xs text-(--atom-color-destructive) hover:text-rose-700 h-auto p-1 font-medium flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>{t('deleteBtn')}</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}

            {/* TAB 3: Compiled W3C JSON & CSS Export View */}
            {activeTab === 'preview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-(--text-secondary)">
                    <span>tokens/token.json (W3C DTCG Format)</span>
                  </div>
                  <CodeHighlight
                    code={exportStudioToTokensJson(paletteVariables, components)}
                    language="json"
                    className="max-h-[520px] text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-(--text-secondary)">
                    <span>css/atom-ui.css (Scoped Variable CSS)</span>
                  </div>
                  <CodeHighlight
                    code={exportStudioToCSS(paletteVariables, components)}
                    language="css"
                    className="max-h-[520px] text-xs"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: Brand Settings (Logo upload, Brand name & Mockup) */}
            {activeTab === 'brand' && (
              <StudioBrandSettings />
            )}
          </main>
        </div>
      )}

      {/* MODAL 1: Add Component Variable */}
      {isAddVariableOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-xl flex flex-col gap-4 animate-in fade-in">
            <h3 className="font-bold text-base text-(--text-primary)">
              {t('addVariableBtn')} ({formatLocaleText(currentComponent.name, locale)})
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('variableNameLabel')}
                </label>
                <Input
                  type="text"
                  value={newVariableName}
                  onChange={(e) => setNewVariableName(e.target.value)}
                  placeholder={locale === 'ko' ? '예: 라운드 필 버튼' : 'e.g. Pill CTA Button'}
                  autoFocus
                />
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('variableKeyLabel')}
                </label>
                <Input
                  type="text"
                  value={newVariableKey}
                  onChange={(e) => setNewVariableKey(e.target.value)}
                  placeholder="예: pill-cta"
                  className="font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('variableDescLabel')}
                </label>
                <Input
                  type="text"
                  value={newVariableDesc}
                  onChange={(e) => setNewVariableDesc(e.target.value)}
                  placeholder="예: 랜딩 페이지 전용 라운드 디자인"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-(--border-subtle)">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsAddVariableOpen(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateVariable}
              >
                {locale === 'ko' ? '생성하기' : 'Create'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Palette Variable */}
      {isAddPaletteOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-xl flex flex-col gap-4 animate-in fade-in">
            <h3 className="font-bold text-base text-(--text-primary)">
              {t('addPaletteBtn')}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('paletteNameLabel')}
                </label>
                <Input
                  type="text"
                  value={newPaletteName}
                  onChange={(e) => setNewPaletteName(e.target.value)}
                  placeholder="예: Brand Cyan 500"
                  autoFocus
                />
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('paletteIdLabel')}
                </label>
                <Input
                  type="text"
                  value={newPaletteId}
                  onChange={(e) => setNewPaletteId(e.target.value)}
                  placeholder="예: --atom-palette-cyan-500"
                  className="font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-(--text-secondary) block mb-1">
                    {t('thPaletteCategory')}
                  </label>
                  <NativeSelect
                    value={newPaletteCategory}
                    onChange={(e: any) => setNewPaletteCategory(e.target.value)}
                    className="w-full"
                  >
                    <option value="color">Color</option>
                    <option value="size">Size / Spacing</option>
                    <option value="radius">Border Radius</option>
                    <option value="typography">Typography</option>
                  </NativeSelect>
                </div>

                {newPaletteCategory === 'color' && (
                  <div>
                    <label className="font-semibold text-(--text-secondary) block mb-1">
                      Color Family
                    </label>
                    <NativeSelect
                      value={newPaletteFamily}
                      onChange={(e) => setNewPaletteFamily(e.target.value)}
                      className="w-full"
                    >
                      <option value="blue">Blue</option>
                      <option value="gray">Gray</option>
                      <option value="emerald">Emerald</option>
                      <option value="rose">Rose</option>
                      <option value="amber">Amber</option>
                      <option value="purple">Purple</option>
                      <option value="neutral">Neutral</option>
                    </NativeSelect>
                  </div>
                )}
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('thPaletteValue')}
                </label>
                <Input
                  type="text"
                  value={newPaletteValue}
                  onChange={(e) => setNewPaletteValue(e.target.value)}
                  placeholder="예: #06b6d4, 16px, 8px"
                  className="font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('paletteDescLabel')}
                </label>
                <Input
                  type="text"
                  value={newPaletteDesc}
                  onChange={(e) => setNewPaletteDesc(e.target.value)}
                  placeholder="예: 테크 지향적 포인트 컬러"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-(--border-subtle)">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsAddPaletteOpen(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreatePalette}
              >
                {locale === 'ko' ? '생성하기' : 'Create'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Edit Palette Variable */}
      {editingPalette && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-xl flex flex-col gap-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-(--text-primary) flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-(--accent-primary)" />
                <span>{locale === 'ko' ? '팔레트 토큰 값 수정' : 'Edit Palette Token'}</span>
              </h3>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">
                {editingPalette.id}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('paletteNameLabel')}
                </label>
                <Input
                  type="text"
                  value={editPaletteName}
                  onChange={(e) => setEditPaletteName(e.target.value)}
                  placeholder="예: Blue 500"
                  autoFocus
                />
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('thPaletteValue')}
                </label>
                <div className="flex items-center gap-2">
                  {editingPalette.category === 'color' && (
                    <span
                      style={{ backgroundColor: editPaletteValue }}
                      className="w-7 h-7 rounded border border-(--border-subtle) shrink-0 shadow-xs"
                    />
                  )}
                  <Input
                    type="text"
                    value={editPaletteValue}
                    onChange={(e) => setEditPaletteValue(e.target.value)}
                    placeholder="예: #3182f6, 16px, 8px"
                    className="font-mono flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('paletteDescLabel')}
                </label>
                <Input
                  type="text"
                  value={editPaletteDesc}
                  onChange={(e) => setEditPaletteDesc(e.target.value)}
                  placeholder="예: 기본 브랜드 블루 컬러"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-(--border-subtle)">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingPalette(null)}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveEditPalette}
              >
                {locale === 'ko' ? '저장하기' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LocalStudioPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono">로딩 중...</div>}>
      <LocalStudioContent />
    </Suspense>
  );
}
