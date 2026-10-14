'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import {
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  Download,
  Search,
  Navigation,
  ShieldCheck,
  Plane,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Eye,
  Sliders,
  ChevronRight,
  RefreshCw,
  Terminal,
  Calendar,
  Users,
  ArrowRightLeft,
  Share2,
  Bookmark,
  Menu,
  X,
  FileText,
  MapPin,
  PenTool,
  ShoppingCart,
  Phone,
  Navigation2,
  FileCheck
} from 'lucide-react';

import { PATTERNS_COLLECTION, PatternItem, PatternVariant } from '@/lib/data/patterns';

const PATTERNS_DATA = PATTERNS_COLLECTION;
export default function PatternsPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('flight');
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Flight interactive preview state
  const [flightType, setFlightType] = useState<'round' | 'oneWay'>('round');
  const [departure, setDeparture] = useState('서울/인천 (ICN)');
  const [arrival, setArrival] = useState('도쿄/나리타 (NRT)');
  const [passengers, setPassengers] = useState(1);

  // Search interactive preview state
  const [liveSearchQuery, setLiveSearchQuery] = useState('');

  // SMS OTP preview state
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(179);

  // Current selected data
  const currentCategory = PATTERNS_DATA.find((p) => p.id === selectedCategoryId) || PATTERNS_DATA[0];
  const currentVariant = currentCategory.variants[selectedVariantIndex] || currentCategory.variants[0];

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(currentVariant.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([currentVariant.markdown], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `ux-pattern-${currentCategory.id}-${currentVariant.id}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSwapAirport = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#090a0f] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between">
      
      {/* Header */}
      <Header
        rightExtra={
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사완료!' : '.md 복사'}</span>
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
              title="파일 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.md 다운로드</span>
            </button>
          </div>
        }
      />

      {/* Main Container: 2 Column Layout */}
      <div className="max-w-7xl w-full mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Pattern Categories List (4 Cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">UX Pattern 라이브러리</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              AI에게 지시하기 전, 검증된 사용자 경험 패턴을 선택하세요.
            </p>
          </div>

          {/* Quick Filter */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text"
              placeholder="패턴 검색 (예: 네비게이션, 항공권, 인증...)"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pattern Cards List */}
          <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {PATTERNS_DATA.filter((p) => 
              p.title.includes(searchFilter) || 
              p.categoryName.toLowerCase().includes(searchFilter.toLowerCase()) ||
              p.summary.includes(searchFilter)
            ).map((pattern) => {
              const isSelected = pattern.id === selectedCategoryId;
              return (
                <button
                  key={pattern.id}
                  onClick={() => {
                    setSelectedCategoryId(pattern.id);
                    setSelectedVariantIndex(0);
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-850 border-blue-500 shadow-md ring-2 ring-blue-500/10'
                      : 'bg-white/60 dark:bg-neutral-900/60 border-neutral-200/80 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-850'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {pattern.categoryName}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                      {pattern.variants.length}개 세부 패턴
                    </span>
                  </div>

                  <div className="font-bold text-sm text-neutral-900 dark:text-white flex items-center justify-between">
                    <span>{pattern.title}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-blue-500' : 'text-neutral-300 dark:text-neutral-600'}`} />
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {pattern.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Detailed Pattern View & Preview & AI Markdown (8 Cols) */}
        <main className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Top Banner of Selected Pattern */}
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                    {currentCategory.badge}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">ID: {currentCategory.id}</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight mt-2 text-neutral-900 dark:text-white">
                  {currentCategory.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {currentCategory.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 active:scale-95 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '복사됨!' : 'AI 프롬프트 .md 복사'}</span>
                </button>
              </div>
            </div>

            {/* Sub-variant Tabs (다양한 패턴 선택기) */}
            <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 overflow-x-auto pb-1">
              <span className="text-xs font-semibold text-neutral-400 shrink-0 mr-1">세부 패턴:</span>
              {currentCategory.variants.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    selectedVariantIndex === idx
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Live Preview Box */}
          <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  실시간 인터랙티브 프리뷰
                </span>
                <h3 className="text-base font-bold mt-1">{currentVariant.name}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{currentVariant.description}</p>
              </div>
            </div>

            {/* Dynamic Interactive Component Preview by Category */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800 flex items-center justify-center min-h-[220px]">
              
              {/* 1. Flight Booking Preview */}
              {currentCategory.id === 'flight' && (
                <div className="w-full max-w-lg bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
                  {/* Flight Type Toggle */}
                  <div className="flex items-center gap-2 mb-4">
                    <button 
                      onClick={() => setFlightType('round')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        flightType === 'round' ? 'bg-blue-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                      }`}
                    >
                      왕복
                    </button>
                    <button 
                      onClick={() => setFlightType('oneWay')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        flightType === 'oneWay' ? 'bg-blue-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                      }`}
                    >
                      편도
                    </button>
                    <div className="ml-auto text-xs text-neutral-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>성인 {passengers}명 · 일반석</span>
                    </div>
                  </div>

                  {/* Airport Swap Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-center mb-3">
                    <div className="sm:col-span-5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      <span className="text-[10px] text-neutral-400 block font-semibold">출발지</span>
                      <span className="text-xs font-bold">{departure}</span>
                    </div>

                    <div className="sm:col-span-1 flex justify-center">
                      <button 
                        onClick={handleSwapAirport}
                        className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 hover:text-blue-600 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center transition active:scale-90"
                        title="출발지-도착지 맞바꾸기"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="sm:col-span-5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      <span className="text-[10px] text-neutral-400 block font-semibold">도착지</span>
                      <span className="text-xs font-bold">{arrival}</span>
                    </div>
                  </div>

                  {/* Dates Row */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-semibold">가는날</span>
                        <span className="text-xs font-bold">10월 24일 (목)</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-semibold">오는날</span>
                        <span className="text-xs font-bold">{flightType === 'round' ? '10월 28일 (월)' : '선택 안 함'}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2">
                    <Plane className="w-4 h-4" />
                    <span>최저가 항공권 검색하기</span>
                  </button>
                </div>
              )}

              {/* 2. Navigation Preview */}
              {currentCategory.id === 'navigation' && (
                <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-lg">
                  <div className="h-12 px-4 bg-neutral-100 dark:bg-neutral-850 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
                    <div className="font-bold text-xs flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-600" />
                      <span>AtomPortal</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
                      <span className="text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5">홈</span>
                      <span className="text-neutral-500">탐색</span>
                      <span className="text-neutral-500">마이페이지</span>
                    </div>
                    <button className="sm:hidden p-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800">
                      <Menu className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 text-center text-xs text-neutral-400">
                    반응형 뷰포트에 따라 햄버거 메뉴 및 Safe-Area 바텀 탭바로 자동 최적화됩니다.
                  </div>
                </div>
              )}

              {/* 3. Search & Empty State Preview */}
              {currentCategory.id === 'search' && (
                <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
                  <div className="relative mb-3">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input 
                      type="text" 
                      placeholder="검색어를 입력해보세요 ('오류' 입력 시 Empty)"
                      value={liveSearchQuery}
                      onChange={(e) => setLiveSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-medium"
                    />
                  </div>

                  {liveSearchQuery.includes('오류') ? (
                    <div className="p-6 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                      <div className="text-xs font-bold text-neutral-600 dark:text-neutral-300">일치하는 결과가 없습니다</div>
                      <p className="text-[11px] text-neutral-400 mt-1 mb-3">검색어를 초기화하거나 다른 단어로 검색해보세요.</p>
                      <button 
                        onClick={() => setLiveSearchQuery('')}
                        className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold"
                      >
                        검색어 초기화
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-xs">
                      <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 flex justify-between">
                        <span>항공권 최저가 알림 설정</span>
                        <span className="text-[10px] text-neutral-400">추천</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 flex justify-between">
                        <span>네비게이션 드로어 패턴</span>
                        <span className="text-[10px] text-neutral-400">인기</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4. Auth & OTP Preview */}
              {currentCategory.id === 'auth' && (
                <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold">휴대폰 SMS 본인확인</span>
                    <span className="text-xs font-mono font-bold text-rose-500">
                      02:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 mb-4">전송된 6자리 인증번호를 입력해주세요.</p>

                  <div className="flex items-center justify-between gap-2 mb-4">
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <input 
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={otpValues[idx]}
                        onChange={(e) => {
                          const newVals = [...otpValues];
                          newVals[idx] = e.target.value;
                          setOtpValues(newVals);
                        }}
                        className="w-10 h-12 text-center font-bold text-lg rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    ))}
                  </div>

                  <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition">
                    인증 확인 완료
                  </button>
                </div>
              )}

              {/* 5. Blog Reader Preview */}
              {currentCategory.id === 'blog' && (
                <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
                  {/* Reading Progress Indicator */}
                  <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-3 overflow-hidden">
                    <div className="w-2/3 h-full bg-blue-600" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span>읽는 중: 67% 완료</span>
                    <span>예상 소요 시간 4분</span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">UI/UX 디자이너가 AI 시대를 주도하는 방법</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
                    말(자연어)로 디자인 시스템을 지휘하고, 규격화된 토큰과 UX 패턴을 통해 개발자와의 핸드오프 검수 비용을 0으로 만드는 새로운 디자인 패러다임...
                  </p>
                </div>
              )}

            </div>

            {/* Checklist & Anti-patterns Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Do's Checklist */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2.5">
                  <CheckCircle2 className="w-4 h-4" />
                  필수 UX 체크리스트 (Do's)
                </span>
                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                  {currentVariant.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts Anti-patterns */}
              <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mb-2.5">
                  <AlertTriangle className="w-4 h-4" />
                  피해야 할 안티패턴 (Don'ts)
                </span>
                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                  {currentVariant.antiPatterns.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* AI Markdown Instruction Section (복사 및 제공 영역) */}
          <div className="rounded-3xl bg-neutral-900 text-neutral-100 p-6 sm:p-8 border border-neutral-800 shadow-xl flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  AI Agent 지시용 .md 파일 명세서
                </span>
                <p className="text-xs text-neutral-400 mt-1">
                  이 마크다운 가이드를 복사하여 Cursor, Claude Code, Antigravity에게 프롬프트로 던지세요.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white border border-neutral-700 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '복사 완료!' : '클립보드 복사'}</span>
                </button>
                <button
                  onClick={handleDownloadMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.md 다운로드</span>
                </button>
              </div>
            </div>

            {/* Markdown Code Viewer */}
            <div className="relative">
              <pre className="p-5 rounded-2xl bg-neutral-950 text-neutral-300 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800 max-h-[380px] overflow-y-auto whitespace-pre-wrap">
                {currentVariant.markdown}
              </pre>
            </div>
          </div>

        </main>

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 bg-white/50 dark:bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">AtomDesignToken UX Pattern Catalog</span>
            <span> — Agent-Native UX Constitution</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:underline">메인으로 가기</Link>
            <span>v0.1.48</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
