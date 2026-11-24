'use client';

import React from 'react';
import {
  Alert,
  Badge,
  Button,
  Offcanvas,
  Toast,
  ToastVariant,
} from '@/components/ui';
import { ArrowRight, Sparkles } from 'lucide-react';
import { formatLocaleText } from '@/lib/utils/localeFormat';
import { StudioPreviewItemProps } from './types';

export function ModalStudioPreview({ variable, getPaletteValue, b }: StudioPreviewItemProps) {
  return (
    <div
      style={{
        backgroundColor: getPaletteValue(b.background || ''),
        border: `1px solid ${getPaletteValue(b.borderColor || '')}`,
        borderRadius: getPaletteValue(b.borderRadius || ''),
        padding: getPaletteValue(b.padding || ''),
      }}
      className="w-full max-w-sm flex flex-col gap-3 shadow-lg"
    >
      <h4 className="font-bold text-sm text-(--text-primary)">Dialog Modal Window</h4>
      <p className="text-xs text-(--text-secondary)">
        Dynamic radius and surface padding bound to &quot;{variable?.name}&quot;.
      </p>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" size="sm">
          Dismiss
        </Button>
      </div>
    </div>
  );
}

export function ProgressStudioPreview({ getPaletteValue, b }: StudioPreviewItemProps) {
  return (
    <div className="w-full max-w-sm flex flex-col gap-2">
      <div className="flex justify-between text-xs font-mono text-(--text-secondary)">
        <span>진행 상태</span>
        <span>72%</span>
      </div>
      <div
        style={{
          backgroundColor: getPaletteValue(b.background || ''),
          borderRadius: getPaletteValue(b.borderRadius || ''),
        }}
        className="w-full h-2.5 overflow-hidden"
      >
        <div
          style={{
            width: '72%',
            backgroundColor: getPaletteValue(b.fillColor || ''),
            borderRadius: getPaletteValue(b.borderRadius || ''),
          }}
          className="h-full transition-all"
        />
      </div>
    </div>
  );
}

export function SkeletonStudioPreview({ variable, getPaletteValue, b }: StudioPreviewItemProps) {
  return (
    <div className="w-full max-w-xs flex items-center gap-3">
      <div
        style={{
          backgroundColor: getPaletteValue(b.background || ''),
          borderRadius: variable?.id === 'circle' ? '50%' : getPaletteValue(b.borderRadius || ''),
        }}
        className="w-12 h-12 shrink-0 animate-pulse"
      />
      <div className="flex-1 space-y-2">
        <div
          style={{
            backgroundColor: getPaletteValue(b.background || ''),
            borderRadius: getPaletteValue(b.borderRadius || ''),
          }}
          className="h-3.5 w-3/4 animate-pulse"
        />
        <div
          style={{
            backgroundColor: getPaletteValue(b.background || ''),
            borderRadius: getPaletteValue(b.borderRadius || ''),
          }}
          className="h-3 w-1/2 animate-pulse"
        />
      </div>
    </div>
  );
}

export function TooltipStudioPreview({ variable, getPaletteValue, locale, b }: StudioPreviewItemProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        style={{
          backgroundColor: getPaletteValue(b.background || ''),
          color: getPaletteValue(b.textColor || ''),
          borderRadius: getPaletteValue(b.borderRadius || ''),
        }}
        className="px-3 py-1.5 text-xs font-mono shadow-md flex items-center gap-1.5 animate-bounce"
      >
        <span>💡 {variable?.name || 'Tooltip Message'}</span>
      </div>
      <Button variant="secondary" size="sm">
        {locale === 'ko' ? '호버 대상 버튼' : 'Hover Target'}
      </Button>
    </div>
  );
}

