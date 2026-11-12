'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, Sliders, RefreshCw, Palette, ExternalLink, Sparkles, FileCode } from 'lucide-react';
import { CodeHighlight } from '@/components/common/CodeHighlight';

export function GuideLocalStudioSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const cliWorkflowCode = `# 1. 패키지 설치 및 로컬 환경 초기화 (토큰 & 규격 파일 생성)
npx atomsystem init

# 2. 로컬 웹 토큰 스튜디오(GUI) 실행
npx atomsystem studio
# 👉 브라우저에서 http://localhost:4000 접속

# 3. CLI를 통해 수동으로 CSS 재컴파일할 경우
npx atomsystem build:tokens`;

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
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) font-mono text-xs">
              <Terminal className="w-3.5 h-3.5 text-(--accent-primary)" />
              <span>npx atomsystem studio</span>
              <button
                onClick={() => copyText('npx atomsystem studio', 'cli-studio')}
                className="ml-1 p-0.5 hover:text-(--text-primary) text-(--text-secondary) transition"
                title="복사"
              >
                {copiedId === 'cli-studio' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </button>
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

        {/* Code Snippet Box */}
        <div className="rounded-(--radius) border border-(--border-subtle) overflow-hidden bg-(--bg-primary)">
          <div className="px-4 py-2.5 bg-(--bg-secondary)/60 border-b border-(--border-subtle) flex items-center justify-between text-xs font-mono text-(--text-secondary)">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-(--accent-primary)" />
              <span>터미널 워크플로우 (Terminal Commands)</span>
            </div>
            <button
              onClick={() => copyText(cliWorkflowCode, 'workflow-code')}
              className="inline-flex items-center gap-1 hover:text-(--text-primary) transition cursor-pointer"
            >
              {copiedId === 'workflow-code' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'workflow-code' ? '복사됨' : '복사'}</span>
            </button>
          </div>
          <CodeHighlight code={cliWorkflowCode} language="bash" className="p-4 text-xs font-mono" />
        </div>
      </div>
    </section>
  );
}
