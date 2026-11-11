'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import {
  Play,
  Pause,
  TrendingUp,
  TrendingDown,
  Activity,
} from 'lucide-react';

interface ChartPoint {
  time: string;
  price: number;
  high: number;
  low: number;
  volume: number;
}

const INITIAL_POINTS: ChartPoint[] = [
  { time: '09:00', price: 82400, high: 82600, low: 82100, volume: 1420 },
  { time: '09:05', price: 82900, high: 83100, low: 82500, volume: 2100 },
  { time: '09:10', price: 82700, high: 83000, low: 82600, volume: 1850 },
  { time: '09:15', price: 83400, high: 83600, low: 82700, volume: 3200 },
  { time: '09:20', price: 83900, high: 84200, low: 83300, volume: 4100 },
  { time: '09:25', price: 83600, high: 84000, low: 83400, volume: 2600 },
  { time: '09:30', price: 84200, high: 84500, low: 83600, volume: 4800 },
  { time: '09:35', price: 84800, high: 85100, low: 84100, volume: 5300 },
  { time: '09:40', price: 84600, high: 84900, low: 84400, volume: 3100 },
  { time: '09:45', price: 85300, high: 85600, low: 84600, volume: 6200 },
];

export function RealtimeChartBlock() {
  const [data, setData] = useState<ChartPoint[]>(INITIAL_POINTS);
  const [isPlaying, setIsPlaying] = useState(true);
  const [chartType, setChartType] = useState<'line' | 'candle'>('line');
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '1h' | '1d'>('1m');
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];
        const delta = (Math.random() - 0.48) * 350;
        const newPrice = Math.round(last.price + delta);
        const newHigh = Math.max(newPrice, last.high);
        const newLow = Math.min(newPrice, last.low);
        const newVolume = Math.round(2000 + Math.random() * 4000);

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        return [
          ...prev.slice(1),
          { time: timeStr, price: newPrice, high: newHigh, low: newLow, volume: newVolume },
        ];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentPoint = hoveredPoint || data[data.length - 1];
  const firstPoint = data[0];
  const priceDiff = currentPoint.price - firstPoint.price;
  const pctDiff = ((priceDiff / firstPoint.price) * 100).toFixed(2);
  const isPositive = priceDiff >= 0;

  const prices = data.map((d) => d.price);
  const minPrice = Math.min(...prices) * 0.998;
  const maxPrice = Math.max(...prices) * 1.002;
  const range = maxPrice - minPrice || 1;

  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 20;
  const paddingY = 20;

  const getX = (idx: number) => paddingX + (idx / (data.length - 1)) * (svgWidth - paddingX * 2);
  const getY = (price: number) => svgHeight - paddingY - ((price - minPrice) / range) * (svgHeight - paddingY * 2);

  const pointsPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.price)}`).join(' ');

  return (
    <Card className="overflow-hidden bg-(--bg-primary) border border-(--border-subtle) transition-colors">
      {/* 1. Header: Minimalist Price & Controls */}
      <div className="p-4 sm:p-5 border-b border-(--border-subtle) flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-mono text-xs font-semibold text-(--text-secondary)">KRW-ATOM</span>
            <span className={`text-xs font-mono font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {isPositive ? '+' : ''}{pctDiff}%
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight text-(--text-primary)">
            ₩{currentPoint.price.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Timeframe Button Group */}
          <div className="flex rounded-(--radius-sm) border border-(--border-subtle) p-0.5 text-xs bg-(--bg-secondary)">
            {(['1m', '5m', '1h', '1d'] as const).map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className="px-2 py-0.5 text-xs h-auto"
              >
                {tf}
              </Button>
            ))}
          </div>

          {/* Type Button Group */}
          <div className="flex rounded-(--radius-sm) border border-(--border-subtle) p-0.5 text-xs bg-(--bg-secondary)">
            <Button
              variant={chartType === 'line' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setChartType('line')}
              className="px-2 py-0.5 text-xs h-auto"
            >
              Line
            </Button>
            <Button
              variant={chartType === 'candle' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setChartType('candle')}
              className="px-2 py-0.5 text-xs h-auto"
            >
              Candle
            </Button>
          </div>

          {/* Play/Pause Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause stream' : 'Resume stream'}
            title={isPlaying ? 'Pause stream' : 'Resume stream'}
            className="px-2.5 py-1 text-xs h-auto flex items-center gap-1.5"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="text-xs font-medium">{isPlaying ? '일시정지' : '재생'}</span>
          </Button>
        </div>
      </div>

      {/* 2. Pure SVG Canvas (Zero-dependency, Token-based) */}
      <div className="p-4 sm:p-5">
        <div className="relative w-full h-56">
          <svg
            className="w-full h-full overflow-visible"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGradientToken" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Subtle Grid Lines */}
            <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="var(--border-subtle)" strokeDasharray="4 4" />
            <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="var(--border-subtle)" strokeDasharray="4 4" />
            <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="var(--border-subtle)" strokeDasharray="4 4" />

            {/* Area */}
            <path
              d={`${pointsPath} L ${getX(data.length - 1)} ${svgHeight - paddingY} L ${getX(0)} ${svgHeight - paddingY} Z`}
              fill="url(#chartGradientToken)"
            />

            {/* Path */}
            <path
              d={pointsPath}
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Points */}
            {data.map((d, i) => (
              <circle
                key={i}
                cx={getX(i)}
                cy={getY(d.price)}
                r={hoveredPoint === d ? 5 : 3}
                fill="var(--bg-primary)"
                stroke="var(--accent-primary)"
                strokeWidth="2"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredPoint(d)}
              />
            ))}
          </svg>

          {hoveredPoint && (
            <div
              className="absolute top-2 pointer-events-none transform -translate-x-1/2 bg-(--bg-primary) px-2.5 py-1 rounded-(--radius-sm) border border-(--border-strong) shadow-md text-xs"
              style={{
                left: `${(data.indexOf(hoveredPoint) / (data.length - 1)) * 100}%`,
              }}
            >
              <div className="font-semibold text-(--text-primary)">₩{hoveredPoint.price.toLocaleString()}</div>
              <div className="text-[11px] text-(--text-secondary)">{hoveredPoint.time} · Vol: {hoveredPoint.volume}</div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Metrics Summary Strip: Clean Monochrome */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-(--border-subtle) divide-x divide-(--border-subtle) text-xs">
        <div className="p-3 px-4">
          <div className="text-[11px] text-(--text-muted)">24h High</div>
          <div className="font-mono text-xs text-(--text-primary) mt-0.5">₩{maxPrice.toFixed(0)}</div>
        </div>
        <div className="p-3 px-4">
          <div className="text-[11px] text-(--text-muted)">24h Low</div>
          <div className="font-mono text-xs text-(--text-primary) mt-0.5">₩{minPrice.toFixed(0)}</div>
        </div>
        <div className="p-3 px-4">
          <div className="text-[11px] text-(--text-muted)">24h Volume</div>
          <div className="font-mono text-xs text-(--text-primary) mt-0.5">38,420 ATOM</div>
        </div>
        <div className="p-3 px-4">
          <div className="text-[11px] text-(--text-muted)">Change</div>
          <div className={`font-mono text-xs mt-0.5 ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {isPositive ? '+' : ''}{priceDiff.toLocaleString()} 원
          </div>
        </div>
      </div>
    </Card>
  );
}
