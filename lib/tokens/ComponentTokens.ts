import {
  getComponentTypes,
  resolveTypeSpec,
  resolveVariableRole,
  SEMANTIC_VARIABLE_DICTIONARY,
  StudioComponentDefinition,
  ComponentVariable,
} from '../data/studioData';
import type { PaletteTokenLayer } from './PaletteTokens';
import type { ThemeTokenLayer } from './ThemeTokens';
import type { TokenReferenceResolver } from './TokenReferenceResolver';
import type {
  ComponentBindingNode,
  ComponentTokenNode,
  ComponentVariableTokenNode,
  ResolvedBindingDetail,
} from './types';

const DEFAULT_STATUS_BEHAVIORS: Record<string, { behavior: string }> = {
  default: { behavior: '표준 background 및 border 토큰 적용' },
  hover: { behavior: 'hoverBackground 토큰 적용, cursor: pointer' },
  active: { behavior: 'scale-[0.97] 압축 애니메이션 및 진한 색상 피드백' },
  focus: { behavior: 'outline 2px solid primary, outline-offset 2px' },
  disabled: { behavior: 'opacity 40%, cursor: not-allowed' },
  loading: { behavior: '스피너 인디케이터 회전, pointer-events: none' },
};

/**
 * Layer 3 (Components): Manages 3-tier [Type · Variable · Status] component token specifications
 * and resolves every property binding through Theme -> Palette object references.
 */
export class ComponentTokenLayer {
  constructor(
    public readonly raw: Record<string, ComponentTokenNode>,
    public readonly palette: PaletteTokenLayer,
    public readonly theme: ThemeTokenLayer,
    private readonly resolver: TokenReferenceResolver
  ) {}

  ids(): string[] {
    return Object.keys(this.raw);
  }

  get(componentId: string): ComponentTokenNode | undefined {
    return this.raw[componentId];
  }

  resolveBinding(
    componentId: string,
    variableId: string,
    propKey: string
  ): ResolvedBindingDetail | undefined {
    const binding = this.raw[componentId]?.variables?.[variableId]?.tokens?.[propKey];
    if (!binding) return undefined;

    const targetVariable =
      binding.targetVariable ||
      this.resolver.getVariableByPath(binding.$value) ||
      '';
    const resolvedValue =
      this.resolver.resolveValue(binding.$value) || binding.resolvedValue || '';
    const chain = this.resolver.resolveChain(binding.$value);

    return {
      alias: binding.$value,
      targetVariable,
      resolvedValue,
      chain,
    };
  }

  toStudioComponents(): StudioComponentDefinition[] {
    const result: StudioComponentDefinition[] = [];

    for (const [compId, node] of Object.entries(this.raw || {})) {
      const variables: ComponentVariable[] = Object.entries(node.variables || {}).map(
        ([varId, vNode]) => {
          const tokenBindings: Record<string, string> = {};
          for (const [propKey, binding] of Object.entries(vNode.tokens || {})) {
            tokenBindings[propKey] =
              binding.targetVariable ||
              this.resolver.getVariableByPath(binding.$value) ||
              this.resolver.resolveValue(binding.$value);
          }

          const role = (vNode.variableRole || vNode.variable?.role) as
            | ComponentVariable['variableRole']
            | undefined;

          return {
            id: varId,
            name: vNode.name || varId,
            ...(vNode.$description ? { description: vNode.$description } : {}),
            ...(role ? { variableRole: role } : {}),
            ...(vNode.supportedStatuses ? { supportedStatuses: vNode.supportedStatuses } : {}),
            tokenBindings,
          };
        }
      );

      result.push({
        id: compId,
        name: node.name || compId,
        category: node.category || 'Form',
        description: node.$description || '',
        ...(node.types ? { types: node.types } : {}),
        ...(node.typeGuide ? { typeGuide: node.typeGuide } : {}),
        ...(node.supportedStatuses ? { supportedStatuses: node.supportedStatuses } : {}),
        properties: node.properties || [],
        variables,
        ...(node.sourceFile ? { sourceFile: node.sourceFile } : {}),
        ...(node.autoDiscovered !== undefined ? { autoDiscovered: node.autoDiscovered } : {}),
        ...(node.customCss ? { customCss: node.customCss } : {}),
        ...(node.docs ? { docs: node.docs } : {}),
      });
    }

    return result;
  }

  static fromStudioComponents(
    components: StudioComponentDefinition[],
    resolver: TokenReferenceResolver
  ): Record<string, ComponentTokenNode> {
    const map: Record<string, ComponentTokenNode> = {};

    for (const comp of components) {
      const resolvedTypes = getComponentTypes(comp.id, comp.types);
      const variables: Record<string, ComponentVariableTokenNode> = {};

      for (const v of comp.variables || []) {
        const tokens: Record<string, ComponentBindingNode> = {};
        for (const [propKey, paletteOrStatusId] of Object.entries(v.tokenBindings || {})) {
          const alias = resolver.toAliasByVariable(paletteOrStatusId);
          tokens[propKey] = {
            $value: alias,
            targetVariable: paletteOrStatusId,
          };
        }

        const typeSpec = resolveTypeSpec(comp.id, v.id, v.name);
        const role = v.variableRole || resolveVariableRole(v.id);

        variables[v.id] = {
          name: v.name,
          $description: v.description || '',
          ...(v.variableRole ? { variableRole: v.variableRole } : {}),
          type: {
            id: typeSpec.id,
            name: typeSpec.name,
            whenToUse: typeSpec.whenToUse,
          },
          variable: {
            role,
            label: SEMANTIC_VARIABLE_DICTIONARY[role]?.label || role,
            meaning: SEMANTIC_VARIABLE_DICTIONARY[role]?.meaning || '',
          },
          statuses: { ...DEFAULT_STATUS_BEHAVIORS },
          ...(v.supportedStatuses ? { supportedStatuses: v.supportedStatuses } : {}),
          tokens,
        };
      }

      map[comp.id] = {
        name: comp.name,
        category: comp.category,
        $description: comp.description,
        ...(comp.sourceFile ? { sourceFile: comp.sourceFile } : {}),
        ...(comp.autoDiscovered !== undefined ? { autoDiscovered: comp.autoDiscovered } : {}),
        ...(comp.customCss ? { customCss: comp.customCss } : {}),
        ...(comp.typeGuide ? { typeGuide: comp.typeGuide } : {}),
        ...(comp.docs ? { docs: comp.docs } : {}),
        ...(comp.supportedStatuses ? { supportedStatuses: comp.supportedStatuses } : {}),
        properties: comp.properties,
        types: resolvedTypes.map((tp) => ({
          id: tp.id,
          name: tp.name,
          ...(tp.description ? { description: tp.description } : {}),
          whenToUse: tp.whenToUse,
          ...(tp.whenToUseEn ? { whenToUseEn: tp.whenToUseEn } : {}),
          ...(tp.antiPattern ? { antiPattern: tp.antiPattern } : {}),
          ...(tp.visualTraits ? { visualTraits: tp.visualTraits } : {}),
        })),
        variables,
      };
    }

    return map;
  }
}
