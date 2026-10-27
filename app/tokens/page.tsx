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
        <section className="flex flex-col gap-5 border-b border-(--border-subtle) pb-8">
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

            {/* Quick Live Preview Controls - Clean Minimal Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono pb-1">
              <div className="flex items-center gap-2">
                <span className="text-(--text-muted)">Brand:</span>
                <div className="flex items-center gap-1.5">
                  {['#3182f6', '#ff6f0f', '#10b981', '#7c3aed'].map((c) => (
                    <button
                      key={c}
                      onClick={() => updateColor('primary', c)}
                      className={`w-4 h-4 rounded-full border transition-transform ${liveBrandColor === c ? 'scale-125 border-(--text-primary)' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              <span className="text-(--border-subtle)">|</span>

              <div className="flex items-center gap-2">
                <span className="text-(--text-muted)">Radius:</span>
                <select
                  value={liveRadius}
                  onChange={(e) => updateBorderRadius(e.target.value)}
                  className="text-xs px-2 py-0.5 bg-(--bg-secondary) text-(--text-primary) rounded border border-(--border-subtle) font-mono"
                >
                  <option value="6px">6px</option>
                  <option value="12px">12px</option>
                  <option value="16px">16px</option>
                  <option value="9999px">9999px</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3-Tier Architecture Specification - Flat List */}
          <div className="pt-4 border-t border-(--border-subtle)">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-(--text-muted) uppercase">Tier 1 · Global / Raw</div>
                <h3 className="font-semibold text-sm text-(--text-primary)">원천 토큰</h3>
                <p className="text-xs text-(--text-secondary) leading-relaxed">
                  특정 의도를 갖지 않는 순수 팔레트와 단위 (예: <code className="font-mono text-[11px]">blue-500: #3182F6</code>, <code className="font-mono text-[11px]">radius-16: 16px</code>).
                </p>
              </div>

              <div className="space-y-1 md:border-l md:border-(--border-subtle) md:pl-6">
                <div className="text-[10px] font-mono text-blue-500 uppercase">Tier 2 · Semantic (핵심 표준)</div>
                <h3 className="font-semibold text-sm text-(--text-primary)">시맨틱 토큰</h3>
                <p className="text-xs text-(--text-secondary) leading-relaxed">
                  &quot;어디에 쓰이는가&quot; 목적과 역할에 따른 명명 (예: <code className="font-mono text-[11px]">--atom-color-primary</code>, 테마 전환 시 자동 매핑).
                </p>
              </div>

              <div className="space-y-1 md:border-l md:border-(--border-subtle) md:pl-6">
                <div className="text-[10px] font-mono text-(--text-muted) uppercase">Tier 3 · Component</div>
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
            <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap text-xs ${
                      isActive
                        ? 'bg-(--bg-secondary) text-(--text-primary) font-bold'
                        : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary)/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    <span className="text-[10px] font-mono opacity-60">
                      ({tab.count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input - Clean Minimal Line */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-muted)" />
              <input
                type="text"
                placeholder="토큰 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1 text-xs bg-(--bg-secondary) border border-(--border-subtle) focus:border-(--border-strong) rounded text-(--text-primary) placeholder:text-(--text-muted) outline-hidden transition-colors"
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
          </div>

          {/* TAB 1: COLORS TABLE */}
          {activeCategory === 'color' && (
            filteredColors.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted)">
                검색된 색상 토큰이 없습니다.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                      <th className="py-2.5 px-3 font-medium w-12">미리보기</th>
                      <th className="py-2.5 px-3 font-medium">토큰 이름</th>
                      <th className="py-2.5 px-3 font-medium">CSS 변수 (클릭 복사)</th>
                      <th className="py-2.5 px-3 font-medium">원천 값</th>
                      <th className="py-2.5 px-3 font-medium hidden md:table-cell">용도 및 설명</th>
                      <th className="py-2.5 px-3 font-medium text-right">구분</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-(--border-subtle)">
                    {filteredColors.map((token) => (
                      <tr key={token.variable} className="hover:bg-(--bg-secondary)/60 transition-colors group">
                        <td className="py-2.5 px-3">
                          <div
                            className="w-6 h-6 rounded border border-black/10 dark:border-white/10 shrink-0"
                            style={{ backgroundColor: token.value }}
                          />
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-(--text-primary)">
                          {token.name}
                        </td>
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => handleCopy(`var(${token.variable})`)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-(--bg-secondary) hover:bg-(--border-subtle) text-(--text-primary) font-mono text-[11px] transition-colors"
                            title="클릭하여 복사"
                          >
                            {copiedVar === `var(${token.variable})` ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-(--text-muted) group-hover:text-(--text-primary)" />
                            )}
                            <span>var({token.variable})</span>
                          </button>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-(--text-muted) uppercase">
                          {token.value}
                        </td>
                        <td className="py-2.5 px-3 text-(--text-secondary) hidden md:table-cell max-w-sm">
                          {token.description}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">
                            {token.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* TAB 2: TYPOGRAPHY TABLE */}
          {activeCategory === 'typography' && (
            filteredTypography.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted)">
                검색된 타이포그래피 토큰이 없습니다.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                      <th className="py-2.5 px-3 font-medium">토큰 이름</th>
                      <th className="py-2.5 px-3 font-medium">스펙 (Size / Weight)</th>
                      <th className="py-2.5 px-3 font-medium">CSS 변수</th>
                      <th className="py-2.5 px-3 font-medium">실제 텍스트 미리보기</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-(--border-subtle)">
                    {filteredTypography.map((token) => (
                      <tr key={token.variable} className="hover:bg-(--bg-secondary)/60 transition-colors group">
                        <td className="py-3 px-3 font-semibold text-(--text-primary)">
                          {token.name}
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-(--text-muted)">
                          {token.fontSize} · {token.weight}
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => handleCopy(`var(${token.variable})`)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-(--bg-secondary) hover:bg-(--border-subtle) text-(--text-primary) font-mono text-[11px] transition-colors"
                            title="클릭하여 복사"
                          >
                            {copiedVar === `var(${token.variable})` ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-(--text-muted) group-hover:text-(--text-primary)" />
                            )}
                            <span>var({token.variable})</span>
                          </button>
                        </td>
                        <td className="py-3 px-3 text-(--text-primary) font-sans tracking-tight" style={{ fontSize: token.fontSize.split(' ')[0] }}>
                          {token.sample}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* TAB 3: RADIUS TABLE */}
          {activeCategory === 'radius' && (
            filteredRadius.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted)">
                검색된 곡률 토큰이 없습니다.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                      <th className="py-2.5 px-3 font-medium w-16">미리보기</th>
                      <th className="py-2.5 px-3 font-medium">토큰 이름</th>
                      <th className="py-2.5 px-3 font-medium">값 (Value)</th>
                      <th className="py-2.5 px-3 font-medium">CSS 변수</th>
                      <th className="py-2.5 px-3 font-medium hidden sm:table-cell">권장 용도</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-(--border-subtle)">
                    {filteredRadius.map((token) => (
                      <tr key={token.variable} className="hover:bg-(--bg-secondary)/60 transition-colors group">
                        <td className="py-2.5 px-3">
                          <div
                            className="w-9 h-6 bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-[9px] font-mono text-blue-500"
                            style={{ borderRadius: token.value }}
                          >
                            {token.value}
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-(--text-primary)">
                          {token.name}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] font-bold text-blue-500">
                          {token.value}
                        </td>
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => handleCopy(`var(${token.variable})`)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-(--bg-secondary) hover:bg-(--border-subtle) text-(--text-primary) font-mono text-[11px] transition-colors"
                            title="클릭하여 복사"
                          >
                            {copiedVar === `var(${token.variable})` ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-(--text-muted) group-hover:text-(--text-primary)" />
                            )}
                            <span>var({token.variable})</span>
                          </button>
                        </td>
                        <td className="py-2.5 px-3 text-(--text-secondary) hidden sm:table-cell">
                          {token.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* TAB 4: SPACING TABLE */}
          {activeCategory === 'spacing' && (
            filteredSpacing.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted)">
                검색된 간격 토큰이 없습니다.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                      <th className="py-2.5 px-3 font-medium w-48">너비 미리보기</th>
                      <th className="py-2.5 px-3 font-medium">토큰 이름</th>
                      <th className="py-2.5 px-3 font-medium">값 (Value)</th>
                      <th className="py-2.5 px-3 font-medium">CSS 변수</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-(--border-subtle)">
                    {filteredSpacing.map((token) => (
                      <tr key={token.variable} className="hover:bg-(--bg-secondary)/60 transition-colors group">
                        <td className="py-2.5 px-3">
                          <div className="h-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded flex items-center">
                            <div
                              className="h-full bg-emerald-500 rounded-xs"
                              style={{ width: `${Math.min(token.px * 2.5, 160)}px` }}
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-(--text-primary)">
                          {token.name}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] font-bold text-emerald-500">
                          {token.value} ({token.px}px)
                        </td>
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => handleCopy(`var(${token.variable})`)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-(--bg-secondary) hover:bg-(--border-subtle) text-(--text-primary) font-mono text-[11px] transition-colors"
                            title="클릭하여 복사"
                          >
                            {copiedVar === `var(${token.variable})` ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-(--text-muted) group-hover:text-(--text-primary)" />
                            )}
                            <span>var({token.variable})</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* TAB 5: SHADOW TABLE */}
          {activeCategory === 'shadow' && (
            filteredShadow.length === 0 ? (
              <div className="text-center py-12 text-xs text-(--text-muted)">
                검색된 그림자 토큰이 없습니다.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                      <th className="py-2.5 px-3 font-medium w-20">미리보기</th>
                      <th className="py-2.5 px-3 font-medium">토큰 이름</th>
                      <th className="py-2.5 px-3 font-medium">CSS 변수</th>
                      <th className="py-2.5 px-3 font-medium">CSS 원천 값</th>
                      <th className="py-2.5 px-3 font-medium hidden md:table-cell">용도 및 설명</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-(--border-subtle)">
                    {filteredShadow.map((token) => (
                      <tr key={token.variable} className="hover:bg-(--bg-secondary)/60 transition-colors group">
                        <td className="py-2.5 px-3">
                          <div
                            className="w-14 py-1 px-1.5 bg-(--bg-primary) border border-(--border-subtle) rounded text-[9px] text-center text-(--text-primary)"
                            style={{ boxShadow: token.value }}
                          >
                            Shadow
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-(--text-primary)">
                          {token.name}
                        </td>
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => handleCopy(`var(${token.variable})`)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-(--bg-secondary) hover:bg-(--border-subtle) text-(--text-primary) font-mono text-[11px] transition-colors"
                            title="클릭하여 복사"
                          >
                            {copiedVar === `var(${token.variable})` ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-(--text-muted) group-hover:text-(--text-primary)" />
                            )}
                            <span>var({token.variable})</span>
                          </button>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[10px] text-(--text-muted) max-w-xs truncate">
                          {token.value}
                        </td>
                        <td className="py-2.5 px-3 text-(--text-secondary) hidden md:table-cell">
                          {token.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </section>

        {/* 3. Live Token Interactive Showcase - Clean Flat Layout */}
        <section className="space-y-4 pt-6 border-t border-(--border-subtle)">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-mono text-neutral-400">Live Token Binding Showcase</div>
              <h3 className="text-lg font-bold text-(--text-primary)">실제 UI 컴포넌트에 토큰이 주입되는 방식</h3>
            </div>
            <span className="text-xs text-(--text-muted) font-mono">React · Vue · HTML 호환</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Interactive Component 1: Button */}
            <div className="space-y-2">
              <div className="text-xs text-(--text-muted) font-medium">1. 버튼 컴포넌트</div>
              <div className="py-2 flex items-center">
                <button
                  className="px-4 py-2 text-white font-semibold text-xs transition-opacity hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: liveBrandColor,
                    borderRadius: liveRadius,
                  }}
                >
                  토큰 주입된 버튼
                </button>
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
                <span
                  className="inline-block px-2 py-0.5 text-[10px] font-semibold text-white rounded-full"
                  style={{ backgroundColor: liveBrandColor }}
                >
                  Vivid Pill
                </span>
                <input
                  type="text"
                  readOnly
                  value="토큰 테두리 인풋"
                  className="w-full px-2.5 py-1.5 bg-transparent border text-xs text-(--text-primary) outline-hidden"
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
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
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
