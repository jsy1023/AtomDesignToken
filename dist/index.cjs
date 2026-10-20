'use strict';

var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');

// lib/data/tokens.ts
var BRAND_PRESETS = [
  {
    id: "toss",
    name: "\uD1A0\uC2A4 \uC2A4\uD0C0\uC77C (Toss)",
    brandColor: "#3182f6",
    radius: "16px",
    description: "Vivid Blue, 16px \uBCFC\uB4DC \uB77C\uC6B4\uB529, \uC2DC\uC6D0\uD55C \uC5EC\uBC31\uACFC \uADF9\uB3C4\uC758 \uBBF8\uB2C8\uBA40\uB9AC\uC998"
  },
  {
    id: "daangn",
    name: "\uB2F9\uADFC \uC2A4\uD0C0\uC77C (Daangn)",
    brandColor: "#ff6f0f",
    radius: "12px",
    description: "Warm Orange, 12px \uC18C\uD504\uD2B8 \uB77C\uC6B4\uB529, \uCE5C\uADFC\uD558\uACE0 \uB530\uB73B\uD55C \uCEE4\uBBA4\uB2C8\uD2F0 \uAC10\uC131"
  },
  {
    id: "hyper-violet",
    name: "\uBAA8\uB358 \uBC14\uC774\uC62C\uB81B (Violet Tech)",
    brandColor: "#7c3aed",
    radius: "8px",
    description: "\uC138\uB828\uB41C \uBCF4\uB77C\uC0C9 \uD14C\uD06C \uAC10\uC131, 8px \uC0E4\uD504 \uB77C\uC6B4\uB529, \uAC1C\uBC1C\uC790/B2B \uCD5C\uC801\uD654"
  },
  {
    id: "forest-emerald",
    name: "\uC5D0\uCF54 \uC5D0\uBA54\uB784\uB4DC (Emerald)",
    brandColor: "#10b981",
    radius: "14px",
    description: "\uC790\uC5F0\uC2A4\uB7FD\uACE0 \uD3B8\uC548\uD55C \uB525 \uADF8\uB9B0, \uD540\uD14C\uD06C \uC790\uC0B0 \uBC0F \uC6F0\uB2C8\uC2A4 \uC11C\uBE44\uC2A4\uC6A9"
  }
];
var BASE_COLOR_TOKENS = [
  // Brand
  {
    name: "Primary Accent",
    variable: "--atom-color-primary",
    value: "#3182f6",
    description: "\uC8FC\uC694 \uC561\uC158 \uBC84\uD2BC, \uD65C\uC131 \uD0ED, \uBE0C\uB79C\uB4DC \uAC15\uC870 \uC601\uC5ED\uC758 \uD575\uC2EC \uC0C9\uC0C1",
    category: "brand"
  },
  {
    name: "Primary Hover",
    variable: "--atom-color-primary-hover",
    value: "#1b64da",
    description: "Primary \uCEF4\uD3EC\uB10C\uD2B8\uC5D0 \uB9C8\uC6B0\uC2A4\uB97C \uC62C\uB838\uC744 \uB54C \uC801\uC6A9\uB418\uB294 \uB525 \uD1A4",
    category: "brand"
  },
  {
    name: "Primary Subtle / Light",
    variable: "--atom-color-primary-subtle",
    value: "#e8f3ff",
    description: "\uBC30\uC9C0 \uBC30\uACBD, \uD65C\uC131 \uB9AC\uC2A4\uD2B8 \uC544\uC774\uD15C, \uC120\uD0DD \uD558\uC774\uB77C\uC774\uD2B8 \uBC30\uACBD",
    category: "brand"
  },
  // Surface & Background
  {
    name: "Background Primary",
    variable: "--atom-bg-primary",
    value: "#ffffff",
    description: "\uC6F9 \uC804\uCCB4 \uD398\uC774\uC9C0\uC758 \uAE30\uBCF8 \uCE94\uBC84\uC2A4 \uBC30\uACBD (\uB2E4\uD06C\uBAA8\uB4DC: #090a0f)",
    category: "surface"
  },
  {
    name: "Background Surface / Card",
    variable: "--atom-bg-surface",
    value: "#f8f9fa",
    description: "\uCE74\uB4DC, \uBAA8\uB2EC \uB2E4\uC774\uC5BC\uB85C\uADF8, \uD328\uB110, \uB4DC\uB86D\uB2E4\uC6B4 \uBA54\uB274\uC758 \uBC14\uD0D5\uC0C9",
    category: "surface"
  },
  {
    name: "Background Muted",
    variable: "--atom-bg-muted",
    value: "#f1f3f5",
    description: "\uBE44\uD65C\uC131\uD654\uB41C \uD3FC \uD544\uB4DC, \uD0DC\uADF8 \uCE69, \uBCF4\uC870 \uC601\uC5ED \uBC30\uACBD",
    category: "surface"
  },
  // Text
  {
    name: "Text Primary",
    variable: "--atom-text-primary",
    value: "#191f28",
    description: "\uAC00\uC7A5 \uB192\uC740 \uBA85\uB3C4 \uB300\uBE44\uB97C \uAC16\uB294 \uD575\uC2EC \uBCF8\uBB38 \uBC0F \uD5E4\uB4DC\uB77C\uC778 \uD14D\uC2A4\uD2B8",
    category: "text"
  },
  {
    name: "Text Secondary",
    variable: "--atom-text-secondary",
    value: "#8b95a1",
    description: "\uC124\uBA85\uBB38, \uBD80\uAC00 \uB77C\uBCA8, \uD50C\uB808\uC774\uC2A4\uD640\uB354, \uC11C\uBE0C \uD14D\uC2A4\uD2B8",
    category: "text"
  },
  {
    name: "Text Muted",
    variable: "--atom-text-muted",
    value: "#b0b8c1",
    description: "\uD0C0\uC784\uC2A4\uD0EC\uD504, \uBE44\uD65C\uC131\uD654\uB41C \uB77C\uBCA8, \uC7A5\uC2DD\uC131 \uD78C\uD2B8 \uD14D\uC2A4\uD2B8",
    category: "text"
  },
  // Border
  {
    name: "Border Subtle",
    variable: "--atom-border-subtle",
    value: "#f2f4f6",
    description: "\uCE74\uB4DC \uAD6C\uBD84\uC120, \uB9AC\uC2A4\uD2B8 \uACBD\uACC4\uC120 \uB4F1 \uBD80\uB4DC\uB7EC\uC6B4 \uBD84\uB9AC\uC120",
    category: "border"
  },
  {
    name: "Border Strong",
    variable: "--atom-border-strong",
    value: "#e5e8eb",
    description: "\uC778\uD48B \uD544\uB4DC \uC678\uACFD\uC120, \uBA85\uD655\uD55C \uC544\uC6C3\uB77C\uC778 \uBC84\uD2BC, \uBAA8\uB2EC \uACBD\uACC4\uC120",
    category: "border"
  },
  // Status
  {
    name: "Status Success",
    variable: "--atom-status-success",
    value: "#10b981",
    description: "\uC131\uACF5 \uC644\uB8CC \uC54C\uB9BC, \uC628\uB77C\uC778 \uC0C1\uD0DC, \uC1A1\uAE08 \uC644\uB8CC \uC0C1\uD0DC",
    category: "status"
  },
  {
    name: "Status Danger",
    variable: "--atom-status-danger",
    value: "#f43f5e",
    description: "\uD3FC \uC720\uD6A8\uC131 \uC5D0\uB7EC, \uACBD\uACE0 \uBA54\uC2DC\uC9C0, \uC0AD\uC81C \uB4F1 \uD30C\uAD34\uC801 \uC561\uC158",
    category: "status"
  },
  {
    name: "Status Warning",
    variable: "--atom-status-warning",
    value: "#f59e0b",
    description: "\uC8FC\uC758 \uC54C\uB9BC, \uB300\uAE30 \uC911\uC778 \uC0C1\uD0DC, \uACB0\uC81C \uBCF4\uB958",
    category: "status"
  }
];
var TYPOGRAPHY_TOKENS = [
  {
    name: "Display / Hero Title",
    variable: "--atom-font-display",
    fontSize: "36px (2.25rem)",
    lineHeight: "1.25",
    weight: "800 (ExtraBold)",
    sample: "\uB514\uC790\uC774\uB108\uC758 \uD53C\uADF8\uB9C8 \uD574\uBC29, \uB9D0\uB85C \uB514\uC790\uC778\uD558\uB294 \uC2DC\uB300"
  },
  {
    name: "Title 1 (Page Title)",
    variable: "--atom-font-title-1",
    fontSize: "28px (1.75rem)",
    lineHeight: "1.3",
    weight: "700 (Bold)",
    sample: "\uC6D0\uD074\uB9AD\uC73C\uB85C \uB05D\uB0B4\uB294 \uB514\uC790\uC778 \uD1A0\uD070 \uC2DC\uC2A4\uD15C"
  },
  {
    name: "Title 2 (Section Title)",
    variable: "--atom-font-title-2",
    fontSize: "20px (1.25rem)",
    lineHeight: "1.35",
    weight: "700 (Bold)",
    sample: "\uD504\uB808\uC784\uC6CC\uD06C \uBB34\uAD00\uD55C \uD45C\uC900 CSS \uBCC0\uC218 \uCCB4\uACC4"
  },
  {
    name: "Title 3 (Card Title)",
    variable: "--atom-font-title-3",
    fontSize: "16px (1.0rem)",
    lineHeight: "1.4",
    weight: "600 (SemiBold)",
    sample: "\uACC4\uC88C \uC1A1\uAE08 \uBC0F \uC2E4\uC2DC\uAC04 \uC778\uC99D \uD328\uD134"
  },
  {
    name: "Body 1 (Regular Body)",
    variable: "--atom-font-body-1",
    fontSize: "14px (0.875rem)",
    lineHeight: "1.5",
    weight: "400 (Regular)",
    sample: "React, Vue, \uBC14\uB2D0\uB77C HTML \uC5B4\uB514\uC11C\uB098 \uBCF5\uC0AC \uD55C \uBC88\uC73C\uB85C \uC989\uC2DC \uB80C\uB354\uB9C1\uB429\uB2C8\uB2E4."
  },
  {
    name: "Body 2 / Caption",
    variable: "--atom-font-body-2",
    fontSize: "12px (0.75rem)",
    lineHeight: "1.5",
    weight: "500 (Medium)",
    sample: "W3C DTCG \uD638\uD658 tokens.json \uAE30\uBC18 \uC2A4\uD0C0\uC77C \uB515\uC154\uB108\uB9AC \uCEF4\uD30C\uC77C"
  },
  {
    name: "Mono Code",
    variable: "--atom-font-mono",
    fontSize: "11px (0.6875rem)",
    lineHeight: "1.6",
    weight: "500 (Medium)",
    sample: "npx atomsystem init --preset toss"
  }
];
var RADIUS_TOKENS = [
  {
    name: "None (\uC9C1\uAC01)",
    variable: "--atom-radius-none",
    value: "0px",
    description: "\uB2E8\uB2E8\uD55C \uD14C\uD06C\uB2C8\uCEEC \uB300\uC2DC\uBCF4\uB4DC \uBC0F \uD50C\uB7AB \uB514\uC790\uC778"
  },
  {
    name: "Small (\uC0E4\uD504)",
    variable: "--atom-radius-sm",
    value: "6px",
    description: "\uD0DC\uADF8 \uBC30\uC9C0, \uBBF8\uB2C8 \uC778\uD48B, \uC815\uBC00 \uB370\uC774\uD130 \uD14C\uC774\uBE14 \uCEE8\uD2B8\uB864"
  },
  {
    name: "Medium (\uC18C\uD504\uD2B8)",
    variable: "--atom-radius-md",
    value: "10px",
    description: "\uC77C\uBC18\uC801\uC778 \uBC84\uD2BC, \uC778\uD48B \uD544\uB4DC, \uD234\uD301"
  },
  {
    name: "Large (\uBCFC\uB4DC - \uD1A0\uC2A4/\uB2F9\uADFC \uAE30\uBCF8)",
    variable: "--atom-radius-lg",
    value: "16px",
    description: "\uCE74\uB4DC, \uB300\uD654\uC0C1\uC790 \uBAA8\uB2EC, \uC8FC\uC694 \uBAA8\uBC14\uC77C \uC2DC\uD2B8"
  },
  {
    name: "Extra Large (\uC288\uD37C \uB77C\uC6B4\uB4DC)",
    variable: "--atom-radius-xl",
    value: "24px",
    description: "\uBC14\uD140\uC2DC\uD2B8 \uCD5C\uC0C1\uB2E8 \uBAA8\uC11C\uB9AC, \uD788\uC5B4\uB85C \uBC30\uB108 \uCE74\uB4DC"
  },
  {
    name: "Pill / Full (\uCEA1\uC290)",
    variable: "--atom-radius-full",
    value: "9999px",
    description: "\uD544\uD130 \uCE69, \uD50C\uB85C\uD305 \uC561\uC158 \uBC84\uD2BC(FAB), \uC6D0\uD615 \uC544\uBC14\uD0C0"
  }
];
var SPACING_TOKENS = [
  { name: "Space 1 (Extra Small)", variable: "--atom-space-1", value: "4px", px: 4 },
  { name: "Space 2 (Small)", variable: "--atom-space-2", value: "8px", px: 8 },
  { name: "Space 3 (Compact)", variable: "--atom-space-3", value: "12px", px: 12 },
  { name: "Space 4 (Base)", variable: "--atom-space-4", value: "16px", px: 16 },
  { name: "Space 5 (Medium)", variable: "--atom-space-5", value: "20px", px: 20 },
  { name: "Space 6 (Large)", variable: "--atom-space-6", value: "24px", px: 24 },
  { name: "Space 8 (Section)", variable: "--atom-space-8", value: "32px", px: 32 },
  { name: "Space 12 (Hero)", variable: "--atom-space-12", value: "48px", px: 48 },
  { name: "Space 16 (Page Gap)", variable: "--atom-space-16", value: "64px", px: 64 }
];
var SHADOW_TOKENS = [
  {
    name: "Elevation 1 (Subtle)",
    variable: "--atom-shadow-sm",
    value: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    description: "\uAE30\uBCF8 \uCE74\uB4DC, \uC778\uD48B \uD3EC\uCEE4\uC2A4 \uC0C1\uD0DC, \uBBF8\uC138\uD55C \uAD6C\uBD84"
  },
  {
    name: "Elevation 2 (Medium)",
    variable: "--atom-shadow-md",
    value: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    description: "\uD638\uBC84\uB41C \uCE74\uB4DC, \uB4DC\uB86D\uB2E4\uC6B4 \uBA54\uB274, \uD31D\uC624\uBC84 \uD234\uD301"
  },
  {
    name: "Elevation 3 (Floating)",
    variable: "--atom-shadow-lg",
    value: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    description: "\uD50C\uB85C\uD305 \uB0B4\uBE44\uAC8C\uC774\uC158 \uBC14, \uD1A0\uC2A4\uD2B8 \uC54C\uB9BC \uBA54\uC2DC\uC9C0"
  },
  {
    name: "Elevation 4 (Modal / Overlay)",
    variable: "--atom-shadow-xl",
    value: "0 20px 25px -5px rgb(0 0 0 / 0.15)",
    description: "\uD654\uBA74 \uCD5C\uC0C1\uB2E8 \uB808\uC774\uC5B4\uC758 \uBAA8\uB2EC \uB2E4\uC774\uC5BC\uB85C\uADF8, \uBC14\uD140\uC2DC\uD2B8"
  }
];

