export interface DesignPrinciple {
  id: string;
  category: 'core' | 'token' | 'architecture' | 'accessibility' | 'agent';
  number: string;
  title: string;
  subtitle: string;
  description: string;
  dos: string[];
  donts: string[];
  w3cRef?: string;
}

export const PRINCIPLES_DATA: DesignPrinciple[] = [
  {
    id: 'ssot',
    category: 'core',
    number: '01',
    title: '단일 진실 공급원 (Single Source of Truth)',
    subtitle: '모든 디자인 결정은 단 하나의 데이터 규격에서 파생됩니다.',
    description:
      'Figma, 마크다운 가이드, JSON 토큰 파일 중 어느 하나가 기준이 되면 시스템 전체의 코드가 자동 생성되어야 합니다. 개발자가 임의로 HEX 코드나 매직 넘버를 컴포넌트 내부에 하드코딩하는 것을 엄격히 금지합니다.',
    dos: [
      '모든 색상, 여백, 곡률은 반드시 var(--atom-*) 시맨틱 토큰을 참조합니다.',
      '신규 스타일이 필요할 경우 토큰 명세서(tokens.json)에 먼저 추가합니다.',
    ],
    donts: [
      '컴포넌트 CSS/Tailwind에 #3182F6, 16px 등의 원천 값을 인라인으로 직접 작성하지 않습니다.',
      '페이지별로 유사한 역할을 하는 독립적인 테마 변수를 중복 선언하지 않습니다.',
    ],
    w3cRef: 'W3C DTCG Format Specification §1.1',
  },
  {
    id: 'zero-runtime',
    category: 'core',
    number: '02',
    title: '제로 런타임 오버헤드 (Zero Runtime Overhead)',
    subtitle: '브라우저 런타임 계산을 최소화하고 브라우저 네이티브 기능을 활용합니다.',
    description:
      'CSS-in-JS의 런타임 파싱 비용, 자바스크립트 번들 팽창을 방지합니다. 네이티브 CSS Custom Properties(--*)와 정적 유틸리티 클래스로 사전 컴파일하여 0ms의 스타일 주입 속도를 보장합니다.',
    dos: [
      'CSS 표준 변수를 사용하여 브라우저 엔진 레벨에서 즉각적인 테마 전환을 수행합니다.',
      '정적 CSS 파일로 번들링하여 초기 페인트(FCP) 성능을 극대화합니다.',
    ],
    donts: [
      '런타임에 스타일 객체를 매번 연산하여 주입하는 무거운 동적 CSS 라이브러리에 의존하지 않습니다.',
      '테마 변경 시 컴포넌트 전체를 리렌더링하는 전역 상태 구독을 남용하지 않습니다.',
    ],
    w3cRef: 'Performance Budget & Core Web Vitals Standard',
  },
  {
    id: 'three-tier',
    category: 'architecture',
    number: '03',
    title: '3계층 토큰 아키텍처 (3-Tier Token Hierarchy)',
    subtitle: '원천 토큰(Global) -> 의도 토큰(Semantic) -> 컴포넌트 토큰(Component)',
    description:
      '원천 값과 컴포넌트 스타일 사이에 반드시 "의도(Semantic)" 계층을 둡니다. 시맨틱 계층이 존재해야만 다크 모드, 고대비 모드, 멀티 브랜드 테마 변경 시 컴포넌트 코드를 한 줄도 수정하지 않고 스타일을 일괄 전환할 수 있습니다.',
    dos: [
      'UI 스타일링 시 항상 Tier 2(Semantic: --atom-bg-surface, --atom-color-primary)를 최우선으로 사용합니다.',
      '다크 테마에서는 Tier 1(팔레트)을 바꾸는 것이 아니라 Tier 2의 참조 링크만 스위칭합니다.',
    ],
    donts: [
      '컴포넌트에서 Tier 1 원천 토큰(var(--blue-500))을 직접 참조하지 않습니다.',
      '컴포넌트 토큰(Tier 3)을 범용 레이아웃 스타일에 무분별하게 혼용하지 않습니다.',
    ],
    w3cRef: 'W3C DTCG 2025.10 §3 Alias & Inheritance',
  },
  {
    id: 'framework-agnostic',
    category: 'token',
    number: '04',
    title: '프레임워크 불가지론 (Framework-Agnostic)',
    subtitle: 'React, Vue, Svelte, Angular, Vanilla HTML 어디서나 100% 동일하게 동작합니다.',
    description:
      '디자인 시스템은 특정 자바스크립트 프레임워크에 종속되어서는 안 됩니다. CSS 표준과 웹 표준을 기반으로 구축되어 모노레포 내 여러 기술 스택이 혼재하더라도 완벽한 디자인 일관성을 유지합니다.',
    dos: [
      '웹 표준 CSS 변수와 표준 HTML5 시맨틱 엘리먼트를 기준으로 설계합니다.',
      '바닐라 자바스크립트나 레거시 jQuery 환경에서도 클래스명만으로 동일 스타일을 재현할 수 있게 합니다.',
    ],
    donts: [
      '특정 프레임워크(React hook 등)가 없으면 스타일이 깨지는 비표준 의존성을 생성하지 않습니다.',
    ],
  },
  {
    id: 'predictable-naming',
    category: 'token',
    number: '05',
    title: '예측 가능한 명명 규격 (Predictable Naming Convention)',
    subtitle: '카테고리-개념-변형-상태 순으로 명확하게 계층화된 네이밍을 준수합니다.',
    description:
      '토큰의 이름을 보면 어떤 유형이며 어디에 쓰이는지 개발자와 디자이너가 직관적으로 알 수 있어야 합니다. W3C DTCG의 네이밍 권고에 따라 [namespace]-[category]-[concept]-[variant]-[state] 형태를 표준으로 삼습니다.',
    dos: [
      '규격에 맞춘 명확한 네이밍(예: --atom-color-primary-hover, --atom-space-4)을 사용합니다.',
      '단축어 축약보다 명확한 의미 전달을 우선합니다.',
    ],
    donts: [
      '개인적인 선호에 따른 자의적 축약(예: --at-clr-pr-h)을 사용하지 않습니다.',
      '문맥이 없는 모호한 이름(예: --atom-color-1, --atom-size-box)을 선언하지 않습니다.',
    ],
    w3cRef: 'W3C DTCG Specification §2 Token Names',
  },
  {
    id: 'accessibility',
    category: 'accessibility',
    number: '06',
    title: '접근성 보장 (Accessibility by Default)',
    subtitle: '모든 시맨틱 색상 쌍은 WCAG 2.1 AA 기준 4.5:1 이상의 명도 대비를 만족합니다.',
    description:
      '접근성은 나중에 추가하는 기능이 아니라 디자인 토큰 생성 시점에 자동으로 검증되어야 하는 기본 원칙입니다. 배경색과 전경 텍스트 색상의 토큰 페어링은 기본적으로 높은 가독성을 보장합니다.',
    dos: [
      '텍스트와 배경 토큰 결합 시 4.5:1(일반 텍스트) 또는 3:1(대형 텍스트) 명도 대비를 확인합니다.',
      '색상 구분에만 의존하지 않고 시각적 힌트(아이콘, 밑줄, 명도 차이)를 병행합니다.',
    ],
    donts: [
      '포커스 링(Focus Ring) 및 아웃라인을 임의로 제거(outline: none)하지 않습니다.',
      '흐린 회색 텍스트 토큰을 본문 필수 정보 표시에 남용하지 않습니다.',
    ],
    w3cRef: 'W3C Web Content Accessibility Guidelines (WCAG 2.1 AA)',
  },
  {
    id: 'anti-pattern-prevention',
    category: 'core',
    number: '07',
    title: '정갈한 AI 안티패턴 방어 (Anti-Pattern Prevention & Polish)',
    subtitle: 'AI 슬롭(AI Slop)을 원천 차단하고 불필요한 장식을 덜어낸 정갈한 본질을 추구합니다.',
    description:
      'Impeccable 디자인 철학에 기반하여 LLM이 양산하는 클리셰적 디자인 왜곡을 엄격히 방어합니다. 과도한 네온 그라디언트, 촌스러운 단면 테두리, 불필요한 바운스 모션을 지양하고 담백하며 정돈된 모던 인터페이스를 완성합니다.',
    dos: [
      '상태 표시는 굵은 단면 테두리 대신 은은한 1px 보더, 상태 도트/아이콘, 부드러운 틴트 배경을 활용합니다.',
      '모션은 튀는 바운스(bounce) 대신 자연스러운 감속 이징(ease-out, 200~300ms)과 미세한 페이드/스케일을 적용합니다.',
      '코드 커밋 전 `npm run lint:design` (impeccable detect)을 통해 디자인 결함을 무비용(0-Token)으로 정적 검증합니다.',
    ],
    donts: [
      '카드나 콜아웃, 사이드바에 굵은 좌측 테두리(border-l-4 등 Side-tab tell)를 남발하지 않습니다.',
      '시각적 피로감을 유발하는 무의미한 보라색 그라디언트나 과도한 드롭 섀도를 인라인 하드코딩하지 않습니다.',
      '시각적 위계와 무관하게 모든 요소를 둥근 플로팅 카드로 감싸는 레이아웃 남용을 피합니다.',
    ],
    w3cRef: 'Impeccable Design Quality Standards & Zero-Slop Heuristics',
  },
  {
    id: 'ai-governance-pipeline',
    category: 'agent',
    number: '08',
    title: 'AI 운영 원칙: 4단계 레고 조립 파이프라인 (AI Agent Pipeline)',
    subtitle: '토큰(Tokens) ➔ 컴포넌트(Components) ➔ 블록(Blocks) ➔ UX패턴(Patterns)',
    description:
      '모든 AI 어시스턴트(Cursor, Claude Code, Antigravity, Copilot)는 복잡한 화면을 생성할 때 한 번에 거대한 코드를 작성하지 않고, 반드시 검증된 4단계 조립 파이프라인을 순차적으로 거쳐야 합니다. 새 UI 요소가 필요하면 기초 원자 컴포넌트부터 생성한 후 블록으로 합성하는 [컴포넌트 우선 원칙(Component-First)]을 엄수합니다.',
    dos: [
      '새 UI를 만들 때 components/ui/에 원자 컴포넌트를 먼저 정의하고, 이를 import하여 조립합니다.',
      '모든 스타일은 반드시 CSS 변수(var(--atom-*), var(--text-primary))를 사용합니다.',
      '빈 데이터(Empty), 로딩(Skeleton), 에러, 키보드 접근성(A11y) 4대 상태를 필수로 구현합니다.',
    ],
    donts: [
      '컴포넌트 단계를 건너뛰고 블록이나 페이지에 임의의 원시 태그(<button>, <div class="rounded-lg...">)를 날림으로 하드코딩하지 않습니다.',
      'Tailwind 임의 컬러(text-blue-500, bg-gray-100 등)를 인라인으로 직접 작성하지 않습니다.',
    ],
    w3cRef: 'AGENTS.md & W3C DTCG Component Composition Spec',
  },
  {
    id: 'ai-roles-skills',
    category: 'agent',
    number: '09',
    title: '4대 AI 전문 역할 & 에이전트 스킬 활용 체계 (AI Roles & Skills)',
    subtitle: 'token-guardian, component-architect, block-designer, docs-curator 협업 시스템',
    description:
      'AtomSystem은 단일 모델의 환각을 방지하기 위해 4대 전문 역할로 책임을 분리합니다: 1) token-guardian(W3C 토큰 무결성 감시 및 하드코딩 차단), 2) component-architect(순수 원자 컴포넌트 설계), 3) block-designer(컴포넌트 조립 및 완성형 UX 블록 구축), 4) docs-curator(레고 조립 문서화 및 E2E 검증). `npx atomsystem init` 시 `.agents/skills/atomsystem/SKILL.md`가 자동 설치되어 AI가 이 모든 역할을 자율적으로 수행합니다.',
    dos: [
      'AI에게 작업 지시 시 "컴포넌트 우선 원칙으로 조립해줘" 또는 "atom.design.md 토큰을 준수해줘"라고 명시합니다.',
      '코드 변경 후 공식 `npm run lint:design` (impeccable detect)을 통해 AI 작업물의 무결성과 디자인 품질을 정적 검증합니다.',
      'AI가 디자인 가이드 Markdown(토스, 당근, 커스텀)을 읽어 W3C tokens.json으로 빌드하도록 스킬을 호출합니다.',
    ],
    donts: [
      '500줄 이상의 거대한 모놀리식 단일 컴포넌트 작성을 AI에게 요구하거나 방치하지 않습니다.',
      '도메인 데이터를 페이지 컴포넌트 내부에 직접 인라인으로 하드코딩하게 두지 않습니다.',
    ],
    w3cRef: 'Universal AI Agent Guidelines (GEMINI.md & CLAUDE.md)',
  },
];
