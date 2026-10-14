'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import {
  Sparkles,
  Layers,
  Palette,
  Terminal,
  Check,
  Copy,
  Download,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Search,
  Send,
  Zap,
  Sliders,
  RefreshCw,
  Code2,
  FileText,
  Eye,
  X,
  CreditCard,
  Plane,
  ShieldCheck,
  BookOpen,
  LayoutGrid
} from 'lucide-react';

// Step 1: Available UX Patterns
interface StudioPattern {
  id: string;
  name: string;
  category: string;
  description: string;
  recommendedComponents: string[];
  checklist: string[];
}

const STUDIO_PATTERNS: StudioPattern[] = [
  {
    id: 'fintech-transfer',
    name: '계좌 송금 & 결제 플로우',
    category: 'Fintech',
    description: '금액 입력, 수수료 면제 안내 배지, 빠른 출금 계좌 선택, 확인 모달 및 완료 인터랙션.',
    recommendedComponents: ['button', 'input', 'dialog', 'badge', 'card'],
    checklist: [
      '숫자 키패드 친화적 대형 폰트 인풋',
      '수수료 면제 여부 캡슐 배지 상시 노출',
      '최종 송금 전 이중 확인 모달 다이얼로그 필수',
      '송금 완료 시 성공 애니메이션 및 잔액 즉시 갱신'
    ]
  },
  {
    id: 'search-empty',
    name: '실시간 검색 & Empty UX',
    category: 'Discovery',
    description: '300ms 디바운스 입력, 검색어 초기화(X) 버튼, 결과 없음 시 복구 추천 태그 제공.',
    recommendedComponents: ['input', 'badge', 'card', 'button'],
    checklist: [
      '300ms 디바운스 적용으로 불필요한 서버 호출 방지',
      '결과 없을 때 단순 공백 대신 대안 추천 태그 3개 이상 노출',
      '원클릭 텍스트 클리어 버튼 배치'
    ]
  },
  {
    id: 'auth-security',
    name: '계정 인증 & 유효성 검사',
    category: 'Security',
    description: '이메일 형식 실시간 검증, 패스워드 강도 인디케이터, 소셜 원클릭 로그인 버튼.',
    recommendedComponents: ['input', 'button', 'alert', 'switch'],
    checklist: [
      '입력 중 즉각적인 인라인 에러 피드백',
      '8자리 이상 영문/숫자/특수문자 패스워드 가이드',
      '자동완성 지원 및 비밀번호 표시/숨김 토글'
    ]
  },
  {
    id: 'flight-booking',
    name: '항공권 / 여행 일정 예약',
    category: 'Booking',
    description: '출발지-도착지 맞바꾸기(Swap), 왕복/편도 탭, 캘린더 날짜 선택 및 최저가 검색 CTA.',
    recommendedComponents: ['tabs', 'input', 'button', 'badge', 'card'],
    checklist: [
      '출발지와 도착지를 원클릭으로 스왑하는 아이콘 버튼',
      '왕복 선택 시 가는 날과 오는 날 범위 표시',
      '로딩 시 가격 정렬 스켈레톤 제공'
    ]
  },
  {
    id: 'article-feed',
    name: '블로그 & 콘텐츠 피드',
    category: 'Content',
    description: '아티클 카드 그리드, 카테고리 필터 칩, 무한 스크롤 및 북마크 인터랙션.',
    recommendedComponents: ['badge', 'card', 'button', 'tabs'],
    checklist: [
      '시각적 위계를 갖는 섬네일과 텍스트 레이아웃',
      '가독성 높은 본문 서체 스케일 준수',
      '북마크/공유 마이크로 인터랙션'
    ]
  }
];

// Step 2: Available UI Components
interface StudioComponent {
  id: string;
  name: string;
  category: string;
  description: string;
}

