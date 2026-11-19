'use client';

import React from 'react';
import { Button, NativeSelect, TokenSelect } from '@/components/ui';
import { Sliders } from 'lucide-react';
import { ComponentInteractiveStatus } from '@/lib/data/studioData';
import { ComponentCatalogService } from '@/lib/services/studioStore';
import { useStudio } from '@/components/studio/context/StudioContext';
import { formatLocaleText } from '@/lib/utils/localeFormat';

export function TokenBindingInspector() {
  const {
    locale,
    t,
    currentComponent,
    currentType,
    currentVariable,
    currentStatusProps,
    paletteVariables,
    inspectorStatusTab,
    handleSelectVariable,
    handleSelectInspectorStatus,
    handleUpdateBinding,
  } = useStudio();

  return (
    <aside className="w-full lg:w-[370px] xl:w-[410px] shrink-0 lg:h-full border-t lg:border-t-0 lg:border-l border-(--border-subtle) bg-(--bg-secondary)/25 flex flex-col overflow-hidden">
      {/* Compact Fixed Top Header */}
      <div className="p-3 sm:p-3.5 shrink-0 flex flex-col gap-2 border-b border-(--border-subtle) bg-(--bg-secondary)/60 backdrop-blur-xs">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-xs sm:text-sm text-(--text-primary) flex items-center gap-1.5 min-w-0">
            <Sliders className="w-3.5 h-3.5 text-(--accent-primary) shrink-0" />
            <span className="truncate">
              {locale === 'ko' ? '토큰 바인딩 인스펙터' : 'Token Binding Inspector'}
            </span>
          </h3>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-bold border border-(--accent-primary)/20 whitespace-nowrap shrink-0">
            [{inspectorStatusTab.toUpperCase()}] {currentStatusProps.length}
            {locale === 'ko' ? '개 속성' : ' props'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-(--text-primary) whitespace-nowrap">
            {formatLocaleText(currentComponent.name, locale)}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-bold border border-(--accent-primary)/20 whitespace-nowrap">
            TYPE: {currentType?.name || 'Solid'}
          </span>
          <div className="flex items-center gap-1 ml-auto min-w-0">
            <span className="text-[10px] font-mono font-bold text-(--text-muted) shrink-0">
              VALUE:
            </span>
            <NativeSelect
              value={currentVariable?.id}
              onChange={(e) => handleSelectVariable(e.target.value)}
              className="text-[11px] font-mono font-bold py-0.5 px-1.5 h-auto max-w-[170px]"
              aria-label="VALUE"
            >
              {currentComponent.variables.map((v) => (
                <option key={v.id} value={v.id}>
                  {formatLocaleText(v.name, locale)} ({v.id})
                </option>
              ))}
            </NativeSelect>
          </div>
        </div>

        {/* Single-Row 6-Column Status Selector */}
        <div className="grid grid-cols-6 gap-1">
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
                onClick={() =>
                  handleSelectInspectorStatus(item.status as ComponentInteractiveStatus | 'all')
                }
                className={`text-[11px] py-1 px-1 h-auto font-semibold transition-all whitespace-nowrap text-center ${
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
      </div>

      {/* Expanded Full-Height Scrollable Stream */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-3.5 pb-56 space-y-2.5 studio-scrollbar">
        {currentStatusProps.map((prop) => {
          const boundPaletteId = ComponentCatalogService.resolveBoundPaletteId(
            currentVariable,
            prop
          );
          const matchedPalette = paletteVariables.find((p) => p.id === boundPaletteId);
          const relevantPalettes =
            prop.category === 'color'
              ? paletteVariables.filter((p) => p.category === 'color' || p.category === 'status')
              : prop.category === 'spacing' || prop.category === 'size'
              ? paletteVariables.filter((p) => p.category === 'spacing' || p.category === 'size')
              : paletteVariables.filter((p) => p.category === prop.category);

          return (
            <div
              key={prop.key}
              className="p-2.5 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) space-y-1.5 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-(--text-primary) flex items-center gap-2 min-w-0 truncate">
                  {prop.category === 'color' && (
                    <span
                      style={{
                        backgroundColor: matchedPalette?.value || 'var(--border-subtle)',
                      }}
                      className="w-3.5 h-3.5 rounded-full border border-(--border-subtle) shrink-0 shadow-2xs"
                    />
                  )}
                  <span className="truncate">{formatLocaleText(prop.label, locale)}</span>
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--accent-primary) border border-(--border-subtle) font-bold shrink-0">
                  var({boundPaletteId})
                </span>
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <TokenSelect
                  options={relevantPalettes.map((pal) => ({
                    id: pal.id,
                    name: formatLocaleText(pal.name, locale),
                    value: pal.value,
                    category: pal.category,
                    family: pal.family,
                    description: pal.description,
                  }))}
                  value={boundPaletteId}
                  onChange={(val) => handleUpdateBinding(prop.key, val)}
                  placeholder={t('selectPalettePlaceholder')}
                  size="sm"
                  showColorSwatch={prop.category === 'color'}
                  className="w-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
