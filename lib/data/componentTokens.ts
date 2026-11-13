export interface ComponentTokenMapping {
  role: string;
  variable: string;
  dtcgPath: string;
  defaultValue: string;
  description: string;
  type?: 'color' | 'dimension' | 'shadow' | 'typography';
  roleEn?: string;
  descEn?: string;
  roleJa?: string;
  descJa?: string;
}

export const COMPONENT_TOKEN_MAPPINGS: Record<string, ComponentTokenMapping[]> = {
  "layout-spacing": [
    {
      "role": "미세 간격 (Micro Space-1)",
      "roleEn": "Micro Space-1 (4px)",
      "roleJa": "極小余白 (Micro Space-1 4px)",
      "variable": "var(--atom-space-1)",
      "dtcgPath": "spacing.space-1",
      "defaultValue": "4px",
      "description": "인라인 아이콘 여백 및 타이트한 뱃지 내부 패딩",
      "descEn": "Inline icon offset and compact badge inner padding",
      "descJa": "インラインアイコンの余白およびバッジの内部パディング",
      "type": "dimension"
    },
    {
      "role": "기본 요소 간격 (Space-2)",
      "roleEn": "Base Element Space-2 (8px)",
      "roleJa": "基本要素余白 (Space-2 8px)",
      "variable": "var(--atom-space-2)",
      "dtcgPath": "spacing.space-2",
      "defaultValue": "8px",
      "description": "8-Point 그리드의 기본 기준 단위, 버튼 내 텍스트-아이콘 간격",
      "descEn": "Core unit of 8-point grid, button text-to-icon gap",
      "descJa": "8ポイントグリッドの基準単位、ボタン内テキスト-アイコン間隔",
      "type": "dimension"
    },
    {
      "role": "컴포넌트 내부 패딩 (Space-3)",
      "roleEn": "Component Inner Padding (Space-3 12px)",
      "roleJa": "コンポーネント内パディング (Space-3 12px)",
      "variable": "var(--atom-space-3)",
      "dtcgPath": "spacing.space-3",
      "defaultValue": "12px",
      "description": "인풋 필드 및 기본 버튼의 표준 내부 패딩",
      "descEn": "Standard inner padding for input fields and medium buttons",
      "descJa": "入力欄および標準ボタンの基本内部パディング",
      "type": "dimension"
    },
    {
      "role": "기본 그룹 간격 (Space-4)",
      "roleEn": "Standard Group Space-4 (16px)",
      "roleJa": "標準グループ余白 (Space-4 16px)",
      "variable": "var(--atom-space-4)",
      "dtcgPath": "spacing.space-4",
      "defaultValue": "16px",
      "description": "카드 본문 패딩 및 폼 필드 간의 수직 간격",
      "descEn": "Card body padding and vertical gap between form fields",
      "descJa": "カード本文パディングおよびフォーム項目間の垂直余白",
      "type": "dimension"
    },
    {
      "role": "섹션 분할 간격 (Space-6)",
      "roleEn": "Section Division Space-6 (24px)",
      "roleJa": "セクション区切り余白 (Space-6 24px)",
      "variable": "var(--atom-space-6)",
      "dtcgPath": "spacing.space-6",
      "defaultValue": "24px",
      "description": "화면 내 주요 정보 블록 간의 여백",
      "descEn": "Spacing between major content blocks within views",
      "descJa": "画面内の主要情報ブロック間の区切り余白",
      "type": "dimension"
    },
    {
      "role": "대형 모듈 간격 (Space-8)",
      "roleEn": "Module Separation Space-8 (32px)",
      "roleJa": "大型モジュール余白 (Space-8 32px)",
      "variable": "var(--atom-space-8)",
      "dtcgPath": "spacing.space-8",
      "defaultValue": "32px",
      "description": "대시보드 위젯 및 최상위 컨테이너 간의 여백",
      "descEn": "Spacing between dashboard widgets and top-level containers",
      "descJa": "ダッシュボードウィジェットおよび最上位コンテナ間の余白",
      "type": "dimension"
    }
  ],
  "color-status": [
    {
      "role": "Primary 브랜드 색상 (CTA)",
      "roleEn": "Brand Primary Color (CTA)",
      "roleJa": "ブランドPrimaryカラー (CTA)",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "주요 행동(CTA) 및 핵심 인터랙티브 요소 대표 색상",
      "descEn": "Core interactive and call-to-action brand color",
      "descJa": "主要行動(CTA)および核となる操作要素の代表色",
      "type": "color"
    },
    {
      "role": "Success 성공 확정 색상",
      "roleEn": "Success Status Color",
      "roleJa": "Success 成功状態カラー",
      "variable": "var(--atom-status-success)",
      "dtcgPath": "color.status.status-success",
      "defaultValue": "#10b981",
      "description": "송금 완료, 승인, 상태 변경 등 긍정적 확정 색상",
      "descEn": "Positive confirmation for completions and approvals",
      "descJa": "送金完了、承認、状態変更などの肯定的完了色",
      "type": "color"
    },
    {
      "role": "Warning 주의 경고 색상",
      "roleEn": "Warning Status Color",
      "roleJa": "Warning 警告状態カラー",
      "variable": "var(--atom-status-warning)",
      "dtcgPath": "color.status.status-warning",
      "defaultValue": "#f59e0b",
      "description": "주의 수반, 데이터 덮어쓰기 경고 상태 색상",
      "descEn": "Cautionary notice and non-blocking warning state",
      "descJa": "注意を伴う操作やデータ上書きの警告状態色",
      "type": "color"
    },
    {
      "role": "Destructive 위험 파괴 색상",
      "roleEn": "Destructive Danger Color",
      "roleJa": "Destructive 危険・破壊カラー",
      "variable": "var(--atom-status-danger)",
      "dtcgPath": "color.status.status-danger",
      "defaultValue": "#f43f5e",
      "description": "영구 삭제, 회원 탈퇴 등 비가역적 위험 행동 색상",
      "descEn": "Irreversible actions such as permanent deletion and account cancellation",
      "descJa": "永久削除やアカウント退会などの不可逆的危険操作色",
      "type": "color"
    },
    {
      "role": "기본 배경 표면색 (Surface)",
      "roleEn": "Primary Surface Background",
      "roleJa": "基本背景色 (Primary Surface)",
      "variable": "var(--atom-bg-primary)",
      "dtcgPath": "color.surface.bg-primary",
      "defaultValue": "#ffffff",
      "description": "라이트/다크 모드에 자동 대응하는 기본 배경 표면색",
      "descEn": "Theme-reactive primary background surface",
      "descJa": "ライト/ダークモードに自動対応する基本背景色",
      "type": "color"
    },
    {
      "role": "보조 배경 표면색 (Card/Muted)",
      "roleEn": "Secondary Surface Background",
      "roleJa": "補助背景色 (Card/Muted Surface)",
      "variable": "var(--atom-bg-secondary)",
      "dtcgPath": "color.surface.bg-secondary",
      "defaultValue": "#f8f9fa",
      "description": "카드, 인풋, 패널 배경을 위한 보조 표면색",
      "descEn": "Secondary surface for cards, panels, and input fields",
      "descJa": "カード、入力欄、パネル背景用の中立的補助表面色",
      "type": "color"
    }
  ],
  "typography": [
    {
      "role": "Display 대형 타이틀",
      "roleEn": "Display Large Title",
      "roleJa": "Display 大型タイトル",
      "variable": "var(--atom-font-display)",
      "dtcgPath": "typography.font-display",
      "defaultValue": "36px / 1.2 / 700",
      "description": "화면 최상단 Hero 및 대형 프로모션 강조 폰트",
      "descEn": "Hero sections and large promotional headlines",
      "descJa": "ヒーローセクションおよびプロモーション強調用大型フォント",
      "type": "typography"
    },
    {
      "role": "Heading-1 메인 제목",
      "roleEn": "Heading-1 Main Title",
      "roleJa": "Heading-1 メイン見出し",
      "variable": "var(--atom-font-heading-1)",
      "dtcgPath": "typography.font-heading-1",
      "defaultValue": "24px / 1.3 / 700",
      "description": "페이지 및 뷰의 최상위 H1 메인 제목",
      "descEn": "Top-level H1 document and view headings",
      "descJa": "ページおよび画面の最上位H1メイン見出し",
      "type": "typography"
    },
    {
      "role": "Heading-2 섹션 제목",
      "roleEn": "Heading-2 Section Title",
      "roleJa": "Heading-2 セクション見出し",
      "variable": "var(--atom-font-heading-2)",
      "dtcgPath": "typography.font-heading-2",
      "defaultValue": "20px / 1.35 / 600",
      "description": "카드 헤더 및 주요 콘텐츠 구획용 H2 제목",
      "descEn": "Section headers and card titles",
      "descJa": "カードヘッダーおよび主要コンテンツ区画用H2見出し",
      "type": "typography"
    },
    {
      "role": "Body-1 표준 본문",
      "roleEn": "Body-1 Standard Body",
      "roleJa": "Body-1 標準本文",
      "variable": "var(--atom-font-body-1)",
      "dtcgPath": "typography.font-body-1",
      "defaultValue": "14px / 1.5 / 400",
      "description": "기본 UI 텍스트 및 단락 본문용 표준 폰트 (14px)",
      "descEn": "Default body copy and paragraph font across UI (14px)",
      "descJa": "UI全体の標準テキストおよび段落本文フォント (14px)",
      "type": "typography"
    },
    {
      "role": "Caption-1 부가 캡션",
      "roleEn": "Caption-1 Supporting Metadata",
      "roleJa": "Caption-1 補助キャプション",
      "variable": "var(--atom-font-caption-1)",
      "dtcgPath": "typography.font-caption-1",
      "defaultValue": "12px / 1.4 / 400",
      "description": "타임스탬프, 힌트, 레이블 등 부가 메타데이터 폰트 (12px)",
      "descEn": "Timestamps, badges, hints, and secondary metadata (12px)",
      "descJa": "タイムスタンプ、ヒント、補足メタデータ用フォント (12px)",
      "type": "typography"
    }
  ],
  "button": [
    {
      "role": "Primary 배경색 (Brand CTA)",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "주요 행동(CTA) 버튼의 기본 배경색 (W3C DTCG Type: color)",
      "type": "color",
      "roleEn": "Primary Background (Brand CTA)",
      "roleJa": "Primary 背景色 (Brand CTA)",
      "descEn": "Default background color for primary call-to-action buttons (W3C DTCG Type: color)",
      "descJa": "主要アクション(CTA)ボタンの基本背景色 (W3C DTCG Type: color)"
    },
    {
      "role": "Primary 마우스 호버색",
      "variable": "var(--atom-color-primary-hover)",
      "dtcgPath": "color.brand.color-primary-hover",
      "defaultValue": "#1b64da",
      "description": "Primary 컴포넌트에 마우스 오버 시 적용되는 강조 색상",
      "type": "color",
      "roleEn": "Primary Mouse Hover Color",
      "roleJa": "Primary ホバー色",
      "descEn": "Highlight color applied when hovering over Primary buttons",
      "descJa": "Primaryボタンにマウスホバーした際に適用される強調色"
    },
    {
      "role": "Secondary 버튼 배경색",
      "variable": "var(--atom-bg-secondary)",
      "dtcgPath": "color.surface.bg-secondary",
      "defaultValue": "#f8f9fa",
      "description": "중립적 보조 액션 버튼의 배경 표면 색상",
      "type": "color",
      "roleEn": "Secondary Button Background",
      "roleJa": "Secondary ボタン背景色",
      "descEn": "Neutral secondary action button surface color",
      "descJa": "中立的な補助アクションボタンの背景表面色"
    },
    {
      "role": "Destructive 위험 배경색",
      "variable": "var(--atom-status-danger)",
      "dtcgPath": "color.status.status-danger",
      "defaultValue": "#f43f5e",
      "description": "영구 삭제, 회원 탈퇴, 주문 취소 등 파괴적 위험 행동 시스템 색상",
      "type": "color",
      "roleEn": "Destructive Danger Background",
      "roleJa": "Destructive 危険背景色",
      "descEn": "Semantic destructive color for permanent deletion, account termination, and cancellation",
      "descJa": "完全削除、退会、解約など破壊的アクションのシステム危険色"
    },
    {
      "role": "Success 성공 확정 배경색",
      "variable": "var(--atom-status-success)",
      "dtcgPath": "color.status.status-success",
      "defaultValue": "#10b981",
      "description": "송금 완료, 승인, 상태 변경 등 긍정적 성공 행동 시스템 색상",
      "type": "color",
      "roleEn": "Success Confirmation Background",
      "roleJa": "Success 成功確認背景色",
      "descEn": "Semantic success color for transfers, approvals, and positive confirmations",
      "descJa": "送金完了、承認、状態更新など肯定的な完了アクションの成功色"
    },
    {
      "role": "Warning 주의 경고 배경색",
      "variable": "var(--atom-status-warning)",
      "dtcgPath": "color.status.status-warning",
      "defaultValue": "#f59e0b",
      "description": "주의 수반, 데이터 덮어쓰기 경고 행동 시스템 색상",
      "type": "color",
      "roleEn": "Warning Alert Background",
      "roleJa": "Warning 警告注意背景色",
      "descEn": "Semantic warning color for caution-required actions and data overwrite alerts",
      "descJa": "注意が必要な操作やデータ上書き時の警告色"
    },
    {
      "role": "버튼 모서리 곡률 (Radius)",
      "variable": "var(--atom-radius-md)",
      "dtcgPath": "radius.radius-md",
      "defaultValue": "12px",
      "description": "버튼의 둥글기 (W3C DTCG Type: dimension)",
      "type": "dimension",
      "roleEn": "Button Corner Radius",
      "roleJa": "ボタン角丸 (Radius)",
      "descEn": "Standard button corner rounding (W3C DTCG Type: dimension)",
      "descJa": "ボタンの標準角丸サイズ (W3C DTCG Type: dimension)"
    },
    {
      "role": "버튼 폰트 규격",
      "variable": "var(--atom-font-body-1)",
      "dtcgPath": "typography.font-body-1",
      "defaultValue": "14px / 1.5 / 600",
      "description": "버튼 텍스트의 표준 타이포그래피 스케일",
      "type": "typography",
      "roleEn": "Button Typography Scale",
      "roleJa": "ボタンフォント仕様",
      "descEn": "Standard typography scale and weight for button labels",
      "descJa": "ボタンテキストの標準タイポグラフィスケールおよび太さ"
    },
    {
      "role": "버튼 상하단 간격 (Padding Y)",
      "variable": "var(--atom-btn-py)",
      "dtcgPath": "component.button.padding-y",
      "defaultValue": "8px",
      "description": "버튼 상하단 내부 여백을 조절하는 디자인 토큰 (W3C DTCG Type: dimension)",
      "type": "dimension",
      "roleEn": "Button Vertical Spacing (Padding Y)",
      "roleJa": "ボタン垂直余白 (Padding Y)",
      "descEn": "Design token controlling button vertical padding (W3C DTCG Type: dimension)",
      "descJa": "ボタンの上下内部余白を調整するデザイントークン (W3C DTCG Type: dimension)"
    },
    {
      "role": "버튼 좌우 간격 (Padding X)",
      "variable": "var(--atom-btn-px)",
      "dtcgPath": "component.button.padding-x",
      "defaultValue": "16px",
      "description": "버튼 좌우 내부 여백을 조절하는 디자인 토큰 (W3C DTCG Type: dimension)",
      "type": "dimension",
      "roleEn": "Button Horizontal Spacing (Padding X)",
      "roleJa": "ボタン水平余白 (Padding X)",
      "descEn": "Design token controlling button horizontal padding (W3C DTCG Type: dimension)",
      "descJa": "ボタンの左右内部余白を調整するデザイントークン (W3C DTCG Type: dimension)"
    },
    {
      "role": "스몰 버튼 상하 간격 (Padding Y SM)",
      "variable": "var(--atom-btn-py-sm)",
      "dtcgPath": "component.button.padding-y-sm",
      "defaultValue": "4px",
      "description": "sm 사이즈 버튼의 상하단 내부 여백 (W3C DTCG Type: dimension)",
      "type": "dimension",
      "roleEn": "Small Button Vertical Spacing (Padding Y SM)",
      "roleJa": "スモールボタン垂直余白 (Padding Y SM)",
      "descEn": "Vertical padding for sm size buttons (W3C DTCG Type: dimension)",
      "descJa": "smサイズボタンの上下内部余白 (W3C DTCG Type: dimension)"
    },
    {
      "role": "스몰 버튼 좌우 간격 (Padding X SM)",
      "variable": "var(--atom-btn-px-sm)",
      "dtcgPath": "component.button.padding-x-sm",
      "defaultValue": "10px",
      "description": "sm 사이즈 버튼의 좌우 내부 여백 (W3C DTCG Type: dimension)",
      "type": "dimension",
      "roleEn": "Small Button Horizontal Spacing (Padding X SM)",
      "roleJa": "スモールボタン水平余白 (Padding X SM)",
      "descEn": "Horizontal padding for sm size buttons (W3C DTCG Type: dimension)",
      "descJa": "smサイズボタンの左右内部余白 (W3C DTCG Type: dimension)"
    },
    {
      "role": "라지 버튼 상하 간격 (Padding Y LG)",
      "variable": "var(--atom-btn-py-lg)",
      "dtcgPath": "component.button.padding-y-lg",
      "defaultValue": "12px",
      "description": "lg 사이즈 버튼의 상하단 내부 여백 (W3C DTCG Type: dimension)",
      "type": "dimension",
      "roleEn": "Large Button Vertical Spacing (Padding Y LG)",
      "roleJa": "ラージボタン垂直余白 (Padding Y LG)",
      "descEn": "Vertical padding for lg size buttons (W3C DTCG Type: dimension)",
      "descJa": "lgサイズボタンの上下内部余白 (W3C DTCG Type: dimension)"
    },
    {
      "role": "라지 버튼 좌우 간격 (Padding X LG)",
      "variable": "var(--atom-btn-px-lg)",
      "dtcgPath": "component.button.padding-x-lg",
      "defaultValue": "24px",
      "description": "lg 사이즈 버튼의 좌우 내부 여백 (W3C DTCG Type: dimension)",
      "type": "dimension",
      "roleEn": "Large Button Horizontal Spacing (Padding X LG)",
      "roleJa": "ラージボタン水平余白 (Padding X LG)",
      "descEn": "Horizontal padding for lg size buttons (W3C DTCG Type: dimension)",
      "descJa": "lgサイズボタンの左右内部余白 (W3C DTCG Type: dimension)"
    }
  ],
  "input": [
    {
      "role": "인풋 필드 배경색",
      "variable": "var(--atom-bg-surface)",
      "dtcgPath": "color.surface.bg-surface",
      "defaultValue": "#ffffff",
      "description": "폼 인풋 필드의 기본 바탕 배경색",
      "type": "color",
      "roleEn": "Input Field Background",
      "roleJa": "入力欄背景色",
      "descEn": "Base surface background for form text inputs",
      "descJa": "フォーム入力欄の基本背景色"
    },
    {
      "role": "인풋 테두리 (기본)",
      "variable": "var(--atom-border-strong)",
      "dtcgPath": "color.border.border-strong",
      "defaultValue": "#e5e8eb",
      "description": "입력 필드의 기본 외곽선 테두리 색상",
      "type": "color",
      "roleEn": "Input Border (Default)",
      "roleJa": "入力欄ボーダー (基本)",
      "descEn": "Default outer border line color for text inputs",
      "descJa": "入力欄のデフォルト外枠線カラー"
    },
    {
      "role": "인풋 포커스 링 (Focus)",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "키보드 포커스 시 활성화되는 외곽 강조 링 색상",
      "type": "color",
      "roleEn": "Input Focus Ring",
      "roleJa": "入力欄フォーカスリング",
      "descEn": "Accent outline ring applied when input gains focus",
      "descJa": "入力欄フォーカス時に適用される強調輪郭リング"
    },
    {
      "role": "에러 상태 테두리",
      "variable": "var(--atom-status-danger)",
      "dtcgPath": "color.status.status-danger",
      "defaultValue": "#f43f5e",
      "description": "유효성 검사 실패 시 경고 테두리 색상",
      "type": "color",
      "roleEn": "Error State Border",
      "roleJa": "エラー状態ボーダー",
      "descEn": "Semantic danger border color indicating validation errors",
      "descJa": "バリデーションエラーを示すセマンティック危険ボーダー色"
    },
    {
      "role": "인풋 모서리 곡률",
      "variable": "var(--atom-radius-md)",
      "dtcgPath": "radius.radius-md",
      "defaultValue": "12px",
      "description": "인풋 컨테이너의 테두리 둥글기",
      "type": "dimension",
      "roleEn": "Input Corner Radius",
      "roleJa": "入力欄角丸 (Radius)",
      "descEn": "Standard corner rounding for input field containers",
      "descJa": "入力欄コンテナの標準角丸サイズ"
    }
  ],
  "selection": [
    {
      "role": "스위치/체크 활성 배경색",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "스위치 및 체크박스 On 상태 브랜드 강조 배경",
      "type": "color",
      "roleEn": "Switch/Check Active Background",
      "roleJa": "スイッチ/チェック 有効背景色",
      "descEn": "Accent color when toggle switches and checkboxes are turned on",
      "descJa": "トグルスイッチおよびチェックボックスがONの際の強調色"
    },
    {
      "role": "스위치 비활성 트랙",
      "variable": "var(--atom-bg-secondary)",
      "dtcgPath": "color.surface.bg-secondary",
      "defaultValue": "#e5e8eb",
      "description": "스위치 Off 상태의 중립 트랙 배경색",
      "type": "color",
      "roleEn": "Switch Inactive Track",
      "roleJa": "スイッチ無効トラック背景",
      "descEn": "Neutral track surface color for toggles in the off state",
      "descJa": "OFF状態のトグルスイッチのニュートラルなトラック表面色"
    },
    {
      "role": "스위치 썸 (Thumb) 라운딩",
      "variable": "var(--atom-radius-full)",
      "dtcgPath": "radius.radius-full",
      "defaultValue": "9999px",
      "description": "원형 토글 썸 필렛 규격",
      "type": "dimension",
      "roleEn": "Switch Thumb Rounding",
      "roleJa": "スイッチつまみ円形角丸",
      "descEn": "Pill/circular radius for toggle thumbs",
      "descJa": "トグルスイッチつまみの完全な円形角丸"
    },
    {
      "role": "체크박스 테두리",
      "variable": "var(--atom-border-strong)",
      "dtcgPath": "color.border.border-strong",
      "defaultValue": "#d1d5db",
      "description": "체크박스 미선택 시 경계선",
      "type": "color",
      "roleEn": "Checkbox Border",
      "roleJa": "チェックボックス外枠線",
      "descEn": "Default border for unselected checkboxes",
      "descJa": "未選択チェックボックスのデフォルト外枠線"
    }
  ],
  "dialog": [
    {
      "role": "모달 다이얼로그 배경색",
      "variable": "var(--atom-bg-surface)",
      "dtcgPath": "color.surface.bg-surface",
      "defaultValue": "#ffffff",
      "description": "모달 팝업의 바탕 표면 색상",
      "type": "color",
      "roleEn": "Modal Dialog Surface",
      "roleJa": "モーダルダイアログ背景色",
      "descEn": "Base surface color for modal popup containers",
      "descJa": "モーダルポップアップの基本表面背景色"
    },
    {
      "role": "모달 테두리 곡률",
      "variable": "var(--atom-radius-xl)",
      "dtcgPath": "radius.radius-xl",
      "defaultValue": "24px",
      "description": "모달 다이얼로그의 플로팅 라운딩 규격",
      "type": "dimension",
      "roleEn": "Modal Corner Radius",
      "roleJa": "モーダル角丸 (Radius)",
      "descEn": "Floating elevation curvature for modal dialogs",
      "descJa": "モーダルダイアログの立体浮遊角丸仕様"
    },
    {
      "role": "모달 입체 그림자",
      "variable": "var(--atom-shadow-xl)",
      "dtcgPath": "shadow.shadow-xl",
      "defaultValue": "0 20px 25px -5px rgb(0 0 0 / 0.15)",
      "description": "다이얼로그 레이어를 띄우는 깊은 드롭 섀도우",
      "type": "shadow",
      "roleEn": "Modal Elevation Shadow",
      "roleJa": "モーダル立体シャドウ",
      "descEn": "Deep drop shadow lifting the dialog layer off the page",
      "descJa": "ダイアログレイヤーを画面から浮き立たせる立体シャドウ"
    },
    {
      "role": "백드롭 블러 오버레이",
      "variable": "rgba(0, 0, 0, 0.6)",
      "dtcgPath": "color.overlay.backdrop",
      "defaultValue": "rgba(0,0,0,0.6)",
      "description": "배경 차단 딤 오버레이",
      "type": "color",
      "roleEn": "Backdrop Dim Overlay",
      "roleJa": "バックドロップ暗色オーバーレイ",
      "descEn": "Semi-transparent dimming barrier overlay behind modals",
      "descJa": "モーダル背面の操作を遮断する半透明暗色オーバーレイ"
    }
  ],
  "sheet": [
    {
      "role": "바텀시트 표면 배경색",
      "variable": "var(--atom-bg-surface)",
      "dtcgPath": "color.surface.bg-surface",
      "defaultValue": "#ffffff",
      "description": "모바일 바텀 드로어 표면 색상",
      "type": "color",
      "roleEn": "Bottom Sheet Surface",
      "roleJa": "ボトムシート表面背景色",
      "descEn": "Surface background color for mobile bottom drawers",
      "descJa": "モバイルボトムドロワーの表面背景色"
    },
    {
      "role": "상단 모서리 곡률",
      "variable": "var(--atom-radius-xl)",
      "dtcgPath": "radius.radius-xl",
      "defaultValue": "24px",
      "description": "시트 상단 좌우 라운딩",
      "type": "dimension",
      "roleEn": "Top Corner Curvature",
      "roleJa": "上部角丸 (Top Radius)",
      "descEn": "Top-left and top-right corner rounding for sheets",
      "descJa": "ボトムシート上部左右の滑らかな角丸仕様"
    },
    {
      "role": "시트 핸들 바 색상",
      "variable": "var(--atom-border-strong)",
      "dtcgPath": "color.border.border-strong",
      "defaultValue": "#d1d5db",
      "description": "드래그 인식 그랩 핸들 색상",
      "type": "color",
      "roleEn": "Sheet Grab Handle Bar",
      "roleJa": "シートグラブハンドルバー",
      "descEn": "Drag affordance indicator pill color for sheet handles",
      "descJa": "ドラッグ操作を促すグラブハンドルバーのインジケーター色"
    }
  ],
  "alert": [
    {
      "role": "에러 알림 배경 및 틴트",
      "variable": "var(--atom-status-danger)",
      "dtcgPath": "color.status.status-danger",
      "defaultValue": "#f43f5e",
      "description": "치명적 시스템 오류 및 방지 콜아웃",
      "type": "color",
      "roleEn": "Error Alert Background & Tint",
      "roleJa": "エラーアラート背景ティント",
      "descEn": "Danger color wash for critical error callouts",
      "descJa": "致命的なエラー通知用の危険ティントカラー"
    },
    {
      "role": "경고 알림 배경 및 틴트",
      "variable": "var(--atom-status-warning)",
      "dtcgPath": "color.status.status-warning",
      "defaultValue": "#f59e0b",
      "description": "주의 수반 안내 콜아웃",
      "type": "color",
      "roleEn": "Warning Alert Background & Tint",
      "roleJa": "警告アラート背景ティント",
      "descEn": "Amber caution color wash for warning messages",
      "descJa": "注意を促すメッセージ用の警告アンバーティント"
    },
    {
      "role": "성공 알림 배경 및 틴트",
      "variable": "var(--atom-status-success)",
      "dtcgPath": "color.status.status-success",
      "defaultValue": "#10b981",
      "description": "정상 처리 및 긍정 알림 콜아웃",
      "type": "color",
      "roleEn": "Success Alert Background & Tint",
      "roleJa": "成功アラート背景ティント",
      "descEn": "Emerald positive color wash for success callouts",
      "descJa": "完了・承認メッセージ用の成功エメラルドティント"
    },
    {
      "role": "정보 알림 브랜드 컬러",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "일반 팁 및 안내 콜아웃",
      "type": "color",
      "roleEn": "Info Alert Brand Color",
      "roleJa": "案内アラートブランド色",
      "descEn": "Brand accent color for standard informational callouts",
      "descJa": "一般的な案内・情報通知用のブランドアクセント色"
    },
    {
      "role": "알림 박스 곡률",
      "variable": "var(--atom-radius-md)",
      "dtcgPath": "radius.radius-md",
      "defaultValue": "12px",
      "description": "콜아웃 박스 모서리 라운딩",
      "type": "dimension",
      "roleEn": "Alert Container Radius",
      "roleJa": "アラートボックス角丸",
      "descEn": "Standard corner rounding for alert notification boxes",
      "descJa": "アラート通知ボックスの標準角丸サイズ"
    }
  ],
  "tabs": [
    {
      "role": "탭 세그먼트 배경 트랙",
      "variable": "var(--atom-bg-secondary)",
      "dtcgPath": "color.surface.bg-secondary",
      "defaultValue": "#f1f3f5",
      "description": "세그먼트 탭 버튼들의 기본 배경 트랙",
      "type": "color",
      "roleEn": "Tab Segment Track Background",
      "roleJa": "タブセグメントトラック背景",
      "descEn": "Background container track for grouped segmented controls",
      "descJa": "セグメントコントロール全体の背景トラックカラー"
    },
    {
      "role": "활성 탭 인디케이터 색상",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "선택된 활성 탭 하단 라인 및 텍스트 강조",
      "type": "color",
      "roleEn": "Active Tab Accent Indicator",
      "roleJa": "アクティブタブ強調インジケーター",
      "descEn": "Underline and text color accent for the selected tab",
      "descJa": "選択中アクティブタブの下線およびテキスト強調色"
    },
    {
      "role": "탭 모서리 곡률",
      "variable": "var(--atom-radius-md)",
      "dtcgPath": "radius.radius-md",
      "defaultValue": "12px",
      "description": "세그먼트 탭 캡슐 라운딩",
      "type": "dimension",
      "roleEn": "Tab Segment Radius",
      "roleJa": "タブセグメント角丸 (Radius)",
      "descEn": "Pill and container curvature for segmented tab tracks",
      "descJa": "セグメントタブコンテナおよびタブピルの角丸サイズ"
    },
    {
      "role": "비활성 탭 폰트 색상",
      "variable": "var(--atom-text-secondary)",
      "dtcgPath": "color.text.text-secondary",
      "defaultValue": "#6b7684",
      "description": "미선택 탭 텍스트 색상",
      "type": "color",
      "roleEn": "Inactive Tab Label Color",
      "roleJa": "非アクティブタブテキスト色",
      "descEn": "Muted text color for unselected tabs",
      "descJa": "未選択タブの控えめなフォントテキスト色"
    }
  ],
  "badge": [
    {
      "role": "뱃지 틴트 배경색",
      "variable": "var(--atom-color-primary-subtle)",
      "dtcgPath": "color.brand.color-primary-subtle",
      "defaultValue": "#e8f3ff",
      "description": "Primary 태그/뱃지의 틴트 배경색",
      "type": "color",
      "roleEn": "Badge Tint Background",
      "roleJa": "バッジティント背景色",
      "descEn": "Subtle brand tint background for informational tags and badges",
      "descJa": "案内タグおよびバッジ用の微細なブランドティント背景"
    },
    {
      "role": "뱃지 텍스트 색상",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "뱃지 내부 강조 라벨 폰트 색상",
      "type": "color",
      "roleEn": "Badge Tint Background",
      "roleJa": "バッジティント背景色",
      "descEn": "Accent color wash for informational badges and tags",
      "descJa": "案内バッジおよびタグ用のアクセントティント背景"
    },
    {
      "role": "성공 상태 뱃지 배경",
      "variable": "var(--atom-status-success)",
      "dtcgPath": "color.status.status-success",
      "defaultValue": "#10b981",
      "description": "정상 처리 및 활성 상태를 나타내는 초록색 토큰",
      "type": "color",
      "roleEn": "Success Status Badge Background",
      "roleJa": "成功バッジ背景色",
      "descEn": "Semantic green tint for completed and verified badges",
      "descJa": "完了・検証済みバッジ用のセマンティックグリーンティント"
    },
    {
      "role": "경고 상태 뱃지 배경",
      "variable": "var(--atom-status-warning)",
      "dtcgPath": "color.status.status-warning",
      "defaultValue": "#f59e0b",
      "description": "주의 요망 및 대기 상태를 나타내는 주황색 토큰",
      "type": "color",
      "roleEn": "Warning Status Badge Background",
      "roleJa": "警告バッジ背景色",
      "descEn": "Semantic yellow tint for pending and attention-required badges",
      "descJa": "保留中・注意喚起バッジ用のセマンティックイエローティント"
    },
    {
      "role": "뱃지 캡슐 곡률",
      "variable": "var(--atom-radius-full)",
      "dtcgPath": "radius.radius-full",
      "defaultValue": "9999px",
      "description": "완전한 알약/캡슐 형태를 만드는 필렛 곡률",
      "type": "dimension",
      "roleEn": "Badge Capsule Rounding",
      "roleJa": "バッジカプセル円形角丸",
      "descEn": "Pill rounding creating capsule-shaped badges",
      "descJa": "カプセル形状バッジを生成する完全な円形角丸"
    }
  ],
  "card": [
    {
      "role": "카드 표면 배경색",
      "variable": "var(--atom-bg-surface)",
      "dtcgPath": "color.surface.bg-surface",
      "defaultValue": "#ffffff",
      "description": "카드 컨테이너 표면 바탕색",
      "type": "color",
      "roleEn": "Card Surface Background",
      "roleJa": "カード表面背景色",
      "descEn": "Base surface background for card modules and containers",
      "descJa": "カードモジュールおよびコンテナの基本表面背景色"
    },
    {
      "role": "카드 외곽선 보더",
      "variable": "var(--atom-border-subtle)",
      "dtcgPath": "color.border.border-subtle",
      "defaultValue": "#f2f4f6",
      "description": "카드 영역을 구분하는 부드러운 경계선",
      "type": "color",
      "roleEn": "Card Outline Border",
      "roleJa": "カード外枠ボーダー",
      "descEn": "Subtle boundary stroke separating adjacent card modules",
      "descJa": "隣接するカードモジュールを繊細に分節する境界線"
    },
    {
      "role": "카드 모서리 곡률",
      "variable": "var(--atom-radius-lg)",
      "dtcgPath": "radius.radius-lg",
      "defaultValue": "16px",
      "description": "카드의 W3C 표준 곡률 스케일",
      "type": "dimension",
      "roleEn": "Card Corner Radius",
      "roleJa": "カード角丸 (Radius)",
      "descEn": "W3C standard corner curvature scale for cards",
      "descJa": "カード向けのW3C標準角丸スケーリング仕様"
    },
    {
      "role": "카드 그림자 (Elevation)",
      "variable": "var(--atom-shadow-sm)",
      "dtcgPath": "shadow.shadow-sm",
      "defaultValue": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "description": "카드 입체감을 부여하는 미세 섀도우",
      "type": "shadow",
      "roleEn": "Card Elevation Shadow",
      "roleJa": "カード立体シャドウ",
      "descEn": "Gentle drop shadow adding subtle visual depth",
      "descJa": "自然な奥行き感を生み出す微細なドロップシャドウ"
    }
  ],
  "table": [
    {
      "role": "테이블 경계선",
      "variable": "var(--atom-border-subtle)",
      "dtcgPath": "color.border.border-subtle",
      "defaultValue": "#f2f4f6",
      "description": "행과 열을 구분하는 표준 실선 보더",
      "type": "color",
      "roleEn": "Table Grid Divider",
      "roleJa": "テーブル境界線",
      "descEn": "Horizontal row divider border between data rows",
      "descJa": "データ行間を区切る水平区切りボーダー"
    },
    {
      "role": "헤더 셀 배경색",
      "variable": "var(--atom-bg-secondary)",
      "dtcgPath": "color.surface.bg-secondary",
      "defaultValue": "#f8f9fa",
      "description": "컬럼 헤더 구분 배경색",
      "type": "color",
      "roleEn": "Header Cell Background",
      "roleJa": "ヘッダーセル背景色",
      "descEn": "Subtle background distinguishing table header columns",
      "descJa": "表の列見出しを識別するための微細なヘッダー背景色"
    },
    {
      "role": "행 호버 배경색",
      "variable": "var(--atom-bg-secondary)",
      "dtcgPath": "color.surface.bg-secondary",
      "defaultValue": "#f8f9fa",
      "description": "데이터 행 마우스 오버 피드백",
      "type": "color",
      "roleEn": "Header Cell Background",
      "roleJa": "ヘッダーセル背景色",
      "descEn": "Subtle background distinguishing table header columns",
      "descJa": "表の列見出しを識別するための微細なヘッダー背景色"
    },
    {
      "role": "테이블 폰트 스케일",
      "variable": "var(--atom-font-body-1)",
      "dtcgPath": "typography.font-body-1",
      "defaultValue": "14px / 1.5",
      "description": "데이터 셀 기본 가독성 타이포그래피",
      "type": "typography",
      "roleEn": "Table Typography Scale",
      "roleJa": "テーブルフォント仕様",
      "descEn": "Standard 14px typography scale for data cell content",
      "descJa": "表内データセルの標準14pxタイポグラフィ仕様"
    }
  ],
  "calendar": [
    {
      "role": "선택일 강조 배경색",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "사용자가 선택한 날짜 원형 배경색",
      "type": "color",
      "roleEn": "Selected Date Highlight",
      "roleJa": "選択日強調背景色",
      "descEn": "Primary brand background highlighting the active date cell",
      "descJa": "選択中の日付セルを強調するPrimaryブランド背景色"
    },
    {
      "role": "날짜 셀 곡률",
      "variable": "var(--atom-radius-md)",
      "dtcgPath": "radius.radius-md",
      "defaultValue": "12px",
      "description": "날짜 선택 영역 라운딩",
      "type": "dimension",
      "roleEn": "Date Cell Radius",
      "roleJa": "日付セル角丸 (Radius)",
      "descEn": "Corner rounding for interactive calendar date cells",
      "descJa": "インタラクティブなカレンダー日付セルの角丸サイズ"
    },
    {
      "role": "오늘 날짜 링 표시",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "당일 표시 아웃라인 링",
      "type": "color",
      "roleEn": "Selected Date Highlight",
      "roleJa": "選択日強調背景色",
      "descEn": "Primary brand background highlighting the active date cell",
      "descJa": "選択中の日付セルを強調するPrimaryブランド背景色"
    },
    {
      "role": "비활성/이전달 폰트",
      "variable": "var(--atom-text-secondary)",
      "dtcgPath": "color.text.text-secondary",
      "defaultValue": "#adb5bd",
      "description": "당월 외 날짜 시각적 디엠퍼시스",
      "type": "color",
      "roleEn": "Inactive/Adjacent Month Font",
      "roleJa": "非アクティブ/前月日付フォント色",
      "descEn": "Visual de-emphasis color for dates outside the active month",
      "descJa": "当月以外の日付を視覚的に抑える控えめなフォント色"
    }
  ],
  "select": [
    {
      "role": "셀렉트 트리거 배경색",
      "variable": "var(--atom-bg-surface)",
      "dtcgPath": "color.surface.bg-surface",
      "defaultValue": "#ffffff",
      "description": "드롭다운 트리거 버튼 표면색",
      "type": "color",
      "roleEn": "Select Trigger Background",
      "roleJa": "セレクタトリガー背景色",
      "descEn": "Default base surface for dropdown select buttons",
      "descJa": "ドロップダウン選択トリガーボタンの基本背景色"
    },
    {
      "role": "드롭다운 테두리",
      "variable": "var(--atom-border-strong)",
      "dtcgPath": "color.border.border-strong",
      "defaultValue": "#e5e8eb",
      "description": "셀렉트 박스 기본 테두리",
      "type": "color",
      "roleEn": "Dropdown Border",
      "roleJa": "ドロップダウン外枠線",
      "descEn": "Outer stroke framing the dropdown trigger and popup menu",
      "descJa": "トリガーおよびポップアップメニューを囲む外枠線"
    },
    {
      "role": "옵션 호버 배경색",
      "variable": "var(--atom-color-primary-subtle)",
      "dtcgPath": "color.brand.color-primary-subtle",
      "defaultValue": "#e8f3ff",
      "description": "목록 아이템 호버 시 강조 배경",
      "type": "color",
      "roleEn": "Option Hover Background",
      "roleJa": "選択肢ホバー背景色",
      "descEn": "Subtle highlight tint when hovering over dropdown options",
      "descJa": "ドロップダウン選択肢にホバーした際のハイライト背景色"
    },
    {
      "role": "메뉴 팝업 그림자",
      "variable": "var(--atom-shadow-lg)",
      "dtcgPath": "shadow.shadow-lg",
      "defaultValue": "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      "description": "옵션 목록 플로팅 그림자",
      "type": "shadow",
      "roleEn": "Menu Popup Shadow",
      "roleJa": "メニューポップアップシャドウ",
      "descEn": "Floating depth shadow for open select menu panels",
      "descJa": "開いたドロップダウンメニューの立体浮遊シャドウ"
    }
  ],
  "accordion": [
    {
      "role": "아코디언 경계선",
      "variable": "var(--atom-border-subtle)",
      "dtcgPath": "color.border.border-subtle",
      "defaultValue": "#f2f4f6",
      "description": "패널 간 수평 구분선",
      "type": "color",
      "roleEn": "Accordion Divider",
      "roleJa": "アコーディオン境界線",
      "descEn": "Clean horizontal separator between accordion panels",
      "descJa": "アコーディオンパネル間を区切るクリーンな境界線"
    },
    {
      "role": "헤더 텍스트 색상",
      "variable": "var(--atom-text-primary)",
      "dtcgPath": "color.text.text-primary",
      "defaultValue": "#191f28",
      "description": "아코디언 질문 및 제목 텍스트",
      "type": "color",
      "roleEn": "Header Title Color",
      "roleJa": "見出しテキスト色",
      "descEn": "High-contrast font color for accordion trigger headers",
      "descJa": "アコーディオン見出しトリガーの高コントラスト文字色"
    },
    {
      "role": "본문 텍스트 색상",
      "variable": "var(--atom-text-secondary)",
      "dtcgPath": "color.text.text-secondary",
      "defaultValue": "#4e5968",
      "description": "펼쳐진 답변 콘텐츠 텍스트",
      "type": "color",
      "roleEn": "Body Text Color",
      "roleJa": "本文テキスト色",
      "descEn": "Legible secondary text color for expanded panel content",
      "descJa": "展開されたパネル本文の読みやすい標準文字色"
    }
  ],
  "tooltip": [
    {
      "role": "툴팁 팝업 배경색",
      "variable": "var(--atom-bg-primary)",
      "dtcgPath": "color.surface.bg-primary",
      "defaultValue": "#191f28",
      "description": "툴팁 플로팅 레이블 배경색 (고대비)",
      "type": "color",
      "roleEn": "Tooltip Surface Background",
      "roleJa": "ツールチップ背景色",
      "descEn": "High-contrast background surface for floating tooltip labels",
      "descJa": "フローティングツールチップ用の高コントラスト表面背景色"
    },
    {
      "role": "툴팁 폰트 색상",
      "variable": "#ffffff",
      "dtcgPath": "color.text.text-inverse",
      "defaultValue": "#ffffff",
      "description": "고대비 배경 위 가독성 화이트 텍스트",
      "type": "color",
      "roleEn": "Tooltip Typography Color",
      "roleJa": "ツールチップ文字色",
      "descEn": "High-legibility white text over dark inverted tooltips",
      "descJa": "反転背景上で明瞭に読める高視認性ホワイト文字"
    },
    {
      "role": "툴팁 모서리 곡률",
      "variable": "var(--atom-radius-sm)",
      "dtcgPath": "radius.radius-sm",
      "defaultValue": "6px",
      "description": "콤팩트한 툴팁 라운딩",
      "type": "dimension",
      "roleEn": "Tooltip Corner Radius",
      "roleJa": "ツールチップ角丸 (Radius)",
      "descEn": "Compact corner radius for micro tooltip callouts",
      "descJa": "小型ツールチップ吹き出しのコンパクトな角丸サイズ"
    },
    {
      "role": "툴팁 그림자",
      "variable": "var(--atom-shadow-md)",
      "dtcgPath": "shadow.shadow-md",
      "defaultValue": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      "description": "툴팁 레이어 분리 그림자",
      "type": "shadow",
      "roleEn": "Tooltip Floating Shadow",
      "roleJa": "ツールチップ立体シャドウ",
      "descEn": "Floating elevation shadow lifting tooltips off page layers",
      "descJa": "ツールチップを画面階層から浮かび上がらせるシャドウ"
    }
  ],
  "toast": [
    {
      "role": "토스트 서피스 배경색",
      "variable": "var(--atom-bg-surface)",
      "dtcgPath": "color.surface.bg-surface",
      "defaultValue": "#ffffff",
      "description": "토스트 팝업 컨테이너 표면색",
      "type": "color",
      "roleEn": "Toast Surface Background",
      "roleJa": "トースト表面背景色",
      "descEn": "Clean surface background for toast notification containers",
      "descJa": "トースト通知コンテナのクリーンな表面背景色"
    },
    {
      "role": "토스트 외곽선",
      "variable": "var(--atom-border-strong)",
      "dtcgPath": "color.border.border-strong",
      "defaultValue": "#e5e8eb",
      "description": "화면 플로팅 인지 경계선",
      "type": "color",
      "roleEn": "Toast Perimeter Outline",
      "roleJa": "トースト外枠境界線",
      "descEn": "Boundary stroke defining floating toast card perimeters",
      "descJa": "浮遊トーストカードの輪郭を定める外枠境界線"
    },
    {
      "role": "토스트 모서리 곡률",
      "variable": "var(--atom-radius-lg)",
      "dtcgPath": "radius.radius-lg",
      "defaultValue": "16px",
      "description": "토스트 팝업 라운딩 규격",
      "type": "dimension",
      "roleEn": "Toast Corner Radius",
      "roleJa": "トースト角丸 (Radius)",
      "descEn": "Standard corner curvature for toast notification popups",
      "descJa": "トースト通知ポップアップの標準角丸サイズ"
    },
    {
      "role": "토스트 플로팅 그림자",
      "variable": "var(--atom-shadow-xl)",
      "dtcgPath": "shadow.shadow-xl",
      "defaultValue": "0 20px 25px -5px rgb(0 0 0 / 0.15)",
      "description": "최상위 레이어 분리 입체 그림자",
      "type": "shadow",
      "roleEn": "Toast Floating Shadow",
      "roleJa": "トースト立体浮遊シャドウ",
      "descEn": "Elevation shadow lifting toasts to the top viewport layer",
      "descJa": "トーストを画面最前面レイヤーに浮き立たせる立体シャドウ"
    }
  ],
  "pagination": [
    {
      "role": "활성 페이지 버튼 배경",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "현재 위치한 페이지 번호 강조 배경",
      "type": "color",
      "roleEn": "Active Page Button Background",
      "roleJa": "アクティブページボタン背景色",
      "descEn": "Primary brand accent emphasizing the current page number",
      "descJa": "現在閲覧中のページ番号を強調するPrimaryブランド色"
    },
    {
      "role": "페이지네이션 곡률",
      "variable": "var(--atom-radius-md)",
      "dtcgPath": "radius.radius-md",
      "defaultValue": "12px",
      "description": "번호 버튼 라운딩 규격",
      "type": "dimension",
      "roleEn": "Pagination Button Radius",
      "roleJa": "ページネーションボタン角丸",
      "descEn": "Standard rounding for pagination number buttons",
      "descJa": "ページ番号ボタンの標準角丸仕様"
    },
    {
      "role": "비활성 버튼 테두리",
      "variable": "var(--atom-border-subtle)",
      "dtcgPath": "color.border.border-subtle",
      "defaultValue": "#e5e8eb",
      "description": "미선택 페이지 버튼 외곽선",
      "type": "color",
      "roleEn": "Inactive Button Border",
      "roleJa": "非アクティブボタン境界線",
      "descEn": "Neutral boundary outline for unselected page buttons",
      "descJa": "未選択ページボタンのニュートラルな外枠線"
    }
  ],
  "radio": [
    {
      "role": "라디오 선택 강조색",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "선택된 라디오 중심 닷 및 테두리 색상",
      "type": "color",
      "roleEn": "Radio Selected Accent",
      "roleJa": "ラジオ選択強調色",
      "descEn": "Accent fill color for the inner dot of selected radio items",
      "descJa": "選択中ラジオボタンの中央ドット強調塗り色"
    },
    {
      "role": "라디오 원형 곡률",
      "variable": "var(--atom-radius-full)",
      "dtcgPath": "radius.radius-full",
      "defaultValue": "9999px",
      "description": "완전한 원형 라디오 규격",
      "type": "dimension",
      "roleEn": "Radio Circular Rounding",
      "roleJa": "ラジオ円形角丸",
      "descEn": "Full circular curvature for standard radio controls",
      "descJa": "標準的なラジオコントロールの完全な円形角丸"
    },
    {
      "role": "기본 테두리 색상",
      "variable": "var(--atom-border-strong)",
      "dtcgPath": "color.border.border-strong",
      "defaultValue": "#d1d5db",
      "description": "미선택 라디오 외곽선",
      "type": "color",
      "roleEn": "Default Border Color",
      "roleJa": "標準外枠境界線色",
      "descEn": "Outer stroke for unselected radio buttons",
      "descJa": "未選択ラジオボタンの外枠境界線"
    }
  ],
  "slider": [
    {
      "role": "슬라이더 채움 트랙 색상",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "선택된 범위 게이지 강조 색상",
      "type": "color",
      "roleEn": "Slider Fill Track Color",
      "roleJa": "スライダー塗りトラック色",
      "descEn": "Accent color illustrating active range percentage",
      "descJa": "アクティブな進捗比率を示すアクセントトラック色"
    },
    {
      "role": "슬라이더 배경 트랙",
      "variable": "var(--atom-bg-secondary)",
      "dtcgPath": "color.surface.bg-secondary",
      "defaultValue": "#e5e8eb",
      "description": "전체 슬라이더 레일 바탕색",
      "type": "color",
      "roleEn": "Slider Track Background",
      "roleJa": "スライダートラック背景色",
      "descEn": "Neutral base track groove holding the slider path",
      "descJa": "スライダーの溝となるニュートラルなベーストラック色"
    },
    {
      "role": "슬라이더 핸들 곡률",
      "variable": "var(--atom-radius-full)",
      "dtcgPath": "radius.radius-full",
      "defaultValue": "9999px",
      "description": "드래그 노브 원형 규격",
      "type": "dimension",
      "roleEn": "Slider Handle Rounding",
      "roleJa": "スライダーつまみ円形角丸",
      "descEn": "Circular rounding for slider thumb handle grips",
      "descJa": "スライダーつまみハンドルの完全な円形角丸"
    }
  ],
  "avatar": [
    {
      "role": "아바타 기본 배경색",
      "variable": "var(--atom-bg-secondary)",
      "dtcgPath": "color.surface.bg-secondary",
      "defaultValue": "#e5e8eb",
      "description": "이미지 로드 전 대체 표면 바탕색",
      "type": "color",
      "roleEn": "Avatar Base Surface",
      "roleJa": "アバター基本背景色",
      "descEn": "Neutral placeholder surface when profile pictures load or fallback",
      "descJa": "プロフィール画像未設定・フォールバック時の基本表面色"
    },
    {
      "role": "아바타 원형 곡률",
      "variable": "var(--atom-radius-full)",
      "dtcgPath": "radius.radius-full",
      "defaultValue": "9999px",
      "description": "프로필 아바타 완전 원형 규격",
      "type": "dimension",
      "roleEn": "Avatar Circular Rounding",
      "roleJa": "アバター円形角丸",
      "descEn": "Full circular border-radius for profile pictures",
      "descJa": "プロフィールアバターの完全な円形角丸"
    },
    {
      "role": "아바타 미세 테두리",
      "variable": "var(--atom-border-subtle)",
      "dtcgPath": "color.border.border-subtle",
      "defaultValue": "rgba(0,0,0,0.08)",
      "description": "배경과의 경계 분리 보더",
      "type": "color",
      "roleEn": "Avatar Subtle Ring",
      "roleJa": "アバター外枠微細リング",
      "descEn": "Gentle ring framing avatars against matching surface backgrounds",
      "descJa": "同系色背景からアバターを際立たせる繊細な境界リング"
    }
  ],
  "progress": [
    {
      "role": "진행도 채움 인디케이터",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "완료 퍼센티지 게이지 브랜드 색상",
      "type": "color",
      "roleEn": "Progress Fill Indicator",
      "roleJa": "進捗インジケーター塗り色",
      "descEn": "Active semantic color advancing across the progress track",
      "descJa": "進捗に応じて進行するアクティブなセマンティック塗り色"
    },
    {
      "role": "프로그레스 트랙 배경",
      "variable": "var(--atom-bg-secondary)",
      "dtcgPath": "color.surface.bg-secondary",
      "defaultValue": "#e5e8eb",
      "description": "진행 바의 배경 트랙 색상",
      "type": "color",
      "roleEn": "Progress Base Track",
      "roleJa": "プログレステープ背景トラック",
      "descEn": "Neutral background container track for progress bars",
      "descJa": "プログレスバー全体のニュートラルな背景トラック"
    },
    {
      "role": "프로그레스 곡률",
      "variable": "var(--atom-radius-full)",
      "dtcgPath": "radius.radius-full",
      "defaultValue": "9999px",
      "description": "부드러운 알약형 진행바 라운딩",
      "type": "dimension",
      "roleEn": "Progress Bar Rounding",
      "roleJa": "プログレスバー角丸",
      "descEn": "Smooth pill rounding along progress track edges",
      "descJa": "プログレステープ両端の滑らかなピル角丸"
    }
  ],
  "skeleton": [
    {
      "role": "스켈레톤 기본 표면색",
      "variable": "var(--atom-bg-secondary)",
      "dtcgPath": "color.surface.bg-secondary",
      "defaultValue": "#e5e8eb",
      "description": "로딩 플레이스홀더 기본 바탕색",
      "type": "color",
      "roleEn": "Skeleton Base Surface",
      "roleJa": "スケルトン基本表面色",
      "descEn": "Low-contrast base color mimicking anticipated content elements",
      "descJa": "コンテンツ形状を模倣する低コントラストの基本背景色"
    },
    {
      "role": "스켈레톤 모서리 곡률",
      "variable": "var(--atom-radius-md)",
      "dtcgPath": "radius.radius-md",
      "defaultValue": "8px",
      "description": "플레이스홀더 블록 표준 곡률",
      "type": "dimension",
      "roleEn": "Skeleton Corner Radius",
      "roleJa": "スケルトン角丸 (Radius)",
      "descEn": "Standard curvature for content loading placeholder blocks",
      "descJa": "コンテンツ読み込みプレースホルダーブロックの標準角丸"
    }
  ],
  "breadcrumb": [
    {
      "role": "경로 구분자 및 비활성 텍스트",
      "variable": "var(--atom-text-secondary)",
      "dtcgPath": "color.text.text-secondary",
      "defaultValue": "#8b95a1",
      "description": "브레드크럼 슬래시(/) 및 상위 링크 텍스트",
      "type": "color",
      "roleEn": "Breadcrumb Separator & Parent Text",
      "roleJa": "パンくず区切り文字および親階層テキスト",
      "descEn": "Muted text color for breadcrumb trail slash (/) and parent links",
      "descJa": "パンくずリストのスラッシュ(/)および親リンク文字色"
    },
    {
      "role": "현재 위치 텍스트 색상",
      "variable": "var(--atom-text-primary)",
      "dtcgPath": "color.text.text-primary",
      "defaultValue": "#191f28",
      "description": "현재 머물고 있는 활성 페이지 폰트",
      "type": "color",
      "roleEn": "Current Page Text Color",
      "roleJa": "現在地テキスト色",
      "descEn": "High-contrast font emphasizing active destination terminal",
      "descJa": "現在閲覧中の終端ページを示す高コントラスト文字色"
    },
    {
      "role": "브레드크럼 폰트 크기",
      "variable": "var(--atom-font-body-2)",
      "dtcgPath": "typography.font-body-2",
      "defaultValue": "13px / 1.4",
      "description": "보조 네비게이션 콤팩트 타이포그래피",
      "type": "typography",
      "roleEn": "Breadcrumb Typography Size",
      "roleJa": "パンくずフォントサイズ仕様",
      "descEn": "Compact secondary typography scale for navigation trails",
      "descJa": "補助ナビゲーション用のコンパクトなタイポグラフィ仕様"
    }
  ],
  "separator": [
    {
      "role": "구분선 기본 색상",
      "variable": "var(--atom-border-subtle)",
      "dtcgPath": "color.border.border-subtle",
      "defaultValue": "#e5e8eb",
      "description": "콘텐츠 영역을 분할하는 1px 서브틀 보더",
      "type": "color",
      "roleEn": "Divider Base Color",
      "roleJa": "区切り線基本色",
      "descEn": "Subtle semantic line demarcating adjacent interface segments",
      "descJa": "隣接するインターフェース領域を分節する繊細な境界線色"
    }
  ],
  "textarea": [
    {
      "role": "텍스트에리어 배경색",
      "variable": "var(--atom-bg-surface)",
      "dtcgPath": "color.surface.bg-surface",
      "defaultValue": "#ffffff",
      "description": "다행 텍스트 입력창 기본 바탕색",
      "type": "color",
      "roleEn": "Textarea Base Background",
      "roleJa": "テキストエリア背景色",
      "descEn": "Base surface background for multi-line text input fields",
      "descJa": "複数行テキスト入力欄の基本表面背景色"
    },
    {
      "role": "텍스트에리어 기본 테두리",
      "variable": "var(--atom-border-strong)",
      "dtcgPath": "color.border.border-strong",
      "defaultValue": "#e5e8eb",
      "description": "입력 박스 외곽 테두리선",
      "type": "color",
      "roleEn": "Textarea Default Border",
      "roleJa": "テキストエリア基本枠線",
      "descEn": "Standard outer border stroke around multi-line textareas",
      "descJa": "テキストエリアの標準外枠ボーダー線"
    },
    {
      "role": "포커스 링 강조 색상",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "포커스 시 활성화되는 아웃라인",
      "type": "color",
      "roleEn": "Focus Ring Accent Color",
      "roleJa": "フォーカスリング強調色",
      "descEn": "Brand accent ring highlighting focused textarea controls",
      "descJa": "テキストエリアフォーカス時のブランド強調リング色"
    },
    {
      "role": "텍스트에리어 모서리 곡률",
      "variable": "var(--atom-radius-md)",
      "dtcgPath": "radius.radius-md",
      "defaultValue": "12px",
      "description": "텍스트 영역 라운딩 규격",
      "type": "dimension",
      "roleEn": "Textarea Corner Radius",
      "roleJa": "テキストエリア角丸 (Radius)",
      "descEn": "Standard corner rounding for multi-line text input fields",
      "descJa": "複数行テキスト入力フィールドの標準角丸仕様"
    }
  ],
  "tree": [
    {
      "role": "트리 선택 아이템 배경색",
      "variable": "var(--atom-color-primary-subtle)",
      "dtcgPath": "color.brand.color-primary-subtle",
      "defaultValue": "#e8f3ff",
      "description": "선택된 노드의 하이라이트 배경색",
      "type": "color",
      "roleEn": "Tree Selected Item Background",
      "roleJa": "ツリー選択項目背景色",
      "descEn": "Subtle highlight wash for active selected tree hierarchy nodes",
      "descJa": "選択中ツリーノードの微細なハイライト背景色"
    },
    {
      "role": "트리 선택 아이템 텍스트",
      "variable": "var(--atom-color-primary)",
      "dtcgPath": "color.brand.color-primary",
      "defaultValue": "#3182f6",
      "description": "활성 노드 라벨 강조 색상",
      "type": "color",
      "roleEn": "Tree Selected Item Text",
      "roleJa": "ツリー選択項目テキスト色",
      "descEn": "Brand colored text font distinguishing active selected nodes",
      "descJa": "アクティブなノードを識別するブランドアクセント文字色"
    },
    {
      "role": "노드 호버 피드백",
      "variable": "var(--atom-bg-secondary)",
      "dtcgPath": "color.surface.bg-secondary",
      "defaultValue": "#f8f9fa",
      "description": "마우스 오버 노드 표면색",
      "type": "color",
      "roleEn": "Tree Selected Item Background",
      "roleJa": "ツリー選択項目背景色",
      "descEn": "Subtle highlight wash for the currently selected tree node",
      "descJa": "現在選択されているツリーノードの微細なハイライト背景色"
    },
    {
      "role": "노드 모서리 곡률",
      "variable": "var(--atom-radius-sm)",
      "dtcgPath": "radius.radius-sm",
      "defaultValue": "6px",
      "description": "트리 아이템 선택 영역 곡률",
      "type": "dimension",
      "roleEn": "Node Corner Radius",
      "roleJa": "ノード角丸 (Radius)",
      "descEn": "Subtle rounding for clickable tree node items",
      "descJa": "クリック可能なツリー項目行の角丸サイズ"
    }
  ],
  "container": [
    {
      "role": "모바일 최대 너비 (sm)",
      "variable": "var(--atom-container-sm)",
      "dtcgPath": "container.container-sm",
      "defaultValue": "640px",
      "description": "모바일 폼 및 단일 다이얼로그 뷰 너비",
      "type": "dimension",
      "roleEn": "Mobile Max-Width (sm)",
      "roleJa": "モバイル最大幅 (sm)",
      "descEn": "640px maximum container constraint for compact mobile viewports",
      "descJa": "モバイルビューポート向けの最大640pxコンテナ幅制約"
    },
    {
      "role": "태블릿 본문 너비 (md)",
      "variable": "var(--atom-container-md)",
      "dtcgPath": "container.container-md",
      "defaultValue": "768px",
      "description": "문서 리딩 및 아티클 본문 최적 너비",
      "type": "dimension",
      "roleEn": "Tablet Content Width (md)",
      "roleJa": "タブレット本文幅 (md)",
      "descEn": "768px maximum container constraint for tablets and focused forms",
      "descJa": "タブレットやフォーム向けの最大768pxコンテナ幅制約"
    },
    {
      "role": "데스크톱 기본 너비 (xl)",
      "variable": "var(--atom-container-xl)",
      "dtcgPath": "container.container-xl",
      "defaultValue": "1280px",
      "description": "기본 데스크톱 대시보드 및 데이터 그리드 너비",
      "type": "dimension",
      "roleEn": "Desktop Base Width (xl)",
      "roleJa": "デスクトップ標準幅 (xl)",
      "descEn": "1280px standard container constraint for responsive web apps",
      "descJa": "レスポンシブWebアプリ向けの標準1280pxコンテナ幅制約"
    },
    {
      "role": "반응형 안전 여백 (모바일)",
      "variable": "var(--atom-layout-gutter)",
      "dtcgPath": "layout.layout-gutter",
      "defaultValue": "16px",
      "description": "모바일 뷰포트 좌우 최소 안전 패딩",
      "type": "dimension",
      "roleEn": "Responsive Gutter Padding (Mobile)",
      "roleJa": "レスポンシブ安全余白 (モバイル)",
      "descEn": "Minimum horizontal safety padding for mobile viewports",
      "descJa": "モバイルビューポートにおける左右最小セーフパディング"
    },
    {
      "role": "반응형 안전 여백 (데스크톱)",
      "variable": "var(--atom-layout-gutter-lg)",
      "dtcgPath": "layout.layout-gutter-lg",
      "defaultValue": "24px",
      "description": "데스크톱 뷰포트 좌우 최소 안전 패딩",
      "type": "dimension",
      "roleEn": "Responsive Gutter Padding (Desktop)",
      "roleJa": "レスポンシブ安全余白 (デスクトップ)",
      "descEn": "Minimum horizontal safety padding for desktop viewports",
      "descJa": "デスクトップビューポートにおける左右最小セーフパディング"
    }
  ],
  "layout": [
    {
      "role": "기본 레이아웃 갭 (Gap)",
      "variable": "var(--atom-layout-gap)",
      "dtcgPath": "layout.layout-gap",
      "defaultValue": "32px",
      "description": "페이지 주요 섹션 간 표준 간격",
      "type": "dimension",
      "roleEn": "Standard Layout Gap",
      "roleJa": "標準レイアウト余白 (Gap)",
      "descEn": "Standard distribution gap between major page sections",
      "descJa": "主要ページセクション間の標準配置間隔"
    },
    {
      "role": "스택 콤팩트 간격 (gap=\"2\")",
      "variable": "var(--atom-space-2)",
      "dtcgPath": "space.space-2",
      "defaultValue": "8px",
      "description": "컴포넌트 내부 요소 간 미세 간격",
      "type": "dimension",
      "roleEn": "Stack Compact Gap (gap=\"2\")",
      "roleJa": "スタックコンパクト余白 (gap=\"2\")",
      "descEn": "Micro spacing gap between closely related sub-components",
      "descJa": "密接に関連するサブコンポーネント間の微細な間隔"
    },
    {
      "role": "스택 표준 간격 (gap=\"4\")",
      "variable": "var(--atom-space-4)",
      "dtcgPath": "space.space-4",
      "defaultValue": "16px",
      "description": "일반 폼 필드 및 카드 간 기본 스택 간격",
      "type": "dimension",
      "roleEn": "Default Layout Gap",
      "roleJa": "標準レイアウト余白 (Gap)",
      "descEn": "16px base element distribution gap across standard flex/grid stacks",
      "descJa": "標準的なFlex/Gridスタックに適用される16pxの基本要素間隔"
    },
    {
      "role": "스택 섹션 간격 (gap=\"8\")",
      "variable": "var(--atom-space-8)",
      "dtcgPath": "space.space-8",
      "defaultValue": "32px",
      "description": "대형 콘텐츠 블록 간 수직 스택 간격",
      "type": "dimension",
      "roleEn": "Macro Module Gap",
      "roleJa": "大型モジュール余白 (Macro Gap)",
      "descEn": "32px expansive spacing separating disparate page sections",
      "descJa": "異なる画面セクション間を大きく区切る32pxの拡張余白"
    }
  ]
};

export function getComponentTokens(componentId: string): ComponentTokenMapping[] {
  return COMPONENT_TOKEN_MAPPINGS[componentId] || [];
}

export function getLocalizedToken(token: ComponentTokenMapping, locale: 'ko' | 'en' | 'ja') {
  if (locale === 'en') {
    return {
      role: token.roleEn || token.role,
      description: token.descEn || token.description,
    };
  }
  if (locale === 'ja') {
    return {
      role: token.roleJa || token.role,
      description: token.descJa || token.description,
    };
  }
  return {
    role: token.role,
    description: token.description,
  };
}
