#!/usr/bin/env node
'use strict';

var fs8 = require('fs');
var path8 = require('path');
var url = require('url');
var inquirer = require('inquirer');
var http = require('http');
var child_process = require('child_process');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var fs8__default = /*#__PURE__*/_interopDefault(fs8);
var path8__default = /*#__PURE__*/_interopDefault(path8);
var inquirer__default = /*#__PURE__*/_interopDefault(inquirer);
var http__default = /*#__PURE__*/_interopDefault(http);

// tokens/tokens.json
var tokens_default = {
  $schema: "https://design-tokens.github.io/community-group/format/",
  registrySchema: "https://system.atomground.com/schemas/studio-registry.schema.json",
  name: "AtomDesignToken System",
  version: "0.14.2",
  updatedAt: "2026-11-26T07:07:07.618Z",
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
    const path9 = this.resolver.getPathByVariable(cssVar);
    if (!path9 || !path9.startsWith("palette.")) return void 0;
    return this.resolver.getNode(path9);
  }
  getPathForVariable(cssVar) {
    const path9 = this.resolver.getPathByVariable(cssVar);
    return path9 && path9.startsWith("palette.") ? path9 : void 0;
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

// lib/tokens/index.ts
var UNIFIED_TOKENS_DOCUMENT = tokens_default;
var atomTokens = AtomTokenSystem.fromDocument(
  UNIFIED_TOKENS_DOCUMENT
);
atomTokens.palette;
atomTokens.theme;
atomTokens.components;
atomTokens.resolver;

// src/tokenCompiler.ts
function resolveLegacyValue(rawVal, resolver) {
  if (typeof rawVal !== "string") return String(rawVal ?? "");
  return resolver.resolveCssReference(rawVal);
}
function compileTokensToCss(tokenJson) {
  if (isUnifiedTokensDocument(tokenJson)) {
    return compileUnifiedTokensToCss(tokenJson);
  }
  const resolver = new TokenReferenceResolver(tokenJson);
  const cssVars = [];
  function traverse(obj) {
    if (!obj || typeof obj !== "object") return;
    if (obj.variable && typeof obj.$value === "string") {
      cssVars.push(`  ${obj.variable}: ${resolveLegacyValue(obj.$value, resolver)};`);
    }
    for (const key of Object.keys(obj)) {
      if (key.startsWith("$") || key === "variable" || key === "name") continue;
      if (key === "components" || key === "presets") continue;
      traverse(obj[key]);
    }
  }
  traverse(tokenJson);
  return `:root {
${cssVars.join("\n")}
}
`;
}
function buildPresetCssVars(preset, resolver) {
  const vars = [];
  const t = preset.tokens || {};
  const resolve = (val) => val ? resolver.resolveCssReference(val) : "";
  const primary = resolve(t.primary?.$value || preset.brandColor);
  const primaryHover = resolve(t.primaryHover?.$value);
  const primaryLight = resolve(t.primaryLight?.$value);
  const bgPrimary = resolve(t.bgPrimary?.$value);
  const bgSecondary = resolve(t.bgSecondary?.$value);
  const secondary = resolve(t.secondary?.$value) || bgSecondary;
  const secondaryHover = resolve(t.secondaryHover?.$value) || resolve(t.borderStrong?.$value);
  const secondaryLight = resolve(t.secondaryLight?.$value) || bgSecondary;
  const textPrimary = resolve(t.textPrimary?.$value);
  const textSecondary = resolve(t.textSecondary?.$value);
  const textMuted = resolve(t.textMuted?.$value);
  const borderSubtle = resolve(t.borderSubtle?.$value);
  const borderStrong = resolve(t.borderStrong?.$value);
  const statusSuccess = resolve(t.statusSuccess?.$value);
  const statusDanger = resolve(t.statusDanger?.$value);
  const statusWarning = resolve(t.statusWarning?.$value);
  const radius = resolve(preset.borderRadius);
  if (primary) {
    vars.push(`  --atom-color-primary: ${primary};`);
    vars.push(`  --atom-primary: ${primary};`);
    vars.push(`  --accent-primary: ${primary};`);
  }
  if (primaryHover) {
    vars.push(`  --atom-color-primary-hover: ${primaryHover};`);
    vars.push(`  --accent-primary-hover: ${primaryHover};`);
  }
  if (primaryLight) vars.push(`  --atom-color-primary-subtle: ${primaryLight};`);
  if (secondary) vars.push(`  --atom-color-secondary: ${secondary};`);
  if (secondaryHover) vars.push(`  --atom-color-secondary-hover: ${secondaryHover};`);
  if (secondaryLight) vars.push(`  --atom-color-secondary-subtle: ${secondaryLight};`);
  if (bgPrimary) {
    vars.push(`  --atom-bg-primary: ${bgPrimary};`);
    vars.push(`  --bg-primary: ${bgPrimary};`);
  }
  if (bgSecondary) {
    vars.push(`  --atom-bg-secondary: ${bgSecondary};`);
    vars.push(`  --atom-bg-surface: ${bgSecondary};`);
    vars.push(`  --atom-bg-muted: ${bgSecondary};`);
    vars.push(`  --bg-secondary: ${bgSecondary};`);
  }
  if (textPrimary) {
    vars.push(`  --atom-text-primary: ${textPrimary};`);
    vars.push(`  --text-primary: ${textPrimary};`);
  }
  if (textSecondary) {
    vars.push(`  --atom-text-secondary: ${textSecondary};`);
    vars.push(`  --text-secondary: ${textSecondary};`);
  }
  if (textMuted) {
    vars.push(`  --atom-text-muted: ${textMuted};`);
    vars.push(`  --text-muted: ${textMuted};`);
  }
  if (borderSubtle) {
    vars.push(`  --atom-border-subtle: ${borderSubtle};`);
    vars.push(`  --border-subtle: ${borderSubtle};`);
  }
  if (borderStrong) {
    vars.push(`  --atom-border-strong: ${borderStrong};`);
    vars.push(`  --border-strong: ${borderStrong};`);
  }
  if (statusSuccess) vars.push(`  --atom-color-success: ${statusSuccess};`);
  if (statusDanger) vars.push(`  --atom-color-destructive: ${statusDanger};`);
  if (statusWarning) vars.push(`  --atom-color-warning: ${statusWarning};`);
  if (radius) vars.push(`  --radius: ${radius};`);
  if (preset.mode) vars.push(`  color-scheme: ${preset.mode};`);
  return vars;
}
function mapComponentPropToSemanticVar(compId, propKey, cssVal) {
  if (!cssVal) return cssVal;
  if (propKey === "background" || propKey === "activeBackground") {
    if (cssVal === "var(--atom-palette-white)") {
      return compId === "card" ? "var(--atom-bg-surface)" : "var(--atom-bg-primary)";
    }
    if (cssVal === "var(--atom-palette-gray-50)" || cssVal === "var(--atom-palette-gray-100)") {
      return "var(--atom-bg-secondary)";
    }
  }
  if (propKey === "borderColor") {
    if (cssVal === "var(--atom-palette-gray-100)" || cssVal === "var(--atom-palette-gray-200)") {
      return "var(--atom-border-subtle)";
    }
    if (cssVal === "var(--atom-palette-gray-300)") {
      return "var(--atom-border-strong)";
    }
  }
  if (propKey === "textColor" || propKey === "activeText" || propKey === "inactiveText") {
    if (cssVal === "var(--atom-palette-gray-900)") return "var(--atom-text-primary)";
    if (cssVal === "var(--atom-palette-gray-700)") return "var(--atom-text-secondary)";
    if (cssVal === "var(--atom-palette-gray-500)") return "var(--atom-text-muted)";
  }
  return cssVal;
}
function compileUnifiedTokensToCss(doc) {
  const resolver = new TokenReferenceResolver(doc);
  const cdnUrls = /* @__PURE__ */ new Set();
  const paletteVars = [];
  const semanticVars = [];
  const componentBlocks = [];
  const themePresetBlocks = [];
  function collectPalette(obj, skipScale = false) {
    if (!obj || typeof obj !== "object") return;
    if (typeof obj.cdnUrl === "string" && obj.cdnUrl.trim()) {
      cdnUrls.add(obj.cdnUrl.trim());
    }
    if (typeof obj.variable === "string" && typeof obj.$value === "string") {
      if (obj.variable === "--atom-font-sans" && obj.$value.includes("Spoqa Han Sans Neo") && !obj.cdnUrl) {
        cdnUrls.add("https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css");
      }
      paletteVars.push(`  ${obj.variable}: ${obj.$value};`);
      return;
    }
    for (const [key, child] of Object.entries(obj)) {
      if (key.startsWith("$") || skipScale && key === "scale") continue;
      if (child && typeof child === "object") {
        collectPalette(child, key === "typography");
      }
    }
  }
  collectPalette(doc.palette);
  function collectSemantic(obj) {
    if (!obj || typeof obj !== "object") return;
    if (typeof obj.variable === "string" && typeof obj.$value === "string") {
      const cssVal = resolver.resolveCssReference(obj.$value);
      semanticVars.push(`  ${obj.variable}: ${cssVal};`);
    }
    for (const [key, child] of Object.entries(obj)) {
      if (key.startsWith("$") || key === "variable" || key === "name") continue;
      if (child && typeof child === "object") {
        collectSemantic(child);
      }
    }
  }
  collectSemantic(doc.theme?.semantic);
  const presets = doc.theme?.presets || {};
  const activePresetId = doc.theme?.activeThemeId;
  const activePreset = activePresetId ? presets[activePresetId] : void 0;
  const activePresetVars = activePreset ? buildPresetCssVars(activePreset, resolver) : [];
  for (const [presetId, preset] of Object.entries(presets)) {
    const presetVars = buildPresetCssVars(preset, resolver);
    if (presetVars.length > 0) {
      themePresetBlocks.push(`[data-atom-theme="${presetId}"] {
${presetVars.join("\n")}
}`);
    }
  }
  for (const [compId, comp] of Object.entries(doc.components || {})) {
    for (const [varId, vNode] of Object.entries(comp.variables || {})) {
      const lines = [];
      for (const [propKey, binding] of Object.entries(vNode.tokens || {})) {
        const rawCssVal = resolver.resolveCssReference(binding.$value);
        const cssVal = mapComponentPropToSemanticVar(compId, propKey, rawCssVal);
        if (cssVal) {
          lines.push(`  --atom-${compId}-${varId}-${propKey}: ${cssVal};`);
        }
      }
      if (lines.length > 0) {
        componentBlocks.push(
          `[data-component="${compId}"][data-variable="${varId}"],
.atom-${compId}--${varId} {
${lines.join("\n")}
}`
        );
      }
    }
  }
  const imports = Array.from(cdnUrls).map((u) => `@import url("${u}");`).join("\n");
  const parts = [];
  if (imports) parts.push(imports);
  const activeThemeComment = activePresetId ? `

  /* Active Theme Preset (${activePresetId}) */
${activePresetVars.join("\n")}` : "";
  parts.push(
    `:root {
  /* Palette Primitives */
${paletteVars.join("\n")}

  /* Theme Semantics */
${semanticVars.join("\n")}
  --accent-primary: var(--atom-color-primary);
  --accent-primary-hover: var(--atom-color-primary-hover);
  --font-sans: var(--atom-font-sans);
  --font-mono: var(--atom-font-mono);${activeThemeComment}
}`
  );
  if (themePresetBlocks.length > 0) {
    parts.push(`/* Theme Presets (data-atom-theme) */
${themePresetBlocks.join("\n\n")}`);
  }
  if (componentBlocks.length > 0) {
    parts.push(`/* Component Scoped Variables */
${componentBlocks.join("\n\n")}`);
  }
  return `${parts.join("\n\n")}
`;
}

// lib/data/themeData.ts
var INITIAL_STUDIO_THEMES = atomTokens.theme.toStudioThemes();

// lib/services/studioEngine.ts
var STUDIO_CUSTOM_STYLES_START = "/* === Studio Registered Component Styles Start === */";
var STUDIO_CUSTOM_STYLES_END = "/* === Studio Registered Component Styles End === */";
var BUILTIN_CSS_HANDLED_IDS = /* @__PURE__ */ new Set([
  "button",
  "badge",
  "card",
  "input",
  "navbar",
  "sidebar",
  "alert",
  "tree"
]);
function exportStudioToTokensJson(palette, components, statusTokens = INITIAL_SEMANTIC_STATUS_TOKENS, options) {
  const baseDocument = options?.baseDocument || UNIFIED_TOKENS_DOCUMENT;
  const system = AtomTokenSystem.fromStudioRegistry(
    {
      version: options?.version || baseDocument.version || "0.14.2",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      activeThemeId: options?.activeThemeId || baseDocument.theme?.activeThemeId || "ocean-blue",
      ...options?.brand ? { brand: options.brand } : {},
      statusTokens,
      paletteVariables: palette,
      components,
      ...options?.themes ? { themes: options.themes } : {}
    },
    {
      themes: options?.themes,
      baseDocument
    }
  );
  return `${system.toJson(true)}
`;
}
function exportStudioToCSS(palette, components, statusTokens = INITIAL_SEMANTIC_STATUS_TOKENS, basePalette = UNIFIED_TOKENS_DOCUMENT.palette) {
  const cdnUrls = /* @__PURE__ */ new Set();
  palette.forEach((p) => {
    if (p.cdnUrl && p.cdnUrl.trim()) {
      cdnUrls.add(p.cdnUrl.trim());
    } else if (p.id === "--atom-font-sans" && p.value.includes("Spoqa Han Sans Neo")) {
      cdnUrls.add("https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css");
    }
  });
  const importBlock = Array.from(cdnUrls).map((url) => `@import url("${url}");`).join("\n");
  let css = `${importBlock ? `${importBlock}

` : ""}/**
 * AtomDesignToken Studio Variables & Components CSS
 * Auto-generated by AtomDesignToken Studio from tokens/tokens.json
 */

:root {
  /* === 1. Global Palette Tokens === */
`;
  const emittedVars = /* @__PURE__ */ new Set();
  palette.forEach((p) => {
    emittedVars.add(p.id);
    css += `  ${p.id}: ${p.value}; /* ${p.name} */
`;
  });
  if (basePalette?.shadow) {
    Object.values(basePalette.shadow).forEach((s) => {
      if (s.variable && !emittedVars.has(s.variable)) {
        emittedVars.add(s.variable);
        css += `  ${s.variable}: ${s.$value}; /* ${s.name || s.variable} */
`;
      }
    });
  }
  if (basePalette?.layout) {
    for (const grp of [basePalette.layout.container, basePalette.layout.gutter, basePalette.layout.gap]) {
      if (!grp) continue;
      Object.values(grp).forEach((l) => {
        if (l.variable && !emittedVars.has(l.variable)) {
          emittedVars.add(l.variable);
          css += `  ${l.variable}: ${l.$value}; /* ${l.name || l.variable} */
`;
        }
      });
    }
  }
  css += `
  /* === 2. Semantic System State Tokens (\uC0C1\uD0DC \uD1A0\uD070) === */
`;
  statusTokens.forEach((st) => {
    css += `  ${st.id}: var(${st.paletteId}); /* ${st.name} */
`;
    if (st.hoverPaletteId) {
      css += `  ${st.id}-hover: var(${st.hoverPaletteId});
`;
    }
    if (st.subtlePaletteId) {
      css += `  ${st.id}-subtle: var(${st.subtlePaletteId});
`;
    }
  });
  css += `
  /* === 3. Universal Semantic Aliases (\uC0C1\uD0DC \uD1A0\uD070 \uC804\uC5ED \uBC14\uC778\uB529) === */
`;
  css += `  --atom-primary: var(--atom-color-primary);
`;
  css += `  --atom-primary-hover: var(--atom-color-primary-hover);
`;
  css += `  --atom-primary-light: var(--atom-color-primary-subtle);
`;
  css += `  --atom-secondary: var(--atom-color-secondary);
`;
  css += `  --atom-secondary-hover: var(--atom-color-secondary-hover);
`;
  css += `  --atom-secondary-light: var(--atom-color-secondary-subtle);
`;
  css += `  --atom-success: var(--atom-color-success);
`;
  css += `  --atom-success-hover: var(--atom-color-success-hover);
`;
  css += `  --atom-success-light: var(--atom-color-success-subtle);
`;
  css += `  --atom-destructive: var(--atom-color-danger);
`;
  css += `  --atom-destructive-hover: var(--atom-color-danger-hover);
`;
  css += `  --atom-destructive-light: var(--atom-color-danger-subtle);
`;
  css += `  --atom-warning: var(--atom-color-warning);
`;
  css += `  --atom-warning-hover: var(--atom-color-warning-hover);
`;
  css += `  --atom-warning-light: var(--atom-color-warning-subtle);
`;
  css += `  --atom-status-success: var(--atom-color-success);
`;
  css += `  --atom-status-danger: var(--atom-color-danger);
`;
  css += `  --atom-status-warning: var(--atom-color-warning);
`;
  css += `  --accent-primary: var(--atom-color-primary);
`;
  css += `  --accent-primary-hover: var(--atom-color-primary-hover);
`;
  css += `  --font-sans: var(--atom-font-sans, 'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, sans-serif);
`;
  css += `  --font-mono: var(--atom-font-mono, 'JetBrains Mono', monospace);
`;
  css += `}

body {
  font-family: var(--atom-font-sans, var(--font-sans));
}

/* === Universal Interaction Status Attributes (Code-Connected Status System) === */
`;
  css += `[data-status="hover"], .atom-status--hover { filter: brightness(0.95); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12); cursor: pointer; }
`;
  css += `[data-status="active"], .atom-status--active { transform: scale(0.97); filter: brightness(0.9); }
`;
  css += `[data-status="focus"], .atom-status--focus { outline: 2px solid var(--accent-primary, var(--atom-color-primary)); outline-offset: 2px; }
`;
  css += `[data-status="disabled"], .atom-status--disabled, :disabled { opacity: 0.45 !important; cursor: not-allowed !important; pointer-events: none !important; }
`;
  css += `[data-status="loading"], .atom-status--loading { opacity: 0.85 !important; cursor: wait !important; pointer-events: none !important; }

`;
  css += `/* === 4. Component Variable Token Scopes & Direct Visual Selectors === */
`;
  components.forEach((comp) => {
    comp.variables.forEach((v) => {
      css += `[data-component="${comp.id}"][data-variable="${v.id}"],
.atom-${comp.id}--${v.id} {
`;
      Object.entries(v.tokenBindings).forEach(([propKey, paletteId]) => {
        const cssVarName = `--atom-${comp.id}-${v.id}-${propKey}`;
        css += `  ${cssVarName}: var(${paletteId});
`;
      });
      css += `}

`;
      if (comp.id === "button") {
        css += `.atom-btn.atom-button--${v.id},
.atom-btn[data-variable="${v.id}"],
[data-component="button"][data-variable="${v.id}"] {
`;
        if (v.tokenBindings.background) css += `  background-color: var(--atom-${comp.id}-${v.id}-background);
`;
        if (v.tokenBindings.textColor) css += `  color: var(--atom-${comp.id}-${v.id}-textColor);
`;
        if (v.tokenBindings.borderColor) css += `  border-color: var(--atom-${comp.id}-${v.id}-borderColor);
`;
        if (v.tokenBindings.borderRadius) css += `  border-radius: var(--atom-${comp.id}-${v.id}-borderRadius);
`;
        if (v.tokenBindings.paddingX || v.tokenBindings.paddingY) {
          const py = v.tokenBindings.paddingY ? `var(--atom-${comp.id}-${v.id}-paddingY)` : "8px";
          const px = v.tokenBindings.paddingX ? `var(--atom-${comp.id}-${v.id}-paddingX)` : "16px";
          css += `  padding: ${py} ${px};
`;
        }
        css += `}
`;
        if (v.tokenBindings.hoverBackground) {
          css += `.atom-btn.atom-button--${v.id}:hover:not(:disabled),
.atom-btn[data-variable="${v.id}"]:hover:not(:disabled),
[data-component="button"][data-variable="${v.id}"]:hover:not(:disabled) {
`;
          css += `  background-color: var(--atom-${comp.id}-${v.id}-hoverBackground);
`;
          css += `}

`;
        }
      } else if (comp.id === "badge") {
        css += `.atom-badge.atom-badge--${v.id},
.atom-badge[data-variable="${v.id}"],
[data-component="badge"][data-variable="${v.id}"] {
`;
        if (v.tokenBindings.background) css += `  background-color: var(--atom-${comp.id}-${v.id}-background);
`;
        if (v.tokenBindings.textColor) css += `  color: var(--atom-${comp.id}-${v.id}-textColor);
`;
        if (v.tokenBindings.borderColor) css += `  border-color: var(--atom-${comp.id}-${v.id}-borderColor);
`;
        if (v.tokenBindings.borderRadius) css += `  border-radius: var(--atom-${comp.id}-${v.id}-borderRadius);
`;
        if (v.tokenBindings.paddingX || v.tokenBindings.paddingY) {
          const py = v.tokenBindings.paddingY ? `var(--atom-${comp.id}-${v.id}-paddingY)` : "2px";
          const px = v.tokenBindings.paddingX ? `var(--atom-${comp.id}-${v.id}-paddingX)` : "8px";
          css += `  padding: ${py} ${px};
`;
        }
        css += `}

`;
      } else if (comp.id === "card") {
        css += `.atom-card.atom-card--${v.id},
.atom-card[data-variable="${v.id}"],
[data-component="card"][data-variable="${v.id}"] {
`;
        if (v.tokenBindings.background) css += `  background-color: var(--atom-${comp.id}-${v.id}-background);
`;
        if (v.tokenBindings.borderColor) css += `  border-color: var(--atom-${comp.id}-${v.id}-borderColor);
`;
        if (v.tokenBindings.borderRadius) css += `  border-radius: var(--atom-${comp.id}-${v.id}-borderRadius);
`;
        if (v.tokenBindings.padding) css += `  padding: var(--atom-${comp.id}-${v.id}-padding);
`;
        css += `}

`;
      } else if (comp.id === "input") {
        css += `.atom-input.atom-input--${v.id},
.atom-input[data-variable="${v.id}"],
[data-component="input"][data-variable="${v.id}"] {
`;
        if (v.tokenBindings.background) css += `  background-color: var(--atom-${comp.id}-${v.id}-background);
`;
        if (v.tokenBindings.borderColor) css += `  border-color: var(--atom-${comp.id}-${v.id}-borderColor);
`;
        if (v.tokenBindings.borderRadius) css += `  border-radius: var(--atom-${comp.id}-${v.id}-borderRadius);
`;
        if (v.tokenBindings.textColor) css += `  color: var(--atom-${comp.id}-${v.id}-textColor);
`;
        if (v.tokenBindings.paddingX || v.tokenBindings.paddingY) {
          const py = v.tokenBindings.paddingY ? `var(--atom-${comp.id}-${v.id}-paddingY)` : "8px";
          const px = v.tokenBindings.paddingX ? `var(--atom-${comp.id}-${v.id}-paddingX)` : "12px";
          css += `  padding: ${py} ${px};
`;
        }
        css += `}
`;
        if (v.tokenBindings.focusBorderColor) {
          css += `.atom-input.atom-input--${v.id}:focus,
.atom-input[data-variable="${v.id}"]:focus,
[data-component="input"][data-variable="${v.id}"]:focus {
`;
          css += `  border-color: var(--atom-${comp.id}-${v.id}-focusBorderColor);
`;
          css += `  outline: 2px solid var(--atom-${comp.id}-${v.id}-focusBorderColor);
`;
          css += `}

`;
        }
      } else if (comp.id === "navbar") {
        css += `.atom-navbar.atom-navbar--${v.id},
.atom-navbar[data-variable="${v.id}"],
[data-component="navbar"][data-variable="${v.id}"] {
`;
        if (v.tokenBindings.background) css += `  background-color: var(--atom-${comp.id}-${v.id}-background);
`;
        if (v.tokenBindings.borderColor) css += `  border-color: var(--atom-${comp.id}-${v.id}-borderColor);
`;
        if (v.tokenBindings.borderRadius) css += `  border-radius: var(--atom-${comp.id}-${v.id}-borderRadius);
`;
        if (v.tokenBindings.textColor) css += `  color: var(--atom-${comp.id}-${v.id}-textColor);
`;
        css += `}

`;
      } else if (comp.id === "sidebar") {
        css += `.atom-sidebar.atom-sidebar--${v.id},
.atom-sidebar[data-variable="${v.id}"],
[data-component="sidebar"][data-variable="${v.id}"] {
`;
        if (v.tokenBindings.background) css += `  background-color: var(--atom-${comp.id}-${v.id}-background);
`;
        if (v.tokenBindings.borderColor) css += `  border-color: var(--atom-${comp.id}-${v.id}-borderColor);
`;
        if (v.tokenBindings.textColor) css += `  color: var(--atom-${comp.id}-${v.id}-textColor);
`;
        css += `}
`;
        if (v.tokenBindings.activeBackground || v.tokenBindings.activeText) {
          css += `.atom-sidebar.atom-sidebar--${v.id} [aria-current="page"],
.atom-sidebar[data-variable="${v.id}"] [aria-current="page"] {
`;
          if (v.tokenBindings.activeBackground) css += `  background-color: var(--atom-${comp.id}-${v.id}-activeBackground);
`;
          if (v.tokenBindings.activeText) css += `  color: var(--atom-${comp.id}-${v.id}-activeText);
`;
          css += `}

`;
        }
      } else if (comp.id === "alert") {
        css += `.atom-alert.atom-alert--${v.id},
.atom-alert[data-variable="${v.id}"],
[data-component="alert"][data-variable="${v.id}"] {
`;
        if (v.tokenBindings.background) css += `  background-color: var(--atom-${comp.id}-${v.id}-background);
`;
        if (v.tokenBindings.borderColor) css += `  border-color: var(--atom-${comp.id}-${v.id}-borderColor);
`;
        if (v.tokenBindings.textColor) css += `  color: var(--atom-${comp.id}-${v.id}-textColor);
`;
        if (v.tokenBindings.borderRadius) css += `  border-radius: var(--atom-${comp.id}-${v.id}-borderRadius);
`;
        if (v.tokenBindings.padding) css += `  padding: var(--atom-${comp.id}-${v.id}-padding);
`;
        css += `}

`;
      } else if (comp.id === "tree") {
        css += `.atom-tree.atom-tree--${v.id},
.atom-tree[data-variable="${v.id}"],
[data-component="tree"][data-variable="${v.id}"] {
`;
        if (v.tokenBindings.background) css += `  background-color: var(--atom-${comp.id}-${v.id}-background);
`;
        if (v.tokenBindings.borderColor) css += `  border-color: var(--atom-${comp.id}-${v.id}-borderColor);
`;
        if (v.tokenBindings.textColor) css += `  color: var(--atom-${comp.id}-${v.id}-textColor);
`;
        if (v.tokenBindings.borderRadius) css += `  border-radius: var(--atom-${comp.id}-${v.id}-borderRadius);
`;
        if (v.tokenBindings.padding) css += `  padding: var(--atom-${comp.id}-${v.id}-padding);
`;
        css += `}
`;
        if (v.tokenBindings.activeBackground || v.tokenBindings.activeText) {
          css += `.atom-tree.atom-tree--${v.id} .atom-tree-node.is-selected,
[data-component="tree"][data-variable="${v.id}"] .atom-tree-node.is-selected {
`;
          if (v.tokenBindings.activeBackground) css += `  background-color: var(--atom-${comp.id}-${v.id}-activeBackground);
`;
          if (v.tokenBindings.activeText) css += `  color: var(--atom-${comp.id}-${v.id}-activeText);
`;
          css += `}

`;
        }
      }
    });
  });
  const customStyles = exportStudioCustomComponentStyles(components);
  if (customStyles) {
    css += `
${customStyles}
`;
  }
  return css;
}
function exportStudioCustomComponentStyles(components) {
  const blocks = [];
  components.forEach((comp) => {
    if (!BUILTIN_CSS_HANDLED_IDS.has(comp.id)) {
      const varBlocks = [];
      comp.variables.forEach((v) => {
        const b = v.tokenBindings || {};
        const lines = [];
        if (b.background) lines.push(`  background-color: var(--atom-${comp.id}-${v.id}-background, var(${b.background}));`);
        if (b.textColor) lines.push(`  color: var(--atom-${comp.id}-${v.id}-textColor, var(${b.textColor}));`);
        if (b.borderColor) {
          lines.push(`  border-color: var(--atom-${comp.id}-${v.id}-borderColor, var(${b.borderColor}));`);
          lines.push(`  border-style: solid;`);
          lines.push(`  border-width: 1px;`);
        }
        if (b.borderRadius) lines.push(`  border-radius: var(--atom-${comp.id}-${v.id}-borderRadius, var(${b.borderRadius}));`);
        if (b.padding) {
          lines.push(`  padding: var(--atom-${comp.id}-${v.id}-padding, var(${b.padding}));`);
        } else if (b.paddingX || b.paddingY) {
          const py = b.paddingY ? `var(--atom-${comp.id}-${v.id}-paddingY, var(${b.paddingY}))` : "8px";
          const px = b.paddingX ? `var(--atom-${comp.id}-${v.id}-paddingX, var(${b.paddingX}))` : "14px";
          lines.push(`  padding: ${py} ${px};`);
        }
        if (lines.length > 0) {
          varBlocks.push(
            `.atom-${comp.id}.atom-${comp.id}--${v.id},
.atom-${comp.id}[data-variable="${v.id}"],
[data-component="${comp.id}"][data-variable="${v.id}"] {
${lines.join("\n")}
}`
          );
        }
        const hoverLines = [];
        if (b.hoverBackground) hoverLines.push(`  background-color: var(--atom-${comp.id}-${v.id}-hoverBackground, var(${b.hoverBackground}));`);
        if (b.hoverTextColor) hoverLines.push(`  color: var(--atom-${comp.id}-${v.id}-hoverTextColor, var(${b.hoverTextColor}));`);
        if (b.hoverBorderColor) hoverLines.push(`  border-color: var(--atom-${comp.id}-${v.id}-hoverBorderColor, var(${b.hoverBorderColor}));`);
        if (hoverLines.length > 0) {
          varBlocks.push(
            `.atom-${comp.id}[data-variable="${v.id}"]:hover:not(:disabled),
[data-component="${comp.id}"][data-variable="${v.id}"]:hover:not(:disabled) {
${hoverLines.join("\n")}
}`
          );
        }
      });
      if (varBlocks.length > 0) {
        blocks.push(`/* Component: ${comp.id} */
${varBlocks.join("\n")}`);
      }
    }
    (comp.types || []).forEach((tp) => {
      if (!tp.visualTraits) return;
      const traitLines = [];
      if (tp.visualTraits.hasBackground === false) traitLines.push(`  background-color: transparent;`);
      if (tp.visualTraits.hasBorder === false) traitLines.push(`  border-color: transparent;`);
      else if (tp.visualTraits.hasBorder === true) traitLines.push(`  border-style: solid; border-width: 1px;`);
      if (tp.visualTraits.borderRadius) traitLines.push(`  border-radius: ${tp.visualTraits.borderRadius};`);
      if (tp.visualTraits.shadow) traitLines.push(`  box-shadow: ${tp.visualTraits.shadow};`);
      if (traitLines.length > 0) {
        blocks.push(
          `[data-component="${comp.id}"][data-type="${tp.id}"],
.atom-${comp.id}--type-${tp.id} {
${traitLines.join("\n")}
}`
        );
      }
    });
    if (comp.customCss && comp.customCss.trim()) {
      blocks.push(`/* Custom CSS: ${comp.id} */
${comp.customCss.trim()}`);
    }
  });
  if (blocks.length === 0) return "";
  return `${STUDIO_CUSTOM_STYLES_START}
${blocks.join("\n\n")}
${STUDIO_CUSTOM_STYLES_END}`;
}
var VALID_CATEGORIES = /* @__PURE__ */ new Set(["Form", "Layout", "Feedback", "Navigation", "Data"]);
var KEBAB_ID_RE = /^[a-z][a-z0-9-]{0,62}$/;
function toPascalCase(kebabId) {
  return (kebabId || "").split(/[^a-zA-Z0-9]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}
function toKebabCase(name) {
  return (name || "").replace(/\.tsx?$/i, "").replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").toLowerCase();
}
function validateSubmissionSpec(raw) {
  const errors = [];
  if (!raw || typeof raw !== "object") {
    return { valid: false, errors: ["Submission payload must be a JSON object."] };
  }
  const obj = raw;
  const id = typeof obj.id === "string" ? obj.id.trim().toLowerCase() : "";
  const name = typeof obj.name === "string" ? obj.name.trim() : "";
  const category = typeof obj.category === "string" ? obj.category.trim() : "";
  const description = typeof obj.description === "string" ? obj.description.trim() : "";
  if (!id || !KEBAB_ID_RE.test(id)) {
    errors.push('Field "id" must be lowercase kebab-case starting with a letter (e.g. "rating-chip").');
  }
  if (!name) {
    errors.push('Field "name" is required (e.g. "Rating Chip (\uBCC4\uC810 \uD3C9\uAC00 \uCE69)").');
  }
  if (!VALID_CATEGORIES.has(category)) {
    errors.push('Field "category" must be one of: Form, Layout, Feedback, Navigation, Data.');
  }
  if (!description) {
    errors.push('Field "description" is required.');
  }
  const rawTypes = Array.isArray(obj.types) ? obj.types : [];
  if (rawTypes.length === 0) {
    errors.push('Field "types" must be a non-empty array declaring at least one Type (e.g. solid, soft, outlined).');
  }
  const types = rawTypes.map((item, idx) => {
    const t = item && typeof item === "object" ? item : {};
    const tId = typeof t.id === "string" ? t.id.trim().toLowerCase() : "";
    const tName = typeof t.name === "string" ? t.name.trim() : "";
    const whenToUse = typeof t.whenToUse === "string" ? t.whenToUse.trim() : "";
    if (!tId) errors.push(`types[${idx}].id is required.`);
    if (!tName) errors.push(`types[${idx}].name is required.`);
    if (!whenToUse) errors.push(`types[${idx}].whenToUse is required.`);
    return {
      id: tId || `type-${idx + 1}`,
      name: tName || tId || `Type ${idx + 1}`,
      description: typeof t.description === "string" ? t.description.trim() : "",
      whenToUse: whenToUse || "\uC77C\uBC18\uC801\uC778 \uD654\uBA74 \uBC30\uCE58\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      ...typeof t.whenToUseEn === "string" ? { whenToUseEn: t.whenToUseEn } : {},
      ...typeof t.antiPattern === "string" ? { antiPattern: t.antiPattern } : {},
      ...t.visualTraits && typeof t.visualTraits === "object" ? { visualTraits: t.visualTraits } : {}
    };
  });
  const rawVariables = Array.isArray(obj.variables) ? obj.variables : [];
  if (rawVariables.length === 0) {
    errors.push('Field "variables" must be a non-empty array declaring at least one semantic Variable.');
  }
  const variables = rawVariables.map((item, idx) => {
    const v = item && typeof item === "object" ? item : {};
    const vId = typeof v.id === "string" ? v.id.trim().toLowerCase() : "";
    const vName = typeof v.name === "string" ? v.name.trim() : "";
    const rawBindings = v.tokenBindings && typeof v.tokenBindings === "object" ? v.tokenBindings : null;
    if (!vId) errors.push(`variables[${idx}].id is required.`);
    if (!vName) errors.push(`variables[${idx}].name is required.`);
    if (!rawBindings || Object.keys(rawBindings).length === 0) {
      errors.push(`variables[${idx}].tokenBindings must include at least one CSS token mapping.`);
    }
    const tokenBindings = {};
    if (rawBindings) {
      for (const [k, val] of Object.entries(rawBindings)) {
        if (typeof val === "string" && val.trim()) {
          tokenBindings[k] = val.trim();
        }
      }
    }
    return {
      id: vId || `var-${idx + 1}`,
      name: vName || vId || `Variable ${idx + 1}`,
      description: typeof v.description === "string" ? v.description.trim() : "",
      ...typeof v.variableRole === "string" ? { variableRole: v.variableRole } : {},
      ...Array.isArray(v.supportedStatuses) ? { supportedStatuses: v.supportedStatuses } : {},
      tokenBindings
    };
  });
  const properties = Array.isArray(obj.properties) ? obj.properties.filter((p) => !!p && typeof p === "object").map((p) => ({
    key: String(p.key || "background"),
    label: String(p.label || p.key || "Property"),
    category: ["color", "radius", "spacing", "size", "typography"].includes(String(p.category)) ? p.category : "color",
    defaultPaletteId: String(p.defaultPaletteId || "--atom-color-primary")
  })) : void 0;
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return {
    valid: true,
    spec: {
      id,
      name,
      category,
      description,
      types,
      ...properties && properties.length > 0 ? { properties } : {},
      variables,
      ...Array.isArray(obj.supportedStatuses) ? { supportedStatuses: obj.supportedStatuses } : {},
      ...typeof obj.componentCode === "string" && obj.componentCode.trim() ? { componentCode: obj.componentCode } : {},
      ...typeof obj.overwriteCode === "boolean" ? { overwriteCode: obj.overwriteCode } : {},
      ...typeof obj.customCss === "string" && obj.customCss.trim() ? { customCss: obj.customCss } : {},
      ...obj.docs && typeof obj.docs === "object" ? { docs: obj.docs } : {}
    }
  };
}
function generateComponentTsx(spec) {
  const pascalName = toPascalCase(spec.id);
  const typeUnion = spec.types.map((t) => `'${t.id}'`).join(" | ");
  const varUnion = spec.variables.map((v) => `'${v.id}'`).join(" | ");
  const defaultType = spec.types[0]?.id || "solid";
  const defaultVar = spec.variables[0]?.id || "primary";
  return `'use client';

import React from 'react';

type ComponentInteractiveStatus =
  | 'default'
  | 'hover'
  | 'active'
  | 'focus'
  | 'disabled'
  | 'loading';

export type ${pascalName}Type = ${typeUnion} | (string & {});
export type ${pascalName}Variable = ${varUnion} | (string & {});

export interface ${pascalName}Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  componentType?: ${pascalName}Type;
  variant?: ${pascalName}Variable;
  variable?: ${pascalName}Variable;
  status?: ComponentInteractiveStatus;
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-xs px-2.5 py-1.5 gap-1.5',
  md: 'text-sm px-3.5 py-2 gap-2',
  lg: 'text-base px-4 py-2.5 gap-2.5',
};

/**
 * ${spec.name}
 * ${spec.description}
 * Auto-generated by AtomSystem Studio Scaffolder ([Type \xB7 Variable \xB7 Status]).
 */
export const ${pascalName} = React.forwardRef<HTMLDivElement, ${pascalName}Props>(
  (
    {
      componentType = '${defaultType}',
      variant = '${defaultVar}',
      variable,
      status = 'default',
      size = 'md',
      leftIcon,
      rightIcon,
      title,
      description,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const activeVariable = String(variable || variant || '${defaultVar}');
    const activeType = String(componentType || '${defaultType}');
    const isDisabled = status === 'disabled';
    const isLoading = status === 'loading';
    const isOutlined = activeType.includes('outline');
    const isGhost = activeType.includes('ghost');

    const bgToken = \`var(--atom-${spec.id}-\${activeVariable}-background, var(--bg-secondary))\`;
    const textToken = \`var(--atom-${spec.id}-\${activeVariable}-textColor, var(--text-primary))\`;
    const borderToken = \`var(--atom-${spec.id}-\${activeVariable}-borderColor, var(--border-subtle))\`;
    const radiusToken = \`var(--atom-${spec.id}-\${activeVariable}-borderRadius, var(--radius))\`;

    const computedStyle: React.CSSProperties = {
      backgroundColor: isOutlined || isGhost ? 'transparent' : bgToken,
      color: isOutlined || isGhost ? borderToken : textToken,
      borderColor: isGhost ? 'transparent' : borderToken,
      borderWidth: isGhost ? '1px' : '1px',
      borderStyle: 'solid',
      borderRadius: radiusToken,
      ...(status === 'hover' ? { filter: 'brightness(0.95)' } : {}),
      ...(status === 'active' ? { transform: 'scale(0.97)' } : {}),
      ...(status === 'focus'
        ? { outline: '2px solid var(--accent-primary)', outlineOffset: '2px' }
        : {}),
      ...(isDisabled ? { opacity: 0.45, pointerEvents: 'none' } : {}),
      ...style,
    };

    const statusClass = status && status !== 'default' ? \`atom-status--\${status}\` : '';

    return (
      <div
        ref={ref}
        data-component="${spec.id}"
        data-type={activeType}
        data-variable={activeVariable}
        data-status={status}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        style={computedStyle}
        className={\`atom-${spec.id} atom-${spec.id}--\${activeVariable} atom-${spec.id}--type-\${activeType} \${statusClass} inline-flex items-center font-medium transition-all \${SIZE_CLASSES[size]} \${className}\`}
        {...props}
      >
        {leftIcon && <span className="shrink-0 inline-flex items-center">{leftIcon}</span>}
        <div className="min-w-0 flex-1">
          {title && <div className="font-semibold leading-tight">{title}</div>}
          {description && <div className="text-xs opacity-85 mt-0.5">{description}</div>}
          {children}
        </div>
        {rightIcon && <span className="shrink-0 inline-flex items-center">{rightIcon}</span>}
      </div>
    );
  }
);

${pascalName}.displayName = '${pascalName}';
`;
}
function ensureUiBarrelExport(uiDir, pascalName) {
  const indexPath = path8__default.default.join(uiDir, "index.ts");
  const exportLine = `export * from './${pascalName}';`;
  if (!fs8__default.default.existsSync(indexPath)) {
    fs8__default.default.mkdirSync(uiDir, { recursive: true });
    fs8__default.default.writeFileSync(indexPath, `${exportLine}
`, "utf-8");
    return true;
  }
  const content = fs8__default.default.readFileSync(indexPath, "utf-8");
  const pattern = new RegExp(`export\\s+\\*\\s+from\\s+['"]\\./${pascalName}['"]`);
  if (pattern.test(content)) {
    return false;
  }
  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  const trimmed = content.replace(/\s+$/, "");
  fs8__default.default.writeFileSync(indexPath, `${trimmed}${eol}${exportLine}${eol}`, "utf-8");
  return true;
}

// lib/services/studioRegistryServer.ts
var TOKENS_SSOT_REL_PATH = path8__default.default.join("tokens", "tokens.json");
var LEGACY_REGISTRY_REL_PATH = path8__default.default.join("tokens", "studio.registry.json");
var UNIVERSAL_MARKER = "/* === Universal Component Classes === */";
function readProjectVersion(cwd) {
  try {
    const pkgPath = path8__default.default.join(cwd, "package.json");
    if (fs8__default.default.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs8__default.default.readFileSync(pkgPath, "utf-8"));
      if (pkg?.version) return String(pkg.version);
    }
  } catch {
  }
  return "0.14.2";
}
function buildDefaultPropertiesForSpec(spec) {
  const firstBindings = spec.variables[0]?.tokenBindings || {};
  return [
    {
      key: "background",
      label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)",
      category: "color",
      defaultPaletteId: firstBindings.background || "--atom-color-primary-subtle"
    },
    {
      key: "textColor",
      label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)",
      category: "color",
      defaultPaletteId: firstBindings.textColor || "--atom-color-primary"
    },
    {
      key: "borderColor",
      label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)",
      category: "color",
      defaultPaletteId: firstBindings.borderColor || "--atom-color-primary"
    },
    {
      key: "borderRadius",
      label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)",
      category: "radius",
      defaultPaletteId: firstBindings.borderRadius || "--atom-radius-md"
    },
    {
      key: "paddingX",
      label: "\uC88C\uC6B0 \uD328\uB529 (Padding X)",
      category: "spacing",
      defaultPaletteId: firstBindings.paddingX || "--atom-space-3"
    },
    {
      key: "paddingY",
      label: "\uC0C1\uD558 \uD328\uB529 (Padding Y)",
      category: "spacing",
      defaultPaletteId: firstBindings.paddingY || "--atom-space-1"
    }
  ];
}
function specToStudioDefinition(spec, sourceFile) {
  return {
    id: spec.id,
    name: spec.name,
    category: spec.category,
    description: spec.description,
    types: spec.types,
    supportedStatuses: spec.supportedStatuses || ["default", "hover", "active", "focus", "disabled"],
    properties: spec.properties && spec.properties.length > 0 ? spec.properties : buildDefaultPropertiesForSpec(spec),
    variables: spec.variables,
    sourceFile,
    autoDiscovered: false,
    ...spec.customCss ? { customCss: spec.customCss } : {},
    ...spec.docs ? { docs: spec.docs } : {}
  };
}
function buildBaselineRegistry(cwd) {
  const fromUnified = atomTokens.toRegistry();
  return {
    ...fromUnified,
    version: readProjectVersion(cwd) || fromUnified.version,
    components: fromUnified.components.map((comp) => ({
      ...comp,
      types: comp.types || DEFAULT_COMPONENT_TYPES[comp.id]
    }))
  };
}
function readExistingBaseDocument(cwd) {
  const ssotPath = path8__default.default.join(cwd, TOKENS_SSOT_REL_PATH);
  if (fs8__default.default.existsSync(ssotPath)) {
    try {
      const raw = fs8__default.default.readFileSync(ssotPath, "utf-8");
      if (raw && raw.trim()) {
        const parsed = JSON.parse(raw);
        if (isUnifiedTokensDocument(parsed)) {
          return parsed;
        }
      }
    } catch {
    }
  }
  return UNIFIED_TOKENS_DOCUMENT;
}
function loadProjectRegistry(cwd) {
  const ssotPath = path8__default.default.join(cwd, TOKENS_SSOT_REL_PATH);
  const legacyPath = path8__default.default.join(cwd, LEGACY_REGISTRY_REL_PATH);
  let existsOnDisk = false;
  let registry = buildBaselineRegistry(cwd);
  if (fs8__default.default.existsSync(ssotPath)) {
    try {
      const raw = fs8__default.default.readFileSync(ssotPath, "utf-8");
      if (raw && raw.trim()) {
        const parsed = JSON.parse(raw);
        if (isUnifiedTokensDocument(parsed)) {
          existsOnDisk = true;
          registry = AtomTokenSystem.fromDocument(parsed).toRegistry();
        }
      }
    } catch {
    }
  }
  if (!existsOnDisk && fs8__default.default.existsSync(legacyPath)) {
    try {
      const raw = fs8__default.default.readFileSync(legacyPath, "utf-8");
      if (raw && raw.trim()) {
        const parsed = JSON.parse(raw);
        existsOnDisk = true;
        registry = {
          $schema: parsed.$schema || "https://system.atomground.com/schemas/studio-registry.schema.json",
          version: parsed.version || readProjectVersion(cwd),
          updatedAt: parsed.updatedAt || (/* @__PURE__ */ new Date()).toISOString(),
          activeThemeId: parsed.activeThemeId || "ocean-blue",
          statusTokens: Array.isArray(parsed.statusTokens) && parsed.statusTokens.length > 0 ? parsed.statusTokens : INITIAL_SEMANTIC_STATUS_TOKENS,
          paletteVariables: Array.isArray(parsed.paletteVariables) && parsed.paletteVariables.length > 0 ? parsed.paletteVariables : INITIAL_PALETTE_VARIABLES,
          components: Array.isArray(parsed.components) && parsed.components.length > 0 ? parsed.components : buildBaselineRegistry(cwd).components
        };
      }
    } catch {
    }
  }
  const uiDir = path8__default.default.join(cwd, "components", "ui");
  const discoveredFiles = [];
  if (fs8__default.default.existsSync(uiDir)) {
    const entries = fs8__default.default.readdirSync(uiDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".atom.json")) continue;
      const specPath = path8__default.default.join(uiDir, entry.name);
      try {
        const rawSpec = JSON.parse(fs8__default.default.readFileSync(specPath, "utf-8"));
        const validation = validateSubmissionSpec(rawSpec);
        if (validation.valid) {
          const pascal = toPascalCase(validation.spec.id);
          const def = specToStudioDefinition(validation.spec, `components/ui/${pascal}.tsx`);
          const idx = registry.components.findIndex((c) => c.id === def.id);
          if (idx >= 0) {
            registry.components[idx] = { ...registry.components[idx], ...def };
          } else {
            registry.components.push(def);
          }
          discoveredFiles.push(`components/ui/${entry.name}`);
        }
      } catch {
      }
    }
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".tsx")) continue;
      const base = entry.name.replace(/\.tsx$/i, "");
      if (base.toLowerCase() === "index") continue;
      const rawId = toKebabCase(base);
      const resolvedId = resolveStudioComponentId(rawId);
      const relSource = `components/ui/${entry.name}`;
      discoveredFiles.push(relSource);
      const existingIdx = registry.components.findIndex(
        (c) => c.id === resolvedId || c.id === rawId
      );
      if (existingIdx >= 0) {
        if (!registry.components[existingIdx].sourceFile) {
          registry.components[existingIdx].sourceFile = relSource;
        }
        continue;
      }
      registry.components.push({
        id: resolvedId,
        name: `${base} (${resolvedId})`,
        category: "Form",
        description: `components/ui/${entry.name}\uC5D0\uC11C \uC790\uB3D9 \uAC10\uC9C0\uB41C \uCEF4\uD3EC\uB10C\uD2B8`,
        types: DEFAULT_COMPONENT_TYPES[resolvedId] || [
          {
            id: "standard",
            name: "Standard (\uD45C\uC900\uD615)",
            description: "\uC2DC\uC2A4\uD15C \uD1A0\uD070\uC5D0 \uBC14\uC778\uB529\uB41C \uAE30\uBCF8 \uC678\uD615",
            whenToUse: "\uC77C\uBC18\uC801\uC778 UI \uBC30\uCE58 \uBC0F \uAE30\uBCF8 \uC778\uD130\uB799\uC158\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
          }
        ],
        supportedStatuses: ["default", "hover", "active", "focus", "disabled"],
        properties: [
          { key: "background", label: "\uBC30\uACBD \uC0C9\uC0C1 (Background)", category: "color", defaultPaletteId: "--atom-palette-white" },
          { key: "textColor", label: "\uD14D\uC2A4\uD2B8 \uC0C9\uC0C1 (Text Color)", category: "color", defaultPaletteId: "--atom-palette-gray-900" },
          { key: "borderColor", label: "\uD14C\uB450\uB9AC \uC0C9\uC0C1 (Border Color)", category: "color", defaultPaletteId: "--atom-palette-gray-200" },
          { key: "borderRadius", label: "\uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)", category: "radius", defaultPaletteId: "--atom-radius-md" },
          { key: "padding", label: "\uB0B4\uBD80 \uD328\uB529 (Padding)", category: "spacing", defaultPaletteId: "--atom-space-4" }
        ],
        variables: [
          {
            id: "default",
            name: "\uAE30\uBCF8 (Default)",
            description: `${base} \uAE30\uBCF8 \uC2DC\uB9E8\uD2F1 \uC2A4\uD0C0\uC77C`,
            tokenBindings: {
              background: "--atom-palette-white",
              textColor: "--atom-palette-gray-900",
              borderColor: "--atom-palette-gray-200",
              borderRadius: "--atom-radius-md",
              padding: "--atom-space-4"
            }
          }
        ],
        sourceFile: relSource,
        autoDiscovered: true
      });
    }
  }
  return { registry, discoveredFiles, existsOnDisk };
}
function stripDelimitedCustomStyles(cssText) {
  const startIdx = cssText.indexOf(STUDIO_CUSTOM_STYLES_START);
  if (startIdx === -1) return cssText;
  const endIdx = cssText.indexOf(STUDIO_CUSTOM_STYLES_END, startIdx);
  if (endIdx === -1) {
    return cssText.slice(0, startIdx).trimEnd();
  }
  const before = cssText.slice(0, startIdx).trimEnd();
  const after = cssText.slice(endIdx + STUDIO_CUSTOM_STYLES_END.length).trimStart();
  return after ? `${before}

${after}` : before;
}
function saveProjectRegistry(cwd, registry, options) {
  const baseDocument = readExistingBaseDocument(cwd);
  const resolvedBrand = registry.brand || baseDocument.brand;
  const normalizedRegistry = {
    $schema: registry.$schema || "https://system.atomground.com/schemas/studio-registry.schema.json",
    version: registry.version || readProjectVersion(cwd),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    activeThemeId: registry.activeThemeId || "ocean-blue",
    ...resolvedBrand ? { brand: resolvedBrand } : {},
    statusTokens: registry.statusTokens && registry.statusTokens.length > 0 ? registry.statusTokens : INITIAL_SEMANTIC_STATUS_TOKENS,
    paletteVariables: registry.paletteVariables && registry.paletteVariables.length > 0 ? registry.paletteVariables : INITIAL_PALETTE_VARIABLES,
    components: registry.components || [],
    ...registry.themes && registry.themes.length > 0 ? { themes: registry.themes } : {}
  };
  const filesWritten = [];
  const tokensDir = path8__default.default.join(cwd, "tokens");
  if (!fs8__default.default.existsSync(tokensDir)) {
    fs8__default.default.mkdirSync(tokensDir, { recursive: true });
  }
  const formattedTokensJson = options?.tokensJson && options.tokensJson.trim() ? options.tokensJson : exportStudioToTokensJson(
    normalizedRegistry.paletteVariables,
    normalizedRegistry.components,
    normalizedRegistry.statusTokens,
    {
      activeThemeId: normalizedRegistry.activeThemeId,
      themes: normalizedRegistry.themes,
      brand: normalizedRegistry.brand,
      baseDocument,
      version: normalizedRegistry.version
    }
  );
  const tokensJsonPath = path8__default.default.join(cwd, TOKENS_SSOT_REL_PATH);
  fs8__default.default.writeFileSync(tokensJsonPath, formattedTokensJson, "utf-8");
  filesWritten.push("tokens/tokens.json");
  const cssDir = path8__default.default.join(cwd, "css");
  if (!fs8__default.default.existsSync(cssDir)) {
    fs8__default.default.mkdirSync(cssDir, { recursive: true });
  }
  const cssPath = path8__default.default.join(cssDir, "atom-ui.css");
  let generatedBase;
  try {
    generatedBase = compileTokensToCss(JSON.parse(formattedTokensJson));
  } catch {
    generatedBase = options?.cssString && typeof options.cssString === "string" ? options.cssString : exportStudioToCSS(
      normalizedRegistry.paletteVariables,
      normalizedRegistry.components,
      normalizedRegistry.statusTokens,
      baseDocument.palette
    );
  }
  const customStylesBlock = exportStudioCustomComponentStyles(normalizedRegistry.components);
  const baseWithoutCustom = stripDelimitedCustomStyles(generatedBase).trimEnd();
  let fullCss = baseWithoutCustom;
  if (fs8__default.default.existsSync(cssPath) && !baseWithoutCustom.includes(UNIVERSAL_MARKER)) {
    const existingCss = fs8__default.default.readFileSync(cssPath, "utf-8");
    const splitIdx = existingCss.indexOf(UNIVERSAL_MARKER);
    if (splitIdx !== -1) {
      const preservedUniversal = stripDelimitedCustomStyles(existingCss.slice(splitIdx)).trimEnd();
      fullCss = `${baseWithoutCustom}

${preservedUniversal}`;
    }
  }
  if (customStylesBlock) {
    fullCss = `${fullCss.trimEnd()}

${customStylesBlock}
`;
  } else {
    fullCss = `${fullCss.trimEnd()}
`;
  }
  fs8__default.default.writeFileSync(cssPath, fullCss, "utf-8");
  filesWritten.push("css/atom-ui.css");
  return { filesWritten, registry: normalizedRegistry };
}
function submitComponentSpec(cwd, rawSpec) {
  const validation = validateSubmissionSpec(rawSpec);
  if (!validation.valid) {
    return { success: false, errors: validation.errors };
  }
  const spec = validation.spec;
  const pascalName = toPascalCase(spec.id);
  const uiDir = path8__default.default.join(cwd, "components", "ui");
  if (!fs8__default.default.existsSync(uiDir)) {
    fs8__default.default.mkdirSync(uiDir, { recursive: true });
  }
  const filesWritten = [];
  const componentRelPath = `components/ui/${pascalName}.tsx`;
  const componentAbsPath = path8__default.default.join(uiDir, `${pascalName}.tsx`);
  if (!fs8__default.default.existsSync(componentAbsPath) || spec.componentCode || spec.overwriteCode) {
    const tsxCode = spec.componentCode ? `${spec.componentCode.trimEnd()}
` : generateComponentTsx(spec);
    fs8__default.default.writeFileSync(componentAbsPath, tsxCode, "utf-8");
    filesWritten.push(componentRelPath);
  }
  if (ensureUiBarrelExport(uiDir, pascalName)) {
    filesWritten.push("components/ui/index.ts");
  }
  const { registry } = loadProjectRegistry(cwd);
  const newDef = specToStudioDefinition(spec, componentRelPath);
  const existingIdx = registry.components.findIndex((c) => c.id === newDef.id);
  if (existingIdx >= 0) {
    registry.components[existingIdx] = newDef;
  } else {
    registry.components.push(newDef);
  }
  const saveResult = saveProjectRegistry(cwd, registry);
  return {
    success: true,
    component: newDef,
    registry: saveResult.registry,
    filesWritten: [...filesWritten, ...saveResult.filesWritten]
  };
}

