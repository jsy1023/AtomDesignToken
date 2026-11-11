'use client';

import React, { useState } from 'react';
import {
  Users,
  HardDrive,
  Cpu,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  Layers,
} from 'lucide-react';

interface ShowcaseSlide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  gradient: string;
  stats: string;
}

const SLIDES: ShowcaseSlide[] = [
  {
    id: 1,
    tag: 'W3C DTCG Engine',
    title: '디자인 토큰 컴파일러',
    subtitle: 'JSON 명세로부터 Tailwind, CSS Variables, SCSS 코드를 0KB 런타임으로 즉시 변환합니다.',
    gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
    stats: '빌드 속도 12ms',
  },
  {
    id: 2,
    tag: 'Universal A11y',
    title: 'WCAG 2.1 AAA 고대비 컬러',
    subtitle: '명도 대비 7:1을 항상 충족하는 색상 스케일 매핑을 자동 보증합니다.',
    gradient: 'from-purple-600/20 via-pink-600/10 to-transparent',
    stats: '접근성 통과율 100%',
  },
  {
    id: 3,
    tag: 'Zero-Runtime',
    title: '크로스 프레임워크 호환성',
    subtitle: 'React, Vue, Svelte, Angular, 그리고 순수 바닐라 HTML까지 단 하나의 코드로 동작합니다.',
    gradient: 'from-emerald-600/20 via-teal-600/10 to-transparent',
    stats: '런타임 오버헤드 0KB',
  },
];

