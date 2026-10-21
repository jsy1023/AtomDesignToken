export interface FrameworkSnippet {
  id: string;
  name: string;
  icon: string;
  description: string;
  badge: string;
  code: string;
  language: string;
  fileName: string;
  tips: string[];
}

export interface BestPracticePrinciple {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  badge: string;
  problem: string;
  solution: string;
  keyRule: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
  badge: string;
  command?: string;
  icon: string;
}

export const LIBRARY_PHILOSOPHY: {
  headline: string;
  subheadline: string;
  introText: string;
  principles: BestPracticePrinciple[];
} = {
  headline: "수레바퀴를 다시 만들지 마세요. 바퀴를 스마트하게 굴리세요.",
  subheadline: "라이브러리는 '새로운 것의 발명'이 아닌, '검증된 패턴의 체계화와 재사용'입니다.",
  introText: "모든 웹 프로젝트마다 버튼 스타일, 색상 규칙, 모달 반응형 로직을 바닥부터 새로 작성하는 것은 엄청난 낭비입니다. AtomSystem은 W3C 표준과 검증된 UI 패턴을 CSS 한 줄과 AI 에이전트로 연결해 줍니다.",
  principles: [
    {
      id: "no-reinvention",
      title: "바닥부터 다시 만들지 않기 (Don't Reinvent the Wheel)",
      subtitle: "검증된 표준 토큰과 UI 패턴을 활용한 조합 우선",
      icon: "RotateCcw",
      color: "emerald",
      badge: "핵심 원칙 1",
      problem: "프로젝트마다 매번 버튼, 인풋, 모달, 컬러 팔레트를 바닥부터 새로 코딩하다가 마감 직전에 디자인이 틀어짐.",
      solution: "W3C DTCG 표준 토큰과 atom-ui.css의 검증된 시멘틱 클래스를 가져다 쓰고, 비즈니스 로직에 집중합니다.",
      keyRule: "HTML 표준 태그 + .atom-btn / .atom-card 같은 시멘틱 클래스 조합으로 90% 완성"
    },
    {
      id: "framework-agnostic",
      title: "프레임워크 종속 탈피 (Universal Compatibility)",
      subtitle: "React, Vue, jQuery, Vanilla HTML 어디서나 100% 동일",
      icon: "Layers",
      color: "blue",
      badge: "핵심 원칙 2",
      problem: "MUI는 React에서만, Vuetify는 Vue에서만 동작하여 사내 레거시 시스템이나 신규 기술스택 통합이 불가능함.",
      solution: "순수 브라우저 표준인 CSS Custom Properties(var(--atom-...))를 기반으로 작동하여 프레임워크가 바뀌어도 UI가 유지됩니다.",
      keyRule: "CSS 한 줄 링크만 걸면 React든 HTML/JSP든 동일한 룩앤필 제공"
    },
    {
      id: "single-source-truth",
      title: "단일 진실 공급원 (Single Source of Truth)",
      subtitle: "마크다운 가이드 한 장으로 전체 프로젝트 일괄 동기화",
      icon: "Database",
      color: "purple",
      badge: "핵심 원칙 3",
      problem: "디자인 테마나 브랜드 컬러가 바뀌면 CSS와 TSX 파일 수백 개를 손으로 일일이 찾아 고치다가 누락 발생.",
      solution: "tokens.json이나 presets/*.md 파일에서 브랜드 색상 하나만 바꾸면 Style Dictionary 컴파일러가 모든 컴포넌트에 즉시 반영합니다.",
      keyRule: "브랜드 색상 1곳 수정 = 웹사이트 전체 자동 리테마"
    },
    {
      id: "agent-native",
      title: "AI 에이전트와 페어링 (Agent-Native Workflow)",
      subtitle: "수천 줄의 설정 파일 대신 자연어 마크다운 지시",
      icon: "Sparkles",
      color: "amber",
      badge: "핵심 원칙 4",
      problem: "디자인 시스템을 도입하려면 피그마 플러그인 학습, 복잡한 CLI 설정, 긴 문서 독파가 필요해 도입 장벽이 높음.",
      solution: "AI Agent(Cursor, Claude, Antigravity)에게 'presets/toss.md 스타일로 결제 카드 UI 만들어줘'라고 지시하면 토큰 규격에 맞게 자동 빌드됩니다.",
      keyRule: "마크다운 가이드 제시 ➔ Agent가 토큰 및 반응형 UI 자동 조립"
    }
  ]
};