export function OffcanvasStudioPreview({
  variable,
  getPaletteValue,
  b,
  statusWrapperStyle,
  isHover,
  isActive,
}: StudioPreviewItemProps) {
  const isLeft = variable.id.includes('left') || variable.id.includes('nav');
  const isBottom = variable.id.includes('bottom') || variable.id.includes('sheet');
  const isSettings = variable.id.includes('settings');

  const placement = isLeft ? 'left' : isBottom ? 'bottom' : 'right';
  const title = isLeft
    ? '네비게이션 메뉴'
    : isBottom
    ? '필터 및 검색 옵션'
    : isSettings
    ? '시스템 환경설정'
    : '항목 상세 정보';

  const desc = isLeft
    ? '전체 카테고리 및 이동 링크'
    : isBottom
    ? '조건별 정렬 및 카테고리 필터'
    : isSettings
    ? '테마 및 알림 기본 설정'
    : '선택한 레코드의 상세 속성 편집';

  const bg =
    isHover && b.hoverBackground
      ? getPaletteValue(b.hoverBackground)
      : isActive && b.activeBackground
      ? getPaletteValue(b.activeBackground)
      : b.background
      ? getPaletteValue(b.background)
      : undefined;

  const border =
    isHover && b.hoverBorderColor
      ? getPaletteValue(b.hoverBorderColor)
      : b.borderColor
      ? getPaletteValue(b.borderColor)
      : undefined;

  const text =
    isHover && b.hoverTextColor
      ? getPaletteValue(b.hoverTextColor)
      : b.textColor
      ? getPaletteValue(b.textColor)
      : undefined;

  const radius = b.borderRadius ? getPaletteValue(b.borderRadius) : undefined;
  const padding = b.padding ? getPaletteValue(b.padding) : undefined;

  return (
    <div className="w-full max-w-md transition-all" style={statusWrapperStyle}>
      <Offcanvas
        isOpen={true}
        onClose={() => {}}
        inline={true}
        placement={placement}
        title={title}
        description={desc}
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button variant="secondary" size="sm">
              취소
            </Button>
            <Button variant="primary" size="sm">
              적용하기
            </Button>
          </div>
        }
        style={{
          backgroundColor: bg,
          borderColor: border,
          color: text,
          borderRadius: radius,
        }}
      >
        <div className="space-y-3 py-1" style={{ padding }}>
          {isLeft ? (
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="font-semibold px-2 py-1.5 rounded-(--radius) bg-(--bg-secondary) flex items-center justify-between">
                <span>대시보드 홈</span>
                <Badge variant="primary">Hot</Badge>
              </div>
              <div className="px-2 py-1.5 rounded-(--radius) hover:bg-(--bg-secondary) cursor-pointer">
                토큰 & 컴포넌트 스튜디오
              </div>
              <div className="px-2 py-1.5 rounded-(--radius) hover:bg-(--bg-secondary) cursor-pointer">
                디자인 시스템 카탈로그
              </div>
            </div>
          ) : isBottom ? (
            <div className="space-y-2 text-xs">
              <div className="text-(--text-secondary) font-medium">정렬 기준</div>
              <div className="flex gap-2">
                <Badge variant="primary">최신순</Badge>
                <Badge variant="secondary">인기순</Badge>
                <Badge variant="secondary">가격순</Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-(--text-secondary)">상태 코드</span>
                <Badge variant="success">ACTIVE</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-(--text-secondary)">엔티티 ID</span>
                <span className="font-mono text-xs">#OFFCANVAS-2026</span>
              </div>
              <div className="p-2 rounded-(--radius) bg-(--bg-secondary) text-[11px] text-(--text-muted)">
                오프캔버스 드로어는 현재 컨텍스트를 방해하지 않고 부가 정보를 노출합니다.
              </div>
            </div>
          )}
        </div>
      </Offcanvas>
    </div>
  );
}

export function ToastStudioPreview({
  variable,
  getPaletteValue,
  status,
  locale,
  b,
  statusWrapperStyle,
  isHover,
  isActive,
}: StudioPreviewItemProps) {
  const isSuccess = variable.id.includes('success');
  const isWarning = variable.id.includes('warning');
  const isDanger = variable.id.includes('danger') || variable.id.includes('error');
  const isAction = variable.id.includes('action') || variable.id.includes('undo');

  const variant: ToastVariant = isSuccess
    ? 'success'
    : isWarning
    ? 'warning'
    : isDanger
    ? 'danger'
    : isAction
    ? 'action'
    : 'info';

  const title = isSuccess
    ? locale === 'ko'
      ? '저장 완료'
      : 'Saved Successfully'
    : isWarning
    ? locale === 'ko'
      ? '세션 만료 예정'
      : 'Session Expiring Soon'
    : isDanger
    ? locale === 'ko'
      ? '네트워크 요청 실패'
      : 'Network Request Failed'
    : isAction
    ? locale === 'ko'
      ? '항목이 휴지통으로 이동됨'
      : 'Item moved to trash'
    : locale === 'ko'
    ? '새로운 시스템 알림'
    : 'System Notification';

  const desc = isSuccess
    ? locale === 'ko'
      ? '변경 사항이 안전하게 클라우드에 동기화되었습니다.'
      : 'Changes have been synchronized to the cloud.'
    : isWarning
    ? locale === 'ko'
      ? '5분 후 자동 로그아웃됩니다. 작업을 저장해 주세요.'
      : 'Automatic logout in 5 min. Please save your work.'
    : isDanger
    ? locale === 'ko'
      ? '서버와의 통신이 원활하지 않습니다. 다시 시도해 주세요.'
      : 'Could not reach server. Please retry.'
    : isAction
    ? locale === 'ko'
      ? '프로젝트가 성공적으로 보관 처리되었습니다.'
      : 'Project archived successfully.'
    : locale === 'ko'
    ? 'AtomSystem v0.13.0 업데이트가 배포되었습니다.'
    : 'AtomSystem v0.13.0 update is now available.';

  const bg =
    isHover && b.hoverBackground
      ? getPaletteValue(b.hoverBackground)
      : isActive && b.activeBackground
      ? getPaletteValue(b.activeBackground)
      : b.background
      ? getPaletteValue(b.background)
      : undefined;

  const border = b.borderColor ? getPaletteValue(b.borderColor) : undefined;
  const text = b.textColor ? getPaletteValue(b.textColor) : undefined;
  const radius = b.borderRadius ? getPaletteValue(b.borderRadius) : undefined;
  const padding = b.padding ? getPaletteValue(b.padding) : undefined;

  return (
    <div className="w-full max-w-md transition-all" style={statusWrapperStyle}>
      <Toast
        variant={variant}
        title={title}
        description={desc}
        inline={true}
        status={status}
        action={
          isAction
            ? {
                label: locale === 'ko' ? '실행 취소' : 'Undo',
                onClick: () => {},
              }
            : undefined
        }
        onClose={() => {}}
        style={{
          backgroundColor: bg,
          borderColor: border,
          color: text,
          borderRadius: radius,
          padding,
        }}
      />
    </div>
  );
}

