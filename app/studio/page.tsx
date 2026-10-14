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
  MapPin,
  PenTool,
  ShoppingCart,
  Phone,
  Navigation2,
  Image as ImageIcon,
  Clock,
  Calendar,
  Lock,
  Plus,
  Minus,
  FileCheck,
  Compass,
  BarChart3,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  UploadCloud,
  Users,
  UserCheck,
  Bot
} from 'lucide-react';

import { PATTERNS_COLLECTION, PatternItem } from '@/lib/data/patterns';
import { GALLERY_COMPONENTS, GalleryComponent } from '@/lib/data/components';
import { BRAND_PRESETS, BrandPreset } from '@/lib/data/tokens';

// SSOT-backed UX Patterns derived from @/lib/data/patterns
interface StudioPattern {
  id: string;
  name: string;
  category: string;
  badge: string;
  iconName: 'dashboard' | 'chat' | 'onboarding' | 'uploader' | 'kyc' | 'blog' | 'map' | 'flight' | 'fintech' | 'commerce' | 'search';
  description: string;
  recommendedComponents: string[];
  checklist: string[];
  antiPatterns: string[];
}

const STUDIO_PATTERNS: StudioPattern[] = PATTERNS_COLLECTION.map((p) => ({
  id: p.id,
  name: p.title,
  category: p.categoryName,
  badge: p.badge,
  iconName: p.iconName,
  description: p.summary,
  recommendedComponents: p.recommendedComponentIds,
  checklist: p.checklist,
  antiPatterns: p.antiPatterns
}));

// SSOT-backed UI Components derived from @/lib/data/components
interface StudioComponent {
  id: string;
  name: string;
  category: string;
  description: string;
}

const STUDIO_COMPONENTS: StudioComponent[] = GALLERY_COMPONENTS.map((c) => ({
  id: c.id,
  name: c.name,
  category: c.category.toUpperCase(),
  description: c.description
}));

