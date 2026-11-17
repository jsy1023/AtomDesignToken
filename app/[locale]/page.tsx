'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { useI18n } from '@/lib/i18n';
import {
  Copy,
  Check,
  ArrowRight,
  Palette,
  Layers,
  BookOpen,
  Code2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Cpu,
  Box,
  Sliders,
  Terminal,
  CheckCircle2,
} from 'lucide-react';

export default function Home() {
  const locale = useLocale();
  const { theme } = useThemeEditor();
  const { t, dictionary } = useI18n();
  const brandColor = theme?.color?.primary || '#18181b';
  const radius = theme?.borderRadius || '8px';
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedStudioCli, setCopiedStudioCli] = useState(false);
  const [copiedRefactorCli, setCopiedRefactorCli] = useState(false);
  const [copiedAddCli, setCopiedAddCli] = useState(false);

  const copyCli = () => {
    navigator.clipboard.writeText('npx atomsystem init');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const copyStudio = () => {
    navigator.clipboard.writeText('npx atomsystem studio');
    setCopiedStudioCli(true);
    setTimeout(() => setCopiedStudioCli(false), 2000);
  };

  const copyRefactor = () => {
    navigator.clipboard.writeText('npx atomsystem refactor --fix');
    setCopiedRefactorCli(true);
    setTimeout(() => setCopiedRefactorCli(false), 2000);
  };

  const copyAdd = () => {
    navigator.clipboard.writeText('npx atomsystem add button');
    setCopiedAddCli(true);
    setTimeout(() => setCopiedAddCli(false), 2000);
  };

  const features = [
    {
      title: t('home.principlesTitle', '설계 원칙 (Principles)'),
      desc: t('home.principlesDesc', '단일 진실 공급원(SSOT), 제로 런타임, 3계층 아키텍처 등 6대 핵심 설계 규격.'),
      href: '/principles',
      linkText: t('home.principlesLink', '원칙 가이드 보기'),
      icon: ShieldCheck,
    },
    {
      title: t('home.tokensTitle', '디자인 토큰 명세 (Tokens)'),
      desc: t('home.tokensDesc', 'W3C DTCG 표준 기반 색상, 타이포그래피, 곡률, 간격, 그림자 CSS 변수 카탈로그.'),
      href: '/tokens',
      linkText: t('home.tokensLink', '토큰 명세서 보기'),
      icon: Palette,
    },
    {
      title: t('home.motionTitle', '모션 및 트랜지션 (Motion)'),
      desc: t('home.motionDesc', '지속 시간(Duration)과 이징(Easing) 큐빅 베지에 타이밍 토큰 및 실시간 테스트.'),
      href: '/motion',
      linkText: t('home.motionLink', '모션 명세 보기'),
      icon: Zap,
    },
    {
      title: t('home.componentsTitle', '컴포넌트 가이드 & 명세 (Components)'),
      desc: t('home.componentsDesc', '버튼, 인풋, 모달, 바텀시트, 탭 등 시맨틱 토큰과 결합된 프로덕션 UI 컴포넌트.'),
      href: '/components/button',
      linkText: t('home.componentsLink', '컴포넌트 문서 보기'),
      icon: Layers,
    },
    {
      title: t('home.blocksTitle', '디자인 블록 (Blocks)'),
      desc: t('home.blocksDesc', '실시간 차트, AI 대화형 메신저, 카드 리스트, 슬라이더, 요금제 등 완성형 프로덕션 모듈.'),
      href: '/blocks',
      linkText: t('home.blocksLink', '디자인 블록 탐색'),
      icon: Box,
    },
    {
      title: t('home.patternsTitle', 'UX 인터랙션 패턴 (Patterns)'),
      desc: t('home.patternsDesc', '대시보드, 폼 유효성, 결제, 온보딩 등 검증된 실무 UX 패턴 및 안티패턴 체크리스트.'),
      href: '/patterns',
      linkText: t('home.patternsLink', 'UX패턴 탐색'),
      icon: Code2,
    },
    {
      title: t('home.dependenciesTitle', '디펜던시 매트릭스 (Dependencies)'),
      desc: t('home.dependenciesDesc', '0KB 런타임 아키텍처, 패키지 의존성 및 프레임워크 간 크로스 플랫폼 호환성.'),
      href: '/dependencies',
      linkText: t('home.dependenciesLink', '디펜던시 확인'),
      icon: Cpu,
    },
    {
      title: t('home.guideTitle', '라이브러리 활용 가이드 (Guide)'),
      desc: t('home.guideDesc', 'React, Vue, Vanilla HTML 어디서나 의존성 없이 스타일을 공유하고 빌드하는 실전 지침.'),
      href: '/guide',
      linkText: t('home.guideLink', '활용 가이드 보기'),
      icon: BookOpen,
    },
  ];

  const heroTitle = t('home.heroTitle', '플랫폼에 독립적인 디자인 토큰과\n실무 UX 패턴 라이브러리');
  const heroLines = heroTitle.split('\n');

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col justify-between transition-colors">
      {/* Global Minimal Header */}
      <Header brandColor={brandColor} />

      {/* Main Content Area */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 flex-1 flex flex-col gap-8 sm:gap-10">
        {/* Hero Section - Minimalist & Content-first */}
        <section className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-(--text-muted)">
            <a
              href="https://www.designtokens.org/tr/2025.10/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-(--text-primary) transition-colors underline underline-offset-2"
            >
              <span>W3C DTCG 2025.10 Spec</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <span>Universal Design Token System</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-(--text-primary) leading-snug">
            {heroLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < heroLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
            {t('home.heroSubtitle', 'AtomDesignToken은 피그마 및 마크다운 기반의 디자인 결정을 단일 진실 공급원(SSOT)으로 관리하고, CSS 변수와 프레임워크 독립적 시맨틱 클래스로 컴파일하여 일관된 제품 경험을 구축합니다.')}
          </p>

          {/* Quickstart Command */}
          <div className="pt-2 flex items-center gap-3">
            <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-(--bg-secondary) border border-(--border-strong) text-xs font-mono">
              <span className="text-(--text-muted)">$</span>
              <span className="text-(--text-primary)">npx atomsystem init</span>
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                type="button"
                onClick={copyCli}
                className="text-(--text-muted) hover:text-(--text-primary) ml-2 h-7 w-7"
                title={t('common.copy', '명령어 복사')}
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-(--atom-color-success)" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>

            <Link
              href="/tokens"
              style={{ borderRadius: radius }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-(--text-primary) text-(--bg-primary) text-xs font-semibold hover:opacity-90 transition shadow-xs"
            >
              <span>{t('home.getStarted', '시작하기')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Core Architecture: Local Studio Direct-to-Code Pipeline */}
        <section
          style={{ borderRadius: radius }}
          className="p-6 sm:p-8 bg-(--bg-secondary)/40 border border-(--border-subtle) space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--border-subtle) pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-(--accent-primary) animate-pulse" />
                <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-(--accent-primary)">
                  {locale === 'ja'
                    ? 'ローカルStudio ➔ コード即時同期パイプライン'
                    : locale === 'en'
                    ? 'Local Studio to Code Live Pipeline'
                    : '로컬 스튜디오 ➔ 코드 실시간 동기화 파이프라인'}
                </span>
                <Badge variant="primary">SSOT Architecture</Badge>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-(--text-primary) tracking-tight">
                {locale === 'ja'
                  ? 'ローカルStudioでデザインを調整、即座にコードへ反映'
                  : locale === 'en'
                  ? 'Design & Edit in Local Studio, Reflected Instantly in Code'
                  : '로컬 스튜디오에서 디자인을 만들고 수정하면 바로 코드에 반영됩니다'}
              </h2>
              <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                {locale === 'ja'
                  ? 'Figmaとコード間の断絶を解消。W3C DTCG標準トークンからコンポーネント、完成形テンプレートまで、5段階の組み立てパイプラインで自動同期されます。'
                  : locale === 'en'
                  ? 'Bridge the gap between design and production code. From raw palette tokens to semantic actions, themes, components, and templates—everything connects in one seamless Lego pipeline.'
                  : '피그마와 코드 사이의 분절을 제거하세요. 원천 팔레트 토큰부터 액션, 테마, 28개 컴포넌트, 그리고 완성형 템플릿까지 하나의 견고한 레고 조립 파이프라인으로 실시간 연결됩니다.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-(--radius-sm) bg-(--accent-primary) text-white text-xs font-semibold hover:opacity-90 transition shadow-xs"
              >
                <Sliders className="w-4 h-4" />
                <span>{locale === 'ja' ? 'Studioを開く (/studio)' : locale === 'en' ? 'Open Studio (/studio)' : '로컬 스튜디오 열기 (/studio)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 5-Step Lego Assembly Pipeline Visualizer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-(--text-muted)">
              <span className="font-semibold text-(--text-primary) flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>
                  {locale === 'ja'
                    ? '5段階レゴ組み立てパイプライン'
                    : locale === 'en'
                    ? '5-Tier Lego Assembly Pipeline'
                    : '5단계 레고 조립 파이프라인'}
                </span>
              </span>
              <span>tokens/token.json ➔ css/atom-ui.css</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {[
                {
                  step: '01',
                  name: locale === 'ja' ? 'パレット トークン' : locale === 'en' ? 'Palette Tokens' : '팔레트 토큰',
                  sub: '--atom-palette-blue-500',
                  desc: locale === 'ja' ? '原色のカラー・余白・角丸' : locale === 'en' ? 'Raw color scales, spacing, radius' : '원천 색상·여백·곡률 수치',
                  tag: 'Palette',
                },
                {
                  step: '02',
                  name: locale === 'ja' ? 'アクション トークン' : locale === 'en' ? 'Action Tokens' : '액션 토큰',
                  sub: '--atom-color-primary',
                  desc: locale === 'ja' ? 'primary, success, danger' : locale === 'en' ? 'Semantic roles & states' : '비즈니스 시맨틱 의미 부여',
                  tag: 'Action',
                },
                {
                  step: '03',
                  name: locale === 'ja' ? 'テーマ トークン' : locale === 'en' ? 'Theme Tokens' : '테마 토큰',
                  sub: 'var(--bg-primary)',
                  desc: locale === 'ja' ? 'ライト/ダーク・ブランドモード' : locale === 'en' ? 'Light, Dark, Brand themes' : '라이트·다크·브랜드 스키마',
                  tag: 'Theme',
                },
                {
                  step: '04',
                  name: locale === 'ja' ? 'コンポーネント' : locale === 'en' ? 'UI Components' : '컴포넌트',
                  sub: '<Button>, <Card>, <Toast>',
                  desc: locale === 'ja' ? '28種の高アクセシビリティ原子' : locale === 'en' ? '28 Accessible atomic primitives' : '28종 고접근성 표준 원자',
                  tag: 'Component',
                },
                {
                  step: '05',
                  name: locale === 'ja' ? 'テンプレート / UX' : locale === 'en' ? 'Templates & UX' : '템플릿 / UX패턴',
                  sub: 'Dashboard, Checkout, Chat',
                  desc: locale === 'ja' ? '完成型コンテンツブロック' : locale === 'en' ? 'Production content blocks' : '완성형 콘텐츠 블록·UX 패턴',
                  tag: 'Template',
                },
              ].map((tier) => (
                <div
                  key={tier.step}
                  className="p-3.5 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) flex flex-col justify-between gap-2.5 relative group hover:border-(--accent-primary) transition shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-(--accent-primary) font-bold">
                      STEP {tier.step}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">
                      {tier.tag}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-xs text-(--text-primary)">{tier.name}</div>
                    <code className="text-[10px] font-mono text-(--text-muted) block truncate mt-0.5">{tier.sub}</code>
                  </div>
                  <p className="text-[11px] text-(--text-secondary) leading-snug">
                    {tier.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Practical Action Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Pillar 1 */}
            <div className="p-4 sm:p-5 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="w-8 h-8 rounded-(--radius-sm) bg-(--accent-primary)/10 text-(--accent-primary) flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-(--text-primary)">
                  {locale === 'ja'
                    ? '1. Studioでデザイン ➔ コード即時同期'
                    : locale === 'en'
                    ? '1. Design in Studio ➔ Direct Code Reflection'
                    : '1. 로컬 스튜디오 디자인 ➔ 코드 즉시 반영'}
                </h3>
                <p className="text-xs text-(--text-secondary) leading-relaxed">
                  {locale === 'ja'
                    ? 'ローカルGUI Studioで色・角丸・余白を視覚的に調整。[プロジェクトに即時反映]をクリックするとtokens/token.jsonとcss/atom-ui.cssへ即時保存され、実際のコードへ同期されます。'
                    : locale === 'en'
                    ? 'Adjust colors, borders, and paddings visually in the Local Studio GUI. One click compiles into tokens/token.json and css/atom-ui.css, updating your frontend code in real time.'
                    : '로컬 GUI 스튜디오(/studio)에서 색상, 테두리, 모서리 곡률, 여백을 시각적으로 조절하고 [프로젝트에 즉시 반영하기]를 누르면 tokens/token.json과 css/atom-ui.css에 영구 저장되어 실제 프론트엔드 코드에 즉시 연결됩니다.'}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-(--border-subtle)">
                <div className="flex items-center justify-between text-[11px] font-mono bg-(--bg-secondary) px-2.5 py-1.5 rounded border border-(--border-subtle)">
                  <span className="text-(--text-primary)">$ npx atomsystem studio</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    isIconOnly
                    type="button"
                    onClick={copyStudio}
                    className="p-1 h-auto text-(--text-muted) hover:text-(--text-primary)"
                    title="명령어 복사"
                  >
                    {copiedStudioCli ? <Check className="w-3 h-3 text-(--atom-color-success)" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <Link
                  href="/studio"
                  className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1"
                >
                  <span>{locale === 'ja' ? 'Studioを起動する' : locale === 'en' ? 'Launch Local Studio' : '로컬 스튜디오 실행하기'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 sm:p-5 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="w-8 h-8 rounded-(--radius-sm) bg-(--atom-color-success)/10 text-(--atom-color-success) flex items-center justify-center">
                  <Box className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-(--text-primary)">
                  {locale === 'ja'
                    ? '2. 基本コードから独自のコンポーネント制作'
                    : locale === 'en'
                    ? '2. Build Custom Components on Primitives'
                    : '2. 기본 코드를 시작으로 커스텀 제작'}
                </h3>
                <p className="text-xs text-(--text-secondary) leading-relaxed">
                  {locale === 'ja'
                    ? 'ゼロから作る必要はありません。28種のW3C準拠プリミティブをベースに、Studioでバリアントを追加しトークンをバインドして、独自のコンポーネントを自由に拡張できます。'
                    : locale === 'en'
                    ? 'Never start from zero. Based on 28 accessible primitive components, easily add new variants and bind tokens in the Studio to craft custom UI components tailored to your app.'
                    : '0부터 처음 만들지 마세요. W3C DTCG 표준 기반 28개 고접근성 프리미티브 컴포넌트를 기반으로, 로컬 스튜디오에서 새 변수를 추가하고 토큰을 바인딩하여 당신만의 컴포넌트를 확장하세요.'}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-(--border-subtle)">
                <div className="flex items-center justify-between text-[11px] font-mono bg-(--bg-secondary) px-2.5 py-1.5 rounded border border-(--border-subtle)">
                  <span className="text-(--text-primary)">$ npx atomsystem add button</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    isIconOnly
                    type="button"
                    onClick={copyAdd}
                    className="p-1 h-auto text-(--text-muted) hover:text-(--text-primary)"
                    title="명령어 복사"
                  >
                    {copiedAddCli ? <Check className="w-3 h-3 text-(--atom-color-success)" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <Link
                  href="/components/button"
                  className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1"
                >
                  <span>{locale === 'ja' ? '28種コンポーネントを見る' : locale === 'en' ? 'Browse 28 Primitives' : '28종 기본 컴포넌트 둘러보기'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 sm:p-5 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="w-8 h-8 rounded-(--radius-sm) bg-(--atom-color-warning,#f59e0b)/10 text-(--atom-color-warning,#f59e0b) flex items-center justify-center">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-(--text-primary)">
                  {locale === 'ja'
                    ? '3. AIハードコード排除 ＆ 自動リファクタ'
                    : locale === 'en'
                    ? '3. Prevent AI Hardcoding & Auto-Refactor'
                    : '3. AI 하드코딩 방지 & 자동 리팩토링'}
                </h3>
                <p className="text-xs text-(--text-secondary) leading-relaxed">
                  {locale === 'ja'
                    ? 'アドホックな#3182f6やp-[13px]はもう不要！CursorやClaude CodeなどのAIが生成したコードをスキャンし、セマンティックなデザイントークンへ自動置換します。'
                    : locale === 'en'
                    ? 'Say goodbye to ad-hoc #3182f6 or p-[13px]! Scan source code generated by AI coding assistants (Cursor, Claude Code) and auto-replace with semantic tokens in one command.'
                    : '임의의 #3182f6이나 p-[13px], text-blue-500 같은 날림 코딩은 이제 그만! Cursor, Claude Code 등 AI가 작성한 소스코드를 스캔하여 시맨틱 디자인 토큰으로 원클릭 자동 치환합니다.'}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-(--border-subtle)">
                <div className="flex items-center justify-between text-[11px] font-mono bg-(--bg-secondary) px-2.5 py-1.5 rounded border border-(--border-subtle)">
                  <span className="text-(--text-primary) whitespace-nowrap text-[10.5px] sm:text-[11px]">$ npx atomsystem refactor --fix</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    isIconOnly
                    type="button"
                    onClick={copyRefactor}
                    className="p-1 h-auto text-(--text-muted) hover:text-(--text-primary) shrink-0 ml-1"
                    title="명령어 복사"
                  >
                    {copiedRefactorCli ? <Check className="w-3 h-3 text-(--atom-color-success)" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-(--atom-color-success) font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>npm run lint:components (0 Raw Tags)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid - Clean, Content-centric */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.href}
                href={f.href}
                style={{ borderRadius: radius }}
                className="p-5 border border-(--border-subtle) bg-(--bg-secondary) hover:border-(--border-strong) transition-colors flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-(--text-primary) font-semibold text-sm">
                    <Icon className="w-4 h-4 text-(--text-muted) group-hover:text-(--text-primary) transition-colors" />
                    <span>{f.title}</span>
                  </div>
                  <p className="text-xs text-(--text-secondary) leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="text-xs font-medium text-(--text-muted) group-hover:text-(--text-primary) transition-colors flex items-center gap-1">
                  <span>{f.linkText}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </section>
      </main>

      {/* Minimal Clean Footer */}
      <footer className="border-t border-(--border-subtle) py-6 text-xs text-(--text-muted)">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AtomDesignToken — Single Source of Truth for Design Tokens & Patterns</span>
          <div className="flex flex-wrap items-center gap-2 text-xs text-(--text-secondary)">
            <Link href="/principles" className="hover:text-(--text-primary)">{t('nav.principles', '원칙')}</Link>
            <span>|</span>
            <Link href="/tokens" className="hover:text-(--text-primary)">{t('nav.tokens', '디자인 토큰')}</Link>
            <span>|</span>
            <Link href="/motion" className="hover:text-(--text-primary)">{t('nav.motion', '모션')}</Link>
            <span>|</span>
            <Link href="/components/button" className="hover:text-(--text-primary)">{t('nav.components', '컴포넌트')}</Link>
            <span>|</span>
            <Link href="/blocks" className="hover:text-(--text-primary)">{t('nav.blocks', '디자인 블록')}</Link>
            <span>|</span>
            <Link href="/patterns" className="hover:text-(--text-primary)">{t('nav.patterns', 'UX패턴')}</Link>
            <span>|</span>
            <Link href="/dependencies" className="hover:text-(--text-primary)">{t('nav.dependencies', '디펜던시')}</Link>
            <span>|</span>
            <Link href="/guide" className="hover:text-(--text-primary)">{t('nav.guide', '가이드')}</Link>
            <span>|</span>
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
