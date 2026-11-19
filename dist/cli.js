#!/usr/bin/env node
import { buildAiComponentSubmissionPrompt, AI_COMPONENT_SUBMISSION_TEMPLATE, scanAndRefactorDirectory, isUnifiedTokensDocument, TokenReferenceResolver, AtomTokenSystem, INITIAL_PALETTE_VARIABLES, INITIAL_SEMANTIC_STATUS_TOKENS, resolveStudioComponentId, DEFAULT_COMPONENT_TYPES, exportStudioToTokensJson, exportStudioToCSS, exportStudioCustomComponentStyles, atomTokens, UNIFIED_TOKENS_DOCUMENT, STUDIO_CUSTOM_STYLES_START, STUDIO_CUSTOM_STYLES_END } from './chunk-PWNOKZML.js';
import fs4 from 'fs';
import path4 from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

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
function compileUnifiedTokensToCss(doc) {
  const resolver = new TokenReferenceResolver(doc);
  const cdnUrls = /* @__PURE__ */ new Set();
  const paletteVars = [];
  const semanticVars = [];
  const componentBlocks = [];
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
  for (const [compId, comp] of Object.entries(doc.components || {})) {
    for (const [varId, vNode] of Object.entries(comp.variables || {})) {
      const lines = [];
      for (const [propKey, binding] of Object.entries(vNode.tokens || {})) {
        const cssVal = resolver.resolveCssReference(binding.$value);
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
  parts.push(
    `:root {
  /* Palette Primitives */
${paletteVars.join("\n")}

  /* Theme Semantics */
${semanticVars.join("\n")}
  --accent-primary: var(--atom-color-primary);
  --accent-primary-hover: var(--atom-color-primary-hover);
  --font-sans: var(--atom-font-sans);
  --font-mono: var(--atom-font-mono);
}`
  );
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
import type { ComponentInteractiveStatus } from '@/lib/data/studioData';

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
  const indexPath = path4.join(uiDir, "index.ts");
  const exportLine = `export * from './${pascalName}';`;
  if (!fs4.existsSync(indexPath)) {
    fs4.mkdirSync(uiDir, { recursive: true });
    fs4.writeFileSync(indexPath, `${exportLine}
`, "utf-8");
    return true;
  }
  const content = fs4.readFileSync(indexPath, "utf-8");
  const pattern = new RegExp(`export\\s+\\*\\s+from\\s+['"]\\./${pascalName}['"]`);
  if (pattern.test(content)) {
    return false;
  }
  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  const trimmed = content.replace(/\s+$/, "");
  fs4.writeFileSync(indexPath, `${trimmed}${eol}${exportLine}${eol}`, "utf-8");
  return true;
}

// lib/services/studioRegistryServer.ts
var TOKENS_SSOT_REL_PATH = path4.join("tokens", "tokens.json");
var LEGACY_REGISTRY_REL_PATH = path4.join("tokens", "studio.registry.json");
var UNIVERSAL_MARKER = "/* === Universal Component Classes === */";
function readProjectVersion(cwd) {
  try {
    const pkgPath = path4.join(cwd, "package.json");
    if (fs4.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs4.readFileSync(pkgPath, "utf-8"));
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
  const ssotPath = path4.join(cwd, TOKENS_SSOT_REL_PATH);
  if (fs4.existsSync(ssotPath)) {
    try {
      const raw = fs4.readFileSync(ssotPath, "utf-8");
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
  const ssotPath = path4.join(cwd, TOKENS_SSOT_REL_PATH);
  const legacyPath = path4.join(cwd, LEGACY_REGISTRY_REL_PATH);
  let existsOnDisk = false;
  let registry = buildBaselineRegistry(cwd);
  if (fs4.existsSync(ssotPath)) {
    try {
      const raw = fs4.readFileSync(ssotPath, "utf-8");
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
  if (!existsOnDisk && fs4.existsSync(legacyPath)) {
    try {
      const raw = fs4.readFileSync(legacyPath, "utf-8");
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
  const uiDir = path4.join(cwd, "components", "ui");
  const discoveredFiles = [];
  if (fs4.existsSync(uiDir)) {
    const entries = fs4.readdirSync(uiDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".atom.json")) continue;
      const specPath = path4.join(uiDir, entry.name);
      try {
        const rawSpec = JSON.parse(fs4.readFileSync(specPath, "utf-8"));
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
  const normalizedRegistry = {
    $schema: registry.$schema || "https://system.atomground.com/schemas/studio-registry.schema.json",
    version: registry.version || readProjectVersion(cwd),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    activeThemeId: registry.activeThemeId || "ocean-blue",
    statusTokens: registry.statusTokens && registry.statusTokens.length > 0 ? registry.statusTokens : INITIAL_SEMANTIC_STATUS_TOKENS,
    paletteVariables: registry.paletteVariables && registry.paletteVariables.length > 0 ? registry.paletteVariables : INITIAL_PALETTE_VARIABLES,
    components: registry.components || [],
    ...registry.themes && registry.themes.length > 0 ? { themes: registry.themes } : {}
  };
  const baseDocument = readExistingBaseDocument(cwd);
  const filesWritten = [];
  const tokensDir = path4.join(cwd, "tokens");
  if (!fs4.existsSync(tokensDir)) {
    fs4.mkdirSync(tokensDir, { recursive: true });
  }
  const formattedTokensJson = options?.tokensJson && options.tokensJson.trim() ? options.tokensJson : exportStudioToTokensJson(
    normalizedRegistry.paletteVariables,
    normalizedRegistry.components,
    normalizedRegistry.statusTokens,
    {
      activeThemeId: normalizedRegistry.activeThemeId,
      themes: normalizedRegistry.themes,
      baseDocument,
      version: normalizedRegistry.version
    }
  );
  const tokensJsonPath = path4.join(cwd, TOKENS_SSOT_REL_PATH);
  fs4.writeFileSync(tokensJsonPath, formattedTokensJson, "utf-8");
  filesWritten.push("tokens/tokens.json");
  const cssDir = path4.join(cwd, "css");
  if (!fs4.existsSync(cssDir)) {
    fs4.mkdirSync(cssDir, { recursive: true });
  }
  const cssPath = path4.join(cssDir, "atom-ui.css");
  const generatedBase = options?.cssString && typeof options.cssString === "string" ? options.cssString : exportStudioToCSS(
    normalizedRegistry.paletteVariables,
    normalizedRegistry.components,
    normalizedRegistry.statusTokens,
    baseDocument.palette
  );
  const customStylesBlock = exportStudioCustomComponentStyles(normalizedRegistry.components);
  const baseWithoutCustom = stripDelimitedCustomStyles(generatedBase).trimEnd();
  let fullCss = baseWithoutCustom;
  if (fs4.existsSync(cssPath) && !baseWithoutCustom.includes(UNIVERSAL_MARKER)) {
    const existingCss = fs4.readFileSync(cssPath, "utf-8");
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
  fs4.writeFileSync(cssPath, fullCss, "utf-8");
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
  const uiDir = path4.join(cwd, "components", "ui");
  if (!fs4.existsSync(uiDir)) {
    fs4.mkdirSync(uiDir, { recursive: true });
  }
  const filesWritten = [];
  const componentRelPath = `components/ui/${pascalName}.tsx`;
  const componentAbsPath = path4.join(uiDir, `${pascalName}.tsx`);
  if (!fs4.existsSync(componentAbsPath) || spec.componentCode || spec.overwriteCode) {
    const tsxCode = spec.componentCode ? `${spec.componentCode.trimEnd()}
` : generateComponentTsx(spec);
    fs4.writeFileSync(componentAbsPath, tsxCode, "utf-8");
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

// src/studioServer.ts
function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
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
function startLocalTokenStudio(options = {}) {
  const port = options.port || 4e3;
  const cwd = options.cwd || process.cwd();
  const tokenJsonPath = path4.join(cwd, "tokens", "tokens.json");
  const cssPath = path4.join(cwd, "css", "atom-ui.css");
  const registryPath = path4.join(cwd, "tokens", "tokens.json");
  const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }
    const url = new URL(req.url || "/", `http://localhost:${port}`);
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
    if (url.pathname === "/api/tokens" && req.method === "GET") {
      let data = {};
      if (fs4.existsSync(tokenJsonPath)) {
        try {
          data = JSON.parse(fs4.readFileSync(tokenJsonPath, "utf-8"));
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
        const tokensDir = path4.dirname(tokenJsonPath);
        if (!fs4.existsSync(tokensDir)) fs4.mkdirSync(tokensDir, { recursive: true });
        fs4.writeFileSync(tokenJsonPath, JSON.stringify(newTokens, null, 2), "utf-8");
        const compiledCss = compileTokensToCss(newTokens);
        const cssDir = path4.dirname(cssPath);
        if (!fs4.existsSync(cssDir)) fs4.mkdirSync(cssDir, { recursive: true });
        let fullCss = compiledCss;
        if (fs4.existsSync(cssPath)) {
          const existingCss = fs4.readFileSync(cssPath, "utf-8");
          const splitIndex = existingCss.indexOf("/* === Universal Component Classes === */");
          if (splitIndex !== -1) {
            fullCss = `${compiledCss.trimEnd()}

${existingCss.slice(splitIndex)}`;
          }
        }
        fs4.writeFileSync(cssPath, fullCss, "utf-8");
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
    if (url.pathname === "/" || url.pathname === "/index.html") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(getStudioHtml());
      return;
    }
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
  });
  server.listen(port, () => {
    console.log(`
\u{1F3A8} AtomSystem Local SSOT Studio running at:`);
    console.log(`   \u{1F449} http://localhost:${port}
`);
    console.log(`   Registry SSOT : ${path4.relative(cwd, registryPath)}`);
    console.log(`   Tokens file   : ${path4.relative(cwd, tokenJsonPath)}`);
    console.log(`   Compiled CSS  : ${path4.relative(cwd, cssPath)}`);
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

    function renderComponentList() {
      if (!registryState) return;
      const q = (document.getElementById('comp-search').value || '').toLowerCase();
      const listEl = document.getElementById('comp-list');
      const items = registryState.components.filter((c) => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
      listEl.innerHTML = items.map((c) =>
        '<button class="comp-item ' + (c.id === selectedCompId ? 'active' : '') + '" onclick="selectComponent(\\'' + c.id + '\\')">' +
          '<span>' + c.name + '</span>' +
          '<span class="meta-mono">' + (c.types ? c.types.length + 'T / ' : '') + c.variables.length + 'V</span>' +
        '</button>'
      ).join('');
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
        '<div class="spec-card"><div class="spec-title">' + t.name + '</div><div class="meta-mono">type="' + t.id + '"</div><p class="spec-sub" style="margin-top:6px;">' + (t.whenToUse || t.description || '') + '</p></div>'
      ).join('') || '<div class="meta-mono">\uAE30\uBCF8 Standard Type \uC0AC\uC6A9</div>';

      const varsHtml = (comp.variables || []).map((v) =>
        '<div class="spec-card"><div class="spec-title">' + v.name + '</div><div class="meta-mono">variable="' + v.id + '"</div><div class="meta-mono" style="margin-top:6px;">' +
          Object.entries(v.tokenBindings || {}).slice(0, 4).map(([k, val]) => k + ': ' + val).join('<br>') +
        '</div></div>'
      ).join('');

      container.innerHTML =
        '<div style="display:flex; justify-content:space-between; align-items:start; gap:12px; border-bottom:1px solid var(--border); padding-bottom:12px;">' +
          '<div><h2 style="font-size:18px; font-weight:800;">' + comp.name + '</h2><p class="desc">' + comp.description + '</p>' +
          (comp.sourceFile ? '<div class="meta-mono" style="margin-top:4px;">\u{1F4C4} ' + comp.sourceFile + '</div>' : '') + '</div>' +
          '<span class="badge">' + comp.category + '</span>' +
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

// src/cli.ts
function getPkgRoot() {
  try {
    if (typeof __dirname !== "undefined") {
      return path4.resolve(__dirname, "..");
    }
    const currentFile = fileURLToPath(import.meta.url);
    return path4.resolve(path4.dirname(currentFile), "..");
  } catch {
    return process.cwd();
  }
}
var PKG_ROOT = getPkgRoot();
var args = process.argv.slice(2);
var command = args[0] || "help";
var targetName = args[1];
function copyFileSafe(src, dest, label) {
  const targetDir = path4.dirname(dest);
  if (!fs4.existsSync(targetDir)) {
    fs4.mkdirSync(targetDir, { recursive: true });
  }
  fs4.copyFileSync(src, dest);
  console.log(`  \u2713 ${label} -> ${path4.relative(process.cwd(), dest)}`);
}
function handleInit() {
  const cwd = process.cwd();
  console.log("\n\u{1F680} Initializing AtomSystem Universal Design System...\n");
  const srcAgentGuide = path4.join(PKG_ROOT, "presets", "agents.guide.md");
  if (fs4.existsSync(srcAgentGuide)) {
    copyFileSafe(srcAgentGuide, path4.join(cwd, "AGENTS.md"), "Universal AI Guide (AGENTS.md)");
    copyFileSafe(srcAgentGuide, path4.join(cwd, "CLAUDE.md"), "Claude Code Guidelines (CLAUDE.md)");
    copyFileSafe(srcAgentGuide, path4.join(cwd, ".cursorrules"), "Cursor Rules (.cursorrules)");
  }
  const srcSkill = path4.join(PKG_ROOT, "skills", "atomsystem.skill.md");
  if (fs4.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, path4.join(cwd, ".agents", "skills", "atomsystem", "SKILL.md"), "Agent Skill (.agents/skills/atomsystem/SKILL.md)");
  }
  const specs = [
    { src: path4.join(PKG_ROOT, "presets", "default.design.md"), dest: path4.join(cwd, "atom.design.md"), label: "Design Tokens (atom.design.md)" },
    { src: path4.join(PKG_ROOT, "presets", "components.md"), dest: path4.join(cwd, "atom.components.md"), label: "Components Spec (atom.components.md)" },
    { src: path4.join(PKG_ROOT, "presets", "blocks.md"), dest: path4.join(cwd, "atom.blocks.md"), label: "Design Blocks Spec (atom.blocks.md)" },
    { src: path4.join(PKG_ROOT, "presets", "uxPattern.md"), dest: path4.join(cwd, "atom.uxPattern.md"), label: "UX Patterns (atom.uxPattern.md)" }
  ];
  specs.forEach((s) => {
    if (fs4.existsSync(s.src)) {
      copyFileSafe(s.src, s.dest, s.label);
    }
  });
  const srcToken = path4.join(PKG_ROOT, "tokens", "tokens.json");
  if (fs4.existsSync(srcToken)) {
    copyFileSafe(srcToken, path4.join(cwd, "tokens", "tokens.json"), "Unified Token SSOT (tokens/tokens.json)");
  } else {
    const { registry } = loadProjectRegistry(cwd);
    saveProjectRegistry(cwd, registry);
    console.log("  \u2713 Unified Token SSOT -> tokens/tokens.json");
  }
  const srcCss = path4.join(PKG_ROOT, "css", "atom-ui.css");
  if (fs4.existsSync(srcCss)) {
    copyFileSafe(srcCss, path4.join(cwd, "css", "atom-ui.css"), "Zero-Runtime Semantic CSS (css/atom-ui.css)");
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
  toast: "Toast.tsx",
  "token-select": "TokenSelect.tsx",
  tooltip: "Tooltip.tsx",
  tree: "Tree.tsx"
};
var BLOCK_MAP = {
  "realtime-chart": { file: "RealtimeChartBlock.tsx", deps: ["card", "button", "badge"] },
  "interactive-chat": { file: "InteractiveChatBlock.tsx", deps: ["card", "input", "button", "badge"] },
  "pricing-table": { file: "PricingPlanBlock.tsx", deps: ["card", "button", "badge"] },
  "card-list": { file: "CardListBlock.tsx", deps: ["card", "input", "button", "badge"] },
  "interactive-slider": { file: "SliderShowcaseBlock.tsx", deps: ["card", "button", "badge"] },
  "metric-stats": { file: "MetricStatsBlock.tsx", deps: ["card", "badge"] },
  "file-explorer": { file: "FileExplorerBlock.tsx", deps: ["card", "button", "badge"] }
};
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
    const src = path4.join(PKG_ROOT, "components", "ui", fileName);
    const dest = path4.join(cwd, "components", "ui", fileName);
    if (fs4.existsSync(src)) {
      copyFileSafe(src, dest, `Component (${fileName})`);
      console.log(`
\u2705 Added ${normalized} component to components/ui/${fileName}
`);
    } else {
      console.error(`
\u274C Source component file not found: ${src}
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
      const depFile = COMPONENT_MAP[dep];
      if (depFile) {
        const srcDep = path4.join(PKG_ROOT, "components", "ui", depFile);
        const destDep = path4.join(cwd, "components", "ui", depFile);
        if (fs4.existsSync(srcDep)) {
          copyFileSafe(srcDep, destDep, `Dependent Component (${depFile})`);
        }
      }
    });
    const srcBlock = path4.join(PKG_ROOT, "components", "blocks", file);
    const destBlock = path4.join(cwd, "components", "blocks", file);
    if (fs4.existsSync(srcBlock)) {
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
  console.log(`
Available Components:
  - button      (Button, ButtonVariants)
  - card        (Card container)
  - badge       (Status badge)
  - input       (Input with status)
  - table       (Table, Header, Row, Cell)
  - tabs        (TabsList, TabsTrigger)
  - switch      (A11y Switch toggle)
  - modal       (Dialog with Esc key support)

Available Design Blocks:
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
  const tokenJsonPath = path4.join(cwd, "tokens", "tokens.json");
  const cssPath = path4.join(cwd, "css", "atom-ui.css");
  if (!fs4.existsSync(tokenJsonPath)) {
    console.error(`
\u274C tokens/tokens.json not found at ${tokenJsonPath}. Run 'npx atomsystem init' first.
`);
    return;
  }
  try {
    const tokens = JSON.parse(fs4.readFileSync(tokenJsonPath, "utf-8"));
    let css = compileTokensToCss(tokens);
    const cssDir = path4.dirname(cssPath);
    if (!fs4.existsSync(cssDir)) fs4.mkdirSync(cssDir, { recursive: true });
    const marker = "/* === Universal Component Classes === */";
    if (fs4.existsSync(cssPath)) {
      const existing = fs4.readFileSync(cssPath, "utf-8");
      const idx = existing.indexOf(marker);
      if (idx !== -1) css = `${css.trimEnd()}

${existing.slice(idx)}`;
    }
    fs4.writeFileSync(cssPath, css, "utf-8");
    console.log(`
\u2728 Successfully compiled tokens to ${path4.relative(cwd, cssPath)}!
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
function handleSkillInstall() {
  const cwd = process.cwd();
  console.log("\n\u{1F916} Installing AtomSystem Agent Skill & Universal Guidelines...\n");
  const srcAgentGuide = path4.join(PKG_ROOT, "presets", "agents.guide.md");
  if (fs4.existsSync(srcAgentGuide)) {
    copyFileSafe(srcAgentGuide, path4.join(cwd, "AGENTS.md"), "Universal AI Guide (AGENTS.md)");
    copyFileSafe(srcAgentGuide, path4.join(cwd, "CLAUDE.md"), "Claude Code Guidelines (CLAUDE.md)");
    copyFileSafe(srcAgentGuide, path4.join(cwd, ".cursorrules"), "Cursor Rules (.cursorrules)");
  }
  const srcSkill = path4.join(PKG_ROOT, "skills", "atomsystem.skill.md");
  if (fs4.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, path4.join(cwd, ".agents", "skills", "atomsystem", "SKILL.md"), "Agent Skill (.agents/skills/atomsystem/SKILL.md)");
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
    const fullDir = path4.resolve(cwd, dirName);
    if (!fs4.existsSync(fullDir)) return;
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
  const absPath = path4.resolve(cwd, filePathArg);
  if (!fs4.existsSync(absPath)) {
    console.error(`
\u274C Spec file not found: ${absPath}
`);
    process.exitCode = 1;
    return;
  }
  try {
    const raw = JSON.parse(fs4.readFileSync(absPath, "utf-8"));
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
  init            Initialize AI guidelines, tokens, studio.registry.json, specs, and CSS
  studio          Launch Local SSOT Web Studio GUI (Component Registry + AI Submit + Tokens)
  submit <file>   Register & scaffold an AI component spec JSON into the project SSOT
  sync            Auto-discover components/ui/*.tsx & *.atom.json and recompile SSOT CSS/JSON
  schema          Print standardized AI Component Submission JSON template (--prompt for AI prompt)
  build:tokens    Compile tokens/tokens.json into zero-runtime css/atom-ui.css
  refactor        Scan & replace hardcoded HEX/px/Tailwind colors with tokens (--fix)
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
  const pkgPath = path4.join(PKG_ROOT, "package.json");
  if (fs4.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs4.readFileSync(pkgPath, "utf-8"));
    console.log(`atomsystem v${pkg.version}`);
  } else {
    console.log("atomsystem v0.14.2");
  }
}
switch (command) {
  case "init":
    handleInit();
    break;
  case "refactor":
    handleRefactor();
    break;
  case "skill":
    handleSkillInstall();
    break;
  case "studio":
  case "editor":
    handleStudio();
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