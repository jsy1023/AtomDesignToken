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
  Bell
} from 'lucide-react';

interface ComponentDetailPageContentProps {
  component: GalleryComponent;
}

export function ComponentDetailPageContent({ component }: ComponentDetailPageContentProps) {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';
  const radius = theme?.borderRadius || '16px';

  const [activeSnippetTab, setActiveSnippetTab] = useState<'react' | 'vue' | 'html'>('react');
  const [copied, setCopied] = useState(false);

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
      case 'button':
        return (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
            <Button loading>로딩 중...</Button>
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
              <span className="text-xs font-medium text-(--text-primary)">
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
              <span className="text-xs font-medium text-(--text-primary)">
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
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
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
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    받는 분: 김토스 (토스뱅크 1002-***-4921)<br />
                    보낼 금액: <strong>₩500,000</strong> (수수료 면제)
                  </p>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
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
              className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs shadow-md transition"
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
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-850 text-xs">
                    <div className="font-bold">블루보틀 성수 카페</div>
                    <div className="text-emerald-600 mt-1">● 현재 영업 중 (21:00 마감)</div>
                  </div>
                  <button
                    onClick={() => setIsSheetOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
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
          <div className="w-full max-w-md p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-100 flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold block">새로운 버전 v1.2 업데이트</span>
                <span className="text-[11px] text-blue-700 dark:text-blue-300">
                  W3C DTCG 호환 스타일 딕셔너리 컴파일러가 추가되었습니다.
                </span>
              </div>
            </div>
            <button onClick={() => setShowAlert(false)} className="text-blue-400 hover:text-blue-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button onClick={() => setShowAlert(true)} className="text-xs text-blue-600 font-semibold underline">
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
            <Badge variant="primary" className="self-start text-[10px]">토큰 바인딩 서피스</Badge>
            <h4 className="text-base font-bold text-(--text-primary)">토스뱅크 자유적금</h4>
            <div className="text-xl font-bold text-(--text-primary)">₩ 12,450,000</div>
            <p className="text-xs text-(--text-secondary)">연 4.5% 최고 금리 적용 중</p>
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
              <span className="text-xs font-mono text-(--text-secondary)">Container size="sm" (640px)</span>
            </Container>
            <Container size="md" className="p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-secondary)/50 text-center">
              <span className="text-xs font-mono text-(--text-secondary)">Container size="md" (768px)</span>
            </Container>
            <Container size="lg" className="p-4 rounded-(--radius) border border-(--border-strong) bg-(--bg-secondary)/50 text-center">
              <span className="text-xs font-mono font-semibold text-(--text-primary)">Container size="lg" (1024px)</span>
            </Container>
          </div>
        );

      case 'layout':
        return (
          <div className="w-full p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) space-y-4">
            <div className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wider mb-2">
              Stack & Grid 토큰 연동 프리뷰
            </div>
            <Stack gap="3">
              <div className="p-2.5 rounded-(--radius-sm) bg-(--bg-secondary) text-xs font-mono">
                Stack gap="3" (12px) 아이템 1
              </div>
              <div className="p-2.5 rounded-(--radius-sm) bg-(--bg-secondary) text-xs font-mono">
                Stack gap="3" (12px) 아이템 2
              </div>
            </Stack>
            <Grid cols={3} gap="2" className="mt-3">
              <div className="p-3 text-center rounded-(--radius-sm) border border-(--border-subtle) text-xs font-mono">
                Col 1
              </div>
              <div className="p-3 text-center rounded-(--radius-sm) border border-(--border-subtle) text-xs font-mono">
                Col 2
              </div>
              <div className="p-3 text-center rounded-(--radius-sm) border border-(--border-subtle) text-xs font-mono">
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
          <Link
            href="/components"
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>전체 컴포넌트 갤러리로 돌아가기</span>
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
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
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
                {component.name}
              </h1>
              <p className="text-sm sm:text-base text-(--text-secondary) mt-1.5 max-w-2xl leading-relaxed">
                {component.description}
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleCopyCode}
              className="text-xs flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '복사 완료!' : '컴포넌트 코드 복사'}</span>
            </Button>
          </div>
        </div>

        {/* 1. Interactive Live Preview */}
        <section id="preview" className="scroll-mt-28 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--text-primary)">
            인터랙티브 라이브 프리뷰 (Interactive Preview)
          </h2>
          <div className="w-full min-h-[220px] p-6 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle) flex items-center justify-center">
            {renderPreview()}
          </div>
        </section>

        {/* 2. Code Copy Section (React / Vue / HTML) */}
        <section id="code" className="scroll-mt-28 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-(--text-primary) flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-(--accent-primary)" />
              <span>컴포넌트 코드 스니펫 (Code Copy)</span>
            </h2>
            <span className="text-xs text-(--text-secondary) font-mono">Framework Agnostic</span>
          </div>

          <div className="rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) overflow-hidden text-(--text-primary)">
            <div className="flex items-center justify-between px-4 py-2 border-b border-(--border-subtle) bg-(--bg-secondary)/40 text-xs font-semibold">
              <div className="flex items-center gap-1">
                {(['react', 'vue', 'html'] as const).map((tab) => (
                  <Button
                    key={tab}
                    variant={activeSnippetTab === tab ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveSnippetTab(tab)}
                    className="text-xs px-2.5 py-1 h-auto"
                  >
                    {tab === 'react' ? 'React / Next.js' : tab === 'vue' ? 'Vue 3' : 'Vanilla HTML'}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCode}
                className="text-xs flex items-center gap-1.5 h-auto py-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사됨!' : '전체 코드 복사'}</span>
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
          <h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-(--accent-primary)" />
            <span>실무 주요 사용 케이스 (Use Cases)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {component.useCases.map((useCase, idx) => (
              <Card
                key={idx}
                className="p-4 flex items-start gap-3 shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-(--bg-secondary) text-(--text-primary) font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-(--border-subtle)">
                  {idx + 1}
                </div>
                <p className="text-xs text-(--text-secondary) leading-relaxed">
                  {useCase}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. Usage Patterns & Best Practices */}
        <section id="patterns" className="scroll-mt-28 flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-(--accent-primary)" />
            <span>권장 사용 패턴 및 설계 지침 (Usage Patterns)</span>
          </h2>
          <Card className="p-4 flex flex-col gap-2">
            {component.usagePatterns.map((pattern, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-(--text-secondary)">
                <span className="w-1.5 h-1.5 rounded-full bg-(--accent-primary) mt-1.5 shrink-0" />
                <p className="leading-relaxed">{pattern}</p>
              </div>
            ))}
          </Card>
        </section>

        {/* 5. Do's & Don'ts */}
        {component.dosAndDonts && component.dosAndDonts.length > 0 && (
          <section id="dos-donts" className="scroll-mt-28 flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
              올바른 사용법 & 안티패턴 방지 (Do's & Don'ts)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {component.dosAndDonts.map((rule, idx) => (
                <React.Fragment key={idx}>
                  <Card className="p-4 border-emerald-500/20 bg-emerald-500/5 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>DO (권장)</span>
                    </div>
                    <p className="text-xs text-(--text-primary) leading-relaxed">
                      {rule.do}
                    </p>
                  </Card>

                  <Card className="p-4 border-rose-500/20 bg-rose-500/5 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>DON'T (지양)</span>
                    </div>
                    <p className="text-xs text-(--text-primary) leading-relaxed">
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
            <h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
              API Props 규격 명세 (API Reference)
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Property</TableHead>
                  <TableHead className="w-1/3">Type</TableHead>
                  <TableHead className="w-1/6">Default</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {component.propsSpec.map((prop, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-mono font-semibold text-(--text-primary)">{prop.name}</TableCell>
                    <TableCell className="font-mono text-xs text-(--text-secondary)">{prop.type}</TableCell>
                    <TableCell className="font-mono text-(--text-muted)">{prop.defaultValue}</TableCell>
                    <TableCell className="text-(--text-secondary)">{prop.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        )}

        {/* 7. Related UX Patterns */}
        {relatedPatterns.length > 0 && (
          <section id="related" className="scroll-mt-28 flex flex-col gap-3 pt-4 border-t border-(--border-subtle)">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-(--accent-primary)" />
              <span>이 컴포넌트가 사용되는 실무 UX 패턴</span>
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
                    <h3 className="text-sm font-semibold text-(--text-primary) group-hover:text-(--accent-primary) transition-colors mt-0.5">
                      {pattern.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-(--accent-primary)">
                    <span>패턴 상세 보기</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        </div>

        {/* 3. Right Column: Quick On-Page Section TOC */}
        <aside className="w-52 shrink-0 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pl-4 border-l border-(--border-subtle) select-none hidden xl:flex flex-col gap-3 text-xs">
          <span className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
            이 페이지 목차
          </span>
          <ul className="flex flex-col gap-1 text-xs">
            <li>
              <a href="#preview" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                라이브 프리뷰
              </a>
            </li>
            <li>
              <a href="#code" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                코드 스니펫
              </a>
            </li>
            <li>
              <a href="#use-cases" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                실무 사용 케이스
              </a>
            </li>
            <li>
              <a href="#patterns" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                권장 사용 패턴
              </a>
            </li>
            {component.dosAndDonts && component.dosAndDonts.length > 0 && (
              <li>
                <a href="#dos-donts" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                  Do's & Don'ts
                </a>
              </li>
            )}
            {component.propsSpec && component.propsSpec.length > 0 && (
              <li>
                <a href="#props" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                  API Props 명세
                </a>
              </li>
            )}
            {relatedPatterns.length > 0 && (
              <li>
                <a href="#related" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">
                  관련 UX 패턴
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
