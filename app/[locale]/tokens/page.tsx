'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import {
  Palette,
  Type,
  Maximize2,
  Box,
  Layers,
  ArrowRight,
  Terminal,
  Copy,
  Check,
  Search,
  ExternalLink,
  X,
  LayoutGrid,
  FileCode,
  Download,
} from 'lucide-react';

import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import {
  TokenCategory,
  ColorToken,
  BASE_COLOR_TOKENS,
  TYPOGRAPHY_TOKENS,
  RADIUS_TOKENS,
  SPACING_TOKENS,
  SHADOW_TOKENS,
  LAYOUT_TOKENS,
  LayoutToken,
} from '@/lib/data/tokens';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { useI18n } from '@/lib/i18n';
import tokenJsonData from '@/tokens/token.json';
import { Button, Input, Badge, NativeSelect, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Nav, NavItem, NavLink } from '@/components/ui';

export default function TokensPage() {
  const { theme, updateColor, updateBorderRadius } = useThemeEditor();
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<TokenCategory | 'json'>('color');
  const [copiedVar, setCopiedVar] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Live Token Customizer State linked to ThemeEditor
  const liveBrandColor = theme?.color?.primary || 'var(--accent-primary)';
  const liveRadius = theme?.borderRadius || '16px';

  const handleCopy = (variable: string) => {
    navigator.clipboard.writeText(variable);
    setCopiedVar(variable);
    setTimeout(() => setCopiedVar(null), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(tokenJsonData, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(tokenJsonData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'token.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Color tokens mapped with current live brand color
  const COLOR_TOKENS: ColorToken[] = BASE_COLOR_TOKENS.map((token) => {
    if (token.variable === '--atom-color-primary') {
      return { ...token, value: liveBrandColor };
    }
    return token;
  });

  const query = searchQuery.trim().toLowerCase();

  const filteredColors = COLOR_TOKENS.filter(
    (t) =>
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.variable.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
  );

  const filteredTypography = TYPOGRAPHY_TOKENS.filter(
    (t) =>
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.variable.toLowerCase().includes(query) ||
      t.sample.toLowerCase().includes(query)
  );

  const filteredRadius = RADIUS_TOKENS.filter(
    (t) =>
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.variable.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
  );

  const filteredSpacing = SPACING_TOKENS.filter(
    (t) =>
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.variable.toLowerCase().includes(query) ||
      t.value.toLowerCase().includes(query)
  );

  const filteredShadow = SHADOW_TOKENS.filter(
    (t) =>
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.variable.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
  );

  const filteredLayout = LAYOUT_TOKENS.filter(
    (t) =>
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.variable.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.value.toLowerCase().includes(query)
  );

  const TABS: { id: TokenCategory | 'json'; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'color', label: t('tokens.tabColors'), icon: Palette, count: filteredColors.length },
    { id: 'typography', label: t('tokens.tabTypography'), icon: Type, count: filteredTypography.length },
    { id: 'radius', label: t('tokens.tabRadius'), icon: Maximize2, count: filteredRadius.length },
    { id: 'spacing', label: t('tokens.tabSpacing'), icon: Box, count: filteredSpacing.length },
    { id: 'shadow', label: t('tokens.tabShadow'), icon: Layers, count: filteredShadow.length },
    { id: 'layout', label: t('tokens.tabLayout'), icon: LayoutGrid, count: filteredLayout.length },
    { id: 'json', label: t('tokens.tabJson'), icon: FileCode },
  ];

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col justify-between transition-colors">
      {/* Header */}
      <Header brandColor={liveBrandColor} />

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-7 flex-1 flex flex-col gap-6 sm:gap-7">
        {/* 1. Hero & Concept Section */}
        <section className="flex flex-col gap-3 border-b border-(--border-subtle) pb-4 sm:pb-5">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-(--text-muted)">
            <a
              href="https://www.designtokens.org/tr/2025.10/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-(--text-primary) transition-colors underline underline-offset-2"
            >
              <span>W3C DTCG 2025.10 Spec</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span>Single Source of Truth (SSOT)</span>
            <span>•</span>
            <span>3-Tier Architecture</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <h1 className="docs-h1">
                {t('tokens.title')}
              </h1>
              <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                {t('tokens.description')}
              </p>
            </div>

            {/* Quick Live Preview Controls - Clean Minimal Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono pb-1">
              <div className="flex items-center gap-2">
                <span className="text-(--text-muted)">{t('tokens.brandColor')}</span>
                <div className="flex items-center gap-1.5">
                  {['var(--accent-primary)', '#ff6f0f', '#10b981', '#7c3aed'].map((c) => (
                    <Button
                      key={c}
                      isIconOnly
                      size="sm"
                      variant="ghost"
                      onClick={() => updateColor('primary', c)}
                      className={`w-4 h-4 min-w-4 p-0 rounded-full border transition-transform ${liveBrandColor === c ? 'scale-125 border-(--text-primary)' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              <span className="text-(--border-subtle)">|</span>

              <div className="flex items-center gap-2">
                <span className="text-(--text-muted)">{t('tokens.radius')}</span>
                <NativeSelect
                  value={liveRadius}
                  onChange={(e) => updateBorderRadius(e.target.value)}
                  className="w-auto text-xs px-2 py-0.5 font-mono"
                >
                  <option value="6px">6px</option>
                  <option value="12px">12px</option>
                  <option value="16px">16px</option>
                  <option value="9999px">9999px</option>
                </NativeSelect>
              </div>

              <span className="text-(--border-subtle)">|</span>

              <Button
                variant={activeCategory === 'json' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory('json')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold h-auto py-1 px-2.5"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{t('tokens.tabJson')}</span>
              </Button>
            </div>
          </div>

          {/* 3-Tier Architecture Specification - Flat List */}
          <div className="pt-4 border-t border-(--border-subtle)">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-(--text-muted) uppercase">Tier 1 · Global / Raw</div>
                <h3 className="font-semibold text-sm text-(--text-primary)">원천 토큰</h3>
                <p className="text-xs text-(--text-secondary) leading-relaxed">
                  특정 의도를 갖지 않는 순수 팔레트와 단위 (예: <code className="font-mono text-[11px]">blue-500: var(--accent-primary)</code>, <code className="font-mono text-[11px]">radius-16: 16px</code>).
                </p>
              </div>

              <div className="space-y-1 md:border-l md:border-(--border-subtle) md:pl-6">
                <div className="text-[11px] font-mono text-(--accent-primary) uppercase">Tier 2 · Semantic (핵심 표준)</div>
                <h3 className="font-semibold text-sm text-(--text-primary)">시맨틱 토큰</h3>
                <p className="text-xs text-(--text-secondary) leading-relaxed">
                  &quot;어디에 쓰이는가&quot; 목적과 역할에 따른 명명 (예: <code className="font-mono text-[11px]">--atom-color-primary</code>, 테마 전환 시 자동 매핑).
                </p>
              </div>

              <div className="space-y-1 md:border-l md:border-(--border-subtle) md:pl-6">
                <div className="text-[11px] font-mono text-(--text-muted) uppercase">Tier 3 · Component</div>
                <h3 className="font-semibold text-sm text-(--text-primary)">컴포넌트 토큰</h3>
                <p className="text-xs text-(--text-secondary) leading-relaxed">
                  특정 UI 단위에 한정된 세밀한 스타일 값 (예: <code className="font-mono text-[11px]">.atom-btn-primary</code>).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Tokens Explorer - Clean Documentation Table */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--border-subtle) pb-2">
            {/* Navigation Tabs - Clean Flat Style (No Scrollbar) */}
            <Nav variant="pills" size="sm">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCategory === tab.id;
                return (
                  <NavItem key={tab.id}>
                    <NavLink
                      asButton
                      active={isActive}
                      icon={<Icon className="w-3.5 h-3.5" />}
                      badge={
                        tab.count !== undefined ? (
                          <span className="text-[11px] font-mono opacity-60">
                            ({tab.count})
                          </span>
                        ) : undefined
                      }
                      onClick={() => setActiveCategory(tab.id)}
                    >
                      {tab.label}
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>

            {/* Search Input - Clean Minimal Line */}
            <div className="relative w-full sm:w-60">
              <Input
                type="text"
                leftIcon={<Search className="w-3.5 h-3.5 text-(--text-muted)" />}
                placeholder={t('common.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-7 py-1 text-xs h-auto"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  onClick={() => setSearchQuery('')}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-primary) p-1 h-auto"
                  title="검색어 지우기"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </div>

          {/* TAB 1: COLORS TABLE */}
          {activeCategory === 'color' && (
            filteredColors.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted)">
                검색된 색상 토큰이 없습니다.
              </div>
            ) : (
              <Table>
                  <TableHeader>
                    <TableRow className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                      <TableHead className="py-2.5 px-3 font-medium w-12">미리보기</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">토큰 이름</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">CSS 변수 (클릭 복사)</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">원천 값</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium hidden md:table-cell">용도 및 설명</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium text-right">구분</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredColors.map((token) => (
                      <TableRow key={token.variable} className="hover:bg-(--bg-secondary)/60 transition-colors group">
                        <TableCell className="py-2.5 px-3">
                          <div
                            className="w-6 h-6 rounded border border-black/10 dark:border-white/10 shrink-0"
                            style={{ backgroundColor: token.value }}
                          />
                        </TableCell>
                        <TableCell className="py-2.5 px-3 font-semibold text-(--text-primary)">
                          {token.name}
                        </TableCell>
                        <TableCell className="py-2.5 px-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(`var(${token.variable})`)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[11px] h-auto"
                            title="클릭하여 복사"
                          >
                            {copiedVar === `var(${token.variable})` ? (
                              <Check className="w-3 h-3 text-(--atom-color-success)" />
                            ) : (
                              <Copy className="w-3 h-3 text-(--text-muted) group-hover:text-(--text-primary)" />
                            )}
                            <span>var({token.variable})</span>
                          </Button>
                        </TableCell>
                        <TableCell className="py-2.5 px-3 font-mono text-[11px] text-(--text-muted) uppercase">
                          {token.value}
                        </TableCell>
                        <TableCell className="py-2.5 px-3 text-(--text-secondary) hidden md:table-cell max-w-sm">
                          {token.description}
                        </TableCell>
                        <TableCell className="py-2.5 px-3 text-right">
                          <span className="text-[11px] uppercase font-mono px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">
                            {token.category}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )
          )}

          {/* TAB 2: TYPOGRAPHY TABLE */}
          {activeCategory === 'typography' && (
            filteredTypography.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted)">
                검색된 타이포그래피 토큰이 없습니다.
              </div>
            ) : (
              <Table>
                  <TableHeader>
                    <TableRow className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                      <TableHead className="py-2.5 px-3 font-medium">토큰 이름</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">스펙 (Size / Weight)</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">CSS 변수</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">실제 텍스트 미리보기</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTypography.map((token) => (
                      <TableRow key={token.variable} className="hover:bg-(--bg-secondary)/60 transition-colors group">
                        <TableCell className="py-3 px-3 font-semibold text-(--text-primary)">
                          {token.name}
                        </TableCell>
                        <TableCell className="py-3 px-3 font-mono text-[11px] text-(--text-muted)">
                          {token.fontSize} · {token.weight}
                        </TableCell>
                        <TableCell className="py-3 px-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(`var(${token.variable})`)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[11px] h-auto"
                            title="클릭하여 복사"
                          >
                            {copiedVar === `var(${token.variable})` ? (
                              <Check className="w-3 h-3 text-(--atom-color-success)" />
                            ) : (
                              <Copy className="w-3 h-3 text-(--text-muted) group-hover:text-(--text-primary)" />
                            )}
                            <span>var({token.variable})</span>
                          </Button>
                        </TableCell>
                        <TableCell className="py-3 px-3 text-(--text-primary) font-sans tracking-tight" style={{ fontSize: token.fontSize.split(' ')[0] }}>
                          {token.sample}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )
          )}

          {/* TAB 3: RADIUS TABLE */}
          {activeCategory === 'radius' && (
            filteredRadius.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted)">
                검색된 곡률 토큰이 없습니다.
              </div>
            ) : (
              <Table>
                  <TableHeader>
                    <TableRow className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                      <TableHead className="py-2.5 px-3 font-medium w-16">미리보기</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">토큰 이름</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">값 (Value)</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">CSS 변수</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium hidden sm:table-cell">권장 용도</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRadius.map((token) => (
                      <TableRow key={token.variable} className="hover:bg-(--bg-secondary)/60 transition-colors group">
                        <TableCell className="py-2.5 px-3">
                          <div
                            className="w-9 h-6 bg-(--accent-primary)/15 border border-(--accent-primary)/30 flex items-center justify-center text-[11px] font-mono text-(--accent-primary)"
                            style={{ borderRadius: token.value }}
                          >
                            {token.value}
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5 px-3 font-semibold text-(--text-primary)">
                          {token.name}
                        </TableCell>
                        <TableCell className="py-2.5 px-3 font-mono text-[11px] font-bold text-(--accent-primary)">
                          {token.value}
                        </TableCell>
                        <TableCell className="py-2.5 px-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(`var(${token.variable})`)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[11px] h-auto"
                            title="클릭하여 복사"
                          >
                            {copiedVar === `var(${token.variable})` ? (
                              <Check className="w-3 h-3 text-(--atom-color-success)" />
                            ) : (
                              <Copy className="w-3 h-3 text-(--text-muted) group-hover:text-(--text-primary)" />
                            )}
                            <span>var({token.variable})</span>
                          </Button>
                        </TableCell>
                        <TableCell className="py-2.5 px-3 text-(--text-secondary) hidden sm:table-cell">
                          {token.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )
          )}

          {/* TAB 4: SPACING TABLE */}
          {activeCategory === 'spacing' && (
            filteredSpacing.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted)">
                검색된 간격 토큰이 없습니다.
              </div>
            ) : (
              <Table>
                  <TableHeader>
                    <TableRow className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                      <TableHead className="py-2.5 px-3 font-medium w-48">너비 미리보기</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">토큰 이름</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">값 (Value)</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">CSS 변수</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSpacing.map((token) => (
                      <TableRow key={token.variable} className="hover:bg-(--bg-secondary)/60 transition-colors group">
                        <TableCell className="py-2.5 px-3">
                          <div className="h-3.5 bg-(--atom-color-success)/15 border border-(--atom-color-success)/30 rounded flex items-center">
                            <div
                              className="h-full bg-(--atom-color-success) rounded-xs"
                              style={{ width: `${Math.min(token.px * 2.5, 160)}px` }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5 px-3 font-semibold text-(--text-primary)">
                          {token.name}
                        </TableCell>
                        <TableCell className="py-2.5 px-3 font-mono text-[11px] font-bold text-(--atom-color-success)">
                          {token.value} ({token.px}px)
                        </TableCell>
                        <TableCell className="py-2.5 px-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(`var(${token.variable})`)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[11px] h-auto"
                            title="클릭하여 복사"
                          >
                            {copiedVar === `var(${token.variable})` ? (
                              <Check className="w-3 h-3 text-(--atom-color-success)" />
                            ) : (
                              <Copy className="w-3 h-3 text-(--text-muted) group-hover:text-(--text-primary)" />
                            )}
                            <span>var({token.variable})</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )
          )}

          {/* TAB 5: SHADOW TABLE */}
          {activeCategory === 'shadow' && (
            filteredShadow.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted)">
                검색된 그림자 토큰이 없습니다.
              </div>
            ) : (
              <Table>
                  <TableHeader>
                    <TableRow className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                      <TableHead className="py-2.5 px-3 font-medium w-20">미리보기</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">토큰 이름</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">CSS 변수</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">CSS 원천 값</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium hidden md:table-cell">용도 및 설명</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShadow.map((token) => (
                      <TableRow key={token.variable} className="hover:bg-(--bg-secondary)/60 transition-colors group">
                        <TableCell className="py-2.5 px-3">
                          <div
                            className="w-14 py-1 px-1.5 bg-(--bg-primary) border border-(--border-subtle) rounded text-[11px] text-center text-(--text-primary)"
                            style={{ boxShadow: token.value }}
                          >
                            Shadow
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5 px-3 font-semibold text-(--text-primary)">
                          {token.name}
                        </TableCell>
                        <TableCell className="py-2.5 px-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(`var(${token.variable})`)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[11px] h-auto"
                            title="클릭하여 복사"
                          >
                            {copiedVar === `var(${token.variable})` ? (
                              <Check className="w-3 h-3 text-(--atom-color-success)" />
                            ) : (
                              <Copy className="w-3 h-3 text-(--text-muted) group-hover:text-(--text-primary)" />
                            )}
                            <span>var({token.variable})</span>
                          </Button>
                        </TableCell>
                        <TableCell className="py-2.5 px-3 font-mono text-[11px] text-(--text-muted) max-w-xs truncate">
                          {token.value}
                        </TableCell>
                        <TableCell className="py-2.5 px-3 text-(--text-secondary) hidden md:table-cell">
                          {token.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )
          )}

          {/* TAB 6: LAYOUT TABLE */}
          {activeCategory === 'layout' && (
            filteredLayout.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted)">
                검색된 레이아웃 토큰이 없습니다.
              </div>
            ) : (
              <Table>
                  <TableHeader>
                    <TableRow className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                      <TableHead className="py-2.5 px-3 font-medium w-28">미리보기</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">토큰 이름</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">CSS 변수 (클릭 복사)</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium">원천 규격</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium hidden md:table-cell">용도 및 설명</TableHead>
                      <TableHead className="py-2.5 px-3 font-medium text-right">구분</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLayout.map((token) => (
                      <TableRow key={token.variable} className="hover:bg-(--bg-secondary)/60 transition-colors group">
                        <TableCell className="py-2.5 px-3">
                          <div className="h-4 rounded bg-(--bg-secondary) border border-(--border-subtle) flex items-center justify-center font-mono text-[11px] text-(--text-muted) px-1 overflow-hidden">
                            {token.value}
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5 px-3 font-semibold text-(--text-primary)">
                          {token.name}
                        </TableCell>
                        <TableCell className="py-2.5 px-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(`var(${token.variable})`)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[11px] h-auto"
                            title="클릭하여 복사"
                          >
                            {copiedVar === `var(${token.variable})` ? (
                              <Check className="w-3 h-3 text-(--atom-color-success)" />
                            ) : (
                              <Copy className="w-3 h-3 text-(--text-muted) group-hover:text-(--text-primary)" />
                            )}
                            <span>var({token.variable})</span>
                          </Button>
                        </TableCell>
                        <TableCell className="py-2.5 px-3 font-mono text-[11px] text-(--text-muted)">
                          {token.value}
                        </TableCell>
                        <TableCell className="py-2.5 px-3 text-(--text-secondary) hidden md:table-cell max-w-sm">
                          {token.description}
                        </TableCell>
                        <TableCell className="py-2.5 px-3 text-right">
                          <span className="text-[11px] uppercase font-mono px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">
                            {token.type}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )
          )}

          {/* TAB 7: FULL TOKEN.JSON VIEWER */}
          {activeCategory === 'json' && (
            <div className="rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) overflow-hidden space-y-0">
              {/* Toolbar */}
              <div className="px-4 py-3 border-b border-(--border-subtle) bg-(--bg-secondary)/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-(--text-primary)">
                    <FileCode className="w-4 h-4 text-(--accent-primary)" />
                    <span>tokens/token.json</span>
                  </div>
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">
                    W3C DTCG Format
                  </span>
                  <span className="text-[11px] font-mono text-(--text-muted)">
                    v{tokenJsonData.version || '0.4.3'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-1 text-xs font-semibold"
                  >
                    {copiedJson ? (
                      <Check className="w-3.5 h-3.5 text-(--atom-color-success)" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedJson ? t('common.copied') : t('tokens.jsonCopy')}</span>
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleDownloadJson}
                    className="inline-flex items-center gap-1 text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('tokens.jsonDownload')}</span>
                  </Button>
                </div>
              </div>

              {/* Code Viewer */}
              <div className="bg-(--bg-primary)">
                <CodeHighlight
                  code={JSON.stringify(tokenJsonData, null, 2)}
                  language="json"
                  className="p-4 max-h-[640px]"
                />
              </div>

              {/* Bottom CLI Guide */}
              <div className="px-4 py-2.5 border-t border-(--border-subtle) bg-(--bg-secondary)/30 text-xs text-(--text-secondary) flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <Terminal className="w-3.5 h-3.5 text-(--text-muted)" />
                  <span>설치 명령어: npx atomsystem init</span>
                </div>
                <div className="text-[11px] text-(--text-muted)">
                  Zero-Runtime 0KB CSS Variables & Tailwind v4 호환
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 3. Live Token Interactive Showcase - Clean Flat Layout */}
        <section className="space-y-4 pt-6 border-t border-(--border-subtle)">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-mono text-(--text-muted)">Live Token Binding Showcase</div>
              <h3 className="text-lg font-bold text-(--text-primary)">실제 UI 컴포넌트에 토큰이 주입되는 방식</h3>
            </div>
            <span className="text-xs text-(--text-muted) font-mono">React · Vue · HTML 호환</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Interactive Component 1: Button */}
            <div className="space-y-2">
              <div className="text-xs text-(--text-muted) font-medium">1. 버튼 컴포넌트</div>
              <div className="py-2 flex items-center">
                <Button
                  style={{
                    backgroundColor: liveBrandColor,
                    borderRadius: liveRadius,
                    color: '#ffffff',
                  }}
                  className="font-semibold text-xs"
                >
                  토큰 주입된 버튼
                </Button>
              </div>
              <div className="text-[11px] font-mono text-(--text-muted)">
                background: {liveBrandColor}; border-radius: {liveRadius};
              </div>
            </div>

            {/* Interactive Component 2: Card */}
            <div className="space-y-2">
              <div className="text-xs text-(--text-muted) font-medium">2. 데이터 수치 컴포넌트</div>
              <div className="py-1 space-y-0.5">
                <div className="text-xs text-(--text-muted)">계좌 잔액</div>
                <div className="text-base font-bold" style={{ color: liveBrandColor }}>
                  1,450,000 원
                </div>
              </div>
              <div className="text-[11px] font-mono text-(--text-muted)">
                color: var(--atom-color-primary);
              </div>
            </div>

            {/* Interactive Component 3: Badge & Input */}
            <div className="space-y-2">
              <div className="text-xs text-(--text-muted) font-medium">3. 인풋 및 뱃지 컴포넌트</div>
              <div className="py-1 space-y-1.5 max-w-xs">
                <Badge
                  variant="primary"
                  style={{ backgroundColor: liveBrandColor, color: '#ffffff' }}
                >
                  Vivid Pill
                </Badge>
                <Input
                  type="text"
                  readOnly
                  value="토큰 테두리 인풋"
                  className="w-full text-xs"
                  style={{ borderColor: liveBrandColor, borderRadius: liveRadius }}
                />
              </div>
              <div className="text-[11px] font-mono text-(--text-muted)">
                border-color: {liveBrandColor}; border-radius: {liveRadius};
              </div>
            </div>
          </div>
        </section>

        {/* 4. AI Prompt & Usage Guide - Flat Banner */}
        <section className="pt-6 border-t border-(--border-subtle) flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-mono text-(--text-muted)">
              <Terminal className="w-3.5 h-3.5" />
              <span>AI Agent 프롬프트 연동</span>
            </div>
            <h3 className="text-base font-bold text-(--text-primary)">
              AI에게 말만 걸면 디자인 토큰이 즉시 구축됩니다
            </h3>
            <p className="text-xs text-(--text-secondary) leading-relaxed">
              &quot;presets/toss.md 가이드를 보고 디자인 토큰을 생성해줘&quot;라고 지시하면,{' '}
              Agent가 W3C tokens.json을 갱신하고 위 변수들을 즉시 컴파일합니다.
            </p>
          </div>

          <Link
            href="/patterns"
            style={{ backgroundColor: liveBrandColor, borderRadius: liveRadius }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-white font-semibold text-xs hover:opacity-90 active:scale-95 transition-opacity shrink-0"
          >
            <span>UX 패턴 보러가기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-(--border-subtle) py-8 bg-(--bg-secondary) mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-(--text-secondary)">
          <div className="flex items-center gap-2">
            <span className="font-bold text-(--text-primary)">AtomDesignToken Specification</span>
            <span>— Universal W3C DTCG Token System</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-(--text-primary) transition-colors">홈으로</Link>
            <Link href="/patterns" className="hover:text-(--text-primary) transition-colors">UX 패턴</Link>
            <Link href="/components/button" className="hover:text-(--text-primary) transition-colors">컴포넌트 문서</Link>
            <a
              href="https://www.designtokens.org/tr/2025.10/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--text-primary) inline-flex items-center gap-1 transition-colors"
            >
              <span>W3C DTCG</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-(--text-muted) font-mono">v0.1.48</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
