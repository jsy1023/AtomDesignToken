'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Terminal, Copy, Check, Sliders, RefreshCw, Palette, ExternalLink, Sparkles, FileCode, Layers } from 'lucide-react';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { Button } from '@/components/ui/Button';

export function GuideLocalStudioSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const cliWorkflowCode = `# 1. 패키지 설치 및 로컬 환경 초기화 (SSOT 레지스트리 · 토큰 · AI 규격 파일 생성)
npx atomsystem init

# 2. AI 컴포넌트 표준 JSON 스키마 확인 및 제출 (스캐폴딩 + 스튜디오/CSS 자동 반영)
npx atomsystem schema
npx atomsystem submit rating-chip.atom.json

# 3. 로컬 웹 SSOT 스튜디오(GUI) 실행 (독립 서버 모드)
npx atomsystem studio
# 브라우저에서 http://localhost:4000 접속

# 4. components/ui/*.tsx 자동 스캔 동기화 & CSS 재컴파일
npx atomsystem sync`;

  return (
    <section className="py-12 border-b border-[var(--border-subtle)] bg-(--bg-secondary)/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
              <Sliders className="w-3.5 h-3.5 text-(--accent-primary)" />
              <span>Local Development Workflow</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--text-primary)">
              로컬 토큰 스튜디오(GUI) 및 스타일 커스터마이징 가이드
            </h2>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
              `atomsystem`을 설치하면 별도의 설정 없이 로컬에서 웹 기반 토큰 에디터를 바로 띄워 브랜딩 색상, 여백, 곡률을 변경하고 즉시 `css/atom-ui.css`로 자동 재컴파일할 수 있습니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/studio"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-(--radius-sm) bg-(--accent-primary) text-(--bg-primary) font-semibold text-xs shadow-xs hover:opacity-90 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>로컬 스튜디오 가이드</span>
            </Link>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) font-mono text-xs">
              <Terminal className="w-3.5 h-3.5 text-(--accent-primary)" />
              <span>npx atomsystem studio</span>
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                onClick={() => copyText('npx atomsystem studio', 'cli-studio')}
                className="ml-1 p-0.5 h-6 w-6"
                title="복사"
              >
                {copiedId === 'cli-studio' ? <Check className="w-3 h-3 text-(--atom-color-success)" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
          </div>
        </div>

        {/* 3-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) space-y-3">
            <div className="w-8 h-8 rounded-(--radius-sm) bg-(--accent-primary)/10 text-(--accent-primary) flex items-center justify-center font-bold text-xs">
              01
            </div>
            <div className="font-semibold text-sm text-(--text-primary)">
              로컬 스튜디오 실행
            </div>
            <p className="text-xs text-(--text-secondary) leading-relaxed">
              터미널에서 <code className="px-1.5 py-0.5 rounded bg-(--bg-secondary) border border-(--border-subtle) font-mono text-[11px]">npx atomsystem studio</code> 명령어를 입력하면 로컬 웹 GUI(<code className="font-mono text-[11px]">http://localhost:4000</code>)가 즉시 실행됩니다.
            </p>
          </div>

          <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) space-y-3">
            <div className="w-8 h-8 rounded-(--radius-sm) bg-(--accent-primary)/10 text-(--accent-primary) flex items-center justify-center font-bold text-xs">
              02
            </div>
            <div className="font-semibold text-sm text-(--text-primary)">
              GUI에서 시각적 토큰 편집
            </div>
            <p className="text-xs text-(--text-secondary) leading-relaxed">
              브랜드 색상, 서피스 배경, 버튼/카드 모서리 곡률(Radius)을 컬러피커와 셀렉트박스로 조작하며 실시간 프리뷰를 확인합니다.
            </p>
          </div>

          <div className="p-5 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) space-y-3">
            <div className="w-8 h-8 rounded-(--radius-sm) bg-(--accent-primary)/10 text-(--accent-primary) flex items-center justify-center font-bold text-xs">
              03
            </div>
            <div className="font-semibold text-sm text-(--text-primary)">
              원클릭 저장 & 0ms 자동 컴파일
            </div>
            <p className="text-xs text-(--text-secondary) leading-relaxed">
              [저장] 버튼을 누르면 <code className="font-mono text-[11px]">tokens/token.json</code>에 저장되는 동시에 <code className="font-mono text-[11px]">css/atom-ui.css</code>가 제로 런타임 순수 CSS 변수로 자동 재컴파일됩니다.
            </p>
          </div>
        </div>

        {/* Figma Plugin Sync Guide */}
        <div
          id="figma-plugin"
          className="p-5 sm:p-6 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) space-y-4 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-(--border-subtle) pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-(--accent-primary)" />
              <h3 className="text-sm sm:text-base font-bold text-(--text-primary)">
                Figma 플러그인 연동 가이드 (AtomSystem Manager)
              </h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) border border-(--accent-primary)/20 w-fit">
              localhost:3000 / 4000 자동 연동
            </span>
          </div>

          <p className="text-xs text-(--text-secondary) leading-relaxed">
            로컬 스튜디오가 실행 중인 상태에서 Figma의 <strong className="text-(--text-primary)">AtomSystem Manager</strong> 플러그인을 열면, 로컬에서 커스터마이징한 토큰·테마·컴포넌트를 피그마 캔버스로 즉시 불러와 동기화할 수 있습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-(--radius-sm) bg-(--bg-secondary)/60 border border-(--border-subtle) space-y-1.5">
              <div className="text-xs font-bold text-(--text-primary)">1. 로컬 스튜디오 실행 & 편집</div>
              <p className="text-[11px] text-(--text-secondary) leading-relaxed">
                터미널에서 <code className="font-mono">npx atomsystem studio</code>(또는 <code className="font-mono">npm run dev</code>)를 실행한 뒤, 스튜디오에서 브랜드 색상·토큰·컴포넌트를 편집합니다.
              </p>
            </div>
            <div className="p-3.5 rounded-(--radius-sm) bg-(--bg-secondary)/60 border border-(--border-subtle) space-y-1.5">
              <div className="text-xs font-bold text-(--text-primary)">2. Figma 플러그인 실행 (Pull)</div>
              <p className="text-[11px] text-(--text-secondary) leading-relaxed">
                Figma에서 플러그인을 실행하면 로컬 스튜디오(<code className="font-mono">3000</code>/<code className="font-mono">4000</code> 포트)에 자동 연결되어 최신 레지스트리를 불러옵니다.
              </p>
            </div>
            <div className="p-3.5 rounded-(--radius-sm) bg-(--bg-secondary)/60 border border-(--border-subtle) space-y-1.5">
              <div className="text-xs font-bold text-(--text-primary)">3. 실시간 반영 & 프로젝트 저장 (Push)</div>
              <p className="text-[11px] text-(--text-secondary) leading-relaxed">
                플러그인에서 토큰 값이나 컴포넌트 바인딩을 수정하면 피그마 캔버스에 즉시 반영되며, 상단 <strong>⬆ Push</strong> 버튼으로 로컬 <code className="font-mono">tokens.json</code>에 다시 저장할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="rounded-(--radius) border border-(--border-subtle) overflow-hidden bg-(--bg-primary)">
          <div className="px-4 py-2.5 bg-(--bg-secondary)/60 border-b border-(--border-subtle) flex items-center justify-between text-xs font-mono text-(--text-secondary)">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-(--accent-primary)" />
              <span>터미널 워크플로우 (Terminal Commands)</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyText(cliWorkflowCode, 'workflow-code')}
              className="inline-flex items-center gap-1 h-auto p-0 text-xs"
            >
              {copiedId === 'workflow-code' ? <Check className="w-3.5 h-3.5 text-(--atom-color-success)" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'workflow-code' ? '복사됨' : '복사'}</span>
            </Button>
          </div>
          <CodeHighlight code={cliWorkflowCode} language="bash" className="p-4 text-xs font-mono" />
        </div>
      </div>
    </section>
  );
}
