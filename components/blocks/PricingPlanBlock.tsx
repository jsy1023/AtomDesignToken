'use client';

import React, { useState } from 'react';
import { Check, X, Sparkles, Zap, Shield, Building2 } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  icon: 'zap' | 'sparkles' | 'building';
  features: { text: string; included: boolean }[];
  ctaText: string;
}

const TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: '개인 개발자 및 소규모 사이드 프로젝트를 위한 무료 스타터 팩',
    monthlyPrice: 0,
    annualPrice: 0,
    icon: 'zap',
    ctaText: '무료로 시작하기',
    features: [
      { text: '최대 3개 프로젝트 연동', included: true },
      { text: '기본 W3C DTCG 토큰 명세 제공', included: true },
      { text: 'Tailwind v4 CSS 자동 컴파일', included: true },
      { text: '커스텀 브랜드 테마 에디터', included: false },
      { text: '우선순위 기술 지원 SLA', included: false },
      { text: 'SSO 단일 로그인 및 감사 로그', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    isPopular: true,
    badge: '가장 인기 있는 플랜',
    description: '성장하는 스타트업 및 디자인 시스템 팀을 위한 전문 도구 모음',
    monthlyPrice: 29,
    annualPrice: 22,
    icon: 'sparkles',
    ctaText: '14일 무료 체험 시작',
    features: [
      { text: '무제한 프로젝트 & 토큰 세트', included: true },
      { text: '고급 실시간 차트 & 블록 전체 제공', included: true },
      { text: 'Tailwind v4 / CSS / React 원클릭 내보내기', included: true },
      { text: '커스텀 브랜드 테마 에디터 및 프리셋', included: true },
      { text: '영업일 24시간 내 기술 지원 SLA', included: true },
      { text: 'SSO 단일 로그인 및 감사 로그', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: '엔터프라이즈 보안, 규정 준수, 대규모 팀을 위한 맞춤형 인프라',
    monthlyPrice: 99,
    annualPrice: 79,
    icon: 'building',
    ctaText: '영업팀 문의하기',
    features: [
      { text: '모든 Pro 기능 무제한 포함', included: true },
      { text: '전담 솔루션 아키텍트 지원', included: true },
      { text: '온프레미스 / VPC 프라이빗 배포', included: true },
      { text: '99.99% 시스템 가동률 SLA 보증', included: true },
      { text: 'SSO (SAML, Okta) & 상세 감사 로그', included: true },
      { text: '맞춤형 계약 및 보안성 심사 지원', included: true },
    ],
  },
];

export function PricingPlanBlock() {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');

  const getTierIcon = (icon: PricingTier['icon']) => {
    switch (icon) {
      case 'zap':
        return <Zap className="w-5 h-5 text-blue-500" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'building':
        return <Building2 className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="w-full bg-(--bg-primary) rounded-2xl border border-(--border-subtle) shadow-sm p-5 sm:p-8 transition-colors">
      {/* Header & Billing Toggle */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold text-(--accent-primary) uppercase tracking-wider">
          투명하고 예측 가능한 요금제
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary) tracking-tight mt-1 mb-3">
          팀의 규모에 꼭 맞는 유연한 플랜
        </h3>
        <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
          숨겨진 비용 없이 언제든 플랜을 변경하거나 해지할 수 있습니다. 연간 결제 시 20%의 추가 할인이 적용됩니다.
        </p>

        {/* Toggle Switch */}
        <div className="inline-flex items-center gap-3 p-1 rounded-full bg-(--bg-secondary) border border-(--border-subtle) mt-6">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !isAnnual
                ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs'
                : 'text-(--text-secondary) hover:text-(--text-primary)'
            }`}
          >
            월간 결제
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isAnnual
                ? 'bg-(--accent-primary) text-white shadow-xs'
                : 'text-(--text-secondary) hover:text-(--text-primary)'
            }`}
          >
            <span>연간 결제</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isAnnual ? 'bg-white/20 text-white' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
              }`}
            >
              20% OFF
            </span>
          </button>
        </div>
      </div>

      {/* 3-Column Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {TIERS.map((tier) => {
          const isSelected = selectedPlan === tier.id;
          const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;

          return (
            <div
              key={tier.id}
              onClick={() => setSelectedPlan(tier.id)}
              className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 cursor-pointer ${
                tier.isPopular
                  ? 'border-2 border-(--accent-primary) bg-(--bg-secondary)/40 shadow-md ring-4 ring-(--accent-primary)/10'
                  : 'border border-(--border-strong) bg-(--bg-primary) hover:border-(--accent-primary)/50 shadow-xs'
              }`}
            >
              {/* Popular Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold bg-(--accent-primary) text-white shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                {/* Tier Title & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-(--bg-secondary) border border-(--border-subtle)">
                    {getTierIcon(tier.icon)}
                  </div>
                  {isSelected && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      선택됨
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-(--text-primary)">{tier.name}</h4>
                <p className="text-xs text-(--text-secondary) mt-1 min-h-[32px] leading-relaxed">
                  {tier.description}
                </p>

                {/* Price Display */}
                <div className="my-6 pb-6 border-b border-(--border-subtle)">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-(--text-primary)">
                      \${price}
                    </span>
                    <span className="text-xs text-(--text-muted)">/월 (계정당)</span>
                  </div>
                  <div className="text-[11px] text-(--text-muted) mt-1">
                    {isAnnual ? '연간 일괄 결제 기준' : '매월 자동 갱신'}
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-3 mb-6">
                  <div className="text-[11px] font-semibold text-(--text-muted) uppercase tracking-wider">
                    포함된 핵심 기능
                  </div>
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs">
                      {feat.included ? (
                        <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-(--bg-secondary) text-(--text-muted) flex items-center justify-center shrink-0">
                          <X className="w-2.5 h-2.5" />
                        </div>
                      )}
                      <span className={feat.included ? 'text-(--text-primary)' : 'text-(--text-muted) line-through'}>
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <button
                className={`w-full py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-xs ${
                  tier.isPopular
                    ? 'bg-(--accent-primary) hover:bg-(--accent-hover) text-white'
                    : 'bg-(--bg-secondary) hover:bg-(--border-strong) text-(--text-primary) border border-(--border-subtle)'
                }`}
              >
                {tier.ctaText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
