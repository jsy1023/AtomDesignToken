'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Palette, Sun, Moon, Check, X, RotateCcw, Type, Maximize2, Sparkles } from 'lucide-react';
import { atomTokens } from '@/lib/tokens';
import { INITIAL_STUDIO_THEMES, StudioTheme } from '@/lib/data/themeData';
import { INITIAL_PALETTE_VARIABLES } from '@/lib/data/studioData';
import { injectWebfontLink } from '@/lib/services/themeEngine';
import { NativeSelect } from './Select';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card } from './Card';
import { TabsList, TabsTrigger, TabsContent } from './Tabs';

export interface ThemeSwitcherProps {
  /** Visual presentation type: 'dropdown' | 'pills' | 'compact' | 'floating' */
  variant?: 'dropdown' | 'pills' | 'compact' | 'floating';
  /** Control size */
  size?: 'sm' | 'md' | 'lg';
  /** Custom theme list; defaults to themes from tokens/tokens.json */
  themes?: StudioTheme[];
  /** Controlled active theme ID */
  value?: string;
  /** Initial theme ID; defaults to activeThemeId in tokens/tokens.json */
  defaultThemeId?: string;
  /** localStorage key to persist selected theme, or false to disable */
  persistKey?: string | false;
  /** Optional label shown next to the switcher */
  label?: string;
  /** Whether to show light/dark mode badge in dropdown mode */
  showModeBadge?: boolean;
  /** Allow floating switcher to appear in production (defaults to false: local/dev only) */
  allowInProduction?: boolean;
  /** Additional className for wrapper */
  className?: string;
  /** Callback fired when theme changes */
  onThemeChange?: (theme: StudioTheme) => void;
}

interface TokenOverrides {
  radius?: string;
  spacing?: string;
  fontFamily?: string;
  fontCdnUrl?: string;
  fontSize?: string;
  iconSize?: string;
  iconStroke?: string;
  iconColor?: string;
}

const OVERRIDES_STORAGE_KEY = 'atom-floating-token-overrides';
const ICON_STYLE_ID = 'atom-floating-icon-overrides';

const STUDIO_FONT_OPTIONS = [
  {
    label: 'Spoqa Han Sans Neo (기본)',
    value: "'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
    cdnUrl: 'https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css',
  },
  {
    label: 'Pretendard',
    value: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    cdnUrl: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css',
  },
  {
    label: 'Inter',
    value: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    cdnUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  },
  {
    label: 'Noto Sans KR',
    value: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    cdnUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap',
  },
  {
    label: 'JetBrains Mono',
    value: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    cdnUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
  },
];

function applyTokenOverridesToRoot(overrides: TokenOverrides): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  if (overrides.radius) {
    root.style.setProperty('--radius', overrides.radius);
    root.style.setProperty('--atom-radius-md', overrides.radius);
    root.style.setProperty('--atom-radius-lg', overrides.radius);
  }
  if (overrides.spacing) {
    root.style.setProperty('--atom-layout-gutter', overrides.spacing);
    root.style.setProperty('--atom-space-4', overrides.spacing);
  }
  if (overrides.fontFamily) {
    root.style.setProperty('--font-sans', overrides.fontFamily);
    root.style.setProperty('--atom-font-sans', overrides.fontFamily);
    if (overrides.fontCdnUrl) injectWebfontLink(overrides.fontCdnUrl);
  }
  if (overrides.fontSize) {
    root.style.fontSize = overrides.fontSize;
    root.style.setProperty('--atom-typography-base', overrides.fontSize);
  } else {
    root.style.removeProperty('font-size');
  }

  let iconStyleEl = document.getElementById(ICON_STYLE_ID) as HTMLStyleElement | null;
  if (overrides.iconSize || overrides.iconStroke || overrides.iconColor) {
    if (!iconStyleEl) {
      iconStyleEl = document.createElement('style');
      iconStyleEl.id = ICON_STYLE_ID;
      document.head.appendChild(iconStyleEl);
    }
    const rules: string[] = [];
    if (overrides.iconSize) {
      rules.push(`width: ${overrides.iconSize} !important; height: ${overrides.iconSize} !important;`);
    }
    if (overrides.iconStroke) {
      rules.push(`stroke-width: ${overrides.iconStroke} !important;`);
    }
    if (overrides.iconColor) {
      rules.push(`color: ${overrides.iconColor} !important;`);
    }
    iconStyleEl.textContent = `svg.lucide { ${rules.join(' ')} }`;
  } else if (iconStyleEl) {
    iconStyleEl.remove();
  }
}