// lib/data/components.ts
var GALLERY_COMPONENTS = [
  {
    id: "button",
    name: "\uBC84\uD2BC (Button Variants)",
    category: "form",
    source: "shadcn + bootstrap",
    description: "Primary, Secondary, Outline, Ghost, Destructive, Loading \uB4F1 \uC0C1\uD0DC\uBCC4 \uBC84\uD2BC \uD480\uC138\uD2B8",
    callout: {
      type: "tip",
      title: "\uC811\uADFC\uC131(A11y) \uAC00\uC774\uB4DC",
      text: '\uBE44\uD65C\uC131\uD654(Disabled) \uC0C1\uD0DC\uC77C \uB54C\uB294 aria-disabled="true"\uC640 \uD568\uAED8 tabIndex={-1}\uC744 \uC9C0\uC815\uD558\uC5EC \uD0A4\uBCF4\uB4DC \uD0D0\uC0C9 \uD3EC\uCEE4\uC2A4\uB97C \uBC29\uC9C0\uD558\uC138\uC694.'
    },
    useCases: [
      "\uD3FC \uC81C\uCD9C, \uC1A1\uAE08, \uD68C\uC6D0\uAC00\uC785 \uB4F1 \uD55C \uD654\uBA74\uC758 \uAC00\uC7A5 \uD575\uC2EC\uC801\uC778 \uB2E8\uC77C \uC804\uD658 \uD589\uB3D9 (Primary CTA)",
      "\uB2E4\uC774\uC5BC\uB85C\uADF8 \uBAA8\uB2EC \uB0B4 \uCDE8\uC18C, \uC774\uC804 \uB2E8\uACC4 \uB4F1 \uBCF4\uC870 \uC561\uC158 (Secondary / Outline)",
      "\uD68C\uC6D0 \uD0C8\uD1F4, \uB370\uC774\uD130 \uC601\uAD6C \uC0AD\uC81C, \uC8FC\uBB38 \uCDE8\uC18C \uB4F1 \uD30C\uAD34\uC801 \uC561\uC158 (Destructive)",
      "\uBE44\uB3D9\uAE30 API \uC694\uCCAD \uD1B5\uC2E0 \uC911 \uC911\uBCF5 \uD074\uB9AD\uC744 \uBC29\uC9C0\uD558\uACE0 \uC0C1\uD0DC\uB97C \uC804\uB2EC\uD558\uB294 \uB85C\uB529 \uC2A4\uD53C\uB108 (Loading)"
    ],
    usagePatterns: [
      "\uD654\uBA74(\uB610\uB294 \uBDF0\uD3EC\uD2B8)\uB2F9 \uB2E8 1\uAC1C\uC758 Primary \uBC84\uD2BC\uB9CC \uBC30\uCE58\uD558\uC5EC \uC0AC\uC6A9\uC790\uC758 \uC2DC\uAC01\uC801 \uC704\uACC4\uC640 \uC778\uC9C0 \uACFC\uBD80\uD558\uB97C \uBC29\uC9C0\uD569\uB2C8\uB2E4.",
      "\uD655\uC778/\uCDE8\uC18C \uBC84\uD2BC \uADF8\uB8F9 \uBC30\uCE58 \uC2DC \uC5C4\uC9C0\uC190\uAC00\uB77D \uC811\uADFC\uC131\uC744 \uACE0\uB824\uD558\uC5EC \uC6B0\uCE21(\uB610\uB294 \uBAA8\uBC14\uC77C \uCD5C\uD558\uB2E8)\uC5D0 \uC8FC \uC561\uC158\uC744 \uBC30\uCE58\uD569\uB2C8\uB2E4.",
      "\uBAA8\uBC14\uC77C \uD130\uCE58 \uD0C0\uAE43 \uC601\uC5ED\uC740 \uCD5C\uC18C 44x44px \uC774\uC0C1\uC744 \uBCF4\uC7A5\uD558\uC5EC \uC624\uD130\uCE58\uB97C \uC608\uBC29\uD569\uB2C8\uB2E4."
    ],
    dosAndDonts: [
      {
        do: '"\uC800\uC7A5\uD558\uAE30", "\uACC4\uC88C\uB85C \uC1A1\uAE08\uD558\uAE30", "\uC7A5\uBC14\uAD6C\uB2C8 \uB2F4\uAE30"\uC640 \uAC19\uC774 \uBA85\uD655\uD55C \uB3D9\uC0AC\uD615 \uB77C\uBCA8\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.',
        dont: '"\uD655\uC778", "\uD074\uB9AD", "\uB124"\uC640 \uAC19\uC774 \uC0AC\uC6A9\uC790\uAC00 \uBC84\uD2BC \uD074\uB9AD \uD6C4 \uC77C\uC5B4\uB0A0 \uACB0\uACFC\uB97C \uC608\uCE21\uD558\uAE30 \uC5B4\uB824\uC6B4 \uBAA8\uD638\uD55C \uB77C\uBCA8\uC744 \uC4F0\uC9C0 \uB9C8\uC138\uC694.'
      },
      {
        do: "\uB85C\uB529 \uC911\uC77C \uB54C\uB294 \uBC84\uD2BC \uB108\uBE44\uAC00 \uC904\uC5B4\uB4E4\uAC70\uB098 \uD14D\uC2A4\uD2B8\uAC00 \uAE5C\uBE61\uC774\uC9C0 \uC54A\uB3C4\uB85D \uC778\uB77C\uC778 \uC2A4\uD53C\uB108\uB97C \uC720\uC9C0\uD569\uB2C8\uB2E4.",
        dont: "\uB85C\uB529 \uC0C1\uD0DC\uC778\uB370\uB3C4 \uC0AC\uC6A9\uC790\uAC00 \uBC84\uD2BC\uC744 2\uBC88 \uC5F0\uC18D \uD074\uB9AD\uD560 \uC218 \uC788\uAC8C \uBC29\uCE58\uD558\uC9C0 \uB9C8\uC138\uC694."
      }
    ],
    relatedPatternIds: ["fintech-transfer", "ecommerce-checkout", "saas-dashboard", "developer-docs"],
    propsSpec: [
      { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost'", defaultValue: "'primary'", description: "\uBC84\uD2BC\uC758 \uC2DC\uAC01\uC801 \uAC15\uC870 \uC2A4\uD0C0\uC77C" },
      { name: "size", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "\uBC84\uD2BC \uD328\uB529 \uBC0F \uAE00\uC790 \uD06C\uAE30" },
      { name: "loading", type: "boolean", defaultValue: "false", description: "\uB85C\uB529 \uC2A4\uD53C\uB108 \uD65C\uC131\uD654 \uBC0F \uC0C1\uD638\uC791\uC6A9 \uCC28\uB2E8" },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "\uD074\uB9AD \uCC28\uB2E8 \uBC0F \uBD88\uD22C\uBA85\uB3C4 \uCD95\uC18C" }
    ],
    htmlSnippet: `<button class="atom-btn atom-btn-primary">Primary Action</button>
<button class="atom-btn atom-btn-secondary">Secondary</button>
<button class="atom-btn atom-btn-outline">Outline</button>
<button class="atom-btn atom-btn-destructive">Delete</button>`,
    reactSnippet: `import { Button } from '@/components/ui/button';

export function ButtonDemo() {
  return (
    <div className="flex gap-2">
      <Button variant="primary">\uC800\uC7A5\uD558\uAE30</Button>
      <Button variant="outline">\uCDE8\uC18C</Button>
      <Button variant="destructive">\uC601\uAD6C \uC0AD\uC81C</Button>
      <Button loading>\uCC98\uB9AC \uC911...</Button>
    </div>
  );
}`,
    vueSnippet: `<template>
  <div class="flex gap-2">
    <AtomButton variant="primary">\uC800\uC7A5\uD558\uAE30</AtomButton>
    <AtomButton variant="outline">\uCDE8\uC18C</AtomButton>
    <AtomButton :loading="isLoading">\uCC98\uB9AC \uC911...</AtomButton>
  </div>
</template>`
  },
  {
    id: "input",
    name: "\uC778\uD48B \uD544\uB4DC (Input with Status)",
    category: "form",
    source: "shadcn + bootstrap",
    description: "\uD50C\uB85C\uD305 \uB77C\uBCA8, \uD544\uC218\uAC12 \uC778\uB514\uCF00\uC774\uD130, \uC720\uD6A8\uC131 \uD1B5\uACFC \uBC0F \uC5D0\uB7EC \uD53C\uB4DC\uBC31 \uC778\uD48B",
    callout: {
      type: "note",
      title: "\uD3FC \uC720\uD6A8\uC131 \uAC80\uC0AC \uADDC\uCE59",
      text: '\uC5D0\uB7EC \uBC1C\uC0DD \uC2DC aria-invalid="true"\uC640 aria-describedby="error-id"\uB97C \uC5F0\uACB0\uD558\uC5EC \uC2A4\uD06C\uB9B0 \uB9AC\uB354\uC5D0 \uC624\uB958 \uBA54\uC2DC\uC9C0\uB97C \uC804\uB2EC\uD569\uB2C8\uB2E4.'
    },
    useCases: [
      "\uC774\uBA54\uC77C, \uBE44\uBC00\uBC88\uD638, \uC131\uBA85, \uC8FC\uC18C \uB4F1 \uD45C\uC900 \uD14D\uC2A4\uD2B8 \uC815\uBCF4 \uC218\uC9D1",
      "\uAE08\uC561, \uC804\uD654\uBC88\uD638, 6\uC790\uB9AC SMS OTP \uC778\uC99D \uB4F1 \uC22B\uC790 \uC804\uC6A9 \uC785\uB825",
      "\uC2E4\uC2DC\uAC04 \uC790\uB3D9\uC644\uC131 \uBC0F \uD0DC\uADF8 \uCE69\uC774 \uC5F0\uB3D9\uB418\uB294 \uAC80\uC0C9 \uC785\uB825\uCC3D",
      "\uB2E4\uAD6D\uC5B4 \uD14D\uC2A4\uD2B8, \uC7A5\uBB38\uC758 \uBB38\uC758\uC0AC\uD56D \uC785\uB825 \uD14D\uC2A4\uD2B8\uC5D0\uC5B4\uB9AC\uC5B4"
    ],
    usagePatterns: [
      "\uD50C\uB808\uC774\uC2A4\uD640\uB354(Placeholder)\uB294 \uC608\uC2DC\uB97C \uBCF4\uC5EC\uC8FC\uB294 \uC6A9\uB3C4\uB85C\uB9CC \uC4F0\uACE0 \uB77C\uBCA8(Label)\uC744 \uC808\uB300 \uB300\uCCB4\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
      "\uC624\uB958 \uBC1C\uC0DD \uC2DC \uD14C\uB450\uB9AC \uC0C9\uC0C1 \uBCC0\uD654\uBFD0\uB9CC \uC544\uB2C8\uB77C \uC778\uD48B \uD558\uB2E8\uC5D0 \uBA85\uD655\uD55C \uC5D0\uB7EC \uC0AC\uC720 \uD14D\uC2A4\uD2B8\uB97C \uBC18\uB4DC\uC2DC \uD568\uAED8 \uC81C\uACF5\uD569\uB2C8\uB2E4.",
      '\uBAA8\uBC14\uC77C \uD658\uACBD\uC5D0\uC11C\uB294 type="email", inputmode="numeric" \uB4F1\uC744 \uBA85\uC2DC\uD558\uC5EC \uC801\uC808\uD55C \uAC00\uC0C1 \uD0A4\uBCF4\uB4DC\uAC00 \uB728\uB3C4\uB85D \uB3D5\uC2B5\uB2C8\uB2E4.'
    ],
    dosAndDonts: [
      {
        do: "\uC624\uD0C0\uB97C \uC27D\uAC8C \uC815\uC815\uD560 \uC218 \uC788\uB3C4\uB85D \uC6B0\uCE21\uC5D0 \uC6D0\uD074\uB9AD \uC9C0\uC6B0\uAE30(X) \uD074\uB9AC\uC5B4 \uBC84\uD2BC\uC744 \uBC30\uCE58\uD569\uB2C8\uB2E4.",
        dont: "\uC0AC\uC6A9\uC790\uAC00 \uD0C0\uC774\uD551\uD558\uB294 \uAE00\uC790 \uC218\uB9C8\uB2E4 \uB9E4\uBC88 \uD654\uBA74\uC744 \uAE5C\uBE61\uAC70\uB9AC\uBA70 \uC720\uD6A8\uC131 \uACBD\uACE0\uB97C \uB744\uC6B0\uC9C0 \uB9C8\uC138\uC694(\uB514\uBC14\uC6B4\uC2A4 \uD544\uC694)."
      }
    ],
    relatedPatternIds: ["kyc-verification", "fintech-transfer", "search-empty", "blog-editor"],
    propsSpec: [
      { name: "label", type: "string", defaultValue: "undefined", description: "\uC778\uD48B \uC0C1\uB2E8\uC5D0 \uD45C\uC2DC\uB418\uB294 \uD14D\uC2A4\uD2B8 \uB77C\uBCA8" },
      { name: "placeholder", type: "string", defaultValue: "''", description: "\uC785\uB825 \uAC00\uC774\uB4DC \uD50C\uB808\uC774\uC2A4\uD640\uB354" },
      { name: "error", type: "string", defaultValue: "undefined", description: "\uC5D0\uB7EC \uBA54\uC2DC\uC9C0 \uBC0F \uB808\uB4DC \uD14C\uB450\uB9AC \uC0C1\uD0DC \uD45C\uC2DC" },
      { name: "clearable", type: "boolean", defaultValue: "true", description: "\uD14D\uC2A4\uD2B8 \uC6D0\uD074\uB9AD \uD074\uB9AC\uC5B4(X) \uBC84\uD2BC \uB178\uCD9C" }
    ],
    htmlSnippet: `<div class="atom-form-group">
  <label class="atom-label">\uC774\uBA54\uC77C \uC8FC\uC18C</label>
  <input type="email" class="atom-input" placeholder="name@company.com" />
  <span class="atom-error-text">\uC720\uD6A8\uD55C \uC774\uBA54\uC77C\uC744 \uC785\uB825\uD558\uC138\uC694.</span>
</div>`,
    reactSnippet: `import { Input } from '@/components/ui/input';

export function InputDemo() {
  return (
    <Input
      label="\uC774\uBA54\uC77C \uC8FC\uC18C"
      type="email"
      placeholder="name@company.com"
      error="\uC720\uD6A8\uD55C \uC774\uBA54\uC77C \uD615\uC2DD\uC744 \uC785\uB825\uD558\uC138\uC694."
      clearable
    />
  );
}`,
    vueSnippet: `<template>
  <AtomInput
    v-model="email"
    label="\uC774\uBA54\uC77C \uC8FC\uC18C"
    placeholder="name@company.com"
    :error="emailError"
  />
</template>`
  },
  {
    id: "selection",
    name: "\uC2A4\uC704\uCE58 & \uCCB4\uD06C\uBC15\uC2A4 (Switch & Checkbox)",
    category: "form",
    source: "shadcn + bootstrap",
    description: "\uBD80\uD2B8\uC2A4\uD2B8\uB7A9 \uC2A4\uC704\uCE58 \uD1A0\uAE00, shadcn \uC2A4\uD0C0\uC77C \uCCB4\uD06C\uBC15\uC2A4 \uBC0F \uB77C\uB514\uC624 \uADF8\uB8F9",
    callout: {
      type: "tip",
      title: "\uC989\uAC01 \uBC18\uC751 \uD53C\uB4DC\uBC31",
      text: "\uC2A4\uC704\uCE58 \uD1A0\uAE00\uC740 \uBCC4\uB3C4\uC758 [\uC800\uC7A5] \uBC84\uD2BC \uC5C6\uC774\uB3C4 \uC0C1\uD0DC\uAC00 \uC989\uC2DC \uC800\uC7A5\uB418\uB294 \uD658\uACBD \uC124\uC815 UX\uC5D0 \uAD8C\uC7A5\uB429\uB2C8\uB2E4."
    },
    useCases: [
      "\uC54C\uB9BC On/Off, \uB2E4\uD06C\uBAA8\uB4DC, \uC0DD\uCCB4\uC778\uC99D \uD65C\uC131\uD654 \uB4F1 \uC989\uC2DC \uBC18\uC601\uB418\uB294 \uD658\uACBD\uC124\uC815 (Switch)",
      "\uD68C\uC6D0\uAC00\uC785 \uC57D\uAD00 \uD544\uC218/\uC120\uD0DD \uB3D9\uC758 \uBC0F \uC804\uCCB4 \uB3D9\uC758 \uD1A0\uAE00 (Checkbox)",
      "\uC1FC\uD551\uBAB0 \uC7A5\uBC14\uAD6C\uB2C8 \uC0C1\uD488 \uC804\uCCB4 \uC120\uD0DD \uBC0F \uAC1C\uBCC4 \uC120\uD0DD",
      "\uB2E8\uC77C \uC635\uC158 \uC911 \uBC18\uB4DC\uC2DC \uD558\uB098\uB9CC \uACE8\uB77C\uC57C \uD558\uB294 \uACB0\uC81C \uC218\uB2E8/\uBC30\uC1A1\uC9C0 \uC120\uD0DD (Radio)"
    ],
    usagePatterns: [
      "\uC2A4\uC704\uCE58\uB294 \uB204\uB974\uB294 \uC989\uC2DC \uC2DC\uC2A4\uD15C\uC5D0 \uBC18\uC601\uB418\uB294 \uC124\uC815\uC5D0 \uC4F0\uACE0, \uCCB4\uD06C\uBC15\uC2A4\uB294 \uD3FC \uC804\uC1A1 \uBC84\uD2BC\uC744 \uB204\uB97C \uB54C\uAE4C\uC9C0 \uBCF4\uB958\uB418\uB294 \uC120\uD0DD\uC5D0 \uC501\uB2C8\uB2E4.",
      "\uD130\uCE58 \uC601\uC5ED\uC744 \uC791\uC740 \uCCB4\uD06C\uBC15\uC2A4 \uB124\uBAA8\uC5D0\uB9CC \uD55C\uC815\uD558\uC9C0 \uC54A\uACE0 \uD14D\uC2A4\uD2B8 \uB77C\uBCA8 \uC804\uCCB4\uB85C \uD655\uC7A5\uD558\uC5EC \uD074\uB9AD \uD3B8\uC758\uC131\uC744 \uB192\uC785\uB2C8\uB2E4."
    ],
    dosAndDonts: [
      {
        do: "\uC804\uCCB4 \uB3D9\uC758 \uCCB4\uD06C\uBC15\uC2A4 \uC120\uD0DD \uC2DC \uD558\uC704 \uC790\uC2DD \uCCB4\uD06C\uBC15\uC2A4\uB4E4\uC774 \uC77C\uAD04 \uB3D9\uAE30\uD654\uB418\uB3C4\uB85D \uAD6C\uD604\uD569\uB2C8\uB2E4.",
        dont: "\uB9C8\uCF00\uD305 \uC120\uD0DD \uB3D9\uC758\uB97C \uD544\uC218 \uB3D9\uC758\uC640 \uBB36\uC5B4 \uC804\uCCB4 \uB3D9\uC758\uB97C \uAC15\uC81C\uD558\uC9C0 \uB9C8\uC138\uC694."
      }
    ],
    relatedPatternIds: ["kyc-verification", "ecommerce-checkout", "onboarding-wizard"],
    propsSpec: [
      { name: "checked", type: "boolean", defaultValue: "false", description: "\uD65C\uC131\uD654 \uC120\uD0DD \uC5EC\uBD80" },
      { name: "onChange", type: "(checked: boolean) => void", defaultValue: "undefined", description: "\uC0C1\uD0DC \uBCC0\uACBD \uC774\uBCA4\uD2B8 \uCF5C\uBC31" },
      { name: "label", type: "string", defaultValue: "undefined", description: "\uC778\uB77C\uC778 \uB77C\uBCA8 \uD14D\uC2A4\uD2B8" }
    ],
    htmlSnippet: `<label class="atom-switch">
  <input type="checkbox" checked />
  <span class="atom-slider"></span>
</label>`,
    reactSnippet: `import { Switch, Checkbox } from '@/components/ui/selection';

export function SelectionDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Switch checked={isEnabled} onChange={setIsEnabled} label="\uC57C\uAC04 \uD478\uC2DC \uC54C\uB9BC \uC218\uC2E0" />
      <Checkbox checked={isAgreed} onChange={setIsAgreed} label="\uC774\uC6A9\uC57D\uAD00 \uC804\uCCB4 \uB3D9\uC758" />
    </div>
  );
}`,
    vueSnippet: `<template>
  <AtomSwitch v-model="notifications" label="\uC54C\uB9BC \uC218\uC2E0" />
  <AtomCheckbox v-model="termsAll" label="\uC57D\uAD00 \uC804\uCCB4 \uB3D9\uC758" />
</template>`
  },
  {
    id: "dialog",
    name: "\uBAA8\uB2EC \uB2E4\uC774\uC5BC\uB85C\uADF8 (Modal / Dialog)",
    category: "feedback",
    source: "shadcn + bootstrap",
    description: "\uC811\uADFC\uC131(A11y aria-modal, ESC \uB2EB\uAE30)\uC744 \uBCF4\uC7A5\uD558\uB294 \uC911\uC559 \uD31D\uC5C5 \uB2E4\uC774\uC5BC\uB85C\uADF8",
    callout: {
      type: "warning",
      title: "\uD3EC\uCEE4\uC2A4 \uD2B8\uB7A9(Focus Trap)",
      text: "\uBAA8\uB2EC\uC774 \uC5F4\uB838\uC744 \uB54C \uBC31\uB4DC\uB86D \uBC14\uAE65\uC758 \uB2E4\uB978 \uC694\uC18C\uB85C Tab \uD3EC\uCEE4\uC2A4\uAC00 \uD0C8\uCD9C\uD558\uC9C0 \uC54A\uB3C4\uB85D \uD3EC\uCEE4\uC2A4 \uD2B8\uB7A9\uC744 \uD544\uC218 \uC801\uC6A9\uD558\uC138\uC694."
    },
    useCases: [
      "\uB370\uC774\uD130 \uC601\uAD6C \uC0AD\uC81C, \uC11C\uBE44\uC2A4 \uD0C8\uD1F4 \uB4F1 \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uB294 \uD589\uB3D9 \uC9C1\uC804 2\uB2E8\uACC4 \uD655\uC778",
      "\uC1A1\uAE08 \uCD5C\uC885 \uB2E8\uACC4\uC5D0\uC11C \uC218\uCDE8\uC778 \uC774\uB984, \uACC4\uC88C, \uAE08\uC561\uC744 \uCD5C\uC885 \uD655\uC778\uD558\uB294 \uB2E4\uC774\uC5BC\uB85C\uADF8",
      "\uC2E0\uBD84\uC99D \uCD2C\uC601 \uC548\uB0B4, \uC57D\uAD00 \uC804\uBB38 \uC77D\uAE30 \uD31D\uC5C5",
      "\uC138\uC158 \uB9CC\uB8CC \uACBD\uACE0 \uBC0F \uB85C\uADF8\uC778 \uC5F0\uC7A5 \uC54C\uB9BC"
    ],
    usagePatterns: [
      "ESC \uD0A4 \uC785\uB825 \uB610\uB294 \uBAA8\uB2EC \uBC14\uAE65 \uBC31\uB4DC\uB86D \uD130\uCE58 \uC2DC \uC989\uAC01 \uBAA8\uB2EC\uC774 \uB2EB\uD788\uB3C4\uB85D \uB2EB\uAE30 \uC778\uD130\uB799\uC158\uC744 \uBCF4\uC7A5\uD569\uB2C8\uB2E4.",
      "\uBAA8\uB2EC \uC624\uD508 \uC2DC \uBC31\uADF8\uB77C\uC6B4\uB4DC \uBCF8\uBB38 \uC2A4\uD06C\uB864(Scroll Lock)\uC744 \uC7A0\uAC00 \uC774\uC911 \uC2A4\uD06C\uB864 \uCDA9\uB3CC\uC744 \uBC29\uC9C0\uD569\uB2C8\uB2E4."
    ],
    dosAndDonts: [
      {
        do: "\uBAA8\uB2EC\uC774 \uB2EB\uD788\uBA74 \uC774\uC804\uC5D0 \uBAA8\uB2EC\uC744 \uC5F4\uC5C8\uB358 \uD2B8\uB9AC\uAC70 \uBC84\uD2BC\uC73C\uB85C \uD3EC\uCEE4\uC2A4\uB97C \uBCF5\uADC0\uC2DC\uD0B5\uB2C8\uB2E4.",
        dont: "\uD655\uC778 \uBAA8\uB2EC \uC704\uC5D0 \uB610 \uB2E4\uB978 \uBAA8\uB2EC\uC744 2\uC911, 3\uC911\uC73C\uB85C \uACB9\uCCD0 \uB744\uC6B0\uC9C0 \uB9C8\uC138\uC694."
      }
    ],
    relatedPatternIds: ["fintech-transfer", "blog-editor", "flight-booking"],
    propsSpec: [
      { name: "open", type: "boolean", defaultValue: "false", description: "\uB2E4\uC774\uC5BC\uB85C\uADF8 \uB178\uCD9C \uC5EC\uBD80" },
      { name: "onClose", type: "() => void", defaultValue: "undefined", description: "ESC \uB610\uB294 \uBC14\uAE65 \uD074\uB9AD \uC2DC \uB2EB\uAE30 \uCF5C\uBC31" },
      { name: "title", type: "string", defaultValue: "''", description: "\uB2E4\uC774\uC5BC\uB85C\uADF8 \uD5E4\uB354 \uC81C\uBAA9" }
    ],
    htmlSnippet: `<div class="atom-modal-backdrop">
  <div class="atom-modal" role="dialog" aria-modal="true">
    <h3 class="atom-modal-title">\uC815\uB9D0 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?</h3>
    <p class="atom-modal-body">\uC0AD\uC81C\uB41C \uB370\uC774\uD130\uB294 \uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.</p>
    <div class="atom-modal-actions">
      <button class="atom-btn atom-btn-outline">\uCDE8\uC18C</button>
      <button class="atom-btn atom-btn-destructive">\uC0AD\uC81C</button>
    </div>
  </div>
</div>`,
    reactSnippet: `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function ModalDemo({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>\uC1A1\uAE08 \uC815\uBCF4\uB97C \uD655\uC778\uD574\uC8FC\uC138\uC694</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-neutral-500">\uAE40\uD1A0\uC2A4\uB2D8\uC5D0\uAC8C 500,000\uC6D0\uC744 \uC1A1\uAE08\uD569\uB2C8\uB2E4.</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>\uCDE8\uC18C</Button>
          <Button variant="primary" onClick={onClose}>\uC1A1\uAE08 \uC2E4\uD589</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`,
    vueSnippet: `<template>
  <AtomDialog v-model="isOpen" title="\uD655\uC778">
    <p>\uC9C4\uD589\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?</p>
  </AtomDialog>
</template>`
  },
  {
    id: "sheet",
    name: "\uBC14\uD140\uC2DC\uD2B8 & \uC0AC\uC774\uB4DC \uB4DC\uB85C\uC5B4 (Sheet / Drawer)",
    category: "feedback",
    source: "shadcn + bootstrap",
    description: "\uBAA8\uBC14\uC77C \uD558\uB2E8 \uBC14\uD140\uC2DC\uD2B8 \uBC0F \uB370\uC2A4\uD06C\uD1B1 \uC6B0\uCE21 \uC2AC\uB77C\uC774\uB4DC \uD328\uB110",
    callout: {
      type: "note",
      title: "\uBDF0\uD3EC\uD2B8 \uCD5C\uC801\uD654",
      text: "\uBAA8\uBC14\uC77C \uBDF0\uD3EC\uD2B8(768px \uBBF8\uB9CC)\uC5D0\uC11C\uB294 bottom \uBC14\uD140\uC2DC\uD2B8\uB85C, \uB370\uC2A4\uD06C\uD1B1\uC5D0\uC11C\uB294 right \uC2AC\uB77C\uC774\uB4DC \uB4DC\uB85C\uC5B4\uB85C \uC790\uB3D9 \uC801\uC751\uB429\uB2C8\uB2E4."
    },
    useCases: [
      "\uC9C0\uB3C4 \uC571\uC5D0\uC11C \uD2B9\uC815 \uD540\uC744 \uD0ED\uD588\uC744 \uB54C \uD558\uB2E8\uC5D0\uC11C \uC62C\uB77C\uC624\uB294 \uB9E4\uC7A5 \uC0C1\uC138 \uC815\uBCF4 (\uB124\uC774\uBC84/\uCE74\uCE74\uC624 \uC9C0\uB3C4 \uC2A4\uD0C0\uC77C)",
      "\uC1FC\uD551\uBAB0 \uBCF5\uD569 \uD544\uD130(\uAC00\uACA9\uB300, \uBE0C\uB79C\uB4DC, \uBC30\uC1A1 \uC870\uAC74) \uC124\uC815 \uB4DC\uB85C\uC5B4",
      "\uBAA8\uBC14\uC77C \uD584\uBC84\uAC70 \uBA54\uB274 \uD074\uB9AD \uC2DC \uC6B0\uCE21\uC5D0\uC11C \uC2AC\uB77C\uC774\uB4DC\uB418\uB294 \uAE00\uB85C\uBC8C \uB0B4\uBE44\uAC8C\uC774\uC158",
      "SNS \uD53C\uB4DC \uB313\uAE00 \uBAA9\uB85D \uBC0F \uC791\uC131 \uC2DC\uD2B8"
    ],
    usagePatterns: [
      "\uD558\uB2E8 \uC2DC\uD2B8 \uC0C1\uB2E8\uC5D0 \uC2DC\uAC01\uC801 \uD578\uB4E4\uB7EC \uBC14(Handle Bar)\uB97C \uBC30\uCE58\uD558\uC5EC \uB4DC\uB798\uADF8 \uAC00\uB2A5\uD55C \uC778\uD130\uD398\uC774\uC2A4\uC784\uC744 \uC554\uC2DC\uD569\uB2C8\uB2E4.",
      "1\uB2E8(\uC694\uC57D 120px) \u2794 2\uB2E8(\uBC18 \uD654\uBA74 50%) \u2794 3\uB2E8(\uC804\uCCB4 \uD654\uBA74 90%) \uC2A4\uB0C5 \uD3EC\uC778\uD2B8\uB97C \uC81C\uACF5\uD569\uB2C8\uB2E4."
    ],
    dosAndDonts: [
      {
        do: "\uC2DC\uD2B8\uB97C \uC544\uB798\uB85C \uC4F8\uC5B4\uB0B4\uB9AC\uB294(Swipe Down) \uC81C\uC2A4\uCC98\uB85C \uC27D\uAC8C \uB2EB\uC744 \uC218 \uC788\uAC8C \uD569\uB2C8\uB2E4.",
        dont: "\uC9C0\uB3C4 \uD654\uBA74 \uC804\uCCB4\uB97C \uC644\uC804\uD788 \uB36E\uC5B4\uBC84\uB824 \uC0AC\uC6A9\uC790\uAC00 \uD604\uC7AC \uC704\uCE58 \uB9E5\uB77D\uC744 \uC783\uC9C0 \uC54A\uAC8C \uD558\uC138\uC694."
      }
    ],
    relatedPatternIds: ["map-location", "ecommerce-checkout"],
    propsSpec: [
      { name: "open", type: "boolean", defaultValue: "false", description: "\uC2DC\uD2B8 \uC624\uD508 \uC0C1\uD0DC" },
      { name: "side", type: "'bottom' | 'right' | 'left' | 'top'", defaultValue: "'bottom'", description: "\uC2AC\uB77C\uC774\uB4DC \uC778 \uC9C4\uC785 \uBC29\uD5A5" }
    ],
    htmlSnippet: `<div class="atom-sheet atom-sheet-bottom">
  <div class="atom-sheet-handle"></div>
  <div class="atom-sheet-content">
    <h3>\uBE14\uB8E8\uBCF4\uD2C0 \uC131\uC218\uC810</h3>
    <p>\uC601\uC5C5 \uC911 \xB7 21:00 \uB9C8\uAC10</p>
  </div>
</div>`,
    reactSnippet: `import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function SheetDemo({ isOpen, onClose }) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>\uC0C1\uC138 \uD544\uD130 \uC635\uC158</SheetTitle>
        </SheetHeader>
        <div className="py-4">\uC635\uC158 \uD56D\uBAA9\uB4E4...</div>
      </SheetContent>
    </Sheet>
  );
}`,
    vueSnippet: `<template>
  <AtomSheet v-model="isSheetOpen" side="bottom">
    <div>\uC2DC\uD2B8 \uB0B4\uC6A9</div>
  </AtomSheet>
</template>`
  },
  {
    id: "alert",
    name: "\uC54C\uB9BC \uCF5C\uC544\uC6C3 (Alert Callout)",
    category: "feedback",
    source: "shadcn + bootstrap",
    description: "\uBD80\uD2B8\uC2A4\uD2B8\uB7A9 alert-dismissible \uBC0F shadcn Callout \uC815\uBCF4/\uC131\uACF5/\uC5D0\uB7EC \uC54C\uB9BC",
    callout: {
      type: "tip",
      title: "\uC2A4\uD06C\uB9B0 \uB9AC\uB354 \uC54C\uB9BC",
      text: '\uB3D9\uC801\uC73C\uB85C \uCD94\uAC00\uB418\uB294 \uC911\uC694\uD55C \uACBD\uACE0\uBB38\uAD6C\uC5D0\uB294 role="alert" \uB610\uB294 aria-live="assertive"\uB97C \uC120\uC5B8\uD558\uC138\uC694.'
    },
    useCases: [
      "\uC0C8 \uBC84\uC804 \uAE30\uB2A5 \uC5C5\uB370\uC774\uD2B8 \uBC0F \uC2DC\uC2A4\uD15C \uC815\uAE30 \uC810\uAC80 \uACF5\uC9C0",
      "\uD3FC \uC804\uC1A1 \uD6C4 \uBC1C\uC0DD\uD55C \uC11C\uBC84 \uC5D0\uB7EC \uBAA9\uB85D \uC77C\uAD04 \uACF5\uC9C0",
      "\uD68C\uC6D0\uAC00\uC785 \uC644\uB8CC \uBC0F \uC774\uBA54\uC77C \uC778\uC99D \uB9C1\uD06C \uC804\uC1A1 \uD53C\uB4DC\uBC31",
      "\uACB0\uC81C \uC2E4\uD328 \uB610\uB294 \uC77C\uC2DC\uC801 \uB124\uD2B8\uC6CC\uD06C \uB04A\uAE40 \uACBD\uACE0"
    ],
    usagePatterns: [
      "\uBA54\uC2DC\uC9C0 \uC131\uACA9\uC5D0 \uB9DE\uB294 4\uB300 \uC2DC\uAC01 \uD14C\uB9C8(Info, Success, Warning, Danger)\uB97C \uC5C4\uACA9\uD788 \uC900\uC218\uD569\uB2C8\uB2E4.",
      "\uC911\uC694\uD55C \uC791\uC5C5 \uD50C\uB85C\uC6B0\uB97C \uC644\uC804\uD788 \uAC00\uB85C\uB9C9\uB294 \uBAA8\uB2EC \uB300\uC2E0, \uC778\uB77C\uC778\uC73C\uB85C \uD750\uB984\uC744 \uBC29\uD574\uD558\uC9C0 \uC54A\uB294 \uC54C\uB9BC\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    ],
    dosAndDonts: [
      {
        do: "\uB2EB\uAE30(X) \uBC84\uD2BC\uC744 \uC81C\uACF5\uD558\uC5EC \uC0AC\uC6A9\uC790\uAC00 \uD655\uC778\uD55C \uBA54\uC2DC\uC9C0\uB97C \uC9C1\uC811 \uC228\uAE38 \uC218 \uC788\uAC8C \uD569\uB2C8\uB2E4.",
        dont: "\uD398\uC774\uC9C0 \uC811\uC18D \uC2DC \uD654\uBA74\uC758 \uC808\uBC18\uC744 \uCC28\uC9C0\uD558\uB294 \uAC70\uB300\uD55C \uACBD\uACE0 \uBC30\uB108\uB85C \uBCF8\uBB38\uC744 \uAC00\uB9AC\uC9C0 \uB9C8\uC138\uC694."
      }
    ],
    relatedPatternIds: ["chat-support", "file-uploader", "developer-docs"],
    propsSpec: [
      { name: "variant", type: "'info' | 'success' | 'warning' | 'danger'", defaultValue: "'info'", description: "\uC54C\uB9BC \uD14C\uB9C8 \uBC0F \uC544\uC774\uCF58 \uC0C9\uC0C1" },
      { name: "dismissible", type: "boolean", defaultValue: "true", description: "\uB2EB\uAE30(X) \uBC84\uD2BC \uD45C\uC2DC \uC5EC\uBD80" }
    ],
    htmlSnippet: `<div class="atom-alert atom-alert-info">
  <span class="atom-icon">\u2139\uFE0F</span>
  <div>\uC0C8\uB85C\uC6B4 \uD1A0\uD070 \uC2DC\uC2A4\uD15C\uC774 \uC801\uC6A9\uB418\uC5C8\uC2B5\uB2C8\uB2E4.</div>
</div>`,
    reactSnippet: `import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function AlertDemo() {
  return (
    <Alert variant="info" dismissible>
      <AlertTitle>\uC54C\uB9BC \uC548\uB0B4</AlertTitle>
      <AlertDescription>\uC0C8\uB85C\uC6B4 \uC5C5\uB370\uC774\uD2B8 \uBC84\uC804\uC774 \uBC30\uD3EC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.</AlertDescription>
    </Alert>
  );
}`,
    vueSnippet: `<template>
  <AtomAlert variant="info" dismissible>
    \uC5C5\uB370\uC774\uD2B8\uAC00 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.
  </AtomAlert>
</template>`
  },
  {
    id: "tabs",
    name: "\uC138\uADF8\uBA3C\uD2B8 \uD0ED\uC2A4 (Segment Tabs)",
    category: "navigation",
    source: "shadcn + bootstrap",
    description: "\uC138\uADF8\uBA3C\uD2B8 \uCEE8\uD2B8\uB864 \uD615\uD0DC \uBC0F \uC5B8\uB354\uB77C\uC778\uD615 \uD45C\uC900 \uD0ED \uB0B4\uBE44\uAC8C\uC774\uC158",
    callout: {
      type: "note",
      title: "\uD0A4\uBCF4\uB4DC \uB124\uBE44\uAC8C\uC774\uC158",
      text: "\uC88C\uC6B0 \uBC29\uD5A5\uD0A4(ArrowLeft/ArrowRight)\uB85C \uD0ED \uAC04 \uC774\uB3D9\uC774 \uAC00\uB2A5\uD574\uC57C \uD569\uB2C8\uB2E4 (WAI-ARIA Tabs \uD328\uD134)."
    },
    useCases: [
      "\uB300\uC2DC\uBCF4\uB4DC \uC131\uACFC \uC9C0\uD45C \uAE30\uAC04 \uD544\uD130 (\uC624\uB298 / 7\uC77C / 30\uC77C / 90\uC77C)",
      "\uD56D\uACF5\uAD8C \uC5EC\uC815 \uC120\uD0DD (\uC655\uBCF5 / \uD3B8\uB3C4 / \uB2E4\uAD6C\uAC04)",
      "\uAC1C\uBC1C \uBB38\uC11C \uCF54\uB4DC \uC5B8\uC5B4 \uC804\uD658 (React / Vue / Vanilla)",
      "\uACC4\uC815 \uAD00\uB9AC \uC11C\uBE0C\uD398\uC774\uC9C0 (\uD504\uB85C\uD544 / \uBE44\uBC00\uBC88\uD638 / \uACB0\uC81C\uC218\uB2E8)"
    ],
    usagePatterns: [
      "\uD0ED \uD074\uB9AD \uC2DC \uC804\uCCB4 \uD398\uC774\uC9C0 \uB9AC\uB85C\uB4DC\uAC00 \uBC1C\uC0DD\uD558\uC9C0 \uC54A\uACE0 \uD574\uB2F9 \uD328\uB110 \uC601\uC5ED\uB9CC \uC989\uC2DC \uAD50\uCCB4\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4.",
      "\uCD5C\uB300 4~5\uAC1C \uC774\uD558\uC758 \uC0C1\uD638 \uBC30\uD0C0\uC801\uC778 \uBDF0\uB97C \uC804\uD658\uD560 \uB54C\uB9CC \uD0ED\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    ],
    dosAndDonts: [
      {
        do: "\uD604\uC7AC \uD65C\uC131\uD654\uB41C \uD0ED\uC5D0 \uACE0\uB300\uBE44 \uBC30\uACBD\uACFC \uBE0C\uB79C\uB4DC \uD558\uC774\uB77C\uC774\uD2B8 \uC778\uB514\uCF00\uC774\uD130\uB97C \uBD80\uC5EC\uD569\uB2C8\uB2E4.",
        dont: "\uAC00\uB85C \uC2A4\uD06C\uB864\uC774 \uB4E4\uC5B4\uAC00\uB294 \uBCF5\uC7A1\uD55C \uB2E4\uB2E8 \uD0ED\uC744 \uBAA8\uBC14\uC77C \uBDF0\uC5D0 \uBB34\uB9AC\uD558\uAC8C \uB123\uC9C0 \uB9C8\uC138\uC694."
      }
    ],
    relatedPatternIds: ["saas-dashboard", "flight-booking", "developer-docs"],
    propsSpec: [
      { name: "defaultValue", type: "string", defaultValue: "undefined", description: "\uCD08\uAE30 \uD65C\uC131\uD654 \uD0ED \uC2DD\uBCC4\uAC12" },
      { name: "onChange", type: "(tab: string) => void", defaultValue: "undefined", description: "\uD0ED \uC804\uD658 \uC2DC \uCF5C\uBC31" }
    ],
    htmlSnippet: `<div class="atom-tabs">
  <button class="atom-tab active">\uACC4\uC815 \uC124\uC815</button>
  <button class="atom-tab">\uBCF4\uC548</button>
  <button class="atom-tab">\uACB0\uC81C \uC218\uB2E8</button>
</div>`,
    reactSnippet: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">\uAC1C\uC694</TabsTrigger>
        <TabsTrigger value="analytics">\uBD84\uC11D</TabsTrigger>
        <TabsTrigger value="reports">\uBCF4\uACE0\uC11C</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">\uAC1C\uC694 \uB0B4\uC6A9...</TabsContent>
    </Tabs>
  );
}`,
    vueSnippet: `<template>
  <AtomTabs v-model="currentTab" :tabs="['\uAC1C\uC694', '\uBD84\uC11D', '\uC124\uC815']" />
</template>`
  },
  {
    id: "badge",
    name: "\uC0C1\uD0DC \uBC30\uC9C0 (Pill Badge)",
    category: "data",
    source: "shadcn + bootstrap",
    description: "\uC0C1\uD0DC \uC2DD\uBCC4 \uD384\uC2A4 \uB3C4\uD2B8 \uBC43\uC9C0, \uBC84\uC804 \uD0DC\uADF8, \uCEA1\uC290\uD615 \uCE69",
    callout: {
      type: "tip",
      title: "\uC0C9\uC0C1 \uB3C5\uB9BD\uC131",
      text: '\uC0C9\uC57D\uC790\uB97C \uC704\uD574 \uB2E8\uC21C \uC0C9\uC0C1\uBFD0\uB9CC \uC544\uB2C8\uB77C \uC544\uC774\uCF58\uC774\uB098 \uD14D\uC2A4\uD2B8(\uC608: "\uD65C\uC131", "\uC624\uD504\uB77C\uC778")\uB97C \uD568\uAED8 \uBCD1\uAE30\uD558\uC138\uC694.'
    },
    useCases: [
      '\uC2E0\uADDC \uAE30\uB2A5 \uC54C\uB9BC \uCE69 ("NEW", "BETA")',
      '\uC2E4\uC2DC\uAC04 \uC6F9\uC18C\uCF13 \uC11C\uBC84 \uC5F0\uACB0 \uC0C1\uD0DC ("\uC628\uB77C\uC778", "\uC624\uD504\uB77C\uC778")',
      '\uC8FC\uBB38 \uBC0F \uC2EC\uC0AC \uCC98\uB9AC \uC0C1\uD0DC ("\uACB0\uC81C\uC644\uB8CC", "\uBC30\uC1A1\uC911", "\uC2EC\uC0AC\uB300\uAE30")',
      "\uC7A5\uBC14\uAD6C\uB2C8 \uBC0F \uC54C\uB9BC \uBCA8 \uC548 \uC77D\uC740 \uBA54\uC2DC\uC9C0 \uCE74\uC6B4\uD2B8 \uBC43\uC9C0"
    ],
    usagePatterns: [
      "\uC0C1\uD0DC \uBCC0\uD654\uAC00 \uC2E4\uC2DC\uAC04\uC77C \uACBD\uC6B0 \uCD08\uB85D\uC0C9 \uD384\uC2A4(Pulse) \uB3C4\uD2B8 \uC560\uB2C8\uBA54\uC774\uC158\uC744 \uD568\uAED8 \uC870\uD569\uD569\uB2C8\uB2E4.",
      "\uCEA1\uC290 \uD615\uD0DC\uC758 \uB465\uADFC \uBAA8\uC11C\uB9AC(--atom-radius-full)\uC640 \uC791\uC740 \uD3F0\uD2B8(--atom-font-body-2)\uB97C \uC720\uC9C0\uD569\uB2C8\uB2E4."
    ],
    dosAndDonts: [
      {
        do: "\uC131\uACF5\uC740 \uCD08\uB85D, \uACBD\uACE0\uB294 \uC8FC\uD669, \uC704\uD5D8\uC740 \uBE68\uAC15 \uB4F1 \uD45C\uC900\uC801\uC778 \uC0C9\uC0C1 \uC758\uBBF8\uB97C \uC77C\uAD00\uB418\uAC8C \uC9C0\uD0B5\uB2C8\uB2E4.",
        dont: "\uD14D\uC2A4\uD2B8\uAC00 2\uC904 \uC774\uC0C1 \uB118\uC5B4\uAC00\uB294 \uAE34 \uBB38\uC7A5\uC744 \uBC43\uC9C0 \uC548\uC5D0 \uC6B1\uC5EC\uB123\uC9C0 \uB9C8\uC138\uC694."
      }
    ],
    relatedPatternIds: ["saas-dashboard", "chat-support", "developer-docs"],
    propsSpec: [
      { name: "variant", type: "'primary' | 'success' | 'warning' | 'danger' | 'neutral'", defaultValue: "'primary'", description: "\uBC30\uC9C0 \uC0C9\uC0C1 \uC2A4\uD0C0\uC77C" },
      { name: "pulse", type: "boolean", defaultValue: "false", description: "\uC2E4\uC2DC\uAC04 \uC5F0\uACB0 \uD384\uC2A4 \uC560\uB2C8\uBA54\uC774\uC158 \uB3C4\uD2B8 \uD45C\uC2DC" }
    ],
    htmlSnippet: `<span class="atom-badge atom-badge-primary">NEW</span>
<span class="atom-badge atom-badge-success">\uD65C\uC131</span>
<span class="atom-badge atom-badge-warning">\uB300\uAE30</span>`,
    reactSnippet: `import { Badge } from '@/components/ui/badge';

export function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <Badge variant="primary">v1.2.4</Badge>
      <Badge variant="success" pulse>\uC628\uB77C\uC778</Badge>
      <Badge variant="warning">\uC2EC\uC0AC \uB300\uAE30\uC911</Badge>
    </div>
  );
}`,
    vueSnippet: `<template>
  <AtomBadge variant="success" pulse>\uC628\uB77C\uC778</AtomBadge>
