# 📋 AtomSystem 작업 관리 및 히스토리 (TODO.md)

> **"사용자는 마크다운(.md)으로 스타일을 제시하고, Agent가 토큰과 UI를 완성합니다."**  
> React, Vue, Angular, Vanilla JS 등 모든 프레임워크에서 즉시 동작하는 범용 디자인 토큰 & UX 패턴 시스템

---

## 📅 작업 히스토리 (Changelog)

### [2026-10-14] 공통 헤더 컴포넌트화 및 GNB 정비
- [x] **공통 Header 컴포넌트 생성 (`components/Header.tsx`)**
  - 불필요한 섹션 링크(`라이브 스튜디오`, `4-Step 작업`, `피그마 해방`) 완전 제거
  - `[UX 패턴]` (`/patterns`) 및 `[컴포넌트 갤러리]` (`/components`) 2대 핵심 메뉴 통합
  - 현재 라우트에 따른 자동 하이라이트(Active state) 표시 (`usePathname()`)
  - `npx atomsystem init` 원클릭 CLI 복사 버튼 내장
  - 각 페이지별 우측 맞춤형 액션 슬롯(`rightExtra`) 지원
- [x] **전체 페이지 공통 헤더 적용**
  - 메인 페이지 (`app/page.tsx`)
  - UX 패턴 페이지 (`app/patterns/page.tsx`)
  - 컴포넌트 갤러리 페이지 (`app/components/page.tsx`)
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
