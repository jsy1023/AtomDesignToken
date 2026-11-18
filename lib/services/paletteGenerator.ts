/**
 * 🎨 AtomSystem Color Palette 50 ~ 900 Scale Generator Service
 * W3C DTCG Standard Perceptual Tonal Scale Calculator
 * 
 * 하나의 단일 베이스 색상(HEX)을 입력받아 
 * 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 총 10단계의
 * 완벽한 디자인 시스템 계층 팔레트를 자동 연산하여 생성합니다.
 */

import { PaletteVariable } from '@/lib/data/studioData';

export const PALETTE_SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type PaletteScaleStepNumber = (typeof PALETTE_SCALE_STEPS)[number];

/**
 * Standard ideal lightness anchors for each step (0-100)
 */
export const STANDARD_STEP_LIGHTNESS: Record<PaletteScaleStepNumber, number> = {
  50: 97,
  100: 92,
  200: 84,
  300: 72,
  400: 60,
  500: 49,
  600: 39,
  700: 29,
  800: 20,
  900: 12,
};

export interface GeneratedPaletteStep {
  step: PaletteScaleStepNumber;
  id: string; // e.g. '--atom-palette-teal-500'
  name: string; // e.g. 'Teal 500 (Base Color)'
  value: string; // HEX e.g. '#0d9488'
  family: string; // e.g. 'teal'
  category: 'color';
  description: string;
  isBaseAnchor?: boolean;
  contrastRatioWithWhite: number;
  bestTextColor: '#ffffff' | '#0f172a';
}

export interface GeneratedPaletteResult {
  family: string;
  baseHex: string;
  anchorStep: PaletteScaleStepNumber;
  detectedAnchorStep: PaletteScaleStepNumber;
  baseLightness: number;
  steps: GeneratedPaletteStep[];
  paletteVariables: PaletteVariable[];
}

/**
 * HEX to RGB conversion
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    };
  }
  if (clean.length === 6) {
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16),
    };
  }
  return null;
}

/**
 * RGB to HEX conversion
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * RGB to HSL conversion (H: 0-360, S: 0-100, L: 0-100)
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * HSL to RGB conversion
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hNorm = h / 360;

  const r = Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, hNorm) * 255);
  const b = Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255);

  return { r, g, b };
}

/**
 * HSL to HEX conversion
 */