export function AlertStudioPreview({
  variable,
  activeTypeId,
  getPaletteValue,
  status,
  locale,
  b,
  statusWrapperStyle,
}: StudioPreviewItemProps) {
  const toneVariant = variable.id.includes('success')
    ? 'success'
    : variable.id.includes('warning')
    ? 'warning'
    : variable.id.includes('danger') || variable.id.includes('destructive')
    ? 'destructive'
    : 'info';

  const bg = b.background ? getPaletteValue(b.background) : undefined;
  const border = b.borderColor ? getPaletteValue(b.borderColor) : undefined;
  const text = b.textColor ? getPaletteValue(b.textColor) : undefined;
  const radius = b.borderRadius ? getPaletteValue(b.borderRadius) : undefined;
  const padding = b.padding ? getPaletteValue(b.padding) : undefined;

  const typeStyleOverride =
    activeTypeId.includes('solid') || activeTypeId.includes('outlined') || activeTypeId.includes('accent')
      ? undefined
      : { backgroundColor: bg, borderColor: border, color: text };

  return (
    <div className="w-full max-w-md transition-all" style={statusWrapperStyle}>
      <Alert
        componentType={(activeTypeId || 'soft') as any}
        variant={toneVariant}
        status={status}
        title={
          toneVariant === 'success'
            ? locale === 'ko'
              ? '토큰 동기화 완료'
              : 'Tokens Synchronized'
            : toneVariant === 'warning'
            ? locale === 'ko'
              ? '대비율 확인 권장'
              : 'Contrast Check Recommended'
            : toneVariant === 'destructive'
            ? locale === 'ko'
              ? '유효성 검증 오류'
              : 'Validation Error'
            : locale === 'ko'
            ? '디자인 시스템 안내'
            : 'Design System Notice'
        }
        description={
          locale === 'ko'
            ? '시맨틱 상태 토큰(Type · Variable · Status)에 맞춰 콜아웃 외형이 실시간 반영됩니다.'
            : 'Alert appearance dynamically binds to semantic status tokens.'
        }
        onClose={() => {}}
        style={{
          ...typeStyleOverride,
          borderRadius: radius,
          padding,
        }}
      />
    </div>
  );
}

