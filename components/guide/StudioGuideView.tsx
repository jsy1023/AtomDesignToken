'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useI18n } from '@/lib/i18n';
import {
  Terminal,
  Copy,
  Check,
  Sliders,
  Palette,
  Layers,
  Code2,
  ArrowRight,
  Cpu,
  FolderSync,
  Paintbrush,
  RefreshCw,
} from 'lucide-react';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import {
  Badge,
  Button,
  Card,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui';

interface CommandSnippet {
  id: string;
  label: string;
  command: string;
  description: string;
}

interface StudioGuideCopy {
  badgeCli: string;
  badgeSsot: string;
  title: string;
  subtitleBeforeTokens: string;
  subtitleBetween: string;
  subtitleBeforeCss: string;
  subtitleAfterCss: string;
  copyCmdTitle: string;
  viewComponentsBtn: string;
  step1Label: string;
  step1Title: string;
  step1Desc: string;
  runCommands: CommandSnippet[];
  terminalExampleTitle: string;
  copyLabel: string;
  copiedLabel: string;
  fullWorkflowSnippet: string;
  step2Label: string;
  step2Title: string;
  step2DescBefore: string;
  step2DescAfter: string;
  tabLabels: {
    components: string;
    themes: string;
    palette: string;
    brand: string;
    export: string;
  };
  workspaces: {
    components: {
      title: string;
      desc: string;
      bullets: [string, string];
    };
    themes: {
      title: string;
      desc: string;
    };
    palette: {
      title: string;
      desc: string;
    };
    brand: {
      title: string;
      desc: string;
    };
    export: {
      title: string;
      desc: string;
    };
  };
  saveTitle: string;
  saveDescBefore: string;
  saveDescMiddle: string;
  saveDescAfter: string;
  figmaTitle: string;
  figmaDescBefore: string;
  figmaDescMiddle: string;
  figmaDescAfter: string;
  cliTableTitle: string;
  cliTableCommandHeader: string;
  cliTablePurposeHeader: string;
  cliCheatsheet: { command: string; purpose: string }[];
}

const STUDIO_GUIDE_COPY: Record<'ko' | 'en' | 'ja', StudioGuideCopy> = {
  ko: {
    badgeCli: 'CLI Local GUI',
    badgeSsot: 'Zero-Runtime SSOT',
    title: 'AtomSystem 로컬 스튜디오 가이드',
    subtitleBeforeTokens: '로컬 스튜디오는 내 프로젝트의 ',
    subtitleBetween: '과 ',
    subtitleBeforeCss: '를 브라우저 GUI에서 직접 편집하고, 저장 즉시 ',
    subtitleAfterCss: '로 자동 재컴파일하는 독립 로컬 서버 도구입니다.',
    copyCmdTitle: '명령어 복사',
    viewComponentsBtn: '컴포넌트 문서 보기',
    step1Label: 'Step 01 · Quick Start',
    step1Title: '실행 방법',
    step1Desc: '프로젝트 루트 디렉토리에서 터미널을 열고 아래 순서대로 실행합니다.',
    runCommands: [
      {
        id: 'init',
        label: '1. 초기 환경 설정',
        command: 'npx atomsystem init',
        description: 'tokens/tokens.json, css/atom-ui.css, AGENTS.md 및 AI 스킬 파일을 프로젝트에 생성합니다.',
      },
      {
        id: 'studio',
        label: '2. 로컬 스튜디오 실행',
        command: 'npx atomsystem studio',
        description: '로컬 SSOT 스튜디오 서버(http://localhost:4000)를 실행합니다.',
      },
      {
        id: 'studio-port',
        label: '포트 지정 실행 (충돌 시)',
        command: 'npx atomsystem studio --port=4001',
        description: '4000번 포트가 이미 사용 중일 때 원하는 포트로 스튜디오를 띄웁니다.',
      },
    ],
    terminalExampleTitle: '터미널 실행 예시',
    copyLabel: '복사',
    copiedLabel: '복사됨',
    fullWorkflowSnippet: `# 1. 프로젝트에 AtomSystem 초기화
npx atomsystem init

# 2. 로컬 스튜디오 실행 (기본 포트 4000)
npx atomsystem studio
# 브라우저에서 http://localhost:4000 접속

# (선택) 4000번 포트가 사용 중일 경우 다른 포트로 실행
npx atomsystem studio --port=4001

# 3. 코드 수정 후 컴포넌트/CSS 자동 동기화
npx atomsystem sync`,
    step2Label: 'Step 02 · Workspace Guide',
    step2Title: '스튜디오 화면별 사용 방법',
    step2DescBefore: '',
    step2DescAfter: '에 접속하면 상단/사이드바의 5개 워크스페이스를 통해 디자인 시스템 전체를 관리할 수 있습니다.',
    tabLabels: {
      components: '1. Components',
      themes: '2. Themes',
      palette: '3. Palette',
      brand: '4. Brand',
      export: '5. Code Export',
    },
    workspaces: {
      components: {
        title: '컴포넌트 스튜디오 (Type · Variable · Status)',
        desc: '등록된 모든 UI 컴포넌트의 외형(Type), 시맨틱 옵션(Variable), 인터랙션 상태(Status)를 실시간 프리뷰로 점검하고 속성을 편집합니다.',
        bullets: [
          '좌측 사이드바에서 컴포넌트를 선택하면 Props·상태별 미리보기와 코드 스니펫을 즉시 확인할 수 있습니다.',
          '상단 + AI 제출 모달 또는 npx atomsystem submit으로 신규 컴포넌트를 추가하면 레지스트리와 문서에 자동 반영됩니다.',
        ],
      },
      themes: {
        title: '테마 매니저 (Theme Manager)',
        desc: '라이트/다크 모드 및 기본 테마 프리셋을 전환하고, 서비스 분위기에 맞는 시맨틱 테마 토큰 세트를 구성합니다.',
      },
      palette: {
        title: '팔레트 & 시맨틱 토큰 편집 (Palette)',
        desc: '브랜드 컬러(--accent-primary), 배경/텍스트 토큰(--bg-primary, --text-primary), 상태 컬러(Success, Warning, Destructive) 및 곡률(--radius)을 컬러피커와 입력창으로 수정합니다.',
      },
      brand: {
        title: '브랜드 설정 (Brand Settings)',
        desc: '프로젝트 브랜드 이름, 로고 URL, 기본 폰트 패밀리(font-sans, font-mono)를 설정해 전체 컴포넌트 타이포그래피에 일괄 반영합니다.',
      },
      export: {
        title: '코드 내보내기 (Code Export)',
        desc: '편집된 W3C DTCG 형식의 tokens.json과 컴파일된 atom-ui.css CSS 변수 코드를 확인하고 복사할 수 있습니다.',
      },
    },
    saveTitle: '저장 시 자동 파일 반영 (SSOT)',
    saveDescBefore: '스튜디오 상단 ',
    saveDescMiddle: '저장 버튼을 클릭하면 로컬 프로젝트의 ',
    saveDescAfter: '이 갱신되고, 동시에 css/atom-ui.css가 0ms 제로 런타임 CSS 변수로 자동 재컴파일됩니다.',
    figmaTitle: 'Figma 플러그인 연동 (AtomSystem Manager)',
    figmaDescBefore: '로컬 스튜디오가 실행된 상태에서 Figma의 ',
    figmaDescMiddle: 'AtomSystem Manager 플러그인을 실행하면 ',
    figmaDescAfter: '과 자동 연결되어 토큰을 Pull/Push로 양방향 동기화할 수 있습니다.',
    cliTableTitle: '함께 사용하는 CLI 명령어',
    cliTableCommandHeader: '명령어',
    cliTablePurposeHeader: '설명',
    cliCheatsheet: [
      { command: 'npx atomsystem init', purpose: '토큰(tokens/tokens.json), CSS(css/atom-ui.css), AI 가이드 초기화' },
      { command: 'npx atomsystem studio', purpose: '로컬 GUI 스튜디오 실행 (기본 http://localhost:4000)' },
      { command: 'npx atomsystem studio --port=4001', purpose: '지정 포트로 로컬 GUI 스튜디오 실행' },
      { command: 'npx atomsystem schema', purpose: 'AI 컴포넌트 제출용 표준 JSON 스키마 확인' },
      { command: 'npx atomsystem submit <file>.atom.json', purpose: '컴포넌트 생성 + 레지스트리/CSS/문서 자동 반영' },
      { command: 'npx atomsystem sync', purpose: 'components/ui/*.tsx 스캔 후 레지스트리 및 CSS 재컴파일' },
      { command: 'npx atomsystem refactor --fix', purpose: '하드코딩 색상/간격을 시맨틱 토큰 변수로 자동 치환' },
    ],
  },
  en: {
    badgeCli: 'CLI Local GUI',
    badgeSsot: 'Zero-Runtime SSOT',
    title: 'AtomSystem Local Studio Guide',
    subtitleBeforeTokens: 'Local Studio is a standalone local server tool that lets you visually edit your project’s ',
    subtitleBetween: ' and ',
    subtitleBeforeCss: ' in a browser GUI, and automatically recompile ',
    subtitleAfterCss: ' the moment you save.',
    copyCmdTitle: 'Copy command',
    viewComponentsBtn: 'View Components',
    step1Label: 'Step 01 · Quick Start',
    step1Title: 'How to Run',
    step1Desc: 'Open a terminal in your project root directory and run the commands below in order.',
    runCommands: [
      {
        id: 'init',
        label: '1. Initialize Project',
        command: 'npx atomsystem init',
        description: 'Generates tokens/tokens.json, css/atom-ui.css, AGENTS.md, and AI skill files in your project.',
      },
      {
        id: 'studio',
        label: '2. Start Local Studio',
        command: 'npx atomsystem studio',
        description: 'Launches the local SSOT Studio server at http://localhost:4000.',
      },
      {
        id: 'studio-port',
        label: 'Custom Port (If 4000 is busy)',
        command: 'npx atomsystem studio --port=4001',
        description: 'Starts Local Studio on a custom port when port 4000 is already in use.',
      },
    ],
    terminalExampleTitle: 'Terminal Workflow Example',
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
    fullWorkflowSnippet: `# 1. Initialize AtomSystem in your project
npx atomsystem init

# 2. Launch Local Studio (default port 4000)
npx atomsystem studio
# Open http://localhost:4000 in your browser

# (Optional) Use a custom port if 4000 is already in use
npx atomsystem studio --port=4001

# 3. Scan components and recompile CSS after code changes
npx atomsystem sync`,
    step2Label: 'Step 02 · Workspace Guide',
    step2Title: 'How to Use Each Workspace',
    step2DescBefore: 'Open ',
    step2DescAfter: ' to manage your entire design system across 5 dedicated workspaces.',
    tabLabels: {
      components: '1. Components',
      themes: '2. Themes',
      palette: '3. Palette',
      brand: '4. Brand',
      export: '5. Code Export',
    },
    workspaces: {
      components: {
        title: 'Component Studio (Type · Variable · Status)',
        desc: 'Inspect and edit every registered UI component’s Type, semantic Variable options, and interactive Status states in a live preview.',
        bullets: [
          'Select any component from the left sidebar to inspect props, state previews, and copyable code snippets.',
          'Add new components via the + AI Submit modal or npx atomsystem submit to automatically update the registry and docs.',
        ],
      },
      themes: {
        title: 'Theme Manager',
        desc: 'Switch between light/dark modes and built-in theme presets, or configure semantic theme token sets for your product.',
      },
      palette: {
        title: 'Palette & Semantic Tokens',
        desc: 'Edit brand colors (--accent-primary), surface/text tokens (--bg-primary, --text-primary), status colors (Success, Warning, Destructive), and border radius (--radius) with color pickers.',
      },
      brand: {
        title: 'Brand Settings',
        desc: 'Configure your brand name, logo URL, and default font families (font-sans, font-mono) applied across all components.',
      },
      export: {
        title: 'Code Export',
        desc: 'Inspect and copy your edited W3C DTCG tokens.json and compiled zero-runtime atom-ui.css CSS variables.',
      },
    },
    saveTitle: 'One-Click Save & SSOT Sync',
    saveDescBefore: 'Clicking ',
    saveDescMiddle: 'Save in the Studio header updates ',
    saveDescAfter: ' and immediately recompiles css/atom-ui.css as zero-runtime CSS variables.',
    figmaTitle: 'Figma Plugin Sync (AtomSystem Manager)',
    figmaDescBefore: 'While Local Studio is running, open the ',
    figmaDescMiddle: 'AtomSystem Manager plugin in Figma to connect to ',
    figmaDescAfter: ' and sync tokens bidirectionally via Pull and Push.',
    cliTableTitle: 'CLI Command Reference',
    cliTableCommandHeader: 'Command',
    cliTablePurposeHeader: 'Description',
    cliCheatsheet: [
      { command: 'npx atomsystem init', purpose: 'Initialize tokens/tokens.json, css/atom-ui.css, and AI guidelines' },
      { command: 'npx atomsystem studio', purpose: 'Launch Local GUI Studio (default http://localhost:4000)' },
      { command: 'npx atomsystem studio --port=4001', purpose: 'Launch Local GUI Studio on a custom port' },
      { command: 'npx atomsystem schema', purpose: 'Inspect the standard JSON schema for AI component submission' },
      { command: 'npx atomsystem submit <file>.atom.json', purpose: 'Scaffold component and update registry, CSS, and docs' },
      { command: 'npx atomsystem sync', purpose: 'Scan components/ui/*.tsx and recompile registry & CSS' },
      { command: 'npx atomsystem refactor --fix', purpose: 'Automatically replace hardcoded colors/spacing with semantic tokens' },
    ],
  },
  ja: {
    badgeCli: 'CLI Local GUI',
    badgeSsot: 'Zero-Runtime SSOT',
    title: 'AtomSystem ローカルスタジオガイド',
    subtitleBeforeTokens: 'ローカルスタジオは、プロジェクトの ',
    subtitleBetween: ' と ',
    subtitleBeforeCss: ' をブラウザGUI上で直接編集し、保存と同時に ',
    subtitleAfterCss: ' へ自動再コンパイルする独立ローカルサーバーツールです。',
    copyCmdTitle: 'コマンドをコピー',
    viewComponentsBtn: 'コンポーネント一覧を見る',
    step1Label: 'Step 01 · Quick Start',
    step1Title: '起動方法',
    step1Desc: 'プロジェクトのルートディレクトリでターミナルを開き、以下の順番で実行します。',
    runCommands: [
      {
        id: 'init',
        label: '1. 初期環境セットアップ',
        command: 'npx atomsystem init',
        description: 'tokens/tokens.json、css/atom-ui.css、AGENTS.md、AIスキルファイルを生成します。',
      },
      {
        id: 'studio',
        label: '2. ローカルスタジオ起動',
        command: 'npx atomsystem studio',
        description: 'ローカルSSOTスタジオサーバー（http://localhost:4000）を起動します。',
      },
      {
        id: 'studio-port',
        label: 'ポート指定起動（競合時）',
        command: 'npx atomsystem studio --port=4001',
        description: '4000番ポートが使用中の場合、任意のポートでスタジオを起動します。',
      },
    ],
    terminalExampleTitle: 'ターミナル実行例',
    copyLabel: 'コピー',
    copiedLabel: 'コピー完了',
    fullWorkflowSnippet: `# 1. プロジェクトにAtomSystemを初期化
npx atomsystem init

# 2. ローカルスタジオを起動（デフォルトポート 4000）
npx atomsystem studio
# ブラウザで http://localhost:4000 にアクセス

# （任意）4000番ポートが使用中の場合は別ポートで起動
npx atomsystem studio --port=4001

# 3. コード変更後にコンポーネント/CSSを自動同期
npx atomsystem sync`,
    step2Label: 'Step 02 · Workspace Guide',
    step2Title: 'ワークスペース別の使い方',
    step2DescBefore: '',
    step2DescAfter: ' にアクセスすると、5つのワークスペースからデザインシステム全体を管理できます。',
    tabLabels: {
      components: '1. Components',
      themes: '2. Themes',
      palette: '3. Palette',
      brand: '4. Brand',
      export: '5. Code Export',
    },
    workspaces: {
      components: {
        title: 'コンポーネントスタジオ (Type · Variable · Status)',
        desc: '登録済みUIコンポーネントの外観(Type)、セマンティック設定(Variable)、インタラクション状態(Status)をライブプレビューで確認・編集します。',
        bullets: [
          '左サイドバーからコンポーネントを選択すると、Propsや状態別プレビュー、コードスニペットを即座に確認できます。',
          '上部の + AI提出モーダルまたは npx atomsystem submit で新規コンポーネントを追加すると、レジストリとドキュメントに自動反映されます。',
        ],
      },
      themes: {
        title: 'テーママネージャー (Theme Manager)',
        desc: 'ライト/ダークモードや組み込みテーマプリセットを切り替え、サービスに合わせたセマンティックテーマトークンを構成します。',
      },
      palette: {
        title: 'パレット & セマンティックトークン編集 (Palette)',
        desc: 'ブランドカラー(--accent-primary)、背景/テキスト(--bg-primary, --text-primary)、状態カラー、角丸(--radius)をカラーピッカーで調整します。',
      },
      brand: {
        title: 'ブランド設定 (Brand Settings)',
        desc: 'ブランド名、ロゴURL、基本フォントファミリー(font-sans, font-mono)を設定し、全コンポーネントに一括適用します。',
      },
      export: {
        title: 'コードエクスポート (Code Export)',
        desc: '編集したW3C DTCG形式の tokens.json とコンパイル済み atom-ui.css のCSS変数コードを確認・コピーできます。',
      },
    },
    saveTitle: '保存時の自動ファイル反映 (SSOT)',
    saveDescBefore: 'スタジオ上部の ',
    saveDescMiddle: '保存ボタンをクリックすると ',
    saveDescAfter: ' が更新され、同時に css/atom-ui.css がゼロランタイムCSS変数として自動再コンパイルされます。',
    figmaTitle: 'Figmaプラグイン連携 (AtomSystem Manager)',
    figmaDescBefore: 'ローカルスタジオ起動中にFigmaの ',
    figmaDescMiddle: 'AtomSystem Manager プラグインを開くと ',
    figmaDescAfter: ' に自動接続され、Pull/Pushでトークンを双方向同期できます。',
    cliTableTitle: '関連CLIコマンド一覧',
    cliTableCommandHeader: 'コマンド',
    cliTablePurposeHeader: '説明',
    cliCheatsheet: [
      { command: 'npx atomsystem init', purpose: 'tokens/tokens.json、css/atom-ui.css、AIガイドを初期化' },
      { command: 'npx atomsystem studio', purpose: 'ローカルGUIスタジオを起動（デフォルト http://localhost:4000）' },
      { command: 'npx atomsystem studio --port=4001', purpose: '指定ポートでローカルGUIスタジオを起動' },
      { command: 'npx atomsystem schema', purpose: 'AIコンポーネント提出用の標準JSONスキーマを確認' },
      { command: 'npx atomsystem submit <file>.atom.json', purpose: 'コンポーネント生成＋レジストリ/CSS/ドキュメント自動反映' },
      { command: 'npx atomsystem sync', purpose: 'components/ui/*.tsx をスキャンしてレジストリとCSSを再コンパイル' },
      { command: 'npx atomsystem refactor --fix', purpose: 'ハードコードされた色/余白をセマンティックトークン変数へ自動置換' },
    ],
  },
};

export function StudioGuideView() {
  const { locale } = useI18n();
  const copy = STUDIO_GUIDE_COPY[locale] || STUDIO_GUIDE_COPY.ko;

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState<'components' | 'themes' | 'palette' | 'brand' | 'export'>('components');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-14">
      {/* Hero Section */}
      <section className="space-y-5 border-b border-(--border-subtle) pb-10">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{copy.badgeCli}</Badge>
          <Badge variant="neutral">{copy.badgeSsot}</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--text-primary)">
          {copy.title}
        </h1>

        <p className="text-sm sm:text-base text-(--text-secondary) max-w-3xl leading-relaxed">
          {copy.subtitleBeforeTokens}
          <code className="px-1.5 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle) font-mono text-xs text-(--text-primary)">
            tokens/tokens.json
          </code>
          {copy.subtitleBetween}
          <code className="px-1.5 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle) font-mono text-xs text-(--text-primary)">
            components/ui/
          </code>
          {copy.subtitleBeforeCss}
          <code className="px-1.5 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle) font-mono text-xs text-(--text-primary)">
            css/atom-ui.css
          </code>
          {copy.subtitleAfterCss}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-(--radius) bg-(--bg-secondary) border border-(--border-subtle) font-mono text-xs sm:text-sm text-(--text-primary)">
            <Terminal className="w-4 h-4 text-(--accent-primary)" />
            <span>npx atomsystem studio</span>
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              onClick={() => handleCopy('npx atomsystem studio', 'hero-cmd')}
              title={copy.copyCmdTitle}
            >
              {copiedId === 'hero-cmd' ? (
                <Check className="w-3.5 h-3.5 text-(--atom-color-success)" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>

          <Link href="/components/button">
            <Button variant="secondary" size="sm">
              <span>{copy.viewComponentsBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Step 1: How to Run */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-(--accent-primary)">
            {copy.step1Label}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-(--text-primary)">
            {copy.step1Title}
          </h2>
          <p className="text-xs sm:text-sm text-(--text-secondary)">
            {copy.step1Desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {copy.runCommands.map((item) => (
            <Card key={item.id} className="p-5 space-y-3 bg-(--bg-primary) border border-(--border-subtle)">
              <div className="text-xs font-semibold text-(--accent-primary)">{item.label}</div>
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle) font-mono text-xs text-(--text-primary)">
                <span className="truncate">{item.command}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  onClick={() => handleCopy(item.command, item.id)}
                  title={copy.copyLabel}
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-(--atom-color-success)" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-(--text-secondary) leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden border border-(--border-subtle) bg-(--bg-primary)">
          <div className="px-4 py-2.5 bg-(--bg-secondary)/60 border-b border-(--border-subtle) flex items-center justify-between text-xs font-mono text-(--text-secondary)">
            <span>{copy.terminalExampleTitle}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(copy.fullWorkflowSnippet, 'full-workflow')}
              className="h-auto py-1 px-2 text-xs"
            >
              {copiedId === 'full-workflow' ? (
                <Check className="w-3.5 h-3.5 mr-1 text-(--atom-color-success)" />
              ) : (
                <Copy className="w-3.5 h-3.5 mr-1" />
              )}
              <span>{copiedId === 'full-workflow' ? copy.copiedLabel : copy.copyLabel}</span>
            </Button>
          </div>
          <CodeHighlight code={copy.fullWorkflowSnippet} language="bash" className="p-4 text-xs font-mono" />
        </Card>
      </section>

      {/* Step 2: Workspace Guide */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-(--accent-primary)">
            {copy.step2Label}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-(--text-primary)">
            {copy.step2Title}
          </h2>
          <p className="text-xs sm:text-sm text-(--text-secondary)">
            {copy.step2DescBefore}
            <code className="font-mono text-xs">http://localhost:4000</code>
            {copy.step2DescAfter}
          </p>
        </div>

        <div className="w-full space-y-4">
          <TabsList className="flex flex-wrap gap-1">
            <TabsTrigger active={activeWorkspace === 'components'} onClick={() => setActiveWorkspace('components')}>
              {copy.tabLabels.components}
            </TabsTrigger>
            <TabsTrigger active={activeWorkspace === 'themes'} onClick={() => setActiveWorkspace('themes')}>
              {copy.tabLabels.themes}
            </TabsTrigger>
            <TabsTrigger active={activeWorkspace === 'palette'} onClick={() => setActiveWorkspace('palette')}>
              {copy.tabLabels.palette}
            </TabsTrigger>
            <TabsTrigger active={activeWorkspace === 'brand'} onClick={() => setActiveWorkspace('brand')}>
              {copy.tabLabels.brand}
            </TabsTrigger>
            <TabsTrigger active={activeWorkspace === 'export'} onClick={() => setActiveWorkspace('export')}>
              {copy.tabLabels.export}
            </TabsTrigger>
          </TabsList>

          <TabsContent active={activeWorkspace === 'components'} className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-(--text-primary)">
              <Cpu className="w-4 h-4 text-(--accent-primary)" />
              <span>{copy.workspaces.components.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
              {copy.workspaces.components.desc}
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-(--text-secondary)">
              <li>{copy.workspaces.components.bullets[0]}</li>
              <li>{copy.workspaces.components.bullets[1]}</li>
            </ul>
          </TabsContent>

          <TabsContent active={activeWorkspace === 'themes'} className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-(--text-primary)">
              <Sliders className="w-4 h-4 text-(--accent-primary)" />
              <span>{copy.workspaces.themes.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
              {copy.workspaces.themes.desc}
            </p>
          </TabsContent>

          <TabsContent active={activeWorkspace === 'palette'} className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-(--text-primary)">
              <Palette className="w-4 h-4 text-(--accent-primary)" />
              <span>{copy.workspaces.palette.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
              {copy.workspaces.palette.desc}
            </p>
          </TabsContent>

          <TabsContent active={activeWorkspace === 'brand'} className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-(--text-primary)">
              <Paintbrush className="w-4 h-4 text-(--accent-primary)" />
              <span>{copy.workspaces.brand.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
              {copy.workspaces.brand.desc}
            </p>
          </TabsContent>

          <TabsContent active={activeWorkspace === 'export'} className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-(--text-primary)">
              <Code2 className="w-4 h-4 text-(--accent-primary)" />
              <span>{copy.workspaces.export.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
              {copy.workspaces.export.desc}
            </p>
          </TabsContent>
        </div>
      </section>

      {/* Step 3: Save & Figma Sync */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-6 space-y-3 border border-(--border-subtle) bg-(--bg-primary)">
          <div className="flex items-center gap-2 text-sm font-bold text-(--text-primary)">
            <RefreshCw className="w-4 h-4 text-(--accent-primary)" />
            <span>{copy.saveTitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
            {copy.saveDescBefore}
            {copy.saveDescMiddle}
            <code className="font-mono text-xs">tokens/tokens.json</code>
            {copy.saveDescAfter}
          </p>
        </Card>

        <Card className="p-6 space-y-3 border border-(--border-subtle) bg-(--bg-primary)">
          <div className="flex items-center gap-2 text-sm font-bold text-(--text-primary)">
            <Layers className="w-4 h-4 text-(--accent-primary)" />
            <span>{copy.figmaTitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
            {copy.figmaDescBefore}
            {copy.figmaDescMiddle}
            <code className="font-mono text-xs">localhost:4000</code>
            {copy.figmaDescAfter}
          </p>
        </Card>
      </section>

      {/* Step 4: CLI Cheatsheet */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <FolderSync className="w-4 h-4 text-(--accent-primary)" />
          <h2 className="text-lg sm:text-xl font-bold text-(--text-primary)">
            {copy.cliTableTitle}
          </h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{copy.cliTableCommandHeader}</TableHead>
              <TableHead>{copy.cliTablePurposeHeader}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {copy.cliCheatsheet.map((row) => (
              <TableRow key={row.command}>
                <TableCell className="font-mono text-xs text-(--text-primary)">
                  {row.command}
                </TableCell>
                <TableCell className="text-xs sm:text-sm text-(--text-secondary)">
                  {row.purpose}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