// src/projectAnalyzer.ts
var IGNORE_DIRS = /* @__PURE__ */ new Set([
  "node_modules",
  ".next",
  "dist",
  ".git",
  "build",
  "out",
  ".turbo",
  "coverage",
  "playwright-report",
  "test-results"
]);
var SOURCE_EXTENSIONS = /* @__PURE__ */ new Set([".tsx", ".jsx", ".ts", ".js", ".css", ".scss"]);
var TAILWIND_COLOR_HEX = {
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "indigo-500": "#6366f1",
  "indigo-600": "#4f46e5",
  "emerald-500": "#10b981",
  "emerald-600": "#059669",
  "red-500": "#ef4444",
  "red-600": "#dc2626",
  "amber-500": "#f59e0b",
  "violet-600": "#7c3aed",
  "rose-500": "#f43f5e",
  "teal-600": "#0d9488",
  "sky-500": "#0ea5e9",
  "orange-500": "#f97316"
};
var NEUTRAL_HEX = /* @__PURE__ */ new Set([
  "#ffffff",
  "#fff",
  "#000000",
  "#000",
  "#f9f9fb",
  "#f8fafc",
  "#f1f5f9",
  "#e2e8f0",
  "#111111",
  "#0a0a0a",
  "#666666"
]);
function collectSourceFiles(rootDir) {
  const results = [];
  const candidateRoots = ["src", "app", "components", "pages", "styles"].map((d) => path8__default.default.join(rootDir, d)).filter((d) => fs8__default.default.existsSync(d) && fs8__default.default.statSync(d).isDirectory());
  const scanTargets = candidateRoots.length > 0 ? candidateRoots : [rootDir];
  function walk(dir) {
    let entries;
    try {
      entries = fs8__default.default.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path8__default.default.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && SOURCE_EXTENSIONS.has(path8__default.default.extname(entry.name).toLowerCase())) {
        const rel = path8__default.default.relative(rootDir, fullPath).split(path8__default.default.sep).join("/");
        if (rel === "css/atom-ui.css" || rel === "tokens/tokens.json") continue;
        results.push(fullPath);
      }
    }
  }
  for (const target of scanTargets) {
    walk(target);
  }
  return results;
}
function inferCategory(id) {
  if (/button|input|select|textarea|checkbox|radio|switch|slider|form/.test(id)) return "Form";
  if (/alert|toast|modal|dialog|badge|progress|skeleton|spinner/.test(id)) return "Feedback";
  if (/nav|tab|breadcrumb|menu|sidebar|header|pagination/.test(id)) return "Navigation";
  if (/table|chart|list|tree|calendar|metric|stat|data/.test(id)) return "Data";
  return "Layout";
}
function normalizeHex(hex) {
  const lower = hex.toLowerCase();
  if (lower.length === 4) {
    return `#${lower[1]}${lower[1]}${lower[2]}${lower[2]}${lower[3]}${lower[3]}`;
  }
  return lower;
}
function buildStandardSpec(id, displayName, category, description, detectedVariants, detectedStatuses) {
  const types = (detectedVariants.length > 0 ? detectedVariants : ["solid", "outline"]).map((v) => ({
    id: toKebabCase(v) || "solid",
    name: `${v.charAt(0).toUpperCase() + v.slice(1)} Type`,
    description: `\uAE30\uC874 \uCF54\uB4DC\uC5D0\uC11C \uAC10\uC9C0\uB41C ${v} \uC678\uD615 \uC2A4\uD0C0\uC77C`,
    whenToUse: `${displayName}\uC758 ${v} \uBCC0\uD615\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.`
  }));
  const statuses = [
    "default",
    "hover",
    "active",
    "focus",
    "disabled"
  ];
  if (detectedStatuses.includes("loading") && !statuses.includes("loading")) {
    statuses.push("loading");
  }
  return {
    id,
    name: displayName,
    category,
    description,
    types,
    supportedStatuses: statuses,
    variables: [
      {
        id: "primary",
        name: "Primary (\uBE0C\uB79C\uB4DC \uAC15\uC870)",
        description: "\uCD94\uCD9C\uB41C \uD504\uB85C\uC81D\uD2B8 \uBE0C\uB79C\uB4DC \uD1A0\uD070 \uBC14\uC778\uB529",
        tokenBindings: {
          background: "--atom-color-primary",
          textColor: "--atom-palette-white",
          borderColor: "--atom-color-primary",
          borderRadius: "--atom-radius-md",
          paddingX: "--atom-space-4",
          paddingY: "--atom-space-2"
        }
      },
      {
        id: "secondary",
        name: "Secondary (\uBCF4\uC870/\uC911\uB9BD)",
        description: "\uBCF4\uC870 \uC11C\uD53C\uC2A4 \uBC0F \uD14C\uB450\uB9AC \uC2DC\uB9E8\uD2F1 \uBC14\uC778\uB529",
        tokenBindings: {
          background: "--atom-bg-secondary",
          textColor: "--atom-text-primary",
          borderColor: "--atom-border-subtle",
          borderRadius: "--atom-radius-md",
          paddingX: "--atom-space-4",
          paddingY: "--atom-space-2"
        }
      }
    ]
  };
}
function analyzeProject(cwd) {
  const files = collectSourceFiles(cwd);
  const colorMap = /* @__PURE__ */ new Map();
  const radiusMap = /* @__PURE__ */ new Map();
  const rawPatternDefs = [
    {
      id: "button",
      name: "Button (\uAE30\uC874 \uBC84\uD2BC \uD328\uD134)",
      category: "Form",
      regex: /<button\b([^>]*)>/gi,
      description: "\uAE30\uC874 \uD504\uB85C\uC81D\uD2B8\uC758 \uC6D0\uC2DC <button> \uD0DC\uADF8\uC5D0\uC11C \uCD94\uCD9C\uB41C \uBC84\uD2BC \uCEF4\uD3EC\uB10C\uD2B8 \uD6C4\uBCF4"
    },
    {
      id: "input",
      name: "Input (\uAE30\uC874 \uC785\uB825 \uD544\uB4DC \uD328\uD134)",
      category: "Form",
      regex: /<input\b(?![^>]*type=['"](?:checkbox|radio|hidden)['"])([^>]*)>/gi,
      description: "\uAE30\uC874 \uD504\uB85C\uC81D\uD2B8\uC758 \uC6D0\uC2DC <input> \uD0DC\uADF8\uC5D0\uC11C \uCD94\uCD9C\uB41C \uC785\uB825 \uCEF4\uD3EC\uB10C\uD2B8 \uD6C4\uBCF4"
    },
    {
      id: "select",
      name: "Select (\uAE30\uC874 \uC120\uD0DD \uBC15\uC2A4 \uD328\uD134)",
      category: "Form",
      regex: /<select\b([^>]*)>/gi,
      description: "\uAE30\uC874 \uD504\uB85C\uC81D\uD2B8\uC758 \uC6D0\uC2DC <select> \uD0DC\uADF8\uC5D0\uC11C \uCD94\uCD9C\uB41C \uC140\uB809\uD2B8 \uCEF4\uD3EC\uB10C\uD2B8 \uD6C4\uBCF4"
    },
    {
      id: "textarea",
      name: "Textarea (\uAE30\uC874 \uBA40\uD2F0\uB77C\uC778 \uC785\uB825 \uD328\uD134)",
      category: "Form",
      regex: /<textarea\b([^>]*)>/gi,
      description: "\uAE30\uC874 \uD504\uB85C\uC81D\uD2B8\uC758 \uC6D0\uC2DC <textarea> \uD0DC\uADF8\uC5D0\uC11C \uCD94\uCD9C\uB41C \uD14D\uC2A4\uD2B8\uC601\uC5ED \uCEF4\uD3EC\uB10C\uD2B8 \uD6C4\uBCF4"
    },
    {
      id: "table",
      name: "Table (\uAE30\uC874 \uD14C\uC774\uBE14 \uD328\uD134)",
      category: "Data",
      regex: /<table\b([^>]*)>/gi,
      description: "\uAE30\uC874 \uD504\uB85C\uC81D\uD2B8\uC758 \uC6D0\uC2DC <table> \uD0DC\uADF8\uC5D0\uC11C \uCD94\uCD9C\uB41C \uB370\uC774\uD130 \uD14C\uC774\uBE14 \uCEF4\uD3EC\uB10C\uD2B8 \uD6C4\uBCF4"
    }
  ];
  const patternStats = /* @__PURE__ */ new Map();
  for (const def of rawPatternDefs) {
    patternStats.set(def.id, {
      count: 0,
      files: /* @__PURE__ */ new Set(),
      variants: /* @__PURE__ */ new Set(),
      statuses: /* @__PURE__ */ new Set()
    });
  }
  const candidates = [];
  const seenCandidateIds = /* @__PURE__ */ new Set();
  for (const absFile of files) {
    const relFile = path8__default.default.relative(cwd, absFile).split(path8__default.default.sep).join("/");
    let content = "";
    try {
      content = fs8__default.default.readFileSync(absFile, "utf-8");
    } catch {
      continue;
    }
    const hexMatches = content.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    for (const rawHex of hexMatches) {
      if (rawHex.length !== 4 && rawHex.length !== 7) continue;
      const norm = normalizeHex(rawHex);
      const entry = colorMap.get(norm) || { count: 0, sources: /* @__PURE__ */ new Set() };
      entry.count += 1;
      entry.sources.add(relFile);
      colorMap.set(norm, entry);
    }
    const twColorMatches = content.match(/\b(?:bg|text|border)-([a-z]+-\d{3})\b/g) || [];
    for (const cls of twColorMatches) {
      const key = cls.replace(/^(?:bg|text|border)-/, "");
      const hex = TAILWIND_COLOR_HEX[key];
      if (!hex) continue;
      const entry = colorMap.get(hex) || { count: 0, sources: /* @__PURE__ */ new Set() };
      entry.count += 1;
      entry.sources.add(relFile);
      colorMap.set(hex, entry);
    }
    const radiusMatches = content.match(/\brounded(?:-(?:none|sm|md|lg|xl|2xl|full|\[[^\]]+\]))?\b/g) || [];
    for (const r of radiusMatches) {
      radiusMap.set(r, (radiusMap.get(r) || 0) + 1);
    }
    if ((relFile.startsWith("components/") || relFile.includes("/components/")) && !relFile.includes("components/ui/") && (relFile.endsWith(".tsx") || relFile.endsWith(".jsx"))) {
      const base = path8__default.default.basename(relFile, path8__default.default.extname(relFile));
      const kebab = toKebabCase(base);
      if (kebab && /^[a-z][a-z0-9-]{0,62}$/.test(kebab) && !seenCandidateIds.has(kebab)) {
        seenCandidateIds.add(kebab);
        const category = inferCategory(kebab);
        const variants = /* @__PURE__ */ new Set();
        const variantMatch = content.match(/variant\??:\s*([^;\n]+)/);
        if (variantMatch) {
          const literals = variantMatch[1].match(/['"]([a-zA-Z0-9-]+)['"]/g) || [];
          literals.forEach((l) => variants.add(l.replace(/['"]/g, "")));
        }
        const statuses = /* @__PURE__ */ new Set();
        if (content.includes("hover:")) statuses.add("hover");
        if (content.includes("disabled")) statuses.add("disabled");
        if (content.includes("loading")) statuses.add("loading");
        const variantList = Array.from(variants);
        const statusList = Array.from(statuses);
        candidates.push({
          id: kebab,
          name: `${base} (\uAE30\uC874 \uCEF4\uD3EC\uB10C\uD2B8)`,
          category,
          sourceKind: "existing-component",
          occurrences: 1,
          files: [relFile],
          detectedVariants: variantList,
          detectedStatuses: statusList,
          spec: buildStandardSpec(
            kebab,
            `${base} (${kebab})`,
            category,
            `${relFile}\uC5D0\uC11C \uBD84\uC11D\uB41C \uAE30\uC874 \uD504\uB85C\uC81D\uD2B8 \uCEF4\uD3EC\uB10C\uD2B8`,
            variantList,
            statusList
          )
        });
      }
    }
    for (const def of rawPatternDefs) {
      def.regex.lastIndex = 0;
      let match;
      const stats = patternStats.get(def.id);
      while ((match = def.regex.exec(content)) !== null) {
        stats.count += 1;
        stats.files.add(relFile);
        const attrs = match[1] || "";
        if (/\bbg-/.test(attrs) && !/\bbg-transparent\b/.test(attrs)) stats.variants.add("solid");
        if (/\bborder\b/.test(attrs)) stats.variants.add("outline");
        if (/\bbg-transparent\b/.test(attrs)) stats.variants.add("ghost");
        if (/\bhover:/.test(attrs)) stats.statuses.add("hover");
        if (/\bdisabled\b/.test(attrs)) stats.statuses.add("disabled");
      }
    }
  }
  for (const def of rawPatternDefs) {
    const stats = patternStats.get(def.id);
    if (stats.count > 0 && !seenCandidateIds.has(def.id)) {
      seenCandidateIds.add(def.id);
      const variantList = Array.from(stats.variants);
      const statusList = Array.from(stats.statuses);
      candidates.push({
        id: def.id,
        name: def.name,
        category: def.category,
        sourceKind: "raw-html-pattern",
        occurrences: stats.count,
        files: Array.from(stats.files).slice(0, 10),
        detectedVariants: variantList,
        detectedStatuses: statusList,
        spec: buildStandardSpec(
          def.id,
          def.name,
          def.category,
          def.description,
          variantList,
          statusList
        )
      });
    }
  }
  const extractedColors = Array.from(colorMap.entries()).map(([value, info]) => ({
    value,
    count: info.count,
    sources: Array.from(info.sources).slice(0, 5)
  })).sort((a, b) => b.count - a.count).slice(0, 20);
  const brandCandidate = extractedColors.find((c) => !NEUTRAL_HEX.has(c.value));
  const suggestedBrandColor = brandCandidate ? brandCandidate.value : "#3182f6";
  const extractedRadii = Array.from(radiusMap.entries()).map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count).slice(0, 8);
  return {
    projectRoot: cwd,
    scannedFiles: files.length,
    suggestedBrandColor,
    extractedColors,
    extractedRadii,
    candidates,
    analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function importAnalyzedProject(cwd, options) {
  const importedComponents = [];
  const errors = [];
  const filesWritten = /* @__PURE__ */ new Set();
  for (const spec of options.specs || []) {
    const res = submitComponentSpec(cwd, spec);
    if (res.success && res.component) {
      importedComponents.push(res.component.id);
      (res.filesWritten || []).forEach((f) => filesWritten.add(f));
    } else {
      errors.push(...res.errors || [`Failed to import ${spec?.id || "component"}`]);
    }
  }
  const loaded = loadProjectRegistry(cwd);
  let registry = loaded.registry;
  if (options.brandColor && /^#[0-9a-fA-F]{3,8}$/.test(options.brandColor.trim())) {
    const brandHex = normalizeHex(options.brandColor.trim());
    const themeId = "imported-project-theme";
    const existingThemes = registry.themes ? [...registry.themes] : [];
    const paletteVars = [...registry.paletteVariables];
    const primaryIdx = paletteVars.findIndex((p) => p.id === "--atom-palette-blue-500");
    if (primaryIdx >= 0) {
      paletteVars[primaryIdx] = { ...paletteVars[primaryIdx], value: brandHex };
    }
    const statusTokens = registry.statusTokens.map(
      (st) => st.id === "--atom-color-primary" ? { ...st, defaultValue: brandHex } : st
    );
    const baseTheme = INITIAL_STUDIO_THEMES[0];
    const newTheme = {
      ...baseTheme,
      id: themeId,
      name: options.themeName?.trim() || "Imported Project Theme",
      category: "custom",
      mode: "light",
      description: "\uAE30\uC874 \uD504\uB85C\uC81D\uD2B8 \uCF54\uB4DC \uBD84\uC11D\uC744 \uD1B5\uD574 \uC790\uB3D9 \uCD94\uCD9C\uB41C \uBE0C\uB79C\uB4DC \uD14C\uB9C8",
      brandColor: brandHex,
      paletteBindings: {
        ...baseTheme.paletteBindings,
        primary: "--atom-palette-blue-500"
      },
      colors: {
        ...baseTheme.colors,
        primary: brandHex,
        primaryHover: brandHex
      }
    };
    const idx = existingThemes.findIndex((t) => t.id === themeId);
    if (idx >= 0) {
      existingThemes[idx] = newTheme;
    } else {
      existingThemes.unshift(newTheme);
    }
    registry = {
      ...registry,
      activeThemeId: themeId,
      paletteVariables: paletteVars,
      statusTokens,
      themes: existingThemes
    };
    const saved = saveProjectRegistry(cwd, registry);
    saved.filesWritten.forEach((f) => filesWritten.add(f));
    registry = saved.registry;
  }
  return {
    success: errors.length === 0,
    importedComponents,
    errors,
    filesWritten: Array.from(filesWritten),
    registry
  };
}

// src/studioServer.ts
var MAX_BODY_BYTES = 10 * 1024 * 1024;
var LOCAL_ORIGIN_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;
function isAllowedOrigin(origin, allowFigmaNull = false) {
  if (!origin) return true;
  if (LOCAL_ORIGIN_RE.test(origin)) return true;
  if (allowFigmaNull && origin === "null") return true;
  return false;
}
function applyCorsHeaders(req, res, allowFigmaNull = false) {
  const origin = req.headers.origin;
  const secFetchSite = req.headers["sec-fetch-site"];
  if (origin) {
    if (!isAllowedOrigin(origin, allowFigmaNull)) {
      return false;
    }
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  } else if (secFetchSite === "cross-site") {
    return false;
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Atom-Client");
  return true;
}
function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    let bytes = 0;
    req.on("data", (chunk) => {
      bytes += typeof chunk === "string" ? Buffer.byteLength(chunk) : chunk.length;
      if (bytes > MAX_BODY_BYTES) {
        req.destroy();
        reject(new Error("Payload too large"));
        return;
      }
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}
function getStudioDistDir() {
  try {
    if (typeof __dirname !== "undefined") {
      return path8__default.default.resolve(__dirname, "studio");
    }
    const currentFile = url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('cli.cjs', document.baseURI).href)));
    return path8__default.default.resolve(path8__default.default.dirname(currentFile), "studio");
  } catch {
    return path8__default.default.resolve(process.cwd(), "dist", "studio");
  }
}
function startLocalTokenStudio(options = {}) {
  const port = options.port ?? 4e3;
  const host = options.host || "127.0.0.1";
  const cwd = options.cwd || process.cwd();
  const tokenJsonPath = path8__default.default.join(cwd, "tokens", "tokens.json");
  const cssPath = path8__default.default.join(cwd, "css", "atom-ui.css");
  const registryPath = path8__default.default.join(cwd, "tokens", "tokens.json");
  const server = http__default.default.createServer(async (req, res) => {
    const url = new URL(req.url || "/", `http://localhost:${port}`);
    const isCodeWriteEndpoint = url.pathname === "/api/studio/components" || url.pathname === "/api/studio/import";
    const allowFigmaNull = !isCodeWriteEndpoint;
    if (!applyCorsHeaders(req, res, allowFigmaNull)) {
      sendJson(res, 403, {
        success: false,
        error: "Forbidden: Cross-origin access to Local Studio is restricted to localhost."
      });
      return;
    }
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }
    if (url.pathname === "/api/studio/registry" && req.method === "GET") {
      try {
        const result = loadProjectRegistry(cwd);
        sendJson(res, 200, {
          ...result,
          syncedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        sendJson(res, 500, { error: msg });
      }
      return;
    }
    if (url.pathname === "/api/studio/save" && req.method === "POST") {
      try {
        const raw = await readRequestBody(req);
        const body = JSON.parse(raw || "{}");
        if (body.registry && typeof body.registry === "object") {
          const formattedTokens = typeof body.tokensJson === "string" ? body.tokensJson : body.tokensJson ? JSON.stringify(body.tokensJson, null, 2) : void 0;
          const result = saveProjectRegistry(cwd, body.registry, {
            tokensJson: formattedTokens,
            cssString: typeof body.cssString === "string" ? body.cssString : void 0
          });
          sendJson(res, 200, {
            success: true,
            filesWritten: result.filesWritten,
            registry: result.registry
          });
          return;
        }
        sendJson(res, 400, { success: false, error: "Missing registry payload." });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Invalid JSON payload";
        sendJson(res, 400, { success: false, error: msg });
      }
      return;
    }
    if (url.pathname === "/api/studio/components" && req.method === "POST") {
      try {
        const raw = await readRequestBody(req);
        const parsed = JSON.parse(raw || "{}");
        const spec = parsed?.spec && typeof parsed.spec === "object" ? parsed.spec : parsed;
        const result = submitComponentSpec(cwd, spec);
        sendJson(res, result.success ? 200 : 400, result);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Invalid component JSON";
        sendJson(res, 400, { success: false, errors: [msg] });
      }
      return;
    }
    if (url.pathname === "/api/studio/sync" && req.method === "POST") {
      try {
        const loaded = loadProjectRegistry(cwd);
        const saved = saveProjectRegistry(cwd, loaded.registry);
        sendJson(res, 200, {
          success: true,
          componentCount: saved.registry.components.length,
          discoveredFiles: loaded.discoveredFiles,
          filesWritten: saved.filesWritten,
          registry: saved.registry
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Sync failed";
        sendJson(res, 500, { success: false, error: msg });
      }
      return;
    }
    if (url.pathname === "/api/studio/analyze" && req.method === "POST") {
      try {
        const report = analyzeProject(cwd);
        sendJson(res, 200, { success: true, report });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Analyze failed";
        sendJson(res, 500, { success: false, error: msg });
      }
      return;
    }
    if (url.pathname === "/api/studio/import" && req.method === "POST") {
      try {
        const raw = await readRequestBody(req);
        const body = JSON.parse(raw || "{}");
        const result = importAnalyzedProject(cwd, {
          themeName: body.themeName,
          brandColor: body.brandColor,
          specs: Array.isArray(body.specs) ? body.specs : []
        });
        sendJson(res, result.success ? 200 : 400, result);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Import failed";
        sendJson(res, 400, { success: false, errors: [msg] });
      }
      return;
    }
    if (url.pathname === "/api/tokens" && req.method === "GET") {
      let data = {};
      if (fs8__default.default.existsSync(tokenJsonPath)) {
        try {
          data = JSON.parse(fs8__default.default.readFileSync(tokenJsonPath, "utf-8"));
        } catch {
          data = { error: "Failed to parse tokens/tokens.json" };
        }
      }
      sendJson(res, 200, data);
      return;
    }
    if (url.pathname === "/api/tokens" && req.method === "POST") {
      try {
        const raw = await readRequestBody(req);
        const newTokens = JSON.parse(raw);
        const tokensDir = path8__default.default.dirname(tokenJsonPath);
        if (!fs8__default.default.existsSync(tokensDir)) fs8__default.default.mkdirSync(tokensDir, { recursive: true });
        fs8__default.default.writeFileSync(tokenJsonPath, JSON.stringify(newTokens, null, 2), "utf-8");
        const compiledCss = compileTokensToCss(newTokens);
        const cssDir = path8__default.default.dirname(cssPath);
        if (!fs8__default.default.existsSync(cssDir)) fs8__default.default.mkdirSync(cssDir, { recursive: true });
        let fullCss = compiledCss;
        if (fs8__default.default.existsSync(cssPath)) {
          const existingCss = fs8__default.default.readFileSync(cssPath, "utf-8");
          const splitIndex = existingCss.indexOf("/* === Universal Component Classes === */");
          if (splitIndex !== -1) {
            fullCss = `${compiledCss.trimEnd()}

${existingCss.slice(splitIndex)}`;
          }
        }
        fs8__default.default.writeFileSync(cssPath, fullCss, "utf-8");
        sendJson(res, 200, {
          success: true,
          message: "Tokens and CSS compiled successfully (universal classes preserved)!"
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Invalid token JSON";
        sendJson(res, 400, { success: false, error: msg });
      }
      return;
    }
    const studioDistDir = getStudioDistDir();
    if (url.pathname === "/studio.js" || url.pathname === "/studio.css") {
      const assetPath = path8__default.default.join(studioDistDir, url.pathname.slice(1));
      if (fs8__default.default.existsSync(assetPath)) {
        const contentType = url.pathname.endsWith(".js") ? "application/javascript; charset=utf-8" : "text/css; charset=utf-8";
        res.writeHead(200, { "Content-Type": contentType, "Cache-Control": "no-cache" });
        res.end(fs8__default.default.readFileSync(assetPath));
        return;
      }
    }
    if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html" || url.pathname === "/studio" || url.pathname.startsWith("/studio/"))) {
      const indexPath = path8__default.default.join(studioDistDir, "index.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
      if (fs8__default.default.existsSync(indexPath)) {
        res.end(fs8__default.default.readFileSync(indexPath, "utf-8"));
      } else {
        res.end(getStudioHtml());
      }
      return;
    }
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
  });
  server.listen(port, host, () => {
    console.log(`
\u{1F3A8} AtomSystem Local SSOT Studio running at:`);
    console.log(`   \u{1F449} http://localhost:${port} (bound to ${host})
`);
    console.log(`   Registry SSOT : ${path8__default.default.relative(cwd, registryPath)}`);
    console.log(`   Tokens file   : ${path8__default.default.relative(cwd, tokenJsonPath)}`);
    console.log(`   Compiled CSS  : ${path8__default.default.relative(cwd, cssPath)}`);
    console.log(`
Press Ctrl+C to stop the studio server.
`);
  });
  return server;
}
function getStudioHtml() {
  const sampleSpecJson = JSON.stringify(AI_COMPONENT_SUBMISSION_TEMPLATE, null, 2).replace(/<\/script/gi, "<\\/script");
  const aiPromptText = JSON.stringify(buildAiComponentSubmissionPrompt("\uC0C8 UI \uCEF4\uD3EC\uB10C\uD2B8"));
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AtomSystem Local SSOT Studio</title>
  <link rel="stylesheet" href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css">
  <style>
    :root {
      --bg: #ffffff;
      --card-bg: #f8fafc;
      --surface: #ffffff;
      --border: #e2e8f0;
      --text: #0f172a;
      --muted: #64748b;
      --accent: #3182f6;
      --success: #10b981;
      --danger: #ef4444;
      --radius: 10px;
      --font-sans: 'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0a0a0a;
        --card-bg: #141414;
        --surface: #1b1b1e;
        --border: #27272a;
        --text: #ededed;
        --muted: #a1a1aa;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      line-height: 1.5;
    }
    .shell { max-width: 1280px; margin: 0 auto; padding: 24px 20px; }
    header {
      display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;
      padding-bottom: 18px; border-bottom: 1px solid var(--border); margin-bottom: 20px;
    }
    .brand { display: flex; align-items: center; gap: 10px; }
    .badge {
      font-size: 11px; font-family: monospace; padding: 3px 8px;
      background: color-mix(in srgb, var(--accent) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
      border-radius: 6px; color: var(--accent); font-weight: 700;
    }
    h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
    p.desc { font-size: 12px; color: var(--muted); }
    .actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .btn {
      padding: 8px 14px; border-radius: 8px; font-size: 12px; font-weight: 600;
      cursor: pointer; border: 1px solid var(--border); background: var(--surface); color: var(--text);
      font-family: inherit; transition: opacity 0.15s, border-color 0.15s;
    }
    .btn:hover { border-color: var(--accent); }
    .btn-primary { background: var(--accent); color: #ffffff; border-color: var(--accent); }
    .tabs {
      display: inline-flex; gap: 6px; padding: 4px; border-radius: 10px;
      background: var(--card-bg); border: 1px solid var(--border); margin-bottom: 20px;
    }
    .tab-btn {
      padding: 7px 14px; border-radius: 7px; border: none; background: transparent;
      color: var(--muted); font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit;
    }
    .tab-btn.active { background: var(--accent); color: #ffffff; }
    .studio-grid { display: grid; grid-template-columns: 280px 1fr; gap: 20px; align-items: start; }
    @media (max-width: 860px) { .studio-grid { grid-template-columns: 1fr; } }
    .panel {
      background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px;
    }
    .comp-list { display: flex; flex-direction: column; gap: 4px; max-height: 580px; overflow-y: auto; }
    .comp-item {
      width: 100%; text-align: left; padding: 9px 12px; border-radius: 7px;
      border: 1px solid transparent; background: transparent; color: var(--text);
      font-size: 12px; font-weight: 500; cursor: pointer; display: flex; justify-content: space-between;
      font-family: inherit;
    }
    .comp-item:hover { background: var(--surface); border-color: var(--border); }
    .comp-item.active { background: var(--accent); color: #ffffff; font-weight: 700; }
    .meta-mono { font-family: monospace; font-size: 11px; color: var(--muted); }
    .comp-item.active .meta-mono { color: rgba(255,255,255,0.85); }
    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; margin-top: 12px; }
    .spec-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 12px;
    }
    .spec-title { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
    .spec-sub { font-size: 11px; color: var(--muted); }
    .field { margin-bottom: 14px; }
    label { display: block; font-size: 12px; font-weight: 600; margin-bottom: 6px; }
    input[type="text"], textarea, select {
      width: 100%; background: var(--surface); border: 1px solid var(--border); color: var(--text);
      padding: 9px 12px; font-size: 12px; border-radius: 8px; font-family: inherit;
    }
    textarea { font-family: monospace; min-height: 300px; line-height: 1.5; }
    .toast {
      position: fixed; bottom: 20px; right: 20px; background: var(--success); color: #ffffff;
      padding: 10px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; display: none;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 99;
    }
    .hidden { display: none; }
  </style>
</head>
<body>
  <div class="shell">
    <header>
      <div>
        <div class="brand">
          <span class="badge">SSOT \xB7 Spoqa Han Sans Neo</span>
          <h1>AtomSystem Local Component &amp; Token Studio</h1>
        </div>
        <p class="desc">\uD504\uB85C\uC81D\uD2B8 \uC804\uCCB4 \uCEF4\uD3EC\uB10C\uD2B8 \uB808\uC9C0\uC2A4\uD2B8\uB9AC(tokens/tokens.json), AI \uCEF4\uD3EC\uB10C\uD2B8 \uC81C\uCD9C\xB7\uC790\uB3D9 \uC0DD\uC131, CSS \uCEF4\uD30C\uC77C\uC744 \uD1B5\uD569 \uAD00\uB9AC\uD569\uB2C8\uB2E4.</p>
      </div>
      <div class="actions">
        <button class="btn" onclick="syncRegistry()">\u{1F504} components/ui \uC790\uB3D9 \uC2A4\uCE94 \uB3D9\uAE30\uD654</button>
        <button class="btn btn-primary" onclick="saveRegistry()">\u{1F4BE} \uD504\uB85C\uC81D\uD2B8\uC5D0 \uC989\uC2DC \uBC18\uC601 (SSOT \uC800\uC7A5)</button>
      </div>
    </header>

    <div class="tabs">
      <button class="tab-btn active" id="tab-btn-components" onclick="switchTab('components')">\u{1F9E9} \uCEF4\uD3EC\uB10C\uD2B8 \uB808\uC9C0\uC2A4\uD2B8\uB9AC (<span id="comp-count">0</span>)</button>
      <button class="tab-btn" id="tab-btn-submit" onclick="switchTab('submit')">\u{1F916} AI \uCEF4\uD3EC\uB10C\uD2B8 \uC591\uC2DD \uC81C\uCD9C</button>
      <button class="tab-btn" id="tab-btn-tokens" onclick="switchTab('tokens')">\u{1F39B}\uFE0F \uBE60\uB978 \uD1A0\uD070 &amp; CSS</button>
    </div>

    <!-- TAB 1: Component Registry Inspector -->
    <section id="tab-components" class="studio-grid">
      <div class="panel">
        <div class="field" style="margin-bottom: 10px;">
          <input type="text" id="comp-search" placeholder="\uCEF4\uD3EC\uB10C\uD2B8 \uAC80\uC0C9..." oninput="renderComponentList()" />
        </div>
        <div class="comp-list" id="comp-list"></div>
      </div>

      <div class="panel" id="comp-detail">
        <p class="desc">\uC88C\uCE21 \uBAA9\uB85D\uC5D0\uC11C \uCEF4\uD3EC\uB10C\uD2B8\uB97C \uC120\uD0DD\uD558\uC138\uC694.</p>
      </div>
    </section>

    <!-- TAB 2: AI Component Submission -->
    <section id="tab-submit" class="panel hidden">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
        <div>
          <h2 style="font-size:15px; font-weight:800;">AI \uCEF4\uD3EC\uB10C\uD2B8 \uBA85\uC138 \uC81C\uCD9C (Type \xB7 Variable \xB7 Status \uC790\uB3D9 \uC2A4\uCE90\uD3F4\uB529)</h2>
          <p class="desc">\uC81C\uCD9C\uD558\uBA74 components/ui/&lt;Name&gt;.tsx, index.ts, tokens.json, css/atom-ui.css\uAC00 \uC989\uC2DC \uC0DD\uC131\xB7\uBC18\uC601\uB429\uB2C8\uB2E4.</p>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn" onclick="copyAiPrompt()">\u{1F4CB} AI \uD504\uB86C\uD504\uD2B8 \uBCF5\uC0AC</button>
          <button class="btn" onclick="resetSampleJson()">\u2728 \uC0D8\uD50C JSON \uCC44\uC6B0\uAE30</button>
        </div>
      </div>

      <div class="field">
        <textarea id="ai-spec-json"></textarea>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
        <span class="meta-mono" id="submit-status"></span>
        <button class="btn btn-primary" onclick="submitAiComponent()">\u{1F680} \uB4F1\uB85D &amp; \uD504\uB85C\uC81D\uD2B8 \uC804\uCCB4 \uBC18\uC601</button>
      </div>
    </section>

    <!-- TAB 3: Quick Global Tokens -->
    <section id="tab-tokens" class="panel hidden">
      <h2 style="font-size:15px; font-weight:800; margin-bottom:12px;">\uAE00\uB85C\uBC8C \uC2DC\uB9E8\uD2F1 \uD1A0\uD070 \uBE60\uB978 \uD3B8\uC9D1 (tokens/tokens.json)</h2>
      <div class="studio-grid" style="grid-template-columns: 1fr 1fr;">
        <div>
          <div class="field">
            <label>Primary Brand Color (--atom-color-primary)</label>
            <input type="text" id="quick-primary" value="#3182f6" />
          </div>
          <div class="field">
            <label>\uAE30\uBCF8 Radius (--atom-radius-md)</label>
            <input type="text" id="quick-radius" value="8px" />
          </div>
          <button class="btn btn-primary" onclick="saveQuickTokens()">\uD1A0\uD070 \uC800\uC7A5 \uBC0F CSS \uC7AC\uCEF4\uD30C\uC77C</button>
        </div>
        <div>
          <div class="spec-card">
            <div class="spec-title">SSOT \uD30C\uC77C \uACBD\uB85C</div>
            <div class="meta-mono" style="margin-top:6px;">
              \u2022 tokens/tokens.json<br>
              \u2022 tokens/tokens.json<br>
              \u2022 css/atom-ui.css<br>
              \u2022 components/ui/*.tsx
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div id="toast" class="toast">\u2713 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4!</div>

  <script>
    const SAMPLE_SPEC = ${sampleSpecJson};
    const AI_PROMPT = ${aiPromptText};
    let registryState = null;
    let selectedCompId = 'button';

    function showToast(msg) {
      const el = document.getElementById('toast');
      el.textContent = msg;
      el.style.display = 'block';
      setTimeout(() => { el.style.display = 'none'; }, 3000);
    }

    function switchTab(name) {
      ['components', 'submit', 'tokens'].forEach((t) => {
        document.getElementById('tab-' + t).classList.toggle('hidden', t !== name);
        document.getElementById('tab-btn-' + t).classList.toggle('active', t === name);
      });
    }

    async function loadRegistry() {
      const res = await fetch('/api/studio/registry');
      const data = await res.json();
      registryState = data.registry;
      document.getElementById('comp-count').textContent = registryState.components.length;
      if (!registryState.components.some((c) => c.id === selectedCompId) && registryState.components[0]) {
        selectedCompId = registryState.components[0].id;
      }
      renderComponentList();
      renderComponentDetail();
    }

    function esc(v) {
      return String(v == null ? '' : v)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function renderComponentList() {
      if (!registryState) return;
      const q = (document.getElementById('comp-search').value || '').toLowerCase();
      const listEl = document.getElementById('comp-list');
      listEl.innerHTML = '';
      const items = registryState.components.filter((c) => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
      items.forEach((c) => {
        const btn = document.createElement('button');
        btn.className = 'comp-item ' + (c.id === selectedCompId ? 'active' : '');
        btn.onclick = () => selectComponent(c.id);
        const nameSpan = document.createElement('span');
        nameSpan.textContent = c.name;
        const metaSpan = document.createElement('span');
        metaSpan.className = 'meta-mono';
        metaSpan.textContent = (c.types ? c.types.length + 'T / ' : '') + c.variables.length + 'V';
        btn.appendChild(nameSpan);
        btn.appendChild(metaSpan);
        listEl.appendChild(btn);
      });
    }

    function selectComponent(id) {
      selectedCompId = id;
      renderComponentList();
      renderComponentDetail();
    }

    function renderComponentDetail() {
      if (!registryState) return;
      const comp = registryState.components.find((c) => c.id === selectedCompId);
      const container = document.getElementById('comp-detail');
      if (!comp) return;
      const typesHtml = (comp.types || []).map((t) =>
        '<div class="spec-card"><div class="spec-title">' + esc(t.name) + '</div><div class="meta-mono">type="' + esc(t.id) + '"</div><p class="spec-sub" style="margin-top:6px;">' + esc(t.whenToUse || t.description || '') + '</p></div>'
      ).join('') || '<div class="meta-mono">\uAE30\uBCF8 Standard Type \uC0AC\uC6A9</div>';

      const varsHtml = (comp.variables || []).map((v) =>
        '<div class="spec-card"><div class="spec-title">' + esc(v.name) + '</div><div class="meta-mono">variable="' + esc(v.id) + '"</div><div class="meta-mono" style="margin-top:6px;">' +
          Object.entries(v.tokenBindings || {}).slice(0, 4).map(([k, val]) => esc(k) + ': ' + esc(val)).join('<br>') +
        '</div></div>'
      ).join('');

      container.innerHTML =
        '<div style="display:flex; justify-content:space-between; align-items:start; gap:12px; border-bottom:1px solid var(--border); padding-bottom:12px;">' +
          '<div><h2 style="font-size:18px; font-weight:800;">' + esc(comp.name) + '</h2><p class="desc">' + esc(comp.description) + '</p>' +
          (comp.sourceFile ? '<div class="meta-mono" style="margin-top:4px;">\u{1F4C4} ' + esc(comp.sourceFile) + '</div>' : '') + '</div>' +
          '<span class="badge">' + esc(comp.category) + '</span>' +
        '</div>' +
        '<h3 style="font-size:13px; margin-top:16px;">1. Types (' + ((comp.types || []).length) + ')</h3>' +
        '<div class="cards">' + typesHtml + '</div>' +
        '<h3 style="font-size:13px; margin-top:18px;">2. Variables &amp; Token Bindings (' + ((comp.variables || []).length) + ')</h3>' +
        '<div class="cards">' + varsHtml + '</div>';
    }

    async function syncRegistry() {
      const res = await fetch('/api/studio/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        registryState = data.registry;
        document.getElementById('comp-count').textContent = registryState.components.length;
        renderComponentList();
        renderComponentDetail();
        showToast('\u2713 ' + data.componentCount + '\uAC1C \uCEF4\uD3EC\uB10C\uD2B8 \uC2A4\uCE94 \uBC0F CSS \uC7AC\uCEF4\uD30C\uC77C \uC644\uB8CC');
      }
    }

    async function saveRegistry() {
      if (!registryState) return;
      const res = await fetch('/api/studio/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registry: registryState }),
      });
      const data = await res.json();
      if (data.success) showToast('\u2713 SSOT \uB808\uC9C0\uC2A4\uD2B8\uB9AC \uBC0F CSS \uC800\uC7A5 \uC644\uB8CC');
    }

    function copyAiPrompt() {
      navigator.clipboard.writeText(AI_PROMPT);
      showToast('\u2713 AI \uCEF4\uD3EC\uB10C\uD2B8 \uC694\uCCAD \uD504\uB86C\uD504\uD2B8 \uBCF5\uC0AC\uB428');
    }

    function resetSampleJson() {
      document.getElementById('ai-spec-json').value = JSON.stringify(SAMPLE_SPEC, null, 2);
    }

    async function submitAiComponent() {
      const statusEl = document.getElementById('submit-status');
      try {
        const spec = JSON.parse(document.getElementById('ai-spec-json').value);
        const res = await fetch('/api/studio/components', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ spec }),
        });
        const data = await res.json();
        if (!data.success) {
          statusEl.textContent = '\u274C ' + (data.errors || []).join(' | ');
          statusEl.style.color = 'var(--danger)';
          return;
        }
        registryState = data.registry;
        selectedCompId = data.component.id;
        document.getElementById('comp-count').textContent = registryState.components.length;
        renderComponentList();
        renderComponentDetail();
        switchTab('components');
        showToast('\u2713 ' + data.component.id + ' \uC2A4\uCE90\uD3F4\uB529 & \uC804\uCCB4 \uBC18\uC601 \uC644\uB8CC!');
      } catch (e) {
        statusEl.textContent = '\u274C JSON \uC624\uB958: ' + e.message;
        statusEl.style.color = 'var(--danger)';
      }
    }

    async function saveQuickTokens() {
      const resGet = await fetch('/api/tokens');
      const cur = await resGet.json();
      if (!cur.color) cur.color = {};
      if (!cur.color.brand) cur.color.brand = {};
      cur.color.brand['color-primary'] = { $value: document.getElementById('quick-primary').value, variable: '--atom-color-primary' };
      const res = await fetch('/api/tokens', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cur) });
      const d = await res.json();
      if (d.success) showToast('\u2713 tokens.json & atom-ui.css \uC7AC\uCEF4\uD30C\uC77C \uC644\uB8CC');
    }

    resetSampleJson();
    loadRegistry();
  </script>
</body>
</html>`;
}
var LOCAL_ORIGIN_RE2 = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;
var MAX_BODY_BYTES2 = 1024 * 1024;
function openUrlInBrowser(url) {
  const platform = process.platform;
  const cmd = platform === "win32" ? `start "" "${url}"` : platform === "darwin" ? `open "${url}"` : `xdg-open "${url}"`;
  child_process.exec(cmd, () => {
  });
}
function resolveColorValue(doc, rawValue) {
  if (!rawValue || typeof rawValue !== "string") return "";
  if (!rawValue.startsWith("{") || !rawValue.endsWith("}")) return rawValue;
  const parts = rawValue.slice(1, -1).split(".");
  let cur = doc;
  for (const part of parts) {
    if (cur && typeof cur === "object" && part in cur) {
      cur = cur[part];
    } else {
      return rawValue;
    }
  }
  return typeof cur?.$value === "string" ? cur.$value : rawValue;
}
function readThemesFromTokens(tokenJsonPath) {
  const doc = JSON.parse(fs8__default.default.readFileSync(tokenJsonPath, "utf-8"));
  const presets = doc?.theme?.presets || {};
  const activeThemeId = doc?.theme?.activeThemeId || Object.keys(presets)[0] || "ocean-blue";
  const themes = Object.entries(presets).map(([id, preset]) => {
    const t = preset?.tokens || {};
    return {
      id,
      name: preset?.name || id,
      description: preset?.description || "",
      mode: preset?.mode === "dark" ? "dark" : "light",
      brandColor: resolveColorValue(doc, t.primary?.$value || preset?.brandColor) || "#3182f6",
      bgPrimary: resolveColorValue(doc, t.bgPrimary?.$value) || (preset?.mode === "dark" ? "#0f172a" : "#ffffff"),
      textPrimary: resolveColorValue(doc, t.textPrimary?.$value) || (preset?.mode === "dark" ? "#f8fafc" : "#111111")
    };
  });
  return { activeThemeId, themes };
}
function applyThemeById(cwd, themeId) {
  const tokenJsonPath = path8__default.default.join(cwd, "tokens", "tokens.json");
  const cssPath = path8__default.default.join(cwd, "css", "atom-ui.css");
  const doc = JSON.parse(fs8__default.default.readFileSync(tokenJsonPath, "utf-8"));
  const presets = doc?.theme?.presets || {};
  const selectedPreset = presets[themeId];
  if (!selectedPreset) {
    throw new Error(`Theme "${themeId}" not found.`);
  }
  doc.theme = doc.theme || {};
  doc.theme.activeThemeId = themeId;
  doc.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  fs8__default.default.writeFileSync(tokenJsonPath, `${JSON.stringify(doc, null, 2)}
`, "utf-8");
  let css = compileTokensToCss(doc);
  const cssDir = path8__default.default.dirname(cssPath);
  if (!fs8__default.default.existsSync(cssDir)) fs8__default.default.mkdirSync(cssDir, { recursive: true });
  const marker = "/* === Universal Component Classes === */";
  if (fs8__default.default.existsSync(cssPath)) {
    const existing = fs8__default.default.readFileSync(cssPath, "utf-8");
    const idx = existing.indexOf(marker);
    if (idx !== -1) css = `${css.trimEnd()}

${existing.slice(idx)}`;
  }
  fs8__default.default.writeFileSync(cssPath, css, "utf-8");
  return { name: selectedPreset.name || themeId, mode: selectedPreset.mode || "light" };
}
function getFloatingInjectScript(port) {
  return `(function(){
  if (window.__atomFloatingThemeLoaded) return;
  window.__atomFloatingThemeLoaded = true;
  var BASE = 'http://localhost:${port}';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;';
  var panel = document.createElement('div');
  panel.style.cssText = 'display:none;width:280px;max-height:360px;overflow-y:auto;margin-bottom:8px;padding:10px;border-radius:12px;background:var(--bg-primary,#141821);color:var(--text-primary,#f3f4f6);border:1px solid var(--border-strong,#262c3a);box-shadow:0 16px 40px rgba(0,0,0,.35);';
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = '\u{1F3A8} Theme';
  btn.style.cssText = 'padding:8px 14px;border-radius:999px;border:1px solid var(--border-strong,#262c3a);background:var(--accent-primary,#3182f6);color:#fff;font-size:12px;font-weight:600;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,.25);';
  btn.onclick = function(){ panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; };
  wrap.appendChild(panel);
  wrap.appendChild(btn);
  document.body.appendChild(wrap);
  function applyCss(th){
    var r = document.documentElement;
    r.setAttribute('data-atom-theme', th.id);
    r.style.colorScheme = th.mode;
    if (th.brandColor) { r.style.setProperty('--accent-primary', th.brandColor); r.style.setProperty('--atom-color-primary', th.brandColor); }
    if (th.bgPrimary) { r.style.setProperty('--bg-primary', th.bgPrimary); r.style.setProperty('--atom-bg-primary', th.bgPrimary); }
    if (th.textPrimary) { r.style.setProperty('--text-primary', th.textPrimary); r.style.setProperty('--atom-text-primary', th.textPrimary); }
  }
  fetch(BASE + '/api/themes').then(function(r){ return r.json(); }).then(function(data){
    var activeId = data.activeThemeId;
    var themes = data.themes || [];
    var cur = themes.find(function(t){ return t.id === activeId; });
    if (cur) btn.textContent = '\u{1F3A8} ' + cur.name;
    panel.innerHTML = '';
    themes.forEach(function(th){
      var item = document.createElement('button');
      item.type = 'button';
      item.style.cssText = 'width:100%;display:flex;align-items:center;justify-content:space-between;padding:7px 9px;margin:2px 0;border-radius:8px;border:1px solid transparent;background:' + (th.id===activeId?'rgba(59,130,246,.15)':'transparent') + ';color:inherit;font-size:12px;cursor:pointer;text-align:left;';
      var nameSpan = document.createElement('span');
      nameSpan.textContent = th.name;
      var modeSpan = document.createElement('span');
      modeSpan.style.cssText = 'opacity:.7;font-size:11px';
      modeSpan.textContent = th.id===activeId ? '\u2713' : th.mode;
      item.appendChild(nameSpan);
      item.appendChild(modeSpan);
      item.onclick = function(){
        applyCss(th);
        btn.textContent = '\u{1F3A8} ' + th.name;
        fetch(BASE + '/api/theme', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ themeId: th.id }) });
      };
      panel.appendChild(item);
    });
  });
})();`;
}
function getFloatingWidgetHtml() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AtomSystem Floating Theme Menu</title>
  <style>
    :root { color-scheme: light dark; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0b0d12;
      color: #f3f4f6;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .floating-panel {
      width: 100%;
      max-width: 420px;
      background: #141821;
      border: 1px solid #262c3a;
      border-radius: 16px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
      overflow: hidden;
    }
    .panel-header {
      padding: 16px 18px;
      border-bottom: 1px solid #262c3a;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .panel-title { font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
    .panel-sub { font-size: 11px; color: #9ca3af; margin-top: 2px; }
    .badge {
      font-size: 11px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(49, 130, 246, 0.16);
      color: #60a5fa;
      border: 1px solid rgba(49, 130, 246, 0.35);
    }
    .theme-list {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 460px;
      overflow-y: auto;
    }
    .theme-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 11px 12px;
      border-radius: 10px;
      border: 1px solid #262c3a;
      background: #1a202c;
      color: inherit;
      cursor: pointer;
      text-align: left;
      transition: border-color 0.15s, background 0.15s, transform 0.1s;
    }
    .theme-item:hover { border-color: #4b5563; background: #202736; }
    .theme-item.active { border-color: #3b82f6; background: rgba(59, 130, 246, 0.14); }
    .theme-left { display: flex; align-items: center; gap: 10px; min-width: 0; }
    .swatch {
      width: 24px;
      height: 24px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.2);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .swatch-dot { width: 10px; height: 10px; border-radius: 999px; }
    .theme-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .theme-desc { font-size: 11px; color: #9ca3af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 240px; }
    .theme-meta { font-size: 11px; color: #9ca3af; font-family: ui-monospace, monospace; flex-shrink: 0; }
    .panel-footer {
      padding: 10px 16px;
      border-top: 1px solid #262c3a;
      font-size: 11px;
      color: #9ca3af;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .status-ok { color: #34d399; font-weight: 600; }
  </style>
</head>
<body>
  <div class="floating-panel">
    <div class="panel-header">
      <div>
        <div class="panel-title">\u{1F3A8} AtomSystem Theme Picker</div>
        <div class="panel-sub">\uC120\uD0DD \uC989\uC2DC tokens/tokens.json &amp; css/atom-ui.css \uC804\uCCB4 \uBC18\uC601</div>
      </div>
      <span class="badge" id="active-badge">loading...</span>
    </div>
    <div class="theme-list" id="theme-list"></div>
    <div class="panel-footer">
      <span id="status-text">\uD504\uB85C\uC81D\uD2B8\uC640 \uBB34\uAD00\uD558\uAC8C \uB3C5\uB9BD \uC2E4\uD589 \uC911</span>
      <span>Ctrl+C \uB85C \uC885\uB8CC</span>
    </div>
  </div>
  <script>
    async function loadThemes() {
      const res = await fetch('/api/themes');
      const data = await res.json();
      render(data.themes, data.activeThemeId);
    }
    function render(themes, activeId) {
      document.getElementById('active-badge').textContent = activeId;
      const list = document.getElementById('theme-list');
      list.innerHTML = '';
      for (const th of themes) {
        const btn = document.createElement('button');
        btn.className = 'theme-item' + (th.id === activeId ? ' active' : '');
        const left = document.createElement('div');
        left.className = 'theme-left';
        const swatch = document.createElement('div');
        swatch.className = 'swatch';
        swatch.style.backgroundColor = th.bgPrimary || '';
        const dot = document.createElement('div');
        dot.className = 'swatch-dot';
        dot.style.backgroundColor = th.brandColor || '';
        swatch.appendChild(dot);
        const textWrap = document.createElement('div');
        const nameEl = document.createElement('div');
        nameEl.className = 'theme-name';
        nameEl.textContent = th.name;
        const descEl = document.createElement('div');
        descEl.className = 'theme-desc';
        descEl.textContent = th.description || th.id;
        textWrap.appendChild(nameEl);
        textWrap.appendChild(descEl);
        left.appendChild(swatch);
        left.appendChild(textWrap);
        const meta = document.createElement('span');
        meta.className = 'theme-meta';
        meta.textContent = th.id === activeId ? '\u2713 Active' : th.mode;
        btn.appendChild(left);
        btn.appendChild(meta);
        btn.onclick = async () => {
          const status = document.getElementById('status-text');
          status.textContent = '\uC801\uC6A9 \uC911...';
          status.className = '';
          const r = await fetch('/api/theme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ themeId: th.id }),
          });
          const out = await r.json();
          if (out.success) {
            status.textContent = '\u2713 ' + th.name + ' \uC801\uC6A9 \uC644\uB8CC (css/atom-ui.css \uC7AC\uCEF4\uD30C\uC77C\uB428)';
            status.className = 'status-ok';
            render(themes, th.id);
          } else {
            status.textContent = '\uC624\uB958: ' + (out.error || 'failed');
          }
        };
        list.appendChild(btn);
      }
    }
    loadThemes();
  </script>
</body>
</html>`;
}
function startFloatingThemeServer(options = {}) {
  const port = options.port ?? 4010;
  const host = options.host ?? "127.0.0.1";
  const cwd = options.cwd ?? process.cwd();
  const tokenJsonPath = path8__default.default.join(cwd, "tokens", "tokens.json");
  const server = http__default.default.createServer((req, res) => {
    const origin = req.headers.origin;
    const secFetchSite = req.headers["sec-fetch-site"];
    if (origin) {
      if (!LOCAL_ORIGIN_RE2.test(origin)) {
        res.writeHead(403, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ success: false, error: "Forbidden: Localhost origins only." }));
        return;
      }
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    } else if (secFetchSite === "cross-site") {
      res.writeHead(403, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ success: false, error: "Forbidden: Cross-site access denied." }));
      return;
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }
    const url = new URL(req.url || "/", `http://localhost:${port}`);
    if (req.method === "GET" && url.pathname === "/floating.js") {
      res.writeHead(200, { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "no-cache" });
      res.end(getFloatingInjectScript(port));
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/themes") {
      try {
        const data = readThemesFromTokens(tokenJsonPath);
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(data));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/theme") {
      let body = "";
      let bytes = 0;
      req.on("data", (chunk) => {
        bytes += typeof chunk === "string" ? Buffer.byteLength(chunk) : chunk.length;
        if (bytes > MAX_BODY_BYTES2) {
          req.destroy();
          return;
        }
        body += chunk;
      });
      req.on("end", () => {
        try {
          const parsed = JSON.parse(body || "{}");
          const result = applyThemeById(cwd, parsed.themeId);
          res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ success: true, ...result }));
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
    res.end(getFloatingWidgetHtml());
  });
  server.listen(port, host, () => {
    const url = `http://localhost:${port}`;
    console.log(`
\u{1F3A8} AtomSystem Floating Theme Menu running at:`);
    console.log(`   \u{1F449} ${url} (bound to ${host})
`);
    console.log(`   Tokens file : ${path8__default.default.relative(cwd, tokenJsonPath)}`);
    console.log(`   Target CSS  : css/atom-ui.css`);
    console.log(`
Press Ctrl+C to stop the floating theme menu.
`);
    if (options.openBrowser !== false) {
      openUrlInBrowser(url);
    }
  });
  return server;
}
var TOKEN_REPLACEMENTS = [
  // A. Arbitrary Hex Colors in styles/classes
  {
    pattern: /#3182f6\b/gi,
    replacement: "var(--accent-primary)",
    type: "color"
  },
  {
    pattern: /#1b64da\b/gi,
    replacement: "var(--accent-primary-hover)",
    type: "color"
  },
  {
    pattern: /#111111\b/gi,
    replacement: "var(--text-primary)",
    type: "color"
  },
  {
    pattern: /#666666\b/gi,
    replacement: "var(--text-secondary)",
    type: "color"
  },
  {
    pattern: /#eaeaea\b/gi,
    replacement: "var(--border-subtle)",
    type: "color"
  },
  {
    pattern: /#d4d4d8\b/gi,
    replacement: "var(--border-strong)",
    type: "color"
  },
  {
    pattern: /#f9f9fb\b/gi,
    replacement: "var(--bg-secondary)",
    type: "color"
  },
  // A2. Direct Palette CSS Variable References -> Semantic Role Tokens
  {
    pattern: /var\(--atom-palette-white\)/g,
    replacement: "var(--bg-primary)",
    type: "color"
  },
  {
    pattern: /var\(--atom-palette-gray-(?:50|100)\)/g,
    replacement: "var(--bg-secondary)",
    type: "color"
  },
  {
    pattern: /var\(--atom-palette-gray-200\)/g,
    replacement: "var(--border-subtle)",
    type: "color"
  },
  {
    pattern: /var\(--atom-palette-gray-300\)/g,
    replacement: "var(--border-strong)",
    type: "color"
  },
  {
    pattern: /var\(--atom-palette-gray-900\)/g,
    replacement: "var(--text-primary)",
    type: "color"
  },
  {
    pattern: /var\(--atom-palette-gray-[67]00\)/g,
    replacement: "var(--text-secondary)",
    type: "color"
  },
  {
    pattern: /var\(--atom-palette-gray-[45]00\)/g,
    replacement: "var(--text-muted)",
    type: "color"
  },
  {
    pattern: /var\(--atom-palette-blue-500\)/g,
    replacement: "var(--accent-primary)",
    type: "color"
  },
  {
    pattern: /var\(--atom-palette-blue-600\)/g,
    replacement: "var(--accent-primary-hover)",
    type: "color"
  },
  // B. Tailwind Standard Colors to Semantic Tokens
  // Text Colors
  {
    pattern: /\btext-blue-[56]00\b/g,
    replacement: "text-(--accent-primary)",
    type: "tailwind-color"
  },
  {
    pattern: /\btext-(gray|neutral|zinc)-900\b/g,
    replacement: "text-(--text-primary)",
    type: "tailwind-color"
  },
  {
    pattern: /\btext-(gray|neutral|zinc)-[56]00\b/g,
    replacement: "text-(--text-secondary)",
    type: "tailwind-color"
  },
  {
    pattern: /\btext-(gray|neutral|zinc)-400\b/g,
    replacement: "text-(--text-muted)",
    type: "tailwind-color"
  },
  // Background Colors
  {
    pattern: /\bbg-blue-[56]00\b/g,
    replacement: "bg-(--accent-primary)",
    type: "tailwind-color"
  },
  {
    pattern: /\bbg-(gray|neutral|zinc)-[51]00\b/g,
    replacement: "bg-(--bg-secondary)",
    type: "tailwind-color"
  },
  {
    pattern: /\bbg-(gray|neutral|zinc)-200\b/g,
    replacement: "bg-(--bg-tertiary)",
    type: "tailwind-color"
  },
  // Border Colors
  {
    pattern: /\bborder-(gray|neutral|zinc)-200\b/g,
    replacement: "border-(--border-subtle)",
    type: "tailwind-color"
  },
  {
    pattern: /\bborder-(gray|neutral|zinc)-300\b/g,
    replacement: "border-(--border-strong)",
    type: "tailwind-color"
  },
  {
    pattern: /\bborder-blue-[56]00\b/g,
    replacement: "border-(--accent-primary)",
    type: "tailwind-color"
  },
  // C. Arbitrary Inline Spacing
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[4px\]/g,
    replacement: "$1-(--space-1)",
    type: "spacing"
  },
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[8px\]/g,
    replacement: "$1-(--space-2)",
    type: "spacing"
  },
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[12px\]/g,
    replacement: "$1-(--space-3)",
    type: "spacing"
  },
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[16px\]/g,
    replacement: "$1-(--space-4)",
    type: "spacing"
  },
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[24px\]/g,
    replacement: "$1-(--space-6)",
    type: "spacing"
  },
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[32px\]/g,
    replacement: "$1-(--space-8)",
    type: "spacing"
  },
  {
    pattern: /\bgap-\[8px\]/g,
    replacement: "gap-(--space-2)",
    type: "spacing"
  },
  {
    pattern: /\bgap-\[12px\]/g,
    replacement: "gap-(--space-3)",
    type: "spacing"
  },
  {
    pattern: /\bgap-\[16px\]/g,
    replacement: "gap-(--space-4)",
    type: "spacing"
  },
  // D. Arbitrary Inline Radius
  {
    pattern: /\brounded-\[4px\]/g,
    replacement: "rounded-(--radius-sm)",
    type: "radius"
  },
  {
    pattern: /\brounded-\[6px\]/g,
    replacement: "rounded-(--radius)",
    type: "radius"
  },
  {
    pattern: /\brounded-\[8px\]/g,
    replacement: "rounded-(--radius-lg)",
    type: "radius"
  },
  {
    pattern: /\brounded-\[12px\]/g,
    replacement: "rounded-(--radius-xl)",
    type: "radius"
  },
  {
    pattern: /\brounded-\[16px\]/g,
    replacement: "rounded-(--radius-2xl)",
    type: "radius"
  },
  {
    pattern: /\brounded-\[9999px\]/g,
    replacement: "rounded-(--radius-full)",
    type: "radius"
  }
];
var SCAN_EXTENSIONS = /* @__PURE__ */ new Set([".tsx", ".jsx", ".ts", ".js", ".css", ".html"]);
var IGNORE_DIRS2 = /* @__PURE__ */ new Set(["node_modules", ".next", ".git", "dist", "build", "coverage", ".gemini"]);
var IGNORE_FILES = /* @__PURE__ */ new Set([
  "globals.css",
  "atom-ui.css",
  "token.json",
  "tokens.json",
  "tokens.ts",
  "awesomeThemes.ts",
  "refactorEngine.ts",
  "studioData.ts",
  "paletteData.ts",
  "themeData.ts",
  "ThemeTokens.ts",
  "StudioThemeManager.tsx",
  "PaletteScaleGeneratorModal.tsx"
]);
function scanAndRefactorDirectory(rootDir, options = {}) {
  const report = {
    scannedFiles: 0,
    totalMatches: 0,
    fixedFiles: 0,
    matches: []
  };
  function walk(currentPath) {
    const stats = fs8__default.default.statSync(currentPath);
    if (stats.isDirectory()) {
      const dirName = path8__default.default.basename(currentPath);
      if (IGNORE_DIRS2.has(dirName)) return;
      const entries = fs8__default.default.readdirSync(currentPath);
      for (const entry of entries) {
        walk(path8__default.default.join(currentPath, entry));
      }
    } else if (stats.isFile()) {
      const fileName = path8__default.default.basename(currentPath);
      if (IGNORE_FILES.has(fileName)) return;
      const ext = path8__default.default.extname(currentPath);
      if (!SCAN_EXTENSIONS.has(ext)) return;
      report.scannedFiles++;
      const content = fs8__default.default.readFileSync(currentPath, "utf-8");
      let modifiedContent = content;
      let hasFileChanges = false;
      const lines = content.split("\n");
      TOKEN_REPLACEMENTS.forEach((rule) => {
        lines.forEach((line, lineIndex) => {
          if (rule.pattern.test(line)) {
            rule.pattern.lastIndex = 0;
            const matchResult = line.match(rule.pattern);
            if (matchResult) {
              matchResult.forEach((matchedStr) => {
                const replacementStr = typeof rule.replacement === "function" ? rule.replacement(matchedStr) : rule.replacement;
                report.matches.push({
                  file: path8__default.default.relative(process.cwd(), currentPath),
                  line: lineIndex + 1,
                  original: matchedStr,
                  replacement: replacementStr,
                  type: rule.type
                });
                report.totalMatches++;
              });
            }
          }
        });
        if (options.fix && rule.pattern.test(modifiedContent)) {
          rule.pattern.lastIndex = 0;
          modifiedContent = modifiedContent.replace(rule.pattern, rule.replacement);
          hasFileChanges = true;
        }
      });
      if (options.fix && hasFileChanges && modifiedContent !== content) {
        fs8__default.default.writeFileSync(currentPath, modifiedContent, "utf-8");
        report.fixedFiles++;
      }
    }
  }
  walk(rootDir);
  return report;
}
var GLOBAL_CSS_CANDIDATES = [
  "app/globals.css",
  "src/app/globals.css",
  "app/global.css",
  "src/app/global.css",
  "src/index.css",
  "src/styles/globals.css",
  "styles/globals.css",
  "src/globals.css",
  "src/App.css",
  "app/layout.css"
];
function toPosixRelativeImport(fromFile, targetFile) {
  const rel = path8__default.default.relative(path8__default.default.dirname(fromFile), targetFile).split(path8__default.default.sep).join("/");
  return rel.startsWith(".") ? rel : `./${rel}`;
}
function ensureLocalCssLinked(cwd) {
  const localAtomCss = path8__default.default.join(cwd, "css", "atom-ui.css");
  const updatedFiles = [];
  const alreadyLinkedFiles = [];
  const foundCssFiles = [];
  if (!fs8__default.default.existsSync(localAtomCss)) {
    return { updatedFiles, alreadyLinkedFiles, foundCssFiles };
  }
  for (const relCandidate of GLOBAL_CSS_CANDIDATES) {
    const absCssFile = path8__default.default.join(cwd, relCandidate);
    if (!fs8__default.default.existsSync(absCssFile)) continue;
    foundCssFiles.push(relCandidate);
    const content = fs8__default.default.readFileSync(absCssFile, "utf-8");
    const relImportPath = toPosixRelativeImport(absCssFile, localAtomCss);
    const importStatement = `@import "${relImportPath}";`;
    const pkgImportRegex = /(@import\s+['"])atomsystem\/css\/atom-ui\.css(['"]\s*;?)/g;
    if (pkgImportRegex.test(content)) {
      const nextContent2 = content.replace(pkgImportRegex, `$1${relImportPath}$2`);
      if (nextContent2 !== content) {
        fs8__default.default.writeFileSync(absCssFile, nextContent2, "utf-8");
        updatedFiles.push(relCandidate);
        continue;
      }
    }
    if (content.includes("atom-ui.css")) {
      alreadyLinkedFiles.push(relCandidate);
      continue;
    }
    const tailwindImportMatch = content.match(/^@import\s+['"]tailwindcss['"]\s*;?[^\n]*\n?/m);
    let nextContent;
    if (tailwindImportMatch && tailwindImportMatch.index !== void 0) {
      const insertPos = tailwindImportMatch.index + tailwindImportMatch[0].length;
      const prefix = content.slice(0, insertPos);
      const suffix = content.slice(insertPos);
      const needsLeadingNewline = !prefix.endsWith("\n");
      nextContent = `${prefix}${needsLeadingNewline ? "\n" : ""}${importStatement}
${suffix}`;
    } else {
      const charsetMatch = content.match(/^@charset\s+[^;]+;\s*\n?/i);
      if (charsetMatch && charsetMatch.index !== void 0) {
        const insertPos = charsetMatch.index + charsetMatch[0].length;
        nextContent = `${content.slice(0, insertPos)}${importStatement}
${content.slice(insertPos)}`;
      } else {
        nextContent = `${importStatement}
${content}`;
      }
    }
    fs8__default.default.writeFileSync(absCssFile, nextContent, "utf-8");
    updatedFiles.push(relCandidate);
  }
  return { updatedFiles, alreadyLinkedFiles, foundCssFiles };
}

// src/cli.ts
function getPkgRoot() {
  try {
    if (typeof __dirname !== "undefined") {
      return path8__default.default.resolve(__dirname, "..");
    }
    const currentFile = url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('cli.cjs', document.baseURI).href)));
    return path8__default.default.resolve(path8__default.default.dirname(currentFile), "..");
  } catch {
    return process.cwd();
  }
}
var PKG_ROOT = getPkgRoot();
var args = process.argv.slice(2);
var command = args[0] || "help";
var targetName = args[1];
function copyFileSafe(src, dest, label) {
  const targetDir = path8__default.default.dirname(dest);
  if (!fs8__default.default.existsSync(targetDir)) {
    fs8__default.default.mkdirSync(targetDir, { recursive: true });
  }
  fs8__default.default.copyFileSync(src, dest);
  console.log(`  \u2713 ${label} -> ${path8__default.default.relative(process.cwd(), dest)}`);
}
function handleInit() {
  const cwd = process.cwd();
  console.log("\n\u{1F680} Initializing AtomSystem Universal Design System...\n");
  const srcAgentGuide = path8__default.default.join(PKG_ROOT, "presets", "agents.guide.md");
  if (fs8__default.default.existsSync(srcAgentGuide)) {
    copyFileSafe(srcAgentGuide, path8__default.default.join(cwd, "AGENTS.md"), "Universal AI Guide (AGENTS.md)");
    copyFileSafe(srcAgentGuide, path8__default.default.join(cwd, "CLAUDE.md"), "Claude Code Guidelines (CLAUDE.md)");
    copyFileSafe(srcAgentGuide, path8__default.default.join(cwd, ".cursorrules"), "Cursor Rules (.cursorrules)");
  }
  const srcSkill = path8__default.default.join(PKG_ROOT, "skills", "atomsystem.skill.md");
  if (fs8__default.default.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, path8__default.default.join(cwd, ".agents", "skills", "atomsystem", "SKILL.md"), "Agent Skill (.agents/skills/atomsystem/SKILL.md)");
  }
  const specs = [
    { src: path8__default.default.join(PKG_ROOT, "presets", "default.design.md"), dest: path8__default.default.join(cwd, "atom.design.md"), label: "Design Tokens (atom.design.md)" },
    { src: path8__default.default.join(PKG_ROOT, "presets", "components.md"), dest: path8__default.default.join(cwd, "atom.components.md"), label: "Components Spec (atom.components.md)" },
    { src: path8__default.default.join(PKG_ROOT, "presets", "blocks.md"), dest: path8__default.default.join(cwd, "atom.blocks.md"), label: "Design Blocks Spec (atom.blocks.md)" },
    { src: path8__default.default.join(PKG_ROOT, "presets", "uxPattern.md"), dest: path8__default.default.join(cwd, "atom.uxPattern.md"), label: "UX Patterns (atom.uxPattern.md)" }
  ];
  specs.forEach((s) => {
    if (fs8__default.default.existsSync(s.src)) {
      copyFileSafe(s.src, s.dest, s.label);
    }
  });
  const srcToken = path8__default.default.join(PKG_ROOT, "tokens", "tokens.json");
  if (fs8__default.default.existsSync(srcToken)) {
    copyFileSafe(srcToken, path8__default.default.join(cwd, "tokens", "tokens.json"), "Unified Token SSOT (tokens/tokens.json)");
  } else {
    const { registry } = loadProjectRegistry(cwd);
    saveProjectRegistry(cwd, registry);
    console.log("  \u2713 Unified Token SSOT -> tokens/tokens.json");
  }
  const srcCss = path8__default.default.join(PKG_ROOT, "css", "atom-ui.css");
  if (fs8__default.default.existsSync(srcCss)) {
    copyFileSafe(srcCss, path8__default.default.join(cwd, "css", "atom-ui.css"), "Zero-Runtime Semantic CSS (css/atom-ui.css)");
  }
  const linkResult = ensureLocalCssLinked(cwd);
  if (linkResult.updatedFiles.length > 0) {
    linkResult.updatedFiles.forEach((f) => {
      console.log(`  \u2713 Linked local css/atom-ui.css in ${f}`);
    });
  } else if (linkResult.alreadyLinkedFiles.length > 0) {
    linkResult.alreadyLinkedFiles.forEach((f) => {
      console.log(`  \u2713 Local css/atom-ui.css already linked in ${f}`);
    });
  } else {
    console.log('  \u2139 No global CSS entry found (e.g. app/globals.css). Add @import "./css/atom-ui.css"; to your global CSS.');
  }
  console.log("\n\u2728 AtomSystem initialization completed successfully!");
  console.log("\n\u{1F3A8} Local Token Studio Available:");
  console.log('  Run "npx atomsystem studio" to launch the local web customizer GUI.');
  console.log("  You can visually edit tokens and immediately recompile css/atom-ui.css.");
  console.log("\n\u{1F4CC} How AI Coding Works Now:");
  console.log("  Any AI assistant (Claude Code, Cursor, Copilot, Antigravity) will now");
  console.log("  AUTOMATICALLY detect the design tokens, components, and UX patterns.");
  console.log("\n\u{1F4CC} You can now ask your AI:");
  console.log('  "\uB300\uC2DC\uBCF4\uB4DC \uD654\uBA74\uC5D0 \uC2E4\uC2DC\uAC04 \uCC28\uD2B8\uC640 \uAC00\uACA9 \uC815\uCC45 \uBE14\uB85D\uC744 \uB808\uACE0\uCC98\uB7FC \uC870\uB9BD\uD574\uC918."');
  console.log('  "atom.design.md\uC758 \uC0C9\uC0C1 \uD1A0\uD070\uC744 \uBC14\uD0D5\uC73C\uB85C \uACB0\uC81C \uD655\uC778 \uBAA8\uB2EC\uC744 \uB9CC\uB4E4\uC5B4\uC918."\n');
}
var COMPONENT_MAP = {
  accordion: "Accordion.tsx",
  alert: "Alert.tsx",
  avatar: "Avatar.tsx",
  badge: "Badge.tsx",
  breadcrumb: "Breadcrumb.tsx",
  button: "Button.tsx",
  calendar: "Calendar.tsx",
  card: "Card.tsx",
  chart: "Chart.tsx",
  checkbox: "Checkbox.tsx",
  container: "Container.tsx",
  input: "Input.tsx",
  layout: "Layout.tsx",
  modal: "Modal.tsx",
  nav: "Nav.tsx",
  navbar: "Navbar.tsx",
  offcanvas: "Offcanvas.tsx",
  pagination: "Pagination.tsx",
  progress: "Progress.tsx",
  radio: "Radio.tsx",
  select: "Select.tsx",
  separator: "Separator.tsx",
  sidebar: "Sidebar.tsx",
  sidemenu: "SideMenu.tsx",
  skeleton: "Skeleton.tsx",
  slider: "Slider.tsx",
  switch: "Switch.tsx",
  table: "Table.tsx",
  tabs: "Tabs.tsx",
  textarea: "Textarea.tsx",
  "theme-switcher": "ThemeSwitcher.tsx",
  toast: "Toast.tsx",
  "token-select": "TokenSelect.tsx",
  tooltip: "Tooltip.tsx",
  tree: "Tree.tsx"
};
var COMPONENT_DEPS = {
  alert: ["button"],
  toast: ["button"],
  "theme-switcher": ["select", "button", "badge", "card", "tabs"]
};
var BLOCK_MAP = {
  "realtime-chart": { file: "RealtimeChartBlock.tsx", deps: ["card", "button", "badge"] },
  "interactive-chat": { file: "InteractiveChatBlock.tsx", deps: ["card", "input", "button", "badge"] },
  "pricing-table": { file: "PricingPlanBlock.tsx", deps: ["card", "button", "badge"] },
  "card-list": { file: "CardListBlock.tsx", deps: ["card", "input", "button", "badge"] },
  "interactive-slider": { file: "SliderShowcaseBlock.tsx", deps: ["card", "button", "slider"] },
  "metric-stats": { file: "MetricStatsBlock.tsx", deps: ["card", "badge"] },
  "file-explorer": { file: "FileExplorerBlock.tsx", deps: ["card", "button", "badge"] }
};
function installUiComponent(cwd, compKey, visited = /* @__PURE__ */ new Set()) {
  if (visited.has(compKey)) return true;
  visited.add(compKey);
  const fileName = COMPONENT_MAP[compKey];
  if (!fileName) return false;
  for (const dep of COMPONENT_DEPS[compKey] || []) {
    installUiComponent(cwd, dep, visited);
  }
  const src = path8__default.default.join(PKG_ROOT, "components", "ui", fileName);
  const uiDir = path8__default.default.join(cwd, "components", "ui");
  const dest = path8__default.default.join(uiDir, fileName);
  if (!fs8__default.default.existsSync(src)) {
    console.error(`
\u274C Source component file not found: ${src}
`);
    return false;
  }
  if (!fs8__default.default.existsSync(uiDir)) {
    fs8__default.default.mkdirSync(uiDir, { recursive: true });
  }
  let code = fs8__default.default.readFileSync(src, "utf-8");
  if (path8__default.default.resolve(cwd) !== path8__default.default.resolve(PKG_ROOT)) {
    code = code.replace(/from\s+['"]\.\.\/\.\.\/lib\/[^'"]+['"]/g, "from 'atomsystem'");
  }
  fs8__default.default.writeFileSync(dest, code, "utf-8");
  console.log(`  \u2713 Component (${fileName}) -> ${path8__default.default.relative(cwd, dest)}`);
  const pascalName = fileName.replace(/\.tsx$/i, "");
  ensureUiBarrelExport(uiDir, pascalName);
  return true;
}
function handleAdd(name) {
  if (!name) {
    console.error("\n\u274C Please specify an item to add. Example: npx atomsystem add button\n");
    handleList();
    return;
  }
  const cwd = process.cwd();
  const normalized = name.toLowerCase().trim();
  if (COMPONENT_MAP[normalized]) {
    const fileName = COMPONENT_MAP[normalized];
    if (installUiComponent(cwd, normalized)) {
      console.log(`
\u2705 Added ${normalized} component to components/ui/${fileName} (and updated components/ui/index.ts)
`);
    }
    return;
  }
  if (BLOCK_MAP[normalized]) {
    const { file, deps } = BLOCK_MAP[normalized];
    console.log(`
\u{1F4E6} Adding block "${normalized}" and its dependent components...
`);
    deps.forEach((dep) => {
      installUiComponent(cwd, dep);
    });
    const srcBlock = path8__default.default.join(PKG_ROOT, "components", "blocks", file);
    const destBlock = path8__default.default.join(cwd, "components", "blocks", file);
    if (fs8__default.default.existsSync(srcBlock)) {
      copyFileSafe(srcBlock, destBlock, `Block (${file})`);
      console.log(`
\u2705 Block "${normalized}" successfully added to components/blocks/${file}
`);
    } else {
      console.error(`
\u274C Source block file not found: ${srcBlock}
`);
    }
    return;
  }
  console.error(`
\u274C Unknown item: "${name}".`);
  handleList();
}
function handleList() {
  const compKeys = Object.keys(COMPONENT_MAP).sort();
  const compLines = [];
  for (let i = 0; i < compKeys.length; i += 4) {
    compLines.push("  " + compKeys.slice(i, i + 4).map((k) => k.padEnd(18)).join(""));
  }
  console.log(`
Available UI Components (${compKeys.length}):
${compLines.join("\n")}

Available Design Blocks (${Object.keys(BLOCK_MAP).length}):
  - realtime-chart      (Live streaming candlestick/line chart)
  - interactive-chat    (AI chatbot feed with suggestions)
  - pricing-table       (Monthly/annual tier pricing table)
  - card-list           (Responsive grid & list filter)
  - interactive-slider  (Cost simulation calculator & carousel)
  - metric-stats        (4 KPI executive metric cards)
  - file-explorer       (Hierarchical directory tree explorer)

Install any item:
  npx atomsystem add <item-name>
`);
}
function handleBuildTokens() {
  const cwd = process.cwd();
  const tokenJsonPath = path8__default.default.join(cwd, "tokens", "tokens.json");
  const cssPath = path8__default.default.join(cwd, "css", "atom-ui.css");
  if (!fs8__default.default.existsSync(tokenJsonPath)) {
    console.error(`
\u274C tokens/tokens.json not found at ${tokenJsonPath}. Run 'npx atomsystem init' first.
`);
    return;
  }
  try {
    const tokens = JSON.parse(fs8__default.default.readFileSync(tokenJsonPath, "utf-8"));
    let css = compileTokensToCss(tokens);
    const cssDir = path8__default.default.dirname(cssPath);
    if (!fs8__default.default.existsSync(cssDir)) fs8__default.default.mkdirSync(cssDir, { recursive: true });
    const marker = "/* === Universal Component Classes === */";
    if (fs8__default.default.existsSync(cssPath)) {
      const existing = fs8__default.default.readFileSync(cssPath, "utf-8");
      const idx = existing.indexOf(marker);
      if (idx !== -1) css = `${css.trimEnd()}

${existing.slice(idx)}`;
    }
    fs8__default.default.writeFileSync(cssPath, css, "utf-8");
    console.log(`
\u2728 Successfully compiled tokens to ${path8__default.default.relative(cwd, cssPath)}!
`);
  } catch (err) {
    console.error(`
\u274C Failed to compile tokens: ${err.message}
`);
  }
}
function handleStudio() {
  const portArg = args.find((a) => a.startsWith("--port="));
  const port = portArg ? parseInt(portArg.split("=")[1], 10) : 4e3;
  startLocalTokenStudio({ port, cwd: process.cwd() });
}
async function handleTheme(targetArg) {
  const cwd = process.cwd();
  const tokenJsonPath = path8__default.default.join(cwd, "tokens", "tokens.json");
  const cssPath = path8__default.default.join(cwd, "css", "atom-ui.css");
  if (!fs8__default.default.existsSync(tokenJsonPath)) {
    console.error(`
\u274C tokens/tokens.json not found at ${tokenJsonPath}. Run 'npx atomsystem init' first.
`);
    return;
  }
  let doc;
  try {
    doc = JSON.parse(fs8__default.default.readFileSync(tokenJsonPath, "utf-8"));
  } catch (err) {
    console.error(`
\u274C Failed to parse tokens/tokens.json: ${err.message}
`);
    return;
  }
  const presets = doc?.theme?.presets || {};
  const presetEntries = Object.entries(presets);
  if (presetEntries.length === 0) {
    console.error("\n\u274C No theme presets found in tokens/tokens.json (theme.presets).\n");
    return;
  }
  const activeThemeId = doc?.theme?.activeThemeId || presetEntries[0][0];
  if (args.includes("--list")) {
    console.log("\n\u{1F3A8} Available AtomSystem Themes:\n");
    for (const [id, preset] of presetEntries) {
      const marker = id === activeThemeId ? "\u2605 [Active]" : "  ";
      console.log(`  ${marker} ${id.padEnd(20)} (${preset.mode || "light"}) - ${preset.name || id}`);
    }
    console.log("");
    return;
  }
  const setFlag = args.find((a) => a.startsWith("--set="));
  const directId = setFlag ? setFlag.slice("--set=".length).trim() : targetArg && !targetArg.startsWith("-") ? targetArg.trim() : "";
  if (directId) {
    try {
      const applied = applyThemeById(cwd, directId);
      console.log(`
\u{1F3A8} Theme applied: ${applied.name} (${directId}, ${applied.mode})`);
      console.log(`   \u2713 Updated ${path8__default.default.relative(cwd, tokenJsonPath)}`);
      console.log(`   \u2713 Recompiled ${path8__default.default.relative(cwd, cssPath)}
`);
    } catch (err) {
      console.error(`
\u274C ${err.message}
`);
    }
    return;
  }
  if (!args.includes("--cli")) {
    const portArg = args.find((a) => a.startsWith("--port="));
    const port = portArg ? parseInt(portArg.split("=")[1], 10) : 4010;
    startFloatingThemeServer({ port, cwd, openBrowser: !args.includes("--no-open") });
    return;
  }
  const choices = presetEntries.map(([id, preset]) => {
    const isCurrent = id === activeThemeId;
    const modeTag = preset.mode === "dark" ? "\u{1F319} dark" : "\u2600\uFE0F light";
    const activeTag = isCurrent ? " [Active]" : "";
    return {
      name: `${preset.name || id} (${id}) \xB7 ${modeTag}${activeTag}`,
      value: id
    };
  });
  const answer = await inquirer__default.default.prompt([
    {
      type: "list",
      name: "themeId",
      message: "\uD504\uB85C\uC81D\uD2B8 \uC804\uCCB4\uC5D0 \uC801\uC6A9\uD560 \uD14C\uB9C8\uB97C \uC120\uD0DD\uD558\uC138\uC694 (Select a theme):",
      default: activeThemeId,
      choices
    }
  ]);
  try {
    const applied = applyThemeById(cwd, answer.themeId);
    console.log(`
\u{1F3A8} Theme applied: ${applied.name} (${answer.themeId}, ${applied.mode})`);
    console.log(`   \u2713 Updated ${path8__default.default.relative(cwd, tokenJsonPath)}`);
    console.log(`   \u2713 Recompiled ${path8__default.default.relative(cwd, cssPath)}
`);
  } catch (err) {
    console.error(`
\u274C ${err.message}
`);
  }
}
function handleSkillInstall() {
  const cwd = process.cwd();
  console.log("\n\u{1F916} Installing AtomSystem Agent Skill & Universal Guidelines...\n");
  const srcAgentGuide = path8__default.default.join(PKG_ROOT, "presets", "agents.guide.md");
  if (fs8__default.default.existsSync(srcAgentGuide)) {
    copyFileSafe(srcAgentGuide, path8__default.default.join(cwd, "AGENTS.md"), "Universal AI Guide (AGENTS.md)");
    copyFileSafe(srcAgentGuide, path8__default.default.join(cwd, "CLAUDE.md"), "Claude Code Guidelines (CLAUDE.md)");
    copyFileSafe(srcAgentGuide, path8__default.default.join(cwd, ".cursorrules"), "Cursor Rules (.cursorrules)");
  }
  const srcSkill = path8__default.default.join(PKG_ROOT, "skills", "atomsystem.skill.md");
  if (fs8__default.default.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, path8__default.default.join(cwd, ".agents", "skills", "atomsystem", "SKILL.md"), "Agent Skill (.agents/skills/atomsystem/SKILL.md)");
  }
  console.log("\n\u2728 Agent Skill installed successfully!");
  console.log("\u{1F4CC} Supported AI Assistants:");
  console.log("  - Cursor IDE (.cursorrules)");
  console.log("  - Claude Code (CLAUDE.md)");
  console.log("  - Antigravity / Gemini CLI (.agents/skills/atomsystem/SKILL.md)");
  console.log("  - Universal Coding Agents (AGENTS.md)\n");
}
function handleRefactor() {
  const cwd = process.cwd();
  const shouldFix = args.includes("--fix");
  const shouldCheck = args.includes("--check");
  const targetDirs = args.filter((a) => !a.startsWith("--") && a !== "refactor");
  const scanDirs = targetDirs.length > 0 ? targetDirs : ["app", "components", "css", "lib"];
  console.log("\n\u{1F50D} AtomSystem Zero-Hardcoding Refactor Engine");
  console.log(`Mode: ${shouldFix ? "\u26A1 FIX (Automatic Token Replacement)" : "\u{1F440} DRY RUN (Scan & Report Only)"}`);
  console.log(`Target Directories: ${scanDirs.join(", ")}
`);
  let grandScanned = 0;
  let grandMatches = 0;
  let grandFixed = 0;
  scanDirs.forEach((dirName) => {
    const fullDir = path8__default.default.resolve(cwd, dirName);
    if (!fs8__default.default.existsSync(fullDir)) return;
    const report = scanAndRefactorDirectory(fullDir, { fix: shouldFix });
    grandScanned += report.scannedFiles;
    grandMatches += report.totalMatches;
    grandFixed += report.fixedFiles;
    if (report.matches.length > 0) {
      console.log(`\u{1F4C1} In [${dirName}]: Found ${report.matches.length} hardcoding pattern(s)`);
      const previewMatches = report.matches.slice(0, 15);
      previewMatches.forEach((m) => {
        console.log(`   ${m.file}:${m.line} -> [${m.original}] \u2794 [${m.replacement}] (${m.type})`);
      });
      if (report.matches.length > 15) {
        console.log(`   ...and ${report.matches.length - 15} more pattern(s)`);
      }
      console.log("");
    }
  });
  console.log("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  console.log(`\u{1F4CA} Refactor Summary:`);
  console.log(`  - Files Scanned: ${grandScanned}`);
  console.log(`  - Hardcoding Patterns Found: ${grandMatches}`);
  if (shouldFix) {
    console.log(`  - Files Successfully Fixed: ${grandFixed}`);
    console.log(`
\u2728 Hardcoded styles successfully converted to design tokens!
`);
  } else {
    console.log(`
\u{1F4A1} To automatically replace these hardcoded patterns with tokens, run:`);
    console.log(`   npx atomsystem refactor --fix
`);
    if (shouldCheck && grandMatches > 0) {
      process.exitCode = 1;
    }
  }
}
function handleSubmit(filePathArg) {
  if (!filePathArg) {
    console.error("\n\u274C Please provide a component spec JSON file. Example: npx atomsystem submit rating-chip.atom.json\n");
    console.log('\u{1F4A1} Run "npx atomsystem schema" to print a template JSON spec.\n');
    process.exitCode = 1;
    return;
  }
  const cwd = process.cwd();
  const absPath = path8__default.default.resolve(cwd, filePathArg);
  if (!fs8__default.default.existsSync(absPath)) {
    console.error(`
\u274C Spec file not found: ${absPath}
`);
    process.exitCode = 1;
    return;
  }
  try {
    const raw = JSON.parse(fs8__default.default.readFileSync(absPath, "utf-8"));
    const spec = raw?.spec && typeof raw.spec === "object" ? raw.spec : raw;
    const result = submitComponentSpec(cwd, spec);
    if (!result.success) {
      console.error("\n\u274C Component spec validation failed:");
      (result.errors || []).forEach((err) => console.error(`  - ${err}`));
      process.exitCode = 1;
      return;
    }
    console.log(`
\u2728 Registered component "${result.component?.id}" into AtomSystem SSOT!
`);
    (result.filesWritten || []).forEach((f) => console.log(`  \u2713 Updated ${f}`));
    console.log("");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error(`
\u274C Failed to submit component spec: ${msg}
`);
    process.exitCode = 1;
  }
}
function handleSync() {
  const cwd = process.cwd();
  const loaded = loadProjectRegistry(cwd);
  const saved = saveProjectRegistry(cwd, loaded.registry);
  console.log(`
\u{1F504} Synchronized AtomSystem SSOT Registry!`);
  console.log(`  - Components Managed : ${saved.registry.components.length}`);
  console.log(`  - Scanned UI Files   : ${loaded.discoveredFiles.length}`);
  saved.filesWritten.forEach((f) => console.log(`  \u2713 Recompiled ${f}`));
  console.log("");
}
function handleSchema() {
  if (args.includes("--prompt")) {
    console.log(buildAiComponentSubmissionPrompt("\uC694\uCCAD\uD55C \uC2E0\uADDC UI \uCEF4\uD3EC\uB10C\uD2B8"));
    return;
  }
  console.log(JSON.stringify(AI_COMPONENT_SUBMISSION_TEMPLATE, null, 2));
}
function showHelp() {
  console.log(`
AtomSystem CLI - Universal Design Token & Agentic UI System

Usage:
  npx atomsystem <command> [options]

Commands:
  init            Initialize AI guidelines, tokens/tokens.json SSOT, specs, and CSS
  studio          Launch Local SSOT Web Studio GUI (Component Registry + AI Submit + Tokens)
  theme [id]      Switch active theme preset (--list, --set=<id>, --cli, or floating picker)
  submit <file>   Register & scaffold an AI component spec JSON into the project SSOT
  sync            Auto-discover components/ui/*.tsx & *.atom.json and recompile SSOT CSS/JSON
  schema          Print standardized AI Component Submission JSON template (--prompt for AI prompt)
  build:tokens    Compile tokens/tokens.json into zero-runtime css/atom-ui.css
  refactor        Scan & replace hardcoded HEX/px/Tailwind colors with tokens (--fix)
  analyze         Analyze existing project code for tokens & component candidates (--import, --json, --prompt)
  skill install   Install AI Agent Skill and guidelines (.cursorrules, CLAUDE.md)
  add <name>      Add a component or block directly to your project
  list            List all available components and blocks
  help            Display this help message
  version         Print version info

Options for refactor:
  --fix           Automatically replace hardcoded values with semantic tokens

Options for studio:
  --port=<port>   Port for the local studio server (default: 4000)
`);
}
function showVersion() {
  const pkgPath = path8__default.default.join(PKG_ROOT, "package.json");
  if (fs8__default.default.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs8__default.default.readFileSync(pkgPath, "utf-8"));
    console.log(`atomsystem v${pkg.version}`);
  } else {
    console.log("atomsystem v0.15.2");
  }
}
function handleAnalyze() {
  const cwd = process.cwd();
  const asJson = args.includes("--json");
  const shouldImport = args.includes("--import") || args.includes("--write");
  const asPrompt = args.includes("--prompt");
  const report = analyzeProject(cwd);
  if (asJson) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }
  if (asPrompt) {
    console.log(
      `\uB2E4\uC74C\uC740 \uAE30\uC874 \uD504\uB85C\uC81D\uD2B8(${report.scannedFiles}\uAC1C \uD30C\uC77C) \uBD84\uC11D \uACB0\uACFC\uC785\uB2C8\uB2E4. [Type \xB7 Variable \xB7 Status] \uADDC\uACA9\uC5D0 \uB9DE\uCDB0 components/ui \uBC0F tokens/tokens.json\uC5D0 \uBC18\uC601\uD560 \uC2A4\uD399\uC744 \uC815\uC81C\uD574 \uC8FC\uC138\uC694.
`
    );
    console.log(`\uCD94\uCC9C \uBE0C\uB79C\uB4DC \uCEEC\uB7EC: ${report.suggestedBrandColor}`);
    console.log(
      "\uAC10\uC9C0\uB41C \uCEF4\uD3EC\uB10C\uD2B8 \uD6C4\uBCF4:\n" + JSON.stringify(
        report.candidates.map((c) => c.spec),
        null,
        2
      )
    );
    return;
  }
  console.log("\n\u{1F50D} AtomSystem Project Analyzer\n");
  console.log(`  Scanned Files       : ${report.scannedFiles}`);
  console.log(`  Suggested Brand Hex : ${report.suggestedBrandColor}`);
  console.log(
    `  Top Extracted Colors: ${report.extractedColors.slice(0, 6).map((c) => `${c.value}(${c.count})`).join(", ") || "None"}`
  );
  console.log(`  Component Candidates: ${report.candidates.length}
`);
  report.candidates.forEach((c) => {
    console.log(
      `  \u2022 [${c.sourceKind}] ${c.id} (${c.category}) - ${c.occurrences}\uD68C \uAC10\uC9C0 | variants: ${c.detectedVariants.join(", ") || "default"}`
    );
  });
  if (shouldImport) {
    const res = importAnalyzedProject(cwd, {
      themeName: "Imported Project Theme",
      brandColor: report.suggestedBrandColor,
      specs: report.candidates.map((c) => c.spec)
    });
    console.log("\n\u2705 Studio SSOT \uBC18\uC601 \uC644\uB8CC:");
    res.filesWritten.forEach((f) => console.log(`  \u2713 ${f}`));
    if (res.errors.length > 0) {
      console.error("  \u26A0 \uC77C\uBD80 \uC624\uB958:", res.errors.join(" | "));
    }
  } else {
    console.log("\n\u{1F4A1} \uD301:");
    console.log("  - \uBC14\uB85C \uC2A4\uD29C\uB514\uC624/SSOT\uC5D0 \uBC18\uC601\uD558\uB824\uBA74: npx atomsystem analyze --import");
    console.log("  - \uC2A4\uD29C\uB514\uC624 \uC6F9 UI\uC5D0\uC11C \uC120\uD0DD \uBC18\uC601\uD558\uB824\uBA74: npx atomsystem studio \uC2E4\uD589 \uD6C4 [\uD504\uB85C\uC81D\uD2B8 \uBD88\uB7EC\uC624\uAE30]\n");
  }
}
function handlePostinstall() {
  try {
    const targetCwd = process.env.INIT_CWD;
    if (!targetCwd) return;
    if (path8__default.default.resolve(targetCwd) === path8__default.default.resolve(PKG_ROOT)) return;
    if (!fs8__default.default.existsSync(path8__default.default.join(targetCwd, "package.json"))) return;
    const targetTokenPath = path8__default.default.join(targetCwd, "tokens", "tokens.json");
    const targetCssPath = path8__default.default.join(targetCwd, "css", "atom-ui.css");
    const srcToken = path8__default.default.join(PKG_ROOT, "tokens", "tokens.json");
    const srcCss = path8__default.default.join(PKG_ROOT, "css", "atom-ui.css");
    let copiedAny = false;
    if (!fs8__default.default.existsSync(targetTokenPath) && fs8__default.default.existsSync(srcToken)) {
      fs8__default.default.mkdirSync(path8__default.default.dirname(targetTokenPath), { recursive: true });
      fs8__default.default.copyFileSync(srcToken, targetTokenPath);
      copiedAny = true;
    }
    if (!fs8__default.default.existsSync(targetCssPath) && fs8__default.default.existsSync(srcCss)) {
      fs8__default.default.mkdirSync(path8__default.default.dirname(targetCssPath), { recursive: true });
      fs8__default.default.copyFileSync(srcCss, targetCssPath);
      copiedAny = true;
    }
    const linkResult = ensureLocalCssLinked(targetCwd);
    if (copiedAny || linkResult.updatedFiles.length > 0) {
      console.log("\n\u{1F3A8} AtomSystem postinstall:");
      if (copiedAny) {
        console.log("  \u2713 Provisioned local tokens/tokens.json & css/atom-ui.css");
      }
      linkResult.updatedFiles.forEach((f) => {
        console.log(`  \u2713 Auto-linked local css/atom-ui.css in ${f}`);
      });
      console.log('  \u{1F449} Run "npx atomsystem studio" to customize tokens & components.\n');
    }
  } catch {
  }
}
switch (command) {
  case "postinstall":
    handlePostinstall();
    break;
  case "init":
    handleInit();
    break;
  case "refactor":
    handleRefactor();
    break;
  case "analyze":
    handleAnalyze();
    break;
  case "skill":
    handleSkillInstall();
    break;
  case "studio":
  case "editor":
    handleStudio();
    break;
  case "theme":
    void handleTheme(targetName);
    break;
  case "submit":
  case "register":
    handleSubmit(targetName);
    break;
  case "sync":
    handleSync();
    break;
  case "schema":
    handleSchema();
    break;
  case "build:tokens":
  case "compile":
    handleBuildTokens();
    break;
  case "add":
    handleAdd(targetName);
    break;
  case "list":
    handleList();
    break;
  case "version":
  case "-v":
  case "--version":
    showVersion();
    break;
  case "help":
  case "-h":
  case "--help":
  default:
    showHelp();
    break;
}
//# sourceMappingURL=cli.cjs.map
//# sourceMappingURL=cli.cjs.map