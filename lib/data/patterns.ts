export interface PatternVariant {
  id: string;
  name: string;
  description: string;
  checklist: string[];
  antiPatterns: string[];
  markdown: string;
}

export interface PatternItem {
  id: string;
  title: string;
  categoryName: string;
  badge: string;
  iconName: 'dashboard' | 'chat' | 'onboarding' | 'uploader' | 'kyc' | 'blog' | 'map' | 'flight' | 'fintech' | 'commerce' | 'search';
  summary: string;
  recommendedComponentIds: string[];
  checklist: string[];
  antiPatterns: string[];
  variants: PatternVariant[];
}

export const PATTERNS_COLLECTION: PatternItem[] = [
  {
    id: 'saas-dashboard',
    title: 'SaaS 데이터 분석 & KPI 대시보드',
    categoryName: 'Analytics & SaaS',
    badge: '대시보드/데이터',
    iconName: 'dashboard',
    summary: '기간 필터(7d/30d), 4대 핵심 KPI 지표 카드, 전주 대비 증감 트렌드(+14.8%), 일별 추이 바 차트 및 정렬 가능한 데이터 테이블.',
    recommendedComponentIds: ['card', 'badge', 'button', 'tabs', 'table'],
    checklist: [
      'KPI 요약 카드마다 전주/전월 대비 증감률(+, -) 및 시각적 색상(초록/빨강) 인디케이터 제공',
      '날짜 범위 필터(오늘, 지난 7일, 지난 30일, 직접 설정) 원클릭 전환 탭 배치',
      '차트 로딩 시 레이아웃 무너짐(CLS)을 방지하는 차트 전용 스켈레톤 UI 지원',
      '데이터 테이블의 컬럼 정렬(오름차순/내림차순) 및 상태 배지(활성/대기/만료) 명확화'
    ],
    antiPatterns: [
      '숫자 지표가 너무 많아 한눈에 핵심 성과를 파악할 수 없는 정보 과부하(Visual Noise)',
      '데이터가 0건일 때 차트가 에러 나거나 깨진 채로 방치되는 빈 상태(Empty State) 결여',
      '모바일 환경에서 테이블 가로 스크롤 안내가 없어 오른쪽 컬럼이 잘려 보이는 현상'
    ],
    variants: [
      {
        id: 'kpi-analytics-view',
        name: '비즈니스 성과 KPI 카드 & 시계열 차트',
        description: '의사결정권자가 서비스 핵심 성과 지표(ARR, MAU, Churn)를 한눈에 파악하고 드릴다운할 수 있는 대시보드 패턴.',
        checklist: [
          '4대 핵심 지표 카드 최상단 배치',
          '시계열 차트 호버 툴팁(Tooltip) 지원',
          '모바일에서는 2열 그리드로 자동 리플로우'
        ],
        antiPatterns: ['범례(Legend) 설명이 누락되어 색상이 무엇을 의미하는지 모름'],
        markdown: `# [UX Pattern] B2B SaaS 성과 분석 대시보드 패턴

## 1. 개요
핵심 비즈니스 지표(KPI)와 시계열 트렌드를 시각화하여 사용자가 빠른 의사결정을 내릴 수 있도록 돕습니다.

## 2. 필수 구현 규칙
- **KPI Metrics Card**: 수치 + 단위 + 전기 대비 증감(Badge).
- **Date Range Picker / Tabs**: 7일, 30일, 90일 토글.
- **Data Table**: 정렬 가능한 헤더, 페이지네이션 또는 무한 스크롤.
`
      }
    ]
  },
  {
    id: 'chat-support',
    title: '1:1 고객지원 & AI 챗봇 상담 패턴',
    categoryName: 'Communication',
    badge: '채팅/CS',
    iconName: 'chat',
    summary: '말풍선 메시지 스트림, 추천 빠른 질문 칩(Quick Reply), 파일 첨부, 타이핑 중 인디케이터, 상담원 연결 상태 안내.',
    recommendedComponentIds: ['input', 'button', 'badge', 'card', 'alert'],
    checklist: [
      '새 메시지 수신 시 자동으로 스크롤을 최하단으로 부드럽게 내리는 자동 스크롤(Auto-scroll)',
      '사용자가 자주 묻는 질문(FAQ)을 원클릭으로 보낼 수 있는 가로 스크롤 추천 칩 제공',
      '상대방(또는 AI)이 응답 작성 중일 때 3개 점이 깜빡이는 타이핑 애니메이션(Typing Indicator) 노출',
      '이미지/캡처 파일 첨부 시 전송 전 미리보기 및 용량 초과 인라인 에러'
    ],
    antiPatterns: [
      '메시지를 보낸 후 전송 성공 여부를 알 수 없어 사용자가 같은 질문을 연타하는 문제',
      '봇이 답변하지 못했을 때 인간 상담원 인계 경로(Escalation)를 제공하지 않음',
      '모바일 키보드가 올라올 때 입력창이 키보드 뒤로 숨어버리는 뷰포트 버그'
    ],
    variants: [
      {
        id: 'live-chatbot-stream',
        name: '실시간 스트리밍 대화형 인터페이스',
        description: 'AI 모델의 토큰 단위 스트리밍 응답과 퀵 리플라이 칩을 결합한 모던 대화창.',
        checklist: ['스트리밍 도중 마크다운 실시간 파싱', '답변 복사 및 재생성 액션 버튼 제공'],
        antiPatterns: ['스트리밍 중 사용자의 추가 입력을 완전히 차단해버리는 행위'],
        markdown: `# [UX Pattern] 1:1 고객지원 & AI 챗봇 패턴

## 1. 개요
사용자의 문의 사항을 실시간 대화 형태로 수렴하고 AI 어시스턴트가 즉시 해결합니다.

## 2. 필수 UX 명세
- **Message Bubble Layout**: 송신자 우측 정렬(Primary 컬러), 수신자 좌측 정렬(Muted Surface).
- **Quick Actions**: 가로 스크롤 추천 질문 칩.
`
      }
    ]
  },
  {
    id: 'kyc-verification',
    title: '본인확인 & KYC 인증신청 패턴',
    categoryName: 'Identity & Security',
    badge: '인증/보안',
    iconName: 'kyc',
    summary: '휴대폰 SMS/PASS 인증, 신분증/서류 촬영 업로드, 필수/선택 약관 일괄 동의, 실시간 심사 상태 안내.',
    recommendedComponentIds: ['input', 'button', 'selection', 'card', 'badge', 'alert'],
    checklist: [
      '휴대폰 6자리 인증번호 입력 시 3분 카운트다운 타이머 및 재전송(Resend) CTA 상시 제공',
      '[전체 동의] 토글 시 하위 필수(14세 이상, 개인정보 등) 및 선택 약관 일괄 동기화',
      '신분증 파일 업로드 시 즉시 파일명 및 미리보기 섬네일 노출, 10MB 초과 파일 인라인 경고',
      '제출 완료 후 [심사 대기중 / 보완 필요 / 승인 완료] 단계별 프로그레스 스텝 바 제공'
    ],
    antiPatterns: [
      '인증번호 시간 초과 시 사용자에게 아무런 에러 메시지 없이 무응답 방치',
      '필수 약관과 마케팅 선택 약관을 묶어두어 강제 동의하게 유도',
      '파일 업로드 용량 제한을 업로드 실패 후에야 alert 팝업으로 띄우는 행위'
    ],
    variants: [
      {
        id: 'otp-id-verification',
        name: 'SMS OTP & 신분증 업로드 플로우',
        description: '금융 및 본인확인이 필요한 서비스에서 이탈 없이 신속히 인증을 완결하는 패턴.',
        checklist: ['자동 완성 지원(autocomplete="one-time-code")', '서류 업로드 드래그앤드롭 지원'],
        antiPatterns: ['백스페이스 입력 시 이전 인풋으로 커서가 이동하지 않음'],
        markdown: `# [UX Pattern] 본인확인 & KYC 인증 플로우

## 1. 개요
금융, 결제, 성인인증 서비스에서 사용자의 신원을 안전하게 검증합니다.

## 2. 필수 규약
- **Timer**: 180초 카운트다운. 만료 시 입력 비활성화 및 재전송 활성화.
- **Terms Agreement**: 전체 동의 토글 시 자식 항목 일괄 변경.
`
      }
    ]
  },
  {
    id: 'blog-editor',
    title: '블로그 글 작성 & 발행 에디터 패턴',
    categoryName: 'Content & Publishing',
    badge: '콘텐츠/에디터',
    iconName: 'blog',
    summary: '제목/본문 리치 에디터, 태그 칩 입력기, 커버 이미지 등록, 30초 무중단 자동 임시저장, 공개 설정 모달.',
    recommendedComponentIds: ['input', 'button', 'badge', 'dialog', 'selection', 'tabs'],
    checklist: [
      '30초 주기 무중단 자동 임시저장(Autosave) 및 "마지막 저장: 방금 전" 상태 실시간 표기',
      '제목 입력란에서 엔터 키 입력 시 본문 첫 단락으로 포커스 자동 전환',
      '태그 입력 시 쉼표/엔터 입력 즉시 캡슐 칩(Chip)으로 변환 및 개별 삭제(X) 지원',
      '[발행하기] 클릭 시 공개 범위(전체/비공개/보호) 및 URL 슬러그, 발행 예약 일시 설정 모달 팝업'
    ],
    antiPatterns: [
      '사용자가 실수로 뒤로가기나 탭을 닫을 때 작성 중인 본문 손실 경고창 미제공',
      '에디터 본문 폰트 크기가 실제 발행된 화면과 달라 사용자가 레이아웃을 오인함',
      '대표 이미지를 등록하지 않았을 때 기본 Fallback 이미지 규칙 부재'
    ],
    variants: [
      {
        id: 'markdown-rich-editor',
        name: '리치 마크다운 에디터 & 메타데이터 발행',
        description: '글 작성자의 몰입감을 유지하면서 태그, 슬러그, 발행 일정을 손쉽게 설정하는 패턴.',
        checklist: ['단축키(Ctrl+B, Ctrl+I) 지원', '이미지 붙여넣기(Paste) 자동 업로드'],
        antiPatterns: ['에디터 스크롤과 미리보기 스크롤이 비동기되어 엉뚱한 위치를 보여줌'],
        markdown: `# [UX Pattern] 블로그 글 작성 및 발행 패턴

## 1. 개요
콘텐츠 제작자가 방해받지 않고 글을 집필하고 안전하게 발행합니다.
`
      }
    ]
  },
  {
    id: 'map-location',
    title: '지도 & 위치 기반 POI 탐색 패턴',
    categoryName: 'Location & Mobility',
    badge: '지도/로케이션',
    iconName: 'map',
    summary: '인터랙티브 지도 뷰포트, 현 지도 위치에서 재검색, 핀(Marker) 인터랙션, 바텀시트 장소 상세 정보.',
    recommendedComponentIds: ['card', 'button', 'badge', 'input', 'sheet'],
    checklist: [
      '지도 패닝/줌 이동 시 상단에 "현 위치에서 재검색" 플로팅 칩 자동 노출',
      '지도 위 핀 마커 터치 시 하단 바텀시트가 매끄럽게 슬라이드 업되며 매장 핵심 정보 노출',
      '현재 시각 기준 [영업 중 / 영업 종료] 여부를 컬러 배지(초록/회색)로 명확히 표시',
      '모바일 한 손 조작을 위한 "길찾기" 및 "전화걸기" 주요 CTA 버튼 상시 하단 고정'
    ],
    antiPatterns: [
      '지도를 스크롤할 때 웹 페이지 전체가 함께 위아래로 밀려 지도가 조작되지 않는 현상',
      '마커가 겹칠 때 클러스터링(묶음) 처리가 안 되어 화면이 핀으로 뒤덮임',
      '바텀시트가 전체 화면을 가려 지도 컨텍스트를 잃어버리는 현상'
    ],
    variants: [
      {
        id: 'poi-bottom-sheet',
        name: '핀 마커 클릭 & 슬라이딩 바텀시트',
        description: '지도의 넓은 시야를 확보하면서 장소의 운영시간과 길찾기를 제공하는 패턴.',
        checklist: ['바텀시트 2단계 높이 제어(스냅 포인트)', '거리 순 정렬 필터'],
        antiPatterns: ['지도 로딩 중 아무런 안내 없이 회색 타일만 노출'],
        markdown: `# [UX Pattern] 지도 및 위치 기반 POI 탐색 패턴`
      }
    ]
  },
  {
    id: 'flight-booking',
    title: '항공권 / 여행 일정 예약 패턴',
    categoryName: 'Travel & Booking',
    badge: '예약/일정',
    iconName: 'flight',
    summary: '출발지-도착지 원클릭 스왑(Swap), 왕복/편도 탭, 캘린더 날짜 범위 및 승객 수(성인/소아) 카운터.',
    recommendedComponentIds: ['tabs', 'input', 'button', 'badge', 'card', 'dialog'],
    checklist: [
      '출발지와 도착지를 한 번에 맞바꾸는 인터랙티브 360도 스왑 버튼 제공',
      '왕복 선택 시 [가는 날 - 오는 날] 날짜 범위를 한 화면에서 선택하는 듀얼 캘린더',
      '성인/소아/유아 승객 수 증감 (+/-) 카운터 및 유아 나이 기준 툴팁 제공',
      '검색 중일 때 로딩 스켈레톤 및 직항/경유, 가격대별 필터 칩 상단 배치'
    ],
    antiPatterns: [
      '오는 날을 가는 날보다 앞선 과거 날짜로 선택할 수 있게 방치하는 오류',
      '출발지 선택 시 공항 코드(ICN, GMP)와 한글 도시명 검색이 분리되어 검색 실패 유발',
      '유류할증료/세금이 최종 결제 단계에서 갑자기 추가되어 가격 불신 초래'
    ],
    variants: [
      {
        id: 'flight-search-bar',
        name: '멀티 파라미터 항공권 검색 폼',
        description: '복잡한 날짜, 승객, 공항 조합을 오차 없이 빠르게 설정하는 패턴.',
        checklist: ['최근 검색 여정 자동 저장', '특가 캘린더 가격 뱃지'],
        antiPatterns: ['날짜 선택 시 주말/공휴일 색상 미구분'],
        markdown: `# [UX Pattern] 항공권 검색 및 예약 플로우`
      }
    ]
  },
  {
    id: 'onboarding-wizard',
    title: '온보딩 튜토리얼 & 다단계 스텝 위저드',
    categoryName: 'User Onboarding',
    badge: '온보딩/가입',
    iconName: 'onboarding',
    summary: '진행률 프로그레스 바(1~3단계), 역할 선택 카드(디자이너/엔지니어/기획자), 이전/다음 유효성 검사, 건너뛰기(Skip).',
    recommendedComponentIds: ['card', 'button', 'badge', 'selection', 'input'],
    checklist: [
      '현재 단계와 총 단계를 명시하는 상단 스텝 프로그레스 바(예: 2/3단계)',
      '선택지를 큰 카드 형태로 배치하여 모바일 터치 타깃(최소 48px) 극대화',
      '선택하지 않고 다음으로 넘어가지 못하도록 버튼 비활성화(Disabled) 상태 명확화',
      '필수가 아닌 질문의 경우 우상단 "건너뛰기" 버튼을 제공하여 이탈률 방지'
    ],
    antiPatterns: [
      '이전 단계로 돌아갔을 때 이미 입력한 데이터가 전부 초기화되는 버그',
      '단계가 총 몇 단계인지 알려주지 않아 사용자가 끝없는 설문처럼 느껴 이탈',
      '각 질문의 선택 이유를 설명하지 않아 사용자가 개인정보 수집에 거부감을 느낌'
    ],
    variants: [
      {
        id: 'multi-step-form',
        name: '단계별 정보 수집 위저드',
        description: '복잡한 가입/온보딩 프로세스를 청킹(Chunking)하여 완료율을 극대화하는 패턴.',
        checklist: ['엔터 키 입력 시 다음 단계로 자동 진행', '뒤로가기 시 상태 완벽 복원'],
        antiPatterns: ['진행 중 새로고침 시 1단계로 강제 리셋'],
        markdown: `# [UX Pattern] 온보딩 및 다단계 위저드 패턴`
      }
    ]
  },
  {
    id: 'file-uploader',
    title: '파일 드래그앤드롭 업로더 & 미디어 관리',
    categoryName: 'File & Media',
    badge: '파일/업로드',
    iconName: 'uploader',
    summary: '대형 점선 드롭존(Dropzone), 실시간 업로드 진행률 바(0%~100%), 파일 형식/용량 검증, 첨부 파일 리스트 및 삭제.',
    recommendedComponentIds: ['card', 'button', 'badge', 'alert', 'input'],
    checklist: [
      '파일을 드롭존 위로 드래그했을 때 테두리 색상과 배경이 하이라이트되는 시각 피드백',
      '허용 확장자(JPG, PNG, PDF) 및 최대 파일 크기(예: 최대 20MB)를 드롭존 내 명시',
      '업로드 중인 파일마다 프로그레스 바 및 중단/취소(X) 버튼 제공',
      '업로드 완료된 파일의 파일명, 용량, 성공 아이콘 및 개별 삭제 기능'
    ],
    antiPatterns: [
      '허용되지 않은 확장자 파일을 올렸을 때 파일 선택 창이 닫힌 뒤에야 alert을 띄움',
      '업로드 중 브라우저 탭을 닫으려고 할 때 경고창을 띄우지 않아 업로드 중단',
      '이미지 파일인데 썸네일 미리보기를 제공하지 않고 텍스트 파일명만 노출함'
    ],
    variants: [
      {
        id: 'dropzone-progress-list',
        name: '드래그앤드롭존 & 진행률 리스트',
        description: '다중 대용량 파일 첨부 시 시각적 안정성과 진행 상황을 전달하는 패턴.',
        checklist: ['복수 파일 동시 업로드 병렬 처리', '실패 시 재시도(Retry) 버튼'],
        antiPatterns: ['업로드 진행률이 멈춘 채 얼어붙는 현상'],
        markdown: `# [UX Pattern] 파일 드래그앤드롭 업로더 패턴`
      }
    ]
  },
  {
    id: 'fintech-transfer',
    title: '계좌 송금 & 간편 이체 패턴',
    categoryName: 'Fintech & Pay',
    badge: '핀테크/이체',
    iconName: 'fintech',
    summary: '대형 금액 입력(실시간 한글 변환), 수수료 면제 안내 배지, 빠른 출금 계좌 선택, 확인 모달 및 완료 인터랙션.',
    recommendedComponentIds: ['button', 'input', 'dialog', 'badge', 'card'],
    checklist: [
      '숫자 입력 시 "5만 원", "150만 원" 등 실시간 한글 금액 단위 동시 변환 노출',
      '출금 가능 잔액 초과 시 즉시 경고 텍스트 및 잔액 채우기 CTA 연계',
      '최종 송금 직전 받는 분 이름, 은행, 계좌번호를 재확인하는 2단계 확인 다이얼로그',
      '송금 성공 시 부드러운 체크 애니메이션과 잔액 갱신 및 카카오톡 영수증 공유 CTA'
    ],
    antiPatterns: [
      '금액 단위 콤마(, ) 서식이 입력 중에 깨져 사용자가 숫자를 헷갈리게 만듦',
      '확인 모달 없이 한 번 클릭으로 바로 돈이 빠져나가는 위험한 흐름',
      '네트워크 지연 시 송금 버튼을 연타하여 중복 이체 사고 발생'
    ],
    variants: [
      {
        id: 'two-step-transfer',
        name: '숫자 키패드 송금 & 이중 확인 모달',
        description: '오송금 위험을 원천 차단하면서 원터치로 송금을 완료하는 토스형 패턴.',
        checklist: ['최근 송금 계좌 즐겨찾기 칩', '생체 인증(지문/FaceID) 인터페이스 지원'],
        antiPatterns: ['은행 점검 시간 안내 없이 이체 실패 처리'],
        markdown: `# [UX Pattern] 계좌 송금 및 간편 이체 패턴`
      }
    ]
  },
  {
    id: 'ecommerce-checkout',
    title: '장바구니 & 주문 결제서 패턴',
    categoryName: 'Commerce & Order',
    badge: '커머스/결제',
    iconName: 'commerce',
    summary: '수량 증감(+/-) 실시간 금액 재계산, 쿠폰/적립금 인라인 적용, 간편결제 수단 선택, 하단 결제 CTA 고정 바.',
    recommendedComponentIds: ['card', 'button', 'input', 'badge', 'selection'],
    checklist: [
      '수량 증감(+/-) 시 배송비 및 총 결제 예정 금액 실시간 재계산',
      '보유 쿠폰 및 적립금 입력란에 [최대 사용] 원클릭 적용 버튼 제공',
      '스크롤 위치와 상관없이 결제 금액과 [OOO원 결제하기] 버튼을 화면 하단 고정(Sticky)',
      '품절 상품 발생 시 체크박스 자동 해제 및 품절 뱃지 명확히 표기'
    ],
    antiPatterns: [
      '수량을 바꿀 때마다 화면 전체가 깜빡이며 리로드되는 구식 방식',
      '최종 결제 금액에 배송비나 할인이 어떻게 계산되었는지 상세 내역 미표시',
      '결제 실패 시 장바구니에 담아둔 상품 정보가 전부 날아가는 현상'
    ],
    variants: [
      {
        id: 'sticky-checkout-bar',
        name: '주문서 결제 & 하단 고정 바',
        description: '결제 과정의 이탈을 줄이고 최종 결제 금액을 명료하게 유지하는 패턴.',
        checklist: ['간편결제 원클릭 탭 선택', '적립 예정 포인트 안내'],
        antiPatterns: ['결제 수단 선택 시 추가 수수료 숨김'],
        markdown: `# [UX Pattern] 이커머스 장바구니 및 결제 주문서 패턴`
      }
    ]
  },
  {
    id: 'search-empty',
    title: '실시간 검색 & Empty UX 패턴',
    categoryName: 'Discovery',
    badge: '탐색/복구',
    iconName: 'search',
    summary: '300ms 디바운스 입력, 검색어 즉시 초기화(X) 버튼, 결과 없음 시 복구 추천 태그 및 최근 검색어 제공.',
    recommendedComponentIds: ['input', 'badge', 'card', 'button'],
    checklist: [
      '300ms 디바운스 적용으로 타자 칠 때마다 서버에 무의미한 API 요청 방지',
      '결과가 없을 때 "검색 결과가 없습니다"와 함께 대안 추천 키워드 태그 3개 이상 제공',
      '입력창 우측 원클릭 클리어(X) 버튼 및 최근 검색어 기록 로컬 저장',
      '검색 중일 때는 인라인 스피너나 스켈레톤으로 진행 상태 명확화'
    ],
    antiPatterns: [
      '결과가 없을 때 하얀 백지 화면만 덜렁 노출하여 사용자를 이탈시킴',
      '타이핑 중 지우기(X) 버튼이 없어 백스페이스를 연타하게 만드는 불편함',
      '오타 입력 시 유사 검색어 추천("혹시 이것을 찾으셨나요?") 미제공'
    ],
    variants: [
      {
        id: 'autocomplete-recovery',
        name: '실시간 자동완성 & 빈 상태 복구 흐름',
        description: '사용자가 오타를 내거나 결과가 없어도 서비스 이탈을 막는 회복탄력적 UX.',
        checklist: ['최근 검색어 삭제 기능', '인기 검색어 랭킹 표시'],
        antiPatterns: ['검색어가 1글자일 때 무조건 전체 DB를 조회하여 브라우저 렉 유발'],
        markdown: `# [UX Pattern] 실시간 검색 및 결과 없음 복구 패턴`
      }
    ]
  }
];
