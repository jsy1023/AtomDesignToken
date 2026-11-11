# 🏛️ AtomSystem Universal AI Coding Guidelines

> 이 프로젝트는 **AtomSystem (Universal Design Token & Agentic UI System)**을 공식 디자인 시스템으로 채택하고 있습니다.  
> 모든 AI 어시스턴트(Cursor, Claude, Copilot, Antigravity, Windsurf 등)는 새로운 UI를 구현하거나 기존 코드를 리팩토링할 때 아래 원칙을 **절대적으로 준수**해야 합니다.

---

## 🚀 1. 핵심 아키텍처: 4단계 레고 조립 파이프라인

```
[1. W3C DTCG Tokens] ──> [2. UI Components] ──> [3. Content Blocks] ──> [4. UX Patterns / Templates]
 (CSS 변수: 색상/간격)     (Button, Card, Badge)   (RealtimeChart, Chat)     (Dashboard, Checkout)
```

1. **Tokens (`atom.design.md`, `tokens/token.json`)**:
   - 모든 색상, 간격, 보더, 폰트 크기는 반드시 CSS 변수(`var(--text-primary)`, `var(--bg-primary)`, `var(--border-subtle)` 등)를 사용합니다.
   - **하드코딩 절대 금지**: `text-blue-500`, `bg-[#123456]`, `p-[13px]`, `border-gray-200` 등 임의의 인라인 값 사용을 엄격히 금지합니다.
2. **Components (`atom.components.md`, `components/ui/`)**:
   - 화면을 구성하는 기초 원자입니다 (`Button`, `Card`, `Badge`, `Input`, `Table`, `Tabs`, `Switch`, `Modal` 등).
   - 날림 원시 태그(`<button>`, `<div class="rounded-lg ...">`)를 작성하지 않고, 검증된 `components/ui/` 컴포넌트를 import하여 사용합니다.
3. **Blocks (`atom.blocks.md`, `components/blocks/`)**:
   - 컴포넌트들을 조립하여 완성한 독립 기능형 콘텐츠 블록입니다 (`realtime-chart`, `interactive-chat`, `pricing-table`, `card-list`, `file-explorer` 등).
   - 블록에 필요한 새 컴포넌트가 없다면, 컴포넌트를 먼저 `components/ui/`에 신설하고 블록을 조립합니다 (**Component-First 원칙**).
4. **UX Patterns & Templates (`atom.uxPattern.md`)**:
   - 완성된 블록과 레이아웃을 조립하여 완성형 사용자 경험(대시보드, 폼 유효성, 결제 플로우 등)을 구축합니다.

---

## 🎨 2. 표준 시맨틱 CSS 변수 규격

| 용도 | 라이트 모드 | 다크 모드 | CSS 변수 표기 |
|---|---|---|---|
| 기본 배경 | `#ffffff` | `#0a0a0a` | `var(--bg-primary)` 또는 `bg-(--bg-primary)` |
| 보조 표면 | `#f9f9fb` | `#141414` | `var(--bg-secondary)` 또는 `bg-(--bg-secondary)` |
| 본문 텍스트 | `#111111` | `#ededed` | `var(--text-primary)` 또는 `text-(--text-primary)` |
| 보조 텍스트 | `#666666` | `#a0a0a0` | `var(--text-secondary)` 또는 `text-(--text-secondary)` |
| 옅은 보더 | `#eaeaea` | `#222222` | `var(--border-subtle)` 또는 `border-(--border-subtle)` |
| 강조 보더 | `#d4d4d8` | `#333333` | `var(--border-strong)` 또는 `border-(--border-strong)` |
| 기본 곡률 | `6px` | `6px` | `var(--radius)` 또는 `rounded-(--radius)` |
| 작은 곡률 | `4px` | `4px` | `var(--radius-sm)` 또는 `rounded-(--radius-sm)` |

---

## 💡 3. AI 작업 시 필수 체크리스트
- [ ] Tailwind 임의의 컬러(`blue-500`, `gray-100`)를 하드코딩하지 않고 시맨틱 토큰 변수를 사용했는가?
- [ ] 버튼, 카드, 뱃지 등 UI를 날림 태그 대신 `components/ui/`에서 import하여 조립했는가?
- [ ] 복잡한 화면을 만들 때 `atom.blocks.md` 및 `atom.uxPattern.md`의 검증된 패턴을 따랐는가?
- [ ] 빈 데이터 상태(Empty State), 로딩 상태(Loading/Skeleton), 키보드 포커스링(A11y)을 보장했는가?
- [ ] 10px 극소 폰트나 과도한 그라디언트, 형광색 등 AI 슬롭(Visual Noise)을 배제했는가?