export default function StudioPage() {
  // Wizard Step (1, 2, 3)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Selections State
  const [selectedPatternId, setSelectedPatternId] = useState<string>('saas-dashboard');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([
    'card',
    'badge',
    'button',
    'tabs',
    'input'
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

  // SaaS Dashboard state
  const [dashboardRange, setDashboardRange] = useState<'7d' | '30d' | '90d'>('7d');

  // Chat Support state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: '안녕하세요! 무엇을 도와드릴까요? 아래 추천 질문을 눌러보세요.' },
    { sender: 'user', text: '디자인 토큰을 어떻게 빌드하나요?' },
    { sender: 'bot', text: '터미널에서 npx atomsystem init을 실행하면 tokens.json이 자동 컴파일됩니다! 🚀' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Onboarding Wizard state
  const [onboardingStep, setOnboardingStep] = useState<1 | 2 | 3>(2);
  const [selectedRole, setSelectedRole] = useState<'designer' | 'developer' | 'pm'>('designer');

  // File Uploader state
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'brand_guideline_v2.pdf', size: '4.2 MB', progress: 100 },
    { name: 'logo_symbols.svg', size: '420 KB', progress: 85 }
  ]);

  // KYC specific states
  const [kycPhone, setKycPhone] = useState('010-1234-5678');
  const [kycOtp, setKycOtp] = useState('582914');
  const [kycAllAgreed, setKycAllAgreed] = useState(true);
  const [kycSubmitted, setKycSubmitted] = useState(false);

  // Blog Editor specific states
  const [blogTitle, setBlogTitle] = useState('피그마에서 코드로: Agent-Native UI 엔지니어링');
  const [blogTags, setBlogTags] = useState(['디자인토큰', 'AI에이전트', 'W3CDTCG']);
  const [newTagInput, setNewTagInput] = useState('');
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  // Flight Booking states
  const [flightType, setFlightType] = useState<'round' | 'one'>('round');
  const [depAirport, setDepAirport] = useState('서울/김포 (GMP)');
  const [arrAirport, setArrAirport] = useState('제주 (CJU)');
  const [passengerCount, setPassengerCount] = useState(2);

  // E-commerce states
  const [cartCount, setCartCount] = useState(1);

  // Selected pattern object
  const currentPattern = STUDIO_PATTERNS.find((p) => p.id === selectedPatternId) || STUDIO_PATTERNS[0];

  const handleSelectPattern = (pattern: StudioPattern) => {
    setSelectedPatternId(pattern.id);
    setSelectedComponents(pattern.recommendedComponents);
    setDemoSuccess(false);
    setKycSubmitted(false);
    setPublishModalOpen(false);
    setDemoModalOpen(false);
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

  const swapAirports = () => {
    const temp = depAirport;
    setDepAirport(arrAirport);
    setArrAirport(temp);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      if (!blogTags.includes(newTagInput.trim())) {
        setBlogTags([...blogTags, newTagInput.trim()]);
      }
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setBlogTags(blogTags.filter((t) => t !== tagToRemove));
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: chatInput },
      { sender: 'bot', text: `"${chatInput}"에 대한 답변을 준비 중입니다.` }
    ]);
    setChatInput('');
  };

  // Generate Master Markdown Prompt
  const generatePrompt = () => {
    return `# 🤖 [Agent-Native UI 마스터 지시서] ${currentPattern.name} 개발 가이드

> **대상 프레임워크**: ${targetFramework.toUpperCase()}
> **서비스 카테고리**: ${currentPattern.category} (${currentPattern.badge})
> **디자인 토큰**: Brand Accent \`${selectedBrandColor}\`, Radius \`${selectedRadius}\`

---

## ⚡ 1. 프로젝트 라이브러리 초기화 (필수)
프로젝트 터미널에서 AtomSystem 라이브러리를 초기화하여 표준 CSS 변수와 유틸리티를 설정하세요:
\`\`\`bash
npx atomsystem init
\`\`\`
- 이 명령어는 \`_variables.css\`(디자인 토큰)와 \`atom-ui.css\`(범용 시멘틱 클래스)를 자동 생성합니다.

---

## 📋 2. UX 패턴 명세서: ${currentPattern.name}
- **핵심 목표**: ${currentPattern.description}

### ✅ 필수 구현 체크리스트 (Best Practices):
${currentPattern.checklist.map((item) => `- [ ] ${item}`).join('\n')}

### ⚠️ 절대 하지 말아야 할 안티패턴 (Anti-patterns):
${currentPattern.antiPatterns.map((item) => `- [ ] ❌ ${item}`).join('\n')}

---

## 🧩 3. 컴포넌트 아키텍처 및 마크업 구조
아래 컴포넌트들을 유기적으로 조합하여 하나의 매끄러운 플로우 화면을 작성하세요:
${selectedComponents.map((cId) => {
  const comp = STUDIO_COMPONENTS.find((c) => c.id === cId);
  return `- **${comp?.name}**: \`.atom-${cId}\` 클래스 또는 ${targetFramework === 'react' ? '<' + comp?.id.charAt(0).toUpperCase() + comp?.id.slice(1) + ' />' : '전용 템플릿'} 컴포넌트 활용`;
}).join('\n')}

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
"위의 **[${currentPattern.name}]** 명세서와 안티패턴 주의사항, 그리고 주입된 디자인 토큰을 100% 준수하여, 사용자가 프로젝트에 복사해 즉시 실행할 수 있는 고품질의 완성된 **${targetFramework.toUpperCase()}** 컴포넌트 코드를 작성해줘."
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
              <span>Agent-Native Studio · 11대 실무 베스트 패턴</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              3-Step AI 프롬프트 빌더 스튜디오
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              대시보드, 챗봇, 인증, 에디터 등 원하는 서비스 패턴을 고르고, 컴포넌트와 토큰을 조합하여 AI에게 지시할 완벽한 가이드를 생성하세요.
            </p>
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
              <span>UX 패턴 ({STUDIO_PATTERNS.length}종)</span>
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

                <div className="flex flex-col gap-2.5 max-h-[520px] overflow-y-auto pr-1">
                  {STUDIO_PATTERNS.map((p) => {
                    const isSelected = p.id === selectedPatternId;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPattern(p)}
                        className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 ${
                          isSelected
                            ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-500 ring-2 ring-blue-500/10 shadow-xs'
                            : 'bg-neutral-50/50 dark:bg-neutral-850/50 border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            {p.iconName === 'dashboard' && <BarChart3 className="w-3.5 h-3.5 text-blue-600" />}
                            {p.iconName === 'chat' && <MessageCircle className="w-3.5 h-3.5 text-indigo-500" />}
                            {p.iconName === 'kyc' && <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />}
                            {p.iconName === 'blog' && <PenTool className="w-3.5 h-3.5 text-emerald-600" />}
                            {p.iconName === 'map' && <MapPin className="w-3.5 h-3.5 text-rose-500" />}
                            {p.iconName === 'flight' && <Plane className="w-3.5 h-3.5 text-indigo-500" />}
                            {p.iconName === 'onboarding' && <Users className="w-3.5 h-3.5 text-purple-500" />}
                            {p.iconName === 'uploader' && <UploadCloud className="w-3.5 h-3.5 text-cyan-500" />}
                            {p.iconName === 'fintech' && <CreditCard className="w-3.5 h-3.5 text-blue-500" />}
                            {p.iconName === 'commerce' && <ShoppingCart className="w-3.5 h-3.5 text-amber-500" />}
                            {p.iconName === 'search' && <Search className="w-3.5 h-3.5 text-teal-500" />}
                            <span>{p.name}</span>
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                            {p.badge}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      </button>
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
              <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Step 2 of 3</span>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white">화면에 포함할 컴포넌트를 고르세요</h2>
                  </div>
                  <Layers className="w-4 h-4 text-indigo-500" />
                </div>

                <div className="text-xs text-neutral-500">
                  선택한 <strong>{currentPattern.name}</strong> 패턴에 최적화된 추천 컴포넌트가 자동 선택되었습니다. 자유롭게 토글하세요.
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
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  {currentPattern.badge}
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
            <div className="w-full min-h-[520px] p-4 sm:p-8 rounded-3xl bg-neutral-100/70 dark:bg-neutral-950/70 border border-neutral-200/80 dark:border-neutral-800/80 flex justify-center items-center overflow-x-auto shadow-inner relative">
              
              {/* Device Frame */}
              <div
                className={`w-full bg-white dark:bg-neutral-900 p-6 border border-neutral-200/90 dark:border-neutral-800 shadow-xl transition-all duration-300 ${
                  viewportMode === 'mobile' ? 'max-w-sm' : viewportMode === 'tablet' ? 'max-w-md' : 'max-w-xl'
                }`}
                style={{ borderRadius: selectedRadius }}
              >
                
                {/* 1. SaaS 데이터 분석 & KPI 대시보드 Live Pattern */}
                {selectedPatternId === 'saas-dashboard' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2.5">
                      <div>
                        <div className="text-xs font-extrabold text-neutral-900 dark:text-white">실시간 비즈니스 대시보드</div>
                        <div className="text-[10px] text-neutral-400">데이터 갱신: 방금 전</div>
                      </div>
                      <div className="inline-flex p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold">
                        {(['7d', '30d', '90d'] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => setDashboardRange(r)}
                            className={`px-2 py-0.5 rounded transition ${dashboardRange === r ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-xs' : 'text-neutral-400'}`}
                          >
                            {r.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2x2 KPI Cards Grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800" style={{ borderRadius: selectedRadius }}>
                        <div className="text-[10px] text-neutral-400 font-semibold">총 매출액 (ARR)</div>
                        <div className="text-sm font-black mt-0.5 text-neutral-900 dark:text-white">₩ 48,250,000</div>
                        <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5 mt-1">
                          <TrendingUp className="w-3 h-3" /> +14.8% vs 지난달
                        </div>
                      </div>

                      <div className="p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800" style={{ borderRadius: selectedRadius }}>
                        <div className="text-[10px] text-neutral-400 font-semibold">활성 구독자 (MAU)</div>
                        <div className="text-sm font-black mt-0.5" style={{ color: selectedBrandColor }}>12,480 명</div>
                        <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5 mt-1">
                          <TrendingUp className="w-3 h-3" /> +8.2% vs 지난달
                        </div>
                      </div>

                      <div className="p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800" style={{ borderRadius: selectedRadius }}>
                        <div className="text-[10px] text-neutral-400 font-semibold">전환율 (Conversion)</div>
                        <div className="text-sm font-black mt-0.5 text-neutral-900 dark:text-white">4.62 %</div>
                        <div className="text-[10px] text-rose-500 font-bold flex items-center gap-0.5 mt-1">
                          <TrendingDown className="w-3 h-3" /> -0.4% vs 지난달
                        </div>
                      </div>

                      <div className="p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800" style={{ borderRadius: selectedRadius }}>
                        <div className="text-[10px] text-neutral-400 font-semibold">평균 이탈률 (Churn)</div>
                        <div className="text-sm font-black mt-0.5 text-neutral-900 dark:text-white">1.18 %</div>
                        <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5 mt-1">
                          <TrendingDown className="w-3 h-3" /> -0.3% (개선됨)
                        </div>
                      </div>
                    </div>

                    {/* Mini Trend Bar Chart Visual */}
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800" style={{ borderRadius: selectedRadius }}>
                      <div className="text-[10px] font-bold text-neutral-400 mb-2">일별 트렌드 추이</div>
                      <div className="flex items-end justify-between gap-1.5 h-16 pt-2">
                        {[35, 55, 42, 68, 85, 92, 78].map((val, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full rounded-t-sm transition-all duration-300"
                              style={{
                                height: `${val}%`,
                                backgroundColor: idx === 5 ? selectedBrandColor : `${selectedBrandColor}40`
                              }}
                            />
                            <span className="text-[8px] text-neutral-400">{['월', '화', '수', '목', '금', '토', '일'][idx]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Data Table Mini Preview */}
                    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden text-[11px]">
                      <div className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 font-bold text-neutral-500 flex justify-between">
                        <span>엔터프라이즈 계정</span>
                        <span>상태</span>
                      </div>
                      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                        <div className="px-3 py-2 flex justify-between items-center">
                          <span className="font-semibold">토스뱅크 Core</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600">활성 (Pro)</span>
                        </div>
                        <div className="px-3 py-2 flex justify-between items-center">
                          <span className="font-semibold">당근마켓 Commerce</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-600">Enterprise</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. 1:1 고객지원 & AI 챗봇 Live Pattern */}
                {selectedPatternId === 'chat-support' && (
                  <div className="flex flex-col gap-3 h-[420px]">
                    <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs" style={{ backgroundColor: selectedBrandColor }}>
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-neutral-900 dark:text-white">Atom AI 서포트 봇</div>
                          <span className="text-[10px] text-emerald-500 font-bold">● 응답 가능</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-400">평균 응답 5초 이내</span>
                    </div>

                    {/* Chat Messages Stream */}
                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div
                            className={`p-3 max-w-[80%] leading-relaxed ${
                              msg.sender === 'user'
                                ? 'text-white font-medium shadow-xs'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-700/50'
                            }`}
                            style={{
                              backgroundColor: msg.sender === 'user' ? selectedBrandColor : undefined,
                              borderRadius: selectedRadius
                            }}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Reply Chips */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 text-[10px]">
                      {['토큰 빌드 방법', 'Tailwind 연동', '컴포넌트 복사'].map((q) => (
                        <button
                          key={q}
                          onClick={() => {
                            setChatMessages((prev) => [
                              ...prev,
                              { sender: 'user', text: q },
                              { sender: 'bot', text: `"${q}"에 대한 공식 문서 가이드를 로드했습니다.` }
                            ]);
                          }}
                          className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-600 dark:text-neutral-300 shrink-0 font-medium border border-neutral-200 dark:border-neutral-700"
                        >
                          {q}
                        </button>
                      ))}
                    </div>

                    {/* Chat Input Bar */}
                    <div className="flex gap-1.5 pt-1 border-t border-neutral-100 dark:border-neutral-800">
                      <input
                        type="text"
                        placeholder="메시지를 입력하세요..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                        className="flex-1 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                        style={{ borderRadius: selectedRadius }}
                      />
                      <button
                        onClick={handleSendChat}
                        className="px-3.5 py-2 text-white font-bold text-xs shadow-xs"
                        style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. 온보딩 튜토리얼 & 다단계 위저드 Live Pattern */}
                {selectedPatternId === 'onboarding-wizard' && (
                  <div className="flex flex-col gap-4">
                    {/* Stepper Progress Bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-neutral-400 mb-1.5">
                        <span style={{ color: selectedBrandColor }}>2단계: 직무 및 역할 선택</span>
                        <span>2 / 3 단계</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full transition-all duration-300" style={{ width: '66%', backgroundColor: selectedBrandColor }} />
                      </div>
                    </div>

                    <div className="text-center py-1">
                      <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">프로젝트에서 주로 어떤 역할을 맡으시나요?</h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5">선택하신 역할에 최적화된 토큰 템플릿을 자동으로 추천해 드립니다.</p>
                    </div>

                    {/* Role Selection Cards */}
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'designer', title: 'UI/UX 디자이너', desc: '피그마 탈피, 마크다운 가이드로 토큰을 구축합니다.' },
                        { id: 'developer', title: '프론트엔드 엔지니어', desc: 'React, Vue, Tailwind에 토큰 변수를 즉시 주입합니다.' },
                        { id: 'pm', title: '프로덕트 매니저 (PO/PM)', desc: '검증된 UX 패턴으로 AI에게 명확히 요구사항을 지시합니다.' }
                      ].map((role) => {
                        const isSelected = selectedRole === role.id;
                        return (
                          <button
                            key={role.id}
                            onClick={() => setSelectedRole(role.id as any)}
                            className={`p-3.5 text-left border transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/10 shadow-xs'
                                : 'bg-neutral-50 dark:bg-neutral-850/60 border-neutral-200 dark:border-neutral-800'
                            }`}
                            style={{ borderRadius: selectedRadius }}
                          >
                            <div>
                              <div className="text-xs font-bold text-neutral-900 dark:text-white">{role.title}</div>
                              <div className="text-[10px] text-neutral-400 mt-0.5">{role.desc}</div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-neutral-400'}`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button className="flex-1 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-xs font-bold" style={{ borderRadius: selectedRadius }}>
                        건너뛰기
                      </button>
                      <button
                        className="flex-2 py-2.5 text-white font-bold text-xs shadow-md"
                        style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}
                      >
                        다음 단계로 이동 (3/3)
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. 파일 드래그앤드롭 업로더 Live Pattern */}
                {selectedPatternId === 'file-uploader' && (
                  <div className="flex flex-col gap-3.5">
                    <div className="text-xs font-bold text-neutral-900 dark:text-white">브랜드 에셋 & 디자인 가이드 등록</div>

                    {/* Drag and Drop Zone */}
                    <div
                      className="p-6 border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850/60 flex flex-col items-center justify-center gap-2 text-center hover:border-blue-500 transition-colors cursor-pointer"
                      style={{ borderRadius: selectedRadius }}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                        파일을 이곳에 끌어다 놓거나 <span className="underline" style={{ color: selectedBrandColor }}>직접 선택</span>하세요
                      </div>
                      <p className="text-[10px] text-neutral-400">PDF, SVG, PNG, MD (최대 20MB)</p>
                    </div>

                    {/* Uploading Files List */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-neutral-400">첨부된 파일 (2개)</div>
                      {uploadedFiles.map((f, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-1.5"
                          style={{ borderRadius: selectedRadius }}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold truncate">{f.name}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">{f.size}</span>
                          </div>
                          <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full transition-all" style={{ width: `${f.progress}%`, backgroundColor: selectedBrandColor }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      className="w-full py-2.5 text-white font-bold text-xs shadow-md mt-1"
                      style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}
                    >
                      에셋 일괄 등록 완료
                    </button>
                  </div>
                )}

                {/* 5. KYC 본인확인 Live Pattern */}
                {selectedPatternId === 'kyc-verification' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">본인확인 & 서류제출</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600">
                        2 / 3 단계
                      </span>
                    </div>

                    {!kycSubmitted ? (
                      <>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-neutral-400">휴대폰 번호 (PASS 인증)</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={kycPhone}
                              onChange={(e) => setKycPhone(e.target.value)}
                              className="flex-1 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium"
                              style={{ borderRadius: selectedRadius }}
                            />
                            <button
                              className="px-3 py-2 text-white font-bold text-xs shrink-0 shadow-xs"
                              style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}
                            >
                              재전송
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-neutral-400">인증번호 6자리</span>
                            <span className="font-mono text-rose-500 font-bold flex items-center gap-1">
                              <Clock className="w-3 h-3" /> 02:45
                            </span>
                          </div>
                          <input
                            type="text"
                            value={kycOtp}
                            onChange={(e) => setKycOtp(e.target.value)}
                            maxLength={6}
                            className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-bold tracking-widest text-center"
                            style={{ borderRadius: selectedRadius }}
                          />
                        </div>

                        <button
                          onClick={() => setKycSubmitted(true)}
                          className="w-full py-3 text-white font-bold text-xs shadow-md mt-1 transition-transform active:scale-95 flex items-center justify-center gap-2"
                          style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>인증 신청 완료하기</span>
                        </button>
                      </>
                    ) : (
                      <div className="p-5 text-center flex flex-col items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        <div className="text-xs font-bold">심사가 정상 접수되었습니다 (대기중)</div>
                        <button onClick={() => setKycSubmitted(false)} className="text-xs underline text-neutral-400">다시 입력</button>
                      </div>
                    )}
                  </div>
                )}

                {/* 6. 블로그 글 작성 Live Pattern */}
                {selectedPatternId === 'blog-editor' && (
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                      <div className="flex items-center gap-2 text-xs">
                        <PenTool className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-bold">글 작성기</span>
                        <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-semibold">
                          <Check className="w-2.5 h-2.5" /> 30초 전 자동저장됨
                        </span>
                      </div>
                      <button
                        onClick={() => setPublishModalOpen(true)}
                        className="px-3 py-1.5 text-white font-bold text-xs shadow-xs"
                        style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}
                      >
                        발행 설정
                      </button>
                    </div>

                    <input
                      type="text"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="제목을 입력하세요"
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-extrabold text-sm"
                      style={{ borderRadius: selectedRadius }}
                    />

                    <textarea
                      rows={3}
                      defaultValue="디자인 토큰을 사용하면 엔지니어와 디자이너 사이의 커뮤니케이션 비용이 제로에 수렴합니다..."
                      className="w-full p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs leading-relaxed resize-none"
                      style={{ borderRadius: selectedRadius }}
                    />

                    <div className="flex flex-wrap gap-1.5 items-center">
                      {blogTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs"
                          style={{ backgroundColor: selectedBrandColor, borderRadius: '9999px' }}
                        >
                          <span>#{tag}</span>
                          <button onClick={() => handleRemoveTag(tag)} className="hover:opacity-75">
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. 지도 POI Live Pattern */}
                {selectedPatternId === 'map-location' && (
                  <div className="flex flex-col gap-3">
                    <div className="relative w-full h-40 rounded-2xl bg-neutral-200 dark:bg-neutral-800 overflow-hidden border border-neutral-300 dark:border-neutral-700 flex items-center justify-center">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />
                      <div className="absolute top-12 left-1/3 flex flex-col items-center">
                        <div className="px-2 py-0.5 text-white text-[10px] font-bold shadow-md" style={{ backgroundColor: selectedBrandColor, borderRadius: '9999px' }}>
                          스타벅스 테헤란점
                        </div>
                        <div className="w-2 h-2 rotate-45 -mt-1 shadow-xs" style={{ backgroundColor: selectedBrandColor }} />
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-2" style={{ borderRadius: selectedRadius }}>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-extrabold">스타벅스 테헤란점</span>
                        <span className="text-[10px] font-bold text-emerald-600">● 영업중</span>
                      </div>
                      <button className="w-full py-2 text-white font-bold text-xs" style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}>
                        길찾기 시작
                      </button>
                    </div>
                  </div>
                )}

                {/* 8. 항공권 Live Pattern */}
                {selectedPatternId === 'flight-booking' && (
                  <div className="flex flex-col gap-3.5">
                    <div className="grid grid-cols-11 gap-1 items-center">
                      <div className="col-span-5 p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold" style={{ borderRadius: selectedRadius }}>
                        <span className="text-[9px] text-neutral-400 block font-normal">출발</span>
                        {depAirport}
                      </div>
                      <button onClick={swapAirports} className="col-span-1 flex justify-center text-blue-500 font-bold">⇄</button>
                      <div className="col-span-5 p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold" style={{ borderRadius: selectedRadius }}>
                        <span className="text-[9px] text-neutral-400 block font-normal">도착</span>
                        {arrAirport}
                      </div>
                    </div>
                    <button className="w-full py-2.5 text-white font-bold text-xs shadow-md" style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}>
                      최저가 항공권 검색
                    </button>
                  </div>
                )}

                {/* 9. 계좌 송금 Live Pattern */}
                {selectedPatternId === 'fintech-transfer' && (
                  <div className="flex flex-col gap-3.5">
                    <div className="text-xs font-bold text-neutral-400">송금 대상: 이토스 (토스뱅크)</div>
                    <input
                      type="text"
                      value={demoAmount}
                      onChange={(e) => setDemoAmount(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-bold text-base"
                      style={{ borderRadius: selectedRadius }}
                    />
                    <button
                      onClick={() => setDemoSuccess(true)}
                      className="w-full py-2.5 text-white font-bold text-xs shadow-md"
                      style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}
                    >
                      {demoAmount}원 바로 보내기
                    </button>
                  </div>
                )}

                {/* 10. 이커머스 장바구니 Live Pattern */}
                {selectedPatternId === 'ecommerce-checkout' && (
                  <div className="flex flex-col gap-3">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 flex justify-between items-center" style={{ borderRadius: selectedRadius }}>
                      <span className="text-xs font-bold">디자인 토큰 티셔츠 (L)</span>
                      <span className="text-xs font-black" style={{ color: selectedBrandColor }}>27,000 원</span>
                    </div>
                    <button className="w-full py-2.5 text-white font-bold text-xs" style={{ backgroundColor: selectedBrandColor, borderRadius: selectedRadius }}>
                      27,000원 결제하기
                    </button>
                  </div>
                )}

                {/* 11. 검색 & Empty UX Live Pattern */}
                {selectedPatternId === 'search-empty' && (
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="검색어를 입력해보세요 ('없음' 입력 시 Empty)"
                      value={demoSearch}
                      onChange={(e) => setDemoSearch(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                      style={{ borderRadius: selectedRadius }}
                    />
                    {demoSearch.includes('없음') ? (
                      <div className="p-4 text-center border border-dashed rounded-xl text-xs text-neutral-400">결과가 없습니다.</div>
                    ) : (
                      <div className="p-3 bg-neutral-50 dark:bg-neutral-850 rounded-xl text-xs font-semibold">추천 검색어 결과 리스트</div>
                    )}
                  </div>
                )}

              </div>

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
                <span>Cursor, Antigravity, Claude Code 등에 붙여넣으면 해당 패턴과 토큰이 100% 반영된 코드가 생성됩니다.</span>
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
            <span> — Universal UX Pattern & Token Engine</span>
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
