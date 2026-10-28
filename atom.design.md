# 🏛️ AtomSystem Universal Design Guide (atom.design.md)

> **Universal Design Token & Framework-Agnostic Design System**
> 단일 진실 공급원(SSOT)과 제로 런타임 오버헤드를 추구하는 모던 UI 디자인 지침서입니다.

---

## 1. 핵심 디자인 철학 (Design Principles)

### 01. 단일 진실 공급원 (Single Source of Truth)
> **모든 디자인 결정은 단 하나의 데이터 규격에서 파생됩니다.**

Figma, 마크다운 가이드, JSON 토큰 파일 중 어느 하나가 기준이 되면 시스템 전체의 코드가 자동 생성되어야 합니다. 개발자가 임의로 HEX 코드나 매직 넘버를 컴포넌트 내부에 하드코딩하는 것을 엄격히 금지합니다.

* **권장 실천 (DO)**:
  - ✅ 모든 색상, 여백, 곡률은 반드시 var(--atom-*) 시맨틱 토큰을 참조합니다.
  - ✅ 신규 스타일이 필요할 경우 토큰 명세서(tokens.json)에 먼저 추가합니다.
* **지양 안티패턴 (DON'T)**:
  - ❌ 컴포넌트 CSS/Tailwind에 #3182F6, 16px 등의 원천 값을 인라인으로 직접 작성하지 않습니다.
  - ❌ 페이지별로 유사한 역할을 하는 독립적인 테마 변수를 중복 선언하지 않습니다.
* **표준 참조**: `W3C DTCG Format Specification §1.1`

---

### 02. 제로 런타임 오버헤드 (Zero Runtime Overhead)
> **브라우저 런타임 계산을 최소화하고 브라우저 네이티브 기능을 활용합니다.**

CSS-in-JS의 런타임 파싱 비용, 자바스크립트 번들 팽창을 방지합니다. 네이티브 CSS Custom Properties(--*)와 정적 유틸리티 클래스로 사전 컴파일하여 0ms의 스타일 주입 속도를 보장합니다.

* **권장 실천 (DO)**:
  - ✅ CSS 표준 변수를 사용하여 브라우저 엔진 레벨에서 즉각적인 테마 전환을 수행합니다.
  - ✅ 정적 CSS 파일로 번들링하여 초기 페인트(FCP) 성능을 극대화합니다.
* **지양 안티패턴 (DON'T)**:
  - ❌ 런타임에 스타일 객체를 매번 연산하여 주입하는 무거운 동적 CSS 라이브러리에 의존하지 않습니다.
  - ❌ 테마 변경 시 컴포넌트 전체를 리렌더링하는 전역 상태 구독을 남용하지 않습니다.
* **표준 참조**: `Performance Budget & Core Web Vitals Standard`

---

### 03. 3계층 토큰 아키텍처 (3-Tier Token Hierarchy)
> **원천 토큰(Global) -> 의도 토큰(Semantic) -> 컴포넌트 토큰(Component)**

원천 값과 컴포넌트 스타일 사이에 반드시 "의도(Semantic)" 계층을 둡니다. 시맨틱 계층이 존재해야만 다크 모드, 고대비 모드, 멀티 브랜드 테마 변경 시 컴포넌트 코드를 한 줄도 수정하지 않고 스타일을 일괄 전환할 수 있습니다.

* **권장 실천 (DO)**:
  - ✅ UI 스타일링 시 항상 Tier 2(Semantic: --atom-bg-surface, --atom-color-primary)를 최우선으로 사용합니다.
  - ✅ 다크 테마에서는 Tier 1(팔레트)을 바꾸는 것이 아니라 Tier 2의 참조 링크만 스위칭합니다.
* **지양 안티패턴 (DON'T)**:
  - ❌ 컴포넌트에서 Tier 1 원천 토큰(var(--blue-500))을 직접 참조하지 않습니다.
  - ❌ 컴포넌트 토큰(Tier 3)을 범용 레이아웃 스타일에 무분별하게 혼용하지 않습니다.
* **표준 참조**: `W3C DTCG 2025.10 §3 Alias & Inheritance`

---

### 04. 프레임워크 불가지론 (Framework-Agnostic)
> **React, Vue, Svelte, Angular, Vanilla HTML 어디서나 100% 동일하게 동작합니다.**

디자인 시스템은 특정 자바스크립트 프레임워크에 종속되어서는 안 됩니다. CSS 표준과 웹 표준을 기반으로 구축되어 모노레포 내 여러 기술 스택이 혼재하더라도 완벽한 디자인 일관성을 유지합니다.

* **권장 실천 (DO)**:
  - ✅ 웹 표준 CSS 변수와 표준 HTML5 시맨틱 엘리먼트를 기준으로 설계합니다.
  - ✅ 바닐라 자바스크립트나 레거시 jQuery 환경에서도 클래스명만으로 동일 스타일을 재현할 수 있게 합니다.
* **지양 안티패턴 (DON'T)**:
  - ❌ 특정 프레임워크(React hook 등)가 없으면 스타일이 깨지는 비표준 의존성을 생성하지 않습니다.

---

### 05. 예측 가능한 명명 규격 (Predictable Naming Convention)
> **카테고리-개념-변형-상태 순으로 명확하게 계층화된 네이밍을 준수합니다.**

토큰의 이름을 보면 어떤 유형이며 어디에 쓰이는지 개발자와 디자이너가 직관적으로 알 수 있어야 합니다. W3C DTCG의 네이밍 권고에 따라 [namespace]-[category]-[concept]-[variant]-[state] 형태를 표준으로 삼습니다.

* **권장 실천 (DO)**:
  - ✅ 규격에 맞춘 명확한 네이밍(예: --atom-color-primary-hover, --atom-space-4)을 사용합니다.
  - ✅ 단축어 축약보다 명확한 의미 전달을 우선합니다.
* **지양 안티패턴 (DON'T)**:
  - ❌ 개인적인 선호에 따른 자의적 축약(예: --at-clr-pr-h)을 사용하지 않습니다.
  - ❌ 문맥이 없는 모호한 이름(예: --atom-color-1, --atom-size-box)을 선언하지 않습니다.
* **표준 참조**: `W3C DTCG Specification §2 Token Names`

---

### 06. 접근성 보장 (Accessibility by Default)
> **모든 시맨틱 색상 쌍은 WCAG 2.1 AA 기준 4.5:1 이상의 명도 대비를 만족합니다.**

접근성은 나중에 추가하는 기능이 아니라 디자인 토큰 생성 시점에 자동으로 검증되어야 하는 기본 원칙입니다. 배경색과 전경 텍스트 색상의 토큰 페어링은 기본적으로 높은 가독성을 보장합니다.

* **권장 실천 (DO)**:
  - ✅ 텍스트와 배경 토큰 결합 시 4.5:1(일반 텍스트) 또는 3:1(대형 텍스트) 명도 대비를 확인합니다.
  - ✅ 색상 구분에만 의존하지 않고 시각적 힌트(아이콘, 밑줄, 명도 차이)를 병행합니다.
* **지양 안티패턴 (DON'T)**:
  - ❌ 포커스 링(Focus Ring) 및 아웃라인을 임의로 제거(outline: none)하지 않습니다.
  - ❌ 흐린 회색 텍스트 토큰을 본문 필수 정보 표시에 남용하지 않습니다.
* **표준 참조**: `W3C Web Content Accessibility Guidelines (WCAG 2.1 AA)`

---

## 2. 디자인 토큰 사양 (Design Token Specifications)

### 🎨 시맨틱 컬러 토큰
| 분류 | 토큰 변수명 | 기본값 | 용도 및 설명 |
| :--- | :--- | :--- | :--- |
| brand | `--atom-color-primary` | `#3182f6` | 주요 액션 버튼, 활성 탭, 브랜드 강조 영역의 핵심 색상 |
| brand | `--atom-color-primary-hover` | `#1b64da` | Primary 컴포넌트에 마우스를 올렸을 때 적용되는 딥 톤 |
| brand | `--atom-color-primary-subtle` | `#e8f3ff` | 배지 배경, 활성 리스트 아이템, 선택 하이라이트 배경 |
| surface | `--atom-bg-primary` | `#ffffff` | 웹 전체 페이지의 기본 캔버스 배경 (다크모드: #090a0f) |
| surface | `--atom-bg-surface` | `#f8f9fa` | 카드, 모달 다이얼로그, 패널, 드롭다운 메뉴의 바탕색 |
| surface | `--atom-bg-muted` | `#f1f3f5` | 비활성화된 폼 필드, 태그 칩, 보조 영역 배경 |
| text | `--atom-text-primary` | `#191f28` | 가장 높은 명도 대비를 갖는 핵심 본문 및 헤드라인 텍스트 |
| text | `--atom-text-secondary` | `#8b95a1` | 설명문, 부가 라벨, 플레이스홀더, 서브 텍스트 |
| text | `--atom-text-muted` | `#b0b8c1` | 타임스탬프, 비활성화된 라벨, 장식성 힌트 텍스트 |
| border | `--atom-border-subtle` | `#f2f4f6` | 카드 구분선, 리스트 경계선 등 부드러운 분리선 |
| border | `--atom-border-strong` | `#e5e8eb` | 인풋 필드 외곽선, 명확한 아웃라인 버튼, 모달 경계선 |
| status | `--atom-status-success` | `#10b981` | 성공 완료 알림, 온라인 상태, 송금 완료 상태 |
| status | `--atom-status-danger` | `#f43f5e` | 폼 유효성 에러, 경고 메시지, 삭제 등 파괴적 액션 |
| status | `--atom-status-warning` | `#f59e0b` | 주의 알림, 대기 중인 상태, 결제 보류 |

### 📐 라운딩 (Border Radius)
| 토큰 변수명 | 값 | 설명 |
| :--- | :--- | :--- |
| `--atom-radius-none` | `0px` | 단단한 테크니컬 대시보드 및 플랫 디자인 |
| `--atom-radius-sm` | `6px` | 태그 배지, 미니 인풋, 정밀 데이터 테이블 컨트롤 |
| `--atom-radius-md` | `10px` | 일반적인 버튼, 인풋 필드, 툴팁 |
| `--atom-radius-lg` | `16px` | 카드, 대화상자 모달, 주요 모바일 시트 |
| `--atom-radius-xl` | `24px` | 바텀시트 최상단 모서리, 히어로 배너 카드 |
| `--atom-radius-full` | `9999px` | 필터 칩, 플로팅 액션 버튼(FAB), 원형 아바타 |

### 🔲 그림자 (Elevation Shadows)
| 토큰 변수명 | 값 | 설명 |
| :--- | :--- | :--- |
| `--atom-shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | 기본 카드, 인풋 포커스 상태, 미세한 구분 |
| `--atom-shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | 호버된 카드, 드롭다운 메뉴, 팝오버 툴팁 |
| `--atom-shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | 플로팅 내비게이션 바, 토스트 알림 메시지 |
| `--atom-shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.15)` | 화면 최상단 레이어의 모달 다이얼로그, 바텀시트 |

### 📏 여백 척도 (Spacing Scale)
| 토큰 변수명 | 픽셀 | REM |
| :--- | :--- | :--- |
| `--atom-space-1` | 4px | 4px |
| `--atom-space-2` | 8px | 8px |
| `--atom-space-3` | 12px | 12px |
| `--atom-space-4` | 16px | 16px |
| `--atom-space-5` | 20px | 20px |
| `--atom-space-6` | 24px | 24px |
| `--atom-space-8` | 32px | 32px |
| `--atom-space-12` | 48px | 48px |
| `--atom-space-16` | 64px | 64px |

---

## 3. 브랜드 프리셋 (Presets)
- **토스 스타일 (Toss) (`toss`)**: 메인 색상 `#3182f6`, 기본 곡률 `16px` — Vivid Blue, 16px 볼드 라운딩, 시원한 여백과 극도의 미니멀리즘
- **당근 스타일 (Daangn) (`daangn`)**: 메인 색상 `#ff6f0f`, 기본 곡률 `12px` — Warm Orange, 12px 소프트 라운딩, 친근하고 따뜻한 커뮤니티 감성
- **모던 바이올렛 (Violet Tech) (`hyper-violet`)**: 메인 색상 `#7c3aed`, 기본 곡률 `8px` — 세련된 보라색 테크 감성, 8px 샤프 라운딩, 개발자/B2B 최적화
- **에코 에메랄드 (Emerald) (`forest-emerald`)**: 메인 색상 `#10b981`, 기본 곡률 `14px` — 자연스럽고 편안한 딥 그린, 핀테크 자산 및 웰니스 서비스용