/**
 * Applies a StudioTheme's semantic CSS variables and `data-atom-theme` attribute to `:root`.
 */
export function applyStudioThemeToRoot(theme: StudioTheme): void {
  if (typeof document === 'undefined') return;
  const legacyStyle = document.getElementById('atom-theme-live-engine-style');
  if (legacyStyle) legacyStyle.remove();
  const root = document.documentElement;
  root.setAttribute('data-atom-theme', theme.id);
  root.style.colorScheme = theme.mode;

  const c = theme.colors;
  const fallbackSecondary = c.secondary || c.bgSecondary;
  const fallbackSecondaryHover = c.secondaryHover || c.borderStrong;
  const entries: Array<[string, string | undefined]> = [
    ['--atom-color-primary', c.primary],
    ['--atom-primary', c.primary],
    ['--accent-primary', c.primary],
    ['--atom-color-primary-hover', c.primaryHover],
    ['--accent-primary-hover', c.primaryHover],
    ['--atom-color-primary-subtle', c.primaryLight],
    ['--atom-color-secondary', fallbackSecondary],
    ['--atom-color-secondary-hover', fallbackSecondaryHover],
    ['--atom-color-secondary-subtle', c.secondaryLight || c.bgSecondary],
    ['--atom-bg-primary', c.bgPrimary],
    ['--bg-primary', c.bgPrimary],
    ['--atom-bg-secondary', c.bgSecondary],
    ['--atom-bg-surface', c.bgSecondary],
    ['--atom-bg-muted', c.bgSecondary],
    ['--bg-secondary', c.bgSecondary],
    ['--atom-text-primary', c.textPrimary],
    ['--text-primary', c.textPrimary],
    ['--atom-text-secondary', c.textSecondary],
    ['--text-secondary', c.textSecondary],
    ['--atom-text-muted', c.textMuted],
    ['--text-muted', c.textMuted],
    ['--atom-border-subtle', c.borderSubtle],
    ['--border-subtle', c.borderSubtle],
    ['--atom-border-strong', c.borderStrong],
    ['--border-strong', c.borderStrong],
    ['--atom-color-success', c.statusSuccess],
    ['--atom-color-destructive', c.statusDanger],
    ['--atom-color-warning', c.statusWarning],
    ['--radius', theme.borderRadius],
  ];

  for (const [prop, value] of entries) {
    if (value) root.style.setProperty(prop, value);
  }
}

/**
 * Embeddable ThemeSwitcher component that loads themes & tokens from AtomSystem Studio (`tokens/tokens.json`)
 * and applies the selected theme and token overrides across the entire project in real time.
 */
