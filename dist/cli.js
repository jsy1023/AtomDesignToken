#!/usr/bin/env node
import { scanAndRefactorDirectory, exportStudioToTokensJson, exportStudioToCSS, exportStudioCustomComponentStyles, STUDIO_CUSTOM_STYLES_START, STUDIO_CUSTOM_STYLES_END } from './chunk-G7M4X7IA.js';
import { buildAiComponentSubmissionPrompt, AI_COMPONENT_SUBMISSION_TEMPLATE, isUnifiedTokensDocument, TokenReferenceResolver, AtomTokenSystem, INITIAL_PALETTE_VARIABLES, INITIAL_SEMANTIC_STATUS_TOKENS, resolveStudioComponentId, DEFAULT_COMPONENT_TYPES, INITIAL_STUDIO_THEMES, atomTokens, UNIFIED_TOKENS_DOCUMENT } from './chunk-NPYZNBUR.js';
import fs7 from 'fs';
import path7 from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import http from 'http';
import { exec } from 'child_process';

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
  const indexPath = path7.join(uiDir, "index.ts");
  const exportLine = `export * from './${pascalName}';`;
  if (!fs7.existsSync(indexPath)) {
    fs7.mkdirSync(uiDir, { recursive: true });
    fs7.writeFileSync(indexPath, `${exportLine}
`, "utf-8");
    return true;
  }
  const content = fs7.readFileSync(indexPath, "utf-8");
  const pattern = new RegExp(`export\\s+\\*\\s+from\\s+['"]\\./${pascalName}['"]`);
  if (pattern.test(content)) {
    return false;
  }
  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  const trimmed = content.replace(/\s+$/, "");
  fs7.writeFileSync(indexPath, `${trimmed}${eol}${exportLine}${eol}`, "utf-8");
  return true;
}