</template>`
  },
  {
    id: "card",
    name: "\uC778\uD130\uB799\uD2F0\uBE0C \uCE74\uB4DC (Card Surface)",
    category: "data",
    source: "shadcn + bootstrap",
    description: "\uC74C\uC601 \uBC0F \uD14C\uB450\uB9AC \uC11C\uD53C\uC2A4, \uD638\uBC84 \uB9AC\uD504\uD2B8 \uC778\uD130\uB799\uC158\uC774 \uB0B4\uC7A5\uB41C \uBC94\uC6A9 \uCE74\uB4DC",
    callout: {
      type: "note",
      title: "\uD1A0\uD070 \uBC14\uC778\uB529",
      text: "\uCE74\uB4DC\uC758 \uBC30\uACBD\uC0C9\uC740 --atom-bg-surface, \uD14C\uB450\uB9AC\uB294 --atom-border-subtle, \uADF8\uB9BC\uC790\uB294 --atom-shadow-sm \uD1A0\uD070\uACFC \uC5F0\uB3D9\uB429\uB2C8\uB2E4."
    },
    useCases: [
      "SaaS \uBE44\uC988\uB2C8\uC2A4 4\uB300 \uD575\uC2EC \uC9C0\uD45C(MRR, MAU, Churn) \uC694\uC57D \uCE74\uB4DC",
      "\uD540\uD14C\uD06C \uC740\uD589 \uACC4\uC88C \uC794\uC561 \uBC0F \uBCF4\uC720 \uC790\uC0B0 \uD604\uD669 \uC11C\uD53C\uC2A4",
      "\uC774\uCEE4\uBA38\uC2A4 \uC1FC\uD551\uBAB0 \uC0C1\uD488 \uC378\uB124\uC77C/\uAC00\uACA9/\uD3C9\uC810 \uAC24\uB7EC\uB9AC \uCE74\uB4DC",
      "\uC628\uBCF4\uB529 \uC704\uC800\uB4DC \uC0AC\uC6A9\uC790 \uC9C1\uBB34 \uC120\uD0DD \uB77C\uB514\uC624 \uCE74\uB4DC"
    ],
    usagePatterns: [
      "\uD074\uB9AD \uAC00\uB2A5\uD55C \uCE74\uB4DC\uC5D0\uB294 \uB9C8\uC6B0\uC2A4 \uD638\uBC84 \uC2DC \uBBF8\uC138\uD558\uAC8C \uC704\uB85C \uB5A0\uC624\uB974\uB294(-2px) \uB9AC\uD504\uD2B8 \uD6A8\uACFC\uC640 \uD14C\uB450\uB9AC \uD558\uC774\uB77C\uC774\uD2B8\uB97C \uBD80\uC5EC\uD569\uB2C8\uB2E4.",
      "\uCE74\uB4DC \uB0B4\uBD80 \uD328\uB529\uC744 16px~24px\uB85C \uB109\uB109\uD788 \uC8FC\uC5B4 \uC815\uBCF4\uC758 \uC2DC\uAC01\uC801 \uD638\uD761\uC744 \uB3D5\uC2B5\uB2C8\uB2E4."
    ],
    dosAndDonts: [
      {
        do: "\uC11C\uB85C \uB2E4\uB978 \uCE74\uD14C\uACE0\uB9AC\uC758 \uC815\uBCF4\uB97C \uBCC4\uAC1C\uC758 \uB3C5\uB9BD\uB41C \uCE74\uB4DC\uB85C \uC2DC\uAC01\uC801\uC73C\uB85C \uADF8\uB8F9\uD551\uD569\uB2C8\uB2E4.",
        dont: "\uCE74\uB4DC \uC548\uC5D0 \uACFC\uB3C4\uD558\uAC8C \uBCF5\uC7A1\uD55C \uC911\uCCA9 \uCE74\uB4DC\uB098 \uC218\uC2ED \uAC1C\uC758 \uC561\uC158\uC744 \uB09C\uC7A1\uD558\uAC8C \uBC30\uCE58\uD558\uC9C0 \uB9C8\uC138\uC694."
      }
    ],
    relatedPatternIds: ["saas-dashboard", "onboarding-wizard", "map-location"],
    propsSpec: [
      { name: "interactive", type: "boolean", defaultValue: "false", description: "\uD638\uBC84 \uB9AC\uD504\uD2B8 \uBC0F \uD074\uB9AD \uD53C\uB4DC\uBC31 \uD65C\uC131\uD654" }
    ],
    htmlSnippet: `<div class="atom-card atom-card-interactive">
  <h4 class="atom-card-title">\uACC4\uC88C \uC794\uC561</h4>
  <p class="atom-card-body">1,500,000\uC6D0</p>
</div>`,
    reactSnippet: `import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function CardDemo() {
  return (
    <Card interactive>
      <CardHeader>
        <CardTitle>\uD1A0\uC2A4\uBC45\uD06C \uC790\uC720\uC801\uAE08</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">\u20A9 12,450,000</div>
        <p className="text-xs text-neutral-500">\uC5F0 4.5% \uCD5C\uACE0 \uAE08\uB9AC \uC801\uC6A9 \uC911</p>
      </CardContent>
    </Card>
  );
}`,
    vueSnippet: `<template>
  <AtomCard interactive title="\uBCF4\uC720 \uC790\uC0B0">
    <div>\u20A9 12,450,000</div>
  </AtomCard>
</template>`
  },
  {
    id: "table",
    name: "\uB370\uC774\uD130 \uD14C\uC774\uBE14 (Responsive Table)",
    category: "data",
    source: "shadcn + bootstrap",
    description: "\uBD80\uD2B8\uC2A4\uD2B8\uB7A9 table-hover \uBC0F shadcn \uC2A4\uD0C0\uC77C \uD074\uB9B0 \uBC18\uC751\uD615 \uB370\uC774\uD130 \uD14C\uC774\uBE14",
    callout: {
      type: "tip",
      title: "\uAC00\uB85C \uC2A4\uD06C\uB864 \uBCF4\uD638",
      text: "\uD14C\uC774\uBE14 \uC678\uACFD\uC5D0 overflow-x-auto\uB97C \uB798\uD551\uD558\uC5EC \uBAA8\uBC14\uC77C \uBDF0\uD3EC\uD2B8\uC5D0\uC11C \uD398\uC774\uC9C0 \uC804\uCCB4\uAC00 \uAE68\uC9C0\uB294 \uD604\uC0C1\uC744 \uBC29\uC9C0\uD558\uC138\uC694."
    },
    useCases: [
      "\uD68C\uC6D0 \uBAA9\uB85D, \uACB0\uC81C \uB0B4\uC5ED, \uC8FC\uBB38\uC11C \uB85C\uADF8 \uB4F1 \uB2E4\uC911 \uCEEC\uB7FC \uC815\uD615 \uB370\uC774\uD130 \uC870\uD68C",
      "API \uC5D4\uB4DC\uD3EC\uC778\uD2B8 \uD30C\uB77C\uBBF8\uD130 \uBC0F Props \uADDC\uACA9 \uBA85\uC138\uC11C",
      "\uD56D\uACF5\uAD8C / \uD638\uD154 \uAC00\uACA9 \uBC0F \uC635\uC158 \uBE44\uAD50\uD45C",
      "\uAD8C\uD55C \uB9E4\uD2B8\uB9AD\uC2A4 \uC124\uC815 \uD14C\uC774\uBE14"
    ],
    usagePatterns: [
      "\uD589(Row)\uC5D0 \uB9C8\uC6B0\uC2A4\uC624\uBC84 \uC2DC \uC740\uC740\uD55C \uBC30\uACBD\uC0C9 \uBCC0\uD654\uB97C \uC8FC\uC5B4 \uD604\uC7AC \uC77D\uACE0 \uC788\uB294 \uD589\uC744 \uC2DC\uAC01\uC801\uC73C\uB85C \uACE0\uC815\uD569\uB2C8\uB2E4.",
      "\uB370\uC774\uD130\uAC00 0\uAC74\uC77C \uB54C\uB294 \uD14C\uC774\uBE14\uC774 \uD145 \uBE48 \uCC44 \uAE68\uC9C0\uC9C0 \uC54A\uB3C4\uB85D \uBE48 \uC0C1\uD0DC(Empty State) \uD589\uC744 \uC911\uC559\uC5D0 \uB178\uCD9C\uD569\uB2C8\uB2E4."
    ],
    dosAndDonts: [
      {
        do: "\uC22B\uC790 \uB370\uC774\uD130\uB294 \uC6B0\uCE21 \uC815\uB82C, \uD14D\uC2A4\uD2B8 \uB370\uC774\uD130\uB294 \uC88C\uCE21 \uC815\uB82C, \uC0C1\uD0DC \uBC43\uC9C0\uB294 \uC911\uC559 \uC815\uB82C\uD569\uB2C8\uB2E4.",
        dont: "\uBAA8\uBC14\uC77C \uD654\uBA74\uC5D0\uC11C \uAC00\uB85C \uC2A4\uD06C\uB864 \uC548\uB0B4 \uC5C6\uC774 \uC624\uB978\uCABD \uCEEC\uB7FC\uC744 \uC798\uB77C\uBA39\uC9C0 \uB9C8\uC138\uC694."
      }
    ],
    relatedPatternIds: ["saas-dashboard", "developer-docs"],
    propsSpec: [
      { name: "striped", type: "boolean", defaultValue: "false", description: "\uD640\uC218 \uD589 \uBC30\uACBD \uC2A4\uD2B8\uB77C\uC774\uD504 \uD6A8\uACFC" },
      { name: "hoverable", type: "boolean", defaultValue: "true", description: "\uB9C8\uC6B0\uC2A4 \uC624\uBC84 \uC2DC \uD589 \uD558\uC774\uB77C\uC774\uD2B8" }
    ],
    htmlSnippet: `<table class="atom-table">
  <thead><tr><th>\uC774\uB984</th><th>\uC0C1\uD0DC</th><th>\uC5ED\uD560</th></tr></thead>
  <tbody><tr><td>\uAE40\uBBFC\uC218</td><td>\uC815\uC0C1</td><td>\uAD00\uB9AC\uC790</td></tr></tbody>
</table>`,
    reactSnippet: `import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

export function TableDemo() {
  return (
    <Table hoverable>
      <TableHeader>
        <TableRow>
          <TableHead>\uC0AC\uC6A9\uC790</TableHead>
          <TableHead>\uC0C1\uD0DC</TableHead>
          <TableHead>\uC5ED\uD560</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>\uAE40\uBBFC\uC218</TableCell>
          <TableCell>\uD65C\uC131</TableCell>
          <TableCell>\uC18C\uC720\uC790</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,
    vueSnippet: `<template>
  <AtomTable :headers="['\uC774\uB984', '\uC0C1\uD0DC']" :rows="userRows" hoverable />
</template>`
  }
];

