'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { GalleryComponent } from '@/lib/data/components';
import { PATTERNS_COLLECTION } from '@/lib/data/patterns';
import { Tree, TreeNode } from '@/components/ui/Tree';
import {
  Button,
  Badge,
  Card,
  Input,
  NativeSelect,
  Modal,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TabsList,
  TabsTrigger,
  TabsContent,
  Switch,
  Checkbox,
  Container,
  Layout,
  Stack,
  Grid,
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarLink,
  NavbarActions,
  NavbarToggle,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarToggle,
  Chart,
  Offcanvas,
  Toast,
  Alert,
  TokenSelect,
} from '@/components/ui';
import {
  getComponentTypes,
  ComponentInteractiveStatus,
  resolveStudioComponentId,
} from '@/lib/data/studioData';
import { useStudioRegistry, getStudioComponentById } from '@/lib/hooks/useStudioRegistry';
import { StudioLivePreview } from '@/components/studio/StudioLivePreview';
import { formatLocaleText } from '@/lib/utils/localeFormat';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { COMPONENT_TOKEN_MAPPINGS, getComponentTokens, getLocalizedToken } from '@/lib/data/componentTokens';
import {
  getComponentLocalizedData,
  getLocalizedPropDescription,
  getLocalizedSnippet,
  getLocalizedPattern,
} from '@/lib/i18n/componentTranslations';
import { useI18n } from '@/lib/i18n';
import {
  ArrowLeft,
  Copy,
  Check,
  Code2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight,
  BookOpen,
  RefreshCw,
  X,
  Bell,
  Eye,
  Sliders,
  LayoutDashboard,
  Users,
  Settings,
  Palette,
  ExternalLink,
  Box,
} from 'lucide-react';

interface ComponentDetailPageContentProps {
  component: GalleryComponent;
}

