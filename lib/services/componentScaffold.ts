import fs from 'fs';
import path from 'path';
import type {
  AtomComponentSubmissionSpec,
  ComponentInteractiveStatus,
  ComponentPropertySpec,
  ComponentTypeSpec,
  ComponentVariable,
} from '../data/studioData';

const VALID_CATEGORIES = new Set(['Form', 'Layout', 'Feedback', 'Navigation', 'Data']);
const KEBAB_ID_RE = /^[a-z][a-z0-9-]{0,62}$/;

/**
 * Converts a kebab-case component ID (e.g. 'rating-chip') into PascalCase (e.g. 'RatingChip').
 */
export function toPascalCase(kebabId: string): string {
  return (kebabId || '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Converts PascalCase or camelCase file basename (e.g. 'TokenSelect') into kebab-case ('token-select').
 */
export function toKebabCase(name: string): string {
  return (name || '')
    .replace(/\.tsx?$/i, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}

export function validateSubmissionSpec(
  raw: unknown
): { valid: true; spec: AtomComponentSubmissionSpec } | { valid: false; errors: string[] } {
  const errors: string[] = [];
  if (!raw || typeof raw !== 'object') {
    return { valid: false, errors: ['Submission payload must be a JSON object.'] };
  }

  const obj = raw as Record<string, unknown>;
  const id = typeof obj.id === 'string' ? obj.id.trim().toLowerCase() : '';
  const name = typeof obj.name === 'string' ? obj.name.trim() : '';
  const category = typeof obj.category === 'string' ? obj.category.trim() : '';
  const description = typeof obj.description === 'string' ? obj.description.trim() : '';

  if (!id || !KEBAB_ID_RE.test(id)) {
    errors.push('Field "id" must be lowercase kebab-case starting with a letter (e.g. "rating-chip").');
  }
  if (!name) {
    errors.push('Field "name" is required (e.g. "Rating Chip (별점 평가 칩)").');
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
  const types: ComponentTypeSpec[] = rawTypes.map((item, idx) => {
    const t = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>;
    const tId = typeof t.id === 'string' ? t.id.trim().toLowerCase() : '';
    const tName = typeof t.name === 'string' ? t.name.trim() : '';
    const whenToUse = typeof t.whenToUse === 'string' ? t.whenToUse.trim() : '';
    if (!tId) errors.push(`types[${idx}].id is required.`);
    if (!tName) errors.push(`types[${idx}].name is required.`);
    if (!whenToUse) errors.push(`types[${idx}].whenToUse is required.`);
    return {
      id: tId || `type-${idx + 1}`,
      name: tName || tId || `Type ${idx + 1}`,
      description: typeof t.description === 'string' ? t.description.trim() : '',
      whenToUse: whenToUse || '일반적인 화면 배치에 사용합니다.',
      ...(typeof t.whenToUseEn === 'string' ? { whenToUseEn: t.whenToUseEn } : {}),
      ...(typeof t.antiPattern === 'string' ? { antiPattern: t.antiPattern } : {}),
      ...(t.visualTraits && typeof t.visualTraits === 'object'
        ? { visualTraits: t.visualTraits as ComponentTypeSpec['visualTraits'] }
        : {}),
    };
  });

  const rawVariables = Array.isArray(obj.variables) ? obj.variables : [];
  if (rawVariables.length === 0) {
    errors.push('Field "variables" must be a non-empty array declaring at least one semantic Variable.');
  }
  const variables: ComponentVariable[] = rawVariables.map((item, idx) => {
    const v = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>;
    const vId = typeof v.id === 'string' ? v.id.trim().toLowerCase() : '';
    const vName = typeof v.name === 'string' ? v.name.trim() : '';
    const rawBindings =
      v.tokenBindings && typeof v.tokenBindings === 'object'
        ? (v.tokenBindings as Record<string, unknown>)
        : null;
    if (!vId) errors.push(`variables[${idx}].id is required.`);
    if (!vName) errors.push(`variables[${idx}].name is required.`);
    if (!rawBindings || Object.keys(rawBindings).length === 0) {
      errors.push(`variables[${idx}].tokenBindings must include at least one CSS token mapping.`);
    }

    const tokenBindings: Record<string, string> = {};
    if (rawBindings) {
      for (const [k, val] of Object.entries(rawBindings)) {
        if (typeof val === 'string' && val.trim()) {
          tokenBindings[k] = val.trim();
        }
      }
    }

    return {
      id: vId || `var-${idx + 1}`,
      name: vName || vId || `Variable ${idx + 1}`,
      description: typeof v.description === 'string' ? v.description.trim() : '',
      ...(typeof v.variableRole === 'string'
        ? { variableRole: v.variableRole as ComponentVariable['variableRole'] }
        : {}),
      ...(Array.isArray(v.supportedStatuses)
        ? { supportedStatuses: v.supportedStatuses as ComponentInteractiveStatus[] }
        : {}),
      tokenBindings,
    };
  });

  const properties: ComponentPropertySpec[] | undefined = Array.isArray(obj.properties)
    ? obj.properties
        .filter((p): p is Record<string, unknown> => !!p && typeof p === 'object')
        .map((p) => ({
          key: String(p.key || 'background'),
          label: String(p.label || p.key || 'Property'),
          category: (['color', 'radius', 'spacing', 'size', 'typography'].includes(String(p.category))
            ? p.category
            : 'color') as ComponentPropertySpec['category'],
          defaultPaletteId: String(p.defaultPaletteId || '--atom-color-primary'),
        }))
    : undefined;

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    spec: {
      id,
      name,
      category: category as AtomComponentSubmissionSpec['category'],
      description,
      types,
      ...(properties && properties.length > 0 ? { properties } : {}),
      variables,
      ...(Array.isArray(obj.supportedStatuses)
        ? { supportedStatuses: obj.supportedStatuses as ComponentInteractiveStatus[] }
        : {}),
      ...(typeof obj.componentCode === 'string' && obj.componentCode.trim()
        ? { componentCode: obj.componentCode }
        : {}),
      ...(typeof obj.overwriteCode === 'boolean' ? { overwriteCode: obj.overwriteCode } : {}),
      ...(typeof obj.customCss === 'string' && obj.customCss.trim()
        ? { customCss: obj.customCss }
        : {}),
      ...(obj.docs && typeof obj.docs === 'object'
        ? { docs: obj.docs as AtomComponentSubmissionSpec['docs'] }
        : {}),
    },
  };
}

/**
 * Generates an accessible, CSS-token-driven React component implementing AtomSystem's
 * invariant [Type · Variable · Status] 3-tier architecture.
 */
export function generateComponentTsx(spec: AtomComponentSubmissionSpec): string {
  const pascalName = toPascalCase(spec.id);
  const typeUnion = spec.types.map((t) => `'${t.id}'`).join(' | ');
  const varUnion = spec.variables.map((v) => `'${v.id}'`).join(' | ');
  const defaultType = spec.types[0]?.id || 'solid';
  const defaultVar = spec.variables[0]?.id || 'primary';

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
 * Auto-generated by AtomSystem Studio Scaffolder ([Type · Variable · Status]).
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

/**
 * Ensures `export * from './<PascalName>';` exists in `components/ui/index.ts`.
 */
export function ensureUiBarrelExport(uiDir: string, pascalName: string): boolean {
  const indexPath = path.join(uiDir, 'index.ts');
  const exportLine = `export * from './${pascalName}';`;
  if (!fs.existsSync(indexPath)) {
    fs.mkdirSync(uiDir, { recursive: true });
    fs.writeFileSync(indexPath, `${exportLine}\n`, 'utf-8');
    return true;
  }

  const content = fs.readFileSync(indexPath, 'utf-8');
  const pattern = new RegExp(`export\\s+\\*\\s+from\\s+['"]\\./${pascalName}['"]`);
  if (pattern.test(content)) {
    return false;
  }

  const eol = content.includes('\r\n') ? '\r\n' : '\n';
  const trimmed = content.replace(/\s+$/, '');
  fs.writeFileSync(indexPath, `${trimmed}${eol}${exportLine}${eol}`, 'utf-8');
  return true;
}
