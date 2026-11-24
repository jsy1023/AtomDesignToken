'use client';

import React from 'react';
import {
  Accordion,
  Badge,
  Calendar,
  Card,
  Chart,
  Container,
  Grid,
  Stack,
} from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { formatLocaleText } from '@/lib/utils/localeFormat';
import { StudioPreviewItemProps } from './types';

export function BadgeStudioPreview({
  variable,
  getPaletteValue,
  status,
  locale,
  b,
  statusWrapperStyle,
  isHover,
  isActive,
  isDisabled,
  isLoading,
}: StudioPreviewItemProps) {
  let bg = getPaletteValue(b.background || '');
  let textColor = getPaletteValue(b.textColor || '');
  let borderColor = getPaletteValue(b.borderColor || '');

  if (isHover) {
    if (b.hoverBackground) bg = getPaletteValue(b.hoverBackground);
    if (b.hoverTextColor) textColor = getPaletteValue(b.hoverTextColor);
    if (b.hoverBorderColor) borderColor = getPaletteValue(b.hoverBorderColor);
  } else if (isActive) {
    if (b.activeBackground) bg = getPaletteValue(b.activeBackground);
  } else if (isDisabled) {
    if (b.disabledBackground) bg = getPaletteValue(b.disabledBackground);
    if (b.disabledTextColor) textColor = getPaletteValue(b.disabledTextColor);
    if (b.disabledBorderColor) borderColor = getPaletteValue(b.disabledBorderColor);
  }

  return (
    <span
      style={{
        backgroundColor: bg,
        color: textColor,
        border: `1px solid ${borderColor}`,
        borderRadius: getPaletteValue(b.borderRadius || ''),
        paddingLeft: getPaletteValue(b.paddingX || ''),
        paddingRight: getPaletteValue(b.paddingX || ''),
        paddingTop: getPaletteValue(b.paddingY || ''),
        paddingBottom: getPaletteValue(b.paddingY || ''),
        ...statusWrapperStyle,
      }}
      className="text-xs font-mono font-bold inline-flex items-center gap-1.5 shadow-2xs transition-all"
    >
      {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
      <span>{formatLocaleText(variable?.name, locale)}</span>
      {status !== 'default' && (
        <span className="text-[10px] opacity-75 font-normal">[{status}]</span>
      )}
    </span>
  );
}

export function CardStudioPreview({
  variable,
  getPaletteValue,
  status,
  locale,
  b,
  statusWrapperStyle,
  isHover,
  isFocus,
  isDisabled,
}: StudioPreviewItemProps) {
  let bg = getPaletteValue(b.background || '');
  let borderColor = isFocus
    ? b.focusBorderColor
      ? getPaletteValue(b.focusBorderColor)
      : 'var(--accent-primary)'
    : getPaletteValue(b.borderColor || '');

  if (isHover && b.hoverBackground) bg = getPaletteValue(b.hoverBackground);
  if (isHover && b.hoverBorderColor) borderColor = getPaletteValue(b.hoverBorderColor);
  if (isDisabled && b.disabledBackground) bg = getPaletteValue(b.disabledBackground);

  return (
    <Card
      style={{
        backgroundColor: bg,
        border: `1px solid ${borderColor}`,
        borderRadius: getPaletteValue(b.borderRadius || ''),
        padding: getPaletteValue(b.padding || ''),
        ...statusWrapperStyle,
      }}
      className="w-full max-w-sm flex flex-col gap-2 shadow-xs transition-all"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-(--text-primary)">
          {locale === 'ko' ? '카드 제목' : 'Card Title'}
        </h4>
        {status !== 'default' && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-semibold">
            {status}
          </span>
        )}
      </div>
      <p className="text-xs text-(--text-secondary) leading-relaxed">
        {locale === 'ko'
          ? `이 카드는 "${formatLocaleText(variable?.name, locale)}" 토큰 매핑을 반영합니다.`
          : `This card reflects "${formatLocaleText(variable?.name, locale)}" token mappings.`}
      </p>
    </Card>
  );
}

export function TableStudioPreview({ getPaletteValue, b }: StudioPreviewItemProps) {
  return (
    <div
      style={{
        borderRadius: getPaletteValue(b.borderRadius || ''),
        border: `1px solid ${getPaletteValue(b.borderColor || '')}`,
      }}
      className="w-full max-w-md overflow-hidden text-xs"
    >
      <div
        style={{
          backgroundColor: getPaletteValue(b.headerBackground || ''),
          borderBottom: `1px solid ${getPaletteValue(b.borderColor || '')}`,
          padding: getPaletteValue(b.cellPadding || ''),
        }}
        className="font-bold flex justify-between"
      >
        <span>Header Column 1</span>
        <span>Header Column 2</span>
      </div>
      <div
        style={{
          padding: getPaletteValue(b.cellPadding || ''),
        }}
        className="flex justify-between bg-(--bg-primary)"
      >
        <span>Row 1 Data A</span>
        <span className="font-mono">1,024</span>
      </div>
    </div>
  );
}

