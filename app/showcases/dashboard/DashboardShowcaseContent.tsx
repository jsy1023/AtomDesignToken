"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Activity, 
  Layers, 
  TrendingUp, 
  Settings, 
  Bell, 
  Search,
  CheckCircle2
} from 'lucide-react';

export const DASHBOARD_THEMES: Record<string, {
  primary: string;
  radiusBtn: string;
  radiusCard: string;
  bgSurface: string;
  bgCanvas: string;
  textPrimary: string;
  fontFamily: string;
}> = {
  toss: {
    primary: '#3182F6',
    radiusBtn: '16px',
    radiusCard: '20px',
    bgSurface: '#FFFFFF',
    bgCanvas: '#F2F4F6',
    textPrimary: '#191F28',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", sans-serif',
  },
  daangn: {
    primary: '#FF6F0F',
    radiusBtn: '12px',
    radiusCard: '14px',
    bgSurface: '#FFFFFF',
    bgCanvas: '#F8F9FA',
    textPrimary: '#212124',
    fontFamily: 'Pretendard, "Noto Sans KR", sans-serif',
  },
};

export function DashboardShowcaseContent({ initialTheme }: { initialTheme?: 'toss' | 'daangn' }) {
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

  useEffect(() => {
    const config = DASHBOARD_THEMES[activeTheme];
    const styleId = 'atom-theme-dashboard-style';
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
        --atom-radius-btn: ${config.radiusBtn};
        --atom-radius-card: ${config.radiusCard};
        --atom-bg-surface: ${config.bgSurface};
        --atom-bg-canvas: ${config.bgCanvas};
        --atom-text-primary: ${config.textPrimary};
        --atom-font-family: ${config.fontFamily};
      }
    `;
  }, [activeTheme]);

  const config = DASHBOARD_THEMES[activeTheme];

  return (
    <div
      data-atom-theme={activeTheme}
      className="flex min-h-full w-full transition-colors duration-200"
      style={{
        backgroundColor: `var(--atom-bg-canvas, ${config.bgCanvas})`,
        color: `var(--atom-text-primary, ${config.textPrimary})`,
        fontFamily: `var(--atom-font-family, ${config.fontFamily})`,
      }}
    >
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col shrink-0 shadow-xs">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
              style={{ backgroundColor: `var(--atom-color-primary, ${config.primary})` }}
            >
              A
            </span>
            <span className="font-extrabold text-base tracking-tight">Atom Admin</span>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1.5">
          {/* Active Navigation Item (명세 3.2 검증 대상: active-nav-badge) */}
          <div
            id="active-nav-badge"
            data-testid="active-nav-badge"
            className="flex items-center justify-between px-3.5 py-2.5 text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
            style={{
              backgroundColor: `var(--atom-color-primary, ${config.primary})`,
              borderRadius: `var(--atom-radius-btn, ${config.radiusBtn})`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <Layers size={18} />
              <span>대시보드 홈</span>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
              Live
            </span>
          </div>

          {[
            { name: '통계 분석', icon: BarChart3 },
            { name: '고객 관리', icon: Users },
            { name: '매출 내역', icon: DollarSign },
            { name: '시스템 설정', icon: Settings },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-3.5 py-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 font-medium text-sm transition-all cursor-pointer"
                style={{ borderRadius: config.radiusBtn }}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </div>
            );
          })}
        </nav>

        {/* Theme Switcher in Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
          <span className="text-[11px] font-semibold text-gray-400">브랜드 테마 스위처</span>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setActiveTheme('toss')}
              className={`flex-1 py-1.5 rounded-md font-bold transition-all ${
                activeTheme === 'toss' ? 'bg-[#3182F6] text-white' : 'text-gray-500'
              }`}
            >
              Toss
            </button>
            <button
              type="button"
              onClick={() => setActiveTheme('daangn')}
              className={`flex-1 py-1.5 rounded-md font-bold transition-all ${
                activeTheme === 'daangn' ? 'bg-[#FF6F0F] text-white' : 'text-gray-500'
              }`}
            >
              Daangn
            </button>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 px-8 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold">비즈니스 퍼포먼스 개요</h1>
            <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-600 font-bold flex items-center gap-1 border border-green-200">
              <CheckCircle2 size={12} /> 시스템 정상 가동 중
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="검색어 입력..."
                className="pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Bell size={18} />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex flex-col gap-6">
          {/* KPI Metrics Cards Grid (명세 3.2 검증 대상: kpi-card) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: '총 매출액', value: '₩128,450,000', change: '+18.2%', icon: DollarSign },
              { label: '활성 사용자(MAU)', value: '42,910명', change: '+12.5%', icon: Users },
              { label: '전환율 (CVR)', value: '3.84%', change: '+0.6%', icon: TrendingUp },
              { label: '평균 응답 속도', value: '48ms', change: '-4ms', icon: Activity },
            ].map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  id={`kpi-card-${idx}`}
                  data-testid="kpi-card"
                  className="atom-card p-5 shadow-xs border border-gray-100 transition-all flex flex-col justify-between"
                  style={{
                    backgroundColor: `var(--atom-bg-surface, ${config.bgSurface})`,
                    borderRadius: `var(--atom-radius-card, ${config.radiusCard})`,
                  }}
                >
                  <div className="flex justify-between items-center text-xs opacity-60 mb-2">
                    <span>{kpi.label}</span>
                    <div
                      className="p-1.5 rounded-md"
                      style={{ backgroundColor: config.bgCanvas }}
                    >
                      <Icon size={16} style={{ color: config.primary }} />
                    </div>
                  </div>
                  <div className="text-2xl font-black tracking-tight">{kpi.value}</div>
                  <div className="mt-2 text-xs font-bold text-green-600 flex items-center gap-1">
                    <span>{kpi.change}</span>
                    <span className="text-gray-400 font-normal">지난달 대비</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Performance Chart Simulation Container */}
          <div
            className="p-6 shadow-xs border border-gray-100"
            style={{
              backgroundColor: config.bgSurface,
              borderRadius: config.radiusCard,
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-base">실시간 트래픽 트렌드</h3>
                <p className="text-xs text-gray-400">디자인 토큰 시멘틱 컬러가 차트 액센트에 바인딩됩니다.</p>
              </div>
              <button
                type="button"
                className="py-2 px-4 text-white text-xs font-bold shadow-xs transition-all"
                style={{
                  backgroundColor: config.primary,
                  borderRadius: config.radiusBtn,
                }}
              >
                데이터 내보내기
              </button>
            </div>

            {/* Simulated Bar Graph */}
            <div className="h-48 flex items-end gap-3 pt-8 pb-2 px-4 border-b border-gray-100">
              {[40, 65, 30, 80, 55, 95, 75, 85, 60, 90, 70, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div
                    className="w-full transition-all group-hover:opacity-80"
                    style={{
                      height: `${h}%`,
                      backgroundColor: config.primary,
                      borderRadius: '8px',
                    }}
                  />
                  <span className="text-[10px] text-gray-400 font-mono">{i + 1}월</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
