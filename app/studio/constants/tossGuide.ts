export const TOSS_MD_PRESET = `---
name: 토스
slug: toss
category: finance
last_updated: "2026-09-24"
created_at: "2026-05-11"
lang: ko
logo: https://getdesign.kr/logos/toss.png
colors:
  fill-brand: "{colors.blue-500}"
  fill-primary: "{colors.grey-900}"
  fill-secondary: "{colors.grey-100}"
  fill-weak: "{colors.grey-50}"
  fill-danger: "{colors.red-500}"
  fill-success: "{colors.green-500}"
  fill-warning: "{colors.orange-500}"
  text-primary: "{colors.grey-900}"
  text-secondary: "{colors.grey-700}"
  text-tertiary: "{colors.fg-tertiary}"
  text-placeholder: "{colors.fg-quaternary}"
  text-alt: "{colors.white}"
  text-brand: "{colors.blue-500}"
  text-danger: "{colors.red-500}"
  border-primary: "{colors.blue-500}"   # focused input
  border-secondary: "{colors.grey-200}"   # default divider
  border-strong: "{colors.grey-400}"
  border-subtle: "{colors.line-subtle}"
  overlay-scrim: "{colors.bg-overlay}"
  overlay-press: "{colors.press-overlay}"
  tds-fg-primary: "{colors.text-primary}"   # grey-900
  tds-fg-secondary: "{colors.text-secondary}"   # grey-700
  tds-fg-tertiary: "{colors.fg-tertiary}"   # navy-900 @ 58%
  tds-fg-quaternary: "{colors.fg-quaternary}"   # navy-900 @ 28%
  tds-fg-disabled: "{colors.grey-400}"
  tds-fg-inverse: "{colors.text-alt}"   # white
  tds-fg-brand: "{colors.text-brand}"
  tds-fg-danger: "{colors.text-danger}"
  tds-fg-success: "{colors.green-500}"
  tds-bg-primary: "{colors.white}"
  tds-bg-secondary: "{colors.fill-secondary}"   # grey-100
  tds-bg-tertiary: "{colors.grey-200}"
  tds-bg-elevated: "{colors.white}"
  tds-bg-overlay: "{colors.overlay-scrim}"
  tds-bg-brand: "{colors.fill-brand}"
  tds-bg-brand-weak: "{colors.blue-50}"
  tds-bg-danger: "{colors.fill-danger}"
  tds-line-default: "{colors.border-secondary}"   # grey-200
  tds-line-subtle: "{colors.border-subtle}"
  tds-line-strong: "{colors.border-strong}"   # grey-400
  tds-press-overlay: "{colors.overlay-press}"   # 검정 26%
  ## Brand
  primary: "{colors.blue-500}"   # 명세의 대표색 역할 — TDS 의 fill-primary·text-primary(grey-900)와 다른 축
  blue-500: oklch(0.620 0.191 258)   # #3182F6 — TDS 발행값 blue500, 카노니컬 Toss Blue, 화면당 하나의 primary CTA
  blue-600: oklch(0.522 0.176 257)   # pressed-blue 단계 — 번들 고유값, TDS blue600과 다른 색: 명도가 blue700과 blue800 사이이고 가장 가까운 blue700과도 ΔE 0.023
  blue-700: oklch(0.476 0.174 259)   # pressed gradient stop — 번들 고유값, TDS blue700과 다른 색: 가장 가까운 발행 step은 blue800(ΔE 0.012)
  blue-50: oklch(0.959 0.020 250)   # #E8F3FF — TDS 발행값 blue50, brand-weak background
  ## Greyscale
  grey-900: oklch(0.237 0.020 258)   # #191F28 — TDS 발행값 grey900, primary text, never pure black
  grey-800: oklch(0.357 0.028 257)   # #333D4B — TDS 발행값 grey800
  grey-700: oklch(0.460 0.028 256)   # #4E5968 — TDS 발행값 grey700, secondary text
  grey-600: oklch(0.562 0.025 254)   # #6B7684 — TDS 발행값 grey600
  grey-500: oklch(0.666 0.021 253)   # #8B95A1 — TDS 발행값 grey500
  grey-400: oklch(0.779 0.016 251)   # #B0B8C1 — TDS 발행값 grey400, disabled text, strong line
  grey-300: oklch(0.874 0.009 248)   # #D1D6DB — TDS 발행값 grey300
  grey-200: oklch(0.930 0.005 248)   # #E5E8EB — TDS 발행값 grey200, default divider/border
  grey-150: oklch(0.918 0.007 247)   # 번들 고유 step — TDS에는 150이 없다. grey-200을 발행값으로 옮긴 뒤로 grey-200보다 어둡다(명도 역전)
  grey-100: oklch(0.966 0.003 248)   # #F2F4F6 — TDS 발행값 grey100, secondary surface
  grey-50: oklch(0.985 0.002 248)   # #F9FAFB — TDS 발행값 grey50
  white: oklch(1.000 0.000 0)
  ## Toss yellow & orange
  yellow-500: oklch(0.850 0.154 82)   # #FFC342 — TDS 발행값 yellow500, illustration / emoji body
  yellow-400: oklch(0.893 0.123 85)   # 번들 고유값, TDS yellow400과 다른 색: 번들 yellow-300과 거의 같고 가장 가까운 발행 step은 yellow300(ΔE 0.019)
  yellow-300: oklch(0.906 0.126 91)   # #FFDD78 — TDS 발행값 yellow300
  yellow-600: oklch(0.840 0.171 87)   # 번들 고유값, TDS yellow600과 다른 색: 가장 가까운 발행 step은 yellow500(ΔE 0.024)
  yellow-700: oklch(0.872 0.169 87)   # 번들 고유값, TDS yellow700과 다른 색: yellow-600보다 밝아 발행 순서와 반대이고 가장 가까운 발행 step은 yellow400(ΔE 0.025)
  orange-500: oklch(0.748 0.183 56)   # semantic warning — 번들 고유값, TDS orange500과 다른 색: 가장 가까운 발행 step은 orange600(ΔE 0.011)
  orange-400: oklch(0.828 0.108 52)   # 번들 고유값, TDS orange400과 다른 색: 같은 명도대 발행 step보다 채도가 낮고 가장 가까운 orange300과도 ΔE 0.065
  orange-300: oklch(0.870 0.078 51)   # 번들 고유값, TDS orange300과 다른 색: 가장 가까운 발행 step은 orange200(ΔE 0.054)
  ## Semantic palette
  red-500: oklch(0.641 0.208 21)   # #F04452 — TDS 발행값 red500, error / danger
  red-600: oklch(0.626 0.216 22)   # 번들 고유값, TDS red600과 다른 색: 번들 red-500과 거의 같은 색이라 가장 가까운 발행 step은 red500(ΔE 0.017)
  green-500: oklch(0.493 0.143 154)   # success — 번들 고유값, TDS green500과 다른 색: 명도 0.49로 발행 green500(0.67)보다 훨씬 어둡고 가장 가까운 발행 step은 green900(ΔE 0.028)
  navy-900: oklch(0.155 0.060 261)   # text-shadow base, source of overlay rgba
  ## Illustration warms
  brown-900: oklch(0.359 0.083 39)
  brown-700: oklch(0.444 0.062 30)
  brown-500: oklch(0.535 0.073 39)
  brown-400: oklch(0.659 0.097 41)
  ## Semantic alpha tokens
  fg-tertiary: oklch(0.155 0.060 261 / 0.58)   # 흐린 본문 텍스트
  fg-quaternary: oklch(0.155 0.060 261 / 0.28)   # placeholder
  line-subtle: oklch(0.000 0.000 0 / 0.08)   # 그레이 배경 위 카드 보더
  bg-overlay: oklch(0.000 0.000 0 / 0.56)   # bottom-sheet scrim
  press-overlay: oklch(0.000 0.000 0 / 0.26)   # 보편 pressed-state tint
  ## Dark palette (TDS adaptive)
  dark-blue-500: oklch(0.630 0.192 258)   # #3485FA — TDS 발행값 blue500 (colors.dark.css)
  dark-blue-50: oklch(0.300 0.062 267)   # #202C4D — TDS 발행값 blue50 (colors.dark.css)
  dark-grey-900: oklch(1.000 0.000 0)   # #FFFFFF — TDS 발행값 grey900 (colors.dark.css), 다크 primary text
  dark-grey-800: oklch(0.919 0.001 286)   # #E4E4E5 — TDS 발행값 grey800 (colors.dark.css)
  dark-grey-700: oklch(0.818 0.004 286)   # #C3C3C6 — TDS 발행값 grey700 (colors.dark.css), 다크 secondary text
  dark-grey-600: oklch(0.701 0.009 286)   # #9E9EA4 — TDS 발행값 grey600 (colors.dark.css)
  dark-grey-500: oklch(0.596 0.014 286)   # #7E7E87 — TDS 발행값 grey500 (colors.dark.css)
  dark-grey-400: oklch(0.500 0.017 286)   # #62626D — TDS 발행값 grey400 (colors.dark.css)
  dark-grey-300: oklch(0.425 0.020 286)   # #4D4D59 — TDS 발행값 grey300 (colors.dark.css)
  dark-grey-200: oklch(0.361 0.019 285)   # #3C3C47 — TDS 발행값 grey200 (colors.dark.css)
  dark-grey-100: oklch(0.297 0.016 285)   # #2C2C35 — TDS 발행값 grey100 (colors.dark.css)
  dark-grey-50: oklch(0.247 0.013 285)   # #202027 — TDS 발행값 grey50 (colors.dark.css)
  dark-yellow-500: oklch(0.816 0.158 74)   # #FFB134 — TDS 발행값 yellow500 (colors.dark.css)
  dark-yellow-300: oklch(0.724 0.159 62)   # #EB8B1E — TDS 발행값 yellow300 (colors.dark.css)
  dark-red-500: oklch(0.639 0.209 21)   # #F04251 — TDS 발행값 red500 (colors.dark.css)
typography:
  display-1:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.005em
  display-2:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: -0.020em
  h1:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.020em
  h2:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.020em
  h3:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.015em
  h4:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: -0.015em
  title-1:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: -0.010em
  title-2:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: -0.010em
  body-1:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.005em
  body-2:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.005em
  body-3:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0em
  label-l:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 17px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.005em
  label-m:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.005em
  label-s:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0em
  caption:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.40
    letterSpacing: 0em
  caption-s:
    fontFamily: "\\"Pretendard Variable\\", Pretendard, -apple-system, BlinkMacSystemFont, \\"SF Pro Text\\", \\"SF Pro\\", \\"Apple SD Gothic Neo\\", \\"Noto Sans KR\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.40
    letterSpacing: 0em
spacing:
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 20px
  space-6: 24px
  space-7: 28px
  space-8: 32px
  space-10: 40px
  space-12: 48px
  space-16: 64px
  space-20: 80px
rounded:
  radius-xs: 4px   # small badges
  radius-s: 8px   # inline tags
  radius-m: 12px   # text inputs
  radius-l: 14px   # L button (48px)
  radius-xl: 16px   # XL button (56px), cards
  radius-2xl: 20px   # sheets, dialogs
  radius-3xl: 24px   # big cards / sections
  radius-4xl: 32px   # hero blocks
  radius-full: 999px   # chips, pills, capsules
elevation:
  shadow-1: 0 1px 2px oklch(0.155 0.060 261 / 0.04), 0 1px 1px oklch(0.155 0.060 261 / 0.04)   # menu
  shadow-2: 0 4px 12px oklch(0.155 0.060 261 / 0.06), 0 1px 2px oklch(0.155 0.060 261 / 0.04)   # tooltip
  shadow-3: 0 12px 32px oklch(0.155 0.060 261 / 0.10), 0 2px 6px oklch(0.155 0.060 261 / 0.06)   # dialog
  shadow-toast: 0 8px 24px oklch(0.155 0.060 261 / 0.16)   # toast
opacity:
  disabled-opacity: 0.30   # 컴포넌트 전체 노드에 적용
  tds-disabled-opacity: 0.30
fonts:
  font-family-emoji: "Tossface"
---

# 토스 (Toss) — design.md

> 비바리퍼블리카가 운영하는 한국 최대 핀테크 슈퍼앱. 송금·결제·은행·증권·보험·세금·부동산·자동차 관리 등 금융 전반을 단일 모바일 셸로 묶고, "Apps in Toss" 미니앱 플랫폼까지 같은 디자인 시스템 위에 얹는다 [src:2]. 본 문서는 Toss Design System 핸드오프 번들(\`TDS_Mobile_for_Apps_in_Toss_(2602-3-2).fig\` export → \`toss-design-system/{README, chats/chat1, project/{README, SKILL, colors_and_type.css, preview/ 41 cards, ui_kits/mobile/{Components.jsx, Screens.jsx, Send-Money Flow.html, ios-frame.jsx}, assets/toss-logo.png}}\`)을 1차 출처로 합성한 결과이며, 공개된 toss.tech 보고서 [src:1]와 toss.im 미니앱 가이드, TDS Mobile docs를 보조 출처로 사용했다.

## Brand & Style

토스는 자신을 **"은행에 다니는 유능한 친구"** 로 포지셔닝한다 — 조용히 일을 처리하고, 사용자의 시간을 낭비시키지 않는다는 어조다. 슬로건과 카피 곳곳에 "투자, 모두가 할 수 있도록", "수수료 걱정 없이"와 같이 진입 장벽을 제거하는 메시지가 반복되며, "토스가 알아서"라는 위임형 표현이 사용자 부담을 줄이는 톤으로 일관된다 [src:11]. 이는 단순한 마케팅 카피가 아니라 인터페이스 전반의 의사결정 기준이다 — 정보 밀도보다 가독성과 행동 유도를 우선하고, "한번에 볼 수 있어요" 같은 통합 뷰 패턴이 반복되는 이유다 [src:11].

대상 사용자는 일반 소비자 전 연령대이지만, 디자인 시스템(TDS) 자체는 약 **2,000명 규모의 메이커**가 단일 시스템 위에서 일한다는 전제로 설계되었다 [src:2]. 일관성과 확장성은 디자인 가이드라인 차원이 아니라 인프라 차원에서 다뤄지며, 컴포넌트는 "**레고 블록**"으로 비유된다 [src:2]. 새 컴포넌트 결정은 디자이너 직관이 아니라 A/B 테스트 결과로 검증된다 — 예를 들어 Menu 컴포넌트는 10일간의 A/B 테스트에서 Android item-click rate가 10% 더 높게 나온 뒤에야 정식 채택되었다 [src:4]. Apps-in-Toss 미니앱 플랫폼은 제3자 미니앱을 토스 셸 안에서 돌리되 토스와의 경계를 흐리지 못하게 한다 — 탭바가 필요하면 토스가 제공하는 플로팅 탭바를 써야 하고, 토스 메인 화면의 기본 하단 탭과 형태가 겹치는 탭바는 사용자가 현재 위치를 헷갈린다는 이유로 허용하지 않으며, 브랜드 로고·이름·컬러를 노출해 "사용자가 토스와 앱인토스를 혼동하지 않도록" 하라고 요구한다 [src:6].

전체 무드는 **차갑고 절제된, 거의 무채색에 가까운 화이트 캔버스 + 선명한 토스 블루 단일 강조색**으로 요약된다. 깊은 한기 어린 cool-blue 중성색(\`grey-900\`부터 \`grey-100\`까지)이 표면 전체를 차지하고, 채도가 높은 브랜드 블루(\`blue-500\`)는 화면당 하나의 가장 중요한 액션에만 예약된다. 모서리는 **공격적으로 둥글지만 결코 귀엽지 않다** — 버튼·카드·hero 블록에 16~32px 라운드, chips·primary CTA에 999px full pill을 쓰며, iOS류 squircle/blob 라운드는 \`Templates/Squircle\` 전용 페이지를 제외하면 명시적으로 회피된다. 배경은 평면이 기본이며, 그라디언트는 (1) bottom CTA 위쪽 \`white → transparent\` 보호 그라디언트, (2) 로딩 버튼 내부의 미세한 pressed-blue radial glow, (3) yellow→orange 일러스트 그라디언트 — 세 가지 문서화된 예외만 허용된다. 텍스처·노이즈·전면 사진은 chrome에 사용되지 않는다.

Voice는 **해요체(대화형 존댓말) + 위임형 + 일상어**로 요약된다 [src:10]. 종결어미 \`-요\`로 통일되며 격식체(~니다/~합니다)도, 방송 헤드라인의 단정형 \`-다\`도 사용하지 않는다 — 한 문장은 목적을 말하고, 다음 한 문장은 *언제 쓰는지*를 말하는 패턴이 표준이다. 토스가 잘못해 발생한 에러 화면에서조차 격식체가 아닌 해요체를 유지하며, 반복되는 시스템 상황은 Figma preset과 개발자 에러 메시지 라이브러리로 템플릿화되어 좋은 카피가 기본 선택지가 되도록 운영된다 [src:10]. 본 카탈로그 메타 문서는 토스 자체 카피와 달리 \`~다\` 평서체로 기술하며, 토스의 해요체 정책은 product surface 카피에 한해 적용되는 규칙임을 분리해 둔다.

## Colors

### Brand
- \`primary\`: \`#3182F6\` (Toss Signature Blue)
- \`primary-hover\`: \`#1B64DA\`
- \`primary-light\`: \`#E8F3FF\`

### Neutral / Surface
- \`bg-surface\`: \`#FFFFFF\`
- \`bg-canvas\`: \`#F2F4F6\`
- \`text-primary\`: \`#191F28\`
- \`text-secondary\`: \`#4E5968\`
- \`border-default\`: \`#E5E8EB\`

### Semantic
- \`success\`: \`#04C759\`
- \`warning\`: \`#FF9F00\`
- \`danger\`: \`#F04452\`

## Rounded
- 버튼 곡률: \`16px\`
- 카드 곡률: \`20px\`
- \`font-family\`: "Pretendard Variable", Pretendard, -apple-system, sans-serif

## Components
- **Button XL**: 56px 높이, radius 16px (radius-xl)
- **Button L**: 48px 높이, radius 14px (radius-l)
- **BottomCTA**: 56pt 높이, safe area 자동 대응
- **Balance Card**: radius 20px (radius-2xl)
`;