export function AvatarStudioPreview({ getPaletteValue, b }: StudioPreviewItemProps) {
  return (
    <div
      style={{
        backgroundColor: getPaletteValue(b.background || ''),
        color: getPaletteValue(b.textColor || ''),
        borderRadius: getPaletteValue(b.borderRadius || ''),
      }}
      className="w-14 h-14 flex items-center justify-center font-bold text-base shadow-xs"
    >
      AT
    </div>
  );
}

export function AccordionStudioPreview() {
  return (
    <div className="w-full max-w-md">
      <Accordion
        items={[
          {
            id: 'item-1',
            title: '디자인 토큰이란 무엇인가요?',
            content: '디자인 결정을 플랫폼에 독립적인 키-값 쌍으로 정의한 단일 진실 공급원(SSOT)입니다.',
          },
          {
            id: 'item-2',
            title: '어떻게 설치하고 사용하나요?',
            content: 'npx atomsystem init 명령어를 실행하여 설치 및 즉시 프로젝트에 연동할 수 있습니다.',
          },
        ]}
      />
    </div>
  );
}

export function SeparatorStudioPreview({ getPaletteValue, locale, b }: StudioPreviewItemProps) {
  return (
    <div className="w-full max-w-md flex flex-col gap-4 text-xs text-(--text-secondary)">
      <div>{locale === 'ko' ? '상단 콘텐츠 블록' : 'Section Above'}</div>
      <div
        style={{
          backgroundColor: getPaletteValue(b.color || ''),
        }}
        className="w-full h-px"
      />
      <div>{locale === 'ko' ? '하단 콘텐츠 블록' : 'Section Below'}</div>
    </div>
  );
}

export function CalendarStudioPreview({ getPaletteValue, b }: StudioPreviewItemProps) {
  return (
    <div
      style={{
        backgroundColor: getPaletteValue(b.background || ''),
        borderRadius: getPaletteValue(b.borderRadius || ''),
      }}
      className="p-3 border border-(--border-subtle) shadow-xs"
    >
      <Calendar selected={new Date()} onSelect={() => {}} />
    </div>
  );
}

export function ChartStudioPreview({
  variable,
  getPaletteValue,
  locale,
  b,
  statusWrapperStyle,
  isHover,
  isDisabled,
  isLoading,
}: StudioPreviewItemProps) {
  const isArea = variable?.id?.includes('area');
  const isBar = variable?.id?.includes('bar');
  const chartType = isArea ? 'area' : isBar ? 'bar' : 'line';
  const isSuccess = variable?.id?.includes('success');
  const isDanger = variable?.id?.includes('danger');
  const chartVariant = isSuccess ? 'success' : isDanger ? 'danger' : 'primary';

  const mockData = [
    { label: locale === 'ko' ? '1월' : 'Jan', value: 120 },
    { label: locale === 'ko' ? '2월' : 'Feb', value: 190 },
    { label: locale === 'ko' ? '3월' : 'Mar', value: 160 },
    { label: locale === 'ko' ? '4월' : 'Apr', value: 280 },
    { label: locale === 'ko' ? '5월' : 'May', value: 240 },
    { label: locale === 'ko' ? '6월' : 'Jun', value: 340 },
  ];

  let stroke = getPaletteValue(b.strokeColor || '');
  const fill = getPaletteValue(b.fillColor || '');
  const grid = getPaletteValue(b.gridColor || '');
  const radius = getPaletteValue(b.borderRadius || '');
  const padding = getPaletteValue(b.padding || '');

  if (isHover && b.hoverColor) {
    stroke = getPaletteValue(b.hoverColor);
  }

  return (
    <div className="w-full max-w-lg transition-all" style={{ padding, ...statusWrapperStyle }}>
      <Chart
        data={mockData}
        type={chartType}
        variant={chartVariant}
        strokeColor={stroke}
        fillColor={fill}
        gridColor={grid}
        height={180}
        loading={isLoading}
        disabled={isDisabled}
        style={{
          borderRadius: radius,
        }}
      />
    </div>
  );
}

