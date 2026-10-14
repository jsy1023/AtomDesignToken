'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import {
  Palette,
  Type,
  Maximize2,
  Box,
  Sparkles,
  Copy,
  Check,
  Layers,
  ArrowRight,
  Terminal,
  Code2,
  Sliders,
  CheckCircle2,
  Info,
  Zap,
  HelpCircle,
  Eye,
  RefreshCw,
  LayoutGrid
} from 'lucide-react';

import {
  TokenCategory,
  ColorToken,
  TypographyToken,
  RadiusToken,
  SpacingToken,
  ShadowToken,
  BASE_COLOR_TOKENS,
  TYPOGRAPHY_TOKENS,
  RADIUS_TOKENS,
  SPACING_TOKENS,
  SHADOW_TOKENS,
  BRAND_PRESETS
} from '@/lib/data/tokens';

export default function TokensPage() {
  const [activeCategory, setActiveCategory] = useState<TokenCategory>('color');
  const [copiedVar, setCopiedVar] = useState<string | null>(null);

  // Live Token Customizer State
  const [liveBrandColor, setLiveBrandColor] = useState('#3182f6');
  const [liveRadius, setLiveRadius] = useState('16px');
  const [searchFilter, setSearchFilter] = useState('');

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

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#090a0f] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between transition-colors">
      
      {/* Header */}
      <Header brandColor={liveBrandColor} />

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-6 py-10 flex-1 flex flex-col gap-10">

        {/* 1. Hero & Concept Section */}
        <section className="flex flex-col gap-6 border-b border-neutral-200/80 dark:border-neutral-800 pb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-600 dark:text-emerald-400 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>W3C DTCG Standard · Single Source of Truth</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                디자인 토큰(Design Tokens)의 이해와<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-blue-600 to-indigo-600">
                  표준 CSS 변수 명세서
                </span>
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed">
                디자인 토큰은 색상, 폰트, 여백, 곡률 등 <strong>UI의 모든 디자인 결정을 플랫폼에 독립적인 최소 단위 데이터</strong>로 정의한 것입니다. 
                피그마나 마크다운에서 정의된 토큰은 CSS 변수(`var(--atom-...)`), Tailwind 클래스, TypeScript 타입으로 자동 컴파일되어 
                React, Vue, 바닐라 HTML 어디서나 100% 동일하게 동작합니다.
              </p>
            </div>

            {/* Quick Live Preview Pill */}
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-3 min-w-[280px]">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-500" />
                실시간 토큰 값 프리뷰 테스트
              </span>
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-neutral-500">브랜드 컬러</span>
                  <div className="flex items-center gap-1.5">
                    {['#3182f6', '#ff6f0f', '#10b981', '#7c3aed'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setLiveBrandColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${liveBrandColor === c ? 'scale-110 border-neutral-900 dark:border-white shadow-sm' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800 mx-1" />

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-neutral-500">테두리 곡률</span>
                  <select
                    value={liveRadius}
                    onChange={(e) => setLiveRadius(e.target.value)}
                    className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 font-semibold"
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
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mb-1">Tier 1</div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-1.5 mb-2">
                <Box className="w-4 h-4 text-emerald-500" />
                Global / Raw Tokens
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
                플랫폼 무관한 절대적 원천 값입니다. 특정 맥락이나 의도를 갖지 않는 순수 팔레트와 단위입니다.
              </p>
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 font-mono text-[11px] text-neutral-600 dark:text-neutral-300">
                blue-500: #3182F6<br />
                radius-16: 16px
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-blue-500/30 dark:border-blue-500/40 shadow-xs relative">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">Tier 2 (핵심 표준)</div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-1.5 mb-2">
                <Zap className="w-4 h-4 text-blue-600" />
                Semantic Tokens (의도/역할)
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
                <strong>"어디에 쓰이는가"</strong> 목적에 따라 명명합니다. 라이트/다크 모드 전환 시 매핑만 변경됩니다.
              </p>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 font-mono text-[11px] text-blue-700 dark:text-blue-300">
                --atom-color-primary: var(--blue-500)<br />
                --atom-bg-surface: var(--white)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mb-1">Tier 3</div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-1.5 mb-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                Component Tokens
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
                특정 컴포넌트에 한정된 스타일 값입니다. 시멘틱 토큰을 상속받아 세밀한 오버라이드를 수행합니다.
              </p>
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 font-mono text-[11px] text-neutral-600 dark:text-neutral-300">
                .atom-btn-primary &#123;<br />
                &nbsp;&nbsp;background: var(--atom-color-primary);<br />
                &#125;
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Tokens Explorer */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                주요 디자인 토큰 변수 카탈로그
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                변수명을 클릭하면 클립보드에 즉시 복사되어 CSS나 스타일 코드에 바로 붙여넣을 수 있습니다.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveCategory('color')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${activeCategory === 'color' ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs font-bold' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>색상 (Colors)</span>
              </button>
              <button
                onClick={() => setActiveCategory('typography')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${activeCategory === 'typography' ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs font-bold' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>타이포그래피 (Typography)</span>
              </button>
              <button
                onClick={() => setActiveCategory('radius')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${activeCategory === 'radius' ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs font-bold' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>곡률 (Radius)</span>
              </button>
              <button
                onClick={() => setActiveCategory('spacing')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${activeCategory === 'spacing' ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs font-bold' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>간격 (Spacing)</span>
              </button>
              <button
                onClick={() => setActiveCategory('shadow')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${activeCategory === 'shadow' ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs font-bold' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>그림자 (Shadow)</span>
              </button>
            </div>
          </div>

          {/* TAB 1: COLORS */}
          {activeCategory === 'color' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLOR_TOKENS.map((token) => (
                <div
                  key={token.variable}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Color Swatch Circle / Box */}
                    <div
                      className="w-12 h-12 rounded-xl shadow-inner border border-black/5 dark:border-white/10 shrink-0 transition-all duration-300"
                      style={{ backgroundColor: token.value }}
                    />
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">
                        {token.name}
                      </div>
                      <span className="text-[10px] font-mono font-medium text-neutral-400 uppercase">
                        {token.value}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {token.description}
                  </p>

                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <button
                      onClick={() => handleCopy(`var(${token.variable})`)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[11px] font-mono transition"
                      title="클릭하여 복사"
                    >
                      {copiedVar === `var(${token.variable})` ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3 opacity-60" />
                      )}
                      <span>var({token.variable})</span>
                    </button>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                      {token.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: TYPOGRAPHY */}
          {activeCategory === 'typography' && (
            <div className="flex flex-col gap-3">
              {TYPOGRAPHY_TOKENS.map((token) => (
                <div
                  key={token.variable}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">{token.name}</span>
                      <span className="text-[10px] font-mono text-neutral-400">{token.fontSize} · {token.weight}</span>
                    </div>
                    <div className="text-neutral-800 dark:text-neutral-200 font-sans tracking-tight py-1" style={{ fontSize: token.fontSize.split(' ')[0] }}>
                      {token.sample}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleCopy(`var(${token.variable})`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-mono transition"
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
          )}

          {/* TAB 3: RADIUS */}
          {activeCategory === 'radius' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {RADIUS_TOKENS.map((token) => (
                <div
                  key={token.variable}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">{token.name}</span>
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{token.value}</span>
                  </div>

                  {/* Visual Box with exact radius */}
                  <div className="h-24 w-full bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed border-blue-500/40 flex items-center justify-center transition-all" style={{ borderRadius: token.value }}>
                    <div className="w-14 h-14 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md transition-all" style={{ borderRadius: token.value }}>
                      {token.value}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {token.description}
                  </p>

                  <button
                    onClick={() => handleCopy(`var(${token.variable})`)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-mono transition w-full"
                  >
                    {copiedVar === `var(${token.variable})` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
                    <span>var({token.variable})</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: SPACING */}
          {activeCategory === 'spacing' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPACING_TOKENS.map((token) => (
                <div
                  key={token.variable}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">{token.name}</span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{token.value}</span>
                  </div>

                  {/* Visual Spacing Bar */}
                  <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-10 rounded-xl p-2 flex items-center">
                    <div className="bg-emerald-500 h-full rounded-md shadow-xs transition-all" style={{ width: `${Math.min(token.px * 3, 240)}px` }} />
                  </div>

                  <button
                    onClick={() => handleCopy(`var(${token.variable})`)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-mono transition w-full"
                  >
                    {copiedVar === `var(${token.variable})` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
                    <span>var({token.variable})</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: SHADOW */}
          {activeCategory === 'shadow' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SHADOW_TOKENS.map((token) => (
                <div
                  key={token.variable}
                  className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{token.name}</span>
                    <span className="text-xs font-mono text-neutral-400">var({token.variable})</span>
                  </div>

                  {/* Visual Floating Box */}
                  <div className="h-32 rounded-2xl bg-neutral-50 dark:bg-neutral-850 flex items-center justify-center p-4">
                    <div
                      className="w-48 py-4 bg-white dark:bg-neutral-800 rounded-xl text-center text-xs font-semibold text-neutral-700 dark:text-neutral-200 border border-neutral-100 dark:border-neutral-700 transition-all duration-300"
                      style={{ boxShadow: token.value }}
                    >
                      Hover or Observe Shadow
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {token.description}
                  </p>

                  <button
                    onClick={() => handleCopy(`var(${token.variable})`)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-mono transition w-full"
                  >
                    {copiedVar === `var(${token.variable})` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
                    <span>var({token.variable})</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 3. Live Token Interactive Showcase */}
        <section className="p-8 rounded-3xl bg-neutral-900 text-neutral-100 border border-neutral-800 shadow-xl flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Live Token Binding Showcase
              </span>
              <h3 className="text-xl font-bold mt-1">
                실제 UI 컴포넌트에 토큰이 주입되는 방식
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-mono">React / Vue / HTML 호환</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interactive Component 1: Button */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between gap-4">
              <div className="text-xs font-semibold text-neutral-400">Primary Button</div>
              <div className="py-4 flex justify-center">
                <button
                  className="px-5 py-2.5 text-white font-bold text-xs shadow-lg transition-transform active:scale-95"
                  style={{
                    backgroundColor: liveBrandColor,
                    borderRadius: liveRadius
                  }}
                >
                  토큰 주입된 버튼
                </button>
              </div>
              <div className="p-2 rounded-lg bg-neutral-900 text-[10px] font-mono text-neutral-400">
                background: {liveBrandColor};<br />
                border-radius: {liveRadius};
              </div>
            </div>

            {/* Interactive Component 2: Card */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between gap-4">
              <div className="text-xs font-semibold text-neutral-400">Action Card</div>
              <div
                className="p-4 bg-neutral-900 border border-neutral-800 transition-all"
                style={{ borderRadius: liveRadius }}
              >
                <div className="text-xs font-bold text-white mb-1">계좌 잔액</div>
                <div className="text-sm font-extrabold" style={{ color: liveBrandColor }}>
                  1,450,000 원
                </div>
              </div>
              <div className="p-2 rounded-lg bg-neutral-900 text-[10px] font-mono text-neutral-400">
                color: var(--atom-color-primary);<br />
                border-radius: {liveRadius};
              </div>
            </div>

            {/* Interactive Component 3: Badge & Input */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between gap-4">
              <div className="text-xs font-semibold text-neutral-400">Input & Pill Badge</div>
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
                  className="w-full px-3 py-1.5 bg-neutral-900 border text-xs text-neutral-300 font-medium"
                  style={{ borderColor: liveBrandColor, borderRadius: liveRadius }}
                />
              </div>
              <div className="p-2 rounded-lg bg-neutral-900 text-[10px] font-mono text-neutral-400">
                border-color: {liveBrandColor};<br />
                border-radius: {liveRadius};
              </div>
            </div>
          </div>
        </section>

        {/* 4. AI Prompt & Usage Guide */}
        <section className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>AI Agent 프롬프트 연동</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight">
              AI에게 말만 걸면 디자인 토큰이 즉시 구축됩니다
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xl">
              "presets/toss.md 가이드를 보고 디자인 토큰을 생성해줘"라고 지시하면, 
              Agent가 W3C tokens.json을 갱신하고 위 변수들을 즉시 컴파일합니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/patterns"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <span>UX 패턴 보러가기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 bg-white/50 dark:bg-neutral-950/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">AtomDesignToken Specification</span>
            <span> — Universal W3C DTCG Token System</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:underline">메인으로 가기</Link>
            <Link href="/patterns" className="hover:underline">UX 패턴</Link>
            <Link href="/components" className="hover:underline">컴포넌트 갤러리</Link>
            <span>v0.1.48</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