// lib/services/studioRegistryServer.ts
var TOKENS_SSOT_REL_PATH = path7.join("tokens", "tokens.json");
var LEGACY_REGISTRY_REL_PATH = path7.join("tokens", "studio.registry.json");
var UNIVERSAL_MARKER = "/* === Universal Component Classes === */";
function readProjectVersion(cwd) {
  try {
    const pkgPath = path7.join(cwd, "package.json");
    if (fs7.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs7.readFileSync(pkgPath, "utf-8"));
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
  const ssotPath = path7.join(cwd, TOKENS_SSOT_REL_PATH);
  if (fs7.existsSync(ssotPath)) {
    try {
      const raw = fs7.readFileSync(ssotPath, "utf-8");
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
  const ssotPath = path7.join(cwd, TOKENS_SSOT_REL_PATH);
  const legacyPath = path7.join(cwd, LEGACY_REGISTRY_REL_PATH);
  let existsOnDisk = false;
  let registry = buildBaselineRegistry(cwd);
  if (fs7.existsSync(ssotPath)) {
    try {
      const raw = fs7.readFileSync(ssotPath, "utf-8");
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
  if (!existsOnDisk && fs7.existsSync(legacyPath)) {
    try {
      const raw = fs7.readFileSync(legacyPath, "utf-8");
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
  const uiDir = path7.join(cwd, "components", "ui");
  const discoveredFiles = [];
  if (fs7.existsSync(uiDir)) {
    const entries = fs7.readdirSync(uiDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".atom.json")) continue;
      const specPath = path7.join(uiDir, entry.name);
      try {
        const rawSpec = JSON.parse(fs7.readFileSync(specPath, "utf-8"));
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
  const tokensDir = path7.join(cwd, "tokens");
  if (!fs7.existsSync(tokensDir)) {
    fs7.mkdirSync(tokensDir, { recursive: true });
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
  const tokensJsonPath = path7.join(cwd, TOKENS_SSOT_REL_PATH);
  fs7.writeFileSync(tokensJsonPath, formattedTokensJson, "utf-8");
  filesWritten.push("tokens/tokens.json");
  const cssDir = path7.join(cwd, "css");
  if (!fs7.existsSync(cssDir)) {
    fs7.mkdirSync(cssDir, { recursive: true });
  }
  const cssPath = path7.join(cssDir, "atom-ui.css");
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
  if (fs7.existsSync(cssPath) && !baseWithoutCustom.includes(UNIVERSAL_MARKER)) {
    const existingCss = fs7.readFileSync(cssPath, "utf-8");
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
  fs7.writeFileSync(cssPath, fullCss, "utf-8");
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
  const uiDir = path7.join(cwd, "components", "ui");
  if (!fs7.existsSync(uiDir)) {
    fs7.mkdirSync(uiDir, { recursive: true });
  }
  const filesWritten = [];
  const componentRelPath = `components/ui/${pascalName}.tsx`;
  const componentAbsPath = path7.join(uiDir, `${pascalName}.tsx`);
  if (!fs7.existsSync(componentAbsPath) || spec.componentCode || spec.overwriteCode) {
    const tsxCode = spec.componentCode ? `${spec.componentCode.trimEnd()}
` : generateComponentTsx(spec);
    fs7.writeFileSync(componentAbsPath, tsxCode, "utf-8");
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
  const candidateRoots = ["src", "app", "components", "pages", "styles"].map((d) => path7.join(rootDir, d)).filter((d) => fs7.existsSync(d) && fs7.statSync(d).isDirectory());
  const scanTargets = candidateRoots.length > 0 ? candidateRoots : [rootDir];
  function walk(dir) {
    let entries;
    try {
      entries = fs7.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path7.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && SOURCE_EXTENSIONS.has(path7.extname(entry.name).toLowerCase())) {
        const rel = path7.relative(rootDir, fullPath).split(path7.sep).join("/");
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
    const relFile = path7.relative(cwd, absFile).split(path7.sep).join("/");
    let content = "";
    try {
      content = fs7.readFileSync(absFile, "utf-8");
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
      const base = path7.basename(relFile, path7.extname(relFile));
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
      return path7.resolve(__dirname, "studio");
    }
    const currentFile = fileURLToPath(import.meta.url);
    return path7.resolve(path7.dirname(currentFile), "studio");
  } catch {
    return path7.resolve(process.cwd(), "dist", "studio");
  }
}
function startLocalTokenStudio(options = {}) {
  const port = options.port ?? 4e3;
  const host = options.host || "127.0.0.1";
  const cwd = options.cwd || process.cwd();
  const tokenJsonPath = path7.join(cwd, "tokens", "tokens.json");
  const cssPath = path7.join(cwd, "css", "atom-ui.css");
  const registryPath = path7.join(cwd, "tokens", "tokens.json");
  const server = http.createServer(async (req, res) => {
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
      if (fs7.existsSync(tokenJsonPath)) {
        try {
          data = JSON.parse(fs7.readFileSync(tokenJsonPath, "utf-8"));
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
        const tokensDir = path7.dirname(tokenJsonPath);
        if (!fs7.existsSync(tokensDir)) fs7.mkdirSync(tokensDir, { recursive: true });
        fs7.writeFileSync(tokenJsonPath, JSON.stringify(newTokens, null, 2), "utf-8");
        const compiledCss = compileTokensToCss(newTokens);
        const cssDir = path7.dirname(cssPath);
        if (!fs7.existsSync(cssDir)) fs7.mkdirSync(cssDir, { recursive: true });
        let fullCss = compiledCss;
        if (fs7.existsSync(cssPath)) {
          const existingCss = fs7.readFileSync(cssPath, "utf-8");
          const splitIndex = existingCss.indexOf("/* === Universal Component Classes === */");
          if (splitIndex !== -1) {
            fullCss = `${compiledCss.trimEnd()}

${existingCss.slice(splitIndex)}`;
          }
        }
        fs7.writeFileSync(cssPath, fullCss, "utf-8");
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
      const assetPath = path7.join(studioDistDir, url.pathname.slice(1));
      if (fs7.existsSync(assetPath)) {
        const contentType = url.pathname.endsWith(".js") ? "application/javascript; charset=utf-8" : "text/css; charset=utf-8";
        res.writeHead(200, { "Content-Type": contentType, "Cache-Control": "no-cache" });
        res.end(fs7.readFileSync(assetPath));
        return;
      }
    }
    if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html" || url.pathname === "/studio" || url.pathname.startsWith("/studio/"))) {
      const indexPath = path7.join(studioDistDir, "index.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
      if (fs7.existsSync(indexPath)) {
        res.end(fs7.readFileSync(indexPath, "utf-8"));
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
    console.log(`   Registry SSOT : ${path7.relative(cwd, registryPath)}`);
    console.log(`   Tokens file   : ${path7.relative(cwd, tokenJsonPath)}`);
    console.log(`   Compiled CSS  : ${path7.relative(cwd, cssPath)}`);
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
  exec(cmd, () => {
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
  const doc = JSON.parse(fs7.readFileSync(tokenJsonPath, "utf-8"));
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
  const tokenJsonPath = path7.join(cwd, "tokens", "tokens.json");
  const cssPath = path7.join(cwd, "css", "atom-ui.css");
  const doc = JSON.parse(fs7.readFileSync(tokenJsonPath, "utf-8"));
  const presets = doc?.theme?.presets || {};
  const selectedPreset = presets[themeId];
  if (!selectedPreset) {
    throw new Error(`Theme "${themeId}" not found.`);
  }
  doc.theme = doc.theme || {};
  doc.theme.activeThemeId = themeId;
  doc.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  fs7.writeFileSync(tokenJsonPath, `${JSON.stringify(doc, null, 2)}
`, "utf-8");
  let css = compileTokensToCss(doc);
  const cssDir = path7.dirname(cssPath);
  if (!fs7.existsSync(cssDir)) fs7.mkdirSync(cssDir, { recursive: true });
  const marker = "/* === Universal Component Classes === */";
  if (fs7.existsSync(cssPath)) {
    const existing = fs7.readFileSync(cssPath, "utf-8");
    const idx = existing.indexOf(marker);
    if (idx !== -1) css = `${css.trimEnd()}

${existing.slice(idx)}`;
  }
  fs7.writeFileSync(cssPath, css, "utf-8");
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
  const tokenJsonPath = path7.join(cwd, "tokens", "tokens.json");
  const server = http.createServer((req, res) => {
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
    console.log(`   Tokens file : ${path7.relative(cwd, tokenJsonPath)}`);
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
  const rel = path7.relative(path7.dirname(fromFile), targetFile).split(path7.sep).join("/");
  return rel.startsWith(".") ? rel : `./${rel}`;
}
function ensureLocalCssLinked(cwd) {
  const localAtomCss = path7.join(cwd, "css", "atom-ui.css");
  const updatedFiles = [];
  const alreadyLinkedFiles = [];
  const foundCssFiles = [];
  if (!fs7.existsSync(localAtomCss)) {
    return { updatedFiles, alreadyLinkedFiles, foundCssFiles };
  }
  for (const relCandidate of GLOBAL_CSS_CANDIDATES) {
    const absCssFile = path7.join(cwd, relCandidate);
    if (!fs7.existsSync(absCssFile)) continue;
    foundCssFiles.push(relCandidate);
    const content = fs7.readFileSync(absCssFile, "utf-8");
    const relImportPath = toPosixRelativeImport(absCssFile, localAtomCss);
    const importStatement = `@import "${relImportPath}";`;
    const pkgImportRegex = /(@import\s+['"])atomsystem\/css\/atom-ui\.css(['"]\s*;?)/g;
    if (pkgImportRegex.test(content)) {
      const nextContent2 = content.replace(pkgImportRegex, `$1${relImportPath}$2`);
      if (nextContent2 !== content) {
        fs7.writeFileSync(absCssFile, nextContent2, "utf-8");
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
    fs7.writeFileSync(absCssFile, nextContent, "utf-8");
    updatedFiles.push(relCandidate);
  }
  return { updatedFiles, alreadyLinkedFiles, foundCssFiles };
}

// src/cli.ts
function getPkgRoot() {
  try {
    if (typeof __dirname !== "undefined") {
      return path7.resolve(__dirname, "..");
    }
    const currentFile = fileURLToPath(import.meta.url);
    return path7.resolve(path7.dirname(currentFile), "..");
  } catch {
    return process.cwd();
  }
}
var PKG_ROOT = getPkgRoot();
var args = process.argv.slice(2);
var command = args[0] || "help";
var targetName = args[1];
function copyFileSafe(src, dest, label) {
  const targetDir = path7.dirname(dest);
  if (!fs7.existsSync(targetDir)) {
    fs7.mkdirSync(targetDir, { recursive: true });
  }
  fs7.copyFileSync(src, dest);
  console.log(`  \u2713 ${label} -> ${path7.relative(process.cwd(), dest)}`);
}
function handleInit() {
  const cwd = process.cwd();
  console.log("\n\u{1F680} Initializing AtomSystem Universal Design System...\n");
  const srcAgentGuide = path7.join(PKG_ROOT, "presets", "agents.guide.md");
  if (fs7.existsSync(srcAgentGuide)) {
    copyFileSafe(srcAgentGuide, path7.join(cwd, "AGENTS.md"), "Universal AI Guide (AGENTS.md)");
    copyFileSafe(srcAgentGuide, path7.join(cwd, "CLAUDE.md"), "Claude Code Guidelines (CLAUDE.md)");
    copyFileSafe(srcAgentGuide, path7.join(cwd, ".cursorrules"), "Cursor Rules (.cursorrules)");
  }
  const srcSkill = path7.join(PKG_ROOT, "skills", "atomsystem.skill.md");
  if (fs7.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, path7.join(cwd, ".agents", "skills", "atomsystem", "SKILL.md"), "Agent Skill (.agents/skills/atomsystem/SKILL.md)");
  }
  const specs = [
    { src: path7.join(PKG_ROOT, "presets", "default.design.md"), dest: path7.join(cwd, "atom.design.md"), label: "Design Tokens (atom.design.md)" },
    { src: path7.join(PKG_ROOT, "presets", "components.md"), dest: path7.join(cwd, "atom.components.md"), label: "Components Spec (atom.components.md)" },
    { src: path7.join(PKG_ROOT, "presets", "blocks.md"), dest: path7.join(cwd, "atom.blocks.md"), label: "Design Blocks Spec (atom.blocks.md)" },
    { src: path7.join(PKG_ROOT, "presets", "uxPattern.md"), dest: path7.join(cwd, "atom.uxPattern.md"), label: "UX Patterns (atom.uxPattern.md)" }
  ];
  specs.forEach((s) => {
    if (fs7.existsSync(s.src)) {
      copyFileSafe(s.src, s.dest, s.label);
    }
  });
  const srcToken = path7.join(PKG_ROOT, "tokens", "tokens.json");
  if (fs7.existsSync(srcToken)) {
    copyFileSafe(srcToken, path7.join(cwd, "tokens", "tokens.json"), "Unified Token SSOT (tokens/tokens.json)");
  } else {
    const { registry } = loadProjectRegistry(cwd);
    saveProjectRegistry(cwd, registry);
    console.log("  \u2713 Unified Token SSOT -> tokens/tokens.json");
  }
  const srcCss = path7.join(PKG_ROOT, "css", "atom-ui.css");
  if (fs7.existsSync(srcCss)) {
    copyFileSafe(srcCss, path7.join(cwd, "css", "atom-ui.css"), "Zero-Runtime Semantic CSS (css/atom-ui.css)");
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
  const src = path7.join(PKG_ROOT, "components", "ui", fileName);
  const uiDir = path7.join(cwd, "components", "ui");
  const dest = path7.join(uiDir, fileName);
  if (!fs7.existsSync(src)) {
    console.error(`
\u274C Source component file not found: ${src}
`);
    return false;
  }
  if (!fs7.existsSync(uiDir)) {
    fs7.mkdirSync(uiDir, { recursive: true });
  }
  let code = fs7.readFileSync(src, "utf-8");
  if (path7.resolve(cwd) !== path7.resolve(PKG_ROOT)) {
    code = code.replace(/from\s+['"]\.\.\/\.\.\/lib\/[^'"]+['"]/g, "from 'atomsystem'");
  }
  fs7.writeFileSync(dest, code, "utf-8");
  console.log(`  \u2713 Component (${fileName}) -> ${path7.relative(cwd, dest)}`);
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
    const srcBlock = path7.join(PKG_ROOT, "components", "blocks", file);
    const destBlock = path7.join(cwd, "components", "blocks", file);
    if (fs7.existsSync(srcBlock)) {
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
  const tokenJsonPath = path7.join(cwd, "tokens", "tokens.json");
  const cssPath = path7.join(cwd, "css", "atom-ui.css");
  if (!fs7.existsSync(tokenJsonPath)) {
    console.error(`
\u274C tokens/tokens.json not found at ${tokenJsonPath}. Run 'npx atomsystem init' first.
`);
    return;
  }
  try {
    const tokens = JSON.parse(fs7.readFileSync(tokenJsonPath, "utf-8"));
    let css = compileTokensToCss(tokens);
    const cssDir = path7.dirname(cssPath);
    if (!fs7.existsSync(cssDir)) fs7.mkdirSync(cssDir, { recursive: true });
    const marker = "/* === Universal Component Classes === */";
    if (fs7.existsSync(cssPath)) {
      const existing = fs7.readFileSync(cssPath, "utf-8");
      const idx = existing.indexOf(marker);
      if (idx !== -1) css = `${css.trimEnd()}

${existing.slice(idx)}`;
    }
    fs7.writeFileSync(cssPath, css, "utf-8");
    console.log(`
\u2728 Successfully compiled tokens to ${path7.relative(cwd, cssPath)}!
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
  const tokenJsonPath = path7.join(cwd, "tokens", "tokens.json");
  const cssPath = path7.join(cwd, "css", "atom-ui.css");
  if (!fs7.existsSync(tokenJsonPath)) {
    console.error(`
\u274C tokens/tokens.json not found at ${tokenJsonPath}. Run 'npx atomsystem init' first.
`);
    return;
  }
  let doc;
  try {
    doc = JSON.parse(fs7.readFileSync(tokenJsonPath, "utf-8"));
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
      console.log(`   \u2713 Updated ${path7.relative(cwd, tokenJsonPath)}`);
      console.log(`   \u2713 Recompiled ${path7.relative(cwd, cssPath)}
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
  const answer = await inquirer.prompt([
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
    console.log(`   \u2713 Updated ${path7.relative(cwd, tokenJsonPath)}`);
    console.log(`   \u2713 Recompiled ${path7.relative(cwd, cssPath)}
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
  const srcAgentGuide = path7.join(PKG_ROOT, "presets", "agents.guide.md");
  if (fs7.existsSync(srcAgentGuide)) {
    copyFileSafe(srcAgentGuide, path7.join(cwd, "AGENTS.md"), "Universal AI Guide (AGENTS.md)");
    copyFileSafe(srcAgentGuide, path7.join(cwd, "CLAUDE.md"), "Claude Code Guidelines (CLAUDE.md)");
    copyFileSafe(srcAgentGuide, path7.join(cwd, ".cursorrules"), "Cursor Rules (.cursorrules)");
  }
  const srcSkill = path7.join(PKG_ROOT, "skills", "atomsystem.skill.md");
  if (fs7.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, path7.join(cwd, ".agents", "skills", "atomsystem", "SKILL.md"), "Agent Skill (.agents/skills/atomsystem/SKILL.md)");
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
    const fullDir = path7.resolve(cwd, dirName);
    if (!fs7.existsSync(fullDir)) return;
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
  const absPath = path7.resolve(cwd, filePathArg);
  if (!fs7.existsSync(absPath)) {
    console.error(`
\u274C Spec file not found: ${absPath}
`);
    process.exitCode = 1;
    return;
  }
  try {
    const raw = JSON.parse(fs7.readFileSync(absPath, "utf-8"));
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
  const pkgPath = path7.join(PKG_ROOT, "package.json");
  if (fs7.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs7.readFileSync(pkgPath, "utf-8"));
    console.log(`atomsystem v${pkg.version}`);
  } else {
    console.log("atomsystem v0.15.3");
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
    if (path7.resolve(targetCwd) === path7.resolve(PKG_ROOT)) return;
    if (!fs7.existsSync(path7.join(targetCwd, "package.json"))) return;
    const targetTokenPath = path7.join(targetCwd, "tokens", "tokens.json");
    const targetCssPath = path7.join(targetCwd, "css", "atom-ui.css");
    const srcToken = path7.join(PKG_ROOT, "tokens", "tokens.json");
    const srcCss = path7.join(PKG_ROOT, "css", "atom-ui.css");
    let copiedAny = false;
    if (!fs7.existsSync(targetTokenPath) && fs7.existsSync(srcToken)) {
      fs7.mkdirSync(path7.dirname(targetTokenPath), { recursive: true });
      fs7.copyFileSync(srcToken, targetTokenPath);
      copiedAny = true;
    }
    if (!fs7.existsSync(targetCssPath) && fs7.existsSync(srcCss)) {
      fs7.mkdirSync(path7.dirname(targetCssPath), { recursive: true });
      fs7.copyFileSync(srcCss, targetCssPath);
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
//# sourceMappingURL=cli.js.map
//# sourceMappingURL=cli.js.map