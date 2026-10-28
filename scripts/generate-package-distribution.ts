import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  BASE_COLOR_TOKENS,
  TYPOGRAPHY_TOKENS,
  RADIUS_TOKENS,
  SPACING_TOKENS,
  SHADOW_TOKENS,
  BRAND_PRESETS,
} from '../lib/data/tokens';
import { PRINCIPLES_DATA } from '../lib/data/principles';
import { PATTERNS_COLLECTION } from '../lib/data/patterns';
import { GALLERY_COMPONENTS } from '../lib/data/components';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 1. Generate tokens/token.json & tokens/tokens.json (W3C DTCG Format)
function generateTokenJson() {
  const tokensDir = path.join(ROOT_DIR, 'tokens');
  ensureDir(tokensDir);

  const tokenStructure: Record<string, any> = {
    $schema: 'https://design-tokens.github.io/community-group/format/',
    name: 'AtomDesignToken System',
    version: (function() {
      try {
        const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'));
        return pkg.version || '0.1.0';
      } catch {
        return '0.1.0';
      }
    })(),
    color: {
      brand: {},
      surface: {},
      text: {},
      border: {},
      status: {},
    },
    typography: {},
    radius: {},
    spacing: {},
    shadow: {},
    presets: {},
  };

  BASE_COLOR_TOKENS.forEach((t) => {
    const key = t.variable.replace('--atom-', '').replace('--', '');
    const cat = t.category || 'surface';
    if (!tokenStructure.color[cat]) tokenStructure.color[cat] = {};
    tokenStructure.color[cat][key] = {
      $value: t.value,
      $type: 'color',
      $description: t.description,
      variable: t.variable,
    };
  });

  TYPOGRAPHY_TOKENS.forEach((t) => {
    const key = t.variable.replace('--atom-typography-', '');
    tokenStructure.typography[key] = {
      $value: {
        fontSize: t.fontSize,
        lineHeight: t.lineHeight,
        fontWeight: t.weight,
      },
      $type: 'typography',
      variable: t.variable,
      sample: t.sample,
    };
  });

  RADIUS_TOKENS.forEach((t) => {
    const key = t.variable.replace('--atom-radius-', '');
    tokenStructure.radius[key] = {
      $value: t.value,
      $type: 'dimension',
      $description: t.description,
      variable: t.variable,
    };
  });

  SPACING_TOKENS.forEach((t) => {
    const key = t.variable.replace('--atom-space-', '');
    tokenStructure.spacing[key] = {
      $value: t.value,
      $type: 'dimension',
      px: t.px,
      variable: t.variable,
    };
  });

  SHADOW_TOKENS.forEach((t) => {
    const key = t.variable.replace('--atom-shadow-', '');
    tokenStructure.shadow[key] = {
      $value: t.value,
      $type: 'shadow',
      $description: t.description,
      variable: t.variable,
    };
  });

  BRAND_PRESETS.forEach((b) => {
    tokenStructure.presets[b.id] = {
      name: b.name,
      brandColor: b.brandColor,
      radius: b.radius,
      description: b.description,
    };
  });

  const jsonContent = JSON.stringify(tokenStructure, null, 2);
  fs.writeFileSync(path.join(tokensDir, 'token.json'), jsonContent, 'utf-8');
  fs.writeFileSync(path.join(tokensDir, 'tokens.json'), jsonContent, 'utf-8');
  console.log('✅ Generated tokens/token.json & tokens/tokens.json');
}

