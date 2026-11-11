'use client';

import React, { useState, useEffect, useId } from 'react';
import { Play, Pause, TrendingUp, TrendingDown, Clock, Activity, RefreshCw } from 'lucide-react';

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
  const [tickFlash, setTickFlash] = useState<'up' | 'down' | null>(null);

  const gradientId = useId();

  // 실시간 틱 데이터 시뮬레이션
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

        setTickFlash(delta >= 0 ? 'up' : 'down');
        setTimeout(() => setTickFlash(null), 400);

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const newPoint: ChartPoint = {
          time: timeStr,
          price: newPrice,
          high: newHigh,
          low: newLow,
          volume: newVolume,
        };

        return [...prev.slice(1), newPoint];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentPoint = hoveredPoint || data[data.length - 1];
  const firstPoint = data[0];
  const priceDiff = currentPoint.price - firstPoint.price;
  const pctDiff = ((priceDiff / firstPoint.price) * 100).toFixed(2);
  const isPositive = priceDiff >= 0;

  // 차트 좌표 계산
  const prices = data.map((d) => d.price);
  const minPrice = Math.min(...prices) * 0.998;
  const maxPrice = Math.max(...prices) * 1.002;
  const range = maxPrice - minPrice || 1;

  const svgWidth = 600;
  const svgHeight = 200;
  const paddingX = 20;
  const paddingY = 20;

  const getX = (idx: number) => paddingX + (idx / (data.length - 1)) * (svgWidth - paddingX * 2);
  const getY = (price: number) => svgHeight - paddingY - ((price - minPrice) / range) * (svgHeight - paddingY * 2);

  const pointsPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.price)}`).join(' ');
  const areaPath = `${pointsPath} L ${getX(data.length - 1)} ${svgHeight} L ${getX(0)} ${svgHeight} Z`;

  return (
    <div className="w-full bg-(--bg-primary) rounded-2xl border border-(--border-subtle) shadow-sm overflow-hidden p-5 sm:p-6 transition-colors">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-(--border-subtle)">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE TICK
            </span>
            <span className="text-xs font-medium text-(--text-muted)">KRW-ATOM / 실시간 지수</span>
          </div>
          <div className="flex items-baseline gap-3">
            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
                tickFlash === 'up'
                  ? 'text-emerald-500'
                  : tickFlash === 'down'
                  ? 'text-rose-500'
                  : 'text-(--text-primary)'
              }`}
            >
              ₩{currentPoint.price.toLocaleString()}
            </h2>
            <div
              className={`inline-flex items-center gap-1 text-xs sm:text-sm font-semibold px-2 py-0.5 rounded-md ${
                isPositive
                  ? 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400'
                  : 'text-rose-600 bg-rose-500/10 dark:text-rose-400'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{isPositive ? '+' : ''}{priceDiff.toLocaleString()}원 ({isPositive ? '+' : ''}{pctDiff}%)</span>
            </div>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe Filter */}
          <div className="flex bg-(--bg-secondary) p-0.5 rounded-lg border border-(--border-subtle) text-xs">
            {(['1m', '5m', '1h', '1d'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  timeframe === tf
                    ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs font-semibold'
                    : 'text-(--text-secondary) hover:text-(--text-primary)'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type Toggle */}
          <div className="flex bg-(--bg-secondary) p-0.5 rounded-lg border border-(--border-subtle) text-xs">
            <button
              onClick={() => setChartType('line')}
              data-active={chartType === 'line'}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                chartType === 'line'
                  ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs font-semibold'
                  : 'text-(--text-secondary) hover:text-(--text-primary)'
              }`}
            >
              라인
            </button>
            <button
              onClick={() => setChartType('candle')}
              data-active={chartType === 'candle'}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                chartType === 'candle'
                  ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs font-semibold'
                  : 'text-(--text-secondary) hover:text-(--text-primary)'
              }`}
            >
              캔들
            </button>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? '일시정지' : '실시간 재생'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-(--bg-secondary) hover:bg-(--border-subtle) text-(--text-primary) border border-(--border-subtle) transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-500" />
                <span>일시정지</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                <span>재생</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Stats Pill Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
        <div className="p-2.5 rounded-xl bg-(--bg-secondary)/60 border border-(--border-subtle)">
          <div className="text-[10px] text-(--text-muted) font-medium">최고가 (High)</div>
          <div className="text-xs sm:text-sm font-bold text-rose-500">₩{Math.max(...data.map(d => d.high)).toLocaleString()}</div>
        </div>
        <div className="p-2.5 rounded-xl bg-(--bg-secondary)/60 border border-(--border-subtle)">
          <div className="text-[10px] text-(--text-muted) font-medium">최저가 (Low)</div>
          <div className="text-xs sm:text-sm font-bold text-blue-500">₩{Math.min(...data.map(d => d.low)).toLocaleString()}</div>
        </div>
        <div className="p-2.5 rounded-xl bg-(--bg-secondary)/60 border border-(--border-subtle)">
          <div className="text-[10px] text-(--text-muted) font-medium">실시간 거래량</div>
          <div className="text-xs sm:text-sm font-bold text-(--text-primary)">{currentPoint.volume.toLocaleString()} ATOM</div>
        </div>
        <div className="p-2.5 rounded-xl bg-(--bg-secondary)/60 border border-(--border-subtle)">
          <div className="text-[10px] text-(--text-muted) font-medium">마지막 체결</div>
          <div className="text-xs sm:text-sm font-bold text-(--text-primary) flex items-center gap-1">
            <Clock className="w-3 h-3 text-(--text-muted)" />
            {currentPoint.time}
          </div>
        </div>
      </div>

      {/* Main SVG Interactive Chart */}
      <div className="relative w-full h-56 sm:h-64 mt-2 select-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-primary, #3182f6)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--accent-primary, #3182f6)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1={svgHeight * 0.25} x2={svgWidth} y2={svgHeight * 0.25} stroke="currentColor" strokeDasharray="3 3" className="text-(--border-subtle)" />
          <line x1="0" y1={svgHeight * 0.5} x2={svgWidth} y2={svgHeight * 0.5} stroke="currentColor" strokeDasharray="3 3" className="text-(--border-subtle)" />
          <line x1="0" y1={svgHeight * 0.75} x2={svgWidth} y2={svgHeight * 0.75} stroke="currentColor" strokeDasharray="3 3" className="text-(--border-subtle)" />

          {chartType === 'line' ? (
            <>
              {/* Area fill */}
              <path d={areaPath} fill={`url(#${gradientId})`} />
              {/* Stroke line */}
              <path
                d={pointsPath}
                fill="none"
                stroke="var(--accent-primary, #3182f6)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data points dots */}
              {data.map((d, i) => (
                <circle
                  key={i}
                  cx={getX(i)}
                  cy={getY(d.price)}
                  r={i === data.length - 1 ? 4.5 : 2.5}
                  className="fill-(--accent-primary) transition-all duration-300"
                />
              ))}
            </>
          ) : (
            /* Candlestick view */
            data.map((d, i) => {
              const x = getX(i);
              const isUp = d.price >= (data[i - 1]?.price || d.price);
              const candleTop = getY(Math.max(d.price, data[i - 1]?.price || d.price));
              const candleBottom = getY(Math.min(d.price, data[i - 1]?.price || d.price));
              const candleHeight = Math.max(3, candleBottom - candleTop);
              const colorClass = isUp ? 'fill-emerald-500 stroke-emerald-500' : 'fill-rose-500 stroke-rose-500';

              return (
                <g key={i}>
                  {/* High/Low wick */}
                  <line
                    x1={x}
                    y1={getY(d.high)}
                    x2={x}
                    y2={getY(d.low)}
                    strokeWidth="1.5"
                    className={colorClass}
                  />
                  {/* Body */}
                  <rect
                    x={x - 8}
                    y={candleTop}
                    width={16}
                    height={candleHeight}
                    rx={2}
                    className={colorClass}
                  />
                </g>
              );
            })
          )}

          {/* Interactive Hover Crosshair */}
          {hoveredPoint && (
            <g>
              <line
                x1={getX(data.indexOf(hoveredPoint))}
                y1={0}
                x2={getX(data.indexOf(hoveredPoint))}
                y2={svgHeight}
                stroke="var(--accent-primary, #3182f6)"
                strokeDasharray="2 2"
                strokeWidth="1.5"
              />
              <circle
                cx={getX(data.indexOf(hoveredPoint))}
                cy={getY(hoveredPoint.price)}
                r={6}
                className="fill-(--accent-primary) stroke-white stroke-2"
              />
            </g>
          )}

          {/* Hover hit areas */}
          {data.map((d, i) => (
            <rect
              key={i}
              x={getX(i) - 15}
              y={0}
              width={30}
              height={svgHeight}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHoveredPoint(d)}
            />
          ))}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="absolute top-2 pointer-events-none transform -translate-x-1/2 bg-(--bg-primary)/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-(--border-strong) shadow-lg text-xs"
            style={{
              left: `${(data.indexOf(hoveredPoint) / (data.length - 1)) * 100}%`,
            }}
          >
            <div className="font-semibold text-(--text-primary)">₩{hoveredPoint.price.toLocaleString()}</div>
            <div className="text-[10px] text-(--text-secondary)">{hoveredPoint.time} · 거래량 {hoveredPoint.volume}</div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-(--text-muted) pt-3 border-t border-(--border-subtle) mt-3">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-(--accent-primary)" />
          <span>W3C DTCG 시맨틱 토큰 100% 바인딩</span>
        </div>
        <div className="flex items-center gap-1">
          <RefreshCw className={`w-3 h-3 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>실시간 1.2s 주기 폴링 시뮬레이션</span>
        </div>
      </div>
    </div>
  );
}
