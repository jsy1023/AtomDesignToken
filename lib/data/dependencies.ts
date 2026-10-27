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
