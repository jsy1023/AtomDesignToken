# 📋 AtomSystem 작업 관리 및 히스토리 (TODO.md)

> **"사용자는 마크다운(.md)으로 스타일을 제시하고, Agent가 토큰과 UI를 완성합니다."**  
> React, Vue, Angular, Vanilla JS 등 모든 프레임워크에서 즉시 동작하는 범용 디자인 토큰 & UX 패턴 시스템

---

## 📅 작업 히스토리 (Changelog)

### [2026-10-14] 3-Step 프롬프트 빌더 스튜디오 구축 & 디자인 토큰 카탈로그
- [x] **3-Step 인터랙티브 스튜디오 신규 구축 (`app/studio/page.tsx`)**
  - **Step 1 (UX 패턴 선택)**: 송금/핀테크, 검색 & Empty UX, 계정 인증, 항공권 예약, 아티클 피드 등
  - **Step 2 (컴포넌트 구성)**: 패턴에 맞춘 추천 컴포넌트 자동 체크 및 사용자 커스텀 토글
  - **Step 3 (디자인 토큰 주입)**: 토스(Blue/16px), 당근(Orange/12px), 바이올렛, 에메랄드 프리셋 및 커스텀
  - **중앙 캔버스 라이브 렌더링**: 모바일/태블릿/데스크톱 뷰포트 토글 및 실제 인터랙션 동작
  - **AI Agent 마스터 프롬프트 자동 생성**:
    - `npx atomsystem init` 라이브러리 초기화 가이드
    - 패턴 체크리스트 + 컴포넌트 마크업 구조 + 디자인 토큰 CSS 변수 통합
    - React, Vue, Vanilla HTML 대상 프레임워크 선택 및 원클릭 복사/.md 다운로드
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
