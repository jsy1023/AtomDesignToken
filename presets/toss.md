# Toss Style Design Guide (토스 스타일 디자인 가이드)

이 문서는 토스(Toss)의 현대적이고 직관적인 제품 디자인 철학을 기반으로 한 디자인 가이드입니다.
Agent는 이 가이드를 분석하여 `tokens/tokens.json`을 생성하고 UI를 구축합니다.

---

## 1. 디자인 철학 (Design Philosophy)
- **Extreme Simplicity (극도의 단순함)**: 군더더기 없는 레이아웃과 명확한 시각적 위계
- **Bold Typography (과감한 타이포그래피)**: 굵고 또렷한 헤드라인으로 정보 전달력 극대화
- **Tactile Feedback & Soft Geometry (부드러운 조형감)**: 넉넉한 둥근 모서리(16px~20px)와 자연스러운 그림자
- **Vibrant Point Color (생동감 넘치는 시그니처 블루)**: 신뢰와 주목을 이끄는 Vivid Blue

---

## 2. 색상 시스템 (Color Palette)

### Primary / Brand
- `primary`: `#3182F6` (Toss Signature Blue)
- `primary-hover`: `#1B64DA`
- `primary-light`: `#E8F3FF`
- `primary-active`: `#1550B5`

### Secondary / Semantic
- `success`: `#04C759`
- `warning`: `#FF9F00`
- `danger`: `#F04452`
- `info`: `#3182F6`

### Neutral / Surface (Light Mode)
- `bg-surface`: `#FFFFFF`
- `bg-canvas`: `#F2F4F6` (Toss Light Gray Background)
- `bg-elevated`: `#FFFFFF`
- `text-primary`: `#191F28` (Toss Main Text)
- `text-secondary`: `#4E5968`
- `text-tertiary`: `#8B95A1`
- `text-disabled`: `#B0B8C1`
- `border-default`: `#E5E8EB`
- `border-focus`: `#3182F6`

### Neutral / Surface (Dark Mode)
- `bg-surface`: `#1B1C1D`
- `bg-canvas`: `#101012`
- `bg-elevated`: `#242628`
- `text-primary`: `#F9FAFB`
- `text-secondary`: `#B0B8C1`
- `text-tertiary`: `#6B7684`
- `border-default`: `#2C2D30`

---

## 3. 타이포그래피 (Typography)
- **Font Family**: `-apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif`
- **Font Sizes & Weights**:
  - `display`: `32px` / Bold (700) / Line-height: `1.3`
  - `title-1`: `24px` / Bold (700) / Line-height: `1.35`
  - `title-2`: `20px` / SemiBold (600) / Line-height: `1.4`
  - `body-1`: `16px` / Regular (400) & Medium (500) / Line-height: `1.5`
  - `body-2`: `14px` / Regular (400) & Medium (500) / Line-height: `1.5`
  - `caption`: `12px` / Regular (400) / Line-height: `1.4`

---

## 4. 형태 및 간격 (Geometry & Spacing)
- **Border Radius**:
  - `sm`: `8px`
  - `md`: `12px`
  - `lg`: `16px` (Default for Cards, Modals)
  - `xl`: `24px`
  - `full`: `9999px` (Pill Buttons)
- **Shadows**:
  - `card`: `0 4px 20px rgba(0, 0, 0, 0.05)`
  - `elevated`: `0 12px 32px rgba(0, 0, 0, 0.08)`
  - `modal`: `0 20px 48px rgba(0, 0, 0, 0.12)`

---

## 5. 컴포넌트 가이드라인 (Component Styling)

### Button
- 기본 높이: `48px` (Large: `54px`, Small: `38px`)
- Padding: `0 20px`
- Border-radius: `12px` ~ `16px`
- Primary: Background `#3182F6`, Color `#FFFFFF`, Font-weight `600`, Active 시 살짝 축소(`transform: scale(0.98)`)
- Secondary: Background `#E8F3FF`, Color `#1B64DA`

### Card
- Background: `#FFFFFF`
- Border-radius: `16px` ~ `20px`
- Padding: `24px`
- No heavy borders; rely on soft shadow or `#F2F4F6` canvas contrast.

### Input
- Height: `48px`
- Background: `#F2F4F6` (or `#FFFFFF` with `#E5E8EB` border)
- Border-radius: `12px`
- Focus: Border `#3182F6` with subtle outline ring.
