export interface ComponentTokenMapping {
  role: string;
  variable: string;
  dtcgPath: string;
  defaultValue: string;
  description: string;
}

export const COMPONENT_TOKEN_MAPPINGS: Record<string, ComponentTokenMapping[]> = {
  button: [
    {
      role: '버튼 Primary 배경색',
      variable: 'var(--atom-color-primary)',
      dtcgPath: 'color.brand.color-primary',
      defaultValue: '#3182f6',
      description: '주요 행동(CTA) 버튼의 기본 배경색 (W3C DTCG Type: color)',
    },
    {
      role: '버튼 호버 배경색',
      variable: 'var(--atom-color-primary-hover)',
      dtcgPath: 'color.brand.color-primary-hover',
      defaultValue: '#1b64da',
      description: '버튼에 마우스 오버 시 적용되는 어두운 강조 색상',
    },
    {
      role: '버튼 테두리 곡률 (Radius)',
      variable: 'var(--atom-radius-md)',
      dtcgPath: 'radius.radius-md',
      defaultValue: '10px',
      description: '버튼의 모서리 둥글기 (W3C DTCG Type: dimension)',
    },
    {
      role: '버튼 텍스트 폰트 & 크기',
      variable: 'var(--atom-font-body-1)',
      dtcgPath: 'typography.font-body-1',
      defaultValue: '15px / 1.5 / 600',
      description: '버튼 텍스트의 표준 타이포그래피 스케일',
    },
    {
      role: 'Secondary 버튼 배경색',
      variable: 'var(--atom-bg-secondary)',
      dtcgPath: 'color.surface.bg-secondary',
      defaultValue: '#f8f9fa',
      description: '보조 버튼 및 아웃라인 버튼의 배경 표면 색상',
    },
    {
      role: 'Destructive 위험 배경색',
      variable: 'var(--atom-status-danger)',
      dtcgPath: 'color.status.status-danger',
      defaultValue: '#f43f5e',
      description: '삭제, 탈퇴, 취소 등 파괴적 위험 행동에 매핑된 시스템 색상',
    },
    {
      role: 'Success 성공 확정 배경색',
      variable: 'var(--atom-status-success)',
      dtcgPath: 'color.status.status-success',
      defaultValue: '#10b981',
      description: '송금 완료, 승인, 확정 등 긍정적 성공 행동에 매핑된 시스템 색상',
    },
    {
      role: 'Warning 주의 경고 배경색',
      variable: 'var(--atom-status-warning)',
      dtcgPath: 'color.status.status-warning',
      defaultValue: '#f59e0b',
      description: '주의 수반, 데이터 덮어쓰기 경고 행동에 매핑된 시스템 색상',
    },
  ],
  input: [
    {
      role: '인풋 필드 배경색',
      variable: 'var(--atom-bg-surface)',
      dtcgPath: 'color.surface.bg-surface',
      defaultValue: '#ffffff',
      description: '폼 인풋 필드의 기본 바탕 배경색',
    },
    {
      role: '인풋 테두리 (기본)',
      variable: 'var(--atom-border-strong)',
      dtcgPath: 'color.border.border-strong',
      defaultValue: '#e5e8eb',
      description: '입력 필드의 기본 외곽선 테두리 색상',
    },
    {
      role: '인풋 포커스 링 (Focus)',
      variable: 'var(--atom-color-primary)',
      dtcgPath: 'color.brand.color-primary',
      defaultValue: '#3182f6',
      description: '키보드 포커스 시 활성화되는 외곽 강조 링 색상',
    },
    {
      role: '에러 상태 테두리',
      variable: 'var(--atom-status-danger)',
      dtcgPath: 'color.status.status-danger',
      defaultValue: '#f43f5e',
      description: '유효성 검사 실패 시 경고 테두리 색상',
    },
    {
      role: '인풋 모서리 곡률',
      variable: 'var(--atom-radius-md)',
      dtcgPath: 'radius.radius-md',
      defaultValue: '10px',
      description: '인풋 컨테이너의 테두리 둥글기',
    },
  ],
  card: [
    {
      role: '카드 표면 배경색',
      variable: 'var(--atom-bg-surface)',
      dtcgPath: 'color.surface.bg-surface',
      defaultValue: '#f8f9fa',
      description: '카드 컨테이너 표면 바탕색',
    },
    {
      role: '카드 외곽선 보더',
      variable: 'var(--atom-border-subtle)',
      dtcgPath: 'color.border.border-subtle',
      defaultValue: '#f2f4f6',
      description: '카드 영역을 구분하는 부드러운 경계선',
    },
    {
      role: '카드 모서리 곡률',
      variable: 'var(--atom-radius-lg)',
      dtcgPath: 'radius.radius-lg',
      defaultValue: '16px',
      description: '카드의 W3C 표준 곡률 스케일',
    },
    {
      role: '카드 그림자 (Elevation)',
      variable: 'var(--atom-shadow-sm)',
      dtcgPath: 'shadow.shadow-sm',
      defaultValue: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      description: '카드 입체감을 부여하는 미세 섀도우',
    },
  ],
  badge: [
    {
      role: '뱃지 기본 배경색',
      variable: 'var(--atom-color-primary-subtle)',
      dtcgPath: 'color.brand.color-primary-subtle',
      defaultValue: '#e8f3ff',
      description: 'Primary 태그/뱃지의 틴트 배경색',
    },
    {
      role: '뱃지 텍스트 색상',
      variable: 'var(--atom-color-primary)',
      dtcgPath: 'color.brand.color-primary',
      defaultValue: '#3182f6',
      description: '뱃지 내부 강조 라벨 폰트 색상',
    },
    {
      role: '뱃지 캡슐 곡률',
      variable: 'var(--atom-radius-full)',
      dtcgPath: 'radius.radius-full',
      defaultValue: '9999px',
      description: '완전한 알약/캡슐 형태를 만드는 필렛 곡률',
    },
  ],
};
