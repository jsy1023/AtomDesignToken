# 📋 AtomSystem 작업 관리 및 히스토리 (TODO.md)

> **"사용자는 마크다운(.md)으로 스타일을 제시하고, Agent가 토큰과 UI를 완성합니다."**  
> React, Vue, Angular, Vanilla JS 등 모든 프레임워크에서 즉시 동작하는 범용 디자인 토큰 & UX 패턴 시스템

---

## 📅 작업 히스토리 (Changelog)

- [x] **스튜디오(`/studio`)와 패턴 카탈로그(`/patterns`) UI/UX 100% 동기화**:
  - `app/studio/page.tsx`의 Step 1 패턴 선택 영역을 `/patterns`와 동일하게 와이어프레임 프리뷰(`WireframeGraphic`), `🖥️ WEB` / `📱 모바일` 플랫폼 배지, 설명, 권장 컴포넌트 조합으로 전면 개편
  - 스튜디오 Step 1에 실시간 [전체 / 🖥️ WEB / 📱 모바일] 필터 탭 및 검색창 탑재
  - 우측 실시간 캔버스를 `DeviceMockupView`로 통합하여 Web은 브라우저 크롬창, 모바일은 스마트폰 프레임 실동작 화면을 그대로 동일하게 렌더링하도록 캡슐화
- [x] **UX 패턴 WEB/모바일 필터링 및 와이어프레임 2Depth 실동작 화면 아키텍처 구현**:
  - `lib/data/patterns.ts`: 패턴 모델에 `platform`(`'web' | 'mobile'`) 및 `wireframeType` 메타데이터 속성 추가
  - `components/patterns/WireframeGraphic.tsx`: 11종 패턴별 블루프린트 레이아웃 스케치를 보여주는 미니멀 와이어프레임 컴포넌트 신규 개발
  - `components/patterns/PatternCard.tsx`: 1Depth 카드 상단 와이어프레임 + 플랫폼 뱃지(🖥️ WEB / 📱 모바일) + 요약 설명 + 추천 컴포넌트 조합
  - `components/patterns/DeviceMockupView.tsx`: Web은 브라우저 윈도우 프레임(URL 바, 탭, 신호등 버튼), 모바일은 스마트폰 베젤 프레임(다이내믹 아일랜드, 상태바, 홈바)으로 실제 화면을 그대로 감싸서 렌더링
  - `components/patterns/PatternInteractiveScreen.tsx`: 패턴별 실제 입력, 탭 전환, 챗봇 스트림, 송금 등이 가능한 반응형 실동작 캔버스 캡슐화
  - `components/patterns/PatternDetailView.tsx`: 2Depth 진입 시 브라우저/스마트폰 디바이스 목업 실동작 + 필수 체크리스트 + 안티패턴 방지 + AI 지시용 `.md` 복사/다운로드 일체형 뷰 지원
  - `app/patterns/page.tsx`: [전체 / 🖥️ WEB / 📱 모바일] 실시간 필터 탭 및 1Depth ↔ 2Depth 전환 오케스트레이션 완성
- [x] **객체지향 개발 지침 수립 (`GEMINI.md`)**:
  - 단일 책임 원칙(SRP) 및 단일 진실 공급원(SSOT) 강제
  - 개별 페이지 내 데이터 하드코딩 엄격 금지 및 `lib/data/` 도메인 계층 중심 아키텍처 명문화
  - 개방-폐쇄 원칙(OCP), 인터페이스 분리(ISP), 거대 컴포넌트(God Component) 금지 원칙 수립
- [x] **단일 진실 공급원(`lib/data/`) 레이어 구축 및 전면 통합**:
  - 사용자 피드백 반영: 각 페이지마다 별도 하드코딩된 모의 데이터 구조를 전면 폐기하고 라이브러리 차원의 공통 데이터 레이어로 일원화
  - `lib/data/tokens.ts`: 브랜드 프리셋(`BRAND_PRESETS`), 5대 베이스 토큰(`BASE_COLOR_TOKENS`, `TYPOGRAPHY_TOKENS`, `RADIUS_TOKENS`, `SPACING_TOKENS`, `SHADOW_TOKENS`) 및 공통 타입 정의
  - `lib/data/components.ts`: 갤러리 10대 핵심 컴포넌트(`GALLERY_COMPONENTS`) 및 표준 HTML/React 코드 스니펫 정의
  - `lib/data/patterns.ts`: 11대 마스터 실무 패턴(`PATTERNS_COLLECTION`), 권장 컴포넌트 ID 매핑, 체크리스트, 안티패턴, 마크다운 명세 통합