// 2. Generate presets/default.design.md & atom.design.md
function generateDesignMd() {
  const presetsDir = path.join(ROOT_DIR, 'presets');
  ensureDir(presetsDir);

  let md = `# 🏛️ AtomSystem Universal Design Guide (atom.design.md)

> **Universal Design Token & Framework-Agnostic Design System**
> 단일 진실 공급원(SSOT)과 제로 런타임 오버헤드를 추구하는 모던 UI 디자인 지침서입니다.

---

## 1. 핵심 디자인 철학 (Design Principles)

`;

  PRINCIPLES_DATA.forEach((p) => {
    md += `### ${p.number}. ${p.title}\n`;
    md += `> **${p.subtitle}**\n\n`;
    md += `${p.description}\n\n`;
    md += `* **권장 실천 (DO)**:\n`;
    p.dos.forEach((d) => (md += `  - ✅ ${d}\n`));
    md += `* **지양 안티패턴 (DON'T)**:\n`;
    p.donts.forEach((d) => (md += `  - ❌ ${d}\n`));
    if (p.w3cRef) md += `* **표준 참조**: \`${p.w3cRef}\`\n`;
    md += `\n---\n\n`;
  });

  md += `## 2. 디자인 토큰 사양 (Design Token Specifications)

### 🎨 시맨틱 컬러 토큰
| 분류 | 토큰 변수명 | 기본값 | 용도 및 설명 |
| :--- | :--- | :--- | :--- |
`;

  BASE_COLOR_TOKENS.forEach((t) => {
    md += `| ${t.category} | \`${t.variable}\` | \`${t.value}\` | ${t.description} |\n`;
  });

  md += `\n### 📐 라운딩 (Border Radius)
| 토큰 변수명 | 값 | 설명 |
| :--- | :--- | :--- |
`;
  RADIUS_TOKENS.forEach((t) => {
    md += `| \`${t.variable}\` | \`${t.value}\` | ${t.description} |\n`;
  });

  md += `\n### 🔲 그림자 (Elevation Shadows)
| 토큰 변수명 | 값 | 설명 |
| :--- | :--- | :--- |
`;
  SHADOW_TOKENS.forEach((t) => {
    md += `| \`${t.variable}\` | \`${t.value}\` | ${t.description} |\n`;
  });

  md += `\n### 📏 여백 척도 (Spacing Scale)
| 토큰 변수명 | 픽셀 | REM |
| :--- | :--- | :--- |
`;
  SPACING_TOKENS.forEach((t) => {
    md += `| \`${t.variable}\` | ${t.px}px | ${t.value} |\n`;
  });

  md += `\n---\n\n## 3. 브랜드 프리셋 (Presets)
`;
  BRAND_PRESETS.forEach((b) => {
    md += `- **${b.name} (\`${b.id}\`)**: 메인 색상 \`${b.brandColor}\`, 기본 곡률 \`${b.radius}\` — ${b.description}\n`;
  });

  fs.writeFileSync(path.join(presetsDir, 'default.design.md'), md, 'utf-8');
  fs.writeFileSync(path.join(ROOT_DIR, 'atom.design.md'), md, 'utf-8');
  console.log('✅ Generated presets/default.design.md & atom.design.md');
}

// 3. Generate presets/uxPattern.md & atom.uxPattern.md
function generateUxPatternMd() {
  const presetsDir = path.join(ROOT_DIR, 'presets');
  ensureDir(presetsDir);

  let md = `# 🧩 AtomSystem UX Pattern Guide (atom.uxPattern.md)

> 사용자 경험(UX) 완성도, 접근성(A11y), 상태 피드백을 극대화하기 위해 사전 검증된 화면 패턴 명세서입니다.

---

`;

  PATTERNS_COLLECTION.forEach((p, idx) => {
    md += `## ${idx + 1}. ${p.title} (\`${p.id}\`)
- **분류**: ${p.categoryName} (${p.badge})
- **플랫폼**: \`${p.platform}\` | **와이어프레임 구조**: \`${p.wireframeType}\`
- **개요**: ${p.summary}
- **추천 아톰 컴포넌트**: ${p.recommendedComponentIds.map((id) => `\`${id}\``).join(', ')}

### ✅ UX 체크리스트 (Best Practices)
`;
    p.checklist.forEach((item) => {
      md += `- [ ] ${item}\n`;
    });

    md += `\n### ❌ 지양해야 할 안티패턴 (Anti-Patterns)
`;
    p.antiPatterns.forEach((item) => {
      md += `- ⚠️ ${item}\n`;
    });

    if (p.variants && p.variants.length > 0) {
      md += `\n### 🔄 상세 베리에이션\n`;
      p.variants.forEach((v) => {
        md += `#### ${v.name} (\`${v.id}\`)\n${v.description}\n\n`;
        if (v.markdown) {
          md += `\`\`\`html\n${v.markdown.trim()}\n\`\`\`\n\n`;
        }
      });
    }

    md += `\n---\n\n`;
  });

  fs.writeFileSync(path.join(presetsDir, 'uxPattern.md'), md, 'utf-8');
  fs.writeFileSync(path.join(ROOT_DIR, 'atom.uxPattern.md'), md, 'utf-8');
  console.log('✅ Generated presets/uxPattern.md & atom.uxPattern.md');
}

