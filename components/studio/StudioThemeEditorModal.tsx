'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, NativeSelect, TokenSelect } from '@/components/ui';
import { StudioTheme } from '@/lib/data/themeData';
import { PaletteVariable } from '@/lib/data/studioData';
import { Layers, Link2, Save, Shield, Sliders, Sparkles } from 'lucide-react';

export interface StudioThemeEditorModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'duplicate';
  baseTheme?: StudioTheme | null;
  themes: StudioTheme[];
  colorPalettes: PaletteVariable[];
  locale: string;
  onClose: () => void;
  onCreateTheme: (newTheme: StudioTheme) => void;
  onUpdateTheme: (updatedTheme: StudioTheme) => void;
}

export function StudioThemeEditorModal({
  isOpen,
  mode,
  baseTheme,
  themes,
  colorPalettes,
  locale,
  onClose,
  onCreateTheme,
  onUpdateTheme,
}: StudioThemeEditorModalProps) {
  const isEditing = mode === 'edit' && !!baseTheme;

  const findPaletteById = (id?: string) => colorPalettes.find((p) => p.id === id);
  const findPaletteByValue = (val?: string) =>
    colorPalettes.find((p) => p.value.toLowerCase() === val?.toLowerCase());

  const [formName, setFormName] = useState('');
  const [formId, setFormId] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formMode, setFormMode] = useState<'light' | 'dark'>('light');
  const [formBorderRadius, setFormBorderRadius] = useState('8px');

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
  const [formStatusSuccessPalId, setFormStatusSuccessPalId] = useState('--atom-palette-emerald-500');
  const [formStatusDangerPalId, setFormStatusDangerPalId] = useState('--atom-palette-rose-500');
  const [formStatusWarningPalId, setFormStatusWarningPalId] = useState('--atom-palette-amber-500');

  useEffect(() => {
    if (!isOpen) return;
    if ((mode === 'edit' || mode === 'duplicate') && baseTheme) {
      const pb = baseTheme.paletteBindings || {};
      setFormName(
        mode === 'duplicate'
          ? `${baseTheme.name} (${locale === 'ko' ? '커스텀' : 'Custom'})`
          : baseTheme.name
      );
      setFormId(mode === 'duplicate' ? `${baseTheme.id}-custom` : baseTheme.id);
      setFormDesc(
        mode === 'duplicate'
          ? `${baseTheme.name} 기반의 팔레트 커스텀 테마`
          : baseTheme.description
      );
      setFormMode(baseTheme.mode);
      setFormBorderRadius(baseTheme.borderRadius);

      setFormPrimaryPalId(pb.primary || findPaletteByValue(baseTheme.colors.primary)?.id || '--atom-palette-blue-500');
      setFormPrimaryHoverPalId(pb.primaryHover || findPaletteByValue(baseTheme.colors.primaryHover)?.id || '--atom-palette-blue-600');
      setFormPrimaryLightPalId(pb.primaryLight || findPaletteByValue(baseTheme.colors.primaryLight)?.id || '--atom-palette-blue-50');
      setFormSecondaryPalId(pb.secondary || findPaletteByValue(baseTheme.colors.secondary || '')?.id || (baseTheme.mode === 'dark' ? '--atom-palette-gray-700' : '--atom-palette-gray-200'));
      setFormSecondaryHoverPalId(pb.secondaryHover || findPaletteByValue(baseTheme.colors.secondaryHover || '')?.id || (baseTheme.mode === 'dark' ? '--atom-palette-gray-600' : '--atom-palette-gray-300'));
      setFormSecondaryLightPalId(pb.secondaryLight || findPaletteByValue(baseTheme.colors.secondaryLight || '')?.id || (baseTheme.mode === 'dark' ? '--atom-palette-gray-800' : '--atom-palette-gray-50'));
      setFormBgPrimaryPalId(pb.bgPrimary || findPaletteByValue(baseTheme.colors.bgPrimary)?.id || (baseTheme.mode === 'dark' ? '--atom-palette-gray-900' : '--atom-palette-white'));
      setFormBgSecondaryPalId(pb.bgSecondary || findPaletteByValue(baseTheme.colors.bgSecondary)?.id || (baseTheme.mode === 'dark' ? '--atom-palette-gray-800' : '--atom-palette-gray-50'));
      setFormTextPrimaryPalId(pb.textPrimary || findPaletteByValue(baseTheme.colors.textPrimary)?.id || (baseTheme.mode === 'dark' ? '--atom-palette-gray-50' : '--atom-palette-gray-900'));
      setFormTextSecondaryPalId(pb.textSecondary || findPaletteByValue(baseTheme.colors.textSecondary)?.id || (baseTheme.mode === 'dark' ? '--atom-palette-gray-400' : '--atom-palette-gray-700'));
      setFormTextMutedPalId(pb.textMuted || findPaletteByValue(baseTheme.colors.textMuted)?.id || '--atom-palette-gray-500');
      setFormBorderSubtlePalId(pb.borderSubtle || findPaletteByValue(baseTheme.colors.borderSubtle)?.id || (baseTheme.mode === 'dark' ? '--atom-palette-gray-700' : '--atom-palette-gray-200'));
      setFormBorderStrongPalId(pb.borderStrong || findPaletteByValue(baseTheme.colors.borderStrong)?.id || (baseTheme.mode === 'dark' ? '--atom-palette-gray-600' : '--atom-palette-gray-300'));
      setFormStatusSuccessPalId(pb.statusSuccess || findPaletteByValue(baseTheme.colors.statusSuccess)?.id || '--atom-palette-emerald-500');
      setFormStatusDangerPalId(pb.statusDanger || findPaletteByValue(baseTheme.colors.statusDanger)?.id || '--atom-palette-rose-500');
      setFormStatusWarningPalId(pb.statusWarning || findPaletteByValue(baseTheme.colors.statusWarning)?.id || '--atom-palette-amber-500');
    } else {
      setFormName('');
      setFormId('');
      setFormDesc('');
      setFormMode('light');
      setFormBorderRadius('8px');
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
      setFormStatusSuccessPalId('--atom-palette-emerald-500');
      setFormStatusDangerPalId('--atom-palette-rose-500');
      setFormStatusWarningPalId('--atom-palette-amber-500');
    }
  }, [isOpen, mode, baseTheme, locale]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formPrimary = findPaletteById(formPrimaryPalId)?.value || 'var(--accent-primary)';
  const formPrimaryHover = findPaletteById(formPrimaryHoverPalId)?.value || 'var(--accent-primary-hover)';
  const formPrimaryLight = findPaletteById(formPrimaryLightPalId)?.value || 'var(--bg-secondary)';
  const formSecondary = findPaletteById(formSecondaryPalId)?.value || 'var(--bg-secondary)';
  const formSecondaryHover = findPaletteById(formSecondaryHoverPalId)?.value || 'var(--border-strong)';
  const formSecondaryLight = findPaletteById(formSecondaryLightPalId)?.value || 'var(--bg-secondary)';
  const formBgPrimary = findPaletteById(formBgPrimaryPalId)?.value || 'var(--bg-primary)';
  const formBgSecondary = findPaletteById(formBgSecondaryPalId)?.value || 'var(--bg-secondary)';
  const formTextPrimary = findPaletteById(formTextPrimaryPalId)?.value || 'var(--text-primary)';
  const formTextSecondary = findPaletteById(formTextSecondaryPalId)?.value || 'var(--text-secondary)';
  const formTextMuted = findPaletteById(formTextMutedPalId)?.value || 'var(--text-muted)';
  const formBorderSubtle = findPaletteById(formBorderSubtlePalId)?.value || 'var(--border-subtle)';
  const formBorderStrong = findPaletteById(formBorderStrongPalId)?.value || 'var(--border-strong)';
  const formStatusSuccess = findPaletteById(formStatusSuccessPalId)?.value || 'var(--atom-color-success)';
  const formStatusDanger = findPaletteById(formStatusDangerPalId)?.value || 'var(--atom-color-destructive)';
  const formStatusWarning = findPaletteById(formStatusWarningPalId)?.value || 'var(--atom-color-warning)';

  const handleSaveTheme = () => {
    if (!formName.trim() || !formId.trim()) return;
    const cleanId = formId.trim().toLowerCase().replace(/\s+/g, '-');

    const themePayload: StudioTheme = {
      id: cleanId,
      name: formName.trim(),
      description: formDesc.trim() || (locale === 'ko' ? '팔레트 기반 커스텀 테마' : 'Palette-based custom theme'),
      mode: formMode,
      category: isEditing && baseTheme ? (themes.find((t) => t.id === baseTheme.id)?.category || 'custom') : 'custom',
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

    if (isEditing) {
      onUpdateTheme(themePayload);
    } else {
      onCreateTheme(themePayload);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-2xl p-6 flex flex-col gap-5 my-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3.5">
          <div>
            <h3 className="font-bold text-base text-(--text-primary) flex items-center gap-2">
              <Sliders className="w-4 h-4 text-(--accent-primary)" />
              <span>
                {isEditing ? `[${formName}] 테마 토큰 수정 & 저장` : '새 디자인 테마 생성 & 토큰 설정'}
              </span>
            </h3>
            <p className="text-xs text-(--text-secondary) mt-0.5">
              프라이머리 컬러, 서피스 배경, 텍스트, 보더 곡률 등 핵심 토큰을 설정하고 저장하면 즉시 프로젝트에 반영됩니다.
            </p>
          </div>
          <Button variant="ghost" size="sm" isIconOnly onClick={onClose} className="text-(--text-muted) hover:text-(--text-primary)">
            ✕
          </Button>
        </div>

        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-(--text-primary)">{locale === 'ko' ? '테마 명칭' : 'Theme Name'}</label>
              <Input
                type="text"
                value={formName}
                onChange={(e) => {
                  setFormName(e.target.value);
                  if (!isEditing && !formId) {
                    setFormId(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                  }
                }}
                placeholder={locale === 'ko' ? '예: 네오 민트 테크' : 'e.g. Neo Mint Tech'}
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-(--text-primary)">{locale === 'ko' ? '테마 식별자' : 'Theme Identifier'}</label>
              <Input
                type="text"
                value={formId}
                onChange={(e) => setFormId(e.target.value)}
                disabled={isEditing}
                placeholder="예: neo-mint"
                className="w-full font-mono disabled:opacity-60"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-(--text-primary)">{locale === 'ko' ? '테마 설명' : 'Description'}</label>
            <Input
              type="text"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              placeholder={locale === 'ko' ? '예: 산뜻한 민트와 딥 그레이가 조화된 모던 테마' : 'e.g. Modern theme with crisp mint and deep gray'}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-(--text-primary)">{locale === 'ko' ? '기본 모드' : 'Color Mode'}</label>
              <NativeSelect
                value={formMode}
                onChange={(e) => {
                  const nextMode = e.target.value as 'light' | 'dark';
                  setFormMode(nextMode);
                  if (nextMode === 'dark') {
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
              <label className="font-semibold text-(--text-primary)">{locale === 'ko' ? '기본 모서리 곡률' : 'Default Border Radius'}</label>
              <NativeSelect value={formBorderRadius} onChange={(e) => setFormBorderRadius(e.target.value)} className="w-full font-mono">
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

          <div className="p-3 rounded-(--radius-sm) bg-(--accent-primary)/5 border border-(--accent-primary)/20 flex items-center gap-2 text-xs text-(--text-secondary)">
            <Link2 className="w-4 h-4 text-(--accent-primary) shrink-0" />
            <span>
              {locale === 'ko'
                ? '테마 색상은 W3C DTCG 팔레트 토큰을 기반으로 바인딩됩니다. 팔레트 관리자에서 토큰 값을 수정하면 테마에 실시간 자동 동기화됩니다.'
                : 'Theme colors are bound to W3C DTCG Palette Tokens. Editing palettes will automatically synchronize across themes in real time.'}
            </span>
          </div>

          <div className="p-3.5 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-(--text-primary) flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-(--accent-primary)" />
                {locale === 'ko' ? '프라이머리 & 브랜드 토큰 (팔레트 기반)' : 'Primary Brand Tokens (Palette-Based)'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-(--bg-primary) text-(--text-muted) border border-(--border-subtle)">W3C DTCG ALIAS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  label: locale === 'ko' ? '프라이머리 액션 컬러' : 'Primary Action Color',
                  val: formPrimaryPalId,
                  onChange: (pId: string) => {
                    setFormPrimaryPalId(pId);
                    const pal = findPaletteById(pId);
                    if (pal?.family && pal.family !== 'neutral' && pal.family !== 'status') {
                      const hoverMatch = colorPalettes.find((p) => p.family === pal.family && p.id.endsWith('-600'));
                      const lightMatch = colorPalettes.find((p) => p.family === pal.family && p.id.endsWith('-50'));
                      if (hoverMatch) setFormPrimaryHoverPalId(hoverMatch.id);
                      if (lightMatch) setFormPrimaryLightPalId(lightMatch.id);
                    }
                  },
                },
                {
                  label: locale === 'ko' ? '호버 상태 배경' : 'Primary Hover State',
                  val: formPrimaryHoverPalId,
                  onChange: setFormPrimaryHoverPalId,
                },
                {
                  label: locale === 'ko' ? '은은한 틴트 배경/태그' : 'Primary Subtle Light',
                  val: formPrimaryLightPalId,
                  onChange: setFormPrimaryLightPalId,
                },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <label className="text-[11px] text-(--text-secondary) font-medium block">{item.label}</label>
                  <TokenSelect options={colorPalettes} value={item.val} onChange={item.onChange} className="w-full" />
                  <span className="text-[10px] font-mono text-(--text-muted) block truncate">var({item.val})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-(--text-primary) flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-(--text-secondary)" />
                {locale === 'ko' ? '세컨더리 & 보조 액션 토큰 (팔레트 기반)' : 'Secondary & Neutral Action Tokens'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-(--bg-primary) text-(--text-muted) border border-(--border-subtle)">W3C DTCG ALIAS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  label: locale === 'ko' ? '세컨더리 액션 컬러' : 'Secondary Action Color',
                  val: formSecondaryPalId,
                  onChange: (pId: string) => {
                    setFormSecondaryPalId(pId);
                    const pal = findPaletteById(pId);
                    if (pal?.family) {
                      const hoverMatch = colorPalettes.find((p) => p.family === pal.family && (p.id.endsWith('-300') || p.id.endsWith('-600')));
                      const lightMatch = colorPalettes.find((p) => p.family === pal.family && (p.id.endsWith('-50') || p.id.endsWith('-100')));
                      if (hoverMatch) setFormSecondaryHoverPalId(hoverMatch.id);
                      if (lightMatch) setFormSecondaryLightPalId(lightMatch.id);
                    }
                  },
                },
                { label: locale === 'ko' ? '호버 상태 배경' : 'Secondary Hover State', val: formSecondaryHoverPalId, onChange: setFormSecondaryHoverPalId },
                { label: locale === 'ko' ? '은은한 틴트 배경/태그' : 'Secondary Subtle Light', val: formSecondaryLightPalId, onChange: setFormSecondaryLightPalId },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <label className="text-[11px] text-(--text-secondary) font-medium block">{item.label}</label>
                  <TokenSelect options={colorPalettes} value={item.val} onChange={item.onChange} className="w-full" />
                  <span className="text-[10px] font-mono text-(--text-muted) block truncate">var({item.val})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-3">
            <span className="font-bold text-xs text-(--text-primary) flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-(--accent-primary)" />
              {locale === 'ko' ? '서피스 & 텍스트 토큰 (팔레트 기반)' : 'Surface & Typography Tokens'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: locale === 'ko' ? '기본 배경 (Canvas)' : 'Background Primary', val: formBgPrimaryPalId, onChange: setFormBgPrimaryPalId },
                { label: locale === 'ko' ? '카드/서피스 보조 배경' : 'Background Secondary', val: formBgSecondaryPalId, onChange: setFormBgSecondaryPalId },
                { label: locale === 'ko' ? '본문 주요 텍스트' : 'Text Primary', val: formTextPrimaryPalId, onChange: setFormTextPrimaryPalId },
                { label: locale === 'ko' ? '은은한 경계선 (Border Subtle)' : 'Border Subtle', val: formBorderSubtlePalId, onChange: setFormBorderSubtlePalId },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <label className="text-[11px] text-(--text-secondary) font-medium block">{item.label}</label>
                  <TokenSelect options={colorPalettes} value={item.val} onChange={item.onChange} className="w-full" />
                  <span className="text-[10px] font-mono text-(--text-muted) block truncate">var({item.val})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-3">
            <span className="font-bold text-xs text-(--text-primary) flex items-center gap-1.5 uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-(--accent-primary)" />
              {locale === 'ko' ? '시스템 상태 피드백 토큰' : 'Semantic Status Feedback Tokens'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: locale === 'ko' ? '성공 (Success)' : 'Success', val: formStatusSuccessPalId, onChange: setFormStatusSuccessPalId },
                { label: locale === 'ko' ? '위험 (Danger / Destructive)' : 'Danger / Destructive', val: formStatusDangerPalId, onChange: setFormStatusDangerPalId },
                { label: locale === 'ko' ? '주의 (Warning)' : 'Warning', val: formStatusWarningPalId, onChange: setFormStatusWarningPalId },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <label className="text-[11px] text-(--text-secondary) font-medium block">{item.label}</label>
                  <TokenSelect options={colorPalettes} value={item.val} onChange={item.onChange} className="w-full" />
                  <span className="text-[10px] font-mono text-(--text-muted) block truncate">var({item.val})</span>
                </div>
              ))}
            </div>
          </div>

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
                style={{ backgroundColor: formPrimary, borderRadius: formBorderRadius, color: 'var(--bg-primary)' }}
                size="sm"
                className="text-xs font-semibold shadow-xs"
              >
                Action Button
              </Button>
              <span
                style={{ backgroundColor: formPrimaryLight, color: formPrimary, borderRadius: formBorderRadius }}
                className="text-xs px-2.5 py-1 font-bold"
              >
                Active Tag
              </span>
              <span style={{ color: formTextPrimary }} className="text-xs font-semibold">
                {formName || 'Sample Text'} (곡률: {formBorderRadius})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-(--border-subtle)">
          <Button variant="secondary" size="sm" onClick={onClose}>
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
            <span>{isEditing ? '토큰 변경사항 저장 및 적용' : '새 테마 생성 및 즉시 적용'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
