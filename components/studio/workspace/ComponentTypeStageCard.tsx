'use client';

import React from 'react';
import { Button, NativeSelect } from '@/components/ui';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { StudioLivePreview } from '@/components/studio/StudioLivePreview';
import { Check, Copy, FileCode, Trash2 } from 'lucide-react';
import {
  COMPONENT_STATUS_PRESETS,
  ComponentInteractiveStatus,
  ComponentTypeSpec,
} from '@/lib/data/studioData';
import { ComponentCatalogService } from '@/lib/services/studioStore';
import { useStudio } from '@/components/studio/context/StudioContext';
import { formatLocaleText } from '@/lib/utils/localeFormat';

export interface ComponentTypeStageCardProps {
  typeSpec: ComponentTypeSpec;
  index: number;
}

export function ComponentTypeStageCard({ typeSpec, index }: ComponentTypeStageCardProps) {
  const {
    locale,
    currentComponent,
    currentVariable,
    currentTypes,
    selectedTypeId,
    setSelectedTypeId,
    selectedVariableId,
    stageVariables,
    setStageVariables,
    stageSizes,
    setStageSizes,
    stageIconSlots,
    setStageIconSlots,
    stageStatuses,
    setStageStatuses,
    handleSelectVariable,
    handleDeleteType,
    handleSelectInspectorStatus,
    getPaletteValue,
    codeSnippetLang,
    setCodeSnippetLang,
    copiedVarCode,
    handleCopyCode,
  } = useStudio();

  const isSelected = (selectedTypeId || currentTypes[0]?.id) === typeSpec.id;
  const cardVarId =
    stageVariables[typeSpec.id] || selectedVariableId || currentComponent.variables[0]?.id;
  const cardVariable =
    currentComponent.variables.find((v) => v.id === cardVarId) || currentVariable;
  const cardSize = stageSizes[typeSpec.id] || 'md';
  const cardIconSlot = stageIconSlots[typeSpec.id] || 'none';
  const activeStatus = stageStatuses[typeSpec.id] || 'default';
  const currentStatusObj =
    COMPONENT_STATUS_PRESETS.find((s) => s.status === activeStatus) ||
    COMPONENT_STATUS_PRESETS[0];

  const varLabel = cardVariable ? formatLocaleText(cardVariable.name, locale) : 'Button';
  const generatedCode = ComponentCatalogService.generateComponentSnippet({
    component: currentComponent,
    type: typeSpec,
    variable: cardVariable,
    varLabel,
    size: cardSize,
    iconSlot: cardIconSlot,
    status: activeStatus,
    lang: codeSnippetLang,
    placeholderText: locale === 'ko' ? '내용을 입력하세요' : 'Enter text...',
  });

  return (
    <div
      id={`live-stage-type-${typeSpec.id}`}
      onClick={() => setSelectedTypeId(typeSpec.id)}
      className={`p-6 rounded-(--radius) bg-(--bg-secondary)/20 border transition-all cursor-pointer flex flex-col gap-4 ${
        isSelected
          ? 'border-(--accent-primary) ring-2 ring-(--accent-primary)/20 shadow-md'
          : 'border-(--border-subtle) hover:border-(--border-strong)'
      }`}
    >
      {/* Stage Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-bold border border-(--accent-primary)/20">
            #{index + 1}
          </span>
          <span className="font-bold text-sm sm:text-base text-(--text-primary)">
            {formatLocaleText(typeSpec.name, locale)}
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">
            type="{typeSpec.id}"
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isSelected ? 'primary' : 'secondary'}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTypeId(typeSpec.id);
            }}
            className="text-xs py-1 px-2.5 h-auto font-medium"
          >
            {isSelected
              ? locale === 'ko'
                ? '✓ 편집 중'
                : '✓ Selected'
              : locale === 'ko'
              ? '토큰 편집'
              : 'Inspect'}
          </Button>
          {currentTypes.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteType(typeSpec.id);
              }}
              className="opacity-60 hover:opacity-100 hover:text-(--atom-color-destructive) p-1 h-auto w-auto"
              title={locale === 'ko' ? 'Type 삭제' : 'Delete Type'}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Type Architecture Badge & Guidance */}
      <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-(--radius-sm) bg-(--bg-secondary)/60 border border-(--border-subtle) text-xs">
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-semibold border border-(--accent-primary)/20 shrink-0"
          title={typeSpec.whenToUse}
        >
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider">TYPE</span>
          <span className="text-[11px] font-bold">{formatLocaleText(typeSpec.name, locale)}</span>
        </div>

        <span
          className="text-xs text-(--text-secondary) truncate flex-1 min-w-[200px]"
          title={
            locale === 'ko'
              ? typeSpec.whenToUse
              : typeSpec.whenToUseEn || typeSpec.whenToUse
          }
        >
          💡 <strong className="text-(--text-primary)">{locale === 'ko' ? '상황:' : 'Context:'}</strong>{' '}
          {locale === 'ko' ? typeSpec.whenToUse : typeSpec.whenToUseEn || typeSpec.whenToUse}
        </span>
      </div>

      {/* Dynamic Component Live Preview */}
      <div className="p-8 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex items-center justify-center min-h-[170px] transition-all relative shadow-2xs">
        <StudioLivePreview
          componentId={currentComponent.id}
          type={typeSpec}
          variable={cardVariable}
          size={cardSize}
          iconSlot={cardIconSlot}
          getPaletteValue={getPaletteValue}
          status={activeStatus}
        />
      </div>

      {/* Variable & Status Controls */}
      <div className="p-4 rounded-(--radius-sm) bg-(--bg-secondary)/40 border border-(--border-subtle) flex flex-col gap-3.5">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-(--accent-primary)/10 text-(--accent-primary) border border-(--accent-primary)/20 font-bold uppercase">
                VARIABLE
              </span>
              <span className="text-xs font-bold text-(--text-primary)">
                {locale === 'ko' ? '디자인 세부 옵션 (Variable)' : 'Detail Variables'}
              </span>
            </div>
            <span className="text-[10px] text-(--text-muted) font-mono">system · size · slots</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <label className="text-[11px] font-semibold text-(--text-secondary) shrink-0 sm:w-36 flex items-center justify-between sm:justify-start gap-1">
                <span>{locale === 'ko' ? '시스템 색상 (system)' : 'System Color'}</span>
                <span className="font-mono text-[10px] text-(--text-muted) sm:hidden">
                  ({cardVarId})
                </span>
              </label>
              <NativeSelect
                value={cardVarId}
                onChange={(e) => {
                  const nextVar = e.target.value;
                  setStageVariables((prev) => ({ ...prev, [typeSpec.id]: nextVar }));
                  if (isSelected) {
                    handleSelectVariable(nextVar);
                  }
                }}
                className="text-xs font-semibold py-1.5 px-2.5 h-auto bg-(--bg-primary) border border-(--border-subtle) flex-1"
              >
                {currentComponent.variables.map((v) => (
                  <option key={v.id} value={v.id}>
                    {formatLocaleText(v.name, locale)} ({v.id})
                  </option>
                ))}
              </NativeSelect>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <label className="text-[11px] font-semibold text-(--text-secondary) shrink-0 sm:w-36 flex items-center justify-between sm:justify-start gap-1">
                <span>{locale === 'ko' ? '버튼 규격 (size)' : 'Button Size'}</span>
                <span className="font-mono text-[10px] text-(--text-muted) sm:hidden">
                  ({cardSize})
                </span>
              </label>
              <NativeSelect
                value={cardSize}
                onChange={(e) => {
                  setStageSizes((prev) => ({
                    ...prev,
                    [typeSpec.id]: e.target.value as 'sm' | 'md' | 'lg',
                  }));
                }}
                className="text-xs font-semibold py-1.5 px-2.5 h-auto bg-(--bg-primary) border border-(--border-subtle) flex-1"
              >
                <option value="sm">Small (sm)</option>
                <option value="md">Medium (md - 기본)</option>
                <option value="lg">Large (lg)</option>
              </NativeSelect>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <label className="text-[11px] font-semibold text-(--text-secondary) shrink-0 sm:w-36 flex items-center justify-between sm:justify-start gap-1">
                <span>{locale === 'ko' ? '아이콘 슬롯 (slots)' : 'Icon Slot'}</span>
                <span className="font-mono text-[10px] text-(--text-muted) sm:hidden">
                  ({cardIconSlot})
                </span>
              </label>
              <NativeSelect
                value={cardIconSlot}
                onChange={(e) => {
                  setStageIconSlots((prev) => ({
                    ...prev,
                    [typeSpec.id]: e.target.value as 'none' | 'left' | 'right' | 'icon-only',
                  }));
                }}
                className="text-xs font-semibold py-1.5 px-2.5 h-auto bg-(--bg-primary) border border-(--border-subtle) flex-1"
              >
                <option value="none">{locale === 'ko' ? '아이콘 없음 (none)' : 'None'}</option>
                <option value="left">{locale === 'ko' ? '왼쪽 아이콘 (left)' : 'Left Icon'}</option>
                <option value="right">
                  {locale === 'ko' ? '오른쪽 아이콘 (right)' : 'Right Icon'}
                </option>
                <option value="icon-only">
                  {locale === 'ko' ? '아이콘 전용 (icon-only)' : 'Icon Only'}
                </option>
              </NativeSelect>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="flex flex-col gap-2.5 pt-3 border-t border-(--border-subtle)">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-(--atom-color-success)/10 text-(--atom-color-success) border border-(--atom-color-success)/20 font-bold uppercase">
                STATUS
              </span>
              <span className="text-xs font-bold text-(--text-primary)">
                {locale === 'ko' ? '상태 시뮬레이션 (Status)' : 'Interactive Status'}
              </span>
            </div>
            <span className="text-[10px] text-(--text-muted) font-mono">{activeStatus}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <label className="text-[11px] font-semibold text-(--text-secondary) shrink-0 sm:w-36 flex items-center justify-between sm:justify-start gap-1">
              <span>{locale === 'ko' ? '인터랙션 상태' : 'Interaction Status'}</span>
              <span className="font-mono text-[10px] text-(--text-muted) sm:hidden">
                ({activeStatus})
              </span>
            </label>
            <NativeSelect
              value={activeStatus}
              onChange={(e) => {
                const nextStatus = e.target.value as ComponentInteractiveStatus;
                setSelectedTypeId(typeSpec.id);
                setStageStatuses((prev) => ({ ...prev, [typeSpec.id]: nextStatus }));
                handleSelectInspectorStatus(nextStatus);
              }}
              className="text-xs font-semibold py-1.5 px-2.5 h-auto bg-(--bg-primary) border border-(--border-subtle) flex-1"
            >
              {COMPONENT_STATUS_PRESETS.map((st) => (
                <option key={st.status} value={st.status}>
                  {formatLocaleText(st.label, locale)} ({st.status}) —{' '}
                  {locale === 'ko' ? st.description : st.descriptionEn || st.description}
                </option>
              ))}
            </NativeSelect>
          </div>

          <div className="text-[11px] text-(--text-muted) px-1 flex items-center gap-1.5 pt-0.5">
            <span>
              ⚡{' '}
              <strong>
                [{formatLocaleText(currentStatusObj.label, locale)}]{' '}
                {locale === 'ko' ? '상태 정보:' : 'Status Info:'}
              </strong>{' '}
              {locale === 'ko'
                ? currentStatusObj.description
                : currentStatusObj.descriptionEn || currentStatusObj.description}{' '}
              —{' '}
              <em>
                {locale === 'ko'
                  ? currentStatusObj.behavior
                  : currentStatusObj.behaviorEn || currentStatusObj.behavior}
              </em>
            </span>
          </div>
        </div>
      </div>

      {/* Generated Code Snippet */}
      <div className="space-y-1.5 pt-1 border-t border-(--border-subtle)/40">
        <div className="flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <FileCode className="w-3.5 h-3.5 text-(--accent-primary)" />
            <span className="font-semibold text-(--text-primary)">
              {locale === 'ko' ? '실제 코드 연결:' : 'Actual Code Binding:'}
            </span>
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

          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleCopyCode(generatedCode, typeSpec.id);
            }}
            className="text-[11px] py-1 px-2.5 h-auto flex items-center gap-1 font-semibold shrink-0"
            title={locale === 'ko' ? '코드 복사' : 'Copy Code'}
          >
            {copiedVarCode === typeSpec.id ? (
              <>
                <Check className="w-3 h-3 text-(--atom-color-success)" />
                <span className="text-(--atom-color-success)">
                  {locale === 'ko' ? '복사 완료!' : 'Copied!'}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>{locale === 'ko' ? '코드 복사' : 'Copy Code'}</span>
              </>
            )}
          </Button>
        </div>
        <CodeHighlight
          code={generatedCode}
          language={codeSnippetLang === 'html' ? 'html' : 'tsx'}
          className="text-xs"
        />
      </div>
    </div>
  );
}