const STUDIO_COMPONENTS: StudioComponent[] = [
  { id: 'button', name: '버튼 (Button Variants)', category: 'Form', description: 'Primary, Secondary, Outline, Destructive' },
  { id: 'input', name: '인풋 필드 (Input with Clear)', category: 'Form', description: '텍스트 인풋, 에러 상태, 디바운스' },
  { id: 'dialog', name: '모달 다이얼로그 (Dialog / Modal)', category: 'Feedback', description: '접근성 보장 오버레이 확인창' },
  { id: 'badge', name: '상태 배지 (Pill Badge)', category: 'Data', description: 'NEW, 활성, 대기 캡슐 칩' },
  { id: 'card', name: '인터랙티브 카드 (Card Surface)', category: 'Data', description: '경계선 및 음영 서피스 박스' },
  { id: 'tabs', name: '세그먼트 탭 (Segment Tabs)', category: 'Navigation', description: '왕복/편도, 카테고리 전환 탭' },
  { id: 'alert', name: '경고 콜아웃 (Alert Callout)', category: 'Feedback', description: '인라인 알림 및 주의 피드백' },
  { id: 'switch', name: '스위치 토글 (Switch)', category: 'Form', description: '활성/비활성 즉각 토글' }
];

// Step 3: Brand Presets
const BRAND_PRESETS = [
  {
    id: 'toss',
    name: '토스 스타일 (Toss)',
    brandColor: '#3182f6',
    radius: '16px',
    fontScale: '1.0',
    description: 'Vivid Blue, 16px 볼드 라운딩, 시원한 여백과 극도의 미니멀리즘'
  },
  {
    id: 'daangn',
    name: '당근 스타일 (Daangn)',
    brandColor: '#ff6f0f',
    radius: '12px',
    fontScale: '1.0',
    description: 'Warm Orange, 12px 소프트 라운딩, 친근하고 따뜻한 커뮤니티 감성'
  },
  {
    id: 'hyper-violet',
    name: '모던 바이올렛 (Violet Tech)',
    brandColor: '#7c3aed',
    radius: '8px',
    fontScale: '1.0',
    description: '세련된 보라색 테크 감성, 8px 샤프 라운딩, 개발자/B2B 최적화'
  },
  {
    id: 'forest-emerald',
    name: '에코 에메랄드 (Emerald)',
    brandColor: '#10b981',
    radius: '14px',
    fontScale: '1.0',
    description: '자연스럽고 편안한 딥 그린, 핀테크 자산 및 웰니스 서비스용'
  }
];

export default function StudioPage() {
  // Wizard Step (1, 2, 3)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Selections State
  const [selectedPatternId, setSelectedPatternId] = useState<string>('fintech-transfer');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([
    'button',
    'input',
    'dialog',
    'badge',
    'card'
  ]);
  const [selectedBrandColor, setSelectedBrandColor] = useState<string>('#3182f6');
  const [selectedRadius, setSelectedRadius] = useState<string>('16px');
  const [targetFramework, setTargetFramework] = useState<'react' | 'vue' | 'html'>('react');

  // Preview Canvas Mode
  const [viewportMode, setViewportMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  // Interactive Live Demo states
  const [demoAmount, setDemoAmount] = useState('50,000');
  const [demoSearch, setDemoSearch] = useState('');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Selected pattern object
  const currentPattern = STUDIO_PATTERNS.find((p) => p.id === selectedPatternId) || STUDIO_PATTERNS[0];

  // Pattern change handler (also suggests default components)
  const handleSelectPattern = (pattern: StudioPattern) => {
    setSelectedPatternId(pattern.id);
    setSelectedComponents(pattern.recommendedComponents);
    setDemoSuccess(false);
  };

  const toggleComponent = (compId: string) => {
    if (selectedComponents.includes(compId)) {
      if (selectedComponents.length > 1) {
        setSelectedComponents(selectedComponents.filter((id) => id !== compId));
      }
    } else {
      setSelectedComponents([...selectedComponents, compId]);
    }
  };

  const applyBrandPreset = (preset: typeof BRAND_PRESETS[0]) => {
    setSelectedBrandColor(preset.brandColor);
    setSelectedRadius(preset.radius);
  };

  // Generate Master Markdown Prompt
  const generatePrompt = () => {
    return `# 🤖 [Agent-Native UI 지시서] ${currentPattern.name} 개발 가이드

> **대상 프레임워크**: ${targetFramework.toUpperCase()}
> **디자인 토큰**: Brand Accent \`${selectedBrandColor}\`, Radius \`${selectedRadius}\`

---

## ⚡ 1. 프로젝트 초기화 (필수)
먼저 프로젝트 터미널에서 AtomSystem 라이브러리를 초기화하세요:
\`\`\`bash
npx atomsystem init
\`\`\`
- 이 명령어는 디자인 토큰 CSS 변수(\`_variables.css\`)와 시멘틱 클래스(\`atom-ui.css\`)를 자동 구성합니다.

---

## 📋 2. UX 패턴 명세서: ${currentPattern.name}
- **카테고리**: ${currentPattern.category}
- **핵심 목표**: ${currentPattern.description}

### 필수 UX 체크리스트:
${currentPattern.checklist.map((item) => `- [ ] ${item}`).join('\n')}

---

## 🧩 3. 사용 컴포넌트 조합
아래 컴포넌트들을 결합하여 완성된 하나의 실전 화면 플로우를 작성하세요:
${selectedComponents.map((cId) => {
  const comp = STUDIO_COMPONENTS.find((c) => c.id === cId);
  return `- **${comp?.name}**: \`.atom-${cId}\` 시멘틱 클래스 또는 ${targetFramework === 'react' ? '<' + comp?.id.charAt(0).toUpperCase() + comp?.id.slice(1) + ' />' : '전용 템플릿'} 활용`;
}).join('\n')}

