export interface ComponentI18nData {
  name: string;
  description: string;
  useCases?: string[];
  usagePatterns?: string[];
  dosAndDonts?: Array<{ do: string; dont: string }>;
}

export const COMPONENT_TRANSLATIONS: Record<'en' | 'ja', Record<string, ComponentI18nData>> = {
  en: {
    button: {
      name: 'Button (Button Variants)',
      description: 'Production-ready button set combining 3-tier visual hierarchy (Primary, Secondary, Ghost/Icon) and semantic system states (Brand, Success, Warning, Destructive).',
      useCases: [
        'Single primary conversion action per screen - Primary CTA (Save, Checkout, Sign up in brand color)',
        'Neutral secondary actions in dialog modals - Cancel, Back, Previous step with Secondary / Outline',
        'High-density table toolbars & filter bars - Icon-Only & Ghost buttons to minimize visual noise',
        'Irreversible or critical actions - Destructive buttons for Delete, Cancel Order, Close Account',
      ],
      usagePatterns: [
        'Place at most one Primary action per viewport to guide unambiguous user focus.',
        'Always provide aria-label for Icon-Only buttons to ensure screen reader accessibility.',
        'When displaying loading spinners, keep width fixed and disable pointer events to prevent layout shifts.',
      ],
      dosAndDonts: [
        {
          do: 'Structure visual hierarchy logically: Primary > Secondary > Ghost.',
          dont: 'Do not place multiple Primary brand buttons side-by-side, causing decision paralysis.',
        },
        {
          do: 'Use semantic status colors (Red, Orange, Green) mapped to user action consequences.',
          dont: 'Do not use random inline color hex codes like bg-[#ff0000] instead of system tokens.',
        },
      ],
    },
    input: {
      name: 'Input Field (Input)',
      description: 'Single-line text input field bound to standard border, surface, focus ring, and validation error tokens.',
      useCases: [
        'User authentication flows (Email, password, verification code)',
        'Search query inputs and autocomplete fields',
        'Checkout and billing information entry forms',
      ],
      usagePatterns: [
        'Always connect explicit <label> with htmlFor and input id for keyboard/screen reader accessibility.',
        'Display inline validation error messages with aria-invalid when input is invalid.',
      ],
      dosAndDonts: [
        {
          do: 'Provide clear visual focus ring tokens when user tabs into the input.',
          dont: 'Do not hide labels or replace them solely with placeholder text.',
        },
      ],
    },
    selection: {
      name: 'Selection (Switch & Checkbox)',
      description: 'Interactive selection controls for immediate state toggling (Switch) and multi-selection agreements (Checkbox).',
      useCases: [
        'Immediate configuration toggles (Push notifications, Dark mode, Biometric login)',
        'Terms of Service and Privacy Policy agreement checkboxes',
        'Batch multi-row selection in data tables',
      ],
      usagePatterns: [
        'Use Switch for immediate on/off toggles without requiring a separate save button.',
        'Use Checkbox when selection is part of a form that requires submission.',
      ],
      dosAndDonts: [
        {
          do: 'Ensure accessible tap target of at least 44x44px for touch screens.',
          dont: 'Do not use Switch when the action requires an explicit confirmation or submit click.',
        },
      ],
    },
    dialog: {
      name: 'Modal Dialog (Dialog)',
      description: 'Modal window overlay requiring explicit user confirmation or presenting focused sub-workflows.',
      useCases: [
        'Financial transfer confirmations, final checkout steps, destructive delete confirmations',
        'Focused single-task input wizards',
      ],
      usagePatterns: [
        'Trap keyboard focus inside the modal and allow dismissal with the Escape key.',
      ],
      dosAndDonts: [
        {
          do: 'Provide clear primary and secondary action buttons with distinct visual weights.',
          dont: 'Do not open multiple stacked modals simultaneously, disorienting users.',
        },
      ],
    },
    sheet: {
      name: 'Bottom Sheet (Sheet)',
      description: 'Mobile-first drawer panel sliding from the bottom for quick contextual details and actions.',
      useCases: [
        'Mobile detail inspection, bottom action sheet filters, payment method selector',
      ],
      usagePatterns: [
        'Support swipe-to-dismiss drag gestures and backdrop tap to close.',
      ],
      dosAndDonts: [
        {
          do: 'Use smooth slide-in transitions with standard easing tokens.',
          dont: 'Do not overflow bottom sheets beyond viewport height without internal scrolling.',
        },
      ],
    },
    alert: {
      name: 'Alert Callout (Alert)',
      description: 'Contextual notification banner communicating system status, tips, or warning alerts.',
      useCases: [
        'Form submission error summaries, system maintenance notices, promotional banners',
      ],
      usagePatterns: [
        'Use semantic status colors (danger, warning, success, info) aligned with message severity.',
      ],
      dosAndDonts: [
        {
          do: 'Pair status colors with meaningful icons for colorblind accessibility.',
          dont: 'Do not use flashing or overly intrusive alerts for routine information.',
        },
      ],
    },
    tabs: {
      name: 'Segmented Tabs (Tabs)',
      description: 'Segmented navigation control switching between views within the same context.',
      useCases: [
        'Account settings categories, framework code snippet switchers, dashboard period filters',
      ],
      usagePatterns: [
        'Support keyboard left/right arrow navigation between tab items.',
      ],
      dosAndDonts: [
        {
          do: 'Keep tab labels concise (1-2 words) for clean responsive wrapping.',
          dont: 'Do not use tabs for cross-page navigation; use global links instead.',
        },
      ],
    },
    badge: {
      name: 'Status Badge (Badge)',
      description: 'Compact pill badge for categorization, numerical counts, and real-time status indicators.',
      useCases: [
        'Order status (Pending, Shipped, Delivered), subscription tiers, new feature tags',
      ],
      usagePatterns: [
        'Keep badge content short and strictly secondary to primary text.',
      ],
      dosAndDonts: [
        {
          do: 'Use subtle background tints with high-contrast text for optimal legibility.',
          dont: 'Do not clutter cards with excessive badges competing for visual attention.',
        },
      ],
    },
    card: {
      name: 'Content Card (Card)',
      description: 'Structured surface container grouping related information with subtle borders and elevation tokens.',
      useCases: [
        'Dashboard metric cards, product listing grids, account balance overview',
      ],
      usagePatterns: [
        'Maintain consistent padding tokens (var(--atom-space-4)) across card grids.',
      ],
      dosAndDonts: [
        {
          do: 'Establish clear internal typography hierarchy from header to body.',
          dont: 'Do not nest cards within cards more than 2 levels deep.',
        },
      ],
    },
    table: {
      name: 'Data Table (Table)',
      description: 'W3C token-bound data grid for displaying structured records with hover and border states.',
      useCases: [
        'Transaction histories, member lists, administrative audit logs',
      ],
      usagePatterns: [
        'Align numerical and monetary columns to the right for easy scanning.',
      ],
      dosAndDonts: [
        {
          do: 'Provide responsive horizontal scroll containers for mobile viewports.',
          dont: 'Do not truncate essential data without providing a full tooltip or detail view.',
        },
      ],
    },
    layout: {
      name: 'Layout & Stack (Layout & Stack)',
      description: 'Page-level structure shells (Header, Sidebar, Content) and spacing token assembly tools (Stack, Grid).',
      useCases: [
        'Global enterprise dashboard shell (Top nav + Left sidebar + Main content)',
        'Vertical stack alignment with standardized spacing tokens (gap="4")',
        'Responsive card grid layouts (cols={3} gap="4")',
      ],
      usagePatterns: [
        'Compose layouts using Layout.Header, Layout.Sidebar, Stack, and Grid.',
      ],
      dosAndDonts: [
        {
          do: 'Use standardized gap tokens instead of arbitrary margin utilities.',
          dont: 'Do not use non-standard inline values like mb-[17px] or mt-[23px].',
        },
      ],
    },
    container: {
      name: 'Responsive Container (Container)',
      description: 'Centered responsive container constraining max-width and applying automatic gutter padding.',
      useCases: [
        'Centered article reading views (size="md")',
        'Standard web application main body (size="lg")',
        'Enterprise data dashboard grids (size="xl")',
      ],
      usagePatterns: [
        'Choose container sizes matching page content density.',
      ],
      dosAndDonts: [
        {
          do: 'Use standard container size tokens (sm, md, lg, xl, 2xl).',
          dont: 'Do not hardcode arbitrary max-width styles like max-w-[1140px].',
        },
      ],
    },
  },
  ja: {
    button: {
      name: 'ボタン (Button Variants)',
      description: '3段階の視覚的優先度（Primary, Secondary, Ghost/Icon）とシステム状態色（Brand, Success, Warning, Destructive）を統合した本番対応ボタンセット。',
      useCases: [
        '画面で最も重要な単一コンバージョン行動 - Primary CTA（保存、決済、会員登録などブランド色）',
        'ダイアログ内のキャンセル、戻るなどの補助行動 - Secondary / Outline',
        '情報密度の高いテーブルツールバー・検索バー - 視覚的ノイズを抑えるIcon-Only & Ghost',
        '不可逆または重大なアクション - 削除、注文キャンセル、退会などのDestructive',
      ],
      usagePatterns: [
        'ユーザーの視線を迷わせないよう、1画面内のPrimaryボタンは原則1つに制限します。',
        'アイコンのみのボタンには必ずaria-labelを付与し、アクセシビリティを確保します。',
        'ローディング中は幅を固定しポインターイベントを無効化してレイアウト崩れを防ぎます。',
      ],
      dosAndDonts: [
        {
          do: 'Primary > Secondary > Ghostの明確な視覚的優先度を維持します。',
          dont: '同一エリアにPrimaryボタンを並列配置し、ユーザーの決定を阻害しないこと。',
        },
        {
          do: '結果の重大度に応じたシステム状態色（赤・橙・緑）を使用します。',
          dont: 'システムトークンをバイパスしてbg-[#ff0000]などのインライン色を使用しないこと。',
        },
      ],
    },
    input: {
      name: '入力フィールド (Input)',
      description: '枠線、表面色、フォーカスリング、バリデーションエラーのW3Cトークンに準拠した1行テキスト入力コンポーネント。',
      useCases: [
        '認証フロー（メールアドレス、パスワード、認証コード入力）',
        '検索バーおよびオートコンプリート検索フィールド',
        '決済および請求先情報入力フォーム',
      ],
      usagePatterns: [
        'アクセシビリティ確保のため、必ず<label>とhtmlFor/idを紐付けます。',
        'バリデーションエラー時はaria-invalidとともにインラインエラーを表示します。',
      ],
      dosAndDonts: [
        {
          do: 'キーボードフォーカス時に明確なフォーカスリングトークンを表示します。',
          dont: 'ラベルを省略してプレースホルダーのみで代用しないこと。',
        },
      ],
    },
    selection: {
      name: '選択コントロール (Switch & Checkbox)',
      description: '即時設定変更（Switch）および複数選択・規約同意（Checkbox）のためのインタラクティブコントロール。',
      useCases: [
        '即時設定切り替え（プッシュ通知、ダークモード、生体認証）',
        '利用規約およびプライバシーポリシー同意チェックボックス',
        'データテーブルの複数行一括選択',
      ],
      usagePatterns: [
        '保存ボタン不要で即時反映される設定項目にはSwitchを使用します。',
        'フォーム送信を伴う選択項目にはCheckboxを使用します。',
      ],
      dosAndDonts: [
        {
          do: 'タッチ操作を考慮し最低44x44pxのタップ領域を確保します。',
          dont: '送信ボタンが必要なフォームでSwitchを使用しないこと。',
        },
      ],
    },
    dialog: {
      name: 'モーダルダイアログ (Dialog)',
      description: 'ユーザーの明示的な確認や集中したサブタスクを要求するモーダルウィンドウオーバーレイ。',
      useCases: [
        '送金確認、最終決済ステップ、データ削除確認',
        '特定タスクに集中させるサブ入力ウィザード',
      ],
      usagePatterns: [
        'モーダル内部にキーボードフォーカスを閉じ込め、Escapeキーで閉じられるようにします。',
      ],
      dosAndDonts: [
        {
          do: '優先度が明確に分かれたPrimary/Secondaryボタンを配置します。',
          dont: '複数のモーダルを連続で重ねて表示し、文脈を混乱させないこと。',
        },
      ],
    },
    sheet: {
      name: 'ボトムシート (Sheet)',
      description: '下部からスライドアップして詳細情報や追加アクションを提示するモバイルファーストドロワー。',
      useCases: [
        'モバイル詳細閲覧、フィルターアクションシート、決済方法選択パネル',
      ],
      usagePatterns: [
        'スワイプによる終了ジェスチャーおよび背景タップで閉じられるようにします。',
      ],
      dosAndDonts: [
        {
          do: '標準イージングトークンを用いた滑らかなアニメーションを適用します。',
          dont: '内部スクロールなしに画面の高さを超えるコンテンツを配置しないこと。',
        },
      ],
    },
    alert: {
      name: 'アラートコールアウト (Alert)',
      description: 'システムのステータス、ヒント、警告を伝えるコンテキスト通知バナー。',
      useCases: [
        'フォーム送信エラーの概要表示、システムメンテ告知、プロモーション通知',
      ],
      usagePatterns: [
        'メッセージの重大度に応じたセマンティック状態色（危険、警告、成功、情報）を使用します。',
      ],
      dosAndDonts: [
        {
          do: '色覚多様性に配慮し、色だけでなくアイコンを併用します。',
          dont: '日常的な通知に過剰に目立つ赤色アラートを使用しないこと。',
        },
      ],
    },
    tabs: {
      name: 'セグメントタブ (Tabs)',
      description: '同一コンテキスト内で複数のビューやコンテンツを切り替えるセグメントコントロール。',
      useCases: [
        'アカウント設定カテゴリ切り替え、コードスニペット言語選択、期間フィルター',
      ],
      usagePatterns: [
        '左右矢印キーによるキーボードタブナビゲーションをサポートします。',
      ],
      dosAndDonts: [
        {
          do: 'タブのテキストは簡潔（1〜2単語）にまとめます。',
          dont: '別ページへの遷移リンクとしてタブを使用しないこと。',
        },
      ],
    },
    badge: {
      name: 'ステータスバッジ (Badge)',
      description: '状態、カテゴリ、件数をコンパクトに表示するカプセル型ピルバッジ。',
      useCases: [
        '注文ステータス（受付、配送中、完了）、プラン種別、新機能タグ',
      ],
      usagePatterns: [
        'バッジは短く簡潔にし、主要コンテンツの補助として使用します。',
      ],
      dosAndDonts: [
        {
          do: '淡い背景色と高コントラストのテキスト色で可読性を担保します。',
          dont: '1つのカードに過剰なバッジを乱立させないこと。',
        },
      ],
    },
    card: {
      name: 'コンテンツカード (Card)',
      description: '関連する情報をグループ化し、微細な境界線とシャドウトークンで立体感を付与するコンテナ。',
      useCases: [
        'ダッシュボード指標カード、商品グリッド、アカウント残高概要',
      ],
      usagePatterns: [
        'グリッド内で一貫したパディングトークン（var(--atom-space-4)）を適用します。',
      ],
      dosAndDonts: [
        {
          do: 'ヘッダーから本文へ明瞭なタイポグラフィ階層を構成します。',
          dont: 'カードの中にカードを3階層以上入れ子にしないこと。',
        },
      ],
    },
    table: {
      name: 'データテーブル (Table)',
      description: 'ホバーフィードバックとW3Cボダートークンを備えた構造化データ表示グリッド。',
      useCases: [
        '取引明細履歴、メンバーリスト、監査ログ',
      ],
      usagePatterns: [
        '数値や金額カラムは右揃えにして視覚的比較を容易にします。',
      ],
      dosAndDonts: [
        {
          do: 'モバイル表示時に水平スクロールコンテナを確保します。',
          dont: '重要データをツールチップなしに省略表示しないこと。',
        },
      ],
    },
    layout: {
      name: 'レイアウト＆スタック (Layout & Stack)',
      description: '全体ページ構造（Header, Sidebar, Content）および余白トークン連携レイアウトツール（Stack, Grid）。',
      useCases: [
        'エンタープライズダッシュボードのグローバルシェル（ヘッダー＋サイドバー＋本文）',
        '余白トークン（gap="4"）に基づく整列された垂直スタック',
        'レスポンシブカードグリッド（cols={3} gap="4"）',
      ],
      usagePatterns: [
        'Layout.Header, Layout.Sidebar, Stack, Gridを組み合わせて構築します。',
      ],
      dosAndDonts: [
        {
          do: 'インラインマージンの代わりに標準gapトークンを使用します。',
          dont: 'mb-[17px]などの非標準ハードコード値を混入させないこと。',
        },
      ],
    },
    container: {
      name: 'レスポンシブコンテナ (Container)',
      description: 'ビューポート幅に応じて最大幅と左右パディングを自動制御する中央配置コンテナ。',
      useCases: [
        '読みやすい記事ビュー（size="md"）',
        '標準ウェブアプリ本文（size="lg"）',
        '大画面ダッシュボードグリッド（size="xl"）',
      ],
      usagePatterns: [
        'コンテンツの密度に応じたコンテナサイズを選択します。',
      ],
      dosAndDonts: [
        {
          do: '標準コンテナサイズトークン（sm, md, lg, xl, 2xl）を使用します。',
          dont: 'max-w-[1140px]などの非標準値をハードコードしないこと。',
        },
      ],
    },
  },
};

export function getComponentLocalizedData(
  componentId: string,
  locale: 'ko' | 'en' | 'ja'
): ComponentI18nData | null {
  if (locale === 'ko') return null;
  return COMPONENT_TRANSLATIONS[locale]?.[componentId] || null;
}
