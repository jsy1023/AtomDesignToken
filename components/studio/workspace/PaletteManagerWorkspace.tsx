'use client';

import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { StudioFontFamilyPanel } from '@/components/studio/StudioFontFamilyPanel';
import { StudioStatusBanner } from '@/components/studio/layout/StudioShell';
import { useStudio } from '@/components/studio/context/StudioContext';
import { formatLocaleText } from '@/lib/utils/localeFormat';
import {
  Check,
  Copy,
  Edit2,
  Palette,
  Plus,
  Ruler,
  Sparkles,
  Square,
  Trash2,
  Type,
} from 'lucide-react';

export function PaletteManagerWorkspace() {
  const {
    locale,
    t,
    statusTokens,
    paletteVariables,
    paletteCategoryFilter,
    colorFamilyFilter,
    displayedPalettes,
    dynamicFamilyKeys,
    copiedPaletteId,
    handleCopyPalette,
    handleUpdateFontToken,
    handleDeletePalette,
    setEditingPalette,
    setIsAddPaletteOpen,
    setIsPaletteGeneratorOpen,
  } = useStudio();

  return (
    <main className="flex-1 h-full overflow-y-auto p-5 sm:p-7 studio-scrollbar flex flex-col gap-6">
      <StudioStatusBanner />

      <div className="flex flex-col gap-6 pb-10">
        {/* 1. Header Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle)">
          <div>
            <h2 className="text-base font-bold text-(--text-primary) flex items-center gap-2">
              <Palette className="w-4 h-4 text-(--accent-primary)" />
              <span>{t('paletteManagerTitle')}</span>
            </h2>
            <p className="text-xs text-(--text-secondary) mt-0.5">{t('paletteManagerDesc')}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsPaletteGeneratorOpen(true)}
              className="text-xs flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-(--accent-primary)" />
              <span>{locale === 'ko' ? '50~900 자동 생성기' : 'Auto 50-900 Generator'}</span>
            </Button>
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
        </div>

        {/* 2. Semantic Status & 50-900 Color Palettes */}
        {(paletteCategoryFilter === 'color' || paletteCategoryFilter === 'status') && (
          <div className="space-y-6">
            {paletteCategoryFilter === 'status' && (
              <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-(--text-primary) flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-(--accent-primary)" />
                      <span>{locale === 'ko' ? '시맨틱 상태 토큰' : 'Semantic Status Tokens'}</span>
                    </h3>
                    <p className="text-xs text-(--text-secondary) mt-0.5">
                      {locale === 'ko'
                        ? '원천 팔레트와 1:1 결합되어 시스템 전역에 의미를 부여하는 최상위 상태 토큰'
                        : 'Top-level status tokens bound to source palettes imparting system-wide meaning'}
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
                            onClick={() => handleCopyPalette(st.id)}
                            className="p-1 h-auto"
                            title="var() 복사"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-(--atom-color-success)" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-(--text-muted)" />
                            )}
                          </Button>
                        </div>

                        <div
                          style={{ backgroundColor: pal?.value || 'var(--accent-primary)' }}
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

            {(colorFamilyFilter === 'all' ? dynamicFamilyKeys : [colorFamilyFilter]).map(
              (famKey) => {
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
                            <div
                              style={{ backgroundColor: pal.value }}
                              className="h-16 w-full flex items-center justify-center relative"
                            >
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-1 flex items-center gap-1 rounded shadow-xs">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  isIconOnly
                                  onClick={() => handleCopyPalette(pal.id)}
                                  className="text-white p-1 h-auto hover:scale-110"
                                  title="var() 복사"
                                >
                                  {isCopied ? (
                                    <Check className="w-3.5 h-3.5 text-(--atom-color-success)" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  isIconOnly
                                  onClick={() => setEditingPalette(pal)}
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
                                  className="text-white p-1 h-auto hover:scale-110 text-(--atom-color-destructive)"
                                  title="팔레트 삭제"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>

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
              }
            )}
          </div>
        )}

        {/* 3-B. SIZE & SPACING VIEW */}
        {paletteCategoryFilter === 'size' && (
          <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3">
              <div>
                <h3 className="text-sm font-bold text-(--text-primary) flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-(--accent-primary)" />
                  <span>{locale === 'ko' ? '사이즈 & 여백 팔레트' : 'Spacing & Size Scale'}</span>
                </h3>
                <p className="text-xs text-(--text-secondary) mt-0.5">
                  {locale === 'ko'
                    ? '패딩, 마진, 아이템 간격(gap)에 사용되는 4px 기반 W3C 규격 토큰'
                    : '4px-based W3C standard tokens for padding, margin, and gap'}
                </p>
              </div>
              <span className="text-xs font-mono text-(--text-muted)">
                {
                  displayedPalettes.filter(
                    (p) => p.category === 'size' || p.category === 'spacing'
                  ).length
                }{' '}
                {locale === 'ko' ? '토큰' : 'tokens'}
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
                      <span className="font-bold text-(--text-primary)">
                        {formatLocaleText(pal.name, locale)}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs font-bold text-(--accent-primary)">
                          {pal.value}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          onClick={() => setEditingPalette(pal)}
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
                          className="p-1 h-auto text-(--text-muted) hover:text-(--atom-color-destructive)"
                          title="삭제"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="h-4 bg-(--bg-secondary) rounded flex items-center px-1 overflow-hidden">
                      <div
                        style={{ width: pal.value }}
                        className="h-2 bg-(--accent-primary) rounded max-w-full"
                      />
                    </div>
                    <span className="font-mono text-[10px] text-(--text-muted) truncate">
                      {pal.id}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 3-C. BORDER RADIUS VIEW */}
        {paletteCategoryFilter === 'radius' && (
          <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3">
              <div>
                <h3 className="text-sm font-bold text-(--text-primary) flex items-center gap-2">
                  <Square className="w-4 h-4 text-(--accent-primary)" />
                  <span>{locale === 'ko' ? '모서리 곡률 팔레트' : 'Border Radius Scale'}</span>
                </h3>
                <p className="text-xs text-(--text-secondary) mt-0.5">
                  {locale === 'ko'
                    ? '버튼, 카드, 모달 등 서피스 컴포넌트의 모서리 둥글기를 일관되게 규정하는 토큰'
                    : 'Tokens defining consistent border radiuses for buttons, cards, and surfaces'}
                </p>
              </div>
              <span className="text-xs font-mono text-(--text-muted)">
                {displayedPalettes.filter((p) => p.category === 'radius').length}{' '}
                {locale === 'ko' ? '토큰' : 'tokens'}
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
                      <div className="font-bold text-xs text-(--text-primary)">
                        {formatLocaleText(pal.name, locale)}
                      </div>
                      <div className="font-mono text-[10px] text-(--text-muted) truncate">
                        {pal.id}
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-between pt-1 border-t border-(--border-subtle)/40">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingPalette(pal)}
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
                        className="p-1 h-auto text-(--text-muted) hover:text-(--atom-color-destructive)"
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
        {paletteCategoryFilter === 'typography' && (
          <div className="flex flex-col gap-5">
            <StudioFontFamilyPanel
              paletteVariables={paletteVariables}
              onUpdateFontToken={handleUpdateFontToken}
              locale={locale}
            />

            <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3">
                <div>
                  <h3 className="text-sm font-bold text-(--text-primary) flex items-center gap-2">
                    <Type className="w-4 h-4 text-(--accent-primary)" />
                    <span>
                      {locale === 'ko'
                        ? '타이포그래피 크기 · 굵기 스케일'
                        : 'Typography Scale & Weight'}
                    </span>
                  </h3>
                  <p className="text-xs text-(--text-secondary) mt-0.5">
                    {locale === 'ko'
                      ? '폰트 크기, 행간, 두께의 조화로운 위계를 정의하는 토큰'
                      : 'Tokens defining typographic hierarchy across size, leading, and weight'}
                  </p>
                </div>
                <span className="text-xs font-mono text-(--text-muted)">
                  {
                    displayedPalettes.filter(
                      (p) => p.category === 'typography' && p.family !== 'font-family'
                    ).length
                  }{' '}
                  {locale === 'ko' ? '토큰' : 'tokens'}
                </span>
              </div>

              <div className="divide-y divide-(--border-subtle)">
                {displayedPalettes
                  .filter((p) => p.category === 'typography' && p.family !== 'font-family')
                  .map((pal) => (
                    <div
                      key={pal.id}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-(--bg-secondary)/30 px-2 rounded transition"
                    >
                      <div className="min-w-[200px]">
                        <div className="font-bold text-sm text-(--text-primary)">
                          {formatLocaleText(pal.name, locale)}
                        </div>
                        <div className="font-mono text-xs text-(--text-muted)">{pal.id}</div>
                      </div>

                      <div
                        style={{
                          fontSize: pal.id.startsWith('--atom-typography-')
                            ? pal.value
                            : undefined,
                          fontWeight: pal.id.includes('weight') ? pal.value : undefined,
                          fontFamily:
                            pal.family === 'font-family' ? pal.value : 'var(--atom-font-sans)',
                        }}
                        className="text-(--text-primary) truncate flex-1"
                      >
                        피그마 없는 시대, 코드로 직접 디자인을 구축하는 AtomDesignToken
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-mono text-xs font-bold text-(--accent-primary) px-2 py-1 rounded bg-(--bg-secondary)">
                          {pal.value}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          onClick={() => setEditingPalette(pal)}
                          className="text-(--text-muted) hover:text-(--accent-primary) h-7 w-7 p-0"
                          title={locale === 'ko' ? '토큰 값 수정' : 'Edit Token Value'}
                          aria-label={locale === 'ko' ? `${pal.name} 수정` : `Edit ${pal.name}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
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
                    <div className="font-semibold text-(--text-primary)">
                      {formatLocaleText(pal.name, locale)}
                    </div>
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
                        onClick={() => setEditingPalette(pal)}
                        className="text-xs text-(--text-secondary) hover:text-(--accent-primary) h-auto p-1 font-medium flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>{locale === 'ko' ? '수정' : 'Edit'}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePalette(pal.id)}
                        className="text-xs text-(--atom-color-destructive) h-auto p-1 font-medium flex items-center gap-1"
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
    </main>
  );
}
