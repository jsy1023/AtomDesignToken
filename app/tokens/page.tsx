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
  Sliders,
  Zap,
  Copy,
  Check,
  Search,
  ExternalLink,
  X,
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
} from '@/lib/data/tokens';

export default function TokensPage() {
  const { theme, updateColor, updateBorderRadius } = useThemeEditor();
  const [activeCategory, setActiveCategory] = useState<TokenCategory>('color');
  const [copiedVar, setCopiedVar] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Live Token Customizer State linked to ThemeEditor
  const liveBrandColor = theme?.color?.primary || '#3182f6';
  const liveRadius = theme?.borderRadius || '16px';

  const handleCopy = (variable: string) => {
    navigator.clipboard.writeText(variable);
    setCopiedVar(variable);
    setTimeout(() => setCopiedVar(null), 2000);
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

  const TABS: { id: TokenCategory; label: string; icon: React.ElementType; count: number }[] = [
    { id: 'color', label: '색상', icon: Palette, count: filteredColors.length },
    { id: 'typography', label: '타이포그래피', icon: Type, count: filteredTypography.length },
    { id: 'radius', label: '곡률', icon: Maximize2, count: filteredRadius.length },
    { id: 'spacing', label: '간격', icon: Box, count: filteredSpacing.length },
    { id: 'shadow', label: '그림자', icon: Layers, count: filteredShadow.length },
  ];

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col justify-between transition-colors">
      {/* Header */}
      <Header brandColor={liveBrandColor} />

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-6 py-10 flex-1 flex flex-col gap-10">
        {/* 1. Hero & Concept Section */}
        <section className="flex flex-col gap-4 border-b border-(--border-subtle) pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
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
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
                디자인 토큰(Design Tokens) 표준 CSS 변수 명세
              </h1>
              <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                색상, 폰트, 여백, 곡률 등 <strong>UI의 모든 디자인 결정을 플랫폼에 독립적인 최소 단위 데이터</strong>로 정의합니다.{' '}
                정의된 토큰은 CSS 변수(<code className="text-xs bg-(--bg-secondary) px-1 py-0.5 rounded border border-(--border-subtle)">var(--atom-...)</code>), Tailwind 클래스, TypeScript 타입으로 자동 컴파일되어 React, Vue, HTML 어디서나 100% 동일하게 동작합니다.
              </p>
            </div>

            {/* Quick Live Preview Pill */}
            <div
              style={{ borderRadius: liveRadius }}
              className="p-4 bg-(--bg-secondary) border border-(--border-strong) shadow-xs flex flex-col gap-3 min-w-[280px]"
            >
              <span className="text-[11px] font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" style={{ color: liveBrandColor }} />
                실시간 토큰 값 프리뷰 테스트
              </span>
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-(--text-secondary)">브랜드 컬러</span>
                  <div className="flex items-center gap-1.5">
                    {['#3182f6', '#ff6f0f', '#10b981', '#7c3aed'].map((c) => (
                      <button
                        key={c}
                        onClick={() => updateColor('primary', c)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${liveBrandColor === c ? 'scale-110 border-(--text-primary) shadow-sm' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>

                <div className="h-8 w-px bg-(--border-subtle) mx-1" />

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-(--text-secondary)">테두리 곡률</span>
                  <select
                    value={liveRadius}
                    onChange={(e) => updateBorderRadius(e.target.value)}
                    className="text-xs px-2 py-1 bg-(--bg-primary) text-(--text-primary) rounded-lg border border-(--border-strong) font-semibold"
                  >
                    <option value="6px">6px (샤프)</option>
                    <option value="12px">12px (표준)</option>
                    <option value="16px">16px (토스/당근)</option>
                    <option value="9999px">9999px (캡슐)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Tier Architecture Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div
              style={{ borderRadius: liveRadius }}
              className="p-5 bg-(--bg-secondary) border border-(--border-subtle) shadow-xs"
            >
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-(--text-muted) mb-1">Tier 1</div>
              <h3 className="font-bold text-sm text-(--text-primary) flex items-center gap-1.5 mb-2">
                <Box className="w-4 h-4 text-emerald-500" />
                Global / Raw Tokens
              </h3>
              <p className="text-xs text-(--text-secondary) leading-relaxed mb-3">
                플랫폼 무관한 절대적 원천 값입니다. 특정 맥락이나 의도를 갖지 않는 순수 팔레트와 단위입니다.
              </p>
              <div className="p-2 rounded-lg bg-(--bg-primary) border border-(--border-subtle) font-mono text-[11px] text-(--text-secondary)">
                blue-500: #3182F6<br />
                radius-16: 16px
              </div>
            </div>

            <div
              style={{ borderRadius: liveRadius }}
              className="p-5 bg-(--bg-secondary) border-2 border-blue-500/40 shadow-xs relative"
            >
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">Tier 2 (핵심 표준)</div>
              <h3 className="font-bold text-sm text-(--text-primary) flex items-center gap-1.5 mb-2">
                <Zap className="w-4 h-4 text-blue-500" />
                Semantic Tokens (의도/역할)
              </h3>
              <p className="text-xs text-(--text-secondary) leading-relaxed mb-3">
                <strong>&quot;어디에 쓰이는가&quot;</strong> 목적에 따라 명명합니다. 라이트/다크 모드 전환 시 매핑만 변경됩니다.
              </p>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/50 font-mono text-[11px] text-blue-700 dark:text-blue-300">
                --atom-color-primary: var(--blue-500)<br />
                --atom-bg-surface: var(--white)
              </div>
            </div>

            <div
              style={{ borderRadius: liveRadius }}
              className="p-5 bg-(--bg-secondary) border border-(--border-subtle) shadow-xs"
            >
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-(--text-muted) mb-1">Tier 3</div>
              <h3 className="font-bold text-sm text-(--text-primary) flex items-center gap-1.5 mb-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                Component Tokens
              </h3>
              <p className="text-xs text-(--text-secondary) leading-relaxed mb-3">
                특정 컴포넌트에 한정된 스타일 값입니다. 시맨틱 토큰을 상속받아 세밀한 오버라이드를 수행합니다.
              </p>
              <div className="p-2 rounded-lg bg-(--bg-primary) border border-(--border-subtle) font-mono text-[11px] text-(--text-secondary)">
                .atom-btn-primary &#123;<br />
                &nbsp;&nbsp;background: var(--atom-color-primary);<br />
                &#125;
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Tokens Explorer */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--text-primary)">
                주요 디자인 토큰 변수 카탈로그
              </h2>
              <p className="text-xs text-(--text-secondary) mt-1">
                변수명을 클릭하면 클립보드에 즉시 복사되어 CSS나 스타일 코드에 바로 붙여넣을 수 있습니다.
              </p>
            </div>

            {/* Search Filter & Category Tabs */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[200px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
                <input
                  type="text"
                  placeholder="토큰 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-(--bg-secondary) border border-(--border-subtle) focus:border-(--border-strong) rounded-xl text-(--text-primary) placeholder:text-(--text-muted) outline-hidden transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-primary)"
                    title="검색어 지우기"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Navigation Tabs */}
              <div className="inline-flex p-1 rounded-xl bg-(--bg-secondary) border border-(--border-subtle) text-xs font-semibold overflow-x-auto shadow-xs">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-xs ${
                        isActive
                          ? 'bg-(--bg-primary) text-(--text-primary) border border-(--border-strong) shadow-xs font-bold'
                          : 'text-(--text-secondary) hover:text-(--text-primary)'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-(--bg-secondary)' : 'opacity-70'}`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* TAB 1: COLORS */}
          {activeCategory === 'color' && (
            filteredColors.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted) bg-(--bg-secondary) border border-(--border-subtle) rounded-2xl">
                검색된 색상 토큰이 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredColors.map((token) => (
                  <div
                    key={token.variable}
                    style={{ borderRadius: liveRadius }}
                    className="p-5 bg-(--bg-secondary) border border-(--border-subtle) hover:border-(--border-strong) shadow-xs transition-colors flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-12 h-12 rounded-xl shadow-inner border border-black/10 dark:border-white/10 shrink-0 transition-transform"
                        style={{ backgroundColor: token.value }}
                      />
                      <div>
                        <div className="text-xs font-bold text-(--text-primary)">
                          {token.name}
                        </div>
                        <span className="text-[10px] font-mono font-medium text-(--text-muted) uppercase">
                          {token.value}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-(--text-secondary) leading-relaxed">
                      {token.description}
                    </p>

                    <div className="pt-2 border-t border-(--border-subtle) flex items-center justify-between">
                      <button
                        onClick={() => handleCopy(`var(${token.variable})`)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-(--bg-primary) border border-(--border-subtle) hover:border-(--border-strong) text-(--text-primary) text-[11px] font-mono transition-colors"
                        title="클릭하여 복사"
                      >
                        {copiedVar === `var(${token.variable})` ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3 opacity-60" />
                        )}
                        <span>var({token.variable})</span>
                      </button>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-(--bg-primary) text-(--text-muted) border border-(--border-subtle)">
                        {token.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 2: TYPOGRAPHY */}
          {activeCategory === 'typography' && (
            filteredTypography.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted) bg-(--bg-secondary) border border-(--border-subtle) rounded-2xl">
                검색된 타이포그래피 토큰이 없습니다.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredTypography.map((token) => (
                  <div
                    key={token.variable}
                    style={{ borderRadius: liveRadius }}
                    className="p-5 bg-(--bg-secondary) border border-(--border-subtle) hover:border-(--border-strong) shadow-xs transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-(--text-primary)">{token.name}</span>
                        <span className="text-[10px] font-mono text-(--text-muted)">{token.fontSize} · {token.weight}</span>
                      </div>
                      <div className="text-(--text-primary) font-sans tracking-tight py-1" style={{ fontSize: token.fontSize.split(' ')[0] }}>
                        {token.sample}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleCopy(`var(${token.variable})`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-(--bg-primary) border border-(--border-subtle) hover:border-(--border-strong) text-(--text-primary) text-xs font-mono transition-colors"
                      >
                        {copiedVar === `var(${token.variable})` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 opacity-60" />
                        )}
                        <span>var({token.variable})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 3: RADIUS */}
          {activeCategory === 'radius' && (
            filteredRadius.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted) bg-(--bg-secondary) border border-(--border-subtle) rounded-2xl">
                검색된 곡률 토큰이 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRadius.map((token) => (
                  <div
                    key={token.variable}
                    style={{ borderRadius: liveRadius }}
                    className="p-5 bg-(--bg-secondary) border border-(--border-subtle) hover:border-(--border-strong) shadow-xs transition-colors flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-(--text-primary)">{token.name}</span>
                      <span className="text-xs font-mono font-bold text-blue-500">{token.value}</span>
                    </div>

                    <div className="h-24 w-full bg-(--bg-primary) border-2 border-dashed border-blue-500/40 flex items-center justify-center transition-all" style={{ borderRadius: token.value }}>
                      <div className="w-14 h-14 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs transition-all" style={{ borderRadius: token.value }}>
                        {token.value}
                      </div>
                    </div>

                    <p className="text-xs text-(--text-secondary)">
                      {token.description}
                    </p>

                    <button
                      onClick={() => handleCopy(`var(${token.variable})`)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-(--bg-primary) border border-(--border-subtle) hover:border-(--border-strong) text-(--text-primary) text-xs font-mono transition-colors w-full"
                    >
                      {copiedVar === `var(${token.variable})` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
                      <span>var({token.variable})</span>
                    </button>
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 4: SPACING */}
          {activeCategory === 'spacing' && (
            filteredSpacing.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted) bg-(--bg-secondary) border border-(--border-subtle) rounded-2xl">
                검색된 간격 토큰이 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSpacing.map((token) => (
                  <div
                    key={token.variable}
                    style={{ borderRadius: liveRadius }}
                    className="p-5 bg-(--bg-secondary) border border-(--border-subtle) hover:border-(--border-strong) shadow-xs transition-colors flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-(--text-primary)">{token.name}</span>
                      <span className="text-xs font-mono font-bold text-emerald-500">{token.value}</span>
                    </div>

                    <div className="w-full bg-(--bg-primary) h-10 rounded-xl p-2 flex items-center border border-(--border-subtle)">
                      <div className="bg-emerald-500 h-full rounded-md shadow-xs transition-all" style={{ width: `${Math.min(token.px * 3, 240)}px` }} />
                    </div>

                    <button
                      onClick={() => handleCopy(`var(${token.variable})`)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-(--bg-primary) border border-(--border-subtle) hover:border-(--border-strong) text-(--text-primary) text-xs font-mono transition-colors w-full"
                    >
                      {copiedVar === `var(${token.variable})` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
                      <span>var({token.variable})</span>
                    </button>
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 5: SHADOW */}
          {activeCategory === 'shadow' && (
            filteredShadow.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted) bg-(--bg-secondary) border border-(--border-subtle) rounded-2xl">
                검색된 그림자 토큰이 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredShadow.map((token) => (
                  <div
                    key={token.variable}
                    style={{ borderRadius: liveRadius }}
                    className="p-6 bg-(--bg-secondary) border border-(--border-subtle) hover:border-(--border-strong) transition-colors flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-(--text-primary)">{token.name}</span>
                      <span className="text-xs font-mono text-(--text-muted)">var({token.variable})</span>
                    </div>

                    <div className="h-32 rounded-2xl bg-(--bg-primary) border border-(--border-subtle) flex items-center justify-center p-4">
                      <div
                        className="w-48 py-4 bg-(--bg-secondary) rounded-xl text-center text-xs font-semibold text-(--text-primary) border border-(--border-subtle) transition-all duration-300"
                        style={{ boxShadow: token.value }}
                      >
                        Shadow Preview
                      </div>
                    </div>

                    <p className="text-xs text-(--text-secondary)">
                      {token.description}
                    </p>

                    <button
                      onClick={() => handleCopy(`var(${token.variable})`)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-(--bg-primary) border border-(--border-subtle) hover:border-(--border-strong) text-(--text-primary) text-xs font-mono transition-colors w-full"
                    >
                      {copiedVar === `var(${token.variable})` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
                      <span>var({token.variable})</span>
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
        </section>

        {/* 3. Live Token Interactive Showcase */}
        <section
          style={{ borderRadius: liveRadius }}
          className="p-8 bg-(--bg-secondary) text-(--text-primary) border border-(--border-strong) shadow-xs flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--border-subtle) pb-5">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Live Token Binding Showcase
              </span>
              <h3 className="text-xl font-bold mt-1 text-(--text-primary)">
                실제 UI 컴포넌트에 토큰이 주입되는 방식
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-(--text-muted) font-mono">React / Vue / HTML 호환</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interactive Component 1: Button */}
            <div
              style={{ borderRadius: liveRadius }}
              className="p-5 bg-(--bg-primary) border border-(--border-subtle) flex flex-col justify-between gap-4"
            >
              <div className="text-xs font-semibold text-(--text-muted)">Primary Button</div>
              <div className="py-4 flex justify-center">
                <button
                  className="px-5 py-2.5 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
                  style={{
                    backgroundColor: liveBrandColor,
                    borderRadius: liveRadius,
                  }}
                >
                  토큰 주입된 버튼
                </button>
              </div>
              <div className="p-2 rounded-lg bg-(--bg-secondary) border border-(--border-subtle) text-[10px] font-mono text-(--text-secondary)">
                background: {liveBrandColor};<br />
                border-radius: {liveRadius};
              </div>
            </div>

            {/* Interactive Component 2: Card */}
            <div
              style={{ borderRadius: liveRadius }}
              className="p-5 bg-(--bg-primary) border border-(--border-subtle) flex flex-col justify-between gap-4"
            >
              <div className="text-xs font-semibold text-(--text-muted)">Action Card</div>
              <div
                className="p-4 bg-(--bg-secondary) border border-(--border-subtle) transition-all"
                style={{ borderRadius: liveRadius }}
              >
                <div className="text-xs font-bold text-(--text-secondary) mb-1">계좌 잔액</div>
                <div className="text-sm font-extrabold" style={{ color: liveBrandColor }}>
                  1,450,000 원
                </div>
              </div>
              <div className="p-2 rounded-lg bg-(--bg-secondary) border border-(--border-subtle) text-[10px] font-mono text-(--text-secondary)">
                color: var(--atom-color-primary);<br />
                border-radius: {liveRadius};
              </div>
            </div>

            {/* Interactive Component 3: Badge & Input */}
            <div
              style={{ borderRadius: liveRadius }}
              className="p-5 bg-(--bg-primary) border border-(--border-subtle) flex flex-col justify-between gap-4"
            >
              <div className="text-xs font-semibold text-(--text-muted)">Input &amp; Pill Badge</div>
              <div className="flex flex-col gap-2 py-1">
                <div className="flex justify-between items-center">
                  <span
                    className="px-2.5 py-0.5 text-[10px] font-bold text-white"
                    style={{ backgroundColor: liveBrandColor, borderRadius: '9999px' }}
                  >
                    Vivid Pill
                  </span>
                </div>
                <input
                  type="text"
                  readOnly
                  value="토큰 테두리 인풋"
                  className="w-full px-3 py-1.5 bg-(--bg-secondary) border text-xs text-(--text-primary) font-medium"
                  style={{ borderColor: liveBrandColor, borderRadius: liveRadius }}
                />
              </div>
              <div className="p-2 rounded-lg bg-(--bg-secondary) border border-(--border-subtle) text-[10px] font-mono text-(--text-secondary)">
                border-color: {liveBrandColor};<br />
                border-radius: {liveRadius};
              </div>
            </div>
          </div>
        </section>

        {/* 4. AI Prompt & Usage Guide */}
        <section
          style={{ borderRadius: liveRadius }}
          className="p-8 bg-(--bg-secondary) border border-(--border-strong) shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <div
              style={{ color: liveBrandColor }}
              className="inline-flex items-center gap-1.5 text-xs font-bold mb-2"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>AI Agent 프롬프트 연동</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-(--text-primary)">
              AI에게 말만 걸면 디자인 토큰이 즉시 구축됩니다
            </h3>
            <p className="text-xs text-(--text-secondary) mt-1 max-w-xl">
              &quot;presets/toss.md 가이드를 보고 디자인 토큰을 생성해줘&quot;라고 지시하면,{' '}
              Agent가 W3C tokens.json을 갱신하고 위 변수들을 즉시 컴파일합니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/patterns"
              style={{ backgroundColor: liveBrandColor, borderRadius: liveRadius }}
              className="px-5 py-2.5 text-white font-bold text-xs shadow-xs hover:opacity-90 active:scale-95 transition flex items-center gap-2"
            >
              <span>UX 패턴 보러가기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
            <Link href="/components" className="hover:text-(--text-primary) transition-colors">컴포넌트 갤러리</Link>
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
