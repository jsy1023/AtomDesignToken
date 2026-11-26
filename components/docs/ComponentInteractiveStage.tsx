'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  NativeSelect,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TabsContent,
  TabsList,
  TabsTrigger,
  TokenSelect,
} from '@/components/ui';
import { Tree, TreeNode } from '@/components/ui/Tree';
import {
  ComponentInteractiveStatus,
  ComponentTypeSpec,
  ComponentVariable,
} from '@/lib/data/studioData';
import { formatLocaleText } from '@/lib/utils/localeFormat';
import { ArrowRight, ExternalLink, Sparkles, X } from 'lucide-react';

export interface ComponentCoreStageProps {
  componentId: string;
  locale: string;
  compTypes: ComponentTypeSpec[];
  studioVariables: ComponentVariable[];
}

export function ComponentCoreStage({
  componentId,
  locale,
  compTypes,
  studioVariables,
}: ComponentCoreStageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [checkboxState, setCheckboxState] = useState(true);
  const [activeTab, setActiveTab] = useState<'account' | 'password' | 'settings'>('account');
  const [showAlert, setShowAlert] = useState(true);
  const [selectedTreeId, setSelectedTreeId] = useState<string>('Button.tsx');
  const [demoTokenSelectVal, setDemoTokenSelectVal] = useState('--atom-palette-blue-500');

  const [btnInteractiveType, setBtnInteractiveType] = useState<string>('solid');
  const [btnInteractiveVar, setBtnInteractiveVar] = useState<string>('primary');
  const [btnInteractiveSize, setBtnInteractiveSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [btnInteractiveSlot, setBtnInteractiveSlot] = useState<'none' | 'left' | 'right' | 'icon-only'>('none');
  const [btnInteractiveStatus, setBtnInteractiveStatus] = useState<ComponentInteractiveStatus>('default');

  switch (componentId) {
    case 'layout-spacing':
      return (
        <div className="w-full max-w-2xl flex flex-col gap-6 py-2">
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
              {locale === 'ja' ? '8ポイントグリッド 余白スケール (Spacing Scale)' : locale === 'en' ? '8-Point Grid Spacing Scale' : '8-Point 그리드 간격 스케일 (Spacing Scale)'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle)">
              {[
                { name: 'space-1', val: '4px' },
                { name: 'space-2', val: '8px' },
                { name: 'space-3', val: '12px' },
                { name: 'space-4', val: '16px' },
                { name: 'space-6', val: '24px' },
                { name: 'space-8', val: '32px' },
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
                {['Item 1', 'Item 2', 'Item 3'].map((it) => (
                  <div key={it} className="px-3 py-1.5 rounded-(--radius-sm) bg-(--accent-primary)/10 text-(--accent-primary) border border-(--accent-primary)/20 text-sm font-medium">
                    {it}
                  </div>
                ))}
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
                <span className="text-sm font-bold">var(--atom-color-success)</span>
              </div>
              <div className="p-4 rounded-(--radius) bg-(--atom-color-warning) text-white flex flex-col justify-between h-24 shadow-xs">
                <span className="text-xs font-mono opacity-80">Warning (Caution)</span>
                <span className="text-sm font-bold">var(--atom-color-warning)</span>
              </div>
              <div className="p-4 rounded-(--radius) bg-(--atom-color-destructive) text-white flex flex-col justify-between h-24 shadow-xs">
                <span className="text-xs font-mono opacity-80">Destructive (Danger)</span>
                <span className="text-sm font-bold">var(--atom-color-destructive)</span>
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
          <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-(--border-subtle) pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-(--accent-primary)" />
                <span className="font-bold text-xs uppercase tracking-wider text-(--text-primary)">
                  {locale === 'ko' ? '인터랙티브 3대 아키텍처 라이브 스테이지 (Studio Sync)' : '3-Tier Interactive Live Stage'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-semibold">Type: {btnInteractiveType}</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) font-semibold">Variable: {btnInteractiveVar}</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted)">Status: {btnInteractiveStatus}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-(--text-secondary) text-[11px]">1. Type (외형 양식 · {compTypes.length})</label>
                <NativeSelect value={btnInteractiveType} onChange={(e) => setBtnInteractiveType(e.target.value)} className="text-xs">
                  {compTypes.map((tp) => (
                    <option key={tp.id} value={tp.id}>{tp.name}</option>
                  ))}
                </NativeSelect>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-(--text-secondary) text-[11px]">2. Variable (시스템 색상 · {studioVariables.length})</label>
                <NativeSelect value={btnInteractiveVar} onChange={(e) => setBtnInteractiveVar(e.target.value)} className="text-xs">
                  {studioVariables.map((vr) => (
                    <option key={vr.id} value={vr.id}>{vr.name}</option>
                  ))}
                </NativeSelect>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-(--text-secondary) text-[11px]">규격 (Size)</label>
                <NativeSelect value={btnInteractiveSize} onChange={(e) => setBtnInteractiveSize(e.target.value as 'sm' | 'md' | 'lg')} className="text-xs">
                  <option value="sm">Small (sm - 콤팩트)</option>
                  <option value="md">Medium (md - 표준)</option>
                  <option value="lg">Large (lg - 와이드)</option>
                </NativeSelect>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-(--text-secondary) text-[11px]">아이콘 슬롯 (Slots)</label>
                <NativeSelect value={btnInteractiveSlot} onChange={(e) => setBtnInteractiveSlot(e.target.value as typeof btnInteractiveSlot)} className="text-xs">
                  <option value="none">아이콘 없음 (none)</option>
                  <option value="left">왼쪽 아이콘 (left)</option>
                  <option value="right">오른쪽 아이콘 (right)</option>
                  <option value="icon-only">아이콘 단독 (icon-only)</option>
                </NativeSelect>
              </div>
            </div>

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
                    {formatLocaleText(studioVariables.find((v) => v.id === btnInteractiveVar)?.name || btnInteractiveVar, locale)}
                  </span>
                )}
                {btnInteractiveSlot === 'right' && <ArrowRight className="w-4 h-4" />}
              </Button>

              <div className="flex items-center gap-2 bg-(--bg-primary) px-3 py-1.5 rounded-(--radius-sm) border border-(--border-subtle) font-mono text-[11px] text-(--accent-primary) shadow-2xs">
                <code>
                  &lt;Button componentType=&quot;{btnInteractiveType}&quot; variable=&quot;{btnInteractiveVar}&quot; size=&quot;{btnInteractiveSize}&quot;{btnInteractiveStatus !== 'default' ? ` status="${btnInteractiveStatus}"` : ''}&gt;
                </code>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider flex items-center gap-1.5">
                <Badge variant="primary" className="text-[10px] px-1.5 py-0.5">1. TYPE</Badge>
                <span>{locale === 'ko' ? `새로운 디자인 외형 양식 (${compTypes.length} Types)` : `Component Types Spectrum (${compTypes.length} Types)`}</span>
              </span>
              <span className="text-xs text-(--text-muted) font-mono">{compTypes.length} Types Supported</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {compTypes.map((tp) => (
                <div key={tp.id} className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) flex flex-col items-center justify-between gap-2 text-center">
                  <span className="text-[10px] font-mono text-(--text-secondary) font-bold line-clamp-1" title={tp.name}>{tp.name}</span>
                  <Button componentType={tp.id} variable="primary" size="sm" className="w-full truncate text-[11px]">Button</Button>
                  <code className="text-[9px] font-mono text-(--text-muted)">type=&quot;{tp.id}&quot;</code>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider flex items-center gap-1.5">
                <Badge variant="neutral" className="text-[10px] px-1.5 py-0.5">2. VARIABLE</Badge>
                <span>{locale === 'ko' ? `시스템 시맨틱 색상 및 세부 옵션 (${studioVariables.length} Variables)` : `Semantic System Variables (${studioVariables.length} Variables)`}</span>
              </span>
              <span className="text-xs text-(--text-muted) font-mono">{studioVariables.length} System Variables</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {studioVariables.map((vr) => (
                <div key={vr.id} className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) flex flex-col items-center justify-between gap-2 text-center">
                  <span className="text-[10px] font-mono text-(--text-secondary) font-bold line-clamp-1" title={vr.name}>{vr.name}</span>
                  <Button variable={vr.id} size="sm" className="w-full truncate text-[11px]">{vr.id}</Button>
                  <code className="text-[9px] font-mono text-(--text-muted)">variable=&quot;{vr.id}&quot;</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'input':
      return (
        <div className="w-full max-w-xl flex flex-col gap-5 py-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">스튜디오 인풋 변수 (Standard vs Pill)</span>
            <Link href="/studio?component=input" className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1">
              <span>스튜디오에서 편집</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input variable="standard" label={locale === 'ja' ? '標準インプット (Standard)' : locale === 'en' ? 'Standard Input (Default)' : '표준 인풋 (Standard)'} type="email" placeholder="name@company.com" helperText="스튜디오 기본 6px 곡률" />
            <Input variable="pill" label={locale === 'ja' ? 'ピル型インプット (Pill)' : locale === 'en' ? 'Pill Round Input' : '라운드 알약 인풋 (Pill)'} placeholder="둥근 검색어 입력..." helperText="스튜디오 완전 원형 9999px 곡률" />
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
            <Switch checked={switchState} onCheckedChange={setSwitchState} />
            <span className="text-sm font-medium text-(--text-primary)">
              {switchState
                ? locale === 'ja' ? '夜間プッシュ通知 ON' : locale === 'en' ? 'Night Push Notifications ON' : '야간 푸시 알림 켜짐'
                : locale === 'ja' ? '夜間プッシュ通知 OFF' : locale === 'en' ? 'Night Push Notifications OFF' : '야간 푸시 알림 꺼짐'}
            </span>
          </label>
          <Checkbox
            checked={checkboxState}
            onChange={(e) => setCheckboxState(e.target.checked)}
            label={locale === 'ja' ? '利用規約およびプライバシーポリシーに同意' : locale === 'en' ? 'Agree to Terms of Service & Privacy Policy' : '이용약관 및 개인정보 처리방침 전체 동의'}
          />
        </div>
      );

    case 'dialog':
      return (
        <div className="flex flex-col items-center gap-3">
          <Button variant="primary" onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 font-bold text-sm shadow-md">
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
                <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>{locale === 'ja' ? 'キャンセル' : locale === 'en' ? 'Cancel' : '취소'}</Button>
                <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>{locale === 'ja' ? '送金完了' : locale === 'en' ? 'Confirm Transfer' : '송금 완료'}</Button>
              </div>
            </div>
          </Modal>
        </div>
      );

    case 'sheet':
      return (
        <div className="flex flex-col items-center gap-3">
          <Button variant="primary" onClick={() => setIsSheetOpen(true)} className="px-5 py-2.5 font-bold text-sm shadow-md">
            {locale === 'ja' ? 'ボトムシートを開く' : locale === 'en' ? 'Open Bottom Sheet' : '바텀시트 드로어 열기'}
          </Button>
          {isSheetOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
              <div className="bg-(--bg-primary) border-t border-(--border-subtle) rounded-t-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
                <div className="w-12 h-1 bg-(--border-strong) rounded-full mx-auto" />
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-(--text-primary)">{locale === 'ja' ? '店舗詳細情報' : locale === 'en' ? 'Store Details' : '매장 상세 정보'}</h3>
                  <Button variant="ghost" size="sm" isIconOnly onClick={() => setIsSheetOpen(false)} className="text-(--text-muted) h-auto p-1"><X className="w-4 h-4" /></Button>
                </div>
                <div className="p-3 rounded-xl bg-(--bg-secondary) text-sm">
                  <div className="font-bold text-(--text-primary)">{locale === 'ja' ? 'ブルーボトルコーヒー 渋谷カフェ' : locale === 'en' ? 'Blue Bottle Coffee Roastery' : '블루보틀 성수 카페'}</div>
                  <div className="text-(--atom-color-success) mt-1">{locale === 'ja' ? '● 営業中 (21:00 閉店)' : locale === 'en' ? '● Open Now (Closes 21:00)' : '● 현재 영업 중 (21:00 마감)'}</div>
                </div>
                <Button variant="primary" onClick={() => setIsSheetOpen(false)} className="w-full py-2.5 font-bold">{locale === 'ja' ? 'ルート検索' : locale === 'en' ? 'Get Directions' : '길찾기 실행'}</Button>
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
          description={locale === 'ja' ? 'W3C DTCG準拠スタイルディクショナリコンパイラが追加されました。' : locale === 'en' ? 'W3C DTCG-compliant style dictionary compiler has been integrated.' : 'W3C DTCG 호환 스타일 딕셔너리 컴파일러가 추가되었습니다.'}
          onClose={() => setShowAlert(false)}
        />
      ) : (
        <Button variant="ghost" size="sm" onClick={() => setShowAlert(true)} className="text-sm text-(--accent-primary) font-semibold underline h-auto">
          {locale === 'ja' ? 'アラートを再表示' : locale === 'en' ? 'Reopen Alert' : '알림 다시 열기'}
        </Button>
      );

    case 'token-select':
      return (
        <div className="w-full max-w-md py-2">
          <TokenSelect
            label={locale === 'ja' ? 'デザイントークン選択' : locale === 'en' ? 'Select Design Token' : '디자인 토큰 바인딩 선택'}
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
            <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">스튜디오 탭 변수 (Underlined vs Pills)</span>
            <Link href="/studio?component=tabs" className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1">
              <span>스튜디오에서 편집</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            <TabsList className="w-full justify-center">
              {(['account', 'password', 'settings'] as const).map((tab) => (
                <TabsTrigger key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} className="flex-1 capitalize">
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
            <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">스튜디오 배지 변수 프리뷰 (Studio Badge Variables)</span>
            <Link href="/studio?component=badge" className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1">
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
            <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">스튜디오 카드 변수 프리뷰 (Studio Card Variables)</span>
            <Link href="/studio?component=card" className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1">
              <span>스튜디오에서 편집</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card variable="elevated" className="p-4 flex flex-col gap-1.5 shadow-sm">
              <Badge variant="primary" className="self-start text-[10px]">variable=&quot;elevated&quot;</Badge>
              <h5 className="font-bold text-sm text-(--text-primary)">엘리베이티드 카드</h5>
              <p className="text-xs text-(--text-secondary)">부드러운 그림자와 라운딩이 적용된 기본 카드</p>
            </Card>
            <Card variable="outlined" className="p-4 flex flex-col gap-1.5 border-2 border-(--border-strong)">
              <Badge variant="neutral" className="self-start text-[10px]">variable=&quot;outlined&quot;</Badge>
              <h5 className="font-bold text-sm text-(--text-primary)">아웃라인 카드</h5>
              <p className="text-xs text-(--text-secondary)">선명한 경계선을 지닌 구조화 카드</p>
            </Card>
            <Card variable="interactive" interactive className="p-4 flex flex-col gap-1.5 hover:border-(--accent-primary) transition cursor-pointer">
              <Badge variant="success" className="self-start text-[10px]">variable=&quot;interactive&quot;</Badge>
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
                <TableCell><Badge variant="success">{locale === 'ja' ? '稼働中' : locale === 'en' ? 'Active' : '정상 가동'}</Badge></TableCell>
                <TableCell className="text-(--text-secondary)">{locale === 'ja' ? '所有者 (Admin)' : locale === 'en' ? 'Owner (Admin)' : '소유자 (Admin)'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">{locale === 'ja' ? '鈴木 華' : locale === 'en' ? 'Emma Lee' : '이지은'}</TableCell>
                <TableCell><Badge variant="primary">{locale === 'ja' ? '承認済' : locale === 'en' ? 'Accepted' : '초대 수락'}</Badge></TableCell>
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
            { id: 'tokens', label: 'tokens', children: [{ id: 'tokens.json', label: 'tokens.json' }] },
            { id: 'index.ts', label: 'index.ts' },
          ],
        },
        { id: 'package.json', label: 'package.json' },
        { id: 'README.md', label: 'README.md' },
      ];

      return (
        <div className="w-full max-w-sm p-4 rounded-xl bg-(--bg-primary) border border-(--border-subtle) shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-(--text-secondary) font-mono pb-2 border-b border-(--border-subtle)">
            <span>EXPLORER</span>
            <span>{locale === 'ja' ? '選択: ' : locale === 'en' ? 'Selected: ' : '선택: '}<strong className="text-(--accent-primary)">{selectedTreeId}</strong></span>
          </div>
          <Tree data={demoTreeData} selectedId={selectedTreeId} onSelect={(node) => setSelectedTreeId(node.id)} defaultExpandedIds={['src', 'components']} />
        </div>
      );
    }

    default:
      return null;
  }
}
