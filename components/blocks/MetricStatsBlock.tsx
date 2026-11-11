'use client';

import React from 'react';
import { Card, Badge } from '@/components/ui';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Server,
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
    label: '월간 반복 매출 (MRR)',
    subLabel: '구독 플랜 총액',
    value: '₩48,250,000',
    change: '+18.4%',
    isPositive: true,
    icon: 'dollar',
    sparkline: [35, 42, 40, 55, 60, 58, 72, 85],
  },
  {
    id: 'm-mau',
    label: '활성 개발자 (MAU)',
    subLabel: '토큰 CLI 활성 호출자',
    value: '49,210명',
    change: '+12.6%',
    isPositive: true,
    icon: 'users',
    sparkline: [20, 25, 22, 38, 45, 48, 55, 64],
  },
  {
    id: 'm-cvr',
    label: '유료 플랜 전환율',
    subLabel: '무료에서 Pro 업그레이드',
    value: '4.92%',
    change: '-0.3%',
    isPositive: false,
    icon: 'target',
    sparkline: [60, 58, 62, 55, 50, 52, 48, 45],
  },
  {
    id: 'm-uptime',
    label: 'API 가동률 & SLA',
    subLabel: '엣지 컴파일 노드 헬스',
    value: '99.98%',
    change: '+0.02%',
    isPositive: true,
    icon: 'server',
    sparkline: [95, 96, 98, 97, 99, 99, 100, 100],
  },
];

export function MetricStatsBlock() {
  const getIcon = (type: MetricItem['icon']) => {
    switch (type) {
      case 'dollar':
        return <DollarSign className="w-3.5 h-3.5 text-(--accent-primary)" />;
      case 'users':
        return <Users className="w-3.5 h-3.5 text-blue-500" />;
      case 'target':
        return <Target className="w-3.5 h-3.5 text-amber-500" />;
      case 'server':
        return <Server className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  return (
    <Card className="overflow-hidden transition-colors">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-(--border-subtle)">
        {METRICS.map((m) => {
          const maxVal = Math.max(...m.sparkline);
          const minVal = Math.min(...m.sparkline);
          const range = maxVal - minVal || 1;

          const points = m.sparkline
            .map((val, idx) => {
              const x = (idx / (m.sparkline.length - 1)) * 70;
              const y = 24 - ((val - minVal) / range) * 20;
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <div key={m.id} className="p-4 sm:p-5 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle)">
                    {getIcon(m.icon)}
                  </div>
                  <span className="text-xs text-(--text-secondary) font-medium">{m.label}</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xl font-bold tracking-tight text-(--text-primary)">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-(--text-secondary) mt-0.5">{m.subLabel}</div>
                </div>

                {/* Mini SVG Sparkline */}
                <div className="w-18 h-7">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 70 24">
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                      className={m.isPositive ? 'text-emerald-500' : 'text-rose-500'}
                    />
                  </svg>
                </div>
              </div>

              <div className="pt-2 border-t border-(--border-subtle) flex items-center justify-between text-[11px]">
                <span className="text-(--text-secondary)">전월 동기 대비</span>
                <span
                  className={`font-semibold flex items-center gap-0.5 ${
                    m.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {m.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{m.change}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
