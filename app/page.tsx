'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Terminal,
  Layers,
  Wand2,
  Code2,
  Sliders,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Send,
  Eye,
  Settings2,
  Workflow,
  ShieldCheck,
  Cpu,
  Palette,
  FileJson,
  LayoutGrid
} from 'lucide-react';

// Preset color options
const COLOR_PRESETS = [
  { name: 'Toss Blue', value: '#3182f6', text: 'Vivid Blue' },
  { name: 'Daangn Orange', value: '#ff6f0f', text: 'Warm Orange' },
  { name: 'Hyper Violet', value: '#7c3aed', text: 'Modern Violet' },
  { name: 'Forest Emerald', value: '#10b981', text: 'Eco Emerald' },
  { name: 'Minimal Dark', value: '#18181b', text: 'Dark Neutral' },
];

const RADIUS_PRESETS = [
  { label: 'Sharp', value: '6px' },
  { label: 'Soft', value: '12px' },
  { label: 'Bold', value: '18px' },
  { label: 'Pill', value: '9999px' },
];

export default function Home() {
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Studio Interactive State
  const [selectedPattern, setSelectedPattern] = useState<'transfer' | 'search' | 'auth'>('transfer');
  const [brandColor, setBrandColor] = useState('#3182f6');
  const [radius, setRadius] = useState('14px');
  const [fontSizeScale, setFontSizeScale] = useState<'normal' | 'large'>('normal');

  // Preview Interactive State
  const [transferState, setTransferState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'tokens' | 'prompt'>('preview');

  const copyCli = () => {
    navigator.clipboard.writeText('npx atomsystem init');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const currentPrompt = `[AtomDesignToken AI 지침]
- UX 패턴: ${selectedPattern === 'transfer' ? '안전 결제/송금 확인 플로우' : selectedPattern === 'search' ? '실시간 검색 & Empty/Skeleton 피드백' : '유효성 검사 폼 & 비동기 인증'}
- 브랜드 토큰:
  * Primary Color: ${brandColor}
  * Border Radius: ${radius}
  * Typography Scale: ${fontSizeScale === 'large' ? '1.125rem base' : '1rem base'}
- 규칙:
  1. atom-btn, atom-card, atom-input 시멘틱 클래스 필수 사용
  2. 비동기 요청 시 Loading Spinner 및 중복 클릭 방지 처리
  3. 에러 발생 시 인라인 피드백 노출`;

  const tokensJson = `{
  "color": {
    "brand": {
      "primary": { "value": "${brandColor}", "type": "color" }
    }
  },
  "border": {
    "radius": {
      "base": { "value": "${radius}", "type": "borderRadius" }
    }
  },
  "typography": {
    "scale": { "value": "${fontSizeScale === 'large' ? '1.125' : '1.0'}", "type": "dimension" }
  }
}`;

  return (
    <main className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#fafafa] dark:bg-[#090a0f] text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Decorative Background Lighting */}
      <div 
        className="absolute top-[-14rem] left-1/2 -translate-x-1/2 w-[850px] h-[450px] opacity-25 dark:opacity-20 blur-[130px] pointer-events-none rounded-full transition-all duration-500"
        style={{ background: `radial-gradient(circle, ${brandColor} 0%, transparent 70%)` }}
      />
      <div className="absolute top-[30rem] right-[-10rem] w-[500px] h-[300px] bg-purple-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#090a0f]/70 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="max-w-6xl w-full mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: brandColor }}
            >
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight">AtomDesignToken</span>
              <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                Agent-Native
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <Link href="/patterns" className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UX 패턴</span>
            </Link>
            <Link href="/components" className="hover:text-neutral-900 dark:hover:text-white transition flex items-center gap-1 font-semibold">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>컴포넌트 갤러리</span>
            </Link>
            <a href="#studio" className="hover:text-neutral-900 dark:hover:text-white transition">라이브 스튜디오</a>
            <a href="#workflow" className="hover:text-neutral-900 dark:hover:text-white transition">4-Step 작업</a>
            <a href="#liberation" className="hover:text-neutral-900 dark:hover:text-white transition">피그마 해방</a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={copyCli}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
              title="명령어 복사"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>npx atomsystem init</span>
              {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-12 text-center flex flex-col items-center">
        {/* Pre-header Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-xs font-bold text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>UI/UX 디자이너의 피그마 해방 🚀</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.18] mb-6">
          디자이너, 이제부터는<br />
          <span 
            className="bg-clip-text text-transparent transition-all duration-300"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${brandColor}, #6366f1, #a855f7)` 
            }}
          >
            말로 디자인하는 시대
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-300 mb-10 leading-relaxed font-normal">
          오토레이아웃과 픽셀을 깎는 노동은 끝났습니다.<br className="hidden sm:inline" />
          검증된 <strong className="font-semibold text-neutral-900 dark:text-white">UX 패턴</strong>을 선택하고 <strong className="font-semibold text-neutral-900 dark:text-white">브랜드 토큰</strong>을 정하면,
          AI가 오차 없는 프로덕트 코드로 즉시 완성합니다.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/patterns"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>UX 패턴 라이브러리 가기</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <a 
            href="#studio" 
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-[0.98] transition-all"
          >
            <Sliders className="w-4 h-4 text-neutral-500" />
            <span>라이브 스튜디오 체험</span>
          </a>

          <a
            href="#workflow"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 font-semibold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-[0.98] transition-all"
          >
            <Workflow className="w-4 h-4 text-neutral-400" />
            <span>4단계 워크플로우</span>
          </a>
        </div>
      </section>

      {/* Interactive Studio Playground Section */}
      <section id="studio" className="relative z-10 max-w-6xl w-full mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-2">Live Interactive Studio</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            직접 선택하고 바꿔보세요: 실시간 디자인 시스템
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            UX 패턴과 토큰 값을 조정하면, AI 프롬프트와 실제 렌더링 UI가 실시간으로 동기화됩니다.
          </p>
        </div>

        {/* Studio Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-neutral-900/90 rounded-3xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl backdrop-blur-xl">
          
          {/* Controls Column (Left, 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Step 1: UX Pattern Selector */}
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-850/60 border border-neutral-200/70 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                  UX Pattern 선택
                </span>
                <span className="text-[11px] text-neutral-400">AI의 UX 안티패턴 방지</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => { setSelectedPattern('transfer'); setTransferState('idle'); }}
                  className={`p-3 rounded-xl text-left border transition-all flex items-start justify-between ${
                    selectedPattern === 'transfer'
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                      : 'border-neutral-200 dark:border-neutral-750 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold">계좌 송금 & 확인 플로우</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">금액 포맷팅 + 2단계 확인 + 로딩 방어 UX</div>
                  </div>
                  {selectedPattern === 'transfer' && <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                </button>

                <button
                  onClick={() => { setSelectedPattern('search'); setSearchQuery(''); }}
                  className={`p-3 rounded-xl text-left border transition-all flex items-start justify-between ${
                    selectedPattern === 'search'
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                      : 'border-neutral-200 dark:border-neutral-750 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold">검색 & 필터 & 빈 상태 (Empty)</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">실시간 인풋 + 결과 없음(Empty State) + 초기화</div>
                  </div>
                  {selectedPattern === 'search' && <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                </button>

                <button
                  onClick={() => setSelectedPattern('auth')}
                  className={`p-3 rounded-xl text-left border transition-all flex items-start justify-between ${
                    selectedPattern === 'auth'
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                      : 'border-neutral-200 dark:border-neutral-750 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold">폼 유효성 검사 & 인증 플로우</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">실시간 인라인 피드백 + 에러 바운더리 UX</div>
                  </div>
                  {selectedPattern === 'auth' && <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                </button>
              </div>
            </div>

            {/* Step 2: Brand Tokens Configurator */}
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-850/60 border border-neutral-200/70 dark:border-neutral-800 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                브랜드 디자인 토큰 설정
              </span>

              {/* Color Presets */}
              <div>
                <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 block mb-2">
                  브랜드 메인 컬러
                </label>
                <div className="flex items-center gap-2.5">
                  {COLOR_PRESETS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setBrandColor(c.value)}
                      className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center shadow-sm ${
                        brandColor === c.value ? 'scale-125 ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-neutral-900' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    >
                      {brandColor === c.value && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                  <div className="ml-auto flex items-center gap-1.5">
                    <input 
                      type="color" 
                      value={brandColor} 
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono text-neutral-400">{brandColor}</span>
                  </div>
                </div>
              </div>

              {/* Border Radius Presets */}
              <div>
                <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 block mb-2">
                  라운딩 (Border Radius): <span className="font-mono text-blue-600 dark:text-blue-400">{radius}</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {RADIUS_PRESETS.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => setRadius(r.value)}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition ${
                        radius === r.value 
                          ? 'border-blue-500 bg-white dark:bg-neutral-800 shadow-sm text-blue-600 dark:text-blue-400' 
                          : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Scale */}
              <div>
                <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 block mb-2">
                  타이포그래피 스케일
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFontSizeScale('normal')}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition ${
                      fontSizeScale === 'normal'
                        ? 'border-blue-500 bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400'
                        : 'border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    Standard (16px)
                  </button>
                  <button
                    onClick={() => setFontSizeScale('large')}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition ${
                      fontSizeScale === 'large'
                        ? 'border-blue-500 bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400'
                        : 'border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    Expressive (18px)
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Live Output & Code Column (Right, 7 cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50/50 dark:bg-neutral-950/60">
            
            {/* Tab Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-100/80 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeTab === 'preview' 
                      ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white' 
                      : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>실시간 UI 렌더링</span>
                </button>
                <button
                  onClick={() => setActiveTab('tokens')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeTab === 'tokens' 
                      ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white' 
                      : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                >
                  <FileJson className="w-3.5 h-3.5" />
                  <span>tokens.json</span>
                </button>
                <button
                  onClick={() => setActiveTab('prompt')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeTab === 'prompt' 
                      ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white' 
                      : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                >
                  <Wand2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>AI 전달 가이드</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-neutral-400">
                Live Synced
              </span>
            </div>

            {/* Tab Content 1: Live Interactive Component Preview */}
            {activeTab === 'preview' && (
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center items-center">
                
                {/* Pattern 1: Transfer Flow */}
                {selectedPattern === 'transfer' && (
                  <div 
                    className="w-full max-w-md bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl transition-all"
                    style={{ borderRadius: radius }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-sm">토스뱅크 계좌 송금</h4>
                        <p className="text-xs text-neutral-400 mt-0.5">내 잔액: 1,420,000원</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                        안심 이체
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs font-semibold text-neutral-500 mb-1">보낼 금액</div>
                      <div className="relative">
                        <input 
                          type="text" 
                          readOnly
                          value="50,000 원" 
                          className="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-bold text-base"
                          style={{ borderRadius: radius }}
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-50 dark:bg-neutral-850 rounded-xl mb-5 text-xs text-neutral-500 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>수수료 무료 · 토큰 기반 즉시 확인 플로우</span>
                    </div>

                    {transferState === 'idle' && (
                      <button
                        onClick={() => {
                          setTransferState('sending');
                          setTimeout(() => setTransferState('success'), 1200);
                        }}
                        className="w-full py-3 text-white font-bold text-sm shadow-lg hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        style={{ backgroundColor: brandColor, borderRadius: radius }}
                      >
                        <Send className="w-4 h-4" />
                        <span>50,000원 보내기</span>
                      </button>
                    )}

                    {transferState === 'sending' && (
                      <button
                        disabled
                        className="w-full py-3 text-white font-bold text-sm opacity-80 cursor-not-allowed flex items-center justify-center gap-2"
                        style={{ backgroundColor: brandColor, borderRadius: radius }}
                      >
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>안전하게 전송 중...</span>
                      </button>
                    )}

                    {transferState === 'success' && (
                      <div className="text-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>송금이 정상적으로 완료되었습니다!</span>
                        </div>
                        <button 
                          onClick={() => setTransferState('idle')}
                          className="mt-2 text-[11px] underline text-neutral-500 hover:text-neutral-800"
                        >
                          다시 테스트하기
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Pattern 2: Search & Filter & Empty State */}
                {selectedPattern === 'search' && (
                  <div 
                    className="w-full max-w-md bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl transition-all"
                    style={{ borderRadius: radius }}
                  >
                    <div className="relative mb-4">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input 
                        type="text" 
                        placeholder="아이템 검색 ('없음' 입력 시 Empty UX)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium"
                        style={{ borderRadius: radius }}
                      />
                    </div>

                    {searchQuery.includes('없음') ? (
                      <div className="p-8 text-center flex flex-col items-center justify-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 mb-2">
                          <Search className="w-5 h-5 opacity-40" />
                        </div>
                        <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300">검색 결과가 없습니다</div>
                        <p className="text-[11px] text-neutral-400 mt-1 mb-3">검색어를 다시 확인하거나 초기화해보세요.</p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="px-3 py-1.5 text-white text-xs font-semibold shadow"
                          style={{ backgroundColor: brandColor, borderRadius: radius }}
                        >
                          검색어 초기화
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {['토스 스타일 컴포넌트 세트', '바텀시트 피드백 모달', '반응형 내비게이션 바'].map((item, idx) => (
                          <div 
                            key={idx}
                            className="p-3 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-medium"
                            style={{ borderRadius: radius }}
                          >
                            <span>{item}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">atom-item</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Pattern 3: Auth Validation */}
                {selectedPattern === 'auth' && (
                  <div 
                    className="w-full max-w-md bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl transition-all"
                    style={{ borderRadius: radius }}
                  >
                    <h4 className="font-bold text-sm mb-1">안전 로그인 & 본인인증</h4>
                    <p className="text-xs text-neutral-400 mb-4">실시간 유효성 피드백이 적용된 폼 UX</p>

                    <div className="mb-3">
                      <label className="text-[11px] font-semibold text-neutral-500 mb-1 block">이메일 주소</label>
                      <input 
                        type="email"
                        defaultValue="designer@company.com"
                        className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                        style={{ borderRadius: radius }}
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-neutral-500">비밀번호</label>
                        <span className="text-[10px] text-rose-500 font-medium">8자 이상 필수</span>
                      </div>
                      <input 
                        type="password"
                        defaultValue="1234"
                        className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-rose-300 dark:border-rose-900 text-xs"
                        style={{ borderRadius: radius }}
                      />
                      <div className="text-[10px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>비밀번호는 최소 8자 이상이어야 합니다.</span>
                      </div>
                    </div>

                    <button
                      className="w-full py-2.5 text-white font-bold text-xs shadow-md transition"
                      style={{ backgroundColor: brandColor, borderRadius: radius }}
                    >
                      로그인 및 토큰 검증
                    </button>
                  </div>
                )}

                <div className="mt-4 text-center">
                  <span className="text-[11px] text-neutral-400">
                    💡 왼쪽 컨트롤러에서 컬러나 라운드를 바꾸면 위 컴포넌트가 즉시 리디자인됩니다.
                  </span>
                </div>
              </div>
            )}

            {/* Tab Content 2: tokens.json */}
            {activeTab === 'tokens' && (
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-neutral-400 mb-2 flex items-center justify-between">
                    <span>tokens/tokens.json (W3C DTCG Format)</span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">Single Source of Truth</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-neutral-900 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800">
                    {tokensJson}
                  </pre>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs text-blue-700 dark:text-blue-300">
                  ✨ 이 파일의 수치만 바꾸면 전체 프론트엔드 제품의 디자인이 한 번에 자동 재컴파일됩니다.
                </div>
              </div>
            )}

            {/* Tab Content 3: AI Prompt */}
            {activeTab === 'prompt' && (
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-neutral-400 mb-2 flex items-center justify-between">
                    <span>AI Agent 주입용 가이드 (.agents/rules)</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(currentPrompt);
                        setCopiedPrompt(true);
                        setTimeout(() => setCopiedPrompt(false), 2000);
                      }}
                      className="flex items-center gap-1 text-[11px] text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {copiedPrompt ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPrompt ? '복사됨!' : '프롬프트 복사'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-neutral-900 text-neutral-200 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800 whitespace-pre-wrap">
                    {currentPrompt}
                  </pre>
                </div>
                <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-xs text-purple-700 dark:text-purple-300">
                  🤖 Cursor, Claude Code, Antigravity 등 어떤 AI에게든 이 가이드만 주면 환각 없는 코드가 작성됩니다.
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 4-Step Workflow Section */}
      <section id="workflow" className="relative z-10 max-w-6xl w-full mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>Workflow Revolution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            이제는 완전히 달라진 디자인 작업 4단계
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            피그마에서 수작업으로 그리던 고통을 끝내고, AI와 함께 지휘하는 새로운 방식입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-4 shadow-lg shadow-blue-500/20">
              01
            </div>
            <h3 className="font-bold text-base mb-2">UX Pattern 선택</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              "AI에게 어떤 화면을 만들라고 지시해야 할지 막막한가요?"<br />
              검색, 폼 검증, 송금 확인 등 검증된 <strong>UX 안티패턴 방지 템플릿</strong>을 먼저 선택하세요.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4 shadow-lg shadow-indigo-500/20">
              02
            </div>
            <h3 className="font-bold text-base mb-2">브랜드 토큰 설정</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              메인 브랜드 컬러, 라운딩, 텍스트 크기를 설정하세요.<br />
              W3C 표준 디자인 토큰으로 나만의 <strong>시멘틱 테마 시스템</strong>이 즉시 생성됩니다.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm mb-4 shadow-lg shadow-purple-500/20">
              03
            </div>
            <h3 className="font-bold text-base mb-2">AI에게 요청</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              AI에게 말만 걸면, AtomDesignToken의 규격 컴포넌트(`atom-*`) 기반으로 <strong>오차 없는 완성형 화면</strong>을 코딩합니다.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-4 shadow-lg shadow-emerald-500/20">
              04
            </div>
            <h3 className="font-bold text-base mb-2">1초 리디자인</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              디자인을 바꾸고 싶다면? 생성된 <code className="text-emerald-600 dark:text-emerald-400 font-mono">tokens.json</code> 파일만 수정하세요. 전체 제품의 룩앤필이 실시간으로 바뀝니다.
            </p>
          </div>

        </div>
      </section>

      {/* Liberation Section: Before vs After */}
      <section id="liberation" className="relative z-10 max-w-5xl w-full mx-auto px-6 py-20">
        <div className="p-1 rounded-3xl bg-gradient-to-b from-neutral-200 to-transparent dark:from-neutral-800 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
          <div className="bg-white dark:bg-neutral-900 rounded-[22px] p-8 sm:p-12">
            
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                The Liberation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                UI/UX 디자이너의 피그마 해방
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                픽셀을 옮기던 시간에 사용자의 문제와 비즈니스 경험을 기획하세요.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Before */}
              <div className="p-6 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                <div className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  기존의 피그마 노동 (Before)
                </div>
                <ul className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>반응형 오토레이아웃 맞추느라 프레임 뜯고 리사이징 무한 반복</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>버튼 하나당 Hover, Active, Disabled, Loading 등 배리언트 30개 수작업 복제</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>"패딩 2px 틀렸어요" 개발자와 메신저로 며칠 동안 실랑이</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>AI에게 코딩 맡겼더니 엉뚱한 임의 스타일과 깨진 UX 출력</span>
                  </li>
                </ul>
              </div>

              {/* After */}
              <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40">
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  AtomDesignToken (After)
                </div>
                <ul className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold shrink-0">✓</span>
                    <span><strong>자연어 한마디:</strong> "모바일은 바텀시트, 데스크톱은 센터 모달로 해줘"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold shrink-0">✓</span>
                    <span><strong>UX 패턴 내장:</strong> 로딩 스켈레톤, 빈 상태(Empty), 인라인 에러 자동 구축</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold shrink-0">✓</span>
                    <span><strong>실시간 100% 일치:</strong> 토큰 기반 CSS로 개발자 검수 논쟁 원천 차단</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold shrink-0">✓</span>
                    <span><strong>완벽한 AI 통제:</strong> AI Agent에게 헌법처럼 작동하는 규격 가이드 주입</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* shadcn for Design Tokens (Architecture Section) */}
      <section id="architecture" className="relative z-10 max-w-5xl w-full mx-auto px-6 py-16 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-100 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>라이브러리인가 플랫폼인가?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            shadcn이 컴포넌트를 복붙해 소유하게 했듯,<br />
            우리는 <span className="text-blue-600 dark:text-blue-400">토큰과 UX 가이드의 소유권</span>을 당신에게 넘깁니다.
          </h2>

          <p className="max-w-2xl mx-auto text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
            무거운 블랙박스 npm 패키지에 갇히지 마세요. 웹에서는 가볍게 프리뷰하고 고른 뒤,  
            프로젝트에는 토큰 파일과 AI 가이드를 심어 자유롭게 커스텀하세요.  
            React, Vue, 바닐라 HTML 어디서나 100% 동작합니다.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3">
            <button 
              onClick={copyCli}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-xs shadow-lg hover:opacity-90 transition"
            >
              <Terminal className="w-4 h-4 text-blue-500" />
              <span>npx atomsystem init</span>
              {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
            </button>
            <span className="text-xs text-neutral-400">명령어 한 줄로 프로젝트에 즉시 세팅</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-200 dark:border-neutral-800 py-10 bg-white/50 dark:bg-neutral-950/50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">AtomDesignToken</span>
            <span>— The Agent-Native UX & Design Token System</span>
          </div>
          <div className="flex items-center gap-6">
            <span>React · Vue · Angular · Vanilla HTML 호환</span>
            <span className="font-mono">v0.1.48</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