export function ComponentDetailPageContent({ component }: ComponentDetailPageContentProps) {
  const { theme } = useThemeEditor();
  const { t, dictionary, locale } = useI18n();
  const brandColor = theme?.color?.primary || 'var(--accent-primary)';
  const radius = theme?.borderRadius || '16px';

  const localizedData = getComponentLocalizedData(component.id, locale);
  const displayName = localizedData?.name || component.name;
  const displayDescription = localizedData?.description || component.description;
  const displayUseCases = localizedData?.useCases || component.useCases;
  const displayUsagePatterns = localizedData?.usagePatterns || component.usagePatterns;
  const displayDosAndDonts = localizedData?.dosAndDonts || component.dosAndDonts;

  const [activeSnippetTab, setActiveSnippetTab] = useState<'react' | 'vue' | 'html'>('react');
  const [previewMode, setPreviewMode] = useState<'preview' | 'tokens'>('preview');
  const [copied, setCopied] = useState(false);
  const componentTokens = getComponentTokens(component.id);

  // Interactive Live Demo states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [checkboxState, setCheckboxState] = useState(true);
  const [activeTab, setActiveTab] = useState<'account' | 'password' | 'settings'>('account');
  const [showAlert, setShowAlert] = useState(true);
  const [selectedTreeId, setSelectedTreeId] = useState<string>('Button.tsx');
  const [navbarVariable, setNavbarVariable] = useState<'default' | 'floating'>('default');
  const [sidebarVariable, setSidebarVariable] = useState<'default' | 'floating'>('default');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeNavId, setActiveNavId] = useState('dash');
  const [demoTokenSelectVal, setDemoTokenSelectVal] = useState('--atom-palette-blue-500');

  const { components: studioComponents, paletteVariables: studioPalette } = useStudioRegistry();
  const studioCompId = resolveStudioComponentId(component.id);
  const studioDef = getStudioComponentById(studioComponents, component.id);
  const compTypes = getComponentTypes(studioCompId, studioDef?.types);
  const studioVariables = studioDef?.variables || [];

  // Interactive Live Button State (Type · Variable · Status)
  const [btnInteractiveType, setBtnInteractiveType] = useState<string>('solid');
  const [btnInteractiveVar, setBtnInteractiveVar] = useState<string>('primary');
  const [btnInteractiveSize, setBtnInteractiveSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [btnInteractiveSlot, setBtnInteractiveSlot] = useState<'none' | 'left' | 'right' | 'icon-only'>('none');
  const [btnInteractiveStatus, setBtnInteractiveStatus] = useState<ComponentInteractiveStatus>('default');

  const rawSnippet =
    activeSnippetTab === 'react'
      ? component.reactSnippet
      : activeSnippetTab === 'vue'
      ? component.vueSnippet || component.reactSnippet
      : component.htmlSnippet;
  const activeSnippet = getLocalizedSnippet(rawSnippet, locale);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render Live Preview
  const renderPreview = () => {
    switch (component.id) {
      case 'layout-spacing':
        return (
          <div className="w-full max-w-2xl flex flex-col gap-6 py-2">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                {locale === 'ja' ? '8ポイントグリッド 余白スケール (Spacing Scale)' : locale === 'en' ? '8-Point Grid Spacing Scale' : '8-Point 그리드 간격 스케일 (Spacing Scale)'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle)">
                {[
                  { name: 'space-1', val: '4px', label: 'Micro (4px)' },
                  { name: 'space-2', val: '8px', label: 'Base (8px)' },
                  { name: 'space-3', val: '12px', label: 'Padding (12px)' },
                  { name: 'space-4', val: '16px', label: 'Group (16px)' },
                  { name: 'space-6', val: '24px', label: 'Section (24px)' },
                  { name: 'space-8', val: '32px', label: 'Module (32px)' },
                ].map((s) => (
                  <div key={s.name} className="flex flex-col gap-1.5 p-3 rounded bg-(--bg-secondary)/60 border border-(--border-subtle)">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-(--text-primary)">{s.name}</span>
                      <span className="text-(--text-secondary)">{s.val}</span>
                    </div>
                    <div className="h-3 rounded bg-(--accent-primary)/20 border border-(--accent-primary)/30 flex items-center justify-start overflow-hidden">
                      <div className="h-full bg-(--accent-primary)" style={{ width: s.val }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                {locale === 'ja' ? 'Stack & Gap レゴ組み立てプレビュー' : locale === 'en' ? 'Stack & Gap Assembly Preview' : 'Stack & Gap 조립 프리뷰'}
              </span>
              <div className="p-4 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-(--text-secondary)">
                  <code>Stack gap=&quot;var(--atom-space-3)&quot;</code>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-3 py-1.5 rounded-(--radius-sm) bg-(--accent-primary)/10 text-(--accent-primary) dark:text-(--accent-primary) border border-(--accent-primary)/20 text-sm font-medium">
                    Item 1
                  </div>
                  <div className="px-3 py-1.5 rounded-(--radius-sm) bg-(--accent-primary)/10 text-(--accent-primary) dark:text-(--accent-primary) border border-(--accent-primary)/20 text-sm font-medium">
                    Item 2
                  </div>
                  <div className="px-3 py-1.5 rounded-(--radius-sm) bg-(--accent-primary)/10 text-(--accent-primary) dark:text-(--accent-primary) border border-(--accent-primary)/20 text-sm font-medium">
                    Item 3
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'color-status':
        return (
          <div className="w-full max-w-2xl flex flex-col gap-6 py-2">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                {locale === 'ja' ? 'システム状態色＆機能マッピング' : locale === 'en' ? 'Semantic Status & Role Mapping' : '시스템 상태 색상 & 기능 매핑'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-(--radius) bg-(--accent-primary) text-white flex flex-col justify-between h-24 shadow-xs">
                  <span className="text-xs font-mono opacity-80">Primary (Brand)</span>
                  <span className="text-sm font-bold">var(--accent-primary)</span>
                </div>
                <div className="p-4 rounded-(--radius) bg-(--atom-color-success) text-white flex flex-col justify-between h-24 shadow-xs">
                  <span className="text-xs font-mono opacity-80">Success (Positive)</span>
                  <span className="text-sm font-bold">#10b981</span>
                </div>
                <div className="p-4 rounded-(--radius) bg-(--atom-color-warning) text-white flex flex-col justify-between h-24 shadow-xs">
                  <span className="text-xs font-mono opacity-80">Warning (Caution)</span>
                  <span className="text-sm font-bold">#f59e0b</span>
                </div>
                <div className="p-4 rounded-(--radius) bg-rose-600 text-white flex flex-col justify-between h-24 shadow-xs">
                  <span className="text-xs font-mono opacity-80">Destructive (Danger)</span>
                  <span className="text-sm font-bold">#ef4444</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                {locale === 'ja' ? 'テーマ対応 表面背景色 (Surface Tokens)' : locale === 'en' ? 'Surface Tokens Preview' : '표면 배경색 토큰 (Surface Tokens)'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex items-center justify-between">
                  <span className="text-sm font-bold text-(--text-primary)">var(--atom-bg-primary)</span>
                  <span className="text-xs font-mono text-(--text-secondary)">Surface-1</span>
                </div>
                <div className="p-4 rounded-(--radius) bg-(--bg-secondary) border border-(--border-subtle) flex items-center justify-between">
                  <span className="text-sm font-bold text-(--text-primary)">var(--atom-bg-secondary)</span>
                  <span className="text-xs font-mono text-(--text-secondary)">Surface-2</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'typography':
        return (
          <div className="w-full max-w-2xl flex flex-col gap-5 py-2">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                {locale === 'ja' ? 'タイポグラフィ階層スケール (Type Scale)' : locale === 'en' ? 'Typography Hierarchy Scale' : '타이포그래피 계층 스케일 (Type Scale)'}
              </span>
              <div className="flex flex-col gap-3 p-4 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle)">
                <div className="pb-3 border-b border-(--border-subtle) flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">Display (36px)</span>
                  <code className="text-xs font-mono text-(--text-secondary)">--atom-font-display</code>
                </div>
                <div className="pb-3 border-b border-(--border-subtle) flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-(--text-primary)">Heading 1 (24px)</span>
                  <code className="text-xs font-mono text-(--text-secondary)">--atom-font-heading-1</code>
                </div>
                <div className="pb-3 border-b border-(--border-subtle) flex items-baseline justify-between">
                  <span className="text-lg font-semibold text-(--text-primary)">Heading 2 (20px)</span>
                  <code className="text-xs font-mono text-(--text-secondary)">--atom-font-heading-2</code>
                </div>
                <div className="pb-3 border-b border-(--border-subtle) flex items-baseline justify-between">
                  <span className="text-sm text-(--text-primary)">Body-1 Standard Copy (14px / 1.5)</span>
                  <code className="text-xs font-mono text-(--text-secondary)">--atom-font-body-1</code>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-(--text-muted)">Caption Supporting Metadata (12px / 1.4)</span>
                  <code className="text-xs font-mono text-(--text-secondary)">--atom-font-caption-1</code>
                </div>
              </div>
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="w-full max-w-4xl flex flex-col gap-6 py-2">
            {/* A. Live Interactive Playground (스튜디오와 100% 동일한 인터랙티브 제어기) */}
            <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-(--border-subtle) pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-(--accent-primary)" />
                  <span className="font-bold text-xs uppercase tracking-wider text-(--text-primary)">
                    {locale === 'ko' ? '인터랙티브 3대 아키텍처 라이브 스테이지 (Studio Sync)' : '3-Tier Interactive Live Stage'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-semibold">
                    Type: {btnInteractiveType}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) font-semibold">
                    Variable: {btnInteractiveVar}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted)">
                    Status: {btnInteractiveStatus}
                  </span>
                </div>
              </div>

              {/* Controls Row (Studio SSOT Synced Types & Variables) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* 1. Type Switcher */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-(--text-secondary) text-[11px]">
                    1. Type (외형 양식 · {compTypes.length})
                  </label>
                  <NativeSelect
                    value={btnInteractiveType}
                    onChange={(e) => setBtnInteractiveType(e.target.value)}
                    className="text-xs"
                  >
                    {compTypes.map((tp) => (
                      <option key={tp.id} value={tp.id}>
                        {tp.name}
                      </option>
                    ))}
                  </NativeSelect>
                </div>

                {/* 2. Variable (System Color) Switcher */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-(--text-secondary) text-[11px]">
                    2. Variable (시스템 색상 · {studioVariables.length})
                  </label>
                  <NativeSelect
                    value={btnInteractiveVar}
                    onChange={(e) => setBtnInteractiveVar(e.target.value)}
                    className="text-xs"
                  >
                    {studioVariables.map((vr) => (
                      <option key={vr.id} value={vr.id}>
                        {vr.name}
                      </option>
                    ))}
                  </NativeSelect>
                </div>

                {/* 3. Size Switcher */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-(--text-secondary) text-[11px]">규격 (Size)</label>
                  <NativeSelect
                    value={btnInteractiveSize}
                    onChange={(e: any) => setBtnInteractiveSize(e.target.value)}
                    className="text-xs"
                  >
                    <option value="sm">Small (sm - 콤팩트)</option>
                    <option value="md">Medium (md - 표준)</option>
                    <option value="lg">Large (lg - 와이드)</option>
                  </NativeSelect>
                </div>

                {/* 4. Slot Switcher */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-(--text-secondary) text-[11px]">아이콘 슬롯 (Slots)</label>
                  <NativeSelect
                    value={btnInteractiveSlot}
                    onChange={(e: any) => setBtnInteractiveSlot(e.target.value)}
                    className="text-xs"
                  >
                    <option value="none">아이콘 없음 (none)</option>
                    <option value="left">왼쪽 아이콘 (left)</option>
                    <option value="right">오른쪽 아이콘 (right)</option>
                    <option value="icon-only">아이콘 단독 (icon-only)</option>
                  </NativeSelect>
                </div>
              </div>

              {/* Status Simulation Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-(--border-subtle)/50">
                <span className="text-[11px] font-semibold text-(--text-secondary) mr-2">3. Status 시뮬레이션:</span>
                {(['default', 'hover', 'active', 'focus', 'disabled', 'loading'] as ComponentInteractiveStatus[]).map((st) => (
                  <Button
                    key={st}
                    variant={btnInteractiveStatus === st ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setBtnInteractiveStatus(st)}
                    className="text-[11px] px-2.5 py-1 h-auto"
                  >
                    {st === 'default' ? '기본' : st === 'hover' ? '호버' : st === 'active' ? '클릭' : st === 'focus' ? '포커스' : st === 'disabled' ? '비활성' : '로딩'}
                  </Button>
                ))}
              </div>

              {/* Center Live Stage Preview */}
              <div className="py-8 px-4 rounded bg-(--bg-secondary)/40 border border-(--border-subtle) flex flex-col items-center justify-center gap-4">
                <Button
                  componentType={btnInteractiveType}
                  variable={btnInteractiveVar}
                  size={btnInteractiveSize}
                  status={btnInteractiveStatus}
                  isIconOnly={btnInteractiveSlot === 'icon-only'}
                >
                  {btnInteractiveSlot === 'left' && <Sparkles className="w-4 h-4" />}
                  {btnInteractiveSlot === 'icon-only' ? (
                    <Sparkles className="w-4 h-4" />
                  ) : (
                    <span>
                      {formatLocaleText(
                        studioVariables.find((v) => v.id === btnInteractiveVar)?.name || btnInteractiveVar,
                        locale
                      )}
                    </span>
                  )}
                  {btnInteractiveSlot === 'right' && <ArrowRight className="w-4 h-4" />}
                </Button>

                {/* Generated Code Display */}
                <div className="flex items-center gap-2 bg-(--bg-primary) px-3 py-1.5 rounded-(--radius-sm) border border-(--border-subtle) font-mono text-[11px] text-(--accent-primary) shadow-2xs">
                  <code>
                    &lt;Button componentType=&quot;{btnInteractiveType}&quot; variable=&quot;{btnInteractiveVar}&quot; size=&quot;{btnInteractiveSize}&quot;{btnInteractiveStatus !== 'default' ? ` status="${btnInteractiveStatus}"` : ''}&gt;
                  </code>
                </div>
              </div>
            </div>

            {/* B. 1. Type Showcase (Studio SSOT 동기화 외형 양식 스펙트럼) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider flex items-center gap-1.5">
                  <Badge variant="primary" className="text-[10px] px-1.5 py-0.5">1. TYPE</Badge>
                  <span>
                    {locale === 'ko'
                      ? `새로운 디자인 외형 양식 (${compTypes.length} Types)`
                      : `Component Types Spectrum (${compTypes.length} Types)`}
                  </span>
                </span>
                <span className="text-xs text-(--text-muted) font-mono">{compTypes.length} Types Supported</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {compTypes.map((tp) => (
                  <div key={tp.id} className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) flex flex-col items-center justify-between gap-2 text-center">
                    <span className="text-[10px] font-mono text-(--text-secondary) font-bold line-clamp-1" title={tp.name}>
                      {tp.name}
                    </span>
                    <Button componentType={tp.id} variable="primary" size="sm" className="w-full truncate text-[11px]">
                      Button
                    </Button>
                    <code className="text-[9px] font-mono text-(--text-muted)">type=&quot;{tp.id}&quot;</code>
                  </div>
                ))}
              </div>
            </div>

            {/* C. 2. Variable Showcase (Studio SSOT 시맨틱 시스템 색상 매핑) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider flex items-center gap-1.5">
                  <Badge variant="neutral" className="text-[10px] px-1.5 py-0.5">2. VARIABLE</Badge>
                  <span>
                    {locale === 'ko'
                      ? `시스템 시맨틱 색상 및 세부 옵션 (${studioVariables.length} Variables)`
                      : `Semantic System Variables (${studioVariables.length} Variables)`}
                  </span>
                </span>
                <span className="text-xs text-(--text-muted) font-mono">{studioVariables.length} System Variables</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {studioVariables.map((vr) => (
                  <div key={vr.id} className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) flex flex-col items-center justify-between gap-2 text-center">
                    <span className="text-[10px] font-mono text-(--text-secondary) font-bold line-clamp-1" title={vr.name}>
                      {vr.name}
                    </span>
                    <Button variable={vr.id} size="sm" className="w-full truncate text-[11px]">
                      {vr.id}
                    </Button>
                    <code className="text-[9px] font-mono text-(--text-muted)">variable=&quot;{vr.id}&quot;</code>
                  </div>
                ))}
              </div>
            </div>

            {/* D. 3. Status Showcase (6대 상호작용 피드백) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider flex items-center gap-1.5">
                  <Badge variant="neutral" className="text-[10px] px-1.5 py-0.5">3. STATUS</Badge>
                  <span>{locale === 'ko' ? '상호작용 인터랙션 상태 피드백 (6 Statuses)' : 'Interaction Status Feedback'}</span>
                </span>
                <span className="text-xs text-(--text-muted) font-mono">6 Interactive States</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {[
                  { id: 'default', label: '기본 (Default)' },
                  { id: 'hover', label: '호버 (Hover)' },
                  { id: 'active', label: '클릭 (Active)' },
                  { id: 'focus', label: '포커스 (Focus)' },
                  { id: 'disabled', label: '비활성 (Disabled)' },
                  { id: 'loading', label: '로딩 (Loading)' },
                ].map((st) => (
                  <div key={st.id} className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) flex flex-col items-center gap-2 text-center">
                    <span className="text-[10px] font-mono text-(--text-secondary) font-bold">{st.label}</span>
                    <Button variable="primary" status={st.id as ComponentInteractiveStatus} size="sm" className="w-full truncate text-[11px]">
                      {st.id}
                    </Button>
                    <code className="text-[9px] font-mono text-(--text-muted)">status=&quot;{st.id}&quot;</code>
                  </div>
                ))}
              </div>
            </div>

            {/* E. Button Spacing Tokens */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider flex items-center gap-1.5">
                  <Badge variant="neutral" className="text-[10px] px-1.5 py-0.5">METRICS</Badge>
                  <span>버튼 상하/좌우 여백 토큰 제어 (SPACING TOKENS)</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle)">
                <Button variant="primary">
                  기본 규격 (py: 8px, px: 16px)
                </Button>
                <Button variant="secondary" paddingY="4px" paddingX="10px">
                  콤팩트 (py: 4px, px: 10px)
                </Button>
                <Button variant="outline" paddingY="12px" paddingX="24px">
                  와이드 (py: 12px, px: 24px)
                </Button>
              </div>
            </div>
          </div>
        );

      case 'input':
        return (
          <div className="w-full max-w-xl flex flex-col gap-5 py-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                스튜디오 인풋 변수 (Standard vs Pill)
              </span>
              <Link
                href="/studio?component=input"
                className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1"
              >
                <span>스튜디오에서 편집</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                variable="standard"
                label={locale === 'ja' ? '標準インプット (Standard)' : locale === 'en' ? 'Standard Input (Default)' : '표준 인풋 (Standard)'}
                type="email"
                placeholder="name@company.com"
                helperText="스튜디오 기본 6px 곡률"
              />
              <Input
                variable="pill"
                label={locale === 'ja' ? 'ピル型インプット (Pill)' : locale === 'en' ? 'Pill Round Input' : '라운드 알약 인풋 (Pill)'}
                placeholder="둥근 검색어 입력..."
                helperText="스튜디오 완전 원형 9999px 곡률"
              />
            </div>
            <div className="pt-2">
              <Input
                label={locale === 'ja' ? 'エラー状態入力' : locale === 'en' ? 'Error State Input' : '에러 상태 인풋 (위험 토큰 바인딩)'}
                defaultValue="invalid_email"
                error={locale === 'ja' ? '有効なメール形式を入力してください。' : locale === 'en' ? 'Please enter a valid email address.' : '유효한 이메일 형식을 입력하세요.'}
              />
            </div>
          </div>
        );

      case 'selection':
        return (
          <div className="flex flex-wrap items-center justify-center gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <Switch
                checked={switchState}
                onCheckedChange={setSwitchState}
              />
              <span className="text-sm font-medium text-(--text-primary)">
                {switchState
                  ? (locale === 'ja' ? '夜間プッシュ通知 ON' : locale === 'en' ? 'Night Push Notifications ON' : '야간 푸시 알림 켜짐')
                  : (locale === 'ja' ? '夜間プッシュ通知 OFF' : locale === 'en' ? 'Night Push Notifications OFF' : '야간 푸시 알림 꺼짐')}
              </span>
            </label>

            <Checkbox
              checked={checkboxState}
              onChange={(e) => setCheckboxState(e.target.checked)}
              label={
                locale === 'ja'
                  ? '利用規約およびプライバシーポリシーに同意'
                  : locale === 'en'
                  ? 'Agree to Terms of Service & Privacy Policy'
                  : '이용약관 및 개인정보 처리방침 전체 동의'
              }
            />
          </div>
        );

      case 'dialog':
        return (
          <div className="flex flex-col items-center gap-3">
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 font-bold text-sm shadow-md"
            >
              {locale === 'ja' ? 'モーダルを開く' : locale === 'en' ? 'Open Modal Dialog' : '모달 다이얼로그 열기'}
            </Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={locale === 'ja' ? '送金を確定しますか？' : locale === 'en' ? 'Confirm Money Transfer?' : '정말 송금하시겠습니까?'}
            >
              <div className="flex flex-col gap-4">
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                  {locale === 'ja' ? (
                    <>受取人: 田中 太郎 (三菱UFJ 1002-***-4921)<br />送金金額: <strong>¥50,000</strong> (手数料無料)</>
                  ) : locale === 'en' ? (
                    <>Recipient: Alex Min (Global Bank 1002-***-4921)<br />Amount: <strong>$500.00</strong> (Fee waived)</>
                  ) : (
                    <>받는 분: 김철수 (스마트뱅크 1002-***-4921)<br />보낼 금액: <strong>₩500,000</strong> (수수료 면제)</>
                  )}
                </p>
                <div className="flex justify-end gap-2 pt-2 border-t border-(--border-subtle)">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    {locale === 'ja' ? 'キャンセル' : locale === 'en' ? 'Cancel' : '취소'}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    {locale === 'ja' ? '送金完了' : locale === 'en' ? 'Confirm Transfer' : '송금 완료'}
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        );

      case 'sheet':
        return (
          <div className="flex flex-col items-center gap-3">
            <Button
              variant="primary"
              onClick={() => setIsSheetOpen(true)}
              className="px-5 py-2.5 font-bold text-sm shadow-md"
            >
              {locale === 'ja' ? 'ボトムシートを開く' : locale === 'en' ? 'Open Bottom Sheet' : '바텀시트 드로어 열기'}
            </Button>

            {isSheetOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
                <div className="bg-(--bg-primary) border-t border-(--border-subtle) rounded-t-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
                  <div className="w-12 h-1 bg-(--border-strong) rounded-full mx-auto" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-(--text-primary)">
                      {locale === 'ja' ? '店舗詳細情報' : locale === 'en' ? 'Store Details' : '매장 상세 정보'}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      isIconOnly
                      onClick={() => setIsSheetOpen(false)}
                      className="text-(--text-muted) h-auto p-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-3 rounded-xl bg-(--bg-secondary) text-sm">
                    <div className="font-bold text-(--text-primary)">
                      {locale === 'ja' ? 'ブルーボトルコーヒー 渋谷カフェ' : locale === 'en' ? 'Blue Bottle Coffee Roastery' : '블루보틀 성수 카페'}
                    </div>
                    <div className="text-(--atom-color-success) dark:text-(--atom-color-success) mt-1">
                      {locale === 'ja' ? '● 営業中 (21:00 閉店)' : locale === 'en' ? '● Open Now (Closes 21:00)' : '● 현재 영업 중 (21:00 마감)'}
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => setIsSheetOpen(false)}
                    className="w-full py-2.5 font-bold"
                  >
                    {locale === 'ja' ? 'ルート検索' : locale === 'en' ? 'Get Directions' : '길찾기 실행'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case 'alert':
        return showAlert ? (
          <Alert
            className="w-full max-w-md"
            componentType="soft"
            variant="info"
            title={locale === 'ja' ? '新バージョン v1.2 アップデート' : locale === 'en' ? 'New Version v1.2 Release' : '새로운 버전 v1.2 업데이트'}
            description={
              locale === 'ja'
                ? 'W3C DTCG準拠スタイルディクショナリコンパイラが追加されました。'
                : locale === 'en'
                ? 'W3C DTCG-compliant style dictionary compiler has been integrated.'
                : 'W3C DTCG 호환 스타일 딕셔너리 컴파일러가 추가되었습니다.'
            }
            onClose={() => setShowAlert(false)}
          />
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAlert(true)}
            className="text-sm text-(--accent-primary) font-semibold underline h-auto"
          >
            {locale === 'ja' ? 'アラートを再表示' : locale === 'en' ? 'Reopen Alert' : '알림 다시 열기'}
          </Button>
        );

      case 'token-select':
        return (
          <div className="w-full max-w-md py-2">
            <TokenSelect
              label={locale === 'ja' ? 'デザイン 토큰 선택' : locale === 'en' ? 'Select Design Token' : '디자인 토큰 바인딩 선택'}
              value={demoTokenSelectVal}
              onChange={(val) => setDemoTokenSelectVal(val)}
              options={[
                { id: '--atom-palette-blue-500', name: 'Blue 500 (Brand Primary)', value: 'var(--accent-primary)', category: 'color', family: 'blue' },
                { id: '--atom-color-success', name: 'Success Semantic Token', value: 'var(--atom-color-success)', category: 'color', family: 'status' },
                { id: '--atom-color-warning', name: 'Warning Semantic Token', value: 'var(--atom-color-warning)', category: 'color', family: 'status' },
                { id: '--atom-color-destructive', name: 'Destructive Token', value: 'var(--atom-color-destructive)', category: 'color', family: 'status' },
                { id: '--atom-radius-md', name: 'Radius Medium', value: 'var(--radius)', category: 'radius', family: 'radius' },
                { id: '--atom-space-4', name: 'Spacing Scale 4', value: 'var(--space-4)', category: 'spacing', family: 'spacing' },
              ]}
            />
          </div>
        );

      case 'tabs':
        return (
          <div className="w-full max-w-md flex flex-col gap-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                스튜디오 탭 변수 (Underlined vs Pills)
              </span>
              <Link
                href="/studio?component=tabs"
                className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1"
              >
                <span>스튜디오에서 편집</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              <TabsList className="w-full justify-center">
                {(['account', 'password', 'settings'] as const).map((tab) => (
                  <TabsTrigger
                    key={tab}
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className="flex-1 capitalize"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent active className="text-center text-(--text-secondary)">
                {locale === 'ja' ? '選択中のタブ: ' : locale === 'en' ? 'Selected Tab: ' : '선택된 탭: '}
                <strong className="text-(--text-primary)">{activeTab}</strong>
              </TabsContent>
            </div>
          </div>
        );

      case 'badge':
        return (
          <div className="w-full max-w-xl flex flex-col gap-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                스튜디오 배지 변수 프리뷰 (Studio Badge Variables)
              </span>
              <Link
                href="/studio?component=badge"
                className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1"
              >
                <span>스튜디오에서 편집</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 p-4 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle)">
              <Badge variable="primary">Primary (주요 액션)</Badge>
              <Badge variable="secondary">Secondary (보조)</Badge>
              <Badge variable="success">Success (성공 완료)</Badge>
              <Badge variable="warning">Warning (주의 대기)</Badge>
              <Badge variable="destructive">Danger (위험 오류)</Badge>
              <Badge variable="sharp-neutral">Sharp Neutral (샤프)</Badge>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="w-full max-w-2xl flex flex-col gap-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                스튜디오 카드 변수 프리뷰 (Studio Card Variables)
              </span>
              <Link
                href="/studio?component=card"
                className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1"
              >
                <span>스튜디오에서 편집</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card variable="elevated" className="p-4 flex flex-col gap-1.5 shadow-sm">
                <Badge variant="primary" className="self-start text-[10px]">variable="elevated"</Badge>
                <h5 className="font-bold text-sm text-(--text-primary)">엘리베이티드 카드</h5>
                <p className="text-xs text-(--text-secondary)">부드러운 그림자와 라운딩이 적용된 기본 카드</p>
              </Card>
              <Card variable="outlined" className="p-4 flex flex-col gap-1.5 border-2 border-(--border-strong)">
                <Badge variant="neutral" className="self-start text-[10px]">variable="outlined"</Badge>
                <h5 className="font-bold text-sm text-(--text-primary)">아웃라인 카드</h5>
                <p className="text-xs text-(--text-secondary)">선명한 경계선을 지닌 구조화 카드</p>
              </Card>
              <Card variable="interactive" interactive className="p-4 flex flex-col gap-1.5 hover:border-(--accent-primary) transition cursor-pointer">
                <Badge variant="success" className="self-start text-[10px]">variable="interactive"</Badge>
                <h5 className="font-bold text-sm text-(--text-primary)">인터랙티브 카드</h5>
                <p className="text-xs text-(--text-secondary)">호버 시 위로 떠오르는 피드백 카드</p>
              </Card>
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="w-full max-w-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{locale === 'ja' ? 'メンバー' : locale === 'en' ? 'Member' : '멤버'}</TableHead>
                  <TableHead>{locale === 'ja' ? '状態' : locale === 'en' ? 'Status' : '상태'}</TableHead>
                  <TableHead>{locale === 'ja' ? '権限' : locale === 'en' ? 'Role' : '역할'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">{locale === 'ja' ? '佐藤 健' : locale === 'en' ? 'Alex Min' : '김민수'}</TableCell>
                  <TableCell>
                    <Badge variant="success">{locale === 'ja' ? '稼働中' : locale === 'en' ? 'Active' : '정상 가동'}</Badge>
                  </TableCell>
                  <TableCell className="text-(--text-secondary)">{locale === 'ja' ? '所有者 (Admin)' : locale === 'en' ? 'Owner (Admin)' : '소유자 (Admin)'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">{locale === 'ja' ? '鈴木 華' : locale === 'en' ? 'Emma Lee' : '이지은'}</TableCell>
                  <TableCell>
                    <Badge variant="primary">{locale === 'ja' ? '承認済' : locale === 'en' ? 'Accepted' : '초대 수락'}</Badge>
                  </TableCell>
                  <TableCell className="text-(--text-secondary)">{locale === 'ja' ? 'デザイナー' : locale === 'en' ? 'Designer' : '디자이너'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );

      case 'tree': {
        const demoTreeData: TreeNode[] = [
          {
            id: 'src',
            label: 'src',
            children: [
              {
                id: 'components',
                label: 'components',
                children: [
                  { id: 'Button.tsx', label: 'Button.tsx' },
                  { id: 'Card.tsx', label: 'Card.tsx' },
                  { id: 'Tree.tsx', label: 'Tree.tsx' },
                ],
              },
              {
                id: 'tokens',
                label: 'tokens',
                children: [
                  { id: 'tokens.json', label: 'tokens.json' },
                ],
              },
              { id: 'index.ts', label: 'index.ts' },
            ],
          },
          { id: 'package.json', label: 'package.json' },
          { id: 'README.md', label: 'README.md' },
        ];

        return (
          <div className="w-full max-w-sm p-4 rounded-xl bg-(--bg-primary) border border-(--border-subtle)  shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-(--text-secondary) font-mono pb-2 border-b border-(--border-subtle) ">
              <span>EXPLORER</span>
              <span>{locale === 'ja' ? '選択: ' : locale === 'en' ? 'Selected: ' : '선택: '}<strong className="text-(--accent-primary)">{selectedTreeId}</strong></span>
            </div>
            <Tree
              data={demoTreeData}
              selectedId={selectedTreeId}
              onSelect={(node) => setSelectedTreeId(node.id)}
              defaultExpandedIds={['src', 'components']}
            />
          </div>
        );
      }

      case 'container':
        return (
          <div className="w-full space-y-4">
            <Container size="sm" className="p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-secondary)/50 text-center">
              <span className="text-sm font-mono text-(--text-secondary)">Container size="sm" (640px)</span>
            </Container>
            <Container size="md" className="p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-secondary)/50 text-center">
              <span className="text-sm font-mono text-(--text-secondary)">Container size="md" (768px)</span>
            </Container>
            <Container size="lg" className="p-4 rounded-(--radius) border border-(--border-strong) bg-(--bg-secondary)/50 text-center">
              <span className="text-sm font-mono font-semibold text-(--text-primary)">Container size="lg" (1024px)</span>
            </Container>
          </div>
        );

      case 'layout':
        return (
          <div className="w-full p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) space-y-4">
            <div className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-2">
              {locale === 'ja' ? 'Stack & Grid トークン連携プレビュー' : locale === 'en' ? 'Stack & Grid Token Preview' : 'Stack & Grid 토큰 연동 프리뷰'}
            </div>
            <Stack gap="3">
              <div className="p-2.5 rounded-(--radius-sm) bg-(--bg-secondary) text-sm font-mono">
                {locale === 'ja' ? 'Stack gap="3" (12px) アイテム 1' : locale === 'en' ? 'Stack gap="3" (12px) Item 1' : 'Stack gap="3" (12px) 아이템 1'}
              </div>
              <div className="p-2.5 rounded-(--radius-sm) bg-(--bg-secondary) text-sm font-mono">
                {locale === 'ja' ? 'Stack gap="3" (12px) アイテム 2' : locale === 'en' ? 'Stack gap="3" (12px) Item 2' : 'Stack gap="3" (12px) 아이템 2'}
              </div>
            </Stack>
            <Grid cols={3} gap="2" className="mt-3">
              <div className="p-3 text-center rounded-(--radius-sm) border border-(--border-subtle) text-sm font-mono">
                Col 1
              </div>
              <div className="p-3 text-center rounded-(--radius-sm) border border-(--border-subtle) text-sm font-mono">
                Col 2
              </div>
              <div className="p-3 text-center rounded-(--radius-sm) border border-(--border-subtle) text-sm font-mono">
                Col 3
              </div>
            </Grid>
          </div>
        );

      case 'navbar':
        return (
          <div className="w-full flex flex-col gap-4 py-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                {locale === 'ja' ? 'ナビゲーションバー形式の切り替え' : locale === 'en' ? 'Navbar Variant Switcher' : '네비게이션 바 스타일 변수 선택'}
              </span>
              <div className="flex items-center gap-1 bg-(--bg-secondary) p-1 rounded-(--radius-sm) border border-(--border-subtle)">
                <Button
                  type="button"
                  size="sm"
                  variant={navbarVariable === 'default' ? 'primary' : 'ghost'}
                  onClick={() => setNavbarVariable('default')}
                  className="px-2.5 py-1 text-xs font-medium h-auto"
                >
                  표준 스티키 (Standard)
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={navbarVariable === 'floating' ? 'primary' : 'ghost'}
                  onClick={() => setNavbarVariable('floating')}
                  className="px-2.5 py-1 text-xs font-medium h-auto"
                >
                  플로팅 필 (Floating Pill)
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle)">
              <Navbar
                key={navbarVariable}
                variable={navbarVariable}
                bordered
                blur
                className={navbarVariable === 'floating' ? 'max-w-4xl mx-auto rounded-full shadow-md' : 'rounded-(--radius-sm)'}
              >
                <NavbarBrand href="#brand">
                  <div className="w-7 h-7 rounded-lg bg-(--atom-color-primary,var(--accent-primary)) text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    AT
                  </div>
                  <span className="font-bold text-sm">AtomSystem</span>
                </NavbarBrand>

                <NavbarNav>
                  <NavbarLink
                    href="#dash"
                    active={activeNavId === 'dash'}
                    onClick={(e) => { e.preventDefault(); setActiveNavId('dash'); }}
                  >
                    대시보드
                  </NavbarLink>
                  <NavbarLink
                    href="#components"
                    active={activeNavId === 'components'}
                    onClick={(e) => { e.preventDefault(); setActiveNavId('components'); }}
                  >
                    컴포넌트
                  </NavbarLink>
                  <NavbarLink
                    href="#tokens"
                    active={activeNavId === 'tokens'}
                    onClick={(e) => { e.preventDefault(); setActiveNavId('tokens'); }}
                  >
                    디자인 토큰
                  </NavbarLink>
                </NavbarNav>

                <NavbarActions>
                  <Button variant="outline" size="sm">
                    문서 보기
                  </Button>
                  <Button variant="primary" size="sm">
                    시작하기
                  </Button>
                </NavbarActions>
              </Navbar>
            </div>
          </div>
        );

      case 'sidebar':
        return (
          <div className="w-full flex flex-col gap-4 py-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                {locale === 'ja' ? 'サイドバーの展開/折りたたみ操作' : locale === 'en' ? 'Sidebar Expand / Collapse' : '사이드바 인터랙션 및 상태 제어'}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="text-xs"
                >
                  {isSidebarCollapsed ? '전체 펼치기 (Expand)' : '슬림 접기 (Collapse)'}
                </Button>
                <div className="flex items-center gap-1 bg-(--bg-secondary) p-1 rounded-(--radius-sm) border border-(--border-subtle)">
                  <Button
                    type="button"
                    size="sm"
                    variant={sidebarVariable === 'default' ? 'primary' : 'ghost'}
                    onClick={() => setSidebarVariable('default')}
                    className="px-2.5 py-1 text-xs font-medium h-auto"
                  >
                    엔터프라이즈 (Default)
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={sidebarVariable === 'floating' ? 'primary' : 'ghost'}
                    onClick={() => setSidebarVariable('floating')}
                    className="px-2.5 py-1 text-xs font-medium h-auto"
                  >
                    플로팅 카드 (Floating)
                  </Button>
                </div>
              </div>
            </div>

            <div className="h-96 w-full rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) flex overflow-hidden">
              <Sidebar
                collapsed={isSidebarCollapsed}
                variable={sidebarVariable}
                className={sidebarVariable === 'floating' ? 'm-3 rounded-(--radius) shadow-md border' : 'h-full'}
              >
                <SidebarHeader>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-(--atom-color-primary,var(--accent-primary)) text-white flex items-center justify-center font-bold text-xs shrink-0">
                      AT
                    </div>
                    {!isSidebarCollapsed && (
                      <div className="truncate">
                        <div className="font-bold text-xs text-(--text-primary)">Atom Console</div>
                        <div className="text-[10px] text-(--text-muted) font-mono">Workspace Pro</div>
                      </div>
                    )}
                  </div>
                  <SidebarToggle
                    collapsed={isSidebarCollapsed}
                    onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  />
                </SidebarHeader>

                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>메인 메뉴 (Core)</SidebarGroupLabel>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          active={activeNavId === 'dash'}
                          collapsed={isSidebarCollapsed}
                          onClick={() => setActiveNavId('dash')}
                          icon={<LayoutDashboard className="w-4 h-4" />}
                          badge={<span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white border border-white/30">Live</span>}
                        >
                          대시보드
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          active={activeNavId === 'components'}
                          collapsed={isSidebarCollapsed}
                          onClick={() => setActiveNavId('components')}
                          icon={<Layers className="w-4 h-4" />}
                          badge={<Badge variant="neutral">33</Badge>}
                        >
                          컴포넌트 라이브러리
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          active={activeNavId === 'tokens'}
                          collapsed={isSidebarCollapsed}
                          onClick={() => setActiveNavId('tokens')}
                          icon={<Palette className="w-4 h-4" />}
                        >
                          디자인 토큰 스튜디오
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroup>

                  <SidebarGroup>
                    <SidebarGroupLabel>설정 및 관리 (Admin)</SidebarGroupLabel>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          active={activeNavId === 'team'}
                          collapsed={isSidebarCollapsed}
                          onClick={() => setActiveNavId('team')}
                          icon={<Users className="w-4 h-4" />}
                        >
                          팀원 및 권한 관리
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          active={activeNavId === 'settings'}
                          collapsed={isSidebarCollapsed}
                          onClick={() => setActiveNavId('settings')}
                          icon={<Settings className="w-4 h-4" />}
                        >
                          환경 설정
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                  {!isSidebarCollapsed ? (
                    <div className="flex items-center justify-between text-xs text-(--text-secondary)">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-(--atom-color-success)/20 text-(--atom-color-success) font-bold flex items-center justify-center text-[10px]">
                          JS
                        </div>
                        <span className="truncate font-medium">관리자 (Admin)</span>
                      </div>
                      <span className="font-mono text-[10px] text-(--text-muted)">v1.2.0</span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-(--atom-color-success)/20 text-(--atom-color-success) font-bold flex items-center justify-center text-[10px] mx-auto">
                      JS
                    </div>
                  )}
                </SidebarFooter>
              </Sidebar>

              {/* Main Preview Content Canvas */}
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center gap-2 text-(--text-secondary)">
                <div className="w-10 h-10 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) flex items-center justify-center font-bold">
                  ✓
                </div>
                <div className="font-bold text-sm text-(--text-primary)">
                  {activeNavId === 'dash'
                    ? '대시보드 뷰어 활성화됨'
                    : activeNavId === 'components'
                    ? '컴포넌트 라이브러리 뷰어 활성화됨'
                    : activeNavId === 'tokens'
                    ? '디자인 토큰 스튜디오 뷰어 활성화됨'
                    : '관리 메뉴 뷰어'}
                </div>
                <p className="text-xs text-(--text-muted) max-w-xs">
                  사이드바 메뉴 클릭 시 active 상태 전환 및 접기/펼치기 반응형 너비가 토큰 기반으로 부드럽게 전환됩니다.
                </p>
              </div>
            </div>
          </div>
        );

      case 'chart':
        return (
          <div className="w-full max-w-xl py-2 flex flex-col gap-4">
            <Chart
              type="area"
              variant="primary"
              data={[
                { label: '1월', value: 120 },
                { label: '2월', value: 180 },
                { label: '3월', value: 150 },
                { label: '4월', value: 240 },
                { label: '5월', value: 310 },
              ]}
              height={200}
            />
          </div>
        );

      case 'offcanvas':
        return (
          <div className="w-full max-w-md py-2">
            <Offcanvas
              isOpen={true}
              onClose={() => {}}
              inline={true}
              placement="right"
              title="상세정보 인스펙터"
              description="선택한 항목의 세부 속성을 편집합니다."
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" size="sm">취소</Button>
                  <Button variant="primary" size="sm">적용하기</Button>
                </div>
              }
            >
              <div className="space-y-3 py-2 text-xs">
                <div className="p-3 rounded-(--radius) bg-(--bg-secondary) space-y-1">
                  <div className="font-semibold text-(--text-primary)">오프캔버스 드로어</div>
                  <div className="text-(--text-muted)">메인 화면의 컨텍스트를 유지하면서 추가 정보를 제공합니다.</div>
                </div>
              </div>
            </Offcanvas>
          </div>
        );

      case 'toast':
        return (
          <div className="w-full max-w-md py-2 flex flex-col gap-3">
            <Toast
              variant="success"
              title="저장 완료"
              description="변경 사항이 안전하게 클라우드에 동기화되었습니다."
              inline={true}
              onClose={() => {}}
            />
            <Toast
              variant="action"
              title="항목 삭제됨"
              description="선택한 프로젝트가 휴지통으로 이동되었습니다."
              inline={true}
              action={{ label: '실행 취소', onClick: () => {} }}
              onClose={() => {}}
            />
          </div>
        );

      default:
        if (studioDef) {
          const activeVar = studioDef.variables[0];
          const activeType = compTypes[0];
          return (
            <div className="w-full max-w-md flex flex-col items-center gap-4 py-2">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                  Studio SSOT Synchronized Preview
                </span>
                <Link
                  href={`/studio?component=${studioCompId}`}
                  className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1"
                >
                  <span>스튜디오에서 편집</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              <StudioLivePreview
                componentId={studioDef.id}
                variable={activeVar}
                type={activeType}
                getPaletteValue={(palId) =>
                  studioPalette.find((p) => p.id === palId)?.value || `var(${palId})`
                }
              />
            </div>
          );
        }
        return null;
    }
  };

  // Related Patterns
  const relatedPatterns = PATTERNS_COLLECTION.filter((p) =>
    component.relatedPatternIds?.includes(p.id)
  );

  return (
    <>
      {/* Center Column: Main Component Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-8">
          {/* Navigation & Header */}
          <div className="flex flex-col gap-4 pb-6 border-b border-[var(--border-subtle)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span 
                  className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle)"
                >
                  .atom-{component.id}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
                  {component.category}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
                  {component.source}
                </span>
                <a
                  href="#tokens"
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) dark:text-(--accent-primary) border border-(--accent-primary)/20 hover:bg-(--accent-primary)/20 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t('componentsDoc.tokensBoundBadge', 'W3C 디자인 토큰 {n}개 연동됨 ↓').replace('{n}', String(componentTokens.length))}</span>
                </a>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
                {displayName}
              </h1>
              <p className="text-sm sm:text-base text-(--text-secondary) mt-1.5 max-w-2xl leading-relaxed">
                {displayDescription}
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleCopyCode}
              className="text-sm font-medium flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('common.copied', '복사 완료!') : t('componentsDoc.copyComponentCode', '컴포넌트 코드 복사')}</span>
            </Button>
          </div>
        </div>

        {/* 1. Interactive Live Preview */}
        <section id="preview" className="scroll-mt-28 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-(--text-primary)">
              {t('componentsDoc.previewTitle', '인터랙티브 라이브 프리뷰 (Interactive Preview)')}
            </h2>
            <div className="flex items-center gap-1 bg-(--bg-secondary) p-1 rounded-(--radius) border border-(--border-subtle)">
              <Button
                type="button"
                size="sm"
                variant={previewMode === 'preview' ? 'primary' : 'ghost'}
                onClick={() => setPreviewMode('preview')}
                className="text-sm font-semibold h-auto py-1.5 px-3 flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t('componentsDoc.tabLivePreview', '라이브 뷰')}</span>
              </Button>
              <Button
                type="button"
                size="sm"
                variant={previewMode === 'tokens' ? 'primary' : 'ghost'}
                onClick={() => setPreviewMode('tokens')}
                className="text-sm font-semibold h-auto py-1.5 px-3 flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t('componentsDoc.tabInspectTokens', '디자인 토큰값 조회')} ({componentTokens.length})</span>
              </Button>
            </div>
          </div>

          <div className="w-full min-h-[220px] p-6 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle) flex items-center justify-center">
            {previewMode === 'preview' ? (
              renderPreview()
            ) : (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in">
                {componentTokens.map((tm, idx) => {
                  const locToken = getLocalizedToken(tm, locale);
                  return (
                    <div key={idx} className="p-4 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-2 shadow-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-(--text-primary)">{locToken.role}</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) shrink-0">
                          {tm.dtcgPath}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <code className="text-sm font-mono text-(--accent-primary) dark:text-(--accent-primary) font-semibold">{tm.variable}</code>
                        <div className="flex items-center gap-2">
                          {tm.type === 'color' && (
                            <span
                              className="w-4 h-4 rounded-full border border-(--border-subtle) shadow-xs shrink-0"
                              style={{ backgroundColor: tm.defaultValue.startsWith('#') || tm.defaultValue.startsWith('rgb') ? tm.defaultValue : 'var(--accent-primary)' }}
                            />
                          )}
                          <span className="text-sm font-mono font-bold text-(--text-primary)">{tm.defaultValue}</span>
                        </div>
                      </div>
                      <p className="text-sm text-(--text-secondary) leading-relaxed mt-0.5">{locToken.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 2-A. Studio Design Types Inspection (스튜디오 연동 1. Type 외형 양식 카탈로그) */}
        {compTypes && compTypes.length > 0 && (
          <section id="studio-types" className="scroll-mt-28 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-(--accent-primary)" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">
                  {locale === 'ko' ? '1. Type 디자인 외형 양식 카탈로그 (Studio Types)' : '1. Component Type Specifications'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) text-xs font-mono font-semibold">
                  {compTypes.length} Types Registered
                </span>
              </div>
              <Link
                href={`/studio?component=${studioCompId}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) hover:bg-(--bg-primary) transition flex items-center gap-1.5 shadow-xs"
              >
                <span>스튜디오에서 Type 관리</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {compTypes.map((tp, idx) => (
                <div
                  key={tp.id}
                  className="p-4 rounded-(--radius-sm) border border-(--border-subtle) bg-(--bg-primary) flex flex-col justify-between gap-3 shadow-xs hover:border-(--accent-primary) transition group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted)">
                          #{idx + 1}
                        </span>
                        <span className="font-bold text-xs text-(--text-primary)">{tp.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary)">
                        type="{tp.id}"
                      </span>
                    </div>

                    {/* Live Preview of Type */}
                    <div className="py-3 px-2 rounded bg-(--bg-secondary)/40 border border-(--border-subtle)/60 flex items-center justify-center">
                      {component.id === 'button' ? (
                        <Button componentType={tp.id} variable="primary" size="sm">
                          {tp.name.split(' (')[0]}
                        </Button>
                      ) : (
                        <div className="text-xs font-mono text-(--text-muted)">
                          &lt;{component.name.split(' (')[0]} componentType="{tp.id}" /&gt;
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-(--text-secondary) leading-snug">{tp.description}</p>
                    {tp.whenToUse && (
                      <div className="text-[10px] text-(--text-muted) bg-(--bg-secondary)/50 p-2 rounded leading-relaxed border border-(--border-subtle)/30">
                        <strong className="text-(--text-secondary)">💡 추천 상황:</strong> {tp.whenToUse}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-(--border-subtle)/40 flex items-center justify-between text-[11px]">
                    <code className="text-[10px] text-(--text-muted) font-mono">componentType="{tp.id}"</code>
                    <Link
                      href={`/studio?component=${studioCompId}`}
                      className="text-(--accent-primary) font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>편집</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2-B. Studio Design Variables Inspection (스튜디오 연동 2. Variable 세부 옵션 명세) */}
        {studioDef && studioDef.variables.length > 0 && (
          <section id="studio-variables" className="scroll-mt-28 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-(--accent-primary)" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">
                  {locale === 'ja'
                    ? '2. Studio 登録デザイン変数仕様 (Studio Variables)'
                    : locale === 'en'
                    ? '2. Studio-Configured Design Variables'
                    : '2. Variable 디자인 세부 옵션 명세 (Studio Variables)'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) text-xs font-mono font-semibold">
                  {studioDef.variables.length} Variables Registered
                </span>
              </div>
              <Link
                href={`/studio?component=${studioCompId}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-(--radius-sm) bg-(--accent-primary) text-white hover:opacity-90 transition flex items-center gap-1.5 shadow-xs"
              >
                <span>스튜디오에서 변수 커스텀하기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {studioDef.variables.map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-(--radius-sm) border border-(--border-subtle) bg-(--bg-primary) flex flex-col justify-between gap-3 shadow-xs hover:border-(--accent-primary) transition group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-(--text-primary)">{v.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">
                        .{component.id}--{v.id}
                      </span>
                    </div>

                    {/* Live Preview for Button variable */}
                    {component.id === 'button' && (
                      <div className="py-2.5 px-2 rounded bg-(--bg-secondary)/30 border border-(--border-subtle)/50 flex items-center justify-center">
                        <Button variable={v.id} size="sm">
                          {v.name.split(' (')[0]}
                        </Button>
                      </div>
                    )}

                    <p className="text-[11px] text-(--text-secondary) leading-snug line-clamp-2">{v.description}</p>
                  </div>

                  <div className="pt-2 border-t border-(--border-subtle)/60 space-y-1">
                    <div className="text-[10px] font-mono font-bold text-(--text-muted) uppercase">
                      Token Bindings:
                    </div>
                    <div className="space-y-0.5">
                      {Object.entries(v.tokenBindings).slice(0, 3).map(([prop, val]) => (
                        <div key={prop} className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-(--text-secondary)">{prop}:</span>
                          <span className="text-(--accent-primary) font-semibold truncate max-w-[130px]">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-(--border-subtle)/40 flex items-center justify-between text-[11px]">
                    <code className="text-[10px] text-(--text-muted) font-mono">variable="{v.id}"</code>
                    <Link
                      href={`/studio?component=${studioCompId}`}
                      className="text-(--accent-primary) font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>편집</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. W3C DTCG Token Mapping Specification (컴포넌트 토큰값 상세 조회) */}
        <section id="tokens" className="scroll-mt-28 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-(--accent-primary) dark:text-(--accent-primary)" />
              <span className="text-(--text-primary)">{t('componentsDoc.tokensTitle', '연동된 W3C DTCG 디자인 토큰 (tokens/token.json)')}</span>
              <span className="ml-1 px-2.5 py-0.5 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) dark:text-(--accent-primary) text-xs font-mono font-semibold">
                {componentTokens.length} Tokens Bound
              </span>
            </h2>
            <div className="flex items-center gap-3">
              <Link
                href="/studio"
                className="text-sm font-semibold px-3 py-1.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) hover:bg-(--bg-primary) transition flex items-center gap-1.5 shadow-xs"
              >
                <Sliders className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>{t('componentsDoc.tokensEditInStudio', '테마 에디터에서 수정 (/studio)')}</span>
              </Link>
              <Link
                href="/tokens"
                className="text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) underline"
              >
                {t('componentsDoc.tokensViewAll', '전체 토큰 명세 보기 →')}
              </Link>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">{t('componentsDoc.thRole', '토큰 역할 (Role)')}</TableHead>
                <TableHead className="w-1/4">{t('componentsDoc.thVariable', 'CSS 변수 (Variable)')}</TableHead>
                <TableHead className="w-1/4">{t('componentsDoc.thDtcgPath', 'DTCG JSON 경로')}</TableHead>
                <TableHead className="w-1/4">{t('componentsDoc.thDefaultValue', '기본값 및 기능 매핑')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {componentTokens.map((tm, idx) => {
                const locToken = getLocalizedToken(tm, locale);
                return (
                  <TableRow key={idx}>
                    <TableCell className="font-semibold text-sm text-(--text-primary)">
                      {locToken.role}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-(--accent-primary) dark:text-(--accent-primary) font-semibold">
                      <code>{tm.variable}</code>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-(--text-secondary)">
                      {tm.dtcgPath}
                    </TableCell>
                    <TableCell className="text-sm text-(--text-secondary)">
                      <div className="flex items-center gap-2">
                        {tm.type === 'color' && (
                          <span
                            className="w-4 h-4 rounded-full border border-(--border-subtle) shrink-0 shadow-xs"
                            style={{ backgroundColor: tm.defaultValue.startsWith('#') || tm.defaultValue.startsWith('rgb') ? tm.defaultValue : 'var(--accent-primary)' }}
                          />
                        )}
                        <span className="font-mono font-bold text-(--text-primary)">{tm.defaultValue}</span>
                      </div>
                      <p className="text-sm text-(--text-secondary) mt-0.5">{locToken.description}</p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>

        {/* 3. Code Copy Section (React / Vue / HTML) */}
        <section id="code" className="scroll-mt-28 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-(--text-primary) flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-(--accent-primary)" />
              <span>{t('componentsDoc.codeSnippetTitle', '컴포넌트 코드 스니펫 (Code Copy)')}</span>
            </h2>
            <span className="text-sm text-(--text-secondary) font-mono">Framework Agnostic</span>
          </div>

          <div className="rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) overflow-hidden text-(--text-primary)">
            <div className="flex items-center justify-between px-4 py-2 border-b border-(--border-subtle) bg-(--bg-secondary)/40 text-sm font-semibold">
              <div className="flex items-center gap-1">
                {(['react', 'vue', 'html'] as const).map((tab) => (
                  <Button
                    key={tab}
                    variant={activeSnippetTab === tab ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveSnippetTab(tab)}
                    className="text-sm font-medium px-3 py-1.5 h-auto"
                  >
                    {tab === 'react' ? 'React / Next.js' : tab === 'vue' ? 'Vue 3' : 'Vanilla HTML'}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCode}
                className="text-sm font-medium flex items-center gap-1.5 h-auto py-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-(--atom-color-success)" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t('componentsDoc.copied', '복사됨!') : t('componentsDoc.copyCode', '전체 코드 복사')}</span>
              </Button>
            </div>

            <CodeHighlight
              code={activeSnippet}
              language={activeSnippetTab === 'html' ? 'html' : activeSnippetTab === 'vue' ? 'html' : 'tsx'}
              className="p-4 bg-(--bg-secondary)/10"
            />
          </div>
        </section>

        {/* 3. Use Cases (사용 케이스) */}
        <section id="use-cases" className="scroll-mt-28 flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-(--accent-primary)" />
            <span>{t('componentsDoc.useCasesTitle', '실무 주요 사용 케이스 (Use Cases)')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayUseCases.map((useCase, idx) => (
              <Card
                key={idx}
                className="p-4 flex items-start gap-3 shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-(--bg-secondary) text-(--text-primary) font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-(--border-subtle)">
                  {idx + 1}
                </div>
                <p className="text-sm text-(--text-primary) leading-relaxed">
                  {useCase}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. Usage Patterns & Best Practices */}
        <section id="patterns" className="scroll-mt-28 flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-(--accent-primary)" />
            <span>{t('componentsDoc.usagePatternsTitle', '권장 사용 패턴 및 설계 지침 (Usage Patterns)')}</span>
          </h2>
          <Card className="p-4 flex flex-col gap-2.5">
            {displayUsagePatterns.map((pattern, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-(--text-primary)">
                <span className="w-1.5 h-1.5 rounded-full bg-(--accent-primary) mt-2 shrink-0" />
                <p className="leading-relaxed">{pattern}</p>
              </div>
            ))}
          </Card>
        </section>

        {/* 5. Do's & Don'ts */}
        {displayDosAndDonts && displayDosAndDonts.length > 0 && (
          <section id="dos-donts" className="scroll-mt-28 flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary)">
              {t('componentsDoc.dosAndDontsTitle', "올바른 사용법 & 안티패턴 방지 (Do's & Don'ts)")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayDosAndDonts.map((rule, idx) => (
                <React.Fragment key={idx}>
                  <Card className="p-4 border-(--atom-color-success)/20 bg-(--atom-color-success)/5 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-(--atom-color-success) dark:text-(--atom-color-success)">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('componentsDoc.doLabel', 'DO (권장)')}</span>
                    </div>
                    <p className="text-sm text-(--text-primary) leading-relaxed">
                      {rule.do}
                    </p>
                  </Card>

                  <Card className="p-4 border-(--atom-color-destructive)/20 bg-rose-500/5 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-(--atom-color-destructive) dark:text-(--atom-color-destructive)">
                      <XCircle className="w-4 h-4" />
                      <span>{t('componentsDoc.dontLabel', "DON'T (지양)")}</span>
                    </div>
                    <p className="text-sm text-(--text-primary) leading-relaxed">
                      {rule.dont}
                    </p>
                  </Card>
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {/* 6. API Props Reference */}
        {component.propsSpec && component.propsSpec.length > 0 && (
          <section id="props" className="scroll-mt-28 flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary)">
              {t('componentsDoc.propsSpecTitle', 'API Props 규격 명세 (API Reference)')}
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">{t('componentsDoc.propName', 'Property')}</TableHead>
                  <TableHead className="w-1/3">{t('componentsDoc.propType', 'Type')}</TableHead>
                  <TableHead className="w-1/6">{t('componentsDoc.propDefault', 'Default')}</TableHead>
                  <TableHead>{t('componentsDoc.propDescription', 'Description')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {component.propsSpec.map((prop, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-mono font-semibold text-(--text-primary) text-sm">{prop.name}</TableCell>
                    <TableCell className="font-mono text-sm text-(--text-secondary)">{prop.type}</TableCell>
                    <TableCell className="font-mono text-sm text-(--text-muted)">{prop.defaultValue}</TableCell>
                    <TableCell className="text-sm text-(--text-primary)">
                      {getLocalizedPropDescription(prop.name, prop.description, locale)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        )}

        {/* 7. Related UX Patterns */}
        {relatedPatterns.length > 0 && (
          <section id="related" className="scroll-mt-28 flex flex-col gap-3 pt-4 border-t border-(--border-subtle)">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-(--accent-primary)" />
              <span>{t('componentsDoc.relatedPatternsTitle', '이 컴포넌트가 사용되는 실무 UX 패턴')}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {relatedPatterns.map((pattern) => {
                const localizedPattern = getLocalizedPattern(pattern.id, pattern.title, pattern.categoryName, locale);
                return (
                  <Link
                    key={pattern.id}
                    href={`/patterns`}
                    className="p-4 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) hover:border-(--border-strong) transition-colors flex flex-col justify-between gap-2 shadow-xs group"
                  >
                    <div>
                      <span className="text-xs font-medium text-(--text-secondary) uppercase">{localizedPattern.categoryName}</span>
                      <h3 className="text-base font-semibold text-(--text-primary) group-hover:text-(--accent-primary) transition-colors mt-0.5">
                        {localizedPattern.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-(--accent-primary)">
                      <span>{locale === 'ja' ? 'パターン詳細を見る' : locale === 'en' ? 'View Pattern Detail' : '패턴 상세 보기'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
        </div>

        {/* 3. Right Column: Quick On-Page Section TOC */}
        <aside className="w-52 shrink-0 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pl-4 border-l border-(--border-subtle) select-none hidden xl:flex flex-col gap-3 text-sm">
          <span className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wider">
            {t('componentsDoc.tocTitle', '이 페이지 목차')}
          </span>
          <ul className="flex flex-col gap-1.5 text-sm">
            <li>
              <a href="#preview" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                {t('common.preview', '라이브 프리뷰')}
              </a>
            </li>
            {studioDef && studioDef.variables.length > 0 && (
              <li>
                <a href="#studio-variables" className="text-(--accent-primary) font-semibold py-1 block transition-colors flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>스튜디오 변수 ({studioDef.variables.length})</span>
                </a>
              </li>
            )}
            <li>
              <a href="#tokens" className="text-(--accent-primary) dark:text-(--accent-primary) font-semibold py-1 block transition-colors flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>{t('componentsDoc.tokensTitle', '디자인 토큰 명세')} ({componentTokens.length})</span>
              </a>
            </li>
            <li>
              <a href="#code" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                {t('componentsDoc.codeSnippetTitle', '코드 스니펫')}
              </a>
            </li>
            <li>
              <a href="#use-cases" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                {t('componentsDoc.useCasesTitle', '실무 사용 케이스')}
              </a>
            </li>
            <li>
              <a href="#patterns" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                {t('componentsDoc.usagePatternsTitle', '권장 사용 패턴')}
              </a>
            </li>
            {component.dosAndDonts && component.dosAndDonts.length > 0 && (
              <li>
                <a href="#dos-donts" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                  {t('componentsDoc.dosAndDontsTitle', "Do's & Don'ts")}
                </a>
              </li>
            )}
            {component.propsSpec && component.propsSpec.length > 0 && (
              <li>
                <a href="#props" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                  {t('componentsDoc.propsSpecTitle', 'API Props 명세')}
                </a>
              </li>
            )}
            {relatedPatterns.length > 0 && (
              <li>
                <a href="#related" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                  {t('componentsDoc.relatedPatternsTitle', '관련 UX 패턴')}
                </a>
              </li>
            )}
          </ul>
        </aside>
    </>
  );
}
