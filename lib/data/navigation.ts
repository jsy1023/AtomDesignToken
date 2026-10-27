export interface SubNavItem {
  title: string;
  href: string;
  description: string;
  badge?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  englishLabel: string;
  items: SubNavItem[];
}

export const NAVIGATION_DEPTH: NavGroup[] = [
  {
    id: 'foundations',
    label: '파운데이션',
    englishLabel: 'Foundations',
    items: [
      {
        title: '원칙',
        href: '/principles',
        description: 'SSOT, 제로 런타임, 3계층 아키텍처 등 6대 핵심 설계 규격',
      },
      {
        title: '디자인 토큰',
        href: '/tokens',
        description: '색상, 타이포, 곡률, 간격, 그림자 W3C DTCG 표준 명세',
      },
      {
        title: '모션',
        href: '/motion',
        description: '지속 시간(Duration)과 이징(Easing) 타이밍 토큰 및 실시간 테스트',
      },
    ],
  },
  {
    id: 'library',
    label: 'UI 라이브러리',
    englishLabel: 'Library',
    items: [
      {
        title: '컴포넌트',
        href: '/components',
        description: '버튼, 인풋, 모달 등 시맨틱 토큰과 결합된 프로덕션 UI',
      },
      {
        title: 'UX패턴',
        href: '/patterns',
        description: '대시보드, 폼 유효성, 결제 등 실무 검증 인터랙션 가이드',
      },
    ],
  },
  {
    id: 'engineering',
    label: '엔지니어링',
    englishLabel: 'Engineering',
    items: [
      {
        title: '디펜던시',
        href: '/dependencies',
        description: '0KB 런타임 아키텍처 및 프레임워크 크로스 호환성 매트릭스',
      },
      {
        title: '가이드',
        href: '/guide',
        description: 'React, Vue, Vanilla HTML 어디서나 의존성 없는 연동 실전 지침',
      },
    ],
  },
  {
    id: 'studio',
    label: '스튜디오',
    englishLabel: 'Studio',
    items: [
      {
        title: '프롬프트 스튜디오',
        href: '/studio',
        description: '선택한 토큰과 패턴 기반의 AI 프롬프트 자동 생성기',
        badge: 'AI Builder',
      },
    ],
  },
];
