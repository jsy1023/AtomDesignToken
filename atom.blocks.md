# 🧱 AtomSystem Design Blocks Guide (atom.blocks.md)

> 페이지 전체가 아닌, 페이지 내부에 결합(Composition)되는 실무 완성형 독립 콘텐츠 블록 명세서입니다.  
> **Component-First 원칙**: 블록은 날림 HTML 태그가 아니라, 반드시 검증된 원자 컴포넌트(`Button`, `Card`, `Badge`, `Input`, `Table` 등)를 레고 조각 삼아 조립합니다.

---

## 🧱 4대 레고 조립 파이프라인 (Lego Assembly Pipeline)

```
[1. W3C DTCG Tokens] ──> [2. UI Components] ──> [3. Content Blocks] ──> [4. Templates / Screens]
 (CSS 변수: 색상/간격)     (Button, Card, Badge)   (RealtimeChart, Chat)     (Dashboard, Checkout)
```

1. **Tokens**: 블록의 모든 곡률, 간격, 보더, 컬러는 CSS 변수(`var(--atom-*)`, `var(--bg-primary)` 등)로 주입됩니다.
2. **Components**: 블록은 반드시 `components/ui/`의 순수 아톰 컴포넌트를 임포트하여 조립합니다.
3. **Blocks**: 특정 기능/콘텐츠(차트, 챗, 요금제 등)를 완결성 있게 수행하는 독립 모듈입니다.
4. **Templates**: 1개 이상의 블록과 레이아웃이 결합되어 최종 화면(대시보드, 랜딩 등)을 구성합니다.

---

## 📦 7대 핵심 디자인 블록 카탈로그

### 1. 실시간 차트 & 틱 시계열 블록 (`realtime-chart`)
- **분류**: `chart` (Analytics & FinTech)
- **조립 컴포넌트**: `Card`, `Button`, `Badge`
- **주입 토큰**: `--text-primary`, `--bg-primary`, `--border-subtle`, `--radius`
- **핵심 기능**:
  - 1초 단위 실시간 틱 데이터 스트리밍 시뮬레이션 (재생/일시정지 토글)
  - 0KB 순수 SVG 기반 라인 차트 및 캔들스틱(Candle) 모드 전환
  - 시간 범위 필터 (1m, 5m, 1h, 1d) 및 24h High/Low/Volume 요약 스탯
- **결합 템플릿**: SaaS 성과 분석 대시보드 메인 캔버스, 금융 자산 모니터링 화면

### 2. 인터랙티브 AI 챗 & 메신저 블록 (`interactive-chat`)
- **분류**: `chat` (AI Assistant & Messenger)
- **조립 컴포넌트**: `Card`, `Input`, `Button`, `Badge`
- **주입 토큰**: `--text-primary`, `--bg-primary`, `--border-subtle`, `--radius`
- **핵심 기능**:
  - 발신/수신 말풍선 정렬 (송신자: 우측 고대비, 수신자: 좌측 서피스)
  - 자주 묻는 질문(FAQ) 원클릭 빠른 전송 제안 칩 (가로 스크롤)
  - 타이핑 중 애니메이션 인디케이터 및 자동 스크롤(Auto-scroll)
- **결합 템플릿**: 온디맨드 AI 코파일럿 드로어, 1:1 고객 상담 센터 화면

### 3. 플랜 비교 & 가격 정책 블록 (`pricing-table`)
- **분류**: `pricing` (Conversion & Subscriptions)
- **조립 컴포넌트**: `Card`, `Button`, `Badge`
- **주입 토큰**: `--text-primary`, `--bg-primary`, `--border-subtle`, `--border-strong`
- **핵심 기능**:
  - 월간 / 연간(20% 할인) 결제 주기 원클릭 토글 스위치 및 금액 실시간 재계산
  - 3단계 티어(Starter, Pro, Enterprise) 비교 구조
  - 추천 플랜(Pro) 1px 볼드 보더 하이라이트 및 원클릭 CTA
  - 티어별 포함/미포함 기능 체크리스트
- **결합 템플릿**: SaaS 구독 랜딩 페이지 요금표, 업그레이드 모달

### 4. 반응형 필터 카드 컬렉션 블록 (`card-list`)
- **분류**: `card` (Showcase & Directory)
- **조립 컴포넌트**: `Card`, `Button`, `Badge`, `Input`
- **주입 토큰**: `--text-primary`, `--bg-primary`, `--border-subtle`
- **핵심 기능**:
  - 실시간 검색 인풋 및 카테고리 필터 탭
  - 그리드(3열) ↔ 리스트(1열) 뷰포트 원클릭 토글
  - 북마크 토글 및 호버 피드백
- **결합 템플릿**: 리소스 라이브러리, 컴포넌트 카탈로그, 앱스토어 탐색기

### 5. 비용 시뮬레이터 & 캐러셀 슬라이더 블록 (`interactive-slider`)
- **분류**: `slider` (Simulation & Control)
- **조립 컴포넌트**: `Card`, `Slider`, `Button`, `Badge`
- **주입 토큰**: `--text-primary`, `--bg-primary`, `--border-subtle`
- **핵심 기능**:
  - 사용자 수/스토리지 용량 슬라이더 조절에 따른 실시간 견적 동적 계산기
  - 스와이프 가능한 슬라이드 캐러셀 쇼케이스 탭
- **결합 템플릿**: 클라우드 인프라 견적 계산기, 온보딩 인터랙티브 가이드

### 6. 비즈니스 메트릭 & 4대 KPI 스탯 블록 (`metric-stats`)
- **분류**: `stats` (Executive Dashboard)
- **조립 컴포넌트**: `Card`, `Badge`
- **주입 토큰**: `--text-primary`, `--bg-primary`, `--border-subtle`
- **핵심 기능**:
  - 매출, 활성 유저, 가동률, 전환율 4대 핵심 지표 요약
  - 전주 대비 증감 배지 (+14.8%) 및 미니 인라인 스파크라인 트렌드
- **결합 템플릿**: 관리자 대시보드 상단 서머리, 프로젝트 오버뷰

### 7. 프로덕션 파일 탐색기 & 계층 트리 블록 (`file-explorer`)
- **분류**: `files` (Developer Tools)
- **조립 컴포넌트**: `Card`, `Button`, `Badge`
- **주입 토큰**: `--text-primary`, `--bg-primary`, `--border-subtle`
- **핵심 기능**:
  - 폴더 계층 트리 사이드바 (확장/축소 아코디언)
  - 디렉토리 경로 브레드크럼 및 그리드/리스트 토글
  - 파일 확장자별 아이콘 매핑 및 실시간 파일 미리보기 패널
- **결합 템플릿**: 웹 IDE 코드 편집기, 클라우드 스토리지 매니저

---

## 🛠 AI Agent를 위한 블록 생성 지침
1. **임의의 Tailwind 색상 하드코딩 엄격 금지**:
   - `text-blue-500`, `bg-gray-100` 대신 시맨틱 토큰 `text-(--text-primary)`, `bg-(--bg-primary)`, `border-(--border-subtle)`을 사용합니다.
2. **원시 `<button>` 날림 태그 금지**:
   - 블록 내부의 모든 액션 버튼은 `components/ui/Button.tsx`의 `<Button variant="primary|secondary|outline|ghost">` 컴포넌트로 조립합니다.
3. **상태 피드백 보장**:
   - 로딩, 빈 데이터(Empty State), 활성/비활성 상태를 반드시 명시합니다.
