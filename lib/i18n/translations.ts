import { TranslationDictionary } from './types';

export const TRANSLATIONS: Record<'ko' | 'en' | 'ja', TranslationDictionary> = {
  "ko": {
    "common": {
      "copy": "복사",
      "copied": "복사됨!",
      "download": "다운로드",
      "search": "검색...",
      "close": "닫기",
      "home": "홈",
      "docs": "문서",
      "language": "언어",
      "initCommand": "설치 명령어: npx atomsystem init",
      "preview": "미리보기",
      "name": "토큰 명칭",
      "value": "원천 값",
      "description": "용도 및 설명",
      "category": "구분",
      "variable": "CSS 변수 (클릭 복사)",
      "themeEditor": "테마 에디터 (Local Only)"
    },
    "home": {
      "heroTitle": "플랫폼에 독립적인 디자인 토큰과\n실무 UX 패턴 라이브러리",
      "heroSubtitle": "AtomDesignToken은 피그마 및 마크다운 기반의 디자인 결정을 단일 진실 공급원(SSOT)으로 관리하고, CSS 변수와 프레임워크 독립적 시맨틱 클래스로 컴파일하여 일관된 제품 경험을 구축합니다.",
      "getStarted": "시작하기",
      "principlesTitle": "설계 원칙 (Principles)",
      "principlesDesc": "단일 진실 공급원(SSOT), 제로 런타임, 3계층 아키텍처 등 6대 핵심 설계 규격.",
      "principlesLink": "원칙 가이드 보기",
      "tokensTitle": "디자인 토큰 명세 (Tokens)",
      "tokensDesc": "W3C DTCG 표준 기반 색상, 타이포그래피, 곡률, 간격, 그림자 CSS 변수 카탈로그.",
      "tokensLink": "토큰 명세서 보기",
      "motionTitle": "모션 및 트랜지션 (Motion)",
      "motionDesc": "지속 시간(Duration)과 이징(Easing) 큐빅 베지에 타이밍 토큰 및 실시간 테스트.",
      "motionLink": "모션 명세 보기",
      "componentsTitle": "컴포넌트 가이드 & 명세 (Components)",
      "componentsDesc": "버튼, 인풋, 모달, 바텀시트, 탭 등 시맨틱 토큰과 결합된 프로덕션 UI 컴포넌트.",
      "componentsLink": "컴포넌트 문서 보기",
      "blocksTitle": "디자인 블록 (Blocks)",
      "blocksDesc": "실시간 차트, AI 대화형 메신저, 카드 리스트, 슬라이더, 요금제 등 완성형 프로덕션 모듈.",
      "blocksLink": "디자인 블록 탐색",
      "patternsTitle": "UX 인터랙션 패턴 (Patterns)",
      "patternsDesc": "대시보드, 폼 유효성, 결제, 온보딩 등 검증된 실무 UX 패턴 및 안티패턴 체크리스트.",
      "patternsLink": "UX패턴 탐색",
      "dependenciesTitle": "디펜던시 매트릭스 (Dependencies)",
      "dependenciesDesc": "0KB 런타임 아키텍처, 패키지 의존성 및 프레임워크 간 크로스 플랫폼 호환성.",
      "dependenciesLink": "디펜던시 확인",
      "guideTitle": "라이브러리 활용 가이드 (Guide)",
      "guideDesc": "React, Vue, Vanilla HTML 어디서나 의존성 없이 스타일을 공유하고 빌드하는 실전 지침.",
      "guideLink": "활용 가이드 보기"
    },
    "nav": {
      "foundations": "파운데이션",
      "principles": "원칙",
      "tokens": "디자인 토큰",
      "motion": "모션",
      "library": "UI 라이브러리",
      "layout": "레이아웃 & 간격",
      "components": "컴포넌트",
      "icons": "아이콘",
      "blocks": "디자인 블록",
      "patterns": "UX 패턴",
      "engineering": "엔지니어링",
      "dependencies": "디펜던시",
      "guide": "가이드",
      "subDescriptions": {
        "/principles": "SSOT, 제로 런타임, 3계층 아키텍처 등 6대 핵심 설계 규격",
        "/tokens": "색상, 타이포, 곡률, 간격, 그림자 W3C DTCG 표준 명세",
        "/motion": "지속 시간(Duration)과 이징(Easing) 타이밍 토큰 및 실시간 테스트",
        "/layout": "컨테이너(Container), 스택(Stack), 그리드(Grid) 및 간격(Spacing) 표준 가이드",
        "/components/button": "버튼, 인풋, 모달 등 시맨틱 토큰과 결합된 프로덕션 UI",
        "/icons": "3,800+ 무료 오픈소스 아이콘 명세 및 테마 연동",
        "/blocks": "실시간차트, 챗, 카드리스트, 슬라이더, 가격 등 실무 완성형 모듈",
        "/patterns": "대시보드, 폼 유효성, 결제 등 실무 검증 인터랙션 가이드",
        "/dependencies": "0KB 런타임 아키텍처 및 프레임워크 크로스 호환성 매트릭스",
        "/guide": "React, Vue, Vanilla HTML 어디서나 의존성 없는 연동 실전 지침",
        "/studio": "로컬 프로젝트의 tokens/token.json과 css를 실시간 편집하는 GUI 도구 [Local Only]"
      }
    },
    "sidebar": {
      "apiReference": "API 레퍼런스",
      "searchPlaceholder": "컴포넌트 검색 (Cmd + K)...",
      "foundationsGroup": "Foundations (기초 규격)",
      "layoutAndSpacing": "레이아웃 & 간격",
      "colorAndStatus": "색상 & 상태",
      "fontAndTypography": "폰트 & 타이포그래피",
      "formGroup": "Form & 인풋",
      "feedbackGroup": "피드백 & 오버레이",
      "navGroup": "네비게이션 & 메뉴",
      "dataGroup": "데이터 표시",
      "layoutGroup": "구조 & 레이아웃",
      "components": {
        "button": "버튼",
        "input": "인풋 필드",
        "selection": "스위치 & 체크박스",
        "dialog": "모달 다이얼로그",
        "sheet": "바텀시트 드로어",
        "alert": "알림 콜아웃",
        "tabs": "세그먼트 탭스",
        "badge": "상태 뱃지 & 태그",
        "card": "콘텐츠 카드",
        "table": "데이터 테이블",
        "calendar": "캘린더 & 날짜 선택기",
        "select": "커스텀 셀렉트",
        "accordion": "아코디언",
        "tooltip": "툴팁 & 팝오버",
        "toast": "토스트 알림",
        "pagination": "페이지네이션",
        "radio": "라디오 그룹",
        "slider": "슬라이더",
        "avatar": "아바타 프로필",
        "progress": "진행도 프로그레스",
        "skeleton": "스켈레톤 로더",
        "breadcrumb": "브레드크럼",
        "separator": "구분선",
        "textarea": "텍스트에리어",
        "tree": "트리 뷰",
        "container": "컨테이너",
        "layout": "레이아웃 & 스택",
        "layout-spacing": "레이아웃 & 간격",
        "color-status": "색상 & 상태",
        "typography": "폰트 & 타이포그래피"
      }
    },
    "principles": {
      "title": "디자인 시스템 설계 원칙 (Principles)",
      "subtitle": "AtomDesignToken은 임시방편적인 절차적 하드코딩을 배제하고, 플랫폼에 독립적인 단일 진실 공급원(SSOT)과 브라우저 네이티브 기술, 그리고 4단계 AI 레고 조립 파이프라인을 결합하여 고품질 엔터프라이즈 UI를 구축하기 위한 핵심 규격을 따릅니다.",
      "categoryAll": "전체 원칙",
      "categoryAgent": "AI 운영 원칙",
      "categoryCore": "핵심 원칙",
      "categoryArchitecture": "아키텍처",
      "categoryToken": "토큰 규격",
      "categoryAccessibility": "접근성",
      "badgeDo": "권장 지침 (DO)",
      "badgeDont": "지양 패턴 (DON'T)",
      "items": {
        "ssot": {
          "title": "단일 진실 공급원 (Single Source of Truth)",
          "subtitle": "모든 디자인 결정은 단 하나의 데이터 규격에서 파생됩니다.",
          "description": "Figma, 마크다운 가이드, JSON 토큰 파일 중 어느 하나가 기준이 되면 시스템 전체의 코드가 자동 생성되어야 합니다. 개발자가 임의로 HEX 코드나 매직 넘버를 컴포넌트 내부에 하드코딩하는 것을 엄격히 금지합니다.",
          "dos": [
            "모든 색상, 여백, 곡률은 반드시 var(--atom-*) 시맨틱 토큰을 참조합니다.",
            "신규 스타일이 필요할 경우 토큰 명세서(tokens.json)에 먼저 추가합니다."
          ],
          "donts": [
            "컴포넌트 CSS/Tailwind에 #3182F6, 16px 등의 원천 값을 인라인으로 직접 작성하지 않습니다.",
            "페이지별로 유사한 역할을 하는 독립적인 테마 변수를 중복 선언하지 않습니다."
          ]
        },
        "zero-runtime": {
          "title": "제로 런타임 오버헤드 (Zero Runtime Overhead)",
          "subtitle": "브라우저 런타임 계산을 최소화하고 브라우저 네이티브 기능을 활용합니다.",
          "description": "CSS-in-JS의 런타임 파싱 비용, 자바스크립트 번들 팽창을 방지합니다. 네이티브 CSS Custom Properties(--*)와 정적 유틸리티 클래스로 사전 컴파일하여 0ms의 스타일 주입 속도를 보장합니다.",
          "dos": [
            "CSS 표준 변수를 사용하여 브라우저 엔진 레벨에서 즉각적인 테마 전환을 수행합니다.",
            "정적 CSS 파일로 번들링하여 초기 페인트(FCP) 성능을 극대화합니다."
          ],
          "donts": [
            "런타임에 스타일 객체를 매번 연산하여 주입하는 무거운 동적 CSS 라이브러리에 의존하지 않습니다.",
            "테마 변경 시 컴포넌트 전체를 리렌더링하는 전역 상태 구독을 남용하지 않습니다."
          ]
        },
        "three-tier": {
          "title": "3계층 토큰 아키텍처 (3-Tier Token Hierarchy)",
          "subtitle": "원천 토큰(Global) -> 의도 토큰(Semantic) -> 컴포넌트 토큰(Component)",
          "description": "원천 값과 컴포넌트 스타일 사이에 반드시 \"의도(Semantic)\" 계층을 둡니다. 시맨틱 계층이 존재해야만 다크 모드, 고대비 모드, 멀티 브랜드 테마 변경 시 컴포넌트 코드를 한 줄도 수정하지 않고 스타일을 일괄 전환할 수 있습니다.",
          "dos": [
            "UI 스타일링 시 항상 Tier 2(Semantic: --atom-bg-surface, --atom-color-primary)를 최우선으로 사용합니다.",
            "다크 테마에서는 Tier 1(팔레트)을 바꾸는 것이 아니라 Tier 2의 참조 링크만 스위칭합니다."
          ],
          "donts": [
            "컴포넌트에서 Tier 1 원천 토큰(var(--blue-500))을 직접 참조하지 않습니다.",
            "컴포넌트 토큰(Tier 3)을 범용 레이아웃 스타일에 무분별하게 혼용하지 않습니다."
          ]
        },
        "framework-agnostic": {
          "title": "프레임워크 불가지론 (Framework-Agnostic)",
          "subtitle": "React, Vue, Svelte, Angular, Vanilla HTML 어디서나 100% 동일하게 동작합니다.",
          "description": "디자인 시스템은 특정 자바스크립트 프레임워크에 종속되어서는 안 됩니다. CSS 표준과 웹 표준을 기반으로 구축되어 모노레포 내 여러 기술 스택이 혼재하더라도 완벽한 디자인 일관성을 유지합니다.",
          "dos": [
            "웹 표준 CSS 변수와 표준 HTML5 시맨틱 엘리먼트를 기준으로 설계합니다.",
            "바닐라 자바스크립트나 레거시 jQuery 환경에서도 클래스명만으로 동일 스타일을 재현할 수 있게 합니다."
          ],
          "donts": [
            "특정 프레임워크(React hook 등)가 없으면 스타일이 깨지는 비표준 의존성을 생성하지 않습니다."
          ]
        },
        "predictable-naming": {
          "title": "예측 가능한 명명 규격 (Predictable Naming Convention)",
          "subtitle": "카테고리-개념-변형-상태 순으로 명확하게 계층화된 네이밍을 준수합니다.",
          "description": "토큰의 이름을 보면 어떤 유형이며 어디에 쓰이는지 개발자와 디자이너가 직관적으로 알 수 있어야 합니다. W3C DTCG의 네이밍 권고에 따라 [namespace]-[category]-[concept]-[variant]-[state] 형태를 표준으로 삼습니다.",
          "dos": [
            "규격에 맞춘 명확한 네이밍(예: --atom-color-primary-hover, --atom-space-4)을 사용합니다.",
            "단축어 축약보다 명확한 의미 전달을 우선합니다."
          ],
          "donts": [
            "개인적인 선호에 따른 자의적 축약(예: --at-clr-pr-h)을 사용하지 않습니다.",
            "문맥이 없는 모호한 이름(예: --atom-color-1, --atom-size-box)을 선언하지 않습니다."
          ]
        },
        "accessibility": {
          "title": "접근성 보장 (Accessibility by Default)",
          "subtitle": "모든 시맨틱 색상 쌍은 WCAG 2.1 AA 기준 4.5:1 이상의 명도 대비를 만족합니다.",
          "description": "접근성은 나중에 추가하는 기능이 아니라 디자인 토큰 생성 시점에 자동으로 검증되어야 하는 기본 원칙입니다. 배경색과 전경 텍스트 색상의 토큰 페어링은 기본적으로 높은 가독성을 보장합니다.",
          "dos": [
            "텍스트와 배경 토큰 결합 시 4.5:1(일반 텍스트) 또는 3:1(대형 텍스트) 명도 대비를 확인합니다.",
            "색상 구분에만 의존하지 않고 시각적 힌트(아이콘, 밑줄, 명도 차이)를 병행합니다."
          ],
          "donts": [
            "포커스 링(Focus Ring) 및 아웃라인을 임의로 제거(outline: none)하지 않습니다.",
            "흐린 회색 텍스트 토큰을 본문 필수 정보 표시에 남용하지 않습니다."
          ]
        },
        "anti-pattern-prevention": {
          "title": "정갈한 AI 안티패턴 방어 (Anti-Pattern Prevention & Polish)",
          "subtitle": "AI 슬롭(AI Slop)을 원천 차단하고 불필요한 장식을 덜어낸 정갈한 본질을 추구합니다.",
          "description": "Impeccable 디자인 철학에 기반하여 LLM이 양산하는 클리셰적 디자인 왜곡을 엄격히 방어합니다. 과도한 네온 그라디언트, 촌스러운 단면 테두리, 불필요한 바운스 모션을 지양하고 담백하며 정돈된 모던 인터페이스를 완성합니다.",
          "dos": [
            "상태 표시는 굵은 단면 테두리 대신 은은한 1px 보더, 상태 도트/아이콘, 부드러운 틴트 배경을 활용합니다.",
            "모션은 튀는 바운스(bounce) 대신 자연스러운 감속 이징(ease-out, 200~300ms)과 미세한 페이드/스케일을 적용합니다.",
            "코드 커밋 전 `npm run lint:design` (impeccable detect)을 통해 디자인 결함을 무비용(0-Token)으로 정적 검증합니다."
          ],
          "donts": [
            "카드나 콜아웃, 사이드바에 굵은 좌측 테두리(border-l-4 등 Side-tab tell)를 남발하지 않습니다.",
            "시각적 피로감을 유발하는 무의미한 보라색 그라디언트나 과도한 드롭 섀도를 인라인 하드코딩하지 않습니다.",
            "시각적 위계와 무관하게 모든 요소를 둥근 플로팅 카드로 감싸는 레이아웃 남용을 피합니다."
          ]
        },
        "ai-governance-pipeline": {
          "title": "AI 운영 원칙: 4단계 레고 조립 파이프라인 (AI Agent Pipeline)",
          "subtitle": "토큰(Tokens) → 컴포넌트(Components) → 블록(Blocks) → UX패턴(Patterns)",
          "description": "모든 AI 어시스턴트(Cursor, Claude Code, Antigravity, Copilot)는 복잡한 화면을 생성할 때 한 번에 거대한 코드를 작성하지 않고, 반드시 검증된 4단계 조립 파이프라인을 순차적으로 거쳐야 합니다. 새 UI 요소가 필요하면 기초 원자 컴포넌트부터 생성한 후 블록으로 합성하는 [컴포넌트 우선 원칙(Component-First)]을 엄수합니다.",
          "dos": [
            "새 UI를 만들 때 components/ui/에 원자 컴포넌트를 먼저 정의하고, 이를 import하여 조립합니다.",
            "모든 스타일은 반드시 CSS 변수(var(--atom-*), var(--text-primary))를 사용합니다.",
            "빈 데이터(Empty), 로딩(Skeleton), 에러, 키보드 접근성(A11y) 4대 상태를 필수로 구현합니다."
          ],
          "donts": [
            "컴포넌트 단계를 건너뛰고 블록이나 페이지에 임의의 원시 태그(<button>, <div class=\"rounded-lg...\">)를 날림으로 하드코딩하지 않습니다.",
            "Tailwind 임의 컬러(text-blue-500, bg-gray-100 등)를 인라인으로 직접 작성하지 않습니다."
          ]
        },
        "ai-roles-skills": {
          "title": "4대 AI 전문 역할 & 에이전트 스킬 활용 체계 (AI Roles & Skills)",
          "subtitle": "token-guardian, component-architect, block-designer, docs-curator 협업 시스템",
          "description": "AtomSystem은 단일 모델의 환각을 방지하기 위해 4대 전문 역할로 책임을 분리합니다: 1) token-guardian(W3C 토큰 무결성 감시 및 하드코딩 차단), 2) component-architect(순수 원자 컴포넌트 설계), 3) block-designer(컴포넌트 조립 및 완성형 UX 블록 구축), 4) docs-curator(레고 조립 문서화 및 E2E 검증). `npx atomsystem init` 시 `.agents/skills/atomsystem/SKILL.md`가 자동 설치되어 AI가 이 모든 역할을 자율적으로 수행합니다.",
          "dos": [
            "AI에게 작업 지시 시 \"컴포넌트 우선 원칙으로 조립해줘\" 또는 \"atom.design.md 토큰을 준수해줘\"라고 명시합니다.",
            "코드 변경 후 공식 `npm run lint:design` (impeccable detect)을 통해 AI 작업물의 무결성과 디자인 품질을 정적 검증합니다.",
            "AI가 디자인 가이드 Markdown(토스, 당근, 커스텀)을 읽어 W3C tokens.json으로 빌드하도록 스킬을 호출합니다."
          ],
          "donts": [
            "500줄 이상의 거대한 모놀리식 단일 컴포넌트 작성을 AI에게 요구하거나 방치하지 않습니다.",
            "도메인 데이터를 페이지 컴포넌트 내부에 직접 인라인으로 하드코딩하게 두지 않습니다."
          ]
        }
      }
    },
    "tokens": {
      "title": "디자인 토큰(Design Tokens) 표준 CSS 변수 명세",
      "description": "색상, 폰트, 여백, 곡률 등 UI의 모든 디자인 결정을 플랫폼에 독립적인 최소 단위 데이터로 정의합니다. W3C DTCG 표준 규격에 따라 런타임 제로 순수 CSS 변수로 동작합니다.",
      "brandColor": "브랜드:",
      "radius": "곡률:",
      "w3cSpec": "W3C DTCG 2025.10 Spec",
      "ssot": "Single Source of Truth (SSOT)",
      "architecture": "3계층 토큰 아키텍처",
      "tabColors": "색상",
      "tabTypography": "타이포그래피",
      "tabRadius": "곡률",
      "tabSpacing": "간격",
      "tabShadow": "그림자",
      "tabLayout": "레이아웃",
      "tabJson": "token.json 전체 보기",
      "jsonTitle": "tokens/token.json",
      "jsonBadge": "W3C DTCG Format",
      "jsonCopy": "전체 복사",
      "jsonDownload": "파일 다운로드",
      "jsonCliGuide": "Zero-Runtime 0KB CSS Variables & Tailwind v4 호환",
      "emptySearch": "검색된 토큰이 없습니다."
    },
    "motion": {
      "title": "모션 및 인터랙션 토큰 (Motion & Timing Tokens)",
      "description": "자연스럽고 정돈된 인터랙션을 위한 지속 시간(Duration)과 이징(Easing) 타이밍 토큰 명세입니다.",
      "tabDuration": "지속 시간 (Duration)",
      "tabEasing": "이징 곡선 (Easing)",
      "tabInteractive": "인터랙션 패턴 테스트",
      "previewTitle": "실시간 모션 프리뷰",
      "speedTitle": "애니메이션 속도 제어",
      "copyVariable": "토큰 변수 복사"
    },
    "dependencies": {
      "title": "디펜던시 매트릭스 (Dependencies & Zero-Runtime)",
      "description": "AtomSystem은 브라우저 네이티브 CSS 변수 기반으로 설계되어 런타임 자바스크립트 번들 오버헤드가 제로(0KB)입니다.",
      "filterAll": "전체 의존성",
      "filterRuntime": "런타임 (Runtime: 0KB)",
      "filterBuild": "빌드 도구 (Build)",
      "filterTypes": "타입 안정성 (Types)",
      "filterQA": "테스팅 및 품질 (QA)",
      "matrixTitle": "프레임워크 간 크로스 플랫폼 호환성 매트릭스"
    },
    "blocks": {
      "title": "디자인 블록",
      "description": "토큰 기반으로 결합된 완성형 UI 콘텐츠 블록입니다.",
      "allBlocks": "전체 블록",
      "realtimeChart": "실시간 차트",
      "chat": "채팅 & 메신저",
      "cardList": "카드 리스트",
      "slider": "슬라이더 & 캐러셀",
      "pricing": "가격 정책 UX",
      "kpi": "통계 & KPI 지표",
      "fileExplorer": "파일 탐색기",
      "searchPlaceholder": "블록 명칭, 키워드, ID로 검색...",
      "noResults": "검색된 블록이 없습니다."
    },
    "componentsDoc": {
      "previewTitle": "인터랙티브 라이브 프리뷰 (Interactive Preview)",
      "codeSnippetTitle": "컴포넌트 코드 스니펫 (Code Copy)",
      "copyCode": "전체 코드 복사",
      "copyComponentCode": "컴포넌트 코드 복사",
      "copied": "복사 완료!",
      "useCasesTitle": "실무 주요 사용 케이스 (Use Cases)",
      "usagePatternsTitle": "권장 사용 패턴 및 설계 지침 (Usage Patterns)",
      "dosAndDontsTitle": "올바른 사용법 & 안티패턴 방지 (Do's & Don'ts)",
      "propsSpecTitle": "API Props 규격 명세 (API Reference)",
      "relatedPatternsTitle": "이 컴포넌트가 사용되는 실무 UX 패턴",
      "tokensTitle": "연동된 W3C DTCG 디자인 토큰 (tokens/token.json)",
      "tokensViewAll": "전체 토큰 명세 보기 →",
      "tokensBoundBadge": "W3C 디자인 토큰 {n}개 연동됨 ↓",
      "tokensEditInStudio": "테마 에디터에서 수정 (/studio)",
      "tabLivePreview": "라이브 뷰",
      "tabInspectTokens": "디자인 토큰값 조회",
      "thRole": "토큰 역할 (Role)",
      "thVariable": "CSS 변수 (Variable)",
      "thDtcgPath": "DTCG JSON 경로",
      "thDefaultValue": "기본값 및 기능 매핑",
      "propName": "속성명 (Prop)",
      "propType": "타입 (Type)",
      "propDefault": "기본값 (Default)",
      "propDescription": "설명 (Description)",
      "doLabel": "권장 (DO)",
      "dontLabel": "지양 (DON'T)",
      "tocTitle": "이 페이지 목차",
      "searchPlaceholder": "컴포넌트 검색 (Cmd + K)..."
    }
  },
  "en": {
    "common": {
      "copy": "Copy",
      "copied": "Copied!",
      "download": "Download",
      "search": "Search...",
      "close": "Close",
      "home": "Home",
      "docs": "Docs",
      "language": "Language",
      "initCommand": "Install Command: npx atomsystem init",
      "preview": "Preview",
      "name": "Token Name",
      "value": "Raw Value",
      "description": "Usage & Description",
      "category": "Category",
      "variable": "CSS Variable (Click to copy)",
      "themeEditor": "Theme Editor (Local Only)"
    },
    "home": {
      "heroTitle": "Platform-Agnostic Design Tokens &\nProduction UX Pattern Library",
      "heroSubtitle": "AtomDesignToken manages Figma and Markdown-based design decisions as a Single Source of Truth (SSOT), compiling into CSS custom variables and framework-agnostic semantic classes for consistent product experiences.",
      "getStarted": "Get Started",
      "principlesTitle": "Design Principles",
      "principlesDesc": "6 core architectural standards including Single Source of Truth (SSOT), zero runtime overhead, and 3-tier layering.",
      "principlesLink": "View Principles",
      "tokensTitle": "Design Tokens Specification",
      "tokensDesc": "Standard CSS variables catalog for colors, typography, radius, spacing, and shadows aligned with W3C DTCG.",
      "tokensLink": "View Tokens",
      "motionTitle": "Motion & Transitions",
      "motionDesc": "Duration and easing cubic-bezier timing tokens with interactive real-time test playground.",
      "motionLink": "View Motion",
      "componentsTitle": "Components Guide & Specs",
      "componentsDesc": "Production UI components bound to semantic DTCG design tokens: Button, Input, Modal, Sheet, and Tabs.",
      "componentsLink": "View Components",
      "blocksTitle": "Design Content Blocks",
      "blocksDesc": "Production-ready modules assembled from tokens: Realtime Chart, AI Chat, Pricing Table, and Card List.",
      "blocksLink": "Explore Blocks",
      "patternsTitle": "UX Interaction Patterns",
      "patternsDesc": "Battle-tested production UX patterns: Dashboard, Form Validation, Checkout, and Anti-pattern checklists.",
      "patternsLink": "Explore Patterns",
      "dependenciesTitle": "Dependency Matrix",
      "dependenciesDesc": "0KB runtime bundle overhead architecture, package dependencies, and cross-framework compatibility.",
      "dependenciesLink": "View Dependencies",
      "guideTitle": "Library Usage Guide",
      "guideDesc": "Practical instructions for sharing and building tokens across React, Vue, and Vanilla HTML without lock-in.",
      "guideLink": "View Guide"
    },
    "nav": {
      "foundations": "Foundations",
      "principles": "Principles",
      "tokens": "Design Tokens",
      "motion": "Motion",
      "library": "UI Library",
      "layout": "Layout & Spacing",
      "components": "Components",
      "icons": "Icons",
      "blocks": "Design Blocks",
      "patterns": "UX Patterns",
      "engineering": "Engineering",
      "dependencies": "Dependencies",
      "guide": "Guide",
      "subDescriptions": {
        "/principles": "6 core architectural standards including SSOT, zero runtime, and 3-tier layering",
        "/tokens": "W3C DTCG standard specs for colors, typography, radius, spacing, and shadows",
        "/motion": "Duration and easing timing tokens with interactive real-time playground",
        "/layout": "Standard guides for Container, Stack, Grid, and Spacing scale",
        "/components/button": "Production UI components bound to semantic DTCG design tokens",
        "/icons": "3,800+ open-source icon specifications with instant theme binding",
        "/blocks": "Ready-to-use functional blocks: charts, chat, card lists, sliders, pricing",
        "/patterns": "Battle-tested interaction patterns: dashboards, checkout flows, form validation",
        "/dependencies": "0KB runtime architecture and cross-framework compatibility matrix",
        "/guide": "Zero-dependency integration guides for React, Next.js, Vue, and Vanilla HTML",
        "/studio": "GUI editor for real-time editing of local tokens/token.json and css [Local Only]"
      }
    },
    "sidebar": {
      "apiReference": "API Reference",
      "searchPlaceholder": "Search components (Cmd + K)...",
      "foundationsGroup": "Foundations",
      "layoutAndSpacing": "Layout & Spacing",
      "colorAndStatus": "Color & Status",
      "fontAndTypography": "Font & Typography",
      "formGroup": "Form & Inputs",
      "feedbackGroup": "Feedback & Overlays",
      "navGroup": "Navigation & Menus",
      "dataGroup": "Data Display",
      "layoutGroup": "Structure & Layout",
      "components": {
        "button": "Button",
        "input": "Input Field",
        "selection": "Switch & Checkbox",
        "dialog": "Modal Dialog",
        "sheet": "Bottom Sheet Drawer",
        "alert": "Alert Callout",
        "tabs": "Segmented Tabs",
        "badge": "Badge & Tag",
        "card": "Content Card",
        "table": "Data Table",
        "calendar": "Calendar & Date Picker",
        "select": "Custom Select",
        "accordion": "Accordion",
        "tooltip": "Tooltip & Popover",
        "toast": "Toast Notification",
        "pagination": "Pagination",
        "radio": "Radio Group",
        "slider": "Slider",
        "avatar": "Avatar Profile",
        "progress": "Progress Bar",
        "skeleton": "Skeleton Loader",
        "breadcrumb": "Breadcrumb",
        "separator": "Separator",
        "textarea": "Textarea",
        "tree": "Tree View",
        "container": "Container",
        "layout": "Layout & Stack",
        "layout-spacing": "Layout & Spacing",
        "color-status": "Color & Status",
        "typography": "Font & Typography"
      }
    },
    "principles": {
      "title": "Design System Principles",
      "subtitle": "AtomDesignToken eliminates temporary procedural hardcoding, combining platform-agnostic Single Source of Truth (SSOT), browser-native standards, and a 4-tier AI Lego Assembly Pipeline to build enterprise-grade UI.",
      "categoryAll": "All Principles",
      "categoryAgent": "AI Governance",
      "categoryCore": "Core Principles",
      "categoryArchitecture": "Architecture",
      "categoryToken": "Token Specs",
      "categoryAccessibility": "Accessibility",
      "badgeDo": "RECOMMENDED (DO)",
      "badgeDont": "ANTI-PATTERNS (DON'T)",
      "items": {
        "ssot": {
          "title": "Single Source of Truth (SSOT)",
          "subtitle": "All design decisions derive from a single unified data specification.",
          "description": "When Figma, Markdown guidelines, or token JSON files serve as the benchmark, the entire codebase must auto-generate. Developers are strictly prohibited from hardcoding raw HEX values or magic numbers inside components.",
          "dos": [
            "All colors, spacing, and radiuses must reference var(--atom-*) semantic tokens.",
            "When a new style is required, define it inside the token specification (tokens.json) first."
          ],
          "donts": [
            "Do not inline raw values like #3182F6 or 16px into component CSS or Tailwind classes.",
            "Do not duplicate independent theme variables across different pages."
          ]
        },
        "zero-runtime": {
          "title": "Zero Runtime Overhead",
          "subtitle": "Minimize browser runtime calculations and leverage native platform capabilities.",
          "description": "Prevents CSS-in-JS runtime parsing costs and JS bundle bloat. Pre-compiled with native CSS Custom Properties (--*) and static classes for instant 0ms style injection.",
          "dos": [
            "Utilize CSS standard variables to achieve instant theme switching at the browser engine level.",
            "Bundle into static CSS files to maximize First Contentful Paint (FCP) performance."
          ],
          "donts": [
            "Do not depend on heavy runtime style injection libraries that parse style objects on every render.",
            "Avoid global state subscriptions that trigger full component tree re-renders upon theme changes."
          ]
        },
        "three-tier": {
          "title": "3-Tier Token Hierarchy",
          "subtitle": "Global Palette -> Semantic Intention -> Component Scoped Tokens",
          "description": "Always maintain an intentional semantic tier between raw palette values and components. This layer enables multi-brand, dark mode, and high-contrast switches without touching component code.",
          "dos": [
            "Prioritize Tier 2 (Semantic: --atom-bg-surface, --atom-color-primary) for all UI styling.",
            "In dark themes, switch Tier 2 reference mappings rather than mutating Tier 1 base palettes."
          ],
          "donts": [
            "Never reference Tier 1 raw values (var(--blue-500)) directly in component code.",
            "Avoid using Tier 3 component tokens inside generic layout containers."
          ]
        },
        "framework-agnostic": {
          "title": "Framework-Agnostic Design",
          "subtitle": "Operates identically across React, Vue, Svelte, Angular, and pure Vanilla HTML.",
          "description": "A design system must never be coupled to a specific JS framework. Built on open web and CSS standards to maintain 100% visual consistency across polyglot stacks.",
          "dos": [
            "Author layouts against standard CSS custom variables and semantic HTML5 elements.",
            "Enable legacy HTML or jQuery environments to achieve identical styling purely via class names."
          ],
          "donts": [
            "Never create non-standard dependencies that break styling without specific framework runtimes."
          ]
        },
        "predictable-naming": {
          "title": "Predictable Naming Convention",
          "subtitle": "Strictly structured hierarchy: [Namespace]-[Category]-[Concept]-[Variant]-[State].",
          "description": "Tokens must clearly communicate their purpose and scope to both developers and designers at a glance, adhering to W3C DTCG token naming recommendations.",
          "dos": [
            "Use standardized descriptive names (e.g., --atom-color-primary-hover, --atom-space-4).",
            "Prioritize explicit semantic meaning over cryptic abbreviations."
          ],
          "donts": [
            "Do not invent ad-hoc abbreviations (e.g., --at-clr-pr-h).",
            "Do not declare ambiguous or context-free names (e.g., --atom-color-1, --atom-size-box)."
          ]
        },
        "accessibility": {
          "title": "Accessibility by Default (A11y)",
          "subtitle": "All semantic color pairings satisfy WCAG 2.1 AA 4.5:1 contrast ratios.",
          "description": "Accessibility is an intrinsic foundation validated at token generation, not an afterthought. Standard pairings guarantee immediate contrast and legibility.",
          "dos": [
            "Validate 4.5:1 (normal text) and 3:1 (large text) contrast ratios across text/surface token pairings.",
            "Supplement color cues with accessible visual indicators (icons, underlines, luminance contrast)."
          ],
          "donts": [
            "Never strip focus rings or outline accessibility cues (outline: none).",
            "Do not use low-contrast muted gray tokens for essential body copy."
          ]
        },
        "anti-pattern-prevention": {
          "title": "Anti-Pattern Prevention & Polish",
          "subtitle": "Eliminate AI Slop and unnecessary noise in favor of Swiss minimalist restraint.",
          "description": "Defends against LLM visual clichés like garish neon gradients, thick side borders, and excessive bounce animations in accordance with Impeccable standards.",
          "dos": [
            "Use subtle 1px borders, status dots, and soft tints instead of heavy unilateral borders.",
            "Apply natural deceleration curves (ease-out, 200-300ms) with micro-fades instead of cartoonish bounces.",
            "Run `npm run lint:design` (impeccable detect) before commits for zero-token static validation."
          ],
          "donts": [
            "Avoid side-tab tells such as thick left borders (border-l-4) on cards or sidebars.",
            "Do not inline gratuitous purple gradients or heavy drop shadows.",
            "Avoid wrapping every element in floating cards regardless of visual hierarchy."
          ]
        },
        "ai-governance-pipeline": {
          "title": "AI Governance: 4-Tier Assembly Pipeline",
          "subtitle": "Tokens → Components → Blocks → UX Patterns (Component-First Assembly)",
          "description": "All AI coding assistants (Cursor, Claude Code, Antigravity, Copilot) must follow the verified 4-tier assembly pipeline. When a new UI element is required, create atomic components in components/ui/ first before assembling higher-order blocks.",
          "dos": [
            "Define pure atomic components in components/ui/ first, then import them to build blocks.",
            "Strictly use semantic CSS variables (var(--atom-*), var(--text-primary)) for all styles.",
            "Provide complete empty, loading/skeleton, error, and keyboard accessible states."
          ],
          "donts": [
            "Never bypass the component tier by writing inline raw tags (<button>, <div class=\"rounded-lg...\">) directly in blocks or pages.",
            "Never hardcode raw Tailwind color utilities (text-blue-500, bg-gray-100)."
          ]
        },
        "ai-roles-skills": {
          "title": "4 AI Specialized Roles & Agent Skills",
          "subtitle": "Collaborative task force: token-guardian, component-architect, block-designer, docs-curator",
          "description": "AtomSystem delegates responsibilities across 4 roles to prevent LLM hallucinations: token-guardian (token integrity), component-architect (atomic UI), block-designer (content blocks & patterns), and docs-curator (E2E & docs). `npx atomsystem init` installs the skill automatically.",
          "dos": [
            "Instruct your AI using \"Follow the Component-First rule\" or \"Respect atom.design.md tokens\".",
            "Verify code modifications with official `npm run lint:design` (impeccable detect).",
            "Let the AI convert design guide markdowns into DTCG tokens.json via the atomsystem skill."
          ],
          "donts": [
            "Never allow the AI to generate monolithic single-file components exceeding 500 lines.",
            "Never inline domain datasets directly inside view-layer components."
          ]
        }
      }
    },
    "tokens": {
      "title": "Design Tokens Standard CSS Variables Specification",
      "description": "Defines all UI design decisions—colors, fonts, spaces, and radiuses—as platform-agnostic atomic data. Fully compliant with the W3C DTCG standard as zero-runtime CSS variables.",
      "brandColor": "Brand:",
      "radius": "Radius:",
      "w3cSpec": "W3C DTCG 2025.10 Spec",
      "ssot": "Single Source of Truth (SSOT)",
      "architecture": "3-Tier Token Architecture",
      "tabColors": "Color",
      "tabTypography": "Typography",
      "tabRadius": "Radius",
      "tabSpacing": "Spacing",
      "tabShadow": "Shadow",
      "tabLayout": "Layout",
      "tabJson": "View Full token.json",
      "jsonTitle": "tokens/token.json",
      "jsonBadge": "W3C DTCG Format",
      "jsonCopy": "Copy All",
      "jsonDownload": "Download File",
      "jsonCliGuide": "Zero-Runtime 0KB CSS Variables & Tailwind v4 Ready",
      "emptySearch": "No design tokens found."
    },
    "motion": {
      "title": "Motion & Interaction Timing Tokens",
      "description": "Specifications for duration and easing curve timing tokens ensuring smooth, purposeful micro-interactions.",
      "tabDuration": "Duration Tokens",
      "tabEasing": "Easing Curves",
      "tabInteractive": "Interactive Pattern Playground",
      "previewTitle": "Live Motion Sandbox",
      "speedTitle": "Animation Speed Ratio",
      "copyVariable": "Copy Token Variable"
    },
    "dependencies": {
      "title": "Dependency Matrix & Zero-Runtime Architecture",
      "description": "AtomSystem is architected purely with browser-native CSS custom properties, achieving 0KB runtime bundle overhead.",
      "filterAll": "All Dependencies",
      "filterRuntime": "Runtime (0KB Overhead)",
      "filterBuild": "Build Tools",
      "filterTypes": "Type Safety",
      "filterQA": "Testing & Quality",
      "matrixTitle": "Cross-Framework Platform Compatibility Matrix"
    },
    "blocks": {
      "title": "Design Blocks",
      "description": "Production-ready UI content blocks composed strictly of design tokens.",
      "allBlocks": "All Blocks",
      "realtimeChart": "Realtime Chart",
      "chat": "Chat & Messenger",
      "cardList": "Card List",
      "slider": "Slider & Carousel",
      "pricing": "Pricing UX",
      "kpi": "Stats & KPI Metrics",
      "fileExplorer": "File Explorer",
      "searchPlaceholder": "Search by block name, keyword, or ID...",
      "noResults": "No design blocks found."
    },
    "componentsDoc": {
      "previewTitle": "Interactive Live Preview",
      "codeSnippetTitle": "Component Code Snippet (Code Copy)",
      "copyCode": "Copy Code",
      "copyComponentCode": "Copy Component Code",
      "copied": "Copied!",
      "useCasesTitle": "Key Production Use Cases",
      "usagePatternsTitle": "Recommended Usage Patterns & Design Guidelines",
      "dosAndDontsTitle": "Best Practices & Anti-Pattern Prevention (Do's & Don'ts)",
      "propsSpecTitle": "API Props Specification (API Reference)",
      "relatedPatternsTitle": "Production UX Patterns Using This Component",
      "tokensTitle": "Bound W3C DTCG Design Tokens (tokens/token.json)",
      "tokensViewAll": "View Full Token Specs →",
      "tokensBoundBadge": "Bound to {n} W3C Design Tokens ↓",
      "tokensEditInStudio": "Edit in Theme Editor (/studio)",
      "tabLivePreview": "Live View",
      "tabInspectTokens": "Inspect Design Tokens",
      "thRole": "Token Role",
      "thVariable": "CSS Variable",
      "thDtcgPath": "DTCG JSON Path",
      "thDefaultValue": "Default Value & Role Mapping",
      "propName": "Property",
      "propType": "Type",
      "propDefault": "Default",
      "propDescription": "Description",
      "doLabel": "RECOMMENDED (DO)",
      "dontLabel": "ANTI-PATTERNS (DON'T)",
      "tocTitle": "On This Page",
      "searchPlaceholder": "Search components (Cmd + K)..."
    }
  },
  "ja": {
    "common": {
      "copy": "コピー",
      "copied": "コピー完了!",
      "download": "ダウンロード",
      "search": "検索...",
      "close": "閉じる",
      "home": "ホーム",
      "docs": "ドキュメント",
      "language": "言語切替",
      "initCommand": "インストールコマンド: npx atomsystem init",
      "preview": "プレビュー",
      "name": "トークン名",
      "value": "元データ値",
      "description": "用途と説明",
      "category": "区分",
      "variable": "CSS変数 (クリックでコピー)",
      "themeEditor": "テーマエディタ (Local Only)"
    },
    "home": {
      "heroTitle": "プラットフォーム非依存のデザイントークンと\n実務UXパターンライブラリ",
      "heroSubtitle": "AtomDesignTokenはFigmaおよびMarkdown基盤のデザイン決定を単一真実源(SSOT)として一元管理し、CSS変数とフレームワーク非依存のセマンティッククラスにコンパイルして一貫した製品体験を構築します。",
      "getStarted": "はじめる",
      "principlesTitle": "設計原則 (Principles)",
      "principlesDesc": "単一真実源(SSOT)、ゼロランタイム、3階層アーキテクチャなど6大設計仕様。",
      "principlesLink": "設計原則を見る",
      "tokensTitle": "デザイントークン仕様 (Tokens)",
      "tokensDesc": "W3C DTCG標準に基づくカラー、タイポグラフィ、角丸、余白、シャドウのCSS変数カタログ。",
      "tokensLink": "トークン仕様を見る",
      "motionTitle": "モーション & トランジション (Motion)",
      "motionDesc": "持続時間(Duration)とイージング(Easing)タイミングトークンおよびリアルタイム検証。",
      "motionLink": "モーション仕様を見る",
      "componentsTitle": "コンポーネント仕様 (Components)",
      "componentsDesc": "ボタン、入力欄、モーダル、ボトムシート、タブなどセマンティックトークン連動UI。",
      "componentsLink": "コンポーネント一覧を見る",
      "blocksTitle": "デザインブロック (Blocks)",
      "blocksDesc": "リアルタイムチャート、AIチャット、カードリスト、料金表などの完成型プロダクションモジュール。",
      "blocksLink": "ブロックを探索",
      "patternsTitle": "UXパターン (Patterns)",
      "patternsDesc": "ダッシュボード、フォーム検証、決済、オンボーディングなど実務UXパターン。",
      "patternsLink": "UXパターンを探索",
      "dependenciesTitle": "依存関係マトリックス (Dependencies)",
      "dependenciesDesc": "0KBランタイム設計、パッケージ依存関係およびフレームワーク間クロスプラットフォーム互換性。",
      "dependenciesLink": "依存関係を確認",
      "guideTitle": "ライブラリ活用ガイド (Guide)",
      "guideDesc": "React、Vue、Vanilla HTMLで依存関係なくスタイルを共有・ビルドする実践ガイド。",
      "guideLink": "活用ガイドを見る"
    },
    "nav": {
      "foundations": "ファウンデーション",
      "principles": "設計原則",
      "tokens": "デザイントークン",
      "motion": "モーション",
      "library": "UIライブラリ",
      "layout": "レイアウト＆余白",
      "components": "コンポーネント",
      "icons": "アイコン",
      "blocks": "デザインブロック",
      "patterns": "UXパターン",
      "engineering": "エンジニアリング",
      "dependencies": "依存関係",
      "guide": "ガイド",
      "subDescriptions": {
        "/principles": "SSOT、ゼロランタイム、3層アーキテクチャなど6大設計仕様",
        "/tokens": "カラー、タイポ、角丸、余白、シャドウのW3C DTCG標準仕様",
        "/motion": "持続時間(Duration)とイージング(Easing)タイミングトークン",
        "/layout": "コンテナ(Container)、スタック(Stack)、グリッド(Grid)、余白標準ガイド",
        "/components/button": "セマンティックトークンと連動した本番UIコンポーネント",
        "/icons": "3,800種以上のオープンソースアイコン仕様とテーマ連動",
        "/blocks": "リアルタイムチャート、チャット、カードリスト、価格表など完成型モジュール",
        "/patterns": "ダッシュボード、フォーム検証、決済など実務検証済みUXパターン",
        "/dependencies": "0KBランタイム設計とフレームワーク互換性マトリックス",
        "/guide": "React、Vue、Vanilla HTMLで依存関係なく使える導入ガイド",
        "/studio": "ローカルプロジェクトのtokens/token.jsonとCSSをリアルタイム編集するGUIツール [Local Only]"
      }
    },
    "sidebar": {
      "apiReference": "APIリファレンス",
      "searchPlaceholder": "コンポーネント検索 (Cmd + K)...",
      "foundationsGroup": "ファウンデーション (基礎規格)",
      "layoutAndSpacing": "レイアウト＆余白",
      "colorAndStatus": "カラー＆状態",
      "fontAndTypography": "フォント＆タイポグラフィ",
      "formGroup": "フォーム＆入力",
      "feedbackGroup": "フィードバック＆オーバーレイ",
      "navGroup": "ナビゲーション＆メニュー",
      "dataGroup": "データ表示",
      "layoutGroup": "構造＆レイアウト",
      "components": {
        "button": "ボタン",
        "input": "入力フィールド",
        "selection": "スイッチ＆チェックボックス",
        "dialog": "モーダルダイアログ",
        "sheet": "ボトムシートドロワー",
        "alert": "アラートコールアウト",
        "tabs": "セグメントタブ",
        "badge": "バッジ＆タグ",
        "card": "コンテンツカード",
        "table": "データテーブル",
        "calendar": "カレンダー＆日付ピッカー",
        "select": "カスタムセレクト",
        "accordion": "アコーディオン",
        "tooltip": "ツールチップ＆ポップオーバー",
        "toast": "トースト通知",
        "pagination": "ページネーション",
        "radio": "ラジオグループ",
        "slider": "スライダー",
        "avatar": "アバタープロファイル",
        "progress": "プログレスバー",
        "skeleton": "スケルトンローダー",
        "breadcrumb": "パンくずリスト",
        "separator": "区切り線",
        "textarea": "テキストエリア",
        "tree": "ツリービュー",
        "container": "コンテナ",
        "layout": "レイアウト＆スタック",
        "layout-spacing": "レイアウト＆余白",
        "color-status": "カラー＆状態",
        "typography": "フォント＆タイポグラフィ"
      }
    },
    "principles": {
      "title": "デザインシステム設計原則 (Principles)",
      "subtitle": "AtomDesignTokenは、場当たり的な手続き的ハードコーディングを排除し、プラットフォーム非依存の単一真実源(SSOT)、ブラウザネイティブ標準、そして4段階AIレゴ組み立てパイプラインを統合してエンタープライズUIを構築します。",
      "categoryAll": "全原則",
      "categoryAgent": "AI運用原則",
      "categoryCore": "コア原則",
      "categoryArchitecture": "アーキテクチャ",
      "categoryToken": "トークン仕様",
      "categoryAccessibility": "アクセシビリティ",
      "badgeDo": "推奨指針 (DO)",
      "badgeDont": "アンチパターン (DON'T)",
      "items": {
        "ssot": {
          "title": "単一真実源 (Single Source of Truth)",
          "subtitle": "すべてのデザイン決定は単一のデータ仕様から派生します。",
          "description": "Figma、Markdownガイド、トークンJSONファイルのいずれかが基準となった場合、コード全体が自動生成される必要があります。開発者がコンポーネント内部にHEXカラーやマジックナンバーを直接ハードコーディングすることは固く禁止されています。",
          "dos": [
            "すべての色、余白、角丸は必ずvar(--atom-*)セマンティックトークンを参照します。",
            "新規スタイルが必要な場合は、トークン仕様書(tokens.json)に最初に追加します。"
          ],
          "donts": [
            "コンポーネントCSSやTailwindに#3182F6、16pxなどの生の値をインラインで直接記述しません。",
            "ページごとに類似した役割を持つ独立したテーマ変数を重複宣言しません。"
          ]
        },
        "zero-runtime": {
          "title": "ゼロランタイム・オーバーヘッド (Zero Runtime Overhead)",
          "subtitle": "ブラウザのランタイム計算を最小限に抑え、ネイティブ機能を活用します。",
          "description": "CSS-in-JSのランタイム解析コストやJSバンドルの肥大化を防ぎます。ネイティブCSSカスタムプロパティ(--*)と静的ユーティリティクラスにより事前コンパイルされ、0msのスタイル適用速度を保証します。",
          "dos": [
            "CSS標準変数を使用してブラウザエンジンレベルで即座のテーマ切り替えを実現します。",
            "静的CSSファイルとしてバンドルし、初回描画(FCP)パフォーマンスを最大化します。"
          ],
          "donts": [
            "レンダリングごとにスタイルオブジェクトを動的解析・注入する重いライブラリに依存しません。",
            "テーマ変更時にコンポーネントツリー全体を再レンダリングするグローバル状態購読を乱用しません。"
          ]
        },
        "three-tier": {
          "title": "3階層トークンアーキテクチャ (3-Tier Token Hierarchy)",
          "subtitle": "グローバルトークン → セマンティック意図 → コンポーネントトークン",
          "description": "パレット値とコンポーネントスタイルの間に必ず「意図(Semantic)」層を設けます。このセマンティック層により、コンポーネントコードを一行も修正せずにマルチブランド、ダークモード、高コントラストテーマを一括変換できます。",
          "dos": [
            "UIスタイリング時は常にTier 2(Semantic: --atom-bg-surface, --atom-color-primary)を最優先で使用します。",
            "ダークテーマではTier 1パレットを変更するのではなく、Tier 2の参照マッピングのみを切り替えます。"
          ],
          "donts": [
            "コンポーネントからTier 1の生のトークン(var(--blue-500))を直接参照しません。",
            "汎用レイアウトコンテナ内でTier 3コンポーネントトークンを不必要に使用しません。"
          ]
        },
        "framework-agnostic": {
          "title": "フレームワーク非依存 (Framework-Agnostic)",
          "subtitle": "React、Vue、Svelte、Angular、Vanilla HTMLどこでも100%同一に動作します。",
          "description": "デザインシステムは特定のJavaScriptフレームワークに結合してはなりません。Web標準とCSS標準に基づいて構築され、様々な技術スタックが混在していても完全な一貫性を維持します。",
          "dos": [
            "標準CSS変数とセマンティックHTML5要素を基準に設計します。",
            "従来のHTMLやjQuery環境でもクラス名だけで同一のスタイルを完全に再現できるようにします。"
          ],
          "donts": [
            "特定のフレームワークがないとスタイルが崩れる非標準の依存関係を作成しません。"
          ]
        },
        "predictable-naming": {
          "title": "予測可能な命名規則 (Predictable Naming Convention)",
          "subtitle": "[名前空間]-[カテゴリ]-[概念]-[バリアント]-[状態] の順に明確に階層化します。",
          "description": "トークン名を見るだけで開発者とデザイナーの双方がその役割と適用場所を直感的に理解できるように、W3C DTCGの命名推奨に準拠します。",
          "dos": [
            "規格に沿った明確な命名(例: --atom-color-primary-hover, --atom-space-4)を使用します。",
            "暗号のような短縮名よりも明確な意味の伝達を優先します。"
          ],
          "donts": [
            "個人的な好みに応じた独自の省略形(例: --at-clr-pr-h)を使用しません。",
            "文脈のない曖昧な名前(例: --atom-color-1, --atom-size-box)を宣言しません。"
          ]
        },
        "accessibility": {
          "title": "標準アクセシビリティ保証 (Accessibility by Default)",
          "subtitle": "すべてのセマンティック色の組み合わせはWCAG 2.1 AA 4.5:1以上の明度比を満たします。",
          "description": "アクセシビリティは後から追加する機能ではなく、トークン生成時に自動検証されるべき基本原則です。背景色と前面テキストのトークンペアリングは高い視認性を保証します。",
          "dos": [
            "テキストと背景の組み合わせ時に4.5:1(本文)または3:1(大見出し)の明度比を確認します。",
            "色の区別だけに依存せず、視覚的ヒント(アイコン、下線、明度差)を併用します。"
          ],
          "donts": [
            "フォーカスリングやアウトラインを安易に除去(outline: none)しません。",
            "淡いグレーのトークンを本文の必須情報表示に乱用しません。"
          ]
        },
        "anti-pattern-prevention": {
          "title": "洗練されたAIアンチパターン防止 (Anti-Pattern Prevention)",
          "subtitle": "AIスロップ(AI Slop)を根本遮断し、不要な装飾を削ぎ落とした本質美を追求します。",
          "description": "Impeccableデザイン原則に基づき、LLMが量産しがちな過剰なグラデーション、野暮ったい片側ボーダー、無意味なバウンスモーションを排除し、端正なスイスミニマリズムUIを完成させます。",
          "dos": [
            "状態表示には太い片側ボーダーの代わりに繊細な1pxボーダー、ステータスドット、微細な色味を活用します。",
            "モーションには不自然なバウンスの代わりに自然な減速(ease-out, 200~300ms)を適用します。",
            "`npm run lint:design` (impeccable detect)を実行してデザインの乱れを静的検証します。"
          ],
          "donts": [
            "カードやサイドバーに左側の太い境界線(border-l-4)を乱発しません。",
            "視覚的疲労を引き起こす無意味な紫のネオングラデーションや過剰なドロップシャドウをハードコードしません。",
            "すべての要素を無秩序にフローティングカードで囲むレイアウトの乱用を避けます。"
          ]
        },
        "ai-governance-pipeline": {
          "title": "AI運用原則: 4段階レゴ組み立てパイプライン (AI Agent Pipeline)",
          "subtitle": "トークン → コンポーネント → ブロック → UXパターン (Component-First原則)",
          "description": "すべてのAIアシスタント(Cursor, Claude Code, Antigravity, Copilot)は、複雑な画面を作成する際に一度に巨大なコードを書かず、検証された4段階パイプラインに従います。新しいUI要素が必要な場合は最小原子コンポーネントから先に作成して組み立てます。",
          "dos": [
            "新しいUIを作成する際はcomponents/ui/に最小コンポーネントを先に定義し、インポートして組み立てます。",
            "スタイルは必ずCSS変数(var(--atom-*), var(--text-primary))を使用します。",
            "空データ(Empty)、ローディング(Skeleton)、エラー、キーボード操作(A11y)の4大状態を必ず実装します。"
          ],
          "donts": [
            "コンポーネント段階を飛ばして、ブロックやページに直接生のタグ(<button>, <div class=\"rounded-lg...\">)を雑に記述しません。",
            "Tailwindの任意カラー(text-blue-500, bg-gray-100など)を直接ハードコードしません。"
          ]
        },
        "ai-roles-skills": {
          "title": "4大AI専門役割 & エージェントスキル活用体系 (AI Roles & Skills)",
          "subtitle": "token-guardian, component-architect, block-designer, docs-curator協調システム",
          "description": "AtomSystemは単一モデルのハルシネーションを防ぐため、4つの専門役割に責任を分離します: 1) token-guardian(トークン整合性監視), 2) component-architect(原子コンポーネント設計), 3) block-designer(完成型ブロック構築), 4) docs-curator(E2E検証と文書化)。`npx atomsystem init`時にスキルが自動配置されます。",
          "dos": [
            "AIへの指示時に「Component-First原則で組み立てて」「atom.design.mdトークンを遵守して」と明示します。",
            "コード変更後は公式`npm run lint:design` (impeccable detect)でAIの成果物を静的検証します。",
            "AIがデザインガイドMarkdownを読み取り、DTCG tokens.jsonに自動ビルドできるようにスキルを活用します。"
          ],
          "donts": [
            "500行を超える巨大な単一ファイルコンポーネントの作成をAIに求めたり放置したりしません。",
            "ドメインデータをページコンポーネント内に直接インラインでハードコードさせません。"
          ]
        }
      }
    },
    "tokens": {
      "title": "デザイントークン (Design Tokens) 標準CSS変数仕様",
      "description": "カラー、フォント、余白、角丸などのあらゆるUI決定をプラットフォーム非依存の最小単位データとして定義します。W3C DTCG標準に準拠し、ゼロランタイムの純粋CSS変数として動作します。",
      "brandColor": "ブランド:",
      "radius": "角丸:",
      "w3cSpec": "W3C DTCG 2025.10 Spec",
      "ssot": "Single Source of Truth (SSOT)",
      "architecture": "3階層トークンアーキテクチャ",
      "tabColors": "カラー",
      "tabTypography": "タイポグラフィ",
      "tabRadius": "角丸",
      "tabSpacing": "余白",
      "tabShadow": "シャドウ",
      "tabLayout": "レイアウト",
      "tabJson": "token.json 全体表示",
      "jsonTitle": "tokens/token.json",
      "jsonBadge": "W3C DTCG Format",
      "jsonCopy": "全コピー",
      "jsonDownload": "ファイル保存",
      "jsonCliGuide": "Zero-Runtime 0KB CSS Variables & Tailwind v4 互換",
      "emptySearch": "検索されたトークンはありません。"
    },
    "motion": {
      "title": "モーション & インタラクション トークン (Motion Tokens)",
      "description": "自然で洗練されたユーザー体験のための持続時間(Duration)とイージングカーブのタイミングトークン仕様です。",
      "tabDuration": "持続時間 (Duration)",
      "tabEasing": "イージング曲線 (Easing)",
      "tabInteractive": "パターン検証プレイグラウンド",
      "previewTitle": "リアルタイム・モーションプレビュー",
      "speedTitle": "アニメーション速度倍率",
      "copyVariable": "トークン変数をコピー"
    },
    "dependencies": {
      "title": "依存関係マトリックス & ゼロランタイム (Dependencies)",
      "description": "AtomSystemはブラウザ標準のCSSカスタムプロパティを基盤としており、JSバンドルのランタイムオーバーヘッドは0KBです。",
      "filterAll": "全依存関係",
      "filterRuntime": "ランタイム (0KB Overhead)",
      "filterBuild": "ビルドツール (Build)",
      "filterTypes": "型安全性 (Types)",
      "filterQA": "テスト & 品質 (QA)",
      "matrixTitle": "フレームワーク間クロスプラットフォーム互換性マトリックス"
    },
    "blocks": {
      "title": "デザインブロック",
      "description": "トークンベースで結合された完成型UIコンテンツブロックです。",
      "allBlocks": "全ブロック",
      "realtimeChart": "リアルタイムチャート",
      "chat": "チャット & メッセンジャー",
      "cardList": "カードリスト",
      "slider": "スライダー & カルーセル",
      "pricing": "料金プラン UX",
      "kpi": "統計 & KPI 指標",
      "fileExplorer": "ファイルエクスプローラー",
      "searchPlaceholder": "ブロック名、キーワード、IDで検索...",
      "noResults": "該当するブロックが見つかりません。"
    },
    "componentsDoc": {
      "previewTitle": "インタラクティブ・ライブプレビュー (Interactive Preview)",
      "codeSnippetTitle": "コンポーネントコードスニペット (Code Copy)",
      "copyCode": "コードをコピー",
      "copyComponentCode": "コンポーネントコードをコピー",
      "copied": "コピー完了!",
      "useCasesTitle": "実務での主な活用ユースケース (Use Cases)",
      "usagePatternsTitle": "推奨利用パターンおよび設計指針 (Usage Patterns)",
      "dosAndDontsTitle": "推奨利用法およびアンチパターン防止 (Do's & Don'ts)",
      "propsSpecTitle": "API Props 仕様明細 (API Reference)",
      "relatedPatternsTitle": "このコンポーネントが活用される実務UXパターン",
      "tokensTitle": "バインドされたW3C DTCGデザイントークン (tokens/token.json)",
      "tokensViewAll": "全トークン仕様書を表示 →",
      "tokensBoundBadge": "W3Cデザイントークン{n}個連動 ↓",
      "tokensEditInStudio": "テーマエディタで編集 (/studio)",
      "tabLivePreview": "ライブビュー",
      "tabInspectTokens": "デザイントークン検証",
      "thRole": "トークンの役割 (Role)",
      "thVariable": "CSS変数 (Variable)",
      "thDtcgPath": "DTCG JSONパス",
      "thDefaultValue": "デフォルト値と機能マッピング",
      "propName": "プロパティ名",
      "propType": "型 (Type)",
      "propDefault": "デフォルト値",
      "propDescription": "説明",
      "doLabel": "推奨 (DO)",
      "dontLabel": "非推奨 (DON'T)",
      "tocTitle": "このページの目次",
      "searchPlaceholder": "コンポーネントを検索 (Cmd + K)..."
    }
  }
};
