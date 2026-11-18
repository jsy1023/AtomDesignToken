'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { formatLocaleText } from '@/lib/utils/localeFormat';
import {
  Button,
  Input,
  Badge,
  Card,
  NativeSelect,
  TokenSelect,
} from '@/components/ui';
import { StudioTheme, ThemeCategory, ThemePaletteBindings } from '@/lib/data/themeData';
import { PaletteVariable, INITIAL_PALETTE_VARIABLES } from '@/lib/data/studioData';
import {
  Palette,
  Sparkles,
  Check,
  Plus,
  Trash2,
  Copy,
  Sun,
  Moon,
  Layers,
  Search,
  Sliders,
  Shield,
  Eye,
  Edit2,
  Save,
  RotateCcw,
  Link2,
} from 'lucide-react';

export interface StudioThemeManagerProps {
  themes: StudioTheme[];
  activeThemeId: string;
  paletteVariables?: PaletteVariable[];
  onSelectTheme: (themeId: string) => void;
  onCreateTheme: (newTheme: StudioTheme) => void;
  onUpdateTheme: (updatedTheme: StudioTheme) => void;
  onDeleteTheme: (themeId: string) => void;
}

export function StudioThemeManager({
  themes,
  activeThemeId,
  paletteVariables,
  onSelectTheme,
  onCreateTheme,
  onUpdateTheme,
  onDeleteTheme,
}: StudioThemeManagerProps) {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Available palette tokens (Color and Semantic Status)
  const availablePalettes = paletteVariables || INITIAL_PALETTE_VARIABLES;
  const colorPalettes = availablePalettes.filter((p) => p.category === 'color' || p.category === 'status');

  // Helper to find palette by ID or Value
  const findPaletteById = (id?: string) => colorPalettes.find((p) => p.id === id);
  const findPaletteByValue = (val?: string) => colorPalettes.find((p) => p.value.toLowerCase() === val?.toLowerCase());

  // Editor Modal State (For both Creating new and Modifying existing themes)
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingThemeId, setEditingThemeId] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formId, setFormId] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formMode, setFormMode] = useState<'light' | 'dark'>('light');

  // Palette Token Bindings State (Primary SSOT)
  const [formPrimaryPalId, setFormPrimaryPalId] = useState('--atom-palette-blue-500');
  const [formPrimaryHoverPalId, setFormPrimaryHoverPalId] = useState('--atom-palette-blue-600');
  const [formPrimaryLightPalId, setFormPrimaryLightPalId] = useState('--atom-palette-blue-50');

  const [formSecondaryPalId, setFormSecondaryPalId] = useState('--atom-palette-gray-200');
  const [formSecondaryHoverPalId, setFormSecondaryHoverPalId] = useState('--atom-palette-gray-300');
  const [formSecondaryLightPalId, setFormSecondaryLightPalId] = useState('--atom-palette-gray-50');

  const [formBgPrimaryPalId, setFormBgPrimaryPalId] = useState('--atom-palette-white');
  const [formBgSecondaryPalId, setFormBgSecondaryPalId] = useState('--atom-palette-gray-50');

  const [formTextPrimaryPalId, setFormTextPrimaryPalId] = useState('--atom-palette-gray-900');
  const [formTextSecondaryPalId, setFormTextSecondaryPalId] = useState('--atom-palette-gray-700');
  const [formTextMutedPalId, setFormTextMutedPalId] = useState('--atom-palette-gray-500');

  const [formBorderSubtlePalId, setFormBorderSubtlePalId] = useState('--atom-palette-gray-200');
  const [formBorderStrongPalId, setFormBorderStrongPalId] = useState('--atom-palette-gray-300');
  const [formBorderRadius, setFormBorderRadius] = useState('8px');

  const [formStatusSuccessPalId, setFormStatusSuccessPalId] = useState('--atom-palette-emerald-500');
  const [formStatusDangerPalId, setFormStatusDangerPalId] = useState('--atom-palette-rose-500');
  const [formStatusWarningPalId, setFormStatusWarningPalId] = useState('--atom-palette-amber-500');

  // Resolved CSS Color Values from Palette Bindings
  const formPrimary = findPaletteById(formPrimaryPalId)?.value || '#3182f6';
  const formPrimaryHover = findPaletteById(formPrimaryHoverPalId)?.value || '#1b64da';
  const formPrimaryLight = findPaletteById(formPrimaryLightPalId)?.value || '#eff6ff';

  const formSecondary = findPaletteById(formSecondaryPalId)?.value || (formMode === 'dark' ? '#334155' : '#e2e8f0');
  const formSecondaryHover = findPaletteById(formSecondaryHoverPalId)?.value || (formMode === 'dark' ? '#475569' : '#cbd5e1');
  const formSecondaryLight = findPaletteById(formSecondaryLightPalId)?.value || (formMode === 'dark' ? '#1e293b' : '#f8fafc');

  const formBgPrimary = findPaletteById(formBgPrimaryPalId)?.value || (formMode === 'dark' ? '#0f172a' : '#ffffff');
  const formBgSecondary = findPaletteById(formBgSecondaryPalId)?.value || (formMode === 'dark' ? '#1e293b' : '#f8fafc');

  const formTextPrimary = findPaletteById(formTextPrimaryPalId)?.value || (formMode === 'dark' ? '#f8fafc' : '#0f172a');
  const formTextSecondary = findPaletteById(formTextSecondaryPalId)?.value || (formMode === 'dark' ? '#94a3b8' : '#334155');
  const formTextMuted = findPaletteById(formTextMutedPalId)?.value || '#64748b';

  const formBorderSubtle = findPaletteById(formBorderSubtlePalId)?.value || (formMode === 'dark' ? '#334155' : '#e2e8f0');
  const formBorderStrong = findPaletteById(formBorderStrongPalId)?.value || (formMode === 'dark' ? '#475569' : '#cbd5e1');

  const formStatusSuccess = findPaletteById(formStatusSuccessPalId)?.value || '#10b981';
  const formStatusDanger = findPaletteById(formStatusDangerPalId)?.value || '#ef4444';
  const formStatusWarning = findPaletteById(formStatusWarningPalId)?.value || '#f59e0b';

  // Filtered themes
  const filteredThemes = themes.filter((t) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'dark'
        ? t.mode === 'dark'
        : selectedCategory === 'custom'
        ? t.isCustom
        : t.category === selectedCategory || (selectedCategory === 'lifestyle' && t.category === 'lifestyle');

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const activeTheme = themes.find((t) => t.id === activeThemeId) || themes[0];

  // Open editor for Creating a new theme
  const handleOpenCreate = () => {
    setEditingThemeId(null);
    setFormName('');
    setFormId('');
    setFormDesc('');
    setFormMode('light');
    setFormPrimaryPalId('--atom-palette-blue-500');
    setFormPrimaryHoverPalId('--atom-palette-blue-600');
    setFormPrimaryLightPalId('--atom-palette-blue-50');
    setFormSecondaryPalId('--atom-palette-gray-200');
    setFormSecondaryHoverPalId('--atom-palette-gray-300');
    setFormSecondaryLightPalId('--atom-palette-gray-50');
    setFormBgPrimaryPalId('--atom-palette-white');
    setFormBgSecondaryPalId('--atom-palette-gray-50');
    setFormTextPrimaryPalId('--atom-palette-gray-900');
    setFormTextSecondaryPalId('--atom-palette-gray-700');
    setFormTextMutedPalId('--atom-palette-gray-500');
    setFormBorderSubtlePalId('--atom-palette-gray-200');
    setFormBorderStrongPalId('--atom-palette-gray-300');
    setFormBorderRadius('8px');
    setFormStatusSuccessPalId('--atom-palette-emerald-500');
    setFormStatusDangerPalId('--atom-palette-rose-500');
    setFormStatusWarningPalId('--atom-palette-amber-500');
    setIsEditorOpen(true);
  };

  // Open editor for Modifying existing theme tokens
  const handleOpenEdit = (t: StudioTheme) => {
    setEditingThemeId(t.id);
    setFormName(t.name);
    setFormId(t.id);
    setFormDesc(t.description);
    setFormMode(t.mode);

    const pb = t.paletteBindings || {};
    setFormPrimaryPalId(pb.primary || findPaletteByValue(t.colors.primary)?.id || '--atom-palette-blue-500');
    setFormPrimaryHoverPalId(pb.primaryHover || findPaletteByValue(t.colors.primaryHover)?.id || '--atom-palette-blue-600');
    setFormPrimaryLightPalId(pb.primaryLight || findPaletteByValue(t.colors.primaryLight)?.id || '--atom-palette-blue-50');

    setFormSecondaryPalId(pb.secondary || findPaletteByValue(t.colors.secondary || '')?.id || (t.mode === 'dark' ? '--atom-palette-gray-700' : '--atom-palette-gray-200'));
    setFormSecondaryHoverPalId(pb.secondaryHover || findPaletteByValue(t.colors.secondaryHover || '')?.id || (t.mode === 'dark' ? '--atom-palette-gray-600' : '--atom-palette-gray-300'));
    setFormSecondaryLightPalId(pb.secondaryLight || findPaletteByValue(t.colors.secondaryLight || '')?.id || (t.mode === 'dark' ? '--atom-palette-gray-800' : '--atom-palette-gray-50'));

    setFormBgPrimaryPalId(pb.bgPrimary || findPaletteByValue(t.colors.bgPrimary)?.id || (t.mode === 'dark' ? '--atom-palette-gray-900' : '--atom-palette-white'));
    setFormBgSecondaryPalId(pb.bgSecondary || findPaletteByValue(t.colors.bgSecondary)?.id || (t.mode === 'dark' ? '--atom-palette-gray-800' : '--atom-palette-gray-50'));

    setFormTextPrimaryPalId(pb.textPrimary || findPaletteByValue(t.colors.textPrimary)?.id || (t.mode === 'dark' ? '--atom-palette-gray-50' : '--atom-palette-gray-900'));
    setFormTextSecondaryPalId(pb.textSecondary || findPaletteByValue(t.colors.textSecondary)?.id || (t.mode === 'dark' ? '--atom-palette-gray-400' : '--atom-palette-gray-700'));
    setFormTextMutedPalId(pb.textMuted || findPaletteByValue(t.colors.textMuted)?.id || '--atom-palette-gray-500');

    setFormBorderSubtlePalId(pb.borderSubtle || findPaletteByValue(t.colors.borderSubtle)?.id || (t.mode === 'dark' ? '--atom-palette-gray-700' : '--atom-palette-gray-200'));
    setFormBorderStrongPalId(pb.borderStrong || findPaletteByValue(t.colors.borderStrong)?.id || (t.mode === 'dark' ? '--atom-palette-gray-600' : '--atom-palette-gray-300'));
    setFormBorderRadius(t.borderRadius);

    setFormStatusSuccessPalId(pb.statusSuccess || findPaletteByValue(t.colors.statusSuccess)?.id || '--atom-palette-emerald-500');
    setFormStatusDangerPalId(pb.statusDanger || findPaletteByValue(t.colors.statusDanger)?.id || '--atom-palette-rose-500');
    setFormStatusWarningPalId(pb.statusWarning || findPaletteByValue(t.colors.statusWarning)?.id || '--atom-palette-amber-500');

    setIsEditorOpen(true);
  };

  // Close theme editor modal on ESC key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEditorOpen(false);
      }
    };
    if (isEditorOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditorOpen]);

  // Open editor for Duplicating an existing theme
  const handleOpenDuplicate = (baseTheme: StudioTheme) => {
    handleOpenEdit(baseTheme);
    setEditingThemeId(null);
    setFormName(`${baseTheme.name} (${locale === 'ko' ? '커스텀' : 'Custom'})`);
    setFormId(`${baseTheme.id}-custom`);
    setFormDesc(`${baseTheme.name} 기반의 팔레트 커스텀 테마`);
  };

  // Save changes (either add new or update existing)
  const handleSaveTheme = () => {
    if (!formName.trim() || !formId.trim()) return;

    const cleanId = formId.trim().toLowerCase().replace(/\s+/g, '-');

    const themePayload: StudioTheme = {
      id: cleanId,
      name: formName.trim(),
      description: formDesc.trim() || (locale === 'ko' ? '팔레트 기반 커스텀 테마' : 'Palette-based custom theme'),
      mode: formMode,
      category: editingThemeId ? (themes.find((t) => t.id === editingThemeId)?.category || 'custom') : 'custom',
      brandColor: formPrimary,
      borderRadius: formBorderRadius,
      isCustom: true,
      paletteBindings: {
        primary: formPrimaryPalId,
        primaryHover: formPrimaryHoverPalId,
        primaryLight: formPrimaryLightPalId,
        secondary: formSecondaryPalId,
        secondaryHover: formSecondaryHoverPalId,
        secondaryLight: formSecondaryLightPalId,
        bgPrimary: formBgPrimaryPalId,
        bgSecondary: formBgSecondaryPalId,
        textPrimary: formTextPrimaryPalId,
        textSecondary: formTextSecondaryPalId,
        textMuted: formTextMutedPalId,
        borderSubtle: formBorderSubtlePalId,
        borderStrong: formBorderStrongPalId,
        statusSuccess: formStatusSuccessPalId,
        statusDanger: formStatusDangerPalId,
        statusWarning: formStatusWarningPalId,
      },
      colors: {
        primary: formPrimary,
        primaryHover: formPrimaryHover,
        primaryLight: formPrimaryLight,
        secondary: formSecondary,
        secondaryHover: formSecondaryHover,
        secondaryLight: formSecondaryLight,
        bgPrimary: formBgPrimary,
        bgSecondary: formBgSecondary,
        textPrimary: formTextPrimary,
        textSecondary: formTextSecondary,
        textMuted: formTextMuted,
        borderSubtle: formBorderSubtle,
        borderStrong: formBorderStrong,
        statusSuccess: formStatusSuccess,
        statusDanger: formStatusDanger,
        statusWarning: formStatusWarning,
      },
    };

    if (editingThemeId) {
      onUpdateTheme(themePayload);
    } else {
      onCreateTheme(themePayload);
    }

    setIsEditorOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle)">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-bold border border-(--accent-primary)/20 flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THEME TOKEN MANAGER</span>
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
              총 {themes.length}개 테마 지원
            </span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-(--text-primary) flex items-center gap-2">
            <Palette className="w-5 h-5 text-(--accent-primary)" />
            <span>{locale === 'ko' ? '디자인 테마 스튜디오' : 'Design Theme Studio'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-(--text-secondary) mt-1">
            {locale === 'ko' ? '프라이머리 브랜드 토큰, 서피스, 텍스트, 모서리 곡률 토큰을 자유롭게 수정하여 저장하고 실시간 적용할 수 있습니다.' : 'Fine-tune primary brand tokens, surfaces, text, and border radius with live reflection.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 bg-(--accent-primary) text-(--bg-primary)"
          >
            <Plus className="w-4 h-4" />
            <span>{locale === 'ko' ? '새 테마 만들기' : 'Create New Theme'}</span>
          </Button>
        </div>
      </div>

      {/* 2. Active Theme Highlight Banner */}
      <div className="p-4 rounded-(--radius) bg-(--bg-primary) border-2 border-(--accent-primary)/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            style={{ backgroundColor: activeTheme.colors.primary }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-md font-bold text-sm"
          >
            {activeTheme.mode === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-(--text-primary) truncate">
                {locale === 'ko' ? '현재 활성화된 테마:' : 'Active Theme:'} {formatLocaleText(activeTheme.name, locale)}
              </span>
              <Badge variant="primary" className="text-[11px] shrink-0">
                ACTIVE
              </Badge>
              <Badge variant="neutral" className="text-[11px] shrink-0 uppercase font-mono">
                {activeTheme.mode}
              </Badge>
            </div>
            <p className="text-xs text-(--text-secondary) truncate mt-0.5">
              {activeTheme.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleOpenEdit(activeTheme)}
            className="text-xs py-1.5 px-3 h-auto flex items-center gap-1.5"
          >
            <Edit2 className="w-3.5 h-3.5 text-(--accent-primary)" />
            <span>이 테마의 토큰 수정</span>
          </Button>

          {/* Quick Swatches */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-(--radius-sm) bg-(--bg-secondary)/50 border border-(--border-subtle)">
            <span
              style={{ backgroundColor: activeTheme.colors.primary }}
              className="w-5 h-5 rounded-full border border-(--border-subtle) shadow-xs"
              title="Primary Brand"
            />
            <span
              style={{ backgroundColor: activeTheme.colors.bgPrimary }}
              className="w-5 h-5 rounded-full border border-(--border-subtle) shadow-xs"
              title="Background Primary"
            />
            <span
              style={{ backgroundColor: activeTheme.colors.bgSecondary }}
              className="w-5 h-5 rounded-full border border-(--border-subtle) shadow-xs"
              title="Surface Secondary"
            />
            <span
              style={{ backgroundColor: activeTheme.colors.textPrimary }}
              className="w-5 h-5 rounded-full border border-(--border-subtle) shadow-xs"
              title="Text Primary"
            />
          </div>
        </div>
      </div>

      {/* 3. Filter Toolbar & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: locale === 'ko' ? '전체' : 'All' },
            { id: 'fintech', label: locale === 'ko' ? '핀테크' : 'Fintech' },
            { id: 'lifestyle', label: locale === 'ko' ? '라이프스타일' : 'Lifestyle' },
            { id: 'developer', label: locale === 'ko' ? '테크/개발자' : 'Developer' },
            { id: 'dark', label: locale === 'ko' ? '다크 모드' : 'Dark Mode' },
            { id: 'custom', label: locale === 'ko' ? '커스텀' : 'Custom' },
          ].map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id  ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id as ThemeCategory)}
              className="text-xs h-auto py-1.5 px-3"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-muted)" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="테마 검색..."
            className="text-xs pl-8 pr-3 py-1.5 w-full"
          />
        </div>
      </div>

      {/* 4. Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredThemes.map((t) => {
          const isActive = t.id === activeThemeId;

          return (
            <div
              key={t.id}
              className={`rounded-(--radius) bg-(--bg-primary) border flex flex-col justify-between overflow-hidden transition-all ${
                isActive
                  ? 'border-(--accent-primary) ring-2 ring-(--accent-primary)/30 shadow-md'
                  : 'border-(--border-subtle) hover:border-(--border-strong)'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-base text-(--text-primary)">
                        {formatLocaleText(t.name, locale)}
                      </span>
                      {isActive && (
                        <Badge variant="primary" className="text-[10px] py-0 px-1.5 font-mono">
                          ACTIVE
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Badge variant="secondary" className="text-[10px] uppercase font-mono py-0">
                        {t.mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
                      </Badge>
                      <Badge variant="neutral" className="text-[10px] uppercase font-mono py-0">
                        곡률: {t.borderRadius}
                      </Badge>
                      {t.isCustom && (
                        <Badge variant="warning" className="text-[10px] py-0 font-mono">
                          Custom
                        </Badge>
                      )}
                    </div>
                  </div>

                  <span
                    style={{ backgroundColor: t.brandColor }}
                    className="w-6 h-6 rounded-full border border-(--border-subtle) shadow-xs shrink-0"
                    title={t.brandColor}
                  />
                </div>

                <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-2 min-h-[32px]">
                  {t.description}
                </p>

                {/* Color Swatches Palette Row */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-(--text-muted)">
                    <span className="font-bold uppercase flex items-center gap-1">
                      <Link2 className="w-3 h-3 text-(--accent-primary)" />
                      <span>Palette Linked</span>
                    </span>
                    <span className="truncate max-w-[150px] font-mono opacity-80">
                      {t.paletteBindings?.primary || 'var(--atom-palette-blue-500)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 p-1 rounded bg-(--bg-secondary)/60 border border-(--border-subtle)/50">
                    <div
                      style={{ backgroundColor: t.colors.primary }}
                      className="flex-1 h-5 rounded-xs"
                      title={`Primary: ${t.colors.primary}`}
                    />
                    <div
                      style={{ backgroundColor: t.colors.bgPrimary }}
                      className="flex-1 h-5 rounded-xs border border-(--border-subtle)"
                      title={`Background: ${t.colors.bgPrimary}`}
                    />
                    <div
                      style={{ backgroundColor: t.colors.bgSecondary }}
                      className="flex-1 h-5 rounded-xs border border-(--border-subtle)"
                      title={`Surface: ${t.colors.bgSecondary}`}
                    />
                    <div
                      style={{ backgroundColor: t.colors.textPrimary }}
                      className="flex-1 h-5 rounded-xs"
                      title={`Text: ${t.colors.textPrimary}`}
                    />
                    <div
                      style={{ backgroundColor: t.colors.borderSubtle }}
                      className="flex-1 h-5 rounded-xs border border-(--border-subtle)"
                      title={`Border: ${t.colors.borderSubtle}`}
                    />
                    <div
                      style={{ backgroundColor: t.colors.statusSuccess }}
                      className="flex-1 h-5 rounded-xs"
                      title={`Success: ${t.colors.statusSuccess}`}
                    />
                  </div>
                </div>

                {/* Live Micro-Preview in this theme */}
                <div
                  style={{
                    backgroundColor: t.colors.bgSecondary,
                    borderColor: t.colors.borderSubtle,
                    borderRadius: t.borderRadius,
                  }}
                  className="p-3 border flex items-center justify-between gap-2 shadow-xs transition-colors"
                >
                  <Button
                    style={{
                      backgroundColor: t.colors.primary,
                      borderRadius: t.borderRadius,
                      color: '#ffffff',
                    }}
                    size="sm"
                    className="text-xs py-1 px-2.5 h-auto font-medium shadow-xs"
                  >
                    Button
                  </Button>

                  <span
                    style={{
                      backgroundColor: t.colors.primaryLight,
                      color: t.colors.primary,
                      borderRadius: t.borderRadius,
                    }}
                    className="text-[11px] font-mono px-2 py-0.5 font-bold"
                  >
                    Badge
                  </span>

                  <span
                    style={{
                      color: t.colors.textPrimary,
                    }}
                    className="text-xs font-semibold"
                  >
                    Aa 가나다
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 border-t border-(--border-subtle) bg-(--bg-secondary)/30 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenEdit(t)}
                    className="text-xs py-1 px-2 h-auto text-(--accent-primary) hover:underline flex items-center gap-1 font-semibold"
                    title="이 테마의 토큰 편집 및 저장"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>토큰 수정</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenDuplicate(t)}
                    className="text-xs py-1 px-1.5 h-auto text-(--text-secondary) hover:text-(--text-primary) flex items-center gap-1"
                    title="이 테마 복제"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>

                  {themes.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteTheme(t.id)}
                      className="text-xs py-1 px-1.5 h-auto text-(--text-secondary) hover:text-(--atom-color-destructive) flex items-center gap-1"
                      title="테마 삭제"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>

                <Button
                  variant={isActive  ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => onSelectTheme(t.id)}
                  className={`text-xs py-1 px-3 h-auto font-semibold flex items-center gap-1.5 ${
                    isActive ? 'bg-(--accent-primary) text-(--bg-primary)' : ''
                  }`}
                >
                  {isActive ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>적용 중</span>
                    </>
                  ) : (
                    <span>테마 적용</span>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Theme Token Customizer & Editor Modal (추가 / 수정 / 저장) */}
      {isEditorOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsEditorOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-2xl p-6 flex flex-col gap-5 my-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3.5">
              <div>
                <h3 className="font-bold text-base text-(--text-primary) flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-(--accent-primary)" />
                  <span>
                    {editingThemeId ? `[${formName}] 테마 토큰 수정 & 저장` : '새 디자인 테마 생성 & 토큰 설정'}
                  </span>
                </h3>
                <p className="text-xs text-(--text-secondary) mt-0.5">
                  프라이머리 컬러, 서피스 배경, 텍스트, 보더 곡률 등 핵심 토큰을 설정하고 저장하면 즉시 프로젝트에 반영됩니다.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                onClick={() => setIsEditorOpen(false)}
                className="text-(--text-muted) hover:text-(--text-primary)"
              >
                ✕
              </Button>
            </div>

            {/* Modal Body: Granular Token Fields */}
            <div className="space-y-4 text-xs">
              {/* 1. Meta Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-(--text-primary)">
                    {locale === 'ko' ? '테마 명칭' : 'Theme Name'}
                  </label>
                  <Input
                    type="text"
                    value={formName}
                    onChange={(e) => {
                      setFormName(e.target.value);
                      if (!editingThemeId && !formId) {
                        setFormId(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                      }
                    }}
                    placeholder={locale === 'ko' ? '예: 네오 민트 테크' : 'e.g. Neo Mint Tech'}
                    className="w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-(--text-primary)">
                    {locale === 'ko' ? '테마 식별자' : 'Theme Identifier'}
                  </label>
                  <Input
                    type="text"
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    disabled={!!editingThemeId}
                    placeholder="예: neo-mint"
                    className="w-full font-mono disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-(--text-primary)">
                  {locale === 'ko' ? '테마 설명' : 'Description'}
                </label>
                <Input
                  type="text"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder={locale === 'ko' ? '예: 산뜻한 민트와 딥 그레이가 조화된 모던 테마' : 'e.g. Modern theme with crisp mint and deep gray'}
                  className="w-full"
                />
              </div>

              {/* Mode & Radius */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-(--text-primary)">
                    {locale === 'ko' ? '기본 모드' : 'Color Mode'}
                  </label>
                  <NativeSelect
                    value={formMode}
                    onChange={(e) => {
                      const mode = e.target.value as 'light' | 'dark';
                      setFormMode(mode);
                      if (mode === 'dark') {
                        setFormBgPrimaryPalId('--atom-palette-gray-900');
                        setFormBgSecondaryPalId('--atom-palette-gray-800');
                        setFormTextPrimaryPalId('--atom-palette-gray-50');
                        setFormTextSecondaryPalId('--atom-palette-gray-400');
                        setFormBorderSubtlePalId('--atom-palette-gray-700');
                      } else {
                        setFormBgPrimaryPalId('--atom-palette-white');
                        setFormBgSecondaryPalId('--atom-palette-gray-50');
                        setFormTextPrimaryPalId('--atom-palette-gray-900');
                        setFormTextSecondaryPalId('--atom-palette-gray-700');
                        setFormBorderSubtlePalId('--atom-palette-gray-200');
                      }
                    }}
                    className="w-full"
                  >
                    <option value="light">☀️ {locale === 'ko' ? '라이트 모드' : 'Light Mode'}</option>
                    <option value="dark">🌙 {locale === 'ko' ? '다크 모드' : 'Dark Mode'}</option>
                  </NativeSelect>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-(--text-primary)">
                    {locale === 'ko' ? '기본 모서리 곡률' : 'Default Border Radius'}
                  </label>
                  <NativeSelect
                    value={formBorderRadius}
                    onChange={(e) => setFormBorderRadius(e.target.value)}
                    className="w-full font-mono"
                  >
                    <option value="4px">4px (Sharp / Compact)</option>
                    <option value="6px">6px (Clean / Modern)</option>
                    <option value="8px">8px (Standard / Balanced)</option>
                    <option value="10px">10px (Semi-rounded)</option>
                    <option value="12px">12px (Soft / Friendly)</option>
                    <option value="14px">14px (Generous Curves)</option>
                    <option value="16px">16px (Pill Soft / Card)</option>
                    <option value="9999px">9999px (Full Rounded)</option>
                  </NativeSelect>
                </div>
              </div>

              {/* Palette Token Binding Notice */}
              <div className="p-3 rounded-(--radius-sm) bg-(--accent-primary)/5 border border-(--accent-primary)/20 flex items-center gap-2 text-xs text-(--text-secondary)">
                <Link2 className="w-4 h-4 text-(--accent-primary) shrink-0" />
                <span>
                  {locale === 'ko'
                    ? '테마 색상은 W3C DTCG 팔레트 토큰을 기반으로 바인딩됩니다. 팔레트 관리자에서 토큰 값을 수정하면 테마에 실시간 자동 동기화됩니다.'
                    : 'Theme colors are bound to W3C DTCG Palette Tokens. Editing palettes will automatically synchronize across themes in real time.'}
                </span>
              </div>

              {/* 2. Primary Brand Tokens (Palette-Driven) */}
              <div className="p-3.5 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-(--text-primary) flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-(--accent-primary)" />
                    {locale === 'ko' ? '프라이머리 & 브랜드 토큰 (팔레트 기반)' : 'Primary Brand Tokens (Palette-Based)'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-(--bg-primary) text-(--text-muted) border border-(--border-subtle)">
                    W3C DTCG ALIAS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Primary Action */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '프라이머리 액션 컬러' : 'Primary Action Color'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formPrimaryPalId}
                      onChange={(pId) => {
                        setFormPrimaryPalId(pId);
                        // Auto recommend hover & subtle light if standard color family
                        const pal = findPaletteById(pId);
                        if (pal?.family && pal.family !== 'neutral' && pal.family !== 'status') {
                          const hoverMatch = colorPalettes.find((p) => p.family === pal.family && p.id.endsWith('-600'));
                          const lightMatch = colorPalettes.find((p) => p.family === pal.family && p.id.endsWith('-50'));
                          if (hoverMatch) setFormPrimaryHoverPalId(hoverMatch.id);
                          if (lightMatch) setFormPrimaryLightPalId(lightMatch.id);
                        }
                      }}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formPrimaryPalId})
                    </span>
                  </div>

                  {/* Primary Hover */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '호버 상태 배경' : 'Primary Hover State'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formPrimaryHoverPalId}
                      onChange={(pId) => setFormPrimaryHoverPalId(pId)}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formPrimaryHoverPalId})
                    </span>
                  </div>

                  {/* Primary Subtle Light */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '은은한 틴트 배경/태그' : 'Primary Subtle Light'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formPrimaryLightPalId}
                      onChange={(pId) => setFormPrimaryLightPalId(pId)}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formPrimaryLightPalId})
                    </span>
                  </div>
                </div>
              </div>

              {/* 2-1. Secondary & Neutral Action Tokens (Palette-Driven) */}
              <div className="p-3.5 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-(--text-primary) flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-(--text-secondary)" />
                    {locale === 'ko' ? '세컨더리 & 보조 액션 토큰 (팔레트 기반)' : 'Secondary & Neutral Action Tokens (Palette-Based)'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-(--bg-primary) text-(--text-muted) border border-(--border-subtle)">
                    W3C DTCG ALIAS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Secondary Action */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '세컨더리 액션 컬러' : 'Secondary Action Color'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formSecondaryPalId}
                      onChange={(pId) => {
                        setFormSecondaryPalId(pId);
                        const pal = findPaletteById(pId);
                        if (pal?.family) {
                          const hoverMatch = colorPalettes.find((p) => p.family === pal.family && (p.id.endsWith('-300') || p.id.endsWith('-600')));
                          const lightMatch = colorPalettes.find((p) => p.family === pal.family && (p.id.endsWith('-50') || p.id.endsWith('-100')));
                          if (hoverMatch) setFormSecondaryHoverPalId(hoverMatch.id);
                          if (lightMatch) setFormSecondaryLightPalId(lightMatch.id);
                        }
                      }}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formSecondaryPalId})
                    </span>
                  </div>

                  {/* Secondary Hover */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '호버 상태 배경' : 'Secondary Hover State'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formSecondaryHoverPalId}
                      onChange={(pId) => setFormSecondaryHoverPalId(pId)}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formSecondaryHoverPalId})
                    </span>
                  </div>

                  {/* Secondary Subtle Light */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '은은한 틴트 배경/태그' : 'Secondary Subtle Light'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formSecondaryLightPalId}
                      onChange={(pId) => setFormSecondaryLightPalId(pId)}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formSecondaryLightPalId})
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Surface & Typography Tokens (Palette-Driven) */}
              <div className="p-3.5 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-3">
                <span className="font-bold text-xs text-(--text-primary) flex items-center gap-1.5 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-(--accent-primary)" />
                  {locale === 'ko' ? '서피스 & 텍스트 토큰 (팔레트 기반)' : 'Surface & Typography Tokens (Palette-Based)'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Background Primary */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '기본 배경 (Canvas)' : 'Background Primary (Canvas)'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formBgPrimaryPalId}
                      onChange={(pId) => setFormBgPrimaryPalId(pId)}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formBgPrimaryPalId})
                    </span>
                  </div>

                  {/* Background Secondary / Card */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '카드/서피스 보조 배경' : 'Background Secondary / Card'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formBgSecondaryPalId}
                      onChange={(pId) => setFormBgSecondaryPalId(pId)}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formBgSecondaryPalId})
                    </span>
                  </div>

                  {/* Text Primary */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '본문 주요 텍스트' : 'Text Primary (Headlines)'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formTextPrimaryPalId}
                      onChange={(pId) => setFormTextPrimaryPalId(pId)}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formTextPrimaryPalId})
                    </span>
                  </div>

                  {/* Border Subtle */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '은은한 경계선 (Border Subtle)' : 'Border Subtle'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formBorderSubtlePalId}
                      onChange={(pId) => setFormBorderSubtlePalId(pId)}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formBorderSubtlePalId})
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Semantic Status Tokens (Palette-Driven) */}
              <div className="p-3.5 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-3">
                <span className="font-bold text-xs text-(--text-primary) flex items-center gap-1.5 uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-(--accent-primary)" />
                  {locale === 'ko' ? '시스템 상태 피드백 토큰' : 'Semantic Status Feedback Tokens'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Success */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '성공 (Success)' : 'Success'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formStatusSuccessPalId}
                      onChange={(pId) => setFormStatusSuccessPalId(pId)}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formStatusSuccessPalId})
                    </span>
                  </div>

                  {/* Danger */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '위험 (Danger / Destructive)' : 'Danger / Destructive'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formStatusDangerPalId}
                      onChange={(pId) => setFormStatusDangerPalId(pId)}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formStatusDangerPalId})
                    </span>
                  </div>

                  {/* Warning */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium block">
                      {locale === 'ko' ? '주의 (Warning)' : 'Warning'}
                    </label>
                    <TokenSelect
                      options={colorPalettes}
                      value={formStatusWarningPalId}
                      onChange={(pId) => setFormStatusWarningPalId(pId)}
                      className="w-full"
                    />
                    <span className="text-[10px] font-mono text-(--text-muted) block truncate">
                      var({formStatusWarningPalId})
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Realtime Component Preview Inside Modal */}
              <div className="space-y-1.5">
                <span className="font-semibold text-(--text-secondary) text-[11px] uppercase tracking-wider">
                  {locale === 'ko' ? '실시간 컴포넌트 렌더링 피드백' : 'Live Component Preview'}
                </span>
                <div
                  style={{
                    backgroundColor: formBgSecondary,
                    borderRadius: formBorderRadius,
                    border: `1px solid ${formBorderSubtle}`,
                  }}
                  className="p-4 flex flex-wrap items-center justify-between gap-3 shadow-inner transition-all"
                >
                  <Button
                    style={{
                      backgroundColor: formPrimary,
                      borderRadius: formBorderRadius,
                      color: '#ffffff',
                    }}
                    size="sm"
                    className="text-xs font-semibold shadow-xs"
                  >
                    Action Button
                  </Button>

                  <span
                    style={{
                      backgroundColor: formPrimaryLight,
                      color: formPrimary,
                      borderRadius: formBorderRadius,
                    }}
                    className="text-xs px-2.5 py-1 font-bold"
                  >
                    Active Tag
                  </span>

                  <span
                    style={{ color: formTextPrimary }}
                    className="text-xs font-semibold"
                  >
                    {formName || 'Sample Text'} (곡률: {formBorderRadius})
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-(--border-subtle)">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditorOpen(false)}
              >
                취소
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveTheme}
                disabled={!formName.trim() || !formId.trim()}
                className="bg-(--accent-primary) text-(--bg-primary) flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{editingThemeId ? '토큰 변경사항 저장 및 적용' : '새 테마 생성 및 즉시 적용'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