// 4. Generate skills/atomsystem.skill.md
function syncSkillMd() {
  const skillsDir = path.join(ROOT_DIR, 'skills');
  ensureDir(skillsDir);

  const sourceSkillPath = path.join(ROOT_DIR, '.agents', 'skills', 'tokens-skills', 'SKILL.md');
  if (fs.existsSync(sourceSkillPath)) {
    const content = fs.readFileSync(sourceSkillPath, 'utf-8');
    fs.writeFileSync(path.join(skillsDir, 'atomsystem.skill.md'), content, 'utf-8');
    console.log('✅ Synced skills/atomsystem.skill.md');
  }
}

// 5. Generate components/ui ready-to-use React components
function generateUiComponents() {
  const uiDir = path.join(ROOT_DIR, 'components', 'ui');
  ensureDir(uiDir);

  // Button
  const buttonCode = `import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, disabled, className = '', children, ...props }, ref) => {
    const variantClass = variant === 'primary' ? 'atom-btn-primary' : \`atom-btn-\${variant}\`;
    const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-1.5' : size === 'lg' ? 'text-base px-5 py-3' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        className={\`atom-btn \${variantClass} \${sizeClass} \${className}\`}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
`;
  fs.writeFileSync(path.join(uiDir, 'Button.tsx'), buttonCode, 'utf-8');

  // Input
  const inputCode = `import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--atom-text-primary)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          className={\`atom-input \${error ? 'atom-input-error' : ''} \${className}\`}
          {...props}
        />
        {error ? (
          <span className="text-xs text-[var(--atom-destructive,#dc2626)]">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-[var(--atom-text-secondary,#8b95a1)]">{helperText}</span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
`;
  fs.writeFileSync(path.join(uiDir, 'Input.tsx'), inputCode, 'utf-8');

  // Card
  const cardCode = `import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ interactive = false, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={\`atom-card \${interactive ? 'atom-card-interactive cursor-pointer' : ''} \${className}\`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
`;
  fs.writeFileSync(path.join(uiDir, 'Card.tsx'), cardCode, 'utf-8');

  // Badge
  const badgeCode = `import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'destructive' | 'neutral';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', className = '', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={\`atom-badge atom-badge-\${variant} \${className}\`}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
`;
  fs.writeFileSync(path.join(uiDir, 'Badge.tsx'), badgeCode, 'utf-8');

  // Modal / Dialog
  const modalCode = `import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="atom-card w-full max-w-lg p-6 bg-[var(--atom-bg-surface)] rounded-[var(--atom-radius-lg)] shadow-2xl relative animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between pb-4 border-b border-[var(--atom-border-subtle)]">
            <h3 className="text-lg font-bold text-[var(--atom-text-primary)]">{title}</h3>
            <button
              onClick={onClose}
              aria-label="닫기"
              className="text-[var(--atom-text-secondary)] hover:text-[var(--atom-text-primary)] text-xl leading-none"
            >
              ×
            </button>
          </div>
        )}
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Modal.tsx'), modalCode, 'utf-8');

  // UI Components Index
  const indexCode = `export * from './Button';
export * from './Input';
export * from './Card';
export * from './Badge';
export * from './Modal';
`;
  fs.writeFileSync(path.join(uiDir, 'index.ts'), indexCode, 'utf-8');
  console.log('✅ Generated components/ui ready-to-use React components');
}

function main() {
  console.log('🚀 Starting package distribution assets generation...');
  generateTokenJson();
  generateDesignMd();
  generateUxPatternMd();
  syncSkillMd();
  generateUiComponents();
  console.log('✨ All package distribution assets generated successfully!');
}

main();

