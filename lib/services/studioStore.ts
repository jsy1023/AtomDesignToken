import {
  ComponentInteractiveStatus,
  ComponentPropertySpec,
  ComponentTypeSpec,
  ComponentVariable,
  getComponentTypes,
  PaletteVariable,
  resolveTypeSpec,
  resolveVariableRole,
  StudioComponentDefinition,
  StudioRegistry,
} from '../data/studioData';
import type { StudioTheme } from '../data/themeData';

export interface PaletteColorFamilyItem {
  id: string;
  label: string;
  color: string;
}

const COLOR_FAMILY_PRESET_ANCHORS: Record<string, string> = {
  blue: '#3182f6',
  gray: '#64748b',
  emerald: '#10b981',
  rose: '#f43f5e',
  amber: '#f59e0b',
  purple: '#8b5cf6',
  indigo: '#6366f1',
  cyan: '#06b6d4',
  teal: '#14b8a6',
  orange: '#f97316',
  pink: '#ec4899',
  lime: '#84cc16',
};

/**
 * Pure domain repository managing palette token lookup, mutations, font token upserts, and filtering.
 */
export class PaletteRepository {
  static resolveValue(
    palettes: PaletteVariable[],
    paletteId: string,
    activeTheme?: StudioTheme
  ): string {
    if (activeTheme) {
      if (paletteId === '--atom-color-primary' || paletteId === '--atom-palette-blue-500') {
        return activeTheme.colors.primary;
      }
      if (paletteId === '--atom-color-primary-hover' || paletteId === '--atom-palette-blue-600') {
        return activeTheme.colors.primaryHover || activeTheme.colors.primary;
      }
      if (paletteId === '--atom-palette-blue-50') {
        return activeTheme.colors.primaryLight || `${activeTheme.colors.primary}20`;
      }
    }
    return palettes.find((p) => p.id === paletteId)?.value || paletteId;
  }

  static upsertFontToken(
    palettes: PaletteVariable[],
    tokenId: string,
    value: string,
    cdnUrl?: string
  ): PaletteVariable[] {
    const exists = palettes.some((p) => p.id === tokenId);
    if (exists) {
      return palettes.map((p) =>
        p.id === tokenId
          ? {
              ...p,
              value,
              cdnUrl: cdnUrl !== undefined ? cdnUrl : p.cdnUrl,
            }
          : p
      );
    }

    const isMono = tokenId.includes('mono');
    return [
      {
        id: tokenId,
        name: isMono
          ? 'Font Family Mono (코드/모노 폰트)'
          : 'Font Family Sans (기본 본문 폰트)',
        category: 'typography',
        family: 'font-family',
        value,
        cdnUrl,
        description: isMono ? '모노스페이스 코드 폰트' : '전역 기본 산세리프 폰트',
      },
      ...palettes,
    ];
  }

  static createToken(
    palettes: PaletteVariable[],
    draft: {
      id: string;
      name: string;
      category: PaletteVariable['category'];
      value: string;
      description?: string;
      family?: string;
    }
  ): PaletteVariable[] {
    const cleanId = draft.id.startsWith('--') ? draft.id.trim() : `--atom-${draft.id.trim()}`;
    const newPal: PaletteVariable = {
      id: cleanId,
      name: draft.name.trim(),
      category: draft.category,
      value: draft.value.trim(),
      description: draft.description?.trim() || '',
      family: draft.family,
    };
    return [...palettes, newPal];
  }

  static updateToken(
    palettes: PaletteVariable[],
    tokenId: string,
    patch: { name?: string; value?: string; description?: string }
  ): PaletteVariable[] {
    return palettes.map((p) =>
      p.id === tokenId
        ? {
            ...p,
            name: patch.name?.trim() || p.name,
            value: patch.value?.trim() || p.value,
            description:
              patch.description !== undefined ? patch.description.trim() : p.description,
          }
        : p
    );
  }

  static deleteToken(palettes: PaletteVariable[], tokenId: string): PaletteVariable[] {
    return palettes.filter((p) => p.id !== tokenId);
  }

  static addScale(
    palettes: PaletteVariable[],
    newTokens: PaletteVariable[]
  ): PaletteVariable[] {
    const incomingIds = new Set(newTokens.map((t) => t.id));
    const filtered = palettes.filter((p) => !incomingIds.has(p.id));
    return [...filtered, ...newTokens];
  }

  static filterTokens(
    palettes: PaletteVariable[],
    opts: { category: string; family: string; query: string }
  ): PaletteVariable[] {
    const q = opts.query.toLowerCase();
    return palettes.filter((p) => {
      const matchesCat = opts.category === 'all' || p.category === opts.category;
      const matchesFamily =
        opts.category !== 'color' || opts.family === 'all' || p.family === opts.family;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.value.toLowerCase().includes(q);
      return matchesCat && matchesFamily && matchesQuery;
    });
  }