export function SheetStudioPreview({
  variable,
  activeTypeId,
  getPaletteValue,
  locale,
  b,
  statusWrapperStyle,
}: StudioPreviewItemProps) {
  const placement = activeTypeId.includes('side') || variable.id.includes('side') ? 'right' : 'bottom';
  const bg = b.background ? getPaletteValue(b.background) : undefined;
  const border = b.borderColor ? getPaletteValue(b.borderColor) : undefined;
  const text = b.textColor ? getPaletteValue(b.textColor) : undefined;
  const radius = b.borderRadius ? getPaletteValue(b.borderRadius) : undefined;
  const padding = b.padding ? getPaletteValue(b.padding) : undefined;

  return (
    <div className="w-full max-w-md transition-all" style={statusWrapperStyle}>
      <Offcanvas
        isOpen={true}
        onClose={() => {}}
        inline={true}
        placement={placement}
        title={
          placement === 'bottom'
            ? locale === 'ko'
              ? '필터 및 정렬 시트'
              : 'Filter & Sort Sheet'
            : locale === 'ko'
            ? '상세 정보 시트'
            : 'Detail Sheet'
        }
        description={
          locale === 'ko'
            ? '현재 컨텍스트를 유지한 채 추가 옵션을 선택합니다.'
            : 'Select options while keeping current view context.'
        }
        className={activeTypeId.includes('floating') ? 'shadow-2xl m-1' : ''}
        style={{
          backgroundColor: bg,
          borderColor: border,
          color: text,
          borderRadius: radius,
        }}
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button variant="secondary" size="sm">
              {locale === 'ko' ? '닫기' : 'Close'}
            </Button>
            <Button variant="primary" size="sm">
              {locale === 'ko' ? '선택 완료' : 'Confirm'}
            </Button>
          </div>
        }
      >
        <div className="space-y-2 text-xs" style={{ padding }}>
          <div className="flex items-center justify-between p-2 rounded-(--radius-sm) bg-(--bg-secondary)">
            <span className="font-medium">{locale === 'ko' ? '최신순 정렬' : 'Sort by Newest'}</span>
            <Badge variant="primary">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-2 rounded-(--radius-sm) border border-(--border-subtle)">
            <span className="text-(--text-secondary)">
              {locale === 'ko' ? '인기순 정렬' : 'Sort by Popular'}
            </span>
            <span className="font-mono text-[10px] text-(--text-muted)">default</span>
          </div>
        </div>
      </Offcanvas>
    </div>
  );
}

export function GenericStudioPreview({
  componentId,
  variable,
  type,
  activeTypeId,
  size,
  iconSlot,
  getPaletteValue,
  status,
  locale,
  b,
  statusWrapperStyle,
}: StudioPreviewItemProps) {
  const genBg = b.background ? getPaletteValue(b.background) : 'var(--bg-secondary)';
  const genText = b.textColor ? getPaletteValue(b.textColor) : 'var(--text-primary)';
  const genBorder = b.borderColor ? getPaletteValue(b.borderColor) : 'var(--border-subtle)';
  const genRadius = b.borderRadius ? getPaletteValue(b.borderRadius) : 'var(--radius)';
  const genPadX = b.paddingX ? getPaletteValue(b.paddingX) : b.padding ? getPaletteValue(b.padding) : '16px';
  const genPadY = b.paddingY ? getPaletteValue(b.paddingY) : b.padding ? getPaletteValue(b.padding) : '10px';
  const fallbackTypeId = activeTypeId || 'standard';
  const isOutlineType = fallbackTypeId.includes('outline');
  const isGhostType = fallbackTypeId.includes('ghost') || fallbackTypeId.includes('link');
  const pascalLabel = (componentId || 'component')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-3" style={statusWrapperStyle}>
      <div
        data-component={componentId}
        data-type={fallbackTypeId}
        data-variable={variable?.id || 'default'}
        data-status={status}
        style={{
          backgroundColor: isOutlineType || isGhostType ? 'transparent' : genBg,
          color: isOutlineType || isGhostType ? genBorder : genText,
          borderColor: isGhostType ? 'transparent' : genBorder,
          borderStyle: 'solid',
          borderWidth: '1px',
          borderRadius: genRadius,
          paddingLeft: genPadX,
          paddingRight: genPadX,
          paddingTop: genPadY,
          paddingBottom: genPadY,
          ...(size === 'sm' ? { transform: 'scale(0.94)' } : size === 'lg' ? { transform: 'scale(1.06)' } : {}),
        }}
        className="w-full transition-all shadow-xs flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {iconSlot !== 'right' && <Sparkles className="w-4 h-4 shrink-0" />}
          <div className="min-w-0">
            <div className="text-xs font-bold truncate">
              {formatLocaleText(variable?.name, locale) || pascalLabel}
            </div>
            <div className="text-[11px] opacity-80 truncate">
              {type?.name || fallbackTypeId} · status=&quot;{status}&quot;
            </div>
          </div>
          {iconSlot === 'right' && <ArrowRight className="w-4 h-4 shrink-0" />}
        </div>
        <Badge variant="neutral" className="text-[10px] font-mono shrink-0">
          {componentId}
        </Badge>
      </div>
      <code className="text-[10px] font-mono text-(--text-muted) px-2 py-0.5 rounded bg-(--bg-secondary) border border-(--border-subtle)">
        &lt;{pascalLabel} componentType=&quot;{fallbackTypeId}&quot; variable=&quot;{variable?.id || 'default'}&quot; /&gt;
      </code>
    </div>
  );
}