// lib/data/patterns.ts
var PATTERNS_COLLECTION = [
  {
    id: "saas-dashboard",
    platform: "web",
    wireframeType: "dashboard-grid",
    title: "SaaS \uB370\uC774\uD130 \uBD84\uC11D & KPI \uB300\uC2DC\uBCF4\uB4DC",
    categoryName: "Analytics & SaaS",
    badge: "\uB300\uC2DC\uBCF4\uB4DC/\uB370\uC774\uD130",
    iconName: "dashboard",
    summary: "\uAE30\uAC04 \uD544\uD130(7d/30d), 4\uB300 \uD575\uC2EC KPI \uC9C0\uD45C \uCE74\uB4DC, \uC804\uC8FC \uB300\uBE44 \uC99D\uAC10 \uD2B8\uB80C\uB4DC(+14.8%), \uC77C\uBCC4 \uCD94\uC774 \uBC14 \uCC28\uD2B8 \uBC0F \uC815\uB82C \uAC00\uB2A5\uD55C \uB370\uC774\uD130 \uD14C\uC774\uBE14.",
    recommendedComponentIds: ["card", "badge", "button", "tabs", "table"],
    checklist: [
      "KPI \uC694\uC57D \uCE74\uB4DC\uB9C8\uB2E4 \uC804\uC8FC/\uC804\uC6D4 \uB300\uBE44 \uC99D\uAC10\uB960(+, -) \uBC0F \uC2DC\uAC01\uC801 \uC0C9\uC0C1(\uCD08\uB85D/\uBE68\uAC15) \uC778\uB514\uCF00\uC774\uD130 \uC81C\uACF5",
      "\uB0A0\uC9DC \uBC94\uC704 \uD544\uD130(\uC624\uB298, \uC9C0\uB09C 7\uC77C, \uC9C0\uB09C 30\uC77C, \uC9C1\uC811 \uC124\uC815) \uC6D0\uD074\uB9AD \uC804\uD658 \uD0ED \uBC30\uCE58",
      "\uCC28\uD2B8 \uB85C\uB529 \uC2DC \uB808\uC774\uC544\uC6C3 \uBB34\uB108\uC9D0(CLS)\uC744 \uBC29\uC9C0\uD558\uB294 \uCC28\uD2B8 \uC804\uC6A9 \uC2A4\uCF08\uB808\uD1A4 UI \uC9C0\uC6D0",
      "\uB370\uC774\uD130 \uD14C\uC774\uBE14\uC758 \uCEEC\uB7FC \uC815\uB82C(\uC624\uB984\uCC28\uC21C/\uB0B4\uB9BC\uCC28\uC21C) \uBC0F \uC0C1\uD0DC \uBC30\uC9C0(\uD65C\uC131/\uB300\uAE30/\uB9CC\uB8CC) \uBA85\uD655\uD654"
    ],
    antiPatterns: [
      "\uC22B\uC790 \uC9C0\uD45C\uAC00 \uB108\uBB34 \uB9CE\uC544 \uD55C\uB208\uC5D0 \uD575\uC2EC \uC131\uACFC\uB97C \uD30C\uC545\uD560 \uC218 \uC5C6\uB294 \uC815\uBCF4 \uACFC\uBD80\uD558(Visual Noise)",
      "\uB370\uC774\uD130\uAC00 0\uAC74\uC77C \uB54C \uCC28\uD2B8\uAC00 \uC5D0\uB7EC \uB098\uAC70\uB098 \uAE68\uC9C4 \uCC44\uB85C \uBC29\uCE58\uB418\uB294 \uBE48 \uC0C1\uD0DC(Empty State) \uACB0\uC5EC",
      "\uBAA8\uBC14\uC77C \uD658\uACBD\uC5D0\uC11C \uD14C\uC774\uBE14 \uAC00\uB85C \uC2A4\uD06C\uB864 \uC548\uB0B4\uAC00 \uC5C6\uC5B4 \uC624\uB978\uCABD \uCEEC\uB7FC\uC774 \uC798\uB824 \uBCF4\uC774\uB294 \uD604\uC0C1"
    ],
    variants: [
      {
        id: "kpi-analytics-view",
        name: "\uBE44\uC988\uB2C8\uC2A4 \uC131\uACFC KPI \uCE74\uB4DC & \uC2DC\uACC4\uC5F4 \uCC28\uD2B8",
        description: "\uC758\uC0AC\uACB0\uC815\uAD8C\uC790\uAC00 \uC11C\uBE44\uC2A4 \uD575\uC2EC \uC131\uACFC \uC9C0\uD45C(ARR, MAU, Churn)\uB97C \uD55C\uB208\uC5D0 \uD30C\uC545\uD558\uACE0 \uB4DC\uB9B4\uB2E4\uC6B4\uD560 \uC218 \uC788\uB294 \uB300\uC2DC\uBCF4\uB4DC \uD328\uD134.",
        checklist: [
          "4\uB300 \uD575\uC2EC \uC9C0\uD45C \uCE74\uB4DC \uCD5C\uC0C1\uB2E8 \uBC30\uCE58",
          "\uC2DC\uACC4\uC5F4 \uCC28\uD2B8 \uD638\uBC84 \uD234\uD301(Tooltip) \uC9C0\uC6D0",
          "\uBAA8\uBC14\uC77C\uC5D0\uC11C\uB294 2\uC5F4 \uADF8\uB9AC\uB4DC\uB85C \uC790\uB3D9 \uB9AC\uD50C\uB85C\uC6B0"
        ],
        antiPatterns: ["\uBC94\uB840(Legend) \uC124\uBA85\uC774 \uB204\uB77D\uB418\uC5B4 \uC0C9\uC0C1\uC774 \uBB34\uC5C7\uC744 \uC758\uBBF8\uD558\uB294\uC9C0 \uBAA8\uB984"],
        markdown: `# [UX Pattern] B2B SaaS \uC131\uACFC \uBD84\uC11D \uB300\uC2DC\uBCF4\uB4DC \uD328\uD134

## 1. \uAC1C\uC694
\uD575\uC2EC \uBE44\uC988\uB2C8\uC2A4 \uC9C0\uD45C(KPI)\uC640 \uC2DC\uACC4\uC5F4 \uD2B8\uB80C\uB4DC\uB97C \uC2DC\uAC01\uD654\uD558\uC5EC \uC0AC\uC6A9\uC790\uAC00 \uBE60\uB978 \uC758\uC0AC\uACB0\uC815\uC744 \uB0B4\uB9B4 \uC218 \uC788\uB3C4\uB85D \uB3D5\uC2B5\uB2C8\uB2E4.

## 2. \uD544\uC218 \uAD6C\uD604 \uADDC\uCE59
- **KPI Metrics Card**: \uC218\uCE58 + \uB2E8\uC704 + \uC804\uAE30 \uB300\uBE44 \uC99D\uAC10(Badge).
- **Date Range Picker / Tabs**: 7\uC77C, 30\uC77C, 90\uC77C \uD1A0\uAE00.
- **Data Table**: \uC815\uB82C \uAC00\uB2A5\uD55C \uD5E4\uB354, \uD398\uC774\uC9C0\uB124\uC774\uC158 \uB610\uB294 \uBB34\uD55C \uC2A4\uD06C\uB864.
`
      }
    ]
  },
  {
    id: "chat-support",
    platform: "mobile",
    wireframeType: "chat-stream",
    title: "1:1 \uACE0\uAC1D\uC9C0\uC6D0 & AI \uCC57\uBD07 \uC0C1\uB2F4 \uD328\uD134",
    categoryName: "Communication",
    badge: "\uCC44\uD305/CS",
    iconName: "chat",
    summary: "\uB9D0\uD48D\uC120 \uBA54\uC2DC\uC9C0 \uC2A4\uD2B8\uB9BC, \uCD94\uCC9C \uBE60\uB978 \uC9C8\uBB38 \uCE69(Quick Reply), \uD30C\uC77C \uCCA8\uBD80, \uD0C0\uC774\uD551 \uC911 \uC778\uB514\uCF00\uC774\uD130, \uC0C1\uB2F4\uC6D0 \uC5F0\uACB0 \uC0C1\uD0DC \uC548\uB0B4.",
    recommendedComponentIds: ["input", "button", "badge", "card", "alert"],
    checklist: [
      "\uC0C8 \uBA54\uC2DC\uC9C0 \uC218\uC2E0 \uC2DC \uC790\uB3D9\uC73C\uB85C \uC2A4\uD06C\uB864\uC744 \uCD5C\uD558\uB2E8\uC73C\uB85C \uBD80\uB4DC\uB7FD\uAC8C \uB0B4\uB9AC\uB294 \uC790\uB3D9 \uC2A4\uD06C\uB864(Auto-scroll)",
      "\uC0AC\uC6A9\uC790\uAC00 \uC790\uC8FC \uBB3B\uB294 \uC9C8\uBB38(FAQ)\uC744 \uC6D0\uD074\uB9AD\uC73C\uB85C \uBCF4\uB0BC \uC218 \uC788\uB294 \uAC00\uB85C \uC2A4\uD06C\uB864 \uCD94\uCC9C \uCE69 \uC81C\uACF5",
      "\uC0C1\uB300\uBC29(\uB610\uB294 AI)\uC774 \uC751\uB2F5 \uC791\uC131 \uC911\uC77C \uB54C 3\uAC1C \uC810\uC774 \uAE5C\uBE61\uC774\uB294 \uD0C0\uC774\uD551 \uC560\uB2C8\uBA54\uC774\uC158(Typing Indicator) \uB178\uCD9C",
      "\uC774\uBBF8\uC9C0/\uCEA1\uCC98 \uD30C\uC77C \uCCA8\uBD80 \uC2DC \uC804\uC1A1 \uC804 \uBBF8\uB9AC\uBCF4\uAE30 \uBC0F \uC6A9\uB7C9 \uCD08\uACFC \uC778\uB77C\uC778 \uC5D0\uB7EC"
    ],
    antiPatterns: [
      "\uBA54\uC2DC\uC9C0\uB97C \uBCF4\uB0B8 \uD6C4 \uC804\uC1A1 \uC131\uACF5 \uC5EC\uBD80\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC0AC\uC6A9\uC790\uAC00 \uAC19\uC740 \uC9C8\uBB38\uC744 \uC5F0\uD0C0\uD558\uB294 \uBB38\uC81C",
      "\uBD07\uC774 \uB2F5\uBCC0\uD558\uC9C0 \uBABB\uD588\uC744 \uB54C \uC778\uAC04 \uC0C1\uB2F4\uC6D0 \uC778\uACC4 \uACBD\uB85C(Escalation)\uB97C \uC81C\uACF5\uD558\uC9C0 \uC54A\uC74C",
      "\uBAA8\uBC14\uC77C \uD0A4\uBCF4\uB4DC\uAC00 \uC62C\uB77C\uC62C \uB54C \uC785\uB825\uCC3D\uC774 \uD0A4\uBCF4\uB4DC \uB4A4\uB85C \uC228\uC5B4\uBC84\uB9AC\uB294 \uBDF0\uD3EC\uD2B8 \uBC84\uADF8"
    ],
    variants: [
      {
        id: "live-chatbot-stream",
        name: "\uC2E4\uC2DC\uAC04 \uC2A4\uD2B8\uB9AC\uBC0D \uB300\uD654\uD615 \uC778\uD130\uD398\uC774\uC2A4",
        description: "AI \uBAA8\uB378\uC758 \uD1A0\uD070 \uB2E8\uC704 \uC2A4\uD2B8\uB9AC\uBC0D \uC751\uB2F5\uACFC \uD035 \uB9AC\uD50C\uB77C\uC774 \uCE69\uC744 \uACB0\uD569\uD55C \uBAA8\uB358 \uB300\uD654\uCC3D.",
        checklist: ["\uC2A4\uD2B8\uB9AC\uBC0D \uB3C4\uC911 \uB9C8\uD06C\uB2E4\uC6B4 \uC2E4\uC2DC\uAC04 \uD30C\uC2F1", "\uB2F5\uBCC0 \uBCF5\uC0AC \uBC0F \uC7AC\uC0DD\uC131 \uC561\uC158 \uBC84\uD2BC \uC81C\uACF5"],
        antiPatterns: ["\uC2A4\uD2B8\uB9AC\uBC0D \uC911 \uC0AC\uC6A9\uC790\uC758 \uCD94\uAC00 \uC785\uB825\uC744 \uC644\uC804\uD788 \uCC28\uB2E8\uD574\uBC84\uB9AC\uB294 \uD589\uC704"],
        markdown: `# [UX Pattern] 1:1 \uACE0\uAC1D\uC9C0\uC6D0 & AI \uCC57\uBD07 \uD328\uD134

## 1. \uAC1C\uC694
\uC0AC\uC6A9\uC790\uC758 \uBB38\uC758 \uC0AC\uD56D\uC744 \uC2E4\uC2DC\uAC04 \uB300\uD654 \uD615\uD0DC\uB85C \uC218\uB834\uD558\uACE0 AI \uC5B4\uC2DC\uC2A4\uD134\uD2B8\uAC00 \uC989\uC2DC \uD574\uACB0\uD569\uB2C8\uB2E4.

## 2. \uD544\uC218 UX \uBA85\uC138
- **Message Bubble Layout**: \uC1A1\uC2E0\uC790 \uC6B0\uCE21 \uC815\uB82C(Primary \uCEEC\uB7EC), \uC218\uC2E0\uC790 \uC88C\uCE21 \uC815\uB82C(Muted Surface).
- **Quick Actions**: \uAC00\uB85C \uC2A4\uD06C\uB864 \uCD94\uCC9C \uC9C8\uBB38 \uCE69.
`
      }
    ]
  },
  {
    id: "kyc-verification",
    platform: "mobile",
    wireframeType: "kyc-camera",
    title: "\uBCF8\uC778\uD655\uC778 & KYC \uC778\uC99D\uC2E0\uCCAD \uD328\uD134",
    categoryName: "Identity & Security",
    badge: "\uC778\uC99D/\uBCF4\uC548",
    iconName: "kyc",
    summary: "\uD734\uB300\uD3F0 SMS/PASS \uC778\uC99D, \uC2E0\uBD84\uC99D/\uC11C\uB958 \uCD2C\uC601 \uC5C5\uB85C\uB4DC, \uD544\uC218/\uC120\uD0DD \uC57D\uAD00 \uC77C\uAD04 \uB3D9\uC758, \uC2E4\uC2DC\uAC04 \uC2EC\uC0AC \uC0C1\uD0DC \uC548\uB0B4.",
    recommendedComponentIds: ["input", "button", "selection", "card", "badge", "alert"],
    checklist: [
      "\uD734\uB300\uD3F0 6\uC790\uB9AC \uC778\uC99D\uBC88\uD638 \uC785\uB825 \uC2DC 3\uBD84 \uCE74\uC6B4\uD2B8\uB2E4\uC6B4 \uD0C0\uC774\uBA38 \uBC0F \uC7AC\uC804\uC1A1(Resend) CTA \uC0C1\uC2DC \uC81C\uACF5",
      "[\uC804\uCCB4 \uB3D9\uC758] \uD1A0\uAE00 \uC2DC \uD558\uC704 \uD544\uC218(14\uC138 \uC774\uC0C1, \uAC1C\uC778\uC815\uBCF4 \uB4F1) \uBC0F \uC120\uD0DD \uC57D\uAD00 \uC77C\uAD04 \uB3D9\uAE30\uD654",
      "\uC2E0\uBD84\uC99D \uD30C\uC77C \uC5C5\uB85C\uB4DC \uC2DC \uC989\uC2DC \uD30C\uC77C\uBA85 \uBC0F \uBBF8\uB9AC\uBCF4\uAE30 \uC12C\uB124\uC77C \uB178\uCD9C, 10MB \uCD08\uACFC \uD30C\uC77C \uC778\uB77C\uC778 \uACBD\uACE0",
      "\uC81C\uCD9C \uC644\uB8CC \uD6C4 [\uC2EC\uC0AC \uB300\uAE30\uC911 / \uBCF4\uC644 \uD544\uC694 / \uC2B9\uC778 \uC644\uB8CC] \uB2E8\uACC4\uBCC4 \uD504\uB85C\uADF8\uB808\uC2A4 \uC2A4\uD15D \uBC14 \uC81C\uACF5"
    ],
    antiPatterns: [
      "\uC778\uC99D\uBC88\uD638 \uC2DC\uAC04 \uCD08\uACFC \uC2DC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uC544\uBB34\uB7F0 \uC5D0\uB7EC \uBA54\uC2DC\uC9C0 \uC5C6\uC774 \uBB34\uC751\uB2F5 \uBC29\uCE58",
      "\uD544\uC218 \uC57D\uAD00\uACFC \uB9C8\uCF00\uD305 \uC120\uD0DD \uC57D\uAD00\uC744 \uBB36\uC5B4\uB450\uC5B4 \uAC15\uC81C \uB3D9\uC758\uD558\uAC8C \uC720\uB3C4",
      "\uD30C\uC77C \uC5C5\uB85C\uB4DC \uC6A9\uB7C9 \uC81C\uD55C\uC744 \uC5C5\uB85C\uB4DC \uC2E4\uD328 \uD6C4\uC5D0\uC57C alert \uD31D\uC5C5\uC73C\uB85C \uB744\uC6B0\uB294 \uD589\uC704"
    ],
    variants: [
      {
        id: "otp-id-verification",
        name: "SMS OTP & \uC2E0\uBD84\uC99D \uC5C5\uB85C\uB4DC \uD50C\uB85C\uC6B0",
        description: "\uAE08\uC735 \uBC0F \uBCF8\uC778\uD655\uC778\uC774 \uD544\uC694\uD55C \uC11C\uBE44\uC2A4\uC5D0\uC11C \uC774\uD0C8 \uC5C6\uC774 \uC2E0\uC18D\uD788 \uC778\uC99D\uC744 \uC644\uACB0\uD558\uB294 \uD328\uD134.",
        checklist: ['\uC790\uB3D9 \uC644\uC131 \uC9C0\uC6D0(autocomplete="one-time-code")', "\uC11C\uB958 \uC5C5\uB85C\uB4DC \uB4DC\uB798\uADF8\uC564\uB4DC\uB86D \uC9C0\uC6D0"],
        antiPatterns: ["\uBC31\uC2A4\uD398\uC774\uC2A4 \uC785\uB825 \uC2DC \uC774\uC804 \uC778\uD48B\uC73C\uB85C \uCEE4\uC11C\uAC00 \uC774\uB3D9\uD558\uC9C0 \uC54A\uC74C"],
        markdown: `# [UX Pattern] \uBCF8\uC778\uD655\uC778 & KYC \uC778\uC99D \uD50C\uB85C\uC6B0

## 1. \uAC1C\uC694
\uAE08\uC735, \uACB0\uC81C, \uC131\uC778\uC778\uC99D \uC11C\uBE44\uC2A4\uC5D0\uC11C \uC0AC\uC6A9\uC790\uC758 \uC2E0\uC6D0\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD569\uB2C8\uB2E4.

## 2. \uD544\uC218 \uADDC\uC57D
- **Timer**: 180\uCD08 \uCE74\uC6B4\uD2B8\uB2E4\uC6B4. \uB9CC\uB8CC \uC2DC \uC785\uB825 \uBE44\uD65C\uC131\uD654 \uBC0F \uC7AC\uC804\uC1A1 \uD65C\uC131\uD654.
- **Terms Agreement**: \uC804\uCCB4 \uB3D9\uC758 \uD1A0\uAE00 \uC2DC \uC790\uC2DD \uD56D\uBAA9 \uC77C\uAD04 \uBCC0\uACBD.
`
      }
    ]
  },
  {
    id: "blog-editor",
    platform: "web",
    wireframeType: "editor-toolbar",
    title: "\uBE14\uB85C\uADF8 \uAE00 \uC791\uC131 & \uBC1C\uD589 \uC5D0\uB514\uD130 \uD328\uD134",
    categoryName: "Content & Publishing",
    badge: "\uCF58\uD150\uCE20/\uC5D0\uB514\uD130",
    iconName: "blog",
    summary: "\uC81C\uBAA9/\uBCF8\uBB38 \uB9AC\uCE58 \uC5D0\uB514\uD130, \uD0DC\uADF8 \uCE69 \uC785\uB825\uAE30, \uCEE4\uBC84 \uC774\uBBF8\uC9C0 \uB4F1\uB85D, 30\uCD08 \uBB34\uC911\uB2E8 \uC790\uB3D9 \uC784\uC2DC\uC800\uC7A5, \uACF5\uAC1C \uC124\uC815 \uBAA8\uB2EC.",
    recommendedComponentIds: ["input", "button", "badge", "dialog", "selection", "tabs"],
    checklist: [
      '30\uCD08 \uC8FC\uAE30 \uBB34\uC911\uB2E8 \uC790\uB3D9 \uC784\uC2DC\uC800\uC7A5(Autosave) \uBC0F "\uB9C8\uC9C0\uB9C9 \uC800\uC7A5: \uBC29\uAE08 \uC804" \uC0C1\uD0DC \uC2E4\uC2DC\uAC04 \uD45C\uAE30',
      "\uC81C\uBAA9 \uC785\uB825\uB780\uC5D0\uC11C \uC5D4\uD130 \uD0A4 \uC785\uB825 \uC2DC \uBCF8\uBB38 \uCCAB \uB2E8\uB77D\uC73C\uB85C \uD3EC\uCEE4\uC2A4 \uC790\uB3D9 \uC804\uD658",
      "\uD0DC\uADF8 \uC785\uB825 \uC2DC \uC27C\uD45C/\uC5D4\uD130 \uC785\uB825 \uC989\uC2DC \uCEA1\uC290 \uCE69(Chip)\uC73C\uB85C \uBCC0\uD658 \uBC0F \uAC1C\uBCC4 \uC0AD\uC81C(X) \uC9C0\uC6D0",
      "[\uBC1C\uD589\uD558\uAE30] \uD074\uB9AD \uC2DC \uACF5\uAC1C \uBC94\uC704(\uC804\uCCB4/\uBE44\uACF5\uAC1C/\uBCF4\uD638) \uBC0F URL \uC2AC\uB7EC\uADF8, \uBC1C\uD589 \uC608\uC57D \uC77C\uC2DC \uC124\uC815 \uBAA8\uB2EC \uD31D\uC5C5"
    ],
    antiPatterns: [
      "\uC0AC\uC6A9\uC790\uAC00 \uC2E4\uC218\uB85C \uB4A4\uB85C\uAC00\uAE30\uB098 \uD0ED\uC744 \uB2EB\uC744 \uB54C \uC791\uC131 \uC911\uC778 \uBCF8\uBB38 \uC190\uC2E4 \uACBD\uACE0\uCC3D \uBBF8\uC81C\uACF5",
      "\uC5D0\uB514\uD130 \uBCF8\uBB38 \uD3F0\uD2B8 \uD06C\uAE30\uAC00 \uC2E4\uC81C \uBC1C\uD589\uB41C \uD654\uBA74\uACFC \uB2EC\uB77C \uC0AC\uC6A9\uC790\uAC00 \uB808\uC774\uC544\uC6C3\uC744 \uC624\uC778\uD568",
      "\uB300\uD45C \uC774\uBBF8\uC9C0\uB97C \uB4F1\uB85D\uD558\uC9C0 \uC54A\uC558\uC744 \uB54C \uAE30\uBCF8 Fallback \uC774\uBBF8\uC9C0 \uADDC\uCE59 \uBD80\uC7AC"
    ],
    variants: [
      {
        id: "markdown-rich-editor",
        name: "\uB9AC\uCE58 \uB9C8\uD06C\uB2E4\uC6B4 \uC5D0\uB514\uD130 & \uBA54\uD0C0\uB370\uC774\uD130 \uBC1C\uD589",
        description: "\uAE00 \uC791\uC131\uC790\uC758 \uBAB0\uC785\uAC10\uC744 \uC720\uC9C0\uD558\uBA74\uC11C \uD0DC\uADF8, \uC2AC\uB7EC\uADF8, \uBC1C\uD589 \uC77C\uC815\uC744 \uC190\uC27D\uAC8C \uC124\uC815\uD558\uB294 \uD328\uD134.",
        checklist: ["\uB2E8\uCD95\uD0A4(Ctrl+B, Ctrl+I) \uC9C0\uC6D0", "\uC774\uBBF8\uC9C0 \uBD99\uC5EC\uB123\uAE30(Paste) \uC790\uB3D9 \uC5C5\uB85C\uB4DC"],
        antiPatterns: ["\uC5D0\uB514\uD130 \uC2A4\uD06C\uB864\uACFC \uBBF8\uB9AC\uBCF4\uAE30 \uC2A4\uD06C\uB864\uC774 \uBE44\uB3D9\uAE30\uB418\uC5B4 \uC5C9\uB6B1\uD55C \uC704\uCE58\uB97C \uBCF4\uC5EC\uC90C"],
        markdown: `# [UX Pattern] \uBE14\uB85C\uADF8 \uAE00 \uC791\uC131 \uBC0F \uBC1C\uD589 \uD328\uD134

## 1. \uAC1C\uC694
\uCF58\uD150\uCE20 \uC81C\uC791\uC790\uAC00 \uBC29\uD574\uBC1B\uC9C0 \uC54A\uACE0 \uAE00\uC744 \uC9D1\uD544\uD558\uACE0 \uC548\uC804\uD558\uAC8C \uBC1C\uD589\uD569\uB2C8\uB2E4.
`
      }
    ]
  },
  {
    id: "map-location",
    platform: "mobile",
    wireframeType: "map-sheet",
    title: "\uC9C0\uB3C4 & \uC704\uCE58 \uAE30\uBC18 POI \uD0D0\uC0C9 \uD328\uD134",
    categoryName: "Location & Mobility",
    badge: "\uC9C0\uB3C4/\uB85C\uCF00\uC774\uC158",
    iconName: "map",
    summary: "\uC778\uD130\uB799\uD2F0\uBE0C \uC9C0\uB3C4 \uBDF0\uD3EC\uD2B8, \uD604 \uC9C0\uB3C4 \uC704\uCE58\uC5D0\uC11C \uC7AC\uAC80\uC0C9, \uD540(Marker) \uC778\uD130\uB799\uC158, \uBC14\uD140\uC2DC\uD2B8 \uC7A5\uC18C \uC0C1\uC138 \uC815\uBCF4.",
    recommendedComponentIds: ["card", "button", "badge", "input", "sheet"],
    checklist: [
      '\uC9C0\uB3C4 \uD328\uB2DD/\uC90C \uC774\uB3D9 \uC2DC \uC0C1\uB2E8\uC5D0 "\uD604 \uC704\uCE58\uC5D0\uC11C \uC7AC\uAC80\uC0C9" \uD50C\uB85C\uD305 \uCE69 \uC790\uB3D9 \uB178\uCD9C',
      "\uC9C0\uB3C4 \uC704 \uD540 \uB9C8\uCEE4 \uD130\uCE58 \uC2DC \uD558\uB2E8 \uBC14\uD140\uC2DC\uD2B8\uAC00 \uB9E4\uB044\uB7FD\uAC8C \uC2AC\uB77C\uC774\uB4DC \uC5C5\uB418\uBA70 \uB9E4\uC7A5 \uD575\uC2EC \uC815\uBCF4 \uB178\uCD9C",
      "\uD604\uC7AC \uC2DC\uAC01 \uAE30\uC900 [\uC601\uC5C5 \uC911 / \uC601\uC5C5 \uC885\uB8CC] \uC5EC\uBD80\uB97C \uCEEC\uB7EC \uBC30\uC9C0(\uCD08\uB85D/\uD68C\uC0C9)\uB85C \uBA85\uD655\uD788 \uD45C\uC2DC",
      '\uBAA8\uBC14\uC77C \uD55C \uC190 \uC870\uC791\uC744 \uC704\uD55C "\uAE38\uCC3E\uAE30" \uBC0F "\uC804\uD654\uAC78\uAE30" \uC8FC\uC694 CTA \uBC84\uD2BC \uC0C1\uC2DC \uD558\uB2E8 \uACE0\uC815'
    ],
    antiPatterns: [
      "\uC9C0\uB3C4\uB97C \uC2A4\uD06C\uB864\uD560 \uB54C \uC6F9 \uD398\uC774\uC9C0 \uC804\uCCB4\uAC00 \uD568\uAED8 \uC704\uC544\uB798\uB85C \uBC00\uB824 \uC9C0\uB3C4\uAC00 \uC870\uC791\uB418\uC9C0 \uC54A\uB294 \uD604\uC0C1",
      "\uB9C8\uCEE4\uAC00 \uACB9\uCE60 \uB54C \uD074\uB7EC\uC2A4\uD130\uB9C1(\uBB36\uC74C) \uCC98\uB9AC\uAC00 \uC548 \uB418\uC5B4 \uD654\uBA74\uC774 \uD540\uC73C\uB85C \uB4A4\uB36E\uC784",
      "\uBC14\uD140\uC2DC\uD2B8\uAC00 \uC804\uCCB4 \uD654\uBA74\uC744 \uAC00\uB824 \uC9C0\uB3C4 \uCEE8\uD14D\uC2A4\uD2B8\uB97C \uC783\uC5B4\uBC84\uB9AC\uB294 \uD604\uC0C1"
    ],
    variants: [
      {
        id: "poi-bottom-sheet",
        name: "\uD540 \uB9C8\uCEE4 \uD074\uB9AD & \uC2AC\uB77C\uC774\uB529 \uBC14\uD140\uC2DC\uD2B8",
        description: "\uC9C0\uB3C4\uC758 \uB113\uC740 \uC2DC\uC57C\uB97C \uD655\uBCF4\uD558\uBA74\uC11C \uC7A5\uC18C\uC758 \uC6B4\uC601\uC2DC\uAC04\uACFC \uAE38\uCC3E\uAE30\uB97C \uC81C\uACF5\uD558\uB294 \uD328\uD134.",
        checklist: ["\uBC14\uD140\uC2DC\uD2B8 2\uB2E8\uACC4 \uB192\uC774 \uC81C\uC5B4(\uC2A4\uB0C5 \uD3EC\uC778\uD2B8)", "\uAC70\uB9AC \uC21C \uC815\uB82C \uD544\uD130"],
        antiPatterns: ["\uC9C0\uB3C4 \uB85C\uB529 \uC911 \uC544\uBB34\uB7F0 \uC548\uB0B4 \uC5C6\uC774 \uD68C\uC0C9 \uD0C0\uC77C\uB9CC \uB178\uCD9C"],
        markdown: `# [UX Pattern] \uC9C0\uB3C4 \uBC0F \uC704\uCE58 \uAE30\uBC18 POI \uD0D0\uC0C9 \uD328\uD134`
      }
    ]
  },
  {
    id: "flight-booking",
    platform: "web",
    wireframeType: "flight-swap",
    title: "\uD56D\uACF5\uAD8C / \uC5EC\uD589 \uC77C\uC815 \uC608\uC57D \uD328\uD134",
    categoryName: "Travel & Booking",
    badge: "\uC608\uC57D/\uC77C\uC815",
    iconName: "flight",
    summary: "\uCD9C\uBC1C\uC9C0-\uB3C4\uCC29\uC9C0 \uC6D0\uD074\uB9AD \uC2A4\uC651(Swap), \uC655\uBCF5/\uD3B8\uB3C4 \uD0ED, \uCE98\uB9B0\uB354 \uB0A0\uC9DC \uBC94\uC704 \uBC0F \uC2B9\uAC1D \uC218(\uC131\uC778/\uC18C\uC544) \uCE74\uC6B4\uD130.",
    recommendedComponentIds: ["tabs", "input", "button", "badge", "card", "dialog"],
    checklist: [
      "\uCD9C\uBC1C\uC9C0\uC640 \uB3C4\uCC29\uC9C0\uB97C \uD55C \uBC88\uC5D0 \uB9DE\uBC14\uAFB8\uB294 \uC778\uD130\uB799\uD2F0\uBE0C 360\uB3C4 \uC2A4\uC651 \uBC84\uD2BC \uC81C\uACF5",
      "\uC655\uBCF5 \uC120\uD0DD \uC2DC [\uAC00\uB294 \uB0A0 - \uC624\uB294 \uB0A0] \uB0A0\uC9DC \uBC94\uC704\uB97C \uD55C \uD654\uBA74\uC5D0\uC11C \uC120\uD0DD\uD558\uB294 \uB4C0\uC5BC \uCE98\uB9B0\uB354",
      "\uC131\uC778/\uC18C\uC544/\uC720\uC544 \uC2B9\uAC1D \uC218 \uC99D\uAC10 (+/-) \uCE74\uC6B4\uD130 \uBC0F \uC720\uC544 \uB098\uC774 \uAE30\uC900 \uD234\uD301 \uC81C\uACF5",
      "\uAC80\uC0C9 \uC911\uC77C \uB54C \uB85C\uB529 \uC2A4\uCF08\uB808\uD1A4 \uBC0F \uC9C1\uD56D/\uACBD\uC720, \uAC00\uACA9\uB300\uBCC4 \uD544\uD130 \uCE69 \uC0C1\uB2E8 \uBC30\uCE58"
    ],
    antiPatterns: [
      "\uC624\uB294 \uB0A0\uC744 \uAC00\uB294 \uB0A0\uBCF4\uB2E4 \uC55E\uC120 \uACFC\uAC70 \uB0A0\uC9DC\uB85C \uC120\uD0DD\uD560 \uC218 \uC788\uAC8C \uBC29\uCE58\uD558\uB294 \uC624\uB958",
      "\uCD9C\uBC1C\uC9C0 \uC120\uD0DD \uC2DC \uACF5\uD56D \uCF54\uB4DC(ICN, GMP)\uC640 \uD55C\uAE00 \uB3C4\uC2DC\uBA85 \uAC80\uC0C9\uC774 \uBD84\uB9AC\uB418\uC5B4 \uAC80\uC0C9 \uC2E4\uD328 \uC720\uBC1C",
      "\uC720\uB958\uD560\uC99D\uB8CC/\uC138\uAE08\uC774 \uCD5C\uC885 \uACB0\uC81C \uB2E8\uACC4\uC5D0\uC11C \uAC11\uC790\uAE30 \uCD94\uAC00\uB418\uC5B4 \uAC00\uACA9 \uBD88\uC2E0 \uCD08\uB798"
    ],
    variants: [
      {
        id: "flight-search-bar",
        name: "\uBA40\uD2F0 \uD30C\uB77C\uBBF8\uD130 \uD56D\uACF5\uAD8C \uAC80\uC0C9 \uD3FC",
        description: "\uBCF5\uC7A1\uD55C \uB0A0\uC9DC, \uC2B9\uAC1D, \uACF5\uD56D \uC870\uD569\uC744 \uC624\uCC28 \uC5C6\uC774 \uBE60\uB974\uAC8C \uC124\uC815\uD558\uB294 \uD328\uD134.",
        checklist: ["\uCD5C\uADFC \uAC80\uC0C9 \uC5EC\uC815 \uC790\uB3D9 \uC800\uC7A5", "\uD2B9\uAC00 \uCE98\uB9B0\uB354 \uAC00\uACA9 \uBC43\uC9C0"],
        antiPatterns: ["\uB0A0\uC9DC \uC120\uD0DD \uC2DC \uC8FC\uB9D0/\uACF5\uD734\uC77C \uC0C9\uC0C1 \uBBF8\uAD6C\uBD84"],
        markdown: `# [UX Pattern] \uD56D\uACF5\uAD8C \uAC80\uC0C9 \uBC0F \uC608\uC57D \uD50C\uB85C\uC6B0`
      }
    ]
  },
  {
    id: "onboarding-wizard",
    platform: "mobile",
    wireframeType: "wizard-steps",
    title: "\uC628\uBCF4\uB529 \uD29C\uD1A0\uB9AC\uC5BC & \uB2E4\uB2E8\uACC4 \uC2A4\uD15D \uC704\uC800\uB4DC",
    categoryName: "User Onboarding",
    badge: "\uC628\uBCF4\uB529/\uAC00\uC785",
    iconName: "onboarding",
    summary: "\uC9C4\uD589\uB960 \uD504\uB85C\uADF8\uB808\uC2A4 \uBC14(1~3\uB2E8\uACC4), \uC5ED\uD560 \uC120\uD0DD \uCE74\uB4DC(\uB514\uC790\uC774\uB108/\uC5D4\uC9C0\uB2C8\uC5B4/\uAE30\uD68D\uC790), \uC774\uC804/\uB2E4\uC74C \uC720\uD6A8\uC131 \uAC80\uC0AC, \uAC74\uB108\uB6F0\uAE30(Skip).",
    recommendedComponentIds: ["card", "button", "badge", "selection", "input"],
    checklist: [
      "\uD604\uC7AC \uB2E8\uACC4\uC640 \uCD1D \uB2E8\uACC4\uB97C \uBA85\uC2DC\uD558\uB294 \uC0C1\uB2E8 \uC2A4\uD15D \uD504\uB85C\uADF8\uB808\uC2A4 \uBC14(\uC608: 2/3\uB2E8\uACC4)",
      "\uC120\uD0DD\uC9C0\uB97C \uD070 \uCE74\uB4DC \uD615\uD0DC\uB85C \uBC30\uCE58\uD558\uC5EC \uBAA8\uBC14\uC77C \uD130\uCE58 \uD0C0\uAE43(\uCD5C\uC18C 48px) \uADF9\uB300\uD654",
      "\uC120\uD0DD\uD558\uC9C0 \uC54A\uACE0 \uB2E4\uC74C\uC73C\uB85C \uB118\uC5B4\uAC00\uC9C0 \uBABB\uD558\uB3C4\uB85D \uBC84\uD2BC \uBE44\uD65C\uC131\uD654(Disabled) \uC0C1\uD0DC \uBA85\uD655\uD654",
      '\uD544\uC218\uAC00 \uC544\uB2CC \uC9C8\uBB38\uC758 \uACBD\uC6B0 \uC6B0\uC0C1\uB2E8 "\uAC74\uB108\uB6F0\uAE30" \uBC84\uD2BC\uC744 \uC81C\uACF5\uD558\uC5EC \uC774\uD0C8\uB960 \uBC29\uC9C0'
    ],
    antiPatterns: [
      "\uC774\uC804 \uB2E8\uACC4\uB85C \uB3CC\uC544\uAC14\uC744 \uB54C \uC774\uBBF8 \uC785\uB825\uD55C \uB370\uC774\uD130\uAC00 \uC804\uBD80 \uCD08\uAE30\uD654\uB418\uB294 \uBC84\uADF8",
      "\uB2E8\uACC4\uAC00 \uCD1D \uBA87 \uB2E8\uACC4\uC778\uC9C0 \uC54C\uB824\uC8FC\uC9C0 \uC54A\uC544 \uC0AC\uC6A9\uC790\uAC00 \uB05D\uC5C6\uB294 \uC124\uBB38\uCC98\uB7FC \uB290\uAEF4 \uC774\uD0C8",
      "\uAC01 \uC9C8\uBB38\uC758 \uC120\uD0DD \uC774\uC720\uB97C \uC124\uBA85\uD558\uC9C0 \uC54A\uC544 \uC0AC\uC6A9\uC790\uAC00 \uAC1C\uC778\uC815\uBCF4 \uC218\uC9D1\uC5D0 \uAC70\uBD80\uAC10\uC744 \uB290\uB08C"
    ],
    variants: [
      {
        id: "multi-step-form",
        name: "\uB2E8\uACC4\uBCC4 \uC815\uBCF4 \uC218\uC9D1 \uC704\uC800\uB4DC",
        description: "\uBCF5\uC7A1\uD55C \uAC00\uC785/\uC628\uBCF4\uB529 \uD504\uB85C\uC138\uC2A4\uB97C \uCCAD\uD0B9(Chunking)\uD558\uC5EC \uC644\uB8CC\uC728\uC744 \uADF9\uB300\uD654\uD558\uB294 \uD328\uD134.",
        checklist: ["\uC5D4\uD130 \uD0A4 \uC785\uB825 \uC2DC \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC790\uB3D9 \uC9C4\uD589", "\uB4A4\uB85C\uAC00\uAE30 \uC2DC \uC0C1\uD0DC \uC644\uBCBD \uBCF5\uC6D0"],
        antiPatterns: ["\uC9C4\uD589 \uC911 \uC0C8\uB85C\uACE0\uCE68 \uC2DC 1\uB2E8\uACC4\uB85C \uAC15\uC81C \uB9AC\uC14B"],
        markdown: `# [UX Pattern] \uC628\uBCF4\uB529 \uBC0F \uB2E4\uB2E8\uACC4 \uC704\uC800\uB4DC \uD328\uD134`
      }
    ]
  },
  {
    id: "file-uploader",
    platform: "web",
    wireframeType: "uploader-dropzone",
    title: "\uD30C\uC77C \uB4DC\uB798\uADF8\uC564\uB4DC\uB86D \uC5C5\uB85C\uB354 & \uBBF8\uB514\uC5B4 \uAD00\uB9AC",
    categoryName: "File & Media",
    badge: "\uD30C\uC77C/\uC5C5\uB85C\uB4DC",
    iconName: "uploader",
    summary: "\uB300\uD615 \uC810\uC120 \uB4DC\uB86D\uC874(Dropzone), \uC2E4\uC2DC\uAC04 \uC5C5\uB85C\uB4DC \uC9C4\uD589\uB960 \uBC14(0%~100%), \uD30C\uC77C \uD615\uC2DD/\uC6A9\uB7C9 \uAC80\uC99D, \uCCA8\uBD80 \uD30C\uC77C \uB9AC\uC2A4\uD2B8 \uBC0F \uC0AD\uC81C.",
    recommendedComponentIds: ["card", "button", "badge", "alert", "input"],
    checklist: [
      "\uD30C\uC77C\uC744 \uB4DC\uB86D\uC874 \uC704\uB85C \uB4DC\uB798\uADF8\uD588\uC744 \uB54C \uD14C\uB450\uB9AC \uC0C9\uC0C1\uACFC \uBC30\uACBD\uC774 \uD558\uC774\uB77C\uC774\uD2B8\uB418\uB294 \uC2DC\uAC01 \uD53C\uB4DC\uBC31",
      "\uD5C8\uC6A9 \uD655\uC7A5\uC790(JPG, PNG, PDF) \uBC0F \uCD5C\uB300 \uD30C\uC77C \uD06C\uAE30(\uC608: \uCD5C\uB300 20MB)\uB97C \uB4DC\uB86D\uC874 \uB0B4 \uBA85\uC2DC",
      "\uC5C5\uB85C\uB4DC \uC911\uC778 \uD30C\uC77C\uB9C8\uB2E4 \uD504\uB85C\uADF8\uB808\uC2A4 \uBC14 \uBC0F \uC911\uB2E8/\uCDE8\uC18C(X) \uBC84\uD2BC \uC81C\uACF5",
      "\uC5C5\uB85C\uB4DC \uC644\uB8CC\uB41C \uD30C\uC77C\uC758 \uD30C\uC77C\uBA85, \uC6A9\uB7C9, \uC131\uACF5 \uC544\uC774\uCF58 \uBC0F \uAC1C\uBCC4 \uC0AD\uC81C \uAE30\uB2A5"
    ],
    antiPatterns: [
      "\uD5C8\uC6A9\uB418\uC9C0 \uC54A\uC740 \uD655\uC7A5\uC790 \uD30C\uC77C\uC744 \uC62C\uB838\uC744 \uB54C \uD30C\uC77C \uC120\uD0DD \uCC3D\uC774 \uB2EB\uD78C \uB4A4\uC5D0\uC57C alert\uC744 \uB744\uC6C0",
      "\uC5C5\uB85C\uB4DC \uC911 \uBE0C\uB77C\uC6B0\uC800 \uD0ED\uC744 \uB2EB\uC73C\uB824\uACE0 \uD560 \uB54C \uACBD\uACE0\uCC3D\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC544 \uC5C5\uB85C\uB4DC \uC911\uB2E8",
      "\uC774\uBBF8\uC9C0 \uD30C\uC77C\uC778\uB370 \uC378\uB124\uC77C \uBBF8\uB9AC\uBCF4\uAE30\uB97C \uC81C\uACF5\uD558\uC9C0 \uC54A\uACE0 \uD14D\uC2A4\uD2B8 \uD30C\uC77C\uBA85\uB9CC \uB178\uCD9C\uD568"
    ],
    variants: [
      {
        id: "dropzone-progress-list",
        name: "\uB4DC\uB798\uADF8\uC564\uB4DC\uB86D\uC874 & \uC9C4\uD589\uB960 \uB9AC\uC2A4\uD2B8",
        description: "\uB2E4\uC911 \uB300\uC6A9\uB7C9 \uD30C\uC77C \uCCA8\uBD80 \uC2DC \uC2DC\uAC01\uC801 \uC548\uC815\uC131\uACFC \uC9C4\uD589 \uC0C1\uD669\uC744 \uC804\uB2EC\uD558\uB294 \uD328\uD134.",
        checklist: ["\uBCF5\uC218 \uD30C\uC77C \uB3D9\uC2DC \uC5C5\uB85C\uB4DC \uBCD1\uB82C \uCC98\uB9AC", "\uC2E4\uD328 \uC2DC \uC7AC\uC2DC\uB3C4(Retry) \uBC84\uD2BC"],
        antiPatterns: ["\uC5C5\uB85C\uB4DC \uC9C4\uD589\uB960\uC774 \uBA48\uCD98 \uCC44 \uC5BC\uC5B4\uBD99\uB294 \uD604\uC0C1"],
        markdown: `# [UX Pattern] \uD30C\uC77C \uB4DC\uB798\uADF8\uC564\uB4DC\uB86D \uC5C5\uB85C\uB354 \uD328\uD134`
      }
    ]
  },
  {
    id: "fintech-transfer",
    platform: "mobile",
    wireframeType: "keypad-transfer",
    title: "\uACC4\uC88C \uC1A1\uAE08 & \uAC04\uD3B8 \uC774\uCCB4 \uD328\uD134",
    categoryName: "Fintech & Pay",
    badge: "\uD540\uD14C\uD06C/\uC774\uCCB4",
    iconName: "fintech",
    summary: "\uB300\uD615 \uAE08\uC561 \uC785\uB825(\uC2E4\uC2DC\uAC04 \uD55C\uAE00 \uBCC0\uD658), \uC218\uC218\uB8CC \uBA74\uC81C \uC548\uB0B4 \uBC30\uC9C0, \uBE60\uB978 \uCD9C\uAE08 \uACC4\uC88C \uC120\uD0DD, \uD655\uC778 \uBAA8\uB2EC \uBC0F \uC644\uB8CC \uC778\uD130\uB799\uC158.",
    recommendedComponentIds: ["button", "input", "dialog", "badge", "card"],
    checklist: [
      '\uC22B\uC790 \uC785\uB825 \uC2DC "5\uB9CC \uC6D0", "150\uB9CC \uC6D0" \uB4F1 \uC2E4\uC2DC\uAC04 \uD55C\uAE00 \uAE08\uC561 \uB2E8\uC704 \uB3D9\uC2DC \uBCC0\uD658 \uB178\uCD9C',
      "\uCD9C\uAE08 \uAC00\uB2A5 \uC794\uC561 \uCD08\uACFC \uC2DC \uC989\uC2DC \uACBD\uACE0 \uD14D\uC2A4\uD2B8 \uBC0F \uC794\uC561 \uCC44\uC6B0\uAE30 CTA \uC5F0\uACC4",
      "\uCD5C\uC885 \uC1A1\uAE08 \uC9C1\uC804 \uBC1B\uB294 \uBD84 \uC774\uB984, \uC740\uD589, \uACC4\uC88C\uBC88\uD638\uB97C \uC7AC\uD655\uC778\uD558\uB294 2\uB2E8\uACC4 \uD655\uC778 \uB2E4\uC774\uC5BC\uB85C\uADF8",
      "\uC1A1\uAE08 \uC131\uACF5 \uC2DC \uBD80\uB4DC\uB7EC\uC6B4 \uCCB4\uD06C \uC560\uB2C8\uBA54\uC774\uC158\uACFC \uC794\uC561 \uAC31\uC2E0 \uBC0F \uCE74\uCE74\uC624\uD1A1 \uC601\uC218\uC99D \uACF5\uC720 CTA"
    ],
    antiPatterns: [
      "\uAE08\uC561 \uB2E8\uC704 \uCF64\uB9C8(, ) \uC11C\uC2DD\uC774 \uC785\uB825 \uC911\uC5D0 \uAE68\uC838 \uC0AC\uC6A9\uC790\uAC00 \uC22B\uC790\uB97C \uD5F7\uAC08\uB9AC\uAC8C \uB9CC\uB4E6",
      "\uD655\uC778 \uBAA8\uB2EC \uC5C6\uC774 \uD55C \uBC88 \uD074\uB9AD\uC73C\uB85C \uBC14\uB85C \uB3C8\uC774 \uBE60\uC838\uB098\uAC00\uB294 \uC704\uD5D8\uD55C \uD750\uB984",
      "\uB124\uD2B8\uC6CC\uD06C \uC9C0\uC5F0 \uC2DC \uC1A1\uAE08 \uBC84\uD2BC\uC744 \uC5F0\uD0C0\uD558\uC5EC \uC911\uBCF5 \uC774\uCCB4 \uC0AC\uACE0 \uBC1C\uC0DD"
    ],
    variants: [
      {
        id: "two-step-transfer",
        name: "\uC22B\uC790 \uD0A4\uD328\uB4DC \uC1A1\uAE08 & \uC774\uC911 \uD655\uC778 \uBAA8\uB2EC",
        description: "\uC624\uC1A1\uAE08 \uC704\uD5D8\uC744 \uC6D0\uCC9C \uCC28\uB2E8\uD558\uBA74\uC11C \uC6D0\uD130\uCE58\uB85C \uC1A1\uAE08\uC744 \uC644\uB8CC\uD558\uB294 \uD1A0\uC2A4\uD615 \uD328\uD134.",
        checklist: ["\uCD5C\uADFC \uC1A1\uAE08 \uACC4\uC88C \uC990\uACA8\uCC3E\uAE30 \uCE69", "\uC0DD\uCCB4 \uC778\uC99D(\uC9C0\uBB38/FaceID) \uC778\uD130\uD398\uC774\uC2A4 \uC9C0\uC6D0"],
        antiPatterns: ["\uC740\uD589 \uC810\uAC80 \uC2DC\uAC04 \uC548\uB0B4 \uC5C6\uC774 \uC774\uCCB4 \uC2E4\uD328 \uCC98\uB9AC"],
        markdown: `# [UX Pattern] \uACC4\uC88C \uC1A1\uAE08 \uBC0F \uAC04\uD3B8 \uC774\uCCB4 \uD328\uD134`
      }
    ]
  },
  {
    id: "ecommerce-checkout",
    platform: "mobile",
    wireframeType: "cart-sticky",
    title: "\uC7A5\uBC14\uAD6C\uB2C8 & \uC8FC\uBB38 \uACB0\uC81C\uC11C \uD328\uD134",
    categoryName: "Commerce & Order",
    badge: "\uCEE4\uBA38\uC2A4/\uACB0\uC81C",
    iconName: "commerce",
    summary: "\uC218\uB7C9 \uC99D\uAC10(+/-) \uC2E4\uC2DC\uAC04 \uAE08\uC561 \uC7AC\uACC4\uC0B0, \uCFE0\uD3F0/\uC801\uB9BD\uAE08 \uC778\uB77C\uC778 \uC801\uC6A9, \uAC04\uD3B8\uACB0\uC81C \uC218\uB2E8 \uC120\uD0DD, \uD558\uB2E8 \uACB0\uC81C CTA \uACE0\uC815 \uBC14.",
    recommendedComponentIds: ["card", "button", "input", "badge", "selection"],
    checklist: [
      "\uC218\uB7C9 \uC99D\uAC10(+/-) \uC2DC \uBC30\uC1A1\uBE44 \uBC0F \uCD1D \uACB0\uC81C \uC608\uC815 \uAE08\uC561 \uC2E4\uC2DC\uAC04 \uC7AC\uACC4\uC0B0",
      "\uBCF4\uC720 \uCFE0\uD3F0 \uBC0F \uC801\uB9BD\uAE08 \uC785\uB825\uB780\uC5D0 [\uCD5C\uB300 \uC0AC\uC6A9] \uC6D0\uD074\uB9AD \uC801\uC6A9 \uBC84\uD2BC \uC81C\uACF5",
      "\uC2A4\uD06C\uB864 \uC704\uCE58\uC640 \uC0C1\uAD00\uC5C6\uC774 \uACB0\uC81C \uAE08\uC561\uACFC [OOO\uC6D0 \uACB0\uC81C\uD558\uAE30] \uBC84\uD2BC\uC744 \uD654\uBA74 \uD558\uB2E8 \uACE0\uC815(Sticky)",
      "\uD488\uC808 \uC0C1\uD488 \uBC1C\uC0DD \uC2DC \uCCB4\uD06C\uBC15\uC2A4 \uC790\uB3D9 \uD574\uC81C \uBC0F \uD488\uC808 \uBC43\uC9C0 \uBA85\uD655\uD788 \uD45C\uAE30"
    ],
    antiPatterns: [
      "\uC218\uB7C9\uC744 \uBC14\uAFC0 \uB54C\uB9C8\uB2E4 \uD654\uBA74 \uC804\uCCB4\uAC00 \uAE5C\uBE61\uC774\uBA70 \uB9AC\uB85C\uB4DC\uB418\uB294 \uAD6C\uC2DD \uBC29\uC2DD",
      "\uCD5C\uC885 \uACB0\uC81C \uAE08\uC561\uC5D0 \uBC30\uC1A1\uBE44\uB098 \uD560\uC778\uC774 \uC5B4\uB5BB\uAC8C \uACC4\uC0B0\uB418\uC5C8\uB294\uC9C0 \uC0C1\uC138 \uB0B4\uC5ED \uBBF8\uD45C\uC2DC",
      "\uACB0\uC81C \uC2E4\uD328 \uC2DC \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uC544\uB454 \uC0C1\uD488 \uC815\uBCF4\uAC00 \uC804\uBD80 \uB0A0\uC544\uAC00\uB294 \uD604\uC0C1"
    ],
    variants: [
      {
        id: "sticky-checkout-bar",
        name: "\uC8FC\uBB38\uC11C \uACB0\uC81C & \uD558\uB2E8 \uACE0\uC815 \uBC14",
        description: "\uACB0\uC81C \uACFC\uC815\uC758 \uC774\uD0C8\uC744 \uC904\uC774\uACE0 \uCD5C\uC885 \uACB0\uC81C \uAE08\uC561\uC744 \uBA85\uB8CC\uD558\uAC8C \uC720\uC9C0\uD558\uB294 \uD328\uD134.",
        checklist: ["\uAC04\uD3B8\uACB0\uC81C \uC6D0\uD074\uB9AD \uD0ED \uC120\uD0DD", "\uC801\uB9BD \uC608\uC815 \uD3EC\uC778\uD2B8 \uC548\uB0B4"],
        antiPatterns: ["\uACB0\uC81C \uC218\uB2E8 \uC120\uD0DD \uC2DC \uCD94\uAC00 \uC218\uC218\uB8CC \uC228\uAE40"],
        markdown: `# [UX Pattern] \uC774\uCEE4\uBA38\uC2A4 \uC7A5\uBC14\uAD6C\uB2C8 \uBC0F \uACB0\uC81C \uC8FC\uBB38\uC11C \uD328\uD134`
      }
    ]
  },
  {
    id: "search-empty",
    platform: "web",
    wireframeType: "search-empty",
    title: "\uC2E4\uC2DC\uAC04 \uAC80\uC0C9 & Empty UX \uD328\uD134",
    categoryName: "Discovery",
    badge: "\uD0D0\uC0C9/\uBCF5\uAD6C",
    iconName: "search",
    summary: "300ms \uB514\uBC14\uC6B4\uC2A4 \uC785\uB825, \uAC80\uC0C9\uC5B4 \uC989\uC2DC \uCD08\uAE30\uD654(X) \uBC84\uD2BC, \uACB0\uACFC \uC5C6\uC74C \uC2DC \uBCF5\uAD6C \uCD94\uCC9C \uD0DC\uADF8 \uBC0F \uCD5C\uADFC \uAC80\uC0C9\uC5B4 \uC81C\uACF5.",
    recommendedComponentIds: ["input", "badge", "card", "button"],
    checklist: [
      "300ms \uB514\uBC14\uC6B4\uC2A4 \uC801\uC6A9\uC73C\uB85C \uD0C0\uC790 \uCE60 \uB54C\uB9C8\uB2E4 \uC11C\uBC84\uC5D0 \uBB34\uC758\uBBF8\uD55C API \uC694\uCCAD \uBC29\uC9C0",
      '\uACB0\uACFC\uAC00 \uC5C6\uC744 \uB54C "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"\uC640 \uD568\uAED8 \uB300\uC548 \uCD94\uCC9C \uD0A4\uC6CC\uB4DC \uD0DC\uADF8 3\uAC1C \uC774\uC0C1 \uC81C\uACF5',
      "\uC785\uB825\uCC3D \uC6B0\uCE21 \uC6D0\uD074\uB9AD \uD074\uB9AC\uC5B4(X) \uBC84\uD2BC \uBC0F \uCD5C\uADFC \uAC80\uC0C9\uC5B4 \uAE30\uB85D \uB85C\uCEEC \uC800\uC7A5",
      "\uAC80\uC0C9 \uC911\uC77C \uB54C\uB294 \uC778\uB77C\uC778 \uC2A4\uD53C\uB108\uB098 \uC2A4\uCF08\uB808\uD1A4\uC73C\uB85C \uC9C4\uD589 \uC0C1\uD0DC \uBA85\uD655\uD654"
    ],
    antiPatterns: [
      "\uACB0\uACFC\uAC00 \uC5C6\uC744 \uB54C \uD558\uC580 \uBC31\uC9C0 \uD654\uBA74\uB9CC \uB35C\uB801 \uB178\uCD9C\uD558\uC5EC \uC0AC\uC6A9\uC790\uB97C \uC774\uD0C8\uC2DC\uD0B4",
      "\uD0C0\uC774\uD551 \uC911 \uC9C0\uC6B0\uAE30(X) \uBC84\uD2BC\uC774 \uC5C6\uC5B4 \uBC31\uC2A4\uD398\uC774\uC2A4\uB97C \uC5F0\uD0C0\uD558\uAC8C \uB9CC\uB4DC\uB294 \uBD88\uD3B8\uD568",
      '\uC624\uD0C0 \uC785\uB825 \uC2DC \uC720\uC0AC \uAC80\uC0C9\uC5B4 \uCD94\uCC9C("\uD639\uC2DC \uC774\uAC83\uC744 \uCC3E\uC73C\uC168\uB098\uC694?") \uBBF8\uC81C\uACF5'
    ],
    variants: [
      {
        id: "autocomplete-recovery",
        name: "\uC2E4\uC2DC\uAC04 \uC790\uB3D9\uC644\uC131 & \uBE48 \uC0C1\uD0DC \uBCF5\uAD6C \uD750\uB984",
        description: "\uC0AC\uC6A9\uC790\uAC00 \uC624\uD0C0\uB97C \uB0B4\uAC70\uB098 \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uB3C4 \uC11C\uBE44\uC2A4 \uC774\uD0C8\uC744 \uB9C9\uB294 \uD68C\uBCF5\uD0C4\uB825\uC801 UX.",
        checklist: ["\uCD5C\uADFC \uAC80\uC0C9\uC5B4 \uC0AD\uC81C \uAE30\uB2A5", "\uC778\uAE30 \uAC80\uC0C9\uC5B4 \uB7AD\uD0B9 \uD45C\uC2DC"],
        antiPatterns: ["\uAC80\uC0C9\uC5B4\uAC00 1\uAE00\uC790\uC77C \uB54C \uBB34\uC870\uAC74 \uC804\uCCB4 DB\uB97C \uC870\uD68C\uD558\uC5EC \uBE0C\uB77C\uC6B0\uC800 \uB809 \uC720\uBC1C"],
        markdown: `# [UX Pattern] \uC2E4\uC2DC\uAC04 \uAC80\uC0C9 \uBC0F \uACB0\uACFC \uC5C6\uC74C \uBCF5\uAD6C \uD328\uD134`
      }
    ]
  },
  {
    id: "developer-docs",
    platform: "web",
    wireframeType: "docs-layout",
    title: "\uAC1C\uBC1C\uC790 \uAE30\uC220 \uBB38\uC11C & API Docs \uD328\uD134",
    categoryName: "Documentation & DX",
    badge: "\uAE30\uC220\uBB38\uC11C/API",
    iconName: "docs",
    summary: "\uC88C\uCE21 \uACC4\uCE35 \uD2B8\uB9AC \uB0B4\uBE44\uAC8C\uC774\uC158, \uC911\uC559 \uCF54\uB4DC \uC2A4\uB2C8\uD3AB(\uC6D0\uD074\uB9AD \uBCF5\uC0AC/\uC5B8\uC5B4 \uD0ED), \uC778\uB77C\uC778 API \uD30C\uB77C\uBBF8\uD130 \uD14C\uC774\uBE14, \uC6B0\uCE21 \uBAA9\uCC28(On this page) \uC2A4\uD06C\uB864 \uC2A4\uD30C\uC774.",
    recommendedComponentIds: ["table", "badge", "tabs", "button", "card"],
    checklist: [
      "\uBAA8\uB4E0 \uCF54\uB4DC \uBE14\uB85D \uC0C1\uB2E8\uC5D0 \uD504\uB85C\uADF8\uB798\uBC0D \uC5B8\uC5B4 \uBC30\uC9C0 \uBC0F \uC6D0\uD074\uB9AD \uBCF5\uC0AC(Copy) \uD53C\uB4DC\uBC31 \uC81C\uACF5",
      "\uC804\uC5ED \uB2E8\uCD95\uD0A4(Cmd+K / Ctrl+K) \uC9C0\uC6D0 \uBB38\uC11C \uD1B5\uD569 \uAC80\uC0C9 \uC624\uBC84\uB808\uC774 \uC81C\uACF5",
      "\uD604\uC7AC \uBCF4\uACE0 \uC788\uB294 \uC139\uC158\uC744 \uC6B0\uCE21 \uBAA9\uCC28(TOC)\uC5D0\uC11C \uC2E4\uC2DC\uAC04 \uD558\uC774\uB77C\uC774\uD2B8\uD558\uB294 \uC2A4\uD06C\uB864 \uC2A4\uD30C\uC774(Scroll Spy)",
      "API \uC5D4\uB4DC\uD3EC\uC778\uD2B8\uB9C8\uB2E4 HTTP Method \uBC30\uC9C0(GET/POST/DELETE) \uBC0F \uC694\uCCAD/\uC751\uB2F5 \uD30C\uB77C\uBBF8\uD130 \uD0C0\uC785 \uD45C\uAE30"
    ],
    antiPatterns: [
      "\uAE34 \uCF54\uB4DC \uBE14\uB85D\uC5D0 \uAC00\uB85C \uC2A4\uD06C\uB864\uC774 \uC5C6\uC5B4 \uC624\uB978\uCABD \uCF54\uB4DC\uAC00 \uAC15\uC81C\uB85C \uC798\uB824 \uBCF4\uC774\uB294 \uD604\uC0C1",
      "\uAC80\uC0C9 \uACB0\uACFC\uB97C \uD074\uB9AD\uD588\uC744 \uB54C \uD574\uB2F9 \uC575\uCEE4(#section)\uB85C \uC815\uD655\uD788 \uC774\uB3D9\uD558\uC9C0 \uC54A\uB294 \uB525\uB9C1\uD06C \uB204\uB77D",
      "\uBC84\uC804 \uC120\uD0DD(v1, v2) \uC2DC \uAE30\uC874\uC5D0 \uBCF4\uACE0 \uC788\uB358 \uD398\uC774\uC9C0 \uCEE8\uD14D\uC2A4\uD2B8\uB97C \uC783\uC5B4\uBC84\uB9AC\uB294 \uD604\uC0C1"
    ],
    variants: [
      {
        id: "api-reference-3col",
        name: "3\uB2E8 \uBD84\uD560 \uAC1C\uBC1C\uC790 \uAE30\uC220 \uB808\uD37C\uB7F0\uC2A4",
        description: "Stripe, Next.js \uC2A4\uD0C0\uC77C. \uC88C\uCE21 \uD0D0\uC0C9 \uC0AC\uC774\uB4DC\uBC14, \uC911\uC559 \uC0C1\uC138 \uAC00\uC774\uB4DC, \uC6B0\uCE21 \uC2E4\uC2DC\uAC04 \uCF54\uB4DC \uC608\uC81C \uBC0F TOC.",
        checklist: ["\uCF54\uB4DC \uC2A4\uB2C8\uD3AB cURL / JavaScript / Python \uD0ED \uC804\uD658", "API \uC751\uB2F5 JSON \uAD6C\uBB38 \uD558\uC774\uB77C\uC774\uD2B8"],
        antiPatterns: ["\uB2E4\uD06C\uBAA8\uB4DC \uC9C0\uC6D0 \uBBF8\uBE44\uB85C \uC5B4\uB450\uC6B4 \uD658\uACBD\uC5D0\uC11C \uCF54\uB4DC \uAC00\uB3C5\uC131 \uC800\uD558"],
        markdown: `# [UX Pattern] \uAC1C\uBC1C\uC790 \uAE30\uC220 \uBB38\uC11C & API \uB808\uD37C\uB7F0\uC2A4 \uD328\uD134

## 1. \uAC1C\uC694
\uAC1C\uBC1C\uC790\uAC00 \uBE60\uB974\uAC8C \uB77C\uC774\uBE0C\uB7EC\uB9AC\uB97C \uC124\uCE58\uD558\uACE0 API \uADDC\uACA9\uC744 \uD655\uC778\uD558\uC5EC \uBCF5\uC0AC-\uBD99\uC5EC\uB123\uAE30\uB85C \uC989\uC2DC \uC5F0\uB3D9\uD560 \uC218 \uC788\uB294 3\uB2E8 \uAE30\uC220 \uBB38\uC11C \uB808\uC774\uC544\uC6C3\uC785\uB2C8\uB2E4.

## 2. \uD544\uC218 \uB808\uC774\uC544\uC6C3 \uAD6C\uC870
- **Left Column (Sidebar)**: \uCE74\uD14C\uACE0\uB9AC \uD2B8\uB9AC, \uBC84\uC804 \uC2E4\uB809\uD130, \uAC80\uC0C9\uCC3D
- **Center Column (Content)**: \uB9C8\uD06C\uB2E4\uC6B4 \uB80C\uB354\uB9C1, Callout(Note/Tip/Warning), \uC778\uD130\uB799\uD2F0\uBE0C \uCF54\uB4DC \uBE14\uB85D
- **Right Column (TOC)**: \uD398\uC774\uC9C0 \uB0B4 \uBAA9\uCC28 (H2/H3 \uACC4\uCE35)

## 3. \uD544\uC218 \uC778\uD130\uB799\uC158
- \`navigator.clipboard.writeText()\`: \uCF54\uB4DC \uBCF5\uC0AC \uC2DC "Copied!" \uD234\uD301 \uD53C\uB4DC\uBC31.
- \`IntersectionObserver\`: \uBCF8\uBB38 \uC2A4\uD06C\uB864\uC5D0 \uB530\uB978 \uBAA9\uCC28 \uD65C\uC131 \uB9C1\uD06C \uB3D9\uAE30\uD654.
`
      }
    ]
  },
  {
    id: "complex-form-settings",
    platform: "web",
    wireframeType: "complex-form",
    title: "\uBCF5\uC7A1\uD55C \uC5D4\uD130\uD504\uB77C\uC774\uC988 \uD658\uACBD\uC124\uC815 & \uB2E4\uB2E8\uACC4 \uD3FC \uD328\uD134",
    categoryName: "Settings & Configuration",
    badge: "\uBCF5\uD569 \uD3FC/\uD658\uACBD\uC124\uC815",
    iconName: "settings",
    summary: "\uC139\uC158 \uCCAD\uD0B9(\uC88C\uCE21 \uB124\uBE44\uAC8C\uC774\uC158), \uC870\uAC74\uBD80 \uC885\uC18D \uC785\uB825(Progressive Disclosure), \uC2E4\uC2DC\uAC04 \uC778\uB77C\uC778 \uC720\uD6A8\uC131 \uAC80\uC0AC, \uD558\uB2E8 \uD50C\uB85C\uD305 \uBBF8\uC800\uC7A5 \uBCC0\uACBD\uC0AC\uD56D(Unsaved Changes) \uBC14, \uD30C\uAD34\uC801 \uC124\uC815 \uC548\uC804\uC7A5\uCE58.",
    recommendedComponentIds: ["input", "selection", "button", "badge", "alert", "tabs", "card"],
    checklist: [
      "\uC815\uBCF4 \uAD6C\uC870 \uCCAD\uD0B9(Chunking): \uC88C\uCE21 \uACE0\uC815 \uB124\uBE44\uAC8C\uC774\uC158\uC73C\uB85C \uC139\uC158(\uAE30\uBCF8 \uC124\uC815, \uBCF4\uC548 \uC815\uCC45, \uACB0\uC81C/\uC6F9\uD6C5 \uB4F1)\uC744 \uBA85\uD655\uD788 \uBD84\uB9AC\uD558\uC5EC \uC778\uC9C0 \uACFC\uBD80\uD558 \uBC29\uC9C0",
      '\uC810\uC9C4\uC801 \uB178\uCD9C(Progressive Disclosure): "\uACE0\uAE09 \uC124\uC815" \uB610\uB294 \uC0C1\uC704 \uD1A0\uAE00 \uD65C\uC131\uD654 \uC2DC\uC5D0\uB9CC \uD558\uC704 \uC870\uAC74\uBD80 \uC778\uD48B\uC774 \uBD80\uB4DC\uB7FD\uAC8C \uB178\uCD9C',
      "\uC2E4\uC2DC\uAC04 \uC778\uB77C\uC778 \uC720\uD6A8\uC131 \uAC80\uC99D: Blur \uBC0F \uB514\uBC14\uC6B4\uC2A4 \uC2E4\uC2DC\uAC04 \uAC80\uC0AC\uB85C \uC5D0\uB7EC \uC704\uCE58\uC640 \uD574\uACB0 \uD78C\uD2B8\uB97C \uD544\uB4DC \uBC14\uB85C \uBC11\uC5D0 \uBA85\uD655\uD788 \uD45C\uAE30",
      "\uBBF8\uC800\uC7A5 \uBCC0\uACBD\uC0AC\uD56D \uD50C\uB85C\uD305 \uBC14(Sticky Unsaved Bar): \uD544\uB4DC \uC218\uC815 \uC2DC \uD654\uBA74 \uD558\uB2E8\uC5D0 [\uC800\uC7A5\uB418\uC9C0 \uC54A\uC740 \uBCC0\uACBD\uC0AC\uD56D\uC774 \uC788\uC2B5\uB2C8\uB2E4 | \uCDE8\uC18C | \uC800\uC7A5] \uBC14\uAC00 \uC2AC\uB77C\uC774\uB4DC \uC5C5",
      "\uD30C\uAD34\uC801 \uC561\uC158 2\uB2E8\uACC4 \uC548\uC804\uC7A5\uCE58: \uB370\uC774\uD130 \uC0AD\uC81C/API \uC7AC\uBC1C\uAE09 \uB4F1 \uC704\uD5D8 \uC791\uC5C5 \uC2DC \uBA85\uC2DC\uC801 \uD14D\uC2A4\uD2B8 \uC785\uB825 \uD655\uC778(\uC608: \uD504\uB85C\uC81D\uD2B8\uBA85 \uC9C1\uC811 \uC785\uB825) \uB2E4\uC774\uC5BC\uB85C\uADF8 \uC81C\uACF5",
      "\uC2A4\uB9C8\uD2B8 \uAE30\uBCF8\uAC12(Sensible Defaults) & \uD5EC\uD37C \uD234\uD301: \uBCF5\uC7A1\uD55C \uAE30\uC220 \uC6A9\uC5B4 \uC606\uC5D0 \uC548\uB0B4 \uD234\uD301\uACFC \uC6D0\uD074\uB9AD \uBCF5\uC0AC/\uC0DD\uC131 \uBC84\uD2BC \uBC30\uCE58"
    ],
    antiPatterns: [
      "\uC218\uC2ED \uAC1C\uC758 \uC778\uD48B\uC744 \uC2A4\uD06C\uB864 \uC5C6\uC774 \uB2E8\uC77C \uD398\uC774\uC9C0\uC5D0 \uC77C\uB82C \uBC30\uCE58\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uC2DC\uAC01\uC801 \uACF5\uD3EC\uC640 \uC778\uC9C0 \uACFC\uBD80\uD558\uB97C \uC8FC\uB294 \uD615\uD0DC",
      '\uC81C\uCD9C \uBC84\uD2BC\uC744 \uB20C\uB800\uC744 \uB54C \uD654\uBA74 \uC0C1\uB2E8\uC5D0\uC11C\uB9CC "\uC785\uB825\uAC12\uC744 \uD655\uC778\uD558\uC138\uC694"\uB77C\uB294 \uBAA8\uD638\uD55C alert\uC744 \uB744\uC6B0\uACE0 \uC5B4\uB514\uC11C \uC5D0\uB7EC\uAC00 \uB0AC\uB294\uC9C0 \uC54C\uB824\uC8FC\uC9C0 \uC54A\uB294 \uBD88\uCE5C\uC808\uD568',
      "\uC124\uC815\uAC12\uC744 \uBC14\uAFE8\uB294\uB370 \uD398\uC774\uC9C0 \uC774\uB3D9 \uC2DC \uACBD\uACE0 \uC5C6\uC774 \uC791\uC131 \uB0B4\uC6A9\uC774 \uBAA8\uB450 \uC99D\uBC1C\uD558\uB294 \uB370\uC774\uD130 \uC720\uC2E4 \uBC84\uADF8",
      "\uBE44\uD65C\uC131\uD654\uB41C(Disabled) \uD544\uB4DC\uC778\uB370 \uC65C \uBE44\uD65C\uC131\uD654\uB418\uC5B4 \uC788\uB294\uC9C0 \uC774\uC720(\uC0C1\uC704 \uAD8C\uD55C \uD544\uC694, \uD544\uC218 \uC120\uD589 \uC870\uAC74 \uB4F1)\uB97C \uD234\uD301\uC73C\uB85C \uC124\uBA85\uD558\uC9C0 \uC54A\uC74C"
    ],
    variants: [
      {
        id: "enterprise-settings-form",
        name: "\uC5D4\uD130\uD504\uB77C\uC774\uC988 \uBA40\uD2F0 \uC139\uC158 \uD3FC & \uC870\uAC74\uBD80 \uD544\uB4DC",
        description: "Vercel, Stripe, GitHub \uC2A4\uD0C0\uC77C\uC758 \uBCF5\uC7A1\uD55C \uC2DC\uC2A4\uD15C \uC124\uC815 \uD3FC. \uC88C\uCE21 \uC575\uCEE4 \uD0ED\uACFC \uC6B0\uCE21 \uBCF8\uBB38, \uC2E4\uC2DC\uAC04 \uAC80\uC99D \uBC0F \uD50C\uB85C\uD305 \uC138\uC774\uBE0C \uBC14 \uC9C0\uC6D0.",
        checklist: [
          "\uC218\uC815 \uC989\uC2DC \uD558\uB2E8 \uD50C\uB85C\uD305 \uC138\uC774\uBE0C \uBC14 \uD45C\uC2DC",
          "URL \uD615\uC2DD \uAC80\uC99D \uBC0F \uC2E4\uC2DC\uAC04 \uCCB4\uD06C \uC544\uC774\uCF58",
          "\uD1A0\uAE00 \uC2A4\uC704\uCE58\uC5D0 \uB530\uB978 \uC870\uAC74\uBD80 \uC785\uB825\uCC3D \uC560\uB2C8\uBA54\uC774\uC158 \uB178\uCD9C"
        ],
        antiPatterns: ["\uC800\uC7A5 \uBC84\uD2BC\uC744 \uCC3E\uC73C\uB824\uACE0 \uC0AC\uC6A9\uC790\uAC00 \uD398\uC774\uC9C0 \uB9E8 \uBC11\uAE4C\uC9C0 \uC2A4\uD06C\uB864\uD574\uC57C \uD558\uB294 \uD53C\uB85C\uAC10"],
        markdown: `# [UX Pattern] \uBCF5\uC7A1\uD55C \uC5D4\uD130\uD504\uB77C\uC774\uC988 \uD658\uACBD\uC124\uC815 & \uB2E4\uB2E8\uACC4 \uD3FC \uD328\uD134

## 1. \uD328\uD134 \uAC1C\uC694
\uC218\uC2ED \uAC00\uC9C0\uC758 \uC778\uD48B, \uC140\uB809\uD2B8, \uD1A0\uAE00 \uC2A4\uC704\uCE58\uAC00 \uC874\uC7AC\uD558\uB294 \uBCF5\uC7A1\uD55C \uBE44\uC988\uB2C8\uC2A4 \uC124\uC815 \uD654\uBA74\uC5D0\uC11C \uC0AC\uC6A9\uC790\uC758 \uC778\uC9C0 \uBD80\uD558(Cognitive Load)\uB97C \uCD5C\uC18C\uD654\uD558\uACE0, \uC785\uB825 \uC624\uB958\uC640 \uB370\uC774\uD130 \uC720\uC2E4\uC744 \uBC29\uC9C0\uD558\uB294 \uC5D4\uD130\uD504\uB77C\uC774\uC988\uAE09 \uD3FC \uC124\uACC4 \uD328\uD134\uC785\uB2C8\uB2E4.

## 2. \uD575\uC2EC 5\uB300 UX \uC124\uACC4 \uC6D0\uCE59

### 1) \uC810\uC9C4\uC801 \uACF5\uAC1C (Progressive Disclosure)
- \uC0C1\uC704 \uD1A0\uAE00(\uC608: "\uC6F9\uD6C5 \uD65C\uC131\uD654", "2\uB2E8\uACC4 \uC778\uC99D \uAC15\uC81C")\uC744 \uCF30\uC744 \uB54C\uB9CC \uC885\uC18D\uB41C \uD558\uC704 URL \uC785\uB825\uCC3D, \uC2DC\uD06C\uB9BF \uD0A4 \uB4F1\uC774 \uC560\uB2C8\uBA54\uC774\uC158\uACFC \uD568\uAED8 \uB178\uCD9C\uB429\uB2C8\uB2E4.
- \uCD08\uAE30 \uC9C4\uC785 \uC2DC \uD654\uBA74\uC758 \uC2DC\uAC01\uC801 \uB178\uC774\uC988\uB97C 70% \uC774\uC0C1 \uC904\uC5EC\uC90D\uB2C8\uB2E4.

### 2) \uBBF8\uC800\uC7A5 \uBCC0\uACBD\uC0AC\uD56D \uACE0\uC815 \uBC14 (Sticky Unsaved Changes Bar)
- \uC0AC\uC6A9\uC790\uAC00 \uC5B4\uB5A4 \uD544\uB4DC\uB77C\uB3C4 \uC218\uC815(Dirty \uC0C1\uD0DC)\uD558\uBA74 \uD654\uBA74 \uD558\uB2E8\uC5D0 \uD50C\uB85C\uD305 \uBC14\uAC00 \uC19F\uC544\uC624\uB985\uB2C8\uB2E4.
- \`[ \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC740 \uC124\uC815\uC774 \uC788\uC2B5\uB2C8\uB2E4 | \uB418\uB3CC\uB9AC\uAE30 | \uBCC0\uACBD\uC0AC\uD56D \uC800\uC7A5 ]\`
- \uD398\uC774\uC9C0 \uCD5C\uD558\uB2E8\uAE4C\uC9C0 \uC2A4\uD06C\uB864\uD558\uC9C0 \uC54A\uACE0\uB3C4 \uC989\uC2DC \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.

### 3) \uC2E4\uC2DC\uAC04 \uC778\uB77C\uC778 \uAC80\uC99D (Real-time Inline Validation)
- \uD3FC \uC804\uCCB4\uB97C \uC81C\uCD9C\uD55C \uB4A4\uC5D0 \uC11C\uBC84 \uC5D0\uB7EC \uD31D\uC5C5\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.
- \uC0AC\uC6A9\uC790\uAC00 \uD3EC\uCEE4\uC2A4\uB97C \uC783\uC5C8\uC744 \uB54C(onBlur) \uC989\uC2DC \uD3EC\uB9F7\uC744 \uAC80\uC0AC\uD558\uACE0, \uC720\uD6A8\uD560 \uB54C\uB294 \uCD08\uB85D\uC0C9 \uCCB4\uD06C \uC544\uC774\uCF58, \uC624\uB958 \uC2DC \uD544\uB4DC \uBC14\uB85C \uC544\uB798\uC5D0 \uAD6C\uCCB4\uC801\uC778 \uC218\uC815 \uAC00\uC774\uB4DC\uB97C \uBD89\uC740\uC0C9 \uD14D\uC2A4\uD2B8\uB85C \uB178\uCD9C\uD569\uB2C8\uB2E4.

### 4) \uD30C\uAD34\uC801 \uC791\uC5C5 \uC548\uC804\uC7A5\uCE58 (Confirmation Safeguard)
- '\uD504\uB85C\uC81D\uD2B8 \uC0AD\uC81C'\uB098 'API \uD0A4 \uC7AC\uC0DD\uC131' \uAC19\uC740 \uBCF5\uAD6C \uBD88\uAC00\uB2A5\uD55C \uC561\uC158\uC740 \uBE68\uAC04\uC0C9 Danger Card\uB85C \uBCC4\uB3C4 \uACA9\uB9AC\uD558\uBA70, \uBC18\uB4DC\uC2DC \uD655\uC778 \uBB38\uC790\uC5F4(\uC608: \`delete my-project\`)\uC744 \uC9C1\uC811 \uC785\uB825\uD574\uC57C\uB9CC \uBC84\uD2BC\uC774 \uD65C\uC131\uD654\uB429\uB2C8\uB2E4.
`
      }
    ]
  }
];

