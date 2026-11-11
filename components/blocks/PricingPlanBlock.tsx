'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import {
  Check,
  X,
  Sparkles,
} from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: { text: string; included: boolean }[];
  ctaText: string;
}

const TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: '개인 개발자 및 오픈소스 프로젝트를 위한 플랜.',
    monthlyPrice: 0,
    annualPrice: 0,
    ctaText: '무료로 시작하기',
    features: [
      { text: '최대 3개 프로젝트 연동', included: true },
      { text: 'W3C DTCG 표준 토큰 규격', included: true },
      { text: 'Tailwind v4 CSS 즉시 컴파일', included: true },
      { text: '실시간 커스텀 테마 에디터', included: false },
      { text: '우선 기술 지원 SLA', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    isPopular: true,
    badge: '추천 플랜',
    description: '디자인 시스템 확장을 준비하는 프로덕트 팀.',
    monthlyPrice: 29000,
    annualPrice: 22000,
    ctaText: '14일 무료 체험 시작',
    features: [
      { text: '무제한 프로젝트 & 토큰 세트', included: true },
      { text: 'W3C DTCG 표준 토큰 규격', included: true },
      { text: 'Tailwind v4 CSS 즉시 컴파일', included: true },
      { text: '실시간 커스텀 테마 에디터', included: true },
      { text: 'Git 저장소 실시간 동기화', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: '엄격한 보안과 거버넌스가 필요한 엔터프라이즈.',
    monthlyPrice: 99000,
    annualPrice: 79000,
    ctaText: '영업팀 문의',
    features: [
      { text: '무제한 프로젝트 & 전용 빌드 코어', included: true },
      { text: 'W3C DTCG 표준 토큰 규격', included: true },
      { text: 'Tailwind v4 CSS 즉시 컴파일', included: true },
      { text: '실시간 커스텀 테마 에디터', included: true },
      { text: 'SSO, 감사 로그 & 99.99% SLA', included: true },
    ],
  },
];

export function PricingPlanBlock() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <Card className="p-5 sm:p-6 transition-colors">
      {/* 1. Header & Billing Toggle (Using Button & Badge Component) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-(--text-primary)">
            요금제 플랜 선택
          </h3>
          <p className="text-xs text-(--text-secondary) mt-0.5">
            팀의 규모와 워크플로우에 맞는 플랜을 선택하세요.
          </p>
        </div>

        {/* Billing Switch composed with Button components */}
        <div className="flex items-center gap-1 p-0.5 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle) text-xs self-start sm:self-auto">
          <Button
            size="sm"
            variant={billingCycle === 'monthly' ? 'primary' : 'ghost'}
            onClick={() => setBillingCycle('monthly')}
            className="text-xs py-1 px-3 h-auto"
          >
            월간 결제
          </Button>
          <Button
            size="sm"
            variant={billingCycle === 'annual' ? 'primary' : 'ghost'}
            onClick={() => setBillingCycle('annual')}
            className="text-xs py-1 px-3 h-auto flex items-center gap-1"
          >
            <span>연간 결제</span>
            <Badge variant="success" className="text-xs px-1.5 py-0 font-bold">
              -20%
            </Badge>
          </Button>
        </div>
      </div>

      {/* 2. Three Column Pricing Cards composed with Card & Button */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TIERS.map((tier) => {
          const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
          return (
            <Card
              key={tier.id}
              className={`p-5 flex flex-col justify-between transition-colors bg-(--bg-primary) ${
                tier.isPopular
                  ? 'border-(--text-primary)'
                  : 'border-(--border-subtle)'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm text-(--text-primary)">{tier.name}</h4>
                  {tier.badge && (
                    <Badge variant="primary" className="text-xs">
                      {tier.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-(--text-secondary) mb-4 leading-relaxed">
                  {tier.description}
                </p>

                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-2xl font-bold tracking-tight text-(--text-primary)">
                    ₩{price.toLocaleString()}
                  </span>
                  <span className="text-xs text-(--text-secondary)">/월</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-(--border-subtle) text-xs">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {feat.included ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-(--text-muted) shrink-0 opacity-40" />
                      )}
                      <span className={feat.included ? 'text-(--text-primary)' : 'text-(--text-muted) line-through opacity-60'}>
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant={tier.isPopular ? 'primary' : 'secondary'}
                size="md"
                className="w-full mt-6 text-xs"
              >
                {tier.ctaText}
              </Button>
            </Card>
          );
        })}
      </div>
    </Card>
  );
}
