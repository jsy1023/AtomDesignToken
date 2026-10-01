# Daangn Style Design Guide (당근 스타일 디자인 가이드)

이 문서는 당근(당근마켓)의 따뜻하고 친근하며 신뢰감 있는 동네 커뮤니티 감성을 기반으로 한 디자인 가이드입니다.
Agent는 이 가이드를 분석하여 `tokens/tokens.json`을 생성하고 UI를 구축합니다.

---

## 1. 디자인 철학 (Design Philosophy)
- **Warm & Friendly (따뜻함과 친근함)**: 부담 없고 편안한 분위기의 웜톤과 소프트 쉐입
- **Clear Readability (높은 가독성)**: 누구나 쉽게 읽고 다룰 수 있는 명료한 대비와 직관성
- **Soft Rounding (부드러운 라운딩)**: 과하지 않고 편안한 8px~14px 곡률
- **Community Tone (신뢰와 소통)**: 감성적인 포인트 오렌지와 차분한 뉴트럴 톤

---

## 2. 색상 시스템 (Color Palette)

### Primary / Brand
- `primary`: `#FF6F0F` (Daangn Warm Orange)
- `primary-hover`: `#E85E00`
- `primary-light`: `#FFF2EB`
- `primary-active`: `#D45400`

### Secondary / Semantic
- `success`: `#0DCC5A`
- `warning`: `#FF9E00`
- `danger`: `#FF4D4D`
- `info`: `#3586FF`

### Neutral / Surface (Light Mode)
- `bg-surface`: `#FFFFFF`
- `bg-canvas`: `#F8F9FA`
- `bg-elevated`: `#FFFFFF`
- `text-primary`: `#212124` (Deep Charcoal)
- `text-secondary`: `#4D5159`
- `text-tertiary`: `#868B94`
- `text-disabled`: `#B0B4BC`
- `border-default`: `#EAEBEE`
- `border-focus`: `#FF6F0F`

### Neutral / Surface (Dark Mode)
- `bg-surface`: `#1E1F21`
- `bg-canvas`: `#121314`
- `bg-elevated`: `#28292D`
- `text-primary`: `#F2F3F5`
- `text-secondary`: `#A0A4AC`
- `text-tertiary`: `#6D7179`
- `border-default`: `#303236`

---

## 3. 타이포그래피 (Typography)
- **Font Family**: `-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif`
- **Font Sizes & Weights**:
  - `display`: `28px` / Bold (700) / Line-height: `1.35`
  - `title-1`: `22px` / Bold (700) / Line-height: `1.4`
  - `title-2`: `18px` / SemiBold (600) / Line-height: `1.4`
  - `body-1`: `15px` / Regular (400) & Medium (500) / Line-height: `1.5`
  - `body-2`: `13px` / Regular (400) & Medium (500) / Line-height: `1.5`
  - `caption`: `11px` / Regular (400) / Line-height: `1.4`

---

## 4. 형태 및 간격 (Geometry & Spacing)
- **Border Radius**:
  - `sm`: `6px`
  - `md`: `10px` (Default for Buttons/Inputs)
  - `lg`: `14px` (Default for Cards)
  - `xl`: `20px`
  - `full`: `9999px`
- **Shadows**:
  - `card`: `0 2px 8px rgba(0, 0, 0, 0.04)`
  - `elevated`: `0 8px 24px rgba(0, 0, 0, 0.06)`

---

## 5. 컴포넌트 가이드라인 (Component Styling)

### Button
- 기본 높이: `44px` (Large: `50px`, Small: `34px`)
- Padding: `0 16px`
- Border-radius: `10px`
- Primary: Background `#FF6F0F`, Color `#FFFFFF`, Font-weight `600`
- Secondary: Background `#FFF2EB`, Color `#FF6F0F`

### Card
- Background: `#FFFFFF`
- Border: `1px solid #EAEBEE`
- Border-radius: `14px`
- Padding: `20px`
