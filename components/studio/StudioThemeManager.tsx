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
} from '@/components/ui';
import { StudioTheme, ThemeCategory } from '@/lib/data/themeData';
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
} from 'lucide-react';

export interface StudioThemeManagerProps {
  themes: StudioTheme[];
  activeThemeId: string;
  onSelectTheme: (themeId: string) => void;
  onCreateTheme: (newTheme: StudioTheme) => void;
  onUpdateTheme: (updatedTheme: StudioTheme) => void;
  onDeleteTheme: (themeId: string) => void;
}

export function StudioThemeManager({
  themes,
  activeThemeId,
  onSelectTheme,
  onCreateTheme,
  onUpdateTheme,
  onDeleteTheme,
}: StudioThemeManagerProps) {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editor Modal State (For both Creating new and Modifying existing themes)
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingThemeId, setEditingThemeId] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formId, setFormId] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formMode, setFormMode] = useState<'light' | 'dark'>('light');

  // Primary & Brand Tokens
  const [formPrimary, setFormPrimary] = useState('#3182f6');
  const [formPrimaryHover, setFormPrimaryHover] = useState('#1b64da');
  const [formPrimaryLight, setFormPrimaryLight] = useState('#e8f3ff');

  // Surface & Background Tokens
  const [formBgPrimary, setFormBgPrimary] = useState('#ffffff');
  const [formBgSecondary, setFormBgSecondary] = useState('#f8f9fa');

  // Typography & Text Tokens
  const [formTextPrimary, setFormTextPrimary] = useState('#191f28');
  const [formTextSecondary, setFormTextSecondary] = useState('#8b95a1');
  const [formTextMuted, setFormTextMuted] = useState('#b0b8c1');

  // Border & Radius Tokens
  const [formBorderSubtle, setFormBorderSubtle] = useState('#f2f4f6');
  const [formBorderStrong, setFormBorderStrong] = useState('#e5e8eb');
  const [formBorderRadius, setFormBorderRadius] = useState('8px');

  // Status Tokens
  const [formStatusSuccess, setFormStatusSuccess] = useState('#10b981');
  const [formStatusDanger, setFormStatusDanger] = useState('#f43f5e');
  const [formStatusWarning, setFormStatusWarning] = useState('#f59e0b');

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
    setFormPrimary('#3182f6');
    setFormPrimaryHover('#1b64da');
    setFormPrimaryLight('#e8f3ff');
    setFormBgPrimary('#ffffff');
    setFormBgSecondary('#f8f9fa');
    setFormTextPrimary('#191f28');
    setFormTextSecondary('#8b95a1');
    setFormTextMuted('#b0b8c1');
    setFormBorderSubtle('#f2f4f6');
    setFormBorderStrong('#e5e8eb');
    setFormBorderRadius('8px');
    setFormStatusSuccess('#10b981');
    setFormStatusDanger('#f43f5e');
    setFormStatusWarning('#f59e0b');
    setIsEditorOpen(true);
  };

  // Open editor for Modifying existing theme tokens
  const handleOpenEdit = (t: StudioTheme) => {
    setEditingThemeId(t.id);
    setFormName(t.name);
    setFormId(t.id);
    setFormDesc(t.description);
    setFormMode(t.mode);
    setFormPrimary(t.colors.primary);
    setFormPrimaryHover(t.colors.primaryHover || t.colors.primary);
    setFormPrimaryLight(t.colors.primaryLight || `${t.colors.primary}20`);
    setFormBgPrimary(t.colors.bgPrimary);
    setFormBgSecondary(t.colors.bgSecondary);
    setFormTextPrimary(t.colors.textPrimary);
    setFormTextSecondary(t.colors.textSecondary);
    setFormTextMuted(t.colors.textMuted || '#8b95a1');
    setFormBorderSubtle(t.colors.borderSubtle);
    setFormBorderStrong(t.colors.borderStrong || '#e5e8eb');
    setFormBorderRadius(t.borderRadius);
    setFormStatusSuccess(t.colors.statusSuccess || '#10b981');
    setFormStatusDanger(t.colors.statusDanger || '#f43f5e');
    setFormStatusWarning(t.colors.statusWarning || '#f59e0b');
    setIsEditorOpen(true);
  };

  // Open editor for Duplicating an existing theme
  const handleOpenDuplicate = (baseTheme: StudioTheme) => {
    setEditingThemeId(null);
    setFormName(`${baseTheme.name} (커스텀)`);
    setFormId(`${baseTheme.id}-custom`);
    setFormDesc(`${baseTheme.name} 기반의 커스텀 테마`);
    setFormMode(baseTheme.mode);
    setFormPrimary(baseTheme.colors.primary);
    setFormPrimaryHover(baseTheme.colors.primaryHover || baseTheme.colors.primary);
    setFormPrimaryLight(baseTheme.colors.primaryLight || `${baseTheme.colors.primary}20`);
    setFormBgPrimary(baseTheme.colors.bgPrimary);
    setFormBgSecondary(baseTheme.colors.bgSecondary);
    setFormTextPrimary(baseTheme.colors.textPrimary);
    setFormTextSecondary(baseTheme.colors.textSecondary);
    setFormTextMuted(baseTheme.colors.textMuted || '#8b95a1');
    setFormBorderSubtle(baseTheme.colors.borderSubtle);
    setFormBorderStrong(baseTheme.colors.borderStrong || '#e5e8eb');
    setFormBorderRadius(baseTheme.borderRadius);
    setFormStatusSuccess(baseTheme.colors.statusSuccess || '#10b981');
    setFormStatusDanger(baseTheme.colors.statusDanger || '#f43f5e');
    setFormStatusWarning(baseTheme.colors.statusWarning || '#f59e0b');
    setIsEditorOpen(true);
  };

  // Save changes (either add new or update existing)
  const handleSaveTheme = () => {
    if (!formName.trim() || !formId.trim()) return;

    const cleanId = formId.trim().toLowerCase().replace(/\s+/g, '-');

    const themePayload: StudioTheme = {
      id: cleanId,
      name: formName.trim(),
      description: formDesc.trim() || '사용자 정의 테마',
      mode: formMode,
      category: editingThemeId ? (themes.find((t) => t.id === editingThemeId)?.category || 'custom') : 'custom',
      brandColor: formPrimary,
      borderRadius: formBorderRadius,
      isCustom: true,
      colors: {
        primary: formPrimary,
        primaryHover: formPrimaryHover,
        primaryLight: formPrimaryLight,
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
            variant="outline"
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
              variant={selectedCategory === cat.id ? 'primary' : 'outline'}
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
                      <Badge variant="outline" className="text-[10px] uppercase font-mono py-0">
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
                  <span className="text-[10px] font-mono font-bold text-(--text-muted) uppercase">
                    Core Tokens
                  </span>
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
                  variant={isActive ? 'primary' : 'outline'}
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-2xl p-6 flex flex-col gap-5 my-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
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
                      if (mode === 'dark' && formBgPrimary === '#ffffff') {
                        setFormBgPrimary('#0f172a');
                        setFormBgSecondary('#1e293b');
                        setFormTextPrimary('#f8fafc');
                        setFormBorderSubtle('#334155');
                      } else if (mode === 'light' && formBgPrimary === '#0f172a') {
                        setFormBgPrimary('#ffffff');
                        setFormBgSecondary('#f8f9fa');
                        setFormTextPrimary('#191f28');
                        setFormBorderSubtle('#f2f4f6');
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

              {/* 2. Primary Brand Tokens */}
              <div className="p-3.5 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-3">
                <span className="font-bold text-xs text-(--text-primary) flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-(--accent-primary)" />
                  {locale === 'ko' ? '프라이머리 & 브랜드 토큰' : 'Primary & Brand Tokens'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium">
                      {locale === 'ko' ? '프라이머리 액션 컬러' : 'Primary Action Color'}
                    </label>
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="color"
                        value={formPrimary}
                        onChange={(e) => {
                          setFormPrimary(e.target.value);
                          setFormPrimaryHover(e.target.value);
                          setFormPrimaryLight(`${e.target.value}26`);
                        }}
                        className="w-7 h-7 p-0.5 rounded border border-(--border-subtle) cursor-pointer shrink-0"
                      />
                      <Input
                        type="text"
                        value={formPrimary}
                        onChange={(e) => setFormPrimary(e.target.value)}
                        className="flex-1 font-mono text-xs px-2 py-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium">
                      {locale === 'ko' ? '호버 상태 배경' : 'Primary Hover State'}
                    </label>
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="color"
                        value={formPrimaryHover}
                        onChange={(e) => setFormPrimaryHover(e.target.value)}
                        className="w-7 h-7 p-0.5 rounded border border-(--border-subtle) cursor-pointer shrink-0"
                      />
                      <Input
                        type="text"
                        value={formPrimaryHover}
                        onChange={(e) => setFormPrimaryHover(e.target.value)}
                        className="flex-1 font-mono text-xs px-2 py-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium">
                      {locale === 'ko' ? '은은한 배경/태그' : 'Primary Subtle Light'}
                    </label>
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="text"
                        value={formPrimaryLight}
                        onChange={(e) => setFormPrimaryLight(e.target.value)}
                        className="w-full font-mono text-xs px-2 py-1"
                        placeholder="예: #e8f3ff"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Surface & Text Tokens */}
              <div className="p-3.5 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-3">
                <span className="font-bold text-xs text-(--text-primary) flex items-center gap-1.5 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-(--accent-primary)" />
                  {locale === 'ko' ? '서피스 & 텍스트 토큰' : 'Surface & Typography Tokens'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium">
                      {locale === 'ko' ? '기본 배경' : 'Background Primary'}
                    </label>
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="color"
                        value={formBgPrimary}
                        onChange={(e) => setFormBgPrimary(e.target.value)}
                        className="w-7 h-7 p-0.5 rounded border border-(--border-subtle) cursor-pointer shrink-0"
                      />
                      <Input
                        type="text"
                        value={formBgPrimary}
                        onChange={(e) => setFormBgPrimary(e.target.value)}
                        className="flex-1 font-mono text-xs px-2 py-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium">
                      {locale === 'ko' ? '카드/서피스 배경' : 'Background Secondary / Card'}
                    </label>
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="color"
                        value={formBgSecondary}
                        onChange={(e) => setFormBgSecondary(e.target.value)}
                        className="w-7 h-7 p-0.5 rounded border border-(--border-subtle) cursor-pointer shrink-0"
                      />
                      <Input
                        type="text"
                        value={formBgSecondary}
                        onChange={(e) => setFormBgSecondary(e.target.value)}
                        className="flex-1 font-mono text-xs px-2 py-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium">
                      {locale === 'ko' ? '본문 주요 텍스트' : 'Text Primary'}
                    </label>
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="color"
                        value={formTextPrimary}
                        onChange={(e) => setFormTextPrimary(e.target.value)}
                        className="w-7 h-7 p-0.5 rounded border border-(--border-subtle) cursor-pointer shrink-0"
                      />
                      <Input
                        type="text"
                        value={formTextPrimary}
                        onChange={(e) => setFormTextPrimary(e.target.value)}
                        className="flex-1 font-mono text-xs px-2 py-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-(--text-secondary) font-medium">
                      {locale === 'ko' ? '연한 보더 라인' : 'Border Subtle'}
                    </label>
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="color"
                        value={formBorderSubtle}
                        onChange={(e) => setFormBorderSubtle(e.target.value)}
                        className="w-7 h-7 p-0.5 rounded border border-(--border-subtle) cursor-pointer shrink-0"
                      />
                      <Input
                        type="text"
                        value={formBorderSubtle}
                        onChange={(e) => setFormBorderSubtle(e.target.value)}
                        className="flex-1 font-mono text-xs px-2 py-1"
                      />
                    </div>
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
                variant="outline"
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
