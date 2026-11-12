'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { GalleryComponent } from '@/lib/data/components';
import { PATTERNS_COLLECTION } from '@/lib/data/patterns';
import { Tree, TreeNode } from '@/components/ui/Tree';
import {
  Button,
  Badge,
  Card,
  Input,
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
  Container,
  Layout,
  Stack,
  Grid,
} from '@/components/ui';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { COMPONENT_TOKEN_MAPPINGS, getComponentTokens, getLocalizedToken } from '@/lib/data/componentTokens';
import { getComponentLocalizedData } from '@/lib/i18n/componentTranslations';
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
  Coins,
} from 'lucide-react';

interface ComponentDetailPageContentProps {
  component: GalleryComponent;
}

export function ComponentDetailPageContent({ component }: ComponentDetailPageContentProps) {
  const { theme } = useThemeEditor();
  const { t, dictionary, locale } = useI18n();
  const brandColor = theme?.color?.primary || '#3182f6';
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

  const activeSnippet =
    activeSnippetTab === 'react'
      ? component.reactSnippet
      : activeSnippetTab === 'vue'
      ? component.vueSnippet || component.reactSnippet
      : component.htmlSnippet;

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
                    <div className="h-3 rounded bg-blue-500/20 border border-blue-500/30 flex items-center justify-start overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: s.val }} />
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
                  <div className="px-3 py-1.5 rounded-(--radius-sm) bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-sm font-medium">
                    Item 1
                  </div>
                  <div className="px-3 py-1.5 rounded-(--radius-sm) bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-sm font-medium">
                    Item 2
                  </div>
                  <div className="px-3 py-1.5 rounded-(--radius-sm) bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-sm font-medium">
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
                <div className="p-4 rounded-(--radius) bg-blue-600 text-white flex flex-col justify-between h-24 shadow-xs">
                  <span className="text-xs font-mono opacity-80">Primary (Brand)</span>
                  <span className="text-sm font-bold">#3182f6</span>
                </div>
                <div className="p-4 rounded-(--radius) bg-emerald-600 text-white flex flex-col justify-between h-24 shadow-xs">
                  <span className="text-xs font-mono opacity-80">Success (Positive)</span>
                  <span className="text-sm font-bold">#10b981</span>
                </div>
                <div className="p-4 rounded-(--radius) bg-amber-500 text-white flex flex-col justify-between h-24 shadow-xs">
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
          <div className="w-full max-w-2xl flex flex-col gap-6 py-2">
            {/* 1. 계층별 (Hierarchy: 3-Tier) */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                {locale === 'ja'
                  ? '1. 重要度に応じた3段階ヒエラルキー (HIERARCHY)'
                  : locale === 'en'
                  ? '1. 3-Tier Visual Hierarchy (HIERARCHY)'
                  : '1. 중요도에 따른 3계층 위계 (HIERARCHY)'}
              </span>
              <div className="flex flex-wrap items-center gap-3 p-3 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle)">
                <Button variant="primary">
                  {locale === 'ja' ? 'Primary (第1階層 主行動)' : locale === 'en' ? 'Primary (Tier 1 Action)' : 'Primary (1계층 주행동)'}
                </Button>
                <Button variant="secondary">
                  {locale === 'ja' ? 'Secondary (第2階層 補助)' : locale === 'en' ? 'Secondary (Tier 2 Action)' : 'Secondary (2계층 보조)'}
                </Button>
                <Button variant="outline">
                  {locale === 'ja' ? 'Outline (境界線)' : locale === 'en' ? 'Outline (Border)' : 'Outline (경계선)'}
                </Button>
                <Button variant="ghost">
                  {locale === 'ja' ? 'Ghost (第3階層 付加)' : locale === 'en' ? 'Ghost (Tier 3 Action)' : 'Ghost (3계층 부가)'}
                </Button>
              </div>
            </div>

            {/* 2. 시스템 시맨틱 상태 색상 (Semantic Status) */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                {locale === 'ja'
                  ? '2. システム機能マッピング状態色 (SEMANTIC STATUS COLORS)'
                  : locale === 'en'
                  ? '2. Semantic Status Colors (SEMANTIC STATUS COLORS)'
                  : '2. 시스템 기능 매핑 상태 색상 (SEMANTIC STATUS COLORS)'}
              </span>
              <div className="flex flex-wrap items-center gap-3 p-3 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle)">
                <Button variant="primary">Brand (Primary)</Button>
                <Button variant="success">
                  {locale === 'ja' ? '成功 (Success/Green)' : locale === 'en' ? 'Success (Green)' : '성공 (Success/Green)'}
                </Button>
                <Button variant="warning">
                  {locale === 'ja' ? '警告 (Warning/Orange)' : locale === 'en' ? 'Warning (Orange)' : '경고 (Warning/Orange)'}
                </Button>
                <Button variant="destructive">
                  {locale === 'ja' ? '危険 (Destructive/Red)' : locale === 'en' ? 'Destructive (Red)' : '위험 (Destructive/Red)'}
                </Button>
              </div>
            </div>

            {/* 3. 아이콘 단독 & 피드백 상태 (Icon-Only & States) */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
                {locale === 'ja'
                  ? '3. アイコンボタン & 状態フィードバック (ICON & STATES)'
                  : locale === 'en'
                  ? '3. Icon Buttons & States (ICON & STATES)'
                  : '3. 아이콘 버튼 & 상호작용 피드백 (ICON & STATES)'}
              </span>
              <div className="flex flex-wrap items-center gap-3 p-3 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle)">
                <Button isIconOnly variant="primary" aria-label={locale === 'ja' ? 'お気に入り' : locale === 'en' ? 'Favorite' : '즐겨찾기'}>
                  <Sparkles className="w-4 h-4" />
                </Button>
                <Button isIconOnly variant="secondary" aria-label={locale === 'ja' ? 'コピー' : locale === 'en' ? 'Copy' : '복사'}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button isIconOnly variant="ghost" aria-label={locale === 'ja' ? '閉じる' : locale === 'en' ? 'Close' : '닫기'}>
                  <X className="w-4 h-4" />
                </Button>
                <Button isIconOnly variant="destructive" aria-label={locale === 'ja' ? '削除' : locale === 'en' ? 'Delete' : '삭제'}>
                  <XCircle className="w-4 h-4" />
                </Button>
                <Button disabled>Disabled</Button>
                <Button loading>{locale === 'ja' ? '読み込み中...' : locale === 'en' ? 'Loading...' : '로딩 중...'}</Button>
              </div>
            </div>
          </div>
        );

      case 'input':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            <Input
              label="이메일 주소 (기본)"
              type="email"
              placeholder="name@company.com"
            />
            <Input
              label="에러 상태 인풋"
              defaultValue="invalid_email"
              error="유효한 이메일 형식을 입력하세요."
            />
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
                {switchState ? '야간 푸시 알림 켜짐' : '야간 푸시 알림 꺼짐'}
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={checkboxState}
                onChange={(e) => setCheckboxState(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-(--text-primary)">
                이용약관 및 개인정보 처리방침 전체 동의
              </span>
            </label>
          </div>
        );

      case 'dialog':
        return (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition"
            >
              모달 다이얼로그 열기
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">정말 송금하시겠습니까?</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    받는 분: 김토스 (토스뱅크 1002-***-4921)<br />
                    보낼 금액: <strong>₩500,000</strong> (수수료 면제)
                  </p>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-semibold"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700"
                    >
                      송금 완료
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'sheet':
        return (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setIsSheetOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-sm shadow-md transition"
            >
              바텀시트 드로어 열기
            </button>

            {isSheetOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
                <div className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 rounded-t-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
                  <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">매장 상세 정보</h3>
                    <button onClick={() => setIsSheetOpen(false)} className="text-neutral-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-850 text-sm">
                    <div className="font-bold">블루보틀 성수 카페</div>
                    <div className="text-emerald-600 mt-1">● 현재 영업 중 (21:00 마감)</div>
                  </div>
                  <button
                    onClick={() => setIsSheetOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold"
                  >
                    길찾기 실행
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'alert':
        return showAlert ? (
          <div className="w-full max-w-md p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-100 flex items-start justify-between gap-3 text-sm">
            <div className="flex items-start gap-2.5">
              <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold block">새로운 버전 v1.2 업데이트</span>
                <span className="text-xs text-blue-700 dark:text-blue-300">
                  W3C DTCG 호환 스타일 딕셔너리 컴파일러가 추가되었습니다.
                </span>
              </div>
            </div>
            <button onClick={() => setShowAlert(false)} className="text-blue-400 hover:text-blue-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button onClick={() => setShowAlert(true)} className="text-sm text-blue-600 font-semibold underline">
            알림 다시 열기
          </button>
        );

      case 'tabs':
        return (
          <div className="w-full max-w-sm flex flex-col gap-3">
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
              선택된 탭: <strong className="text-(--text-primary)">{activeTab}</strong>
            </TabsContent>
          </div>
        );

      case 'badge':
        return (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="primary">NEW Feature</Badge>
            <Badge variant="success">온라인 연결됨</Badge>
            <Badge variant="warning">대기중</Badge>
            <Badge variant="destructive">오류 발생</Badge>
          </div>
        );

      case 'card':
        return (
          <Card className="p-5 max-w-xs w-full flex flex-col gap-2">
            <Badge variant="primary" className="self-start text-xs">토큰 바인딩 서피스</Badge>
            <h4 className="text-base font-bold text-(--text-primary)">토스뱅크 자유적금</h4>
            <div className="text-xl font-bold text-(--text-primary)">₩ 12,450,000</div>
            <p className="text-sm text-(--text-secondary)">연 4.5% 최고 금리 적용 중</p>
          </Card>
        );

      case 'table':
        return (
          <div className="w-full max-w-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>멤버</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>역할</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">김민수</TableCell>
                  <TableCell>
                    <Badge variant="success">정상 가동</Badge>
                  </TableCell>
                  <TableCell className="text-(--text-secondary)">소유자 (Admin)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">이지은</TableCell>
                  <TableCell>
                    <Badge variant="primary">초대 수락</Badge>
                  </TableCell>
                  <TableCell className="text-(--text-secondary)">디자이너</TableCell>
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
          <div className="w-full max-w-sm p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-500 font-mono pb-2 border-b border-neutral-200 dark:border-neutral-800">
              <span>EXPLORER</span>
              <span>선택: <strong className="text-blue-500">{selectedTreeId}</strong></span>
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
              Stack & Grid 토큰 연동 프리뷰
            </div>
            <Stack gap="3">
              <div className="p-2.5 rounded-(--radius-sm) bg-(--bg-secondary) text-sm font-mono">
                Stack gap="3" (12px) 아이템 1
              </div>
              <div className="p-2.5 rounded-(--radius-sm) bg-(--bg-secondary) text-sm font-mono">
                Stack gap="3" (12px) 아이템 2
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

      default:
        return null;
    }
  };

  // Related Patterns
  const relatedPatterns = PATTERNS_COLLECTION.filter((p) =>
    component.relatedPatternIds?.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between transition-colors">
      {/* Global Header */}
      <Header brandColor={brandColor} />

      {/* Main 3-Column Documentation Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-1 flex gap-8 items-start">
        {/* 1. Left Column: Components Sidebar */}
        <DocsSidebar activeId={component.id} />

        {/* 2. Center Column: Main Component Content */}
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
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Coins className="w-3.5 h-3.5" />
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
              <button
                type="button"
                onClick={() => setPreviewMode('preview')}
                className={`px-3 py-1.5 rounded-(--radius-sm) text-sm font-semibold transition ${
                  previewMode === 'preview'
                    ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs'
                    : 'text-(--text-secondary) hover:text-(--text-primary)'
                }`}
              >
                {t('componentsDoc.tabLivePreview', '👁️ 라이브 뷰')}
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('tokens')}
                className={`px-3 py-1.5 rounded-(--radius-sm) text-sm font-semibold transition flex items-center gap-1.5 ${
                  previewMode === 'tokens'
                    ? 'bg-(--bg-primary) text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-(--text-secondary) hover:text-(--text-primary)'
                }`}
              >
                <Coins className="w-4 h-4" />
                <span>{t('componentsDoc.tabInspectTokens', '디자인 토큰값 조회')} ({componentTokens.length})</span>
              </button>
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
                        <code className="text-sm font-mono text-blue-600 dark:text-blue-400 font-semibold">{tm.variable}</code>
                        <div className="flex items-center gap-2">
                          {tm.type === 'color' && (
                            <span
                              className="w-4 h-4 rounded-full border border-(--border-subtle) shadow-xs shrink-0"
                              style={{ backgroundColor: tm.defaultValue.startsWith('#') || tm.defaultValue.startsWith('rgb') ? tm.defaultValue : '#3182f6' }}
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

        {/* 2. W3C DTCG Token Mapping Specification (컴포넌트 토큰값 상세 조회) */}
        <section id="tokens" className="scroll-mt-28 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-(--text-primary)">{t('componentsDoc.tokensTitle', '연동된 W3C DTCG 디자인 토큰 (tokens/token.json)')}</span>
              <span className="ml-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-semibold">
                {componentTokens.length} Tokens Bound
              </span>
            </h2>
            <div className="flex items-center gap-3">
              <Link
                href="/studio"
                className="text-sm font-semibold px-3 py-1.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) hover:bg-(--bg-primary) transition flex items-center gap-1.5 shadow-xs"
              >
                <span>{t('componentsDoc.tokensEditInStudio', '🛠️ 테마 에디터에서 수정 (/studio)')}</span>
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
                    <TableCell className="font-mono text-sm text-blue-600 dark:text-blue-400 font-semibold">
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
                            style={{ backgroundColor: tm.defaultValue.startsWith('#') || tm.defaultValue.startsWith('rgb') ? tm.defaultValue : '#3182f6' }}
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
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t('componentsDoc.copied', '복사됨!') : t('common.copy', '전체 코드 복사')}</span>
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
                  <Card className="p-4 border-emerald-500/20 bg-emerald-500/5 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('componentsDoc.doLabel', 'DO (권장)')}</span>
                    </div>
                    <p className="text-sm text-(--text-primary) leading-relaxed">
                      {rule.do}
                    </p>
                  </Card>

                  <Card className="p-4 border-rose-500/20 bg-rose-500/5 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
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
                    <TableCell className="text-sm text-(--text-primary)">{prop.description}</TableCell>
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
              {relatedPatterns.map((pattern) => (
                <Link
                  key={pattern.id}
                  href={`/patterns`}
                  className="p-4 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) hover:border-(--border-strong) transition-colors flex flex-col justify-between gap-2 shadow-xs group"
                >
                  <div>
                    <span className="text-xs font-medium text-(--text-secondary) uppercase">{pattern.categoryName}</span>
                    <h3 className="text-base font-semibold text-(--text-primary) group-hover:text-(--accent-primary) transition-colors mt-0.5">
                      {pattern.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-(--accent-primary)">
                    <span>{locale === 'ja' ? 'パターン詳細を見る' : locale === 'en' ? 'View Pattern Detail' : '패턴 상세 보기'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
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
            <li>
              <a href="#tokens" className="text-blue-600 dark:text-blue-400 font-semibold py-1 block transition-colors flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
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
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 mt-12 py-6 px-6 text-center text-xs text-neutral-500">
        <p>© 2026 AtomDesignToken · W3C Design Tokens Community Group Standard</p>
      </footer>
    </div>
  );
}