export const FRAMEWORK_SNIPPETS: FrameworkSnippet[] = [
  {
    id: "react-next",
    name: "React / Next.js",
    icon: "Atom",
    badge: "가장 추천",
    description: "App Router 및 Pages Router 어디서든 CSS 한 줄 임포트와 타입 지원 토큰 유틸을 함께 활용합니다.",
    fileName: "app/components/PaymentCard.tsx",
    language: "tsx",
    tips: [
      "globals.css 또는 Root Layout에서 'atomsystem/css/atom-ui.css'를 단 1회 import 하세요.",
      "복잡한 CSS-in-JS 없이 .atom-card, .atom-btn 등 시멘틱 클래스만 지정하면 테마가 자동 주입됩니다.",
      "동적 스타일이 필요할 때는 인라인 스타일에 var(--atom-primary) CSS 변수를 직접 활용할 수 있습니다."
    ],
    code: `import 'atomsystem/css/atom-ui.css';
import { Sparkles, ArrowRight } from 'lucide-react';

export function PaymentSummaryCard() {
  return (
    <div className="atom-card atom-card-interactive max-w-md p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="atom-badge atom-badge-primary flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          VIP 구독 플랜
        </span>
        <span className="atom-caption text-neutral-400">월간 자동 결제</span>
      </div>

      <h3 className="atom-title-2 mb-2">프리미엄 워크스페이스</h3>
      <p className="atom-body-2 text-neutral-600 dark:text-neutral-400 mb-6">
        AI 에이전트 무제한 토큰 생성 및 실시간 협업 도구를 제공합니다.
      </p>

      <div className="flex gap-3">
        <button className="atom-btn atom-btn-primary flex-1">
          지금 구독하기
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
        <button className="atom-btn atom-btn-secondary">
          혜택 보기
        </button>
      </div>
    </div>
  );
}`
  },
  {
    id: "vue",
    name: "Vue 3 / Nuxt",
    icon: "Code2",
    badge: "Vue 생태계 완벽 지원",
    description: "Composition API 및 템플릿 어디서나 별도의 플러그인 등록 없이 즉시 클래스를 선언합니다.",
    fileName: "src/components/UserProfile.vue",
    language: "vue",
    tips: [
      "main.ts 또는 App.vue에서 'atomsystem/css/atom-ui.css'를 import 하세요.",
      "Scoped CSS 안에서도 :deep()이나 글로벌 설정 없이 .atom-* 클래스가 완벽히 보존됩니다.",
      "v-bind:class와 조합하여 토큰 변형(variant)을 손쉽게 바인딩할 수 있습니다."
    ],
    code: `<template>
  <div class="atom-card p-6 max-w-sm">
    <div class="flex items-center gap-4 mb-4">
      <div class="atom-avatar w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center font-bold text-blue-600">
        SY
      </div>
      <div>
        <h4 class="atom-title-3">시스템 관리자</h4>
        <span class="atom-badge atom-badge-success">활성 상태</span>
      </div>
    </div>

    <div class="space-y-3">
      <input 
        v-model="displayName" 
        type="text" 
        class="atom-input w-full" 
        placeholder="표시될 닉네임 입력" 
      />
      <button @click="saveProfile" class="atom-btn atom-btn-primary w-full">
        프로필 설정 저장
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import 'atomsystem/css/atom-ui.css';

const displayName = ref('디자인 엔지니어');
const saveProfile = () => {
  alert('설정이 저장되었습니다: ' + displayName.value);
};
</script>`
  },
  {
    id: "vanilla-html",
    name: "Pure HTML & jQuery",
    icon: "Globe",
    badge: "무설치 / 레거시 완벽 호환",
    description: "번들러(Vite, Webpack)나 Node.js 환경이 전혀 없는 순수 HTML, JSP, PHP 환경에서도 링크 태그 하나로 동작합니다.",
    fileName: "index.html",
    language: "html",
    tips: [
      "node_modules 또는 CDN의 'atomsystem/css/atom-ui.css'를 <head> 태그에 링크하세요.",
      "jQuery의 $('#btn').addClass('atom-btn-primary') 같은 동적 조작도 아무런 제약 없이 작동합니다.",
      "기존 스타일과의 충돌을 방지하기 위해 모든 클래스는 'atom-' 접두사 네임스페이스를 가집니다."
    ],
    code: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>AtomSystem Vanilla Example</title>
  <!-- 1. CSS 단 한 줄 로드 -->
  <link rel="stylesheet" href="./node_modules/atomsystem/css/atom-ui.css">
</head>
<body style="padding: 40px; background: #f8fafc;">

  <!-- 2. 시멘틱 클래스로 즉시 조립 -->
  <div class="atom-card" style="max-width: 480px; margin: 0 auto;">
    <h2 class="atom-title-2">환영합니다!</h2>
    <p class="atom-body-2" style="margin: 12px 0 20px;">
      자바스크립트 빌드 도구 없이도 동일한 현대적 UI와 마이크로 인터랙션을 누릴 수 있습니다.
    </p>

    <div style="display: flex; gap: 8px;">
      <button class="atom-btn atom-btn-primary" onclick="alert('확인되었습니다!')">
        표준 버튼 동작
      </button>
      <button class="atom-btn atom-btn-secondary">
        취소
      </button>
    </div>
  </div>

</body>
</html>`
  },
  {
    id: "ai-prompt",
    name: "AI Agent 연동",
    icon: "Bot",
    badge: "Agent-Native",
    description: "Cursor, Claude, Copilot, Antigravity 등의 AI Agent에게 복사해서 전달할 수 있는 최적의 프롬프트 템플릿입니다.",
    fileName: "AGENT_PROMPT.md",
    language: "markdown",
    tips: [
      "AI에게 'atomsystem/css/atom-ui.css'의 클래스명 컨벤션을 명시해 주면 오작동 없이 완벽한 시멘틱 UI를 만들어 냅니다.",
      "사내 커스텀 가이드(예: presets/toss.md)를 함께 컨텍스트로 제공하면 브랜드 컬러와 라운딩이 자동으로 일치합니다.",
      "Playwright E2E 테스트 코드까지 함께 작성을 요청하여 완성도를 보장할 수 있습니다."
    ],
    code: `### AI Agent 작업 요청 프롬프트 (그대로 복사하여 사용하세요)

\`\`\`markdown
너는 UI/UX 프론트엔드 전문 엔지니어다.
본 프로젝트는 'atomsystem' 디자인 시스템을 기반으로 구축되어 있다.

[규칙 및 컨벤션]
1. 모든 컴포넌트의 스타일은 'atomsystem/css/atom-ui.css'의 시멘틱 클래스를 우선 사용한다.
   - 버튼: .atom-btn, .atom-btn-primary, .atom-btn-secondary, .atom-btn-outline
   - 카드: .atom-card, .atom-card-interactive
   - 인풋: .atom-input
   - 뱃지: .atom-badge, .atom-badge-primary, .atom-badge-success
   - 타이포: .atom-title-1, .atom-title-2, .atom-body-1, .atom-body-2, .atom-caption
2. 임의의 ad-hoc 색상 헥스코드를 하드코딩하지 않고 CSS 변수(var(--atom-primary) 등)를 참조한다.
3. 반응형 및 모바일 접근성(A11y, ARIA)을 기본 적용한다.

[구현할 태스크]
- 다음 요구사항에 맞는 사용자 대시보드 요약 위젯 컴포넌트를 작성해줘:
  - 총 주문 건수, 승인 대기, 오류 알림 카드 3개 그리드 배치
  - '필터 적용' 액션 버튼 및 검색 인풋 창 포함
\`\`\``
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "패키지 설치 or CSS 링크",
    desc: "npm을 통해 프로젝트에 추가하거나 HTML에 CSS 파일 하나만 링크합니다.",
    badge: "1초 세팅",
    command: "npm i atomsystem",
    icon: "DownloadCloud"
  },
  {
    step: "02",
    title: "원하는 디자인 프리셋 선택",
    desc: "토스 스타일(toss.md), 당근 스타일(daangn.md), 또는 나만의 브랜드 컬러를 1곳에 정의합니다.",
    badge: "SSOT 원칙",
    command: "npx atomsystem build",
    icon: "Sliders"
  },
  {
    step: "03",
    title: "시멘틱 클래스로 UI 조립",
    desc: "바닥부터 CSS를 짜지 않고 atom-btn, atom-card 등의 클래스만 붙여 최고 품질의 화면을 완성합니다.",
    badge: "수레바퀴 재사용",
    command: "<button class='atom-btn atom-btn-primary'>완성</button>",
    icon: "CheckCircle"
  }
];

