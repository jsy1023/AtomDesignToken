'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { ComponentVariable, ComponentInteractiveStatus, ComponentTypeSpec } from '@/lib/data/studioData';
import { formatLocaleText } from '@/lib/utils/localeFormat';
import { Loader2, Sparkles, ArrowRight, Plus, Folder, FileCode } from 'lucide-react';
import {
  Button,
  Input,
  Card,
  Badge,
  NativeSelect,
  Textarea,
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarLink,
  NavbarActions,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenuButton,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
  NavDropdownItem,
  Checkbox,
  RadioGroup,
  Slider,
  Progress,
  Skeleton,
  Tooltip,
  Accordion,
  Breadcrumb,
  Pagination,
  Separator,
  Calendar,
  Chart,
  Offcanvas,
  Toast,
  type ToastVariant,
  Container,
  Stack,
  Grid,
  Tree,
  type TreeNode,
  TokenSelect,
  type TokenOption,
  Alert,
} from '@/components/ui';

export interface StudioLivePreviewProps {
  componentId: string;
  variable: ComponentVariable;
  type?: ComponentTypeSpec;
  typeId?: string;
  size?: 'sm' | 'md' | 'lg';
  iconSlot?: 'none' | 'left' | 'right' | 'icon-only';
  getPaletteValue: (paletteId: string) => string;
  status?: ComponentInteractiveStatus;
}