// lib/data/awesomeThemes.ts
var AWESOME_DESIGN_MD_THEMES = [
  {
    "id": "1win",
    "name": "1win Analysis",
    "category": "Fintech & Web3",
    "description": "An analysis of 1win's design language \u2014 a near-black crypto casino and sportsbook built on Inter at heavy weights, where a vivid green action color and an electric blue secondary carry every CTA across dense, full-bleed game-tile rails, pro",
    "designMdPath": "/design-md/1win/DESIGN.md",
    "color": {
      "primary": "#00b24b",
      "primaryHover": "#00b24b",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#141415",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#f0f2f5",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#2d2f33",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Inter",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 14,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 12,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "airbnb",
    "name": "Airbnb",
    "category": "Tech & Lifestyle",
    "description": "A warm, generous consumer marketplace anchored on a clean white canvas and Airbnb Rausch (#ff385c), the single brand voltage that carries every primary CTA, search-button orb, and rating dot. Type runs Airbnb Cereal VF at modest weights \u2014 d",
    "designMdPath": "/design-md/airbnb/DESIGN.md",
    "color": {
      "primary": "#ff385c",
      "primaryHover": "#ff385c",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#222222",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#dddddd",
      "borderStrong": "#c1c1c1",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "'Airbnb Cereal VF', Circular, -apple-system, system-ui, Roboto, 'Helvetica Neue', sans-serif",
      "h1": {
        "fontSize": 28,
        "lineHeight": 1.43,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 22,
        "lineHeight": 1.18,
        "fontWeight": 500,
        "letterSpacing": "-0.44px"
      },
      "h3": {
        "fontSize": 21,
        "lineHeight": 1.43,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 1.29,
        "fontWeight": 500,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "airtable",
    "name": "Airtable",
    "category": "Tech & Lifestyle",
    "description": "A sober, editorial workflow-software interface anchored on white canvas and dark-ink type, where brand voltage comes from full-bleed signature cards in coral, dark green, peach, and dark navy that punctuate long-scroll explainer pages. Prim",
    "designMdPath": "/design-md/airtable/DESIGN.md",
    "color": {
      "primary": "#181d26",
      "primaryHover": "#181d26",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#181d26",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#dddddd",
      "borderStrong": "#9297a0",
      "statusSuccess": "#006400",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Haas Groot Disp, Haas, sans-serif",
      "h1": {
        "fontSize": 48,
        "lineHeight": 1.1,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 40,
        "lineHeight": 1.2,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 1.2,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.35,
        "fontWeight": 500,
        "letterSpacing": "0.16px"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 1.35,
        "fontWeight": 500,
        "letterSpacing": "0.16px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "aljazeera",
    "name": "Al Jazeera Analysis",
    "category": "Tech & Lifestyle",
    "description": "An analysis of Al Jazeera's design language \u2014 a hard-news editorial system built on flat white paper and dense Roboto headline stacks, signed by one saturated orange used as logo block and section-eyebrow bar, punctuated by a live-red that ",
    "designMdPath": "/design-md/aljazeera/DESIGN.md",
    "color": {
      "primary": "#fa9000",
      "primaryHover": "#fa9000",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#d8d8d8",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Roboto",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 16,
        "lineHeight": 1,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "apple",
    "name": "Apple",
    "category": "Tech & Lifestyle",
    "description": "A photography-first interface that turns marketing into a museum gallery. Edge-to-edge product tiles alternate light and dark canvases, framed by SF Pro Display headlines with negative letter-spacing and a single Action Blue (#0066cc) inter",
    "designMdPath": "/design-md/apple/DESIGN.md",
    "color": {
      "primary": "#0066cc",
      "primaryHover": "#0071e3",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#1d1d1f",
      "textSecondary": "#cccccc",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e0e0e0",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "SF Pro Display, system-ui, -apple-system, sans-serif",
      "h1": {
        "fontSize": 56,
        "lineHeight": 1.07,
        "fontWeight": 600,
        "letterSpacing": "-0.28px"
      },
      "h2": {
        "fontSize": 40,
        "lineHeight": 1.1,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 34,
        "lineHeight": 1.47,
        "fontWeight": 600,
        "letterSpacing": "-0.374px"
      },
      "h4": {
        "fontSize": 28,
        "lineHeight": 1.14,
        "fontWeight": 400,
        "letterSpacing": "0.196px"
      },
      "h5": {
        "fontSize": 28,
        "lineHeight": 1.14,
        "fontWeight": 400,
        "letterSpacing": "0.196px"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 17,
        "lineHeight": 1.47,
        "fontWeight": 400,
        "letterSpacing": "-0.374px"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "-0.224px"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "-0.224px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "binance",
    "name": "Binance",
    "category": "Fintech & Web3",
    "description": "A confident financial-platform interface anchored on a deep near-black canvas, where Binance's iconic yellow (#FCD535) carries every primary CTA, brand accent, and value-claim moment. Type runs Binance's custom BinanceNova / BinancePlex sta",
    "designMdPath": "/design-md/binance/DESIGN.md",
    "color": {
      "primary": "#fcd535",
      "primaryHover": "#fcd535",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#181a20",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f4f6",
      "borderStrong": "#cdd1d6",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "BinanceNova, -apple-system, BlinkMacSystemFont, sans-serif",
      "h1": {
        "fontSize": 64,
        "lineHeight": 1.1,
        "fontWeight": 700,
        "letterSpacing": "-1px"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 1.1,
        "fontWeight": 700,
        "letterSpacing": "-0.5px"
      },
      "h3": {
        "fontSize": 40,
        "lineHeight": 1.15,
        "fontWeight": 600,
        "letterSpacing": "-0.3px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 13,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "bmw",
    "name": "BMW",
    "category": "Automotive & Luxury",
    "description": "BMW's corporate site \u2014 distinct from BMW M's motorsport-bombastic variant, this is a measured and settled corporate-automotive interface. On a light (cream-tinted white) canvas, BMW corporate blue (#1c69d4) carries every primary CTA; dark n",
    "designMdPath": "/design-md/bmw/DESIGN.md",
    "color": {
      "primary": "#1c69d4",
      "primaryHover": "#1c69d4",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#262626",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e6e6e6",
      "borderStrong": "#cccccc",
      "statusSuccess": "#22c55e",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "'BMW Type Next Latin', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      "h1": {
        "fontSize": 64,
        "lineHeight": 1.05,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 1.1,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 1.15,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 700,
        "letterSpacing": "0.5px"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.55,
        "fontWeight": 300,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0.5px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "bmw-m",
    "name": "BMW-M",
    "category": "Automotive & Luxury",
    "description": "A motorsport-engineering interface anchored on a near-black canvas with white BMW Type Next Latin display headlines in confident UPPERCASE. The brand carries no decorative voltage \u2014 its energy comes from full-bleed automotive photography (c",
    "designMdPath": "/design-md/bmw-m/DESIGN.md",
    "color": {
      "primary": "#ffffff",
      "primaryHover": "#ffffff",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#000000",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#ffffff",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#3c3c3c",
      "borderStrong": "#262626",
      "statusSuccess": "#0fa336",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f4b400"
    },
    "typography": {
      "fontFamily": "BMWTypeNextLatin, sans-serif",
      "h1": {
        "fontSize": 80,
        "lineHeight": 1,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.05,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 40,
        "lineHeight": 1.1,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 700,
        "letterSpacing": "1.5px"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 300,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0.5px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "bugatti",
    "name": "Bugatti",
    "category": "Automotive & Luxury",
    "description": "An austere luxury-automotive interface that uses near-pure black canvas, white uppercase letterspaced display, and full-bleed automotive photography as the only voltage. The system runs three custom Bugatti typefaces \u2014 Bugatti Display, Buga",
    "designMdPath": "/design-md/bugatti/DESIGN.md",
    "color": {
      "primary": "#ffffff",
      "primaryHover": "#ffffff",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#000000",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#ffffff",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#262626",
      "borderStrong": "#3a3a3a",
      "statusSuccess": "#5fa657",
      "statusDanger": "#f43f5e",
      "statusWarning": "#d4a017"
    },
    "typography": {
      "fontFamily": "Bugatti Display, sans-serif",
      "h1": {
        "fontSize": 64,
        "lineHeight": 1.1,
        "fontWeight": 400,
        "letterSpacing": "4px"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 1.15,
        "fontWeight": 400,
        "letterSpacing": "3px"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 1.2,
        "fontWeight": 400,
        "letterSpacing": "2px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 400,
        "letterSpacing": "2.5px"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "cal",
    "name": "Cal.com",
    "category": "Tech & Lifestyle",
    "description": "A clean, calendar-software-first interface anchored on white canvas with black primary CTAs and custom Cal Sans display typography. The system reads as friendly modern SaaS \u2014 generous whitespace, soft-rounded cards (~12px), product UI fragm",
    "designMdPath": "/design-md/cal/DESIGN.md",
    "color": {
      "primary": "#111111",
      "primaryHover": "#111111",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#111111",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e5e7eb",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Cal Sans, Inter, sans-serif",
      "h1": {
        "fontSize": 64,
        "lineHeight": 1.05,
        "fontWeight": 600,
        "letterSpacing": "-2px"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 1.1,
        "fontWeight": 600,
        "letterSpacing": "-1.5px"
      },
      "h3": {
        "fontSize": 36,
        "lineHeight": 1.15,
        "fontWeight": 600,
        "letterSpacing": "-1px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "claude",
    "name": "Claude",
    "category": "AI & LLM",
    "description": "A warm-canvas editorial interface for Anthropic's Claude product. The system anchors on a tinted cream canvas with serif display headlines, warm coral CTAs, and dark navy product surfaces (code editor mockups, model showcase cards). Brand v",
    "designMdPath": "/design-md/claude/DESIGN.md",
    "color": {
      "primary": "#cc785c",
      "primaryHover": "#cc785c",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#faf9f5",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#141413",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e6dfd8",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#5db872",
      "statusDanger": "#f43f5e",
      "statusWarning": "#d4a017"
    },
    "typography": {
      "fontFamily": "Copernicus, Tiempos Headline, serif",
      "h1": {
        "fontSize": 64,
        "lineHeight": 1.05,
        "fontWeight": 400,
        "letterSpacing": "-1.5px"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 1.1,
        "fontWeight": 400,
        "letterSpacing": "-1px"
      },
      "h3": {
        "fontSize": 36,
        "lineHeight": 1.15,
        "fontWeight": 400,
        "letterSpacing": "-0.5px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "clay",
    "name": "Clay",
    "category": "Tech & Lifestyle",
    "description": "A vibrant claymation-meets-data interface for Clay.com (GTM data-orchestration platform). Anchors on white canvas with dark-navy primary CTAs, custom rounded display type, and saturated single-color feature cards \u2014 hot pink, deep teal, lave",
    "designMdPath": "/design-md/clay/DESIGN.md",
    "color": {
      "primary": "#0a0a0a",
      "primaryHover": "#0a0a0a",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#fffaf0",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#0a0a0a",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e5e5e5",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#22c55e",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Plain Black, Inter, sans-serif",
      "h1": {
        "fontSize": 72,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "-2.5px"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.05,
        "fontWeight": 500,
        "letterSpacing": "-2px"
      },
      "h3": {
        "fontSize": 40,
        "lineHeight": 1.1,
        "fontWeight": 500,
        "letterSpacing": "-1px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "clickhouse",
    "name": "ClickHouse",
    "category": "Tech & Lifestyle",
    "description": "A high-performance database interface anchored on near-pure black canvas with electric yellow as the brand voltage. White typography in confident sans, yellow CTAs, and yellow-text stat numbers carry the brand voice across every page. Code ",
    "designMdPath": "/design-md/clickhouse/DESIGN.md",
    "color": {
      "primary": "#faff69",
      "primaryHover": "#faff69",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#0a0a0a",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#ffffff",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#2a2a2a",
      "borderStrong": "#3a3a3a",
      "statusSuccess": "#22c55e",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Inter, sans-serif",
      "h1": {
        "fontSize": 72,
        "lineHeight": 1.05,
        "fontWeight": 700,
        "letterSpacing": "-2.5px"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.1,
        "fontWeight": 700,
        "letterSpacing": "-2px"
      },
      "h3": {
        "fontSize": 40,
        "lineHeight": 1.15,
        "fontWeight": 700,
        "letterSpacing": "-1.5px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "cohere",
    "name": "Cohere",
    "category": "AI & LLM",
    "description": "Cohere's 2026 web system is a controlled enterprise AI interface built from stark white editorial space, deep green-black product bands, soft mineral surfaces, rounded media cards, and a distinctive type split between monospaced-feeling dis",
    "designMdPath": "/design-md/cohere/DESIGN.md",
    "color": {
      "primary": "#17171c",
      "primaryHover": "#17171c",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#212121",
      "textSecondary": "#616161",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#d9d9dd",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "CohereText",
      "h1": {
        "fontSize": 96,
        "lineHeight": 1,
        "fontWeight": 400,
        "letterSpacing": "-1.92px"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.71,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "coinbase",
    "name": "Coinbase",
    "category": "Fintech & Web3",
    "description": "An institutional-grade crypto exchange whose marketing surfaces read like a quietly-confident financial-services brand. The base canvas is pure white; Coinbase Blue (`#0052ff`) is the single brand voltage, used scarcely on primary CTAs, sig",
    "designMdPath": "/design-md/coinbase/DESIGN.md",
    "color": {
      "primary": "#0052ff",
      "primaryHover": "#0052ff",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#0a0b0d",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#dee1e6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "'Coinbase Display', sans-serif",
      "h1": {
        "fontSize": 64,
        "lineHeight": 1,
        "fontWeight": 400,
        "letterSpacing": "-1.6px"
      },
      "h2": {
        "fontSize": 52,
        "lineHeight": 1,
        "fontWeight": 400,
        "letterSpacing": "-1.3px"
      },
      "h3": {
        "fontSize": 44,
        "lineHeight": 1.09,
        "fontWeight": 400,
        "letterSpacing": "-1px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 16,
        "lineHeight": 1.15,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "composio",
    "name": "Composio",
    "category": "Tech & Lifestyle",
    "description": "A developer-tools brand for AI-agent tool integration whose marketing surfaces lean into a dark, technical aesthetic with a single deep-electric-blue voltage (`#0007cd`). The page floor is near-black (`#0f0f0f`); cards float above on subtle",
    "designMdPath": "/design-md/composio/DESIGN.md",
    "color": {
      "primary": "#0007cd",
      "primaryHover": "#0007cd",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#0f0f0f",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#ffffff",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#222222",
      "borderStrong": "#333333",
      "statusSuccess": "#33d17a",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "'abcDiatype', ui-sans-serif, system-ui, sans-serif",
      "h1": {
        "fontSize": 56,
        "lineHeight": 1.05,
        "fontWeight": 500,
        "letterSpacing": "-1.68px"
      },
      "h2": {
        "fontSize": 44,
        "lineHeight": 1.1,
        "fontWeight": 500,
        "letterSpacing": "-1.32px"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 1.15,
        "fontWeight": 500,
        "letterSpacing": "-0.96px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "cursor",
    "name": "Cursor",
    "category": "Developer Tools",
    "description": "An AI-first code editor whose marketing site reads like a quietly-confident developer-tools brand with a warm-cream editorial canvas (`#f7f7f4`) instead of the typical dark IDE atmosphere. Near-black warm ink (`#26251e`) carries body and di",
    "designMdPath": "/design-md/cursor/DESIGN.md",
    "color": {
      "primary": "#f54e00",
      "primaryHover": "#f54e00",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#f7f7f4",
      "bgSecondary": "#fafaf7",
      "textPrimary": "#26251e",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e6e5e0",
      "borderStrong": "#cfcdc4",
      "statusSuccess": "#1f8a65",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "'CursorGothic', sans-serif",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 400,
        "letterSpacing": "-0.72px"
      },
      "h2": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 400,
        "letterSpacing": "-0.72px"
      },
      "h3": {
        "fontSize": 26,
        "lineHeight": 1.25,
        "fontWeight": 400,
        "letterSpacing": "-0.325px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "dell-1996",
    "name": "Dell 1996 Inspired",
    "category": "Tech & Lifestyle",
    "description": `An inspired interpretation of Dell.com's 1996 design language \u2014 a catalog-era enterprise web design built around a literal black page frame, vivid flat color-block \\"ribbon cards\\" tinted in sage, salmon, periwinkle, sky, peach and lime, ch`,
    "designMdPath": "/design-md/dell-1996/DESIGN.md",
    "color": {
      "primary": "#e91d2a",
      "primaryHover": "#e91d2a",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f4f6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Times New Roman",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 12,
        "lineHeight": 1,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 14,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 12,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.35,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "dji",
    "name": "DJI Analysis",
    "category": "Automotive & Luxury",
    "description": "An analysis of DJI's design language \u2014 a product-photography showroom for drones and cameras, where full-bleed studio renders sit in square, gutter-separated tiles on a white canvas, every action is a rounded pill in a single engineering bl",
    "designMdPath": "/design-md/dji/DESIGN.md",
    "color": {
      "primary": '#0070d5"          # DJI Blue \u2014 Store pill, Buy Now pills, active selector, announcement link',
      "primaryHover": '#0070d5"          # DJI Blue \u2014 Store pill, Buy Now pills, active selector, announcement link',
      "primaryLight": "#e8f3ff",
      "bgPrimary": '#ffffff"           # page canvas, cards, nav, purchase bar',
      "bgSecondary": '#f7f9fa"      # feature-link band, store panels, In the Box tiles, store footer',
      "textPrimary": '#262626"              # headings and body (black at 85%)',
      "textSecondary": '#595959"    # secondary text, inactive tabs (black at 65%)',
      "textMuted": '#8c8c8c"     # tile eyebrows (black at 45%)',
      "borderSubtle": '#f0f0f0"         # tab track rule',
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Open Sans",
      "h1": {
        "fontSize": 48,
        "lineHeight": 1.08,
        "fontWeight": 600,
        "letterSpacing": "-1.44px"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 20,
        "lineHeight": 1.2,
        "fontWeight": 600,
        "letterSpacing": "-0.6px"
      },
      "h5": {
        "fontSize": 20,
        "lineHeight": 1.2,
        "fontWeight": 600,
        "letterSpacing": "-0.6px"
      },
      "h6": {
        "fontSize": 16,
        "lineHeight": 1.25,
        "fontWeight": 400,
        "letterSpacing": "-0.32px"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "-0.32px"
      },
      "sm": {
        "fontSize": 12,
        "lineHeight": 1.33,
        "fontWeight": 400,
        "letterSpacing": "-0.24px"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.33,
        "fontWeight": 400,
        "letterSpacing": "-0.24px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "elevenlabs",
    "name": "ElevenLabs",
    "category": "AI & LLM",
    "description": "A voice-AI brand whose marketing surfaces read like a quietly editorial print magazine. The base canvas is off-white (`#f5f5f5`) holding warm near-black ink (`#292524`); the brand voltage is photographic, not chromatic \u2014 soft pastel atmosph",
    "designMdPath": "/design-md/elevenlabs/DESIGN.md",
    "color": {
      "primary": "#292524",
      "primaryHover": "#292524",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#f5f5f5",
      "bgSecondary": "#fafafa",
      "textPrimary": "#0c0a09",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e7e5e4",
      "borderStrong": "#d6d3d1",
      "statusSuccess": "#16a34a",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "'Waldenburg', serif",
      "h1": {
        "fontSize": 48,
        "lineHeight": 1.08,
        "fontWeight": 300,
        "letterSpacing": "-0.96px"
      },
      "h2": {
        "fontSize": 36,
        "lineHeight": 1.17,
        "fontWeight": 300,
        "letterSpacing": "-0.36px"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 1.13,
        "fontWeight": 300,
        "letterSpacing": "-0.32px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 15,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 15,
        "lineHeight": 1.47,
        "fontWeight": 400,
        "letterSpacing": "0.15px"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "expo",
    "name": "Expo",
    "category": "Developer Tools",
    "description": "A React Native developer-platform whose marketing site reads like a quietly-confident infrastructure brand. The base canvas is pure white with a soft sky-blue gradient atmospheric wash behind the hero; near-black ink (`#171717`) carries bod",
    "designMdPath": "/design-md/expo/DESIGN.md",
    "color": {
      "primary": "#000000",
      "primaryHover": "#000000",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#fafafa",
      "textPrimary": "#171717",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f0f0f3",
      "borderStrong": "#dcdee0",
      "statusSuccess": "#16a34a",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "h1": {
        "fontSize": 48,
        "lineHeight": 1.1,
        "fontWeight": 600,
        "letterSpacing": "-1.44px"
      },
      "h2": {
        "fontSize": 36,
        "lineHeight": 1.15,
        "fontWeight": 600,
        "letterSpacing": "-1.08px"
      },
      "h3": {
        "fontSize": 28,
        "lineHeight": 1.2,
        "fontWeight": 600,
        "letterSpacing": "-0.84px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "ferrari",
    "name": "Ferrari",
    "category": "Automotive & Luxury",
    "description": "A luxury-automotive brand whose marketing surfaces read as cinematic editorial. The base canvas is **near-black** (`#181818`) holding pure white display type; white-canvas bands appear only inside specific editorial contexts (preowned listi",
    "designMdPath": "/design-md/ferrari/DESIGN.md",
    "color": {
      "primary": "#da291c",
      "primaryHover": "#9d2211",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#181818",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#ffffff",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#303030",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#03904a",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f13a2c"
    },
    "typography": {
      "fontFamily": "'FerrariSans', sans-serif",
      "h1": {
        "fontSize": 56,
        "lineHeight": 1.1,
        "fontWeight": 500,
        "letterSpacing": "-1.12px"
      },
      "h2": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 500,
        "letterSpacing": "-0.36px"
      },
      "h3": {
        "fontSize": 26,
        "lineHeight": 1.5,
        "fontWeight": 500,
        "letterSpacing": "0.195px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 700,
        "letterSpacing": "1.4px"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 13,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "figma",
    "name": "Figma",
    "category": "Developer Tools",
    "description": "A confident black-and-white editorial frame interrupted by oversized, hand-cut pastel color blocks. The marketing canvas is rigorously monochrome \u2014 figmaSans variable type, pure white surfaces, pure black ink, pill-shaped CTAs \u2014 while each ",
    "designMdPath": "/design-md/figma/DESIGN.md",
    "color": {
      "primary": "#000000",
      "primaryHover": "#000000",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e6e6e6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#1ea64a",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "figmaSans",
      "h1": {
        "fontSize": 86,
        "lineHeight": 1,
        "fontWeight": 340,
        "letterSpacing": "-1.72px"
      },
      "h2": {
        "fontSize": 64,
        "lineHeight": 1.1,
        "fontWeight": 340,
        "letterSpacing": "-0.96px"
      },
      "h3": {
        "fontSize": 26,
        "lineHeight": 1.35,
        "fontWeight": 540,
        "letterSpacing": "-0.26px"
      },
      "h4": {
        "fontSize": 24,
        "lineHeight": 1.45,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 26,
        "lineHeight": 1.35,
        "fontWeight": 340,
        "letterSpacing": "-0.26px"
      },
      "h6": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 480,
        "letterSpacing": "-0.10px"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.45,
        "fontWeight": 320,
        "letterSpacing": "-0.26px"
      },
      "sm": {
        "fontSize": 16,
        "lineHeight": 1.45,
        "fontWeight": 330,
        "letterSpacing": "-0.14px"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1,
        "fontWeight": 400,
        "letterSpacing": "0.60px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "framer",
    "name": "Framer",
    "category": "Developer Tools",
    "description": "A confident dark-canvas builder marketing site that treats the page like a working artboard \u2014 pure black surfaces, white display type set in GT Walsheim Medium with aggressive negative tracking, and a single confident blue (#0099ff) reserve",
    "designMdPath": "/design-md/framer/DESIGN.md",
    "color": {
      "primary": "#ffffff",
      "primaryHover": "#ffffff",
      "primaryLight": "#141414",
      "bgPrimary": "#090909",
      "bgSecondary": "#141414",
      "textPrimary": "#ffffff",
      "textSecondary": "#999999",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#262626",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#22c55e",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "GT Walsheim Medium",
      "h1": {
        "fontSize": 85,
        "lineHeight": 0.95,
        "fontWeight": 500,
        "letterSpacing": "-4.25px"
      },
      "h2": {
        "fontSize": 62,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "-3.1px"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 1.13,
        "fontWeight": 500,
        "letterSpacing": "-1.0px"
      },
      "h4": {
        "fontSize": 24,
        "lineHeight": 1.3,
        "fontWeight": 400,
        "letterSpacing": "-0.01px"
      },
      "h5": {
        "fontSize": 24,
        "lineHeight": 1.3,
        "fontWeight": 400,
        "letterSpacing": "-0.01px"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "-0.14px"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.3,
        "fontWeight": 400,
        "letterSpacing": "-0.15px"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "-0.14px"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.2,
        "fontWeight": 500,
        "letterSpacing": "-0.13px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "hashicorp",
    "name": "HashiCorp",
    "category": "Tech & Lifestyle",
    "description": "An enterprise-infrastructure marketing canvas built around a near-black ground (#000000) and a system of per-product accent colors \u2014 Terraform purple, Vault yellow, Consul pink, Waypoint cyan, Vagrant blue \u2014 that act as identity tokens rath",
    "designMdPath": "/design-md/hashicorp/DESIGN.md",
    "color": {
      "primary": "#000000",
      "primaryHover": "#000000",
      "primaryLight": "#15181e",
      "bgPrimary": "#000000",
      "bgSecondary": "#15181e",
      "textPrimary": "#ffffff",
      "textSecondary": "#b2b6bd",
      "textMuted": "#656a76",
      "borderSubtle": "#3b3d45",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#00ca8e",
      "statusDanger": "#f43f5e",
      "statusWarning": "#ffcf25"
    },
    "typography": {
      "fontFamily": "hashicorpSans",
      "h1": {
        "fontSize": 80,
        "lineHeight": 1.17,
        "fontWeight": 700,
        "letterSpacing": "-2.5px"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.18,
        "fontWeight": 700,
        "letterSpacing": "-1.6px"
      },
      "h3": {
        "fontSize": 40,
        "lineHeight": 1.19,
        "fontWeight": 600,
        "letterSpacing": "-1.0px"
      },
      "h4": {
        "fontSize": 22,
        "lineHeight": 1.18,
        "fontWeight": 600,
        "letterSpacing": "-0.4px"
      },
      "h5": {
        "fontSize": 20,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.2px"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.29,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 1.5,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.71,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.38,
        "fontWeight": 500,
        "letterSpacing": "0.2px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "hp",
    "name": "HP",
    "category": "Tech & Lifestyle",
    "description": "An inspired interpretation of HP's design language \u2014 a white-paper enterprise-consumer system anchored by HP Electric Blue (`#024ad8`) as the lone signal CTA, near-black ink (`#1a1a1a`) for headlines, geometric Forma-DJR sans throughout, an",
    "designMdPath": "/design-md/hp/DESIGN.md",
    "color": {
      "primary": "#024ad8",
      "primaryHover": "#0e3191",
      "primaryLight": "#c9e0fc",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#1a1a1a",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e8e8e8",
      "borderStrong": "#c2c2c2",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Forma DJR Micro",
      "h1": {
        "fontSize": 56,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 44,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.33,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 13,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "ibm",
    "name": "IBM",
    "category": "Tech & Lifestyle",
    "description": "An enterprise-marketing canvas faithful to Carbon Design System: white surfaces, charcoal type, IBM Blue (#0f62fe) as the single confident accent, and a deliberately flat-square aesthetic where corners stay at 0\u20134px. Type runs IBM Plex Sans",
    "designMdPath": "/design-md/ibm/DESIGN.md",
    "color": {
      "primary": "#0f62fe",
      "primaryHover": "#0f62fe",
      "primaryLight": "#f4f4f4",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f4f4f4",
      "textPrimary": "#161616",
      "textSecondary": "#525252",
      "textMuted": "#8c8c8c",
      "borderSubtle": "#e0e0e0",
      "borderStrong": "#161616",
      "statusSuccess": "#24a148",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f1c21b"
    },
    "typography": {
      "fontFamily": "IBM Plex Sans",
      "h1": {
        "fontSize": 76,
        "lineHeight": 1.17,
        "fontWeight": 300,
        "letterSpacing": "-0.5px"
      },
      "h2": {
        "fontSize": 60,
        "lineHeight": 1.17,
        "fontWeight": 300,
        "letterSpacing": "-0.4px"
      },
      "h3": {
        "fontSize": 42,
        "lineHeight": 1.2,
        "fontWeight": 300,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 24,
        "lineHeight": 1.33,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.29,
        "fontWeight": 400,
        "letterSpacing": "0.16px"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0.16px"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.29,
        "fontWeight": 400,
        "letterSpacing": "0.16px"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.33,
        "fontWeight": 400,
        "letterSpacing": "0.32px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "intercom",
    "name": "Intercom",
    "category": "Tech & Lifestyle",
    "description": "An editorial customer-service marketing canvas built around a soft cream-white ground, charcoal type set in Saans (Intercom's proprietary geometric sans), and a single confident Fin Orange (#ff5600) reserved for the Fin AI brand. Cards live",
    "designMdPath": "/design-md/intercom/DESIGN.md",
    "color": {
      "primary": "#111111",
      "primaryHover": "#111111",
      "primaryLight": "#ffffff",
      "bgPrimary": "#f5f1ec",
      "bgSecondary": "#ffffff",
      "textPrimary": "#111111",
      "textSecondary": "#626260",
      "textMuted": "#7b7b78",
      "borderSubtle": "#d3cec6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#0bdf50",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Saans",
      "h1": {
        "fontSize": 72,
        "lineHeight": 1.05,
        "fontWeight": 500,
        "letterSpacing": "-2.0px"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.1,
        "fontWeight": 500,
        "letterSpacing": "-1.4px"
      },
      "h3": {
        "fontSize": 40,
        "lineHeight": 1.15,
        "fontWeight": 500,
        "letterSpacing": "-0.8px"
      },
      "h4": {
        "fontSize": 22,
        "lineHeight": 1.25,
        "fontWeight": 500,
        "letterSpacing": "-0.3px"
      },
      "h5": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "-0.2px"
      },
      "h6": {
        "fontSize": 15,
        "lineHeight": 1.2,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "jobright",
    "name": "Jobright Analysis",
    "category": "Tech & Lifestyle",
    "description": "An analysis of Jobright's design language \u2014 an AI job-hunting platform built on an energetic spring-mint green against black and white, with pale-mint section bands carrying the page rhythm. Bold condensed Titillium Web display headings pai",
    "designMdPath": "/design-md/jobright/DESIGN.md",
    "color": {
      "primary": "#00f0a0",
      "primaryHover": "#00f0a0",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e5e7eb",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Inter",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 16,
        "lineHeight": 1,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.6,
        "fontWeight": 300,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "linear.app",
    "name": "Linear",
    "category": "Developer Tools",
    "description": "A near-black product-focused marketing canvas built around #010102 (the deepest dark surface of any tool in this collection), light gray text (#f7f8f8), and the signature Linear lavender-blue (#5e6ad2) used as the single chromatic accent. T",
    "designMdPath": "/design-md/linear.app/DESIGN.md",
    "color": {
      "primary": "#5e6ad2",
      "primaryHover": "#828fff",
      "primaryLight": "#0f1011",
      "bgPrimary": "#010102",
      "bgSecondary": "#0f1011",
      "textPrimary": "#f7f8f8",
      "textSecondary": "#d0d6e0",
      "textMuted": "#8a8f98",
      "borderSubtle": "#23252a",
      "borderStrong": "#34343a",
      "statusSuccess": "#27a644",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Linear Display",
      "h1": {
        "fontSize": 80,
        "lineHeight": 1.05,
        "fontWeight": 600,
        "letterSpacing": "-3.0px"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.1,
        "fontWeight": 600,
        "letterSpacing": "-1.8px"
      },
      "h3": {
        "fontSize": 40,
        "lineHeight": 1.15,
        "fontWeight": 600,
        "letterSpacing": "-1.0px"
      },
      "h4": {
        "fontSize": 22,
        "lineHeight": 1.25,
        "fontWeight": 500,
        "letterSpacing": "-0.4px"
      },
      "h5": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "-0.2px"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.2,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "-0.05px"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "mercury",
    "name": "Mercury Analysis",
    "category": "Fintech & Web3",
    "description": "An analysis of Mercury's design language \u2014 a fintech system that moves between a deep ink-violet night world on the homepage and a pale, near-white light world on its product and pricing pages, held together by one confident indigo action p",
    "designMdPath": "/design-md/mercury/DESIGN.md",
    "color": {
      "primary": "#5266eb",
      "primaryHover": "#5266eb",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#fbfcfd",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#28253b",
      "textSecondary": "#554e7b",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f4f6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "arcadia",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 24,
        "lineHeight": 1.2,
        "fontWeight": 480,
        "letterSpacing": "0.48px"
      },
      "h5": {
        "fontSize": 24,
        "lineHeight": 1.2,
        "fontWeight": 480,
        "letterSpacing": "0.48px"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "0.28px"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 13,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "meta",
    "name": "Meta",
    "category": "Tech & Lifestyle",
    "description": "Meta's design system spans hardware commerce (Quest VR, Ray-Ban Meta AI glasses) and brand surfaces with a confident product-merchandising voice. The system pairs a stark white canvas with full-bleed photographic product cards, a confident ",
    "designMdPath": "/design-md/meta/DESIGN.md",
    "color": {
      "primary": "#0064e0",
      "primaryHover": "#0457cb",
      "primaryLight": "#0091ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#1c1e21",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#ced0d4",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#31a24c",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f7b928"
    },
    "typography": {
      "fontFamily": "Optimistic VF",
      "h1": {
        "fontSize": 64,
        "lineHeight": 1.16,
        "fontWeight": 500,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 1.17,
        "fontWeight": 500,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 36,
        "lineHeight": 1.28,
        "fontWeight": 500,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 28,
        "lineHeight": 1.21,
        "fontWeight": 300,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 24,
        "lineHeight": 1.25,
        "fontWeight": 500,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "-0.14px"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.33,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "minimax",
    "name": "MiniMax",
    "category": "AI & LLM",
    "description": "MiniMax presents itself as a premium AI infrastructure brand through a striking duality \u2014 bold black-pill CTAs and stark white canvas for marketing, paired with vibrant gradient product cards (orange-red, magenta-pink, purple, blue) that tu",
    "designMdPath": "/design-md/minimax/DESIGN.md",
    "color": {
      "primary": "#0a0a0a",
      "primaryHover": "#0a0a0a",
      "primaryLight": "#181e25",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#0a0a0a",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e5e7eb",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "DM Sans",
      "h1": {
        "fontSize": 80,
        "lineHeight": 1.1,
        "fontWeight": 600,
        "letterSpacing": "-2px"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.1,
        "fontWeight": 600,
        "letterSpacing": "-1.5px"
      },
      "h3": {
        "fontSize": 40,
        "lineHeight": 1.2,
        "fontWeight": 600,
        "letterSpacing": "-1px"
      },
      "h4": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 24,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.7,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "mintlify",
    "name": "Mintlify",
    "category": "Developer Tools",
    "description": "Mintlify presents documentation infrastructure with a dual-mode aesthetic \u2014 atmospheric sky-gradient marketing heroes (cloud illustration backdrops, soft cream-to-blue washes) paired with dense developer-grade documentation surfaces. The sy",
    "designMdPath": "/design-md/mintlify/DESIGN.md",
    "color": {
      "primary": "#0a0a0a",
      "primaryHover": "#0a0a0a",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#0a0a0a",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e5e5e5",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Inter",
      "h1": {
        "fontSize": 72,
        "lineHeight": 1.05,
        "fontWeight": 600,
        "letterSpacing": "-2px"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.1,
        "fontWeight": 600,
        "letterSpacing": "-1.5px"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "miro",
    "name": "Miro",
    "category": "Tech & Lifestyle",
    "description": "Miro presents itself as the AI-powered visual workspace through a confident, almost playful brand voice \u2014 anchored by its signature canary yellow ({colors.brand-yellow}) wordmark over white canvas, broken open by colorful pastel feature tin",
    "designMdPath": "/design-md/miro/DESIGN.md",
    "color": {
      "primary": "#1c1c1e",
      "primaryHover": "#1c1c1e",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#1c1c1e",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e0e2e8",
      "borderStrong": "#c7cad5",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Roobert PRO",
      "h1": {
        "fontSize": 80,
        "lineHeight": 1.05,
        "fontWeight": 500,
        "letterSpacing": "-2px"
      },
      "h2": {
        "fontSize": 60,
        "lineHeight": 1.1,
        "fontWeight": 500,
        "letterSpacing": "-1.5px"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "mistral.ai",
    "name": "Mistral-AI",
    "category": "AI & LLM",
    "description": 'Mistral AI brands itself with a singular signature \u2014 atmospheric sunset gradients (mustard, orange, deep red) layered over photography of mountains, plus a horizontal \\"sunset stripe\\" bar that closes every page. The system pairs warm cream',
    "designMdPath": "/design-md/mistral.ai/DESIGN.md",
    "color": {
      "primary": "#fa520f",
      "primaryHover": "#cc3a05",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#1f1f1f",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e5e5e5",
      "borderStrong": "#c7c7c7",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "PP Editorial Old",
      "h1": {
        "fontSize": 84,
        "lineHeight": 1.05,
        "fontWeight": 400,
        "letterSpacing": "-1.5px"
      },
      "h2": {
        "fontSize": 64,
        "lineHeight": 1.1,
        "fontWeight": 400,
        "letterSpacing": "-1px"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "mongodb",
    "name": "MongoDB",
    "category": "Tech & Lifestyle",
    "description": "MongoDB carries a strong dual-mode visual identity \u2014 dark deep-teal hero bands with bright MongoDB green ({colors.brand-green}) CTAs paired with stark white documentation surfaces. The signature green pill button is unmistakable across prod",
    "designMdPath": "/design-md/mongodb/DESIGN.md",
    "color": {
      "primary": "#00ed64",
      "primaryHover": "#00b545",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#001e2b",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e1e5e8",
      "borderStrong": "#c1ccd6",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Euclid Circular A",
      "h1": {
        "fontSize": 72,
        "lineHeight": 1.1,
        "fontWeight": 500,
        "letterSpacing": "-1.5px"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.15,
        "fontWeight": 500,
        "letterSpacing": "-1px"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "mydealz",
    "name": "mydealz Analysis",
    "category": "Tech & Lifestyle",
    "description": "An analysis of mydealz's design language \u2014 a high-density German deals-community system built on a confident brand green, where a stacked white-card feed carries thousands of deals and every card wears the signature hot/cold temperature con",
    "designMdPath": "/design-md/mydealz/DESIGN.md",
    "color": {
      "primary": "#30a83c",
      "primaryHover": "#30a83c",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#f3f5f7",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#dfe1e4",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Averta CY",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 24,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 18,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 1.5,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 12,
        "lineHeight": 1.3,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.3,
        "fontWeight": 500,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "nerdwallet",
    "name": "NerdWallet Analysis",
    "category": "Fintech & Web3",
    "description": "An analysis of NerdWallet's design language \u2014 a personal-finance comparison platform built almost entirely from one deep green and a ladder of mints beneath it. Editorial pages open on a green gradient band, then drop to near-white where de",
    "designMdPath": "/design-md/nerdwallet/DESIGN.md",
    "color": {
      "primary": "#008254",
      "primaryHover": "#006642",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f7f7f7",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#ebebec",
      "borderStrong": "#d8d9da",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Gotham",
      "h1": {
        "fontSize": 52,
        "lineHeight": 1.15,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 40,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 12,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 12,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.5,
        "fontWeight": 300,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 300,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "nike",
    "name": "Nike",
    "category": "Tech & Lifestyle",
    "description": "|",
    "designMdPath": "/design-md/nike/DESIGN.md",
    "color": {
      "primary": "#111111",
      "primaryHover": "#111111",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#111111",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#cacacb",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#007d48",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": '"Pretendard Variable", Pretendard, system-ui, sans-serif',
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 32,
        "lineHeight": 1.2,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 24,
        "lineHeight": 1.2,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 16,
        "lineHeight": 1.75,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 13,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "nintendo-2001",
    "name": "Nintendo.com (2001) Analysis",
    "category": "Tech & Lifestyle",
    "description": `An analysis of Nintendo.com's 2001 design language \u2014 a brushed-periwinkle \\"console chrome\\" interface where every panel is a beveled metal plate, navigation glows amber over a halftone-dotted carbon bar, and bold outlined display type sits`,
    "designMdPath": "/design-md/nintendo-2001/DESIGN.md",
    "color": {
      "primary": '#e60012"          # Nintendo Red \u2014 racetrack logo, alert',
      "primaryHover": '#e60012"          # Nintendo Red \u2014 racetrack logo, alert',
      "primaryLight": "#e8f3ff",
      "bgPrimary": '#7a8aba"           # Periwinkle metallic \u2014 primary interface body',
      "bgSecondary": '#9fbee7"      # Pale Sky \u2014 secondary-nav strip, light inset panels',
      "textPrimary": '#21242e"              # primary text on light',
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": '#5a5f8c"         # blended bevel divider',
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Arial",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 12,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 13,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 10,
        "lineHeight": 1.3,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "notion",
    "name": "Notion",
    "category": "Tech & Lifestyle",
    "description": "Notion presents itself as the all-in-one workspace through a confident, illustration-rich brand voice \u2014 anchored by a deep navy hero band ({colors.brand-navy}) decorated with brand-colored sticky-note dots and mesh wire illustrations, a sig",
    "designMdPath": "/design-md/notion/DESIGN.md",
    "color": {
      "primary": "#5645d4",
      "primaryHover": "#3a2a99",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#1a1a1a",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e5e3df",
      "borderStrong": "#c8c4be",
      "statusSuccess": "#1aae39",
      "statusDanger": "#f43f5e",
      "statusWarning": "#dd5b00"
    },
    "typography": {
      "fontFamily": "Notion Sans",
      "h1": {
        "fontSize": 80,
        "lineHeight": 1.05,
        "fontWeight": 600,
        "letterSpacing": "-2px"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.1,
        "fontWeight": 600,
        "letterSpacing": "-1px"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "nvidia",
    "name": "NVIDIA",
    "category": "Tech & Lifestyle",
    "description": "|",
    "designMdPath": "/design-md/nvidia/DESIGN.md",
    "color": {
      "primary": "#76b900",
      "primaryHover": "#76b900",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#cccccc",
      "borderStrong": "#5e5e5e",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#df6500"
    },
    "typography": {
      "fontFamily": "NVIDIA-EMEA",
      "h1": {
        "fontSize": 48,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 36,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.75,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 17,
        "lineHeight": 1.47,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 18,
        "lineHeight": 1.4,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 15,
        "lineHeight": 1.67,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "ollama",
    "name": "Ollama",
    "category": "AI & LLM",
    "description": "|",
    "designMdPath": "/design-md/ollama/DESIGN.md",
    "color": {
      "primary": "#000000",
      "primaryHover": "#000000",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e5e5e5",
      "borderStrong": "#d4d4d4",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "SF Pro Rounded",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.11,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 30,
        "lineHeight": 1.2,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 24,
        "lineHeight": 1.33,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 18,
        "lineHeight": 1.56,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "opencode.ai",
    "name": "OpenCode",
    "category": "AI & LLM",
    "description": "|",
    "designMdPath": "/design-md/opencode.ai/DESIGN.md",
    "color": {
      "primary": "#201d1d",
      "primaryHover": "#201d1d",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#fdfcfc",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#201d1d",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "rgba(15,0,0,0.12)",
      "borderStrong": "#646262",
      "statusSuccess": "#30d158",
      "statusDanger": "#ff3b30",
      "statusWarning": "#ff9f0a"
    },
    "typography": {
      "fontFamily": "Berkeley Mono",
      "h1": {
        "fontSize": 38,
        "lineHeight": 1.5,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 16,
        "lineHeight": 1.5,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 13,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "oracle",
    "name": "Oracle Analysis",
    "category": "Tech & Lifestyle",
    "description": "An analysis of Oracle's design language \u2014 an enterprise system built on a warm neutral ladder rather than a colour palette. Six numbered greys carry almost every surface, a single dark charcoal carries every action, and the famous red is he",
    "designMdPath": "/design-md/oracle/DESIGN.md",
    "color": {
      "primary": "#312d2a",
      "primaryHover": "#312d2a",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#fbf9f8",
      "textPrimary": "#161513",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e4e1dd",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Oracle Sans",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 33.6,
        "fontWeight": 800,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 24,
        "lineHeight": 28.8,
        "fontWeight": 800,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 20,
        "lineHeight": 24,
        "fontWeight": 800,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 24,
        "lineHeight": 33.6,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 16.8,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 22.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 12,
        "lineHeight": 20,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 20,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "oura",
    "name": "Oura Analysis",
    "category": "Tech & Lifestyle",
    "description": "An analysis of Oura's design language \u2014 a warm-paper wellness system that pairs a high-contrast Editorial serif with a quiet grotesque sans, wraps every surface in a cream-and-earth palette drawn from mustard, clay and olive, and drives con",
    "designMdPath": "/design-md/oura/DESIGN.md",
    "color": {
      "primary": "#2a72de",
      "primaryHover": "#2a72de",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#f7f1e8",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#1c1b1a",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e1dcd3",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "AkkuratLL",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 80,
        "lineHeight": 1.1,
        "fontWeight": 300,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 24,
        "lineHeight": 1.25,
        "fontWeight": 100,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 24,
        "lineHeight": 1.25,
        "fontWeight": 100,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 16,
        "lineHeight": 1,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 16,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "pinterest",
    "name": "Pinterest",
    "category": "Tech & Lifestyle",
    "description": "|",
    "designMdPath": "/design-md/pinterest/DESIGN.md",
    "color": {
      "primary": "#e60023",
      "primaryHover": "#e60023",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#dadad3",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Pin Sans",
      "h1": {
        "fontSize": 70,
        "lineHeight": 1.1,
        "fontWeight": 600,
        "letterSpacing": "-1.2px"
      },
      "h2": {
        "fontSize": 44,
        "lineHeight": 1.15,
        "fontWeight": 700,
        "letterSpacing": "-0.8px"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.25,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "playstation",
    "name": "PlayStation",
    "category": "Tech & Lifestyle",
    "description": "|",
    "designMdPath": "/design-md/playstation/DESIGN.md",
    "color": {
      "primary": "#0070d1",
      "primaryHover": "#0070d1",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f4f6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#c81b3a"
    },
    "typography": {
      "fontFamily": "PlayStation SST",
      "h1": {
        "fontSize": 54,
        "lineHeight": 1.25,
        "fontWeight": 300,
        "letterSpacing": "-0.1px"
      },
      "h2": {
        "fontSize": 44,
        "lineHeight": 1.25,
        "fontWeight": 300,
        "letterSpacing": "0.1px"
      },
      "h3": {
        "fontSize": 35,
        "lineHeight": 1.25,
        "fontWeight": 300,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 16,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "posthog",
    "name": "PostHog",
    "category": "Tech & Lifestyle",
    "description": "|",
    "designMdPath": "/design-md/posthog/DESIGN.md",
    "color": {
      "primary": "#f7a501",
      "primaryHover": "#f7a501",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#eeefe9",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#23251d",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#bfc1b7",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "IBM Plex Sans Variable",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.5,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 24,
        "lineHeight": 1.33,
        "fontWeight": 800,
        "letterSpacing": "-0.6px"
      },
      "h3": {
        "fontSize": 21,
        "lineHeight": 1.4,
        "fontWeight": 700,
        "letterSpacing": "-0.5px"
      },
      "h4": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 18,
        "lineHeight": 1.5,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 15,
        "lineHeight": 1.71,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "raycast",
    "name": "Raycast",
    "category": "Developer Tools",
    "description": "|",
    "designMdPath": "/design-md/raycast/DESIGN.md",
    "color": {
      "primary": "#ffffff",
      "primaryHover": "#ffffff",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#07080a",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#f4f4f6",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#242728",
      "borderStrong": "rgba(255,255,255,0.16)",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Inter",
      "h1": {
        "fontSize": 64,
        "lineHeight": 1.1,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.17,
        "fontWeight": 500,
        "letterSpacing": "0.2px"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.15,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.2px"
      },
      "h5": {
        "fontSize": 18,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.2px"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.6,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.6,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "renault",
    "name": "Renault",
    "category": "Automotive & Luxury",
    "description": "|",
    "designMdPath": "/design-md/renault/DESIGN.md",
    "color": {
      "primary": "#ffed00",
      "primaryHover": "#e6d200",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f2f2",
      "borderStrong": "#000000",
      "statusSuccess": "#8dc572",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f0ad4e"
    },
    "typography": {
      "fontFamily": "NouvelR",
      "h1": {
        "fontSize": 56,
        "lineHeight": 0.95,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 40,
        "lineHeight": 0.95,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 0.95,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 20,
        "lineHeight": 0.95,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 18,
        "lineHeight": 1,
        "fontWeight": 700,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.57,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "replicate",
    "name": "Replicate",
    "category": "AI & LLM",
    "description": "|",
    "designMdPath": "/design-md/replicate/DESIGN.md",
    "color": {
      "primary": "#ea2804",
      "primaryHover": "#c01f00",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#f9f7f3",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#202020",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "rgba(32,32,32,0.12)",
      "borderStrong": "#202020",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "rb-freigeist-neue",
      "h1": {
        "fontSize": 72,
        "lineHeight": 1,
        "fontWeight": 700,
        "letterSpacing": "-1.8px"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 1,
        "fontWeight": 700,
        "letterSpacing": "-1px"
      },
      "h3": {
        "fontSize": 30,
        "lineHeight": 1.2,
        "fontWeight": 600,
        "letterSpacing": "-0.5px"
      },
      "h4": {
        "fontSize": 24,
        "lineHeight": 1.33,
        "fontWeight": 600,
        "letterSpacing": "-0.35px"
      },
      "h5": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "-0.3px"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.56,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.33,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "resend",
    "name": "Resend",
    "category": "Tech & Lifestyle",
    "description": "|",
    "designMdPath": "/design-md/resend/DESIGN.md",
    "color": {
      "primary": "#fcfdff",
      "primaryHover": "#fcfdff",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#000000",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#fcfdff",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "rgba(255,255,255,0.06)",
      "borderStrong": "rgba(255,255,255,0.14)",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Domaine Display",
      "h1": {
        "fontSize": 768,
        "lineHeight": 1,
        "fontWeight": 400,
        "letterSpacing": "-0.768px"
      },
      "h2": {
        "fontSize": 56,
        "lineHeight": 1.2,
        "fontWeight": 400,
        "letterSpacing": "-2.8px"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 24,
        "lineHeight": 1.5,
        "fontWeight": 500,
        "letterSpacing": "-0.4px"
      },
      "h5": {
        "fontSize": 20,
        "lineHeight": 1.3,
        "fontWeight": 500,
        "letterSpacing": "-0.3px"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "revolut",
    "name": "Revolut",
    "category": "Fintech & Web3",
    "description": "|",
    "designMdPath": "/design-md/revolut/DESIGN.md",
    "color": {
      "primary": "#494fdf",
      "primaryHover": "#3a40c4",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#191c1f",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "rgba(255,255,255,0.06)",
      "borderStrong": "#191c1f",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Aeonik Pro",
      "h1": {
        "fontSize": 80,
        "lineHeight": 1,
        "fontWeight": 500,
        "letterSpacing": "-0.8px"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 1.21,
        "fontWeight": 500,
        "letterSpacing": "-0.48px"
      },
      "h3": {
        "fontSize": 40,
        "lineHeight": 1.2,
        "fontWeight": 500,
        "letterSpacing": "-0.4px"
      },
      "h4": {
        "fontSize": 24,
        "lineHeight": 1.33,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.56,
        "fontWeight": 400,
        "letterSpacing": "-0.09px"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "sap",
    "name": "SAP Analysis",
    "category": "Tech & Lifestyle",
    "description": "An analysis of SAP's design language \u2014 an enterprise system that keeps almost everything on white and spends its structure on two greys and one blue. The chrome is deliberately quiet, a 60px light-grey bar over a product tab rail, so the pa",
    "designMdPath": "/design-md/sap/DESIGN.md",
    "color": {
      "primary": "#0057d2",
      "primaryHover": "#0040b0",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#475e75",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "72 Brand Variable",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 20,
        "lineHeight": 22,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 20,
        "lineHeight": 22,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 16,
        "lineHeight": 17.6,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 27,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 21,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 21,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "sentry",
    "name": "Sentri",
    "category": "Developer Tools",
    "description": "An inspired interpretation of Sentri's design language \u2014 a developer-tools brand built on a deep purple-violet midnight canvas, electric lime accents, and a slightly subversive illustrated personality. The system pairs a custom display sans",
    "designMdPath": "/design-md/sentry/DESIGN.md",
    "color": {
      "primary": "#150f23",
      "primaryHover": "#150f23",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#1f1633",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f4f6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Rubik, -apple-system, system-ui, sans-serif",
      "h1": {
        "fontSize": 36,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 30,
        "lineHeight": 1.2,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 27,
        "lineHeight": 1.25,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 24,
        "lineHeight": 1.25,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 20,
        "lineHeight": 1.25,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 15,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 2,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "shopify",
    "name": "Shopifi",
    "category": "Tech & Lifestyle",
    "description": "An inspired interpretation of Shopifi's design language \u2014 a cinematic commerce platform that runs two parallel design tracks. The marketing-hero and product-narrative pages live on near-black canvases with full-bleed photography of merchant",
    "designMdPath": "/design-md/shopify/DESIGN.md",
    "color": {
      "primary": "#000000",
      "primaryHover": "#000000",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f4f6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "NeueHaasGrotesk Display, Helvetica, Arial, sans-serif",
      "h1": {
        "fontSize": 70,
        "lineHeight": 1,
        "fontWeight": 330,
        "letterSpacing": "0"
      },
      "h2": {
        "fontSize": 55,
        "lineHeight": 1.16,
        "fontWeight": 330,
        "letterSpacing": "0"
      },
      "h3": {
        "fontSize": 48,
        "lineHeight": 1.14,
        "fontWeight": 330,
        "letterSpacing": "0"
      },
      "h4": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.3px"
      },
      "h5": {
        "fontSize": 18,
        "lineHeight": 1.25,
        "fontWeight": 500,
        "letterSpacing": "0.72px"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.56,
        "fontWeight": 550,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.49,
        "fontWeight": 500,
        "letterSpacing": "0.28px"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 1.49,
        "fontWeight": 500,
        "letterSpacing": "0.28px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "slack",
    "name": "Slacc",
    "category": "Tech & Lifestyle",
    "description": "An inspired interpretation of Slacc's design language \u2014 a workplace messaging brand built on a deep aubergine primary, with cream-lavender hero gradients, blue inline links, and pill CTAs. The system pairs a proprietary humanist sans for di",
    "designMdPath": "/design-md/slack/DESIGN.md",
    "color": {
      "primary": "#4a154b",
      "primaryHover": "#481a54",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#1d1d1d",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e6e6e6",
      "borderStrong": "#000000",
      "statusSuccess": "#007a5a",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Salesforce-Avant-Garde, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      "h1": {
        "fontSize": 58,
        "lineHeight": 1.25,
        "fontWeight": 600,
        "letterSpacing": "-0.464px"
      },
      "h2": {
        "fontSize": 50,
        "lineHeight": 1.12,
        "fontWeight": 700,
        "letterSpacing": "-0.6px"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "-0.256px"
      },
      "h4": {
        "fontSize": 22,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 18,
        "lineHeight": 1.56,
        "fontWeight": 600,
        "letterSpacing": "-0.0216px"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.0216px"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "0.1px"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 1.43,
        "fontWeight": 400,
        "letterSpacing": "0.1px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "spacex",
    "name": "Spacex",
    "category": "Automotive & Luxury",
    "description": "An inspired interpretation of Spasex's design language \u2014 a mission-oriented aerospace brand built on pure black canvas, full-bleed photographic and video heroes of rockets and Mars landscapes, and uppercase D-DIN display type set in tight v",
    "designMdPath": "/design-md/spacex/DESIGN.md",
    "color": {
      "primary": "#000000",
      "primaryHover": "#000000",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f4f6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "D-DIN-Bold, Arial Narrow, Arial, Verdana, sans-serif",
      "h1": {
        "fontSize": 60,
        "lineHeight": 1.2,
        "fontWeight": 700,
        "letterSpacing": "1.2px"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 1.25,
        "fontWeight": 700,
        "letterSpacing": "0.96px"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.3,
        "fontWeight": 600,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 1.7,
        "fontWeight": 400,
        "letterSpacing": "0.32px"
      },
      "sm": {
        "fontSize": 13008,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13008,
        "lineHeight": 1.5,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "stripe",
    "name": "Stripi",
    "category": "Fintech & Web3",
    "description": "An inspired interpretation of Stripi's design language \u2014 a financial-infrastructure brand built on a deep navy ink, an electric indigo primary, and a recurring atmospheric gradient mesh that occupies the upper third of nearly every marketin",
    "designMdPath": "/design-md/stripe/DESIGN.md",
    "color": {
      "primary": "#533afd",
      "primaryHover": "#4434d4",
      "primaryLight": "#665efd",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f6f9fc",
      "textPrimary": "#0d253d",
      "textSecondary": "#273951",
      "textMuted": "#61718a",
      "borderSubtle": "#e3e8ee",
      "borderStrong": "#a8c3de",
      "statusSuccess": "#10b981",
      "statusDanger": "#ea2261",
      "statusWarning": "#9b6829"
    },
    "typography": {
      "fontFamily": "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif",
      "h1": {
        "fontSize": 48,
        "lineHeight": 1.15,
        "fontWeight": 300,
        "letterSpacing": "-0.96px"
      },
      "h2": {
        "fontSize": 32,
        "lineHeight": 1.1,
        "fontWeight": 300,
        "letterSpacing": "-0.64px"
      },
      "h3": {
        "fontSize": 26,
        "lineHeight": 1.12,
        "fontWeight": 300,
        "letterSpacing": "-0.26px"
      },
      "h4": {
        "fontSize": 20,
        "lineHeight": 1.4,
        "fontWeight": 300,
        "letterSpacing": "-0.2px"
      },
      "h5": {
        "fontSize": 18,
        "lineHeight": 1.4,
        "fontWeight": 300,
        "letterSpacing": "0"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 300,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "-0.39px"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "fontWeight": 400,
        "letterSpacing": "-0.39px"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "supabase",
    "name": "Supabaze",
    "category": "Tech & Lifestyle",
    "description": "An inspired interpretation of Supabaze's design language \u2014 an open-source database platform built on a clean white-and-near-black system with a single signature emerald-green CTA, a custom humanist sans display tier, and dense product UI mo",
    "designMdPath": "/design-md/supabase/DESIGN.md",
    "color": {
      "primary": "#3ecf8e",
      "primaryHover": "#24b47e",
      "primaryLight": "#4ade80",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#fafafa",
      "textPrimary": "#171717",
      "textSecondary": "#212121",
      "textMuted": "#9a9a9a",
      "borderSubtle": "#dfdfdf",
      "borderStrong": "#c7c7c7",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif",
      "h1": {
        "fontSize": 48,
        "lineHeight": 1.1,
        "fontWeight": 500,
        "letterSpacing": "-1.44px"
      },
      "h2": {
        "fontSize": 36,
        "lineHeight": 1.15,
        "fontWeight": 500,
        "letterSpacing": "-0.72px"
      },
      "h3": {
        "fontSize": 28,
        "lineHeight": 1.2,
        "fontWeight": 500,
        "letterSpacing": "-0.42px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "sm": {
        "fontSize": 13,
        "lineHeight": 1.45,
        "fontWeight": 400,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 13,
        "lineHeight": 1.45,
        "fontWeight": 400,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "superhuman",
    "name": "Superhumon",
    "category": "Developer Tools",
    "description": "An inspired interpretation of Superhumon's design language \u2014 a fast-email productivity brand split between an editorial dark hero (deep indigo navy with violet-sky atmospheric backdrop and a portrait subject) and a quiet white content body ",
    "designMdPath": "/design-md/superhuman/DESIGN.md",
    "color": {
      "primary": "#1b1938",
      "primaryHover": "#0e0c1f",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#fafaf8",
      "textPrimary": "#292827",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e8e4dd",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "'Super Sans VF', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      "h1": {
        "fontSize": 48,
        "lineHeight": 0.96,
        "fontWeight": 460,
        "letterSpacing": "-1.32px"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 1.14,
        "fontWeight": 540,
        "letterSpacing": "-0.63px"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 1.1,
        "fontWeight": 460,
        "letterSpacing": "-0.315px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 1.5,
        "fontWeight": 540,
        "letterSpacing": "-0.135px"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 1.4,
        "fontWeight": 460,
        "letterSpacing": "0"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 1.4,
        "fontWeight": 460,
        "letterSpacing": "0"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "together.ai",
    "name": "Together-AI",
    "category": "AI & LLM",
    "description": "An inspired interpretation of Together AI's design language \u2014 an AI infrastructure platform whose surface alternates between near-black hero bands (with a three-color orange-magenta-periwinkle gradient as the single piece of brand chrome) a",
    "designMdPath": "/design-md/together.ai/DESIGN.md",
    "color": {
      "primary": "#000000",
      "primaryHover": "#000000",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#959494",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "The Future, Inter, Helvetica Neue, Arial, sans-serif",
      "h1": {
        "fontSize": 40,
        "lineHeight": 48,
        "fontWeight": 500,
        "letterSpacing": "-0.8px"
      },
      "h2": {
        "fontSize": 28,
        "lineHeight": 32.2,
        "fontWeight": 500,
        "letterSpacing": "-0.42px"
      },
      "h3": {
        "fontSize": 22,
        "lineHeight": 25.3,
        "fontWeight": 500,
        "letterSpacing": "-0.22px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 23.4,
        "fontWeight": 400,
        "letterSpacing": "-0.18px"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 19.6,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 19.6,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "uber",
    "name": "Uber",
    "category": "Tech & Lifestyle",
    "description": "An inspired interpretation of Uber's design language \u2014 a transportation-and-delivery super-app brand whose web surface is a black-and-white duet, framed by a custom geometric display sans, accented by a single signature pill shape (radius 9",
    "designMdPath": "/design-md/uber/DESIGN.md",
    "color": {
      "primary": "#000000",
      "primaryHover": "#000000",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#efefef",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f4f6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "UberMove, UberMoveText, system-ui, Helvetica Neue, Arial, sans-serif",
      "h1": {
        "fontSize": 36,
        "lineHeight": 44,
        "fontWeight": 700,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 32,
        "lineHeight": 40,
        "fontWeight": 700,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 24,
        "lineHeight": 32,
        "fontWeight": 700,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 24,
        "fontWeight": 500,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 20,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 20,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "vercel",
    "name": "Vercel",
    "category": "Developer Tools",
    "description": "An inspired interpretation of Vercel's design language \u2014 a developer-platform brand whose surface is a stark black-and-ink duet on near-white canvas, broken at hero scale by a multi-color mesh gradient (cyan / blue / magenta / amber) that a",
    "designMdPath": "/design-md/vercel/DESIGN.md",
    "color": {
      "primary": "#171717",
      "primaryHover": "#171717",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#fafafa",
      "textPrimary": "#171717",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#ebebeb",
      "borderStrong": "#a1a1a1",
      "statusSuccess": "#0070f3",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f5a623"
    },
    "typography": {
      "fontFamily": "Geist, Inter, system-ui, -apple-system, sans-serif",
      "h1": {
        "fontSize": 48,
        "lineHeight": 48,
        "fontWeight": 600,
        "letterSpacing": "-2.4px"
      },
      "h2": {
        "fontSize": 32,
        "lineHeight": 40,
        "fontWeight": 600,
        "letterSpacing": "-1.28px"
      },
      "h3": {
        "fontSize": 24,
        "lineHeight": 32,
        "fontWeight": 600,
        "letterSpacing": "-0.96px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 28,
        "fontWeight": 400,
        "letterSpacing": "0px"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 20,
        "fontWeight": 400,
        "letterSpacing": "-0.28px"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 16,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "vodafone",
    "name": "Vodafone",
    "category": "Tech & Lifestyle",
    "description": "An inspired interpretation of Vodafone's design language \u2014 a telecom super-brand whose web surface alternates between editorial photography hero bands with massive uppercase display headlines and clean white content bands, anchored by the c",
    "designMdPath": "/design-md/vodafone/DESIGN.md",
    "color": {
      "primary": "#e60000",
      "primaryHover": "#e60000",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f2f2f2",
      "textPrimary": "#25282b",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f4f6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Vodafone, Vodafone Rg, Helvetica Neue, Arial, sans-serif",
      "h1": {
        "fontSize": 90,
        "lineHeight": 84,
        "fontWeight": 800,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 52,
        "fontWeight": 300,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 40,
        "lineHeight": 44,
        "fontWeight": 300,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 22,
        "lineHeight": 24,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 16,
        "lineHeight": 20,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 16,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "voltagent",
    "name": "Voltagent",
    "category": "AI & LLM",
    "description": "An inspired interpretation of Voltagent's design language \u2014 a developer-focused AI agent engineering platform whose surface is an unrelenting near-black canvas broken only by a single electric-green brand accent, code-editor mockups inside ",
    "designMdPath": "/design-md/voltagent/DESIGN.md",
    "color": {
      "primary": "#00d992",
      "primaryHover": "#10b981",
      "primaryLight": "#2fd6a1",
      "bgPrimary": "#101010",
      "bgSecondary": "#1a1a1a",
      "textPrimary": "#f2f2f2",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#3d3a39",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      "h1": {
        "fontSize": 60,
        "lineHeight": 60,
        "fontWeight": 400,
        "letterSpacing": "-0.65px"
      },
      "h2": {
        "fontSize": 36,
        "lineHeight": 40,
        "fontWeight": 400,
        "letterSpacing": "-0.9px"
      },
      "h3": {
        "fontSize": 24,
        "lineHeight": 32,
        "fontWeight": 700,
        "letterSpacing": "-0.6px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 28,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 20,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 16,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "warp",
    "name": "Warp",
    "category": "Developer Tools",
    "description": "An inspired interpretation of Warp's design language \u2014 an agentic terminal-and-development-environment brand whose surface is a warm near-charcoal canvas (a tint warmer than pure black), broken only by clean Inter typography, the occasional",
    "designMdPath": "/design-md/warp/DESIGN.md",
    "color": {
      "primary": "#f7f5f0",
      "primaryHover": "#f7f5f0",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#2b2622",
      "bgSecondary": "#383330",
      "textPrimary": "#f7f5f0",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#3f3a36",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      "h1": {
        "fontSize": 64,
        "lineHeight": 70.4,
        "fontWeight": 400,
        "letterSpacing": "-1.6px"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 52.8,
        "fontWeight": 400,
        "letterSpacing": "-1.2px"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 40,
        "fontWeight": 500,
        "letterSpacing": "-0.8px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 28,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 20,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 16,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "webflow",
    "name": "Webflow",
    "category": "Developer Tools",
    "description": "An inspired interpretation of Webflow's design language \u2014 a visual web development platform whose surface contrasts a deep near-black `#080808` primary against a generous white canvas, broken by a five-stop chromatic accent system (purple /",
    "designMdPath": "/design-md/webflow/DESIGN.md",
    "color": {
      "primary": "#080808",
      "primaryHover": "#080808",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f8f9fa",
      "textPrimary": "#080808",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#d8d8d8",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "WF Visual Sans Variable, Inter, system-ui, sans-serif",
      "h1": {
        "fontSize": 56,
        "lineHeight": 58.24,
        "fontWeight": 600,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 448,
        "lineHeight": 46.6,
        "fontWeight": 600,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 41.6,
        "fontWeight": 500,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 288,
        "lineHeight": 46.08,
        "fontWeight": 400,
        "letterSpacing": "-0.288px"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 22.4,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 128,
        "lineHeight": 15.36,
        "fontWeight": 550,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "wired",
    "name": "Wired",
    "category": "Tech & Lifestyle",
    "description": "An inspired interpretation of Wired's design language \u2014 a flagship technology-magazine brand whose surface is a strict editorial duet of stark black wordmark on white canvas, anchored by a tall narrow custom display serif for hero headlines",
    "designMdPath": "/design-md/wired/DESIGN.md",
    "color": {
      "primary": "#000000",
      "primaryHover": "#000000",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#f5f5f5",
      "textPrimary": "#000000",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#e0e0e0",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": 'WiredDisplay, "Times New Roman", Georgia, serif',
      "h1": {
        "fontSize": 48,
        "lineHeight": 50.4,
        "fontWeight": 400,
        "letterSpacing": "-0.4px"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 50.4,
        "fontWeight": 400,
        "letterSpacing": "-0.4px"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 35.2,
        "fontWeight": 400,
        "letterSpacing": "-0.3px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.55,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 18,
        "fontWeight": 400,
        "letterSpacing": "0.4px"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 16,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "wise",
    "name": "Wise",
    "category": "Fintech & Web3",
    "description": "An inspired interpretation of Wise's design language \u2014 a global money-transfer brand whose surface combines an unusually heavy near-black display sans (weight 900 at 64\u2013126 px) with a vivid lime-green brand accent, sage-tinted surface neutr",
    "designMdPath": "/design-md/wise/DESIGN.md",
    "color": {
      "primary": "#9fe870",
      "primaryHover": "#9fe870",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#ffffff",
      "bgSecondary": "#e8ebe6",
      "textPrimary": "#0e0f0c",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f4f6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#ffd11a"
    },
    "typography": {
      "fontFamily": "Wise Sans, Inter, system-ui, sans-serif",
      "h1": {
        "fontSize": 64,
        "lineHeight": 54.4,
        "fontWeight": 900,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 47,
        "lineHeight": 70.5,
        "fontWeight": 400,
        "letterSpacing": "-0.108px"
      },
      "h3": {
        "fontSize": 40,
        "lineHeight": 34,
        "fontWeight": 900,
        "letterSpacing": "-0.01em"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 20,
        "lineHeight": 30,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 20,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 12,
        "lineHeight": 16,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "x.ai",
    "name": "xAI",
    "category": "AI & LLM",
    "description": "An inspired interpretation of xAI's design language \u2014 Elon Musk's frontier-AI company whose web surface is a strict near-black canvas broken only by white pill outlines, occasional warm sunset / dusk gradient accents, a custom geometric san",
    "designMdPath": "/design-md/x.ai/DESIGN.md",
    "color": {
      "primary": "#ffffff",
      "primaryHover": "#ffffff",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#0a0a0a",
      "bgSecondary": "#1a1c20",
      "textPrimary": "#ffffff",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#212327",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "universalSans, Inter, system-ui, -apple-system, sans-serif",
      "h1": {
        "fontSize": 96,
        "lineHeight": 96,
        "fontWeight": 400,
        "letterSpacing": "-2.4px"
      },
      "h2": {
        "fontSize": 72,
        "lineHeight": 72,
        "fontWeight": 400,
        "letterSpacing": "-1.8px"
      },
      "h3": {
        "fontSize": 48,
        "lineHeight": 48,
        "fontWeight": 400,
        "letterSpacing": "-1.2px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 18,
        "lineHeight": 28,
        "fontWeight": 400,
        "letterSpacing": "-0.005em"
      },
      "sm": {
        "fontSize": 14,
        "lineHeight": 20,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 11,
        "lineHeight": 1.4,
        "fontWeight": 500,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  },
  {
    "id": "zapier",
    "name": "Zapier",
    "category": "Tech & Lifestyle",
    "description": "An inspired interpretation of Zapier's design language \u2014 a workflow-automation platform whose surface combines warm-cream neutrals (`#fffefb` canvas, `#f8f4f0` soft cream) with deep coffee ink (`#201515`) and a single saturated orange CTA a",
    "designMdPath": "/design-md/zapier/DESIGN.md",
    "color": {
      "primary": "#ff4f00",
      "primaryHover": "#ff4f00",
      "primaryLight": "#e8f3ff",
      "bgPrimary": "#fffefb",
      "bgSecondary": "#f8f4f0",
      "textPrimary": "#201515",
      "textSecondary": "#8b95a1",
      "textMuted": "#b0b8c1",
      "borderSubtle": "#f2f4f6",
      "borderStrong": "#e5e8eb",
      "statusSuccess": "#10b981",
      "statusDanger": "#f43f5e",
      "statusWarning": "#f59e0b"
    },
    "typography": {
      "fontFamily": "Degular Display, Inter, system-ui, -apple-system, sans-serif",
      "h1": {
        "fontSize": 56,
        "lineHeight": 56,
        "fontWeight": 500,
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": 48,
        "lineHeight": 48,
        "fontWeight": 500,
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": 32,
        "lineHeight": 36,
        "fontWeight": 500,
        "letterSpacing": "1px"
      },
      "h4": {
        "fontSize": 18,
        "lineHeight": 1.35,
        "fontWeight": 600,
        "letterSpacing": "-0.005em"
      },
      "h5": {
        "fontSize": 16,
        "lineHeight": 1.4,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "h6": {
        "fontSize": 14,
        "lineHeight": 1.45,
        "fontWeight": 600,
        "letterSpacing": "0em"
      },
      "body": {
        "fontSize": 20,
        "lineHeight": 30,
        "fontWeight": 400,
        "letterSpacing": "-0.2px"
      },
      "sm": {
        "fontSize": 16,
        "lineHeight": 24,
        "fontWeight": 400,
        "letterSpacing": "0em"
      },
      "xs": {
        "fontSize": 14,
        "lineHeight": 21,
        "fontWeight": 400,
        "letterSpacing": "0.01em"
      }
    },
    "borderRadius": "12px"
  }
];
var AWESOME_CATEGORIES = [
  "All",
  "AI & LLM",
  "Developer Tools",
  "Fintech & Web3",
  "Tech & Lifestyle",
  "Automotive & Luxury"
];

// lib/data/themeEditorDefaults.ts
var DEFAULT_THEME_CONFIG = {
  color: {
    primary: "#3182f6",
    primaryHover: "#1b64da",
    primaryLight: "#e8f3ff",
    bgPrimary: "#ffffff",
    bgSecondary: "#f8f9fa",
    textPrimary: "#191f28",
    textSecondary: "#8b95a1",
    textMuted: "#b0b8c1",
    borderSubtle: "#f2f4f6",
    borderStrong: "#e5e8eb",
    statusSuccess: "#10b981",
    statusDanger: "#f43f5e",
    statusWarning: "#f59e0b"
  },
  typography: {
    fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
    h1: {
      fontSize: 36,
      lineHeight: 1.25,
      fontWeight: 800,
      letterSpacing: "-0.025em"
    },
    h2: {
      fontSize: 28,
      lineHeight: 1.3,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    },
    h3: {
      fontSize: 22,
      lineHeight: 1.35,
      fontWeight: 700,
      letterSpacing: "-0.015em"
    },
    h4: {
      fontSize: 18,
      lineHeight: 1.4,
      fontWeight: 600,
      letterSpacing: "-0.01em"
    },
    h5: {
      fontSize: 16,
      lineHeight: 1.45,
      fontWeight: 600,
      letterSpacing: "0em"
    },
    h6: {
      fontSize: 14,
      lineHeight: 1.5,
      fontWeight: 600,
      letterSpacing: "0em"
    },
    body: {
      fontSize: 15,
      lineHeight: 1.6,
      fontWeight: 400,
      letterSpacing: "-0.005em"
    },
    sm: {
      fontSize: 13,
      lineHeight: 1.5,
      fontWeight: 400,
      letterSpacing: "0em"
    },
    xs: {
      fontSize: 11,
      lineHeight: 1.4,
      fontWeight: 500,
      letterSpacing: "0.01em"
    }
  },
  borderRadius: "14px"
};
var COLOR_PRESETS = [
  {
    id: "toss",
    name: "\uD1A0\uC2A4 (Toss Vivid Blue)",
    description: "\uCCAD\uB7C9\uD55C \uBE44\uBE44\uB4DC \uBE14\uB8E8\uC640 \uBCFC\uB4DC \uB77C\uC6B4\uB529",
    borderRadius: "16px",
    colors: {
      primary: "#3182f6",
      primaryHover: "#1b64da",
      primaryLight: "#e8f3ff",
      bgPrimary: "#ffffff",
      bgSecondary: "#f8f9fa",
      textPrimary: "#191f28",
      textSecondary: "#8b95a1",
      textMuted: "#b0b8c1",
      borderSubtle: "#f2f4f6",
      borderStrong: "#e5e8eb",
      statusSuccess: "#10b981",
      statusDanger: "#f43f5e",
      statusWarning: "#f59e0b"
    }
  },
  {
    id: "daangn",
    name: "\uB2F9\uADFC (Daangn Warm)",
    description: "\uB530\uB73B\uD55C \uC624\uB80C\uC9C0\uC640 \uCE5C\uADFC\uD55C \uB77C\uC6B4\uB529 \uAC10\uC131",
    borderRadius: "12px",
    colors: {
      primary: "#ff6f0f",
      primaryHover: "#e05900",
      primaryLight: "#fff2e8",
      bgPrimary: "#ffffff",
      bgSecondary: "#fbf7f2",
      textPrimary: "#212124",
      textSecondary: "#868b94",
      textMuted: "#b2b5ba",
      borderSubtle: "#f5f0eb",
      borderStrong: "#e4ddd3",
      statusSuccess: "#10b981",
      statusDanger: "#ff4b4b",
      statusWarning: "#ff9800"
    }
  },
  {
    id: "violet-tech",
    name: "\uBC14\uC774\uC62C\uB81B (Modern Violet)",
    description: "B2B \uD14C\uD06C \uBC0F \uAC1C\uBC1C\uC790 \uC9C0\uD5A5\uC758 \uAC10\uAC01\uC801\uC778 \uBCF4\uB77C\uC0C9",
    borderRadius: "10px",
    colors: {
      primary: "#7c3aed",
      primaryHover: "#6d28d9",
      primaryLight: "#f3e8ff",
      bgPrimary: "#ffffff",
      bgSecondary: "#faf7ff",
      textPrimary: "#18181b",
      textSecondary: "#71717a",
      textMuted: "#a1a1aa",
      borderSubtle: "#f4f4f5",
      borderStrong: "#e4e4e7",
      statusSuccess: "#059669",
      statusDanger: "#e11d48",
      statusWarning: "#d97706"
    }
  },
  {
    id: "emerald",
    name: "\uC5D0\uBA54\uB784\uB4DC (Forest Eco)",
    description: "\uD3B8\uC548\uD55C \uC790\uC5F0 \uAC10\uC131\uC758 \uB525 \uADF8\uB9B0 \uD540\uD14C\uD06C/\uC6F0\uB2C8\uC2A4",
    borderRadius: "14px",
    colors: {
      primary: "#059669",
      primaryHover: "#047857",
      primaryLight: "#ecfdf5",
      bgPrimary: "#ffffff",
      bgSecondary: "#f0fdf4",
      textPrimary: "#064e3b",
      textSecondary: "#6ee7b7",
      textMuted: "#94a3b8",
      borderSubtle: "#e6f7ec",
      borderStrong: "#d1fae5",
      statusSuccess: "#10b981",
      statusDanger: "#f43f5e",
      statusWarning: "#f59e0b"
    }
  },
  {
    id: "dark-cyber",
    name: "\uB2E4\uD06C \uC0AC\uC774\uBC84 (Dark Cyber)",
    description: "\uC138\uB828\uB41C \uB124\uC628 \uC2DC\uC548\uACFC \uB9E4\uD2B8 \uB2E4\uD06C \uC11C\uD53C\uC2A4",
    borderRadius: "12px",
    colors: {
      primary: "#06b6d4",
      primaryHover: "#0891b2",
      primaryLight: "#164e63",
      bgPrimary: "#0f172a",
      bgSecondary: "#1e293b",
      textPrimary: "#f8fafc",
      textSecondary: "#94a3b8",
      textMuted: "#64748b",
      borderSubtle: "#334155",
      borderStrong: "#475569",
      statusSuccess: "#34d399",
      statusDanger: "#fb7185",
      statusWarning: "#fbbf24"
    }
  },
  {
    id: "sunset-rose",
    name: "\uC120\uC14B \uB85C\uC988 (Sunset Rose)",
    description: "\uC6B0\uC544\uD558\uACE0 \uB85C\uB9E8\uD2F1\uD55C \uD551\uD06C \uB85C\uC988 \uD14C\uB9C8",
    borderRadius: "16px",
    colors: {
      primary: "#e11d48",
      primaryHover: "#be123c",
      primaryLight: "#ffe4e6",
      bgPrimary: "#ffffff",
      bgSecondary: "#fff1f2",
      textPrimary: "#1e1b18",
      textSecondary: "#9f1239",
      textMuted: "#fda4af",
      borderSubtle: "#fecdd3",
      borderStrong: "#f43f5e",
      statusSuccess: "#10b981",
      statusDanger: "#e11d48",
      statusWarning: "#f59e0b"
    }
  }
];
var FONT_FAMILY_PRESETS = [
  {
    name: "Pretendard (\uAE30\uBCF8 \uAD8C\uC7A5)",
    value: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif'
  },
  {
    name: "Inter (\uAE00\uB85C\uBC8C \uD14C\uD06C)",
    value: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  {
    name: "System UI (\uC2DC\uC2A4\uD15C \uB124\uC774\uD2F0\uBE0C)",
    value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  {
    name: "Noto Sans KR (\uAD6C\uAE00 \uD45C\uC900 \uD55C\uAD6D\uC5B4)",
    value: '"Noto Sans KR", sans-serif'
  },
  {
    name: "Monospace (\uCF54\uB529 / \uBAA8\uB178)",
    value: '"JetBrains Mono", "Fira Code", monospace'
  }
];

// lib/services/themeEngine.ts
var STYLE_ELEMENT_ID = "atom-theme-live-engine-style";
var FONT_IMPORT_MAP = {
  Inter: '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");',
  "Noto Sans KR": '@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap");',
  "JetBrains Mono": '@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap");',
  Outfit: '@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap");',
  "Plus Jakarta Sans": '@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");'
};
function generateThemeCSS(theme) {
  const { color, typography, borderRadius } = theme;
  let fontImportCSS = "";
  for (const [fontKey, importRule] of Object.entries(FONT_IMPORT_MAP)) {
    if (typography.fontFamily.includes(fontKey)) {
      fontImportCSS = `${importRule}
`;
      break;
    }
  }
  return `
${fontImportCSS}/* [AtomDesignToken] Live Injected Theme Variables */
:root {
  /* Font Family */
  --font-sans: ${typography.fontFamily};

  /* Semantic Colors */
  --accent-primary: ${color.primary};
  --accent-hover: ${color.primaryHover};
  --accent-light: ${color.primaryLight};
  --bg-primary: ${color.bgPrimary};
  --bg-secondary: ${color.bgSecondary};
  --text-primary: ${color.textPrimary};
  --text-secondary: ${color.textSecondary};
  --text-muted: ${color.textMuted};
  --border-subtle: ${color.borderSubtle};
  --border-strong: ${color.borderStrong};

  /* Atom System Specific Variables */
  --atom-color-primary: ${color.primary};
  --atom-color-primary-hover: ${color.primaryHover};
  --atom-color-primary-subtle: ${color.primaryLight};
  --atom-status-success: ${color.statusSuccess};
  --atom-status-danger: ${color.statusDanger};
  --atom-status-warning: ${color.statusWarning};
  --atom-radius: ${borderRadius};

  /* Typography Variables */
  --atom-font-h1-size: ${typography.h1.fontSize}px;
  --atom-font-h1-lh: ${typography.h1.lineHeight};
  --atom-font-h1-weight: ${typography.h1.fontWeight};
  --atom-font-h1-spacing: ${typography.h1.letterSpacing};

  --atom-font-h2-size: ${typography.h2.fontSize}px;
  --atom-font-h2-lh: ${typography.h2.lineHeight};
  --atom-font-h2-weight: ${typography.h2.fontWeight};
  --atom-font-h2-spacing: ${typography.h2.letterSpacing};

  --atom-font-h3-size: ${typography.h3.fontSize}px;
  --atom-font-h3-lh: ${typography.h3.lineHeight};
  --atom-font-h3-weight: ${typography.h3.fontWeight};
  --atom-font-h3-spacing: ${typography.h3.letterSpacing};

  --atom-font-h4-size: ${typography.h4.fontSize}px;
  --atom-font-h4-lh: ${typography.h4.lineHeight};
  --atom-font-h4-weight: ${typography.h4.fontWeight};
  --atom-font-h4-spacing: ${typography.h4.letterSpacing};

  --atom-font-h5-size: ${typography.h5.fontSize}px;
  --atom-font-h5-lh: ${typography.h5.lineHeight};
  --atom-font-h5-weight: ${typography.h5.fontWeight};
  --atom-font-h5-spacing: ${typography.h5.letterSpacing};

  --atom-font-h6-size: ${typography.h6.fontSize}px;
  --atom-font-h6-lh: ${typography.h6.lineHeight};
  --atom-font-h6-weight: ${typography.h6.fontWeight};
  --atom-font-h6-spacing: ${typography.h6.letterSpacing};

  --atom-font-body-size: ${typography.body.fontSize}px;
  --atom-font-body-lh: ${typography.body.lineHeight};
  --atom-font-body-weight: ${typography.body.fontWeight};
  --atom-font-body-spacing: ${typography.body.letterSpacing};

  --atom-font-sm-size: ${typography.sm.fontSize}px;
  --atom-font-sm-lh: ${typography.sm.lineHeight};
  --atom-font-sm-weight: ${typography.sm.fontWeight};
  --atom-font-sm-spacing: ${typography.sm.letterSpacing};

  --atom-font-xs-size: ${typography.xs.fontSize}px;
  --atom-font-xs-lh: ${typography.xs.lineHeight};
  --atom-font-xs-weight: ${typography.xs.fontWeight};
  --atom-font-xs-spacing: ${typography.xs.letterSpacing};
}

/* Typography Tag Overrides (Applied globally with high priority) */
h1, .atom-h1 {
  font-size: ${typography.h1.fontSize}px !important;
  line-height: ${typography.h1.lineHeight} !important;
  font-weight: ${typography.h1.fontWeight} !important;
  letter-spacing: ${typography.h1.letterSpacing} !important;
}

h2, .atom-h2 {
  font-size: ${typography.h2.fontSize}px !important;
  line-height: ${typography.h2.lineHeight} !important;
  font-weight: ${typography.h2.fontWeight} !important;
  letter-spacing: ${typography.h2.letterSpacing} !important;
}

h3, .atom-h3 {
  font-size: ${typography.h3.fontSize}px !important;
  line-height: ${typography.h3.lineHeight} !important;
  font-weight: ${typography.h3.fontWeight} !important;
  letter-spacing: ${typography.h3.letterSpacing} !important;
}

h4, .atom-h4 {
  font-size: ${typography.h4.fontSize}px !important;
  line-height: ${typography.h4.lineHeight} !important;
  font-weight: ${typography.h4.fontWeight} !important;
  letter-spacing: ${typography.h4.letterSpacing} !important;
}

h5, .atom-h5 {
  font-size: ${typography.h5.fontSize}px !important;
  line-height: ${typography.h5.lineHeight} !important;
  font-weight: ${typography.h5.fontWeight} !important;
  letter-spacing: ${typography.h5.letterSpacing} !important;
}

h6, .atom-h6 {
  font-size: ${typography.h6.fontSize}px !important;
  line-height: ${typography.h6.lineHeight} !important;
  font-weight: ${typography.h6.fontWeight} !important;
  letter-spacing: ${typography.h6.letterSpacing} !important;
}

/* Body & Paragraph styles */
html, body, button, input, select, textarea, h1, h2, h3, h4, h5, h6 {
  font-family: ${typography.fontFamily} !important;
}

body {
  background-color: ${color.bgPrimary};
  color: ${color.textPrimary};
}

.atom-body, p:not([class*="text-xs"]):not([class*="text-sm"]) {
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight};
  font-weight: ${typography.body.fontWeight};
  letter-spacing: ${typography.body.letterSpacing};
}

/* Small & Micro texts */
.text-sm, small, .atom-sm {
  font-size: ${typography.sm.fontSize}px;
  line-height: ${typography.sm.lineHeight};
  font-weight: ${typography.sm.fontWeight};
  letter-spacing: ${typography.sm.letterSpacing};
}

.text-xs, .atom-xs {
  font-size: ${typography.xs.fontSize}px;
  line-height: ${typography.xs.lineHeight};
  font-weight: ${typography.xs.fontWeight};
  letter-spacing: ${typography.xs.letterSpacing};
}
`.trim();
}
function applyThemeToDOM(theme) {
  if (typeof document === "undefined") return;
  let styleTag = document.getElementById(STYLE_ELEMENT_ID);
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = STYLE_ELEMENT_ID;
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = generateThemeCSS(theme);
}
function exportToCSS(theme) {
  return generateThemeCSS(theme);
}
function exportToTailwind(theme) {
  const { color, typography, borderRadius } = theme;
  const tailwindSnippet = {
    theme: {
      extend: {
        colors: {
          brand: {
            primary: color.primary,
            hover: color.primaryHover,
            light: color.primaryLight
          },
          surface: {
            DEFAULT: color.bgPrimary,
            secondary: color.bgSecondary
          },
          border: {
            subtle: color.borderSubtle,
            strong: color.borderStrong
          },
          status: {
            success: color.statusSuccess,
            danger: color.statusDanger,
            warning: color.statusWarning
          }
        },
        fontSize: {
          h1: [`${typography.h1.fontSize}px`, { lineHeight: `${typography.h1.lineHeight}`, fontWeight: `${typography.h1.fontWeight}`, letterSpacing: typography.h1.letterSpacing }],
          h2: [`${typography.h2.fontSize}px`, { lineHeight: `${typography.h2.lineHeight}`, fontWeight: `${typography.h2.fontWeight}`, letterSpacing: typography.h2.letterSpacing }],
          h3: [`${typography.h3.fontSize}px`, { lineHeight: `${typography.h3.lineHeight}`, fontWeight: `${typography.h3.fontWeight}`, letterSpacing: typography.h3.letterSpacing }],
          h4: [`${typography.h4.fontSize}px`, { lineHeight: `${typography.h4.lineHeight}`, fontWeight: `${typography.h4.fontWeight}`, letterSpacing: typography.h4.letterSpacing }],
          h5: [`${typography.h5.fontSize}px`, { lineHeight: `${typography.h5.lineHeight}`, fontWeight: `${typography.h5.fontWeight}`, letterSpacing: typography.h5.letterSpacing }],
          h6: [`${typography.h6.fontSize}px`, { lineHeight: `${typography.h6.lineHeight}`, fontWeight: `${typography.h6.fontWeight}`, letterSpacing: typography.h6.letterSpacing }],
          body: [`${typography.body.fontSize}px`, { lineHeight: `${typography.body.lineHeight}`, fontWeight: `${typography.body.fontWeight}`, letterSpacing: typography.body.letterSpacing }],
          sm: [`${typography.sm.fontSize}px`, { lineHeight: `${typography.sm.lineHeight}`, fontWeight: `${typography.sm.fontWeight}`, letterSpacing: typography.sm.letterSpacing }],
          xs: [`${typography.xs.fontSize}px`, { lineHeight: `${typography.xs.lineHeight}`, fontWeight: `${typography.xs.fontWeight}`, letterSpacing: typography.xs.letterSpacing }]
        },
        borderRadius: {
          custom: borderRadius
        }
      }
    }
  };
  return `// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default ${JSON.stringify(tailwindSnippet, null, 2)} as Config;`;
}
function exportToTokensJson(theme) {
  const { color, typography, borderRadius } = theme;
  const dtcgTokens = {
    $schema: "https://design-tokens.github.io/community-group/format/",
    color: {
      brand: {
        primary: { $value: color.primary, $type: "color" },
        hover: { $value: color.primaryHover, $type: "color" },
        subtle: { $value: color.primaryLight, $type: "color" }
      },
      surface: {
        background: { $value: color.bgPrimary, $type: "color" },
        secondary: { $value: color.bgSecondary, $type: "color" }
      },
      text: {
        primary: { $value: color.textPrimary, $type: "color" },
        secondary: { $value: color.textSecondary, $type: "color" },
        muted: { $value: color.textMuted, $type: "color" }
      },
      border: {
        subtle: { $value: color.borderSubtle, $type: "color" },
        strong: { $value: color.borderStrong, $type: "color" }
      }
    },
    typography: {
      h1: {
        fontSize: { $value: `${typography.h1.fontSize}px`, $type: "dimension" },
        lineHeight: { $value: typography.h1.lineHeight, $type: "number" },
        fontWeight: { $value: typography.h1.fontWeight, $type: "fontWeight" }
      },
      h2: {
        fontSize: { $value: `${typography.h2.fontSize}px`, $type: "dimension" },
        lineHeight: { $value: typography.h2.lineHeight, $type: "number" },
        fontWeight: { $value: typography.h2.fontWeight, $type: "fontWeight" }
      },
      h3: {
        fontSize: { $value: `${typography.h3.fontSize}px`, $type: "dimension" },
        lineHeight: { $value: typography.h3.lineHeight, $type: "number" },
        fontWeight: { $value: typography.h3.fontWeight, $type: "fontWeight" }
      },
      h4: {
        fontSize: { $value: `${typography.h4.fontSize}px`, $type: "dimension" },
        lineHeight: { $value: typography.h4.lineHeight, $type: "number" },
        fontWeight: { $value: typography.h4.fontWeight, $type: "fontWeight" }
      },
      h5: {
        fontSize: { $value: `${typography.h5.fontSize}px`, $type: "dimension" },
        lineHeight: { $value: typography.h5.lineHeight, $type: "number" },
        fontWeight: { $value: typography.h5.fontWeight, $type: "fontWeight" }
      },
      h6: {
        fontSize: { $value: `${typography.h6.fontSize}px`, $type: "dimension" },
        lineHeight: { $value: typography.h6.lineHeight, $type: "number" },
        fontWeight: { $value: typography.h6.fontWeight, $type: "fontWeight" }
      },
      body: {
        fontSize: { $value: `${typography.body.fontSize}px`, $type: "dimension" },
        lineHeight: { $value: typography.body.lineHeight, $type: "number" },
        fontWeight: { $value: typography.body.fontWeight, $type: "fontWeight" }
      },
      sm: {
        fontSize: { $value: `${typography.sm.fontSize}px`, $type: "dimension" },
        lineHeight: { $value: typography.sm.lineHeight, $type: "number" },
        fontWeight: { $value: typography.sm.fontWeight, $type: "fontWeight" }
      },
      xs: {
        fontSize: { $value: `${typography.xs.fontSize}px`, $type: "dimension" },
        lineHeight: { $value: typography.xs.lineHeight, $type: "number" },
        fontWeight: { $value: typography.xs.fontWeight, $type: "fontWeight" }
      }
    },
    borderRadius: {
      default: { $value: borderRadius, $type: "dimension" }
    }
  };
  return JSON.stringify(dtcgTokens, null, 2);
}
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}

// src/index.ts
var ATOM_UI_CSS_PATH = "atomsystem/css/atom-ui.css";
var ATOM_VERSION = "0.1.48";
var ATOM_LIB_NAME = "atomsystem";

exports.ATOM_LIB_NAME = ATOM_LIB_NAME;
exports.ATOM_UI_CSS_PATH = ATOM_UI_CSS_PATH;
exports.ATOM_VERSION = ATOM_VERSION;
exports.AWESOME_CATEGORIES = AWESOME_CATEGORIES;
exports.AWESOME_DESIGN_MD_THEMES = AWESOME_DESIGN_MD_THEMES;
exports.BASE_COLOR_TOKENS = BASE_COLOR_TOKENS;
exports.BRAND_PRESETS = BRAND_PRESETS;
exports.COLOR_PRESETS = COLOR_PRESETS;
exports.DEFAULT_THEME_CONFIG = DEFAULT_THEME_CONFIG;
exports.FONT_FAMILY_PRESETS = FONT_FAMILY_PRESETS;
exports.GALLERY_COMPONENTS = GALLERY_COMPONENTS;
exports.PATTERNS_COLLECTION = PATTERNS_COLLECTION;
exports.RADIUS_TOKENS = RADIUS_TOKENS;
exports.SHADOW_TOKENS = SHADOW_TOKENS;
exports.SPACING_TOKENS = SPACING_TOKENS;
exports.TYPOGRAPHY_TOKENS = TYPOGRAPHY_TOKENS;
exports.applyThemeToDOM = applyThemeToDOM;
exports.cn = cn;
exports.exportToCSS = exportToCSS;
exports.exportToTailwind = exportToTailwind;
exports.exportToTokensJson = exportToTokensJson;
exports.generateThemeCSS = generateThemeCSS;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map