  static extractColorFamilies(
    palettes: PaletteVariable[],
    locale: string
  ): PaletteColorFamilyItem[] {
    const familyKeys = Array.from(
      new Set([
        'blue',
        'gray',
        'emerald',
        'rose',
        'amber',
        'purple',
        ...palettes.filter((p) => p.category === 'color' && p.family).map((p) => p.family!),
      ])
    );

    return [
      { id: 'all', label: locale === 'ko' ? '전체' : 'All', color: 'var(--text-primary)' },
      ...familyKeys.map((fam) => ({
        id: fam,
        label: fam.charAt(0).toUpperCase() + fam.slice(1),
        color:
          COLOR_FAMILY_PRESET_ANCHORS[fam] ||
          palettes.find((p) => p.family === fam && p.id.includes('500'))?.value ||
          '#3182f6',
      })),
    ];
  }
}

/**
 * Pure domain service encapsulating component Types, Variables, Token Bindings, and catalog filtering.
 */
export class ComponentCatalogService {
  static filterComponents(
    components: StudioComponentDefinition[],
    opts: { category: string; query: string }
  ): StudioComponentDefinition[] {
    const q = opts.query.toLowerCase();
    return components.filter((c) => {
      const matchesQuery =
        !q || c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
      const matchesCategory = opts.category === 'all' || c.category === opts.category;
      return matchesQuery && matchesCategory;
    });
  }

  static createType(
    components: StudioComponentDefinition[],
    compId: string,
    draft: { id: string; name: string; description?: string; whenToUse?: string }
  ): { components: StudioComponentDefinition[]; createdType: ComponentTypeSpec } | null {
    if (!draft.name.trim() || !draft.id.trim()) return null;
    const cleanKey = draft.id.trim().toLowerCase().replace(/\s+/g, '-');
    const createdType: ComponentTypeSpec = {
      id: cleanKey,
      name: draft.name.trim(),
      description: draft.description?.trim() || `${draft.name.trim()} 디자인 양식`,
      whenToUse:
        draft.whenToUse?.trim() ||
        `${draft.name.trim()} 디자인 형태가 필요한 상황에 사용합니다.`,
    };

    const next = components.map((c) => {
      if (c.id !== compId) return c;
      const existingTypes = getComponentTypes(c.id, c.types);
      return {
        ...c,
        types: [...existingTypes, createdType],
      };
    });

    return { components: next, createdType };
  }

  static deleteType(
    components: StudioComponentDefinition[],
    compId: string,
    typeId: string
  ): StudioComponentDefinition[] {
    return components.map((c) => {
      if (c.id !== compId) return c;
      const existingTypes = getComponentTypes(c.id, c.types);
      if (existingTypes.length <= 1) return c;
      return {
        ...c,
        types: existingTypes.filter((t) => t.id !== typeId),
      };
    });
  }

  static createVariable(
    components: StudioComponentDefinition[],
    compId: string,
    baseVariable: ComponentVariable | undefined,
    draft: { id: string; name: string; description?: string }
  ): { components: StudioComponentDefinition[]; createdVar: ComponentVariable } | null {
    const targetComp = components.find((c) => c.id === compId);
    if (!targetComp || !draft.name.trim() || !draft.id.trim()) return null;

    const cleanKey = draft.id.trim().toLowerCase().replace(/\s+/g, '-');
    const initialBindings: Record<string, string> = {};
    targetComp.properties.forEach((prop) => {
      initialBindings[prop.key] =
        baseVariable?.tokenBindings[prop.key] || prop.defaultPaletteId;
    });

    const createdVar: ComponentVariable = {
      id: cleanKey,
      name: draft.name.trim(),
      description: draft.description?.trim() || '',
      type: resolveTypeSpec(targetComp.id, cleanKey, draft.name.trim()),
      variableRole: resolveVariableRole(cleanKey),
      tokenBindings: initialBindings,
    };

    const next = components.map((comp) =>
      comp.id === compId ? { ...comp, variables: [...comp.variables, createdVar] } : comp
    );

    return { components: next, createdVar };
  }

  static deleteVariable(
    components: StudioComponentDefinition[],
    compId: string,
    varId: string
  ): StudioComponentDefinition[] {
    return components.map((comp) => {
      if (comp.id !== compId || comp.variables.length <= 1) return comp;
      return {
        ...comp,
        variables: comp.variables.filter((v) => v.id !== varId),
      };
    });
  }

  static renameVariable(
    components: StudioComponentDefinition[],
    compId: string,
    varId: string,
    newName: string
  ): StudioComponentDefinition[] {
    const trimmed = newName.trim();
    if (!trimmed) return components;
    return components.map((comp) => {
      if (comp.id !== compId) return comp;
      return {
        ...comp,
        variables: comp.variables.map((v) =>
          v.id === varId
            ? { ...v, name: trimmed, type: resolveTypeSpec(comp.id, varId, trimmed) }
            : v
        ),
      };
    });
  }

  static updateTokenBinding(
    components: StudioComponentDefinition[],
    compId: string,
    varId: string,
    propertyKey: string,
    paletteId: string
  ): StudioComponentDefinition[] {
    return components.map((comp) => {
      if (comp.id !== compId) return comp;
      return {
        ...comp,
        variables: comp.variables.map((v) =>
          v.id === varId
            ? {
                ...v,
                tokenBindings: {
                  ...v.tokenBindings,
                  [propertyKey]: paletteId,
                },
              }
            : v
        ),
      };
    });
  }