export function hslToHex(h: number, s: number, l: number): string {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

/**
 * Calculate WCAG Relative Luminance
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculate contrast ratio against white (#ffffff)
 */
export function getContrastRatio(hex: string, backgroundHex: string = '#ffffff'): number {
  const rgb1 = hexToRgb(hex);
  const rgb2 = hexToRgb(backgroundHex);
  if (!rgb1 || !rgb2) return 1;

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

/**
 * Step descriptions for human readability
 */
const STEP_DESCRIPTIONS: Record<PaletteScaleStepNumber, string> = {
  50: '매우 연한 틴트 배경 및 초미세 하이라이트 서피스',
  100: '연한 서피스 배경, 소프트 태그 및 칩 배경',
  200: '소프트 보더, 연한 구분선 및 비활성 호버 배경',
  300: '활성 테두리, 포커스 링 보조 라인 및 디바이더',
  400: '밝은 액센트, 그래픽 요소 및 시각 인디케이터',
  500: '핵심 기준 색상 (브랜드 Primary 및 주요 액션 컬러)',
  600: '강조 및 인터랙션 호버 상태 딥 컬러',
  700: '클릭 액티브 상태 및 진한 서브 헤더/텍스트',
  800: '딥 톤 텍스트, 다크 모드 서피스 및 하이 콘트라스트',
  900: '극진한 다크 톤, 헤드라인 텍스트 및 프레임 경계',
};

/**
 * Detect the optimal anchor step (50~900) based on base color lightness & luminance
 */
export function detectBestAnchorStep(hex: string): {
  step: PaletteScaleStepNumber;
  lightness: number;
  luminance: number;
  contrastWithWhite: number;
} {
  const cleanHex = hex.startsWith('#') ? hex : `#${hex}`;
  const rgb = hexToRgb(cleanHex) || { r: 99, g: 102, b: 241 };
  const { l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  const contrastWithWhite = getContrastRatio(cleanHex, '#ffffff');

  // Find step with closest standard lightness
  let bestStep: PaletteScaleStepNumber = 500;
  let minDiff = 999;

  for (const step of PALETTE_SCALE_STEPS) {
    const diff = Math.abs(STANDARD_STEP_LIGHTNESS[step] - l);
    if (diff < minDiff) {
      minDiff = diff;
      bestStep = step;
    }
  }

  return {
    step: bestStep,
    lightness: l,
    luminance: Number(luminance.toFixed(3)),
    contrastWithWhite,
  };
}

/**
 * 단일 베이스 색상을 기반으로 50 ~ 900 계층 팔레트를 자동 연산하여 생성합니다.
 * 베이스 색상의 명도에 따라 최적의 앵커 스텝(700, 800, 500 등)을 자동 배치하거나 수동 지정합니다.
 * 
 * @param baseHex - 사용자 입력 단일 색상 (예: '#3b82f6', '#ff6f0f', '#162c4e' 등)
 * @param familyName - 팔레트 그룹 명칭 (예: 'indigo', 'orange', 'teal', 'brand')
 * @param customAnchorStep - 선택적 앵커 스텝 오버라이드 (미지정 시 베이스 색상 명도에 따라 50~900 중 최적 스텝 자동 결정)
 */
export function generateColorPalette50to900(
  baseHex: string,
  familyName: string = 'custom',
  customAnchorStep?: PaletteScaleStepNumber
): GeneratedPaletteResult {
  const cleanHex = baseHex.startsWith('#') ? baseHex : `#${baseHex}`;
  const rgb = hexToRgb(cleanHex);

  // Fallback if invalid hex
  const validHex = rgb ? cleanHex : '#3182f6';
  const validRgb = rgb || { r: 49, g: 130, b: 246 };

  const { h, s, l: baseL } = rgbToHsl(validRgb.r, validRgb.g, validRgb.b);
  const cleanFamily = familyName.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '') || 'custom';
  const capitalFamily = cleanFamily.charAt(0).toUpperCase() + cleanFamily.slice(1);

  // 1. Detect best anchor step from base lightness or use custom override
  const detection = detectBestAnchorStep(validHex);
  const effectiveAnchorStep: PaletteScaleStepNumber = customAnchorStep || detection.step;
  const anchorIndex = PALETTE_SCALE_STEPS.indexOf(effectiveAnchorStep);

  // 2. Determine boundary target lightness
  // Top (step 50) lightness: between 95% and 98.5%
  const topLightness = anchorIndex === 0
    ? baseL
    : Math.max(95, Math.min(98.5, Math.max(baseL + 5, 96.5)));

  // Bottom (step 900) lightness: between 6% and 15%
  const bottomLightness = anchorIndex === 9
    ? baseL
    : Math.max(6, Math.min(14, Math.min(baseL - 5, 11)));

  // 3. Compute lightness for all 10 steps using smooth sinusoidal curves
  const targetLightness: Record<PaletteScaleStepNumber, number> = {} as any;

  PALETTE_SCALE_STEPS.forEach((step, idx) => {
    if (idx === anchorIndex) {
      targetLightness[step] = baseL;
    } else if (idx < anchorIndex) {
      // Lighter steps (50 up to anchor)
      const t = idx / anchorIndex; // 0 <= t < 1
      const sinT = Math.sin((t * Math.PI) / 2);
      const computedL = topLightness - (topLightness - baseL) * sinT;
      targetLightness[step] = Math.round(computedL * 10) / 10;
    } else {
      // Darker steps (anchor down to 900)
      const t = (idx - anchorIndex) / (9 - anchorIndex); // 0 < t <= 1
      const sinT = Math.sin((t * Math.PI) / 2);
      const computedL = baseL - (baseL - bottomLightness) * sinT;
      targetLightness[step] = Math.round(computedL * 10) / 10;
    }
  });

  // Strict monotonicity guard: each step must be lower in lightness than the previous
  for (let i = 1; i < PALETTE_SCALE_STEPS.length; i++) {
    const prevStep = PALETTE_SCALE_STEPS[i - 1];
    const currStep = PALETTE_SCALE_STEPS[i];
    if (targetLightness[currStep] >= targetLightness[prevStep]) {
      targetLightness[currStep] = Math.max(5, targetLightness[prevStep] - 1.5);
    }
  }

  // Target saturation multipliers
  const saturationMultipliers: Record<PaletteScaleStepNumber, number> = {
    50: 0.68,
    100: 0.80,
    200: 0.90,
    300: 0.96,
    400: 0.99,
    500: 1.0,
    600: 1.0,
    700: 0.98,
    800: 0.94,
    900: 0.88,
  };

  const steps: GeneratedPaletteStep[] = PALETTE_SCALE_STEPS.map((step) => {
    let hexValue: string;

    if (step === effectiveAnchorStep) {
      // The anchor step strictly preserves the user's exact input color!
      hexValue = validHex;
    } else {
      const stepL = Math.max(4, Math.min(99, targetLightness[step]));
      const stepS = Math.max(5, Math.min(100, Math.round(s * saturationMultipliers[step])));
      hexValue = hslToHex(h, stepS, stepL);
    }

    const contrastWithWhite = getContrastRatio(hexValue, '#ffffff');
    const bestTextColor: '#ffffff' | '#0f172a' = contrastWithWhite >= 4.5 ? '#ffffff' : '#0f172a';

    const stepName =
      step === effectiveAnchorStep
        ? `${capitalFamily} ${step} (Base Anchor)`
        : `${capitalFamily} ${step}`;

    return {
      step,
      id: `--atom-palette-${cleanFamily}-${step}`,
      name: stepName,
      value: hexValue,
      family: cleanFamily,
      category: 'color',
      description: STEP_DESCRIPTIONS[step],
      isBaseAnchor: step === effectiveAnchorStep,
      contrastRatioWithWhite: contrastWithWhite,
      bestTextColor,
    };
  });

  const paletteVariables: PaletteVariable[] = steps.map((st) => ({
    id: st.id,
    name: st.name,
    category: 'color',
    value: st.value,
    description: st.description,
    family: st.family,
  }));

  return {
    family: cleanFamily,
    baseHex: validHex,
    anchorStep: effectiveAnchorStep,
    detectedAnchorStep: detection.step,
    baseLightness: baseL,
    steps,
    paletteVariables,
  };
}