export function SliderShowcaseBlock() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'carousel'>('calculator');

  // Calculator State
  const [teamMembers, setTeamMembers] = useState<number>(18);
  const [storageGb, setStorageGb] = useState<number>(350);
  const [computeUnits, setComputeUnits] = useState<number>(4);
  const [isAnnualBilling, setIsAnnualBilling] = useState<boolean>(true);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Dynamic Calculation
  const basePrice = teamMembers * 9 + Math.round(storageGb * 0.12) + computeUnits * 35;
  const discountMultiplier = isAnnualBilling ? 0.8 : 1.0;
  const finalPrice = Math.round(basePrice * discountMultiplier);
  const annualSavings = Math.round(basePrice * 12 * 0.2);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-(--bg-primary) rounded-2xl border border-(--border-subtle) shadow-sm p-5 sm:p-6 transition-colors">
      {/* Header and Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-(--border-subtle)">
        <div>
          <span className="text-[11px] font-semibold text-(--accent-primary) uppercase tracking-wider">
            인터랙티브 슬라이더 모듈
          </span>
          <h3 className="text-lg font-bold text-(--text-primary) mt-0.5">
            {activeTab === 'calculator' ? '실시간 사용량 & 비용 견적 시뮬레이터' : '피처 하이라이트 인터랙티브 캐러셀'}
          </h3>
        </div>

        <div className="flex bg-(--bg-secondary) p-1 rounded-xl border border-(--border-subtle) text-xs">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'calculator'
                ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs'
                : 'text-(--text-secondary) hover:text-(--text-primary)'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>비용 슬라이더</span>
          </button>
          <button
            onClick={() => setActiveTab('carousel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'carousel'
                ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs'
                : 'text-(--text-secondary) hover:text-(--text-primary)'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>쇼케이스 캐러셀</span>
          </button>
        </div>
      </div>

      {activeTab === 'calculator' ? (
        /* Tab 1: Interactive Cost Calculator Slider */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
          {/* Left: Sliders Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slider 1: Team Members */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-(--text-primary) flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-(--accent-primary)" />
                  활성 팀원 수 (Team Members)
                </span>
                <span className="font-mono font-bold text-sm text-(--accent-primary) bg-(--accent-primary)/10 px-2 py-0.5 rounded-md">
                  {teamMembers} 명
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={teamMembers}
                onChange={(e) => setTeamMembers(Number(e.target.value))}
                className="w-full h-2 bg-(--bg-secondary) rounded-lg appearance-none cursor-pointer accent-(--accent-primary)"
              />
              <div className="flex justify-between text-[10px] text-(--text-muted)">
                <span>1명 (Solo)</span>
                <span>50명 (Team)</span>
                <span>100명 (Enterprise)</span>
              </div>
            </div>

            {/* Slider 2: Storage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-(--text-primary) flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-emerald-500" />
                  클라우드 스토리지 용량 (Storage)
                </span>
                <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {storageGb} GB
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={storageGb}
                onChange={(e) => setStorageGb(Number(e.target.value))}
                className="w-full h-2 bg-(--bg-secondary) rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-(--text-muted)">
                <span>10 GB</span>
                <span>500 GB</span>
                <span>1,000 GB (1TB)</span>
              </div>
            </div>

            {/* Slider 3: Compute */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-(--text-primary) flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-purple-500" />
                  병렬 빌드 & 연산 인스턴스 (Compute Units)
                </span>
                <span className="font-mono font-bold text-sm text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                  {computeUnits} CU
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={computeUnits}
                onChange={(e) => setComputeUnits(Number(e.target.value))}
                className="w-full h-2 bg-(--bg-secondary) rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[10px] text-(--text-muted)">
                <span>1 CU</span>
                <span>8 CU</span>
                <span>16 CU (Ultra)</span>
              </div>
            </div>
          </div>

          {/* Right: Price Receipt Card (5 Cols) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-(--bg-secondary) border border-(--border-strong) flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-(--text-secondary)">결제 주기 선택</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] ${!isAnnualBilling ? 'font-bold text-(--text-primary)' : 'text-(--text-muted)'}`}>월간</span>
                  <button
                    onClick={() => setIsAnnualBilling(!isAnnualBilling)}
                    aria-label="결제 주기 토글"
                    className="w-10 h-5 rounded-full bg-(--accent-primary) p-0.5 flex items-center transition-colors"
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        isAnnualBilling ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className={`text-[11px] ${isAnnualBilling ? 'font-bold text-(--accent-primary)' : 'text-(--text-muted)'}`}>연간 (-20%)</span>
                </div>
              </div>

              <div className="space-y-2 py-3 border-y border-(--border-subtle) text-xs">
                <div className="flex justify-between text-(--text-secondary)">
                  <span>팀원 라이선스 ({teamMembers}명)</span>
                  <span className="font-medium text-(--text-primary)">₩{(teamMembers * 12000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-(--text-secondary)">
                  <span>스토리지 ({storageGb}GB)</span>
                  <span className="font-medium text-(--text-primary)">₩{(storageGb * 150).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-(--text-secondary)">
                  <span>연산 인스턴스 ({computeUnits}CU)</span>
                  <span className="font-medium text-(--text-primary)">₩{(computeUnits * 45000).toLocaleString()}</span>
                </div>
                {isAnnualBilling && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>연간 결제 프로모션 할인</span>
                    <span>-20% 적용</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-xs text-(--text-muted)">월 예상 결제 금액</span>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-(--text-primary)">
                    \${finalPrice}
                  </span>
                  <span className="text-xs text-(--text-muted)"> /월</span>
                </div>
              </div>

              {isAnnualBilling && (
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg mb-3 flex items-center justify-between">
                  <span>연간 결제 시 연간 절감액</span>
                  <span className="font-bold">\${annualSavings} 절약</span>
                </div>
              )}

              <button className="w-full py-2.5 rounded-xl bg-(--accent-primary) hover:bg-(--accent-hover) text-white font-semibold text-xs shadow-xs transition-colors">
                이 견적으로 즉시 시작하기
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: Carousel Showcase */
        <div className="pt-6">
          <div className="relative overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--bg-secondary)/40 p-6 sm:p-10 min-h-[280px] flex flex-col justify-between">
            {/* Background gradient decorative */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${SLIDES[currentSlide].gradient} pointer-events-none transition-all duration-500`}
            />

            <div className="relative z-10 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-(--accent-primary)/15 text-(--accent-primary) mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {SLIDES[currentSlide].tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-(--text-primary) tracking-tight mb-2">
                {SLIDES[currentSlide].title}
              </h3>
              <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                {SLIDES[currentSlide].subtitle}
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-(--border-subtle) mt-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-(--text-primary)">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>검증 메트릭: {SLIDES[currentSlide].stats}</span>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                {/* Dots */}
                <div className="flex items-center gap-1.5 mr-2">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`슬라이드 ${i + 1}로 이동`}
                      className={`h-1.5 rounded-full transition-all ${
                        currentSlide === i ? 'w-6 bg-(--accent-primary)' : 'w-2 bg-(--border-strong)'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={prevSlide}
                  aria-label="이전 슬라이드"
                  className="p-2 rounded-lg bg-(--bg-primary) hover:bg-(--border-subtle) text-(--text-primary) border border-(--border-subtle) transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="다음 슬라이드"
                  className="p-2 rounded-lg bg-(--bg-primary) hover:bg-(--border-subtle) text-(--text-primary) border border-(--border-subtle) transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