- [x] **4대 메인 페이지 SSOT 연동 완료**:
  - `app/tokens/page.tsx`: 자체 토큰 배열 제거 -> `@/lib/data/tokens` 연동
  - `app/patterns/page.tsx`: 자체 `PATTERNS_DATA` 제거 -> `@/lib/data/patterns`의 `PATTERNS_COLLECTION` 연동
  - `app/components/page.tsx`: 자체 컴포넌트 목록 분리 -> `@/lib/data/components`의 `GALLERY_COMPONENTS` 연동
  - `app/studio/page.tsx`: 3-Step 위저드가 공통 패턴(`PATTERNS_COLLECTION`) 선택 시 권장 컴포넌트(`GALLERY_COMPONENTS`)를 자동 선택하고, 토큰 프리셋(`BRAND_PRESETS`)을 연계하여 완전한 AI 프롬프트를 빌드하도록 데이터 파이프라인 결합
- [x] **전체 TypeScript 컴파일 무결성 검증 통과 (`npx tsc --noEmit` Exit 0)**

### [2026-10-14] 3-Step 프롬프트 빌더 스튜디오 구축 & 11대 광범위 서비스 패턴 확장
- [x] **실무 핵심 11대 서비스 UX 패턴 마스터 확장 (`app/studio/page.tsx` & `app/patterns/page.tsx`)**
  - **1) SaaS 데이터 분석 & KPI 대시보드**: 기간 필터(7d/30d), 4대 KPI 카드, 상승/하락 트렌드(+14.8%), 바 차트 시각화, 상태 테이블
  - **2) 1:1 고객지원 & AI 챗봇 상담**: 말풍선 스트림, 자주 묻는 질문(FAQ) 추천 칩, 타이핑 애니메이션, 상담원 연결 상태
  - **3) 사용자 본인확인 & KYC 인증신청**: 휴대폰 SMS/PASS 인증, 신분증/서류 촬영 업로드, 약관 일괄 동의, 심사 대기(Pending) 상태
  - **4) 블로그 글 작성 & 발행 에디터**: 리치 서식 툴바, 태그 칩 입력, 30초 무중단 자동 임시저장, 공개 설정 모달
  - **5) 지도 & 위치 기반 POI 탐색**: 인터랙티브 지도 뷰, 현 지도 재검색 플로팅 칩, 핀 마커 터치, 바텀시트 장소 상세(영업중/길찾기/전화)
  - **6) 온보딩 튜토리얼 & 다단계 위저드**: 진행률 프로그레스 바(2/3단계), 역할 선택 라디오 카드, 스킵 버튼, 축하 화면
  - **7) 파일 드래그앤드롭 업로더**: 대형 점선 드롭존, 업로드 진행률 바(0%~100%), 확장자/용량 검증, 첨부 파일 리스트
  - **8) 항공권 & 여행 일정 예약**: 출발지-도착지 360도 스왑, 왕복/편도 탭, 캘린더 날짜 범위, 승객수 증감 카운터
  - **9) 계좌 송금 & 간편 이체**: 대형 한글 금액 변환 인풋, 수수료 무제한 면제 배지, 이중 확인 모달 다이얼로그
  - **10) 장바구니 & 주문 결제서**: 수량 증감 실시간 금액 재계산, 쿠폰/적립금 인라인 적용, 간편결제 수단, 하단 고정(Sticky) 결제 바
  - **11) 실시간 검색 & Empty UX 복구**: 300ms 디바운스, 즉시 지우기(X) 버튼, 결과 없을 때 대안 추천 태그 3종 제공
- [x] **스튜디오 중앙 라이브 캔버스 인터랙션 지원**:
  - 모바일(375px) / 태블릿 / 데스크톱 뷰포트 전환 및 11개 패턴별 실제 버튼 클릭, 차트 전환, 챗봇 대화, 모달 팝업, 폼 입력 실동작
- [x] **AI Agent 마스터 프롬프트 고도화**:
  - `npx atomsystem init` 라이브러리 초기화 명령어 포함
  - 각 패턴별 필수 구현 체크리스트(Best Practices)와 치명적 안티패턴(Anti-patterns) 방지 지침 자동 포함
  - React, Vue, Vanilla HTML 대상 프레임워크 선택 및 원클릭 복사/.md 다운로드 지원
- [x] **AI Agent 마스터 프롬프트 고도화**:
  - 필수 구현 체크리스트(Best Practices)와 치명적 안티패턴(Anti-patterns) 방지 지침 자동 포함
  - React, Vue, Vanilla HTML 대상 프레임워크 선택 및 원클릭 복사/.md 다운로드 지원
