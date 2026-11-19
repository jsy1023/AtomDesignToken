'use client';

import React from 'react';
import { Button, Input, Badge, Card } from '@/components/ui';
import { PaletteVariable } from '@/lib/data/studioData';
import { FONT_FAMILY_PRESETS } from '@/lib/data/themeEditorDefaults';
import { Type, Globe, RotateCcw, Code2, Sparkles } from 'lucide-react';

export interface StudioFontFamilyPanelProps {
  paletteVariables: PaletteVariable[];
  onUpdateFontToken: (tokenId: string, value: string, cdnUrl?: string) => void;
  locale: string;
}

const DEFAULT_SANS_FONT =
  "'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif";
const DEFAULT_SANS_CDN = 'https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css';
const DEFAULT_MONO_FONT =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const DEFAULT_MONO_CDN =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap';

/**
 * Studio Font Family & Webfont CDN configurator panel inside Palette > Typography.
 */
export function StudioFontFamilyPanel({
  paletteVariables,
  onUpdateFontToken,
  locale,
}: StudioFontFamilyPanelProps) {
  const isKo = locale === 'ko';
  const sansToken = paletteVariables.find((p) => p.id === '--atom-font-sans');
  const monoToken = paletteVariables.find((p) => p.id === '--atom-font-mono');

  const currentSansValue = sansToken?.value || DEFAULT_SANS_FONT;
  const currentSansCdn = sansToken?.cdnUrl ?? DEFAULT_SANS_CDN;
  const currentMonoValue = monoToken?.value || DEFAULT_MONO_FONT;
  const currentMonoCdn = monoToken?.cdnUrl ?? DEFAULT_MONO_CDN;

  const sansPresets = FONT_FAMILY_PRESETS.filter((p) => p.category === 'sans');
  const monoPresets = FONT_FAMILY_PRESETS.filter((p) => p.category === 'mono');

  return (
    <Card className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-(--border-subtle) pb-3">
        <div>
          <h3 className="text-sm font-bold text-(--text-primary) flex items-center gap-2">
            <Type className="w-4 h-4 text-(--accent-primary)" />
            <span>{isKo ? '폰트 패밀리 & 웹폰트 CDN 설정' : 'Font Family & Webfont CDN Settings'}</span>
            <Badge variant="primary" className="text-[10px] font-mono">
              --atom-font-sans
            </Badge>
          </h3>
          <p className="text-xs text-(--text-secondary) mt-0.5">
            {isKo
              ? '기본 본문/모노 폰트 스택과 CDN 스타일시트를 설정하면 스튜디오 및 전역 DOM에 즉시 반영됩니다.'
              : 'Configure global sans/mono font stacks and Webfont CDN URLs with live DOM reflection.'}
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            onUpdateFontToken('--atom-font-sans', DEFAULT_SANS_FONT, DEFAULT_SANS_CDN);
            onUpdateFontToken('--atom-font-mono', DEFAULT_MONO_FONT, DEFAULT_MONO_CDN);
          }}
          className="text-xs flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isKo ? 'Spoqa 기본값 복원' : 'Reset to Spoqa Default'}</span>
        </Button>
      </div>

      {/* Sans Presets */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-(--text-primary) flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-(--accent-primary)" />
            <span>{isKo ? 'Sans-serif 추천 프리셋' : 'Sans-serif Presets'}</span>
          </span>
          <span className="text-[11px] font-mono text-(--text-muted)">
            {sansPresets.length} {isKo ? '개 프리셋' : 'presets'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {sansPresets.map((preset) => {
            const isActive =
              currentSansValue.trim() === preset.value.trim() ||
              (preset.id === 'spoqa' && currentSansValue.includes('Spoqa Han Sans Neo'));
            return (
              <Button
                key={preset.id}
                variant="ghost"
                size="sm"
                onClick={() => onUpdateFontToken('--atom-font-sans', preset.value, preset.cdnUrl || '')}
                className={`h-auto p-2.5 !justify-between text-left flex items-start gap-2 rounded-(--radius-sm) border transition ${
                  isActive
                    ? 'border-(--accent-primary) ring-1 ring-(--accent-primary)/40 bg-(--accent-primary)/10 text-(--text-primary)'
                    : 'border-(--border-subtle) bg-(--bg-secondary)/40 text-(--text-primary) hover:border-(--border-strong)'
                }`}
              >
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold truncate">{preset.name}</span>
                    {preset.cdnUrl && (
                      <Badge variant={isActive ? 'primary' : 'neutral'} className="text-[9px] font-mono px-1.5 py-0">
                        CDN
                      </Badge>
                    )}
                  </div>
                  {preset.description && (
                    <div className="text-[10px] text-(--text-secondary) font-normal truncate">
                      {preset.description}
                    </div>
                  )}
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Sans & Mono Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sans Font Configuration */}
        <div className="p-3.5 rounded-(--radius-sm) bg-(--bg-secondary)/30 border border-(--border-subtle) space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-(--text-primary) flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-(--accent-primary)" />
              <span>{isKo ? '기본 Sans 폰트 스택' : 'Base Sans Stack'}</span>
            </span>
            <span className="font-mono text-[10px] text-(--accent-primary)">--atom-font-sans</span>
          </div>

          <Input
            type="text"
            label={isKo ? 'CSS font-family 값' : 'CSS font-family'}
            value={currentSansValue}
            onChange={(e) => onUpdateFontToken('--atom-font-sans', e.target.value, currentSansCdn)}
            placeholder={DEFAULT_SANS_FONT}
            className="font-mono text-xs"
          />

          <Input
            type="text"
            label={isKo ? '웹폰트 CDN 스타일시트 URL' : 'Webfont CDN Stylesheet URL'}
            leftIcon={<Globe className="w-3.5 h-3.5 text-(--text-muted)" />}
            value={currentSansCdn}
            onChange={(e) => onUpdateFontToken('--atom-font-sans', currentSansValue, e.target.value)}
            placeholder={DEFAULT_SANS_CDN}
            className="font-mono text-xs"
          />
        </div>

        {/* Mono Font Configuration */}
        <div className="p-3.5 rounded-(--radius-sm) bg-(--bg-secondary)/30 border border-(--border-subtle) space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-(--text-primary) flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-(--accent-primary)" />
              <span>{isKo ? '코드 / Mono 폰트 스택' : 'Code / Mono Stack'}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-(--accent-primary)">--atom-font-mono</span>
              {monoPresets[0] && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    onUpdateFontToken('--atom-font-mono', monoPresets[0].value, monoPresets[0].cdnUrl || '')
                  }
                  className="text-[10px] px-1.5 py-0.5 h-auto"
                >
                  {isKo ? '기본값' : 'Preset'}
                </Button>
              )}
            </div>
          </div>

          <Input
            type="text"
            label={isKo ? 'CSS font-family 값' : 'CSS font-family'}
            value={currentMonoValue}
            onChange={(e) => onUpdateFontToken('--atom-font-mono', e.target.value, currentMonoCdn)}
            placeholder={DEFAULT_MONO_FONT}
            className="font-mono text-xs"
          />

          <Input
            type="text"
            label={isKo ? '모노 웹폰트 CDN URL' : 'Mono Webfont CDN URL'}
            leftIcon={<Globe className="w-3.5 h-3.5 text-(--text-muted)" />}
            value={currentMonoCdn}
            onChange={(e) => onUpdateFontToken('--atom-font-mono', currentMonoValue, e.target.value)}
            placeholder={DEFAULT_MONO_CDN}
            className="font-mono text-xs"
          />
        </div>
      </div>

      {/* Live Font Specimen Preview */}
      <div
        className="p-4 rounded-(--radius-sm) bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-3"
        style={{ fontFamily: currentSansValue }}
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-(--text-muted)">
          <span>{isKo ? '실시간 폰트 스페시멘 (Live Specimen)' : 'Live Font Specimen'}</span>
          <span className="truncate max-w-[320px]">{currentSansValue}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) space-y-1">
            <span className="text-[10px] font-mono text-(--text-muted) block">Regular (400)</span>
            <p className="text-sm font-normal text-(--text-primary)">
              가나다라마바사 ABCabc 0123456789
            </p>
          </div>
          <div className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) space-y-1">
            <span className="text-[10px] font-mono text-(--text-muted) block">Medium (500)</span>
            <p className="text-sm font-medium text-(--text-primary)">
              다람쥐 헌 쳇바퀴에 타고파 AtomSystem
            </p>
          </div>
          <div className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) space-y-1">
            <span className="text-[10px] font-mono text-(--text-muted) block">Bold (700)</span>
            <p className="text-sm font-bold text-(--text-primary)">
              디자인 토큰 &amp; AI 컴포넌트 100%
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