export function StudioLivePreview({
  componentId,
  variable,
  type,
  typeId: typeIdProp,
  size = 'md',
  iconSlot = 'none',
  getPaletteValue,
  status = 'default',
}: StudioLivePreviewProps) {
  const locale = useLocale();
  const [previewTokenVal, setPreviewTokenVal] = React.useState('--atom-palette-blue-500');
  const [previewTreeId, setPreviewTreeId] = React.useState('Button.tsx');
  const b = variable?.tokenBindings || {};
  const activeTypeId = (type?.id || typeIdProp || variable?.type?.id || '').toLowerCase();

  const isHover = status === 'hover';
  const isActive = status === 'active';
  const isFocus = status === 'focus';
  const isDisabled = status === 'disabled';
  const isLoading = status === 'loading';

  const statusWrapperStyle: React.CSSProperties = {
    ...(isHover ? { filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' } : {}),
    ...(isActive ? { transform: 'scale(0.97)' } : {}),
    ...(isFocus ? { outline: '2px solid var(--accent-primary)', outlineOffset: '3px' } : {}),
    ...(isDisabled ? { opacity: 0.45, cursor: 'not-allowed', pointerEvents: 'none' } : {}),
    ...(isLoading ? { opacity: 0.85, cursor: 'wait' } : {}),
  };

  // 1. Button
  if (componentId === 'button') {
    const typeId = activeTypeId;
    const themeColor = getPaletteValue(b.background || '--atom-color-primary');
    let bg = getPaletteValue(b.background || '');
    let textColor = getPaletteValue(b.textColor || '');
    let borderColor = getPaletteValue(b.borderColor || '');
    let borderRadius = getPaletteValue(b.borderRadius || '');
    let borderStyle = 'solid';
    let borderWidth = '1px';
    let boxShadow = 'var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.05))';
    let backdropFilter: string | undefined = undefined;
    let textDecoration: string | undefined = undefined;
    let backgroundImage: string | undefined = undefined;

    // Type-specific visual architecture customization
    if (typeId.includes('pill')) {
      borderRadius = '9999px';
    } else if (typeId.includes('outline')) {
      if (!isHover && !isActive) bg = 'transparent';
      borderColor = themeColor;
      textColor = themeColor;
      borderWidth = '1.5px';
      if (isHover) {
        bg = `color-mix(in srgb, ${themeColor} 12%, transparent)`;
        textColor = themeColor;
      } else if (isActive) {
        bg = `color-mix(in srgb, ${themeColor} 20%, transparent)`;
        textColor = themeColor;
      }
    } else if (typeId.includes('ghost')) {
      if (!isHover && !isActive) {
        bg = 'transparent';
        borderColor = 'transparent';
      }
      textColor = themeColor;
      borderColor = 'transparent';
      boxShadow = 'none';
      if (isHover) {
        bg = `color-mix(in srgb, ${themeColor} 12%, transparent)`;
        textColor = themeColor;
      } else if (isActive) {
        bg = `color-mix(in srgb, ${themeColor} 20%, transparent)`;
        textColor = themeColor;
      }
    } else if (typeId.includes('soft')) {
      bg = `color-mix(in srgb, ${themeColor} 12%, transparent)`;
      borderColor = 'transparent';
      textColor = themeColor;
      boxShadow = 'none';
      if (isHover) {
        bg = `color-mix(in srgb, ${themeColor} 22%, transparent)`;
        textColor = themeColor;
      } else if (isActive) {
        bg = `color-mix(in srgb, ${themeColor} 30%, transparent)`;
        textColor = themeColor;
      }
    } else if (typeId.includes('elevated')) {
      boxShadow = isHover
        ? '0 10px 25px -3px rgba(0, 0, 0, 0.18), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        : '0 4px 14px 0 rgba(0, 0, 0, 0.12)';
    } else if (typeId.includes('glassmorphic') || typeId.includes('glass')) {
      bg = isHover
        ? `color-mix(in srgb, ${themeColor} 18%, rgba(255, 255, 255, 0.4))`
        : `color-mix(in srgb, ${themeColor} 10%, rgba(255, 255, 255, 0.25))`;
      backdropFilter = 'blur(12px)';
      borderColor = `color-mix(in srgb, ${themeColor} 35%, transparent)`;
      boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.08)';
      textColor = themeColor;
    } else if (typeId.includes('link')) {
      bg = 'transparent';
      borderColor = 'transparent';
      boxShadow = 'none';
      textColor = themeColor;
      textDecoration = isHover ? 'underline' : 'none';
    } else if (typeId.includes('neumorphic')) {
      bg = 'var(--bg-secondary, #f3f4f6)';
      textColor = themeColor;
      borderColor = 'transparent';
      boxShadow = isActive
        ? 'inset 3px 3px 6px rgba(0,0,0,0.18), inset -3px -3px 6px rgba(255,255,255,0.7)'
        : '5px 5px 12px rgba(0,0,0,0.08), -5px -5px 12px rgba(255,255,255,0.8)';
    } else if (typeId.includes('floating-action') || typeId.includes('fab')) {
      borderRadius = '9999px';
      boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    }

    if (isHover) {
      if (b.hoverBackground && !typeId.includes('outline') && !typeId.includes('ghost') && !typeId.includes('soft') && !typeId.includes('link') && !typeId.includes('glassmorphic') && !typeId.includes('neumorphic')) {
        bg = getPaletteValue(b.hoverBackground);
      }
      if (b.hoverTextColor && !typeId.includes('outline') && !typeId.includes('ghost') && !typeId.includes('soft') && !typeId.includes('link') && !typeId.includes('glassmorphic') && !typeId.includes('neumorphic')) {
        textColor = getPaletteValue(b.hoverTextColor);
      }
      if (b.hoverBorderColor) borderColor = getPaletteValue(b.hoverBorderColor);
    } else if (isActive) {
      if (b.activeBackground && !typeId.includes('outline') && !typeId.includes('ghost') && !typeId.includes('soft') && !typeId.includes('link') && !typeId.includes('glassmorphic') && !typeId.includes('neumorphic')) {
        bg = getPaletteValue(b.activeBackground);
      }
      if (b.activeTextColor && !typeId.includes('outline') && !typeId.includes('ghost') && !typeId.includes('soft') && !typeId.includes('link') && !typeId.includes('glassmorphic') && !typeId.includes('neumorphic')) {
        textColor = getPaletteValue(b.activeTextColor);
      }
      if (b.activeBorderColor) borderColor = getPaletteValue(b.activeBorderColor);
    } else if (isFocus) {
      if (b.focusBackground) bg = getPaletteValue(b.focusBackground);
      if (b.focusBorderColor) borderColor = getPaletteValue(b.focusBorderColor);
    } else if (isDisabled) {
      if (b.disabledBackground) bg = getPaletteValue(b.disabledBackground);
      if (b.disabledTextColor) textColor = getPaletteValue(b.disabledTextColor);
      if (b.disabledBorderColor) borderColor = getPaletteValue(b.disabledBorderColor);
    }

    // Size-specific metrics (Variable: size)
    let padX = getPaletteValue(b.paddingX || '--atom-space-4');
    let padY = getPaletteValue(b.paddingY || '--atom-space-2');
    let fontSize = '14px';
    let iconClass = 'w-4 h-4 shrink-0';

    if (size === 'sm') {
      padX = '10px';
      padY = '6px';
      fontSize = '12px';
      iconClass = 'w-3.5 h-3.5 shrink-0';
    } else if (size === 'lg') {
      padX = '24px';
      padY = '12px';
      fontSize = '16px';
      iconClass = 'w-5 h-5 shrink-0';
    }

    if (typeId.includes('link')) {
      padX = '0px';
    }

    const isFab = typeId.includes('floating-action') || typeId.includes('fab');
    if (isFab) {
      padX = size === 'sm' ? '10px' : size === 'lg' ? '18px' : '14px';
      padY = padX;
    }

    const focusOutline = isFocus
      ? `2px solid ${b.focusBorderColor ? getPaletteValue(b.focusBorderColor) : 'var(--accent-primary)'}`
      : undefined;

    const labelText = isLoading
      ? (locale === 'ko' ? '로딩 중...' : 'Loading...')
      : formatLocaleText(variable?.name, locale) || (locale === 'ko' ? '버튼' : 'Button');

    return (
      <Button
        disabled={isDisabled || isLoading}
        style={{
          backgroundColor: bg,
          backgroundImage,
          color: textColor,
          border: `${borderWidth} ${borderStyle} ${borderColor}`,
          borderRadius,
          paddingLeft: padX,
          paddingRight: padX,
          paddingTop: padY,
          paddingBottom: padY,
          fontSize,
          outline: focusOutline,
          outlineOffset: focusOutline ? '2px' : undefined,
          boxShadow,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          textDecoration,
          ...statusWrapperStyle,
        }}
        className={`font-medium transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${
          isFab ? 'rounded-full aspect-square' : ''
        }`}
      >
        {isLoading && <Loader2 className={`${iconClass} animate-spin`} />}
        {!isLoading && (iconSlot === 'left' || (isFab && iconSlot === 'none')) && (
          <Sparkles className={iconClass} />
        )}
        {iconSlot !== 'icon-only' && !isFab && (
          <span>{labelText}</span>
        )}
        {!isLoading && iconSlot === 'right' && (
          <ArrowRight className={iconClass} />
        )}
        {!isLoading && iconSlot === 'icon-only' && !isFab && (
          <Sparkles className={iconClass} />
        )}
      </Button>
    );
  }

  // 2. Badge
  if (componentId === 'badge') {
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

  // 3. Card
  if (componentId === 'card') {
    let bg = getPaletteValue(b.background || '');
    let borderColor = isFocus
      ? (b.focusBorderColor ? getPaletteValue(b.focusBorderColor) : 'var(--accent-primary)')
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
          <h4 className="font-bold text-sm text-(--text-primary)">{locale === 'ko' ? '카드 제목' : 'Card Title'}</h4>
          {status !== 'default' && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-semibold">
              {status}
            </span>
          )}
        </div>
        <p className="text-xs text-(--text-secondary) leading-relaxed">
          {locale === 'ko' ? `이 카드는 "${formatLocaleText(variable?.name, locale)}" 토큰 매핑을 반영합니다.` : `This card reflects "${formatLocaleText(variable?.name, locale)}" token mappings.`}
        </p>
      </Card>
    );
  }

  // 4. Input
  if (componentId === 'input') {
    let bg = getPaletteValue(b.background || '');
    let textColor = getPaletteValue(b.textColor || '');
    let borderColor = getPaletteValue(b.borderColor || '');

    if (isHover) {
      if (b.hoverBackground) bg = getPaletteValue(b.hoverBackground);
      if (b.hoverBorderColor) borderColor = getPaletteValue(b.hoverBorderColor);
    } else if (isFocus) {
      if (b.focusBackground) bg = getPaletteValue(b.focusBackground);
      if (b.focusBorderColor) borderColor = getPaletteValue(b.focusBorderColor);
    } else if (isDisabled) {
      if (b.disabledBackground) bg = getPaletteValue(b.disabledBackground);
      if (b.disabledTextColor) textColor = getPaletteValue(b.disabledTextColor);
      if (b.disabledBorderColor) borderColor = getPaletteValue(b.disabledBorderColor);
    }

    const focusOutline = isFocus
      ? `2px solid ${b.focusBorderColor ? getPaletteValue(b.focusBorderColor) : 'var(--accent-primary)'}`
      : undefined;

    return (
      <div className="w-full max-w-sm relative" style={statusWrapperStyle}>
        <Input
          type="text"
          disabled={isDisabled || isLoading}
          defaultValue="Sample Input Value"
          style={{
            backgroundColor: bg,
            color: textColor,
            border: `1px solid ${borderColor}`,
            borderRadius: getPaletteValue(b.borderRadius || ''),
            paddingLeft: getPaletteValue(b.paddingX || ''),
            paddingRight: getPaletteValue(b.paddingX || ''),
            paddingTop: getPaletteValue(b.paddingY || ''),
            paddingBottom: getPaletteValue(b.paddingY || ''),
            outline: focusOutline,
            outlineOffset: focusOutline ? '1px' : undefined,
          }}
          className="w-full text-sm outline-none font-mono"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-(--text-muted)" />
          </div>
        )}
      </div>
    );
  }

  // 5. Modal
  if (componentId === 'modal') {
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
          <Button variant="secondary" size="sm">Dismiss</Button>
        </div>
      </div>
    );
  }

  // 6. Textarea
  if (componentId === 'textarea') {
    return (
      <Textarea
        defaultValue="Sample multi-line textarea with dynamic radius & borders."
        rows={3}
        style={{
          backgroundColor: getPaletteValue(b.background || ''),
          border: `1px solid ${getPaletteValue(b.borderColor || '')}`,
          borderRadius: getPaletteValue(b.borderRadius || ''),
          padding: getPaletteValue(b.padding || ''),
        }}
        className="w-full max-w-sm text-sm outline-none font-mono"
      />
    );
  }

  // 7. Switch
  if (componentId === 'switch') {
    return (
      <div className="flex items-center gap-3">
        <div
          style={{
            backgroundColor: getPaletteValue(b.activeBackground || ''),
            borderRadius: getPaletteValue(b.borderRadius || ''),
          }}
          className="w-12 h-6 p-0.5 flex items-center justify-end cursor-pointer shadow-xs transition-colors"
        >
          <div
            style={{
              backgroundColor: getPaletteValue(b.thumbColor || ''),
              borderRadius: getPaletteValue(b.borderRadius || ''),
            }}
            className="w-5 h-5 shadow-xs"
          />
        </div>
        <span className="text-xs font-semibold text-(--text-primary)">
          {variable?.name}
        </span>
      </div>
    );
  }

  // 8. Tabs
  if (componentId === 'tabs') {
    return (
      <div className="flex items-center gap-2 p-1.5 rounded-(--radius) bg-(--bg-secondary)/60 border border-(--border-subtle)">
        <Button
          variant="secondary"
          size="sm"
          style={{
            backgroundColor: variable?.id === 'pills' ? getPaletteValue(b.activeIndicator || '') : 'transparent',
            color: getPaletteValue(b.activeText || ''),
            borderRadius: getPaletteValue(b.borderRadius || ''),
            borderBottom: variable?.id === 'underlined' ? `2px solid ${getPaletteValue(b.activeIndicator || '')}` : 'none',
          }}
          className="px-3 py-1.5 text-xs font-bold"
        >
          Active Tab
        </Button>
        <Button
          variant="ghost"
          size="sm"
          style={{
            color: getPaletteValue(b.inactiveText || ''),
          }}
          className="px-3 py-1.5 text-xs font-medium"
        >
          Inactive Tab
        </Button>
      </div>
    );
  }

  // 9. Table
  if (componentId === 'table') {
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

  // 10. Avatar
  if (componentId === 'avatar') {
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

  // 11. Navbar
  if (componentId === 'navbar') {
    return (
      <div className="w-full max-w-xl">
        <Navbar
          bordered={false}
          blur={false}
          innerClassName="h-12 w-full px-4"
          style={{
            backgroundColor: getPaletteValue(b.background || ''),
            border: `1px solid ${getPaletteValue(b.borderColor || '')}`,
            borderRadius: getPaletteValue(b.borderRadius || ''),
          }}
          className="shadow-xs transition-all overflow-hidden"
        >
          <NavbarBrand>
            <span
              className="w-3.5 h-3.5 rounded-(--radius-sm) flex items-center justify-center shrink-0"
              style={{ backgroundColor: getPaletteValue(b.activeText || '') }}
            />
            <span className="font-bold text-sm tracking-tight text-(--text-primary)">
              AtomBrand
            </span>
          </NavbarBrand>

          <NavbarNav>
            <NavbarLink
              active
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                color: getPaletteValue(b.activeText || ''),
                backgroundColor: 'transparent',
              }}
              className="text-xs font-semibold"
            >
              대시보드
            </NavbarLink>
            <NavbarLink
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                color: getPaletteValue(b.textColor || ''),
              }}
              className="text-xs hover:opacity-80"
            >
              컴포넌트
            </NavbarLink>
            <NavbarLink
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                color: getPaletteValue(b.textColor || ''),
              }}
              className="text-xs hover:opacity-80"
            >
              문서
            </NavbarLink>
          </NavbarNav>

          <NavbarActions>
            <Button
              variant="primary"
              size="sm"
              style={{
                backgroundColor: getPaletteValue(b.activeText || ''),
                color: '#ffffff',
                borderColor: 'transparent',
              }}
              className="text-xs h-7 px-2.5"
            >
              시작하기
            </Button>
          </NavbarActions>
        </Navbar>
      </div>
    );
  }

  // 12. Sidebar & SideMenu
  if (componentId === 'sidebar' || componentId === 'sidemenu') {
    return (
      <div className="w-full max-w-xs">
        <Sidebar
          width="100%"
          style={{
            backgroundColor: getPaletteValue(b.background || ''),
            border: `1px solid ${getPaletteValue(b.borderColor || '')}`,
            borderRadius: getPaletteValue(b.borderRadius || ''),
          }}
          className="h-auto p-4 flex flex-col gap-3 shadow-xs transition-all overflow-hidden"
        >
          <SidebarHeader className="h-auto pb-3 px-0 border-b border-(--border-subtle)">
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs"
                style={{
                  backgroundColor: getPaletteValue(b.activeBackground || ''),
                  color: getPaletteValue(b.activeText || ''),
                }}
              >
                A
              </div>
              <span className="font-bold text-sm text-(--text-primary)">Atom Console</span>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-0 flex flex-col gap-1">
            <SidebarMenuButton
              active
              style={{
                backgroundColor: getPaletteValue(b.activeBackground || ''),
                color: getPaletteValue(b.activeText || ''),
                borderRadius: getPaletteValue(b.borderRadius || ''),
              }}
              className="px-3 py-2 text-xs font-semibold flex items-center justify-between shadow-xs"
            >
              <span>{locale === 'ko' ? '개요' : 'Overview'}</span>
              <Badge variant="primary" className="text-[10px] py-0 px-1.5">Live</Badge>
            </SidebarMenuButton>
            <SidebarMenuButton
              style={{
                color: getPaletteValue(b.textColor || ''),
                borderRadius: getPaletteValue(b.borderRadius || ''),
              }}
              className="px-3 py-2 text-xs hover:bg-(--bg-secondary) transition"
            >
              {locale === 'ko' ? '토큰 카탈로그' : 'Token Catalog'}
            </SidebarMenuButton>
            <SidebarMenuButton
              style={{
                color: getPaletteValue(b.textColor || ''),
                borderRadius: getPaletteValue(b.borderRadius || ''),
              }}
              className="px-3 py-2 text-xs hover:bg-(--bg-secondary) transition"
            >
              {locale === 'ko' ? '설정' : 'Settings'}
            </SidebarMenuButton>
          </SidebarContent>
        </Sidebar>
      </div>
    );
  }

  // 13. Nav & NavItem
  if (componentId === 'nav') {
    return (
      <div className="w-full max-w-xl flex flex-col items-center gap-4">
        <Nav
          variant={(variable?.id as any) || 'default'}
          className="transition-all"
        >
          <NavItem active>
            <NavLink
              asButton
              active
              style={{
                backgroundColor: getPaletteValue(b.activeBackground || ''),
                color: getPaletteValue(b.activeText || ''),
                borderRadius: getPaletteValue(b.borderRadius || ''),
                paddingLeft: getPaletteValue(b.paddingX || ''),
                paddingRight: getPaletteValue(b.paddingX || ''),
                paddingTop: getPaletteValue(b.paddingY || ''),
                paddingBottom: getPaletteValue(b.paddingY || ''),
              }}
            >
              {locale === 'ko' ? '대시보드' : 'Dashboard'}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              asButton
              style={{
                color: getPaletteValue(b.textColor || ''),
                borderRadius: getPaletteValue(b.borderRadius || ''),
                paddingLeft: getPaletteValue(b.paddingX || ''),
                paddingRight: getPaletteValue(b.paddingX || ''),
                paddingTop: getPaletteValue(b.paddingY || ''),
                paddingBottom: getPaletteValue(b.paddingY || ''),
              }}
            >
              컴포넌트
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              asButton
              style={{
                color: getPaletteValue(b.textColor || ''),
                borderRadius: getPaletteValue(b.borderRadius || ''),
                paddingLeft: getPaletteValue(b.paddingX || ''),
                paddingRight: getPaletteValue(b.paddingX || ''),
                paddingTop: getPaletteValue(b.paddingY || ''),
                paddingBottom: getPaletteValue(b.paddingY || ''),
              }}
            >
              가이드
            </NavLink>
          </NavItem>
          <NavItem>
            <NavDropdown label="더보기">
              <NavDropdownItem
                title="디자인 토큰"
                description="W3C DTCG 표준 토큰 규격"
              />
              <NavDropdownItem
                title="UX 패턴"
                description="27개 실무 검증 인터랙션"
              />
            </NavDropdown>
          </NavItem>
        </Nav>
      </div>
    );
  }

  // 14. Checkbox
  if (componentId === 'checkbox') {
    return (
      <div className="flex flex-col gap-3">
        <Checkbox
          defaultChecked
          label={locale === 'ko' ? '선택된 체크박스' : 'Checked Checkbox'}
          style={{
            accentColor: getPaletteValue(b.checkedBackground || ''),
            borderRadius: getPaletteValue(b.borderRadius || ''),
          }}
        />
        <Checkbox
          label={locale === 'ko' ? '미선택 체크박스' : 'Unchecked Checkbox'}
          style={{
            borderRadius: getPaletteValue(b.borderRadius || ''),
          }}
        />
      </div>
    );
  }

  // 15. Select
  if (componentId === 'select') {
    return (
      <div className="w-full max-w-xs">
        <NativeSelect
          style={{
            backgroundColor: getPaletteValue(b.background || ''),
            border: `1px solid ${getPaletteValue(b.borderColor || '')}`,
            color: getPaletteValue(b.textColor || ''),
            borderRadius: getPaletteValue(b.borderRadius || ''),
            padding: getPaletteValue(b.padding || ''),
          }}
          className="w-full text-sm"
        >
          <option>{locale === 'ko' ? '옵션 1' : 'Option 1'}</option>
          <option>{locale === 'ko' ? '옵션 2' : 'Option 2'}</option>
          <option>{locale === 'ko' ? '옵션 3' : 'Option 3'}</option>
        </NativeSelect>
      </div>
    );
  }

  // 16. Radio
  if (componentId === 'radio') {
    return (
      <RadioGroup
        name={`preview-radio-${variable?.id}`}
        value="opt1"
        options={[
          { value: 'opt1', label: locale === 'ko' ? '라디오 옵션 A' : 'Radio Option A' },
          { value: 'opt2', label: locale === 'ko' ? '라디오 옵션 B' : 'Radio Option B' },
        ]}
        onChange={() => {}}
      />
    );
  }

  // 17. Slider
  if (componentId === 'slider') {
    return (
      <div className="w-full max-w-sm flex flex-col gap-2">
        <div className="flex justify-between text-xs font-mono text-(--text-secondary)">
          <span>Volume</span>
          <span>65%</span>
        </div>
        <Slider value={65} onChange={() => {}} />
      </div>
    );
  }

  // 18. Progress
  if (componentId === 'progress') {
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

  // 19. Skeleton
  if (componentId === 'skeleton') {
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

  // 20. Tooltip
  if (componentId === 'tooltip') {
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

  // 21. Accordion
  if (componentId === 'accordion') {
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

  // 22. Breadcrumb
  if (componentId === 'breadcrumb') {
    return (
      <Breadcrumb
        items={[
          { label: '홈', href: '#' },
          { label: '라이브러리', href: '#' },
          { label: variable?.name || 'Current Item' },
        ]}
      />
    );
  }

  // 23. Pagination
  if (componentId === 'pagination') {
    return (
      <Pagination
        currentPage={3}
        totalPages={8}
        onPageChange={() => {}}
      />
    );
  }

  // 24. Separator
  if (componentId === 'separator') {
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

  // 25. Calendar
  if (componentId === 'calendar') {
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

  // 26. Chart
  if (componentId === 'chart') {
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
    let fill = getPaletteValue(b.fillColor || '');
    let grid = getPaletteValue(b.gridColor || '');
    let radius = getPaletteValue(b.borderRadius || '');
    let padding = getPaletteValue(b.padding || '');

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

  // 27. Offcanvas (오프캔버스 서랍 / 오버레이)
  if (componentId === 'offcanvas') {
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

    const bg = isHover && b.hoverBackground
      ? getPaletteValue(b.hoverBackground)
      : isActive && b.activeBackground
      ? getPaletteValue(b.activeBackground)
      : b.background
      ? getPaletteValue(b.background)
      : undefined;

    const border = isHover && b.hoverBorderColor
      ? getPaletteValue(b.hoverBorderColor)
      : b.borderColor
      ? getPaletteValue(b.borderColor)
      : undefined;

    const text = isHover && b.hoverTextColor
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
              <Button variant="secondary" size="sm">취소</Button>
              <Button variant="primary" size="sm">적용하기</Button>
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

  // 28. Toast (토스트 알림 / 피드백)
  if (componentId === 'toast') {
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
      ? (locale === 'ko' ? '저장 완료' : 'Saved Successfully')
      : isWarning
      ? (locale === 'ko' ? '세션 만료 예정' : 'Session Expiring Soon')
      : isDanger
      ? (locale === 'ko' ? '네트워크 요청 실패' : 'Network Request Failed')
      : isAction
      ? (locale === 'ko' ? '항목이 휴지통으로 이동됨' : 'Item moved to trash')
      : (locale === 'ko' ? '새로운 시스템 알림' : 'System Notification');

    const desc = isSuccess
      ? (locale === 'ko' ? '변경 사항이 안전하게 클라우드에 동기화되었습니다.' : 'Changes have been synchronized to the cloud.')
      : isWarning
      ? (locale === 'ko' ? '5분 후 자동 로그아웃됩니다. 작업을 저장해 주세요.' : 'Automatic logout in 5 min. Please save your work.')
      : isDanger
      ? (locale === 'ko' ? '서버와의 통신이 원활하지 않습니다. 다시 시도해 주세요.' : 'Could not reach server. Please retry.')
      : isAction
      ? (locale === 'ko' ? '프로젝트가 성공적으로 보관 처리되었습니다.' : 'Project archived successfully.')
      : (locale === 'ko' ? 'AtomSystem v0.13.0 업데이트가 배포되었습니다.' : 'AtomSystem v0.13.0 update is now available.');

    const bg = isHover && b.hoverBackground
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
            isAction ? {
              label: locale === 'ko' ? '실행 취소' : 'Undo',
              onClick: () => {},
            } : undefined
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

  // 29. Container (컨테이너 레이아웃)
  if (componentId === 'container') {
    const bg = b.background ? getPaletteValue(b.background) : 'var(--bg-primary)';
    const border = b.borderColor ? getPaletteValue(b.borderColor) : 'var(--border-subtle)';
    const text = b.textColor ? getPaletteValue(b.textColor) : 'var(--text-primary)';
    const radius = b.borderRadius ? getPaletteValue(b.borderRadius) : 'var(--radius)';
    const px = b.paddingX ? getPaletteValue(b.paddingX) : '16px';
    const py = b.paddingY ? getPaletteValue(b.paddingY) : '12px';

    const containerSize =
      activeTypeId.includes('fluid')
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

  // 30. Layout & Stack (레이아웃 & 스택)
  if (componentId === 'layout') {
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
            <div className="px-3 py-2 border-b text-[11px] font-mono font-bold flex items-center justify-between bg-(--bg-primary)" style={{ borderColor: border }}>
              <span>Layout.Header</span>
              <Badge variant="neutral" className="text-[9px]">AppShell</Badge>
            </div>
            <div className="flex min-h-[110px]" style={{ gap, padding }}>
              <div className="w-24 shrink-0 border p-2 text-[10px] font-mono bg-(--bg-primary)" style={{ borderColor: border, borderRadius: radius }}>
                Sidebar
              </div>
              <div className="flex-1 border p-2 text-[10px] font-mono bg-(--bg-primary)" style={{ borderColor: border, borderRadius: radius }}>
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

  // 31. Tree View (트리 뷰)
  if (componentId === 'tree') {
    const bg = b.background ? getPaletteValue(b.background) : 'var(--bg-primary)';
    const border = b.borderColor ? getPaletteValue(b.borderColor) : 'var(--border-subtle)';
    const text = b.textColor ? getPaletteValue(b.textColor) : 'var(--text-primary)';
    const radius = b.borderRadius ? getPaletteValue(b.borderRadius) : 'var(--radius-md)';
    const padding = b.padding ? getPaletteValue(b.padding) : '12px';

    const treeData: TreeNode[] = [
      {
        id: 'components',
        label: 'components/ui',
        icon: <Folder className="w-3.5 h-3.5" />,
        children: [
          { id: 'Button.tsx', label: 'Button.tsx', icon: <FileCode className="w-3.5 h-3.5" /> },
          { id: 'TokenSelect.tsx', label: 'TokenSelect.tsx', icon: <FileCode className="w-3.5 h-3.5" /> },
          { id: 'Alert.tsx', label: 'Alert.tsx', icon: <FileCode className="w-3.5 h-3.5" /> },
        ],
      },
      {
        id: 'tokens',
        label: 'tokens/token.json',
        icon: <FileCode className="w-3.5 h-3.5" />,
      },
    ];

    return (
      <div className="w-full max-w-sm transition-all" style={statusWrapperStyle}>
        <div
          style={{
            backgroundColor: bg,
            borderColor: border,
            color: text,
            borderRadius: radius,
            padding,
          }}
          className={`${activeTypeId.includes('bordered') ? 'border-2' : 'border'} shadow-2xs ${activeTypeId.includes('compact') ? 'text-xs' : ''}`}
        >
          <Tree
            data={treeData}
            defaultExpandedIds={['components']}
            selectedId={previewTreeId}
            onSelect={(node) => setPreviewTreeId(node.id)}
          />
        </div>
      </div>
    );
  }

  // 32. TokenSelect (토큰 검색 드롭다운)
  if (componentId === 'token-select') {
    const sampleTokens: TokenOption[] = [
      { id: '--atom-palette-blue-500', name: 'Blue 500 (Primary)', value: '#3182f6', category: 'color', family: 'blue' },
      { id: '--atom-palette-blue-600', name: 'Blue 600 (Hover)', value: '#1b64da', category: 'color', family: 'blue' },
      { id: '--atom-palette-emerald-500', name: 'Emerald 500 (Success)', value: '#10b981', category: 'color', family: 'emerald' },
      { id: '--atom-palette-rose-500', name: 'Rose 500 (Destructive)', value: '#ef4444', category: 'color', family: 'rose' },
      { id: '--atom-radius-md', name: 'Radius Medium', value: '8px', category: 'radius', family: 'radius' },
    ];
    const variantMode = activeTypeId.includes('filled')
      ? 'filled'
      : activeTypeId.includes('subtle')
      ? 'subtle'
      : 'outlined';

    return (
      <div className="w-full max-w-sm transition-all" style={statusWrapperStyle}>
        <TokenSelect
          options={sampleTokens}
          value={previewTokenVal}
          onChange={(val) => setPreviewTokenVal(val)}
          variant={variantMode}
          size={size}
          disabled={isDisabled}
          label={locale === 'ko' ? '실시간 토큰 검색' : 'Live Token Picker'}
        />
      </div>
    );
  }

  // 33. Alert (알림 콜아웃)
  if (componentId === 'alert') {
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

    const typeStyleOverride = activeTypeId.includes('solid') || activeTypeId.includes('outlined') || activeTypeId.includes('accent')
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
              ? (locale === 'ko' ? '토큰 동기화 완료' : 'Tokens Synchronized')
              : toneVariant === 'warning'
              ? (locale === 'ko' ? '대비율 확인 권장' : 'Contrast Check Recommended')
              : toneVariant === 'destructive'
              ? (locale === 'ko' ? '유효성 검증 오류' : 'Validation Error')
              : (locale === 'ko' ? '디자인 시스템 안내' : 'Design System Notice')
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

  // 34. Sheet (바텀시트 & 드로어)
  if (componentId === 'sheet') {
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
          title={placement === 'bottom' ? (locale === 'ko' ? '필터 및 정렬 시트' : 'Filter & Sort Sheet') : (locale === 'ko' ? '상세 정보 시트' : 'Detail Sheet')}
          description={locale === 'ko' ? '현재 컨텍스트를 유지한 채 추가 옵션을 선택합니다.' : 'Select options while keeping current view context.'}
          className={activeTypeId.includes('floating') ? 'shadow-2xl m-1' : ''}
          style={{
            backgroundColor: bg,
            borderColor: border,
            color: text,
            borderRadius: radius,
          }}
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button variant="secondary" size="sm">{locale === 'ko' ? '닫기' : 'Close'}</Button>
              <Button variant="primary" size="sm">{locale === 'ko' ? '선택 완료' : 'Confirm'}</Button>
            </div>
          }
        >
          <div className="space-y-2 text-xs" style={{ padding }}>
            <div className="flex items-center justify-between p-2 rounded-(--radius-sm) bg-(--bg-secondary)">
              <span className="font-medium">{locale === 'ko' ? '최신순 정렬' : 'Sort by Newest'}</span>
              <Badge variant="primary">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-(--radius-sm) border border-(--border-subtle)">
              <span className="text-(--text-secondary)">{locale === 'ko' ? '인기순 정렬' : 'Sort by Popular'}</span>
              <span className="font-mono text-[10px] text-(--text-muted)">default</span>
            </div>
          </div>
        </Offcanvas>
      </div>
    );
  }

  return (
    <div className="text-xs text-(--text-muted) italic">
      미리보기가 지원되지 않는 컴포넌트입니다.
    </div>
  );
}