- [x] **GNB 상단 내비게이션에 `[⚡ 스튜디오]` 메뉴 추가 (`components/Header.tsx`)**
- [x] **디자인 토큰 설명 및 주요 변수 카탈로그 페이지 신규 구축 (`app/tokens/page.tsx`)**
  - 디자인 토큰 개념 및 W3C DTCG 3계층 아키텍처(Global, Semantic, Component) 시각화 다이어그램
  - 5대 토큰 변수 카테고리별 직관적 비주얼 스와치 및 원클릭 CSS 변수명 복사 (`var(--atom-...)`):
    1. 색상 (Brand, Surface, Text, Border, Status 등)
    2. 타이포그래피 (Display, Title 1~3, Body 1~2, Mono Code)
    3. 테두리 곡률/Radius (직각 0px ~ 캡슐 9999px 비주얼 박스)
    4. 간격/Spacing (4px 베이스 간격 큐브)
    5. 그림자/Elevation (Elevation 1~4 플로팅 카드)
  - 실시간 토큰 값 주입 인터랙티브 쇼케이스 (버튼, 카드, 인풋 바인딩)
- [x] **공통 Header 컴포넌트 생성 (`components/Header.tsx`)**
  - GNB 3대 메뉴 통합: `[디자인 토큰]`, `[UX 패턴]`, `[컴포넌트 갤러리]`
  - 불필요한 섹션 링크 제거 및 현재 라우트에 따른 자동 하이라이트(Active state)
  - `npx atomsystem init` 원클릭 CLI 복사 버튼 내장
- [x] **전체 페이지 공통 헤더 적용**
  - 메인 페이지 (`app/page.tsx`), UX 패턴 (`app/patterns/page.tsx`), 컴포넌트 갤러리 (`app/components/page.tsx`), 디자인 토큰 (`app/tokens/page.tsx`)
- [x] **TypeScript 타입 검사 통과 (`npx tsc --noEmit` Exit 0)**

### [2026-10-13] 핵심 페이지 피보팅 및 3대 핵심 뷰 구축
- [x] **메인 랜딩 페이지 신규 구축 (`app/page.tsx`)**
  - 브랜드 프리셋 선택기 (Toss, Daangn, Custom)
  - 실시간 토큰 커스터마이저 (Primary/Secondary 컬러, 테두리 반경/Radius, 서체 등)
  - 실시간 UX 플로우 프리뷰 (송금 플로우, 검색/필터 빈 상태, 로그인 폼 유효성 검사)
  - AI Agent 주입용 가이드 템플릿 복사 기능 (`.agents/rules`)
- [x] **UX 패턴 라이브러리 페이지 구축 (`app/patterns/page.tsx`)**
  - 5대 실전 UX 패턴 컬렉션 구현 (네비게이션, 검색 & 필터, 계정/인증, 항공권/예약 검색, 블로그/콘텐츠)
  - 각 패턴별 상세 체크리스트, 안티패턴 가이드, AI 지시용 `.md` 복사/다운로드 기능
- [x] **컴포넌트 갤러리 페이지 구축 (`app/components/page.tsx`)**
  - shadcn/ui + Bootstrap 기반 핵심 UI 컴포넌트 풀세트 구현
  - Form, Feedback, Navigation, Data 카테고리별 분류 및 검색 기능
- [x] **GNB 구조 단순화 및 일원화**
  - 불필요한 메뉴 정리 후 핵심 2개 메뉴로 정비

### [2026-10-12] 초기 기반 및 디자인 토큰 엔진 정비
- [x] Style Dictionary 기반 `tokens/tokens.json` 토큰 빌드 파이프라인 정비
- [x] 디자인 프리셋 마크다운 작성 (`presets/toss.md`, `presets/daangn.md`, `presets/custom-template.md`)

---

## 🚀 향후 작업 계획 (Next Steps & Backlog)

### Phase 1: 디자인 토큰 전역 동기화 (우선순위: 높음)
- [ ] **메인 ↔ 패턴 ↔ 컴포넌트 간 토큰 상태 공유**
  - 메인 페이지에서 조정한 토큰(Primary 컬러, Radius 등)을 LocalStorage 또는 Context로 저장하여 모든 페이지에 실시간 반영
- [ ] **다크/라이트 테마 토글 보강**

### Phase 2: UX 패턴 & 컴포넌트 고도화 (우선순위: 보통)
- [ ] **인터랙티브 패턴 프리뷰 확장**
- [ ] **추가 컴포넌트 보강** (DatePicker, Slider 등)
- [ ] **토큰 Export / 다운로드 기능** (`tokens.json`, `atom-ui.css`, `tailwind.config.ts`)

### Phase 3: 테스트 및 안정화 (우선순위: 보통)
- [ ] **E2E 테스트 검증 (`npm run test:e2e`)**
- [ ] **프로덕션 빌드 체크 (`npm run build`)**

### Phase 4: 배포 & 문서화 (우선순위: 추후)
- [ ] `atomsystem` CLI 명령어 (`npx atomsystem init`) 동작 검증
- [ ] Vercel 배포 (`system.atomground.com`)
