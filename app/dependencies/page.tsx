'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import {
  DEPENDENCY_ITEMS,
  COMPATIBILITY_MATRIX,
} from '@/lib/data/dependencies';
import {
  CheckCircle2,
  ExternalLink,
  Code2,
  Workflow,
  Cpu,
} from 'lucide-react';

export default function DependenciesPage() {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: '전체 의존성' },
    { id: 'runtime', label: '런타임 (Runtime: 0KB)' },
    { id: 'build', label: '빌드 도구 (Build)' },
    { id: 'type', label: '타입 안정성 (Types)' },
    { id: 'dev', label: '테스팅 및 품질 (QA)' },
  ];

  const filteredItems = selectedFilter === 'all'
    ? DEPENDENCY_ITEMS
    : DEPENDENCY_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col justify-between transition-colors">
      <Header brandColor={brandColor} />

      <main className="max-w-5xl w-full mx-auto px-6 py-12 flex-1 flex flex-col gap-10">
        {/* Hero Section */}
        <section className="space-y-4 border-b border-(--border-subtle) pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-emerald-500 font-semibold flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              Zero Runtime Dependency
            </span>
            <span>•</span>
            <span>Pure CSS Custom Properties</span>
            <span>•</span>
            <span>0 KB Client Bundle</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--text-primary)">
            의존성 및 아키텍처 매트릭스 (Dependencies)
          </h1>

          <p className="text-sm text-(--text-secondary) leading-relaxed max-w-3xl">
            AtomDesignToken은 사용자 브라우저에 불필요한 자바스크립트 런타임 라이브러리를 단 1바이트도 강제하지 않습니다. 토큰 파싱과 컴파일은 빌드 타임에 완료되며, 실행 시점에는 브라우저 네이티브 CSS 변수만을 사용합니다.
          </p>
        </section>

        {/* 1. Architecture Flow Pipeline */}
        <section className="space-y-4">
          <div className="border-b border-(--border-subtle) pb-2">
            <h2 className="text-lg font-bold text-(--text-primary) flex items-center gap-2">
              <Workflow className="w-4 h-4 text-blue-500" />
              제로 런타임 토큰 컴파일 파이프라인
            </h2>
            <p className="text-xs text-(--text-secondary)">
              디자인 결정이 컴포넌트에 주입되기까지의 단방향 데이터 흐름(Data Flow)입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-4 bg-(--bg-secondary) border border-(--border-subtle) rounded-lg space-y-1.5">
              <div className="text-[10px] text-blue-500 uppercase font-bold">Step 1 · SSOT</div>
              <div className="font-bold text-sm text-(--text-primary)">Figma &amp; DTCG .md</div>
              <p className="text-[11px] text-(--text-secondary) font-sans">
                마크다운 또는 tokens.json에 표준 W3C 포맷으로 디자인 결정 선언.
              </p>
            </div>

            <div className="p-4 bg-(--bg-secondary) border border-(--border-subtle) rounded-lg space-y-1.5">
              <div className="text-[10px] text-purple-500 uppercase font-bold">Step 2 · Build</div>
              <div className="font-bold text-sm text-(--text-primary)">Atom Compiler</div>
              <p className="text-[11px] text-(--text-secondary) font-sans">
                Style Dictionary &amp; Tailwind v4 엔진으로 변수 매핑 및 타입 생성.
              </p>
            </div>

            <div className="p-4 bg-(--bg-secondary) border border-(--border-subtle) rounded-lg space-y-1.5">
              <div className="text-[10px] text-emerald-500 uppercase font-bold">Step 3 · Artifact</div>
              <div className="font-bold text-sm text-(--text-primary)">Pure CSS Tokens</div>
              <p className="text-[11px] text-(--text-secondary) font-sans">
                브라우저 네이티브 var(--atom-*) 및 정적 CSS 파일로 출력.
              </p>
            </div>

            <div className="p-4 bg-(--bg-secondary) border border-(--border-subtle) rounded-lg space-y-1.5">
              <div className="text-[10px] text-amber-500 uppercase font-bold">Step 4 · Runtime</div>
              <div className="font-bold text-sm text-(--text-primary)">0 KB Runtime</div>
              <p className="text-[11px] text-(--text-secondary) font-sans">
                React, Vue, Vanilla HTML 어디서나 0ms 지연으로 테마 즉시 적용.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Dependencies Table */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-(--border-subtle) pb-3">
            <div>
              <h2 className="text-lg font-bold text-(--text-primary)">
                시스템 패키지 및 도구 의존성
              </h2>
              <p className="text-xs text-(--text-secondary)">
                프로젝트를 구성하는 각 기술 스택의 채택 이유와 번들 영향도입니다.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                    selectedFilter === tab.id
                      ? 'bg-(--bg-secondary) text-(--text-primary) font-bold'
                      : 'text-(--text-muted) hover:text-(--text-primary)'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                  <th className="py-2.5 px-3 font-medium">기술 / 패키지명</th>
                  <th className="py-2.5 px-3 font-medium">구분</th>
                  <th className="py-2.5 px-3 font-medium">채택 이유 및 역할</th>
                  <th className="py-2.5 px-3 font-medium">클라이언트 번들 영향</th>
                  <th className="py-2.5 px-3 font-medium text-right">공식 문서</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-subtle)">
                {filteredItems.map((item) => (
                  <tr key={item.name} className="hover:bg-(--bg-secondary)/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-(--text-primary)">{item.name}</div>
                      <span className="text-[10px] font-mono text-(--text-muted)">{item.version}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border ${
                        item.category === 'runtime'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold'
                          : 'bg-(--bg-secondary) text-(--text-muted) border-(--border-subtle)'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-(--text-secondary) max-w-sm">
                      <div className="font-medium text-(--text-primary)">{item.purpose}</div>
                      <div className="text-[11px] text-(--text-muted) mt-0.5">{item.whyChosen}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] font-medium text-(--text-primary)">
                      {item.bundleImpact}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <a
                        href={item.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-(--text-muted) hover:text-(--text-primary) transition-colors"
                      >
                        <span>Docs</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Cross-Framework Compatibility Matrix */}
        <section className="space-y-3">
          <div className="border-b border-(--border-subtle) pb-2">
            <h2 className="text-lg font-bold text-(--text-primary) flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-500" />
              프레임워크 간 크로스 플랫폼 호환성 매트릭스
            </h2>
            <p className="text-xs text-(--text-secondary)">
              모든 환경에서 추가 런타임 종속성 없이 동일한 토큰 스타일시트를 공유합니다.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-(--border-subtle) text-(--text-muted) font-mono text-[11px]">
                  <th className="py-2.5 px-3 font-medium">대상 프레임워크</th>
                  <th className="py-2.5 px-3 font-medium">지원 버전</th>
                  <th className="py-2.5 px-3 font-medium">연동 방식</th>
                  <th className="py-2.5 px-3 font-medium">런타임 비용</th>
                  <th className="py-2.5 px-3 font-medium text-right">호환성 상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-subtle)">
                {COMPATIBILITY_MATRIX.map((c) => (
                  <tr key={c.framework} className="hover:bg-(--bg-secondary)/60 transition-colors">
                    <td className="py-3 px-3 font-semibold text-(--text-primary)">
                      {c.framework}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-(--text-muted)">
                      {c.supportedVersions}
                    </td>
                    <td className="py-3 px-3 text-(--text-secondary) font-mono text-[11px]">
                      {c.integrationMethod}
                    </td>
                    <td className="py-3 px-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {c.overhead}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{c.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-(--border-subtle) py-6 text-xs text-neutral-400">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AtomDesignToken — Zero-Runtime Dependencies Matrix</span>
          <div className="flex items-center gap-4 text-neutral-500">
            <Link href="/" className="hover:text-(--text-primary)">홈으로</Link>
            <Link href="/principles" className="hover:text-(--text-primary)">원칙</Link>
            <Link href="/tokens" className="hover:text-(--text-primary)">토큰</Link>
            <Link href="/motion" className="hover:text-(--text-primary)">모션</Link>
            <a
              href="https://www.designtokens.org/tr/2025.10/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--text-primary) inline-flex items-center gap-1 transition-colors"
            >
              <span>W3C DTCG</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
