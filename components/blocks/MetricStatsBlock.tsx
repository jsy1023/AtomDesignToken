'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Server,
  ArrowUpRight,
} from 'lucide-react';

interface MetricItem {
  id: string;
  label: string;
  subLabel: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: 'dollar' | 'users' | 'target' | 'server';
  sparkline: number[];
}

const METRICS: MetricItem[] = [
  {
    id: 'm-arr',
    label: '연간 반복 매출 (ARR)',
    subLabel: '전체 유료 구독 합산',
    value: '₩142,850,000',
    change: '+18.4%',
    isPositive: true,
    icon: 'dollar',
    sparkline: [35, 42, 40, 55, 60, 58, 72, 85],
  },
  {
    id: 'm-mau',
    label: '월간 활성 개발자 (MAU)',
    subLabel: '토큰 CLI 호출 계정',
    value: '49,210 명',
    change: '+12.6%',
    isPositive: true,
    icon: 'users',
    sparkline: [20, 25, 22, 38, 45, 48, 55, 64],
  },
  {
    id: 'm-cvr',
    label: '체험 가입 전환율 (CVR)',
    subLabel: '스타터 → 프로 전환',
    value: '4.92 %',
    change: '-0.3%',
    isPositive: false,
    icon: 'target',
    sparkline: [60, 58, 62, 54, 52, 55, 48, 50],
  },
  {
    id: 'm-sla',
    label: 'API 응답 신뢰도 & 가동률',
    subLabel: '글로벌 엣지 네트워크',
    value: '99.99 %',
    change: '+0.01%',
    isPositive: true,
    icon: 'server',
    sparkline: [98, 99, 99, 100, 99, 100, 100, 100],
  },
];

export function MetricStatsBlock() {
  const getIcon = (type: MetricItem['icon']) => {
    switch (type) {
      case 'dollar':
        return <DollarSign className="w-4 h-4 text-emerald-500" />;
      case 'users':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'target':
        return <Target className="w-4 h-4 text-amber-500" />;
      case 'server':
        return <Server className="w-4 h-4 text-purple-500" />;
    }
  };

  const renderSparkline = (points: number[], isPositive: boolean) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 80;
    const height = 28;

    const coords = points.map((p, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 6) - 3;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');

    const strokeColor = isPositive ? 'var(--atom-success, #10b981)' : 'var(--atom-destructive, #f04452)';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <path
          d={coords}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="w-full bg-(--bg-primary) rounded-2xl border border-(--border-subtle) shadow-sm p-5 sm:p-6 transition-colors">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-(--border-subtle) mb-5">
        <div>
          <span className="text-[11px] font-semibold text-(--accent-primary) uppercase tracking-wider">
            경영 & 인프라 텔레메트리
          </span>
          <h3 className="text-lg font-bold text-(--text-primary) mt-0.5">
            4대 핵심 비즈니스 KPI 지표 대시보드
          </h3>
        </div>
        <div className="text-[11px] text-(--text-muted) flex items-center gap-1.5 mt-2 sm:mt-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>실시간 동기화 상태: 정상 (Latency 14ms)</span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric) => (
          <div
            key={metric.id}
            className="p-4 rounded-xl bg-(--bg-secondary)/50 hover:bg-(--bg-secondary) border border-(--border-subtle) hover:border-(--border-strong) transition-all duration-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-(--bg-primary) border border-(--border-subtle)">
                  {getIcon(metric.icon)}
                </div>
                <div
                  className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-md ${
                    metric.isPositive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {metric.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>

              {/* Title & Sub */}
              <div className="text-xs font-semibold text-(--text-secondary)">{metric.label}</div>
              <div className="text-[10px] text-(--text-muted) mb-2">{metric.subLabel}</div>

              {/* Value */}
              <div className="text-xl sm:text-2xl font-black text-(--text-primary) tracking-tight">
                {metric.value}
              </div>
            </div>

            {/* Sparkline & Footer */}
            <div className="flex items-end justify-between pt-4 mt-2 border-t border-(--border-subtle)">
              <span className="text-[10px] text-(--text-muted)">지난 30일 추이</span>
              <div>{renderSparkline(metric.sparkline, metric.isPositive)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
