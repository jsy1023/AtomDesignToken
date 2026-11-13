'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { Button } from '@/components/ui';
import {
  PaletteVariable,
  ComponentVariable,
  StudioComponentDefinition,
  INITIAL_PALETTE_VARIABLES,
  INITIAL_STUDIO_COMPONENTS,
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
} from 'lucide-react';

export default function LocalStudioPage() {
  const t = useTranslations('studioPage');
  const { theme, resetTheme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';

  // State
  const [activeTab, setActiveTab] = useState<'components' | 'palette' | 'preview'>('components');
  const [paletteVariables, setPaletteVariables] = useState<PaletteVariable[]>(INITIAL_PALETTE_VARIABLES);
  const [components, setComponents] = useState<StudioComponentDefinition[]>(INITIAL_STUDIO_COMPONENTS);
  const [selectedComponentId, setSelectedComponentId] = useState<string>('button');
  const [selectedVariableId, setSelectedVariableId] = useState<string>('primary');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modals / Dialogs
  const [isAddVariableOpen, setIsAddVariableOpen] = useState(false);
  const [newVariableName, setNewVariableName] = useState('');
  const [newVariableKey, setNewVariableKey] = useState('');
  const [newVariableDesc, setNewVariableDesc] = useState('');

  const [isAddPaletteOpen, setIsAddPaletteOpen] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState('');
  const [newPaletteId, setNewPaletteId] = useState('');
  const [newPaletteCategory, setNewPaletteCategory] = useState<'color' | 'radius' | 'spacing'>('color');
  const [newPaletteValue, setNewPaletteValue] = useState('#3182f6');
  const [newPaletteDesc, setNewPaletteDesc] = useState('');

  // Editing Variable Name
  const [editingVariableId, setEditingVariableId] = useState<string | null>(null);
  const [editingVariableName, setEditingVariableName] = useState('');

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

  // Active Component & Variable
  const currentComponent = components.find((c) => c.id === selectedComponentId) || components[0];
  const currentVariable = currentComponent.variables.find((v) => v.id === selectedVariableId) || currentComponent.variables[0];

  // Helper to resolve palette value
  const getPaletteValue = (paletteId: string): string => {
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
    setIsAddVariableOpen(false);
    setNewVariableName('');
    setNewVariableKey('');
    setNewVariableDesc('');
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
      setSelectedVariableId(remaining[0].id);
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
          variables: comp.variables.map((v) =>
            v.id === varId ? { ...v, name: editingVariableName.trim() } : v
          ),
        };
      })
    );
    setEditingVariableId(null);
  };

  // Add new Palette Variable
  const handleCreatePalette = () => {
    if (!newPaletteName.trim() || !newPaletteId.trim()) return;
    let cleanId = newPaletteId.trim();
    if (!cleanId.startsWith('--atom-')) {
      cleanId = `--atom-${cleanId}`;
    }

    const newPal: PaletteVariable = {
      id: cleanId,
      name: newPaletteName.trim(),
      category: newPaletteCategory,
      value: newPaletteValue.trim(),
      description: newPaletteDesc.trim(),
    };

    setPaletteVariables((prev) => [...prev, newPal]);
    setIsAddPaletteOpen(false);
    setNewPaletteName('');
    setNewPaletteId('');
    setNewPaletteValue('#3182f6');
    setNewPaletteDesc('');
  };

  // Delete Palette Variable
  const handleDeletePalette = (id: string) => {
    setPaletteVariables((prev) => prev.filter((p) => p.id !== id));
  };

  // Save changes directly to tokens/token.json & css/atom-ui.css via /api/tokens
  const handleSaveToProject = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const tokensJson = JSON.parse(exportStudioToTokensJson(paletteVariables, components));
      const customCss = exportStudioToCSS(paletteVariables, components);
      const res = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens: tokensJson, css: customCss }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save');
      }

      setSaveSuccess(true);
      setStatusMessage(t('saveSuccessMsg'));
      setTimeout(() => {
        setSaveSuccess(false);
        setStatusMessage(null);
      }, 4000);
    } catch (err: any) {
      setStatusMessage(t('saveFailMsg') + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered components
  const filteredComponents = components.filter((comp) => {
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) || comp.id.includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || comp.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-screen flex flex-col bg-(--bg-primary) text-(--text-primary) font-sans overflow-hidden transition-colors">
      <div className="shrink-0">
        <Header brandColor={brandColor} />
      </div>

      {/* Case 1: Remote Production Web Environment Guard */}
      {isLocalHost === false ? (
        <main className="flex-1 overflow-y-auto max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center gap-6 animate-in fade-in">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
            <Terminal className="w-7 h-7" />
          </div>

          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono font-semibold border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('remoteGuardBadge')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-(--text-primary)">
              {t('remoteGuardTitle')}
            </h1>
            <p className="text-sm text-(--text-secondary) leading-relaxed whitespace-pre-line">
              {t('remoteGuardDesc', { hostname })}
            </p>
          </div>

          {/* Quick Command Execution Card */}
          <div className="w-full max-w-md p-5 rounded-xl bg-(--bg-secondary) border border-(--border-subtle) flex flex-col gap-3 shadow-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-(--text-secondary) uppercase tracking-wider">
                {t('remoteCliTitle')}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold">
                CLI Command
              </span>
            </div>
            <div className="p-3.5 rounded-lg bg-(--bg-primary) border border-(--border-subtle) flex items-center justify-between font-mono text-sm">
              <span className="text-(--text-primary)">$ npx atomsystem studio</span>
              <button
                type="button"
                onClick={copyStudioCommand}
                className="text-neutral-400 hover:text-(--text-primary) transition cursor-pointer ml-2"
                title={t('copyCommand')}
              >
                {copiedCli ? <Check className="w-4 h-4 text-emerald-500" /> : <Save className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-(--text-muted) leading-relaxed">
              {t('remoteCliTip')}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/guide"
              className="px-4 py-2 rounded-(--radius-sm) bg-(--text-primary) text-(--bg-primary) text-xs font-semibold hover:opacity-90 transition shadow-xs flex items-center gap-1.5"
            >
              <span>{t('guideBtn')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/components/button"
              className="px-4 py-2 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) text-xs font-semibold hover:bg-(--bg-primary) transition shadow-xs"
            >
              {t('componentsBtn')}
            </Link>
          </div>
        </main>
      ) : (
        /* Case 2: Unified Sidebar + Main Studio Layout (Independent Scrolling) */
        <div className="flex-1 w-full flex flex-col md:flex-row overflow-hidden border-t border-(--border-subtle) animate-in fade-in">
          {/* ================= LEFT SIDEBAR (Independent Scrollable Container) ================= */}
          <aside className="w-full md:w-72 lg:w-80 shrink-0 border-r border-(--border-subtle) bg-(--bg-secondary)/30 flex flex-col h-full overflow-hidden">
            {/* 1. Main Studio Mode Navigation Menu (Fixed Top in Sidebar) */}
            <div className="shrink-0 p-4 border-b border-(--border-subtle)/60 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-(--text-muted) uppercase tracking-wider block px-1">
                Studio Menu
              </span>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveTab('components')}
                  className={`w-full text-left px-3 py-2 rounded-(--radius-sm) text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2.5 ${
                    activeTab === 'components'
                      ? 'bg-(--text-primary) text-(--bg-primary) shadow-xs'
                      : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
                  }`}
                >
                  <Component className="w-4 h-4" />
                  <span>{t('tabComponents')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('palette')}
                  className={`w-full text-left px-3 py-2 rounded-(--radius-sm) text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2.5 ${
                    activeTab === 'palette'
                      ? 'bg-(--text-primary) text-(--bg-primary) shadow-xs'
                      : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span>{t('tabPalette')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('preview')}
                  className={`w-full text-left px-3 py-2 rounded-(--radius-sm) text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2.5 ${
                    activeTab === 'preview'
                      ? 'bg-(--text-primary) text-(--bg-primary) shadow-xs'
                      : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
                  }`}
                >
                  <FileCode className="w-4 h-4" />
                  <span>{t('tabJson')}</span>
                </button>
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
                      UI Components
                    </span>
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">
                      {filteredComponents.length}
                    </span>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-muted)" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('searchComponent')}
                      className="w-full text-xs pl-8 pr-3 py-1.5 rounded border border-(--border-subtle) bg-(--bg-primary) text-(--text-primary) placeholder:text-(--text-muted)"
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap gap-1">
                    {['all', 'Form', 'Layout', 'Feedback'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition ${
                          categoryFilter === cat
                            ? 'bg-(--text-primary) text-(--bg-primary) font-semibold'
                            : 'bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle)'
                        }`}
                      >
                        {cat === 'all' ? t('categoryAll') : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Independent Scrollable Component Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  {filteredComponents.map((comp) => {
                    const isSelected = comp.id === selectedComponentId;
                    return (
                      <button
                        key={comp.id}
                        onClick={() => {
                          setSelectedComponentId(comp.id);
                          setSelectedVariableId(comp.variables[0]?.id || 'default');
                        }}
                        className={`w-full text-left p-2.5 rounded-(--radius-sm) text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                            : 'hover:bg-(--bg-secondary) text-(--text-primary)'
                        }`}
                      >
                        <span className="truncate">{comp.name}</span>
                        <span className="text-[10px] font-mono opacity-60 ml-2">
                          {comp.variables.length} vars
                        </span>
                      </button>
                    );
                  })}
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
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
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

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPaletteVariables(INITIAL_PALETTE_VARIABLES);
                    setComponents(INITIAL_STUDIO_COMPONENTS);
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
                      <Check className="w-4 h-4 text-emerald-400" />
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
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* TAB 1: Component Studio (Stage & Token Inspector) */}
            {activeTab === 'components' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-10">
                {/* Central Stage: Variable Selector & Live Component Stage (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {/* Variable Selector Bar */}
                  <div className="p-4 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle) flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-(--text-secondary) uppercase tracking-wider flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-(--accent-primary)" />
                        {t('variableLabel')}
                      </span>
                      <button
                        onClick={() => setIsAddVariableOpen(true)}
                        className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t('addVariableBtn')}</span>
                      </button>
                    </div>

                    {/* Variable Tabs */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {currentComponent.variables.map((v) => {
                        const isVarSelected = v.id === currentVariable?.id;
                        const isEditing = editingVariableId === v.id;

                        if (isEditing) {
                          return (
                            <div key={v.id} className="flex items-center gap-1">
                              <input
                                type="text"
                                value={editingVariableName}
                                onChange={(e) => setEditingVariableName(e.target.value)}
                                className="text-xs px-2 py-1 rounded border border-(--border-subtle) bg-(--bg-primary)"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveRename(v.id)}
                                className="p-1 rounded bg-emerald-500 text-white text-xs cursor-pointer"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={v.id}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-(--radius-sm) text-xs font-medium transition cursor-pointer border ${
                              isVarSelected
                                ? 'bg-(--text-primary) text-(--bg-primary) border-(--text-primary) font-semibold shadow-xs'
                                : 'bg-(--bg-primary) text-(--text-secondary) border-(--border-subtle) hover:text-(--text-primary)'
                            }`}
                          >
                            <span onClick={() => setSelectedVariableId(v.id)}>
                              {v.name}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingVariableId(v.id);
                                setEditingVariableName(v.name);
                              }}
                              className="opacity-50 hover:opacity-100 p-0.5 cursor-pointer"
                              title="Rename Variable"
                            >
                              <Edit2 className="w-2.5 h-2.5" />
                            </button>
                            {currentComponent.variables.length > 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteVariable(v.id);
                                }}
                                className="opacity-50 hover:opacity-100 hover:text-rose-400 p-0.5 cursor-pointer"
                                title={t('deleteVariable')}
                              >
                                <Trash2 className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {currentVariable?.description && (
                      <p className="text-[11px] text-(--text-muted) italic pt-1 border-t border-(--border-subtle)">
                        {currentVariable.description}
                      </p>
                    )}
                  </div>

                  {/* Live Preview Stage */}
                  <div className="p-6 rounded-(--radius) bg-(--bg-secondary)/20 border border-(--border-subtle) flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-(--text-secondary)">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-(--accent-primary)" />
                        {t('livePreview')}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-(--bg-secondary)">
                        variable="{currentVariable?.id}"
                      </span>
                    </div>

                    {/* Dynamic Render based on token bindings */}
                    <div className="p-8 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex items-center justify-center min-h-[220px] transition-all">
                      {/* BUTTON PREVIEW */}
                      {currentComponent.id === 'button' && (
                        <button
                          style={{
                            backgroundColor: getPaletteValue(currentVariable?.tokenBindings.background || ''),
                            color: getPaletteValue(currentVariable?.tokenBindings.textColor || ''),
                            border: `1px solid ${getPaletteValue(currentVariable?.tokenBindings.borderColor || '')}`,
                            borderRadius: getPaletteValue(currentVariable?.tokenBindings.borderRadius || ''),
                            paddingLeft: getPaletteValue(currentVariable?.tokenBindings.paddingX || ''),
                            paddingRight: getPaletteValue(currentVariable?.tokenBindings.paddingX || ''),
                            paddingTop: getPaletteValue(currentVariable?.tokenBindings.paddingY || ''),
                            paddingBottom: getPaletteValue(currentVariable?.tokenBindings.paddingY || ''),
                          }}
                          className="font-medium text-sm transition-transform active:scale-95 cursor-pointer shadow-xs"
                        >
                          {currentVariable?.name || 'Button'}
                        </button>
                      )}

                      {/* BADGE PREVIEW */}
                      {currentComponent.id === 'badge' && (
                        <span
                          style={{
                            backgroundColor: getPaletteValue(currentVariable?.tokenBindings.background || ''),
                            color: getPaletteValue(currentVariable?.tokenBindings.textColor || ''),
                            border: `1px solid ${getPaletteValue(currentVariable?.tokenBindings.borderColor || '')}`,
                            borderRadius: getPaletteValue(currentVariable?.tokenBindings.borderRadius || ''),
                            paddingLeft: getPaletteValue(currentVariable?.tokenBindings.paddingX || ''),
                            paddingRight: getPaletteValue(currentVariable?.tokenBindings.paddingX || ''),
                            paddingTop: getPaletteValue(currentVariable?.tokenBindings.paddingY || ''),
                            paddingBottom: getPaletteValue(currentVariable?.tokenBindings.paddingY || ''),
                          }}
                          className="text-xs font-mono font-bold inline-block"
                        >
                          {currentVariable?.name}
                        </span>
                      )}

                      {/* CARD PREVIEW */}
                      {currentComponent.id === 'card' && (
                        <div
                          style={{
                            backgroundColor: getPaletteValue(currentVariable?.tokenBindings.background || ''),
                            border: `1px solid ${getPaletteValue(currentVariable?.tokenBindings.borderColor || '')}`,
                            borderRadius: getPaletteValue(currentVariable?.tokenBindings.borderRadius || ''),
                            padding: getPaletteValue(currentVariable?.tokenBindings.padding || ''),
                          }}
                          className="w-full max-w-sm flex flex-col gap-2 shadow-xs"
                        >
                          <h4 className="font-bold text-sm text-(--text-primary)">Card Title</h4>
                          <p className="text-xs text-(--text-secondary) leading-relaxed">
                            This card reflects the "{currentVariable?.name}" design token variable mappings.
                          </p>
                        </div>
                      )}

                      {/* INPUT PREVIEW */}
                      {currentComponent.id === 'input' && (
                        <input
                          type="text"
                          defaultValue="Sample Input Value"
                          style={{
                            backgroundColor: getPaletteValue(currentVariable?.tokenBindings.background || ''),
                            color: getPaletteValue(currentVariable?.tokenBindings.textColor || ''),
                            border: `1px solid ${getPaletteValue(currentVariable?.tokenBindings.borderColor || '')}`,
                            borderRadius: getPaletteValue(currentVariable?.tokenBindings.borderRadius || ''),
                            paddingLeft: getPaletteValue(currentVariable?.tokenBindings.paddingX || ''),
                            paddingRight: getPaletteValue(currentVariable?.tokenBindings.paddingX || ''),
                            paddingTop: getPaletteValue(currentVariable?.tokenBindings.paddingY || ''),
                            paddingBottom: getPaletteValue(currentVariable?.tokenBindings.paddingY || ''),
                          }}
                          className="w-full max-w-sm text-sm outline-none font-mono"
                        />
                      )}

                      {/* MODAL PREVIEW */}
                      {currentComponent.id === 'modal' && (
                        <div
                          style={{
                            backgroundColor: getPaletteValue(currentVariable?.tokenBindings.background || ''),
                            border: `1px solid ${getPaletteValue(currentVariable?.tokenBindings.borderColor || '')}`,
                            borderRadius: getPaletteValue(currentVariable?.tokenBindings.borderRadius || ''),
                            padding: getPaletteValue(currentVariable?.tokenBindings.padding || ''),
                          }}
                          className="w-full max-w-sm flex flex-col gap-3 shadow-lg"
                        >
                          <h4 className="font-bold text-sm text-(--text-primary)">Dialog Modal Window</h4>
                          <p className="text-xs text-(--text-secondary)">
                            Dynamic radius and surface padding bound to "{currentVariable?.name}".
                          </p>
                          <div className="flex justify-end gap-2 pt-2">
                            <button className="px-3 py-1 rounded text-xs bg-(--bg-secondary) text-(--text-primary)">
                              Dismiss
                            </button>
                          </div>
                        </div>
                      )}

                      {/* TEXTAREA PREVIEW */}
                      {currentComponent.id === 'textarea' && (
                        <textarea
                          defaultValue="Sample multi-line textarea with dynamic radius & borders."
                          rows={3}
                          style={{
                            backgroundColor: getPaletteValue(currentVariable?.tokenBindings.background || ''),
                            border: `1px solid ${getPaletteValue(currentVariable?.tokenBindings.borderColor || '')}`,
                            borderRadius: getPaletteValue(currentVariable?.tokenBindings.borderRadius || ''),
                            padding: getPaletteValue(currentVariable?.tokenBindings.padding || ''),
                          }}
                          className="w-full max-w-sm text-sm outline-none font-mono"
                        />
                      )}

                      {/* SWITCH PREVIEW */}
                      {currentComponent.id === 'switch' && (
                        <div className="flex items-center gap-3">
                          <div
                            style={{
                              backgroundColor: getPaletteValue(currentVariable?.tokenBindings.activeBackground || ''),
                              borderRadius: getPaletteValue(currentVariable?.tokenBindings.borderRadius || ''),
                            }}
                            className="w-12 h-6 p-0.5 flex items-center justify-end cursor-pointer shadow-xs transition-colors"
                          >
                            <div
                              style={{
                                backgroundColor: getPaletteValue(currentVariable?.tokenBindings.thumbColor || ''),
                                borderRadius: getPaletteValue(currentVariable?.tokenBindings.borderRadius || ''),
                              }}
                              className="w-5 h-5 shadow-xs"
                            />
                          </div>
                          <span className="text-xs font-semibold text-(--text-primary)">
                            {currentVariable?.name}
                          </span>
                        </div>
                      )}

                      {/* TABS PREVIEW */}
                      {currentComponent.id === 'tabs' && (
                        <div className="flex items-center gap-2 p-1.5 rounded-(--radius) bg-(--bg-secondary)/60 border border-(--border-subtle)">
                          <button
                            style={{
                              backgroundColor: currentVariable?.id === 'pills' ? getPaletteValue(currentVariable?.tokenBindings.activeIndicator || '') : 'transparent',
                              color: getPaletteValue(currentVariable?.tokenBindings.activeText || ''),
                              borderRadius: getPaletteValue(currentVariable?.tokenBindings.borderRadius || ''),
                              borderBottom: currentVariable?.id === 'underlined' ? `2px solid ${getPaletteValue(currentVariable?.tokenBindings.activeIndicator || '')}` : 'none',
                            }}
                            className="px-3 py-1.5 text-xs font-bold"
                          >
                            Active Tab
                          </button>
                          <button
                            style={{
                              color: getPaletteValue(currentVariable?.tokenBindings.inactiveText || ''),
                            }}
                            className="px-3 py-1.5 text-xs font-medium"
                          >
                            Inactive Tab
                          </button>
                        </div>
                      )}

                      {/* TABLE PREVIEW */}
                      {currentComponent.id === 'table' && (
                        <div
                          style={{
                            borderRadius: getPaletteValue(currentVariable?.tokenBindings.borderRadius || ''),
                            border: `1px solid ${getPaletteValue(currentVariable?.tokenBindings.borderColor || '')}`,
                          }}
                          className="w-full max-w-md overflow-hidden text-xs"
                        >
                          <div
                            style={{
                              backgroundColor: getPaletteValue(currentVariable?.tokenBindings.headerBackground || ''),
                              borderBottom: `1px solid ${getPaletteValue(currentVariable?.tokenBindings.borderColor || '')}`,
                              padding: getPaletteValue(currentVariable?.tokenBindings.cellPadding || ''),
                            }}
                            className="font-bold flex justify-between"
                          >
                            <span>Header Column 1</span>
                            <span>Header Column 2</span>
                          </div>
                          <div
                            style={{
                              padding: getPaletteValue(currentVariable?.tokenBindings.cellPadding || ''),
                            }}
                            className="flex justify-between bg-(--bg-primary)"
                          >
                            <span>Row 1 Data A</span>
                            <span className="font-mono">1,024</span>
                          </div>
                        </div>
                      )}

                      {/* AVATAR PREVIEW */}
                      {currentComponent.id === 'avatar' && (
                        <div
                          style={{
                            backgroundColor: getPaletteValue(currentVariable?.tokenBindings.background || ''),
                            color: getPaletteValue(currentVariable?.tokenBindings.textColor || ''),
                            borderRadius: getPaletteValue(currentVariable?.tokenBindings.borderRadius || ''),
                          }}
                          className="w-14 h-14 flex items-center justify-center font-bold text-base shadow-xs"
                        >
                          AT
                        </div>
                      )}
                    </div>

                    {/* Code Snippet for this variable */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-(--text-muted)">
                        {t('codeSnippet')}:
                      </span>
                      <pre className="p-2.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) font-mono text-xs overflow-x-auto">
                        &lt;{currentComponent.name.split(' ')[0]} variable="{currentVariable?.id}" /&gt;
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Right Column: Token ↔ Palette Binding Inspector (5 cols) */}
                <div className="lg:col-span-5 p-5 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle) flex flex-col gap-4">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-(--text-primary) flex items-center gap-1.5 whitespace-nowrap">
                      <Sliders className="w-4 h-4 text-(--accent-primary) shrink-0" />
                      <span>{t('bindingPanelTitle')}</span>
                    </h3>
                    <p className="text-xs text-(--text-secondary) mt-0.5">
                      {t('bindingPanelDesc')}
                    </p>
                  </div>

                  {/* Property Bindings List */}
                  <div className="space-y-3.5 pt-2 border-t border-(--border-subtle)">
                    {currentComponent.properties.map((prop) => {
                      const boundPaletteId = currentVariable?.tokenBindings[prop.key] || prop.defaultPaletteId;
                      const matchedPalette = paletteVariables.find((p) => p.id === boundPaletteId);
                      const relevantPalettes = paletteVariables.filter((p) => p.category === prop.category);

                      return (
                        <div key={prop.key} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-(--text-primary)">
                              {prop.label}
                            </span>
                            <span className="font-mono text-[10px] text-(--text-muted)">
                              {t('boundPaletteValue')}{matchedPalette?.value}
                            </span>
                          </div>

                          {/* Palette Selector Dropdown */}
                          <div className="flex items-center gap-2">
                            {prop.category === 'color' && (
                              <span
                                style={{ backgroundColor: matchedPalette?.value || '#ccc' }}
                                className="w-5 h-5 rounded border border-(--border-subtle) shrink-0 shadow-xs"
                              />
                            )}
                            <select
                              value={boundPaletteId}
                              onChange={(e) => handleUpdateBinding(prop.key, e.target.value)}
                              className="flex-1 text-xs font-mono p-1.5 rounded border border-(--border-subtle) bg-(--bg-primary) text-(--text-primary) cursor-pointer"
                            >
                              <option value="" disabled>
                                {t('selectPalettePlaceholder')}
                              </option>
                              {relevantPalettes.map((pal) => (
                                <option key={pal.id} value={pal.id}>
                                  {pal.name} ({pal.value})
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Palette Management Page */}
            {activeTab === 'palette' && (
              <div className="flex flex-col gap-6 pb-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle)">
                  <div>
                    <h2 className="text-base font-bold text-(--text-primary) flex items-center gap-2">
                      <Palette className="w-5 h-5 text-(--accent-primary)" />
                      <span>{t('paletteManagerTitle')}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-(--text-secondary) mt-1">
                      {t('paletteManagerDesc')}
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsAddPaletteOpen(true)}
                    className="flex items-center gap-1.5 bg-(--accent-primary) text-(--bg-primary) shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('addPaletteBtn')}</span>
                  </Button>
                </div>

                {/* Palette Variables Table */}
                <div className="overflow-x-auto rounded-(--radius) border border-(--border-subtle)">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-(--bg-secondary)/60 border-b border-(--border-subtle) text-xs font-semibold text-(--text-secondary)">
                      <tr>
                        <th className="p-3">{t('thPaletteName')}</th>
                        <th className="p-3">{t('thPaletteCategory')}</th>
                        <th className="p-3">{t('thPaletteValue')}</th>
                        <th className="p-3">{t('paletteDescLabel')}</th>
                        <th className="p-3 text-right">{t('thPaletteAction')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-(--border-subtle)">
                      {paletteVariables.map((pal) => (
                        <tr key={pal.id} className="hover:bg-(--bg-secondary)/30 transition-colors">
                          <td className="p-3">
                            <div className="font-semibold text-(--text-primary)">{pal.name}</div>
                            <div className="font-mono text-xs text-(--text-muted)">{pal.id}</div>
                          </td>
                          <td className="p-3">
                            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
                              {pal.category}
                            </span>
                          </td>
                          <td className="p-3">
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
                          </td>
                          <td className="p-3 text-xs text-(--text-secondary)">
                            {pal.description || '-'}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeletePalette(pal.id)}
                              className="text-xs text-rose-500 hover:text-rose-700 cursor-pointer font-medium p-1"
                            >
                              {t('deleteBtn')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
          </main>
        </div>
      )}

      {/* MODAL 1: Add Component Variable */}
      {isAddVariableOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-xl flex flex-col gap-4 animate-in fade-in">
            <h3 className="font-bold text-base text-(--text-primary)">
              {t('addVariableBtn')} ({currentComponent.name})
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('variableNameLabel')} (Display Name)
                </label>
                <input
                  type="text"
                  value={newVariableName}
                  onChange={(e) => setNewVariableName(e.target.value)}
                  placeholder="예: 완전 둥근 버튼 (Pill CTA)"
                  className="w-full p-2 rounded border border-(--border-subtle) bg-(--bg-secondary) text-(--text-primary)"
                  autoFocus
                />
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('variableKeyLabel')} (Code Identifier)
                </label>
                <input
                  type="text"
                  value={newVariableKey}
                  onChange={(e) => setNewVariableKey(e.target.value)}
                  placeholder="예: pill-cta"
                  className="w-full p-2 rounded border border-(--border-subtle) bg-(--bg-secondary) font-mono text-(--text-primary)"
                />
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('variableDescLabel')}
                </label>
                <input
                  type="text"
                  value={newVariableDesc}
                  onChange={(e) => setNewVariableDesc(e.target.value)}
                  placeholder="예: 랜딩 페이지 전용 라운드 디자인"
                  className="w-full p-2 rounded border border-(--border-subtle) bg-(--bg-secondary) text-(--text-primary)"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-(--border-subtle)">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddVariableOpen(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateVariable}
                disabled={!newVariableName.trim() || !newVariableKey.trim()}
              >
                {t('saveVariable')}
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
                  {t('paletteCategoryLabel')}
                </label>
                <select
                  value={newPaletteCategory}
                  onChange={(e) => setNewPaletteCategory(e.target.value as any)}
                  className="w-full p-2 rounded border border-(--border-subtle) bg-(--bg-secondary) text-(--text-primary)"
                >
                  <option value="color">Color (색상)</option>
                  <option value="radius">Radius (모서리 곡률)</option>
                  <option value="spacing">Spacing (여백/패딩)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('paletteNameLabel')}
                </label>
                <input
                  type="text"
                  value={newPaletteName}
                  onChange={(e) => setNewPaletteName(e.target.value)}
                  placeholder="예: Indigo 500 (Hero Accent)"
                  className="w-full p-2 rounded border border-(--border-subtle) bg-(--bg-secondary) text-(--text-primary)"
                  autoFocus
                />
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('paletteIdLabel')}
                </label>
                <input
                  type="text"
                  value={newPaletteId}
                  onChange={(e) => setNewPaletteId(e.target.value)}
                  placeholder="예: --atom-palette-indigo-500"
                  className="w-full p-2 rounded border border-(--border-subtle) bg-(--bg-secondary) font-mono text-(--text-primary)"
                />
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('paletteValueLabel')}
                </label>
                <div className="flex items-center gap-2">
                  {newPaletteCategory === 'color' && (
                    <input
                      type="color"
                      value={newPaletteValue}
                      onChange={(e) => setNewPaletteValue(e.target.value)}
                      className="w-8 h-8 rounded border border-(--border-subtle) cursor-pointer"
                    />
                  )}
                  <input
                    type="text"
                    value={newPaletteValue}
                    onChange={(e) => setNewPaletteValue(e.target.value)}
                    placeholder={newPaletteCategory === 'color' ? '#6366f1' : '16px'}
                    className="flex-1 p-2 rounded border border-(--border-subtle) bg-(--bg-secondary) font-mono text-(--text-primary)"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  {t('paletteDescLabel')}
                </label>
                <input
                  type="text"
                  value={newPaletteDesc}
                  onChange={(e) => setNewPaletteDesc(e.target.value)}
                  placeholder="예: 주요 히어로 섹션 전용 액센트 컬러"
                  className="w-full p-2 rounded border border-(--border-subtle) bg-(--bg-secondary) text-(--text-primary)"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-(--border-subtle)">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddPaletteOpen(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreatePalette}
                disabled={!newPaletteName.trim() || !newPaletteId.trim()}
              >
                {t('saveVariable')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
