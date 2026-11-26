// lib/data/studioData.ts
var INITIAL_SEMANTIC_STATUS_TOKENS = [
  {
    id: "--atom-color-primary",
    key: "primary",
    name: "Primary (\uC8FC\uC694 \uBE0C\uB79C\uB4DC \uC561\uC158)",
    description: "\uD575\uC2EC \uC561\uC158 \uBC84\uD2BC, \uB9C1\uD06C, \uD65C\uC131 \uD0ED \uC778\uB514\uCF00\uC774\uD130, \uD3EC\uCEE4\uC2A4 \uD558\uC774\uB77C\uC774\uD2B8",
    paletteId: "--atom-palette-blue-500",
    hoverPaletteId: "--atom-palette-blue-600",
    subtlePaletteId: "--atom-palette-blue-50"
  },
  {
    id: "--atom-color-secondary",
    key: "secondary",
    name: "Secondary (\uBCF4\uC870 \uC561\uC158 \uBC0F \uC11C\uD53C\uC2A4)",
    description: "\uCDE8\uC18C, \uB2EB\uAE30 \uBC84\uD2BC, \uBCF4\uC870 \uBC30\uC9C0, \uC911\uB9BD \uC778\uD130\uB799\uC158 \uC601\uC5ED",
    paletteId: "--atom-palette-gray-200",
    hoverPaletteId: "--atom-palette-gray-300",
    subtlePaletteId: "--atom-palette-gray-50"
  },
  {
    id: "--atom-color-success",
    key: "success",
    name: "Success (\uC131\uACF5 \uBC0F \uAE0D\uC815 \uC9C0\uD45C)",
    description: "\uACB0\uC81C/\uC2B9\uC778 \uC644\uB8CC \uBC84\uD2BC, \uC0C1\uD0DC \uC131\uACF5 \uBC30\uC9C0, \uC815\uC0C1 \uAC00\uB3D9 \uC0C1\uD0DC",
    paletteId: "--atom-palette-emerald-500",
    hoverPaletteId: "--atom-palette-emerald-600",
    subtlePaletteId: "--atom-palette-emerald-50"
  },
  {
    id: "--atom-color-danger",
    key: "danger",
    name: "Danger / Destructive (\uC704\uD5D8 \uBC0F \uC5D0\uB7EC)",
    description: "\uC601\uAD6C \uC0AD\uC81C/\uCDE8\uC18C \uBC84\uD2BC, \uD3FC \uC720\uD6A8\uC131 \uC5D0\uB7EC \uBCF4\uB354, \uCE58\uBA85\uC801 \uACBD\uACE0 \uBC30\uC9C0",
    paletteId: "--atom-palette-rose-500",
    hoverPaletteId: "--atom-palette-rose-600",
    subtlePaletteId: "--atom-palette-rose-50"
  },
  {
    id: "--atom-color-warning",
    key: "warning",
    name: "Warning (\uC8FC\uC758 \uBC0F \uB300\uAE30)",
    description: "\uC8FC\uC758 \uD658\uAE30 \uBC84\uD2BC, \uAC80\uD1A0 \uB300\uAE30 \uBC30\uC9C0, \uB9CC\uB8CC \uC784\uBC15 \uC54C\uB9BC",
    paletteId: "--atom-palette-amber-500",
    hoverPaletteId: "--atom-palette-amber-600",
    subtlePaletteId: "--atom-palette-amber-50"
  }
];
var DEFAULT_COMPONENT_TYPES = {
  button: [
    {
      id: "solid",
      name: "Solid (\uC194\uB9AC\uB4DC \uCC44\uC6C0\uD615)",
      description: "\uBC30\uACBD \uC0C9\uC0C1\uC774 \uAF49 \uCC2C \uAC00\uC7A5 \uC9C1\uAD00\uC801\uC774\uACE0 \uD45C\uC900\uC801\uC778 \uBC84\uD2BC \uC678\uD615",
      whenToUse: "\uD654\uBA74\uC5D0\uC11C \uAC00\uC7A5 \uC8FC\uBAA9\uC744 \uBC1B\uC544\uC57C \uD558\uB294 \uC8FC\uC694 \uC804\uD658 \uBAA9\uD45C(CTA)\uB098 \uC2DC\uAC01\uC801 \uBE44\uC911\uC774 \uD070 \uC561\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use for high-priority CTA actions where visual prominence is paramount.",
      antiPattern: "\uD55C \uD654\uBA74\uC5D0 \uB108\uBB34 \uB9CE\uC740 \uC194\uB9AC\uB4DC \uBC84\uD2BC\uC744 \uBC30\uCE58\uD558\uBA74 \uC2DC\uAC01\uC801 \uC704\uACC4\uAC00 \uBB34\uB108\uC9D1\uB2C8\uB2E4."
    },
    {
      id: "outline",
      name: "Outline (\uC678\uACFD\uC120\uD615)",
      description: "\uBC30\uACBD\uC774 \uD22C\uBA85\uD558\uACE0 \uD14C\uB450\uB9AC\uB85C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uC815\uB3C8\uB41C \uC678\uD615",
      whenToUse: "\uC194\uB9AC\uB4DC \uBC84\uD2BC\uC744 \uBCF4\uC870\uD558\uAC70\uB098, \uD544\uD130 \uC5F4\uAE30, \uB2E4\uC6B4\uB85C\uB4DC \uB4F1 2\uCC28 \uC561\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use to complement solid buttons for secondary actions like filters or downloads.",
      antiPattern: "\uC5B4\uB450\uC6B4 \uBC30\uACBD\uC5D0\uC11C \uC2DC\uC778\uC131\uC774 \uB5A8\uC5B4\uC9C0\uC9C0 \uC54A\uB3C4\uB85D \uCDA9\uBD84\uD55C \uB300\uBE44\uC758 \uBCF4\uB354 \uCEEC\uB7EC\uB97C \uC9C0\uC815\uD558\uC138\uC694."
    },
    {
      id: "ghost",
      name: "Ghost (\uACE0\uC2A4\uD2B8 \uD22C\uBA85\uD615)",
      description: "\uD3C9\uC0C1\uC2DC \uBC30\uACBD\uACFC \uD14C\uB450\uB9AC\uAC00 \uC5C6\uACE0 \uB9C8\uC6B0\uC2A4 \uC624\uBC84 \uC2DC\uC5D0\uB9CC \uC11C\uD53C\uC2A4\uAC00 \uBC18\uC751\uD558\uB294 \uBBF8\uB2C8\uBA40 \uC678\uD615",
      whenToUse: "\uD234\uBC14, \uD14C\uC774\uBE14 \uD589 \uB0B4 \uBA54\uB274, \uC0C1\uB2E8 \uB124\uBE44\uAC8C\uC774\uC158 \uB4F1 \uC8FC\uBCC0 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uCD5C\uC18C\uD654\uD574\uC57C \uD558\uB294 \uD658\uACBD\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use in dense toolbars or table actions to eliminate visual clutter.",
      antiPattern: "\uB2E8\uB3C5\uC73C\uB85C \uC911\uC694\uD55C CTA \uC561\uC158\uC5D0 \uACE0\uC2A4\uD2B8 \uBC84\uD2BC\uC744 \uC0AC\uC6A9\uD558\uBA74 \uC0AC\uC6A9\uC790\uAC00 \uBC84\uD2BC\uC778\uC9C0 \uC778\uC9C0\uD558\uC9C0 \uBABB\uD569\uB2C8\uB2E4."
    },
    {
      id: "soft",
      name: "Soft (\uC18C\uD504\uD2B8 \uC5F0\uD55C\uBC30\uACBD\uD615)",
      description: "10% \uC774\uD558\uC758 \uC740\uC740\uD55C \uD2F4\uD2B8 \uBC30\uACBD\uC774 \uAE54\uB824 \uBD80\uB4DC\uB7EC\uC6B4 \uB290\uB08C\uC744 \uC8FC\uB294 \uBAA8\uB358 SaaS \uC678\uD615",
      whenToUse: "\uC194\uB9AC\uB4DC\uBCF4\uB2E4 \uAC00\uBCCD\uC9C0\uB9CC \uC544\uC6C3\uB77C\uC778\uBCF4\uB2E4 \uB69C\uB837\uD55C \uC601\uC5ED\uAC10\uC744 \uC6D0\uD560 \uB54C, \uC815\uBCF4\uC131 \uD0DC\uADF8 \uBC84\uD2BC\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use for subtle emphasis softer than solid but more distinct than outline."
    },
    {
      id: "pill",
      name: "Pill (\uB77C\uC6B4\uB4DC \uCEA1\uC290\uD615)",
      description: "\uACE1\uB960 9999px(full)\uB85C \uC591 \uB05D\uC774 \uC644\uC804\uD788 \uB465\uAE00\uAC8C \uAC10\uC2F8\uC9C4 \uB77C\uC6B4\uB4DC\uD615 \uC678\uD615",
      whenToUse: "\uB79C\uB529 \uD398\uC774\uC9C0\uC758 \uD788\uC5B4\uB85C CTA, \uBAA8\uBC14\uC77C \uC571\uC758 \uD035 \uC561\uC158 \uB4F1 \uCE5C\uADFC\uD558\uACE0 \uCE90\uC8FC\uC5BC\uD55C \uB8E9\uC564\uD544\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use for consumer apps or hero CTA sections seeking a friendly aesthetic."
    },
    {
      id: "elevated",
      name: "Elevated (\uADF8\uB9BC\uC790 \uC785\uCCB4\uD615)",
      description: "\uBC14\uB2E5\uBA74\uC5D0\uC11C \uB5A0 \uC788\uB294 \uB4EF\uD55C \uC785\uCCB4\uC801 \uC100\uB3C4\uC6B0\uB97C \uAC00\uC9C4 \uD50C\uB85C\uD305 \uC678\uD615",
      whenToUse: "\uC9C0\uB3C4 \uC704 \uBC84\uD2BC, \uD50C\uB85C\uD305 \uC561\uC158 \uBC84\uD2BC(FAB)\uCC98\uB7FC \uB2E4\uB978 \uBCF5\uC7A1\uD55C \uCF58\uD150\uCE20 \uC704\uC5D0 \uB744\uC6CC\uC57C \uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use for Floating Action Buttons (FAB) resting above complex underlying content.",
      antiPattern: "\uD3C9\uBA74\uC801\uC778 \uBBF8\uB2C8\uBA40 \uB808\uC774\uC544\uC6C3\uC5D0 \uB0A8\uBC1C\uD558\uBA74 \uC2DC\uAC01\uC801 \uC704\uACC4\uAC00 \uC5B4\uC9C0\uB7EC\uC6CC\uC9D1\uB2C8\uB2E4."
    },
    {
      id: "glassmorphic",
      name: "Glassmorphic (\uAE00\uB798\uC2A4\uBAA8\uD53C\uC998 \uBC18\uD22C\uBA85\uD615)",
      description: "\uBC18\uD22C\uBA85 \uC720\uB9AC \uC9C8\uAC10(backdrop-blur)\uACFC \uBBF8\uC138\uD55C \uBE5B \uBC18\uC0AC \uBCF4\uB354\uB97C \uAC00\uC9C4 \uBBF8\uB798\uC9C0\uD5A5\uC801 \uC678\uD615",
      whenToUse: "\uBC30\uACBD\uC5D0 \uC774\uBBF8\uC9C0, \uBE44\uB514\uC624, \uC77C\uB7EC\uC2A4\uD2B8\uAC00 \uAE54\uB824 \uC788\uB294 \uD788\uC5B4\uB85C \uC139\uC158\uC774\uB098 \uB2E4\uD06C\uBAA8\uB4DC \uB300\uC2DC\uBCF4\uB4DC\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use over rich backgrounds, video heroes, or dark mode surfaces.",
      antiPattern: "\uB2E8\uC0C9 \uB2E8\uC870\uB85C\uC6B4 \uD770\uC0C9 \uBC30\uACBD \uC704\uC5D0 \uC0AC\uC6A9\uD558\uBA74 \uBE14\uB7EC \uD6A8\uACFC\uAC00 \uB4DC\uB7EC\uB098\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
    },
    {
      id: "link",
      name: "Link (\uD14D\uC2A4\uD2B8 \uC5B8\uB354\uB77C\uC778\uD615)",
      description: "\uBC15\uC2A4 \uD328\uB529 \uC5C6\uC774 \uBCF8\uBB38 \uC778\uB77C\uC778 \uB9C1\uD06C\uCC98\uB7FC \uBC11\uC904 \uC778\uD130\uB799\uC158\uC73C\uB85C \uB3D9\uC791\uD558\uB294 \uBBF8\uB2C8\uBA40 \uC678\uD615",
      whenToUse: "\uC57D\uAD00 \uC804\uBB38 \uBCF4\uAE30, \uB354 \uC54C\uC544\uBCF4\uAE30, \uC774\uC804 \uB2E8\uACC4 \uAC74\uB108\uB6F0\uAE30 \uB4F1 \uD14D\uC2A4\uD2B8 \uC911\uC2EC \uBCF4\uC870 \uB3D9\uC791\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: 'Use for inline text actions like "Learn more" or "Skip step".'
    },
    {
      id: "neumorphic",
      name: "Neumorphic (\uC18C\uD504\uD2B8 \uC5E0\uBCF4\uC2F1 \uC785\uCCB4\uD615)",
      description: "\uBC14\uB2E5 \uC11C\uD53C\uC2A4\uC5D0\uC11C \uBD80\uB4DC\uB7FD\uAC8C \uC19F\uC544\uC624\uB978 \uB4EF\uD55C \uC774\uC911 \uC74C\uC591 \uC100\uB3C4\uC6B0\uB97C \uAC00\uC9C4 \uC2A4\uD050\uC5B4\uBAA8\uD53D \uC678\uD615",
      whenToUse: "\uC2A4\uB9C8\uD2B8 \uD648 IoT \uC81C\uC5B4\uAE30, \uBBF8\uB514\uC5B4 \uD50C\uB808\uC774\uC5B4 \uD1A0\uAE00 \uBC84\uD2BC, \uC2E4\uD5D8\uC801 \uB300\uC2DC\uBCF4\uB4DC\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use for tactile physical control metaphors like smart home IoT controls."
    },
    {
      id: "floating-action",
      name: "Floating Action (FAB \uD50C\uB85C\uD305 \uC11C\uD074)",
      description: "\uD654\uBA74 \uC6B0\uD558\uB2E8\uC774\uB098 \uCF58\uD150\uCE20 \uC0C1\uB2E8\uC5D0 \uD56D\uC0C1 \uB5A0 \uC788\uB294 \uACE0\uB300\uBE44 \uC6D0\uD615 \uACE0\uC815 \uC561\uC158 \uC678\uD615",
      whenToUse: "\uBAA8\uBC14\uC77C/\uC6F9\uC758 \uBA54\uC778 \uAE00\uC4F0\uAE30(+), \uACE0\uAC1D \uC9C0\uC6D0 \uCC44\uD305 \uD31D\uC5C5 \uB4F1 \uD575\uC2EC \uD035 \uC561\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use for persistent quick-trigger actions like compose or chat support."
    }
  ],
  card: [
    {
      id: "outlined",
      name: "Outlined (\uC678\uACFD\uC120 \uD14C\uB450\uB9AC\uD615)",
      description: "\uC740\uC740\uD55C 1px \uD14C\uB450\uB9AC\uB85C \uCF58\uD150\uCE20 \uC601\uC5ED\uC744 \uC815\uAC08\uD558\uAC8C \uAD6C\uD68D\uD558\uB294 \uAE30\uBCF8 \uCE74\uB4DC",
      whenToUse: "\uB300\uC2DC\uBCF4\uB4DC \uC704\uC82F, \uADF8\uB9AC\uB4DC \uBAA9\uB85D \uB4F1 \uC815\uB3C8\uB41C \uAD6C\uC870\uC801 \uC815\uBCF4 \uD45C\uC2DC\uC5D0 \uC801\uD569\uD569\uB2C8\uB2E4."
    },
    {
      id: "elevated",
      name: "Elevated (\uADF8\uB9BC\uC790 \uBD80\uAC01\uD615)",
      description: "\uBD80\uB4DC\uB7EC\uC6B4 \uC785\uCCB4 \uC74C\uC601\uC744 \uD1B5\uD574 \uBC14\uB2E5\uBA74\uACFC \uBD84\uB9AC\uB418\uB294 \uD50C\uB85C\uD305 \uCE74\uB4DC",
      whenToUse: "\uCD94\uCC9C \uC694\uAE08\uC81C, \uD074\uB9AD \uAC00\uB2A5\uD55C \uC778\uD130\uB799\uD2F0\uBE0C \uCE74\uB4DC \uB4F1 \uC2DC\uAC01\uC801 \uBAB0\uC785\uC774 \uD544\uC694\uD55C \uACF3\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "flat",
      name: "Flat (\uD3C9\uBA74 \uBC30\uACBD\uD615)",
      description: "\uD14C\uB450\uB9AC \uC5C6\uC774 \uC740\uC740\uD55C \uBCF4\uC870 \uBC30\uACBD\uC0C9\uC73C\uB85C\uB9CC \uC601\uC5ED\uC744 \uAD6C\uBD84\uD558\uB294 \uBBF8\uB2C8\uBA40 \uCE74\uB4DC",
      whenToUse: "\uBC30\uACBD\uC774 \uBCF5\uC7A1\uD558\uC9C0 \uC54A\uC740 \uAE54\uB054\uD55C \uD654\uBA74\uC5D0\uC11C \uAC00\uBCBC\uC6B4 \uADF8\uB8F9\uD551\uC5D0 \uC801\uD569\uD569\uB2C8\uB2E4."
    },
    {
      id: "accent-border",
      name: "Accent-Border (\uAC15\uC870 \uB77C\uC778\uD615)",
      description: "\uC0C1\uB2E8\uC774\uB098 \uC88C\uCE21\uC5D0 \uBE0C\uB79C\uB4DC \uC561\uC13C\uD2B8 \uCEEC\uB7EC \uBC14\uAC00 \uB4E4\uC5B4\uAC04 \uC0C1\uD0DC \uAC15\uC870\uD615 \uCE74\uB4DC",
      whenToUse: "\uACF5\uC9C0\uC0AC\uD56D, \uACBD\uACE0 \uCE74\uB4DC, \uD504\uB9AC\uBBF8\uC5C4 \uD61C\uD0DD \uCE74\uB4DC \uB4F1 \uD2B9\uC815 \uC0C1\uD0DC\uB098 \uB4F1\uAE09\uC744 \uAC15\uC870\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    }
  ],
  badge: [
    {
      id: "solid",
      name: "Solid (\uCC44\uC6C0\uD615)",
      description: "\uC120\uBA85\uD55C \uBC30\uACBD\uC0C9\uC73C\uB85C \uC2DC\uC120\uC744 \uB044\uB294 \uACE0\uB300\uBE44 \uBC30\uC9C0",
      whenToUse: "\uC2E0\uADDC(New), \uAE34\uAE09 \uC54C\uB9BC \uB4F1 \uC989\uAC01\uC801\uC778 \uC8FC\uC758\uAC00 \uD544\uC694\uD55C \uACBD\uC6B0\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "subtle",
      name: "Subtle (\uC18C\uD504\uD2B8\uD615)",
      description: "\uC5F0\uD55C \uD2F4\uD2B8 \uBC30\uACBD\uACFC \uC9D9\uC740 \uD14D\uC2A4\uD2B8\uC758 \uC870\uD654\uB85C \uD3B8\uC548\uD55C \uAC00\uB3C5\uC131\uC744 \uC81C\uACF5\uD558\uB294 \uBC30\uC9C0",
      whenToUse: "\uD14C\uC774\uBE14 \uC0C1\uD0DC \uD0DC\uADF8, \uCE74\uD14C\uACE0\uB9AC \uBD84\uB958 \uB4F1 \uC77C\uC0C1\uC801\uC778 \uC815\uBCF4 \uD45C\uC2DC\uC5D0 \uAC00\uC7A5 \uAD8C\uC7A5\uB429\uB2C8\uB2E4."
    },
    {
      id: "outline",
      name: "Outline (\uC678\uACFD\uC120\uD615)",
      description: "\uD22C\uBA85 \uBC30\uACBD\uC5D0 1px \uD14C\uB450\uB9AC\uB9CC \uC788\uB294 \uBBF8\uB2C8\uBA40 \uBC30\uC9C0",
      whenToUse: "\uBC84\uC804 \uD0DC\uADF8, \uBA54\uD0C0\uB370\uC774\uD130 \uB4F1 \uBC30\uACBD \uC0C9\uC0C1\uC744 \uC624\uC5FC\uC2DC\uD0A4\uC9C0 \uC54A\uC544\uC57C \uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "dot",
      name: "Dot (\uC778\uB514\uCF00\uC774\uD130\uD615)",
      description: "\uC88C\uCE21\uC5D0 \uC2E4\uC2DC\uAC04 \uC0C1\uD0DC\uB97C \uC54C\uB9AC\uB294 \uC791\uC740 \uC6D0\uD615 \uC810(Dot)\uC774 \uD3EC\uD568\uB41C \uBC30\uC9C0",
      whenToUse: "\uC11C\uBC84 \uC0C1\uD0DC(\uC628\uB77C\uC778/\uC624\uD504\uB77C\uC778), \uBE4C\uB4DC \uC9C4\uD589 \uC5EC\uBD80 \uB4F1 \uB77C\uC774\uBE0C \uC0C1\uD0DC \uD45C\uC2DC\uC5D0 \uC801\uD569\uD569\uB2C8\uB2E4."
    }
  ],
  input: [
    {
      id: "outlined",
      name: "Outlined (\uD14C\uB450\uB9AC\uD615)",
      description: "1px \uC678\uACFD\uC120\uC73C\uB85C \uC785\uB825 \uD544\uB4DC\uC758 \uACBD\uACC4\uB97C \uBA85\uD655\uD788 \uC804\uB2EC\uD558\uB294 \uD45C\uC900 \uC778\uD48B",
      whenToUse: "\uB300\uBD80\uBD84\uC758 \uC6F9 \uD3FC, \uD68C\uC6D0\uAC00\uC785, \uACB0\uC81C \uB4F1 \uC2E0\uB8B0\uB3C4 \uB192\uC740 \uC785\uB825 \uC591\uC2DD\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "filled",
      name: "Filled (\uBC30\uACBD \uCC44\uC6C0\uD615)",
      description: "\uC740\uC740\uD55C \uD68C\uC0C9 \uBC30\uACBD\uC73C\uB85C \uD130\uCE58 \uC601\uC5ED\uC744 \uC9C1\uAD00\uC801\uC73C\uB85C \uBCF4\uC5EC\uC8FC\uB294 \uBAA8\uBC14\uC77C \uCE5C\uD654\uD615 \uC778\uD48B",
      whenToUse: "\uBAA8\uBC14\uC77C \uBDF0\uD3EC\uD2B8, \uBE60\uB978 \uD14D\uC2A4\uD2B8 \uC785\uB825\uCC3D \uB4F1\uC5D0 \uC801\uD569\uD569\uB2C8\uB2E4."
    },
    {
      id: "underlined",
      name: "Underlined (\uBC11\uC904\uD615)",
      description: "\uD558\uB2E8\uC5D0\uB9CC 1px \uACBD\uACC4\uC120\uC774 \uC788\uB294 \uBBF8\uB2C8\uBA40 \uD14D\uC2A4\uD2B8 \uC778\uD48B",
      whenToUse: "\uB514\uC790\uC778 \uC704\uC8FC\uC758 \uB7ED\uC154\uB9AC \uCEE4\uBA38\uC2A4\uB098 \uAC00\uBCBC\uC6B4 \uC778\uB77C\uC778 \uD3B8\uC9D1\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    }
  ],
  container: [
    {
      id: "boxed",
      name: "Boxed (\uD45C\uC900 \uC911\uC559 \uC815\uB82C \uCEE8\uD14C\uC774\uB108)",
      description: "\uCD5C\uB300 \uB108\uBE44(max-width)\uC640 \uC88C\uC6B0 \uAC70\uD130(gutter)\uB97C \uC720\uC9C0\uD558\uB294 \uD45C\uC900 \uD398\uC774\uC9C0 \uCEE8\uD14C\uC774\uB108",
      whenToUse: "\uB300\uBD80\uBD84\uC758 \uBCF8\uBB38 \uCF58\uD150\uCE20, \uB300\uC2DC\uBCF4\uB4DC, \uBB38\uC11C \uD398\uC774\uC9C0\uC758 \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uB798\uD37C\uB85C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "fluid",
      name: "Fluid (\uD480 \uC640\uC774\uB4DC \uCEE8\uD14C\uC774\uB108)",
      description: "\uD654\uBA74 \uC804\uCCB4 \uB108\uBE44\uB97C \uCC44\uC6B0\uBA70 \uC88C\uC6B0 \uC5EC\uBC31\uB9CC \uC720\uC9C0\uD558\uB294 \uD655\uC7A5\uD615 \uCEE8\uD14C\uC774\uB108",
      whenToUse: "\uB370\uC774\uD130 \uADF8\uB9AC\uB4DC, \uCE94\uBC84\uC2A4, \uC2A4\uD29C\uB514\uC624 \uB4F1 \uB113\uC740 \uC791\uC5C5 \uACF5\uAC04\uC774 \uD544\uC694\uD55C \uD654\uBA74\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "bordered",
      name: "Bordered (\uD14C\uB450\uB9AC \uC139\uC158 \uCEE8\uD14C\uC774\uB108)",
      description: "\uC678\uACFD\uC120\uACFC \uACE1\uB960\uC774 \uC801\uC6A9\uB418\uC5B4 \uB3C5\uB9BD\uB41C \uC139\uC158 \uAD6C\uD68D\uC744 \uD615\uC131\uD558\uB294 \uCE74\uB4DC\uD615 \uCEE8\uD14C\uC774\uB108",
      whenToUse: "\uC124\uC815 \uADF8\uB8F9, \uC694\uC57D \uD328\uB110 \uB4F1 \uC2DC\uAC01\uC801 \uACBD\uACC4\uAC00 \uD544\uC694\uD55C \uCEE8\uD14C\uC774\uB108\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "centered",
      name: "Centered (\uB0B4\uB85C\uC6B0 \uD3EC\uCEE4\uC2A4 \uCEE8\uD14C\uC774\uB108)",
      description: "\uC77D\uAE30 \uAC00\uB3C5\uC131\uC744 \uC704\uD574 \uC881\uC740 \uD3ED(sm/md)\uC73C\uB85C \uC911\uC559 \uC9D1\uC911 \uBC30\uCE58\uD55C \uCEE8\uD14C\uC774\uB108",
      whenToUse: "\uB85C\uADF8\uC778 \uD3FC, \uC544\uD2F0\uD074 \uBCF8\uBB38, \uCCB4\uD06C\uC544\uC6C3 \uB2E8\uACC4 \uB4F1\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    }
  ],
  layout: [
    {
      id: "stack-vertical",
      name: "Vertical Stack (\uC218\uC9C1 \uC2A4\uD0DD)",
      description: "\uC77C\uC815\uD55C gap \uAC04\uACA9\uC73C\uB85C \uC694\uC18C\uB4E4\uC744 \uC218\uC9C1\uC73C\uB85C \uC313\uB294 1\uCC28\uC6D0 \uC2A4\uD0DD \uB808\uC774\uC544\uC6C3",
      whenToUse: "\uD3FC \uD544\uB4DC, \uCE74\uB4DC \uB9AC\uC2A4\uD2B8, \uC124\uC815 \uC139\uC158\uC744 \uC704\uC544\uB798\uB85C \uC815\uB82C\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "stack-horizontal",
      name: "Horizontal Stack (\uC218\uD3C9 \uC2A4\uD0DD)",
      description: "\uC544\uC774\uD15C\uB4E4\uC744 \uC218\uD3C9 \uD589\uC73C\uB85C \uADE0\uC77C\uD558\uAC8C \uB098\uC5F4\uD558\uB294 \uC778\uB77C\uC778 \uD50C\uB809\uC2A4 \uC2A4\uD0DD",
      whenToUse: "\uD234\uBC14 \uC561\uC158, \uBC30\uC9C0 \uBAA9\uB85D, \uD3FC \uB77C\uBCA8-\uC785\uB825 \uC9DD\uC744 \uBC30\uCE58\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "grid-3col",
      name: "Responsive Grid (\uBC18\uC751\uD615 \uADF8\uB9AC\uB4DC)",
      description: "\uBDF0\uD3EC\uD2B8\uC5D0 \uB9DE\uCDB0 \uC5F4(Column) \uAC1C\uC218\uAC00 \uC720\uB3D9\uC801\uC73C\uB85C \uC804\uD658\uB418\uB294 \uB2E4\uB2E8 \uADF8\uB9AC\uB4DC",
      whenToUse: "\uB300\uC2DC\uBCF4\uB4DC KPI \uCE74\uB4DC, \uCEF4\uD3EC\uB10C\uD2B8 \uCE74\uD0C8\uB85C\uADF8 \uAC24\uB7EC\uB9AC \uB4F1\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "app-shell",
      name: "App Shell (\uC571 \uC258 \uACE8\uACA9)",
      description: "\uD5E4\uB354\xB7\uC0AC\uC774\uB4DC\uBC14\xB7\uBA54\uC778 \uBCF8\uBB38\xB7\uD478\uD130\uB85C \uAD6C\uC131\uB41C \uC804\uCCB4 \uC560\uD50C\uB9AC\uCF00\uC774\uC158 \uC258 \uAD6C\uC870",
      whenToUse: "SaaS \uCF58\uC194, \uC5B4\uB4DC\uBBFC \uB300\uC2DC\uBCF4\uB4DC, \uC2A4\uD29C\uB514\uC624 \uBA54\uC778 \uD504\uB808\uC784\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    }
  ],
  tree: [
    {
      id: "directory",
      name: "Directory (\uD30C\uC77C \uD0D0\uC0C9 \uD2B8\uB9AC)",
      description: "\uD3F4\uB354\uC640 \uD30C\uC77C\uC744 \uC810\uC120 \uAC00\uC774\uB4DC \uBC0F \uC811\uAE30/\uD3BC\uCE58\uAE30 \uD654\uC0B4\uD45C\uB85C \uD45C\uD604\uD558\uB294 \uAE30\uBCF8 \uD2B8\uB9AC",
      whenToUse: "\uD504\uB85C\uC81D\uD2B8 \uD30C\uC77C \uD0D0\uC0C9\uAE30, MIB/OID \uD2B8\uB9AC, \uB2E4\uB2E8\uACC4 \uCE74\uD14C\uACE0\uB9AC \uD0D0\uC0C9\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "compact",
      name: "Compact (\uACE0\uBC00\uB3C4 \uC555\uCD95 \uD2B8\uB9AC)",
      description: "\uD589 \uB192\uC774\uC640 \uB4E4\uC5EC\uC4F0\uAE30\uB97C \uC904\uC5EC \uB9CE\uC740 \uB178\uB4DC\uB97C \uD55C\uB208\uC5D0 \uC870\uB9DD\uD558\uB294 \uC555\uCD95 \uD2B8\uB9AC",
      whenToUse: "\uB300\uADDC\uBAA8 \uB370\uC774\uD130 \uC2A4\uD0A4\uB9C8, \uCF54\uB4DC \uC544\uC6C3\uB77C\uC778, \uC870\uC9C1\uB3C4 \uD328\uB110\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "bordered",
      name: "Bordered (\uCE74\uB4DC \uD328\uB110\uD615 \uD2B8\uB9AC)",
      description: "\uC678\uACFD\uC120 \uBCF4\uB354\uC640 \uC11C\uD53C\uC2A4 \uBC30\uACBD\uC774 \uACB0\uD569\uB41C \uB3C5\uB9BD \uD328\uB110\uD615 \uD2B8\uB9AC \uBDF0",
      whenToUse: "\uC124\uC815 \uB9C8\uBC95\uC0AC, \uAD8C\uD55C \uC120\uD0DD \uD2B8\uB9AC, \uC88C\uCE21 \uC0AC\uC774\uB4DC \uC778\uC2A4\uD399\uD130\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    }
  ],
  "token-select": [
    {
      id: "outlined",
      name: "Outlined (\uD45C\uC900 \uAC80\uC0C9 \uB4DC\uB86D\uB2E4\uC6B4)",
      description: "\uBA85\uD655\uD55C 1px \uD14C\uB450\uB9AC\uC640 \uAC80\uC0C9 \uC778\uD48B, \uCEEC\uB7EC \uC2A4\uC640\uCE58 \uD504\uB9AC\uBDF0\uB97C \uC81C\uACF5\uD558\uB294 \uD45C\uC900 \uD1A0\uD070 \uC140\uB809\uD2B8",
      whenToUse: "\uC778\uC2A4\uD399\uD130 \uC18D\uC131 \uBC14\uC778\uB529, \uD14C\uB9C8 \uC5D0\uB514\uD130 \uD1A0\uD070 \uC120\uD0DD \uB4F1 \uC815\uBC00\uD55C \uD1A0\uD070 \uC870\uD68C\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "filled",
      name: "Filled (\uBC30\uACBD \uCC44\uC6C0\uD615 \uC140\uB809\uD2B8)",
      description: "\uC740\uC740\uD55C \uC11C\uD53C\uC2A4 \uBC30\uACBD\uC774 \uCC44\uC6CC\uC838 \uD074\uB9AD \uC601\uC5ED\uC774 \uBA85\uD655\uD55C \uD544\uD130\uB9C1\uC6A9 \uD1A0\uD070 \uC140\uB809\uD2B8",
      whenToUse: "\uD234\uBC14 \uD544\uD130, \uBAA8\uB2EC \uC0C1\uB2E8 \uBE60\uB978 \uD1A0\uD070 \uC804\uD658 \uCEE8\uD2B8\uB864\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "subtle",
      name: "Subtle (\uBBF8\uB2C8\uBA40 \uC778\uB77C\uC778 \uC140\uB809\uD2B8)",
      description: "\uD14C\uB450\uB9AC\uB97C \uC228\uAE30\uACE0 \uD638\uBC84 \uC2DC\uC5D0\uB9CC \uBC18\uC751\uD558\uC5EC \uC881\uC740 \uACF5\uAC04\uC5D0 \uB179\uC544\uB4DC\uB294 \uC778\uB77C\uC778 \uC140\uB809\uD2B8",
      whenToUse: "\uD14C\uC774\uBE14 \uC140 \uB0B4\uBD80 \uD3B8\uC9D1, \uACE0\uBC00\uB3C4 \uC778\uC2A4\uD399\uD130 \uD5E4\uB354\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    }
  ],
  alert: [
    {
      id: "soft",
      name: "Soft (\uC5F0\uD55C \uD2F4\uD2B8 \uCF5C\uC544\uC6C3)",
      description: "\uC2DC\uB9E8\uD2F1 \uC0C9\uC0C1\uC758 10% \uD2F4\uD2B8 \uBC30\uACBD\uC73C\uB85C \uBD80\uB4DC\uB7FD\uAC8C \uC8FC\uC758\uB97C \uD658\uAE30\uD558\uB294 \uAE30\uBCF8 \uC54C\uB9BC \uBC30\uB108",
      whenToUse: "\uD398\uC774\uC9C0 \uC0C1\uB2E8 \uC548\uB0B4, \uD3FC \uAC80\uC99D \uACB0\uACFC, \uD301 \uCF5C\uC544\uC6C3\uC5D0 \uAC00\uC7A5 \uB110\uB9AC \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "outlined",
      name: "Outlined (\uC120\uBA85\uD55C \uC678\uACFD\uC120\uD615)",
      description: "\uAE68\uB057\uD55C \uBC30\uACBD \uC704\uC5D0 \uC2DC\uB9E8\uD2F1 1px \uD14C\uB450\uB9AC\uB85C \uACBD\uACC4\uB97C \uAC15\uC870\uD558\uB294 \uC815\uAC08\uD55C \uC54C\uB9BC",
      whenToUse: "\uBC30\uACBD \uC0C9\uC0C1 \uAC04\uC12D\uC774 \uC801\uC740 \uCE74\uB4DC \uB0B4\uBD80\uB098 \uBBF8\uB2C8\uBA40 \uBB38\uC11C \uC139\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "solid",
      name: "Solid (\uACE0\uB300\uBE44 \uCC44\uC6C0\uD615)",
      description: "\uC2DC\uB9E8\uD2F1 \uCEEC\uB7EC\uAC00 \uAF49 \uCC28\uC11C \uC989\uAC01\uC801\uC778 \uC2DC\uC120 \uC9D1\uC911\uC744 \uC720\uB3C4\uD558\uB294 \uACE0\uAC15\uB3C4 \uC54C\uB9BC \uBC30\uB108",
      whenToUse: "\uCE58\uBA85\uC801 \uC2DC\uC2A4\uD15C \uC7A5\uC560, \uC11C\uBE44\uC2A4 \uC810\uAC80 \uACF5\uC9C0 \uB4F1 \uCD5C\uC6B0\uC120 \uC54C\uB9BC\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "accent-border",
      name: "Accent-Border (\uC88C\uCE21 \uAC15\uC870 \uBC14\uD615)",
      description: "\uC88C\uCE21 4px \uCEEC\uB7EC \uC778\uB514\uCF00\uC774\uD130 \uBC14\uAC00 \uD2B9\uC9D5\uC778 \uBB38\uC11C\xB7\uB178\uD2B8 \uC2A4\uD0C0\uC77C \uCF5C\uC544\uC6C3",
      whenToUse: "\uAC00\uC774\uB4DC \uBB38\uC11C \uC8FC\uC758\uC0AC\uD56D, AI \uC81C\uC548 \uC694\uC57D, \uC778\uC6A9 \uBE14\uB85D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    }
  ],
  sheet: [
    {
      id: "bottom-sheet",
      name: "Bottom Sheet (\uD558\uB2E8 \uC2AC\uB77C\uC774\uB4DC \uC2DC\uD2B8)",
      description: "\uBAA8\uBC14\uC77C/\uD0DC\uBE14\uB9BF \uBDF0\uD3EC\uD2B8 \uD558\uB2E8\uC5D0\uC11C \uC704\uB85C \uBBF8\uB044\uB7EC\uC838 \uC62C\uB77C\uC624\uB294 \uB465\uADFC \uC0C1\uB2E8 \uC561\uC158 \uC2DC\uD2B8",
      whenToUse: "\uD544\uD130 \uC120\uD0DD, \uACF5\uC720 \uBA54\uB274, \uACB0\uC81C \uD655\uC778 \uB4F1 \uC5C4\uC9C0 \uC190\uAC00\uB77D \uC601\uC5ED \uC778\uD130\uB799\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "side-drawer",
      name: "Side Drawer (\uC6B0\uCE21 \uC0C1\uC138 \uC2DC\uD2B8)",
      description: "\uD604\uC7AC \uBAA9\uB85D \uCEE8\uD14D\uC2A4\uD2B8\uB97C \uC720\uC9C0\uD55C \uCC44 \uC6B0\uCE21\uC5D0\uC11C \uC2AC\uB77C\uC774\uB4DC \uC778 \uB418\uB294 \uC0C1\uC138 \uD3B8\uC9D1 \uC2DC\uD2B8",
      whenToUse: "\uD56D\uBAA9 \uC0C1\uC138 \uC870\uD68C, \uC778\uC2A4\uD399\uD130 \uD3B8\uC9D1, \uC7A5\uBC14\uAD6C\uB2C8 \uBBF8\uB9AC\uBCF4\uAE30\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "floating-sheet",
      name: "Floating Sheet (\uC5EC\uBC31 \uD50C\uB85C\uD305 \uC2DC\uD2B8)",
      description: "\uD654\uBA74 \uAC00\uC7A5\uC790\uB9AC\uC5D0\uC11C \uC57D\uAC04 \uB744\uC6CC\uC838 \uC785\uCCB4 \uADF8\uB9BC\uC790\uB97C \uAC16\uB294 \uBAA8\uB358 \uD50C\uB85C\uD305 \uC2DC\uD2B8",
      whenToUse: "\uB300\uC2DC\uBCF4\uB4DC \uBA40\uD2F0 \uD0DC\uC2A4\uD0B9 \uD328\uB110, AI \uCF54\uD30C\uC77C\uB7FF \uBCF4\uC870 \uCC3D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    }
  ]
};
var STUDIO_ID_ALIASES = {
  dialog: "modal",
  selection: "switch",
  sidemenu: "sidebar",
  "side-menu": "sidebar",
  tokenselect: "token-select"
};
function resolveStudioComponentId(rawId) {
  const normalized = (rawId || "").trim().toLowerCase();
  return STUDIO_ID_ALIASES[normalized] || normalized;
}
function getComponentTypes(componentId, customTypes) {
  if (customTypes && customTypes.length > 0) return customTypes;
  const resolvedId = resolveStudioComponentId(componentId);
  const presets = DEFAULT_COMPONENT_TYPES[resolvedId];
  if (presets && presets.length > 0) return presets;
  return [
    {
      id: "default-type",
      name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
      description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
      whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "outlined-type",
      name: "Outlined (\uC678\uACFD\uC120\uD615)",
      description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
      whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    }
  ];
}
var SEMANTIC_VARIABLE_DICTIONARY = {
  primary: {
    role: "primary",
    label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
    meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8",
    badgeColorClass: "bg-(--accent-primary)/10 text-(--accent-primary) border-(--accent-primary)/20 dark:text-blue-400"
  },
  secondary: {
    role: "secondary",
    label: "\uC138\uCEE8\uB354\uB9AC (Secondary)",
    meaning: "\uCDE8\uC18C, \uB2EB\uAE30, \uC774\uC804 \uB2E8\uACC4 \uB4F1 \uC0AC\uC6A9\uC790 \uC778\uD130\uB799\uC158\uC744 \uC9C0\uC6D0\uD558\uB418 \uC2DC\uAC01\uC801 \uBD80\uB2F4\uC744 \uC904\uC774\uB294 \uC911\uB9BD \uD1A4 \uC758\uBBF8",
    badgeColorClass: "bg-(--bg-secondary)/10 text-(--text-secondary) border-gray-500/20 dark:text-(--text-muted)"
  },
  danger: {
    role: "danger",
    label: "\uC704\uD5D8/\uC5D0\uB7EC (Danger / Destructive)",
    meaning: "\uBE68\uAC15\uC740 \uC704\uD5D8! \uC601\uAD6C \uC0AD\uC81C, \uACC4\uC57D \uD574\uC9C0, \uBCF5\uAD6C \uBD88\uAC00 \uC791\uC5C5 \uB4F1 \uCE58\uBA85\uC801 \uACB0\uACFC\uB97C \uACBD\uACE0\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8",
    badgeColorClass: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400"
  },
  warning: {
    role: "warning",
    label: "\uC8FC\uC758/\uACBD\uACE0 (Warning)",
    meaning: "\uB178\uB791\uC740 \uACBD\uACE0! \uC8FC\uC758 \uD658\uAE30, \uB9CC\uB8CC \uC784\uBC15, \uB300\uAE30/\uBCF4\uB958 \uB4F1 \uC0AC\uC6A9\uC790\uC758 \uCD94\uAC00 \uD655\uC778\uC774 \uD544\uC694\uD55C \uC0C1\uD669\uC744 \uC54C\uB9AC\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8",
    badgeColorClass: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400"
  },
  success: {
    role: "success",
    label: "\uC131\uACF5/\uC644\uB8CC (Success)",
    meaning: "\uCD08\uB85D\uC740 \uC131\uACF5! \uACB0\uC81C \uC644\uB8CC, \uC815\uC0C1 \uAC00\uB3D9, \uB370\uC774\uD130 \uC800\uC7A5 \uC644\uB8CC \uB4F1 \uAE0D\uC815\uC801 \uACB0\uACFC\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8",
    badgeColorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
  },
  info: {
    role: "info",
    label: "\uC548\uB0B4/\uC815\uBCF4 (Info)",
    meaning: "\uD30C\uB791\uC740 \uC548\uB0B4! \uC77C\uBC18 \uB3C4\uC6C0\uB9D0, \uC2E0\uADDC \uAE30\uB2A5 \uBC30\uC9C0 \uB4F1 \uC2DC\uC2A4\uD15C \uC815\uBCF4 \uACE0\uC9C0\uB97C \uB098\uD0C0\uB0B4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8",
    badgeColorClass: "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400"
  },
  outline: {
    role: "outline",
    label: "\uC678\uACFD\uC120 (Outline)",
    meaning: "\uC740\uC740\uD55C \uD14C\uB450\uB9AC\uB97C \uAC15\uC870\uD558\uC5EC \uBC30\uACBD \uCC44\uC6B0\uAE30 \uC5C6\uC774 \uAC00\uBCCD\uACE0 \uC815\uB3C8\uB41C \uB290\uB08C\uC744 \uC8FC\uB294 \uBCF4\uC870 \uC120\uD0DD \uC758\uBBF8",
    badgeColorClass: "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400"
  },
  ghost: {
    role: "ghost",
    label: "\uACE0\uC2A4\uD2B8 (Ghost)",
    meaning: "\uBC30\uACBD\uACFC \uD14C\uB450\uB9AC\uAC00 \uC5C6\uB294 \uC644\uC804 \uD22C\uBA85 \uD615\uD0DC\uB85C \uD638\uBC84 \uC2DC\uC5D0\uB9CC \uBC18\uC751\uD558\uC5EC \uC8FC\uBCC0 \uC2DC\uAC01\uC801 \uC7A1\uC74C\uC744 \uCD5C\uC18C\uD654\uD558\uB294 \uC758\uBBF8",
    badgeColorClass: "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400"
  }
};
var COMPONENT_STATUS_PRESETS = [
  {
    status: "default",
    label: "\uAE30\uBCF8 (Default)",
    description: "\uC778\uD130\uB799\uC158 \uBC1C\uC0DD \uC804\uC758 \uD3C9\uC0C1\uC2DC \uC0C1\uD0DC",
    descriptionEn: "Resting state before any user interaction",
    behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9",
    behaviorEn: "Standard background and border tokens applied"
  },
  {
    status: "hover",
    label: "\uD638\uBC84 (Hover)",
    description: "\uB9C8\uC6B0\uC2A4 \uD3EC\uC778\uD130\uAC00 \uC694\uC18C \uC704\uC5D0 \uC704\uCE58\uD588\uC744 \uB54C\uC758 \uC2DC\uAC01\uC801 \uD53C\uB4DC\uBC31 \uC0C1\uD0DC",
    descriptionEn: "Visual feedback state when mouse pointer hovers over element",
    behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer, \uC740\uC740\uD55C \uC74C\uC601 \uD53C\uB4DC\uBC31",
    behaviorEn: "hoverBackground token applied, cursor: pointer, subtle shadow"
  },
  {
    status: "active",
    label: "\uD074\uB9AD (Active)",
    description: "\uB9C8\uC6B0\uC2A4 \uBC84\uD2BC\uC744 \uB204\uB974\uACE0 \uC788\uB294 \uC21C\uAC04\uC758 \uC555\uCD95 \uC0C1\uD0DC",
    descriptionEn: "Pressed state while mouse button or touch is held",
    behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31",
    behaviorEn: "scale-[0.97] press animation with emphasized color"
  },
  {
    status: "focus",
    label: "\uD3EC\uCEE4\uC2A4 (Focus)",
    description: "\uD0A4\uBCF4\uB4DC Tab \uC811\uADFC\uC131 \uCD08\uC810\uC774 \uB9DE\uCDB0\uC9C4 \uC0C1\uD0DC",
    descriptionEn: "Accessibility state when keyboard focus is received",
    behavior: "outline 2px solid primary, outline-offset 2px \uD3EC\uCEE4\uC2A4 \uB9C1 \uD45C\uC2DC",
    behaviorEn: "outline 2px solid primary, outline-offset 2px focus ring"
  },
  {
    status: "disabled",
    label: "\uBE44\uD65C\uC131 (Disabled)",
    description: "\uC785\uB825 \uBBF8\uC644\uB8CC \uB610\uB294 \uAD8C\uD55C \uBD80\uC871\uC73C\uB85C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uB294 \uC0C1\uD0DC",
    descriptionEn: "Unavailable state due to incomplete input or missing permissions",
    behavior: "opacity 40%, cursor: not-allowed, \uBAA8\uB4E0 \uB9C8\uC6B0\uC2A4/\uD0A4\uBCF4\uB4DC \uC774\uBCA4\uD2B8 \uCC28\uB2E8",
    behaviorEn: "opacity 40%, cursor: not-allowed, all mouse/keyboard events blocked"
  },
  {
    status: "loading",
    label: "\uB85C\uB529 (Loading)",
    description: "\uBE44\uB3D9\uAE30 \uD1B5\uC2E0 \uB610\uB294 \uC791\uC5C5\uC774 \uCC98\uB9AC \uC911\uC778 \uC9C4\uD589 \uC0C1\uD0DC",
    descriptionEn: "In-progress state during async operations or network requests",
    behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD45C\uC2DC, pointer-events: none, \uC911\uBCF5 \uD074\uB9AD \uBC29\uC9C0",
    behaviorEn: "Spinner indicator displayed, pointer-events: none, prevents re-clicks"
  }
];
function resolveVariableRole(variableId) {
  const lower = variableId.toLowerCase();
  if (lower.includes("destructive") || lower.includes("danger") || lower.includes("error")) return "danger";
  if (lower.includes("warning") || lower.includes("pending") || lower.includes("amber")) return "warning";
  if (lower.includes("success") || lower.includes("approved") || lower.includes("emerald")) return "success";
  if (lower.includes("info") || lower.includes("guide") || lower.includes("sky")) return "info";
  if (lower.includes("ghost")) return "ghost";
  if (lower.includes("outline")) return "outline";
  if (lower.includes("secondary")) return "secondary";
  return "primary";
}
function resolveTypeSpec(componentId, variableId, customName) {
  const role = resolveVariableRole(variableId);
  const comp = componentId.toLowerCase();
  if (comp === "button") {
    if (role === "primary") {
      return {
        id: "primary-cta",
        name: "\uC8FC\uC694 \uC2E4\uD589 (Primary CTA)",
        whenToUse: "\uD654\uBA74\uC5D0\uC11C \uC0AC\uC6A9\uC790\uAC00 \uBC18\uB4DC\uC2DC \uB3C4\uB2EC\uD574\uC57C \uD558\uB294 1\uC21C\uC704 \uD575\uC2EC \uC804\uD658 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uAC00\uC785 \uB4F1)\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use for the primary, high-priority conversion goal on screen (checkout, submit, sign up).",
        antiPattern: "\uD55C \uD654\uBA74\uC5D0 \uC5EC\uB7EC \uAC1C\uC758 Primary \uBC84\uD2BC\uC744 \uB098\uC5F4\uD558\uBA74 \uC0AC\uC6A9\uC790\uC758 \uACB0\uC815 \uD53C\uB85C\uB97C \uC720\uBC1C\uD569\uB2C8\uB2E4."
      };
    }
    if (role === "danger") {
      return {
        id: "destructive-action",
        name: "\uC704\uD5D8/\uC0AD\uC81C \uC2E4\uD589 (Destructive Action)",
        whenToUse: "\uC601\uAD6C \uC0AD\uC81C, \uACC4\uC815 \uD0C8\uD1F4, \uBCF5\uAD6C \uBD88\uAC00\uB2A5\uD55C \uB370\uC774\uD130 \uD3D0\uAE30 \uB4F1 \uC704\uD5D8\uD558\uACE0 \uCE58\uBA85\uC801\uC778 \uC791\uC5C5\uC744 \uC2E4\uD589\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use for hazardous or irreversible actions such as permanent deletion or account termination.",
        antiPattern: "\uB2E8\uC21C\uD55C \uCDE8\uC18C\uB098 \uB4A4\uB85C \uAC00\uAE30 \uB3D9\uC791\uC5D0 \uBD89\uC740\uC0C9 \uD30C\uAD34\uC801 \uBC84\uD2BC\uC744 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694."
      };
    }
    if (role === "warning") {
      return {
        id: "caution-action",
        name: "\uC8FC\uC758 \uD658\uAE30 (Caution / Warning Action)",
        whenToUse: "\uBE44\uC6A9 \uBC1C\uC0DD \uACBD\uACE0, \uC124\uC815 \uC784\uC2DC \uC911\uB2E8, \uC8FC\uC758\uAC00 \uD544\uC694\uD55C \uC870\uAC74\uBD80 \uC2B9\uC778\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use for actions requiring caution, cost warnings, or temporary suspension."
      };
    }
    if (role === "success") {
      return {
        id: "confirm-action",
        name: "\uC2B9\uC778/\uC644\uB8CC \uC2E4\uD589 (Confirm / Success Action)",
        whenToUse: "\uACB0\uC81C \uCD5C\uC885 \uC2B9\uC778, \uAC00\uC785 \uC644\uB8CC, \uBCC0\uACBD \uC0AC\uD56D \uD655\uC815 \uB4F1 \uAE0D\uC815\uC801 \uC561\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use for positive completion actions like final payment approval or confirmation."
      };
    }
    if (role === "secondary") {
      return {
        id: "secondary-action",
        name: "\uBCF4\uC870 \uB3D9\uC791 (Secondary Action)",
        whenToUse: "\uCDE8\uC18C, \uB2EB\uAE30, \uC774\uC804 \uB2E8\uACC4\uB85C \uB3CC\uC544\uAC00\uAE30 \uB4F1 \uC8FC\uC694 \uC561\uC158\uC744 \uBCF4\uC870\uD558\uB294 \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use for supporting actions like cancel, close, or navigating back."
      };
    }
    if (role === "ghost") {
      return {
        id: "subtle-action",
        name: "\uBBF8\uB2C8\uBA40 \uC800\uAC15\uB3C4 \uC561\uC158 (Ghost / Subtle)",
        whenToUse: "\uD14C\uC774\uBE14 \uD589 \uB0B4 \uC635\uC158 \uBA54\uB274, \uD234\uBC14\uC758 \uB3C4\uAD6C \uC120\uD0DD \uB4F1 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uCD5C\uC18C\uD654\uD574\uC57C \uD558\uB294 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use in table rows or toolbars where visual noise should be minimized."
      };
    }
    return {
      id: "standard-action",
      name: "\uC678\uACFD\uC120 \uBCF4\uC870 \uC561\uC158 (Outline Action)",
      whenToUse: "\uD544\uD130 \uC5F4\uAE30, \uB2E4\uC6B4\uB85C\uB4DC \uB4F1 2\uCC28 \uC561\uC158\uC758 \uACBD\uACC4\uB97C \uAC00\uBCCD\uAC8C \uAC15\uC870\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use to subtly highlight borders of secondary actions like filters or downloads."
    };
  }
  if (comp === "badge") {
    if (role === "danger") {
      return {
        id: "error-status",
        name: "\uC5D0\uB7EC/\uC704\uD5D8 \uC0C1\uD0DC (Error Status)",
        whenToUse: "\uC11C\uBE44\uC2A4 \uC7A5\uC560, \uACB0\uC81C \uC2E4\uD328, \uC720\uD6A8\uAE30\uAC04 \uB9CC\uB8CC \uB4F1 \uAE34\uAE09 \uC870\uCE58\uAC00 \uD544\uC694\uD55C \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
      };
    }
    if (role === "warning") {
      return {
        id: "pending-status",
        name: "\uAC80\uD1A0/\uB300\uAE30 \uC0C1\uD0DC (Warning / Pending)",
        whenToUse: "\uC2B9\uC778 \uB300\uAE30 \uC911, \uAC80\uD1A0 \uD544\uC694, \uC794\uC5EC \uC77C\uC218 \uC784\uBC15 \uB4F1 \uC8FC\uC758\uB97C \uC694\uAD6C\uD558\uB294 \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
      };
    }
    if (role === "success") {
      return {
        id: "success-status",
        name: "\uC815\uC0C1/\uC131\uACF5 \uC0C1\uD0DC (Active / Success)",
        whenToUse: "\uC11C\uBE44\uC2A4 \uD65C\uC131(Active), \uACB0\uC81C \uC644\uB8CC, \uC778\uC99D \uC131\uACF5 \uB4F1 \uC815\uC0C1 \uC6B4\uC601 \uC0C1\uD0DC\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
      };
    }
    return {
      id: "info-tag",
      name: "\uCE74\uD14C\uACE0\uB9AC/\uB77C\uBCA8 \uD0DC\uADF8 (Category / Label Tag)",
      whenToUse: "\uD56D\uBAA9\uC758 \uCE74\uD14C\uACE0\uB9AC, \uBC84\uC804 \uD0DC\uADF8, \uC2E0\uADDC(New) \uC9C0\uD45C\uB97C \uAC04\uACB0\uD558\uAC8C \uD45C\uD604\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    };
  }
  if (comp === "input" || comp === "textarea") {
    if (role === "danger") {
      return {
        id: "error-input",
        name: "\uC720\uD6A8\uC131 \uC624\uB958 \uC785\uB825 (Validation Error)",
        whenToUse: "\uD544\uC218 \uD56D\uBAA9 \uB204\uB77D, \uD615\uC2DD \uBD88\uC77C\uCE58 \uB4F1 \uC0AC\uC6A9\uC790\uC758 \uC989\uAC01\uC801\uC778 \uC218\uC815\uC774 \uD544\uC694\uD55C \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        antiPattern: "\uC624\uB958 \uBA54\uC2DC\uC9C0 \uC5C6\uC774 \uD14C\uB450\uB9AC\uB9CC \uBD89\uAC8C \uD45C\uC2DC\uD558\uC9C0 \uB9C8\uC138\uC694."
      };
    }
    if (role === "success") {
      return {
        id: "success-input",
        name: "\uAC80\uC99D \uC644\uB8CC \uC785\uB825 (Validation Success)",
        whenToUse: "\uC544\uC774\uB514 \uC911\uBCF5 \uAC80\uC0AC \uD1B5\uACFC, \uBCF4\uC548 \uBE44\uBC00\uBC88\uD638 \uCDA9\uC871 \uB4F1 \uC720\uD6A8\uC131 \uAC80\uC99D\uC774 \uC644\uB8CC\uB41C \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
      };
    }
    return {
      id: "default-input",
      name: "\uD45C\uC900 \uD14D\uC2A4\uD2B8 \uC785\uB825 (Standard Field)",
      whenToUse: "\uC77C\uBC18\uC801\uC778 \uD14D\uC2A4\uD2B8, \uC774\uBA54\uC77C, \uAC80\uC0C9\uC5B4, \uC22B\uC790 \uB4F1\uC758 \uB370\uC774\uD130\uB97C \uC785\uB825\uBC1B\uB294 \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    };
  }
  if (comp === "chart") {
    if (role === "success") {
      return {
        id: "growth-metric",
        name: "\uC131\uC7A5 \uC9C0\uD45C \uD2B8\uB80C\uB4DC (Growth Metric)",
        whenToUse: "\uB9E4\uCD9C \uC131\uC7A5, \uD65C\uC131 \uC0AC\uC6A9\uC790 \uC99D\uAC00, \uBAA9\uD45C \uB2EC\uC131 \uB4F1 \uAE0D\uC815\uC801 \uC131\uACFC\uB97C \uC2DC\uAC01\uD654\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use to visualize positive outcomes like revenue growth or target completion."
      };
    }
    if (role === "danger") {
      return {
        id: "alert-metric",
        name: "\uC704\uD5D8/\uC190\uC2E4 \uACBD\uACE0 (Risk / Deficit Alert)",
        whenToUse: "\uC11C\uBC84 \uC7A5\uC560\uC728, \uC190\uC2E4\uC561 \uC99D\uAC00, \uBCD1\uBAA9 \uAD6C\uAC04 \uB4F1 \uC989\uAC01\uC801\uC778 \uC870\uCE58\uAC00 \uD544\uC694\uD55C \uC774\uC0C1 \uC9C0\uD45C\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use for anomaly metrics like incident rates or deficit increases needing action."
      };
    }
    if (variableId.includes("bar")) {
      return {
        id: "category-comparison",
        name: "\uD56D\uBAA9\uBCC4 \uC2E4\uC801 \uBE44\uAD50 (Category Comparison)",
        whenToUse: "\uC6D4\uBCC4 \uC2E4\uC801\uC774\uB098 \uBD80\uC11C\uBCC4 \uB370\uC774\uD130 \uB4F1 \uCE74\uD14C\uACE0\uB9AC \uAC04\uC758 \uC218\uCE58\uB97C \uBA85\uD655\uD558\uAC8C \uB300\uC870\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use to clearly compare values across distinct categories or time periods."
      };
    }
    if (variableId.includes("area")) {
      return {
        id: "volume-trend",
        name: "\uB204\uC801 \uBCFC\uB968 \uCD94\uC138 (Cumulative Volume)",
        whenToUse: "\uD2B8\uB798\uD53D \uB204\uC801\uB7C9, \uCD1D \uAC70\uB798\uC561 \uB4F1 \uBA74\uC801\uACFC \uBCFC\uB968\uAC10\uC744 \uD568\uAED8 \uAC15\uC870\uD574\uC57C \uD558\uB294 \uC9C0\uD45C\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use for metrics emphasizing volume such as cumulative traffic or total volume."
      };
    }
    return {
      id: "trend-tracking",
      name: "\uC2DC\uACC4\uC5F4 \uCD94\uC138 \uCD94\uC801 (TimeSeries Trend)",
      whenToUse: "\uC8FC\uAC00, \uC628\uB3C4, \uC131\uB2A5 \uC9C0\uD45C \uB4F1 \uC2DC\uAC04 \uD750\uB984\uC5D0 \uB530\uB978 \uC5F0\uC18D\uC801 \uB370\uC774\uD130 \uBCC0\uD654\uB97C \uBAA8\uB2C8\uD130\uB9C1\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use to monitor continuous data changes over time such as performance or prices."
    };
  }
  if (comp === "offcanvas") {
    if (variableId.includes("left") || variableId.includes("nav")) {
      return {
        id: "mobile-navigation",
        name: "\uBAA8\uBC14\uC77C \uD0D0\uC0C9 \uC11C\uB78D (Mobile Navigation Drawer)",
        whenToUse: "\uBAA8\uBC14\uC77C \uBDF0\uD3EC\uD2B8\uB098 \uC881\uC740 \uD654\uBA74\uC5D0\uC11C \uAE00\uB85C\uBC8C \uB124\uBE44\uAC8C\uC774\uC158 \uBA54\uB274\uB97C \uC2AC\uB77C\uC774\uB4DC\uB85C \uC81C\uACF5\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use to provide global navigation menus via slide-out drawer on mobile or narrow screens."
      };
    }
    if (variableId.includes("bottom") || variableId.includes("sheet")) {
      return {
        id: "bottom-filter-sheet",
        name: "\uD558\uB2E8 \uD544\uD130/\uC791\uC5C5 \uC2DC\uD2B8 (Bottom Filter Sheet)",
        whenToUse: "\uBAA8\uBC14\uC77C \uC5C4\uC9C0 \uC601\uC5ED\uC5D0 \uCD5C\uC801\uD654\uB41C \uD544\uD130 \uC124\uC815, \uC815\uB82C \uC635\uC158, \uBD80\uAC00 \uC791\uC5C5 \uC561\uC158\uC744 \uB178\uCD9C\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use for filter controls, sorting options, or supplementary actions optimized for thumb reach."
      };
    }
    if (variableId.includes("settings")) {
      return {
        id: "settings-inspector",
        name: "\uD658\uACBD\uC124\uC815 \uC2AC\uB77C\uC774\uB4DC\uC624\uBC84 (Settings Slide-over)",
        whenToUse: "\uC0AC\uC6A9\uC790 \uD658\uACBD\uC124\uC815, \uD14C\uB9C8 \uC870\uC815, \uC2DC\uC2A4\uD15C \uD30C\uB77C\uBBF8\uD130 \uBCC0\uACBD \uB4F1 \uBCF4\uC870 \uC124\uC815 \uC791\uC5C5\uC744 \uBD84\uB9AC\uD558\uC5EC \uC81C\uACF5\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use for secondary configuration tasks like user preferences, theme controls, or system params."
      };
    }
    return {
      id: "detail-inspector",
      name: "\uC0C1\uC138\uC815\uBCF4 \uC778\uC2A4\uD399\uD130 (Detail Inspector Drawer)",
      whenToUse: "\uD14C\uC774\uBE14\uC774\uB098 \uB9AC\uC2A4\uD2B8\uC758 \uD2B9\uC815 \uD56D\uBAA9\uC744 \uC120\uD0DD\uD588\uC744 \uB54C \uD604\uC7AC \uD654\uBA74 \uCEE8\uD14D\uC2A4\uD2B8\uB97C \uC720\uC9C0\uD55C \uCC44 \uC138\uBD80 \uC18D\uC131\uC744 \uAC80\uD1A0\uD558\uACE0 \uD3B8\uC9D1\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use to review and edit item details in a side panel without leaving the current list context."
    };
  }
  if (comp === "toast") {
    if (role === "success" || variableId.includes("success")) {
      return {
        id: "success-feedback",
        name: "\uC131\uACF5 \uC644\uB8CC \uD53C\uB4DC\uBC31 (Operation Success)",
        whenToUse: "\uB370\uC774\uD130 \uC800\uC7A5, \uC804\uC1A1 \uC644\uB8CC, \uD56D\uBAA9 \uC0DD\uC131 \uB4F1 \uC0AC\uC6A9\uC790\uC758 \uC791\uC5C5\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uCC98\uB9AC\uB418\uC5C8\uC74C\uC744 \uC2E0\uC18D\uD788 \uD53C\uB4DC\uBC31\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use to quickly inform users of successful operations like data saved, sent, or created."
      };
    }
    if (role === "warning" || variableId.includes("warning")) {
      return {
        id: "warning-alert",
        name: "\uC8FC\uC758 \uC694\uB9DD \uC54C\uB9BC (Warning Caution)",
        whenToUse: "\uB124\uD2B8\uC6CC\uD06C \uC9C0\uC5F0, \uC138\uC158 \uB9CC\uB8CC \uC784\uBC15, \uC800\uC7A5\uB418\uC9C0 \uC54A\uC740 \uBCC0\uACBD\uC0AC\uD56D \uB4F1 \uC8FC\uC758\uAC00 \uD544\uC694\uD55C \uBE44\uCE58\uBA85\uC801 \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use for non-fatal situations requiring attention such as expiring sessions or network latency."
      };
    }
    if (role === "danger" || variableId.includes("danger") || variableId.includes("error")) {
      return {
        id: "error-alert",
        name: "\uC624\uB958 \uBC1C\uC0DD \uACBD\uACE0 (Error Alert)",
        whenToUse: "\uC694\uCCAD \uC2E4\uD328, \uC778\uC99D \uC624\uB958, \uC720\uD6A8\uC131 \uAC80\uC99D \uC2E4\uD328 \uB4F1 \uC989\uAC01\uC801\uC778 \uC7AC\uC2DC\uB3C4\uB098 \uD655\uC778\uC774 \uD544\uC694\uD55C \uAE34\uAE09 \uBB38\uC81C\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use for critical failures like request errors or authentication issues requiring user action."
      };
    }
    if (variableId.includes("action") || variableId.includes("undo")) {
      return {
        id: "action-undo",
        name: "\uC561\uC158 \uC2E4\uD589 \uCDE8\uC18C (Action with Undo)",
        whenToUse: "\uD56D\uBAA9 \uC0AD\uC81C\uB098 \uC774\uB3D9 \uD6C4 \uC77C\uC815 \uC2DC\uAC04 \uB3D9\uC548 \uC0AC\uC6A9\uC790\uAC00 \uD574\uB2F9 \uC791\uC5C5\uC744 \uB418\uB3CC\uB9B4 \uC218 \uC788\uB294 Undo \uBC84\uD2BC\uC744 \uC81C\uACF5\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
        whenToUseEn: "Use when providing an interactive Undo button after actions like item deletion or movement."
      };
    }
    return {
      id: "info-notification",
      name: "\uC77C\uBC18 \uC548\uB0B4 \uC54C\uB9BC (Informational Notification)",
      whenToUse: "\uC2DC\uC2A4\uD15C \uC5C5\uB370\uC774\uD2B8, \uD074\uB9BD\uBCF4\uB4DC \uBCF5\uC0AC \uC644\uB8CC, \uC0C8\uB85C\uC6B4 \uC54C\uB9BC \uC218\uC2E0 \uB4F1 \uC77C\uBC18\uC801\uC778 \uC0C1\uD0DC \uC815\uBCF4\uB97C \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uC548\uB0B4\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      whenToUseEn: "Use to convey general status information such as clipboard copy or system notices."
    };
  }
  return {
    id: `${comp}-${variableId}`,
    name: customName || `${variableId} \uD0C0\uC785`,
    whenToUse: `\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 ${variableId} \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.`
  };
}
function getComponentStatusProperties(componentId, status, baseProperties = []) {
  if (status === "default") {
    return baseProperties.filter(
      (p) => !p.key.startsWith("hover") && !p.key.startsWith("active") && !p.key.startsWith("focus") && !p.key.startsWith("disabled")
    );
  }
  if (status === "hover") {
    return [
      { key: "hoverBackground", label: "\uD638\uBC84 \uBC30\uACBD\uC0C9 (Hover BG)", category: "color", defaultPaletteId: "--atom-palette-blue-600" },
      { key: "hoverTextColor", label: "\uD638\uBC84 \uD14D\uC2A4\uD2B8 (Hover Text)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "hoverBorderColor", label: "\uD638\uBC84 \uD14C\uB450\uB9AC (Hover Border)", category: "color", defaultPaletteId: "--atom-palette-blue-600" }
    ];
  }
  if (status === "active") {
    return [
      { key: "activeBackground", label: "\uD074\uB9AD \uC2DC \uBC30\uACBD\uC0C9 (Active BG)", category: "color", defaultPaletteId: "--atom-palette-blue-700" },
      { key: "activeTextColor", label: "\uD074\uB9AD \uC2DC \uD14D\uC2A4\uD2B8 (Active Text)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "activeBorderColor", label: "\uD074\uB9AD \uC2DC \uD14C\uB450\uB9AC (Active Border)", category: "color", defaultPaletteId: "--atom-palette-blue-700" }
    ];
  }
  if (status === "focus") {
    return [
      { key: "focusBorderColor", label: "\uD3EC\uCEE4\uC2A4 \uB9C1 / \uD14C\uB450\uB9AC (Focus Border)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "focusBackground", label: "\uD3EC\uCEE4\uC2A4 \uBC30\uACBD\uC0C9 (Focus BG)", category: "color", defaultPaletteId: "--atom-palette-white" }
    ];
  }
  if (status === "disabled") {
    return [
      { key: "disabledBackground", label: "\uBE44\uD65C\uC131 \uBC30\uACBD\uC0C9 (Disabled BG)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "disabledTextColor", label: "\uBE44\uD65C\uC131 \uD14D\uC2A4\uD2B8 (Disabled Text)", category: "color", defaultPaletteId: "--atom-palette-gray-400" },
      { key: "disabledBorderColor", label: "\uBE44\uD65C\uC131 \uD14C\uB450\uB9AC (Disabled Border)", category: "color", defaultPaletteId: "--atom-palette-gray-200" }
    ];
  }
  if (status === "loading") {
    return [
      { key: "loadingSpinnerColor", label: "\uB85C\uB529 \uC2A4\uD53C\uB108 \uC0C9\uC0C1 (Spinner Color)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "background", label: "\uB85C\uB529 \uC2DC \uBC30\uACBD\uC0C9 (Loading BG)", category: "color", defaultPaletteId: "--atom-color-primary" }
    ];
  }
  return baseProperties;
}
var INITIAL_PALETTE_VARIABLES = [
  // ==========================================
  // 0. SEMANTIC SYSTEM STATUS TOKENS
  // ==========================================
  { id: "--atom-color-primary", name: "Primary (\uC8FC\uC694 \uBE0C\uB79C\uB4DC \uC561\uC158)", category: "status", value: "var(--atom-palette-blue-500)", description: "\uC804\uCCB4 \uC2DC\uC2A4\uD15C Primary \uC561\uC158, \uD3EC\uCEE4\uC2A4\uB9C1, \uD0ED \uB300\uD45C \uC0C9\uC0C1", family: "status" },
  { id: "--atom-color-secondary", name: "Secondary (\uBCF4\uC870 \uC561\uC158)", category: "status", value: "var(--atom-palette-gray-200)", description: "\uC804\uCCB4 \uC2DC\uC2A4\uD15C Secondary \uBCF4\uC870 \uBC84\uD2BC \uBC0F \uC911\uB9BD \uBC30\uC9C0 \uC0C9\uC0C1", family: "status" },
  { id: "--atom-color-success", name: "Success (\uC131\uACF5/\uC644\uB8CC)", category: "status", value: "var(--atom-palette-emerald-500)", description: "\uC131\uACF5 \uC644\uB8CC \uBC84\uD2BC, \uC2B9\uC778 \uBC30\uC9C0, \uAE0D\uC815 \uC9C0\uD45C \uC0C9\uC0C1", family: "status" },
  { id: "--atom-color-danger", name: "Danger (\uC704\uD5D8/\uC624\uB958)", category: "status", value: "var(--atom-palette-rose-500)", description: "\uC704\uD5D8 \uC0AD\uC81C \uBC84\uD2BC, \uC5D0\uB7EC \uC778\uD48B \uBCF4\uB354, \uCE58\uBA85\uC801 \uACBD\uACE0 \uC0C9\uC0C1", family: "status" },
  { id: "--atom-color-warning", name: "Warning (\uC8FC\uC758/\uB300\uAE30)", category: "status", value: "var(--atom-palette-amber-500)", description: "\uC8FC\uC758 \uACBD\uACE0 \uBC84\uD2BC, \uB300\uAE30 \uBC30\uC9C0, \uBCF4\uB958 \uC0C1\uD0DC \uC0C9\uC0C1", family: "status" },
  // ==========================================
  // 1. COLOR PALETTES (50 ~ 900 Full Scale)
  // ==========================================
  // --- Blue Scale (Brand & Primary Action) ---
  { id: "--atom-palette-blue-50", name: "Blue 50", category: "color", value: "#eff6ff", description: "\uB9E4\uC6B0 \uC5F0\uD55C \uBE14\uB8E8 \uD2F4\uD2B8 \uBC30\uACBD", family: "blue" },
  { id: "--atom-palette-blue-100", name: "Blue 100", category: "color", value: "#dbeafe", description: "\uC5F0\uD55C \uBE14\uB8E8 \uC11C\uD53C\uC2A4 \uBC0F \uD0DC\uADF8 \uBC30\uACBD", family: "blue" },
  { id: "--atom-palette-blue-200", name: "Blue 200", category: "color", value: "#bfdbfe", description: "\uC18C\uD504\uD2B8 \uBE14\uB8E8 \uBCF4\uB354 \uBC0F \uD638\uBC84 \uBC30\uACBD", family: "blue" },
  { id: "--atom-palette-blue-300", name: "Blue 300", category: "color", value: "#93c5fd", description: "\uD65C\uC131 \uD14C\uB450\uB9AC \uBC0F \uD3EC\uCEE4\uC2A4 \uB9C1", family: "blue" },
  { id: "--atom-palette-blue-400", name: "Blue 400", category: "color", value: "#60a5fa", description: "\uBC1D\uC740 \uBE14\uB8E8 \uC778\uB514\uCF00\uC774\uD130", family: "blue" },
  { id: "--atom-palette-blue-500", name: "Blue 500 (Brand Primary)", category: "color", value: "var(--accent-primary)", description: "\uD575\uC2EC \uBE0C\uB79C\uB4DC \uD504\uB77C\uC774\uBA38\uB9AC \uC561\uC158 \uCEEC\uB7EC", family: "blue" },
  { id: "--atom-palette-blue-600", name: "Blue 600 (Primary Hover)", category: "color", value: "var(--accent-primary-hover)", description: "\uBC84\uD2BC \uD638\uBC84 \uBC0F \uAC15\uC870 \uB525 \uCEEC\uB7EC", family: "blue" },
  { id: "--atom-palette-blue-700", name: "Blue 700", category: "color", value: "#1d4ed8", description: "\uC9C4\uD55C \uBE14\uB8E8 \uD074\uB9AD \uC561\uD2F0\uBE0C \uC0C1\uD0DC", family: "blue" },
  { id: "--atom-palette-blue-800", name: "Blue 800", category: "color", value: "#1e40af", description: "\uB124\uC774\uBE44 \uD1A4 \uD14D\uC2A4\uD2B8 \uBC0F \uD5E4\uB354 \uBC30\uACBD", family: "blue" },
  { id: "--atom-palette-blue-900", name: "Blue 900", category: "color", value: "#1e3a8a", description: "\uADF9\uC9C4\uD55C \uB2E4\uD06C \uB124\uC774\uBE44", family: "blue" },
  // --- Slate / Gray Scale (Surface, Border, Text) ---
  { id: "--atom-palette-gray-50", name: "Gray 50 (Surface Subtle)", category: "color", value: "#f8fafc", description: "\uBCF4\uC870 \uC11C\uD53C\uC2A4 \uBC0F \uBC30\uACBD", family: "gray" },
  { id: "--atom-palette-gray-100", name: "Gray 100 (Surface Muted)", category: "color", value: "#f1f5f9", description: "\uBE44\uD65C\uC131 \uCE74\uB4DC \uBC30\uACBD \uBC0F \uC605\uC740 \uAD6C\uBD84\uC120", family: "gray" },
  { id: "--atom-palette-gray-200", name: "Gray 200 (Border Subtle)", category: "color", value: "#e2e8f0", description: "\uAE30\uBCF8 \uC605\uC740 \uACBD\uACC4\uC120", family: "gray" },
  { id: "--atom-palette-gray-300", name: "Gray 300 (Border Strong)", category: "color", value: "#cbd5e1", description: "\uAC15\uC870 \uACBD\uACC4\uC120 \uBC0F \uB514\uBC14\uC774\uB354", family: "gray" },
  { id: "--atom-palette-gray-400", name: "Gray 400 (Placeholder)", category: "color", value: "#94a3b8", description: "\uD50C\uB808\uC774\uC2A4\uD640\uB354 \uBC0F \uBE44\uD65C\uC131 \uB77C\uBCA8", family: "gray" },
  { id: "--atom-palette-gray-500", name: "Gray 500 (Text Muted)", category: "color", value: "#64748b", description: "\uBD80\uC5F0 \uC124\uBA85 \uBC0F \uCEA1\uC158 \uD14D\uC2A4\uD2B8", family: "gray" },
  { id: "--atom-palette-gray-600", name: "Gray 600", category: "color", value: "#475569", description: "\uC11C\uBE0C \uB808\uC774\uBE14 \uD14D\uC2A4\uD2B8", family: "gray" },
  { id: "--atom-palette-gray-700", name: "Gray 700 (Text Secondary)", category: "color", value: "#334155", description: "\uBCF4\uC870 \uBCF8\uBB38 \uD14D\uC2A4\uD2B8", family: "gray" },
  { id: "--atom-palette-gray-800", name: "Gray 800", category: "color", value: "#1e293b", description: "\uAC15\uC870 \uD14D\uC2A4\uD2B8 \uBC0F \uB2E4\uD06C \uBAA8\uB4DC \uCE74\uB4DC", family: "gray" },
  { id: "--atom-palette-gray-900", name: "Gray 900 (Text Primary)", category: "color", value: "#0f172a", description: "\uD5E4\uB4DC\uB77C\uC778 \uBC0F \uC8FC\uC694 \uBCF8\uBB38 \uD14D\uC2A4\uD2B8", family: "gray" },
  { id: "--atom-palette-gray-950", name: "Gray 950 (Ultra Dark)", category: "color", value: "#020617", description: "\uCD5C\uACE0 \uB300\uBE44 \uB2E4\uD06C \uC11C\uD53C\uC2A4 \uBC0F \uB2E4\uD06C \uD14D\uC2A4\uD2B8", family: "gray" },
  // --- Emerald / Green Scale (Success, Online, Positive) ---
  { id: "--atom-palette-emerald-50", name: "Emerald 50", category: "color", value: "#ecfdf5", description: "\uC131\uACF5 \uC18C\uD504\uD2B8 \uD2F4\uD2B8 \uBC30\uACBD", family: "emerald" },
  { id: "--atom-palette-emerald-100", name: "Emerald 100", category: "color", value: "#d1fae5", description: "\uC644\uB8CC \uBC30\uC9C0 \uBC30\uACBD", family: "emerald" },
  { id: "--atom-palette-emerald-200", name: "Emerald 200", category: "color", value: "#a7f3d0", description: "\uC131\uACF5 \uC18C\uD504\uD2B8 \uBCF4\uB354", family: "emerald" },
  { id: "--atom-palette-emerald-300", name: "Emerald 300", category: "color", value: "#6ee7b7", description: "\uAE0D\uC815 \uC9C0\uD45C \uAC15\uC870 \uB77C\uC778", family: "emerald" },
  { id: "--atom-palette-emerald-400", name: "Emerald 400", category: "color", value: "#34d399", description: "\uC131\uACF5 \uD65C\uC131 \uC778\uB514\uCF00\uC774\uD130", family: "emerald" },
  { id: "--atom-palette-emerald-500", name: "Emerald 500 (Success)", category: "color", value: "#10b981", description: "\uC131\uACF5 \uBC0F \uC644\uB8CC \uB300\uD45C \uC561\uC13C\uD2B8", family: "emerald" },
  { id: "--atom-palette-emerald-600", name: "Emerald 600", category: "color", value: "#059669", description: "\uC131\uACF5 \uBC84\uD2BC \uD638\uBC84 \uC0C9\uC0C1", family: "emerald" },
  { id: "--atom-palette-emerald-700", name: "Emerald 700", category: "color", value: "#047857", description: "\uC131\uACF5 \uC0C1\uD0DC \uD14D\uC2A4\uD2B8", family: "emerald" },
  { id: "--atom-palette-emerald-800", name: "Emerald 800", category: "color", value: "#065f46", description: "\uC9C4\uD55C \uC131\uACF5 \uD14D\uC2A4\uD2B8", family: "emerald" },
  { id: "--atom-palette-emerald-900", name: "Emerald 900", category: "color", value: "#064e3b", description: "\uB525 \uC5D0\uBA54\uB784\uB4DC \uB2E4\uD06C", family: "emerald" },
  // --- Rose / Red Scale (Destructive, Error, Negative) ---
  { id: "--atom-palette-rose-50", name: "Rose 50", category: "color", value: "#fff1f2", description: "\uC5D0\uB7EC/\uC0AD\uC81C \uC18C\uD504\uD2B8 \uBC30\uACBD", family: "rose" },
  { id: "--atom-palette-rose-100", name: "Rose 100", category: "color", value: "#ffe4e6", description: "\uC2E4\uD328 \uBC30\uC9C0 \uBC30\uACBD", family: "rose" },
  { id: "--atom-palette-rose-200", name: "Rose 200", category: "color", value: "#fecdd3", description: "\uC5D0\uB7EC \uC18C\uD504\uD2B8 \uD14C\uB450\uB9AC", family: "rose" },
  { id: "--atom-palette-rose-300", name: "Rose 300", category: "color", value: "#fda4af", description: "\uACBD\uACE0 \uAC15\uC870 \uB77C\uC778", family: "rose" },
  { id: "--atom-palette-rose-400", name: "Rose 400", category: "color", value: "#fb7185", description: "\uACBD\uACE0 \uD65C\uC131 \uC778\uB514\uCF00\uC774\uD130", family: "rose" },
  { id: "--atom-palette-rose-500", name: "Rose 500 (Destructive)", category: "color", value: "#ef4444", description: "\uACBD\uACE0, \uC0AD\uC81C, \uC5D0\uB7EC \uB300\uD45C \uC561\uC13C\uD2B8", family: "rose" },
  { id: "--atom-palette-rose-600", name: "Rose 600", category: "color", value: "#e11d48", description: "\uC0AD\uC81C \uBC84\uD2BC \uD638\uBC84 \uC0C9\uC0C1", family: "rose" },
  { id: "--atom-palette-rose-700", name: "Rose 700", category: "color", value: "#be123c", description: "\uC5D0\uB7EC \uC0C1\uD0DC \uD14D\uC2A4\uD2B8", family: "rose" },
  { id: "--atom-palette-rose-800", name: "Rose 800", category: "color", value: "#9f1239", description: "\uC9C4\uD55C \uC704\uD5D8 \uACBD\uACE0 \uD14D\uC2A4\uD2B8", family: "rose" },
  { id: "--atom-palette-rose-900", name: "Rose 900", category: "color", value: "#881337", description: "\uB525 \uB85C\uC988 \uB2E4\uD06C", family: "rose" },
  // --- Amber / Yellow Scale (Warning, Pending, Attention) ---
  { id: "--atom-palette-amber-50", name: "Amber 50", category: "color", value: "#fffbeb", description: "\uC8FC\uC758/\uC548\uB0B4 \uC18C\uD504\uD2B8 \uBC30\uACBD", family: "amber" },
  { id: "--atom-palette-amber-100", name: "Amber 100", category: "color", value: "#fef3c7", description: "\uB300\uAE30 \uC911 \uBC30\uC9C0 \uBC30\uACBD", family: "amber" },
  { id: "--atom-palette-amber-200", name: "Amber 200", category: "color", value: "#fde68a", description: "\uC8FC\uC758 \uD14C\uB450\uB9AC", family: "amber" },
  { id: "--atom-palette-amber-300", name: "Amber 300", category: "color", value: "#fcd34d", description: "\uC8FC\uC758 \uAC15\uC870 \uB77C\uC778", family: "amber" },
  { id: "--atom-palette-amber-400", name: "Amber 400", category: "color", value: "#fbbf24", description: "\uBCC4\uC810/\uD3C9\uC810 \uACE8\uB4DC \uD1A4", family: "amber" },
  { id: "--atom-palette-amber-500", name: "Amber 500 (Warning)", category: "color", value: "#f59e0b", description: "\uC8FC\uC758 \uBC0F \uBCF4\uB958 \uC0C1\uD0DC \uC561\uC13C\uD2B8", family: "amber" },
  { id: "--atom-palette-amber-600", name: "Amber 600", category: "color", value: "#d97706", description: "\uC8FC\uC758 \uBC84\uD2BC \uD638\uBC84 \uC0C9\uC0C1", family: "amber" },
  { id: "--atom-palette-amber-700", name: "Amber 700", category: "color", value: "#b45309", description: "\uC8FC\uC758 \uC548\uB0B4 \uD14D\uC2A4\uD2B8", family: "amber" },
  { id: "--atom-palette-amber-800", name: "Amber 800", category: "color", value: "#92400e", description: "\uC9C4\uD55C \uC8FC\uC758 \uD14D\uC2A4\uD2B8", family: "amber" },
  { id: "--atom-palette-amber-900", name: "Amber 900", category: "color", value: "#78350f", description: "\uB525 \uC570\uBC84 \uB2E4\uD06C", family: "amber" },
  // --- Purple / Violet Scale (AI, Innovation, Premium) ---
  { id: "--atom-palette-purple-50", name: "Purple 50", category: "color", value: "#faf5ff", description: "AI \uD504\uB86C\uD504\uD2B8 \uC18C\uD504\uD2B8 \uBC30\uACBD", family: "purple" },
  { id: "--atom-palette-purple-100", name: "Purple 100", category: "color", value: "#f3e8ff", description: "\uD504\uB9AC\uBBF8\uC5C4 \uBC30\uC9C0 \uBC30\uACBD", family: "purple" },
  { id: "--atom-palette-purple-200", name: "Purple 200", category: "color", value: "#e9d5ff", description: "\uBCF4\uB77C\uC0C9 \uC18C\uD504\uD2B8 \uBCF4\uB354", family: "purple" },
  { id: "--atom-palette-purple-300", name: "Purple 300", category: "color", value: "#d8b4fe", description: "\uBC14\uC774\uC62C\uB81B \uD3EC\uCEE4\uC2A4 \uB9C1", family: "purple" },
  { id: "--atom-palette-purple-400", name: "Purple 400", category: "color", value: "#c084fc", description: "\uBC1D\uC740 AI \uC774\uD399\uD2B8 \uB77C\uC778", family: "purple" },
  { id: "--atom-palette-purple-500", name: "Purple 500 (AI Accent)", category: "color", value: "#8b5cf6", description: "AI \uBC0F \uD504\uB9AC\uBBF8\uC5C4 \uB300\uD45C \uC561\uC13C\uD2B8", family: "purple" },
  { id: "--atom-palette-purple-600", name: "Purple 600", category: "color", value: "#9333ea", description: "\uBC14\uC774\uC62C\uB81B \uBC84\uD2BC \uD638\uBC84", family: "purple" },
  { id: "--atom-palette-purple-700", name: "Purple 700", category: "color", value: "#7e22ce", description: "\uBCF4\uB77C\uC0C9 \uD14D\uC2A4\uD2B8", family: "purple" },
  { id: "--atom-palette-purple-800", name: "Purple 800", category: "color", value: "#6b21a8", description: "\uC9C4\uD55C \uBC14\uC774\uC62C\uB81B \uD14D\uC2A4\uD2B8", family: "purple" },
  { id: "--atom-palette-purple-900", name: "Purple 900", category: "color", value: "#581c87", description: "\uB525 \uBC14\uC774\uC62C\uB81B \uB2E4\uD06C", family: "purple" },
  // --- Neutral Pure ---
  { id: "--atom-palette-white", name: "Pure White", category: "color", value: "#ffffff", description: "\uAE30\uBCF8 \uCE94\uBC84\uC2A4 \uBC0F \uD14D\uC2A4\uD2B8 \uBC18\uC804\uC0C9", family: "neutral" },
  { id: "--atom-palette-black", name: "Pure Black", category: "color", value: "#000000", description: "\uC21C\uC218 \uBE14\uB799 \uBC0F \uC808\uB300 \uC554\uBD80", family: "neutral" },
  // ==========================================
  // 2. SIZE & SPACING PALETTES
  // ==========================================
  { id: "--atom-space-1", name: "Space 1 (4px)", category: "spacing", value: "4px", description: "\uCD08\uBBF8\uC138 \uC5EC\uBC31 \uBC0F \uC544\uC774\uCF58 \uAC2D" },
  { id: "--atom-space-1-5", name: "Space 1.5 (6px)", category: "spacing", value: "6px", description: "\uCF64\uD329\uD2B8 \uBC30\uC9C0 \uBC0F \uBC84\uD2BC \uC778\uB77C\uC778 \uAC2D" },
  { id: "--atom-space-2", name: "Space 2 (8px)", category: "spacing", value: "8px", description: "\uBC84\uD2BC \uB0B4\uBD80 \uD328\uB529 \uBC0F \uBBF8\uC138 \uAC04\uACA9" },
  { id: "--atom-space-2-5", name: "Space 2.5 (10px)", category: "spacing", value: "10px", description: "\uC2AC\uB9BC \uCEF4\uD3EC\uB10C\uD2B8 \uC5EC\uBC31" },
  { id: "--atom-space-3", name: "Space 3 (12px)", category: "spacing", value: "12px", description: "\uC778\uD48B \uBC0F \uCE74\uB4DC \uB0B4\uBD80 \uAE30\uBCF8 \uAC2D" },
  { id: "--atom-space-3-5", name: "Space 3.5 (14px)", category: "spacing", value: "14px", description: "\uBAA8\uB2EC \uD5E4\uB354 \uBC0F \uC544\uC774\uD15C \uAC04\uACA9" },
  { id: "--atom-space-4", name: "Space 4 (16px)", category: "spacing", value: "16px", description: "\uD45C\uC900 \uCEF4\uD3EC\uB10C\uD2B8 \uB0B4\uBD80 \uD328\uB529" },
  { id: "--atom-space-5", name: "Space 5 (20px)", category: "spacing", value: "20px", description: "\uC911\uAC04 \uD06C\uAE30 \uCE74\uB4DC \uD328\uB529" },
  { id: "--atom-space-6", name: "Space 6 (24px)", category: "spacing", value: "24px", description: "\uB300\uD615 \uCE74\uB4DC \uBC0F \uC139\uC158 \uAC04\uACA9" },
  { id: "--atom-space-8", name: "Space 8 (32px)", category: "spacing", value: "32px", description: "\uC139\uC158 \uB514\uBC14\uC774\uB354 \uBC0F \uBE14\uB85D \uAC04\uACA9" },
  { id: "--atom-space-10", name: "Space 10 (40px)", category: "spacing", value: "40px", description: "\uB300\uD615 \uCEE8\uD14C\uC774\uB108 \uD328\uB529" },
  { id: "--atom-space-12", name: "Space 12 (48px)", category: "spacing", value: "48px", description: "\uD398\uC774\uC9C0 \uC0C1\uD558 \uD5E4\uB354 \uC5EC\uBC31" },
  { id: "--atom-space-16", name: "Space 16 (64px)", category: "spacing", value: "64px", description: "\uD788\uC5B4\uB85C \uC139\uC158 \uBC0F \uBDF0\uD3EC\uD2B8 \uC5EC\uBC31" },
  // ==========================================
  // 3. RADIUS PALETTES (Border Curvature)
  // ==========================================
  { id: "--atom-radius-none", name: "Radius None (0px)", category: "radius", value: "0px", description: "\uAC01\uC9C4 \uC9C1\uC0AC\uAC01" },
  { id: "--atom-radius-xs", name: "Radius XS (2px)", category: "radius", value: "2px", description: "\uBBF8\uC138 \uB77C\uC6B4\uB529" },
  { id: "--atom-radius-sm", name: "Radius Small (4px)", category: "radius", value: "4px", description: "\uCF64\uD329\uD2B8 \uD0DC\uADF8 \uBC0F \uBC30\uC9C0 \uACE1\uB960" },
  { id: "--atom-radius-md", name: "Radius Medium (8px)", category: "radius", value: "8px", description: "\uD45C\uC900 \uBC84\uD2BC \uBC0F \uC778\uD48B \uACE1\uB960" },
  { id: "--atom-radius-lg", name: "Radius Large (12px)", category: "radius", value: "12px", description: "\uCE74\uB4DC \uBC0F \uB2E4\uC774\uC5BC\uB85C\uADF8 \uBAA8\uB2EC \uACE1\uB960" },
  { id: "--atom-radius-xl", name: "Radius XL (16px)", category: "radius", value: "16px", description: "\uBCFC\uB4DC \uB77C\uC6B4\uB529 \uD328\uB110" },
  { id: "--atom-radius-2xl", name: "Radius 2XL (24px)", category: "radius", value: "24px", description: "\uBAA8\uBC14\uC77C \uBC14\uD140 \uC2DC\uD2B8 \uACE1\uB960" },
  { id: "--atom-radius-full", name: "Radius Full (9999px)", category: "radius", value: "9999px", description: "\uC644\uC804 \uB465\uADFC \uC54C\uC57D(Pill) \uACE1\uB960" },
  // ==========================================
  // 4. TYPOGRAPHY PALETTES
  // ==========================================
  {
    id: "--atom-font-sans",
    name: "Font Family Sans (\uAE30\uBCF8 \uBCF8\uBB38 \uD3F0\uD2B8)",
    category: "typography",
    family: "font-family",
    value: "'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
    cdnUrl: "https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css",
    description: "\uC804\uC5ED \uAE30\uBCF8 \uC0B0\uC138\uB9AC\uD504 \uD3F0\uD2B8 (Spoqa Han Sans Neo CDN \uAE30\uBCF8 \uC801\uC6A9)"
  },
  {
    id: "--atom-font-mono",
    name: "Font Family Mono (\uCF54\uB4DC/\uBAA8\uB178 \uD3F0\uD2B8)",
    category: "typography",
    family: "font-family",
    value: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    cdnUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap",
    description: "\uCF54\uB4DC \uBE14\uB85D, \uD1A0\uD070 \uC2DD\uBCC4\uC790, \uC218\uCE58 \uB370\uC774\uD130\uC6A9 \uBAA8\uB178\uC2A4\uD398\uC774\uC2A4 \uD3F0\uD2B8"
  },
  { id: "--atom-typography-xs", name: "Font XS (12px / 16px)", category: "typography", value: "12px", description: "\uCEA1\uC158, \uD78C\uD2B8, \uBC30\uC9C0 \uB77C\uBCA8" },
  { id: "--atom-typography-sm", name: "Font SM (14px / 20px)", category: "typography", value: "14px", description: "\uC11C\uBE0C \uB808\uC774\uBE14, \uD3FC \uD5EC\uD37C \uD14D\uC2A4\uD2B8" },
  { id: "--atom-typography-base", name: "Font Base (16px / 24px)", category: "typography", value: "16px", description: "\uAE30\uBCF8 \uBCF8\uBB38 \uD14D\uC2A4\uD2B8 \uADDC\uACA9" },
  { id: "--atom-typography-lg", name: "Font LG (18px / 28px)", category: "typography", value: "18px", description: "\uC18C\uC81C\uBAA9 \uBC0F \uAC15\uC870 \uBB38\uAD6C" },
  { id: "--atom-typography-xl", name: "Font XL (20px / 28px)", category: "typography", value: "20px", description: "\uCE74\uB4DC \uD0C0\uC774\uD2C0 \uBC0F \uC139\uC158 \uD5E4\uB354" },
  { id: "--atom-typography-2xl", name: "Font 2XL (24px / 32px)", category: "typography", value: "24px", description: "\uC911\uD615 \uD398\uC774\uC9C0 \uD0C0\uC774\uD2C0" },
  { id: "--atom-typography-3xl", name: "Font 3XL (30px / 36px)", category: "typography", value: "30px", description: "\uB300\uD615 \uBA54\uC778 \uD0C0\uC774\uD2C0" },
  { id: "--atom-typography-4xl", name: "Font 4XL (36px / 40px)", category: "typography", value: "36px", description: "\uD788\uC5B4\uB85C \uB514\uC2A4\uD50C\uB808\uC774 \uD0C0\uC774\uD2C0" },
  { id: "--atom-font-weight-regular", name: "Weight Regular (400)", category: "typography", value: "400", description: "\uC77C\uBC18 \uBCF8\uBB38 \uAD75\uAE30" },
  { id: "--atom-font-weight-medium", name: "Weight Medium (500)", category: "typography", value: "500", description: "\uC138\uBBF8 \uAC15\uC870 \uBCF8\uBB38 \uAD75\uAE30" },
  { id: "--atom-font-weight-semibold", name: "Weight Semibold (600)", category: "typography", value: "600", description: "\uBC84\uD2BC \uBC0F \uD14C\uC774\uBE14 \uD5E4\uB354 \uAD75\uAE30" },
  { id: "--atom-font-weight-bold", name: "Weight Bold (700)", category: "typography", value: "700", description: "\uD0C0\uC774\uD2C0 \uBC0F \uD575\uC2EC \uAC15\uC870 \uAD75\uAE30" }
];
var INITIAL_STUDIO_COMPONENTS = [
  // 1. Button
  {
    id: "button",
    name: "Button (\uBC84\uD2BC)",
    category: "Form",
    description: "\uC0AC\uC6A9\uC790 \uC778\uD130\uB799\uC158\uC744 \uC720\uB3C4\uD558\uB294 \uD575\uC2EC \uC561\uC158 \uCEF4\uD3EC\uB10C\uD2B8",
    types: DEFAULT_COMPONENT_TYPES["button"],
    properties: [
      { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-blue-500" },
      { key: "hoverBackground", label: "\uD638\uBC84 \uBC30\uACBD (Hover BG)", category: "color", defaultPaletteId: "--atom-palette-blue-600" },
      { key: "textColor", label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-blue-500" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-md" },
      { key: "paddingX", label: "\uC88C\uC6B0 \uD328\uB529 (Padding X)", category: "spacing", defaultPaletteId: "--atom-space-4" },
      { key: "paddingY", label: "\uC0C1\uD558 \uD328\uB529 (Padding Y)", category: "spacing", defaultPaletteId: "--atom-space-2" }
    ],
    variables: [
      {
        id: "primary",
        name: "\uD504\uB77C\uC774\uBA38\uB9AC \uC561\uC158 (Primary)",
        description: "\uB514\uC790\uC778 \uD14C\uB9C8\uC758 \uB300\uD45C \uBE0C\uB79C\uB4DC \uC561\uC158 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
        variableRole: "primary",
        tokenBindings: {
          background: "--atom-color-primary",
          hoverBackground: "--atom-color-primary-hover",
          textColor: "--atom-palette-white",
          borderColor: "--atom-color-primary",
          borderRadius: "--atom-radius-md",
          paddingX: "--atom-space-4",
          paddingY: "--atom-space-2"
        }
      },
      {
        id: "secondary",
        name: "\uC138\uCEE8\uB354\uB9AC \uBCF4\uC870 (Secondary)",
        description: "\uCDE8\uC18C, \uB2EB\uAE30 \uB4F1 \uBCF4\uC870 \uB3D9\uC791\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uC911\uB9BD \uD1A4 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
        variableRole: "secondary",
        tokenBindings: {
          background: "--atom-color-secondary",
          hoverBackground: "--atom-color-secondary-hover",
          textColor: "--atom-palette-gray-900",
          borderColor: "--atom-color-secondary",
          borderRadius: "--atom-radius-md",
          paddingX: "--atom-space-4",
          paddingY: "--atom-space-2"
        }
      },
      {
        id: "destructive",
        name: "\uC704\uD5D8/\uC0AD\uC81C \uC2E4\uD589 (Destructive)",
        description: "\uC601\uAD6C \uC0AD\uC81C, \uBCF5\uAD6C \uBD88\uAC00 \uC791\uC5C5\uC5D0 \uACBD\uACE0\uB97C \uC8FC\uB294 \uC704\uD5D8 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
        variableRole: "danger",
        tokenBindings: {
          background: "--atom-color-danger",
          hoverBackground: "--atom-color-danger-hover",
          textColor: "--atom-palette-white",
          borderColor: "--atom-color-danger",
          borderRadius: "--atom-radius-md",
          paddingX: "--atom-space-4",
          paddingY: "--atom-space-2"
        }
      },
      {
        id: "warning",
        name: "\uC8FC\uC758/\uB300\uAE30 \uD658\uAE30 (Warning)",
        description: "\uC8FC\uC758 \uD658\uAE30, \uBCF4\uB958 \uC0C1\uD0DC \uBCC0\uACBD\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uACBD\uACE0 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
        variableRole: "warning",
        tokenBindings: {
          background: "--atom-color-warning",
          hoverBackground: "--atom-color-warning-hover",
          textColor: "--atom-palette-white",
          borderColor: "--atom-color-warning",
          borderRadius: "--atom-radius-md",
          paddingX: "--atom-space-4",
          paddingY: "--atom-space-2"
        }
      },
      {
        id: "success",
        name: "\uC2B9\uC778/\uC131\uACF5 \uC644\uB8CC (Success)",
        description: "\uC644\uB8CC, \uC2B9\uC778, \uAE0D\uC815\uC801 \uC561\uC158\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uC131\uACF5 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
        variableRole: "success",
        tokenBindings: {
          background: "--atom-color-success",
          hoverBackground: "--atom-color-success-hover",
          textColor: "--atom-palette-white",
          borderColor: "--atom-color-success",
          borderRadius: "--atom-radius-md",
          paddingX: "--atom-space-4",
          paddingY: "--atom-space-2"
        }
      },
      {
        id: "info",
        name: "\uC548\uB0B4/\uC815\uBCF4 \uACE0\uC9C0 (Info)",
        description: "\uC2DC\uC2A4\uD15C \uC54C\uB9BC \uBC0F \uAC00\uC774\uB4DC\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uC815\uBCF4 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
        variableRole: "info",
        tokenBindings: {
          background: "--atom-palette-blue-500",
          hoverBackground: "--atom-palette-blue-600",
          textColor: "--atom-palette-white",
          borderColor: "--atom-palette-blue-500",
          borderRadius: "--atom-radius-md",
          paddingX: "--atom-space-4",
          paddingY: "--atom-space-2"
        }
      }
    ]
  },
  // 2. Badge
  {
    id: "badge",
    name: "Badge (\uBC30\uC9C0)",
    category: "Feedback",
    description: "\uC0C1\uD0DC\uAC12, \uCE74\uC6B4\uD2B8, \uCE74\uD14C\uACE0\uB9AC\uB97C \uC9C1\uAD00\uC801\uC73C\uB85C \uB098\uD0C0\uB0B4\uB294 \uCE69 \uCEF4\uD3EC\uB10C\uD2B8",
    types: DEFAULT_COMPONENT_TYPES["badge"],
    properties: [
      { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-blue-50" },
      { key: "textColor", label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-blue-600" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-blue-50" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-full" },
      { key: "paddingX", label: "\uC88C\uC6B0 \uD328\uB529 (Padding X)", category: "spacing", defaultPaletteId: "--atom-space-2" },
      { key: "paddingY", label: "\uC0C1\uD558 \uD328\uB529 (Padding Y)", category: "spacing", defaultPaletteId: "--atom-space-1" }
    ],
    variables: [
      {
        id: "active",
        name: "\uD65C\uC131 \uC0C1\uD0DC \uBC30\uC9C0 (Active / Primary)",
        description: "\uC2E0\uADDC \uAE30\uB2A5, \uC9C4\uD589 \uC911\uC778 \uC0C1\uD0DC\uB97C \uB098\uD0C0\uB0B4\uB294 \uC18C\uD504\uD2B8 \uBE14\uB8E8 \uD1A4",
        tokenBindings: {
          background: "--atom-color-primary-subtle",
          textColor: "--atom-color-primary",
          borderColor: "--atom-color-primary-subtle",
          borderRadius: "--atom-radius-full",
          paddingX: "--atom-space-2",
          paddingY: "--atom-space-1"
        }
      },
      {
        id: "success",
        name: "\uC131\uACF5 \uBC30\uC9C0 (Success)",
        description: "\uACB0\uC81C \uC644\uB8CC, \uC2B9\uC778 \uC0C1\uD0DC\uB97C \uB098\uD0C0\uB0B4\uB294 \uC5D0\uBA54\uB784\uB4DC \uD1A4",
        tokenBindings: {
          background: "--atom-color-success-subtle",
          textColor: "--atom-color-success",
          borderColor: "--atom-color-success",
          borderRadius: "--atom-radius-full",
          paddingX: "--atom-space-2",
          paddingY: "--atom-space-1"
        }
      },
      {
        id: "warning",
        name: "\uC8FC\uC758 \uBC30\uC9C0 (Warning)",
        description: "\uB9CC\uB8CC \uC784\uBC15, \uB300\uAE30 \uC0C1\uD0DC\uB97C \uB098\uD0C0\uB0B4\uB294 \uC570\uBC84 \uD1A4",
        tokenBindings: {
          background: "--atom-color-warning-subtle",
          textColor: "--atom-color-warning",
          borderColor: "--atom-color-warning",
          borderRadius: "--atom-radius-full",
          paddingX: "--atom-space-2",
          paddingY: "--atom-space-1"
        }
      },
      {
        id: "destructive",
        name: "\uC704\uD5D8/\uC5D0\uB7EC \uBC30\uC9C0 (Destructive / Danger)",
        description: "\uC624\uB958, \uC2E4\uD328, \uC704\uD5D8 \uC0C1\uD0DC\uB97C \uB098\uD0C0\uB0B4\uB294 \uB85C\uC988/\uB808\uB4DC \uD1A4 \uBC30\uC9C0",
        tokenBindings: {
          background: "--atom-color-danger-subtle",
          textColor: "--atom-color-danger",
          borderColor: "--atom-color-danger",
          borderRadius: "--atom-radius-full",
          paddingX: "--atom-space-2",
          paddingY: "--atom-space-1"
        }
      },
      {
        id: "sharp-neutral",
        name: "\uC0E4\uD504 \uB274\uD2B8\uB7F4 (Sharp Neutral)",
        description: "\uBC84\uC804 \uC815\uBCF4, \uCF54\uB4DC \uD0DC\uADF8 \uB4F1\uC5D0 \uC4F0\uC774\uB294 \uAC01\uC9C4 \uB77C\uC6B4\uB529 \uBC30\uC9C0",
        tokenBindings: {
          background: "--atom-palette-gray-100",
          textColor: "--atom-palette-gray-700",
          borderColor: "--atom-palette-gray-200",
          borderRadius: "--atom-radius-sm",
          paddingX: "--atom-space-2",
          paddingY: "--atom-space-1"
        }
      }
    ]
  },
  // 3. Card
  {
    id: "card",
    name: "Card (\uCE74\uB4DC)",
    category: "Layout",
    description: "\uCF58\uD150\uCE20\uB97C \uB17C\uB9AC\uC801 \uBE14\uB85D\uC73C\uB85C \uBB36\uC5B4\uC8FC\uB294 \uAE30\uBCF8 \uCEE8\uD14C\uC774\uB108 \uD45C\uBA74",
    types: DEFAULT_COMPONENT_TYPES["card"],
    properties: [
      { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-lg" },
      { key: "padding", label: "\uB0B4\uBD80 \uC5EC\uBC31 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-4" }
    ],
    variables: [
      {
        id: "elevated",
        name: "\uAE30\uBCF8 \uBCF4\uB354 \uCE74\uB4DC (Default Bordered)",
        description: "\uC740\uC740\uD55C \uD14C\uB450\uB9AC\uC640 \uC5EC\uBC31\uC744 \uAC00\uC9C4 \uD45C\uC900 \uCF58\uD150\uCE20 \uCE74\uB4DC",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-200",
          borderRadius: "--atom-radius-lg",
          padding: "--atom-space-4"
        }
      },
      {
        id: "surface-muted",
        name: "\uC18C\uD504\uD2B8 \uC11C\uD53C\uC2A4 \uCE74\uB4DC (Muted Surface)",
        description: "\uBCF4\uB354 \uC5C6\uC774 \uC11C\uD53C\uC2A4 \uBC30\uACBD\uC0C9\uB9CC\uC73C\uB85C \uC601\uC5ED\uC744 \uAD6C\uBD84\uD558\uB294 \uCE74\uB4DC",
        tokenBindings: {
          background: "--atom-palette-gray-50",
          borderColor: "--atom-palette-gray-100",
          borderRadius: "--atom-radius-xl",
          padding: "--atom-space-6"
        }
      },
      {
        id: "accent-brand",
        name: "\uBE0C\uB79C\uB4DC \uD558\uC774\uB77C\uC774\uD2B8 \uCE74\uB4DC (Brand Highlight)",
        description: "\uCD94\uCC9C \uC694\uAE08\uC81C, \uAC15\uC870 \uC139\uC158\uC5D0 \uC4F0\uC774\uB294 \uBE14\uB8E8 \uD2F4\uD2B8 \uCE74\uB4DC",
        tokenBindings: {
          background: "--atom-palette-blue-50",
          borderColor: "--atom-palette-blue-500",
          borderRadius: "--atom-radius-lg",
          padding: "--atom-space-6"
        }
      }
    ]
  },
  // 4. Input
  {
    id: "input",
    name: "Input (\uC785\uB825 \uD544\uB4DC)",
    category: "Form",
    description: "\uD14D\uC2A4\uD2B8 \uC785\uB825\uC744 \uC218\uC9D1\uD558\uB294 \uD45C\uC900 \uD3FC \uCEE8\uD2B8\uB864",
    types: DEFAULT_COMPONENT_TYPES["input"],
    properties: [
      { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-300" },
      { key: "focusBorderColor", label: "\uD3EC\uCEE4\uC2A4 \uD14C\uB450\uB9AC (Focus Border)", category: "color", defaultPaletteId: "--atom-palette-blue-500" },
      { key: "textColor", label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-900" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-md" },
      { key: "paddingX", label: "\uC88C\uC6B0 \uD328\uB529 (Padding X)", category: "spacing", defaultPaletteId: "--atom-space-3" },
      { key: "paddingY", label: "\uC0C1\uD558 \uD328\uB529 (Padding Y)", category: "spacing", defaultPaletteId: "--atom-space-2" }
    ],
    variables: [
      {
        id: "standard",
        name: "\uD45C\uC900 \uD3FC \uC778\uD48B (Standard Form)",
        description: "\uC77C\uBC18\uC801\uC778 \uC591\uC2DD \uC785\uB825\uC5D0 \uCD5C\uC801\uD654\uB41C \uD14C\uB450\uB9AC \uC778\uD48B",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-300",
          focusBorderColor: "--atom-palette-blue-500",
          textColor: "--atom-palette-gray-900",
          borderRadius: "--atom-radius-md",
          paddingX: "--atom-space-3",
          paddingY: "--atom-space-2"
        }
      },
      {
        id: "pill-search",
        name: "\uAC80\uC0C9\uC6A9 \uC54C\uC57D \uC778\uD48B (Pill Search)",
        description: "\uAC80\uC0C9 \uBC14\uB098 \uB0B4\uBE44\uAC8C\uC774\uC158 \uD544\uD130\uC5D0 \uC801\uD569\uD55C \uB465\uADFC \uC778\uD48B",
        tokenBindings: {
          background: "--atom-palette-gray-100",
          borderColor: "--atom-palette-gray-200",
          focusBorderColor: "--atom-palette-blue-500",
          textColor: "--atom-palette-gray-900",
          borderRadius: "--atom-radius-full",
          paddingX: "--atom-space-4",
          paddingY: "--atom-space-2"
        }
      }
    ]
  },
  // 5. Textarea
  {
    id: "textarea",
    name: "Textarea (\uB2E4\uC911\uD589 \uC785\uB825)",
    category: "Form",
    description: "\uC5EC\uB7EC \uC904\uC758 \uD14D\uC2A4\uD2B8 \uBCF8\uBB38\uC774\uB098 \uD53C\uB4DC\uBC31\uC744 \uC785\uB825\uBC1B\uB294 \uC601\uC5ED",
    properties: [
      { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-300" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-md" },
      { key: "padding", label: "\uB0B4\uBD80 \uC5EC\uBC31 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-3" }
    ],
    variables: [
      {
        id: "standard",
        name: "\uD45C\uC900 \uD14D\uC2A4\uD2B8\uC5D0\uC5B4\uB9AC\uC5B4 (Standard)",
        description: "\uAE30\uBCF8 8px \uB77C\uC6B4\uB529 \uB2E4\uC911\uD589 \uD3FC \uD544\uB4DC",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-300",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-3"
        }
      }
    ]
  },
  // 6. Switch
  {
    id: "switch",
    name: "Switch (\uD1A0\uAE00 \uC2A4\uC704\uCE58)",
    category: "Form",
    description: "\uC628/\uC624\uD504 \uBC14\uC774\uB108\uB9AC \uC124\uC815\uC744 \uC989\uC2DC \uBCC0\uACBD\uD558\uB294 \uC2A4\uC704\uCE58",
    properties: [
      { key: "activeBackground", label: "\uD65C\uC131 \uBC30\uACBD (Active BG)", category: "color", defaultPaletteId: "--atom-palette-blue-500" },
      { key: "inactiveBackground", label: "\uBE44\uD65C\uC131 \uBC30\uACBD (Inactive BG)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "thumbColor", label: "\uC6D0\uD615 \uC190\uC7A1\uC774 \uC0C9\uC0C1 (Thumb Color)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-full" }
    ],
    variables: [
      {
        id: "brand",
        name: "\uBE0C\uB79C\uB4DC \uC2A4\uC704\uCE58 (Brand Primary)",
        description: "\uC2DC\uADF8\uB2C8\uCC98 \uBE14\uB8E8 \uD1A0\uAE00",
        tokenBindings: {
          activeBackground: "--atom-palette-blue-500",
          inactiveBackground: "--atom-palette-gray-200",
          thumbColor: "--atom-palette-white",
          borderRadius: "--atom-radius-full"
        }
      },
      {
        id: "emerald",
        name: "\uC5D0\uCF54 \uC5D0\uBA54\uB784\uB4DC \uC2A4\uC704\uCE58 (Emerald Active)",
        description: "\uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uC131\uACF5 \uAC10\uC131\uC758 \uB179\uC0C9 \uD1A0\uAE00",
        tokenBindings: {
          activeBackground: "--atom-palette-emerald-500",
          inactiveBackground: "--atom-palette-gray-200",
          thumbColor: "--atom-palette-white",
          borderRadius: "--atom-radius-full"
        }
      }
    ]
  },
  // 7. Tabs
  {
    id: "tabs",
    name: "Tabs (\uD0ED \uB124\uBE44\uAC8C\uC774\uC158)",
    category: "Navigation",
    description: "\uB3D9\uC77C \uD654\uBA74 \uB0B4\uC5D0\uC11C \uC5F0\uAD00\uB41C \uBDF0\uB97C \uC804\uD658\uD558\uB294 \uD0ED \uBC14",
    properties: [
      { key: "activeIndicator", label: "\uD65C\uC131 \uC778\uB514\uCF00\uC774\uD130 (Active Line/BG)", category: "color", defaultPaletteId: "--atom-palette-blue-500" },
      { key: "activeText", label: "\uD65C\uC131 \uD14D\uC2A4\uD2B8 (Active Text)", category: "color", defaultPaletteId: "--atom-palette-blue-500" },
      { key: "inactiveText", label: "\uBE44\uD65C\uC131 \uD14D\uC2A4\uD2B8 (Inactive Text)", category: "color", defaultPaletteId: "--atom-palette-gray-700" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-md" }
    ],
    variables: [
      {
        id: "underlined",
        name: "\uC5B8\uB354\uB77C\uC778 \uD0ED (Underlined)",
        description: "\uD558\uB2E8 \uACBD\uACC4\uC120 \uC778\uB514\uCF00\uC774\uD130\uAC00 \uB530\uB77C\uB2E4\uB2C8\uB294 \uD074\uB798\uC2DD \uD0ED",
        tokenBindings: {
          activeIndicator: "--atom-palette-blue-500",
          activeText: "--atom-palette-blue-500",
          inactiveText: "--atom-palette-gray-700",
          borderRadius: "--atom-radius-none"
        }
      },
      {
        id: "pills",
        name: "\uC54C\uC57D \uC138\uADF8\uBA3C\uD2B8 \uD0ED (Pill Segments)",
        description: "\uBC15\uC2A4 \uBC30\uACBD\uC774 \uD65C\uC131\uD654\uB418\uB294 \uBAA8\uB358 \uC138\uADF8\uBA3C\uD2B8 \uCEE8\uD2B8\uB864",
        tokenBindings: {
          activeIndicator: "--atom-palette-blue-500",
          activeText: "--atom-palette-white",
          inactiveText: "--atom-palette-gray-700",
          borderRadius: "--atom-radius-full"
        }
      }
    ]
  },
  // 8. Table
  {
    id: "table",
    name: "Table (\uB370\uC774\uD130 \uD14C\uC774\uBE14)",
    category: "Data",
    description: "\uD589\uACFC \uC5F4 \uAD6C\uC870\uB85C \uBC29\uB300\uD55C \uB370\uC774\uD130\uB97C \uCCB4\uACC4\uD654\uD558\uC5EC \uBCF4\uC5EC\uC8FC\uB294 \uD14C\uC774\uBE14",
    properties: [
      { key: "headerBackground", label: "\uD5E4\uB354 \uBC30\uACBD (Header BG)", category: "color", defaultPaletteId: "--atom-palette-gray-50" },
      { key: "borderColor", label: "\uAD6C\uBD84\uC120 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "borderRadius", label: "\uC678\uACFD \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-lg" },
      { key: "cellPadding", label: "\uC140 \uB0B4\uBD80 \uC5EC\uBC31 (Cell Padding)", category: "spacing", defaultPaletteId: "--atom-space-3" }
    ],
    variables: [
      {
        id: "standard",
        name: "\uAE30\uBCF8 \uBCF4\uB354 \uD14C\uC774\uBE14 (Bordered)",
        description: "\uC740\uC740\uD55C \uD14C\uB450\uB9AC\uC640 \uAE54\uB054\uD55C \uD5E4\uB354\uB97C \uAC16\uCD98 \uAE30\uBCF8 \uD14C\uC774\uBE14",
        tokenBindings: {
          headerBackground: "--atom-palette-gray-50",
          borderColor: "--atom-palette-gray-200",
          borderRadius: "--atom-radius-lg",
          cellPadding: "--atom-space-3"
        }
      }
    ]
  },
  // 9. Modal
  {
    id: "modal",
    name: "Modal (\uBAA8\uB2EC \uB2E4\uC774\uC5BC\uB85C\uADF8)",
    category: "Feedback",
    description: "\uC911\uC694 \uD655\uC778 \uBC0F \uC791\uC5C5 \uD3EC\uCEE4\uC2A4\uB97C \uC704\uD55C \uB808\uC774\uC5B4 \uC624\uBC84\uB808\uC774",
    properties: [
      { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-xl" },
      { key: "padding", label: "\uB0B4\uBD80 \uC5EC\uBC31 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-6" }
    ],
    variables: [
      {
        id: "standard",
        name: "\uD45C\uC900 \uB300\uD654 \uC0C1\uC790 (Standard Dialog)",
        description: "16px \uBCFC\uB4DC \uB77C\uC6B4\uB529\uACFC 24px \uD328\uB529\uC774 \uC801\uC6A9\uB41C \uC815\uD615\uD654\uB41C \uBAA8\uB2EC",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-200",
          borderRadius: "--atom-radius-xl",
          padding: "--atom-space-6"
        }
      }
    ]
  },
  // 10. Avatar
  {
    id: "avatar",
    name: "Avatar (\uD504\uB85C\uD544 \uC544\uBC14\uD0C0)",
    category: "Data",
    description: "\uC0AC\uC6A9\uC790 \uD504\uB85C\uD544 \uC774\uBBF8\uC9C0\uB098 \uC774\uB2C8\uC15C\uC744 \uB098\uD0C0\uB0B4\uB294 \uC6D0\uD615 \uCEF4\uD3EC\uB10C\uD2B8",
    properties: [
      { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-blue-50" },
      { key: "textColor", label: "\uC774\uB2C8\uC15C \uD14D\uC2A4\uD2B8 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-blue-600" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-full" }
    ],
    variables: [
      {
        id: "circle",
        name: "\uC6D0\uD615 \uC544\uBC14\uD0C0 (Circle)",
        description: "\uC644\uC804 \uC6D0\uD615 \uD504\uB85C\uD544",
        tokenBindings: {
          background: "--atom-palette-blue-50",
          textColor: "--atom-palette-blue-600",
          borderRadius: "--atom-radius-full"
        }
      },
      {
        id: "rounded-square",
        name: "\uC2A4\uD018\uC5B4\uB4DC \uC544\uBC14\uD0C0 (Squircle)",
        description: "\uBD80\uB4DC\uB7EC\uC6B4 \uC0AC\uAC01 \uACE1\uB960\uC758 \uBAA8\uB358 \uC544\uBC14\uD0C0",
        tokenBindings: {
          background: "--atom-palette-purple-50",
          textColor: "--atom-palette-purple-500",
          borderRadius: "--atom-radius-lg"
        }
      }
    ]
  },
  // 11. Navbar (Global Navigation)
  {
    id: "navbar",
    name: "Navbar (\uAE00\uB85C\uBC8C \uB124\uBE44\uAC8C\uC774\uC158)",
    category: "Navigation",
    description: "\uC0C1\uB2E8 \uBE0C\uB79C\uB4DC \uB85C\uACE0, \uB124\uBE44\uAC8C\uC774\uC158 \uBA54\uB274 \uBC0F \uC720\uC800 \uCEE8\uD2B8\uB864\uC744 \uC81C\uACF5\uD558\uB294 \uAE00\uB85C\uBC8C \uD5E4\uB354",
    properties: [
      { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uD558\uB2E8 \uD14C\uB450\uB9AC (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "activeText", label: "\uD65C\uC131 \uB9C1\uD06C \uC0C9\uC0C1 (Active Link Text)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "textColor", label: "\uAE30\uBCF8 \uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-700" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-none" }
    ],
    variables: [
      {
        id: "default",
        name: "\uD45C\uC900 \uC2A4\uD2F0\uD0A4 \uD5E4\uB354 (Standard Sticky)",
        description: "\uD558\uB2E8 \uC605\uC740 \uBCF4\uB354\uC640 \uBE0C\uB79C\uB4DC \uB85C\uACE0\uB97C \uD3EC\uD568\uD558\uB294 \uD074\uB798\uC2DD \uC0C1\uB2E8 \uB124\uBE44\uAC8C\uC774\uC158",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-200",
          activeText: "--atom-color-primary",
          textColor: "--atom-palette-gray-700",
          borderRadius: "--atom-radius-none"
        }
      },
      {
        id: "floating",
        name: "\uD50C\uB85C\uD305 \uB77C\uC6B4\uB4DC \uBC14 (Floating Pill)",
        description: "\uB79C\uB529 \uD398\uC774\uC9C0\uB098 \uBAA8\uBC14\uC77C \uC6F9\uC5D0 \uC801\uD569\uD55C \uC644\uC804 \uB465\uADFC \uD50C\uB85C\uD305 \uD5E4\uB354",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-300",
          activeText: "--atom-color-primary",
          textColor: "--atom-palette-gray-700",
          borderRadius: "--atom-radius-full"
        }
      }
    ]
  },
  // 12. Sidebar & SideMenu (Side Navigation System)
  {
    id: "sidebar",
    name: "Sidebar & SideMenu (\uC0AC\uC774\uB4DC\uBC14 / \uC0AC\uC774\uB4DC\uBA54\uB274)",
    category: "Navigation",
    description: "\uC88C\uCE21 \uACC4\uCE35 \uBA54\uB274, 2-Depth \uC544\uCF54\uB514\uC5B8 \uC11C\uBE0C\uBA54\uB274(SidebarSubMenu), \uD504\uB85C\uC81D\uD2B8 \uC2A4\uC704\uCC98 \uBC0F \uC811\uAE30/\uD3BC\uCE58\uAE30\uB97C \uC81C\uACF5\uD558\uB294 \uC0AC\uC774\uB4DC \uB124\uBE44\uAC8C\uC774\uC158 \uC2DC\uC2A4\uD15C",
    properties: [
      { key: "background", label: "\uC0AC\uC774\uB4DC\uBC14 \uBC30\uACBD (Background)", category: "color", defaultPaletteId: "--atom-palette-gray-50" },
      { key: "borderColor", label: "\uACBD\uACC4 \uD14C\uB450\uB9AC (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "activeBackground", label: "\uD65C\uC131 \uBA54\uB274 \uBC30\uACBD (Active BG)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "activeText", label: "\uD65C\uC131 \uBA54\uB274 \uD14D\uC2A4\uD2B8 (Active Text)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "textColor", label: "\uAE30\uBCF8 \uBA54\uB274 \uD14D\uC2A4\uD2B8 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-700" },
      { key: "borderRadius", label: "\uC544\uC774\uD15C \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-sm" }
    ],
    variables: [
      {
        id: "default",
        name: "\uD45C\uC900 \uC5D4\uD130\uD504\uB77C\uC774\uC988 (Standard Enterprise)",
        description: "\uC88C\uCE21 \uACE0\uC815\uD615 \uACC4\uCE35 \uB124\uBE44\uAC8C\uC774\uC158 \uBC0F \uC138\uB828\uB41C \uC194\uB9AC\uB4DC \uD65C\uC131 \uD558\uC774\uB77C\uC774\uD2B8",
        tokenBindings: {
          background: "--atom-palette-gray-50",
          borderColor: "--atom-palette-gray-200",
          activeBackground: "--atom-color-primary",
          activeText: "--atom-palette-white",
          textColor: "--atom-palette-gray-700",
          borderRadius: "--atom-radius-sm"
        }
      },
      {
        id: "pills",
        name: "\uC54C\uC57D\uD615 \uB77C\uC6B4\uB4DC \uBA54\uB274 (Pills Highlight)",
        description: "\uB465\uADFC \uC54C\uC57D\uD615 \uBA54\uB274 \uC544\uC774\uD15C \uACE1\uB960\uACFC \uD604\uB300\uC801\uC778 \uC5EC\uBC31 \uC2A4\uD0C0\uC77C",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-200",
          activeBackground: "--atom-color-primary",
          activeText: "--atom-palette-white",
          textColor: "--atom-palette-gray-700",
          borderRadius: "--atom-radius-full"
        }
      },
      {
        id: "bordered",
        name: "\uC88C\uCE21 \uC561\uC13C\uD2B8 \uBCF4\uB354 (Accent Border)",
        description: "\uC88C\uCE21 \uC138\uB85C \uAC15\uC870 \uBCF4\uB354\uC640 \uC605\uC740 \uBC30\uACBD\uC758 \uD3EC\uBA40\uD55C \uC0AC\uC774\uB4DC\uBC14 \uC2A4\uD0C0\uC77C",
        tokenBindings: {
          background: "--atom-palette-gray-50",
          borderColor: "--atom-palette-gray-200",
          activeBackground: "--atom-palette-blue-50",
          activeText: "--atom-color-primary",
          textColor: "--atom-palette-gray-700",
          borderRadius: "--atom-radius-sm"
        }
      },
      {
        id: "floating",
        name: "\uD50C\uB85C\uD305 \uCE74\uB4DC \uC0AC\uC774\uB4DC\uBC14 (Floating Card)",
        description: "\uBC30\uACBD\uACFC \uBD84\uB9AC\uB41C \uB3C5\uB9BD \uCE74\uB4DC \uD615\uD0DC\uC758 \uBAA8\uB358 \uC0AC\uC774\uB4DC\uBC14",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-300",
          activeBackground: "--atom-color-primary",
          activeText: "--atom-palette-white",
          textColor: "--atom-palette-gray-700",
          borderRadius: "--atom-radius-lg"
        }
      }
    ]
  },
  // 13. Nav (Universal Navigation: Nav, NavItem, NavLink)
  {
    id: "nav",
    name: "Nav & NavItem (\uC720\uB2C8\uBC84\uC124 \uD0D0\uC0C9)",
    category: "Navigation",
    description: "\uD654\uBA74 \uB0B4 \uD0ED, \uC54C\uC57D\uD615 \uD544\uD130, \uC138\uADF8\uBA3C\uD2B8 \uBD84\uD560 \uBC14 \uB4F1 \uB2E4\uBAA9\uC801 \uBA54\uB274\uB97C \uAD6C\uC131\uD558\uB294 \uD0D0\uC0C9 \uC6D0\uC790 (Nav, NavItem, NavLink)",
    properties: [
      { key: "activeBackground", label: "\uD65C\uC131 \uC544\uC774\uD15C \uBC30\uACBD (Active BG)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "activeText", label: "\uD65C\uC131 \uC544\uC774\uD15C \uD14D\uC2A4\uD2B8 (Active Text)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "textColor", label: "\uAE30\uBCF8 \uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-600" },
      { key: "borderRadius", label: "\uC544\uC774\uD15C \uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-sm" },
      { key: "paddingX", label: "\uAC00\uB85C \uD328\uB529 (Padding X)", category: "spacing", defaultPaletteId: "--atom-space-3" },
      { key: "paddingY", label: "\uC138\uB85C \uD328\uB529 (Padding Y)", category: "spacing", defaultPaletteId: "--atom-space-1" }
    ],
    variables: [
      {
        id: "pills",
        name: "\uC54C\uC57D\uD615 \uD544\uD130 (Pills)",
        description: "\uCE74\uD14C\uACE0\uB9AC \uC120\uD0DD \uBC0F \uD544\uD130\uB9C1\uC5D0 \uC801\uD569\uD55C \uC54C\uC57D\uD615 \uB124\uBE44\uAC8C\uC774\uC158",
        tokenBindings: {
          activeBackground: "--atom-color-primary",
          activeText: "--atom-palette-white",
          textColor: "--atom-palette-gray-600",
          borderRadius: "--atom-radius-full",
          paddingX: "--atom-space-3",
          paddingY: "--atom-space-1"
        }
      },
      {
        id: "segmented",
        name: "\uC138\uADF8\uBA3C\uD2B8 \uCEE8\uD2B8\uB864 (Segmented)",
        description: "\uBC15\uC2A4\uD615 \uBD84\uD560 \uD1A0\uAE00 \uCEE8\uD2B8\uB864 \uC2A4\uD0C0\uC77C \uB124\uBE44\uAC8C\uC774\uC158",
        tokenBindings: {
          activeBackground: "--atom-color-primary",
          activeText: "--atom-palette-white",
          textColor: "--atom-palette-gray-600",
          borderRadius: "--atom-radius-sm",
          paddingX: "--atom-space-3",
          paddingY: "--atom-space-1"
        }
      },
      {
        id: "default",
        name: "\uAE30\uBCF8 \uD14D\uC2A4\uD2B8 \uB9C1\uD06C (Default)",
        description: "\uC0C1\uB2E8 \uBC14\uB098 \uC11C\uBE0C\uBA54\uB274\uC758 \uAE30\uBCF8 \uD14D\uC2A4\uD2B8 \uB9C1\uD06C \uB124\uBE44\uAC8C\uC774\uC158",
        tokenBindings: {
          activeBackground: "--atom-palette-gray-200",
          activeText: "--atom-palette-gray-900",
          textColor: "--atom-palette-gray-600",
          borderRadius: "--atom-radius-sm",
          paddingX: "--atom-space-3",
          paddingY: "--atom-space-1"
        }
      },
      {
        id: "tabs",
        name: "\uC5B8\uB354\uB77C\uC778 \uD0ED (Tabs)",
        description: "\uD558\uB2E8 \uACBD\uACC4 \uBCF4\uB354\uC640 \uD65C\uC131 \uBC11\uC904 \uD558\uC774\uB77C\uC774\uD2B8",
        tokenBindings: {
          activeBackground: "--atom-palette-white",
          activeText: "--atom-color-primary",
          textColor: "--atom-palette-gray-600",
          borderRadius: "--atom-radius-none",
          paddingX: "--atom-space-4",
          paddingY: "--atom-space-2"
        }
      }
    ]
  },
  // 14. Checkbox (Form Control)
  {
    id: "checkbox",
    name: "Checkbox (\uCCB4\uD06C\uBC15\uC2A4)",
    category: "Form",
    description: "\uB2E8\uC77C \uB610\uB294 \uB2E4\uC911 \uD56D\uBAA9 \uC120\uD0DD\uC744 \uC704\uD55C \uC811\uADFC\uC131 \uC900\uC218 \uCCB4\uD06C\uBC15\uC2A4",
    properties: [
      { key: "checkedBackground", label: "\uC120\uD0DD \uC2DC \uBC30\uACBD (Checked BG)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-300" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-sm" },
      { key: "textColor", label: "\uB77C\uBCA8 \uD14D\uC2A4\uD2B8 (Label Text)", category: "color", defaultPaletteId: "--atom-palette-gray-800" }
    ],
    variables: [
      {
        id: "default",
        name: "\uD45C\uC900 \uC0AC\uAC01 \uCCB4\uD06C\uBC15\uC2A4 (Default)",
        description: "\uC791\uC740 \uACE1\uB960\uC758 \uD45C\uC900 \uCCB4\uD06C\uBC15\uC2A4",
        tokenBindings: {
          checkedBackground: "--atom-color-primary",
          borderColor: "--atom-palette-gray-300",
          borderRadius: "--atom-radius-sm",
          textColor: "--atom-palette-gray-800"
        }
      },
      {
        id: "rounded",
        name: "\uC644\uC804 \uB465\uADFC \uCCB4\uD06C\uBC15\uC2A4 (Rounded)",
        description: "\uC6D0\uD615\uC5D0 \uAC00\uAE4C\uC6B4 \uBD80\uB4DC\uB7EC\uC6B4 \uCCB4\uD06C\uBC15\uC2A4",
        tokenBindings: {
          checkedBackground: "--atom-color-primary",
          borderColor: "--atom-palette-gray-300",
          borderRadius: "--atom-radius-full",
          textColor: "--atom-palette-gray-800"
        }
      }
    ]
  },
  // 15. Select (Form Control)
  {
    id: "select",
    name: "Select (\uC120\uD0DD \uC0C1\uC790)",
    category: "Form",
    description: "\uB4DC\uB86D\uB2E4\uC6B4 \uC635\uC158 \uC120\uD0DD\uC744 \uC81C\uACF5\uD558\uB294 \uB124\uC774\uD2F0\uBE0C \uC140\uB809\uD2B8 \uCEE8\uD2B8\uB864",
    properties: [
      { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-300" },
      { key: "textColor", label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-800" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-sm" },
      { key: "padding", label: "\uD328\uB529 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-2" }
    ],
    variables: [
      {
        id: "default",
        name: "\uD45C\uC900 \uC140\uB809\uD2B8 (Default)",
        description: "\uC785\uB825 \uD3FC\uC758 \uAE30\uBCF8 \uB4DC\uB86D\uB2E4\uC6B4 \uC0C1\uC790",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-300",
          textColor: "--atom-palette-gray-800",
          borderRadius: "--atom-radius-sm",
          padding: "--atom-space-2"
        }
      }
    ]
  },
  // 16. Radio (Form Control)
  {
    id: "radio",
    name: "Radio (\uB77C\uB514\uC624 \uBC84\uD2BC)",
    category: "Form",
    description: "\uB2E8\uC77C \uBC30\uD0C0\uC801 \uD56D\uBAA9 \uC120\uD0DD\uC744 \uC704\uD55C \uC6D0\uD615 \uB77C\uB514\uC624 \uC778\uB514\uCF00\uC774\uD130",
    properties: [
      { key: "activeColor", label: "\uD65C\uC131 \uC0C9\uC0C1 (Active Color)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-300" },
      { key: "textColor", label: "\uB77C\uBCA8 \uD14D\uC2A4\uD2B8 (Label Text)", category: "color", defaultPaletteId: "--atom-palette-gray-800" }
    ],
    variables: [
      {
        id: "default",
        name: "\uD45C\uC900 \uB77C\uB514\uC624 (Default)",
        description: "\uAE30\uBCF8 \uB2E8\uC77C \uC120\uD0DD \uC6D0\uD615 \uB77C\uB514\uC624 \uBC84\uD2BC",
        tokenBindings: {
          activeColor: "--atom-color-primary",
          borderColor: "--atom-palette-gray-300",
          textColor: "--atom-palette-gray-800"
        }
      }
    ]
  },
  // 17. Slider (Form Control)
  {
    id: "slider",
    name: "Slider (\uBC94\uC704 \uC2AC\uB77C\uC774\uB354)",
    category: "Form",
    description: "\uC5F0\uC18D\uC801 \uBC94\uC704 \uAC12 \uC870\uC808\uC744 \uC704\uD55C \uC2AC\uB77C\uC774\uB354 \uBC14",
    properties: [
      { key: "trackBackground", label: "\uD2B8\uB799 \uBC30\uACBD (Track BG)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "activeTrack", label: "\uD65C\uC131 \uD2B8\uB799 (Active Track)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "thumbBackground", label: "\uD578\uB4E4 \uC0C9\uC0C1 (Thumb BG)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "thumbBorder", label: "\uD578\uB4E4 \uD14C\uB450\uB9AC (Thumb Border)", category: "color", defaultPaletteId: "--atom-color-primary" }
    ],
    variables: [
      {
        id: "default",
        name: "\uD45C\uC900 \uC2AC\uB77C\uC774\uB354 (Default)",
        description: "\uAE30\uBCF8 \uB2E8\uC77C \uD578\uB4E4 \uC218\uD3C9 \uC2AC\uB77C\uC774\uB354",
        tokenBindings: {
          trackBackground: "--atom-palette-gray-200",
          activeTrack: "--atom-color-primary",
          thumbBackground: "--atom-palette-white",
          thumbBorder: "--atom-color-primary"
        }
      }
    ]
  },
  // 18. Progress (Feedback)
  {
    id: "progress",
    name: "Progress (\uC9C4\uD589 \uC0C1\uD0DC \uBC14)",
    category: "Feedback",
    description: "\uC791\uC5C5 \uC9C4\uD589\uB960 \uBC0F \uD37C\uC13C\uD2F0\uC9C0\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uC778\uB514\uCF00\uC774\uD130",
    properties: [
      { key: "background", label: "\uD2B8\uB799 \uBC30\uACBD (Track BG)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "fillColor", label: "\uC9C4\uD589 \uC0C9\uC0C1 (Fill Color)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-full" }
    ],
    variables: [
      {
        id: "default",
        name: "\uAE30\uBCF8 \uC9C4\uD589 \uBC14 (Default)",
        description: "\uBE0C\uB79C\uB4DC \uBA54\uC778 \uCEEC\uB7EC\uC758 \uC9C4\uD589 \uBC14",
        tokenBindings: {
          background: "--atom-palette-gray-200",
          fillColor: "--atom-color-primary",
          borderRadius: "--atom-radius-full"
        }
      },
      {
        id: "success",
        name: "\uC644\uB8CC \uC9C4\uD589 \uBC14 (Success)",
        description: "\uC131\uACF5 \uC0C1\uD0DC \uB179\uC0C9 \uC9C4\uD589 \uBC14",
        tokenBindings: {
          background: "--atom-palette-gray-200",
          fillColor: "--atom-palette-emerald-500",
          borderRadius: "--atom-radius-full"
        }
      }
    ]
  },
  // 19. Skeleton (Feedback)
  {
    id: "skeleton",
    name: "Skeleton (\uC2A4\uCF08\uB808\uD1A4 \uB85C\uB354)",
    category: "Feedback",
    description: "\uCF58\uD150\uCE20 \uB85C\uB529 \uC911 \uB808\uC774\uC544\uC6C3 \uC26C\uD504\uD2B8\uB97C \uBC29\uC9C0\uD558\uB294 \uD384\uC2A4 \uD50C\uB808\uC774\uC2A4\uD640\uB354",
    properties: [
      { key: "background", label: "\uBCA0\uC774\uC2A4 \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-sm" }
    ],
    variables: [
      {
        id: "default",
        name: "\uD14D\uC2A4\uD2B8 \uC2A4\uCF08\uB808\uD1A4 (Text Line)",
        description: "\uC77C\uBC18 \uD14D\uC2A4\uD2B8 \uB77C\uC778 \uD50C\uB808\uC774\uC2A4\uD640\uB354",
        tokenBindings: {
          background: "--atom-palette-gray-200",
          borderRadius: "--atom-radius-sm"
        }
      },
      {
        id: "circle",
        name: "\uC6D0\uD615 \uC2A4\uCF08\uB808\uD1A4 (Circle Avatar)",
        description: "\uC544\uBC14\uD0C0 \uBC0F \uC544\uC774\uCF58\uC6A9 \uC6D0\uD615 \uD50C\uB808\uC774\uC2A4\uD640\uB354",
        tokenBindings: {
          background: "--atom-palette-gray-200",
          borderRadius: "--atom-radius-full"
        }
      }
    ]
  },
  // 20. Tooltip (Feedback)
  {
    id: "tooltip",
    name: "Tooltip (\uD234\uD301 \uB9D0\uD48D\uC120)",
    category: "Feedback",
    description: "\uB9C8\uC6B0\uC2A4 \uD638\uBC84 \uB610\uB294 \uD3EC\uCEE4\uC2A4 \uC2DC \uBD80\uAC00 \uC124\uBA85\uC744 \uB744\uC6CC\uC8FC\uB294 \uD31D\uC624\uBC84",
    properties: [
      { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-gray-900" },
      { key: "textColor", label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-sm" }
    ],
    variables: [
      {
        id: "default",
        name: "\uB2E4\uD06C \uD234\uD301 (Dark)",
        description: "\uACE0\uB300\uBE44 \uC5B4\uB450\uC6B4 \uBC30\uACBD\uC758 \uB9D0\uD48D\uC120",
        tokenBindings: {
          background: "--atom-palette-gray-900",
          textColor: "--atom-palette-white",
          borderRadius: "--atom-radius-sm"
        }
      },
      {
        id: "light",
        name: "\uB77C\uC774\uD2B8 \uD234\uD301 (Light)",
        description: "\uBC1D\uC740 \uBC30\uACBD\uACFC \uC605\uC740 \uBCF4\uB354\uC758 \uB9D0\uD48D\uC120",
        tokenBindings: {
          background: "--atom-palette-white",
          textColor: "--atom-palette-gray-800",
          borderRadius: "--atom-radius-sm"
        }
      }
    ]
  },
  // 21. Accordion (Data)
  {
    id: "accordion",
    name: "Accordion (\uC544\uCF54\uB514\uC5B8 \uC811\uAE30)",
    category: "Data",
    description: "FAQ \uBC0F \uBB38\uC11C\uC758 \uC139\uC158\uBCC4 \uC811\uAE30/\uD3BC\uCE58\uAE30 \uC778\uD130\uB799\uD2F0\uBE0C \uCEF4\uD3EC\uB10C\uD2B8",
    properties: [
      { key: "borderColor", label: "\uAD6C\uBD84\uC120 \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "textColor", label: "\uD5E4\uB354 \uD14D\uC2A4\uD2B8 (Header Text)", category: "color", defaultPaletteId: "--atom-palette-gray-900" },
      { key: "contentColor", label: "\uBCF8\uBB38 \uD14D\uC2A4\uD2B8 (Content Text)", category: "color", defaultPaletteId: "--atom-palette-gray-600" }
    ],
    variables: [
      {
        id: "default",
        name: "\uD074\uB798\uC2DD \uC5B8\uB354\uB77C\uC778 (Default)",
        description: "\uD558\uB2E8 \uAD6C\uBD84\uC120\uB9CC \uC788\uB294 \uAE54\uB054\uD55C \uC544\uCF54\uB514\uC5B8",
        tokenBindings: {
          borderColor: "--atom-palette-gray-200",
          textColor: "--atom-palette-gray-900",
          contentColor: "--atom-palette-gray-600"
        }
      }
    ]
  },
  // 22. Breadcrumb (Navigation)
  {
    id: "breadcrumb",
    name: "Breadcrumb (\uACBD\uB85C \uD0D0\uC0C9)",
    category: "Navigation",
    description: "\uD398\uC774\uC9C0 \uACC4\uCE35 \uAD6C\uC870\uC640 \uD604\uC7AC \uC704\uCE58\uB97C \uD45C\uC2DC\uD558\uB294 \uACBD\uB85C \uD45C\uC2DC\uAE30",
    properties: [
      { key: "textColor", label: "\uB9C1\uD06C \uD14D\uC2A4\uD2B8 (Link Text)", category: "color", defaultPaletteId: "--atom-palette-gray-500" },
      { key: "activeColor", label: "\uD604\uC7AC \uC704\uCE58 (Active Text)", category: "color", defaultPaletteId: "--atom-palette-gray-900" },
      { key: "separatorColor", label: "\uAD6C\uBD84\uC790 \uC0C9\uC0C1 (Separator)", category: "color", defaultPaletteId: "--atom-palette-gray-400" }
    ],
    variables: [
      {
        id: "default",
        name: "\uD45C\uC900 \uBE0C\uB808\uB4DC\uD06C\uB7FC (Default)",
        description: "\uC2AC\uB798\uC2DC(/) \uAD6C\uBD84\uC790\uB97C \uD3EC\uD568\uD55C \uD14D\uC2A4\uD2B8 \uACBD\uB85C",
        tokenBindings: {
          textColor: "--atom-palette-gray-500",
          activeColor: "--atom-palette-gray-900",
          separatorColor: "--atom-palette-gray-400"
        }
      }
    ]
  },
  // 23. Pagination (Navigation)
  {
    id: "pagination",
    name: "Pagination (\uD398\uC774\uC9C0\uB124\uC774\uC158)",
    category: "Navigation",
    description: "\uB300\uC6A9\uB7C9 \uB370\uC774\uD130 \uBAA9\uB85D \uD0D0\uC0C9\uC744 \uC704\uD55C \uD398\uC774\uC9C0 \uC774\uB3D9 \uCEE8\uD2B8\uB864\uB7EC",
    properties: [
      { key: "activeBackground", label: "\uD65C\uC131 \uD398\uC774\uC9C0 \uBC30\uACBD (Active BG)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "activeText", label: "\uD65C\uC131 \uD398\uC774\uC9C0 \uD14D\uC2A4\uD2B8 (Active Text)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "textColor", label: "\uAE30\uBCF8 \uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-700" },
      { key: "borderRadius", label: "\uBC84\uD2BC \uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-sm" }
    ],
    variables: [
      {
        id: "default",
        name: "\uC0AC\uAC01 \uD398\uC774\uC9C0\uB124\uC774\uC158 (Default)",
        description: "\uC791\uC740 \uACE1\uB960\uC758 \uAE30\uBCF8 \uD398\uC774\uC9C0 \uBC88\uD638 \uBC84\uD2BC",
        tokenBindings: {
          activeBackground: "--atom-color-primary",
          activeText: "--atom-palette-white",
          textColor: "--atom-palette-gray-700",
          borderRadius: "--atom-radius-sm"
        }
      },
      {
        id: "rounded",
        name: "\uC6D0\uD615 \uD398\uC774\uC9C0\uB124\uC774\uC158 (Rounded)",
        description: "\uC644\uC804 \uB465\uADFC \uC6D0\uD615 \uD398\uC774\uC9C0 \uBC88\uD638 \uBC84\uD2BC",
        tokenBindings: {
          activeBackground: "--atom-color-primary",
          activeText: "--atom-palette-white",
          textColor: "--atom-palette-gray-700",
          borderRadius: "--atom-radius-full"
        }
      }
    ]
  },
  // 24. Separator (Layout)
  {
    id: "separator",
    name: "Separator (\uAD6C\uBD84\uC120)",
    category: "Layout",
    description: "\uCF58\uD150\uCE20 \uC601\uC5ED\uC744 \uC2DC\uAC01\uC801\uC73C\uB85C \uBD84\uB9AC\uD558\uB294 \uC218\uD3C9 \uB610\uB294 \uC218\uC9C1 \uB514\uBC14\uC774\uB354",
    properties: [
      { key: "color", label: "\uAD6C\uBD84\uC120 \uC0C9\uC0C1 (Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" }
    ],
    variables: [
      {
        id: "horizontal",
        name: "\uC218\uD3C9\uC120 (Horizontal)",
        description: "\uB108\uBE44 100%\uC758 \uAE30\uBCF8 \uAC00\uB85C \uAD6C\uBD84\uC120",
        tokenBindings: {
          color: "--atom-palette-gray-200"
        }
      }
    ]
  },
  // 25. Calendar (Data)
  {
    id: "calendar",
    name: "Calendar (\uB2EC\uB825)",
    category: "Data",
    description: "\uB0A0\uC9DC \uC120\uD0DD \uBC0F \uC6D4\uAC04 \uBDF0\uB97C \uC81C\uACF5\uD558\uB294 \uC778\uD130\uB799\uD2F0\uBE0C \uCE98\uB9B0\uB354",
    properties: [
      { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "selectedBackground", label: "\uC120\uD0DD \uB0A0\uC9DC \uBC30\uACBD (Selected BG)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "selectedText", label: "\uC120\uD0DD \uB0A0\uC9DC \uD14D\uC2A4\uD2B8 (Selected Text)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "textColor", label: "\uC77C\uBC18 \uB0A0\uC9DC \uD14D\uC2A4\uD2B8 (Day Text)", category: "color", defaultPaletteId: "--atom-palette-gray-800" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-md" }
    ],
    variables: [
      {
        id: "default",
        name: "\uD45C\uC900 \uB2EC\uB825 (Default)",
        description: "\uD5E4\uB354\uC640 \uC694\uC77C \uADF8\uB9AC\uB4DC\uB97C \uD3EC\uD568\uD55C \uAE30\uBCF8 \uB2EC\uB825 \uBDF0",
        tokenBindings: {
          background: "--atom-palette-white",
          selectedBackground: "--atom-color-primary",
          selectedText: "--atom-palette-white",
          textColor: "--atom-palette-gray-800",
          borderRadius: "--atom-radius-md"
        }
      }
    ]
  },
  // 26. Chart (Data)
  {
    id: "chart",
    name: "Chart (\uCC28\uD2B8)",
    category: "Data",
    description: "\uB77C\uC778, \uBC14, \uC601\uC5ED \uADF8\uB798\uD504\uB97C \uD1B5\uD574 \uC2DC\uACC4\uC5F4 \uB370\uC774\uD130\uC640 \uC2E4\uC801 \uC9C0\uD45C\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uCC28\uD2B8 \uCEF4\uD3EC\uB10C\uD2B8",
    properties: [
      { key: "strokeColor", label: "\uCC28\uD2B8 \uC120 \uC0C9\uC0C1 (Stroke Color)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "fillColor", label: "\uC601\uC5ED \uCC44\uC6B0\uAE30 \uC0C9\uC0C1 (Fill Color)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "gridColor", label: "\uADF8\uB9AC\uB4DC \uB77C\uC778 \uC0C9\uC0C1 (Grid Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "hoverColor", label: "\uD638\uBC84 \uD3EC\uC778\uD2B8 \uC0C9\uC0C1 (Hover Point)", category: "color", defaultPaletteId: "--atom-color-primary-hover" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-md" },
      { key: "padding", label: "\uB0B4\uBD80 \uD328\uB529 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-4" }
    ],
    variables: [
      {
        id: "primary",
        name: "\uB77C\uC778 \uD2B8\uB80C\uB4DC \uCC28\uD2B8 (Line Trend)",
        description: "\uC2DC\uACC4\uC5F4 \uB370\uC774\uD130\uC758 \uCD94\uC138\uB97C \uBA85\uD655\uD558\uAC8C \uBCF4\uC5EC\uC8FC\uB294 \uB300\uD45C \uB77C\uC778 \uCC28\uD2B8",
        tokenBindings: {
          strokeColor: "--atom-color-primary",
          fillColor: "--atom-color-primary",
          gridColor: "--atom-palette-gray-200",
          hoverColor: "--atom-color-primary-hover",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4"
        }
      },
      {
        id: "area-volume",
        name: "\uB204\uC801 \uC601\uC5ED \uCC28\uD2B8 (Area Volume)",
        description: "\uD558\uB2E8 \uADF8\uB77C\uB370\uC774\uC158 \uCC44\uC6B0\uAE30\uB97C \uD1B5\uD574 \uBCFC\uB968\uAC10\uACFC \uCD94\uC138\uB97C \uB3D9\uC2DC\uC5D0 \uD45C\uD604\uD558\uB294 \uC601\uC5ED \uCC28\uD2B8",
        tokenBindings: {
          strokeColor: "--atom-color-primary",
          fillColor: "--atom-palette-blue-500",
          gridColor: "--atom-palette-gray-200",
          hoverColor: "--atom-color-primary-hover",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4"
        }
      },
      {
        id: "success",
        name: "\uC0C1\uC2B9 \uC9C0\uD45C \uCC28\uD2B8 (Success Trend)",
        description: "\uC8FC\uAC00 \uC0C1\uC2B9, \uC218\uC775\uB960 \uC99D\uAC00, \uAE0D\uC815\uC801 \uC9C0\uD45C\uB97C \uB098\uD0C0\uB0B4\uB294 \uC5D0\uBA54\uB784\uB4DC \uADF8\uB9B0 \uCC28\uD2B8",
        tokenBindings: {
          strokeColor: "--atom-color-success",
          fillColor: "--atom-palette-emerald-500",
          gridColor: "--atom-palette-gray-200",
          hoverColor: "--atom-color-success-hover",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4"
        }
      },
      {
        id: "danger",
        name: "\uC704\uD5D8/\uD558\uB77D \uC9C0\uD45C \uCC28\uD2B8 (Danger Alert)",
        description: "\uC624\uB958 \uBC1C\uC0DD\uB960, \uC190\uC2E4 \uC9C0\uD45C, \uC784\uACC4\uCE58 \uCD08\uACFC\uB97C \uACBD\uACE0\uD558\uB294 \uB85C\uC988 \uB808\uB4DC \uCC28\uD2B8",
        tokenBindings: {
          strokeColor: "--atom-color-danger",
          fillColor: "--atom-palette-rose-500",
          gridColor: "--atom-palette-gray-200",
          hoverColor: "--atom-color-danger-hover",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4"
        }
      },
      {
        id: "bar-metric",
        name: "\uBC14 \uBE44\uAD50 \uCC28\uD2B8 (Bar Comparison)",
        description: "\uD56D\uBAA9\uBCC4 \uC2E4\uC801\uC774\uB098 \uAE30\uAC04\uBCC4 \uC9D1\uACC4\uB97C \uC9C1\uAD00\uC801\uC73C\uB85C \uBE44\uAD50\uD558\uB294 \uB9C9\uB300 \uCC28\uD2B8",
        tokenBindings: {
          strokeColor: "--atom-color-primary",
          fillColor: "--atom-color-primary",
          gridColor: "--atom-palette-gray-200",
          hoverColor: "--atom-color-primary-hover",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4"
        }
      }
    ]
  },
  // 27. Offcanvas (Layout / Overlay)
  {
    id: "offcanvas",
    name: "Offcanvas (\uC624\uD504\uCE94\uBC84\uC2A4 / \uC11C\uB78D)",
    category: "Layout",
    description: "\uD654\uBA74 \uAC00\uC7A5\uC790\uB9AC\uC5D0\uC11C \uC2AC\uB77C\uC774\uB4DC\uB418\uC5B4 \uB098\uD0C0\uB098\uB294 \uC624\uD504\uCE94\uBC84\uC2A4 \uD328\uB110 \uBC0F \uC11C\uB78D\uD615 \uC624\uBC84\uB808\uC774",
    properties: [
      { key: "background", label: "\uC11C\uD53C\uC2A4 \uBC30\uACBD\uC0C9 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "textColor", label: "\uBCF8\uBB38 \uD14D\uC2A4\uD2B8 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-800" },
      { key: "headerBackground", label: "\uD5E4\uB354 \uBC30\uACBD\uC0C9 (Header BG)", category: "color", defaultPaletteId: "--atom-palette-gray-50" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-lg" },
      { key: "padding", label: "\uB0B4\uBD80 \uD328\uB529 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-4" },
      { key: "hoverBackground", label: "\uD638\uBC84 \uBC30\uACBD\uC0C9 (Hover BG)", category: "color", defaultPaletteId: "--atom-palette-blue-50" },
      { key: "activeBackground", label: "\uD65C\uC131 \uBC30\uACBD\uC0C9 (Active BG)", category: "color", defaultPaletteId: "--atom-palette-blue-100" }
    ],
    variables: [
      {
        id: "right-drawer",
        name: "\uC6B0\uCE21 \uC778\uC2A4\uD399\uD130 \uC11C\uB78D (Right Drawer)",
        description: "\uB370\uC774\uD130 \uB9AC\uC2A4\uD2B8\uC5D0\uC11C \uD56D\uBAA9 \uC138\uBD80 \uC815\uBCF4 \uBC0F \uD3B8\uC9D1 \uD3FC\uC744 \uD45C\uC2DC\uD558\uB294 \uC6B0\uCE21 \uC0AC\uC774\uB4DC \uD328\uB110",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-200",
          textColor: "--atom-palette-gray-800",
          headerBackground: "--atom-palette-gray-50",
          borderRadius: "--atom-radius-lg",
          padding: "--atom-space-4",
          hoverBackground: "--atom-palette-blue-50",
          activeBackground: "--atom-palette-blue-100"
        }
      },
      {
        id: "left-nav",
        name: "\uC88C\uCE21 \uBAA8\uBC14\uC77C \uD0D0\uC0C9 \uC11C\uB78D (Left Navigation)",
        description: "\uBAA8\uBC14\uC77C \uD658\uACBD\uC5D0\uC11C \uC0AC\uC774\uD2B8 \uC804\uCCB4 \uBA54\uB274 \uBC0F \uD504\uB85C\uD544 \uBC14\uB85C\uAC00\uAE30\uB97C \uC81C\uACF5\uD558\uB294 \uC88C\uCE21 \uC11C\uB78D",
        tokenBindings: {
          background: "--atom-palette-gray-900",
          borderColor: "--atom-palette-gray-800",
          textColor: "--atom-palette-gray-100",
          headerBackground: "--atom-palette-gray-950",
          borderRadius: "--atom-radius-lg",
          padding: "--atom-space-4",
          hoverBackground: "--atom-palette-gray-800",
          activeBackground: "--atom-palette-gray-700"
        }
      },
      {
        id: "bottom-sheet",
        name: "\uD558\uB2E8 \uD544\uD130 \uC2DC\uD2B8 (Bottom Sheet)",
        description: "\uBAA8\uBC14\uC77C \uBDF0\uD3EC\uD2B8 \uD558\uB2E8\uC5D0\uC11C \uC704\uB85C \uC62C\uB77C\uC624\uB294 \uD544\uD130 \uBC0F \uC561\uC158 \uC2DC\uD2B8 \uC624\uBC84\uB808\uC774",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-200",
          textColor: "--atom-palette-gray-800",
          headerBackground: "--atom-palette-gray-50",
          borderRadius: "--atom-radius-xl",
          padding: "--atom-space-4",
          hoverBackground: "--atom-palette-blue-50",
          activeBackground: "--atom-palette-blue-100"
        }
      },
      {
        id: "settings-panel",
        name: "\uC124\uC815 \uC2AC\uB77C\uC774\uB4DC\uC624\uBC84 (Settings Panel)",
        description: "\uC0AC\uC6A9\uC790 \uD658\uACBD\uC124\uC815, \uD14C\uB9C8 \uC635\uC158 \uBC0F \uC54C\uB9BC \uAD6C\uC131\uC744 \uC870\uC815\uD558\uB294 \uC2AC\uB77C\uC774\uB4DC \uD328\uB110",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-200",
          textColor: "--atom-palette-gray-800",
          headerBackground: "--atom-palette-gray-50",
          borderRadius: "--atom-radius-lg",
          padding: "--atom-space-4",
          hoverBackground: "--atom-palette-blue-50",
          activeBackground: "--atom-palette-blue-100"
        }
      }
    ]
  },
  // 28. Toast (Feedback)
  {
    id: "toast",
    name: "Toast (\uD1A0\uC2A4\uD2B8 \uC54C\uB9BC)",
    category: "Feedback",
    description: "\uC791\uC5C5 \uACB0\uACFC \uD53C\uB4DC\uBC31 \uBC0F \uC0C1\uD0DC \uBCC0\uD654\uB97C \uD654\uBA74 \uAD6C\uC11D\uC5D0 \uC77C\uC2DC\uC801\uC73C\uB85C \uC54C\uB9AC\uB294 \uD50C\uB85C\uD305 \uD1A0\uC2A4\uD2B8 \uCEF4\uD3EC\uB10C\uD2B8",
    properties: [
      { key: "background", label: "\uC11C\uD53C\uC2A4 \uBC30\uACBD\uC0C9 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "textColor", label: "\uBCF8\uBB38 \uD14D\uC2A4\uD2B8 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-800" },
      { key: "iconColor", label: "\uC544\uC774\uCF58 \uC0C9\uC0C1 (Icon Color)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-md" },
      { key: "padding", label: "\uB0B4\uBD80 \uD328\uB529 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-4" },
      { key: "hoverBackground", label: "\uD638\uBC84 \uBC30\uACBD\uC0C9 (Hover BG)", category: "color", defaultPaletteId: "--atom-palette-gray-50" },
      { key: "activeBackground", label: "\uD65C\uC131 \uBC30\uACBD\uC0C9 (Active BG)", category: "color", defaultPaletteId: "--atom-palette-gray-100" }
    ],
    variables: [
      {
        id: "info",
        name: "\uC548\uB0B4 \uD1A0\uC2A4\uD2B8 (Info Toast)",
        description: "\uC0C8\uB85C\uC6B4 \uC2DC\uC2A4\uD15C \uC54C\uB9BC\uC774\uB098 \uC77C\uBC18 \uC815\uBCF4\uB97C \uC804\uB2EC\uD558\uB294 \uBE14\uB8E8 \uD1A4\uC758 \uC548\uB0B4 \uD1A0\uC2A4\uD2B8",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-blue-200",
          textColor: "--atom-palette-gray-900",
          iconColor: "--atom-color-primary",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4",
          hoverBackground: "--atom-palette-blue-50",
          activeBackground: "--atom-palette-blue-100"
        }
      },
      {
        id: "success",
        name: "\uC131\uACF5 \uC644\uB8CC \uD1A0\uC2A4\uD2B8 (Success Toast)",
        description: "\uC791\uC5C5\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC800\uC7A5\uB418\uAC70\uB098 \uC644\uB8CC\uB418\uC5C8\uC74C\uC744 \uC804\uB2EC\uD558\uB294 \uC5D0\uBA54\uB784\uB4DC \uD1A0\uC2A4\uD2B8",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-emerald-200",
          textColor: "--atom-palette-gray-900",
          iconColor: "--atom-color-success",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4",
          hoverBackground: "--atom-palette-emerald-50",
          activeBackground: "--atom-palette-emerald-100"
        }
      },
      {
        id: "warning",
        name: "\uC8FC\uC758 \uC694\uB9DD \uD1A0\uC2A4\uD2B8 (Warning Toast)",
        description: "\uC138\uC158 \uB9CC\uB8CC\uB098 \uB124\uD2B8\uC6CC\uD06C \uBD88\uC548\uC815 \uB4F1 \uC8FC\uC758\uAC00 \uD544\uC694\uD55C \uC0C1\uD669\uC744 \uC54C\uB9AC\uB294 \uC570\uBC84 \uD1A0\uC2A4\uD2B8",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-amber-200",
          textColor: "--atom-palette-gray-900",
          iconColor: "--atom-color-warning",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4",
          hoverBackground: "--atom-palette-amber-50",
          activeBackground: "--atom-palette-amber-100"
        }
      },
      {
        id: "danger",
        name: "\uC624\uB958 \uACBD\uACE0 \uD1A0\uC2A4\uD2B8 (Danger Toast)",
        description: "\uC694\uCCAD \uC2E4\uD328\uB098 \uC608\uC678 \uBC1C\uC0DD\uC744 \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uC989\uC2DC \uC804\uB2EC\uD558\uB294 \uB85C\uC988 \uB808\uB4DC \uD1A0\uC2A4\uD2B8",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-rose-200",
          textColor: "--atom-palette-gray-900",
          iconColor: "--atom-color-danger",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4",
          hoverBackground: "--atom-palette-rose-50",
          activeBackground: "--atom-palette-rose-100"
        }
      },
      {
        id: "action-undo",
        name: "\uC2E4\uD589 \uCDE8\uC18C \uC561\uC158 \uD1A0\uC2A4\uD2B8 (Action Undo Toast)",
        description: "\uC0AD\uC81C\uB098 \uC774\uB3D9 \uC791\uC5C5\uC744 \uB418\uB3CC\uB9B4 \uC218 \uC788\uB294 \uC2E4\uD589 \uCDE8\uC18C \uBC84\uD2BC\uC774 \uD3EC\uD568\uB41C \uB2E4\uD06C \uBAA8\uB358 \uD1A0\uC2A4\uD2B8",
        tokenBindings: {
          background: "--atom-palette-gray-900",
          borderColor: "--atom-palette-gray-800",
          textColor: "--atom-palette-gray-100",
          iconColor: "--atom-palette-blue-400",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4",
          hoverBackground: "--atom-palette-gray-800",
          activeBackground: "--atom-palette-gray-700"
        }
      }
    ]
  },
  // 29. Container (Layout)
  {
    id: "container",
    name: "Container (\uCEE8\uD14C\uC774\uB108)",
    category: "Layout",
    description: "\uD654\uBA74 \uB108\uBE44\uC5D0 \uB9DE\uCDB0 \uCD5C\uB300 \uD3ED\uACFC \uC88C\uC6B0 \uC5EC\uBC31(Gutter)\uC744 \uC77C\uC815\uD558\uAC8C \uC720\uC9C0\uD558\uB294 \uC911\uC2EC \uB808\uC774\uC544\uC6C3 \uB798\uD37C",
    properties: [
      { key: "background", label: "\uCEE8\uD14C\uC774\uB108 \uBC30\uACBD\uC0C9 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uC678\uACFD\uC120 \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "textColor", label: "\uB0B4\uBD80 \uD14D\uC2A4\uD2B8 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-900" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-lg" },
      { key: "paddingX", label: "\uC88C\uC6B0 \uAC70\uD130 \uC5EC\uBC31 (Gutter X)", category: "spacing", defaultPaletteId: "--atom-space-6" },
      { key: "paddingY", label: "\uC0C1\uD558 \uD328\uB529 (Padding Y)", category: "spacing", defaultPaletteId: "--atom-space-4" }
    ],
    variables: [
      {
        id: "standard",
        name: "\uD45C\uC900 \uCF58\uD150\uCE20 \uCEE8\uD14C\uC774\uB108 (Standard Boxed)",
        description: "\uC77C\uBC18 \uBB38\uC11C \uBC0F \uB300\uC2DC\uBCF4\uB4DC \uBCF8\uBB38\uC744 \uAC10\uC2F8\uB294 \uAE30\uBCF8 1280px \uAE30\uC900 \uCEE8\uD14C\uC774\uB108",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-200",
          textColor: "--atom-palette-gray-900",
          borderRadius: "--atom-radius-lg",
          paddingX: "--atom-space-6",
          paddingY: "--atom-space-4"
        }
      },
      {
        id: "surface",
        name: "\uAC15\uC870 \uC11C\uD53C\uC2A4 \uCEE8\uD14C\uC774\uB108 (Subtle Surface)",
        description: "\uD788\uC5B4\uB85C \uC139\uC158\uC774\uB098 \uC694\uC57D \uBE14\uB85D\uC744 \uAD6C\uBD84\uD558\uAE30 \uC704\uD574 \uBCF4\uC870 \uBC30\uACBD\uC0C9\uC774 \uC785\uD600\uC9C4 \uCEE8\uD14C\uC774\uB108",
        tokenBindings: {
          background: "--atom-palette-gray-50",
          borderColor: "--atom-palette-gray-300",
          textColor: "--atom-palette-gray-900",
          borderRadius: "--atom-radius-xl",
          paddingX: "--atom-space-8",
          paddingY: "--atom-space-6"
        }
      },
      {
        id: "compact",
        name: "\uBAA8\uBC14\uC77C\xB7\uB0B4\uB85C\uC6B0 \uCEE8\uD14C\uC774\uB108 (Compact Focused)",
        description: "\uACB0\uC81C/\uB85C\uADF8\uC778 \uB4F1 \uB2E8\uC77C \uD0DC\uC2A4\uD06C \uC9D1\uC911\uC744 \uC704\uD55C \uCEF4\uD329\uD2B8 \uB108\uBE44 \uCEE8\uD14C\uC774\uB108",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-blue-200",
          textColor: "--atom-palette-gray-900",
          borderRadius: "--atom-radius-md",
          paddingX: "--atom-space-4",
          paddingY: "--atom-space-4"
        }
      }
    ]
  },
  // 30. Layout & Stack (Layout)
  {
    id: "layout",
    name: "Layout & Stack (\uB808\uC774\uC544\uC6C3 & \uC2A4\uD0DD)",
    category: "Layout",
    description: "\uC694\uC18C \uAC04 \uC77C\uC815\uD55C \uAC04\uACA9(Gap)\uACFC \uB2E4\uB2E8 \uADF8\uB9AC\uB4DC, \uC571 \uC258 \uBC30\uCE58\uB97C \uC81C\uC5B4\uD558\uB294 \uAD6C\uC870\uC801 \uB808\uC774\uC544\uC6C3 \uD504\uB9AC\uBBF8\uD2F0\uBE0C",
    properties: [
      { key: "background", label: "\uC140 \uBC30\uACBD\uC0C9 (Background)", category: "color", defaultPaletteId: "--atom-palette-gray-50" },
      { key: "borderColor", label: "\uAC00\uC774\uB4DC \uD14C\uB450\uB9AC (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "textColor", label: "\uB77C\uBCA8 \uC0C9\uC0C1 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-800" },
      { key: "gap", label: "\uC544\uC774\uD15C \uAC04\uACA9 (Gap Spacing)", category: "spacing", defaultPaletteId: "--atom-space-4" },
      { key: "padding", label: "\uCEE8\uD14C\uC774\uB108 \uD328\uB529 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-4" },
      { key: "borderRadius", label: "\uC140 \uBAA8\uC11C\uB9AC \uACE1\uB960 (Radius)", category: "radius", defaultPaletteId: "--atom-radius-md" }
    ],
    variables: [
      {
        id: "balanced",
        name: "\uD45C\uC900 \uADE0\uD615 \uAC04\uACA9 (Balanced Stack)",
        description: "16px \uAE30\uBCF8 \uAC04\uACA9\uC73C\uB85C \uCE74\uB4DC\uC640 \uC785\uB825 \uD544\uB4DC\uB97C \uC815\uAC08\uD558\uAC8C \uBC30\uCE58\uD558\uB294 \uD45C\uC900 \uC2A4\uD0DD",
        tokenBindings: {
          background: "--atom-palette-gray-50",
          borderColor: "--atom-palette-gray-200",
          textColor: "--atom-palette-gray-800",
          gap: "--atom-space-4",
          padding: "--atom-space-4",
          borderRadius: "--atom-radius-md"
        }
      },
      {
        id: "dense",
        name: "\uACE0\uBC00\uB3C4 \uCEF4\uD329\uD2B8 (Dense Grid)",
        description: "8px \uC870\uBC00\uD55C \uAC04\uACA9\uC73C\uB85C \uB300\uB7C9 \uC815\uBCF4\uB97C \uC555\uCD95 \uBC30\uCE58\uD558\uB294 \uC5B4\uB4DC\uBBFC \uADF8\uB9AC\uB4DC \uB808\uC774\uC544\uC6C3",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-300",
          textColor: "--atom-palette-gray-900",
          gap: "--atom-space-2",
          padding: "--atom-space-3",
          borderRadius: "--atom-radius-sm"
        }
      },
      {
        id: "spacious",
        name: "\uC5EC\uC720\uB85C\uC6B4 \uC139\uC158 (Spacious Editorial)",
        description: "24px \uC774\uC0C1\uC758 \uB109\uB109\uD55C \uC5EC\uBC31\uC73C\uB85C \uCF58\uD150\uCE20 \uBAB0\uC785\uB3C4\uB97C \uB192\uC774\uB294 \uB79C\uB529\xB7\uC1FC\uCF00\uC774\uC2A4 \uB808\uC774\uC544\uC6C3",
        tokenBindings: {
          background: "--atom-palette-blue-50",
          borderColor: "--atom-palette-blue-200",
          textColor: "--atom-palette-gray-900",
          gap: "--atom-space-6",
          padding: "--atom-space-6",
          borderRadius: "--atom-radius-lg"
        }
      }
    ]
  },
  // 31. Tree View (Data)
  {
    id: "tree",
    name: "Tree View (\uD2B8\uB9AC \uBDF0)",
    category: "Data",
    description: "\uACC4\uCE35\uD615 \uD3F4\uB354\xB7\uD30C\uC77C\xB7\uCE74\uD14C\uACE0\uB9AC \uB178\uB4DC\uB97C \uC811\uACE0 \uD3BC\uCE58\uBA70 \uD0D0\uC0C9\uD558\uB294 \uC778\uD130\uB799\uD2F0\uBE0C \uD2B8\uB9AC \uCEF4\uD3EC\uB10C\uD2B8",
    properties: [
      { key: "background", label: "\uD328\uB110 \uBC30\uACBD\uC0C9 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uD328\uB110 \uD14C\uB450\uB9AC (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "textColor", label: "\uAE30\uBCF8 \uB178\uB4DC \uD14D\uC2A4\uD2B8 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-800" },
      { key: "activeBackground", label: "\uC120\uD0DD \uB178\uB4DC \uBC30\uACBD (Selected BG)", category: "color", defaultPaletteId: "--atom-palette-blue-50" },
      { key: "activeText", label: "\uC120\uD0DD \uB178\uB4DC \uD14D\uC2A4\uD2B8 (Selected Text)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-md" },
      { key: "padding", label: "\uCEE8\uD14C\uC774\uB108 \uD328\uB529 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-3" }
    ],
    variables: [
      {
        id: "explorer",
        name: "\uD30C\uC77C \uD0D0\uC0C9\uAE30 \uD2B8\uB9AC (File Explorer)",
        description: "\uC88C\uCE21 \uD328\uB110\uC5D0 \uBC30\uCE58\uB418\uC5B4 \uC18C\uC2A4 \uCF54\uB4DC\uB098 \uB514\uC790\uC778 \uD1A0\uD070 \uACC4\uCE35\uC744 \uD0D0\uC0C9\uD558\uB294 \uAE30\uBCF8 \uD2B8\uB9AC",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-200",
          textColor: "--atom-palette-gray-800",
          activeBackground: "--atom-palette-blue-50",
          activeText: "--atom-color-primary",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-3"
        }
      },
      {
        id: "dark-sidebar",
        name: "\uB2E4\uD06C \uCF58\uC194 \uD2B8\uB9AC (Dark Console Tree)",
        description: "\uAC1C\uBC1C\uC790 IDE \uBC0F \uC778\uD504\uB77C \uAD00\uB9AC \uB3C4\uAD6C\uC5D0 \uC5B4\uC6B8\uB9AC\uB294 \uB2E4\uD06C \uC11C\uD53C\uC2A4 \uD2B8\uB9AC",
        tokenBindings: {
          background: "--atom-palette-gray-900",
          borderColor: "--atom-palette-gray-800",
          textColor: "--atom-palette-gray-200",
          activeBackground: "--atom-palette-blue-600",
          activeText: "--atom-palette-white",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-3"
        }
      }
    ]
  },
  // 32. TokenSelect (Form)
  {
    id: "token-select",
    name: "TokenSelect (\uD1A0\uD070 \uAC80\uC0C9 \uB4DC\uB86D\uB2E4\uC6B4)",
    category: "Form",
    description: "\uB514\uC790\uC778 \uD1A0\uD070\uBA85, CSS \uBCC0\uC218 ID, \uCEEC\uB7EC \uC2A4\uC640\uCE58 \uBC0F \uACC4\uC5F4 \uD544\uD130\uB97C \uC2E4\uC2DC\uAC04 \uAC80\uC0C9\xB7\uC120\uD0DD\uD558\uB294 \uC804\uBB38 \uC140\uB809\uD2B8 \uCEF4\uD3EC\uB10C\uD2B8",
    properties: [
      { key: "background", label: "\uD2B8\uB9AC\uAC70 \uBC30\uACBD\uC0C9 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-300" },
      { key: "textColor", label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-900" },
      { key: "focusBorderColor", label: "\uC5F4\uB9BC/\uD3EC\uCEE4\uC2A4 \uBCF4\uB354 (Focus Border)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-sm" },
      { key: "paddingX", label: "\uC88C\uC6B0 \uD328\uB529 (Padding X)", category: "spacing", defaultPaletteId: "--atom-space-2-5" }
    ],
    variables: [
      {
        id: "primary",
        name: "\uD45C\uC900 \uD1A0\uD070 \uAC80\uC0C9 (Primary Token Picker)",
        description: "\uC778\uC2A4\uD399\uD130\uC640 \uD14C\uB9C8 \uB9E4\uB2C8\uC800\uC5D0\uC11C \uCEEC\uB7EC/\uC0AC\uC774\uC988/\uACE1\uB960 \uD1A0\uD070\uC744 \uC989\uC2DC \uAC80\uC0C9\uD574 \uBC14\uC778\uB529",
        variableRole: "primary",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-300",
          textColor: "--atom-palette-gray-900",
          focusBorderColor: "--atom-color-primary",
          borderRadius: "--atom-radius-sm",
          paddingX: "--atom-space-2-5"
        }
      },
      {
        id: "subtle-surface",
        name: "\uC11C\uD53C\uC2A4 \uBCF4\uC870 \uC140\uB809\uD2B8 (Subtle Filled Picker)",
        description: "\uC5F0\uD55C \uD68C\uC0C9 \uBC30\uACBD\uC73C\uB85C \uD3FC \uC601\uC5ED\uACFC \uC870\uD654\uB86D\uAC8C \uC5B4\uC6B0\uB7EC\uC9C0\uB294 \uD1A0\uD070 \uC140\uB809\uD2B8",
        variableRole: "secondary",
        tokenBindings: {
          background: "--atom-palette-gray-50",
          borderColor: "--atom-palette-gray-200",
          textColor: "--atom-palette-gray-800",
          focusBorderColor: "--atom-color-primary",
          borderRadius: "--atom-radius-md",
          paddingX: "--atom-space-3"
        }
      }
    ]
  },
  // 33. Alert (Feedback)
  {
    id: "alert",
    name: "Alert (\uC54C\uB9BC \uCF5C\uC544\uC6C3)",
    category: "Feedback",
    description: "\uD654\uBA74 \uC778\uB77C\uC778 \uC601\uC5ED\uC5D0 \uC815\uBCF4, \uC131\uACF5, \uACBD\uACE0, \uC704\uD5D8 \uBA54\uC2DC\uC9C0\uB97C \uAD6C\uC870\uD654\uD558\uC5EC \uAC15\uC870 \uD45C\uC2DC\uD558\uB294 \uC54C\uB9BC \uBC30\uB108",
    properties: [
      { key: "background", label: "\uCF5C\uC544\uC6C3 \uBC30\uACBD\uC0C9 (Background)", category: "color", defaultPaletteId: "--atom-palette-blue-50" },
      { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-blue-200" },
      { key: "textColor", label: "\uBCF8\uBB38 \uD14D\uC2A4\uD2B8 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-900" },
      { key: "iconColor", label: "\uC544\uC774\uCF58 \uAC15\uC870\uC0C9 (Icon Color)", category: "color", defaultPaletteId: "--atom-color-primary" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-md" },
      { key: "padding", label: "\uB0B4\uBD80 \uD328\uB529 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-4" }
    ],
    variables: [
      {
        id: "info",
        name: "\uC548\uB0B4 \uCF5C\uC544\uC6C3 (Info Alert)",
        description: "\uC5C5\uB370\uC774\uD2B8 \uACF5\uC9C0, \uAC00\uC774\uB4DC \uD301 \uB4F1 \uC77C\uBC18 \uC815\uBCF4\uB97C \uC804\uB2EC\uD558\uB294 \uBE14\uB8E8 \uD1A4 \uC54C\uB9BC",
        variableRole: "info",
        tokenBindings: {
          background: "--atom-palette-blue-50",
          borderColor: "--atom-palette-blue-200",
          textColor: "--atom-palette-gray-900",
          iconColor: "--atom-color-primary",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4"
        }
      },
      {
        id: "success",
        name: "\uC131\uACF5 \uD655\uC778 (Success Alert)",
        description: "\uC800\uC7A5, \uBC30\uD3EC, \uC778\uC99D \uC644\uB8CC \uC0C1\uD0DC\uB97C \uC54C\uB9AC\uB294 \uC5D0\uBA54\uB784\uB4DC \uCF5C\uC544\uC6C3",
        variableRole: "success",
        tokenBindings: {
          background: "--atom-palette-emerald-50",
          borderColor: "--atom-palette-emerald-200",
          textColor: "--atom-palette-gray-900",
          iconColor: "--atom-color-success",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4"
        }
      },
      {
        id: "warning",
        name: "\uC8FC\uC758 \uACBD\uACE0 (Warning Alert)",
        description: "\uB9CC\uB8CC \uC784\uBC15, \uBE44\uAD8C\uC7A5 \uC635\uC158 \uB4F1 \uC0AC\uC804 \uC8FC\uC758\uB97C \uD658\uAE30\uD558\uB294 \uC570\uBC84 \uCF5C\uC544\uC6C3",
        variableRole: "warning",
        tokenBindings: {
          background: "--atom-palette-amber-50",
          borderColor: "--atom-palette-amber-200",
          textColor: "--atom-palette-gray-900",
          iconColor: "--atom-color-warning",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4"
        }
      },
      {
        id: "destructive",
        name: "\uC704\uD5D8 \uC624\uB958 (Destructive Alert)",
        description: "\uAD8C\uD55C \uCC28\uB2E8, \uAC80\uC99D \uC2E4\uD328 \uB4F1 \uC989\uAC01\uC801 \uB300\uC751\uC774 \uD544\uC694\uD55C \uB85C\uC988 \uB808\uB4DC \uCF5C\uC544\uC6C3",
        variableRole: "danger",
        tokenBindings: {
          background: "--atom-palette-rose-50",
          borderColor: "--atom-palette-rose-200",
          textColor: "--atom-palette-gray-900",
          iconColor: "--atom-color-danger",
          borderRadius: "--atom-radius-md",
          padding: "--atom-space-4"
        }
      }
    ]
  },
  // 34. Sheet (Feedback)
  {
    id: "sheet",
    name: "Sheet (\uBC14\uD140\uC2DC\uD2B8 & \uB4DC\uB85C\uC5B4)",
    category: "Feedback",
    description: "\uD654\uBA74 \uD558\uB2E8\uC774\uB098 \uCE21\uBA74\uC5D0\uC11C \uBD80\uB4DC\uB7FD\uAC8C \uC2AC\uB77C\uC774\uB4DC\uB418\uC5B4 \uD544\uD130\xB7\uC0C1\uC138\xB7\uD655\uC778 \uD50C\uB85C\uC6B0\uB97C \uC81C\uACF5\uD558\uB294 \uC624\uBC84\uB808\uC774 \uC2DC\uD2B8",
    properties: [
      { key: "background", label: "\uC2DC\uD2B8 \uBC30\uACBD\uC0C9 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
      { key: "borderColor", label: "\uACBD\uACC4\uC120 \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
      { key: "textColor", label: "\uBCF8\uBB38 \uD14D\uC2A4\uD2B8 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-900" },
      { key: "headerBackground", label: "\uC0C1\uB2E8 \uD5E4\uB354 \uBC30\uACBD (Header BG)", category: "color", defaultPaletteId: "--atom-palette-gray-50" },
      { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-xl" },
      { key: "padding", label: "\uB0B4\uBD80 \uD328\uB529 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-4" }
    ],
    variables: [
      {
        id: "bottom-action",
        name: "\uBAA8\uBC14\uC77C \uBC14\uD140 \uC2DC\uD2B8 (Bottom Action Sheet)",
        description: "\uBAA8\uBC14\uC77C \uD558\uB2E8\uC5D0\uC11C \uC62C\uB77C\uC640 \uBE60\uB978 \uC120\uD0DD\uACFC \uD655\uC778 \uC561\uC158\uC744 \uC81C\uACF5\uD558\uB294 \uB465\uADFC \uBC14\uD140\uC2DC\uD2B8",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-200",
          textColor: "--atom-palette-gray-900",
          headerBackground: "--atom-palette-gray-50",
          borderRadius: "--atom-radius-xl",
          padding: "--atom-space-4"
        }
      },
      {
        id: "side-detail",
        name: "\uCE21\uBA74 \uC0C1\uC138 \uB4DC\uB85C\uC5B4 (Side Detail Sheet)",
        description: "\uC6B0\uCE21\uC5D0\uC11C \uC5F4\uB824 \uBAA9\uB85D\uC744 \uAC00\uB9AC\uC9C0 \uC54A\uACE0 \uC138\uBD80 \uC815\uBCF4\uB97C \uC218\uC815\uD558\uB294 \uC0AC\uC774\uB4DC \uC2DC\uD2B8",
        tokenBindings: {
          background: "--atom-palette-white",
          borderColor: "--atom-palette-gray-300",
          textColor: "--atom-palette-gray-900",
          headerBackground: "--atom-palette-gray-50",
          borderRadius: "--atom-radius-lg",
          padding: "--atom-space-5"
        }
      }
    ]
  }
];
var AI_COMPONENT_SUBMISSION_TEMPLATE = {
  id: "rating-chip",
  name: "Rating Chip (\uBCC4\uC810 \uD3C9\uAC00 \uCE69)",
  category: "Feedback",
  description: "\uC0AC\uC6A9\uC790\uC758 \uD3C9\uC810, \uB9AC\uBDF0 \uC810\uC218, \uC2E0\uB8B0 \uB4F1\uAE09\uC744 Type\xB7Variable\xB7Status \uAD6C\uC870\uB85C \uD45C\uC2DC\uD558\uB294 \uD3C9\uAC00 \uBC30\uC9C0",
  types: [
    {
      id: "soft",
      name: "Soft (\uC5F0\uD55C \uD2F4\uD2B8\uD615)",
      description: "\uC740\uC740\uD55C \uC2DC\uB9E8\uD2F1 \uBC30\uACBD \uC704\uC5D0 \uBCC4\uC810\uACFC \uC810\uC218\uB97C \uD45C\uC2DC\uD558\uB294 \uAE30\uBCF8 \uC678\uD615",
      whenToUse: "\uC0C1\uD488 \uCE74\uB4DC, \uB9AC\uC2A4\uD2B8 \uD589, \uC694\uC57D \uD5E4\uB354\uC5D0\uC11C \uC2DC\uAC01\uC801 \uBD80\uB2F4 \uC5C6\uC774 \uC810\uC218\uB97C \uB178\uCD9C\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "solid",
      name: "Solid (\uACE0\uB300\uBE44 \uCC44\uC6C0\uD615)",
      description: "\uC120\uBA85\uD55C \uAC15\uC870 \uBC30\uACBD\uC73C\uB85C \uCD94\uCC9C\xB7\uC6B0\uC218 \uB4F1\uAE09\uC744 \uB3CB\uBCF4\uC774\uAC8C \uD558\uB294 \uC678\uD615",
      whenToUse: "\uC5D0\uB514\uD130 \uCD94\uCC9C, \uBCA0\uC2A4\uD2B8\uC140\uB7EC \uB4F1 \uCD5C\uC6B0\uC120 \uAC15\uC870\uAC00 \uD544\uC694\uD55C \uC601\uC5ED\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    },
    {
      id: "outlined",
      name: "Outlined (\uC678\uACFD\uC120\uD615)",
      description: "\uD22C\uBA85 \uBC30\uACBD\uACFC 1px \uC2DC\uB9E8\uD2F1 \uBCF4\uB354\uB85C \uC815\uB3C8\uB41C \uC678\uD615",
      whenToUse: "\uC774\uBBF8 \uBC30\uACBD\uC0C9\uC774 \uAE54\uB9B0 \uCE74\uB4DC \uC704\uC5D0\uC11C \uACBD\uACC4\uB97C \uC120\uBA85\uD788 \uBD84\uB9AC\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
    }
  ],
  variables: [
    {
      id: "primary",
      name: "\uAE30\uBCF8 \uBE0C\uB79C\uB4DC \uD3C9\uC810 (Primary)",
      description: "\uBE0C\uB79C\uB4DC \uD504\uB77C\uC774\uBA38\uB9AC \uD1A0\uD070 \uAE30\uBC18 \uAE30\uBCF8 \uD3C9\uC810 \uD45C\uC2DC",
      variableRole: "primary",
      tokenBindings: {
        background: "--atom-color-primary-subtle",
        textColor: "--atom-color-primary",
        borderColor: "--atom-color-primary",
        borderRadius: "--atom-radius-full",
        paddingX: "--atom-space-3",
        paddingY: "--atom-space-1"
      }
    },
    {
      id: "warning",
      name: "\uACE8\uB4DC \uBCC4\uC810 \uAC15\uC870 (Warning / Star)",
      description: "\uBCC4\uC810 \uBC0F \uC8FC\uC758 \uD658\uAE30\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uC570\uBC84/\uACE8\uB4DC \uC2DC\uB9E8\uD2F1 \uD1A0\uD070 \uC870\uD569",
      variableRole: "warning",
      tokenBindings: {
        background: "--atom-palette-amber-50",
        textColor: "--atom-palette-amber-700",
        borderColor: "--atom-palette-amber-300",
        borderRadius: "--atom-radius-full",
        paddingX: "--atom-space-3",
        paddingY: "--atom-space-1"
      }
    }
  ],
  supportedStatuses: ["default", "hover", "active", "focus", "disabled"],
  docs: {
    useCases: ["\uC0C1\uD488 \uBAA9\uB85D \uBCC4\uC810 \uBC43\uC9C0", "\uC804\uBB38\uAC00 \uC2E0\uB8B0\uB3C4 \uC694\uC57D \uD5E4\uB354", "AI \uC751\uB2F5 \uD488\uC9C8 \uD53C\uB4DC\uBC31 \uC810\uC218 \uD45C\uC2DC"],
    usagePatterns: [
      "Type(soft/solid/outlined)\uC73C\uB85C \uC2DC\uAC01\uC801 \uBB34\uAC8C\uAC10\uC744 \uC120\uD0DD\uD558\uACE0 Variable(primary/warning)\uB85C \uC758\uBBF8\uB97C \uBD80\uC5EC\uD569\uB2C8\uB2E4."
    ]
  }
};
function buildAiComponentSubmissionPrompt(componentRequest = "\uC0C8 UI \uCEF4\uD3EC\uB10C\uD2B8") {
  return `\uC544\uB798 AtomSystem \uC2A4\uD0A4\uB9C8(JSON) \uD615\uC2DD\uC5D0 \uB9DE\uCDB0 "${componentRequest}" \uCEF4\uD3EC\uB10C\uD2B8\uB97C \uC124\uACC4\uD574\uC918.
\uADDC\uCE59:
1. \uBC18\uB4DC\uC2DC [Type (\uC678\uD615 \uC591\uC2DD) \xB7 Variable (\uC2DC\uC2A4\uD15C \uC0C9\uC0C1/\uC635\uC158) \xB7 Status (default/hover/active/focus/disabled)] 3\uB300 \uC544\uD0A4\uD14D\uCC98\uB97C \uBAA8\uB450 \uD3EC\uD568\uD560 \uAC83.
2. tokenBindings \uAC12\uC5D0\uB294 \uBC18\uB4DC\uC2DC '--atom-'\uB85C \uC2DC\uC791\uD558\uB294 \uC2DC\uB9E8\uD2F1/\uD314\uB808\uD2B8 CSS \uBCC0\uC218 ID\uB9CC \uC0AC\uC6A9\uD560 \uAC83 (HEX \uD558\uB4DC\uCF54\uB529 \uAE08\uC9C0).
3. componentCode\uB97C \uD3EC\uD568\uD560 \uACBD\uC6B0 '@/components/ui' \uCEF4\uD3EC\uB10C\uD2B8\uC640 \uC2DC\uB9E8\uD2F1 CSS \uBCC0\uC218(var(--atom-...))\uB9CC \uC0AC\uC6A9\uD558\uACE0 \uC6D0\uC2DC <button>/<input>/<select>/<table> \uD0DC\uADF8 \uBC0F \uC784\uC758 HEX \uCEEC\uB7EC\uB97C \uC4F0\uC9C0 \uB9D0 \uAC83.
4. \uC81C\uCD9C \uC591\uC2DD(JSON Only):
\`\`\`json
${JSON.stringify(AI_COMPONENT_SUBMISSION_TEMPLATE, null, 2)}
\`\`\`
\uC704 JSON\uC744 \uC644\uC131\uD55C \uB4A4 AtomSystem \uB85C\uCEEC \uC2A4\uD29C\uB514\uC624(+ AI \uC81C\uCD9C) \uB610\uB294 'npx atomsystem submit <file.atom.json>'\uC73C\uB85C \uB4F1\uB85D\uD558\uBA74 components/ui/, tokens/studio.registry.json, tokens/token.json, css/atom-ui.css\uC5D0 \uC790\uB3D9 \uBC18\uC601\uB429\uB2C8\uB2E4.`;
}

// lib/tokens/ComponentTokens.ts
var DEFAULT_STATUS_BEHAVIORS = {
  default: { behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9" },
  hover: { behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer" },
  active: { behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31" },
  focus: { behavior: "outline 2px solid primary, outline-offset 2px" },
  disabled: { behavior: "opacity 40%, cursor: not-allowed" },
  loading: { behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none" }
};
var ComponentTokenLayer = class {
  constructor(raw, palette, theme, resolver) {
    this.raw = raw;
    this.palette = palette;
    this.theme = theme;
    this.resolver = resolver;
  }
  ids() {
    return Object.keys(this.raw);
  }
  get(componentId) {
    return this.raw[componentId];
  }
  resolveBinding(componentId, variableId, propKey) {
    const binding = this.raw[componentId]?.variables?.[variableId]?.tokens?.[propKey];
    if (!binding) return void 0;
    const targetVariable = binding.targetVariable || this.resolver.getVariableByPath(binding.$value) || "";
    const resolvedValue = this.resolver.resolveValue(binding.$value) || binding.resolvedValue || "";
    const chain = this.resolver.resolveChain(binding.$value);
    return {
      alias: binding.$value,
      targetVariable,
      resolvedValue,
      chain
    };
  }
  toStudioComponents() {
    const result = [];
    for (const [compId, node] of Object.entries(this.raw || {})) {
      const variables = Object.entries(node.variables || {}).map(
        ([varId, vNode]) => {
          const tokenBindings = {};
          for (const [propKey, binding] of Object.entries(vNode.tokens || {})) {
            tokenBindings[propKey] = binding.targetVariable || this.resolver.getVariableByPath(binding.$value) || this.resolver.resolveValue(binding.$value);
          }
          const role = vNode.variableRole || vNode.variable?.role;
          return {
            id: varId,
            name: vNode.name || varId,
            ...vNode.$description ? { description: vNode.$description } : {},
            ...role ? { variableRole: role } : {},
            ...vNode.supportedStatuses ? { supportedStatuses: vNode.supportedStatuses } : {},
            tokenBindings
          };
        }
      );
      result.push({
        id: compId,
        name: node.name || compId,
        category: node.category || "Form",
        description: node.$description || "",
        ...node.types ? { types: node.types } : {},
        ...node.typeGuide ? { typeGuide: node.typeGuide } : {},
        ...node.supportedStatuses ? { supportedStatuses: node.supportedStatuses } : {},
        properties: node.properties || [],
        variables,
        ...node.sourceFile ? { sourceFile: node.sourceFile } : {},
        ...node.autoDiscovered !== void 0 ? { autoDiscovered: node.autoDiscovered } : {},
        ...node.customCss ? { customCss: node.customCss } : {},
        ...node.docs ? { docs: node.docs } : {}
      });
    }
    return result;
  }
  static fromStudioComponents(components, resolver) {
    const map = {};
    for (const comp of components) {
      const resolvedTypes = getComponentTypes(comp.id, comp.types);
      const variables = {};
      for (const v of comp.variables || []) {
        const tokens = {};
        for (const [propKey, paletteOrStatusId] of Object.entries(v.tokenBindings || {})) {
          const alias = resolver.toAliasByVariable(paletteOrStatusId);
          tokens[propKey] = {
            $value: alias,
            targetVariable: paletteOrStatusId
          };
        }
        const typeSpec = resolveTypeSpec(comp.id, v.id, v.name);
        const role = v.variableRole || resolveVariableRole(v.id);
        variables[v.id] = {
          name: v.name,
          $description: v.description || "",
          ...v.variableRole ? { variableRole: v.variableRole } : {},
          type: {
            id: typeSpec.id,
            name: typeSpec.name,
            whenToUse: typeSpec.whenToUse
          },
          variable: {
            role,
            label: SEMANTIC_VARIABLE_DICTIONARY[role]?.label || role,
            meaning: SEMANTIC_VARIABLE_DICTIONARY[role]?.meaning || ""
          },
          statuses: { ...DEFAULT_STATUS_BEHAVIORS },
          ...v.supportedStatuses ? { supportedStatuses: v.supportedStatuses } : {},
          tokens
        };
      }
      map[comp.id] = {
        name: comp.name,
        category: comp.category,
        $description: comp.description,
        ...comp.sourceFile ? { sourceFile: comp.sourceFile } : {},
        ...comp.autoDiscovered !== void 0 ? { autoDiscovered: comp.autoDiscovered } : {},
        ...comp.customCss ? { customCss: comp.customCss } : {},
        ...comp.typeGuide ? { typeGuide: comp.typeGuide } : {},
        ...comp.docs ? { docs: comp.docs } : {},
        ...comp.supportedStatuses ? { supportedStatuses: comp.supportedStatuses } : {},
        properties: comp.properties,
        types: resolvedTypes.map((tp) => ({
          id: tp.id,
          name: tp.name,
          ...tp.description ? { description: tp.description } : {},
          whenToUse: tp.whenToUse,
          ...tp.whenToUseEn ? { whenToUseEn: tp.whenToUseEn } : {},
          ...tp.antiPattern ? { antiPattern: tp.antiPattern } : {},
          ...tp.visualTraits ? { visualTraits: tp.visualTraits } : {}
        })),
        variables
      };
    }
    return map;
  }
};

// lib/tokens/PaletteTokens.ts
function stripVarPrefix(id, prefixes) {
  for (const prefix of prefixes) {
    if (id.startsWith(prefix)) {
      return id.slice(prefix.length);
    }
  }
  return id.replace(/^--atom-/, "").replace(/^--/, "");
}
function inferColorFamily(id) {
  const match = id.match(/^--atom-palette-([a-z0-9]+)-/i);
  if (match) return match[1].toLowerCase();
  if (id === "--atom-palette-white" || id === "--atom-palette-black") return "neutral";
  return "custom";
}
function parsePxNumber(val) {
  const m = String(val).trim().match(/^(-?\d+(?:\.\d+)?)px$/);
  return m ? Number(m[1]) : void 0;
}
function toPaletteVariable(leaf, category, fallbackId) {
  return {
    id: leaf.variable || fallbackId,
    name: leaf.name || leaf.$description || fallbackId,
    category,
    value: leaf.$value,
    ...leaf.family ? { family: leaf.family } : {},
    ...leaf.cdnUrl ? { cdnUrl: leaf.cdnUrl } : {},
    ...leaf.$description ? { description: leaf.$description } : {}
  };
}
var PaletteTokenLayer = class {
  constructor(raw, resolver) {
    this.raw = raw;
    this.resolver = resolver;
  }
  getColor(family, step) {
    return this.raw.color?.[family]?.[String(step)];
  }
  getColorValue(family, step) {
    return this.getColor(family, step)?.$value;
  }
  getSpacing(key) {
    return this.raw.spacing?.[key];
  }
  getRadius(key) {
    return this.raw.radius?.[key];
  }
  getShadow(key) {
    return this.raw.shadow?.[key];
  }
  getTypography(group, key) {
    return this.raw.typography?.[group]?.[key];
  }
  getLayout(group, key) {
    return this.raw.layout?.[group]?.[key];
  }
  byVariable(cssVar) {
    const path = this.resolver.getPathByVariable(cssVar);
    if (!path || !path.startsWith("palette.")) return void 0;
    return this.resolver.getNode(path);
  }
  getPathForVariable(cssVar) {
    const path = this.resolver.getPathByVariable(cssVar);
    return path && path.startsWith("palette.") ? path : void 0;
  }
  /**
   * Reconstructs the flat `PaletteVariable[]` array expected by Studio UI & repositories.
   */
  toPaletteVariables(statusTokens) {
    const result = [];
    if (statusTokens && statusTokens.length > 0) {
      for (const st of statusTokens) {
        result.push({
          id: st.id,
          name: st.name,
          category: "status",
          family: "status",
          value: `var(${st.paletteId})`,
          description: st.description
        });
      }
    }
    for (const [family, group] of Object.entries(this.raw.color || {})) {
      for (const [step, leaf] of Object.entries(group || {})) {
        result.push(
          toPaletteVariable(
            { ...leaf, family: leaf.family || family },
            "color",
            `--atom-palette-${family}-${step}`
          )
        );
      }
    }
    for (const [key, leaf] of Object.entries(this.raw.spacing || {})) {
      result.push(toPaletteVariable(leaf, "spacing", `--atom-space-${key}`));
    }
    for (const [key, leaf] of Object.entries(this.raw.size || {})) {
      result.push(toPaletteVariable(leaf, "size", `--atom-size-${key}`));
    }
    for (const [key, leaf] of Object.entries(this.raw.radius || {})) {
      result.push(toPaletteVariable(leaf, "radius", `--atom-radius-${key}`));
    }
    for (const [key, leaf] of Object.entries(this.raw.typography?.font || {})) {
      result.push(
        toPaletteVariable({ ...leaf, family: leaf.family || "font-family" }, "typography", `--atom-font-${key}`)
      );
    }
    for (const [key, leaf] of Object.entries(this.raw.typography?.size || {})) {
      result.push(toPaletteVariable(leaf, "typography", `--atom-typography-${key}`));
    }
    for (const [key, leaf] of Object.entries(this.raw.typography?.weight || {})) {
      result.push(toPaletteVariable(leaf, "typography", `--atom-font-weight-${key}`));
    }
    return result;
  }
  /**
   * Builds a structured `PaletteTokenTree` from Studio's `PaletteVariable[]` list,
   * preserving shadow, layout, and composite typography scale nodes from `basePalette`.
   */
  static fromPaletteVariables(vars, basePalette) {
    const tree = {
      color: {},
      spacing: {},
      radius: {},
      shadow: basePalette?.shadow ? { ...basePalette.shadow } : {},
      typography: {
        font: {},
        size: {},
        weight: {},
        ...basePalette?.typography?.scale ? { scale: basePalette.typography.scale } : {}
      },
      layout: basePalette?.layout ? {
        container: { ...basePalette.layout.container || {} },
        gutter: { ...basePalette.layout.gutter || {} },
        gap: { ...basePalette.layout.gap || {} }
      } : { container: {}, gutter: {}, gap: {} }
    };
    for (const p of vars) {
      if (p.category === "status") {
        continue;
      }
      if (p.category === "color") {
        const family = (p.family || inferColorFamily(p.id)).toLowerCase();
        const key = stripVarPrefix(p.id, [`--atom-palette-${family}-`, "--atom-palette-"]);
        if (!tree.color[family]) tree.color[family] = {};
        tree.color[family][key] = {
          $value: p.value,
          $type: "color",
          $description: p.description || p.name,
          name: p.name,
          family,
          variable: p.id
        };
        continue;
      }
      if (p.category === "spacing") {
        const key = stripVarPrefix(p.id, ["--atom-space-", "--atom-spacing-"]);
        const px = parsePxNumber(p.value);
        tree.spacing[key] = {
          $value: p.value,
          $type: "dimension",
          $description: p.description || p.name,
          name: p.name,
          variable: p.id,
          ...px !== void 0 ? { px } : {}
        };
        continue;
      }
      if (p.category === "size") {
        if (!tree.size) tree.size = {};
        const key = stripVarPrefix(p.id, ["--atom-size-"]);
        tree.size[key] = {
          $value: p.value,
          $type: "dimension",
          $description: p.description || p.name,
          name: p.name,
          variable: p.id
        };
        continue;
      }
      if (p.category === "radius") {
        const key = stripVarPrefix(p.id, ["--atom-radius-"]);
        tree.radius[key] = {
          $value: p.value,
          $type: "dimension",
          $description: p.description || p.name,
          name: p.name,
          variable: p.id
        };
        continue;
      }
      if (p.category === "typography") {
        const isFontFamily = p.family === "font-family" || p.id.includes("font-sans") || p.id.includes("font-mono");
        if (isFontFamily) {
          const key = stripVarPrefix(p.id, ["--atom-font-"]);
          tree.typography.font[key] = {
            $value: p.value,
            $type: "fontFamily",
            $description: p.description || p.name,
            name: p.name,
            family: "font-family",
            variable: p.id,
            ...p.cdnUrl ? { cdnUrl: p.cdnUrl } : {}
          };
        } else if (p.id.includes("weight")) {
          const key = stripVarPrefix(p.id, ["--atom-font-weight-"]);
          tree.typography.weight[key] = {
            $value: p.value,
            $type: "fontWeight",
            $description: p.description || p.name,
            name: p.name,
            variable: p.id
          };
        } else {
          const key = stripVarPrefix(p.id, ["--atom-typography-", "--atom-font-size-"]);
          tree.typography.size[key] = {
            $value: p.value,
            $type: "dimension",
            $description: p.description || p.name,
            name: p.name,
            variable: p.id
          };
        }
      }
    }
    return tree;
  }
};

// lib/tokens/ThemeTokens.ts
var STATUS_KEYS = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning"
];
var THEME_TOKEN_KEYS = [
  "primary",
  "primaryHover",
  "primaryLight",
  "secondary",
  "secondaryHover",
  "secondaryLight",
  "bgPrimary",
  "bgSecondary",
  "textPrimary",
  "textSecondary",
  "textMuted",
  "borderSubtle",
  "borderStrong",
  "statusSuccess",
  "statusDanger",
  "statusWarning"
];
function isSemanticStatusGroup(val) {
  return Boolean(
    val && typeof val === "object" && "$value" in val && "variable" in val && "hover" in val && "subtle" in val
  );
}
var ThemeTokenLayer = class {
  constructor(raw, palette, resolver) {
    this.raw = raw;
    this.palette = palette;
    this.resolver = resolver;
  }
  get activeThemeId() {
    return this.raw.activeThemeId || "ocean-blue";
  }
  getSemanticStatus(key) {
    const entry = this.raw.semantic?.[key];
    const node = isSemanticStatusGroup(entry) ? entry : void 0;
    return {
      node,
      value: node ? this.resolver.resolveValue(node.$value) : "",
      hoverValue: node?.hover ? this.resolver.resolveValue(node.hover.$value) : "",
      subtleValue: node?.subtle ? this.resolver.resolveValue(node.subtle.$value) : ""
    };
  }
  getSemanticGroup(group) {
    const candidate = this.raw.semantic?.[group];
    if (!candidate || isSemanticStatusGroup(candidate)) return {};
    return candidate;
  }
  toStatusTokens() {
    const result = [];
    for (const key of STATUS_KEYS) {
      const node = this.raw.semantic?.[key];
      if (!isSemanticStatusGroup(node)) continue;
      result.push({
        id: node.variable,
        key,
        name: node.name || key,
        description: node.$description || "",
        paletteId: this.resolver.getVariableByPath(node.$value) || this.resolver.stripAlias(node.$value),
        hoverPaletteId: this.resolver.getVariableByPath(node.hover.$value) || this.resolver.stripAlias(node.hover.$value),
        subtlePaletteId: this.resolver.getVariableByPath(node.subtle.$value) || this.resolver.stripAlias(node.subtle.$value)
      });
    }
    return result;
  }
  getPreset(themeId) {
    const preset = this.raw.presets?.[themeId];
    return preset ? this.hydratePreset(preset) : void 0;
  }
  getActiveTheme() {
    return this.getPreset(this.activeThemeId) || this.toStudioThemes()[0];
  }
  toStudioThemes() {
    return Object.values(this.raw.presets || {}).map((preset) => this.hydratePreset(preset));
  }
  hydratePreset(preset) {
    const paletteBindings = {};
    const resolvedColors = {};
    for (const key of THEME_TOKEN_KEYS) {
      const leaf = preset.tokens?.[key];
      if (!leaf) continue;
      const targetVar = leaf.targetVariable || this.resolver.getVariableByPath(leaf.$value);
      if (targetVar && targetVar.startsWith("--")) {
        paletteBindings[key] = targetVar;
      }
      resolvedColors[key] = this.resolver.resolveValue(leaf.$value);
    }
    const brandColor = this.resolver.resolveValue(preset.brandColor);
    const borderRadius = this.resolver.resolveValue(preset.borderRadius);
    const fontFamily = preset.fontFamily ? this.resolver.resolveValue(preset.fontFamily) : void 0;
    return {
      id: preset.id,
      name: preset.name,
      description: preset.description,
      mode: preset.mode,
      category: preset.category,
      brandColor: brandColor || resolvedColors.primary || "var(--accent-primary)",
      borderRadius: borderRadius || "8px",
      ...fontFamily ? { fontFamily } : {},
      ...preset.isCustom ? { isCustom: true } : {},
      ...Object.keys(paletteBindings).length > 0 ? { paletteBindings } : {},
      colors: resolvedColors
    };
  }
  static fromStudioState(params) {
    const { activeThemeId, statusTokens, palette, resolver, themes, baseTheme } = params;
    const semantic = {
      primary: baseTheme?.semantic?.primary,
      secondary: baseTheme?.semantic?.secondary,
      success: baseTheme?.semantic?.success,
      danger: baseTheme?.semantic?.danger,
      warning: baseTheme?.semantic?.warning,
      ...baseTheme?.semantic?.surface ? { surface: baseTheme.semantic.surface } : {},
      ...baseTheme?.semantic?.text ? { text: baseTheme.semantic.text } : {},
      ...baseTheme?.semantic?.border ? { border: baseTheme.semantic.border } : {}
    };
    for (const st of statusTokens) {
      semantic[st.key] = {
        $value: resolver.toAliasByVariable(st.paletteId),
        $type: "color",
        $description: st.description,
        name: st.name,
        variable: st.id,
        hover: {
          $value: resolver.toAliasByVariable(st.hoverPaletteId),
          $type: "color",
          $description: `${st.name} hover state`,
          variable: `${st.id}-hover`
        },
        subtle: {
          $value: resolver.toAliasByVariable(st.subtlePaletteId),
          $type: "color",
          $description: `${st.name} subtle surface`,
          variable: `${st.id}-subtle`
        }
      };
    }
    const radiusEntries = Object.entries(palette.raw.radius || {});
    const resolveRadiusAlias = (radiusValue) => {
      const matched = radiusEntries.find(([, leaf]) => leaf.$value === radiusValue);
      return matched ? `{palette.radius.${matched[0]}}` : radiusValue;
    };
    let presets = {};
    if (themes && themes.length > 0) {
      for (const th of themes) {
        const tokens = {};
        for (const key of THEME_TOKEN_KEYS) {
          const boundVar = th.paletteBindings?.[key];
          const colorVal = th.colors?.[key];
          if (!boundVar && !colorVal) continue;
          const alias = boundVar ? resolver.toAliasByVariable(boundVar) : void 0;
          tokens[key] = {
            $value: alias || colorVal,
            ...boundVar ? { targetVariable: boundVar } : {}
          };
        }
        const primaryAlias = th.paletteBindings?.primary ? resolver.toAliasByVariable(th.paletteBindings.primary) : void 0;
        const brandResolved = primaryAlias ? resolver.resolveValue(primaryAlias) : void 0;
        const brandRef = primaryAlias && brandResolved?.toLowerCase() === th.brandColor?.toLowerCase() ? primaryAlias : th.brandColor;
        presets[th.id] = {
          id: th.id,
          name: th.name,
          description: th.description,
          mode: th.mode,
          category: th.category,
          brandColor: brandRef,
          borderRadius: resolveRadiusAlias(th.borderRadius),
          ...th.fontFamily ? { fontFamily: th.fontFamily } : {},
          ...th.isCustom ? { isCustom: true } : {},
          tokens
        };
      }
    } else if (baseTheme?.presets) {
      presets = { ...baseTheme.presets };
    }
    return {
      activeThemeId: activeThemeId || baseTheme?.activeThemeId || "ocean-blue",
      semantic,
      presets
    };
  }
};

// lib/tokens/TokenReferenceResolver.ts
var ALIAS_PATTERN = /^\{([^}]+)\}$/;
var SKIP_LEAF_KEYS = /* @__PURE__ */ new Set([
  "$value",
  "$type",
  "$description",
  "variable",
  "name",
  "family",
  "cdnUrl",
  "px",
  "fontSizeLabel",
  "weightLabel",
  "sample",
  "targetVariable"
]);
var TokenReferenceResolver = class {
  constructor(doc) {
    this.doc = doc;
    this.pathIndex = /* @__PURE__ */ new Map();
    this.variableIndex = /* @__PURE__ */ new Map();
    this.orderedEntries = [];
    if (doc.palette) {
      this.indexSubtree(doc.palette, "palette");
    }
    if (doc.theme?.semantic) {
      this.indexSubtree(doc.theme.semantic, "theme.semantic");
    }
  }
  indexSubtree(node, currentPath) {
    if (!node || typeof node !== "object" || Array.isArray(node)) return;
    const record = node;
    if (typeof record.$value === "string") {
      const leaf = record;
      this.pathIndex.set(currentPath, leaf);
      this.orderedEntries.push({ path: currentPath, node: leaf });
      if (typeof leaf.variable === "string" && leaf.variable.trim()) {
        this.variableIndex.set(leaf.variable.trim(), currentPath);
      }
    }
    for (const [key, child] of Object.entries(record)) {
      if (SKIP_LEAF_KEYS.has(key) || key.startsWith("$")) continue;
      if (child && typeof child === "object") {
        const nextPath = currentPath ? `${currentPath}.${key}` : key;
        this.indexSubtree(child, nextPath);
      }
    }
  }
  isAlias(value) {
    return typeof value === "string" && ALIAS_PATTERN.test(value.trim());
  }
  stripAlias(aliasOrPath) {
    const trimmed = aliasOrPath.trim();
    const match = trimmed.match(ALIAS_PATTERN);
    return match ? match[1].trim() : trimmed;
  }
  getNode(dotPathOrCssVar) {
    const key = this.stripAlias(dotPathOrCssVar);
    if (this.pathIndex.has(key)) {
      return this.pathIndex.get(key);
    }
    const mappedPath = this.variableIndex.get(key);
    return mappedPath ? this.pathIndex.get(mappedPath) : void 0;
  }
  getPathByVariable(cssVar) {
    return this.variableIndex.get(cssVar.trim());
  }
  getVariableByPath(dotPathOrAlias) {
    const clean = this.stripAlias(dotPathOrAlias);
    if (clean.startsWith("--")) return clean;
    return this.pathIndex.get(clean)?.variable;
  }
  toAliasByVariable(cssVarOrAlias) {
    const trimmed = cssVarOrAlias.trim();
    if (!trimmed) return trimmed;
    if (this.isAlias(trimmed)) {
      const inner = this.stripAlias(trimmed);
      if (inner.startsWith("--")) {
        const mapped = this.variableIndex.get(inner);
        return mapped ? `{${mapped}}` : trimmed;
      }
      return `{${inner}}`;
    }
    const foundPath = this.variableIndex.get(trimmed);
    return foundPath ? `{${foundPath}}` : trimmed;
  }
  getAllEntries() {
    return this.orderedEntries;
  }
  resolveChain(refOrPath, maxDepth = 10) {
    const chain = [];
    const visited = /* @__PURE__ */ new Set();
    let current = refOrPath.trim();
    for (let depth = 0; depth < maxDepth; depth++) {
      if (!current) break;
      const lookupKey = this.isAlias(current) ? this.stripAlias(current) : current;
      const node = this.getNode(lookupKey);
      if (!node) break;
      const canonicalPath = this.variableIndex.get(lookupKey) || lookupKey;
      if (visited.has(canonicalPath)) break;
      visited.add(canonicalPath);
      chain.push({
        path: canonicalPath,
        alias: `{${canonicalPath}}`,
        variable: node.variable,
        value: node.$value
      });
      if (!this.isAlias(node.$value)) {
        break;
      }
      current = node.$value;
    }
    return chain;
  }
  resolveValue(refOrValue, maxDepth = 10) {
    const trimmed = (refOrValue || "").trim();
    if (!trimmed) return "";
    const visited = /* @__PURE__ */ new Set();
    let current = trimmed;
    for (let depth = 0; depth < maxDepth; depth++) {
      const isDirectPath = !this.isAlias(current) && this.pathIndex.has(current);
      if (!this.isAlias(current) && !current.startsWith("--") && !isDirectPath) {
        return current;
      }
      const key = this.stripAlias(current);
      const canonical = this.variableIndex.get(key) || key;
      if (visited.has(canonical)) {
        return current;
      }
      visited.add(canonical);
      const node = this.getNode(canonical);
      if (!node) {
        return current;
      }
      current = node.$value;
    }
    return current;
  }
  /**
   * Resolves an alias or CSS variable to a browser-usable `var(--...)` expression
   * when the referenced token declares a CSS variable, falling back to raw concrete value.
   */
  resolveCssReference(refOrValue) {
    const trimmed = (refOrValue || "").trim();
    if (!trimmed) return "";
    if (this.isAlias(trimmed)) {
      const targetNode = this.getNode(trimmed);
      if (targetNode?.variable) {
        return `var(${targetNode.variable})`;
      }
      const resolved = this.resolveValue(trimmed);
      if (resolved.startsWith("--")) return `var(${resolved})`;
      return resolved;
    }
    if (trimmed.startsWith("--")) {
      return `var(${trimmed})`;
    }
    return trimmed;
  }
  /**
   * Audits all `{...}` references across Palette scale, Theme, and Component layers.
   */
  findUnresolvedAliases() {
    const issues = [];
    const check = (location, candidate) => {
      if (typeof candidate === "string" && this.isAlias(candidate)) {
        if (!this.getNode(candidate)) {
          issues.push({ location, alias: candidate });
        }
      }
    };
    if (this.doc.palette?.typography?.scale) {
      for (const [k, scaleNode] of Object.entries(this.doc.palette.typography.scale)) {
        check(`palette.typography.scale.${k}.$value.fontSize`, scaleNode.$value?.fontSize);
        check(`palette.typography.scale.${k}.$value.fontWeight`, scaleNode.$value?.fontWeight);
      }
    }
    if (this.doc.theme?.semantic) {
      for (const [key, entry] of Object.entries(this.doc.theme.semantic)) {
        if (!entry || typeof entry !== "object") continue;
        if ("$value" in entry) {
          const g = entry;
          check(`theme.semantic.${key}.$value`, g.$value);
          if (g.hover) check(`theme.semantic.${key}.hover.$value`, g.hover.$value);
          if (g.subtle) check(`theme.semantic.${key}.subtle.$value`, g.subtle.$value);
        } else {
          for (const [subKey, leaf] of Object.entries(entry)) {
            check(`theme.semantic.${key}.${subKey}.$value`, leaf?.$value);
          }
        }
      }
    }
    if (this.doc.theme?.presets) {
      for (const [presetId, preset] of Object.entries(this.doc.theme.presets)) {
        check(`theme.presets.${presetId}.brandColor`, preset.brandColor);
        check(`theme.presets.${presetId}.borderRadius`, preset.borderRadius);
        check(`theme.presets.${presetId}.fontFamily`, preset.fontFamily);
        for (const [tKey, leaf] of Object.entries(preset.tokens || {})) {
          check(`theme.presets.${presetId}.tokens.${tKey}.$value`, leaf?.$value);
        }
      }
    }
    if (this.doc.components) {
      for (const [compId, comp] of Object.entries(this.doc.components)) {
        for (const [varId, v] of Object.entries(comp.variables || {})) {
          for (const [propKey, binding] of Object.entries(v.tokens || {})) {
            check(`components.${compId}.variables.${varId}.tokens.${propKey}.$value`, binding?.$value);
          }
        }
      }
    }
    return issues;
  }
};

// lib/tokens/AtomTokenSystem.ts
function isUnifiedTokensDocument(val) {
  if (!val || typeof val !== "object") return false;
  const candidate = val;
  return Boolean(
    candidate.palette && typeof candidate.palette === "object" && "color" in candidate.palette && "spacing" in candidate.palette && "radius" in candidate.palette && candidate.theme && typeof candidate.theme === "object" && "semantic" in candidate.theme && "presets" in candidate.theme && candidate.components && typeof candidate.components === "object"
  );
}
var AtomTokenSystem = class _AtomTokenSystem {
  constructor(document) {
    this.document = document;
    this.resolver = new TokenReferenceResolver(document);
    this.palette = new PaletteTokenLayer(document.palette, this.resolver);
    this.theme = new ThemeTokenLayer(document.theme, this.palette, this.resolver);
    this.components = new ComponentTokenLayer(
      document.components,
      this.palette,
      this.theme,
      this.resolver
    );
  }
  static fromDocument(doc) {
    return new _AtomTokenSystem(doc);
  }
  static fromStudioRegistry(registry, options) {
    const paletteTree = PaletteTokenLayer.fromPaletteVariables(
      registry.paletteVariables || [],
      options?.baseDocument?.palette
    );
    const paletteResolver = new TokenReferenceResolver({ palette: paletteTree });
    const tempPaletteLayer = new PaletteTokenLayer(paletteTree, paletteResolver);
    const themeTree = ThemeTokenLayer.fromStudioState({
      activeThemeId: registry.activeThemeId || "ocean-blue",
      statusTokens: registry.statusTokens || [],
      palette: tempPaletteLayer,
      resolver: paletteResolver,
      themes: options?.themes || registry.themes,
      baseTheme: options?.baseDocument?.theme
    });
    const fullResolver = new TokenReferenceResolver({
      palette: paletteTree,
      theme: themeTree
    });
    const componentsTree = ComponentTokenLayer.fromStudioComponents(
      registry.components || [],
      fullResolver
    );
    const brand = registry.brand || options?.baseDocument?.brand;
    const unifiedDoc = {
      $schema: "https://design-tokens.github.io/community-group/format/",
      registrySchema: registry.$schema || options?.baseDocument?.registrySchema || "https://system.atomground.com/schemas/studio-registry.schema.json",
      name: options?.baseDocument?.name || "AtomDesignToken System",
      version: registry.version || options?.baseDocument?.version || "0.14.2",
      updatedAt: registry.updatedAt || (/* @__PURE__ */ new Date()).toISOString(),
      ...brand ? { brand } : {},
      palette: paletteTree,
      theme: themeTree,
      components: componentsTree
    };
    return new _AtomTokenSystem(unifiedDoc);
  }
  resolve(refOrPath) {
    return this.resolver.resolveValue(refOrPath);
  }
  resolveChain(refOrPath) {
    return this.resolver.resolveChain(refOrPath);
  }
  toDocument() {
    return this.document;
  }
  toJson(pretty = true) {
    return JSON.stringify(this.document, null, pretty ? 2 : 0);
  }
  toRegistry() {
    const statusTokens = this.theme.toStatusTokens();
    const paletteVariables = this.palette.toPaletteVariables(statusTokens);
    const components = this.components.toStudioComponents();
    const themes = this.theme.toStudioThemes();
    return {
      $schema: this.document.registrySchema || "https://system.atomground.com/schemas/studio-registry.schema.json",
      version: this.document.version || "0.14.2",
      updatedAt: this.document.updatedAt || (/* @__PURE__ */ new Date()).toISOString(),
      activeThemeId: this.theme.activeThemeId,
      statusTokens,
      paletteVariables,
      components,
      ...themes.length > 0 ? { themes } : {}
    };
  }
};

// tokens/tokens.json
var tokens_default = {
  $schema: "https://design-tokens.github.io/community-group/format/",
  registrySchema: "https://system.atomground.com/schemas/studio-registry.schema.json",
  name: "AtomDesignToken System",
  version: "0.14.2",
  updatedAt: "2026-11-26T07:10:12.437Z",
  palette: {
    color: {
      blue: {
        "50": {
          $value: "#eff6ff",
          $type: "color",
          $description: "\uB9E4\uC6B0 \uC5F0\uD55C \uBE14\uB8E8 \uD2F4\uD2B8 \uBC30\uACBD",
          name: "Blue 50",
          family: "blue",
          variable: "--atom-palette-blue-50"
        },
        "100": {
          $value: "#dbeafe",
          $type: "color",
          $description: "\uC5F0\uD55C \uBE14\uB8E8 \uC11C\uD53C\uC2A4 \uBC0F \uD0DC\uADF8 \uBC30\uACBD",
          name: "Blue 100",
          family: "blue",
          variable: "--atom-palette-blue-100"
        },
        "200": {
          $value: "#bfdbfe",
          $type: "color",
          $description: "\uC18C\uD504\uD2B8 \uBE14\uB8E8 \uBCF4\uB354 \uBC0F \uD638\uBC84 \uBC30\uACBD",
          name: "Blue 200",
          family: "blue",
          variable: "--atom-palette-blue-200"
        },
        "300": {
          $value: "#93c5fd",
          $type: "color",
          $description: "\uD65C\uC131 \uD14C\uB450\uB9AC \uBC0F \uD3EC\uCEE4\uC2A4 \uB9C1",
          name: "Blue 300",
          family: "blue",
          variable: "--atom-palette-blue-300"
        },
        "400": {
          $value: "#60a5fa",
          $type: "color",
          $description: "\uBC1D\uC740 \uBE14\uB8E8 \uC778\uB514\uCF00\uC774\uD130",
          name: "Blue 400",
          family: "blue",
          variable: "--atom-palette-blue-400"
        },
        "500": {
          $value: "#3182f6",
          $type: "color",
          $description: "\uD575\uC2EC \uBE0C\uB79C\uB4DC \uD504\uB77C\uC774\uBA38\uB9AC \uC561\uC158 \uCEEC\uB7EC",
          name: "Blue 500 (Brand Primary)",
          family: "blue",
          variable: "--atom-palette-blue-500"
        },
        "600": {
          $value: "#1b64da",
          $type: "color",
          $description: "\uBC84\uD2BC \uD638\uBC84 \uBC0F \uAC15\uC870 \uB525 \uCEEC\uB7EC",
          name: "Blue 600 (Primary Hover)",
          family: "blue",
          variable: "--atom-palette-blue-600"
        },
        "700": {
          $value: "#1d4ed8",
          $type: "color",
          $description: "\uC9C4\uD55C \uBE14\uB8E8 \uD074\uB9AD \uC561\uD2F0\uBE0C \uC0C1\uD0DC",
          name: "Blue 700",
          family: "blue",
          variable: "--atom-palette-blue-700"
        },
        "800": {
          $value: "#1e40af",
          $type: "color",
          $description: "\uB124\uC774\uBE44 \uD1A4 \uD14D\uC2A4\uD2B8 \uBC0F \uD5E4\uB354 \uBC30\uACBD",
          name: "Blue 800",
          family: "blue",
          variable: "--atom-palette-blue-800"
        },
        "900": {
          $value: "#1e3a8a",
          $type: "color",
          $description: "\uADF9\uC9C4\uD55C \uB2E4\uD06C \uB124\uC774\uBE44",
          name: "Blue 900",
          family: "blue",
          variable: "--atom-palette-blue-900"
        }
      },
      gray: {
        "50": {
          $value: "#f8fafc",
          $type: "color",
          $description: "\uBCF4\uC870 \uC11C\uD53C\uC2A4 \uBC0F \uBC30\uACBD",
          name: "Gray 50 (Surface Subtle)",
          family: "gray",
          variable: "--atom-palette-gray-50"
        },
        "100": {
          $value: "#f1f5f9",
          $type: "color",
          $description: "\uBE44\uD65C\uC131 \uCE74\uB4DC \uBC30\uACBD \uBC0F \uC605\uC740 \uAD6C\uBD84\uC120",
          name: "Gray 100 (Surface Muted)",
          family: "gray",
          variable: "--atom-palette-gray-100"
        },
        "200": {
          $value: "#e2e8f0",
          $type: "color",
          $description: "\uAE30\uBCF8 \uC605\uC740 \uACBD\uACC4\uC120",
          name: "Gray 200 (Border Subtle)",
          family: "gray",
          variable: "--atom-palette-gray-200"
        },
        "300": {
          $value: "#cbd5e1",
          $type: "color",
          $description: "\uAC15\uC870 \uACBD\uACC4\uC120 \uBC0F \uB514\uBC14\uC774\uB354",
          name: "Gray 300 (Border Strong)",
          family: "gray",
          variable: "--atom-palette-gray-300"
        },
        "400": {
          $value: "#94a3b8",
          $type: "color",
          $description: "\uD50C\uB808\uC774\uC2A4\uD640\uB354 \uBC0F \uBE44\uD65C\uC131 \uB77C\uBCA8",
          name: "Gray 400 (Placeholder)",
          family: "gray",
          variable: "--atom-palette-gray-400"
        },
        "500": {
          $value: "#64748b",
          $type: "color",
          $description: "\uBD80\uC5F0 \uC124\uBA85 \uBC0F \uCEA1\uC158 \uD14D\uC2A4\uD2B8",
          name: "Gray 500 (Text Muted)",
          family: "gray",
          variable: "--atom-palette-gray-500"
        },
        "600": {
          $value: "#475569",
          $type: "color",
          $description: "\uC11C\uBE0C \uB808\uC774\uBE14 \uD14D\uC2A4\uD2B8",
          name: "Gray 600",
          family: "gray",
          variable: "--atom-palette-gray-600"
        },
        "700": {
          $value: "#334155",
          $type: "color",
          $description: "\uBCF4\uC870 \uBCF8\uBB38 \uD14D\uC2A4\uD2B8",
          name: "Gray 700 (Text Secondary)",
          family: "gray",
          variable: "--atom-palette-gray-700"
        },
        "800": {
          $value: "#1e293b",
          $type: "color",
          $description: "\uAC15\uC870 \uD14D\uC2A4\uD2B8 \uBC0F \uB2E4\uD06C \uBAA8\uB4DC \uCE74\uB4DC",
          name: "Gray 800",
          family: "gray",
          variable: "--atom-palette-gray-800"
        },
        "900": {
          $value: "#0f172a",
          $type: "color",
          $description: "\uD5E4\uB4DC\uB77C\uC778 \uBC0F \uC8FC\uC694 \uBCF8\uBB38 \uD14D\uC2A4\uD2B8",
          name: "Gray 900 (Text Primary)",
          family: "gray",
          variable: "--atom-palette-gray-900"
        },
        "950": {
          $value: "#020617",
          $type: "color",
          $description: "\uCD5C\uACE0 \uB300\uBE44 \uB2E4\uD06C \uC11C\uD53C\uC2A4 \uBC0F \uB2E4\uD06C \uD14D\uC2A4\uD2B8",
          name: "Gray 950 (Ultra Dark)",
          family: "gray",
          variable: "--atom-palette-gray-950"
        }
      },
      emerald: {
        "50": {
          $value: "#ecfdf5",
          $type: "color",
          $description: "\uC131\uACF5 \uC18C\uD504\uD2B8 \uD2F4\uD2B8 \uBC30\uACBD",
          name: "Emerald 50",
          family: "emerald",
          variable: "--atom-palette-emerald-50"
        },
        "100": {
          $value: "#d1fae5",
          $type: "color",
          $description: "\uC644\uB8CC \uBC30\uC9C0 \uBC30\uACBD",
          name: "Emerald 100",
          family: "emerald",
          variable: "--atom-palette-emerald-100"
        },
        "200": {
          $value: "#a7f3d0",
          $type: "color",
          $description: "\uC131\uACF5 \uC18C\uD504\uD2B8 \uBCF4\uB354",
          name: "Emerald 200",
          family: "emerald",
          variable: "--atom-palette-emerald-200"
        },
        "300": {
          $value: "#6ee7b7",
          $type: "color",
          $description: "\uAE0D\uC815 \uC9C0\uD45C \uAC15\uC870 \uB77C\uC778",
          name: "Emerald 300",
          family: "emerald",
          variable: "--atom-palette-emerald-300"
        },
        "400": {
          $value: "#34d399",
          $type: "color",
          $description: "\uC131\uACF5 \uD65C\uC131 \uC778\uB514\uCF00\uC774\uD130",
          name: "Emerald 400",
          family: "emerald",
          variable: "--atom-palette-emerald-400"
        },
        "500": {
          $value: "#10b981",
          $type: "color",
          $description: "\uC131\uACF5 \uBC0F \uC644\uB8CC \uB300\uD45C \uC561\uC13C\uD2B8",
          name: "Emerald 500 (Success)",
          family: "emerald",
          variable: "--atom-palette-emerald-500"
        },
        "600": {
          $value: "#059669",
          $type: "color",
          $description: "\uC131\uACF5 \uBC84\uD2BC \uD638\uBC84 \uC0C9\uC0C1",
          name: "Emerald 600",
          family: "emerald",
          variable: "--atom-palette-emerald-600"
        },
        "700": {
          $value: "#047857",
          $type: "color",
          $description: "\uC131\uACF5 \uC0C1\uD0DC \uD14D\uC2A4\uD2B8",
          name: "Emerald 700",
          family: "emerald",
          variable: "--atom-palette-emerald-700"
        },
        "800": {
          $value: "#065f46",
          $type: "color",
          $description: "\uC9C4\uD55C \uC131\uACF5 \uD14D\uC2A4\uD2B8",
          name: "Emerald 800",
          family: "emerald",
          variable: "--atom-palette-emerald-800"
        },
        "900": {
          $value: "#064e3b",
          $type: "color",
          $description: "\uB525 \uC5D0\uBA54\uB784\uB4DC \uB2E4\uD06C",
          name: "Emerald 900",
          family: "emerald",
          variable: "--atom-palette-emerald-900"
        }
      },
      rose: {
        "50": {
          $value: "#fff1f2",
          $type: "color",
          $description: "\uC5D0\uB7EC/\uC0AD\uC81C \uC18C\uD504\uD2B8 \uBC30\uACBD",
          name: "Rose 50",
          family: "rose",
          variable: "--atom-palette-rose-50"
        },
        "100": {
          $value: "#ffe4e6",
          $type: "color",
          $description: "\uC2E4\uD328 \uBC30\uC9C0 \uBC30\uACBD",
          name: "Rose 100",
          family: "rose",
          variable: "--atom-palette-rose-100"
        },
        "200": {
          $value: "#fecdd3",
          $type: "color",
          $description: "\uC5D0\uB7EC \uC18C\uD504\uD2B8 \uD14C\uB450\uB9AC",
          name: "Rose 200",
          family: "rose",
          variable: "--atom-palette-rose-200"
        },
        "300": {
          $value: "#fda4af",
          $type: "color",
          $description: "\uACBD\uACE0 \uAC15\uC870 \uB77C\uC778",
          name: "Rose 300",
          family: "rose",
          variable: "--atom-palette-rose-300"
        },
        "400": {
          $value: "#fb7185",
          $type: "color",
          $description: "\uACBD\uACE0 \uD65C\uC131 \uC778\uB514\uCF00\uC774\uD130",
          name: "Rose 400",
          family: "rose",
          variable: "--atom-palette-rose-400"
        },
        "500": {
          $value: "#ef4444",
          $type: "color",
          $description: "\uACBD\uACE0, \uC0AD\uC81C, \uC5D0\uB7EC \uB300\uD45C \uC561\uC13C\uD2B8",
          name: "Rose 500 (Destructive)",
          family: "rose",
          variable: "--atom-palette-rose-500"
        },
        "600": {
          $value: "#e11d48",
          $type: "color",
          $description: "\uC0AD\uC81C \uBC84\uD2BC \uD638\uBC84 \uC0C9\uC0C1",
          name: "Rose 600",
          family: "rose",
          variable: "--atom-palette-rose-600"
        },
        "700": {
          $value: "#be123c",
          $type: "color",
          $description: "\uC5D0\uB7EC \uC0C1\uD0DC \uD14D\uC2A4\uD2B8",
          name: "Rose 700",
          family: "rose",
          variable: "--atom-palette-rose-700"
        },
        "800": {
          $value: "#9f1239",
          $type: "color",
          $description: "\uC9C4\uD55C \uC704\uD5D8 \uACBD\uACE0 \uD14D\uC2A4\uD2B8",
          name: "Rose 800",
          family: "rose",
          variable: "--atom-palette-rose-800"
        },
        "900": {
          $value: "#881337",
          $type: "color",
          $description: "\uB525 \uB85C\uC988 \uB2E4\uD06C",
          name: "Rose 900",
          family: "rose",
          variable: "--atom-palette-rose-900"
        }
      },
      amber: {
        "50": {
          $value: "#fffbeb",
          $type: "color",
          $description: "\uC8FC\uC758/\uC548\uB0B4 \uC18C\uD504\uD2B8 \uBC30\uACBD",
          name: "Amber 50",
          family: "amber",
          variable: "--atom-palette-amber-50"
        },
        "100": {
          $value: "#fef3c7",
          $type: "color",
          $description: "\uB300\uAE30 \uC911 \uBC30\uC9C0 \uBC30\uACBD",
          name: "Amber 100",
          family: "amber",
          variable: "--atom-palette-amber-100"
        },
        "200": {
          $value: "#fde68a",
          $type: "color",
          $description: "\uC8FC\uC758 \uD14C\uB450\uB9AC",
          name: "Amber 200",
          family: "amber",
          variable: "--atom-palette-amber-200"
        },
        "300": {
          $value: "#fcd34d",
          $type: "color",
          $description: "\uC8FC\uC758 \uAC15\uC870 \uB77C\uC778",
          name: "Amber 300",
          family: "amber",
          variable: "--atom-palette-amber-300"
        },
        "400": {
          $value: "#fbbf24",
          $type: "color",
          $description: "\uBCC4\uC810/\uD3C9\uC810 \uACE8\uB4DC \uD1A4",
          name: "Amber 400",
          family: "amber",
          variable: "--atom-palette-amber-400"
        },
        "500": {
          $value: "#f59e0b",
          $type: "color",
          $description: "\uC8FC\uC758 \uBC0F \uBCF4\uB958 \uC0C1\uD0DC \uC561\uC13C\uD2B8",
          name: "Amber 500 (Warning)",
          family: "amber",
          variable: "--atom-palette-amber-500"
        },
        "600": {
          $value: "#d97706",
          $type: "color",
          $description: "\uC8FC\uC758 \uBC84\uD2BC \uD638\uBC84 \uC0C9\uC0C1",
          name: "Amber 600",
          family: "amber",
          variable: "--atom-palette-amber-600"
        },
        "700": {
          $value: "#b45309",
          $type: "color",
          $description: "\uC8FC\uC758 \uC548\uB0B4 \uD14D\uC2A4\uD2B8",
          name: "Amber 700",
          family: "amber",
          variable: "--atom-palette-amber-700"
        },
        "800": {
          $value: "#92400e",
          $type: "color",
          $description: "\uC9C4\uD55C \uC8FC\uC758 \uD14D\uC2A4\uD2B8",
          name: "Amber 800",
          family: "amber",
          variable: "--atom-palette-amber-800"
        },
        "900": {
          $value: "#78350f",
          $type: "color",
          $description: "\uB525 \uC570\uBC84 \uB2E4\uD06C",
          name: "Amber 900",
          family: "amber",
          variable: "--atom-palette-amber-900"
        }
      },
      purple: {
        "50": {
          $value: "#faf5ff",
          $type: "color",
          $description: "AI \uD504\uB86C\uD504\uD2B8 \uC18C\uD504\uD2B8 \uBC30\uACBD",
          name: "Purple 50",
          family: "purple",
          variable: "--atom-palette-purple-50"
        },
        "100": {
          $value: "#f3e8ff",
          $type: "color",
          $description: "\uD504\uB9AC\uBBF8\uC5C4 \uBC30\uC9C0 \uBC30\uACBD",
          name: "Purple 100",
          family: "purple",
          variable: "--atom-palette-purple-100"
        },
        "200": {
          $value: "#e9d5ff",
          $type: "color",
          $description: "\uBCF4\uB77C\uC0C9 \uC18C\uD504\uD2B8 \uBCF4\uB354",
          name: "Purple 200",
          family: "purple",
          variable: "--atom-palette-purple-200"
        },
        "300": {
          $value: "#d8b4fe",
          $type: "color",
          $description: "\uBC14\uC774\uC62C\uB81B \uD3EC\uCEE4\uC2A4 \uB9C1",
          name: "Purple 300",
          family: "purple",
          variable: "--atom-palette-purple-300"
        },
        "400": {
          $value: "#c084fc",
          $type: "color",
          $description: "\uBC1D\uC740 AI \uC774\uD399\uD2B8 \uB77C\uC778",
          name: "Purple 400",
          family: "purple",
          variable: "--atom-palette-purple-400"
        },
        "500": {
          $value: "#8b5cf6",
          $type: "color",
          $description: "AI \uBC0F \uD504\uB9AC\uBBF8\uC5C4 \uB300\uD45C \uC561\uC13C\uD2B8",
          name: "Purple 500 (AI Accent)",
          family: "purple",
          variable: "--atom-palette-purple-500"
        },
        "600": {
          $value: "#9333ea",
          $type: "color",
          $description: "\uBC14\uC774\uC62C\uB81B \uBC84\uD2BC \uD638\uBC84",
          name: "Purple 600",
          family: "purple",
          variable: "--atom-palette-purple-600"
        },
        "700": {
          $value: "#7e22ce",
          $type: "color",
          $description: "\uBCF4\uB77C\uC0C9 \uD14D\uC2A4\uD2B8",
          name: "Purple 700",
          family: "purple",
          variable: "--atom-palette-purple-700"
        },
        "800": {
          $value: "#6b21a8",
          $type: "color",
          $description: "\uC9C4\uD55C \uBC14\uC774\uC62C\uB81B \uD14D\uC2A4\uD2B8",
          name: "Purple 800",
          family: "purple",
          variable: "--atom-palette-purple-800"
        },
        "900": {
          $value: "#581c87",
          $type: "color",
          $description: "\uB525 \uBC14\uC774\uC62C\uB81B \uB2E4\uD06C",
          name: "Purple 900",
          family: "purple",
          variable: "--atom-palette-purple-900"
        }
      },
      neutral: {
        white: {
          $value: "#ffffff",
          $type: "color",
          $description: "\uAE30\uBCF8 \uCE94\uBC84\uC2A4 \uBC0F \uD14D\uC2A4\uD2B8 \uBC18\uC804\uC0C9",
          name: "Pure White",
          family: "neutral",
          variable: "--atom-palette-white"
        },
        black: {
          $value: "#000000",
          $type: "color",
          $description: "\uC21C\uC218 \uBE14\uB799 \uBC0F \uC808\uB300 \uC554\uBD80",
          name: "Pure Black",
          family: "neutral",
          variable: "--atom-palette-black"
        }
      }
    },
    spacing: {
      "1": {
        $value: "4px",
        $type: "dimension",
        $description: "\uCD08\uBBF8\uC138 \uC5EC\uBC31 \uBC0F \uC544\uC774\uCF58 \uAC2D",
        name: "Space 1 (4px)",
        variable: "--atom-space-1",
        px: 4
      },
      "2": {
        $value: "8px",
        $type: "dimension",
        $description: "\uBC84\uD2BC \uB0B4\uBD80 \uD328\uB529 \uBC0F \uBBF8\uC138 \uAC04\uACA9",
        name: "Space 2 (8px)",
        variable: "--atom-space-2",
        px: 8
      },
      "3": {
        $value: "12px",
        $type: "dimension",
        $description: "\uC778\uD48B \uBC0F \uCE74\uB4DC \uB0B4\uBD80 \uAE30\uBCF8 \uAC2D",
        name: "Space 3 (12px)",
        variable: "--atom-space-3",
        px: 12
      },
      "4": {
        $value: "16px",
        $type: "dimension",
        $description: "\uD45C\uC900 \uCEF4\uD3EC\uB10C\uD2B8 \uB0B4\uBD80 \uD328\uB529",
        name: "Space 4 (16px)",
        variable: "--atom-space-4",
        px: 16
      },
      "5": {
        $value: "20px",
        $type: "dimension",
        $description: "\uC911\uAC04 \uD06C\uAE30 \uCE74\uB4DC \uD328\uB529",
        name: "Space 5 (20px)",
        variable: "--atom-space-5",
        px: 20
      },
      "6": {
        $value: "24px",
        $type: "dimension",
        $description: "\uB300\uD615 \uCE74\uB4DC \uBC0F \uC139\uC158 \uAC04\uACA9",
        name: "Space 6 (24px)",
        variable: "--atom-space-6",
        px: 24
      },
      "8": {
        $value: "32px",
        $type: "dimension",
        $description: "\uC139\uC158 \uB514\uBC14\uC774\uB354 \uBC0F \uBE14\uB85D \uAC04\uACA9",
        name: "Space 8 (32px)",
        variable: "--atom-space-8",
        px: 32
      },
      "10": {
        $value: "40px",
        $type: "dimension",
        $description: "\uB300\uD615 \uCEE8\uD14C\uC774\uB108 \uD328\uB529",
        name: "Space 10 (40px)",
        variable: "--atom-space-10",
        px: 40
      },
      "12": {
        $value: "48px",
        $type: "dimension",
        $description: "\uD398\uC774\uC9C0 \uC0C1\uD558 \uD5E4\uB354 \uC5EC\uBC31",
        name: "Space 12 (48px)",
        variable: "--atom-space-12",
        px: 48
      },
      "16": {
        $value: "64px",
        $type: "dimension",
        $description: "\uD788\uC5B4\uB85C \uC139\uC158 \uBC0F \uBDF0\uD3EC\uD2B8 \uC5EC\uBC31",
        name: "Space 16 (64px)",
        variable: "--atom-space-16",
        px: 64
      },
      "1-5": {
        $value: "6px",
        $type: "dimension",
        $description: "\uCF64\uD329\uD2B8 \uBC30\uC9C0 \uBC0F \uBC84\uD2BC \uC778\uB77C\uC778 \uAC2D",
        name: "Space 1.5 (6px)",
        variable: "--atom-space-1-5",
        px: 6
      },
      "2-5": {
        $value: "10px",
        $type: "dimension",
        $description: "\uC2AC\uB9BC \uCEF4\uD3EC\uB10C\uD2B8 \uC5EC\uBC31",
        name: "Space 2.5 (10px)",
        variable: "--atom-space-2-5",
        px: 10
      },
      "3-5": {
        $value: "14px",
        $type: "dimension",
        $description: "\uBAA8\uB2EC \uD5E4\uB354 \uBC0F \uC544\uC774\uD15C \uAC04\uACA9",
        name: "Space 3.5 (14px)",
        variable: "--atom-space-3-5",
        px: 14
      }
    },
    radius: {
      none: {
        $value: "0px",
        $type: "dimension",
        $description: "\uAC01\uC9C4 \uC9C1\uC0AC\uAC01",
        name: "Radius None (0px)",
        variable: "--atom-radius-none"
      },
      xs: {
        $value: "2px",
        $type: "dimension",
        $description: "\uBBF8\uC138 \uB77C\uC6B4\uB529",
        name: "Radius XS (2px)",
        variable: "--atom-radius-xs"
      },
      sm: {
        $value: "4px",
        $type: "dimension",
        $description: "\uCF64\uD329\uD2B8 \uD0DC\uADF8 \uBC0F \uBC30\uC9C0 \uACE1\uB960",
        name: "Radius Small (4px)",
        variable: "--atom-radius-sm"
      },
      md: {
        $value: "8px",
        $type: "dimension",
        $description: "\uD45C\uC900 \uBC84\uD2BC \uBC0F \uC778\uD48B \uACE1\uB960",
        name: "Radius Medium (8px)",
        variable: "--atom-radius-md"
      },
      lg: {
        $value: "12px",
        $type: "dimension",
        $description: "\uCE74\uB4DC \uBC0F \uB2E4\uC774\uC5BC\uB85C\uADF8 \uBAA8\uB2EC \uACE1\uB960",
        name: "Radius Large (12px)",
        variable: "--atom-radius-lg"
      },
      xl: {
        $value: "16px",
        $type: "dimension",
        $description: "\uBCFC\uB4DC \uB77C\uC6B4\uB529 \uD328\uB110",
        name: "Radius XL (16px)",
        variable: "--atom-radius-xl"
      },
      "2xl": {
        $value: "24px",
        $type: "dimension",
        $description: "\uBAA8\uBC14\uC77C \uBC14\uD140 \uC2DC\uD2B8 \uACE1\uB960",
        name: "Radius 2XL (24px)",
        variable: "--atom-radius-2xl"
      },
      full: {
        $value: "9999px",
        $type: "dimension",
        $description: "\uC644\uC804 \uB465\uADFC \uC54C\uC57D(Pill) \uACE1\uB960",
        name: "Radius Full (9999px)",
        variable: "--atom-radius-full"
      }
    },
    shadow: {
      sm: {
        $value: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        $type: "shadow",
        $description: "\uAE30\uBCF8 \uCE74\uB4DC, \uC778\uD48B \uD3EC\uCEE4\uC2A4 \uC0C1\uD0DC, \uBBF8\uC138\uD55C \uAD6C\uBD84",
        name: "Elevation 1 (Subtle)",
        variable: "--atom-shadow-sm"
      },
      md: {
        $value: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        $type: "shadow",
        $description: "\uD638\uBC84\uB41C \uCE74\uB4DC, \uB4DC\uB86D\uB2E4\uC6B4 \uBA54\uB274, \uD31D\uC624\uBC84 \uD234\uD301",
        name: "Elevation 2 (Medium)",
        variable: "--atom-shadow-md"
      },
      lg: {
        $value: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        $type: "shadow",
        $description: "\uD50C\uB85C\uD305 \uB0B4\uBE44\uAC8C\uC774\uC158 \uBC14, \uD1A0\uC2A4\uD2B8 \uC54C\uB9BC \uBA54\uC2DC\uC9C0",
        name: "Elevation 3 (Floating)",
        variable: "--atom-shadow-lg"
      },
      xl: {
        $value: "0 20px 25px -5px rgb(0 0 0 / 0.15)",
        $type: "shadow",
        $description: "\uD654\uBA74 \uCD5C\uC0C1\uB2E8 \uB808\uC774\uC5B4\uC758 \uBAA8\uB2EC \uB2E4\uC774\uC5BC\uB85C\uADF8, \uBC14\uD140\uC2DC\uD2B8",
        name: "Elevation 4 (Modal / Overlay)",
        variable: "--atom-shadow-xl"
      }
    },
    typography: {
      font: {
        sans: {
          $value: "'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
          $type: "fontFamily",
          $description: "\uC804\uC5ED \uAE30\uBCF8 \uC0B0\uC138\uB9AC\uD504 \uD3F0\uD2B8 (Spoqa Han Sans Neo CDN \uAE30\uBCF8 \uC801\uC6A9)",
          name: "Font Family Sans (\uAE30\uBCF8 \uBCF8\uBB38 \uD3F0\uD2B8)",
          family: "font-family",
          variable: "--atom-font-sans",
          cdnUrl: "https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
        },
        mono: {
          $value: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
          $type: "fontFamily",
          $description: "\uCF54\uB4DC \uBE14\uB85D, \uD1A0\uD070 \uC2DD\uBCC4\uC790, \uC218\uCE58 \uB370\uC774\uD130\uC6A9 \uBAA8\uB178\uC2A4\uD398\uC774\uC2A4 \uD3F0\uD2B8",
          name: "Font Family Mono (\uCF54\uB4DC/\uBAA8\uB178 \uD3F0\uD2B8)",
          family: "font-family",
          variable: "--atom-font-mono",
          cdnUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
        }
      },
      size: {
        xs: {
          $value: "12px",
          $type: "dimension",
          $description: "\uCEA1\uC158, \uD78C\uD2B8, \uBC30\uC9C0 \uB77C\uBCA8",
          name: "Font XS (12px / 16px)",
          variable: "--atom-typography-xs"
        },
        sm: {
          $value: "14px",
          $type: "dimension",
          $description: "\uC11C\uBE0C \uB808\uC774\uBE14, \uD3FC \uD5EC\uD37C \uD14D\uC2A4\uD2B8",
          name: "Font SM (14px / 20px)",
          variable: "--atom-typography-sm"
        },
        base: {
          $value: "16px",
          $type: "dimension",
          $description: "\uAE30\uBCF8 \uBCF8\uBB38 \uD14D\uC2A4\uD2B8 \uADDC\uACA9",
          name: "Font Base (16px / 24px)",
          variable: "--atom-typography-base"
        },
        lg: {
          $value: "18px",
          $type: "dimension",
          $description: "\uC18C\uC81C\uBAA9 \uBC0F \uAC15\uC870 \uBB38\uAD6C",
          name: "Font LG (18px / 28px)",
          variable: "--atom-typography-lg"
        },
        xl: {
          $value: "20px",
          $type: "dimension",
          $description: "\uCE74\uB4DC \uD0C0\uC774\uD2C0 \uBC0F \uC139\uC158 \uD5E4\uB354",
          name: "Font XL (20px / 28px)",
          variable: "--atom-typography-xl"
        },
        "2xl": {
          $value: "24px",
          $type: "dimension",
          $description: "\uC911\uD615 \uD398\uC774\uC9C0 \uD0C0\uC774\uD2C0",
          name: "Font 2XL (24px / 32px)",
          variable: "--atom-typography-2xl"
        },
        "3xl": {
          $value: "30px",
          $type: "dimension",
          $description: "\uB300\uD615 \uBA54\uC778 \uD0C0\uC774\uD2C0",
          name: "Font 3XL (30px / 36px)",
          variable: "--atom-typography-3xl"
        },
        "4xl": {
          $value: "36px",
          $type: "dimension",
          $description: "\uD788\uC5B4\uB85C \uB514\uC2A4\uD50C\uB808\uC774 \uD0C0\uC774\uD2C0",
          name: "Font 4XL (36px / 40px)",
          variable: "--atom-typography-4xl"
        }
      },
      weight: {
        regular: {
          $value: "400",
          $type: "fontWeight",
          $description: "\uC77C\uBC18 \uBCF8\uBB38 \uAD75\uAE30",
          name: "Weight Regular (400)",
          variable: "--atom-font-weight-regular"
        },
        medium: {
          $value: "500",
          $type: "fontWeight",
          $description: "\uC138\uBBF8 \uAC15\uC870 \uBCF8\uBB38 \uAD75\uAE30",
          name: "Weight Medium (500)",
          variable: "--atom-font-weight-medium"
        },
        semibold: {
          $value: "600",
          $type: "fontWeight",
          $description: "\uBC84\uD2BC \uBC0F \uD14C\uC774\uBE14 \uD5E4\uB354 \uAD75\uAE30",
          name: "Weight Semibold (600)",
          variable: "--atom-font-weight-semibold"
        },
        bold: {
          $value: "700",
          $type: "fontWeight",
          $description: "\uD0C0\uC774\uD2C0 \uBC0F \uD575\uC2EC \uAC15\uC870 \uAD75\uAE30",
          name: "Weight Bold (700)",
          variable: "--atom-font-weight-bold"
        }
      },
      scale: {
        display: {
          $value: {
            fontSize: "{palette.typography.size.4xl}",
            lineHeight: "1.25",
            fontWeight: "800 (ExtraBold)"
          },
          $type: "typography",
          variable: "--atom-font-display",
          name: "Display / Hero Title",
          fontSizeLabel: "36px (2.25rem)",
          weightLabel: "800 (ExtraBold)",
          sample: "\uB514\uC790\uC774\uB108\uC758 \uD53C\uADF8\uB9C8 \uD574\uBC29, \uB9D0\uB85C \uB514\uC790\uC778\uD558\uB294 \uC2DC\uB300"
        },
        "title-1": {
          $value: {
            fontSize: "28px (1.75rem)",
            lineHeight: "1.3",
            fontWeight: "{palette.typography.weight.bold}"
          },
          $type: "typography",
          variable: "--atom-font-title-1",
          name: "Title 1 (Page Title)",
          fontSizeLabel: "28px (1.75rem)",
          weightLabel: "700 (Bold)",
          sample: "\uC6D0\uD074\uB9AD\uC73C\uB85C \uB05D\uB0B4\uB294 \uB514\uC790\uC778 \uD1A0\uD070 \uC2DC\uC2A4\uD15C"
        },
        "title-2": {
          $value: {
            fontSize: "{palette.typography.size.xl}",
            lineHeight: "1.35",
            fontWeight: "{palette.typography.weight.bold}"
          },
          $type: "typography",
          variable: "--atom-font-title-2",
          name: "Title 2 (Section Title)",
          fontSizeLabel: "20px (1.25rem)",
          weightLabel: "700 (Bold)",
          sample: "\uD504\uB808\uC784\uC6CC\uD06C \uBB34\uAD00\uD55C \uD45C\uC900 CSS \uBCC0\uC218 \uCCB4\uACC4"
        },
        "title-3": {
          $value: {
            fontSize: "{palette.typography.size.base}",
            lineHeight: "1.4",
            fontWeight: "{palette.typography.weight.semibold}"
          },
          $type: "typography",
          variable: "--atom-font-title-3",
          name: "Title 3 (Card Title)",
          fontSizeLabel: "16px (1.0rem)",
          weightLabel: "600 (SemiBold)",
          sample: "\uACC4\uC88C \uC1A1\uAE08 \uBC0F \uC2E4\uC2DC\uAC04 \uC778\uC99D \uD328\uD134"
        },
        "body-1": {
          $value: {
            fontSize: "{palette.typography.size.sm}",
            lineHeight: "1.5",
            fontWeight: "{palette.typography.weight.regular}"
          },
          $type: "typography",
          variable: "--atom-font-body-1",
          name: "Body 1 (Regular Body)",
          fontSizeLabel: "14px (0.875rem)",
          weightLabel: "400 (Regular)",
          sample: "React, Vue, \uBC14\uB2D0\uB77C HTML \uC5B4\uB514\uC11C\uB098 \uBCF5\uC0AC \uD55C \uBC88\uC73C\uB85C \uC989\uC2DC \uB80C\uB354\uB9C1\uB429\uB2C8\uB2E4."
        },
        "body-2": {
          $value: {
            fontSize: "{palette.typography.size.xs}",
            lineHeight: "1.5",
            fontWeight: "{palette.typography.weight.medium}"
          },
          $type: "typography",
          variable: "--atom-font-body-2",
          name: "Body 2 / Caption",
          fontSizeLabel: "12px (0.75rem)",
          weightLabel: "500 (Medium)",
          sample: "W3C DTCG \uD638\uD658 tokens.json \uAE30\uBC18 \uC2A4\uD0C0\uC77C \uB515\uC154\uB108\uB9AC \uCEF4\uD30C\uC77C"
        },
        mono: {
          $value: {
            fontSize: "11px (0.6875rem)",
            lineHeight: "1.6",
            fontWeight: "{palette.typography.weight.medium}"
          },
          $type: "typography",
          variable: "--atom-font-mono",
          name: "Mono Code",
          fontSizeLabel: "11px (0.6875rem)",
          weightLabel: "500 (Medium)",
          sample: "npx atomsystem init --preset ocean-blue"
        }
      }
    },
    layout: {
      container: {
        sm: {
          $value: "640px",
          $type: "dimension",
          $description: "\uC778\uC99D \uD3FC, \uACB0\uC81C \uBAA8\uB2EC, \uB2E8\uC77C \uCEEC\uB7FC \uCF58\uD150\uCE20",
          name: "Container Small (Narrow / Form)",
          variable: "--atom-container-sm"
        },
        md: {
          $value: "768px",
          $type: "dimension",
          $description: "\uBE14\uB85C\uADF8 \uC544\uD2F0\uD074, \uD504\uB85C\uD544 \uBDF0\uC5B4, \uC124\uC815 \uD3FC",
          name: "Container Medium (Article / Content)",
          variable: "--atom-container-md"
        },
        lg: {
          $value: "1024px",
          $type: "dimension",
          $description: "\uD45C\uC900 \uB7A9\uD0D1 \uBDF0, \uCE74\uD0C8\uB85C\uADF8 \uCE74\uB4DC \uADF8\uB9AC\uB4DC",
          name: "Container Large (Standard Catalog)",
          variable: "--atom-container-lg"
        },
        xl: {
          $value: "1280px",
          $type: "dimension",
          $description: "\uAE30\uBCF8 \uB370\uC2A4\uD06C\uD1B1 \uC640\uC774\uB4DC \uB808\uC774\uC544\uC6C3 \uBC0F \uB300\uC2DC\uBCF4\uB4DC \uD5C8\uBE0C",
          name: "Container Extra Large (Default Dashboard)",
          variable: "--atom-container-xl"
        },
        "2xl": {
          $value: "1536px",
          $type: "dimension",
          $description: "\uCD08\uAD11\uD3ED \uACE0\uBC00\uB3C4 \uB370\uC774\uD130 \uADF8\uB9AC\uB4DC, \uD540\uD14C\uD06C \uCC28\uD2B8 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4",
          name: "Container 2X Large (Ultra Wide Grid)",
          variable: "--atom-container-2xl"
        },
        full: {
          $value: "100%",
          $type: "dimension",
          $description: "\uC804\uCCB4 \uD654\uBA74 \uD50C\uB8E8\uC774\uB4DC \uC720\uC5F0 \uBDF0\uC5B4",
          name: "Container Full (Fluid Fluid 100%)",
          variable: "--atom-container-full"
        }
      },
      gutter: {
        base: {
          $value: "16px",
          $type: "dimension",
          $description: "\uD654\uBA74 \uC88C\uC6B0 \uAE30\uBCF8 \uC548\uC804 \uC5EC\uBC31 (Safe Padding)",
          name: "Layout Gutter (Mobile / Base)",
          variable: "--atom-layout-gutter"
        },
        lg: {
          $value: "24px",
          $type: "dimension",
          $description: "\uB370\uC2A4\uD06C\uD1B1 \uD654\uBA74 \uC88C\uC6B0 \uC548\uC804 \uC5EC\uBC31",
          name: "Layout Gutter Large (Desktop)",
          variable: "--atom-layout-gutter-lg"
        }
      },
      gap: {
        section: {
          $value: "32px",
          $type: "dimension",
          $description: "\uC139\uC158\uACFC \uC139\uC158 \uAC04\uC758 \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uAC04\uACA9",
          name: "Layout Section Gap",
          variable: "--atom-layout-gap"
        }
      }
    }
  },
  theme: {
    activeThemeId: "dark-cyber",
    semantic: {
      primary: {
        $value: "{palette.color.blue.500}",
        $type: "color",
        $description: "\uD575\uC2EC \uC561\uC158 \uBC84\uD2BC, \uB9C1\uD06C, \uD65C\uC131 \uD0ED \uC778\uB514\uCF00\uC774\uD130, \uD3EC\uCEE4\uC2A4 \uD558\uC774\uB77C\uC774\uD2B8",
        name: "Primary (\uC8FC\uC694 \uBE0C\uB79C\uB4DC \uC561\uC158)",
        variable: "--atom-color-primary",
        hover: {
          $value: "{palette.color.blue.600}",
          $type: "color",
          $description: "Primary (\uC8FC\uC694 \uBE0C\uB79C\uB4DC \uC561\uC158) hover state",
          variable: "--atom-color-primary-hover"
        },
        subtle: {
          $value: "{palette.color.blue.50}",
          $type: "color",
          $description: "Primary (\uC8FC\uC694 \uBE0C\uB79C\uB4DC \uC561\uC158) subtle surface",
          variable: "--atom-color-primary-subtle"
        }
      },
      secondary: {
        $value: "{palette.color.gray.200}",
        $type: "color",
        $description: "\uCDE8\uC18C, \uB2EB\uAE30 \uBC84\uD2BC, \uBCF4\uC870 \uBC30\uC9C0, \uC911\uB9BD \uC778\uD130\uB799\uC158 \uC601\uC5ED",
        name: "Secondary (\uBCF4\uC870 \uC561\uC158 \uBC0F \uC11C\uD53C\uC2A4)",
        variable: "--atom-color-secondary",
        hover: {
          $value: "{palette.color.gray.300}",
          $type: "color",
          $description: "Secondary (\uBCF4\uC870 \uC561\uC158 \uBC0F \uC11C\uD53C\uC2A4) hover state",
          variable: "--atom-color-secondary-hover"
        },
        subtle: {
          $value: "{palette.color.gray.50}",
          $type: "color",
          $description: "Secondary (\uBCF4\uC870 \uC561\uC158 \uBC0F \uC11C\uD53C\uC2A4) subtle surface",
          variable: "--atom-color-secondary-subtle"
        }
      },
      success: {
        $value: "{palette.color.emerald.500}",
        $type: "color",
        $description: "\uACB0\uC81C/\uC2B9\uC778 \uC644\uB8CC \uBC84\uD2BC, \uC0C1\uD0DC \uC131\uACF5 \uBC30\uC9C0, \uC815\uC0C1 \uAC00\uB3D9 \uC0C1\uD0DC",
        name: "Success (\uC131\uACF5 \uBC0F \uAE0D\uC815 \uC9C0\uD45C)",
        variable: "--atom-color-success",
        hover: {
          $value: "{palette.color.emerald.600}",
          $type: "color",
          $description: "Success (\uC131\uACF5 \uBC0F \uAE0D\uC815 \uC9C0\uD45C) hover state",
          variable: "--atom-color-success-hover"
        },
        subtle: {
          $value: "{palette.color.emerald.50}",
          $type: "color",
          $description: "Success (\uC131\uACF5 \uBC0F \uAE0D\uC815 \uC9C0\uD45C) subtle surface",
          variable: "--atom-color-success-subtle"
        }
      },
      danger: {
        $value: "{palette.color.rose.500}",
        $type: "color",
        $description: "\uC601\uAD6C \uC0AD\uC81C/\uCDE8\uC18C \uBC84\uD2BC, \uD3FC \uC720\uD6A8\uC131 \uC5D0\uB7EC \uBCF4\uB354, \uCE58\uBA85\uC801 \uACBD\uACE0 \uBC30\uC9C0",
        name: "Danger / Destructive (\uC704\uD5D8 \uBC0F \uC5D0\uB7EC)",
        variable: "--atom-color-danger",
        hover: {
          $value: "{palette.color.rose.600}",
          $type: "color",
          $description: "Danger / Destructive (\uC704\uD5D8 \uBC0F \uC5D0\uB7EC) hover state",
          variable: "--atom-color-danger-hover"
        },
        subtle: {
          $value: "{palette.color.rose.50}",
          $type: "color",
          $description: "Danger / Destructive (\uC704\uD5D8 \uBC0F \uC5D0\uB7EC) subtle surface",
          variable: "--atom-color-danger-subtle"
        }
      },
      warning: {
        $value: "{palette.color.amber.500}",
        $type: "color",
        $description: "\uC8FC\uC758 \uD658\uAE30 \uBC84\uD2BC, \uAC80\uD1A0 \uB300\uAE30 \uBC30\uC9C0, \uB9CC\uB8CC \uC784\uBC15 \uC54C\uB9BC",
        name: "Warning (\uC8FC\uC758 \uBC0F \uB300\uAE30)",
        variable: "--atom-color-warning",
        hover: {
          $value: "{palette.color.amber.600}",
          $type: "color",
          $description: "Warning (\uC8FC\uC758 \uBC0F \uB300\uAE30) hover state",
          variable: "--atom-color-warning-hover"
        },
        subtle: {
          $value: "{palette.color.amber.50}",
          $type: "color",
          $description: "Warning (\uC8FC\uC758 \uBC0F \uB300\uAE30) subtle surface",
          variable: "--atom-color-warning-subtle"
        }
      },
      surface: {
        primary: {
          $value: "{palette.color.neutral.white}",
          $type: "color",
          $description: "\uC6F9 \uC804\uCCB4 \uD398\uC774\uC9C0\uC758 \uAE30\uBCF8 \uCE94\uBC84\uC2A4 \uBC30\uACBD (\uB2E4\uD06C\uBAA8\uB4DC: #090a0f)",
          name: "Background Primary",
          variable: "--atom-bg-primary"
        },
        card: {
          $value: "{palette.color.gray.50}",
          $type: "color",
          $description: "\uCE74\uB4DC, \uBAA8\uB2EC \uB2E4\uC774\uC5BC\uB85C\uADF8, \uD328\uB110, \uB4DC\uB86D\uB2E4\uC6B4 \uBA54\uB274\uC758 \uBC14\uD0D5\uC0C9",
          name: "Background Surface / Card",
          variable: "--atom-bg-surface"
        },
        muted: {
          $value: "{palette.color.gray.100}",
          $type: "color",
          $description: "\uBE44\uD65C\uC131\uD654\uB41C \uD3FC \uD544\uB4DC, \uD0DC\uADF8 \uCE69, \uBCF4\uC870 \uC601\uC5ED \uBC30\uACBD",
          name: "Background Muted",
          variable: "--atom-bg-muted"
        }
      },
      text: {
        primary: {
          $value: "{palette.color.gray.900}",
          $type: "color",
          $description: "\uAC00\uC7A5 \uB192\uC740 \uBA85\uB3C4 \uB300\uBE44\uB97C \uAC16\uB294 \uD575\uC2EC \uBCF8\uBB38 \uBC0F \uD5E4\uB4DC\uB77C\uC778 \uD14D\uC2A4\uD2B8",
          name: "Text Primary",
          variable: "--atom-text-primary"
        },
        secondary: {
          $value: "{palette.color.gray.700}",
          $type: "color",
          $description: "\uC124\uBA85\uBB38, \uBD80\uAC00 \uB77C\uBCA8, \uD50C\uB808\uC774\uC2A4\uD640\uB354, \uC11C\uBE0C \uD14D\uC2A4\uD2B8",
          name: "Text Secondary",
          variable: "--atom-text-secondary"
        },
        muted: {
          $value: "{palette.color.gray.500}",
          $type: "color",
          $description: "\uD0C0\uC784\uC2A4\uD0EC\uD504, \uBE44\uD65C\uC131\uD654\uB41C \uB77C\uBCA8, \uC7A5\uC2DD\uC131 \uD78C\uD2B8 \uD14D\uC2A4\uD2B8",
          name: "Text Muted",
          variable: "--atom-text-muted"
        }
      },
      border: {
        subtle: {
          $value: "{palette.color.gray.200}",
          $type: "color",
          $description: "\uCE74\uB4DC \uAD6C\uBD84\uC120, \uB9AC\uC2A4\uD2B8 \uACBD\uACC4\uC120 \uB4F1 \uBD80\uB4DC\uB7EC\uC6B4 \uBD84\uB9AC\uC120",
          name: "Border Subtle",
          variable: "--atom-border-subtle"
        },
        strong: {
          $value: "{palette.color.gray.300}",
          $type: "color",
          $description: "\uC778\uD48B \uD544\uB4DC \uC678\uACFD\uC120, \uBA85\uD655\uD55C \uC544\uC6C3\uB77C\uC778 \uBC84\uD2BC, \uBAA8\uB2EC \uACBD\uACC4\uC120",
          name: "Border Strong",
          variable: "--atom-border-strong"
        }
      }
    },
    presets: {
      "ocean-blue": {
        id: "ocean-blue",
        name: "\uC624\uC158 \uBE14\uB8E8 (Ocean Blue)",
        description: "\uC2E0\uB8B0\uAC10\uC744 \uC8FC\uB294 \uBAA8\uB358 \uC2DC\uADF8\uB2C8\uCC98 \uBE14\uB8E8\uC640 \uC815\uAC08\uD55C \uBC31\uC0C9 \uC11C\uD53C\uC2A4, 8px \uC18C\uD504\uD2B8 \uB77C\uC6B4\uB529",
        mode: "light",
        category: "fintech",
        brandColor: "{palette.color.blue.500}",
        borderRadius: "{palette.radius.md}",
        tokens: {
          primary: {
            $value: "{palette.color.blue.500}",
            targetVariable: "--atom-palette-blue-500"
          },
          primaryHover: {
            $value: "{palette.color.blue.600}",
            targetVariable: "--atom-palette-blue-600"
          },
          primaryLight: {
            $value: "{palette.color.blue.50}",
            targetVariable: "--atom-palette-blue-50"
          },
          bgPrimary: {
            $value: "{palette.color.neutral.white}",
            targetVariable: "--atom-palette-white"
          },
          bgSecondary: {
            $value: "{palette.color.gray.50}",
            targetVariable: "--atom-palette-gray-50"
          },
          textPrimary: {
            $value: "{palette.color.gray.900}",
            targetVariable: "--atom-palette-gray-900"
          },
          textSecondary: {
            $value: "{palette.color.gray.700}",
            targetVariable: "--atom-palette-gray-700"
          },
          textMuted: {
            $value: "{palette.color.gray.500}",
            targetVariable: "--atom-palette-gray-500"
          },
          borderSubtle: {
            $value: "{palette.color.gray.200}",
            targetVariable: "--atom-palette-gray-200"
          },
          borderStrong: {
            $value: "{palette.color.gray.300}",
            targetVariable: "--atom-palette-gray-300"
          },
          statusSuccess: {
            $value: "{palette.color.emerald.500}",
            targetVariable: "--atom-palette-emerald-500"
          },
          statusDanger: {
            $value: "{palette.color.rose.500}",
            targetVariable: "--atom-palette-rose-500"
          },
          statusWarning: {
            $value: "{palette.color.amber.500}",
            targetVariable: "--atom-palette-amber-500"
          }
        }
      },
      "warm-orange": {
        id: "warm-orange",
        name: "\uC6DC \uC624\uB80C\uC9C0 (Warm Orange)",
        description: "\uB530\uB73B\uD558\uACE0 \uCE5C\uADFC\uD55C \uAC10\uC131\uC758 \uBE44\uBE44\uB4DC \uC570\uBC84 \uC624\uB80C\uC9C0\uC640 \uD06C\uB9AC\uBBF8\uD55C \uC11C\uD53C\uC2A4, 12px \uC18C\uD504\uD2B8 \uB77C\uC6B4\uB529",
        mode: "light",
        category: "lifestyle",
        brandColor: "{palette.color.amber.500}",
        borderRadius: "{palette.radius.lg}",
        tokens: {
          primary: {
            $value: "{palette.color.amber.500}",
            targetVariable: "--atom-palette-amber-500"
          },
          primaryHover: {
            $value: "{palette.color.amber.600}",
            targetVariable: "--atom-palette-amber-600"
          },
          primaryLight: {
            $value: "{palette.color.amber.50}",
            targetVariable: "--atom-palette-amber-50"
          },
          bgPrimary: {
            $value: "{palette.color.neutral.white}",
            targetVariable: "--atom-palette-white"
          },
          bgSecondary: {
            $value: "{palette.color.gray.50}",
            targetVariable: "--atom-palette-gray-50"
          },
          textPrimary: {
            $value: "{palette.color.gray.900}",
            targetVariable: "--atom-palette-gray-900"
          },
          textSecondary: {
            $value: "{palette.color.gray.700}",
            targetVariable: "--atom-palette-gray-700"
          },
          textMuted: {
            $value: "{palette.color.gray.500}",
            targetVariable: "--atom-palette-gray-500"
          },
          borderSubtle: {
            $value: "{palette.color.gray.200}",
            targetVariable: "--atom-palette-gray-200"
          },
          borderStrong: {
            $value: "{palette.color.gray.300}",
            targetVariable: "--atom-palette-gray-300"
          },
          statusSuccess: {
            $value: "{palette.color.emerald.500}",
            targetVariable: "--atom-palette-emerald-500"
          },
          statusDanger: {
            $value: "{palette.color.rose.500}",
            targetVariable: "--atom-palette-rose-500"
          },
          statusWarning: {
            $value: "{palette.color.amber.500}",
            targetVariable: "--atom-palette-amber-500"
          }
        }
      },
      "dark-cyber": {
        id: "dark-cyber",
        name: "\uC0AC\uC774\uBC84 \uB2E4\uD06C (Cyber Dark)",
        description: "\uD558\uC774\uD14C\uD06C \uB124\uC628 \uC2DC\uC548 \uC561\uC13C\uD2B8\uC640 \uB525 \uC2AC\uB808\uC774\uD2B8(Slate-900) \uB9E4\uD2B8 \uB2E4\uD06C \uC11C\uD53C\uC2A4",
        mode: "dark",
        category: "dark",
        brandColor: "{palette.color.blue.400}",
        borderRadius: "10px",
        tokens: {
          primary: {
            $value: "{palette.color.blue.400}",
            targetVariable: "--atom-palette-blue-400"
          },
          primaryHover: {
            $value: "{palette.color.blue.500}",
            targetVariable: "--atom-palette-blue-500"
          },
          primaryLight: {
            $value: "{palette.color.blue.900}",
            targetVariable: "--atom-palette-blue-900"
          },
          bgPrimary: {
            $value: "{palette.color.gray.900}",
            targetVariable: "--atom-palette-gray-900"
          },
          bgSecondary: {
            $value: "{palette.color.gray.800}",
            targetVariable: "--atom-palette-gray-800"
          },
          textPrimary: {
            $value: "{palette.color.gray.50}",
            targetVariable: "--atom-palette-gray-50"
          },
          textSecondary: {
            $value: "{palette.color.gray.400}",
            targetVariable: "--atom-palette-gray-400"
          },
          textMuted: {
            $value: "{palette.color.gray.500}",
            targetVariable: "--atom-palette-gray-500"
          },
          borderSubtle: {
            $value: "{palette.color.gray.700}",
            targetVariable: "--atom-palette-gray-700"
          },
          borderStrong: {
            $value: "{palette.color.gray.600}",
            targetVariable: "--atom-palette-gray-600"
          },
          statusSuccess: {
            $value: "{palette.color.emerald.400}",
            targetVariable: "--atom-palette-emerald-400"
          },
          statusDanger: {
            $value: "{palette.color.rose.400}",
            targetVariable: "--atom-palette-rose-400"
          },
          statusWarning: {
            $value: "{palette.color.amber.400}",
            targetVariable: "--atom-palette-amber-400"
          }
        }
      },
      "midnight-black": {
        id: "midnight-black",
        name: "\uBBF8\uB4DC\uB098\uC787 \uBE14\uB799 (Midnight Black)",
        description: "\uC644\uC804\uD55C \uB525 \uBE14\uB799(#000000) \uBC30\uACBD\uC5D0 \uC77C\uB809\uD2B8\uB9AD \uBE14\uB8E8\uAC00 \uC5B4\uC6B0\uB7EC\uC9C4 \uCD5C\uACE0\uAE09 \uB2E4\uD06C \uBAA8\uB4DC",
        mode: "dark",
        category: "dark",
        brandColor: "{palette.color.blue.500}",
        borderRadius: "6px",
        tokens: {
          primary: {
            $value: "{palette.color.blue.500}",
            targetVariable: "--atom-palette-blue-500"
          },
          primaryHover: {
            $value: "{palette.color.blue.600}",
            targetVariable: "--atom-palette-blue-600"
          },
          primaryLight: {
            $value: "{palette.color.blue.900}",
            targetVariable: "--atom-palette-blue-900"
          },
          bgPrimary: {
            $value: "{palette.color.neutral.black}",
            targetVariable: "--atom-palette-black"
          },
          bgSecondary: {
            $value: "{palette.color.gray.900}",
            targetVariable: "--atom-palette-gray-900"
          },
          textPrimary: {
            $value: "{palette.color.neutral.white}",
            targetVariable: "--atom-palette-white"
          },
          textSecondary: {
            $value: "{palette.color.gray.400}",
            targetVariable: "--atom-palette-gray-400"
          },
          textMuted: {
            $value: "{palette.color.gray.500}",
            targetVariable: "--atom-palette-gray-500"
          },
          borderSubtle: {
            $value: "{palette.color.gray.800}",
            targetVariable: "--atom-palette-gray-800"
          },
          borderStrong: {
            $value: "{palette.color.gray.700}",
            targetVariable: "--atom-palette-gray-700"
          },
          statusSuccess: {
            $value: "{palette.color.emerald.500}",
            targetVariable: "--atom-palette-emerald-500"
          },
          statusDanger: {
            $value: "{palette.color.rose.500}",
            targetVariable: "--atom-palette-rose-500"
          },
          statusWarning: {
            $value: "{palette.color.amber.500}",
            targetVariable: "--atom-palette-amber-500"
          }
        }
      },
      "violet-tech": {
        id: "violet-tech",
        name: "\uBAA8\uB358 \uBC14\uC774\uC62C\uB81B (Modern Violet)",
        description: "B2B SaaS \uBC0F \uAC1C\uBC1C\uC790 \uD50C\uB7AB\uD3FC\uC5D0 \uCD5C\uC801\uD654\uB41C \uAC10\uAC01\uC801\uC778 \uD37C\uD50C\uACFC \uC9D5\uD06C(Zinc) \uC11C\uD53C\uC2A4",
        mode: "light",
        category: "developer",
        brandColor: "{palette.color.purple.500}",
        borderRadius: "{palette.radius.md}",
        tokens: {
          primary: {
            $value: "{palette.color.purple.500}",
            targetVariable: "--atom-palette-purple-500"
          },
          primaryHover: {
            $value: "{palette.color.purple.600}",
            targetVariable: "--atom-palette-purple-600"
          },
          primaryLight: {
            $value: "{palette.color.purple.50}",
            targetVariable: "--atom-palette-purple-50"
          },
          bgPrimary: {
            $value: "{palette.color.neutral.white}",
            targetVariable: "--atom-palette-white"
          },
          bgSecondary: {
            $value: "{palette.color.gray.50}",
            targetVariable: "--atom-palette-gray-50"
          },
          textPrimary: {
            $value: "{palette.color.gray.900}",
            targetVariable: "--atom-palette-gray-900"
          },
          textSecondary: {
            $value: "{palette.color.gray.700}",
            targetVariable: "--atom-palette-gray-700"
          },
          textMuted: {
            $value: "{palette.color.gray.500}",
            targetVariable: "--atom-palette-gray-500"
          },
          borderSubtle: {
            $value: "{palette.color.gray.200}",
            targetVariable: "--atom-palette-gray-200"
          },
          borderStrong: {
            $value: "{palette.color.gray.300}",
            targetVariable: "--atom-palette-gray-300"
          },
          statusSuccess: {
            $value: "{palette.color.emerald.500}",
            targetVariable: "--atom-palette-emerald-500"
          },
          statusDanger: {
            $value: "{palette.color.rose.500}",
            targetVariable: "--atom-palette-rose-500"
          },
          statusWarning: {
            $value: "{palette.color.amber.500}",
            targetVariable: "--atom-palette-amber-500"
          }
        }
      },
      "emerald-eco": {
        id: "emerald-eco",
        name: "\uD3EC\uB808\uC2A4\uD2B8 \uC5D0\uCF54 (Forest Eco)",
        description: "\uC790\uC5F0 \uAC10\uC131\uC758 \uAE4A\uC740 \uB525\uADF8\uB9B0\uACFC \uD3B8\uC548\uD55C \uC6F0\uB2C8\uC2A4 \uD540\uD14C\uD06C \uC778\uD130\uD398\uC774\uC2A4, 14px \uB77C\uC6B4\uB529",
        mode: "light",
        category: "fintech",
        brandColor: "{palette.color.emerald.500}",
        borderRadius: "14px",
        tokens: {
          primary: {
            $value: "{palette.color.emerald.500}",
            targetVariable: "--atom-palette-emerald-500"
          },
          primaryHover: {
            $value: "{palette.color.emerald.600}",
            targetVariable: "--atom-palette-emerald-600"
          },
          primaryLight: {
            $value: "{palette.color.emerald.50}",
            targetVariable: "--atom-palette-emerald-50"
          },
          bgPrimary: {
            $value: "{palette.color.neutral.white}",
            targetVariable: "--atom-palette-white"
          },
          bgSecondary: {
            $value: "{palette.color.gray.50}",
            targetVariable: "--atom-palette-gray-50"
          },
          textPrimary: {
            $value: "{palette.color.gray.900}",
            targetVariable: "--atom-palette-gray-900"
          },
          textSecondary: {
            $value: "{palette.color.gray.700}",
            targetVariable: "--atom-palette-gray-700"
          },
          textMuted: {
            $value: "{palette.color.gray.500}",
            targetVariable: "--atom-palette-gray-500"
          },
          borderSubtle: {
            $value: "{palette.color.gray.200}",
            targetVariable: "--atom-palette-gray-200"
          },
          borderStrong: {
            $value: "{palette.color.gray.300}",
            targetVariable: "--atom-palette-gray-300"
          },
          statusSuccess: {
            $value: "{palette.color.emerald.500}",
            targetVariable: "--atom-palette-emerald-500"
          },
          statusDanger: {
            $value: "{palette.color.rose.500}",
            targetVariable: "--atom-palette-rose-500"
          },
          statusWarning: {
            $value: "{palette.color.amber.500}",
            targetVariable: "--atom-palette-amber-500"
          }
        }
      },
      "sunset-rose": {
        id: "sunset-rose",
        name: "\uC120\uC14B \uB85C\uC988 (Sunset Rose)",
        description: "\uC6B0\uC544\uD558\uACE0 \uC138\uB828\uB41C \uD551\uD06C \uB85C\uC988\uC640 \uBD80\uB4DC\uB7EC\uC6B4 \uD30C\uC2A4\uD154 \uCE74\uB4DC \uC11C\uD53C\uC2A4, 16px \uACE1\uB960",
        mode: "light",
        category: "lifestyle",
        brandColor: "{palette.color.rose.500}",
        borderRadius: "{palette.radius.xl}",
        tokens: {
          primary: {
            $value: "{palette.color.rose.500}",
            targetVariable: "--atom-palette-rose-500"
          },
          primaryHover: {
            $value: "{palette.color.rose.600}",
            targetVariable: "--atom-palette-rose-600"
          },
          primaryLight: {
            $value: "{palette.color.rose.50}",
            targetVariable: "--atom-palette-rose-50"
          },
          bgPrimary: {
            $value: "{palette.color.neutral.white}",
            targetVariable: "--atom-palette-white"
          },
          bgSecondary: {
            $value: "{palette.color.gray.50}",
            targetVariable: "--atom-palette-gray-50"
          },
          textPrimary: {
            $value: "{palette.color.gray.900}",
            targetVariable: "--atom-palette-gray-900"
          },
          textSecondary: {
            $value: "{palette.color.gray.700}",
            targetVariable: "--atom-palette-gray-700"
          },
          textMuted: {
            $value: "{palette.color.gray.500}",
            targetVariable: "--atom-palette-gray-500"
          },
          borderSubtle: {
            $value: "{palette.color.gray.200}",
            targetVariable: "--atom-palette-gray-200"
          },
          borderStrong: {
            $value: "{palette.color.gray.300}",
            targetVariable: "--atom-palette-gray-300"
          },
          statusSuccess: {
            $value: "{palette.color.emerald.500}",
            targetVariable: "--atom-palette-emerald-500"
          },
          statusDanger: {
            $value: "{palette.color.rose.500}",
            targetVariable: "--atom-palette-rose-500"
          },
          statusWarning: {
            $value: "{palette.color.amber.500}",
            targetVariable: "--atom-palette-amber-500"
          }
        }
      },
      "minimal-mono": {
        id: "minimal-mono",
        name: "\uBBF8\uB2C8\uBA40 \uBAA8\uB178 (Minimal Monochrome)",
        description: "\uADF9\uB3C4\uC758 \uC808\uC81C\uBBF8\uB97C \uB2F4\uC740 \uD558\uC774 \uCF58\uD2B8\uB77C\uC2A4\uD2B8 \uD751\uBC31\uACFC 4px \uAE30\uD558\uD559\uC801 \uACE1\uB960",
        mode: "light",
        category: "minimal",
        brandColor: "{palette.color.neutral.black}",
        borderRadius: "{palette.radius.sm}",
        tokens: {
          primary: {
            $value: "{palette.color.neutral.black}",
            targetVariable: "--atom-palette-black"
          },
          primaryHover: {
            $value: "{palette.color.gray.800}",
            targetVariable: "--atom-palette-gray-800"
          },
          primaryLight: {
            $value: "{palette.color.gray.100}",
            targetVariable: "--atom-palette-gray-100"
          },
          bgPrimary: {
            $value: "{palette.color.neutral.white}",
            targetVariable: "--atom-palette-white"
          },
          bgSecondary: {
            $value: "{palette.color.gray.50}",
            targetVariable: "--atom-palette-gray-50"
          },
          textPrimary: {
            $value: "{palette.color.gray.900}",
            targetVariable: "--atom-palette-gray-900"
          },
          textSecondary: {
            $value: "{palette.color.gray.700}",
            targetVariable: "--atom-palette-gray-700"
          },
          textMuted: {
            $value: "{palette.color.gray.500}",
            targetVariable: "--atom-palette-gray-500"
          },
          borderSubtle: {
            $value: "{palette.color.gray.200}",
            targetVariable: "--atom-palette-gray-200"
          },
          borderStrong: {
            $value: "{palette.color.gray.800}",
            targetVariable: "--atom-palette-gray-800"
          },
          statusSuccess: {
            $value: "{palette.color.emerald.500}",
            targetVariable: "--atom-palette-emerald-500"
          },
          statusDanger: {
            $value: "{palette.color.rose.500}",
            targetVariable: "--atom-palette-rose-500"
          },
          statusWarning: {
            $value: "{palette.color.amber.500}",
            targetVariable: "--atom-palette-amber-500"
          }
        }
      }
    }
  },
  components: {
    button: {
      name: "Button (\uBC84\uD2BC)",
      category: "Form",
      $description: "\uC0AC\uC6A9\uC790 \uC778\uD130\uB799\uC158\uC744 \uC720\uB3C4\uD558\uB294 \uD575\uC2EC \uC561\uC158 \uCEF4\uD3EC\uB10C\uD2B8",
      sourceFile: "components/ui/Button.tsx",
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-500"
        },
        {
          key: "hoverBackground",
          label: "\uD638\uBC84 \uBC30\uACBD (Hover BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-600"
        },
        {
          key: "textColor",
          label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-500"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-md"
        },
        {
          key: "paddingX",
          label: "\uC88C\uC6B0 \uD328\uB529 (Padding X)",
          category: "spacing",
          defaultPaletteId: "--atom-space-4"
        },
        {
          key: "paddingY",
          label: "\uC0C1\uD558 \uD328\uB529 (Padding Y)",
          category: "spacing",
          defaultPaletteId: "--atom-space-2"
        }
      ],
      types: [
        {
          id: "solid",
          name: "Solid (\uC194\uB9AC\uB4DC \uCC44\uC6C0\uD615)",
          description: "\uBC30\uACBD \uC0C9\uC0C1\uC774 \uAF49 \uCC2C \uAC00\uC7A5 \uC9C1\uAD00\uC801\uC774\uACE0 \uD45C\uC900\uC801\uC778 \uBC84\uD2BC \uC678\uD615",
          whenToUse: "\uD654\uBA74\uC5D0\uC11C \uAC00\uC7A5 \uC8FC\uBAA9\uC744 \uBC1B\uC544\uC57C \uD558\uB294 \uC8FC\uC694 \uC804\uD658 \uBAA9\uD45C(CTA)\uB098 \uC2DC\uAC01\uC801 \uBE44\uC911\uC774 \uD070 \uC561\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
          whenToUseEn: "Use for high-priority CTA actions where visual prominence is paramount.",
          antiPattern: "\uD55C \uD654\uBA74\uC5D0 \uB108\uBB34 \uB9CE\uC740 \uC194\uB9AC\uB4DC \uBC84\uD2BC\uC744 \uBC30\uCE58\uD558\uBA74 \uC2DC\uAC01\uC801 \uC704\uACC4\uAC00 \uBB34\uB108\uC9D1\uB2C8\uB2E4."
        },
        {
          id: "outline",
          name: "Outline (\uC678\uACFD\uC120\uD615)",
          description: "\uBC30\uACBD\uC774 \uD22C\uBA85\uD558\uACE0 \uD14C\uB450\uB9AC\uB85C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uC815\uB3C8\uB41C \uC678\uD615",
          whenToUse: "\uC194\uB9AC\uB4DC \uBC84\uD2BC\uC744 \uBCF4\uC870\uD558\uAC70\uB098, \uD544\uD130 \uC5F4\uAE30, \uB2E4\uC6B4\uB85C\uB4DC \uB4F1 2\uCC28 \uC561\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
          whenToUseEn: "Use to complement solid buttons for secondary actions like filters or downloads.",
          antiPattern: "\uC5B4\uB450\uC6B4 \uBC30\uACBD\uC5D0\uC11C \uC2DC\uC778\uC131\uC774 \uB5A8\uC5B4\uC9C0\uC9C0 \uC54A\uB3C4\uB85D \uCDA9\uBD84\uD55C \uB300\uBE44\uC758 \uBCF4\uB354 \uCEEC\uB7EC\uB97C \uC9C0\uC815\uD558\uC138\uC694."
        },
        {
          id: "ghost",
          name: "Ghost (\uACE0\uC2A4\uD2B8 \uD22C\uBA85\uD615)",
          description: "\uD3C9\uC0C1\uC2DC \uBC30\uACBD\uACFC \uD14C\uB450\uB9AC\uAC00 \uC5C6\uACE0 \uB9C8\uC6B0\uC2A4 \uC624\uBC84 \uC2DC\uC5D0\uB9CC \uC11C\uD53C\uC2A4\uAC00 \uBC18\uC751\uD558\uB294 \uBBF8\uB2C8\uBA40 \uC678\uD615",
          whenToUse: "\uD234\uBC14, \uD14C\uC774\uBE14 \uD589 \uB0B4 \uBA54\uB274, \uC0C1\uB2E8 \uB124\uBE44\uAC8C\uC774\uC158 \uB4F1 \uC8FC\uBCC0 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uCD5C\uC18C\uD654\uD574\uC57C \uD558\uB294 \uD658\uACBD\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
          whenToUseEn: "Use in dense toolbars or table actions to eliminate visual clutter.",
          antiPattern: "\uB2E8\uB3C5\uC73C\uB85C \uC911\uC694\uD55C CTA \uC561\uC158\uC5D0 \uACE0\uC2A4\uD2B8 \uBC84\uD2BC\uC744 \uC0AC\uC6A9\uD558\uBA74 \uC0AC\uC6A9\uC790\uAC00 \uBC84\uD2BC\uC778\uC9C0 \uC778\uC9C0\uD558\uC9C0 \uBABB\uD569\uB2C8\uB2E4."
        },
        {
          id: "soft",
          name: "Soft (\uC18C\uD504\uD2B8 \uC5F0\uD55C\uBC30\uACBD\uD615)",
          description: "10% \uC774\uD558\uC758 \uC740\uC740\uD55C \uD2F4\uD2B8 \uBC30\uACBD\uC774 \uAE54\uB824 \uBD80\uB4DC\uB7EC\uC6B4 \uB290\uB08C\uC744 \uC8FC\uB294 \uBAA8\uB358 SaaS \uC678\uD615",
          whenToUse: "\uC194\uB9AC\uB4DC\uBCF4\uB2E4 \uAC00\uBCCD\uC9C0\uB9CC \uC544\uC6C3\uB77C\uC778\uBCF4\uB2E4 \uB69C\uB837\uD55C \uC601\uC5ED\uAC10\uC744 \uC6D0\uD560 \uB54C, \uC815\uBCF4\uC131 \uD0DC\uADF8 \uBC84\uD2BC\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
          whenToUseEn: "Use for subtle emphasis softer than solid but more distinct than outline."
        },
        {
          id: "link",
          name: "Link (\uD14D\uC2A4\uD2B8 \uC5B8\uB354\uB77C\uC778\uD615)",
          description: "\uBC15\uC2A4 \uD328\uB529 \uC5C6\uC774 \uBCF8\uBB38 \uC778\uB77C\uC778 \uB9C1\uD06C\uCC98\uB7FC \uBC11\uC904 \uC778\uD130\uB799\uC158\uC73C\uB85C \uB3D9\uC791\uD558\uB294 \uBBF8\uB2C8\uBA40 \uC678\uD615",
          whenToUse: "\uC57D\uAD00 \uC804\uBB38 \uBCF4\uAE30, \uB354 \uC54C\uC544\uBCF4\uAE30, \uC774\uC804 \uB2E8\uACC4 \uAC74\uB108\uB6F0\uAE30 \uB4F1 \uD14D\uC2A4\uD2B8 \uC911\uC2EC \uBCF4\uC870 \uB3D9\uC791\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
          whenToUseEn: 'Use for inline text actions like "Learn more" or "Skip step".'
        },
        {
          id: "floating-action",
          name: "Floating Action (FAB \uD50C\uB85C\uD305 \uC11C\uD074)",
          description: "\uD654\uBA74 \uC6B0\uD558\uB2E8\uC774\uB098 \uCF58\uD150\uCE20 \uC0C1\uB2E8\uC5D0 \uD56D\uC0C1 \uB5A0 \uC788\uB294 \uACE0\uB300\uBE44 \uC6D0\uD615 \uACE0\uC815 \uC561\uC158 \uC678\uD615",
          whenToUse: "\uBAA8\uBC14\uC77C/\uC6F9\uC758 \uBA54\uC778 \uAE00\uC4F0\uAE30(+), \uACE0\uAC1D \uC9C0\uC6D0 \uCC44\uD305 \uD31D\uC5C5 \uB4F1 \uD575\uC2EC \uD035 \uC561\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
          whenToUseEn: "Use for persistent quick-trigger actions like compose or chat support."
        }
      ],
      variables: {
        primary: {
          name: "\uD504\uB77C\uC774\uBA38\uB9AC \uC561\uC158 (Primary)",
          $description: "\uB514\uC790\uC778 \uD14C\uB9C8\uC758 \uB300\uD45C \uBE0C\uB79C\uB4DC \uC561\uC158 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
          variableRole: "primary",
          type: {
            id: "primary-cta",
            name: "\uC8FC\uC694 \uC2E4\uD589 (Primary CTA)",
            whenToUse: "\uD654\uBA74\uC5D0\uC11C \uC0AC\uC6A9\uC790\uAC00 \uBC18\uB4DC\uC2DC \uB3C4\uB2EC\uD574\uC57C \uD558\uB294 1\uC21C\uC704 \uD575\uC2EC \uC804\uD658 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uAC00\uC785 \uB4F1)\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            hoverBackground: {
              $value: "{theme.semantic.primary.hover}",
              targetVariable: "--atom-color-primary-hover"
            },
            textColor: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            },
            paddingX: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            paddingY: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            }
          }
        },
        secondary: {
          name: "\uC138\uCEE8\uB354\uB9AC \uBCF4\uC870 (Secondary)",
          $description: "\uCDE8\uC18C, \uB2EB\uAE30 \uB4F1 \uBCF4\uC870 \uB3D9\uC791\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uC911\uB9BD \uD1A4 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
          variableRole: "secondary",
          type: {
            id: "secondary-action",
            name: "\uBCF4\uC870 \uB3D9\uC791 (Secondary Action)",
            whenToUse: "\uCDE8\uC18C, \uB2EB\uAE30, \uC774\uC804 \uB2E8\uACC4\uB85C \uB3CC\uC544\uAC00\uAE30 \uB4F1 \uC8FC\uC694 \uC561\uC158\uC744 \uBCF4\uC870\uD558\uB294 \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "secondary",
            label: "\uC138\uCEE8\uB354\uB9AC (Secondary)",
            meaning: "\uCDE8\uC18C, \uB2EB\uAE30, \uC774\uC804 \uB2E8\uACC4 \uB4F1 \uC0AC\uC6A9\uC790 \uC778\uD130\uB799\uC158\uC744 \uC9C0\uC6D0\uD558\uB418 \uC2DC\uAC01\uC801 \uBD80\uB2F4\uC744 \uC904\uC774\uB294 \uC911\uB9BD \uD1A4 \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{theme.semantic.secondary}",
              targetVariable: "--atom-color-secondary"
            },
            hoverBackground: {
              $value: "{theme.semantic.secondary.hover}",
              targetVariable: "--atom-color-secondary-hover"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            borderColor: {
              $value: "{theme.semantic.secondary}",
              targetVariable: "--atom-color-secondary"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            paddingX: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            paddingY: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            }
          }
        },
        destructive: {
          name: "\uC704\uD5D8/\uC0AD\uC81C \uC2E4\uD589 (Destructive)",
          $description: "\uC601\uAD6C \uC0AD\uC81C, \uBCF5\uAD6C \uBD88\uAC00 \uC791\uC5C5\uC5D0 \uACBD\uACE0\uB97C \uC8FC\uB294 \uC704\uD5D8 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
          variableRole: "danger",
          type: {
            id: "destructive-action",
            name: "\uC704\uD5D8/\uC0AD\uC81C \uC2E4\uD589 (Destructive Action)",
            whenToUse: "\uC601\uAD6C \uC0AD\uC81C, \uACC4\uC815 \uD0C8\uD1F4, \uBCF5\uAD6C \uBD88\uAC00\uB2A5\uD55C \uB370\uC774\uD130 \uD3D0\uAE30 \uB4F1 \uC704\uD5D8\uD558\uACE0 \uCE58\uBA85\uC801\uC778 \uC791\uC5C5\uC744 \uC2E4\uD589\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "danger",
            label: "\uC704\uD5D8/\uC5D0\uB7EC (Danger / Destructive)",
            meaning: "\uBE68\uAC15\uC740 \uC704\uD5D8! \uC601\uAD6C \uC0AD\uC81C, \uACC4\uC57D \uD574\uC9C0, \uBCF5\uAD6C \uBD88\uAC00 \uC791\uC5C5 \uB4F1 \uCE58\uBA85\uC801 \uACB0\uACFC\uB97C \uACBD\uACE0\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{theme.semantic.danger}",
              targetVariable: "--atom-color-danger"
            },
            hoverBackground: {
              $value: "{theme.semantic.danger.hover}",
              targetVariable: "--atom-color-danger-hover"
            },
            textColor: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{theme.semantic.danger}",
              targetVariable: "--atom-color-danger"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            paddingX: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            paddingY: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            }
          }
        },
        warning: {
          name: "\uC8FC\uC758/\uB300\uAE30 \uD658\uAE30 (Warning)",
          $description: "\uC8FC\uC758 \uD658\uAE30, \uBCF4\uB958 \uC0C1\uD0DC \uBCC0\uACBD\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uACBD\uACE0 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
          variableRole: "warning",
          type: {
            id: "caution-action",
            name: "\uC8FC\uC758 \uD658\uAE30 (Caution / Warning Action)",
            whenToUse: "\uBE44\uC6A9 \uBC1C\uC0DD \uACBD\uACE0, \uC124\uC815 \uC784\uC2DC \uC911\uB2E8, \uC8FC\uC758\uAC00 \uD544\uC694\uD55C \uC870\uAC74\uBD80 \uC2B9\uC778\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "warning",
            label: "\uC8FC\uC758/\uACBD\uACE0 (Warning)",
            meaning: "\uB178\uB791\uC740 \uACBD\uACE0! \uC8FC\uC758 \uD658\uAE30, \uB9CC\uB8CC \uC784\uBC15, \uB300\uAE30/\uBCF4\uB958 \uB4F1 \uC0AC\uC6A9\uC790\uC758 \uCD94\uAC00 \uD655\uC778\uC774 \uD544\uC694\uD55C \uC0C1\uD669\uC744 \uC54C\uB9AC\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{theme.semantic.warning}",
              targetVariable: "--atom-color-warning"
            },
            hoverBackground: {
              $value: "{theme.semantic.warning.hover}",
              targetVariable: "--atom-color-warning-hover"
            },
            textColor: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{theme.semantic.warning}",
              targetVariable: "--atom-color-warning"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            paddingX: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            paddingY: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            }
          }
        },
        success: {
          name: "\uC2B9\uC778/\uC131\uACF5 \uC644\uB8CC (Success)",
          $description: "\uC644\uB8CC, \uC2B9\uC778, \uAE0D\uC815\uC801 \uC561\uC158\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uC131\uACF5 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
          variableRole: "success",
          type: {
            id: "confirm-action",
            name: "\uC2B9\uC778/\uC644\uB8CC \uC2E4\uD589 (Confirm / Success Action)",
            whenToUse: "\uACB0\uC81C \uCD5C\uC885 \uC2B9\uC778, \uAC00\uC785 \uC644\uB8CC, \uBCC0\uACBD \uC0AC\uD56D \uD655\uC815 \uB4F1 \uAE0D\uC815\uC801 \uC561\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "success",
            label: "\uC131\uACF5/\uC644\uB8CC (Success)",
            meaning: "\uCD08\uB85D\uC740 \uC131\uACF5! \uACB0\uC81C \uC644\uB8CC, \uC815\uC0C1 \uAC00\uB3D9, \uB370\uC774\uD130 \uC800\uC7A5 \uC644\uB8CC \uB4F1 \uAE0D\uC815\uC801 \uACB0\uACFC\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{theme.semantic.success}",
              targetVariable: "--atom-color-success"
            },
            hoverBackground: {
              $value: "{theme.semantic.success.hover}",
              targetVariable: "--atom-color-success-hover"
            },
            textColor: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{theme.semantic.success}",
              targetVariable: "--atom-color-success"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            paddingX: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            paddingY: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            }
          }
        },
        info: {
          name: "\uC548\uB0B4/\uC815\uBCF4 \uACE0\uC9C0 (Info)",
          $description: "\uC2DC\uC2A4\uD15C \uC54C\uB9BC \uBC0F \uAC00\uC774\uB4DC\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uC815\uBCF4 \uC2DC\uC2A4\uD15C \uD1A0\uD070",
          variableRole: "info",
          type: {
            id: "standard-action",
            name: "\uC678\uACFD\uC120 \uBCF4\uC870 \uC561\uC158 (Outline Action)",
            whenToUse: "\uD544\uD130 \uC5F4\uAE30, \uB2E4\uC6B4\uB85C\uB4DC \uB4F1 2\uCC28 \uC561\uC158\uC758 \uACBD\uACC4\uB97C \uAC00\uBCCD\uAC8C \uAC15\uC870\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "info",
            label: "\uC548\uB0B4/\uC815\uBCF4 (Info)",
            meaning: "\uD30C\uB791\uC740 \uC548\uB0B4! \uC77C\uBC18 \uB3C4\uC6C0\uB9D0, \uC2E0\uADDC \uAE30\uB2A5 \uBC30\uC9C0 \uB4F1 \uC2DC\uC2A4\uD15C \uC815\uBCF4 \uACE0\uC9C0\uB97C \uB098\uD0C0\uB0B4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.blue.500}",
              targetVariable: "--atom-palette-blue-500"
            },
            hoverBackground: {
              $value: "{palette.color.blue.600}",
              targetVariable: "--atom-palette-blue-600"
            },
            textColor: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.blue.500}",
              targetVariable: "--atom-palette-blue-500"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            paddingX: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            paddingY: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            }
          }
        }
      }
    },
    badge: {
      name: "Badge (\uBC30\uC9C0)",
      category: "Feedback",
      $description: "\uC0C1\uD0DC\uAC12, \uCE74\uC6B4\uD2B8, \uCE74\uD14C\uACE0\uB9AC\uB97C \uC9C1\uAD00\uC801\uC73C\uB85C \uB098\uD0C0\uB0B4\uB294 \uCE69 \uCEF4\uD3EC\uB10C\uD2B8",
      sourceFile: "components/ui/Badge.tsx",
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-50"
        },
        {
          key: "textColor",
          label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-600"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-50"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-full"
        },
        {
          key: "paddingX",
          label: "\uC88C\uC6B0 \uD328\uB529 (Padding X)",
          category: "spacing",
          defaultPaletteId: "--atom-space-2"
        },
        {
          key: "paddingY",
          label: "\uC0C1\uD558 \uD328\uB529 (Padding Y)",
          category: "spacing",
          defaultPaletteId: "--atom-space-1"
        }
      ],
      types: [
        {
          id: "solid",
          name: "Solid (\uCC44\uC6C0\uD615)",
          description: "\uC120\uBA85\uD55C \uBC30\uACBD\uC0C9\uC73C\uB85C \uC2DC\uC120\uC744 \uB044\uB294 \uACE0\uB300\uBE44 \uBC30\uC9C0",
          whenToUse: "\uC2E0\uADDC(New), \uAE34\uAE09 \uC54C\uB9BC \uB4F1 \uC989\uAC01\uC801\uC778 \uC8FC\uC758\uAC00 \uD544\uC694\uD55C \uACBD\uC6B0\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        active: {
          name: "\uD65C\uC131 \uC0C1\uD0DC \uBC30\uC9C0 (Active / Primary)",
          $description: "\uC2E0\uADDC \uAE30\uB2A5, \uC9C4\uD589 \uC911\uC778 \uC0C1\uD0DC\uB97C \uB098\uD0C0\uB0B4\uB294 \uC18C\uD504\uD2B8 \uBE14\uB8E8 \uD1A4",
          variableRole: "primary",
          type: {
            id: "info-tag",
            name: "\uCE74\uD14C\uACE0\uB9AC/\uB77C\uBCA8 \uD0DC\uADF8 (Category / Label Tag)",
            whenToUse: "\uD56D\uBAA9\uC758 \uCE74\uD14C\uACE0\uB9AC, \uBC84\uC804 \uD0DC\uADF8, \uC2E0\uADDC(New) \uC9C0\uD45C\uB97C \uAC04\uACB0\uD558\uAC8C \uD45C\uD604\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{theme.semantic.secondary}",
              targetVariable: "--atom-color-secondary"
            },
            textColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            borderColor: {
              $value: "{theme.semantic.primary.subtle}",
              targetVariable: "--atom-color-primary-subtle"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            },
            paddingX: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            },
            paddingY: {
              $value: "{palette.spacing.1}",
              targetVariable: "--atom-space-1"
            }
          }
        },
        success: {
          name: "\uC131\uACF5 \uBC30\uC9C0 (Success)",
          $description: "\uACB0\uC81C \uC644\uB8CC, \uC2B9\uC778 \uC0C1\uD0DC\uB97C \uB098\uD0C0\uB0B4\uB294 \uC5D0\uBA54\uB784\uB4DC \uD1A4",
          variableRole: "success",
          type: {
            id: "success-status",
            name: "\uC815\uC0C1/\uC131\uACF5 \uC0C1\uD0DC (Active / Success)",
            whenToUse: "\uC11C\uBE44\uC2A4 \uD65C\uC131(Active), \uACB0\uC81C \uC644\uB8CC, \uC778\uC99D \uC131\uACF5 \uB4F1 \uC815\uC0C1 \uC6B4\uC601 \uC0C1\uD0DC\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "success",
            label: "\uC131\uACF5/\uC644\uB8CC (Success)",
            meaning: "\uCD08\uB85D\uC740 \uC131\uACF5! \uACB0\uC81C \uC644\uB8CC, \uC815\uC0C1 \uAC00\uB3D9, \uB370\uC774\uD130 \uC800\uC7A5 \uC644\uB8CC \uB4F1 \uAE0D\uC815\uC801 \uACB0\uACFC\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{theme.semantic.success.subtle}",
              targetVariable: "--atom-color-success-subtle"
            },
            textColor: {
              $value: "{theme.semantic.success}",
              targetVariable: "--atom-color-success"
            },
            borderColor: {
              $value: "{theme.semantic.success}",
              targetVariable: "--atom-color-success"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            },
            paddingX: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            },
            paddingY: {
              $value: "{palette.spacing.1}",
              targetVariable: "--atom-space-1"
            }
          }
        },
        warning: {
          name: "\uC8FC\uC758 \uBC30\uC9C0 (Warning)",
          $description: "\uB9CC\uB8CC \uC784\uBC15, \uB300\uAE30 \uC0C1\uD0DC\uB97C \uB098\uD0C0\uB0B4\uB294 \uC570\uBC84 \uD1A4",
          variableRole: "warning",
          type: {
            id: "pending-status",
            name: "\uAC80\uD1A0/\uB300\uAE30 \uC0C1\uD0DC (Warning / Pending)",
            whenToUse: "\uC2B9\uC778 \uB300\uAE30 \uC911, \uAC80\uD1A0 \uD544\uC694, \uC794\uC5EC \uC77C\uC218 \uC784\uBC15 \uB4F1 \uC8FC\uC758\uB97C \uC694\uAD6C\uD558\uB294 \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "warning",
            label: "\uC8FC\uC758/\uACBD\uACE0 (Warning)",
            meaning: "\uB178\uB791\uC740 \uACBD\uACE0! \uC8FC\uC758 \uD658\uAE30, \uB9CC\uB8CC \uC784\uBC15, \uB300\uAE30/\uBCF4\uB958 \uB4F1 \uC0AC\uC6A9\uC790\uC758 \uCD94\uAC00 \uD655\uC778\uC774 \uD544\uC694\uD55C \uC0C1\uD669\uC744 \uC54C\uB9AC\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{theme.semantic.warning.subtle}",
              targetVariable: "--atom-color-warning-subtle"
            },
            textColor: {
              $value: "{theme.semantic.warning}",
              targetVariable: "--atom-color-warning"
            },
            borderColor: {
              $value: "{theme.semantic.warning}",
              targetVariable: "--atom-color-warning"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            },
            paddingX: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            },
            paddingY: {
              $value: "{palette.spacing.1}",
              targetVariable: "--atom-space-1"
            }
          }
        },
        destructive: {
          name: "\uC704\uD5D8/\uC5D0\uB7EC \uBC30\uC9C0 (Destructive / Danger)",
          $description: "\uC624\uB958, \uC2E4\uD328, \uC704\uD5D8 \uC0C1\uD0DC\uB97C \uB098\uD0C0\uB0B4\uB294 \uB85C\uC988/\uB808\uB4DC \uD1A4 \uBC30\uC9C0",
          variableRole: "danger",
          type: {
            id: "error-status",
            name: "\uC5D0\uB7EC/\uC704\uD5D8 \uC0C1\uD0DC (Error Status)",
            whenToUse: "\uC11C\uBE44\uC2A4 \uC7A5\uC560, \uACB0\uC81C \uC2E4\uD328, \uC720\uD6A8\uAE30\uAC04 \uB9CC\uB8CC \uB4F1 \uAE34\uAE09 \uC870\uCE58\uAC00 \uD544\uC694\uD55C \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "danger",
            label: "\uC704\uD5D8/\uC5D0\uB7EC (Danger / Destructive)",
            meaning: "\uBE68\uAC15\uC740 \uC704\uD5D8! \uC601\uAD6C \uC0AD\uC81C, \uACC4\uC57D \uD574\uC9C0, \uBCF5\uAD6C \uBD88\uAC00 \uC791\uC5C5 \uB4F1 \uCE58\uBA85\uC801 \uACB0\uACFC\uB97C \uACBD\uACE0\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{theme.semantic.danger.subtle}",
              targetVariable: "--atom-color-danger-subtle"
            },
            textColor: {
              $value: "{theme.semantic.danger}",
              targetVariable: "--atom-color-danger"
            },
            borderColor: {
              $value: "{theme.semantic.danger}",
              targetVariable: "--atom-color-danger"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            },
            paddingX: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            },
            paddingY: {
              $value: "{palette.spacing.1}",
              targetVariable: "--atom-space-1"
            }
          }
        },
        "sharp-neutral": {
          name: "\uC0E4\uD504 \uB274\uD2B8\uB7F4 (Sharp Neutral)",
          $description: "\uBC84\uC804 \uC815\uBCF4, \uCF54\uB4DC \uD0DC\uADF8 \uB4F1\uC5D0 \uC4F0\uC774\uB294 \uAC01\uC9C4 \uB77C\uC6B4\uB529 \uBC30\uC9C0",
          variableRole: "primary",
          type: {
            id: "info-tag",
            name: "\uCE74\uD14C\uACE0\uB9AC/\uB77C\uBCA8 \uD0DC\uADF8 (Category / Label Tag)",
            whenToUse: "\uD56D\uBAA9\uC758 \uCE74\uD14C\uACE0\uB9AC, \uBC84\uC804 \uD0DC\uADF8, \uC2E0\uADDC(New) \uC9C0\uD45C\uB97C \uAC04\uACB0\uD558\uAC8C \uD45C\uD604\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.100}",
              targetVariable: "--atom-palette-gray-100"
            },
            textColor: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            },
            paddingX: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            },
            paddingY: {
              $value: "{palette.spacing.1}",
              targetVariable: "--atom-space-1"
            }
          }
        }
      }
    },
    card: {
      name: "Card (\uCE74\uB4DC)",
      category: "Layout",
      $description: "\uCF58\uD150\uCE20\uB97C \uB17C\uB9AC\uC801 \uBE14\uB85D\uC73C\uB85C \uBB36\uC5B4\uC8FC\uB294 \uAE30\uBCF8 \uCEE8\uD14C\uC774\uB108 \uD45C\uBA74",
      sourceFile: "components/ui/Card.tsx",
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-lg"
        },
        {
          key: "padding",
          label: "\uB0B4\uBD80 \uC5EC\uBC31 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-4"
        }
      ],
      types: [
        {
          id: "outlined",
          name: "Outlined (\uC678\uACFD\uC120 \uD14C\uB450\uB9AC\uD615)",
          description: "\uC740\uC740\uD55C 1px \uD14C\uB450\uB9AC\uB85C \uCF58\uD150\uCE20 \uC601\uC5ED\uC744 \uC815\uAC08\uD558\uAC8C \uAD6C\uD68D\uD558\uB294 \uAE30\uBCF8 \uCE74\uB4DC",
          whenToUse: "\uB300\uC2DC\uBCF4\uB4DC \uC704\uC82F, \uADF8\uB9AC\uB4DC \uBAA9\uB85D \uB4F1 \uC815\uB3C8\uB41C \uAD6C\uC870\uC801 \uC815\uBCF4 \uD45C\uC2DC\uC5D0 \uC801\uD569\uD569\uB2C8\uB2E4."
        },
        {
          id: "elevated",
          name: "Elevated (\uADF8\uB9BC\uC790 \uBD80\uAC01\uD615)",
          description: "\uBD80\uB4DC\uB7EC\uC6B4 \uC785\uCCB4 \uC74C\uC601\uC744 \uD1B5\uD574 \uBC14\uB2E5\uBA74\uACFC \uBD84\uB9AC\uB418\uB294 \uD50C\uB85C\uD305 \uCE74\uB4DC",
          whenToUse: "\uCD94\uCC9C \uC694\uAE08\uC81C, \uD074\uB9AD \uAC00\uB2A5\uD55C \uC778\uD130\uB799\uD2F0\uBE0C \uCE74\uB4DC \uB4F1 \uC2DC\uAC01\uC801 \uBAB0\uC785\uC774 \uD544\uC694\uD55C \uACF3\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "flat",
          name: "Flat (\uD3C9\uBA74 \uBC30\uACBD\uD615)",
          description: "\uD14C\uB450\uB9AC \uC5C6\uC774 \uC740\uC740\uD55C \uBCF4\uC870 \uBC30\uACBD\uC0C9\uC73C\uB85C\uB9CC \uC601\uC5ED\uC744 \uAD6C\uBD84\uD558\uB294 \uBBF8\uB2C8\uBA40 \uCE74\uB4DC",
          whenToUse: "\uBC30\uACBD\uC774 \uBCF5\uC7A1\uD558\uC9C0 \uC54A\uC740 \uAE54\uB054\uD55C \uD654\uBA74\uC5D0\uC11C \uAC00\uBCBC\uC6B4 \uADF8\uB8F9\uD551\uC5D0 \uC801\uD569\uD569\uB2C8\uB2E4."
        },
        {
          id: "accent-border",
          name: "Accent-Border (\uAC15\uC870 \uB77C\uC778\uD615)",
          description: "\uC0C1\uB2E8\uC774\uB098 \uC88C\uCE21\uC5D0 \uBE0C\uB79C\uB4DC \uC561\uC13C\uD2B8 \uCEEC\uB7EC \uBC14\uAC00 \uB4E4\uC5B4\uAC04 \uC0C1\uD0DC \uAC15\uC870\uD615 \uCE74\uB4DC",
          whenToUse: "\uACF5\uC9C0\uC0AC\uD56D, \uACBD\uACE0 \uCE74\uB4DC, \uD504\uB9AC\uBBF8\uC5C4 \uD61C\uD0DD \uCE74\uB4DC \uB4F1 \uD2B9\uC815 \uC0C1\uD0DC\uB098 \uB4F1\uAE09\uC744 \uAC15\uC870\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        elevated: {
          name: "\uAE30\uBCF8 \uBCF4\uB354 \uCE74\uB4DC (Default Bordered)",
          $description: "\uC740\uC740\uD55C \uD14C\uB450\uB9AC\uC640 \uC5EC\uBC31\uC744 \uAC00\uC9C4 \uD45C\uC900 \uCF58\uD150\uCE20 \uCE74\uB4DC",
          variableRole: "primary",
          type: {
            id: "card-elevated",
            name: "\uAE30\uBCF8 \uBCF4\uB354 \uCE74\uB4DC (Default Bordered)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 elevated \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            borderRadius: {
              $value: "{palette.radius.lg}",
              targetVariable: "--atom-radius-lg"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        },
        "surface-muted": {
          name: "\uC18C\uD504\uD2B8 \uC11C\uD53C\uC2A4 \uCE74\uB4DC (Muted Surface)",
          $description: "\uBCF4\uB354 \uC5C6\uC774 \uC11C\uD53C\uC2A4 \uBC30\uACBD\uC0C9\uB9CC\uC73C\uB85C \uC601\uC5ED\uC744 \uAD6C\uBD84\uD558\uB294 \uCE74\uB4DC",
          variableRole: "primary",
          type: {
            id: "card-surface-muted",
            name: "\uC18C\uD504\uD2B8 \uC11C\uD53C\uC2A4 \uCE74\uB4DC (Muted Surface)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 surface-muted \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderColor: {
              $value: "{palette.color.gray.100}",
              targetVariable: "--atom-palette-gray-100"
            },
            borderRadius: {
              $value: "{palette.radius.xl}",
              targetVariable: "--atom-radius-xl"
            },
            padding: {
              $value: "{palette.spacing.6}",
              targetVariable: "--atom-space-6"
            }
          }
        },
        "accent-brand": {
          name: "\uBE0C\uB79C\uB4DC \uD558\uC774\uB77C\uC774\uD2B8 \uCE74\uB4DC (Brand Highlight)",
          $description: "\uCD94\uCC9C \uC694\uAE08\uC81C, \uAC15\uC870 \uC139\uC158\uC5D0 \uC4F0\uC774\uB294 \uBE14\uB8E8 \uD2F4\uD2B8 \uCE74\uB4DC",
          variableRole: "primary",
          type: {
            id: "card-accent-brand",
            name: "\uBE0C\uB79C\uB4DC \uD558\uC774\uB77C\uC774\uD2B8 \uCE74\uB4DC (Brand Highlight)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 accent-brand \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.blue.50}",
              targetVariable: "--atom-palette-blue-50"
            },
            borderColor: {
              $value: "{palette.color.blue.500}",
              targetVariable: "--atom-palette-blue-500"
            },
            borderRadius: {
              $value: "{palette.radius.lg}",
              targetVariable: "--atom-radius-lg"
            },
            padding: {
              $value: "{palette.spacing.6}",
              targetVariable: "--atom-space-6"
            }
          }
        }
      }
    },
    input: {
      name: "Input (\uC785\uB825 \uD544\uB4DC)",
      category: "Form",
      $description: "\uD14D\uC2A4\uD2B8 \uC785\uB825\uC744 \uC218\uC9D1\uD558\uB294 \uD45C\uC900 \uD3FC \uCEE8\uD2B8\uB864",
      sourceFile: "components/ui/Input.tsx",
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-300"
        },
        {
          key: "focusBorderColor",
          label: "\uD3EC\uCEE4\uC2A4 \uD14C\uB450\uB9AC (Focus Border)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-500"
        },
        {
          key: "textColor",
          label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-900"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-md"
        },
        {
          key: "paddingX",
          label: "\uC88C\uC6B0 \uD328\uB529 (Padding X)",
          category: "spacing",
          defaultPaletteId: "--atom-space-3"
        },
        {
          key: "paddingY",
          label: "\uC0C1\uD558 \uD328\uB529 (Padding Y)",
          category: "spacing",
          defaultPaletteId: "--atom-space-2"
        }
      ],
      types: [
        {
          id: "outlined",
          name: "Outlined (\uD14C\uB450\uB9AC\uD615)",
          description: "1px \uC678\uACFD\uC120\uC73C\uB85C \uC785\uB825 \uD544\uB4DC\uC758 \uACBD\uACC4\uB97C \uBA85\uD655\uD788 \uC804\uB2EC\uD558\uB294 \uD45C\uC900 \uC778\uD48B",
          whenToUse: "\uB300\uBD80\uBD84\uC758 \uC6F9 \uD3FC, \uD68C\uC6D0\uAC00\uC785, \uACB0\uC81C \uB4F1 \uC2E0\uB8B0\uB3C4 \uB192\uC740 \uC785\uB825 \uC591\uC2DD\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "filled",
          name: "Filled (\uBC30\uACBD \uCC44\uC6C0\uD615)",
          description: "\uC740\uC740\uD55C \uD68C\uC0C9 \uBC30\uACBD\uC73C\uB85C \uD130\uCE58 \uC601\uC5ED\uC744 \uC9C1\uAD00\uC801\uC73C\uB85C \uBCF4\uC5EC\uC8FC\uB294 \uBAA8\uBC14\uC77C \uCE5C\uD654\uD615 \uC778\uD48B",
          whenToUse: "\uBAA8\uBC14\uC77C \uBDF0\uD3EC\uD2B8, \uBE60\uB978 \uD14D\uC2A4\uD2B8 \uC785\uB825\uCC3D \uB4F1\uC5D0 \uC801\uD569\uD569\uB2C8\uB2E4."
        },
        {
          id: "underlined",
          name: "Underlined (\uBC11\uC904\uD615)",
          description: "\uD558\uB2E8\uC5D0\uB9CC 1px \uACBD\uACC4\uC120\uC774 \uC788\uB294 \uBBF8\uB2C8\uBA40 \uD14D\uC2A4\uD2B8 \uC778\uD48B",
          whenToUse: "\uB514\uC790\uC778 \uC704\uC8FC\uC758 \uB7ED\uC154\uB9AC \uCEE4\uBA38\uC2A4\uB098 \uAC00\uBCBC\uC6B4 \uC778\uB77C\uC778 \uD3B8\uC9D1\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        standard: {
          name: "\uD45C\uC900 \uD3FC \uC778\uD48B (Standard Form)",
          $description: "\uC77C\uBC18\uC801\uC778 \uC591\uC2DD \uC785\uB825\uC5D0 \uCD5C\uC801\uD654\uB41C \uD14C\uB450\uB9AC \uC778\uD48B",
          variableRole: "primary",
          type: {
            id: "default-input",
            name: "\uD45C\uC900 \uD14D\uC2A4\uD2B8 \uC785\uB825 (Standard Field)",
            whenToUse: "\uC77C\uBC18\uC801\uC778 \uD14D\uC2A4\uD2B8, \uC774\uBA54\uC77C, \uAC80\uC0C9\uC5B4, \uC22B\uC790 \uB4F1\uC758 \uB370\uC774\uD130\uB97C \uC785\uB825\uBC1B\uB294 \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            focusBorderColor: {
              $value: "{palette.color.blue.500}",
              targetVariable: "--atom-palette-blue-500"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            paddingX: {
              $value: "{palette.spacing.3}",
              targetVariable: "--atom-space-3"
            },
            paddingY: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            }
          }
        },
        "pill-search": {
          name: "\uAC80\uC0C9\uC6A9 \uC54C\uC57D \uC778\uD48B (Pill Search)",
          $description: "\uAC80\uC0C9 \uBC14\uB098 \uB0B4\uBE44\uAC8C\uC774\uC158 \uD544\uD130\uC5D0 \uC801\uD569\uD55C \uB465\uADFC \uC778\uD48B",
          variableRole: "primary",
          type: {
            id: "default-input",
            name: "\uD45C\uC900 \uD14D\uC2A4\uD2B8 \uC785\uB825 (Standard Field)",
            whenToUse: "\uC77C\uBC18\uC801\uC778 \uD14D\uC2A4\uD2B8, \uC774\uBA54\uC77C, \uAC80\uC0C9\uC5B4, \uC22B\uC790 \uB4F1\uC758 \uB370\uC774\uD130\uB97C \uC785\uB825\uBC1B\uB294 \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.100}",
              targetVariable: "--atom-palette-gray-100"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            focusBorderColor: {
              $value: "{palette.color.blue.500}",
              targetVariable: "--atom-palette-blue-500"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            },
            paddingX: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            paddingY: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            }
          }
        }
      }
    },
    textarea: {
      name: "Textarea (\uB2E4\uC911\uD589 \uC785\uB825)",
      category: "Form",
      $description: "\uC5EC\uB7EC \uC904\uC758 \uD14D\uC2A4\uD2B8 \uBCF8\uBB38\uC774\uB098 \uD53C\uB4DC\uBC31\uC744 \uC785\uB825\uBC1B\uB294 \uC601\uC5ED",
      sourceFile: "components/ui/Textarea.tsx",
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-300"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-md"
        },
        {
          key: "padding",
          label: "\uB0B4\uBD80 \uC5EC\uBC31 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-3"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        standard: {
          name: "\uD45C\uC900 \uD14D\uC2A4\uD2B8\uC5D0\uC5B4\uB9AC\uC5B4 (Standard)",
          $description: "\uAE30\uBCF8 8px \uB77C\uC6B4\uB529 \uB2E4\uC911\uD589 \uD3FC \uD544\uB4DC",
          variableRole: "primary",
          type: {
            id: "default-input",
            name: "\uD45C\uC900 \uD14D\uC2A4\uD2B8 \uC785\uB825 (Standard Field)",
            whenToUse: "\uC77C\uBC18\uC801\uC778 \uD14D\uC2A4\uD2B8, \uC774\uBA54\uC77C, \uAC80\uC0C9\uC5B4, \uC22B\uC790 \uB4F1\uC758 \uB370\uC774\uD130\uB97C \uC785\uB825\uBC1B\uB294 \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.3}",
              targetVariable: "--atom-space-3"
            }
          }
        }
      }
    },
    switch: {
      name: "Switch (\uD1A0\uAE00 \uC2A4\uC704\uCE58)",
      category: "Form",
      $description: "\uC628/\uC624\uD504 \uBC14\uC774\uB108\uB9AC \uC124\uC815\uC744 \uC989\uC2DC \uBCC0\uACBD\uD558\uB294 \uC2A4\uC704\uCE58",
      sourceFile: "components/ui/Switch.tsx",
      properties: [
        {
          key: "activeBackground",
          label: "\uD65C\uC131 \uBC30\uACBD (Active BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-500"
        },
        {
          key: "inactiveBackground",
          label: "\uBE44\uD65C\uC131 \uBC30\uACBD (Inactive BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "thumbColor",
          label: "\uC6D0\uD615 \uC190\uC7A1\uC774 \uC0C9\uC0C1 (Thumb Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-full"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        brand: {
          name: "\uBE0C\uB79C\uB4DC \uC2A4\uC704\uCE58 (Brand Primary)",
          $description: "\uC2DC\uADF8\uB2C8\uCC98 \uBE14\uB8E8 \uD1A0\uAE00",
          variableRole: "primary",
          type: {
            id: "switch-brand",
            name: "\uBE0C\uB79C\uB4DC \uC2A4\uC704\uCE58 (Brand Primary)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 brand \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            activeBackground: {
              $value: "{palette.color.blue.500}",
              targetVariable: "--atom-palette-blue-500"
            },
            inactiveBackground: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            thumbColor: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            }
          }
        },
        emerald: {
          name: "\uC5D0\uCF54 \uC5D0\uBA54\uB784\uB4DC \uC2A4\uC704\uCE58 (Emerald Active)",
          $description: "\uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uC131\uACF5 \uAC10\uC131\uC758 \uB179\uC0C9 \uD1A0\uAE00",
          variableRole: "success",
          type: {
            id: "switch-emerald",
            name: "\uC5D0\uCF54 \uC5D0\uBA54\uB784\uB4DC \uC2A4\uC704\uCE58 (Emerald Active)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 emerald \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "success",
            label: "\uC131\uACF5/\uC644\uB8CC (Success)",
            meaning: "\uCD08\uB85D\uC740 \uC131\uACF5! \uACB0\uC81C \uC644\uB8CC, \uC815\uC0C1 \uAC00\uB3D9, \uB370\uC774\uD130 \uC800\uC7A5 \uC644\uB8CC \uB4F1 \uAE0D\uC815\uC801 \uACB0\uACFC\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            activeBackground: {
              $value: "{palette.color.emerald.500}",
              targetVariable: "--atom-palette-emerald-500"
            },
            inactiveBackground: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            thumbColor: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            }
          }
        }
      }
    },
    tabs: {
      name: "Tabs (\uD0ED \uB124\uBE44\uAC8C\uC774\uC158)",
      category: "Navigation",
      $description: "\uB3D9\uC77C \uD654\uBA74 \uB0B4\uC5D0\uC11C \uC5F0\uAD00\uB41C \uBDF0\uB97C \uC804\uD658\uD558\uB294 \uD0ED \uBC14",
      sourceFile: "components/ui/Tabs.tsx",
      properties: [
        {
          key: "activeIndicator",
          label: "\uD65C\uC131 \uC778\uB514\uCF00\uC774\uD130 (Active Line/BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-500"
        },
        {
          key: "activeText",
          label: "\uD65C\uC131 \uD14D\uC2A4\uD2B8 (Active Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-500"
        },
        {
          key: "inactiveText",
          label: "\uBE44\uD65C\uC131 \uD14D\uC2A4\uD2B8 (Inactive Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-700"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-md"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        underlined: {
          name: "\uC5B8\uB354\uB77C\uC778 \uD0ED (Underlined)",
          $description: "\uD558\uB2E8 \uACBD\uACC4\uC120 \uC778\uB514\uCF00\uC774\uD130\uAC00 \uB530\uB77C\uB2E4\uB2C8\uB294 \uD074\uB798\uC2DD \uD0ED",
          variableRole: "primary",
          type: {
            id: "tabs-underlined",
            name: "\uC5B8\uB354\uB77C\uC778 \uD0ED (Underlined)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 underlined \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            activeIndicator: {
              $value: "{palette.color.blue.500}",
              targetVariable: "--atom-palette-blue-500"
            },
            activeText: {
              $value: "{palette.color.blue.500}",
              targetVariable: "--atom-palette-blue-500"
            },
            inactiveText: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            },
            borderRadius: {
              $value: "{palette.radius.none}",
              targetVariable: "--atom-radius-none"
            }
          }
        },
        pills: {
          name: "\uC54C\uC57D \uC138\uADF8\uBA3C\uD2B8 \uD0ED (Pill Segments)",
          $description: "\uBC15\uC2A4 \uBC30\uACBD\uC774 \uD65C\uC131\uD654\uB418\uB294 \uBAA8\uB358 \uC138\uADF8\uBA3C\uD2B8 \uCEE8\uD2B8\uB864",
          variableRole: "primary",
          type: {
            id: "tabs-pills",
            name: "\uC54C\uC57D \uC138\uADF8\uBA3C\uD2B8 \uD0ED (Pill Segments)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 pills \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            activeIndicator: {
              $value: "{palette.color.blue.500}",
              targetVariable: "--atom-palette-blue-500"
            },
            activeText: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            inactiveText: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            }
          }
        }
      }
    },
    table: {
      name: "Table (\uB370\uC774\uD130 \uD14C\uC774\uBE14)",
      category: "Data",
      $description: "\uD589\uACFC \uC5F4 \uAD6C\uC870\uB85C \uBC29\uB300\uD55C \uB370\uC774\uD130\uB97C \uCCB4\uACC4\uD654\uD558\uC5EC \uBCF4\uC5EC\uC8FC\uB294 \uD14C\uC774\uBE14",
      sourceFile: "components/ui/Table.tsx",
      properties: [
        {
          key: "headerBackground",
          label: "\uD5E4\uB354 \uBC30\uACBD (Header BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-50"
        },
        {
          key: "borderColor",
          label: "\uAD6C\uBD84\uC120 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "borderRadius",
          label: "\uC678\uACFD \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-lg"
        },
        {
          key: "cellPadding",
          label: "\uC140 \uB0B4\uBD80 \uC5EC\uBC31 (Cell Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-3"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        standard: {
          name: "\uAE30\uBCF8 \uBCF4\uB354 \uD14C\uC774\uBE14 (Bordered)",
          $description: "\uC740\uC740\uD55C \uD14C\uB450\uB9AC\uC640 \uAE54\uB054\uD55C \uD5E4\uB354\uB97C \uAC16\uCD98 \uAE30\uBCF8 \uD14C\uC774\uBE14",
          variableRole: "primary",
          type: {
            id: "table-standard",
            name: "\uAE30\uBCF8 \uBCF4\uB354 \uD14C\uC774\uBE14 (Bordered)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 standard \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            headerBackground: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            borderRadius: {
              $value: "{palette.radius.lg}",
              targetVariable: "--atom-radius-lg"
            },
            cellPadding: {
              $value: "{palette.spacing.3}",
              targetVariable: "--atom-space-3"
            }
          }
        }
      }
    },
    modal: {
      name: "Modal (\uBAA8\uB2EC \uB2E4\uC774\uC5BC\uB85C\uADF8)",
      category: "Feedback",
      $description: "\uC911\uC694 \uD655\uC778 \uBC0F \uC791\uC5C5 \uD3EC\uCEE4\uC2A4\uB97C \uC704\uD55C \uB808\uC774\uC5B4 \uC624\uBC84\uB808\uC774",
      sourceFile: "components/ui/Modal.tsx",
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-xl"
        },
        {
          key: "padding",
          label: "\uB0B4\uBD80 \uC5EC\uBC31 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-6"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        standard: {
          name: "\uD45C\uC900 \uB300\uD654 \uC0C1\uC790 (Standard Dialog)",
          $description: "16px \uBCFC\uB4DC \uB77C\uC6B4\uB529\uACFC 24px \uD328\uB529\uC774 \uC801\uC6A9\uB41C \uC815\uD615\uD654\uB41C \uBAA8\uB2EC",
          variableRole: "primary",
          type: {
            id: "modal-standard",
            name: "\uD45C\uC900 \uB300\uD654 \uC0C1\uC790 (Standard Dialog)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 standard \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            borderRadius: {
              $value: "{palette.radius.xl}",
              targetVariable: "--atom-radius-xl"
            },
            padding: {
              $value: "{palette.spacing.6}",
              targetVariable: "--atom-space-6"
            }
          }
        }
      }
    },
    avatar: {
      name: "Avatar (\uD504\uB85C\uD544 \uC544\uBC14\uD0C0)",
      category: "Data",
      $description: "\uC0AC\uC6A9\uC790 \uD504\uB85C\uD544 \uC774\uBBF8\uC9C0\uB098 \uC774\uB2C8\uC15C\uC744 \uB098\uD0C0\uB0B4\uB294 \uC6D0\uD615 \uCEF4\uD3EC\uB10C\uD2B8",
      sourceFile: "components/ui/Avatar.tsx",
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-50"
        },
        {
          key: "textColor",
          label: "\uC774\uB2C8\uC15C \uD14D\uC2A4\uD2B8 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-600"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-full"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        circle: {
          name: "\uC6D0\uD615 \uC544\uBC14\uD0C0 (Circle)",
          $description: "\uC644\uC804 \uC6D0\uD615 \uD504\uB85C\uD544",
          variableRole: "primary",
          type: {
            id: "avatar-circle",
            name: "\uC6D0\uD615 \uC544\uBC14\uD0C0 (Circle)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 circle \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.blue.50}",
              targetVariable: "--atom-palette-blue-50"
            },
            textColor: {
              $value: "{palette.color.blue.600}",
              targetVariable: "--atom-palette-blue-600"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            }
          }
        },
        "rounded-square": {
          name: "\uC2A4\uD018\uC5B4\uB4DC \uC544\uBC14\uD0C0 (Squircle)",
          $description: "\uBD80\uB4DC\uB7EC\uC6B4 \uC0AC\uAC01 \uACE1\uB960\uC758 \uBAA8\uB358 \uC544\uBC14\uD0C0",
          variableRole: "primary",
          type: {
            id: "avatar-rounded-square",
            name: "\uC2A4\uD018\uC5B4\uB4DC \uC544\uBC14\uD0C0 (Squircle)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 rounded-square \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.purple.50}",
              targetVariable: "--atom-palette-purple-50"
            },
            textColor: {
              $value: "{palette.color.purple.500}",
              targetVariable: "--atom-palette-purple-500"
            },
            borderRadius: {
              $value: "{palette.radius.lg}",
              targetVariable: "--atom-radius-lg"
            }
          }
        }
      }
    },
    navbar: {
      name: "Navbar (\uAE00\uB85C\uBC8C \uB124\uBE44\uAC8C\uC774\uC158)",
      category: "Navigation",
      $description: "\uC0C1\uB2E8 \uBE0C\uB79C\uB4DC \uB85C\uACE0, \uB124\uBE44\uAC8C\uC774\uC158 \uBA54\uB274 \uBC0F \uC720\uC800 \uCEE8\uD2B8\uB864\uC744 \uC81C\uACF5\uD558\uB294 \uAE00\uB85C\uBC8C \uD5E4\uB354",
      sourceFile: "components/ui/Navbar.tsx",
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uD558\uB2E8 \uD14C\uB450\uB9AC (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "activeText",
          label: "\uD65C\uC131 \uB9C1\uD06C \uC0C9\uC0C1 (Active Link Text)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "textColor",
          label: "\uAE30\uBCF8 \uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-700"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-none"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uD45C\uC900 \uC2A4\uD2F0\uD0A4 \uD5E4\uB354 (Standard Sticky)",
          $description: "\uD558\uB2E8 \uC605\uC740 \uBCF4\uB354\uC640 \uBE0C\uB79C\uB4DC \uB85C\uACE0\uB97C \uD3EC\uD568\uD558\uB294 \uD074\uB798\uC2DD \uC0C1\uB2E8 \uB124\uBE44\uAC8C\uC774\uC158",
          variableRole: "primary",
          type: {
            id: "navbar-default",
            name: "\uD45C\uC900 \uC2A4\uD2F0\uD0A4 \uD5E4\uB354 (Standard Sticky)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            activeText: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            textColor: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            },
            borderRadius: {
              $value: "{palette.radius.none}",
              targetVariable: "--atom-radius-none"
            }
          }
        },
        floating: {
          name: "\uD50C\uB85C\uD305 \uB77C\uC6B4\uB4DC \uBC14 (Floating Pill)",
          $description: "\uB79C\uB529 \uD398\uC774\uC9C0\uB098 \uBAA8\uBC14\uC77C \uC6F9\uC5D0 \uC801\uD569\uD55C \uC644\uC804 \uB465\uADFC \uD50C\uB85C\uD305 \uD5E4\uB354",
          variableRole: "primary",
          type: {
            id: "navbar-floating",
            name: "\uD50C\uB85C\uD305 \uB77C\uC6B4\uB4DC \uBC14 (Floating Pill)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 floating \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            activeText: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            textColor: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            }
          }
        }
      }
    },
    sidebar: {
      name: "Sidebar & SideMenu (\uC0AC\uC774\uB4DC\uBC14 / \uC0AC\uC774\uB4DC\uBA54\uB274)",
      category: "Navigation",
      $description: "\uC88C\uCE21 \uACC4\uCE35 \uBA54\uB274, 2-Depth \uC544\uCF54\uB514\uC5B8 \uC11C\uBE0C\uBA54\uB274(SidebarSubMenu), \uD504\uB85C\uC81D\uD2B8 \uC2A4\uC704\uCC98 \uBC0F \uC811\uAE30/\uD3BC\uCE58\uAE30\uB97C \uC81C\uACF5\uD558\uB294 \uC0AC\uC774\uB4DC \uB124\uBE44\uAC8C\uC774\uC158 \uC2DC\uC2A4\uD15C",
      sourceFile: "components/ui/Sidebar.tsx",
      properties: [
        {
          key: "background",
          label: "\uC0AC\uC774\uB4DC\uBC14 \uBC30\uACBD (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-50"
        },
        {
          key: "borderColor",
          label: "\uACBD\uACC4 \uD14C\uB450\uB9AC (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "activeBackground",
          label: "\uD65C\uC131 \uBA54\uB274 \uBC30\uACBD (Active BG)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "activeText",
          label: "\uD65C\uC131 \uBA54\uB274 \uD14D\uC2A4\uD2B8 (Active Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "textColor",
          label: "\uAE30\uBCF8 \uBA54\uB274 \uD14D\uC2A4\uD2B8 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-700"
        },
        {
          key: "borderRadius",
          label: "\uC544\uC774\uD15C \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-sm"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uD45C\uC900 \uC5D4\uD130\uD504\uB77C\uC774\uC988 (Standard Enterprise)",
          $description: "\uC88C\uCE21 \uACE0\uC815\uD615 \uACC4\uCE35 \uB124\uBE44\uAC8C\uC774\uC158 \uBC0F \uC138\uB828\uB41C \uC194\uB9AC\uB4DC \uD65C\uC131 \uD558\uC774\uB77C\uC774\uD2B8",
          variableRole: "primary",
          type: {
            id: "sidebar-default",
            name: "\uD45C\uC900 \uC5D4\uD130\uD504\uB77C\uC774\uC988 (Standard Enterprise)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            activeBackground: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            activeText: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            textColor: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            }
          }
        },
        pills: {
          name: "\uC54C\uC57D\uD615 \uB77C\uC6B4\uB4DC \uBA54\uB274 (Pills Highlight)",
          $description: "\uB465\uADFC \uC54C\uC57D\uD615 \uBA54\uB274 \uC544\uC774\uD15C \uACE1\uB960\uACFC \uD604\uB300\uC801\uC778 \uC5EC\uBC31 \uC2A4\uD0C0\uC77C",
          variableRole: "primary",
          type: {
            id: "sidebar-pills",
            name: "\uC54C\uC57D\uD615 \uB77C\uC6B4\uB4DC \uBA54\uB274 (Pills Highlight)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 pills \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            activeBackground: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            activeText: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            textColor: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            }
          }
        },
        bordered: {
          name: "\uC88C\uCE21 \uC561\uC13C\uD2B8 \uBCF4\uB354 (Accent Border)",
          $description: "\uC88C\uCE21 \uC138\uB85C \uAC15\uC870 \uBCF4\uB354\uC640 \uC605\uC740 \uBC30\uACBD\uC758 \uD3EC\uBA40\uD55C \uC0AC\uC774\uB4DC\uBC14 \uC2A4\uD0C0\uC77C",
          variableRole: "primary",
          type: {
            id: "sidebar-bordered",
            name: "\uC88C\uCE21 \uC561\uC13C\uD2B8 \uBCF4\uB354 (Accent Border)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 bordered \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            activeBackground: {
              $value: "{palette.color.blue.50}",
              targetVariable: "--atom-palette-blue-50"
            },
            activeText: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            textColor: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            }
          }
        },
        floating: {
          name: "\uD50C\uB85C\uD305 \uCE74\uB4DC \uC0AC\uC774\uB4DC\uBC14 (Floating Card)",
          $description: "\uBC30\uACBD\uACFC \uBD84\uB9AC\uB41C \uB3C5\uB9BD \uCE74\uB4DC \uD615\uD0DC\uC758 \uBAA8\uB358 \uC0AC\uC774\uB4DC\uBC14",
          variableRole: "primary",
          type: {
            id: "sidebar-floating",
            name: "\uD50C\uB85C\uD305 \uCE74\uB4DC \uC0AC\uC774\uB4DC\uBC14 (Floating Card)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 floating \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            activeBackground: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            activeText: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            textColor: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            },
            borderRadius: {
              $value: "{palette.radius.lg}",
              targetVariable: "--atom-radius-lg"
            }
          }
        }
      }
    },
    nav: {
      name: "Nav & NavItem (\uC720\uB2C8\uBC84\uC124 \uD0D0\uC0C9)",
      category: "Navigation",
      $description: "\uD654\uBA74 \uB0B4 \uD0ED, \uC54C\uC57D\uD615 \uD544\uD130, \uC138\uADF8\uBA3C\uD2B8 \uBD84\uD560 \uBC14 \uB4F1 \uB2E4\uBAA9\uC801 \uBA54\uB274\uB97C \uAD6C\uC131\uD558\uB294 \uD0D0\uC0C9 \uC6D0\uC790 (Nav, NavItem, NavLink)",
      sourceFile: "components/ui/Nav.tsx",
      properties: [
        {
          key: "activeBackground",
          label: "\uD65C\uC131 \uC544\uC774\uD15C \uBC30\uACBD (Active BG)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "activeText",
          label: "\uD65C\uC131 \uC544\uC774\uD15C \uD14D\uC2A4\uD2B8 (Active Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "textColor",
          label: "\uAE30\uBCF8 \uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-600"
        },
        {
          key: "borderRadius",
          label: "\uC544\uC774\uD15C \uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-sm"
        },
        {
          key: "paddingX",
          label: "\uAC00\uB85C \uD328\uB529 (Padding X)",
          category: "spacing",
          defaultPaletteId: "--atom-space-3"
        },
        {
          key: "paddingY",
          label: "\uC138\uB85C \uD328\uB529 (Padding Y)",
          category: "spacing",
          defaultPaletteId: "--atom-space-1"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        pills: {
          name: "\uC54C\uC57D\uD615 \uD544\uD130 (Pills)",
          $description: "\uCE74\uD14C\uACE0\uB9AC \uC120\uD0DD \uBC0F \uD544\uD130\uB9C1\uC5D0 \uC801\uD569\uD55C \uC54C\uC57D\uD615 \uB124\uBE44\uAC8C\uC774\uC158",
          variableRole: "primary",
          type: {
            id: "nav-pills",
            name: "\uC54C\uC57D\uD615 \uD544\uD130 (Pills)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 pills \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            activeBackground: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            activeText: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            textColor: {
              $value: "{palette.color.gray.600}",
              targetVariable: "--atom-palette-gray-600"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            },
            paddingX: {
              $value: "{palette.spacing.3}",
              targetVariable: "--atom-space-3"
            },
            paddingY: {
              $value: "{palette.spacing.1}",
              targetVariable: "--atom-space-1"
            }
          }
        },
        segmented: {
          name: "\uC138\uADF8\uBA3C\uD2B8 \uCEE8\uD2B8\uB864 (Segmented)",
          $description: "\uBC15\uC2A4\uD615 \uBD84\uD560 \uD1A0\uAE00 \uCEE8\uD2B8\uB864 \uC2A4\uD0C0\uC77C \uB124\uBE44\uAC8C\uC774\uC158",
          variableRole: "primary",
          type: {
            id: "nav-segmented",
            name: "\uC138\uADF8\uBA3C\uD2B8 \uCEE8\uD2B8\uB864 (Segmented)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 segmented \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            activeBackground: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            activeText: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            textColor: {
              $value: "{palette.color.gray.600}",
              targetVariable: "--atom-palette-gray-600"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            },
            paddingX: {
              $value: "{palette.spacing.3}",
              targetVariable: "--atom-space-3"
            },
            paddingY: {
              $value: "{palette.spacing.1}",
              targetVariable: "--atom-space-1"
            }
          }
        },
        default: {
          name: "\uAE30\uBCF8 \uD14D\uC2A4\uD2B8 \uB9C1\uD06C (Default)",
          $description: "\uC0C1\uB2E8 \uBC14\uB098 \uC11C\uBE0C\uBA54\uB274\uC758 \uAE30\uBCF8 \uD14D\uC2A4\uD2B8 \uB9C1\uD06C \uB124\uBE44\uAC8C\uC774\uC158",
          variableRole: "primary",
          type: {
            id: "nav-default",
            name: "\uAE30\uBCF8 \uD14D\uC2A4\uD2B8 \uB9C1\uD06C (Default)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            activeBackground: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            activeText: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            textColor: {
              $value: "{palette.color.gray.600}",
              targetVariable: "--atom-palette-gray-600"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            },
            paddingX: {
              $value: "{palette.spacing.3}",
              targetVariable: "--atom-space-3"
            },
            paddingY: {
              $value: "{palette.spacing.1}",
              targetVariable: "--atom-space-1"
            }
          }
        },
        tabs: {
          name: "\uC5B8\uB354\uB77C\uC778 \uD0ED (Tabs)",
          $description: "\uD558\uB2E8 \uACBD\uACC4 \uBCF4\uB354\uC640 \uD65C\uC131 \uBC11\uC904 \uD558\uC774\uB77C\uC774\uD2B8",
          variableRole: "primary",
          type: {
            id: "nav-tabs",
            name: "\uC5B8\uB354\uB77C\uC778 \uD0ED (Tabs)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 tabs \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            activeBackground: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            activeText: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            textColor: {
              $value: "{palette.color.gray.600}",
              targetVariable: "--atom-palette-gray-600"
            },
            borderRadius: {
              $value: "{palette.radius.none}",
              targetVariable: "--atom-radius-none"
            },
            paddingX: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            paddingY: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            }
          }
        }
      }
    },
    checkbox: {
      name: "Checkbox (\uCCB4\uD06C\uBC15\uC2A4)",
      category: "Form",
      $description: "\uB2E8\uC77C \uB610\uB294 \uB2E4\uC911 \uD56D\uBAA9 \uC120\uD0DD\uC744 \uC704\uD55C \uC811\uADFC\uC131 \uC900\uC218 \uCCB4\uD06C\uBC15\uC2A4",
      sourceFile: "components/ui/Checkbox.tsx",
      properties: [
        {
          key: "checkedBackground",
          label: "\uC120\uD0DD \uC2DC \uBC30\uACBD (Checked BG)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-300"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-sm"
        },
        {
          key: "textColor",
          label: "\uB77C\uBCA8 \uD14D\uC2A4\uD2B8 (Label Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-800"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uD45C\uC900 \uC0AC\uAC01 \uCCB4\uD06C\uBC15\uC2A4 (Default)",
          $description: "\uC791\uC740 \uACE1\uB960\uC758 \uD45C\uC900 \uCCB4\uD06C\uBC15\uC2A4",
          variableRole: "primary",
          type: {
            id: "checkbox-default",
            name: "\uD45C\uC900 \uC0AC\uAC01 \uCCB4\uD06C\uBC15\uC2A4 (Default)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            checkedBackground: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            }
          }
        },
        rounded: {
          name: "\uC644\uC804 \uB465\uADFC \uCCB4\uD06C\uBC15\uC2A4 (Rounded)",
          $description: "\uC6D0\uD615\uC5D0 \uAC00\uAE4C\uC6B4 \uBD80\uB4DC\uB7EC\uC6B4 \uCCB4\uD06C\uBC15\uC2A4",
          variableRole: "primary",
          type: {
            id: "checkbox-rounded",
            name: "\uC644\uC804 \uB465\uADFC \uCCB4\uD06C\uBC15\uC2A4 (Rounded)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 rounded \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            checkedBackground: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            }
          }
        }
      }
    },
    select: {
      name: "Select (\uC120\uD0DD \uC0C1\uC790)",
      category: "Form",
      $description: "\uB4DC\uB86D\uB2E4\uC6B4 \uC635\uC158 \uC120\uD0DD\uC744 \uC81C\uACF5\uD558\uB294 \uB124\uC774\uD2F0\uBE0C \uC140\uB809\uD2B8 \uCEE8\uD2B8\uB864",
      sourceFile: "components/ui/Select.tsx",
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-300"
        },
        {
          key: "textColor",
          label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-800"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-sm"
        },
        {
          key: "padding",
          label: "\uD328\uB529 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-2"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uD45C\uC900 \uC140\uB809\uD2B8 (Default)",
          $description: "\uC785\uB825 \uD3FC\uC758 \uAE30\uBCF8 \uB4DC\uB86D\uB2E4\uC6B4 \uC0C1\uC790",
          variableRole: "primary",
          type: {
            id: "select-default",
            name: "\uD45C\uC900 \uC140\uB809\uD2B8 (Default)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            },
            padding: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            }
          }
        }
      }
    },
    radio: {
      name: "Radio (\uB77C\uB514\uC624 \uBC84\uD2BC)",
      category: "Form",
      $description: "\uB2E8\uC77C \uBC30\uD0C0\uC801 \uD56D\uBAA9 \uC120\uD0DD\uC744 \uC704\uD55C \uC6D0\uD615 \uB77C\uB514\uC624 \uC778\uB514\uCF00\uC774\uD130",
      sourceFile: "components/ui/Radio.tsx",
      properties: [
        {
          key: "activeColor",
          label: "\uD65C\uC131 \uC0C9\uC0C1 (Active Color)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-300"
        },
        {
          key: "textColor",
          label: "\uB77C\uBCA8 \uD14D\uC2A4\uD2B8 (Label Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-800"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uD45C\uC900 \uB77C\uB514\uC624 (Default)",
          $description: "\uAE30\uBCF8 \uB2E8\uC77C \uC120\uD0DD \uC6D0\uD615 \uB77C\uB514\uC624 \uBC84\uD2BC",
          variableRole: "primary",
          type: {
            id: "radio-default",
            name: "\uD45C\uC900 \uB77C\uB514\uC624 (Default)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            activeColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            }
          }
        }
      }
    },
    slider: {
      name: "Slider (\uBC94\uC704 \uC2AC\uB77C\uC774\uB354)",
      category: "Form",
      $description: "\uC5F0\uC18D\uC801 \uBC94\uC704 \uAC12 \uC870\uC808\uC744 \uC704\uD55C \uC2AC\uB77C\uC774\uB354 \uBC14",
      sourceFile: "components/ui/Slider.tsx",
      properties: [
        {
          key: "trackBackground",
          label: "\uD2B8\uB799 \uBC30\uACBD (Track BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "activeTrack",
          label: "\uD65C\uC131 \uD2B8\uB799 (Active Track)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "thumbBackground",
          label: "\uD578\uB4E4 \uC0C9\uC0C1 (Thumb BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "thumbBorder",
          label: "\uD578\uB4E4 \uD14C\uB450\uB9AC (Thumb Border)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uD45C\uC900 \uC2AC\uB77C\uC774\uB354 (Default)",
          $description: "\uAE30\uBCF8 \uB2E8\uC77C \uD578\uB4E4 \uC218\uD3C9 \uC2AC\uB77C\uC774\uB354",
          variableRole: "primary",
          type: {
            id: "slider-default",
            name: "\uD45C\uC900 \uC2AC\uB77C\uC774\uB354 (Default)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            trackBackground: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            activeTrack: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            thumbBackground: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            thumbBorder: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            }
          }
        }
      }
    },
    progress: {
      name: "Progress (\uC9C4\uD589 \uC0C1\uD0DC \uBC14)",
      category: "Feedback",
      $description: "\uC791\uC5C5 \uC9C4\uD589\uB960 \uBC0F \uD37C\uC13C\uD2F0\uC9C0\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uC778\uB514\uCF00\uC774\uD130",
      sourceFile: "components/ui/Progress.tsx",
      properties: [
        {
          key: "background",
          label: "\uD2B8\uB799 \uBC30\uACBD (Track BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "fillColor",
          label: "\uC9C4\uD589 \uC0C9\uC0C1 (Fill Color)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-full"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uAE30\uBCF8 \uC9C4\uD589 \uBC14 (Default)",
          $description: "\uBE0C\uB79C\uB4DC \uBA54\uC778 \uCEEC\uB7EC\uC758 \uC9C4\uD589 \uBC14",
          variableRole: "primary",
          type: {
            id: "progress-default",
            name: "\uAE30\uBCF8 \uC9C4\uD589 \uBC14 (Default)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            fillColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            }
          }
        },
        success: {
          name: "\uC644\uB8CC \uC9C4\uD589 \uBC14 (Success)",
          $description: "\uC131\uACF5 \uC0C1\uD0DC \uB179\uC0C9 \uC9C4\uD589 \uBC14",
          variableRole: "success",
          type: {
            id: "progress-success",
            name: "\uC644\uB8CC \uC9C4\uD589 \uBC14 (Success)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 success \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "success",
            label: "\uC131\uACF5/\uC644\uB8CC (Success)",
            meaning: "\uCD08\uB85D\uC740 \uC131\uACF5! \uACB0\uC81C \uC644\uB8CC, \uC815\uC0C1 \uAC00\uB3D9, \uB370\uC774\uD130 \uC800\uC7A5 \uC644\uB8CC \uB4F1 \uAE0D\uC815\uC801 \uACB0\uACFC\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            fillColor: {
              $value: "{palette.color.emerald.500}",
              targetVariable: "--atom-palette-emerald-500"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            }
          }
        }
      }
    },
    skeleton: {
      name: "Skeleton (\uC2A4\uCF08\uB808\uD1A4 \uB85C\uB354)",
      category: "Feedback",
      $description: "\uCF58\uD150\uCE20 \uB85C\uB529 \uC911 \uB808\uC774\uC544\uC6C3 \uC26C\uD504\uD2B8\uB97C \uBC29\uC9C0\uD558\uB294 \uD384\uC2A4 \uD50C\uB808\uC774\uC2A4\uD640\uB354",
      sourceFile: "components/ui/Skeleton.tsx",
      properties: [
        {
          key: "background",
          label: "\uBCA0\uC774\uC2A4 \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-sm"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uD14D\uC2A4\uD2B8 \uC2A4\uCF08\uB808\uD1A4 (Text Line)",
          $description: "\uC77C\uBC18 \uD14D\uC2A4\uD2B8 \uB77C\uC778 \uD50C\uB808\uC774\uC2A4\uD640\uB354",
          variableRole: "primary",
          type: {
            id: "skeleton-default",
            name: "\uD14D\uC2A4\uD2B8 \uC2A4\uCF08\uB808\uD1A4 (Text Line)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            }
          }
        },
        circle: {
          name: "\uC6D0\uD615 \uC2A4\uCF08\uB808\uD1A4 (Circle Avatar)",
          $description: "\uC544\uBC14\uD0C0 \uBC0F \uC544\uC774\uCF58\uC6A9 \uC6D0\uD615 \uD50C\uB808\uC774\uC2A4\uD640\uB354",
          variableRole: "primary",
          type: {
            id: "skeleton-circle",
            name: "\uC6D0\uD615 \uC2A4\uCF08\uB808\uD1A4 (Circle Avatar)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 circle \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            }
          }
        }
      }
    },
    tooltip: {
      name: "Tooltip (\uD234\uD301 \uB9D0\uD48D\uC120)",
      category: "Feedback",
      $description: "\uB9C8\uC6B0\uC2A4 \uD638\uBC84 \uB610\uB294 \uD3EC\uCEE4\uC2A4 \uC2DC \uBD80\uAC00 \uC124\uBA85\uC744 \uB744\uC6CC\uC8FC\uB294 \uD31D\uC624\uBC84",
      sourceFile: "components/ui/Tooltip.tsx",
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-900"
        },
        {
          key: "textColor",
          label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-sm"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uB2E4\uD06C \uD234\uD301 (Dark)",
          $description: "\uACE0\uB300\uBE44 \uC5B4\uB450\uC6B4 \uBC30\uACBD\uC758 \uB9D0\uD48D\uC120",
          variableRole: "primary",
          type: {
            id: "tooltip-default",
            name: "\uB2E4\uD06C \uD234\uD301 (Dark)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            textColor: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            }
          }
        },
        light: {
          name: "\uB77C\uC774\uD2B8 \uD234\uD301 (Light)",
          $description: "\uBC1D\uC740 \uBC30\uACBD\uACFC \uC605\uC740 \uBCF4\uB354\uC758 \uB9D0\uD48D\uC120",
          variableRole: "primary",
          type: {
            id: "tooltip-light",
            name: "\uB77C\uC774\uD2B8 \uD234\uD301 (Light)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 light \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            }
          }
        }
      }
    },
    accordion: {
      name: "Accordion (\uC544\uCF54\uB514\uC5B8 \uC811\uAE30)",
      category: "Data",
      $description: "FAQ \uBC0F \uBB38\uC11C\uC758 \uC139\uC158\uBCC4 \uC811\uAE30/\uD3BC\uCE58\uAE30 \uC778\uD130\uB799\uD2F0\uBE0C \uCEF4\uD3EC\uB10C\uD2B8",
      sourceFile: "components/ui/Accordion.tsx",
      properties: [
        {
          key: "borderColor",
          label: "\uAD6C\uBD84\uC120 \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "textColor",
          label: "\uD5E4\uB354 \uD14D\uC2A4\uD2B8 (Header Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-900"
        },
        {
          key: "contentColor",
          label: "\uBCF8\uBB38 \uD14D\uC2A4\uD2B8 (Content Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-600"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uD074\uB798\uC2DD \uC5B8\uB354\uB77C\uC778 (Default)",
          $description: "\uD558\uB2E8 \uAD6C\uBD84\uC120\uB9CC \uC788\uB294 \uAE54\uB054\uD55C \uC544\uCF54\uB514\uC5B8",
          variableRole: "primary",
          type: {
            id: "accordion-default",
            name: "\uD074\uB798\uC2DD \uC5B8\uB354\uB77C\uC778 (Default)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            contentColor: {
              $value: "{palette.color.gray.600}",
              targetVariable: "--atom-palette-gray-600"
            }
          }
        }
      }
    },
    breadcrumb: {
      name: "Breadcrumb (\uACBD\uB85C \uD0D0\uC0C9)",
      category: "Navigation",
      $description: "\uD398\uC774\uC9C0 \uACC4\uCE35 \uAD6C\uC870\uC640 \uD604\uC7AC \uC704\uCE58\uB97C \uD45C\uC2DC\uD558\uB294 \uACBD\uB85C \uD45C\uC2DC\uAE30",
      sourceFile: "components/ui/Breadcrumb.tsx",
      properties: [
        {
          key: "textColor",
          label: "\uB9C1\uD06C \uD14D\uC2A4\uD2B8 (Link Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-500"
        },
        {
          key: "activeColor",
          label: "\uD604\uC7AC \uC704\uCE58 (Active Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-900"
        },
        {
          key: "separatorColor",
          label: "\uAD6C\uBD84\uC790 \uC0C9\uC0C1 (Separator)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-400"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uD45C\uC900 \uBE0C\uB808\uB4DC\uD06C\uB7FC (Default)",
          $description: "\uC2AC\uB798\uC2DC(/) \uAD6C\uBD84\uC790\uB97C \uD3EC\uD568\uD55C \uD14D\uC2A4\uD2B8 \uACBD\uB85C",
          variableRole: "primary",
          type: {
            id: "breadcrumb-default",
            name: "\uD45C\uC900 \uBE0C\uB808\uB4DC\uD06C\uB7FC (Default)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            textColor: {
              $value: "{palette.color.gray.500}",
              targetVariable: "--atom-palette-gray-500"
            },
            activeColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            separatorColor: {
              $value: "{palette.color.gray.400}",
              targetVariable: "--atom-palette-gray-400"
            }
          }
        }
      }
    },
    pagination: {
      name: "Pagination (\uD398\uC774\uC9C0\uB124\uC774\uC158)",
      category: "Navigation",
      $description: "\uB300\uC6A9\uB7C9 \uB370\uC774\uD130 \uBAA9\uB85D \uD0D0\uC0C9\uC744 \uC704\uD55C \uD398\uC774\uC9C0 \uC774\uB3D9 \uCEE8\uD2B8\uB864\uB7EC",
      sourceFile: "components/ui/Pagination.tsx",
      properties: [
        {
          key: "activeBackground",
          label: "\uD65C\uC131 \uD398\uC774\uC9C0 \uBC30\uACBD (Active BG)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "activeText",
          label: "\uD65C\uC131 \uD398\uC774\uC9C0 \uD14D\uC2A4\uD2B8 (Active Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "textColor",
          label: "\uAE30\uBCF8 \uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-700"
        },
        {
          key: "borderRadius",
          label: "\uBC84\uD2BC \uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-sm"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uC0AC\uAC01 \uD398\uC774\uC9C0\uB124\uC774\uC158 (Default)",
          $description: "\uC791\uC740 \uACE1\uB960\uC758 \uAE30\uBCF8 \uD398\uC774\uC9C0 \uBC88\uD638 \uBC84\uD2BC",
          variableRole: "primary",
          type: {
            id: "pagination-default",
            name: "\uC0AC\uAC01 \uD398\uC774\uC9C0\uB124\uC774\uC158 (Default)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            activeBackground: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            activeText: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            textColor: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            }
          }
        },
        rounded: {
          name: "\uC6D0\uD615 \uD398\uC774\uC9C0\uB124\uC774\uC158 (Rounded)",
          $description: "\uC644\uC804 \uB465\uADFC \uC6D0\uD615 \uD398\uC774\uC9C0 \uBC88\uD638 \uBC84\uD2BC",
          variableRole: "primary",
          type: {
            id: "pagination-rounded",
            name: "\uC6D0\uD615 \uD398\uC774\uC9C0\uB124\uC774\uC158 (Rounded)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 rounded \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            activeBackground: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            activeText: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            textColor: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            },
            borderRadius: {
              $value: "{palette.radius.full}",
              targetVariable: "--atom-radius-full"
            }
          }
        }
      }
    },
    separator: {
      name: "Separator (\uAD6C\uBD84\uC120)",
      category: "Layout",
      $description: "\uCF58\uD150\uCE20 \uC601\uC5ED\uC744 \uC2DC\uAC01\uC801\uC73C\uB85C \uBD84\uB9AC\uD558\uB294 \uC218\uD3C9 \uB610\uB294 \uC218\uC9C1 \uB514\uBC14\uC774\uB354",
      sourceFile: "components/ui/Separator.tsx",
      properties: [
        {
          key: "color",
          label: "\uAD6C\uBD84\uC120 \uC0C9\uC0C1 (Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        horizontal: {
          name: "\uC218\uD3C9\uC120 (Horizontal)",
          $description: "\uB108\uBE44 100%\uC758 \uAE30\uBCF8 \uAC00\uB85C \uAD6C\uBD84\uC120",
          variableRole: "primary",
          type: {
            id: "separator-horizontal",
            name: "\uC218\uD3C9\uC120 (Horizontal)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 horizontal \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            color: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            }
          }
        }
      }
    },
    calendar: {
      name: "Calendar (\uB2EC\uB825)",
      category: "Data",
      $description: "\uB0A0\uC9DC \uC120\uD0DD \uBC0F \uC6D4\uAC04 \uBDF0\uB97C \uC81C\uACF5\uD558\uB294 \uC778\uD130\uB799\uD2F0\uBE0C \uCE98\uB9B0\uB354",
      sourceFile: "components/ui/Calendar.tsx",
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "selectedBackground",
          label: "\uC120\uD0DD \uB0A0\uC9DC \uBC30\uACBD (Selected BG)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "selectedText",
          label: "\uC120\uD0DD \uB0A0\uC9DC \uD14D\uC2A4\uD2B8 (Selected Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "textColor",
          label: "\uC77C\uBC18 \uB0A0\uC9DC \uD14D\uC2A4\uD2B8 (Day Text)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-800"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-md"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uD45C\uC900 \uB2EC\uB825 (Default)",
          $description: "\uD5E4\uB354\uC640 \uC694\uC77C \uADF8\uB9AC\uB4DC\uB97C \uD3EC\uD568\uD55C \uAE30\uBCF8 \uB2EC\uB825 \uBDF0",
          variableRole: "primary",
          type: {
            id: "calendar-default",
            name: "\uD45C\uC900 \uB2EC\uB825 (Default)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            selectedBackground: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            selectedText: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            }
          }
        }
      }
    },
    chart: {
      name: "Chart (\uCC28\uD2B8)",
      category: "Data",
      $description: "\uB77C\uC778, \uBC14, \uC601\uC5ED \uADF8\uB798\uD504\uB97C \uD1B5\uD574 \uC2DC\uACC4\uC5F4 \uB370\uC774\uD130\uC640 \uC2E4\uC801 \uC9C0\uD45C\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uCC28\uD2B8 \uCEF4\uD3EC\uB10C\uD2B8",
      sourceFile: "components/ui/Chart.tsx",
      properties: [
        {
          key: "strokeColor",
          label: "\uCC28\uD2B8 \uC120 \uC0C9\uC0C1 (Stroke Color)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "fillColor",
          label: "\uC601\uC5ED \uCC44\uC6B0\uAE30 \uC0C9\uC0C1 (Fill Color)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "gridColor",
          label: "\uADF8\uB9AC\uB4DC \uB77C\uC778 \uC0C9\uC0C1 (Grid Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "hoverColor",
          label: "\uD638\uBC84 \uD3EC\uC778\uD2B8 \uC0C9\uC0C1 (Hover Point)",
          category: "color",
          defaultPaletteId: "--atom-color-primary-hover"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-md"
        },
        {
          key: "padding",
          label: "\uB0B4\uBD80 \uD328\uB529 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-4"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        primary: {
          name: "\uB77C\uC778 \uD2B8\uB80C\uB4DC \uCC28\uD2B8 (Line Trend)",
          $description: "\uC2DC\uACC4\uC5F4 \uB370\uC774\uD130\uC758 \uCD94\uC138\uB97C \uBA85\uD655\uD558\uAC8C \uBCF4\uC5EC\uC8FC\uB294 \uB300\uD45C \uB77C\uC778 \uCC28\uD2B8",
          variableRole: "primary",
          type: {
            id: "trend-tracking",
            name: "\uC2DC\uACC4\uC5F4 \uCD94\uC138 \uCD94\uC801 (TimeSeries Trend)",
            whenToUse: "\uC8FC\uAC00, \uC628\uB3C4, \uC131\uB2A5 \uC9C0\uD45C \uB4F1 \uC2DC\uAC04 \uD750\uB984\uC5D0 \uB530\uB978 \uC5F0\uC18D\uC801 \uB370\uC774\uD130 \uBCC0\uD654\uB97C \uBAA8\uB2C8\uD130\uB9C1\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            strokeColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            fillColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            gridColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            hoverColor: {
              $value: "{theme.semantic.primary.hover}",
              targetVariable: "--atom-color-primary-hover"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        },
        "area-volume": {
          name: "\uB204\uC801 \uC601\uC5ED \uCC28\uD2B8 (Area Volume)",
          $description: "\uD558\uB2E8 \uADF8\uB77C\uB370\uC774\uC158 \uCC44\uC6B0\uAE30\uB97C \uD1B5\uD574 \uBCFC\uB968\uAC10\uACFC \uCD94\uC138\uB97C \uB3D9\uC2DC\uC5D0 \uD45C\uD604\uD558\uB294 \uC601\uC5ED \uCC28\uD2B8",
          variableRole: "primary",
          type: {
            id: "volume-trend",
            name: "\uB204\uC801 \uBCFC\uB968 \uCD94\uC138 (Cumulative Volume)",
            whenToUse: "\uD2B8\uB798\uD53D \uB204\uC801\uB7C9, \uCD1D \uAC70\uB798\uC561 \uB4F1 \uBA74\uC801\uACFC \uBCFC\uB968\uAC10\uC744 \uD568\uAED8 \uAC15\uC870\uD574\uC57C \uD558\uB294 \uC9C0\uD45C\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            strokeColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            fillColor: {
              $value: "{palette.color.blue.500}",
              targetVariable: "--atom-palette-blue-500"
            },
            gridColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            hoverColor: {
              $value: "{theme.semantic.primary.hover}",
              targetVariable: "--atom-color-primary-hover"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        },
        success: {
          name: "\uC0C1\uC2B9 \uC9C0\uD45C \uCC28\uD2B8 (Success Trend)",
          $description: "\uC8FC\uAC00 \uC0C1\uC2B9, \uC218\uC775\uB960 \uC99D\uAC00, \uAE0D\uC815\uC801 \uC9C0\uD45C\uB97C \uB098\uD0C0\uB0B4\uB294 \uC5D0\uBA54\uB784\uB4DC \uADF8\uB9B0 \uCC28\uD2B8",
          variableRole: "success",
          type: {
            id: "growth-metric",
            name: "\uC131\uC7A5 \uC9C0\uD45C \uD2B8\uB80C\uB4DC (Growth Metric)",
            whenToUse: "\uB9E4\uCD9C \uC131\uC7A5, \uD65C\uC131 \uC0AC\uC6A9\uC790 \uC99D\uAC00, \uBAA9\uD45C \uB2EC\uC131 \uB4F1 \uAE0D\uC815\uC801 \uC131\uACFC\uB97C \uC2DC\uAC01\uD654\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "success",
            label: "\uC131\uACF5/\uC644\uB8CC (Success)",
            meaning: "\uCD08\uB85D\uC740 \uC131\uACF5! \uACB0\uC81C \uC644\uB8CC, \uC815\uC0C1 \uAC00\uB3D9, \uB370\uC774\uD130 \uC800\uC7A5 \uC644\uB8CC \uB4F1 \uAE0D\uC815\uC801 \uACB0\uACFC\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            strokeColor: {
              $value: "{theme.semantic.success}",
              targetVariable: "--atom-color-success"
            },
            fillColor: {
              $value: "{palette.color.emerald.500}",
              targetVariable: "--atom-palette-emerald-500"
            },
            gridColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            hoverColor: {
              $value: "{theme.semantic.success.hover}",
              targetVariable: "--atom-color-success-hover"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        },
        danger: {
          name: "\uC704\uD5D8/\uD558\uB77D \uC9C0\uD45C \uCC28\uD2B8 (Danger Alert)",
          $description: "\uC624\uB958 \uBC1C\uC0DD\uB960, \uC190\uC2E4 \uC9C0\uD45C, \uC784\uACC4\uCE58 \uCD08\uACFC\uB97C \uACBD\uACE0\uD558\uB294 \uB85C\uC988 \uB808\uB4DC \uCC28\uD2B8",
          variableRole: "danger",
          type: {
            id: "alert-metric",
            name: "\uC704\uD5D8/\uC190\uC2E4 \uACBD\uACE0 (Risk / Deficit Alert)",
            whenToUse: "\uC11C\uBC84 \uC7A5\uC560\uC728, \uC190\uC2E4\uC561 \uC99D\uAC00, \uBCD1\uBAA9 \uAD6C\uAC04 \uB4F1 \uC989\uAC01\uC801\uC778 \uC870\uCE58\uAC00 \uD544\uC694\uD55C \uC774\uC0C1 \uC9C0\uD45C\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "danger",
            label: "\uC704\uD5D8/\uC5D0\uB7EC (Danger / Destructive)",
            meaning: "\uBE68\uAC15\uC740 \uC704\uD5D8! \uC601\uAD6C \uC0AD\uC81C, \uACC4\uC57D \uD574\uC9C0, \uBCF5\uAD6C \uBD88\uAC00 \uC791\uC5C5 \uB4F1 \uCE58\uBA85\uC801 \uACB0\uACFC\uB97C \uACBD\uACE0\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            strokeColor: {
              $value: "{theme.semantic.danger}",
              targetVariable: "--atom-color-danger"
            },
            fillColor: {
              $value: "{palette.color.rose.500}",
              targetVariable: "--atom-palette-rose-500"
            },
            gridColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            hoverColor: {
              $value: "{theme.semantic.danger.hover}",
              targetVariable: "--atom-color-danger-hover"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        },
        "bar-metric": {
          name: "\uBC14 \uBE44\uAD50 \uCC28\uD2B8 (Bar Comparison)",
          $description: "\uD56D\uBAA9\uBCC4 \uC2E4\uC801\uC774\uB098 \uAE30\uAC04\uBCC4 \uC9D1\uACC4\uB97C \uC9C1\uAD00\uC801\uC73C\uB85C \uBE44\uAD50\uD558\uB294 \uB9C9\uB300 \uCC28\uD2B8",
          variableRole: "primary",
          type: {
            id: "category-comparison",
            name: "\uD56D\uBAA9\uBCC4 \uC2E4\uC801 \uBE44\uAD50 (Category Comparison)",
            whenToUse: "\uC6D4\uBCC4 \uC2E4\uC801\uC774\uB098 \uBD80\uC11C\uBCC4 \uB370\uC774\uD130 \uB4F1 \uCE74\uD14C\uACE0\uB9AC \uAC04\uC758 \uC218\uCE58\uB97C \uBA85\uD655\uD558\uAC8C \uB300\uC870\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            strokeColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            fillColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            gridColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            hoverColor: {
              $value: "{theme.semantic.primary.hover}",
              targetVariable: "--atom-color-primary-hover"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        }
      }
    },
    offcanvas: {
      name: "Offcanvas (\uC624\uD504\uCE94\uBC84\uC2A4 / \uC11C\uB78D)",
      category: "Layout",
      $description: "\uD654\uBA74 \uAC00\uC7A5\uC790\uB9AC\uC5D0\uC11C \uC2AC\uB77C\uC774\uB4DC\uB418\uC5B4 \uB098\uD0C0\uB098\uB294 \uC624\uD504\uCE94\uBC84\uC2A4 \uD328\uB110 \uBC0F \uC11C\uB78D\uD615 \uC624\uBC84\uB808\uC774",
      sourceFile: "components/ui/Offcanvas.tsx",
      properties: [
        {
          key: "background",
          label: "\uC11C\uD53C\uC2A4 \uBC30\uACBD\uC0C9 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "textColor",
          label: "\uBCF8\uBB38 \uD14D\uC2A4\uD2B8 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-800"
        },
        {
          key: "headerBackground",
          label: "\uD5E4\uB354 \uBC30\uACBD\uC0C9 (Header BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-50"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-lg"
        },
        {
          key: "padding",
          label: "\uB0B4\uBD80 \uD328\uB529 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-4"
        },
        {
          key: "hoverBackground",
          label: "\uD638\uBC84 \uBC30\uACBD\uC0C9 (Hover BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-50"
        },
        {
          key: "activeBackground",
          label: "\uD65C\uC131 \uBC30\uACBD\uC0C9 (Active BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-100"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        "right-drawer": {
          name: "\uC6B0\uCE21 \uC778\uC2A4\uD399\uD130 \uC11C\uB78D (Right Drawer)",
          $description: "\uB370\uC774\uD130 \uB9AC\uC2A4\uD2B8\uC5D0\uC11C \uD56D\uBAA9 \uC138\uBD80 \uC815\uBCF4 \uBC0F \uD3B8\uC9D1 \uD3FC\uC744 \uD45C\uC2DC\uD558\uB294 \uC6B0\uCE21 \uC0AC\uC774\uB4DC \uD328\uB110",
          variableRole: "primary",
          type: {
            id: "detail-inspector",
            name: "\uC0C1\uC138\uC815\uBCF4 \uC778\uC2A4\uD399\uD130 (Detail Inspector Drawer)",
            whenToUse: "\uD14C\uC774\uBE14\uC774\uB098 \uB9AC\uC2A4\uD2B8\uC758 \uD2B9\uC815 \uD56D\uBAA9\uC744 \uC120\uD0DD\uD588\uC744 \uB54C \uD604\uC7AC \uD654\uBA74 \uCEE8\uD14D\uC2A4\uD2B8\uB97C \uC720\uC9C0\uD55C \uCC44 \uC138\uBD80 \uC18D\uC131\uC744 \uAC80\uD1A0\uD558\uACE0 \uD3B8\uC9D1\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            headerBackground: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderRadius: {
              $value: "{palette.radius.lg}",
              targetVariable: "--atom-radius-lg"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            hoverBackground: {
              $value: "{palette.color.blue.50}",
              targetVariable: "--atom-palette-blue-50"
            },
            activeBackground: {
              $value: "{palette.color.blue.100}",
              targetVariable: "--atom-palette-blue-100"
            }
          }
        },
        "left-nav": {
          name: "\uC88C\uCE21 \uBAA8\uBC14\uC77C \uD0D0\uC0C9 \uC11C\uB78D (Left Navigation)",
          $description: "\uBAA8\uBC14\uC77C \uD658\uACBD\uC5D0\uC11C \uC0AC\uC774\uD2B8 \uC804\uCCB4 \uBA54\uB274 \uBC0F \uD504\uB85C\uD544 \uBC14\uB85C\uAC00\uAE30\uB97C \uC81C\uACF5\uD558\uB294 \uC88C\uCE21 \uC11C\uB78D",
          variableRole: "primary",
          type: {
            id: "mobile-navigation",
            name: "\uBAA8\uBC14\uC77C \uD0D0\uC0C9 \uC11C\uB78D (Mobile Navigation Drawer)",
            whenToUse: "\uBAA8\uBC14\uC77C \uBDF0\uD3EC\uD2B8\uB098 \uC881\uC740 \uD654\uBA74\uC5D0\uC11C \uAE00\uB85C\uBC8C \uB124\uBE44\uAC8C\uC774\uC158 \uBA54\uB274\uB97C \uC2AC\uB77C\uC774\uB4DC\uB85C \uC81C\uACF5\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            borderColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            textColor: {
              $value: "{palette.color.gray.100}",
              targetVariable: "--atom-palette-gray-100"
            },
            headerBackground: {
              $value: "{palette.color.gray.950}",
              targetVariable: "--atom-palette-gray-950"
            },
            borderRadius: {
              $value: "{palette.radius.lg}",
              targetVariable: "--atom-radius-lg"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            hoverBackground: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            activeBackground: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            }
          }
        },
        "bottom-sheet": {
          name: "\uD558\uB2E8 \uD544\uD130 \uC2DC\uD2B8 (Bottom Sheet)",
          $description: "\uBAA8\uBC14\uC77C \uBDF0\uD3EC\uD2B8 \uD558\uB2E8\uC5D0\uC11C \uC704\uB85C \uC62C\uB77C\uC624\uB294 \uD544\uD130 \uBC0F \uC561\uC158 \uC2DC\uD2B8 \uC624\uBC84\uB808\uC774",
          variableRole: "primary",
          type: {
            id: "bottom-filter-sheet",
            name: "\uD558\uB2E8 \uD544\uD130/\uC791\uC5C5 \uC2DC\uD2B8 (Bottom Filter Sheet)",
            whenToUse: "\uBAA8\uBC14\uC77C \uC5C4\uC9C0 \uC601\uC5ED\uC5D0 \uCD5C\uC801\uD654\uB41C \uD544\uD130 \uC124\uC815, \uC815\uB82C \uC635\uC158, \uBD80\uAC00 \uC791\uC5C5 \uC561\uC158\uC744 \uB178\uCD9C\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            headerBackground: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderRadius: {
              $value: "{palette.radius.xl}",
              targetVariable: "--atom-radius-xl"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            hoverBackground: {
              $value: "{palette.color.blue.50}",
              targetVariable: "--atom-palette-blue-50"
            },
            activeBackground: {
              $value: "{palette.color.blue.100}",
              targetVariable: "--atom-palette-blue-100"
            }
          }
        },
        "settings-panel": {
          name: "\uC124\uC815 \uC2AC\uB77C\uC774\uB4DC\uC624\uBC84 (Settings Panel)",
          $description: "\uC0AC\uC6A9\uC790 \uD658\uACBD\uC124\uC815, \uD14C\uB9C8 \uC635\uC158 \uBC0F \uC54C\uB9BC \uAD6C\uC131\uC744 \uC870\uC815\uD558\uB294 \uC2AC\uB77C\uC774\uB4DC \uD328\uB110",
          variableRole: "primary",
          type: {
            id: "settings-inspector",
            name: "\uD658\uACBD\uC124\uC815 \uC2AC\uB77C\uC774\uB4DC\uC624\uBC84 (Settings Slide-over)",
            whenToUse: "\uC0AC\uC6A9\uC790 \uD658\uACBD\uC124\uC815, \uD14C\uB9C8 \uC870\uC815, \uC2DC\uC2A4\uD15C \uD30C\uB77C\uBBF8\uD130 \uBCC0\uACBD \uB4F1 \uBCF4\uC870 \uC124\uC815 \uC791\uC5C5\uC744 \uBD84\uB9AC\uD558\uC5EC \uC81C\uACF5\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            headerBackground: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderRadius: {
              $value: "{palette.radius.lg}",
              targetVariable: "--atom-radius-lg"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            hoverBackground: {
              $value: "{palette.color.blue.50}",
              targetVariable: "--atom-palette-blue-50"
            },
            activeBackground: {
              $value: "{palette.color.blue.100}",
              targetVariable: "--atom-palette-blue-100"
            }
          }
        }
      }
    },
    toast: {
      name: "Toast (\uD1A0\uC2A4\uD2B8 \uC54C\uB9BC)",
      category: "Feedback",
      $description: "\uC791\uC5C5 \uACB0\uACFC \uD53C\uB4DC\uBC31 \uBC0F \uC0C1\uD0DC \uBCC0\uD654\uB97C \uD654\uBA74 \uAD6C\uC11D\uC5D0 \uC77C\uC2DC\uC801\uC73C\uB85C \uC54C\uB9AC\uB294 \uD50C\uB85C\uD305 \uD1A0\uC2A4\uD2B8 \uCEF4\uD3EC\uB10C\uD2B8",
      sourceFile: "components/ui/Toast.tsx",
      properties: [
        {
          key: "background",
          label: "\uC11C\uD53C\uC2A4 \uBC30\uACBD\uC0C9 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "textColor",
          label: "\uBCF8\uBB38 \uD14D\uC2A4\uD2B8 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-800"
        },
        {
          key: "iconColor",
          label: "\uC544\uC774\uCF58 \uC0C9\uC0C1 (Icon Color)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-md"
        },
        {
          key: "padding",
          label: "\uB0B4\uBD80 \uD328\uB529 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-4"
        },
        {
          key: "hoverBackground",
          label: "\uD638\uBC84 \uBC30\uACBD\uC0C9 (Hover BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-50"
        },
        {
          key: "activeBackground",
          label: "\uD65C\uC131 \uBC30\uACBD\uC0C9 (Active BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-100"
        }
      ],
      types: [
        {
          id: "default-type",
          name: "Standard (\uD45C\uC900 \uB514\uC790\uC778\uD615)",
          description: "\uAE30\uBCF8 \uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uAE30\uBC18\uD55C \uD45C\uC900 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uAD6C\uC131 \uBC0F \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined-type",
          name: "Outlined (\uC678\uACFD\uC120\uD615)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC911\uC2EC\uC73C\uB85C \uAC00\uBCCD\uAC8C \uACBD\uACC4\uB97C \uD45C\uD604\uD558\uB294 \uBCF4\uC870 \uB514\uC790\uC778 \uC591\uC2DD",
          whenToUse: "\uC8FC\uBCC0 \uCF58\uD150\uCE20\uC640\uC758 \uC2DC\uAC01\uC801 \uAC04\uC12D\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        info: {
          name: "\uC548\uB0B4 \uD1A0\uC2A4\uD2B8 (Info Toast)",
          $description: "\uC0C8\uB85C\uC6B4 \uC2DC\uC2A4\uD15C \uC54C\uB9BC\uC774\uB098 \uC77C\uBC18 \uC815\uBCF4\uB97C \uC804\uB2EC\uD558\uB294 \uBE14\uB8E8 \uD1A4\uC758 \uC548\uB0B4 \uD1A0\uC2A4\uD2B8",
          variableRole: "info",
          type: {
            id: "info-notification",
            name: "\uC77C\uBC18 \uC548\uB0B4 \uC54C\uB9BC (Informational Notification)",
            whenToUse: "\uC2DC\uC2A4\uD15C \uC5C5\uB370\uC774\uD2B8, \uD074\uB9BD\uBCF4\uB4DC \uBCF5\uC0AC \uC644\uB8CC, \uC0C8\uB85C\uC6B4 \uC54C\uB9BC \uC218\uC2E0 \uB4F1 \uC77C\uBC18\uC801\uC778 \uC0C1\uD0DC \uC815\uBCF4\uB97C \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uC548\uB0B4\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "info",
            label: "\uC548\uB0B4/\uC815\uBCF4 (Info)",
            meaning: "\uD30C\uB791\uC740 \uC548\uB0B4! \uC77C\uBC18 \uB3C4\uC6C0\uB9D0, \uC2E0\uADDC \uAE30\uB2A5 \uBC30\uC9C0 \uB4F1 \uC2DC\uC2A4\uD15C \uC815\uBCF4 \uACE0\uC9C0\uB97C \uB098\uD0C0\uB0B4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.blue.200}",
              targetVariable: "--atom-palette-blue-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            iconColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            hoverBackground: {
              $value: "{palette.color.blue.50}",
              targetVariable: "--atom-palette-blue-50"
            },
            activeBackground: {
              $value: "{palette.color.blue.100}",
              targetVariable: "--atom-palette-blue-100"
            }
          }
        },
        success: {
          name: "\uC131\uACF5 \uC644\uB8CC \uD1A0\uC2A4\uD2B8 (Success Toast)",
          $description: "\uC791\uC5C5\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC800\uC7A5\uB418\uAC70\uB098 \uC644\uB8CC\uB418\uC5C8\uC74C\uC744 \uC804\uB2EC\uD558\uB294 \uC5D0\uBA54\uB784\uB4DC \uD1A0\uC2A4\uD2B8",
          variableRole: "success",
          type: {
            id: "success-feedback",
            name: "\uC131\uACF5 \uC644\uB8CC \uD53C\uB4DC\uBC31 (Operation Success)",
            whenToUse: "\uB370\uC774\uD130 \uC800\uC7A5, \uC804\uC1A1 \uC644\uB8CC, \uD56D\uBAA9 \uC0DD\uC131 \uB4F1 \uC0AC\uC6A9\uC790\uC758 \uC791\uC5C5\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uCC98\uB9AC\uB418\uC5C8\uC74C\uC744 \uC2E0\uC18D\uD788 \uD53C\uB4DC\uBC31\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "success",
            label: "\uC131\uACF5/\uC644\uB8CC (Success)",
            meaning: "\uCD08\uB85D\uC740 \uC131\uACF5! \uACB0\uC81C \uC644\uB8CC, \uC815\uC0C1 \uAC00\uB3D9, \uB370\uC774\uD130 \uC800\uC7A5 \uC644\uB8CC \uB4F1 \uAE0D\uC815\uC801 \uACB0\uACFC\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.emerald.200}",
              targetVariable: "--atom-palette-emerald-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            iconColor: {
              $value: "{theme.semantic.success}",
              targetVariable: "--atom-color-success"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            hoverBackground: {
              $value: "{palette.color.emerald.50}",
              targetVariable: "--atom-palette-emerald-50"
            },
            activeBackground: {
              $value: "{palette.color.emerald.100}",
              targetVariable: "--atom-palette-emerald-100"
            }
          }
        },
        warning: {
          name: "\uC8FC\uC758 \uC694\uB9DD \uD1A0\uC2A4\uD2B8 (Warning Toast)",
          $description: "\uC138\uC158 \uB9CC\uB8CC\uB098 \uB124\uD2B8\uC6CC\uD06C \uBD88\uC548\uC815 \uB4F1 \uC8FC\uC758\uAC00 \uD544\uC694\uD55C \uC0C1\uD669\uC744 \uC54C\uB9AC\uB294 \uC570\uBC84 \uD1A0\uC2A4\uD2B8",
          variableRole: "warning",
          type: {
            id: "warning-alert",
            name: "\uC8FC\uC758 \uC694\uB9DD \uC54C\uB9BC (Warning Caution)",
            whenToUse: "\uB124\uD2B8\uC6CC\uD06C \uC9C0\uC5F0, \uC138\uC158 \uB9CC\uB8CC \uC784\uBC15, \uC800\uC7A5\uB418\uC9C0 \uC54A\uC740 \uBCC0\uACBD\uC0AC\uD56D \uB4F1 \uC8FC\uC758\uAC00 \uD544\uC694\uD55C \uBE44\uCE58\uBA85\uC801 \uC0C1\uD669\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "warning",
            label: "\uC8FC\uC758/\uACBD\uACE0 (Warning)",
            meaning: "\uB178\uB791\uC740 \uACBD\uACE0! \uC8FC\uC758 \uD658\uAE30, \uB9CC\uB8CC \uC784\uBC15, \uB300\uAE30/\uBCF4\uB958 \uB4F1 \uC0AC\uC6A9\uC790\uC758 \uCD94\uAC00 \uD655\uC778\uC774 \uD544\uC694\uD55C \uC0C1\uD669\uC744 \uC54C\uB9AC\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.amber.200}",
              targetVariable: "--atom-palette-amber-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            iconColor: {
              $value: "{theme.semantic.warning}",
              targetVariable: "--atom-color-warning"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            hoverBackground: {
              $value: "{palette.color.amber.50}",
              targetVariable: "--atom-palette-amber-50"
            },
            activeBackground: {
              $value: "{palette.color.amber.100}",
              targetVariable: "--atom-palette-amber-100"
            }
          }
        },
        danger: {
          name: "\uC624\uB958 \uACBD\uACE0 \uD1A0\uC2A4\uD2B8 (Danger Toast)",
          $description: "\uC694\uCCAD \uC2E4\uD328\uB098 \uC608\uC678 \uBC1C\uC0DD\uC744 \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uC989\uC2DC \uC804\uB2EC\uD558\uB294 \uB85C\uC988 \uB808\uB4DC \uD1A0\uC2A4\uD2B8",
          variableRole: "danger",
          type: {
            id: "error-alert",
            name: "\uC624\uB958 \uBC1C\uC0DD \uACBD\uACE0 (Error Alert)",
            whenToUse: "\uC694\uCCAD \uC2E4\uD328, \uC778\uC99D \uC624\uB958, \uC720\uD6A8\uC131 \uAC80\uC99D \uC2E4\uD328 \uB4F1 \uC989\uAC01\uC801\uC778 \uC7AC\uC2DC\uB3C4\uB098 \uD655\uC778\uC774 \uD544\uC694\uD55C \uAE34\uAE09 \uBB38\uC81C\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "danger",
            label: "\uC704\uD5D8/\uC5D0\uB7EC (Danger / Destructive)",
            meaning: "\uBE68\uAC15\uC740 \uC704\uD5D8! \uC601\uAD6C \uC0AD\uC81C, \uACC4\uC57D \uD574\uC9C0, \uBCF5\uAD6C \uBD88\uAC00 \uC791\uC5C5 \uB4F1 \uCE58\uBA85\uC801 \uACB0\uACFC\uB97C \uACBD\uACE0\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.rose.200}",
              targetVariable: "--atom-palette-rose-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            iconColor: {
              $value: "{theme.semantic.danger}",
              targetVariable: "--atom-color-danger"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            hoverBackground: {
              $value: "{palette.color.rose.50}",
              targetVariable: "--atom-palette-rose-50"
            },
            activeBackground: {
              $value: "{palette.color.rose.100}",
              targetVariable: "--atom-palette-rose-100"
            }
          }
        },
        "action-undo": {
          name: "\uC2E4\uD589 \uCDE8\uC18C \uC561\uC158 \uD1A0\uC2A4\uD2B8 (Action Undo Toast)",
          $description: "\uC0AD\uC81C\uB098 \uC774\uB3D9 \uC791\uC5C5\uC744 \uB418\uB3CC\uB9B4 \uC218 \uC788\uB294 \uC2E4\uD589 \uCDE8\uC18C \uBC84\uD2BC\uC774 \uD3EC\uD568\uB41C \uB2E4\uD06C \uBAA8\uB358 \uD1A0\uC2A4\uD2B8",
          variableRole: "primary",
          type: {
            id: "action-undo",
            name: "\uC561\uC158 \uC2E4\uD589 \uCDE8\uC18C (Action with Undo)",
            whenToUse: "\uD56D\uBAA9 \uC0AD\uC81C\uB098 \uC774\uB3D9 \uD6C4 \uC77C\uC815 \uC2DC\uAC04 \uB3D9\uC548 \uC0AC\uC6A9\uC790\uAC00 \uD574\uB2F9 \uC791\uC5C5\uC744 \uB418\uB3CC\uB9B4 \uC218 \uC788\uB294 Undo \uBC84\uD2BC\uC744 \uC81C\uACF5\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            borderColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            textColor: {
              $value: "{palette.color.gray.100}",
              targetVariable: "--atom-palette-gray-100"
            },
            iconColor: {
              $value: "{palette.color.blue.400}",
              targetVariable: "--atom-palette-blue-400"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            hoverBackground: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            activeBackground: {
              $value: "{palette.color.gray.700}",
              targetVariable: "--atom-palette-gray-700"
            }
          }
        }
      }
    },
    container: {
      name: "Container (\uCEE8\uD14C\uC774\uB108)",
      category: "Layout",
      $description: "\uD654\uBA74 \uB108\uBE44\uC5D0 \uB9DE\uCDB0 \uCD5C\uB300 \uD3ED\uACFC \uC88C\uC6B0 \uC5EC\uBC31(Gutter)\uC744 \uC77C\uC815\uD558\uAC8C \uC720\uC9C0\uD558\uB294 \uC911\uC2EC \uB808\uC774\uC544\uC6C3 \uB798\uD37C",
      sourceFile: "components/ui/Container.tsx",
      properties: [
        {
          key: "background",
          label: "\uCEE8\uD14C\uC774\uB108 \uBC30\uACBD\uC0C9 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uC678\uACFD\uC120 \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "textColor",
          label: "\uB0B4\uBD80 \uD14D\uC2A4\uD2B8 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-900"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-lg"
        },
        {
          key: "paddingX",
          label: "\uC88C\uC6B0 \uAC70\uD130 \uC5EC\uBC31 (Gutter X)",
          category: "spacing",
          defaultPaletteId: "--atom-space-6"
        },
        {
          key: "paddingY",
          label: "\uC0C1\uD558 \uD328\uB529 (Padding Y)",
          category: "spacing",
          defaultPaletteId: "--atom-space-4"
        }
      ],
      types: [
        {
          id: "boxed",
          name: "Boxed (\uD45C\uC900 \uC911\uC559 \uC815\uB82C \uCEE8\uD14C\uC774\uB108)",
          description: "\uCD5C\uB300 \uB108\uBE44(max-width)\uC640 \uC88C\uC6B0 \uAC70\uD130(gutter)\uB97C \uC720\uC9C0\uD558\uB294 \uD45C\uC900 \uD398\uC774\uC9C0 \uCEE8\uD14C\uC774\uB108",
          whenToUse: "\uB300\uBD80\uBD84\uC758 \uBCF8\uBB38 \uCF58\uD150\uCE20, \uB300\uC2DC\uBCF4\uB4DC, \uBB38\uC11C \uD398\uC774\uC9C0\uC758 \uAE30\uBCF8 \uB808\uC774\uC544\uC6C3 \uB798\uD37C\uB85C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "fluid",
          name: "Fluid (\uD480 \uC640\uC774\uB4DC \uCEE8\uD14C\uC774\uB108)",
          description: "\uD654\uBA74 \uC804\uCCB4 \uB108\uBE44\uB97C \uCC44\uC6B0\uBA70 \uC88C\uC6B0 \uC5EC\uBC31\uB9CC \uC720\uC9C0\uD558\uB294 \uD655\uC7A5\uD615 \uCEE8\uD14C\uC774\uB108",
          whenToUse: "\uB370\uC774\uD130 \uADF8\uB9AC\uB4DC, \uCE94\uBC84\uC2A4, \uC2A4\uD29C\uB514\uC624 \uB4F1 \uB113\uC740 \uC791\uC5C5 \uACF5\uAC04\uC774 \uD544\uC694\uD55C \uD654\uBA74\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "bordered",
          name: "Bordered (\uD14C\uB450\uB9AC \uC139\uC158 \uCEE8\uD14C\uC774\uB108)",
          description: "\uC678\uACFD\uC120\uACFC \uACE1\uB960\uC774 \uC801\uC6A9\uB418\uC5B4 \uB3C5\uB9BD\uB41C \uC139\uC158 \uAD6C\uD68D\uC744 \uD615\uC131\uD558\uB294 \uCE74\uB4DC\uD615 \uCEE8\uD14C\uC774\uB108",
          whenToUse: "\uC124\uC815 \uADF8\uB8F9, \uC694\uC57D \uD328\uB110 \uB4F1 \uC2DC\uAC01\uC801 \uACBD\uACC4\uAC00 \uD544\uC694\uD55C \uCEE8\uD14C\uC774\uB108\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "centered",
          name: "Centered (\uB0B4\uB85C\uC6B0 \uD3EC\uCEE4\uC2A4 \uCEE8\uD14C\uC774\uB108)",
          description: "\uC77D\uAE30 \uAC00\uB3C5\uC131\uC744 \uC704\uD574 \uC881\uC740 \uD3ED(sm/md)\uC73C\uB85C \uC911\uC559 \uC9D1\uC911 \uBC30\uCE58\uD55C \uCEE8\uD14C\uC774\uB108",
          whenToUse: "\uB85C\uADF8\uC778 \uD3FC, \uC544\uD2F0\uD074 \uBCF8\uBB38, \uCCB4\uD06C\uC544\uC6C3 \uB2E8\uACC4 \uB4F1\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        standard: {
          name: "\uD45C\uC900 \uCF58\uD150\uCE20 \uCEE8\uD14C\uC774\uB108 (Standard Boxed)",
          $description: "\uC77C\uBC18 \uBB38\uC11C \uBC0F \uB300\uC2DC\uBCF4\uB4DC \uBCF8\uBB38\uC744 \uAC10\uC2F8\uB294 \uAE30\uBCF8 1280px \uAE30\uC900 \uCEE8\uD14C\uC774\uB108",
          variableRole: "primary",
          type: {
            id: "container-standard",
            name: "\uD45C\uC900 \uCF58\uD150\uCE20 \uCEE8\uD14C\uC774\uB108 (Standard Boxed)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 standard \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            borderRadius: {
              $value: "{palette.radius.lg}",
              targetVariable: "--atom-radius-lg"
            },
            paddingX: {
              $value: "{palette.spacing.6}",
              targetVariable: "--atom-space-6"
            },
            paddingY: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        },
        surface: {
          name: "\uAC15\uC870 \uC11C\uD53C\uC2A4 \uCEE8\uD14C\uC774\uB108 (Subtle Surface)",
          $description: "\uD788\uC5B4\uB85C \uC139\uC158\uC774\uB098 \uC694\uC57D \uBE14\uB85D\uC744 \uAD6C\uBD84\uD558\uAE30 \uC704\uD574 \uBCF4\uC870 \uBC30\uACBD\uC0C9\uC774 \uC785\uD600\uC9C4 \uCEE8\uD14C\uC774\uB108",
          variableRole: "primary",
          type: {
            id: "container-surface",
            name: "\uAC15\uC870 \uC11C\uD53C\uC2A4 \uCEE8\uD14C\uC774\uB108 (Subtle Surface)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 surface \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            borderRadius: {
              $value: "{palette.radius.xl}",
              targetVariable: "--atom-radius-xl"
            },
            paddingX: {
              $value: "{palette.spacing.8}",
              targetVariable: "--atom-space-8"
            },
            paddingY: {
              $value: "{palette.spacing.6}",
              targetVariable: "--atom-space-6"
            }
          }
        },
        compact: {
          name: "\uBAA8\uBC14\uC77C\xB7\uB0B4\uB85C\uC6B0 \uCEE8\uD14C\uC774\uB108 (Compact Focused)",
          $description: "\uACB0\uC81C/\uB85C\uADF8\uC778 \uB4F1 \uB2E8\uC77C \uD0DC\uC2A4\uD06C \uC9D1\uC911\uC744 \uC704\uD55C \uCEF4\uD329\uD2B8 \uB108\uBE44 \uCEE8\uD14C\uC774\uB108",
          variableRole: "primary",
          type: {
            id: "container-compact",
            name: "\uBAA8\uBC14\uC77C\xB7\uB0B4\uB85C\uC6B0 \uCEE8\uD14C\uC774\uB108 (Compact Focused)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 compact \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.blue.200}",
              targetVariable: "--atom-palette-blue-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            paddingX: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            paddingY: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        }
      }
    },
    layout: {
      name: "Layout & Stack (\uB808\uC774\uC544\uC6C3 & \uC2A4\uD0DD)",
      category: "Layout",
      $description: "\uC694\uC18C \uAC04 \uC77C\uC815\uD55C \uAC04\uACA9(Gap)\uACFC \uB2E4\uB2E8 \uADF8\uB9AC\uB4DC, \uC571 \uC258 \uBC30\uCE58\uB97C \uC81C\uC5B4\uD558\uB294 \uAD6C\uC870\uC801 \uB808\uC774\uC544\uC6C3 \uD504\uB9AC\uBBF8\uD2F0\uBE0C",
      sourceFile: "components/ui/Layout.tsx",
      properties: [
        {
          key: "background",
          label: "\uC140 \uBC30\uACBD\uC0C9 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-50"
        },
        {
          key: "borderColor",
          label: "\uAC00\uC774\uB4DC \uD14C\uB450\uB9AC (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "textColor",
          label: "\uB77C\uBCA8 \uC0C9\uC0C1 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-800"
        },
        {
          key: "gap",
          label: "\uC544\uC774\uD15C \uAC04\uACA9 (Gap Spacing)",
          category: "spacing",
          defaultPaletteId: "--atom-space-4"
        },
        {
          key: "padding",
          label: "\uCEE8\uD14C\uC774\uB108 \uD328\uB529 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-4"
        },
        {
          key: "borderRadius",
          label: "\uC140 \uBAA8\uC11C\uB9AC \uACE1\uB960 (Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-md"
        }
      ],
      types: [
        {
          id: "stack-vertical",
          name: "Vertical Stack (\uC218\uC9C1 \uC2A4\uD0DD)",
          description: "\uC77C\uC815\uD55C gap \uAC04\uACA9\uC73C\uB85C \uC694\uC18C\uB4E4\uC744 \uC218\uC9C1\uC73C\uB85C \uC313\uB294 1\uCC28\uC6D0 \uC2A4\uD0DD \uB808\uC774\uC544\uC6C3",
          whenToUse: "\uD3FC \uD544\uB4DC, \uCE74\uB4DC \uB9AC\uC2A4\uD2B8, \uC124\uC815 \uC139\uC158\uC744 \uC704\uC544\uB798\uB85C \uC815\uB82C\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "stack-horizontal",
          name: "Horizontal Stack (\uC218\uD3C9 \uC2A4\uD0DD)",
          description: "\uC544\uC774\uD15C\uB4E4\uC744 \uC218\uD3C9 \uD589\uC73C\uB85C \uADE0\uC77C\uD558\uAC8C \uB098\uC5F4\uD558\uB294 \uC778\uB77C\uC778 \uD50C\uB809\uC2A4 \uC2A4\uD0DD",
          whenToUse: "\uD234\uBC14 \uC561\uC158, \uBC30\uC9C0 \uBAA9\uB85D, \uD3FC \uB77C\uBCA8-\uC785\uB825 \uC9DD\uC744 \uBC30\uCE58\uD560 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "grid-3col",
          name: "Responsive Grid (\uBC18\uC751\uD615 \uADF8\uB9AC\uB4DC)",
          description: "\uBDF0\uD3EC\uD2B8\uC5D0 \uB9DE\uCDB0 \uC5F4(Column) \uAC1C\uC218\uAC00 \uC720\uB3D9\uC801\uC73C\uB85C \uC804\uD658\uB418\uB294 \uB2E4\uB2E8 \uADF8\uB9AC\uB4DC",
          whenToUse: "\uB300\uC2DC\uBCF4\uB4DC KPI \uCE74\uB4DC, \uCEF4\uD3EC\uB10C\uD2B8 \uCE74\uD0C8\uB85C\uADF8 \uAC24\uB7EC\uB9AC \uB4F1\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "app-shell",
          name: "App Shell (\uC571 \uC258 \uACE8\uACA9)",
          description: "\uD5E4\uB354\xB7\uC0AC\uC774\uB4DC\uBC14\xB7\uBA54\uC778 \uBCF8\uBB38\xB7\uD478\uD130\uB85C \uAD6C\uC131\uB41C \uC804\uCCB4 \uC560\uD50C\uB9AC\uCF00\uC774\uC158 \uC258 \uAD6C\uC870",
          whenToUse: "SaaS \uCF58\uC194, \uC5B4\uB4DC\uBBFC \uB300\uC2DC\uBCF4\uB4DC, \uC2A4\uD29C\uB514\uC624 \uBA54\uC778 \uD504\uB808\uC784\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        balanced: {
          name: "\uD45C\uC900 \uADE0\uD615 \uAC04\uACA9 (Balanced Stack)",
          $description: "16px \uAE30\uBCF8 \uAC04\uACA9\uC73C\uB85C \uCE74\uB4DC\uC640 \uC785\uB825 \uD544\uB4DC\uB97C \uC815\uAC08\uD558\uAC8C \uBC30\uCE58\uD558\uB294 \uD45C\uC900 \uC2A4\uD0DD",
          variableRole: "primary",
          type: {
            id: "layout-balanced",
            name: "\uD45C\uC900 \uADE0\uD615 \uAC04\uACA9 (Balanced Stack)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 balanced \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            gap: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            }
          }
        },
        dense: {
          name: "\uACE0\uBC00\uB3C4 \uCEF4\uD329\uD2B8 (Dense Grid)",
          $description: "8px \uC870\uBC00\uD55C \uAC04\uACA9\uC73C\uB85C \uB300\uB7C9 \uC815\uBCF4\uB97C \uC555\uCD95 \uBC30\uCE58\uD558\uB294 \uC5B4\uB4DC\uBBFC \uADF8\uB9AC\uB4DC \uB808\uC774\uC544\uC6C3",
          variableRole: "primary",
          type: {
            id: "layout-dense",
            name: "\uACE0\uBC00\uB3C4 \uCEF4\uD329\uD2B8 (Dense Grid)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 dense \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            gap: {
              $value: "{palette.spacing.2}",
              targetVariable: "--atom-space-2"
            },
            padding: {
              $value: "{palette.spacing.3}",
              targetVariable: "--atom-space-3"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            }
          }
        },
        spacious: {
          name: "\uC5EC\uC720\uB85C\uC6B4 \uC139\uC158 (Spacious Editorial)",
          $description: "24px \uC774\uC0C1\uC758 \uB109\uB109\uD55C \uC5EC\uBC31\uC73C\uB85C \uCF58\uD150\uCE20 \uBAB0\uC785\uB3C4\uB97C \uB192\uC774\uB294 \uB79C\uB529\xB7\uC1FC\uCF00\uC774\uC2A4 \uB808\uC774\uC544\uC6C3",
          variableRole: "primary",
          type: {
            id: "layout-spacious",
            name: "\uC5EC\uC720\uB85C\uC6B4 \uC139\uC158 (Spacious Editorial)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 spacious \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.blue.50}",
              targetVariable: "--atom-palette-blue-50"
            },
            borderColor: {
              $value: "{palette.color.blue.200}",
              targetVariable: "--atom-palette-blue-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            gap: {
              $value: "{palette.spacing.6}",
              targetVariable: "--atom-space-6"
            },
            padding: {
              $value: "{palette.spacing.6}",
              targetVariable: "--atom-space-6"
            },
            borderRadius: {
              $value: "{palette.radius.lg}",
              targetVariable: "--atom-radius-lg"
            }
          }
        }
      }
    },
    tree: {
      name: "Tree View (\uD2B8\uB9AC \uBDF0)",
      category: "Data",
      $description: "\uACC4\uCE35\uD615 \uD3F4\uB354\xB7\uD30C\uC77C\xB7\uCE74\uD14C\uACE0\uB9AC \uB178\uB4DC\uB97C \uC811\uACE0 \uD3BC\uCE58\uBA70 \uD0D0\uC0C9\uD558\uB294 \uC778\uD130\uB799\uD2F0\uBE0C \uD2B8\uB9AC \uCEF4\uD3EC\uB10C\uD2B8",
      sourceFile: "components/ui/Tree.tsx",
      properties: [
        {
          key: "background",
          label: "\uD328\uB110 \uBC30\uACBD\uC0C9 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uD328\uB110 \uD14C\uB450\uB9AC (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "textColor",
          label: "\uAE30\uBCF8 \uB178\uB4DC \uD14D\uC2A4\uD2B8 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-800"
        },
        {
          key: "activeBackground",
          label: "\uC120\uD0DD \uB178\uB4DC \uBC30\uACBD (Selected BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-50"
        },
        {
          key: "activeText",
          label: "\uC120\uD0DD \uB178\uB4DC \uD14D\uC2A4\uD2B8 (Selected Text)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-md"
        },
        {
          key: "padding",
          label: "\uCEE8\uD14C\uC774\uB108 \uD328\uB529 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-3"
        }
      ],
      types: [
        {
          id: "directory",
          name: "Directory (\uD30C\uC77C \uD0D0\uC0C9 \uD2B8\uB9AC)",
          description: "\uD3F4\uB354\uC640 \uD30C\uC77C\uC744 \uC810\uC120 \uAC00\uC774\uB4DC \uBC0F \uC811\uAE30/\uD3BC\uCE58\uAE30 \uD654\uC0B4\uD45C\uB85C \uD45C\uD604\uD558\uB294 \uAE30\uBCF8 \uD2B8\uB9AC",
          whenToUse: "\uD504\uB85C\uC81D\uD2B8 \uD30C\uC77C \uD0D0\uC0C9\uAE30, MIB/OID \uD2B8\uB9AC, \uB2E4\uB2E8\uACC4 \uCE74\uD14C\uACE0\uB9AC \uD0D0\uC0C9\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        explorer: {
          name: "\uD30C\uC77C \uD0D0\uC0C9\uAE30 \uD2B8\uB9AC (File Explorer)",
          $description: "\uC88C\uCE21 \uD328\uB110\uC5D0 \uBC30\uCE58\uB418\uC5B4 \uC18C\uC2A4 \uCF54\uB4DC\uB098 \uB514\uC790\uC778 \uD1A0\uD070 \uACC4\uCE35\uC744 \uD0D0\uC0C9\uD558\uB294 \uAE30\uBCF8 \uD2B8\uB9AC",
          variableRole: "primary",
          type: {
            id: "tree-explorer",
            name: "\uD30C\uC77C \uD0D0\uC0C9\uAE30 \uD2B8\uB9AC (File Explorer)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 explorer \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            activeBackground: {
              $value: "{palette.color.blue.50}",
              targetVariable: "--atom-palette-blue-50"
            },
            activeText: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.3}",
              targetVariable: "--atom-space-3"
            }
          }
        },
        "dark-sidebar": {
          name: "\uB2E4\uD06C \uCF58\uC194 \uD2B8\uB9AC (Dark Console Tree)",
          $description: "\uAC1C\uBC1C\uC790 IDE \uBC0F \uC778\uD504\uB77C \uAD00\uB9AC \uB3C4\uAD6C\uC5D0 \uC5B4\uC6B8\uB9AC\uB294 \uB2E4\uD06C \uC11C\uD53C\uC2A4 \uD2B8\uB9AC",
          variableRole: "primary",
          type: {
            id: "tree-dark-sidebar",
            name: "\uB2E4\uD06C \uCF58\uC194 \uD2B8\uB9AC (Dark Console Tree)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 dark-sidebar \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            borderColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            textColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            activeBackground: {
              $value: "{palette.color.blue.600}",
              targetVariable: "--atom-palette-blue-600"
            },
            activeText: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.3}",
              targetVariable: "--atom-space-3"
            }
          }
        }
      }
    },
    "token-select": {
      name: "TokenSelect (\uD1A0\uD070 \uAC80\uC0C9 \uB4DC\uB86D\uB2E4\uC6B4)",
      category: "Form",
      $description: "\uB514\uC790\uC778 \uD1A0\uD070\uBA85, CSS \uBCC0\uC218 ID, \uCEEC\uB7EC \uC2A4\uC640\uCE58 \uBC0F \uACC4\uC5F4 \uD544\uD130\uB97C \uC2E4\uC2DC\uAC04 \uAC80\uC0C9\xB7\uC120\uD0DD\uD558\uB294 \uC804\uBB38 \uC140\uB809\uD2B8 \uCEF4\uD3EC\uB10C\uD2B8",
      sourceFile: "components/ui/TokenSelect.tsx",
      properties: [
        {
          key: "background",
          label: "\uD2B8\uB9AC\uAC70 \uBC30\uACBD\uC0C9 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-300"
        },
        {
          key: "textColor",
          label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-900"
        },
        {
          key: "focusBorderColor",
          label: "\uC5F4\uB9BC/\uD3EC\uCEE4\uC2A4 \uBCF4\uB354 (Focus Border)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-sm"
        },
        {
          key: "paddingX",
          label: "\uC88C\uC6B0 \uD328\uB529 (Padding X)",
          category: "spacing",
          defaultPaletteId: "--atom-space-2-5"
        }
      ],
      types: [
        {
          id: "outlined",
          name: "Outlined (\uD45C\uC900 \uAC80\uC0C9 \uB4DC\uB86D\uB2E4\uC6B4)",
          description: "\uBA85\uD655\uD55C 1px \uD14C\uB450\uB9AC\uC640 \uAC80\uC0C9 \uC778\uD48B, \uCEEC\uB7EC \uC2A4\uC640\uCE58 \uD504\uB9AC\uBDF0\uB97C \uC81C\uACF5\uD558\uB294 \uD45C\uC900 \uD1A0\uD070 \uC140\uB809\uD2B8",
          whenToUse: "\uC778\uC2A4\uD399\uD130 \uC18D\uC131 \uBC14\uC778\uB529, \uD14C\uB9C8 \uC5D0\uB514\uD130 \uD1A0\uD070 \uC120\uD0DD \uB4F1 \uC815\uBC00\uD55C \uD1A0\uD070 \uC870\uD68C\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "filled",
          name: "Filled (\uBC30\uACBD \uCC44\uC6C0\uD615 \uC140\uB809\uD2B8)",
          description: "\uC740\uC740\uD55C \uC11C\uD53C\uC2A4 \uBC30\uACBD\uC774 \uCC44\uC6CC\uC838 \uD074\uB9AD \uC601\uC5ED\uC774 \uBA85\uD655\uD55C \uD544\uD130\uB9C1\uC6A9 \uD1A0\uD070 \uC140\uB809\uD2B8",
          whenToUse: "\uD234\uBC14 \uD544\uD130, \uBAA8\uB2EC \uC0C1\uB2E8 \uBE60\uB978 \uD1A0\uD070 \uC804\uD658 \uCEE8\uD2B8\uB864\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "subtle",
          name: "Subtle (\uBBF8\uB2C8\uBA40 \uC778\uB77C\uC778 \uC140\uB809\uD2B8)",
          description: "\uD14C\uB450\uB9AC\uB97C \uC228\uAE30\uACE0 \uD638\uBC84 \uC2DC\uC5D0\uB9CC \uBC18\uC751\uD558\uC5EC \uC881\uC740 \uACF5\uAC04\uC5D0 \uB179\uC544\uB4DC\uB294 \uC778\uB77C\uC778 \uC140\uB809\uD2B8",
          whenToUse: "\uD14C\uC774\uBE14 \uC140 \uB0B4\uBD80 \uD3B8\uC9D1, \uACE0\uBC00\uB3C4 \uC778\uC2A4\uD399\uD130 \uD5E4\uB354\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        primary: {
          name: "\uD45C\uC900 \uD1A0\uD070 \uAC80\uC0C9 (Primary Token Picker)",
          $description: "\uC778\uC2A4\uD399\uD130\uC640 \uD14C\uB9C8 \uB9E4\uB2C8\uC800\uC5D0\uC11C \uCEEC\uB7EC/\uC0AC\uC774\uC988/\uACE1\uB960 \uD1A0\uD070\uC744 \uC989\uC2DC \uAC80\uC0C9\uD574 \uBC14\uC778\uB529",
          variableRole: "primary",
          type: {
            id: "token-select-primary",
            name: "\uD45C\uC900 \uD1A0\uD070 \uAC80\uC0C9 (Primary Token Picker)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 primary \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            focusBorderColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            borderRadius: {
              $value: "{palette.radius.sm}",
              targetVariable: "--atom-radius-sm"
            },
            paddingX: {
              $value: "{palette.spacing.2-5}",
              targetVariable: "--atom-space-2-5"
            }
          }
        },
        "subtle-surface": {
          name: "\uC11C\uD53C\uC2A4 \uBCF4\uC870 \uC140\uB809\uD2B8 (Subtle Filled Picker)",
          $description: "\uC5F0\uD55C \uD68C\uC0C9 \uBC30\uACBD\uC73C\uB85C \uD3FC \uC601\uC5ED\uACFC \uC870\uD654\uB86D\uAC8C \uC5B4\uC6B0\uB7EC\uC9C0\uB294 \uD1A0\uD070 \uC140\uB809\uD2B8",
          variableRole: "secondary",
          type: {
            id: "token-select-subtle-surface",
            name: "\uC11C\uD53C\uC2A4 \uBCF4\uC870 \uC140\uB809\uD2B8 (Subtle Filled Picker)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 subtle-surface \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "secondary",
            label: "\uC138\uCEE8\uB354\uB9AC (Secondary)",
            meaning: "\uCDE8\uC18C, \uB2EB\uAE30, \uC774\uC804 \uB2E8\uACC4 \uB4F1 \uC0AC\uC6A9\uC790 \uC778\uD130\uB799\uC158\uC744 \uC9C0\uC6D0\uD558\uB418 \uC2DC\uAC01\uC801 \uBD80\uB2F4\uC744 \uC904\uC774\uB294 \uC911\uB9BD \uD1A4 \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            textColor: {
              $value: "{palette.color.gray.800}",
              targetVariable: "--atom-palette-gray-800"
            },
            focusBorderColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            paddingX: {
              $value: "{palette.spacing.3}",
              targetVariable: "--atom-space-3"
            }
          }
        }
      }
    },
    alert: {
      name: "Alert (\uC54C\uB9BC \uCF5C\uC544\uC6C3)",
      category: "Feedback",
      $description: "\uD654\uBA74 \uC778\uB77C\uC778 \uC601\uC5ED\uC5D0 \uC815\uBCF4, \uC131\uACF5, \uACBD\uACE0, \uC704\uD5D8 \uBA54\uC2DC\uC9C0\uB97C \uAD6C\uC870\uD654\uD558\uC5EC \uAC15\uC870 \uD45C\uC2DC\uD558\uB294 \uC54C\uB9BC \uBC30\uB108",
      sourceFile: "components/ui/Alert.tsx",
      properties: [
        {
          key: "background",
          label: "\uCF5C\uC544\uC6C3 \uBC30\uACBD\uC0C9 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-50"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-blue-200"
        },
        {
          key: "textColor",
          label: "\uBCF8\uBB38 \uD14D\uC2A4\uD2B8 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-900"
        },
        {
          key: "iconColor",
          label: "\uC544\uC774\uCF58 \uAC15\uC870\uC0C9 (Icon Color)",
          category: "color",
          defaultPaletteId: "--atom-color-primary"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-md"
        },
        {
          key: "padding",
          label: "\uB0B4\uBD80 \uD328\uB529 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-4"
        }
      ],
      types: [
        {
          id: "soft",
          name: "Soft (\uC5F0\uD55C \uD2F4\uD2B8 \uCF5C\uC544\uC6C3)",
          description: "\uC2DC\uB9E8\uD2F1 \uC0C9\uC0C1\uC758 10% \uD2F4\uD2B8 \uBC30\uACBD\uC73C\uB85C \uBD80\uB4DC\uB7FD\uAC8C \uC8FC\uC758\uB97C \uD658\uAE30\uD558\uB294 \uAE30\uBCF8 \uC54C\uB9BC \uBC30\uB108",
          whenToUse: "\uD398\uC774\uC9C0 \uC0C1\uB2E8 \uC548\uB0B4, \uD3FC \uAC80\uC99D \uACB0\uACFC, \uD301 \uCF5C\uC544\uC6C3\uC5D0 \uAC00\uC7A5 \uB110\uB9AC \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "outlined",
          name: "Outlined (\uC120\uBA85\uD55C \uC678\uACFD\uC120\uD615)",
          description: "\uAE68\uB057\uD55C \uBC30\uACBD \uC704\uC5D0 \uC2DC\uB9E8\uD2F1 1px \uD14C\uB450\uB9AC\uB85C \uACBD\uACC4\uB97C \uAC15\uC870\uD558\uB294 \uC815\uAC08\uD55C \uC54C\uB9BC",
          whenToUse: "\uBC30\uACBD \uC0C9\uC0C1 \uAC04\uC12D\uC774 \uC801\uC740 \uCE74\uB4DC \uB0B4\uBD80\uB098 \uBBF8\uB2C8\uBA40 \uBB38\uC11C \uC139\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "solid",
          name: "Solid (\uACE0\uB300\uBE44 \uCC44\uC6C0\uD615)",
          description: "\uC2DC\uB9E8\uD2F1 \uCEEC\uB7EC\uAC00 \uAF49 \uCC28\uC11C \uC989\uAC01\uC801\uC778 \uC2DC\uC120 \uC9D1\uC911\uC744 \uC720\uB3C4\uD558\uB294 \uACE0\uAC15\uB3C4 \uC54C\uB9BC \uBC30\uB108",
          whenToUse: "\uCE58\uBA85\uC801 \uC2DC\uC2A4\uD15C \uC7A5\uC560, \uC11C\uBE44\uC2A4 \uC810\uAC80 \uACF5\uC9C0 \uB4F1 \uCD5C\uC6B0\uC120 \uC54C\uB9BC\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "accent-border",
          name: "Accent-Border (\uC88C\uCE21 \uAC15\uC870 \uBC14\uD615)",
          description: "\uC88C\uCE21 4px \uCEEC\uB7EC \uC778\uB514\uCF00\uC774\uD130 \uBC14\uAC00 \uD2B9\uC9D5\uC778 \uBB38\uC11C\xB7\uB178\uD2B8 \uC2A4\uD0C0\uC77C \uCF5C\uC544\uC6C3",
          whenToUse: "\uAC00\uC774\uB4DC \uBB38\uC11C \uC8FC\uC758\uC0AC\uD56D, AI \uC81C\uC548 \uC694\uC57D, \uC778\uC6A9 \uBE14\uB85D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        info: {
          name: "\uC548\uB0B4 \uCF5C\uC544\uC6C3 (Info Alert)",
          $description: "\uC5C5\uB370\uC774\uD2B8 \uACF5\uC9C0, \uAC00\uC774\uB4DC \uD301 \uB4F1 \uC77C\uBC18 \uC815\uBCF4\uB97C \uC804\uB2EC\uD558\uB294 \uBE14\uB8E8 \uD1A4 \uC54C\uB9BC",
          variableRole: "info",
          type: {
            id: "alert-info",
            name: "\uC548\uB0B4 \uCF5C\uC544\uC6C3 (Info Alert)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 info \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "info",
            label: "\uC548\uB0B4/\uC815\uBCF4 (Info)",
            meaning: "\uD30C\uB791\uC740 \uC548\uB0B4! \uC77C\uBC18 \uB3C4\uC6C0\uB9D0, \uC2E0\uADDC \uAE30\uB2A5 \uBC30\uC9C0 \uB4F1 \uC2DC\uC2A4\uD15C \uC815\uBCF4 \uACE0\uC9C0\uB97C \uB098\uD0C0\uB0B4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.blue.50}",
              targetVariable: "--atom-palette-blue-50"
            },
            borderColor: {
              $value: "{palette.color.blue.200}",
              targetVariable: "--atom-palette-blue-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            iconColor: {
              $value: "{theme.semantic.primary}",
              targetVariable: "--atom-color-primary"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        },
        success: {
          name: "\uC131\uACF5 \uD655\uC778 (Success Alert)",
          $description: "\uC800\uC7A5, \uBC30\uD3EC, \uC778\uC99D \uC644\uB8CC \uC0C1\uD0DC\uB97C \uC54C\uB9AC\uB294 \uC5D0\uBA54\uB784\uB4DC \uCF5C\uC544\uC6C3",
          variableRole: "success",
          type: {
            id: "alert-success",
            name: "\uC131\uACF5 \uD655\uC778 (Success Alert)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 success \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "success",
            label: "\uC131\uACF5/\uC644\uB8CC (Success)",
            meaning: "\uCD08\uB85D\uC740 \uC131\uACF5! \uACB0\uC81C \uC644\uB8CC, \uC815\uC0C1 \uAC00\uB3D9, \uB370\uC774\uD130 \uC800\uC7A5 \uC644\uB8CC \uB4F1 \uAE0D\uC815\uC801 \uACB0\uACFC\uB97C \uC2DC\uAC01\uD654\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.emerald.50}",
              targetVariable: "--atom-palette-emerald-50"
            },
            borderColor: {
              $value: "{palette.color.emerald.200}",
              targetVariable: "--atom-palette-emerald-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            iconColor: {
              $value: "{theme.semantic.success}",
              targetVariable: "--atom-color-success"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        },
        warning: {
          name: "\uC8FC\uC758 \uACBD\uACE0 (Warning Alert)",
          $description: "\uB9CC\uB8CC \uC784\uBC15, \uBE44\uAD8C\uC7A5 \uC635\uC158 \uB4F1 \uC0AC\uC804 \uC8FC\uC758\uB97C \uD658\uAE30\uD558\uB294 \uC570\uBC84 \uCF5C\uC544\uC6C3",
          variableRole: "warning",
          type: {
            id: "alert-warning",
            name: "\uC8FC\uC758 \uACBD\uACE0 (Warning Alert)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 warning \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "warning",
            label: "\uC8FC\uC758/\uACBD\uACE0 (Warning)",
            meaning: "\uB178\uB791\uC740 \uACBD\uACE0! \uC8FC\uC758 \uD658\uAE30, \uB9CC\uB8CC \uC784\uBC15, \uB300\uAE30/\uBCF4\uB958 \uB4F1 \uC0AC\uC6A9\uC790\uC758 \uCD94\uAC00 \uD655\uC778\uC774 \uD544\uC694\uD55C \uC0C1\uD669\uC744 \uC54C\uB9AC\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.amber.50}",
              targetVariable: "--atom-palette-amber-50"
            },
            borderColor: {
              $value: "{palette.color.amber.200}",
              targetVariable: "--atom-palette-amber-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            iconColor: {
              $value: "{theme.semantic.warning}",
              targetVariable: "--atom-color-warning"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        },
        destructive: {
          name: "\uC704\uD5D8 \uC624\uB958 (Destructive Alert)",
          $description: "\uAD8C\uD55C \uCC28\uB2E8, \uAC80\uC99D \uC2E4\uD328 \uB4F1 \uC989\uAC01\uC801 \uB300\uC751\uC774 \uD544\uC694\uD55C \uB85C\uC988 \uB808\uB4DC \uCF5C\uC544\uC6C3",
          variableRole: "danger",
          type: {
            id: "alert-destructive",
            name: "\uC704\uD5D8 \uC624\uB958 (Destructive Alert)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 destructive \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "danger",
            label: "\uC704\uD5D8/\uC5D0\uB7EC (Danger / Destructive)",
            meaning: "\uBE68\uAC15\uC740 \uC704\uD5D8! \uC601\uAD6C \uC0AD\uC81C, \uACC4\uC57D \uD574\uC9C0, \uBCF5\uAD6C \uBD88\uAC00 \uC791\uC5C5 \uB4F1 \uCE58\uBA85\uC801 \uACB0\uACFC\uB97C \uACBD\uACE0\uD558\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.rose.50}",
              targetVariable: "--atom-palette-rose-50"
            },
            borderColor: {
              $value: "{palette.color.rose.200}",
              targetVariable: "--atom-palette-rose-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            iconColor: {
              $value: "{theme.semantic.danger}",
              targetVariable: "--atom-color-danger"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        }
      }
    },
    sheet: {
      name: "Sheet (\uBC14\uD140\uC2DC\uD2B8 & \uB4DC\uB85C\uC5B4)",
      category: "Feedback",
      $description: "\uD654\uBA74 \uD558\uB2E8\uC774\uB098 \uCE21\uBA74\uC5D0\uC11C \uBD80\uB4DC\uB7FD\uAC8C \uC2AC\uB77C\uC774\uB4DC\uB418\uC5B4 \uD544\uD130\xB7\uC0C1\uC138\xB7\uD655\uC778 \uD50C\uB85C\uC6B0\uB97C \uC81C\uACF5\uD558\uB294 \uC624\uBC84\uB808\uC774 \uC2DC\uD2B8",
      properties: [
        {
          key: "background",
          label: "\uC2DC\uD2B8 \uBC30\uACBD\uC0C9 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "borderColor",
          label: "\uACBD\uACC4\uC120 \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "textColor",
          label: "\uBCF8\uBB38 \uD14D\uC2A4\uD2B8 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-900"
        },
        {
          key: "headerBackground",
          label: "\uC0C1\uB2E8 \uD5E4\uB354 \uBC30\uACBD (Header BG)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-50"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-xl"
        },
        {
          key: "padding",
          label: "\uB0B4\uBD80 \uD328\uB529 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-4"
        }
      ],
      types: [
        {
          id: "bottom-sheet",
          name: "Bottom Sheet (\uD558\uB2E8 \uC2AC\uB77C\uC774\uB4DC \uC2DC\uD2B8)",
          description: "\uBAA8\uBC14\uC77C/\uD0DC\uBE14\uB9BF \uBDF0\uD3EC\uD2B8 \uD558\uB2E8\uC5D0\uC11C \uC704\uB85C \uBBF8\uB044\uB7EC\uC838 \uC62C\uB77C\uC624\uB294 \uB465\uADFC \uC0C1\uB2E8 \uC561\uC158 \uC2DC\uD2B8",
          whenToUse: "\uD544\uD130 \uC120\uD0DD, \uACF5\uC720 \uBA54\uB274, \uACB0\uC81C \uD655\uC778 \uB4F1 \uC5C4\uC9C0 \uC190\uAC00\uB77D \uC601\uC5ED \uC778\uD130\uB799\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "side-drawer",
          name: "Side Drawer (\uC6B0\uCE21 \uC0C1\uC138 \uC2DC\uD2B8)",
          description: "\uD604\uC7AC \uBAA9\uB85D \uCEE8\uD14D\uC2A4\uD2B8\uB97C \uC720\uC9C0\uD55C \uCC44 \uC6B0\uCE21\uC5D0\uC11C \uC2AC\uB77C\uC774\uB4DC \uC778 \uB418\uB294 \uC0C1\uC138 \uD3B8\uC9D1 \uC2DC\uD2B8",
          whenToUse: "\uD56D\uBAA9 \uC0C1\uC138 \uC870\uD68C, \uC778\uC2A4\uD399\uD130 \uD3B8\uC9D1, \uC7A5\uBC14\uAD6C\uB2C8 \uBBF8\uB9AC\uBCF4\uAE30\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        },
        {
          id: "floating-sheet",
          name: "Floating Sheet (\uC5EC\uBC31 \uD50C\uB85C\uD305 \uC2DC\uD2B8)",
          description: "\uD654\uBA74 \uAC00\uC7A5\uC790\uB9AC\uC5D0\uC11C \uC57D\uAC04 \uB744\uC6CC\uC838 \uC785\uCCB4 \uADF8\uB9BC\uC790\uB97C \uAC16\uB294 \uBAA8\uB358 \uD50C\uB85C\uD305 \uC2DC\uD2B8",
          whenToUse: "\uB300\uC2DC\uBCF4\uB4DC \uBA40\uD2F0 \uD0DC\uC2A4\uD0B9 \uD328\uB110, AI \uCF54\uD30C\uC77C\uB7FF \uBCF4\uC870 \uCC3D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        "bottom-action": {
          name: "\uBAA8\uBC14\uC77C \uBC14\uD140 \uC2DC\uD2B8 (Bottom Action Sheet)",
          $description: "\uBAA8\uBC14\uC77C \uD558\uB2E8\uC5D0\uC11C \uC62C\uB77C\uC640 \uBE60\uB978 \uC120\uD0DD\uACFC \uD655\uC778 \uC561\uC158\uC744 \uC81C\uACF5\uD558\uB294 \uB465\uADFC \uBC14\uD140\uC2DC\uD2B8",
          variableRole: "primary",
          type: {
            id: "sheet-bottom-action",
            name: "\uBAA8\uBC14\uC77C \uBC14\uD140 \uC2DC\uD2B8 (Bottom Action Sheet)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 bottom-action \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            headerBackground: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderRadius: {
              $value: "{palette.radius.xl}",
              targetVariable: "--atom-radius-xl"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        },
        "side-detail": {
          name: "\uCE21\uBA74 \uC0C1\uC138 \uB4DC\uB85C\uC5B4 (Side Detail Sheet)",
          $description: "\uC6B0\uCE21\uC5D0\uC11C \uC5F4\uB824 \uBAA9\uB85D\uC744 \uAC00\uB9AC\uC9C0 \uC54A\uACE0 \uC138\uBD80 \uC815\uBCF4\uB97C \uC218\uC815\uD558\uB294 \uC0AC\uC774\uB4DC \uC2DC\uD2B8",
          variableRole: "primary",
          type: {
            id: "sheet-side-detail",
            name: "\uCE21\uBA74 \uC0C1\uC138 \uB4DC\uB85C\uC5B4 (Side Detail Sheet)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 side-detail \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            borderColor: {
              $value: "{palette.color.gray.300}",
              targetVariable: "--atom-palette-gray-300"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            headerBackground: {
              $value: "{palette.color.gray.50}",
              targetVariable: "--atom-palette-gray-50"
            },
            borderRadius: {
              $value: "{palette.radius.lg}",
              targetVariable: "--atom-radius-lg"
            },
            padding: {
              $value: "{palette.spacing.5}",
              targetVariable: "--atom-space-5"
            }
          }
        }
      }
    },
    "theme-switcher": {
      name: "ThemeSwitcher (theme-switcher)",
      category: "Form",
      $description: "components/ui/ThemeSwitcher.tsx\uC5D0\uC11C \uC790\uB3D9 \uAC10\uC9C0\uB41C \uCEF4\uD3EC\uB10C\uD2B8",
      sourceFile: "components/ui/ThemeSwitcher.tsx",
      autoDiscovered: true,
      supportedStatuses: [
        "default",
        "hover",
        "active",
        "focus",
        "disabled"
      ],
      properties: [
        {
          key: "background",
          label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
          category: "color",
          defaultPaletteId: "--atom-palette-white"
        },
        {
          key: "textColor",
          label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-900"
        },
        {
          key: "borderColor",
          label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
          category: "color",
          defaultPaletteId: "--atom-palette-gray-200"
        },
        {
          key: "borderRadius",
          label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
          category: "radius",
          defaultPaletteId: "--atom-radius-md"
        },
        {
          key: "padding",
          label: "\uB0B4\uBD80 \uD328\uB529 (Padding)",
          category: "spacing",
          defaultPaletteId: "--atom-space-4"
        }
      ],
      types: [
        {
          id: "standard",
          name: "Standard (\uD45C\uC900\uD615)",
          description: "\uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uBC14\uC778\uB529\uB41C \uAE30\uBCF8 \uC678\uD615",
          whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uBC30\uCE58 \uBC0F \uAE30\uBCF8 \uC778\uD130\uB799\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
        }
      ],
      variables: {
        default: {
          name: "\uAE30\uBCF8 (Default)",
          $description: "ThemeSwitcher \uAE30\uBCF8 \uC2DC\uB9E8\uD2F1 \uC2A4\uD0C0\uC77C",
          variableRole: "primary",
          type: {
            id: "theme-switcher-default",
            name: "\uAE30\uBCF8 (Default)",
            whenToUse: "\uD574\uB2F9 \uCEF4\uD3EC\uB10C\uD2B8\uC758 default \uC2A4\uD0C0\uC77C\uC774 \uD544\uC694\uD55C \uD654\uBA74 \uB9E5\uB77D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          },
          variable: {
            role: "primary",
            label: "\uD504\uB77C\uC774\uBA38\uB9AC (Primary)",
            meaning: "\uBE0C\uB79C\uB4DC \uB300\uD45C \uCEEC\uB7EC\uB97C \uC801\uC6A9\uD558\uC5EC \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB2E8 \uD558\uB098\uC758 \uACB0\uC815\uC801 \uBAA9\uD45C(\uACB0\uC81C, \uC81C\uCD9C, \uD575\uC2EC \uC561\uC158)\uB97C \uC9D1\uC911\uC2DC\uD0A4\uB294 \uBE44\uC8FC\uC5BC \uC758\uBBF8"
          },
          statuses: {
            default: {
              behavior: "\uD45C\uC900 background \uBC0F border \uD1A0\uD070 \uC801\uC6A9"
            },
            hover: {
              behavior: "hoverBackground \uD1A0\uD070 \uC801\uC6A9, cursor: pointer"
            },
            active: {
              behavior: "scale-[0.97] \uC555\uCD95 \uC560\uB2C8\uBA54\uC774\uC158 \uBC0F \uC9C4\uD55C \uC0C9\uC0C1 \uD53C\uB4DC\uBC31"
            },
            focus: {
              behavior: "outline 2px solid primary, outline-offset 2px"
            },
            disabled: {
              behavior: "opacity 40%, cursor: not-allowed"
            },
            loading: {
              behavior: "\uC2A4\uD53C\uB108 \uC778\uB514\uCF00\uC774\uD130 \uD68C\uC804, pointer-events: none"
            }
          },
          tokens: {
            background: {
              $value: "{palette.color.neutral.white}",
              targetVariable: "--atom-palette-white"
            },
            textColor: {
              $value: "{palette.color.gray.900}",
              targetVariable: "--atom-palette-gray-900"
            },
            borderColor: {
              $value: "{palette.color.gray.200}",
              targetVariable: "--atom-palette-gray-200"
            },
            borderRadius: {
              $value: "{palette.radius.md}",
              targetVariable: "--atom-radius-md"
            },
            padding: {
              $value: "{palette.spacing.4}",
              targetVariable: "--atom-space-4"
            }
          }
        }
      }
    }
  }
};

// lib/tokens/index.ts
var UNIFIED_TOKENS_DOCUMENT = tokens_default;
var atomTokens = AtomTokenSystem.fromDocument(
  UNIFIED_TOKENS_DOCUMENT
);
var paletteTokens = atomTokens.palette;
var themeTokens = atomTokens.theme;
var componentTokens = atomTokens.components;
var tokenResolver = atomTokens.resolver;

// lib/data/themeEditorDefaults.ts
var DEFAULT_BRAND_CONFIG = {
  name: "AtomDesignToken",
  logoUrl: null,
  slogan: "Universal Design Token & Agentic UI System",
  logoHeight: 24
};
var DEFAULT_THEME_CONFIG = {
  color: {
    primary: "var(--accent-primary)",
    primaryHover: "var(--accent-primary-hover)",
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
    fontFamily: "'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
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
  borderRadius: "14px",
  buttonSpacing: {
    paddingY: "8px",
    paddingX: "16px"
  },
  selectedIcon: "Sparkles"
};
var COLOR_PRESETS = [
  {
    id: "ocean-blue",
    name: "\uC624\uC158 \uBE14\uB8E8 (Ocean Blue)",
    description: "\uCCAD\uB7C9\uD55C \uBE44\uBE44\uB4DC \uBE14\uB8E8\uC640 \uBAA8\uB358 \uB77C\uC6B4\uB529",
    borderRadius: "16px",
    colors: {
      primary: "var(--accent-primary)",
      primaryHover: "var(--accent-primary-hover)",
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
    id: "warm-orange",
    name: "\uC6DC \uC624\uB80C\uC9C0 (Warm Orange)",
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
    id: "spoqa",
    name: "Spoqa Han Sans Neo (\uAE30\uBCF8 \uAD8C\uC7A5 \xB7 CDN)",
    value: "'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
    cdnUrl: "https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css",
    category: "sans",
    description: "\uD55C\uAE00\xB7\uC601\uBB38\xB7\uC22B\uC790 \uAC00\uB3C5\uC131\uC774 \uD0C1\uC6D4\uD55C \uC2A4\uD3EC\uCE74 \uD55C \uC0B0\uC2A4 \uB124\uC624 \uC6F9\uD3F0\uD2B8 (CDN \uAE30\uBCF8 \uD0D1\uC7AC)"
  },
  {
    id: "pretendard",
    name: "Pretendard (CDN)",
    value: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
    cdnUrl: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css",
    category: "sans",
    description: "\uD604\uB300\uC801\uC778 UI/\uD504\uB85C\uB355\uD2B8 \uB514\uC790\uC778\uC5D0 \uCD5C\uC801\uD654\uB41C \uB2E4\uC774\uB098\uBBF9 \uC11C\uBE0C\uC14B \uC6F9\uD3F0\uD2B8"
  },
  {
    id: "noto-sans-kr",
    name: "Noto Sans KR (Google CDN)",
    value: '"Noto Sans KR", -apple-system, BlinkMacSystemFont, sans-serif',
    cdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap",
    category: "sans",
    description: "\uAD6C\uAE00/\uC5B4\uB3C4\uBE44 \uD45C\uC900 \uACE0\uB515 \uD3F0\uD2B8"
  },
  {
    id: "inter",
    name: "Inter (\uAE00\uB85C\uBC8C \uD14C\uD06C \xB7 Google CDN)",
    value: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    cdnUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
    category: "sans",
    description: "\uAE00\uB85C\uBC8C SaaS \uBC0F \uC601\uBB38 \uB300\uC2DC\uBCF4\uB4DC \uD45C\uC900 \uC0B0\uC138\uB9AC\uD504"
  },
  {
    id: "plus-jakarta",
    name: "Plus Jakarta Sans (\uBAA8\uB358 \uAE30\uD558\uD559 \xB7 Google CDN)",
    value: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    cdnUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
    category: "sans",
    description: "\uAE30\uD558\uD559\uC801 \uC870\uD615\uBBF8\uB97C \uAC16\uCD98 \uBAA8\uB358 UI \uD3F0\uD2B8"
  },
  {
    id: "system",
    name: "System UI (\uC2DC\uC2A4\uD15C \uB124\uC774\uD2F0\uBE0C)",
    value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    category: "sans",
    description: "\uBCC4\uB3C4 CDN \uB85C\uB4DC \uC5C6\uC774 OS \uAE30\uBCF8 \uD3F0\uD2B8\uB97C \uC0AC\uC6A9\uD558\uB294 \uC81C\uB85C \uB808\uC774\uD134\uC2DC \uC2A4\uD0DD"
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono (\uCF54\uB4DC / \uBAA8\uB178 \xB7 Google CDN)",
    value: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
    cdnUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap",
    category: "mono",
    description: "\uD1A0\uD070 ID, \uCF54\uB4DC \uC2A4\uB2C8\uD3AB, \uC218\uCE58 \uD45C\uC2DC\uC6A9 \uB4F1\uD3ED \uD3F0\uD2B8"
  }
];

// lib/data/themeData.ts
var INITIAL_STUDIO_THEMES = atomTokens.theme.toStudioThemes();
function resolveThemeColors(theme, paletteVariables) {
  if (!paletteVariables || !theme.paletteBindings) {
    return theme.colors;
  }
  const lookup = /* @__PURE__ */ new Map();
  for (const p of paletteVariables) {
    lookup.set(p.id, p.value);
  }
  const pb = theme.paletteBindings;
  return {
    primary: pb.primary && lookup.get(pb.primary) || theme.colors.primary,
    primaryHover: pb.primaryHover && lookup.get(pb.primaryHover) || theme.colors.primaryHover,
    primaryLight: pb.primaryLight && lookup.get(pb.primaryLight) || theme.colors.primaryLight,
    secondary: pb.secondary && lookup.get(pb.secondary) || theme.colors.secondary || (theme.mode === "dark" ? "#334155" : "#e2e8f0"),
    secondaryHover: pb.secondaryHover && lookup.get(pb.secondaryHover) || theme.colors.secondaryHover || (theme.mode === "dark" ? "#475569" : "#cbd5e1"),
    secondaryLight: pb.secondaryLight && lookup.get(pb.secondaryLight) || theme.colors.secondaryLight || (theme.mode === "dark" ? "#1e293b" : "#f8fafc"),
    bgPrimary: pb.bgPrimary && lookup.get(pb.bgPrimary) || theme.colors.bgPrimary,
    bgSecondary: pb.bgSecondary && lookup.get(pb.bgSecondary) || theme.colors.bgSecondary,
    textPrimary: pb.textPrimary && lookup.get(pb.textPrimary) || theme.colors.textPrimary,
    textSecondary: pb.textSecondary && lookup.get(pb.textSecondary) || theme.colors.textSecondary,
    textMuted: pb.textMuted && lookup.get(pb.textMuted) || theme.colors.textMuted,
    borderSubtle: pb.borderSubtle && lookup.get(pb.borderSubtle) || theme.colors.borderSubtle,
    borderStrong: pb.borderStrong && lookup.get(pb.borderStrong) || theme.colors.borderStrong,
    statusSuccess: pb.statusSuccess && lookup.get(pb.statusSuccess) || theme.colors.statusSuccess,
    statusDanger: pb.statusDanger && lookup.get(pb.statusDanger) || theme.colors.statusDanger,
    statusWarning: pb.statusWarning && lookup.get(pb.statusWarning) || theme.colors.statusWarning
  };
}
function studioThemeToThemeConfig(st, palettes) {
  const resolvedColors = palettes ? resolveThemeColors(st, palettes) : st.colors;
  const fontSansToken = palettes?.find((p) => p.id === "--atom-font-sans")?.value;
  return {
    color: { ...resolvedColors },
    borderRadius: st.borderRadius,
    typography: {
      ...DEFAULT_THEME_CONFIG.typography,
      fontFamily: fontSansToken || st.fontFamily || DEFAULT_THEME_CONFIG.typography.fontFamily
    },
    buttonSpacing: {
      paddingY: "8px",
      paddingX: "16px"
    }
  };
}

export { AI_COMPONENT_SUBMISSION_TEMPLATE, AtomTokenSystem, COLOR_PRESETS, COMPONENT_STATUS_PRESETS, ComponentTokenLayer, DEFAULT_BRAND_CONFIG, DEFAULT_COMPONENT_TYPES, DEFAULT_THEME_CONFIG, FONT_FAMILY_PRESETS, INITIAL_PALETTE_VARIABLES, INITIAL_SEMANTIC_STATUS_TOKENS, INITIAL_STUDIO_COMPONENTS, INITIAL_STUDIO_THEMES, PaletteTokenLayer, SEMANTIC_VARIABLE_DICTIONARY, ThemeTokenLayer, TokenReferenceResolver, UNIFIED_TOKENS_DOCUMENT, atomTokens, buildAiComponentSubmissionPrompt, componentTokens, getComponentStatusProperties, getComponentTypes, isUnifiedTokensDocument, paletteTokens, resolveStudioComponentId, resolveThemeColors, resolveTypeSpec, resolveVariableRole, studioThemeToThemeConfig, themeTokens, tokenResolver };
//# sourceMappingURL=chunk-NPYZNBUR.js.map
//# sourceMappingURL=chunk-NPYZNBUR.js.map