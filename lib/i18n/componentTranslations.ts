export interface ComponentI18nData {
  name: string;
  description: string;
  useCases?: string[];
  usagePatterns?: string[];
  dosAndDonts?: Array<{ do: string; dont: string }>;
}

export const COMPONENT_TRANSLATIONS: Record<'en' | 'ja', Record<string, ComponentI18nData>> = {
  en: {
  "layout-spacing": {
    "name": "Layout & Spacing Specs",
    "description": "Standard 8-point spacing scale, Container constraints, Stack distributions, and Grid responsive layouts.",
    "useCases": [
      "Standardizing padding and margin scales across all UI components (4px to 64px)",
      "Ensuring visual consistency across horizontal and vertical element gaps using Stack",
      "Responsive container max-width constraints and column gutter alignment"
    ],
    "usagePatterns": [
      "Use standard CSS variables (var(--atom-space-*)) instead of arbitrary pixel values.",
      "Apply 8px increments for standard element flow and 24px+ for section separation."
    ],
    "dosAndDonts": [
      {
        "do": "Adopt 8-point multiples (8px, 16px, 24px, 32px) as the first choice.",
        "dont": "Do not use rogue utility values such as gap-[13px] or p-[7px]."
      }
    ]
  },
  "color-status": {
    "name": "Color & System Status",
    "description": "Brand identity colors, semantic status states (Success, Warning, Destructive, Info), and theme-reactive surface pairings.",
    "useCases": [
      "Communicating core brand identity via Primary and Secondary CTA elements",
      "Semantic status feedback mapping for Success (Green), Warning (Amber), and Destructive (Red)",
      "Surface tokens (bg-primary, bg-secondary) enabling seamless light/dark mode transitions"
    ],
    "usagePatterns": [
      "Reference semantic intent tokens (var(--atom-color-*), var(--atom-status-*)) over raw hex values.",
      "Maintain at least 4.5:1 contrast ratios across text and surface pairings adhering to WCAG 2.1 AA."
    ],
    "dosAndDonts": [
      {
        "do": "Map destructive actions strictly to Destructive danger tokens.",
        "dont": "Do not sprinkle random neon red or arbitrary tailwind colors across standard interfaces."
      }
    ]
  },
  "typography": {
    "name": "Font & Typography Scale",
    "description": "Complete typography hierarchy scale ensuring legibility and Swiss modernist visual structure (Display, Heading, Body, Caption).",
    "useCases": [
      "Prominent hero titles and promotional display text",
      "Hierarchical document headings from H1 to H4",
      "Body copy legibility with Body-1 (14px) and Body-2 (16px)",
      "Metadata and timestamps using Caption (12px)"
    ],
    "usagePatterns": [
      "Use composite tokens binding font size, line height, letter spacing, and weight together.",
      "Standardize UI body copy on 14px (var(--atom-font-body-1))."
    ],
    "dosAndDonts": [
      {
        "do": "Structure typographic ladders hierarchically: Display > H1 > H2 > Body > Caption.",
        "dont": "Never use unreadable micro-fonts under 10px in mobile or compact views."
      }
    ]
  },
  "button": {
    "name": "Button (Button Variants)",
    "description": "Production-ready button set combining 3-tier visual hierarchy (Primary, Secondary, Ghost/Icon) and semantic system states (Brand, Success, Warning, Destructive).",
    "useCases": [
      "Single primary conversion action per screen - Primary CTA (Save, Checkout, Sign up in brand color)",
      "Neutral secondary actions in dialog modals - Cancel, Back, Previous step with Secondary / Outline",
      "High-density table toolbars & filter bars - Icon-Only & Ghost buttons to minimize visual noise",
      "Irreversible or critical actions - Destructive buttons for Delete, Cancel Order, Close Account"
    ],
    "usagePatterns": [
      "Place at most one Primary action per viewport to guide unambiguous user focus.",
      "Always provide aria-label for Icon-Only buttons to ensure screen reader accessibility.",
      "When displaying loading spinners, keep width fixed and disable pointer events to prevent layout shifts."
    ],
    "dosAndDonts": [
      {
        "do": "Structure visual hierarchy logically: Primary > Secondary > Ghost.",
        "dont": "Do not place multiple Primary brand buttons side-by-side, causing decision paralysis."
      },
      {
        "do": "Use semantic status colors (Red, Orange, Green) mapped to user action consequences.",
        "dont": "Do not use random inline color hex codes like bg-[#ff0000] instead of system tokens."
      }
    ]
  },
  "input": {
    "name": "Input Field (Input)",
    "description": "Single-line text input field bound to standard border, surface, focus ring, and validation error tokens.",
    "useCases": [
      "User authentication flows (Email, password, verification code)",
      "Search query inputs and autocomplete fields",
      "Checkout and billing information entry forms"
    ],
    "usagePatterns": [
      "Always connect explicit <label> with htmlFor and input id for keyboard/screen reader accessibility.",
      "Display inline validation error messages with aria-invalid when input is invalid."
    ],
    "dosAndDonts": [
      {
        "do": "Provide clear visual focus ring tokens when user tabs into the input.",
        "dont": "Do not hide labels or replace them solely with placeholder text."
      }
    ]
  },
  "selection": {
    "name": "Selection (Switch & Checkbox)",
    "description": "Interactive selection controls for immediate state toggling (Switch) and multi-selection agreements (Checkbox).",
    "useCases": [
      "Immediate configuration toggles (Push notifications, Dark mode, Biometric login)",
      "Terms of Service and Privacy Policy agreement checkboxes",
      "Batch multi-row selection in data tables"
    ],
    "usagePatterns": [
      "Use Switch for immediate on/off toggles without requiring a separate save button.",
      "Use Checkbox when selection is part of a form that requires submission."
    ],
    "dosAndDonts": [
      {
        "do": "Ensure accessible tap target of at least 44x44px for touch screens.",
        "dont": "Do not use Switch when the action requires an explicit confirmation or submit click."
      }
    ]
  },
  "dialog": {
    "name": "Modal Dialog (Dialog)",
    "description": "Modal window overlay requiring explicit user confirmation or presenting focused sub-workflows.",
    "useCases": [
      "Financial transfer confirmations, final checkout steps, destructive delete confirmations",
      "Focused single-task input wizards"
    ],
    "usagePatterns": [
      "Trap keyboard focus inside the modal and allow dismissal with the Escape key."
    ],
    "dosAndDonts": [
      {
        "do": "Provide clear primary and secondary action buttons with distinct visual weights.",
        "dont": "Do not open multiple stacked modals simultaneously, disorienting users."
      }
    ]
  },
  "sheet": {
    "name": "Bottom Sheet (Sheet)",
    "description": "Mobile-first drawer panel sliding from the bottom for quick contextual details and actions.",
    "useCases": [
      "Mobile detail inspection, bottom action sheet filters, payment method selector"
    ],
    "usagePatterns": [
      "Support swipe-to-dismiss drag gestures and backdrop tap to close."
    ],
    "dosAndDonts": [
      {
        "do": "Use smooth slide-in transitions with standard easing tokens.",
        "dont": "Do not overflow bottom sheets beyond viewport height without internal scrolling."
      }
    ]
  },
  "alert": {
    "name": "Alert Callout (Alert)",
    "description": "Contextual notification banner communicating system status, tips, or warning alerts.",
    "useCases": [
      "Form submission error summaries, system maintenance notices, promotional banners"
    ],
    "usagePatterns": [
      "Use semantic status colors (danger, warning, success, info) aligned with message severity."
    ],
    "dosAndDonts": [
      {
        "do": "Pair status colors with meaningful icons for colorblind accessibility.",
        "dont": "Do not use flashing or overly intrusive alerts for routine information."
      }
    ]
  },
  "tabs": {
    "name": "Segmented Tabs (Tabs)",
    "description": "Segmented navigation control switching between views within the same context.",
    "useCases": [
      "Account settings categories, framework code snippet switchers, dashboard period filters"
    ],
    "usagePatterns": [
      "Support keyboard left/right arrow navigation between tab items."
    ],
    "dosAndDonts": [
      {
        "do": "Keep tab labels concise (1-2 words) for clean responsive wrapping.",
        "dont": "Do not use tabs for cross-page navigation; use global links instead."
      }
    ]
  },
  "badge": {
    "name": "Status Badge (Badge)",
    "description": "Compact pill badge for categorization, numerical counts, and real-time status indicators.",
    "useCases": [
      "Order status (Pending, Shipped, Delivered), subscription tiers, new feature tags"
    ],
    "usagePatterns": [
      "Keep badge content short and strictly secondary to primary text."
    ],
    "dosAndDonts": [
      {
        "do": "Use subtle background tints with high-contrast text for optimal legibility.",
        "dont": "Do not clutter cards with excessive badges competing for visual attention."
      }
    ]
  },
  "card": {
    "name": "Content Card (Card)",
    "description": "Structured surface container grouping related information with subtle borders and elevation tokens.",
    "useCases": [
      "Dashboard metric cards, product listing grids, account balance overview"
    ],
    "usagePatterns": [
      "Maintain consistent padding tokens (var(--atom-space-4)) across card grids."
    ],
    "dosAndDonts": [
      {
        "do": "Establish clear internal typography hierarchy from header to body.",
        "dont": "Do not nest cards within cards more than 2 levels deep."
      }
    ]
  },
  "table": {
    "name": "Data Table (Table)",
    "description": "W3C token-bound data grid for displaying structured records with hover and border states.",
    "useCases": [
      "Transaction histories, member lists, administrative audit logs"
    ],
    "usagePatterns": [
      "Align numerical and monetary columns to the right for easy scanning."
    ],
    "dosAndDonts": [
      {
        "do": "Provide responsive horizontal scroll containers for mobile viewports.",
        "dont": "Do not truncate essential data without providing a full tooltip or detail view."
      }
    ]
  },
  "layout": {
    "name": "Layout & Stack (Layout & Stack)",
    "description": "Page-level structure shells (Header, Sidebar, Content) and spacing token assembly tools (Stack, Grid).",
    "useCases": [
      "Global enterprise dashboard shell (Top nav + Left sidebar + Main content)",
      "Vertical stack alignment with standardized spacing tokens (gap=\"4\")",
      "Responsive card grid layouts (cols={3} gap=\"4\")"
    ],
    "usagePatterns": [
      "Compose layouts using Layout.Header, Layout.Sidebar, Stack, and Grid."
    ],
    "dosAndDonts": [
      {
        "do": "Use standardized gap tokens instead of arbitrary margin utilities.",
        "dont": "Do not use non-standard inline values like mb-[17px] or mt-[23px]."
      }
    ]
  },
  "container": {
    "name": "Responsive Container (Container)",
    "description": "Centered responsive container constraining max-width and applying automatic gutter padding.",
    "useCases": [
      "Centered article reading views (size=\"md\")",
      "Standard web application main body (size=\"lg\")",
      "Enterprise data dashboard grids (size=\"xl\")"
    ],
    "usagePatterns": [
      "Choose container sizes matching page content density."
    ],
    "dosAndDonts": [
      {
        "do": "Use standard container size tokens (sm, md, lg, xl, 2xl).",
        "dont": "Do not hardcode arbitrary max-width styles like max-w-[1140px]."
      }
    ]
  },
  "calendar": {
    "name": "Calendar & DatePicker",
    "description": "Monthly calendar navigation, single and date range selection, today indicators, and disabled dates adhering to W3C accessibility standards.",
    "useCases": [
      "Check-in and check-out date picking in reservation flows (hotels, flights, appointments)",
      "Filtering financial and dashboard transactions by date periods (last 7 days, this month, custom ranges)",
      "Date-of-birth and document expiration date input forms",
      "Setting deadlines for task tracking and project milestones"
    ],
    "usagePatterns": [
      "Visually distinguish between the selected date and \"Today\" so users quickly understand the current reference point.",
      "Disable past or unavailable dates with reduced contrast to intuitively prevent invalid choices.",
      "Provide a touch target of at least 36x36px for calendar date cells on mobile viewports."
    ],
    "dosAndDonts": [
      {
        "do": "Immediately reflect selected year/month/day in an input field or top header with clear formatting (YYYY-MM-DD).",
        "dont": "Do not wait until form submission to trigger error toasts for past dates; disable past date cells in the calendar."
      },
      {
        "do": "Provide intuitive navigation arrows alongside year and month selector dropdowns.",
        "dont": "Do not force users to click previous month arrows 120 times when picking a birth date; provide decade or year jumpers."
      }
    ]
  },
  "select": {
    "name": "Select & Dropdown",
    "description": "Custom dropdown picker with full keyboard navigation, fuzzy search filtering, and categorized group labels.",
    "useCases": [
      "Country and region codes, currency (KRW/USD/EUR), and bank account selection",
      "Product sorting options (Newest, Popular, Price: Low to High, Most Reviewed)",
      "Admin dashboard date ranges and role-based access assignment",
      "Quantity and shipping delivery memo dropdowns"
    ],
    "usagePatterns": [
      "Use dropdown selects instead of radio buttons when there are 5 or more options to preserve screen real estate.",
      "Include an inline search filter inside the dropdown when the list exceeds 15 items for rapid discovery.",
      "Display the selected label and icon clearly on the trigger button after an option is chosen."
    ],
    "dosAndDonts": [
      {
        "do": "Provide a helpful placeholder like \"Select an option...\" when no value is selected.",
        "dont": "Do not bury only 2 or 3 choices inside a dropdown; segmented tabs or radio groups provide a much better experience."
      }
    ]
  },
  "accordion": {
    "name": "Accordion & Collapse",
    "description": "Vertical expandable content panels for FAQs, terms of service, and dense configuration panels, reducing visual clutter.",
    "useCases": [
      "Frequently Asked Questions (FAQ) and help center guides",
      "Checkout step breakdowns (discount coupons, shipping address, payment methods)",
      "Mobile settings and permissions toggles",
      "Collapsible legal disclosures, terms of service, and privacy policies"
    ],
    "usagePatterns": [
      "Place a rotating chevron icon on the right edge of each header to convey expansion state.",
      "Ensure smooth height transitions to prevent jarring content shifts (CLS)."
    ],
    "dosAndDonts": [
      {
        "do": "Formulate header titles as concise questions or key nouns so users can scan effectively.",
        "dont": "Do not leave every accordion panel open by default on page load, which creates unnecessary scroll fatigue."
      }
    ]
  },
  "tooltip": {
    "name": "Tooltip & Popover",
    "description": "Floating contextual overlay displaying supplementary tips when users hover or focus on icons or truncated content.",
    "useCases": [
      "Viewing truncated text hidden behind ellipsis (...)",
      "Helper explanations adjacent to complex financial terms (APR, DSR, amortization)",
      "Describing icon-only buttons (Copy, Download, Settings, Refresh)",
      "Explaining disabled button reasons on hover, such as \"Insufficient permissions\""
    ],
    "usagePatterns": [
      "Introduce a subtle 150-200ms delay to prevent accidental flashing when the mouse grazes the trigger.",
      "Use collision detection to automatically flip tooltip placement when reaching viewport boundaries."
    ],
    "dosAndDonts": [
      {
        "do": "Keep tooltip text concise (1-2 sentences) and focused on supplementary context.",
        "dont": "Do not hide crucial action buttons or forms inside fleeting hover-only tooltips."
      }
    ]
  },
  "toast": {
    "name": "Toast Notifications",
    "description": "Non-blocking floating feedback notifications for success, warning, error, and background task updates.",
    "useCases": [
      "Confirmation upon copying links or tokens to clipboard (\"Copied to clipboard\")",
      "Save, delete, or update feedback messages in background workflows",
      "Network reconnect or background sync failure warnings",
      "Undo action confirmations (\"Item moved to trash. Undo\")"
    ],
    "usagePatterns": [
      "Place toasts consistently at the top-right or bottom-center of the screen.",
      "Auto-dismiss informational or success toasts after 3 to 5 seconds.",
      "Keep persistent or explicit close buttons on destructive or critical error toasts."
    ],
    "dosAndDonts": [
      {
        "do": "Include an action button (e.g., \"Undo\", \"Retry\") when a reversible mistake occurs.",
        "dont": "Do not stack 10 consecutive toasts flooding the screen; cap simultaneous visible toasts to 3."
      }
    ]
  },
  "pagination": {
    "name": "Pagination",
    "description": "Page-based navigation controls for browsing large data sets, supporting jump-to-page, prev/next, and ellipsis truncations.",
    "useCases": [
      "Browsing product lists in e-commerce catalogs",
      "Data tables with dozens or hundreds of ledger records",
      "Forum discussion boards and search results",
      "Audit log and transaction history feeds"
    ],
    "usagePatterns": [
      "Clearly emphasize the currently active page with solid primary or accent styling.",
      "Collapse large page ranges with ellipsis (...) while keeping first and last pages accessible.",
      "Disable Prev on page 1 and Next on the final page."
    ],
    "dosAndDonts": [
      {
        "do": "Provide generous touch targets (at least 36x36px) for finger taps.",
        "dont": "Do not show pagination controls when the entire dataset fits on a single page."
      }
    ]
  },
  "radio": {
    "name": "Radio Group",
    "description": "Single-choice option selectors within mutually exclusive option lists, supporting keyboard arrow navigation.",
    "useCases": [
      "Payment method selection (Credit Card, Bank Transfer, Apple Pay, PayPal)",
      "Delivery speed options (Standard 3-5 days, Express Next-Day, Same-Day)",
      "Language or locale switching in preferences",
      "Single-answer quiz or survey questions"
    ],
    "usagePatterns": [
      "Use radio groups instead of dropdowns when there are 2 to 4 options so all choices remain visible.",
      "Support arrow key navigation (Up/Down or Left/Right) to switch active selections."
    ],
    "dosAndDonts": [
      {
        "do": "Ensure the accompanying text label is clickable together with the circular radio button.",
        "dont": "Do not use radio buttons for multiple selections; use checkboxes instead."
      }
    ]
  },
  "slider": {
    "name": "Slider",
    "description": "Continuous or discrete range selector for numeric inputs like price, volume, and percentage ratings.",
    "useCases": [
      "Price range filters in e-commerce search results (e.g., $10 - $500)",
      "Volume, brightness, and audio media player controls",
      "Loan calculation sliders for term (months) and principal amounts",
      "Font size and opacity adjustments in visual design editors"
    ],
    "usagePatterns": [
      "Display the current numeric value in real-time above the thumb or in an adjacent badge.",
      "Provide discrete tick steps for distinct increments (e.g., steps of 5 or 10)."
    ],
    "dosAndDonts": [
      {
        "do": "Support keyboard arrow adjustments (Left/Right arrow) for accessible fine-tuning.",
        "dont": "Do not rely solely on tiny thumbs without direct text input fields when exact numbers matter."
      }
    ]
  },
  "avatar": {
    "name": "Avatar & Profile",
    "description": "Circular or rounded visual identity component displaying user photos, initial letter fallbacks, and presence badges.",
    "useCases": [
      "User profile icons in header navigation bars",
      "Sender avatars in chat messenger and comment threads",
      "Team member facepiles in collaborative document editors",
      "Contact lists and assignees on Kanban project cards"
    ],
    "usagePatterns": [
      "Render uppercase initials when no image URL is provided or when image loading fails.",
      "Support status indicators (online green dot, busy red dot, offline grey ring) at the bottom-right corner."
    ],
    "dosAndDonts": [
      {
        "do": "Always provide descriptive aria-label or alt text with the person’s full name.",
        "dont": "Do not let broken image icon outlines appear when avatars fail to load; use smooth initial fallbacks."
      }
    ]
  },
  "progress": {
    "name": "Progress Bar",
    "description": "Deterministic and indeterminate progress indicators visualizing file uploads, multi-step forms, and system tasks.",
    "useCases": [
      "File upload and asset downloading progress bars (0% to 100%)",
      "Onboarding multi-step signup wizards (Step 2 of 4)",
      "Storage quota utilization monitors (e.g., 42GB of 100GB used)",
      "Crowdfunding goal completion meters"
    ],
    "usagePatterns": [
      "Display percentage figures alongside progress bars to eliminate ambiguity.",
      "Use indeterminate pulse or shimmer animations when exact duration cannot be calculated."
    ],
    "dosAndDonts": [
      {
        "do": "Include aria-valuenow, aria-valuemin, and aria-valuemax for assistive screen readers.",
        "dont": "Do not use flashing neon colors; keep progress bar styling aligned with system semantic accents."
      }
    ]
  },
  "skeleton": {
    "name": "Skeleton Loader",
    "description": "Low-fidelity placeholder previewing content shapes while data loads, minimizing perceived latency and preventing layout shift.",
    "useCases": [
      "Initial content placeholders for dashboard charts, cards, and profile headers",
      "Feed and article card loading states in social platforms",
      "Table row placeholders while API queries are in flight",
      "E-commerce product grid loading placeholders"
    ],
    "usagePatterns": [
      "Match skeleton geometry precisely to the anticipated final component dimensions.",
      "Use a gentle shimmer gradient moving left-to-right rather than harsh flashing."
    ],
    "dosAndDonts": [
      {
        "do": "Set the width of paragraph text skeleton lines to roughly 60% on the final line to mimic real paragraphs.",
        "dont": "Do not make skeleton animations overly rapid or intense, which causes eye strain."
      }
    ]
  },
  "breadcrumb": {
    "name": "Breadcrumb Navigation",
    "description": "Hierarchical navigation trail illustrating the user’s current location within an Information Architecture (IA).",
    "useCases": [
      "E-commerce category trees (Home > Women > Outerwear > Trench Coats)",
      "Developer documentation structures (Docs > Components > Form > Calendar)",
      "Admin dashboard directory and workspace browsing",
      "Real estate listing locations (State > City > District)"
    ],
    "usagePatterns": [
      "Use clean separators such as a slash (/) or right chevron (>) to guide reading direction.",
      "Truncate deep middle path steps with ellipsis (...) or dropdowns on mobile viewports."
    ],
    "dosAndDonts": [
      {
        "do": "Treat the last item in the path as the active page; render it as non-clickable plain text.",
        "dont": "Do not overuse breadcrumbs on shallow single-depth screens."
      }
    ]
  },
  "separator": {
    "name": "Separator & Divider",
    "description": "Clean horizontal and vertical semantic dividers segmenting distinct content sections and UI action clusters.",
    "useCases": [
      "Dividing account settings from destructive sign-out items in menus",
      "Separator with \"OR\" label between social SSO and email password form inputs",
      "Vertical bars (|) between header utility links",
      "Demarcating card headers, content bodies, and footer buttons"
    ],
    "usagePatterns": [
      "Use subtle border tokens rather than heavy black lines to preserve modern minimalist elegance."
    ],
    "dosAndDonts": [
      {
        "do": "Ensure appropriate vertical and horizontal margins based on orientation.",
        "dont": "Do not make dividers heavier or more prominent than actual content."
      }
    ]
  },
  "textarea": {
    "name": "Textarea with Counter",
    "description": "Multi-line input field supporting live character counts, auto-resizing, and form validation states.",
    "useCases": [
      "Customer support tickets and detailed feedback submissions",
      "Community discussion posts and comment reply boxes",
      "Delivery instruction notes and custom checkout requests",
      "Multi-line AI prompt and markdown editors"
    ],
    "usagePatterns": [
      "Display live character count feedback (\"34 / 500\") at the bottom-right when constraints apply.",
      "Provide concise instructional placeholder text when the field is empty."
    ],
    "dosAndDonts": [
      {
        "do": "Reflect invalid error states with red border tokens and assistive error messages below the field.",
        "dont": "Do not configure min-height so small on mobile that only two words can be read at a time."
      }
    ]
  },
  "tree": {
    "name": "Tree View",
    "description": "Accessible hierarchical tree component representing nested directories, organization charts, and taxonomy branches.",
    "useCases": [
      "IDE code file and folder workspace explorer trees",
      "Organization charts, departments, and role-based access trees",
      "Multi-level e-commerce catalog category trees",
      "Documentation and knowledge base chapter indexes"
    ],
    "usagePatterns": [
      "Provide clear expansion toggles (▶) on parent nodes with rotation animations upon opening.",
      "Highlight selected items with gentle brand tints and semibold weight rather than clunky hard borders.",
      "Draw subtle dashed vertical guide lines to clarify parent-child depth across deep trees."
    ],
    "dosAndDonts": [
      {
        "do": "Expand only 1 or 2 levels by default and allow users to drill down on demand.",
        "dont": "Do not expand thousands of deeply nested nodes at once, causing infinite vertical scrolling."
      },
      {
        "do": "Support keyboard navigation with Space, Enter, and Arrow keys.",
        "dont": "Do not remove focus rings (outline: none) or rely solely on double-clicking."
      }
    ]
  }
},
  ja: {
  "layout-spacing": {
    "name": "レイアウト＆余白仕様 (Layout & Spacing)",
    "description": "8ポイント倍数に基づく一貫したSpacingスケールとContainer、Stack、Gridレイアウトの基本規格。",
    "useCases": [
      "全UIコンポーネントにおけるパディングとマージンの統一 (4px〜64px)",
      "StackとFlex Gapを活用した要素間隔の視覚的一貫性の担保",
      "レスポンシブコンテナ最大幅および列間隔(Gutter)の統一"
    ],
    "usagePatterns": [
      "任意ピクセルの代わりに標準CSS変数(var(--atom-space-*))を使用します。",
      "通常要素には8px刻み、セクション区切りには24px以上を推奨します。"
    ],
    "dosAndDonts": [
      {
        "do": "8の倍数トークン(8px, 16px, 24px, 32px)を基本単位として適用します。",
        "dont": "gap-[13px]やp-[7px]などの非標準値を直接記述しないこと。"
      }
    ]
  },
  "color-status": {
    "name": "カラー＆状態仕様 (Color & Status)",
    "description": "ブランドPrimary/Secondaryとシステム状態色（Success、Warning、Destructive、Info）およびダークモード対応表面色。",
    "useCases": [
      "ブランドアイデンティティを伝えるPrimary CTAと主要操作要素",
      "成功(Success/緑)、警告(Warning/橙)、危険(Destructive/赤)の状態フィードバック",
      "ライト/ダークモード自動切り替えに対応する表面色と文字色トークン"
    ],
    "usagePatterns": [
      "生の色コードではなくセマンティック意図トークン(var(--atom-color-*), var(--atom-status-*))を使用します。",
      "文字と背景のコントラスト比はWCAG 2.1 AA準拠で4.5:1以上を維持します。"
    ],
    "dosAndDonts": [
      {
        "do": "削除や退会などの危険操作には必ずDestructive色を割り当てます。",
        "dont": "単なる強調のために赤色(Destructive)を一般UIに乱用しないこと。"
      }
    ]
  },
  "typography": {
    "name": "フォント＆タイポグラフィ (Font & Typography)",
    "description": "視認性と明確な視覚的優先度を保証する標準タイポグラフィ階層（Display、Heading、Body、Caption）。",
    "useCases": [
      "最上部のプロモーションやヒーロータイトル用のDisplay",
      "ドキュメント構造と情報区分を明確化するH1〜H4見出し",
      "高い可読性を備えた本文用のBody-1 (14px) / Body-2 (16px)",
      "補足メタデータやタイムスタンプ用のCaption (12px)"
    ],
    "usagePatterns": [
      "フォントサイズ、行間、字間、太さが一体となった複合トークンを使用します。",
      "本文テキストの標準サイズは14px(var(--atom-font-body-1))を適用します。"
    ],
    "dosAndDonts": [
      {
        "do": "視覚的優先度（Display > H1 > H2 > Body > Caption）に沿ったセマンティックタグを使用します。",
        "dont": "モバイルや狭い領域でも10px未満の極小フォントを多用しないこと。"
      }
    ]
  },
  "button": {
    "name": "ボタン (Button Variants)",
    "description": "3段階の視覚的優先度（Primary, Secondary, Ghost/Icon）とシステム状態色（Brand, Success, Warning, Destructive）を統合した本番対応ボタンセット。",
    "useCases": [
      "画面で最も重要な単一コンバージョン行動 - Primary CTA（保存、決済、会員登録などブランド色）",
      "ダイアログ内のキャンセル、戻るなどの補助行動 - Secondary / Outline",
      "情報密度の高いテーブルツールバー・検索バー - 視覚的ノイズを抑えるIcon-Only & Ghost",
      "不可逆または重大なアクション - 削除、注文キャンセル、退会などのDestructive"
    ],
    "usagePatterns": [
      "ユーザーの視線を迷わせないよう、1画面内のPrimaryボタンは原則1つに制限します。",
      "アイコンのみのボタンには必ずaria-labelを付与し、アクセシビリティを確保します。",
      "ローディング中は幅を固定しポインターイベントを無効化してレイアウト崩れを防ぎます。"
    ],
    "dosAndDonts": [
      {
        "do": "Primary > Secondary > Ghostの明確な視覚的優先度を維持します。",
        "dont": "同一エリアにPrimaryボタンを並列配置し、ユーザーの決定を阻害しないこと。"
      },
      {
        "do": "結果の重大度に応じたシステム状態色（赤・橙・緑）を使用します。",
        "dont": "システムトークンをバイパスしてbg-[#ff0000]などのインライン色を使用しないこと。"
      }
    ]
  },
  "input": {
    "name": "入力フィールド (Input)",
    "description": "枠線、表面色、フォーカスリング、バリデーションエラーのW3Cトークンに準拠した1行テキスト入力コンポーネント。",
    "useCases": [
      "認証フロー（メールアドレス、パスワード、認証コード入力）",
      "検索バーおよびオートコンプリート検索フィールド",
      "決済および請求先情報入力フォーム"
    ],
    "usagePatterns": [
      "アクセシビリティ確保のため、必ず<label>とhtmlFor/idを紐付けます。",
      "バリデーションエラー時はaria-invalidとともにインラインエラーを表示します。"
    ],
    "dosAndDonts": [
      {
        "do": "キーボードフォーカス時に明確なフォーカスリングトークンを表示します。",
        "dont": "ラベルを省略してプレースホルダーのみで代用しないこと。"
      }
    ]
  },
  "selection": {
    "name": "選択コントロール (Switch & Checkbox)",
    "description": "即時設定変更（Switch）および複数選択・規約同意（Checkbox）のためのインタラクティブコントロール。",
    "useCases": [
      "即時設定切り替え（プッシュ通知、ダークモード、生体認証）",
      "利用規約およびプライバシーポリシー同意チェックボックス",
      "データテーブルの複数行一括選択"
    ],
    "usagePatterns": [
      "保存ボタン不要で即時反映される設定項目にはSwitchを使用します。",
      "フォーム送信を伴う選択項目にはCheckboxを使用します。"
    ],
    "dosAndDonts": [
      {
        "do": "タッチ操作を考慮し最低44x44pxのタップ領域を確保します。",
        "dont": "送信ボタンが必要なフォームでSwitchを使用しないこと。"
      }
    ]
  },
  "dialog": {
    "name": "モーダルダイアログ (Dialog)",
    "description": "ユーザーの明示的な確認や集中したサブタスクを要求するモーダルウィンドウオーバーレイ。",
    "useCases": [
      "送金確認、最終決済ステップ、データ削除確認",
      "特定タスクに集中させるサブ入力ウィザード"
    ],
    "usagePatterns": [
      "モーダル内部にキーボードフォーカスを閉じ込め、Escapeキーで閉じられるようにします。"
    ],
    "dosAndDonts": [
      {
        "do": "優先度が明確に分かれたPrimary/Secondaryボタンを配置します。",
        "dont": "複数のモーダルを連続で重ねて表示し、文脈を混乱させないこと。"
      }
    ]
  },
  "sheet": {
    "name": "ボトムシート (Sheet)",
    "description": "下部からスライドアップして詳細情報や追加アクションを提示するモバイルファーストドロワー。",
    "useCases": [
      "モバイル詳細閲覧、フィルターアクションシート、決済方法選択パネル"
    ],
    "usagePatterns": [
      "スワイプによる終了ジェスチャーおよび背景タップで閉じられるようにします。"
    ],
    "dosAndDonts": [
      {
        "do": "標準イージングトークンを用いた滑らかなアニメーションを適用します。",
        "dont": "内部スクロールなしに画面の高さを超えるコンテンツを配置しないこと。"
      }
    ]
  },
  "alert": {
    "name": "アラートコールアウト (Alert)",
    "description": "システムのステータス、ヒント、警告を伝えるコンテキスト通知バナー。",
    "useCases": [
      "フォーム送信エラーの概要表示、システムメンテ告知、プロモーション通知"
    ],
    "usagePatterns": [
      "メッセージの重大度に応じたセマンティック状態色（危険、警告、成功、情報）を使用します。"
    ],
    "dosAndDonts": [
      {
        "do": "色覚多様性に配慮し、色だけでなくアイコンを併用します。",
        "dont": "日常的な通知に過剰に目立つ赤色アラートを使用しないこと。"
      }
    ]
  },
  "tabs": {
    "name": "セグメントタブ (Tabs)",
    "description": "同一コンテキスト内で複数のビューやコンテンツを切り替えるセグメントコントロール。",
    "useCases": [
      "アカウント設定カテゴリ切り替え、コードスニペット言語選択、期間フィルター"
    ],
    "usagePatterns": [
      "左右矢印キーによるキーボードタブナビゲーションをサポートします。"
    ],
    "dosAndDonts": [
      {
        "do": "タブのテキストは簡潔（1〜2単語）にまとめます。",
        "dont": "別ページへの遷移リンクとしてタブを使用しないこと。"
      }
    ]
  },
  "badge": {
    "name": "ステータスバッジ (Badge)",
    "description": "状態、カテゴリ、件数をコンパクトに表示するカプセル型ピルバッジ。",
    "useCases": [
      "注文ステータス（受付、配送中、完了）、プラン種別、新機能タグ"
    ],
    "usagePatterns": [
      "バッジは短く簡潔にし、主要コンテンツの補助として使用します。"
    ],
    "dosAndDonts": [
      {
        "do": "淡い背景色と高コントラストのテキスト色で可読性を担保します。",
        "dont": "1つのカードに過剰なバッジを乱立させないこと。"
      }
    ]
  },
  "card": {
    "name": "コンテンツカード (Card)",
    "description": "関連する情報をグループ化し、微細な境界線とシャドウトークンで立体感を付与するコンテナ。",
    "useCases": [
      "ダッシュボード指標カード、商品グリッド、アカウント残高概要"
    ],
    "usagePatterns": [
      "グリッド内で一貫したパディングトークン（var(--atom-space-4)）を適用します。"
    ],
    "dosAndDonts": [
      {
        "do": "ヘッダーから本文へ明瞭なタイポグラフィ階層を構成します。",
        "dont": "カードの中にカードを3階層以上入れ子にしないこと。"
      }
    ]
  },
  "table": {
    "name": "データテーブル (Table)",
    "description": "ホバーフィードバックとW3Cボダートークンを備えた構造化データ表示グリッド。",
    "useCases": [
      "取引明細履歴、メンバーリスト、監査ログ"
    ],
    "usagePatterns": [
      "数値や金額カラムは右揃えにして視覚的比較を容易にします。"
    ],
    "dosAndDonts": [
      {
        "do": "モバイル表示時に水平スクロールコンテナを確保します。",
        "dont": "重要データをツールチップなしに省略表示しないこと。"
      }
    ]
  },
  "layout": {
    "name": "レイアウト＆スタック (Layout & Stack)",
    "description": "全体ページ構造（Header, Sidebar, Content）および余白トークン連携レイアウトツール（Stack, Grid）。",
    "useCases": [
      "エンタープライズダッシュボードのグローバルシェル（ヘッダー＋サイドバー＋本文）",
      "余白トークン（gap=\"4\"）に基づく整列された垂直スタック",
      "レスポンシブカードグリッド（cols={3} gap=\"4\"）"
    ],
    "usagePatterns": [
      "Layout.Header, Layout.Sidebar, Stack, Gridを組み合わせて構築します。"
    ],
    "dosAndDonts": [
      {
        "do": "インラインマージンの代わりに標準gapトークンを使用します。",
        "dont": "mb-[17px]などの非標準ハードコード値を混入させないこと。"
      }
    ]
  },
  "container": {
    "name": "レスポンシブコンテナ (Container)",
    "description": "ビューポート幅に応じて最大幅と左右パディングを自動制御する中央配置コンテナ。",
    "useCases": [
      "読みやすい記事ビュー（size=\"md\"）",
      "標準ウェブアプリ本文（size=\"lg\"）",
      "大画面ダッシュボードグリッド（size=\"xl\"）"
    ],
    "usagePatterns": [
      "コンテンツの密度に応じたコンテナサイズを選択します。"
    ],
    "dosAndDonts": [
      {
        "do": "標準コンテナサイズトークン（sm, md, lg, xl, 2xl）を使用します。",
        "dont": "max-w-[1140px]などの非標準値をハードコードしないこと。"
      }
    ]
  },
  "calendar": {
    "name": "カレンダー＆日付ピッカー",
    "description": "月別カレンダーナビゲーション、単一および期間選択、本日強調、無効日制御を網羅したW3Cアクセシビリティ準拠カレンダー。",
    "useCases": [
      "予約システム（ホテル宿泊、航空券予約、病院診察など）のチェックイン/チェックアウト日選択",
      "金融・ダッシュボードにおける期間別取引履歴照会（直近7日、今月、カスタム期間）",
      "生年月日および有効期限の入力フォーム",
      "タスク管理やプロジェクトマイルストーンの締め切り日設定"
    ],
    "usagePatterns": [
      "選択された日付と「今日(Today)」の視覚的優先度を明確に区別し、現在基準日を素早く認識できるようにします。",
      "予約不可の過去日や定休日は無効化(Disabled)し、コントラストを下げて直感的に選択を防ぎます。",
      "モバイル環境では各日付セルのタップ領域を36x36px以上確保します。"
    ],
    "dosAndDonts": [
      {
        "do": "選択された日付をヘッダーや入力欄に統一フォーマット(YYYY-MM-DD)で即座に反映します。",
        "dont": "過去日を選択不可にする場合、クリック後にエラートーストを表示するのではなく日付セル自体を無効化してください。"
      },
      {
        "do": "直感的な前月/次月移動矢印に加え、年・月を直接切り替えられるセレクターを提供します。",
        "dont": "生年月日入力で10年前を指定する際に月送り矢印の連打を強制せず、年ジャンプ機能を用意してください。"
      }
    ]
  },
  "select": {
    "name": "カスタムセレクト",
    "description": "キーボード操作、検索フィルタリング、グループラベルをサポートするカスタムドロップダウン選択コンポーネント。",
    "useCases": [
      "国・地域コード、通貨(KRW/USD/JPY)、銀行口座の選択",
      "商品並び替え基準（新着順、人気順、価格が安い順、レビュー順）",
      "管理者ダッシュボードの期間絞り込みおよび権限(Role)割り当て",
      "数量および配送希望メモの選択"
    ],
    "usagePatterns": [
      "選択肢が5個以上ある場合は画面スペースを節約するためラジオボタンではなくドロップダウンを使用します。",
      "選択肢が15個以上ある場合は上部にインライン検索窓を配置して素早い絞り込みを支援します。",
      "選択完了後、トリガーボタンに選択中のラベルとアイコンを明瞭に表示します。"
    ],
    "dosAndDonts": [
      {
        "do": "未選択状態では「選択してください」などの分かりやすいプレースホルダーを表示します。",
        "dont": "選択肢が2〜3個しかないのにドロップダウン内に隠さず、セグメントタブやラジオボタンを活用してください。"
      }
    ]
  },
  "accordion": {
    "name": "アコーディオン",
    "description": "FAQ、利用規約、詳細設定など、垂直方向にコンテンツを展開/折りたたんで視覚的ノイズを減らすアコーディオン。",
    "useCases": [
      "よくある質問(FAQ)およびカスタマーサポートガイド",
      "ショッピングカートの注文ステップ詳細（クーポン適用、配送先、決済方法）",
      "モバイル設定メニューおよび権限管理項目",
      "長大な利用規約およびプライバシーポリシーの開閉表示"
    ],
    "usagePatterns": [
      "各見出し右端に回転する山形矢印(Chevron)アイコンを配置し、開閉状態を明確に案内します。",
      "開閉アニメーションの高さを滑らかに変化させ、画面のガタつき(CLS)を防止します。"
    ],
    "dosAndDonts": [
      {
        "do": "見出しテキストは簡潔な疑問文や重要名詞で構成し、素早く情報を探せるようにします。",
        "dont": "ページ表示時に全項目を開いたままにせず、初期状態では閉じてスクロール負担を減らしてください。"
      }
    ]
  },
  "tooltip": {
    "name": "ツールチップ＆ポップオーバー",
    "description": "アイコンや省略されたテキストにホバーまたはフォーカスした際、補足説明を表示する軽量オーバーレイ。",
    "useCases": [
      "末尾省略(...)されたテキストの全体文面確認",
      "専門用語や金融指標の横にあるクエスチョンマーク(?)アイコンのヘルプ解説",
      "アイコン専用ボタン（コピー、保存、設定、更新）の機能ラベル表示",
      "無効化されたボタンにホバーした際「権限がありません」等の理由説明"
    ],
    "usagePatterns": [
      "意図せずマウスが通過した際の一瞬の点滅を防ぐため、150〜200msの適度な表示遅延を設けます。",
      "画面端に接触した場合は自動的に反対側へ反転する衝突検知を導入します。"
    ],
    "dosAndDonts": [
      {
        "do": "ツールチップ内の文面は1〜2文程度の簡潔な補足情報に留めます。",
        "dont": "重要ボタンや入力フォームなど必須要素をホバー限定ツールチップの中に隠さないでください。"
      }
    ]
  },
  "toast": {
    "name": "トースト通知",
    "description": "操作を妨げずに成功、警告、エラー、バックグラウンド処理の完了を即時フィードバックする通知コンポーネント。",
    "useCases": [
      "クリップボードへのリンク・トークンコピー完了通知（「コピーしました」）",
      "保存、削除、ステータス変更のバックグラウンド完了フィードバック",
      "ネットワーク再接続や同期失敗の軽度な警告",
      "取り消しアクション付き通知（「ゴミ箱へ移動しました。元に戻す」）"
    ],
    "usagePatterns": [
      "画面の右上または下部中央に一貫して配置します。",
      "成功や案内通知は3〜5秒で自動的にフェードアウトさせます。",
      "破壊的操作の通知には閉じるボタンや元に戻す(Undo)アクションを付与します。"
    ],
    "dosAndDonts": [
      {
        "do": "取り消し可能な操作では「元に戻す」アクションボタンをトースト内に配置します。",
        "dont": "画面上に10個もトーストを積み上げず、最大同時表示数を3個程度に制限してください。"
      }
    ]
  },
  "pagination": {
    "name": "ページネーション",
    "description": "大量のデータセットを分割表示し、前後移動、特定ページへの移動、省略(...)記号をサポートするナビゲーション。",
    "useCases": [
      "ECサイトの商品カタログ一覧のページ送り",
      "数十〜数百件の取引明細や台帳テーブルの分割表示",
      "フォーラム掲示板や検索結果一覧",
      "監査ログおよびイベント履歴フィード"
    ],
    "usagePatterns": [
      "現在閲覧中のページ番号を強調スタイルで明確にハイライトします。",
      "ページ数が多い場合は最初と最後を残し中間を三重点(...)で省略します。",
      "1ページ目では「前へ」、最終ページでは「次へ」を適切に無効化(Disabled)します。"
    ],
    "dosAndDonts": [
      {
        "do": "指でのタップ操作を考慮し、ボタンサイズは最低36x36pxを確保します。",
        "dont": "全件が1ページ内に収まる少量のデータで無意味にページネーションを表示しないでください。"
      }
    ]
  },
  "radio": {
    "name": "ラジオグループ",
    "description": "排他的な選択肢の中から1つだけを選択する単一選択UI。キーボード矢印キーでの選択切り替えに対応。",
    "useCases": [
      "決済方法の選択（クレジットカード、銀行振込、Apple Pay、コンビニ決済）",
      "配送オプション（通常配送、お急ぎ便、当日配達）",
      "個人設定での言語・タイムゾーン選択",
      "アンケートやクイズの単一回答"
    ],
    "usagePatterns": [
      "選択肢が2〜4件程度の場合は一覧性を保つためドロップダウンではなくラジオボタングループを使用します。",
      "矢印キー操作で選択肢間をスムーズに移動できるようにします。"
    ],
    "dosAndDonts": [
      {
        "do": "円形ボタンだけでなく、横のテキストラベル部分をクリックしても選択されるようにします。",
        "dont": "複数選択可能な項目にラジオボタンを使用せず、チェックボックスを採用してください。"
      }
    ]
  },
  "slider": {
    "name": "スライダー",
    "description": "価格、音量、パーセンテージなど、連続的または段階的な数値を視覚的に調整する範囲選択コンポーネント。",
    "useCases": [
      "EC検索の価格帯フィルター（例: ¥1,000 〜 ¥50,000）",
      "動画・音楽プレイヤーの音量やシークバー",
      "ローンシミュレーターの返済期間および借入希望額の調整",
      "デザインツールでのフォントサイズや不透明度(Opacity)スライダー"
    ],
    "usagePatterns": [
      "ツマミの上部や横のバッジに現在の数値をリアルタイムに明示します。",
      "キリの良いステップ（5刻み、10刻みなど）で吸着する目盛り(Tick)を提供します。"
    ],
    "dosAndDonts": [
      {
        "do": "キーボードの左右矢印キーで1ステップずつ微調整できるようにします。",
        "dont": "正確な数値を求める入力欄でテキスト入力ボックスを併設せずスライダーのみに依存しないでください。"
      }
    ]
  },
  "avatar": {
    "name": "アバター＆プロファイル",
    "description": "ユーザーの写真画像、イニシャルフォールバック、ステータスバッジを表示する円形・角丸プロファイルアイコン。",
    "useCases": [
      "ヘッダーナビゲーションバー右上のユーザーアイコン",
      "チャットメッセージやコメント一覧の投稿者アイコン",
      "ドキュメント同時編集者のフェイスパイル(Facepile)",
      "タスクボードの担当者バッジ"
    ],
    "usagePatterns": [
      "画像URLが未設定または読み込み失敗時は氏名のイニシャルを大文字で中央配置します。",
      "右下にオンライン（緑点）、離席中（黄点）、オフラインを示すステータスリングを配置できます。"
    ],
    "dosAndDonts": [
      {
        "do": "支援技術のためにユーザー氏名をaria-labelまたはalt属性に必ず設定します。",
        "dont": "画像破損時にブラウザデフォルトの壊れた画像アイコンを放置せず、必ずイニシャル表示にフォールバックしてください。"
      }
    ]
  },
  "progress": {
    "name": "プログレスバー",
    "description": "ファイルアップロードや多段階フォームの進捗率を視覚化するプログレスバーコンポーネント。",
    "useCases": [
      "ファイルアップロードおよびデータダウンロード進捗（0%〜100%）",
      "会員登録や注文ウィザードのステップ表示（全4段階中 ステップ2）",
      "ストレージ使用容量メーター（例: 100GB中 42GB使用）",
      "クラウドファンディング目標達成率"
    ],
    "usagePatterns": [
      "進捗状況の誤認を防ぐためパーセンテージ数値を併記します。",
      "所要時間が特定できない処理では左右に流れるシマーアニメーションを使用します。"
    ],
    "dosAndDonts": [
      {
        "do": "スクリーンリーダー向けにaria-valuenowやaria-valuemax等の属性を付与します。",
        "dont": "蛍光色を避け、システムのセマンティックアクセントに調和する配色にしてください。"
      }
    ]
  },
  "skeleton": {
    "name": "スケルトンローダー",
    "description": "データ読み込み中にコンテンツの概形をプレースホルダーとして表示し、体感速度を向上させCLSを防ぐコンポーネント。",
    "useCases": [
      "ダッシュボードのグラフ、カード、プロファイルヘッダーの初期読み込み枠",
      "SNSフィードおよび記事カードの読み込みプレビュー",
      "API通信中のテーブル行プレースホルダー",
      "商品グリッドのローディングスケルトン"
    ],
    "usagePatterns": [
      "最終的に表示されるコンポーネントとスケルトンの高さ・形状を極力一致させます。",
      "激しい点滅ではなく左から右へ滑らかに流れるグラデーションシマーを適用します。"
    ],
    "dosAndDonts": [
      {
        "do": "複数行のテキストスケルトンでは最後の行の幅を60%程度にして実際の段落らしく見せます。",
        "dont": "アニメーションを速すぎたり眩しくしたりしてユーザーの目を疲れさせないでください。"
      }
    ]
  },
  "breadcrumb": {
    "name": "パンくずリスト",
    "description": "情報アーキテクチャ(IA)におけるユーザーの現在地を階層パスで示し、上位階層へ素早く戻れる探索パス。",
    "useCases": [
      "ECサイトの商品カテゴリ階層（ホーム > レディース > アウター > トレンチコート）",
      "開発者ドキュメント階層（Docs > Components > Form > Calendar）",
      "管理画面のフォルダ階層や詳細設定のナビゲーション",
      "不動産物件の地域階層（東京都 > 港区 > 六本木）"
    ],
    "usagePatterns": [
      "区切り文字にはスラッシュ(/)や右山形(>)アイコンを用いて視覚的な流れを作ります。",
      "モバイル画面で階層が長すぎる場合は中間階層を三重点(...)等で折りたたみます。"
    ],
    "dosAndDonts": [
      {
        "do": "末尾の現在地項目はリンクにせずクリック不可の標準テキストとして表示します。",
        "dont": "1階層しかない浅い画面に無駄にパンくずリストを配置しないでください。"
      }
    ]
  },
  "separator": {
    "name": "ディバイダー",
    "description": "コンテンツグループやUI要素間の視覚的境界を自然に区切る水平・垂直セマンティック区切り線。",
    "useCases": [
      "メニュー内の一般設定とログアウトボタンの間の境界線",
      "フォームにおけるSNSログインとメールアドレス入力欄の間の「または(OR)」区切り線",
      "ヘッダーメニュー項目間の縦バー(|)",
      "カード内のヘッダー、本文、フッターの区分け"
    ],
    "usagePatterns": [
      "ミニマルデザインでは濃い黒線ではなくSubtleテーマトークンを用いて繊細に領域を分節します。"
    ],
    "dosAndDonts": [
      {
        "do": "水平・垂直の方向に応じた適切なマージンと高さを付与します。",
        "dont": "区切り線を過度に太く暗くしてコンテンツよりも目立たせないでください。"
      }
    ]
  },
  "textarea": {
    "name": "テキストエリア",
    "description": "お問い合わせ、コメント、長文入力のための複数行入力欄。リアルタイム文字数カウンター付き。",
    "useCases": [
      "カスタマーサポートへの問い合わせ内容および詳細フィードバック入力",
      "ブログやコミュニティの投稿・コメント欄",
      "配送時の要望メモや詳細住所入力",
      "AIプロンプト入力ボックス（複数行）"
    ],
    "usagePatterns": [
      "文字数制限がある場合は右下に「34 / 500文字」などのカウンターを設けて超過を防ぎます。",
      "未入力時は「詳細を入力してください」などの分かりやすいプレースホルダーを提示します。"
    ],
    "dosAndDonts": [
      {
        "do": "エラー時は入力フィールドと同様に赤枠と下部エラーメッセージを連動させます。",
        "dont": "モバイル画面で初期高さを極端に小さくして2〜3文字しか見えない状態にしないでください。"
      }
    ]
  },
  "tree": {
    "name": "ツリービュー",
    "description": "フォルダ階層、組織図、権限ツリーなど入れ子状のデータを視覚化し、開閉・選択をサポートする高アクセシビリティツリー。",
    "useCases": [
      "IDEおよびコードエディタのファイル・ディレクトリ階層エクスプローラー",
      "社内組織図およびチームメンバー一覧、アクセス権限(RBAC)付与ツリー",
      "大規模ECサイトの多段カテゴリ分類ツリー",
      "ナレッジベースの章・節の目次ナビゲーション"
    ],
    "usagePatterns": [
      "子ノードを持つ親要素には開閉トグル(▶)を明示し、回転アニメーションで状態をフィードバックします。",
      "選択された項目は粗野な太い境界線ではなく洗練されたブランドティント背景と太字で表現します。",
      "深いネスト構造では破線のガイドラインを薄く引き、親子関係を一目で把握できるようにします。"
    ],
    "dosAndDonts": [
      {
        "do": "ノード数が多い場合は初期状態で1〜2階層のみ展開し、必要に応じてドリルダウンさせます。",
        "dont": "膨大なノードを一斉に全展開して縦スクロールを無限に引き延ばさないでください。"
      },
      {
        "do": "キーボード操作（Space、Enter、矢印キー）での開閉および選択をサポートします。",
        "dont": "フォーカスリングを消去(outline: none)したり、ダブルクリック操作のみに依存させないでください。"
      }
    ]
  }
},
};

export function getComponentLocalizedData(componentId: string, locale: 'ko' | 'en' | 'ja'): ComponentI18nData | null {
  if (locale === 'ko') return null;
  return COMPONENT_TRANSLATIONS[locale]?.[componentId] || null;
}
