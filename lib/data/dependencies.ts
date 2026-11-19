export interface DependencyItem {
  name: string;
  category: 'runtime' | 'build' | 'type' | 'dev';
  version: string;
  purpose: string;
  whyChosen: string;
  bundleImpact: string;
  docsUrl: string;
}

export interface CompatibilityItem {
  framework: string;
  supportedVersions: string;
  integrationMethod: string;
  overhead: string;
  status: 'Full' | 'Universal';
}

export interface AgentSkillItem {
  id: string;
  name: string;
  path: string;
  category: 'core' | 'quality' | 'discovery' | 'optimization';
  role: string;
  description: string;
  triggers: string[];
  docsPath: string;
}

export const AGENT_SKILLS: AgentSkillItem[] = [
  {
    id: 'atomsystem',
    name: 'AtomSystem Universal Token & UI Engine',
    path: '.agents/skills/atomsystem/SKILL.md',
    category: 'core',
    role: '디자인 토큰 파싱 & 컴포넌트 자동 빌드 에이전트',
    description: '디자인 가이드 Markdown(토스, 당근, 커스텀 .md) 및 W3C DTCG 스펙을 분석하여 tokens/tokens.json을 생성/빌드하고, React/Vue/HTML을 위한 고접근성 컴포넌트를 조립합니다.',
    triggers: ['/atomsystem', '디자인 시스템 구축', '토큰 컴파일', '컴포넌트화해줘'],
    docsPath: '.agents/skills/atomsystem/SKILL.md',
  },
  {
    id: 'strict-components',
    name: 'Strict Components Guardian',
    path: '.agents/skills/strict-components/SKILL.md',
    category: 'quality',
    role: '원시 태그 차단 및 Zero-Hardcoding 품질 감사',
    description: '원시 HTML 태그(<button>, <input>, <select>, <textarea>, <table>)의 무분별한 사용을 전면 차단하고, @/components/ui 공식 컴포넌트 및 시맨틱 CSS 변수 강제 사용을 검증/리팩토링합니다.',
    triggers: ['/strict-components', 'npm run lint:components', '하드코딩 정리해줘', '원시 태그 검사'],
    docsPath: '.agents/skills/strict-components/SKILL.md',
  },
  {
    id: 'impeccable',
    name: 'Impeccable Frontend Design & UX Craft',
    path: '.agents/skills/impeccable/SKILL.md',
    category: 'core',
    role: '프론트엔드 UX 디자인 셰이핑 및 디테일 폴리싱',
    description: '레이아웃, 타이포그래피, 컬러, 모션, UX 카피, 반응형 및 고접근성 인터페이스를 비평(critique)하고 최고 수준의 시각적 완성도로 폴리싱합니다.',
    triggers: ['/impeccable', 'UI 개선', '디자인 폴리싱', '대시보드 디자인'],
    docsPath: '.agents/skills/impeccable/SKILL.md',
  },
  {
    id: 'vercel-react-best-practices',
    name: 'Vercel React & Next.js Performance Guide',
    path: '.agents/skills/vercel-react-best-practices/SKILL.md',
    category: 'optimization',
    role: 'React/Next.js 15 런타임 성능 및 번들 최적화',
    description: 'Vercel 엔지니어링 표준에 따른 서버/클라이언트 컴포넌트 분리, 불필요한 리렌더 방지, 번들 다이어트 및 Web Vitals 최적화 가이드를 제공합니다.',
    triggers: ['Next.js 최적화', '리렌더 방지', '번들 최적화', '서버 컴포넌트 리팩토링'],
    docsPath: '.agents/skills/vercel-react-best-practices/SKILL.md',
  },
  {
    id: 'find-skills',
    name: 'Agent Skills Discovery & Marketplace',
    path: '.agents/skills/find-skills/SKILL.md',
    category: 'discovery',
    role: '에이전트 스킬 탐색 및 자동 매핑',
    description: '작업 맥락과 기술 스택에 최적화된 새로운 에이전트 스킬을 탐색하고 프로젝트 환경에 즉시 연결할 수 있도록 지원합니다.',
    triggers: ['/find-skills', '스킬 찾아줘', '에이전트 확장 기능'],
    docsPath: '.agents/skills/find-skills/SKILL.md',
  },
  {
    id: 'ponytail',
    name: 'Ponytail Lazy Senior Dev Mode',
    path: '~/.gemini/config/skills/ponytail/SKILL.md',
    category: 'quality',
    role: '불필요한 복잡도 및 오버엔지니어링 제거 (YAGNI)',
    description: '가장 간결하고 본질적인 최소한의 코드 변경으로 문제를 해결하며, 유지보수 부채를 최소화하는 시니어 엔지니어 관점의 코드 솔루션을 제안합니다.',
    triggers: ['/ponytail', '간결하게 해결해줘', '오버엔지니어링 방지', 'yagni'],
    docsPath: '~/.gemini/config/skills/ponytail/SKILL.md',
  },
];