export function ContainerStudioPreview({
  activeTypeId,
  getPaletteValue,
  locale,
  b,
  statusWrapperStyle,
}: StudioPreviewItemProps) {
  const bg = b.background ? getPaletteValue(b.background) : 'var(--bg-primary)';
  const border = b.borderColor ? getPaletteValue(b.borderColor) : 'var(--border-subtle)';
  const text = b.textColor ? getPaletteValue(b.textColor) : 'var(--text-primary)';
  const radius = b.borderRadius ? getPaletteValue(b.borderRadius) : 'var(--radius)';
  const px = b.paddingX ? getPaletteValue(b.paddingX) : '16px';
  const py = b.paddingY ? getPaletteValue(b.paddingY) : '12px';

  const containerSize = activeTypeId.includes('fluid')
    ? 'full'
    : activeTypeId.includes('centered')
    ? 'sm'
    : 'lg';

  return (
    <div className="w-full max-w-lg transition-all" style={statusWrapperStyle}>
      <div className="p-2 rounded-(--radius) border border-dashed border-(--border-strong) bg-(--bg-secondary)/30">
        <Container
          size={containerSize}
          style={{
            backgroundColor: bg,
            borderColor: border,
            color: text,
            borderRadius: radius,
            paddingLeft: px,
            paddingRight: px,
            paddingTop: py,
            paddingBottom: py,
          }}
          className={`${activeTypeId.includes('bordered') ? 'border-2' : 'border'} shadow-2xs transition-all`}
        >
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-(--border-subtle)/60">
            <span className="font-mono text-[11px] font-bold text-(--accent-primary)">
              &lt;Container size=&quot;{containerSize}&quot; /&gt;
            </span>
            <Badge variant="primary" className="text-[10px]">
              {activeTypeId || 'boxed'}
            </Badge>
          </div>
          <p className="text-xs opacity-80 leading-relaxed">
            {locale === 'ko'
              ? '뷰포트 크기에 따라 최대 너비와 좌우 거터(Gutter)가 토큰 값에 맞춰 자동 정렬됩니다.'
              : 'Max-width and horizontal gutters automatically adapt to bound spacing and radius tokens.'}
          </p>
        </Container>
      </div>
    </div>
  );
}

export function LayoutStudioPreview({
  activeTypeId,
  getPaletteValue,
  b,
  statusWrapperStyle,
}: StudioPreviewItemProps) {
  const bg = b.background ? getPaletteValue(b.background) : 'var(--bg-secondary)';
  const border = b.borderColor ? getPaletteValue(b.borderColor) : 'var(--border-subtle)';
  const text = b.textColor ? getPaletteValue(b.textColor) : 'var(--text-primary)';
  const gap = b.gap ? getPaletteValue(b.gap) : '12px';
  const padding = b.padding ? getPaletteValue(b.padding) : '12px';
  const radius = b.borderRadius ? getPaletteValue(b.borderRadius) : 'var(--radius-sm)';

  const isHorizontal = activeTypeId.includes('horizontal');
  const isGrid = activeTypeId.includes('grid');
  const isAppShell = activeTypeId.includes('shell');

  return (
    <div className="w-full max-w-lg transition-all" style={statusWrapperStyle}>
      {isAppShell ? (
        <div
          className="border overflow-hidden shadow-2xs"
          style={{ borderColor: border, borderRadius: radius, backgroundColor: bg, color: text }}
        >
          <div
            className="px-3 py-2 border-b text-[11px] font-mono font-bold flex items-center justify-between bg-(--bg-primary)"
            style={{ borderColor: border }}
          >
            <span>Layout.Header</span>
            <Badge variant="neutral" className="text-[9px]">
              AppShell
            </Badge>
          </div>
          <div className="flex min-h-[110px]" style={{ gap, padding }}>
            <div
              className="w-24 shrink-0 border p-2 text-[10px] font-mono bg-(--bg-primary)"
              style={{ borderColor: border, borderRadius: radius }}
            >
              Sidebar
            </div>
            <div
              className="flex-1 border p-2 text-[10px] font-mono bg-(--bg-primary)"
              style={{ borderColor: border, borderRadius: radius }}
            >
              Layout.Content (flex-1)
            </div>
          </div>
        </div>
      ) : isGrid ? (
        <Grid
          cols={3}
          style={{ gap, padding, borderColor: border, borderRadius: radius, backgroundColor: bg, color: text }}
          className="border"
        >
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              style={{ borderColor: border, borderRadius: radius }}
              className="p-3 bg-(--bg-primary) border text-center font-mono text-xs font-semibold shadow-2xs"
            >
              Grid #{n}
            </div>
          ))}
        </Grid>
      ) : (
        <Stack
          direction={isHorizontal ? 'horizontal' : 'vertical'}
          style={{ gap, padding, borderColor: border, borderRadius: radius, backgroundColor: bg, color: text }}
          className="border"
        >
          {['Item A', 'Item B', 'Item C'].map((label) => (
            <div
              key={label}
              style={{ borderColor: border, borderRadius: radius }}
              className="flex-1 px-3 py-2 bg-(--bg-primary) border text-center font-mono text-xs font-semibold shadow-2xs"
            >
              {label}
            </div>
          ))}
        </Stack>
      )}
    </div>
  );
}
