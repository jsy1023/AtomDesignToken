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

  // Calendar
  const calendarCode = `import React, { useState } from 'react';

export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({ selected, onSelect, className = '' }) => {
  const [currentDate, setCurrentDate] = useState(selected || new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const isSelected = (d: Date | null) => {
    if (!d || !selected) return false;
    return (
      d.getFullYear() === selected.getFullYear() &&
      d.getMonth() === selected.getMonth() &&
      d.getDate() === selected.getDate()
    );
  };

  return (
    <div className={\`atom-calendar \${className}\`}>
      <div className="atom-calendar-header">
        <button type="button" onClick={handlePrevMonth} className="atom-calendar-nav-btn" aria-label="이전 달">
          &lt;
        </button>
        <span className="atom-calendar-title">
          {year}년 {month + 1}월
        </span>
        <button type="button" onClick={handleNextMonth} className="atom-calendar-nav-btn" aria-label="다음 달">
          &gt;
        </button>
      </div>
      <div className="atom-calendar-grid">
        {['일', '월', '화', '수', '목', '금', '토'].map((w) => (
          <div key={w} className="atom-calendar-weekday">
            {w}
          </div>
        ))}
        {days.map((d, idx) =>
          d ? (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect?.(d)}
              className={\`atom-calendar-day \${isSelected(d) ? 'atom-calendar-day-selected' : ''}\`}
            >
              {d.getDate()}
            </button>
          ) : (
            <div key={idx} />
          )
        )}
      </div>
    </div>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Calendar.tsx'), calendarCode, 'utf-8');

  // Select
  const selectCode = `import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={\`atom-select \${className}\`}>
      <button
        type="button"
        className="atom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="atom-select-arrow" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          ▼
        </span>
      </button>
      {isOpen && (
        <ul className="atom-select-menu" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className="atom-select-option"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange?.(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Select.tsx'), selectCode, 'utf-8');

  // Accordion
  const accordionCode = `import React, { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, type = 'single', className = '' }) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (type === 'single') {
      setOpenIds(openIds.includes(id) ? [] : [id]);
    } else {
      setOpenIds(openIds.includes(id) ? openIds.filter((item) => item !== id) : [...openIds, id]);
    }
  };

  return (
    <div className={\`atom-accordion \${className}\`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="atom-accordion-item">
            <button
              type="button"
              className="atom-accordion-trigger"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className="atom-accordion-icon" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                ▾
              </span>
            </button>
            {isOpen && <div className="atom-accordion-content">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Accordion.tsx'), accordionCode, 'utf-8');

  // Tooltip
  const tooltipCode = `import React, { useState } from 'react';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={\`atom-tooltip-wrapper \${className}\`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={\`atom-tooltip-bubble atom-tooltip-\${position}\`} role="tooltip">
          {content}
        </div>
      )}
    </div>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Tooltip.tsx'), tooltipCode, 'utf-8');

  // Pagination
  const paginationCode = `import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={\`atom-pagination \${className}\`} aria-label="페이지 네비게이션">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="atom-pagination-btn"
      >
        &lt; 이전
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange?.(p)}
          className={\`atom-pagination-btn \${p === currentPage ? 'atom-pagination-active' : ''}\`}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="atom-pagination-btn"
      >
        다음 &gt;
      </button>
    </nav>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Pagination.tsx'), paginationCode, 'utf-8');

  // Radio Group
  const radioCode = `import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name?: string;
  value?: string;
  options: RadioOption[];
  onChange?: (val: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name = 'atom-radio-group',
  value,
  options,
  onChange,
  className = '',
}) => {
  return (
    <div className={\`atom-radio-group \${className}\`} role="radiogroup">
      {options.map((opt) => (
        <label key={opt.value} className="atom-radio-label">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            className="atom-radio"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{opt.label}</span>
            {opt.description && <span className="text-xs text-neutral-500">{opt.description}</span>}
          </div>
        </label>
      ))}
    </div>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Radio.tsx'), radioCode, 'utf-8');

  // Slider
  const sliderCode = `import React from 'react';

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (val: number) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className = '',
}) => {
  return (
    <div className={\`atom-slider \${className}\`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="atom-slider-input"
      />
    </div>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Slider.tsx'), sliderCode, 'utf-8');

  // Avatar
  const avatarCode = `import React, { useState } from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  status,
  className = '',
}) => {
  const [hasError, setHasError] = useState(!src);

  return (
    <div className={\`atom-avatar atom-avatar-\${size} \${className}\`}>
      {src && !hasError ? (
        <img src={src} alt={alt} onError={() => setHasError(true)} className="atom-avatar-img" />
      ) : (
        <span className="atom-avatar-fallback">{fallback || alt.slice(0, 2).toUpperCase()}</span>
      )}
      {status && <span className={\`atom-avatar-status atom-avatar-status-\${status}\`} />}
    </div>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Avatar.tsx'), avatarCode, 'utf-8');

  // Progress
  const progressCode = `import React from 'react';

export interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'success';
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'primary',
  className = '',
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={\`atom-progress \${className}\`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={\`atom-progress-bar atom-progress-\${variant}\`}
        style={{ width: \`\${percent}%\` }}
      />
    </div>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Progress.tsx'), progressCode, 'utf-8');

  // Skeleton
  const skeletonCode = `import React from 'react';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  circle = false,
  className = '',
}) => {
  return (
    <div
      className={\`atom-skeleton \${circle ? '!rounded-full' : ''} \${className}\`}
      style={{
        width: typeof width === 'number' ? \`\${width}px\` : width,
        height: typeof height === 'number' ? \`\${height}px\` : height,
      }}
    />
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Skeleton.tsx'), skeletonCode, 'utf-8');

  // Breadcrumb
  const breadcrumbCode = `import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className = '',
}) => {
  return (
    <nav className={\`atom-breadcrumb \${className}\`} aria-label="Breadcrumb">
      <ol className="atom-breadcrumb-list">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li className={\`atom-breadcrumb-item \${isLast ? 'atom-breadcrumb-current' : ''}\`}>
                {isLast || !item.href ? (
                  <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                ) : (
                  <a href={item.href}>{item.label}</a>
                )}
              </li>
              {!isLast && <li className="atom-breadcrumb-separator">{separator}</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Breadcrumb.tsx'), breadcrumbCode, 'utf-8');

  // Separator
  const separatorCode = `import React from 'react';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  label,
  className = '',
}) => {
  if (label && orientation === 'horizontal') {
    return (
      <div className={\`atom-separator-with-label \${className}\`}>
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={\`atom-separator atom-separator-\${orientation} \${className}\`}
    />
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Separator.tsx'), separatorCode, 'utf-8');

  // Textarea
  const textareaCode = `import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ maxLength, label, value, className = '', ...props }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="atom-textarea-group">
        {label && <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">{label}</label>}
        <textarea ref={ref} value={value} maxLength={maxLength} className={\`atom-textarea \${className}\`} {...props} />
        {maxLength && (
          <div className="atom-textarea-counter">
            {currentLength} / {maxLength}자
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
`;
  fs.writeFileSync(path.join(uiDir, 'Textarea.tsx'), textareaCode, 'utf-8');

  // Tree
  const treeCode = `import React, { useState } from 'react';

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps {
  data: TreeNode[];
  selectedId?: string;
  onSelect?: (node: TreeNode) => void;
  defaultExpandedIds?: string[];
  className?: string;
}

export const Tree: React.FC<TreeProps> = ({
  data,
  selectedId,
  onSelect,
  defaultExpandedIds = [],
  className = '',
}) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);
  const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(selectedId);

  const activeSelectedId = selectedId !== undefined ? selectedId : internalSelectedId;

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelect = (node: TreeNode) => {
    if (node.disabled) return;
    setInternalSelectedId(node.id);
    if (onSelect) {
      onSelect(node);
    }
  };

  const renderNodes = (nodes: TreeNode[]) => {
    return (
      <ul className="atom-tree-list" role="group">
        {nodes.map((node) => {
          const hasChildren = Boolean(node.children && node.children.length > 0);
          const isExpanded = expandedIds.includes(node.id);
          const isSelected = activeSelectedId === node.id;

          return (
            <li
              key={node.id}
              className="atom-tree-item"
              role="treeitem"
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-selected={isSelected}
              aria-disabled={node.disabled}
            >
              <div
                className={\`atom-tree-node \${isSelected ? 'is-selected' : ''} \${
                  node.disabled ? 'is-disabled' : ''
                }\`}
                onClick={() => {
                  if (hasChildren && !isExpanded) {
                    setExpandedIds((prev) => [...prev, node.id]);
                  }
                  handleSelect(node);
                }}
                tabIndex={node.disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (hasChildren) {
                      setExpandedIds((prev) =>
                        prev.includes(node.id)
                          ? prev.filter((item) => item !== node.id)
                          : [...prev, node.id]
                      );
                    }
                    handleSelect(node);
                  }
                }}
              >
                {hasChildren ? (
                  <button
                    type="button"
                    className={\`atom-tree-toggle \${isExpanded ? 'is-expanded' : ''}\`}
                    onClick={(e) => toggleExpand(node.id, e)}
                    aria-label={isExpanded ? '접기' : '펼치기'}
                    tabIndex={-1}
                  >
                    ▶
                  </button>
                ) : (
                  <span className="atom-tree-toggle-spacer" aria-hidden="true" />
                )}

                {node.icon && <span className="atom-tree-icon">{node.icon}</span>}
                <span className="atom-tree-label">{node.label}</span>
              </div>

              {hasChildren && isExpanded && (
                <div className="atom-tree-children">{renderNodes(node.children!)}</div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={\`atom-tree \${className}\`} role="tree">
      {renderNodes(data)}
    </div>
  );
};
`;
  fs.writeFileSync(path.join(uiDir, 'Tree.tsx'), treeCode, 'utf-8');

  // UI Components Index
  const indexCode = `export * from './Button';
export * from './Input';
export * from './Card';
export * from './Badge';
export * from './Modal';
export * from './Calendar';
export * from './Select';
export * from './Accordion';
export * from './Tooltip';
export * from './Pagination';
export * from './Radio';
export * from './Slider';
export * from './Avatar';
export * from './Progress';
export * from './Skeleton';
export * from './Breadcrumb';
export * from './Separator';
export * from './Textarea';
export * from './Tree';
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

