'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { useI18n } from '@/lib/i18n';
import { PRINCIPLES_DATA } from '@/lib/data/principles';
import {
  ShieldCheck,
  Check,
  X,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export default function PrinciplesPage() {
  const { theme } = useThemeEditor();
  const { t, dictionary, locale } = useI18n();
  const brandColor = theme?.color?.primary || '#3182f6';
  const radius = theme?.borderRadius || '8px';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('principles.categoryAll', '전체 원칙') },
    { id: 'agent', label: t('principles.categoryAgent', '🤖 AI 운영 원칙') },
    { id: 'core', label: t('principles.categoryCore', '핵심 원칙') },
    { id: 'architecture', label: t('principles.categoryArchitecture', '아키텍처') },
    { id: 'token', label: t('principles.categoryToken', '토큰 규격') },
    { id: 'accessibility', label: t('principles.categoryAccessibility', '접근성') },
  ];

  const filteredPrinciples = selectedCategory === 'all'
    ? PRINCIPLES_DATA
    : PRINCIPLES_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col justify-between transition-colors">
      <Header brandColor={brandColor} />

      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 flex flex-col gap-6 sm:gap-8">
        {/* Hero Section */}
        <section className="space-y-2.5 border-b border-(--border-subtle) pb-4 sm:pb-5">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-neutral-400">
            <span className="text-emerald-500 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Core Philosophy
            </span>
            <span>•</span>
            <span>W3C DTCG Aligned</span>
            <span>•</span>
            <span>Zero Runtime</span>
          </div>

          <h1 className="docs-h1">
            {t('principles.title', '디자인 시스템 설계 원칙 (Principles)')}
          </h1>

          <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed max-w-3xl">
            {t('principles.subtitle', 'AtomDesignToken은 임시방편적인 절차적 하드코딩을 배제하고, 플랫폼에 독립적인 단일 진실 공급원(SSOT)과 브라우저 네이티브 기술, 그리고 4단계 AI 레고 조립 파이프라인을 결합하여 고품질 엔터프라이즈 UI를 구축하기 위한 핵심 규격을 따릅니다.')}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-(--radius-sm) text-sm font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-(--text-primary) text-(--bg-primary) font-semibold'
                    : 'bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle)'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Principles Flat Specification List */}
        <section className="divide-y divide-(--border-subtle)">
          {filteredPrinciples.map((item) => {
            // Get translated item if available in current dictionary
            const localizedItem = dictionary?.principles?.items?.[item.id];
            const title = localizedItem?.title || item.title;
            const subtitle = localizedItem?.subtitle || item.subtitle;
            const description = localizedItem?.description || item.description;
            const dos = localizedItem?.dos || item.dos;
            const donts = localizedItem?.donts || item.donts;

            return (
              <article key={item.id} className="py-8 space-y-4">
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-(--text-muted)">
                    <span className="font-bold text-(--text-primary)">{item.number}</span>
                    <span>/</span>
                    <span className="uppercase">{item.category}</span>
                    {item.w3cRef && (
                      <>
                        <span>•</span>
                        <span className="text-blue-500 font-sans">{item.w3cRef}</span>
                      </>
                    )}
                  </div>

                  <h2 className="docs-h2">
                    {title}
                  </h2>
                  <p className="text-sm font-medium text-(--text-secondary)">
                    {subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-(--text-primary) leading-relaxed">
                  {description}
                </p>

                {/* AI Command & Prompt Card for Principle 08 & 09 */}
                {item.id === 'ai-governance-pipeline' && (
                  <div className="p-4 rounded-xl bg-(--bg-secondary)/50 border border-(--border-subtle) space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono font-bold text-(--text-primary) flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        {locale === 'ja'
                          ? 'AI Agent 呼び出し & 指示プロンプト (Prompts)'
                          : locale === 'en'
                          ? 'AI Agent Invocation & Directive Prompts'
                          : 'AI Agent 호출 및 지시 커맨드 (Prompts)'}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-(--bg-primary) border border-(--border-subtle) text-(--text-secondary)">
                        Component-First Rule
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-(--bg-primary) border border-(--border-subtle) font-mono text-sm text-(--text-primary) leading-relaxed">
                      <code>
                        {locale === 'ja'
                          ? '"あなたはAtomSystem基盤のUIエンジニアです。AGENTS.mdの4段階レゴ組み立てパイプラインに従い、[コンポーネント優先原則]で新しいコンポーネントをcomponents/uiに先に作成し、トークン(var(--atom-*))をバインドして組み立ててください。"'
                          : locale === 'en'
                          ? '"You are an AtomSystem-based UI engineer. Follow the 4-tier assembly pipeline in AGENTS.md with the [Component-First] rule: define atomic components in components/ui first, bind tokens (var(--atom-*)), and assemble into higher-order blocks."'
                          : '"너는 AtomSystem 기반 UI 엔지니어다. AGENTS.md의 4단계 레고 조립 파이프라인에 따라 [컴포넌트 우선 원칙]으로 새 컴포넌트를 components/ui에 먼저 작성하고, 토큰(var(--atom-*))을 바인딩하여 조립해줘."'}
                      </code>
                    </div>
                  </div>
                )}

                {item.id === 'ai-roles-skills' && (
                  <div className="p-4 rounded-xl bg-(--bg-secondary)/50 border border-(--border-subtle) space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono font-bold text-(--text-primary) flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                        {locale === 'ja'
                          ? 'AIエージェントスキルのインストール & ローカルStudio起動コマンド'
                          : locale === 'en'
                          ? 'AI Agent Skill Installation & Local Studio Execution'
                          : 'AI 에이전트 스킬 설치 및 로컬 스튜디오 실행 커맨드'}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-(--bg-primary) border border-(--border-subtle) text-(--text-secondary)">
                        CLI Commands
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-mono">
                      <div className="p-3 rounded bg-(--bg-primary) border border-(--border-subtle)">
                        <div className="text-xs text-(--text-muted) mb-1">
                          {locale === 'ja' ? '# 1. AIスキルおよび仕様書の自動インストール' : locale === 'en' ? '# 1. Auto-install AI skills and guidelines' : '# 1. AI 스킬 및 규격 파일 자동 설치'}
                        </div>
                        <div className="font-bold text-(--text-primary)">npx atomsystem init</div>
                      </div>
                      <div className="p-3 rounded bg-(--bg-primary) border border-(--border-subtle)">
                        <div className="text-xs text-(--text-muted) mb-1">
                          {locale === 'ja' ? '# 2. ローカルトークンStudioの起動 (/studio)' : locale === 'en' ? '# 2. Run Local Token Studio (/studio)' : '# 2. 로컬 토큰 스튜디오 실행 (/studio)'}
                        </div>
                        <div className="font-bold text-(--text-primary)">npx atomsystem studio</div>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-(--bg-primary) border border-(--border-subtle) font-mono text-sm text-(--text-secondary) leading-relaxed space-y-1">
                      <div>
                        <strong className="text-(--text-primary)">
                          {locale === 'ja' ? '役割別エージェント呼び出しガイド:' : locale === 'en' ? 'Directives by Specialized Agent Role:' : '에이전트 역할별 호출 지침:'}
                        </strong>
                      </div>
                      <div>• <strong>token-guardian</strong>: {locale === 'ja' ? '"W3Cトークンの整合性を監査し、インラインのハードコード色をすべて遮断してください。"' : locale === 'en' ? '"Audit W3C token integrity and prevent inline hardcoded colors."' : '"W3C 토큰 무결성을 감사하고 인라인 하드코딩 색상을 전수 차단해줘."'}</div>
                      <div>• <strong>component-architect</strong>: {locale === 'ja' ? '"A11yアクセシビリティに準拠した純粋な原子コンポーネントを設計してください。"' : locale === 'en' ? '"Design pure atomic components adhering to strict A11y accessibility standards."' : '"A11y 접근성을 준수하는 순수 원자 단위 컴포넌트를 설계해줘."'}</div>
                      <div>• <strong>block-designer</strong>: {locale === 'ja' ? '"原子コンポーネントを組み合わせて完成型ダッシュボードブロックを構築してください。"' : locale === 'en' ? '"Compose atomic components into complete dashboard blocks and UX patterns."' : '"원자 컴포넌트들을 조합하여 완성형 대시보드 블록을 구축해줘."'}</div>
                    </div>
                  </div>
                )}

                {/* Do & Don't Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-sm">
                  {/* DO */}
                  <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                      <Check className="w-4 h-4" />
                      <span>{t('principles.badgeDo', '권장 지침 (DO)')}</span>
                    </div>
                    <ul className="space-y-1.5 text-(--text-primary) pl-1">
                      {dos.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-mono text-xs mt-0.5">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DONT */}
                  <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
                      <X className="w-4 h-4" />
                      <span>{t('principles.badgeDont', '지양 패턴 (DON\'T)')}</span>
                    </div>
                    <ul className="space-y-1.5 text-(--text-primary) pl-1">
                      {donts.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-500 font-mono text-xs mt-0.5">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-(--border-subtle) flex items-center justify-between text-xs">
          <Link
            href="/tokens"
            className="text-neutral-500 hover:text-(--text-primary) flex items-center gap-1 transition-colors"
          >
            <span>{locale === 'ja' ? 'デザイントークン仕様書を見る →' : locale === 'en' ? 'View Design Tokens Specification →' : '디자인 토큰 명세 바로가기'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href="https://www.designtokens.org/tr/2025.10/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-(--text-primary) inline-flex items-center gap-1 transition-colors"
          >
            <span>{locale === 'ja' ? 'W3C DTCG 公式標準仕様' : locale === 'en' ? 'W3C DTCG Official Standard' : 'W3C DTCG 공식 표준서'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-(--border-subtle) py-6 text-xs text-neutral-400">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AtomDesignToken — Single Source of Truth for Design Tokens</span>
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:text-(--text-primary)">{t('common.home', '홈')}</Link>
            <span>•</span>
            <Link href="/tokens" className="hover:text-(--text-primary)">{t('nav.tokens', '토큰')}</Link>
            <span>•</span>
            <Link href="/guide" className="hover:text-(--text-primary)">{t('nav.guide', '가이드')}</Link>
            <span>•</span>
            <Link href="/motion" className="hover:text-(--text-primary)">{t('nav.motion', '모션')}</Link>
            <span>•</span>
            <Link href="/components/button" className="hover:text-(--text-primary)">{t('nav.components', '컴포넌트')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