  static resolveBoundPaletteId(
    variable: ComponentVariable | undefined,
    prop: ComponentPropertySpec
  ): string {
    const explicit = variable?.tokenBindings[prop.key];
    if (explicit) return explicit;

    const bindings = variable?.tokenBindings;
    if (prop.key === 'hoverBackground') {
      return bindings?.background ? `${bindings.background}-hover` : prop.defaultPaletteId;
    }
    if (prop.key === 'hoverTextColor') {
      return bindings?.textColor || prop.defaultPaletteId;
    }
    if (prop.key === 'hoverBorderColor') {
      return bindings?.borderColor || prop.defaultPaletteId;
    }
    if (prop.key === 'activeBackground') {
      return bindings?.hoverBackground || bindings?.background || prop.defaultPaletteId;
    }
    if (prop.key === 'focusBorderColor') {
      return bindings?.borderColor || '--atom-color-primary';
    }
    if (prop.key === 'disabledBackground') {
      return bindings?.background || '--atom-palette-gray-200';
    }
    if (prop.key === 'disabledTextColor') {
      return bindings?.textColor || '--atom-palette-gray-400';
    }
    return prop.defaultPaletteId;
  }

  static generateComponentSnippet(params: {
    component: StudioComponentDefinition;
    type: ComponentTypeSpec;
    variable: ComponentVariable | undefined;
    varLabel: string;
    size: 'sm' | 'md' | 'lg';
    iconSlot: 'none' | 'left' | 'right' | 'icon-only';
    status: ComponentInteractiveStatus;
    lang: 'react' | 'html' | 'vue';
    placeholderText: string;
  }): string {
    const {
      component,
      type,
      variable,
      varLabel,
      size,
      iconSlot,
      status,
      lang,
      placeholderText,
    } = params;
    const baseName = component.name.split(' ')[0];
    const isDefaultStatus = status === 'default';
    const sizeAttr = size !== 'md' ? ` size="${size}"` : '';
    const iconAttr = iconSlot !== 'none' ? ` icon="${iconSlot}"` : '';
    const varId = variable?.id || 'default';

    if (lang === 'react') {
      const statusProp = isDefaultStatus ? '' : ` status="${status}"`;
      if (component.id === 'input') {
        return `<Input componentType="${type.id}" variable="${varId}"${statusProp} placeholder="${placeholderText}" />`;
      }
      if (component.id === 'badge') {
        return `<Badge componentType="${type.id}" variable="${varId}"${statusProp}>\n  ${varLabel}\n</Badge>`;
      }
      return `<${baseName} componentType="${type.id}" variable="${varId}"${sizeAttr}${iconAttr}${statusProp}>\n  ${varLabel}\n</${baseName}>`;
    }

    if (lang === 'html') {
      const statusAttr = isDefaultStatus ? '' : ` data-status="${status}"`;
      const tag =
        component.id === 'button' ? 'button' : component.id === 'input' ? 'input' : 'div';
      const disabledAttr =
        (status === 'disabled' || status === 'loading') &&
        (tag === 'button' || tag === 'input')
          ? ' disabled'
          : '';
      if (tag === 'input') {
        return `<input class="atom-input atom-input--${type.id}" data-component="input" data-type="${type.id}" data-variable="${varId}"${statusAttr}${disabledAttr} placeholder="${placeholderText}" />`;
      }
      return `<${tag} class="atom-${component.id} atom-${component.id}--${type.id} atom-${component.id}--${size}" data-component="${component.id}" data-type="${type.id}" data-variable="${varId}"${statusAttr}${disabledAttr}>\n  ${varLabel}\n</${tag}>`;
    }

    const statusProp = isDefaultStatus ? '' : ` status="${status}"`;
    return `<Atom${baseName} component-type="${type.id}" variable="${varId}"${sizeAttr}${iconAttr}${statusProp}>\n  ${varLabel}\n</Atom${baseName}>`;
  }
}

/**
 * HTTP client adapter communicating with `/api/studio/*` filesystem persistence endpoints.
 */
export class StudioPersistenceClient {
  static async loadRegistry(): Promise<{
    registry?: StudioRegistry;
    discoveredFiles?: string[];
  } | null> {
    try {
      const res = await fetch('/api/studio/registry', { cache: 'no-store' });
      if (!res.ok) return null;
      return (await res.json()) as {
        registry?: StudioRegistry;
        discoveredFiles?: string[];
      };
    } catch {
      return null;
    }
  }

  static async saveProject(payload: {
    registry: StudioRegistry;
    tokensJson: string;
    cssString: string;
  }): Promise<{
    success: boolean;
    registry?: StudioRegistry;
    filesWritten?: string[];
  }> {
    const res = await fetch('/api/studio/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return (await res.json()) as {
      success: boolean;
      registry?: StudioRegistry;
      filesWritten?: string[];
    };
  }
}