---

## 🎨 4. 주입할 디자인 토큰 (Design Tokens)
UI 생성 시 하드코딩된 색상/수치 대신 아래 CSS 토큰 변수를 사용하세요:
\`\`\`css
:root {
  --atom-color-primary: ${selectedBrandColor};
  --atom-radius-default: ${selectedRadius};
  --atom-font-sans: "Pretendard Variable", -apple-system, sans-serif;
}
\`\`\`

---

## 🚀 5. AI 지시 프롬프트
"위 UX 패턴 체크리스트와 디자인 토큰 규격을 100% 준수하여, 사용자가 바로 실행할 수 있는 완성된 ${targetFramework.toUpperCase()} 컴포넌트 코드를 작성해줘."
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
      
      {/* Common Header */}
      <Header brandColor={selectedBrandColor} />

      {/* Main Studio Viewport */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-1 flex flex-col gap-6">

        {/* Top Control Bar: Studio Header & Step Tracker */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-600 dark:text-amber-400 mb-1.5">
              <Zap className="w-3.5 h-3.5 fill-amber-500" />
              <span>Agent-Native Studio</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              3-Step AI 프롬프트 빌더 스튜디오
            </h1>
          </div>

          {/* 3 Steps Indicator */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition ${
                currentStep === 1
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>UX 패턴 선택</span>
            </button>

            <span className="text-neutral-300 dark:text-neutral-700">➔</span>

            <button
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition ${
                currentStep === 2
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
              <span>컴포넌트 구성</span>
            </button>

            <span className="text-neutral-300 dark:text-neutral-700">➔</span>

            <button
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition ${
                currentStep === 3
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
              <span>디자인 토큰 주입</span>
            </button>
          </div>
        </div>

        {/* 2-Column Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: Step-by-Step Configuration (5 Cols) */}
          <aside className="lg:col-span-5 flex flex-col gap-5">
            
            {/* STEP 1: SELECT UX PATTERN */}
            {currentStep === 1 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Step 1 of 3</span>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white">만들 서비스의 UX 패턴을 선택하세요</h2>
                  </div>
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>

                <div className="flex flex-col gap-2.5">
                  {STUDIO_PATTERNS.map((p) => {
                    const isSelected = p.id === selectedPatternId;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPattern(p)}
                        className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 ${
                          isSelected
                            ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-500 ring-2 ring-blue-500/10 shadow-xs'
                            : 'bg-neutral-50/50 dark:bg-neutral-850/50 border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            {p.id === 'fintech-transfer' && <CreditCard className="w-3.5 h-3.5 text-blue-500" />}
                            {p.id === 'search-empty' && <Search className="w-3.5 h-3.5 text-amber-500" />}
                            {p.id === 'auth-security' && <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />}
                            {p.id === 'flight-booking' && <Plane className="w-3.5 h-3.5 text-indigo-500" />}
                            {p.id === 'article-feed' && <BookOpen className="w-3.5 h-3.5 text-emerald-500" />}
                            <span>{p.name}</span>
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                            {p.category}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          {p.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="mt-2 w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>다음: 컴포넌트 구성하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: ASSEMBLE COMPONENTS */}
            {currentStep === 2 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Step 2 of 3</span>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white">화면에 포함할 컴포넌트를 고르세요</h2>
                  </div>
                  <Layers className="w-4 h-4 text-indigo-500" />
                </div>

                <div className="text-xs text-neutral-500">
                  선택한 <strong>{currentPattern.name}</strong> 패턴에 맞춰 추천 컴포넌트가 자동 선택되었습니다. 자유롭게 토글하세요.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {STUDIO_COMPONENTS.map((comp) => {
                    const isChecked = selectedComponents.includes(comp.id);
                    return (
                      <button
                        key={comp.id}
                        onClick={() => toggleComponent(comp.id)}
                        className={`p-3 rounded-xl text-left border transition-all flex items-start gap-2.5 ${
                          isChecked
                            ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 shadow-xs'
                            : 'bg-neutral-50 dark:bg-neutral-850/60 border-neutral-200 dark:border-neutral-800 opacity-60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center border ${isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-neutral-400'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-neutral-900 dark:text-white">{comp.name.split(' (')[0]}</div>
                          <div className="text-[10px] text-neutral-400">{comp.category}</div>
                        </div>
                      </button>
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

            {/* STEP 3: APPLY DESIGN TOKENS */}
            {currentStep === 3 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
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

                <div className="flex items-center gap-2">
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

            {/* Target Framework Switcher Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500">지시 대상 프레임워크</span>
              <div className="inline-flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold">
                <button
                  onClick={() => setTargetFramework('react')}
                  className={`px-3 py-1 rounded-lg transition ${targetFramework === 'react' ? 'bg-white dark:bg-neutral-900 text-blue-600 font-bold shadow-xs' : 'text-neutral-400'}`}
                >
                  React / Next
                </button>
                <button
                  onClick={() => setTargetFramework('vue')}
                  className={`px-3 py-1 rounded-lg transition ${targetFramework === 'vue' ? 'bg-white dark:bg-neutral-900 text-emerald-600 font-bold shadow-xs' : 'text-neutral-400'}`}
                >
                  Vue 3
                </button>
                <button
                  onClick={() => setTargetFramework('html')}
                  className={`px-3 py-1 rounded-lg transition ${targetFramework === 'html' ? 'bg-white dark:bg-neutral-900 text-orange-600 font-bold shadow-xs' : 'text-neutral-400'}`}
                >
                  Vanilla HTML
                </button>
              </div>
            </div>

          </aside>

          {/* Right Panel: Live Canvas & Master Prompt (7 Cols) */}
          <section className="lg:col-span-7 flex flex-col gap-6">

            {/* Canvas Header: Viewport Mode Switcher */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                  실시간 조립 캔버스 (Live Interactive Canvas)
                </span>
              </div>

              <div className="flex items-center gap-1 bg-white dark:bg-neutral-900 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`p-1.5 rounded-lg text-xs transition ${viewportMode === 'mobile' ? 'bg-neutral-100 dark:bg-neutral-800 text-blue-600' : 'text-neutral-400'}`}
                  title="모바일 뷰 (375px)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`p-1.5 rounded-lg text-xs transition ${viewportMode === 'tablet' ? 'bg-neutral-100 dark:bg-neutral-800 text-blue-600' : 'text-neutral-400'}`}
                  title="태블릿 뷰"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`p-1.5 rounded-lg text-xs transition ${viewportMode === 'desktop' ? 'bg-neutral-100 dark:bg-neutral-800 text-blue-600' : 'text-neutral-400'}`}
                  title="데스크톱 뷰"
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* The Live Interactive Canvas Frame */}
            <div className="w-full min-h-[460px] p-6 sm:p-10 rounded-3xl bg-neutral-100/70 dark:bg-neutral-950/70 border border-neutral-200/80 dark:border-neutral-800/80 flex justify-center items-center overflow-x-auto shadow-inner relative">
              
              {/* Device Frame */}
              <div
                className={`w-full bg-white dark:bg-neutral-900 p-6 border border-neutral-200/90 dark:border-neutral-800 shadow-xl transition-all duration-300 ${
                  viewportMode === 'mobile' ? 'max-w-sm' : viewportMode === 'tablet' ? 'max-w-md' : 'max-w-xl'
                }`}
                style={{ borderRadius: selectedRadius }}
              >
                
                {/* 1. Fintech Transfer Live Pattern */}
                {selectedPatternId === 'fintech-transfer' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-400">송금 대상</span>
                      {selectedComponents.includes('badge') && (
                        <span
                          className="text-[10px] font-bold px-2.5 py-0.5 text-white shadow-xs"
                          style={{ backgroundColor: selectedBrandColor, borderRadius: '9999px' }}
                        >
                          수수료 무제한 면제
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: selectedBrandColor }}>
                        토
                      </div>
                      <span>이토스 (토스뱅크 1002-***)</span>
                    </div>

                    {selectedComponents.includes('input') && (
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-neutral-400">보낼 금액</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={demoAmount}
                            onChange={(e) => setDemoAmount(e.target.value)}
                            className="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-bold text-base"
                            style={{ borderRadius: selectedRadius }}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">원</span>
                        </div>
                      </div>
                    )}

                    {selectedComponents.includes('card') && (
                      <div className="p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800 text-xs flex justify-between items-center" style={{ borderRadius: selectedRadius }}>
                        <span className="text-neutral-500">출금 가능 잔액</span>
                        <span className="font-bold">2,480,000 원</span>
                      </div>
                    )}

                    {selectedComponents.includes('button') && (
                      <button
                        onClick={() => {
                          if (selectedComponents.includes('dialog')) {
                            setDemoModalOpen(true);
                          } else {
                            setDemoSuccess(true);
                          }
                        }}
                        className="w-full py-3 text-white font-bold text-xs shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: selectedBrandColor,
                          borderRadius: selectedRadius
                        }}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{demoAmount}원 바로 보내기</span>
                      </button>
                    )}

                    {demoSuccess && (
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          송금이 성공적으로 완료되었습니다!
                        </span>
                        <button onClick={() => setDemoSuccess(false)} className="text-[11px] underline">닫기</button>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Search & Empty State Live Pattern */}
                {selectedPatternId === 'search-empty' && (
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="아이템 검색 ('없음' 입력 시 Empty UX)"
                        value={demoSearch}
                        onChange={(e) => setDemoSearch(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium"
                        style={{ borderRadius: selectedRadius }}
                      />
                      {demoSearch && (
                        <button onClick={() => setDemoSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {demoSearch.includes('없음') ? (
                      <div className="p-6 text-center border border-dashed border-neutral-200 dark:border-neutral-800 flex flex-col items-center gap-3" style={{ borderRadius: selectedRadius }}>
                        <AlertCircle className="w-8 h-8 text-neutral-400" />
                        <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300">검색 결과가 없습니다</div>
                        <p className="text-[11px] text-neutral-400">다른 키워드로 검색하거나 아래 추천 태그를 눌러보세요.</p>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {['토스 토큰', '당근 프리셋', '다이얼로그'].map((tag) => (
                            <button
                              key={tag}
                              onClick={() => setDemoSearch(tag)}
                              className="px-2.5 py-1 text-[10px] font-bold text-white shadow-xs"
                              style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {['토스 스타일 시멘틱 컴포넌트 세트', '모바일 바텀 탭 네비게이션', '인터랙티브 대화상자 모달'].map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800 text-xs font-semibold flex items-center justify-between"
                            style={{ borderRadius: selectedRadius }}
                          >
                            <span>{item}</span>
                            <span className="text-[10px] text-neutral-400">추천</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Auth Live Pattern */}
                {selectedPatternId === 'auth-security' && (
                  <div className="flex flex-col gap-3.5">
                    <div className="text-sm font-bold text-neutral-900 dark:text-white">회원가입 및 본인인증</div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-400">이메일 주소</label>
                      <input
                        type="email"
                        defaultValue="designer@atomsystem.com"
                        className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                        style={{ borderRadius: selectedRadius }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-400">비밀번호</label>
                      <input
                        type="password"
                        defaultValue="••••••••"
                        className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                        style={{ borderRadius: selectedRadius }}
                      />
                    </div>
                    {selectedComponents.includes('button') && (
                      <button
                        className="w-full py-2.5 text-white font-bold text-xs shadow-md mt-1"
                        style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}
                      >
                        인증 완료하고 시작하기
                      </button>
                    )}
                  </div>
                )}

                {/* 4. Flight Booking Live Pattern */}
                {selectedPatternId === 'flight-booking' && (
                  <div className="flex flex-col gap-3">
                    <div className="inline-flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold">
                      <span className="px-3 py-1 bg-white dark:bg-neutral-900 font-bold rounded-lg shadow-xs">왕복</span>
                      <span className="px-3 py-1 text-neutral-400">편도</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-bold" style={{ borderRadius: selectedRadius }}>
                        <span className="text-[10px] text-neutral-400 block">출발</span>
                        서울/김포 (GMP)
                      </div>
                      <div className="p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-bold" style={{ borderRadius: selectedRadius }}>
                        <span className="text-[10px] text-neutral-400 block">도착</span>
                        제주 (CJU)
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 text-white font-bold text-xs shadow-md mt-1"
                      style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}
                    >
                      최저가 항공권 조회
                    </button>
                  </div>
                )}

                {/* 5. Article Feed Live Pattern */}
                {selectedPatternId === 'article-feed' && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: selectedBrandColor, borderRadius: '9999px' }}>
                        디자인 토큰
                      </span>
                      <span className="text-[10px] text-neutral-400">3분 전</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white leading-snug">
                      피그마에서 코드로: Agent-Native UI 엔지니어링의 미래
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      블랙박스 npm 패키지에서 벗어나 마크다운과 토큰으로 모든 프레임워크를 정복하는 방법.
                    </p>
                    <button
                      className="w-full py-2 text-white font-bold text-xs shadow-xs"
                      style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}
                    >
                      아티클 전체 읽기
                    </button>
                  </div>
                )}

              </div>

              {/* Modal Dialog Overlay Demo */}
              {demoModalOpen && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-20 rounded-3xl">
                  <div className="w-full max-w-xs bg-white dark:bg-neutral-900 p-5 border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150" style={{ borderRadius: selectedRadius }}>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white">정말 송금하시겠습니까?</div>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      이토스님에게 <strong>{demoAmount}원</strong>을 이체합니다. 전송 후에는 취소할 수 없습니다.
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => setDemoModalOpen(false)}
                        className="flex-1 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-bold"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => {
                          setDemoModalOpen(false);
                          setDemoSuccess(true);
                        }}
                        className="flex-1 py-2 rounded-xl text-white font-bold text-xs shadow-md"
                        style={{ backgroundColor: selectedBrandColor }}
                      >
                        이체 확정
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Master Prompt Output Box */}
            <div className="p-6 rounded-3xl bg-neutral-900 text-neutral-100 border border-neutral-800 shadow-xl flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white font-mono">
                    생성된 AI Agent 마스터 프롬프트 (.md)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyPrompt}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition active:scale-95 shadow-md shadow-emerald-600/20"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? '복사 완료!' : '프롬프트 복사'}</span>
                  </button>
                  <button
                    onClick={handleDownloadPrompt}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700 font-bold text-xs transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.md 파일 다운로드</span>
                  </button>
                </div>
              </div>

              {/* Markdown Preview Viewer */}
              <div className="relative">
                <pre className="p-4 rounded-2xl bg-neutral-950 text-neutral-300 font-mono text-[11px] leading-relaxed max-h-[220px] overflow-y-auto whitespace-pre-wrap border border-neutral-800/80">
                  {masterPromptText}
                </pre>
              </div>

              <div className="text-[11px] text-neutral-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Cursor, Antigravity, Claude Code 등에 붙여넣으면 즉시 완벽한 코드가 생성됩니다.</span>
              </div>
            </div>

          </section>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 bg-white/50 dark:bg-neutral-950/50 mt-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">AtomSystem Studio</span>
            <span> — 3-Step Agent-Native Prompt Engine</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:underline">메인</Link>
            <Link href="/tokens" className="hover:underline">디자인 토큰</Link>
            <Link href="/patterns" className="hover:underline">UX 패턴</Link>
            <Link href="/components" className="hover:underline">컴포넌트</Link>
            <span>v0.1.48</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
