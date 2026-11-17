'use client';

import React, { useState, useId } from 'react';

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export type ChartType = 'line' | 'bar' | 'area';
export type ChartVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartDataPoint[];
  type?: ChartType;
  variant?: ChartVariant;
  height?: number;
  showGrid?: boolean;
  showPoints?: boolean;
  showLabels?: boolean;
  showTooltip?: boolean;
  strokeColor?: string;
  fillColor?: string;
  gridColor?: string;
  loading?: boolean;
  disabled?: boolean;
  componentType?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Chart: React.FC<ChartProps> = ({
  data = [],
  type = 'line',
  variant = 'primary',
  height = 200,
  showGrid = true,
  showPoints = true,
  showLabels = true,
  showTooltip = true,
  strokeColor,
  fillColor,
  gridColor,
  loading = false,
  disabled = false,
  componentType,
  value,
  className = '',
  style,
  ...rest
}) => {
  const gradientId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Variant color mapping fallbacks
  const variantColorMap: Record<ChartVariant, { stroke: string; fill: string }> = {
    primary: { stroke: 'var(--accent-primary)', fill: 'var(--accent-primary)' },
    secondary: { stroke: 'var(--text-secondary)', fill: 'var(--text-secondary)' },
    success: { stroke: 'var(--atom-color-success)', fill: 'var(--atom-color-success)' },
    danger: { stroke: 'var(--atom-color-destructive)', fill: 'var(--atom-color-destructive)' },
    warning: { stroke: 'var(--atom-color-warning)', fill: 'var(--atom-color-warning)' },
  };

  const activeStroke = strokeColor || variantColorMap[variant]?.stroke || 'var(--accent-primary)';
  const activeFill = fillColor || variantColorMap[variant]?.fill || 'var(--accent-primary)';
  const activeGrid = gridColor || 'var(--border-subtle)';

  if (loading) {
    return (
      <div
        className={`w-full flex flex-col items-center justify-center p-6 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) animate-pulse ${className}`}
        style={{ height, ...style }}
        {...rest}
      >
        <div className="w-8 h-8 rounded-full border-2 border-(--border-subtle) border-t-(--accent-primary) animate-spin mb-2" />
        <span className="text-xs font-mono text-(--text-muted)">Loading chart...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        className={`w-full flex items-center justify-center p-6 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle) text-xs text-(--text-muted) ${className}`}
        style={{ height, ...style }}
        {...rest}
      >
        No chart data available
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const minVal = rawMin === rawMax ? (rawMin > 0 ? 0 : rawMin - 10) : rawMin * 0.95;
  const maxVal = rawMin === rawMax ? (rawMax > 0 ? rawMax * 1.5 : 10) : rawMax * 1.05;
  const valRange = maxVal - minVal || 1;

  const svgWidth = 600;
  const svgHeight = height;
  const paddingLeft = 36;
  const paddingRight = 24;
  const paddingTop = 20;
  const paddingBottom = showLabels ? 30 : 16;

  const chartInnerWidth = svgWidth - paddingLeft - paddingRight;
  const chartInnerHeight = svgHeight - paddingTop - paddingBottom;

  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft + chartInnerWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * chartInnerWidth;
  };

  const getY = (val: number) => {
    return paddingTop + chartInnerHeight - ((val - minVal) / valRange) * chartInnerHeight;
  };

  // Generate SVG path for line/area
  const linePoints = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.value)}`).join(' ');
  const areaPath = `${linePoints} L ${getX(data.length - 1)} ${paddingTop + chartInnerHeight} L ${getX(0)} ${paddingTop + chartInnerHeight} Z`;

  // Grid levels (4 horizontal lines)
  const gridLevels = [0, 0.33, 0.66, 1];

  const hoveredItem = hoveredIndex !== null && data[hoveredIndex] ? data[hoveredIndex] : null;

  return (
    <div
      className={`relative w-full rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) p-2 overflow-hidden transition-all ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className}`}
      style={style}
      role="graphics-document"
      aria-label="Interactive Data Chart"
      data-component="chart"
      data-type={componentType}
      data-value={value}
      {...rest}
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible select-none"
        style={{ maxHeight: height }}
      >
        <defs>
          <linearGradient id={`chart-grad-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={activeFill} stopOpacity="0.32" />
            <stop offset="100%" stopColor={activeFill} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* 1. Horizontal Grid Lines */}
        {showGrid &&
          gridLevels.map((lvl, idx) => {
            const y = paddingTop + chartInnerHeight * (1 - lvl);
            const gridVal = minVal + valRange * lvl;
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke={activeGrid}
                  strokeDasharray="4 4"
                  strokeWidth="1"
                  opacity="0.75"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="var(--text-muted)"
                  fontFamily="monospace"
                >
                  {Math.round(gridVal)}
                </text>
              </g>
            );
          })}

        {/* 2. Bar Chart Representation */}
        {type === 'bar' &&
          data.map((d, i) => {
            const barW = Math.max(12, (chartInnerWidth / data.length) * 0.55);
            const x = getX(i) - barW / 2;
            const y = getY(d.value);
            const barH = paddingTop + chartInnerHeight - y;
            const isHovered = hoveredIndex === i;

            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={Math.max(2, barH)}
                  rx="3"
                  fill={isHovered ? activeStroke : activeFill}
                  opacity={isHovered ? 1 : 0.85}
                  className="transition-all duration-150 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}

        {/* 3. Area Chart Gradient Fill */}
        {type === 'area' && (
          <path d={areaPath} fill={`url(#chart-grad-${gradientId})`} />
        )}

        {/* 4. Line Chart Stroke */}
        {(type === 'line' || type === 'area') && (
          <path
            d={linePoints}
            fill="none"
            stroke={activeStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* 5. Points & Interactive Target Circles */}
        {(type === 'line' || type === 'area') &&
          data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.value);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                {/* Invisible large hit area */}
                <circle cx={cx} cy={cy} r="14" fill="transparent" />

                {/* Visible Point */}
                {showPoints && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 5.5 : 3.5}
                    fill="var(--bg-primary)"
                    stroke={activeStroke}
                    strokeWidth={isHovered ? '2.5' : '2'}
                    className="transition-all duration-150 shadow-xs"
                  />
                )}
              </g>
            );
          })}

        {/* 6. X-Axis Labels */}
        {showLabels &&
          data.map((d, i) => {
            const x = getX(i);
            const y = svgHeight - 8;
            const isHovered = hoveredIndex === i;

            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                fontSize="10"
                fill={isHovered ? 'var(--text-primary)' : 'var(--text-muted)'}
                fontWeight={isHovered ? 'bold' : 'normal'}
                className="transition-colors select-none"
              >
                {d.label}
              </text>
            );
          })}
      </svg>

      {/* Floating Tooltip */}
      {showTooltip && hoveredItem && hoveredIndex !== null && (
        <div
          className="absolute z-10 px-2.5 py-1.5 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-strong) text-[11px] shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-75"
          style={{
            left: `${(getX(hoveredIndex) / svgWidth) * 100}%`,
            top: `${(getY(hoveredItem.value) / svgHeight) * 100 - 8}%`,
          }}
        >
          <div className="font-semibold text-(--text-primary)">{hoveredItem.label}</div>
          <div className="font-mono font-bold" style={{ color: activeStroke }}>
            {hoveredItem.value.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};
