export interface DurationToken {
  name: string;
  variable: string;
  value: string;
  ms: number;
  description: string;
  usage: string;
}

export interface EasingToken {
  name: string;
  variable: string;
  value: string;
  curve: string;
  description: string;
  usage: string;
}

export interface MotionPattern {
  id: string;
  title: string;
  description: string;
  durationToken: string;
  easingToken: string;
  sampleType: 'fade' | 'slide' | 'scale' | 'collapse';
}

export const DURATION_TOKENS: DurationToken[] = [
  {
    name: 'duration-instant',
    variable: '--atom-duration-instant',
    value: '100ms',
    ms: 100,
    description: '즉각적인 피드백 (버튼 active 상태, 툴팁 출현 등)',
    usage: '체크박스, 스위치 토글, 클릭 햅틱 시각화',
  },
  {
    name: 'duration-fast',
    variable: '--atom-duration-fast',
    value: '150ms',
    ms: 150,
    description: '빠른 마이크로 인터랙션 (호버 효과, 뱃지 변화)',
    usage: '드롭다운 메뉴, 탭 인디케이터 전환',
  },
  {
    name: 'duration-normal',
    variable: '--atom-duration-normal',
    value: '250ms',
    ms: 250,
    description: '표준 UI 요소 전환 (모달 진입, 아코디언 확장)',
    usage: '다이얼로그 팝업, 사이드 드로어, 뷰 전환',
  },
  {
    name: 'duration-moderate',
    variable: '--atom-duration-moderate',
    value: '350ms',
    ms: 350,
    description: '면적이 큰 요소의 이동 (바텀시트, 풀스크린 오버레이)',
    usage: '모바일 바텀시트, 페이지 스와이프 트랜지션',
  },
  {
    name: 'duration-slow',
    variable: '--atom-duration-slow',
    value: '500ms',
    ms: 500,
    description: '주의를 환기하는 강조 애니메이션 (스켈레톤 펄스, 성공 알림)',
    usage: '로딩 스켈레톤, 완료 축하 피드백 배너',
  },
];

export const EASING_TOKENS: EasingToken[] = [
  {
    name: 'ease-standard',
    variable: '--atom-ease-standard',
    value: 'cubic-bezier(0.2, 0, 0, 1)',
    curve: '0.2, 0, 0, 1',
    description: '가장 자연스러운 범용 가속-감속 곡선 (Material & Apple 표준)',
    usage: '대부분의 UI 요소 크기, 위치, 불투명도 변화',
  },
  {
    name: 'ease-enter',
    variable: '--atom-ease-enter',
    value: 'cubic-bezier(0, 0, 0.2, 1)',
    curve: '0, 0, 0.2, 1',
    description: '감속 곡선 (화면 밖에서 안으로 들어올 때 빠르게 진입 후 감속)',
    usage: '모달 팝업, 알림 토스트, 드롭다운 펼쳐짐',
  },
  {
    name: 'ease-exit',
    variable: '--atom-ease-exit',
    value: 'cubic-bezier(0.4, 0, 1, 1)',
    curve: '0.4, 0, 1, 1',
    description: '가속 곡선 (화면 안에서 밖으로 퇴장할 때 빠르게 가속)',
    usage: '모달 닫힘, 토스트 닫기, 시트 사라짐',
  },
  {
    name: 'ease-bounce',
    variable: '--atom-ease-bounce',
    value: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    curve: '0.34, 1.56, 0.64, 1',
    description: '약간의 오버슈트(탄성)가 있는 스프링 효과',
    usage: '좋아요 하트 아이콘, 알림 뱃지 팝, 토글 스위치',
  },
];

export const MOTION_PATTERNS: MotionPattern[] = [
  {
    id: 'modal-enter',
    title: '다이얼로그 & 모달 진입',
    description: '화면 중앙에서 95% 크기에서 100%로 스케일되며 부드럽게 페이드인합니다.',
    durationToken: '--atom-duration-normal',
    easingToken: '--atom-ease-enter',
    sampleType: 'scale',
  },
  {
    id: 'sheet-slide',
    title: '바텀시트 슬라이드 업',
    description: '하단에서 위로 솟아오르며 자연스럽게 멈춥니다.',
    durationToken: '--atom-duration-moderate',
    easingToken: '--atom-ease-standard',
    sampleType: 'slide',
  },
  {
    id: 'fade-feedback',
    title: '토글 & 툴팁 페이드',
    description: '시각적 깜빡임 없이 즉각적이고 매끄럽게 전환됩니다.',
    durationToken: '--atom-duration-fast',
    easingToken: '--atom-ease-standard',
    sampleType: 'fade',
  },
  {
    id: 'pop-badge',
    title: '성공 배지 팝 (탄성)',
    description: '약간의 탄성을 주어 사용자의 성취감을 극대화합니다.',
    durationToken: '--atom-duration-normal',
    easingToken: '--atom-ease-bounce',
    sampleType: 'scale',
  },
];
