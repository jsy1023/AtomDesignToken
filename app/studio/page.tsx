'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import {
  PATTERNS_COLLECTION,
  PatternItem,
  PatternPlatform
} from '@/lib/data/patterns';
import { GALLERY_COMPONENTS } from '@/lib/data/components';
import { BRAND_PRESETS } from '@/lib/data/tokens';
import { WireframeGraphic } from '@/components/patterns/WireframeGraphic';
import { DeviceMockupView } from '@/components/patterns/DeviceMockupView';
import {
  Sparkles,
  Layers,
  Palette,
  Terminal,
  Check,
  Copy,
  Download,
  ArrowRight,
  Smartphone,
  Monitor,
  CheckCircle2,
  Search,
  Eye
} from 'lucide-react';

export default function StudioPage() {
  // Wizard Step: 1 (Pattern) -> 2 (Components) -> 3 (Tokens)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Pattern Platform Filter & Search
  const [platformFilter, setPlatformFilter] = useState<'all' | PatternPlatform>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Selections State
  const [selectedPatternId, setSelectedPatternId] = useState<string>('saas-dashboard');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([
    'card',
    'badge',
    'button',
    'tabs',
    'table'
  ]);
  const [selectedBrandColor, setSelectedBrandColor] = useState<string>('#3182f6');
  const [selectedRadius, setSelectedRadius] = useState<string>('16px');
  const [targetFramework, setTargetFramework] = useState<'react' | 'vue' | 'html'>('react');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Current Selected Pattern from SSOT
  const currentPattern: PatternItem =
    PATTERNS_COLLECTION.find((p) => p.id === selectedPatternId) || PATTERNS_COLLECTION[0];

  // Filtered Patterns List
  const filteredPatterns = PATTERNS_COLLECTION.filter((p) => {
    const matchesPlatform = platformFilter === 'all' || p.platform === platformFilter;
    const matchesSearch =
      searchFilter === '' ||
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const webCount = PATTERNS_COLLECTION.filter((p) => p.platform === 'web').length;
  const mobileCount = PATTERNS_COLLECTION.filter((p) => p.platform === 'mobile').length;

  // Handle Pattern Selection
  const handleSelectPattern = (pattern: PatternItem) => {
    setSelectedPatternId(pattern.id);
    setSelectedComponents(pattern.recommendedComponentIds);
  };

  // Toggle Component Selection
  const toggleComponent = (compId: string) => {
    if (selectedComponents.includes(compId)) {
      if (selectedComponents.length > 1) {
        setSelectedComponents(selectedComponents.filter((id) => id !== compId));
      }
    } else {
      setSelectedComponents([...selectedComponents, compId]);
    }
  };

  // Apply Brand Preset
  const applyBrandPreset = (preset: typeof BRAND_PRESETS[0]) => {
    setSelectedBrandColor(preset.brandColor);
    setSelectedRadius(preset.radius);
  };

  // Generate Master Markdown Prompt
  const generatePrompt = () => {
    return `# 🤖 [Agent-Native UI 마스터 지시서] ${currentPattern.title} 개발 가이드

> **대상 프레임워크**: ${targetFramework.toUpperCase()}
> **서비스 카테고리**: ${currentPattern.categoryName} (${currentPattern.badge})
> **타깃 플랫폼**: ${currentPattern.platform.toUpperCase()} (${currentPattern.platform === 'web' ? '데스크톱 브라우저 최적화' : '모바일 뷰포트 최적화'})
> **디자인 토큰**: Brand Accent \`${selectedBrandColor}\`, Radius \`${selectedRadius}\`

---

## ⚡ 1. 프로젝트 라이브러리 초기화 (필수)
프로젝트 터미널에서 AtomSystem 라이브러리를 초기화하여 표준 CSS 변수와 유틸리티를 설정하세요:
\`\`\`bash
npx atomsystem init
\`\`\`
- 이 명령어는 \`_variables.css\`(디자인 토큰)와 \`atom-ui.css\`(범용 시멘틱 클래스)를 자동 생성합니다.

---

## 📋 2. UX 패턴 명세서: ${currentPattern.title}
- **핵심 목표**: ${currentPattern.summary}

### ✅ 필수 구현 체크리스트 (Best Practices):
${currentPattern.checklist.map((item) => `- [ ] ${item}`).join('\n')}

### ⚠️ 절대 하지 말아야 할 안티패턴 (Anti-patterns):
${currentPattern.antiPatterns.map((item) => `- [ ] ❌ ${item}`).join('\n')}

---

## 🧩 3. 컴포넌트 아키텍처 및 마크업 구조
아래 컴포넌트들을 유기적으로 조합하여 하나의 매끄러운 플로우 화면을 작성하세요:
${selectedComponents
  .map((cId) => {
    const comp = GALLERY_COMPONENTS.find((c) => c.id === cId);
    return `- **${comp?.name || cId}**: \`.atom-${cId}\` 클래스 또는 ${
      targetFramework === 'react'
        ? '<' + cId.charAt(0).toUpperCase() + cId.slice(1) + ' />'
        : '전용 템플릿'
    } 컴포넌트 활용`;
  })
  .join('\n')}

---

## 🎨 4. 주입할 디자인 토큰 (Design Tokens)
화면 스타일링 시 인라인 하드코딩 대신 반드시 아래 토큰 CSS 변수를 바인딩하세요:
\`\`\`css
:root {
  --atom-color-primary: ${selectedBrandColor};
  --atom-radius-default: ${selectedRadius};
  --atom-font-sans: "Pretendard Variable", -apple-system, sans-serif;
  --atom-border-subtle: #f2f4f6;
  --atom-bg-surface: #ffffff;
}
\`\`\`

---

## 🚀 5. AI Agent 실행 지시 프롬프트
"위의 **[${currentPattern.title}]** 명세서와 안티패턴 주의사항, 그리고 주입된 디자인 토큰을 100% 준수하여, 사용자가 프로젝트에 복사해 즉시 실행할 수 있는 고품질의 완성된 **${targetFramework.toUpperCase()}** 컴포넌트 코드를 작성해줘."
`;
  };

  const masterPromptText = generatePrompt();

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(masterPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleDownloadPrompt = () => {
    const blob = new Blob([masterPromptText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atom-prompt-${selectedPatternId}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#090a0f] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between transition-colors">
      {/* Global Header */}
      <Header />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-1 flex flex-col gap-8">
        {/* Studio Top Stepper Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-600 dark:text-blue-400 w-fit mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Atom Studio 3-Step Wizard · patterns 연동 단일 진실 공급원(SSOT)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              AI 프롬프트 빌더 스튜디오
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              UX 패턴 선택 ➔ 컴포넌트 구성 ➔ 디자인 토큰 주입의 3단계를 거쳐 실행 가능한 AI 지시서를 완성합니다.
            </p>
          </div>

          {/* Stepper Buttons */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-200/70 dark:bg-neutral-800 border border-neutral-300/60 dark:border-neutral-700 text-xs font-bold">
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                currentStep === 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>1. UX 패턴</span>
            </button>

            <span className="text-neutral-400">➔</span>

            <button
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                currentStep === 2
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
              <span>2. 컴포넌트</span>
            </button>

            <span className="text-neutral-400">➔</span>

            <button
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                currentStep === 3
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
              <span>3. 디자인 토큰</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split: Wizard Configuration (Left 5 Cols) + Realistic Device Mockup Canvas (Right 7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3-Step Wizard Configuration Panel */}
          <aside className="lg:col-span-5 flex flex-col gap-5">
            {/* STEP 1: UX PATTERN SELECTION (http://localhost:3000/patterns 내용 그대로 일치) */}
            {currentStep === 1 && (
              <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Step 1 of 3</span>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white">만들 서비스의 UX 패턴을 선택하세요</h2>
                  </div>
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>

                {/* Platform Filter Tabs (All / WEB / Mobile) - patterns 페이지와 동일 */}
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold">
                    <button
                      onClick={() => setPlatformFilter('all')}
                      className={`flex-1 py-1.5 rounded-lg transition ${
                        platformFilter === 'all'
                          ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                          : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                      }`}
                    >
                      전체 ({PATTERNS_COLLECTION.length})
                    </button>
                    <button
                      onClick={() => setPlatformFilter('web')}
                      className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1 ${
                        platformFilter === 'web'
                          ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>WEB ({webCount})</span>
                    </button>
                    <button
                      onClick={() => setPlatformFilter('mobile')}
                      className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1 ${
                        platformFilter === 'mobile'
                          ? 'bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                          : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>모바일 ({mobileCount})</span>
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="패턴 검색 (예: 대시보드, 챗봇, 송금...)"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Patterns Scrollable Cards List (와이어프레임 + 플랫폼 뱃지 + 설명) */}
                <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
                  {filteredPatterns.map((p) => {
                    const isSelected = p.id === selectedPatternId;
                    const isWeb = p.platform === 'web';
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleSelectPattern(p)}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col gap-2.5 ${
                          isSelected
                            ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                            : 'bg-white dark:bg-neutral-850 border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        {/* Wireframe Graphic Box */}
                        <div className="overflow-hidden rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80 p-0.5">
                          <WireframeGraphic wireframeType={p.wireframeType} platform={p.platform} />
                        </div>

                        {/* Badges & Selection Indicator */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                isWeb
                                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                                  : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                              }`}
                            >
                              {isWeb ? <Monitor className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                              <span>{isWeb ? 'WEB' : '모바일'}</span>
                            </span>
                            <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400">
                              {p.categoryName}
                            </span>
                          </div>

                          {isSelected ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>선택됨</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-neutral-400">클릭하여 선택</span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug">
                            {p.title}
                          </h4>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                            {p.summary}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="mt-1 w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>다음: 컴포넌트 구성하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: ASSEMBLE COMPONENTS */}
            {currentStep === 2 && (
              <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Step 2 of 3</span>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white">화면에 포함할 컴포넌트를 고르세요</h2>
                  </div>
                  <Layers className="w-4 h-4 text-blue-500" />
                </div>

                <div className="text-xs text-neutral-500">
                  선택한 <strong>{currentPattern.title}</strong> 패턴의 권장 컴포넌트가 자동 선택되었습니다. 자유롭게 토글하세요.
                </div>

                {/* Component List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[460px] overflow-y-auto pr-1">
                  {GALLERY_COMPONENTS.map((comp) => {
                    const isChecked = selectedComponents.includes(comp.id);
                    return (
                      <div
                        key={comp.id}
                        onClick={() => toggleComponent(comp.id)}
                        className={`p-3 rounded-2xl border text-left cursor-pointer transition flex items-center justify-between ${
                          isChecked
                            ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-500 ring-1 ring-blue-500/20'
                            : 'bg-neutral-50/50 dark:bg-neutral-850/50 border-neutral-200 dark:border-neutral-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs">{comp.name}</div>
                          <div className="text-[10px] text-neutral-400 font-mono">.atom-{comp.id}</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-blue-600 cursor-pointer pointer-events-none"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-200 font-bold text-xs transition"
                  >
                    이전
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-2 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>다음: 디자인 토큰 주입</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: INJECT DESIGN TOKENS */}
            {currentStep === 3 && (
              <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Step 3 of 3</span>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white">브랜드 디자인 토큰을 주입하세요</h2>
                  </div>
                  <Palette className="w-4 h-4 text-emerald-500" />
                </div>

                {/* Preset Themes */}
                <div>
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 block mb-2">
                    원클릭 브랜드 프리셋
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {BRAND_PRESETS.map((p) => {
                      const isSelected = selectedBrandColor === p.brandColor;
                      return (
                        <button
                          key={p.id}
                          onClick={() => applyBrandPreset(p)}
                          className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                            isSelected
                              ? 'bg-neutral-100 dark:bg-neutral-800 border-neutral-900 dark:border-white shadow-xs'
                              : 'bg-neutral-50 dark:bg-neutral-850/60 border-neutral-200 dark:border-neutral-800'
                          }`}
                        >
                          <div className="w-5 h-5 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: p.brandColor }} />
                          <span className="text-xs font-bold truncate">{p.name.split(' (')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Token Controls */}
                <div className="flex flex-col gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-850/60 border border-neutral-200 dark:border-neutral-800">
                  <div>
                    <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 flex items-center justify-between mb-1.5">
                      <span>Primary Accent Color</span>
                      <span className="font-mono text-[11px] text-neutral-400">{selectedBrandColor}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedBrandColor}
                        onChange={(e) => setSelectedBrandColor(e.target.value)}
                        className="w-9 h-9 rounded-xl border-0 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={selectedBrandColor}
                        onChange={(e) => setSelectedBrandColor(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 flex items-center justify-between mb-1.5">
                      <span>Border Radius (곡률)</span>
                      <span className="font-mono text-[11px] text-neutral-400">{selectedRadius}</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['6px', '12px', '16px', '9999px'].map((r) => (
                        <button
                          key={r}
                          onClick={() => setSelectedRadius(r)}
                          className={`py-1.5 rounded-lg text-xs font-mono font-bold border transition ${
                            selectedRadius === r
                              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent'
                              : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Target Framework Switcher */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800">
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">대상 프레임워크</span>
                  <div className="inline-flex p-1 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-xs font-semibold">
                    <button
                      onClick={() => setTargetFramework('react')}
                      className={`px-2.5 py-1 rounded-lg transition ${targetFramework === 'react' ? 'bg-white dark:bg-neutral-900 text-blue-600 font-bold shadow-xs' : 'text-neutral-500'}`}
                    >
                      React
                    </button>
                    <button
                      onClick={() => setTargetFramework('vue')}
                      className={`px-2.5 py-1 rounded-lg transition ${targetFramework === 'vue' ? 'bg-white dark:bg-neutral-900 text-emerald-600 font-bold shadow-xs' : 'text-neutral-500'}`}
                    >
                      Vue
                    </button>
                    <button
                      onClick={() => setTargetFramework('html')}
                      className={`px-2.5 py-1 rounded-lg transition ${targetFramework === 'html' ? 'bg-white dark:bg-neutral-900 text-orange-600 font-bold shadow-xs' : 'text-neutral-500'}`}
                    >
                      HTML
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-200 font-bold text-xs transition"
                  >
                    이전
                  </button>
                  <button
                    onClick={handleCopyPrompt}
                    className="flex-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPrompt ? '프롬프트 복사 완료!' : 'AI 마스터 프롬프트 복사'}</span>
                  </button>
                </div>
              </div>
            )}
          </aside>

          {/* Right Column: Realistic Device Canvas & Master Prompt (7 Cols) */}
          <section className="lg:col-span-7 flex flex-col gap-6 w-full">
            {/* Canvas Header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span>실시간 디바이스 실동작 화면 (Device Live View)</span>
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    currentPattern.platform === 'web'
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                      : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                  }`}
                >
                  {currentPattern.platform === 'web' ? '🖥️ WEB 브라우저' : '📱 모바일 스마트폰'}
                </span>
              </div>

              <span className="text-xs text-neutral-400 font-medium">
                {currentPattern.title}
              </span>
            </div>

            {/* Realistic Device Screen (patterns 페이지 2Depth와 100% 동일한 Mockup 사용) */}
            <div className="w-full flex justify-center p-4 rounded-3xl bg-neutral-100/70 dark:bg-neutral-950/70 border border-neutral-200/80 dark:border-neutral-800 shadow-inner">
              <DeviceMockupView
                patternId={currentPattern.id}
                defaultPlatform={currentPattern.platform}
              />
            </div>

            {/* Generated Prompt Preview Card */}
            <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-500" />
                  <span className="font-bold text-xs text-neutral-900 dark:text-white">
                    생성된 AI 마스터 프롬프트 (미리보기)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyPrompt}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? '복사됨' : '복사'}</span>
                  </button>
                  <button
                    onClick={handleDownloadPrompt}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xs hover:bg-neutral-200 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.md 다운로드</span>
                  </button>
                </div>
              </div>

              <div className="max-h-56 overflow-y-auto bg-neutral-50 dark:bg-neutral-950 p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 font-mono text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap select-all">
                {masterPromptText}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 mt-12 py-6 px-6 text-center text-xs text-neutral-500">
        <p>© 2026 AtomDesignToken · W3C Design Tokens Community Group Standard</p>
      </footer>
    </div>
  );
}
