'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { useI18n } from '@/lib/i18n';
import { Container, Stack, Grid, Card, Button } from '@/components/ui';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import {
  Layout,
  Maximize2,
  Columns,
  Rows,
  Layers,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Sliders,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function LayoutGuidePage() {
  const { theme } = useThemeEditor();
  const { t } = useI18n();
  const brandColor = theme?.color?.primary || '#3182f6';

  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeStackGap, setActiveStackGap] = useState<'2' | '4' | '6' | '8'>('4');
  const [activeGridCols, setActiveGridCols] = useState<2 | 3 | 4>(3);
  const [activeContainerSize, setActiveContainerSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const containerSpecs = [
    { name: 'sm', token: '--atom-container-sm', width: '640px', usage: '모바일 폼, 단일 로그인/회원가입 카드, 좁은 다이얼로그' },
    { name: 'md', token: '--atom-container-md', width: '768px', usage: '태블릿 본문, 블로그 포스트, 문서 리딩 뷰 (가독성 최적화)' },
    { name: 'lg', token: '--atom-container-lg', width: '1024px', usage: '표준 웹 애플리케이션, 설정 페이지, 프로필 관리 화면' },
    { name: 'xl', token: '--atom-container-xl', width: '1280px', usage: '기본 데스크톱 대시보드, 4열 카드 그리드, 데이터 테이블' },
    { name: '2xl', token: '--atom-container-2xl', width: '1536px', usage: '와이드 모니터 전용 모니터링 콘솔, 금융 차트 피드' },
  ];

  const spacingScale = [
    { step: '1', token: '--atom-space-1', px: '4px', usage: '인라인 아이콘과 텍스트 간격, 뱃지 패딩' },
    { step: '2', token: '--atom-space-2', px: '8px', usage: '버튼 내부 요소 간격, 콤팩트 리스트 행 간격' },
    { step: '3', token: '--atom-space-3', px: '12px', usage: '인풋 필드 패딩, 작은 카드 내부 패딩' },
    { step: '4', token: '--atom-space-4', px: '16px', usage: '기본 모바일 Gutter, 표준 카드 패딩, 컴포넌트 간 기본 마진' },
    { step: '5', token: '--atom-space-5', px: '20px', usage: '중간 크기 카드 패딩, 모달 내부 섹션 간격' },
    { step: '6', token: '--atom-space-6', px: '24px', usage: '태블릿/데스크톱 기본 Gutter, 헤더/푸터 패딩' },
    { step: '8', token: '--atom-space-8', px: '32px', usage: '문서 섹션 간 마진, 레이아웃 메인 Gap' },
    { step: '12', token: '--atom-space-12', px: '48px', usage: '랜딩 페이지 주요 블록 간 간격' },
    { step: '16', token: '--atom-space-16', px: '64px', usage: '대형 히어로 섹션 상하 여백' },
  ];

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col justify-between transition-colors font-sans">
      <Header brandColor={brandColor} />

      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col gap-10">
        {/* Hero Section */}
        <section className="space-y-3 border-b border-(--border-subtle) pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-(--text-muted)">
            <span className="text-emerald-500 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Foundational Layout Architecture
            </span>
            <span>•</span>
            <span>W3C DTCG Standard</span>
            <span>•</span>
            <span>Zero Runtime CSS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--text-primary)">
            레이아웃 & 간격 시스템 (Layout & Spacing)
          </h1>

          <p className="text-base text-(--text-secondary) leading-relaxed max-w-3xl">
            웹 화면을 개발할 때 임의의 픽셀값(<code className="font-mono text-xs px-1.5 py-0.5 rounded bg-(--bg-secondary)">padding: 13px</code>, <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-(--bg-secondary)">gap: 27px</code>)을 하드코딩하지 마세요.
            AtomDesignToken의 <strong>Container, Stack, Grid</strong>와 <strong>W3C DTCG 간격 토큰</strong>을 활용하여 일관된 리듬감과 견고한 반응형 레이아웃을 구축합니다.
          </p>
        </section>

        {/* 1. Container Architecture & Live Interactive Demo */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-(--text-primary) flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-(--accent-primary)" />
                <span>1. 컨테이너 시스템 (Container)</span>
              </h2>
              <p className="text-sm text-(--text-secondary) mt-1">
                화면 폭에 맞추어 최적의 중앙 정렬 너비와 반응형 안전 여백(Gutter)을 자동으로 제어합니다.
              </p>
            </div>
          </div>

          {/* Interactive Controller */}
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-(--radius) bg-(--bg-secondary)/50 border border-(--border-subtle)">
            <span className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wider mr-2">컨테이너 크기 테스트:</span>
            {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setActiveContainerSize(sz)}
                className={`px-3 py-1.5 rounded-(--radius-sm) text-xs font-mono font-medium transition cursor-pointer ${
                  activeContainerSize === sz
                    ? 'bg-(--text-primary) text-(--bg-primary) font-semibold shadow-xs'
                    : 'bg-(--bg-primary) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle)'
                }`}
              >
                size="{sz}" ({containerSpecs.find(c => c.name === sz)?.width})
              </button>
            ))}
          </div>

          {/* Live Preview Stage */}
          <div className="p-6 rounded-(--radius) border border-(--border-subtle) bg-(--bg-secondary)/20 flex items-center justify-center overflow-hidden min-h-[160px]">
            <Container
              size={activeContainerSize}
              className="p-6 rounded-(--radius) border-2 border-dashed border-(--accent-primary) bg-(--bg-primary) text-center transition-all duration-300"
            >
              <div className="font-mono text-sm font-bold text-(--text-primary)">
                &lt;Container size="{activeContainerSize}" /&gt;
              </div>
              <p className="text-xs text-(--text-secondary) mt-1">
                최대 너비: <strong>{containerSpecs.find(c => c.name === activeContainerSize)?.width}</strong> (좌우 여백: 모바일 16px, 데스크톱 24px 자동 제어)
              </p>
            </Container>
          </div>

          {/* Container Token Table */}
          <div className="overflow-x-auto rounded-(--radius) border border-(--border-subtle)">
            <table className="w-full text-left text-sm">
              <thead className="bg-(--bg-secondary)/60 border-b border-(--border-subtle) text-xs font-semibold text-(--text-secondary)">
                <tr>
                  <th className="p-3">규격 (Size)</th>
                  <th className="p-3">W3C DTCG 토큰</th>
                  <th className="p-3">최대 너비</th>
                  <th className="p-3">실무 권장 용도</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-subtle)">
                {containerSpecs.map((c) => (
                  <tr key={c.name} className="hover:bg-(--bg-secondary)/30 transition-colors">
                    <td className="p-3 font-mono font-bold text-(--text-primary)">size="{c.name}"</td>
                    <td className="p-3 font-mono text-xs text-(--text-secondary)">
                      <button
                        onClick={() => handleCopy(`var(${c.token})`)}
                        className="hover:underline flex items-center gap-1 cursor-pointer"
                        title="클릭하여 복사"
                      >
                        <span>var({c.token})</span>
                        {copiedToken === `var(${c.token})` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-40" />}
                      </button>
                    </td>
                    <td className="p-3 font-mono font-semibold text-(--text-primary)">{c.width}</td>
                    <td className="p-3 text-sm text-(--text-secondary)">{c.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. Spacing Scale System */}
        <section className="space-y-4 pt-4 border-t border-(--border-subtle)">
          <div>
            <h2 className="text-lg font-bold text-(--text-primary) flex items-center gap-2">
              <Layers className="w-5 h-5 text-(--accent-primary)" />
              <span>2. 4배수 간격 스케일 (Spacing Scale)</span>
            </h2>
            <p className="text-sm text-(--text-secondary) mt-1">
              AtomDesignToken은 무작위 수치를 방지하기 위해 4px 그리드 기반 9단계 스페이싱 토큰을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {spacingScale.map((s) => (
              <Card key={s.step} className="p-3.5 flex flex-col justify-between gap-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-(--text-primary)">gap="{s.step}" / space-{s.step}</span>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle)">
                    {s.px}
                  </span>
                </div>
                
                {/* Visual Representation Bar */}
                <div className="w-full bg-(--bg-secondary) h-3 rounded-(--radius-sm) overflow-hidden flex items-center">
                  <div
                    className="bg-(--accent-primary) h-full rounded-(--radius-sm)"
                    style={{ width: `min(100%, ${parseInt(s.px, 10) * 2}px)` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-(--text-secondary) pt-1 border-t border-(--border-subtle)">
                  <span className="truncate pr-2">{s.usage}</span>
                  <button
                    onClick={() => handleCopy(`var(${s.token})`)}
                    className="shrink-0 font-mono text-[11px] text-(--text-muted) hover:text-(--text-primary) cursor-pointer"
                  >
                    {copiedToken === `var(${s.token})` ? '복사됨' : '토큰'}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Stack (Vertical / Horizontal) & Grid */}
        <section className="space-y-4 pt-4 border-t border-(--border-subtle)">
          <div>
            <h2 className="text-lg font-bold text-(--text-primary) flex items-center gap-2">
              <Rows className="w-5 h-5 text-(--accent-primary)" />
              <span>3. 스택(Stack)과 그리드(Grid) 컴포넌트</span>
            </h2>
            <p className="text-sm text-(--text-secondary) mt-1">
              flex/grid 속성을 수작업으로 적지 않고, 토큰 기반의 <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-(--bg-secondary)">&lt;Stack&gt;</code>과 <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-(--bg-secondary)">&lt;Grid&gt;</code>로 손쉽게 배치합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stack Live Demo */}
            <div className="p-5 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-(--text-primary) flex items-center gap-1.5">
                  <Rows className="w-4 h-4 text-(--accent-primary)" />
                  Stack (수직 스택 배치)
                </span>
                <div className="flex items-center gap-1">
                  {(['2', '4', '6', '8'] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setActiveStackGap(g)}
                      className={`px-2 py-0.5 text-xs font-mono rounded cursor-pointer ${
                        activeStackGap === g ? 'bg-(--text-primary) text-(--bg-primary) font-bold' : 'bg-(--bg-secondary) text-(--text-secondary)'
                      }`}
                    >
                      gap="{g}"
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) min-h-[160px]">
                <Stack gap={activeStackGap}>
                  <div className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) text-sm font-medium">
                    스택 아이템 1 (Stack Item A)
                  </div>
                  <div className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) text-sm font-medium">
                    스택 아이템 2 (Stack Item B)
                  </div>
                  <div className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) text-sm font-medium">
                    스택 아이템 3 (Stack Item C)
                  </div>
                </Stack>
              </div>

              <div className="text-xs text-(--text-secondary) font-mono bg-(--bg-secondary)/30 p-2.5 rounded-(--radius-sm)">
                &lt;Stack gap="{activeStackGap}"&gt;...&lt;/Stack&gt;
              </div>
            </div>

            {/* Grid Live Demo */}
            <div className="p-5 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-(--text-primary) flex items-center gap-1.5">
                  <Columns className="w-4 h-4 text-(--accent-primary)" />
                  Grid (반응형 다열 그리드)
                </span>
                <div className="flex items-center gap-1">
                  {([2, 3, 4] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveGridCols(c)}
                      className={`px-2 py-0.5 text-xs font-mono rounded cursor-pointer ${
                        activeGridCols === c ? 'bg-(--text-primary) text-(--bg-primary) font-bold' : 'bg-(--bg-secondary) text-(--text-secondary)'
                      }`}
                    >
                      cols={c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) min-h-[160px]">
                <Grid cols={activeGridCols} gap="3">
                  {Array.from({ length: activeGridCols }).map((_, i) => (
                    <div key={i} className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) text-center text-sm font-medium">
                      Col {i + 1}
                    </div>
                  ))}
                </Grid>
              </div>

              <div className="text-xs text-(--text-secondary) font-mono bg-(--bg-secondary)/30 p-2.5 rounded-(--radius-sm)">
                &lt;Grid cols={activeGridCols} gap="3"&gt;...&lt;/Grid&gt;
              </div>
            </div>
          </div>
        </section>

        {/* 4. Best Practices (Do's & Don'ts) */}
        <section className="space-y-4 pt-4 border-t border-(--border-subtle)">
          <h2 className="text-lg font-bold text-(--text-primary)">
            레이아웃 설계 수칙 & 안티패턴 방지 (Do's & Don'ts)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 border-emerald-500/20 bg-emerald-500/5 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>DO (권장 지침)</span>
              </div>
              <ul className="text-sm text-(--text-primary) space-y-1.5 list-disc list-inside leading-relaxed">
                <li>모든 여백은 반드시 <code className="font-mono text-xs">var(--atom-space-*)</code> 또는 <code className="font-mono text-xs">gap="4"</code> 토큰 단위를 준수합니다.</li>
                <li>한 페이지의 최상위 컨텐츠는 항상 <code className="font-mono text-xs">&lt;Container&gt;</code>로 감싸 좌우 안전 여백을 확보합니다.</li>
                <li>반응형 카드 목록은 CSS 미디어 쿼리를 일일이 쓰지 않고 <code className="font-mono text-xs">&lt;Grid cols={3}&gt;</code>를 조립합니다.</li>
              </ul>
            </Card>

            <Card className="p-4 border-rose-500/20 bg-rose-500/5 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                <XCircle className="w-4 h-4" />
                <span>DON'T (지양 안티패턴)</span>
              </div>
              <ul className="text-sm text-(--text-primary) space-y-1.5 list-disc list-inside leading-relaxed">
                <li><code className="font-mono text-xs">p-[13px]</code>, <code className="font-mono text-xs">margin-top: 27px</code> 같은 임의의 매직 넘버를 인라인 작성하지 않습니다.</li>
                <li>컨테이너 너비를 강제로 <code className="font-mono text-xs">width: 1200px</code>로 픽스하여 모바일에서 가로 스크롤을 유발하지 마세요.</li>
                <li>스택 내부의 형제 요소마다 서로 다른 margin을 주어 수직 리듬을 파괴하지 마세요.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Navigation to Components */}
        <section className="pt-6 border-t border-(--border-subtle) flex items-center justify-between">
          <Link
            href="/tokens"
            className="text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors flex items-center gap-1"
          >
            ← 디자인 토큰 명세 보기
          </Link>
          <Link
            href="/components/button"
            className="text-sm font-bold text-(--text-primary) hover:underline flex items-center gap-1"
          >
            기초 컴포넌트 라이브러리 보기 →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-(--border-subtle) py-6 px-6 text-center text-xs text-(--text-muted) bg-(--bg-secondary)/30 mt-12">
        <p>© 2026 AtomDesignToken · W3C Design Tokens Community Group Standard</p>
      </footer>
    </div>
  );
}
