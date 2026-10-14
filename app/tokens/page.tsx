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

type TokenCategory = 'color' | 'typography' | 'radius' | 'spacing' | 'shadow';

interface ColorToken {
  name: string;
  variable: string;
  value: string;
  description: string;
  category: 'brand' | 'surface' | 'text' | 'border' | 'status';
}

interface TypographyToken {
  name: string;
  variable: string;
  fontSize: string;
  lineHeight: string;
  weight: string;
  sample: string;
}

interface RadiusToken {
  name: string;
  variable: string;
  value: string;
  description: string;
}

interface SpacingToken {
  name: string;
  variable: string;
  value: string;
  px: number;
}

interface ShadowToken {
  name: string;
  variable: string;
  value: string;
  description: string;
}

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

  // Color Tokens Data
  const COLOR_TOKENS: ColorToken[] = [
    // Brand
    {
      name: 'Primary Accent',
      variable: '--atom-color-primary',
      value: liveBrandColor,
      description: '주요 액션 버튼, 활성 탭, 브랜드 강조 영역의 핵심 색상',
      category: 'brand'
    },
    {
      name: 'Primary Hover',
      variable: '--atom-color-primary-hover',
      value: '#1b64da',
      description: 'Primary 컴포넌트에 마우스를 올렸을 때 적용되는 딥 톤',
      category: 'brand'
    },
    {
      name: 'Primary Subtle / Light',
      variable: '--atom-color-primary-subtle',
      value: '#e8f3ff',
      description: '배지 배경, 활성 리스트 아이템, 선택 하이라이트 배경',
      category: 'brand'
    },
    // Surface & Background
    {
      name: 'Background Primary',
      variable: '--atom-bg-primary',
      value: '#ffffff',
      description: '웹 전체 페이지의 기본 캔버스 배경 (다크모드: #090a0f)',
      category: 'surface'
    },
    {
      name: 'Background Surface / Card',
      variable: '--atom-bg-surface',
      value: '#f8f9fa',
      description: '카드, 모달 다이얼로그, 패널, 드롭다운 메뉴의 바탕색',
      category: 'surface'
    },
    {
      name: 'Background Muted',
      variable: '--atom-bg-muted',
      value: '#f1f3f5',
      description: '비활성화된 폼 필드, 태그 칩, 보조 영역 배경',
      category: 'surface'
    },
    // Text
    {
      name: 'Text Primary',
      variable: '--atom-text-primary',
      value: '#191f28',
      description: '가장 높은 명도 대비를 갖는 핵심 본문 및 헤드라인 텍스트',
      category: 'text'
    },
    {
      name: 'Text Secondary',
      variable: '--atom-text-secondary',
      value: '#8b95a1',
      description: '설명문, 부가 라벨, 플레이스홀더, 서브 텍스트',
      category: 'text'
    },
    {
      name: 'Text Muted',
      variable: '--atom-text-muted',
      value: '#b0b8c1',
      description: '타임스탬프, 비활성화된 라벨, 장식성 힌트 텍스트',
      category: 'text'
    },
    // Border
    {
      name: 'Border Subtle',
      variable: '--atom-border-subtle',
      value: '#f2f4f6',
      description: '카드 구분선, 리스트 경계선 등 부드러운 분리선',
      category: 'border'
    },
    {
      name: 'Border Strong',
      variable: '--atom-border-strong',
      value: '#e5e8eb',
      description: '인풋 필드 외곽선, 명확한 아웃라인 버튼, 모달 경계선',
      category: 'border'
    },
    // Status
    {
      name: 'Status Success',
      variable: '--atom-status-success',
      value: '#10b981',
      description: '성공 완료 알림, 온라인 상태, 송금 완료 상태',
      category: 'status'
    },
    {
      name: 'Status Danger',
      variable: '--atom-status-danger',
      value: '#f43f5e',
      description: '폼 유효성 에러, 경고 메시지, 삭제 등 파괴적 액션',
      category: 'status'
    },
    {
      name: 'Status Warning',
      variable: '--atom-status-warning',
      value: '#f59e0b',
      description: '주의 알림, 대기 중인 상태, 결제 보류',
      category: 'status'
    }
  ];

  // Typography Tokens
  const TYPOGRAPHY_TOKENS: TypographyToken[] = [
    {
      name: 'Display / Hero Title',
      variable: '--atom-font-display',
      fontSize: '36px (2.25rem)',
      lineHeight: '1.25',
      weight: '800 (ExtraBold)',
      sample: '디자이너의 피그마 해방, 말로 디자인하는 시대'
    },
    {
      name: 'Title 1 (Page Title)',
      variable: '--atom-font-title-1',
      fontSize: '28px (1.75rem)',
      lineHeight: '1.3',
      weight: '700 (Bold)',
      sample: '원클릭으로 끝내는 디자인 토큰 시스템'
    },
    {
      name: 'Title 2 (Section Title)',
      variable: '--atom-font-title-2',
      fontSize: '20px (1.25rem)',
      lineHeight: '1.35',
      weight: '700 (Bold)',
      sample: '프레임워크 무관한 표준 CSS 변수 체계'
    },
    {
      name: 'Title 3 (Card Title)',
      variable: '--atom-font-title-3',
      fontSize: '16px (1.0rem)',
      lineHeight: '1.4',
      weight: '600 (SemiBold)',
      sample: '계좌 송금 및 실시간 인증 패턴'
    },
    {
      name: 'Body 1 (Regular Body)',
      variable: '--atom-font-body-1',
      fontSize: '14px (0.875rem)',
      lineHeight: '1.5',
      weight: '400 (Regular)',
      sample: 'React, Vue, 바닐라 HTML 어디서나 복사 한 번으로 즉시 렌더링됩니다.'
    },
    {
      name: 'Body 2 / Caption',
      variable: '--atom-font-body-2',
      fontSize: '12px (0.75rem)',
      lineHeight: '1.5',
      weight: '500 (Medium)',
      sample: 'W3C DTCG 호환 tokens.json 기반 스타일 딕셔너리 컴파일'
    },
    {
      name: 'Mono Code',
      variable: '--atom-font-mono',
      fontSize: '11px (0.6875rem)',
      lineHeight: '1.6',
      weight: '500 (Medium)',
      sample: 'npx atomsystem init --preset toss'
    }
  ];

  // Radius Tokens
  const RADIUS_TOKENS: RadiusToken[] = [
    {
      name: 'None (직각)',
      variable: '--atom-radius-none',
      value: '0px',
      description: '단단한 테크니컬 대시보드 및 플랫 디자인'
    },
    {
      name: 'Small (샤프)',
      variable: '--atom-radius-sm',
      value: '6px',
      description: '태그 배지, 미니 인풋, 정밀 데이터 테이블 컨트롤'
    },
    {
      name: 'Medium (소프트)',
      variable: '--atom-radius-md',
      value: '10px',
      description: '일반적인 버튼, 인풋 필드, 툴팁'
    },
    {
      name: 'Large (볼드 - 토스/당근 기본)',
      variable: '--atom-radius-lg',
      value: '16px',
      description: '카드, 대화상자 모달, 주요 모바일 시트'
    },
    {
      name: 'Extra Large (슈퍼 라운드)',
      variable: '--atom-radius-xl',
      value: '24px',
      description: '바텀시트 최상단 모서리, 히어로 배너 카드'
    },
    {
      name: 'Pill / Full (캡슐)',
      variable: '--atom-radius-full',
      value: '9999px',
      description: '필터 칩, 플로팅 액션 버튼(FAB), 원형 아바타'
    }
  ];

  // Spacing Tokens
  const SPACING_TOKENS: SpacingToken[] = [
    { name: 'Space 1 (Extra Small)', variable: '--atom-space-1', value: '4px', px: 4 },
    { name: 'Space 2 (Small)', variable: '--atom-space-2', value: '8px', px: 8 },
    { name: 'Space 3 (Compact)', variable: '--atom-space-3', value: '12px', px: 12 },
    { name: 'Space 4 (Base)', variable: '--atom-space-4', value: '16px', px: 16 },
    { name: 'Space 5 (Medium)', variable: '--atom-space-5', value: '20px', px: 20 },
    { name: 'Space 6 (Large)', variable: '--atom-space-6', value: '24px', px: 24 },
    { name: 'Space 8 (Section)', variable: '--atom-space-8', value: '32px', px: 32 },
    { name: 'Space 12 (Hero)', variable: '--atom-space-12', value: '48px', px: 48 },
    { name: 'Space 16 (Page Gap)', variable: '--atom-space-16', value: '64px', px: 64 }
  ];

  // Shadow Tokens
  const SHADOW_TOKENS: ShadowToken[] = [
    {
      name: 'Elevation 1 (Subtle)',
      variable: '--atom-shadow-sm',
      value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      description: '기본 카드, 인풋 포커스 상태, 미세한 구분'
    },
    {
      name: 'Elevation 2 (Medium)',
      variable: '--atom-shadow-md',
      value: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      description: '호버된 카드, 드롭다운 메뉴, 팝오버 툴팁'
    },
    {
      name: 'Elevation 3 (Floating)',
      variable: '--atom-shadow-lg',
      value: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      description: '플로팅 내비게이션 바, 토스트 알림 메시지'
    },
    {
      name: 'Elevation 4 (Modal / Overlay)',
      variable: '--atom-shadow-xl',
      value: '0 20px 25px -5px rgb(0 0 0 / 0.15)',
      description: '화면 최상단 레이어의 모달 다이얼로그, 바텀시트'
    }
  ];

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