export interface AgentReferenceStep {
  step: string;
  stageName: string;
  title: string;
  summary: string;
  icon: string;
  color: string;
  badge: string;
  referencedFiles: { name: string; path: string; role: string }[];
  inputPrompt: string;
  aiThinking: string;
  outputCode: string;
  outputLanguage: string;
}

export const AI_REFERENCE_PIPELINE: {
  headline: string;
  subheadline: string;
  description: string;
  steps: AgentReferenceStep[];
} = {
  headline: "AI Agent는 이 라이브러리를 어떻게 참조하고 해석할까요?",
  subheadline: "자연어 프롬프트가 단 하나의 오차도 없는 프로덕션 코드가 되는 4단계 원리",
  description: "AI가 웹에서 무작위 CSS를 환각(Hallucination)해내는 것이 아닙니다. AtomSystem의 표준 토큰 명세(SSOT)와 규칙 문서를 실시간으로 스캔하여 결정론적(Deterministic)으로 검증된 UI 코드를 합성합니다.",
  steps: [
    {
      step: "01",
      stageName: "컨텍스트 인입 (Ingestion)",
      title: "디자인 가이드 마크다운 및 개발 규칙 주입",
      summary: "AI가 presets/*.md와 GEMINI.md를 스캔하여 브랜드 색상, 라운딩, 타이포그래피 규칙을 우선 학습합니다.",
      icon: "FileSearch",
      color: "blue",
      badge: "Step 1: 지식 스캔",
      referencedFiles: [
        { name: "presets/toss.md", path: "presets/toss.md", role: "브랜드 비주얼 가이드 (색상, 여백, 라운딩 규격)" },
        { name: "GEMINI.md", path: "GEMINI.md", role: "SOLID 원칙 및 컴포넌트 분할/테스트 아키텍처 규칙" }
      ],
      inputPrompt: "사용자: '토스 스타일로 간편 송금 확인 모달 컴포넌트를 만들어줘.'",
      aiThinking: "Agent 추론: presets/toss.md를 스캔하여 Primary Color(#3182f6), 라운딩 16px, 볼드 타이포그래피 규칙을 로드하고, GEMINI.md의 SRP 원칙에 따라 데이터와 뷰를 분리할 계획을 세웁니다.",
      outputCode: `// 1. Agent가 로드한 토스 프리셋 가이드 컨텍스트
{
  "brand": "toss",
  "primaryColor": "#3182f6",
  "borderRadius": "16px",
  "typography": { "title": "24px / bold", "body": "15px / regular" }
}`,
      outputLanguage: "json"
    },
    {
      step: "02",
      stageName: "토큰 매핑 (Token Resolution)",
      title: "W3C DTCG 토큰 & 시멘틱 CSS 클래스 매핑",
      summary: "임의의 하드코딩 헥스코드를 쓰지 않고, css/atom-ui.css의 .atom-* 클래스와 var(--atom-*) 변수를 매핑합니다.",
      icon: "Cpu",
      color: "emerald",
      badge: "Step 2: 시멘틱 매핑",
      referencedFiles: [
        { name: "css/atom-ui.css", path: "css/atom-ui.css", role: "표준 시멘틱 UI 클래스 (.atom-btn, .atom-card, .atom-modal)" },
        { name: "lib/data/tokens.ts", path: "lib/data/tokens.ts", role: "W3C DTCG 표준 토큰 메타데이터 및 타입 정의" }
      ],
      inputPrompt: "Agent 매핑 엔진: '컴포넌트의 버튼과 컨테이너에 어떤 클래스를 적용해야 할까?'",
      aiThinking: "Agent 추론: 버튼에는 .atom-btn + .atom-btn-primary를 결합하고, 카드 컨테이너에는 .atom-card를 지정한다. 색상은 var(--atom-primary)를 사용하므로 추후 테마 변경 시 자동 반영된다.",
      outputCode: `/* 2. Agent가 참조한 표준 라이브러리 CSS */
.atom-btn {
  display: inline-flex;
  align-items: center;
  border-radius: var(--atom-radius-base);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.atom-btn-primary {
  background-color: var(--atom-primary);
  color: #ffffff;
}`,
      outputLanguage: "css"
    },
    {
      step: "03",
      stageName: "코드 합성 (Code Synthesis)",
      title: "프레임워크 무관 고접근성 시멘틱 컴포넌트 생성",
      summary: "React/Next.js, Vue, HTML 등 사용자의 프레임워크에 맞추어 ARIA 접근성을 준수한 완성형 UI를 조립합니다.",
      icon: "Sparkles",
      color: "purple",
      badge: "Step 3: 코드 생성",
      referencedFiles: [
        { name: "src/index.ts", path: "src/index.ts", role: "라이브러리 Public API 엔트리포인트" },
        { name: "lib/data/patterns.ts", path: "lib/data/patterns.ts", role: "검증된 UX 패턴 명세 (모달, 폼, 피드)" }
      ],
      inputPrompt: "Agent 합성 엔진: 'React TSX 코드로 조립 완료'",
      aiThinking: "Agent 추론: 웹 접근성(role='dialog', aria-modal)을 부여하고, 외부 종속성 없이 atom-ui.css 클래스로만 시각적 계층을 완성합니다.",
      outputCode: `// 3. Agent가 라이브러리를 참조하여 최종 합성한 컴포넌트
import 'atomsystem/css/atom-ui.css';

export function TransferModal({ amount, toAccount, onConfirm }: TransferProps) {
  return (
    <div className="atom-modal-backdrop" role="dialog" aria-modal="true">
      <div className="atom-card atom-modal max-w-sm p-6">
        <h3 className="atom-title-2 mb-2">{toAccount} 님께</h3>
        <p className="text-2xl font-black mb-6">{amount.toLocaleString()}원을 보낼까요?</p>
        <button onClick={onConfirm} className="atom-btn atom-btn-primary w-full">
          보내기
        </button>
      </div>
    </div>
  );
}`,
      outputLanguage: "tsx"
    },
    {
      step: "04",
      stageName: "자가 검증 (Self-Verification)",
      title: "Playwright E2E 테스트 자동 작성 및 실행 검증",
      summary: "코드를 작성한 것으로 끝나지 않고, 컴포넌트 렌더링과 클릭/입력 인터랙션을 Playwright로 실행해 오류를 자가 검증합니다.",
      icon: "ShieldCheck",
      color: "amber",
      badge: "Step 4: E2E 자가 검증",
      referencedFiles: [
        { name: "e2e/*.spec.ts", path: "e2e/", role: "Playwright 브라우저 E2E 인터랙션 검증 테스트" },
        { name: "playwright.config.ts", path: "playwright.config.ts", role: "데스크톱/모바일 멀티 뷰포트 환경 설정" }
      ],
      inputPrompt: "Agent 검증 엔진: 'npx playwright test로 컴포넌트가 실제로 잘 뜨고 동작하는지 확인'",
      aiThinking: "Agent 추론: Playwright를 실행하여 모달 렌더링, 금액 표시, 확인 버튼 클릭 이벤트가 데스크톱/모바일 모두에서 정상 통과(Exit Code 0)하는지 확인한 뒤 사용자에게 완료를 보고합니다.",
      outputCode: `// 4. Agent가 스스로 실행하는 E2E 검증 코드
import { test, expect } from '@playwright/test';

test('간편 송금 모달 인터랙션 및 금액 표시 검증', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.atom-modal')).toBeVisible();
  await expect(page.getByRole('button', { name: '보내기' })).toBeVisible();
  await page.getByRole('button', { name: '보내기' }).click();
  await expect(page.getByText('송금 완료')).toBeVisible();
});`,
      outputLanguage: "typescript"
    }
  ]
};
