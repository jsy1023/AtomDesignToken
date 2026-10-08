"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight, ArrowDownLeft, ShieldCheck, CreditCard, ChevronRight, Sparkles } from 'lucide-react';

// 테마 정의 (토스 vs 당근)
export const FINANCE_THEMES: Record<string, {
  primary: string;
  primaryLight: string;
  radiusBtn: string;
  radiusCard: string;
  bgSurface: string;
  bgCanvas: string;
  textPrimary: string;
  fontFamily: string;
}> = {
  toss: {
    primary: '#3182F6',
    primaryLight: '#E8F3FF',
    radiusBtn: '16px',
    radiusCard: '20px',
    bgSurface: '#FFFFFF',
    bgCanvas: '#F2F4F6',
    textPrimary: '#191F28',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", sans-serif',
  },
  daangn: {
    primary: '#FF6F0F',
    primaryLight: '#FFF2EB',
    radiusBtn: '12px',
    radiusCard: '14px',
    bgSurface: '#FFFFFF',
    bgCanvas: '#F8F9FA',
    textPrimary: '#212124',
    fontFamily: 'Pretendard, "Noto Sans KR", sans-serif',
  },
};

export function FinanceShowcaseContent({ initialTheme }: { initialTheme?: 'toss' | 'daangn' }) {
  const searchParams = useSearchParams();
  const themeParam = (searchParams?.get('theme') || initialTheme || 'toss').toLowerCase();
  const [activeTheme, setActiveTheme] = useState<'toss' | 'daangn'>(
    themeParam === 'daangn' ? 'daangn' : 'toss'
  );

  useEffect(() => {
    if (themeParam === 'daangn' || themeParam === 'toss') {
      setActiveTheme(themeParam);
    }
  }, [themeParam]);

  // 테마 변경 시 시멘틱 CSS 변수 주입
  useEffect(() => {
    const config = FINANCE_THEMES[activeTheme];
    const styleId = 'atom-theme-finance-style';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
      :root {
        --atom-color-primary: ${config.primary};
        --atom-primary: ${config.primary};
        --color-primary: ${config.primary};
        --atom-primary-light: ${config.primaryLight};
        --atom-radius-btn: ${config.radiusBtn};
        --atom-radius-card: ${config.radiusCard};
        --atom-bg-surface: ${config.bgSurface};
        --atom-bg-canvas: ${config.bgCanvas};
        --atom-text-primary: ${config.textPrimary};
        --atom-font-family: ${config.fontFamily};
      }
    `;
  }, [activeTheme]);

  const config = FINANCE_THEMES[activeTheme];

  return (
    <div
      data-atom-theme={activeTheme}
      className="min-h-full w-full flex flex-col items-center p-4 sm:p-6 transition-colors duration-200"
      style={{
        backgroundColor: `var(--atom-bg-canvas, ${config.bgCanvas})`,
        color: `var(--atom-text-primary, ${config.textPrimary})`,
        fontFamily: `var(--atom-font-family, ${config.fontFamily})`,
      }}
    >
      {/* Top Header & Theme Switcher Bar */}
      <header className="w-full max-w-md flex items-center justify-between py-3 mb-4">
        <div className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
            style={{ backgroundColor: `var(--atom-color-primary, ${config.primary})` }}
          >
            A
          </span>
          <span className="font-extrabold text-base tracking-tight">AtomPay</span>
        </div>

        {/* Live Theme Switcher for Demonstration */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-full shadow-xs border border-gray-200 text-xs">
          <button
            type="button"
            id="theme-btn-toss"
            data-testid="theme-btn-toss"
            onClick={() => setActiveTheme('toss')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              activeTheme === 'toss'
                ? 'bg-[#3182F6] text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Toss
          </button>
          <button
            type="button"
            id="theme-btn-daangn"
            data-testid="theme-btn-daangn"
            onClick={() => setActiveTheme('daangn')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              activeTheme === 'daangn'
                ? 'bg-[#FF6F0F] text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Daangn
          </button>
        </div>
      </header>

      {/* Main Finance App Viewport Container */}
      <main className="w-full max-w-md flex flex-col gap-4 pb-24">
        {/* Banner */}
        <div
          className="p-3.5 flex items-center justify-between text-xs font-semibold shadow-xs transition-all"
          style={{
            backgroundColor: `var(--atom-bg-surface, ${config.bgSurface})`,
            borderRadius: `var(--atom-radius-card, ${config.radiusCard})`,
          }}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={16} style={{ color: `var(--atom-color-primary, ${config.primary})` }} />
            <span>{activeTheme === 'toss' ? '토스 스타일 테마 적용 중' : '당근 스타일 테마 적용 중'}</span>
          </div>
          <span className="font-mono text-[11px] opacity-75">
            {config.primary}
          </span>
        </div>

        {/* Balance Card (명세 3.1 검증 대상: radius-card) */}
        <div
          id="balance-card"
          data-testid="balance-card"
          className="p-6 shadow-md transition-all flex flex-col gap-4"
          style={{
            backgroundColor: `var(--atom-bg-surface, ${config.bgSurface})`,
            borderRadius: `var(--atom-radius-card, ${config.radiusCard})`,
          }}
        >
          <div className="flex justify-between items-center text-xs opacity-70">
            <span>내 토큰 자산 잔액</span>
            <span className="flex items-center gap-1 text-[11px]">
              <ShieldCheck size={14} /> 안전 금고
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold tracking-tight">4,850,000</span>
            <span className="text-xl font-bold">원</span>
          </div>

          {/* Action Buttons: [송금하기], [충전] (명세 3.1 검증 대상: send-money-btn) */}
          <div className="flex gap-2.5 mt-2">
            <button
              type="button"
              id="send-money-btn"
              data-testid="send-money-btn"
              className="flex-1 flex items-center justify-center gap-1.5 py-3.5 px-4 text-white font-bold text-sm shadow-sm hover:opacity-95 active:scale-[0.99] transition-all min-h-[44px]"
              style={{
                backgroundColor: `var(--atom-color-primary, ${config.primary})`,
                borderRadius: `var(--atom-radius-btn, ${config.radiusBtn})`,
              }}
            >
              <ArrowUpRight size={18} />
              송금하기
            </button>
            <button
              type="button"
              id="charge-money-btn"
              data-testid="charge-money-btn"
              className="py-3.5 px-5 font-bold text-sm hover:bg-gray-100 active:scale-[0.99] transition-all min-h-[44px] border border-gray-200"
              style={{
                backgroundColor: 'transparent',
                borderRadius: `var(--atom-radius-btn, ${config.radiusBtn})`,
                color: `var(--atom-text-primary, ${config.textPrimary})`,
              }}
            >
              충전
            </button>
          </div>
        </div>

        {/* Recent Transactions List Card */}
        <div
          className="p-5 shadow-sm transition-all flex flex-col gap-3"
          style={{
            backgroundColor: config.bgSurface,
            borderRadius: config.radiusCard,
          }}
        >
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="font-bold text-sm">최근 활동 내역</span>
            <span className="text-xs opacity-60 flex items-center cursor-pointer">
              전체보기 <ChevronRight size={14} />
            </span>
          </div>

          <div className="flex flex-col divide-y divide-gray-50">
            {[
              { title: '스타벅스 강남점', date: '오늘 14:20', amount: '-6,000원', isIncome: false },
              { title: '홍길동님 입금', date: '어제 19:30', amount: '+50,000원', isIncome: true },
              { title: '마켓컬리', date: '10월 06일', amount: '-32,400원', isIncome: false },
            ].map((tx, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: config.bgCanvas }}
                  >
                    {tx.isIncome ? (
                      <ArrowDownLeft size={18} style={{ color: config.primary }} />
                    ) : (
                      <CreditCard size={18} className="text-gray-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{tx.title}</div>
                    <div className="text-[11px] opacity-60">{tx.date}</div>
                  </div>
                </div>
                <div
                  className="font-extrabold text-sm"
                  style={{
                    color: tx.isIncome ? config.primary : undefined,
                  }}
                >
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Bottom CTA for Mobile Viewport Specification (명세 3.3) */}
      <footer
        id="mobile-bottom-cta"
        data-testid="mobile-bottom-cta"
        className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-md border-t border-gray-200 z-40 flex justify-center shadow-lg"
      >
        <div className="w-full max-w-md flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400">AtomDesignToken</span>
            <span className="text-xs font-bold">1클릭 디자인 시스템 검증</span>
          </div>
          <button
            type="button"
            className="py-2.5 px-5 text-white font-bold text-xs shadow-sm hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center"
            style={{
              backgroundColor: config.primary,
              borderRadius: config.radiusBtn,
            }}
          >
            빠른 이체
          </button>
        </div>
      </footer>
    </div>
  );
}

export default function FinanceShowcasePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
      <FinanceShowcaseContent />
    </Suspense>
  );
}
