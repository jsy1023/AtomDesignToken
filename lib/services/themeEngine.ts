import { ThemeConfig } from '@/lib/data/themeEditorDefaults';

const STYLE_ELEMENT_ID = 'atom-theme-live-engine-style';

/**
 * ThemeConfig를 받아 전역에 적용될 동적 CSS 문자열을 생성합니다.
 */
export function generateThemeCSS(theme: ThemeConfig): string {
  const { color, typography, borderRadius } = theme;

  return `
/* [AtomDesignToken] Live Injected Theme Variables */
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
body {
  font-family: ${typography.fontFamily};
  background-color: ${color.bgPrimary};
  color: ${color.textPrimary};
}

.atom-body, p:not([class*="text-"]) {
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

/**
 * DOM에 실시간 스타일 태그를 주입하거나 갱신합니다.
 */
export function applyThemeToDOM(theme: ThemeConfig): void {
  if (typeof document === 'undefined') return;

  let styleTag = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ELEMENT_ID;
    document.head.appendChild(styleTag);
  }

  styleTag.textContent = generateThemeCSS(theme);
}

/**
 * 순수 CSS 복사용 코드 생성
 */
export function exportToCSS(theme: ThemeConfig): string {
  return generateThemeCSS(theme);
}

/**
 * Tailwind Config 확장 객체 코드 생성
 */
export function exportToTailwind(theme: ThemeConfig): string {
  const { color, typography, borderRadius } = theme;

  const tailwindSnippet = {
    theme: {
      extend: {
        colors: {
          brand: {
            primary: color.primary,
            hover: color.primaryHover,
            light: color.primaryLight,
          },
          surface: {
            DEFAULT: color.bgPrimary,
            secondary: color.bgSecondary,
          },
          border: {
            subtle: color.borderSubtle,
            strong: color.borderStrong,
          },
          status: {
            success: color.statusSuccess,
            danger: color.statusDanger,
            warning: color.statusWarning,
          },
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
          xs: [`${typography.xs.fontSize}px`, { lineHeight: `${typography.xs.lineHeight}`, fontWeight: `${typography.xs.fontWeight}`, letterSpacing: typography.xs.letterSpacing }],
        },
        borderRadius: {
          custom: borderRadius,
        },
      },
    },
  };

  return `// tailwind.config.ts\nimport type { Config } from 'tailwindcss';\n\nexport default ${JSON.stringify(tailwindSnippet, null, 2)} as Config;`;
}

/**
 * W3C Design Token Community Group (DTCG) 호환 tokens.json 생성
 */
export function exportToTokensJson(theme: ThemeConfig): string {
  const { color, typography, borderRadius } = theme;

  const dtcgTokens = {
    $schema: 'https://design-tokens.github.io/community-group/format/',
    color: {
      brand: {
        primary: { $value: color.primary, $type: 'color' },
        hover: { $value: color.primaryHover, $type: 'color' },
        subtle: { $value: color.primaryLight, $type: 'color' },
      },
      surface: {
        background: { $value: color.bgPrimary, $type: 'color' },
        secondary: { $value: color.bgSecondary, $type: 'color' },
      },
      text: {
        primary: { $value: color.textPrimary, $type: 'color' },
        secondary: { $value: color.textSecondary, $type: 'color' },
        muted: { $value: color.textMuted, $type: 'color' },
      },
      border: {
        subtle: { $value: color.borderSubtle, $type: 'color' },
        strong: { $value: color.borderStrong, $type: 'color' },
      },
    },
    typography: {
      h1: {
        fontSize: { $value: `${typography.h1.fontSize}px`, $type: 'dimension' },
        lineHeight: { $value: typography.h1.lineHeight, $type: 'number' },
        fontWeight: { $value: typography.h1.fontWeight, $type: 'fontWeight' },
      },
      h2: {
        fontSize: { $value: `${typography.h2.fontSize}px`, $type: 'dimension' },
        lineHeight: { $value: typography.h2.lineHeight, $type: 'number' },
        fontWeight: { $value: typography.h2.fontWeight, $type: 'fontWeight' },
      },
      h3: {
        fontSize: { $value: `${typography.h3.fontSize}px`, $type: 'dimension' },
        lineHeight: { $value: typography.h3.lineHeight, $type: 'number' },
        fontWeight: { $value: typography.h3.fontWeight, $type: 'fontWeight' },
      },
      h4: {
        fontSize: { $value: `${typography.h4.fontSize}px`, $type: 'dimension' },
        lineHeight: { $value: typography.h4.lineHeight, $type: 'number' },
        fontWeight: { $value: typography.h4.fontWeight, $type: 'fontWeight' },
      },
      h5: {
        fontSize: { $value: `${typography.h5.fontSize}px`, $type: 'dimension' },
        lineHeight: { $value: typography.h5.lineHeight, $type: 'number' },
        fontWeight: { $value: typography.h5.fontWeight, $type: 'fontWeight' },
      },
      h6: {
        fontSize: { $value: `${typography.h6.fontSize}px`, $type: 'dimension' },
        lineHeight: { $value: typography.h6.lineHeight, $type: 'number' },
        fontWeight: { $value: typography.h6.fontWeight, $type: 'fontWeight' },
      },
      body: {
        fontSize: { $value: `${typography.body.fontSize}px`, $type: 'dimension' },
        lineHeight: { $value: typography.body.lineHeight, $type: 'number' },
        fontWeight: { $value: typography.body.fontWeight, $type: 'fontWeight' },
      },
      sm: {
        fontSize: { $value: `${typography.sm.fontSize}px`, $type: 'dimension' },
        lineHeight: { $value: typography.sm.lineHeight, $type: 'number' },
        fontWeight: { $value: typography.sm.fontWeight, $type: 'fontWeight' },
      },
      xs: {
        fontSize: { $value: `${typography.xs.fontSize}px`, $type: 'dimension' },
        lineHeight: { $value: typography.xs.lineHeight, $type: 'number' },
        fontWeight: { $value: typography.xs.fontWeight, $type: 'fontWeight' },
      },
    },
    borderRadius: {
      default: { $value: borderRadius, $type: 'dimension' },
    },
  };

  return JSON.stringify(dtcgTokens, null, 2);
}