export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = 'dropdown',
  size = 'md',
  themes: themesProp,
  value,
  defaultThemeId,
  persistKey = 'atom-active-theme',
  label,
  showModeBadge = true,
  allowInProduction = false,
  className = '',
  onThemeChange,
}) => {
  const [isLocalHost, setIsLocalHost] = useState(false);
  const [floatingTab, setFloatingTab] = useState<'theme' | 'space' | 'font' | 'icon'>('theme');
  const [overrides, setOverrides] = useState<TokenOverrides>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = window.localStorage.getItem(OVERRIDES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const h = window.location.hostname;
    const isDev = process.env.NODE_ENV === 'development';
    const isLocal =
      h === 'localhost' ||
      h === '127.0.0.1' ||
      h.endsWith('.local') ||
      h.startsWith('192.168.') ||
      h.startsWith('10.');
    setIsLocalHost(isDev || isLocal);
  }, []);

  const availableThemes = useMemo(
    () => (themesProp && themesProp.length > 0 ? themesProp : INITIAL_STUDIO_THEMES),
    [themesProp]
  );

  // Studio palette tokens (SSOT)
  const radiusTokens = useMemo(
    () => INITIAL_PALETTE_VARIABLES.filter((p) => p.category === 'radius'),
    []
  );
  const spacingTokens = useMemo(
    () =>
      INITIAL_PALETTE_VARIABLES.filter(
        (p) =>
          p.category === 'spacing' &&
          ['8px', '12px', '16px', '20px', '24px', '32px'].includes(p.value)
      ),
    []
  );

  const ssotThemeId = atomTokens.theme.activeThemeId || availableThemes[0]?.id || 'ocean-blue';

  const initialId = useMemo(() => {
    const fallback = defaultThemeId || ssotThemeId;
    if (typeof window !== 'undefined' && persistKey) {
      const saved = window.localStorage.getItem(persistKey);
      const savedSsot = window.localStorage.getItem(`${persistKey}:ssot`);
      if (saved && savedSsot === ssotThemeId && availableThemes.some((t) => t.id === saved)) {
        return saved;
      }
    }
    return fallback;
  }, [availableThemes, defaultThemeId, persistKey, ssotThemeId]);

  const [selectedId, setSelectedId] = useState<string>(initialId);
  const [floatingOpen, setFloatingOpen] = useState(false);

  const activeThemeId = value ?? selectedId;

  const currentTheme = useMemo(
    () => availableThemes.find((t) => t.id === activeThemeId) || availableThemes[0],
    [availableThemes, activeThemeId]
  );

  const updateOverrides = useCallback((patch: Partial<TokenOverrides>) => {
    setOverrides((prev) => {
      const next = { ...prev, ...patch };
      applyTokenOverridesToRoot(next);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(OVERRIDES_STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const resetOverrides = useCallback(() => {
    setOverrides({});
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(OVERRIDES_STORAGE_KEY);
    }
    if (currentTheme) {
      applyStudioThemeToRoot(currentTheme);
      applyTokenOverridesToRoot({});
    }
  }, [currentTheme]);

  const selectTheme = useCallback(
    (nextId: string) => {
      const target = availableThemes.find((t) => t.id === nextId);
      if (!target) return;
      setSelectedId(target.id);
      setOverrides({});
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(OVERRIDES_STORAGE_KEY);
        if (persistKey) {
          window.localStorage.setItem(persistKey, target.id);
          window.localStorage.setItem(`${persistKey}:ssot`, ssotThemeId);
        }
      }
      applyStudioThemeToRoot(target);
      applyTokenOverridesToRoot({});
      onThemeChange?.(target);
    },
    [availableThemes, onThemeChange, persistKey, ssotThemeId]
  );

  useEffect(() => {
    if (currentTheme) {
      applyStudioThemeToRoot(currentTheme);
      applyTokenOverridesToRoot(overrides);
    }
  }, [currentTheme, overrides]);

  if (availableThemes.length === 0) return null;

  if (variant === 'floating') {
    if (!allowInProduction && !isLocalHost) return null;
    return (
      <div
        data-component="theme-switcher"
        data-variable="floating"
        style={{ zIndex: 9999 }}
        className={`fixed bottom-5 right-5 flex flex-col items-end gap-2 ${className}`}
      >
        {floatingOpen && (
          <Card className="w-80 p-3.5 shadow-xl border border-(--border-strong) bg-(--bg-primary) space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-(--border-subtle)">
              <span className="text-xs font-bold text-(--text-primary) flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>{label || 'AtomSystem Studio Bar'}</span>
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  onClick={resetOverrides}
                  title="토큰 초기화"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  onClick={() => setFloatingOpen(false)}
                  title="닫기"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <TabsList className="w-full grid grid-cols-4 gap-0.5 p-0.5 text-[11px]">
              <TabsTrigger active={floatingTab === 'theme'} onClick={() => setFloatingTab('theme')} className="px-1.5 py-1 text-[11px]">
                테마
              </TabsTrigger>
              <TabsTrigger active={floatingTab === 'space'} onClick={() => setFloatingTab('space')} className="px-1.5 py-1 text-[11px]">
                간격
              </TabsTrigger>
              <TabsTrigger active={floatingTab === 'font'} onClick={() => setFloatingTab('font')} className="px-1.5 py-1 text-[11px]">
                글씨
              </TabsTrigger>
              <TabsTrigger active={floatingTab === 'icon'} onClick={() => setFloatingTab('icon')} className="px-1.5 py-1 text-[11px]">
                아이콘
              </TabsTrigger>
            </TabsList>

            {/* 1. 테마 탭 */}
            <TabsContent active={floatingTab === 'theme'} className="p-2 border-0 bg-transparent">
              <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto">
                {availableThemes.map((theme) => {
                  const isActive = theme.id === currentTheme?.id;
                  return (
                    <Button
                      key={theme.id}
                      variant={isActive ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => selectTheme(theme.id)}
                      className="w-full justify-between px-2.5 py-2 h-auto"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3 h-3 rounded-full border border-(--border-strong) shrink-0"
                          style={{ backgroundColor: theme.brandColor || theme.colors.primary }}
                          aria-hidden="true"
                        />
                        <span className="truncate text-xs">{theme.name}</span>
                      </span>
                      <span className="text-[11px] opacity-80 shrink-0">
                        {isActive ? '✓' : theme.mode}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </TabsContent>

            {/* 2. 간격 & 곡률 토큰 탭 */}
            <TabsContent active={floatingTab === 'space'} className="p-2 border-0 bg-transparent space-y-3">
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-(--text-secondary) flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>모서리 곡률 (--radius)</span>
                </div>
                <NativeSelect
                  value={overrides.radius || currentTheme?.borderRadius || '8px'}
                  onChange={(e) => updateOverrides({ radius: e.target.value })}
                  className="h-8 text-xs"
                >
                  {radiusTokens.map((r) => (
                    <option key={r.id} value={r.value}>
                      {r.name}
                    </option>
                  ))}
                </NativeSelect>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-(--text-secondary)">
                  레이아웃 간격 (--atom-layout-gutter)
                </div>
                <NativeSelect
                  value={overrides.spacing || '16px'}
                  onChange={(e) => updateOverrides({ spacing: e.target.value })}
                  className="h-8 text-xs"
                >
                  {spacingTokens.map((s) => (
                    <option key={s.id} value={s.value}>
                      {s.name}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            </TabsContent>

            {/* 4. 글씨(타이포그래피) 토큰 탭 */}
            <TabsContent active={floatingTab === 'font'} className="p-2 border-0 bg-transparent space-y-3">
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-(--text-secondary) flex items-center gap-1">
                  <Type className="w-3 h-3" />
                  <span>폰트 패밀리 (--font-sans)</span>
                </div>
                <NativeSelect
                  value={overrides.fontFamily || STUDIO_FONT_OPTIONS[0].value}
                  onChange={(e) => {
                    const found = STUDIO_FONT_OPTIONS.find((f) => f.value === e.target.value);
                    updateOverrides({ fontFamily: e.target.value, fontCdnUrl: found?.cdnUrl });
                  }}
                  className="h-8 text-xs"
                >
                  {STUDIO_FONT_OPTIONS.map((f) => (
                    <option key={f.label} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </NativeSelect>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-(--text-secondary)">
                  기본 글자 크기 (--atom-typography-base)
                </div>
                <NativeSelect
                  value={overrides.fontSize || '16px'}
                  onChange={(e) => updateOverrides({ fontSize: e.target.value })}
                  className="h-8 text-xs"
                >
                  {['14px', '15px', '16px', '17px', '18px'].map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            </TabsContent>

            {/* 5. 아이콘 토큰 탭 */}
            <TabsContent active={floatingTab === 'icon'} className="p-2 border-0 bg-transparent space-y-3">
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-(--text-secondary) flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>아이콘 크기 (--atom-icon-size)</span>
                </div>
                <NativeSelect
                  value={overrides.iconSize || ''}
                  onChange={(e) => updateOverrides({ iconSize: e.target.value || undefined })}
                  className="h-8 text-xs"
                >
                  <option value="">기본값 (컴포넌트별 규격)</option>
                  <option value="14px">Small (14px)</option>
                  <option value="16px">Medium (16px)</option>
                  <option value="18px">Large (18px)</option>
                  <option value="20px">XLarge (20px)</option>
                </NativeSelect>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-(--text-secondary)">
                  선 두께 (--atom-icon-stroke)
                </div>
                <NativeSelect
                  value={overrides.iconStroke || ''}
                  onChange={(e) => updateOverrides({ iconStroke: e.target.value || undefined })}
                  className="h-8 text-xs"
                >
                  <option value="">기본값 (2)</option>
                  <option value="1.5">Thin (1.5)</option>
                  <option value="1.75">Regular (1.75)</option>
                  <option value="2">Medium (2)</option>
                  <option value="2.5">Bold (2.5)</option>
                </NativeSelect>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-(--text-secondary)">
                  아이콘 색상 (--atom-icon-color)
                </div>
                <NativeSelect
                  value={overrides.iconColor || ''}
                  onChange={(e) => updateOverrides({ iconColor: e.target.value || undefined })}
                  className="h-8 text-xs"
                >
                  <option value="">기본값 (상속)</option>
                  <option value="var(--accent-primary)">브랜드 강조색 (--accent-primary)</option>
                  <option value="var(--text-primary)">기본 텍스트 (--text-primary)</option>
                  <option value="var(--text-secondary)">보조 텍스트 (--text-secondary)</option>
                </NativeSelect>
              </div>
            </TabsContent>
          </Card>
        )}

        <Button
          variant="primary"
          size={size === 'lg' ? 'lg' : 'md'}
          onClick={() => setFloatingOpen((prev) => !prev)}
          className="rounded-full shadow-lg gap-2"
        >
          <Palette className="w-4 h-4" />
          <span className="text-xs font-semibold">{currentTheme?.name || 'Theme'}</span>
        </Button>
      </div>
    );
  }

  if (variant === 'pills') {
    const btnSize = size === 'lg' ? 'md' : 'sm';
    return (
      <div
        data-component="theme-switcher"
        data-variable="pills"
        className={`flex flex-wrap items-center gap-2 ${className}`}
      >
        {label && (
          <span className="text-xs font-medium text-(--text-secondary) mr-1">{label}</span>
        )}
        {availableThemes.map((theme) => {
          const isActive = theme.id === currentTheme?.id;
          return (
            <Button
              key={theme.id}
              variant={isActive ? 'primary' : 'outline'}
              size={btnSize}
              onClick={() => selectTheme(theme.id)}
              className="gap-1.5"
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-(--border-strong) shrink-0"
                style={{ backgroundColor: theme.brandColor || theme.colors.primary }}
                aria-hidden="true"
              />
              <span>{theme.name}</span>
              {isActive && <Check className="w-3 h-3" />}
            </Button>
          );
        })}
      </div>
    );
  }

  const selectSizeClass =
    size === 'sm' ? 'h-8 text-xs' : size === 'lg' ? 'h-11 text-sm' : 'h-9 text-xs sm:text-sm';

  return (
    <div
      data-component="theme-switcher"
      data-variable={variant}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {label && (
        <span className="text-xs font-medium text-(--text-secondary) whitespace-nowrap">
          {label}
        </span>
      )}
      <div className="inline-flex items-center gap-1.5">
        <Palette className="w-4 h-4 text-(--accent-primary) shrink-0" aria-hidden="true" />
        <NativeSelect
          value={currentTheme?.id || ''}
          onChange={(e) => selectTheme(e.target.value)}
          aria-label={label || 'Select theme'}
          className={`w-auto min-w-[160px] ${selectSizeClass}`}
        >
          {availableThemes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name} ({theme.mode})
            </option>
          ))}
        </NativeSelect>
      </div>
      {variant === 'dropdown' && showModeBadge && currentTheme && (
        <Badge variant="neutral" className="inline-flex items-center gap-1 shrink-0">
          {currentTheme.mode === 'dark' ? (
            <Moon className="w-3 h-3" />
          ) : (
            <Sun className="w-3 h-3" />
          )}
          <span>{currentTheme.mode}</span>
        </Badge>
      )}
    </div>
  );
};

ThemeSwitcher.displayName = 'ThemeSwitcher';