export const DEPENDENCY_ITEMS: DependencyItem[] = [
  {
    name: 'Vanilla CSS Custom Properties',
    category: 'runtime',
    version: 'CSS3 Native Standard',
    purpose: '디자인 토큰 주입 및 실시간 런타임 테마 전환',
    whyChosen: '브라우저 엔진에 내장되어 자바스크립트 오버헤드 0KB, 렌더링 블로킹 없음.',
    bundleImpact: '0 KB (네이티브 브라우저 API)',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/--*',
  },
  {
    name: 'W3C DTCG Format Specification',
    category: 'build',
    version: '2025.10 Community Draft',
    purpose: '플랫폼 독립적 디자인 토큰 단일 진실 공급원(SSOT) 데이터 스키마',
    whyChosen: 'Figma, Style Dictionary, 웹/앱 생태계 표준 규격.',
    bundleImpact: '0 KB (빌드 타임 스키마)',
    docsUrl: 'https://www.designtokens.org/tr/2025.10/',
  },
  {
    name: 'Tailwind CSS',
    category: 'build',
    version: '^4.0.0',
    purpose: '시맨틱 유틸리티 CSS 클래스 컴파일러',
    whyChosen: 'v4 엔진 기반 초고속 컴파일 및 CSS 변수와의 유기적 바인딩(--*)',
    bundleImpact: '사용한 클래스만 압축 빌드 (~8-15 KB)',
    docsUrl: 'https://tailwindcss.com',
  },
  {
    name: 'Next.js',
    category: 'build',
    version: '15.5.15',
    purpose: '디자인 시스템 문서화 포털, 테마 스튜디오 및 컴포넌트 갤러리 렌더링',
    whyChosen: 'App Router 기반 서버 사이드 렌더링 및 초고속 정적 배포(SSG).',
    bundleImpact: '문서화 포털 한정',
    docsUrl: 'https://nextjs.org',
  },
  {
    name: 'Lucide React',
    category: 'build',
    version: '^1.16.0',
    purpose: '미니멀 모노톤 시스템 아이콘 세트',
    whyChosen: '트리셰이킹 완벽 지원, 가볍고 일관된 24x24 그리드 벡터 아이콘.',
    bundleImpact: '컴포넌트당 ~0.5 KB 트리셰이킹',
    docsUrl: 'https://lucide.dev',
  },
  {
    name: 'TypeScript',
    category: 'type',
    version: '^5.0.0',
    purpose: '디자인 토큰 타입 정의(TokenName, ColorTokens) 및 엄격한 타입 안정성',
    whyChosen: 'IDE 자동완성 제공 및 오타에 의한 런타임 스타일 깨짐 원천 차단.',
    bundleImpact: '0 KB (컴파일 시 제거)',
    docsUrl: 'https://www.typescriptlang.org',
  },
  {
    name: 'Playwright',
    category: 'dev',
    version: '^1.50.0',
    purpose: 'E2E 회귀 테스트 및 크로스 브라우저/디바이스 UI 안정성 검증',
    whyChosen: '헤드리스 브라우저에서 테마 스위칭, 토큰 렌더링, 문서 상호작용 자동 검증.',
    bundleImpact: '0 KB (개발 환경 전용)',
    docsUrl: 'https://playwright.dev',
  },
  {
    name: 'Impeccable',
    category: 'dev',
    version: '^4.8.1',
    purpose: 'AI 코딩 에이전트 전용 디자인 스킬팩 및 결정론적 디자인/접근성 안티패턴 검출',
    whyChosen: 'LLM의 무분별한 제네릭 스타일(AI 슬롭)을 차단하고, 시맨틱 토큰 및 디자인 일관성을 정적 검증.',
    bundleImpact: '0 KB (개발 및 CI/CD 전용 CLI)',
    docsUrl: 'https://impeccable.style',
  },
];

export const COMPATIBILITY_MATRIX: CompatibilityItem[] = [
  {
    framework: 'React / Next.js',
    supportedVersions: 'React 18, React 19, Next 14, Next 15',
    integrationMethod: 'CSS Import or Tailwind v4 Theme Variables',
    overhead: '0 KB 런타임',
    status: 'Full',
  },
  {
    framework: 'Vue / Nuxt',
    supportedVersions: 'Vue 3.x, Nuxt 3.x',
    integrationMethod: 'tokens.css 임포트 및 시맨틱 클래스 바인딩',
    overhead: '0 KB 런타임',
    status: 'Full',
  },
  {
    framework: 'Svelte / SvelteKit',
    supportedVersions: 'Svelte 4, Svelte 5',
    integrationMethod: '글로벌 스타일시트 임포트',
    overhead: '0 KB 런타임',
    status: 'Full',
  },
  {
    framework: 'Angular',
    supportedVersions: 'Angular 17, 18, 19+',
    integrationMethod: 'angular.json styles 배열에 tokens.css 추가',
    overhead: '0 KB 런타임',
    status: 'Full',
  },
  {
    framework: 'Vanilla HTML / JS',
    supportedVersions: 'All Modern Browsers (Chrome, Safari, Firefox, Edge)',
    integrationMethod: '<link rel="stylesheet" href="tokens.css">',
    overhead: '0 KB 런타임',
    status: 'Universal',
  },
  {
    framework: 'Web Components',
    supportedVersions: 'Custom Elements v1, Shadow DOM',
    integrationMethod: 'CSS 변수의 Shadow DOM 자동 관통(Inheritance)',
    overhead: '0 KB 런타임',
    status: 'Universal',
  },
];
