import { describe, it, expect } from 'vitest';
import { compileTokensToCss } from '../src/tokenCompiler';

describe('compileTokensToCss', () => {
  it('compiles legacy flat DTCG JSON into :root CSS variables', () => {
    const legacy = {
      color: {
        brand: {
          $value: '#3182f6',
          $type: 'color',
          variable: '--accent-primary',
        },
        surface: {
          $value: '#ffffff',
          $type: 'color',
          variable: '--bg-primary',
        },
      },
    };

    const css = compileTokensToCss(legacy);
    expect(css).toContain(':root {');
    expect(css).toContain('--accent-primary: #3182f6;');
    expect(css).toContain('--bg-primary: #ffffff;');
  });

  it('compiles unified tokens with active theme overrides, data-atom-theme blocks, and semantic component mappings', () => {
    const unified = {
      version: '0.15.1',
      palette: {
        color: {
          blue: {
            '400': { $value: '#60a5fa', $type: 'color', variable: '--atom-palette-blue-400' },
            '500': { $value: '#3182f6', $type: 'color', variable: '--atom-palette-blue-500' },
            '600': { $value: '#1b64da', $type: 'color', variable: '--atom-palette-blue-600' },
            '900': { $value: '#1e3a8a', $type: 'color', variable: '--atom-palette-blue-900' },
          },
          gray: {
            '50': { $value: '#f8fafc', $type: 'color', variable: '--atom-palette-gray-50' },
            '200': { $value: '#e2e8f0', $type: 'color', variable: '--atom-palette-gray-200' },
            '700': { $value: '#334155', $type: 'color', variable: '--atom-palette-gray-700' },
            '800': { $value: '#1e293b', $type: 'color', variable: '--atom-palette-gray-800' },
            '900': { $value: '#0f172a', $type: 'color', variable: '--atom-palette-gray-900' },
          },
          neutral: {
            white: { $value: '#ffffff', $type: 'color', variable: '--atom-palette-white' },
          },
        },
        typography: {
          fontFamily: {
            sans: {
              $value: "'Inter', sans-serif",
              $type: 'fontFamily',
              variable: '--atom-font-sans',
              cdnUrl: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
            },
          },
        },
        spacing: {
          '4': { $value: '16px', $type: 'dimension', variable: '--atom-space-4' },
        },
        radius: {
          md: { $value: '8px', $type: 'dimension', variable: '--atom-radius-md' },
        },
      },
      theme: {
        activeThemeId: 'dark-cyber',
        semantic: {
          primary: {
            $value: '{palette.color.blue.500}',
            $type: 'color',
            variable: '--atom-color-primary',
            hover: {
              $value: '{palette.color.blue.600}',
              $type: 'color',
              variable: '--atom-color-primary-hover',
            },
            subtle: {
              $value: '{palette.color.blue.400}',
              $type: 'color',
              variable: '--atom-color-primary-subtle',
            },
          },
        },
        presets: {
          'dark-cyber': {
            id: 'dark-cyber',
            name: 'Cyber Dark',
            mode: 'dark',
            brandColor: '{palette.color.blue.400}',
            borderRadius: '10px',
            tokens: {
              primary: { $value: '{palette.color.blue.400}' },
              primaryHover: { $value: '{palette.color.blue.500}' },
              primaryLight: { $value: '{palette.color.blue.900}' },
              bgPrimary: { $value: '{palette.color.gray.900}' },
              bgSecondary: { $value: '{palette.color.gray.800}' },
              textPrimary: { $value: '{palette.color.gray.50}' },
              textSecondary: { $value: '{palette.color.gray.400}' },
              borderSubtle: { $value: '{palette.color.gray.700}' },
            },
          },
        },
      },
      components: {
        card: {
          variables: {
            elevated: {
              tokens: {
                background: { $value: '{palette.color.neutral.white}' },
                borderColor: { $value: '{palette.color.gray.200}' },
              },
            },
          },
        },
        button: {
          variables: {
            primary: {
              tokens: {
                textColor: { $value: '{palette.color.neutral.white}' },
              },
            },
          },
        },
      },
    };

    const css = compileTokensToCss(unified);

    expect(css).toContain('@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");');
    expect(css).toContain('/* Active Theme Preset (dark-cyber) */');
    expect(css).toContain('--atom-bg-surface: var(--atom-palette-gray-800);');
    expect(css).toContain('color-scheme: dark;');
    expect(css).toContain('[data-atom-theme="dark-cyber"]');

    // Card surface/border map to semantic role tokens
    expect(css).toContain('--atom-card-elevated-background: var(--atom-bg-surface);');
    expect(css).toContain('--atom-card-elevated-borderColor: var(--atom-border-subtle);');

    // Primary button textColor keeps white
    expect(css).toContain('--atom-button-primary-textColor: var(--atom-palette-white);');
  });
});
