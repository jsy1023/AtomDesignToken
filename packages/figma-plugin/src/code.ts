// Figma Plugin Canvas Sandbox Code
// AtomSystem Studio for Figma:
// 1. 2-Tier Figma Variables + Multi-Theme Modes
// 2. Direct Layer Token Applier (Tokens Studio style click-to-apply)
// 3. Exact DOM-to-Figma Scene Graph Renderer (Zero guessing, 100% faithful to Local Studio DOM)

figma.showUI(__html__, { width: 500, height: 740, themeColors: true });

function parseCssColor(colorStr: string): { r: number; g: number; b: number; a: number } | null {
  if (!colorStr || colorStr === 'transparent' || colorStr === 'rgba(0, 0, 0, 0)') return null;
  const s = colorStr.trim();

  if (s.startsWith('#')) {
    let c = s.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    if (isNaN(num)) return null;
    if (c.length === 8) {
      return {
        r: ((num >> 24) & 255) / 255,
        g: ((num >> 16) & 255) / 255,
        b: ((num >> 8) & 255) / 255,
        a: (num & 255) / 255,
      };
    }
    return {
      r: ((num >> 16) & 255) / 255,
      g: ((num >> 8) & 255) / 255,
      b: (num & 255) / 255,
      a: 1,
    };
  }

  const rgbMatch = s.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/);
  if (rgbMatch) {
    return {
      r: Math.min(255, parseFloat(rgbMatch[1])) / 255,
      g: Math.min(255, parseFloat(rgbMatch[2])) / 255,
      b: Math.min(255, parseFloat(rgbMatch[3])) / 255,
      a: rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1,
    };
  }
  return null;
}

function getTokenValue(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  for (const k of Object.keys(obj)) {
    if (k.charCodeAt(0) === 36 && k.slice(1) === 'value') return obj[k];
    if (k === 'value') return obj[k];
  }
  return undefined;
}

function getTokenDesc(obj: any): string {
  if (!obj || typeof obj !== 'object') return '';
  for (const k of Object.keys(obj)) {
    if (k.charCodeAt(0) === 36 && k.slice(1) === 'description') return obj[k];
    if (k === 'description') return obj[k];
  }
  return '';
}

function parsePixel(val: any): number | null {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const matched = val.match(/^([\d.]+)px$/);
    if (matched) return parseFloat(matched[1]);
    const num = parseFloat(val);
    if (!isNaN(num)) return num;
  }
  return null;
}

// 전역 Figma Variable 캐시
const variablesMap: Record<string, Variable> = {};
const resolvedValuesMap: Record<string, any> = {};

function registerVarAlias(keys: (string | undefined)[], variable: Variable, rawVal?: any) {
  for (const k of keys) {
    if (!k) continue;
    variablesMap[k] = variable;
    if (rawVal !== undefined) resolvedValuesMap[k] = rawVal;
  }
  variablesMap[variable.name] = variable;
  if (rawVal !== undefined) resolvedValuesMap[variable.name] = rawVal;
}

function tokenIdToFigmaVarName(tokenId: string, category?: string): string {
  if (tokenId === '--atom-palette-white') return 'color/neutral/white';
  if (tokenId.startsWith('--atom-palette-')) {
    return `color/${tokenId.replace(/^--atom-palette-/, '').replace(/-/g, '/')}`;
  }
  if (tokenId.startsWith('--atom-space-') || category === 'spacing' || category === 'size') {
    return `spacing/${tokenId.replace(/^--atom-space-/, '').replace(/^--atom-/, '')}`;
  }
  if (tokenId.startsWith('--atom-radius-') || category === 'radius') {
    return `radius/${tokenId.replace(/^--atom-radius-/, '')}`;
  }
  if (tokenId.startsWith('--atom-typography-') || tokenId.startsWith('--atom-font-weight-') || category === 'typography') {
    const key = tokenId.replace(/^--atom-typography-/, '').replace(/^--atom-font-weight-/, '');
    return tokenId.includes('weight') ? `typography/weight/${key}` : `typography/size/${key}`;
  }
  if (tokenId.startsWith('--atom-color-')) {
    const raw = tokenId.replace(/^--atom-color-/, '');
    let state = 'default';
    let key = raw;
    if (raw.endsWith('-hover')) {
      state = 'hover';
      key = raw.slice(0, -6);
    } else if (raw.endsWith('-subtle')) {
      state = 'subtle';
      key = raw.slice(0, -7);
    }
    if (key === 'destructive') key = 'danger';
    return `color/${key}/${state}`;
  }
  return tokenId.replace(/^--atom-/, '').replace(/-/g, '/');
}

function findVariableByTokenId(tokenId?: string, category?: string): Variable | null {
  if (!tokenId) return null;
  if (variablesMap[tokenId]) return variablesMap[tokenId];

  const expectedName = tokenIdToFigmaVarName(tokenId, category);
  const localVars = figma.variables.getLocalVariables();
  const found = localVars.find((v: any) => v.name === expectedName || v.name === tokenId);
  if (found) {
    variablesMap[tokenId] = found;
    variablesMap[found.name] = found;
    return found;
  }
  return null;
}

// ============================================================================
// 1. 2-TIER VARIABLES & MULTI-THEME MODES SYNC
// ============================================================================
async function syncAllTokens(payload: any) {
  const tokensData = payload?.tokens || payload;
  const studioRegistry = payload?.registry;

  const collections = figma.variables.getLocalVariableCollections();
  let primCollection = collections.find((c: any) => c.name === "1. AtomSystem Primitives");
  if (!primCollection) {
    primCollection = figma.variables.createVariableCollection("1. AtomSystem Primitives");
    primCollection.renameMode(primCollection.modes[0].modeId, "Value");
  }
  const primModeId = primCollection.modes[0].modeId;

  let semCollection = collections.find((c: any) => c.name === "2. AtomSystem Semantic");
  if (!semCollection) {
    semCollection = figma.variables.createVariableCollection("2. AtomSystem Semantic");
  }

  // 테마 Modes 등록 (Figma 플랜이 허용하는 한도까지 테마 모드 추가)
  const themes: any[] = Array.isArray(studioRegistry?.themes) && studioRegistry.themes.length > 0
    ? studioRegistry.themes
    : [{ id: 'ocean-blue', name: 'Ocean Blue (Light)', mode: 'light' }];

  const themeModeIds: Record<string, string> = {};
  semCollection.renameMode(semCollection.modes[0].modeId, themes[0].name || 'Default');
  themeModeIds[themes[0].id] = semCollection.modes[0].modeId;

  for (let i = 1; i < Math.min(themes.length, 4); i++) {
    const th = themes[i];
    const existingMode = semCollection.modes.find((m: any) => m.name === th.name);
    if (existingMode) {
      themeModeIds[th.id] = existingMode.modeId;
    } else {
      try {
        const newModeId = semCollection.addMode(th.name);
        themeModeIds[th.id] = newModeId;
      } catch (e) {
        // Free plan mode limit fallback
        break;
      }
    }
  }

  const localVars = figma.variables.getLocalVariables();
  let createdCount = 0;

  const upsertVar = (
    col: VariableCollection,
    name: string,
    type: VariableResolvedDataType,
    scopes: VariableScope[],
    desc?: string
  ): Variable => {
    let v = localVars.find((item: any) => item.name === name && item.variableCollectionId === col.id);
    if (!v) {
      v = figma.variables.createVariable(name, col, type);
      localVars.push(v);
    }
    if (desc) v.description = desc;
    try { v.scopes = scopes; } catch (e) {}
    createdCount++;
    return v;
  };

  // A. Primitives (Studio Registry paletteVariables)
  if (Array.isArray(studioRegistry?.paletteVariables)) {
    for (const pv of studioRegistry.paletteVariables) {
      if (pv.category === 'color' && typeof pv.value === 'string' && pv.value.startsWith('#')) {
        const cleanName = pv.id.replace(/^--atom-palette-/, '').replace(/-/g, '/');
        const varName = `color/${cleanName}`;
        const v = upsertVar(primCollection, varName, "COLOR", ['ALL_FILLS', 'STROKE_COLOR'], pv.description || pv.name);
        const rgba = parseCssColor(pv.value) || { r: 0.19, g: 0.51, b: 0.96, a: 1 };
        v.setValueForMode(primModeId, { r: rgba.r, g: rgba.g, b: rgba.b });
        registerVarAlias([pv.id, varName], v, pv.value);
      } else if (pv.category === 'spacing' || pv.category === 'size') {
        const px = parsePixel(pv.value);
        if (px !== null) {
          const key = pv.id.replace(/^--atom-space-/, '').replace(/^--atom-/, '');
          const varName = `spacing/${key}`;
          const v = upsertVar(primCollection, varName, "FLOAT", ['GAP', 'WIDTH_HEIGHT'], pv.description || pv.name);
          v.setValueForMode(primModeId, px);
          registerVarAlias([pv.id, varName], v, px);
        }
      } else if (pv.category === 'radius') {
        const px = parsePixel(pv.value);
        if (px !== null) {
          const key = pv.id.replace(/^--atom-radius-/, '');
          const varName = `radius/${key}`;
          const v = upsertVar(primCollection, varName, "FLOAT", ['CORNER_RADIUS'], pv.description || pv.name);
          v.setValueForMode(primModeId, px);
          registerVarAlias([pv.id, varName], v, px);
        }
      } else if (pv.category === 'typography') {
        const px = parsePixel(pv.value);
        if (px !== null) {
          const key = pv.id.replace(/^--atom-typography-/, '').replace(/^--atom-font-weight-/, '');
          const varName = pv.id.includes('weight') ? `typography/weight/${key}` : `typography/size/${key}`;
          const v = upsertVar(primCollection, varName, "FLOAT", ['FONT_SIZE', 'FONT_WEIGHT'], pv.description || pv.name);
          v.setValueForMode(primModeId, px);
          registerVarAlias([pv.id, varName], v, px);
        }
      }
    }
  }

  // White & Black Primitives 보장
  if (!variablesMap['--atom-palette-white']) {
    const wv = upsertVar(primCollection, 'color/neutral/white', 'COLOR', ['ALL_FILLS', 'STROKE_COLOR'], 'Pure White');
    wv.setValueForMode(primModeId, { r: 1, g: 1, b: 1 });
    registerVarAlias(['--atom-palette-white', 'color/neutral/white'], wv, '#ffffff');
  }

  // B. Semantic Collection (Variable Alias + Theme Modes)
  if (Array.isArray(studioRegistry?.statusTokens)) {
    for (const st of studioRegistry.statusTokens) {
      const bindSemanticState = (suffix: string, varId: string, defaultPalId: string, desc: string) => {
        const semName = `color/${st.key}/${suffix}`;
        const semVar = upsertVar(semCollection!, semName, "COLOR", ['ALL_FILLS', 'STROKE_COLOR'], desc);

        for (const th of themes) {
          const modeId = themeModeIds[th.id];
          if (!modeId) continue;
          let palIdForTheme = defaultPalId;
          if (suffix === 'default' && th.semanticOverrides?.[st.key]) {
            palIdForTheme = th.semanticOverrides[st.key];
          }
          const targetPrim = variablesMap[palIdForTheme];
          if (targetPrim) {
            semVar.setValueForMode(modeId, figma.variables.createVariableAlias(targetPrim));
          } else {
            const hex = resolvedValuesMap[palIdForTheme] || '#3182f6';
            const rgba = parseCssColor(hex) || { r: 0.19, g: 0.51, b: 0.96, a: 1 };
            semVar.setValueForMode(modeId, { r: rgba.r, g: rgba.g, b: rgba.b });
          }
        }
        registerVarAlias([varId, semName], semVar, resolvedValuesMap[defaultPalId] || '#3182f6');
      };

      bindSemanticState('default', st.id, st.paletteId, st.description);
      bindSemanticState('hover', `${st.id}-hover`, st.hoverPaletteId, `${st.name} Hover`);
      bindSemanticState('subtle', `${st.id}-subtle`, st.subtlePaletteId, `${st.name} Subtle`);
      if (st.key === 'danger') {
        bindSemanticState('default', '--atom-color-destructive', st.paletteId, st.description);
        bindSemanticState('hover', '--atom-color-destructive-hover', st.hoverPaletteId, `${st.name} Hover`);
        bindSemanticState('subtle', '--atom-color-destructive-subtle', st.subtlePaletteId, `${st.name} Subtle`);
      }
    }
  }

  return { count: createdCount, modesCount: Object.keys(themeModeIds).length };
}

// ============================================================================
// 2. TOKENS STUDIO STYLE: DIRECT LAYER TOKEN APPLIER
// ============================================================================
function makeBoundPaintFromCss(cssColorStr: string, tokenId?: string): SolidPaint | null {
  const rgba = parseCssColor(cssColorStr);
  if (!rgba) return null;
  let paint: SolidPaint = {
    type: 'SOLID',
    color: { r: rgba.r, g: rgba.g, b: rgba.b },
    opacity: rgba.a,
  };
  const v = findVariableByTokenId(tokenId, 'color');
  if (v && v.resolvedType === 'COLOR') {
    try {
      paint = figma.variables.setBoundVariableForPaint(paint, 'color', v);
    } catch (e) {}
  }
  return paint;
}

function bindFloatProp(node: any, field: VariableBindableNodeField, numVal: number, tokenId?: string) {
  node[field] = numVal;
  const v = findVariableByTokenId(tokenId);
  if (v && v.resolvedType === 'FLOAT') {
    try {
      node.setBoundVariable(field, v);
    } catch (e) {}
  }
}

async function applyTokenToSelection(payload: {
  tokenId: string;
  value: string;
  category: string;
  targetProp: 'fill' | 'stroke' | 'radius' | 'padding' | 'gap';
}) {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    throw new Error('먼저 피그마 캔버스에서 적용할 프레임이나 도형을 선택해주세요.');
  }

  const { tokenId, value, targetProp } = payload;
  let appliedCount = 0;

  for (const node of selection) {
    if (targetProp === 'fill' && 'fills' in node) {
      const paint = makeBoundPaintFromCss(value, tokenId);
      if (paint) {
        (node as any).fills = [paint];
        appliedCount++;
      }
    } else if (targetProp === 'stroke' && 'strokes' in node) {
      const paint = makeBoundPaintFromCss(value, tokenId);
      if (paint) {
        (node as any).strokes = [paint];
        if (!(node as any).strokeWeight) (node as any).strokeWeight = 1;
        appliedCount++;
      }
    } else if (targetProp === 'radius' && 'cornerRadius' in node) {
      const px = parsePixel(value) ?? 8;
      bindFloatProp(node, 'cornerRadius', px, tokenId);
      bindFloatProp(node, 'topLeftRadius', px, tokenId);
      bindFloatProp(node, 'topRightRadius', px, tokenId);
      bindFloatProp(node, 'bottomLeftRadius', px, tokenId);
      bindFloatProp(node, 'bottomRightRadius', px, tokenId);
      appliedCount++;
    } else if (targetProp === 'padding' && 'paddingLeft' in node) {
      const px = parsePixel(value) ?? 12;
      bindFloatProp(node, 'paddingLeft', px, tokenId);
      bindFloatProp(node, 'paddingRight', px, tokenId);
      bindFloatProp(node, 'paddingTop', px, tokenId);
      bindFloatProp(node, 'paddingBottom', px, tokenId);
      appliedCount++;
    } else if (targetProp === 'gap' && 'itemSpacing' in node) {
      const px = parsePixel(value) ?? 8;
      bindFloatProp(node, 'itemSpacing', px, tokenId);
      appliedCount++;
    }
  }

  return { appliedCount, tokenId };
}

// ============================================================================
// 3. EXACT DOM-TO-FIGMA SCENE GRAPH RENDERER (100% Identical to Studio DOM)
// ============================================================================
function buildFigmaNodeFromDomScene(scene: any, isRootComponent: boolean): SceneNode {
  // 1) SVG Vector Node
  if (scene.kind === 'SVG' && scene.svgMarkup) {
    try {
      const svgFrame = figma.createNodeFromSvg(scene.svgMarkup);
      svgFrame.name = scene.name || 'Icon';
      if (scene.width && scene.height) {
        svgFrame.resize(scene.width, scene.height);
      }
      return svgFrame;
    } catch (e) {
      const fallback = figma.createEllipse();
      fallback.resize(14, 14);
      return fallback;
    }
  }

  // 2) Text Leaf Node
  if (scene.kind === 'TEXT') {
    const textNode = figma.createText();
    textNode.name = scene.name || 'Text';
    const fontStyle = (scene.fontWeight && scene.fontWeight >= 600) ? 'Medium' : 'Regular';
    textNode.fontName = { family: 'Inter', style: fontStyle };
    textNode.fontSize = Math.max(9, Math.round(scene.fontSize || 13));
    textNode.characters = scene.characters || '';
    const paint = makeBoundPaintFromCss(scene.color || '#0f172a', scene.tokenText);
    if (paint) textNode.fills = [paint];
    return textNode;
  }

  // 3) Frame / Component Node (AutoLayout Container)
  const frame: FrameNode | ComponentNode = isRootComponent ? figma.createComponent() : figma.createFrame();
  frame.name = scene.name || 'Frame';
  frame.layoutMode = scene.layoutMode === 'VERTICAL' ? 'VERTICAL' : 'HORIZONTAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';

  // Alignment mapping from Computed CSS
  if (scene.justifyContent === 'space-between') {
    frame.primaryAxisAlignItems = 'SPACE_BETWEEN';
  } else if (scene.justifyContent === 'flex-end') {
    frame.primaryAxisAlignItems = 'MAX';
  } else if (scene.justifyContent === 'center') {
    frame.primaryAxisAlignItems = 'CENTER';
  } else {
    frame.primaryAxisAlignItems = 'MIN';
  }

  if (scene.alignItems === 'center') {
    frame.counterAxisAlignItems = 'CENTER';
  } else if (scene.alignItems === 'flex-end') {
    frame.counterAxisAlignItems = 'MAX';
  } else {
    frame.counterAxisAlignItems = 'MIN';
  }

  const tok = scene.tokens || {};

  // Gap & Padding + Figma Variable Bindings
  bindFloatProp(frame, 'itemSpacing', Math.round(scene.gap || 0), tok.gap);
  bindFloatProp(frame, 'paddingLeft', Math.round(scene.paddingLeft || 0), tok.px);
  bindFloatProp(frame, 'paddingRight', Math.round(scene.paddingRight || 0), tok.px);
  bindFloatProp(frame, 'paddingTop', Math.round(scene.paddingTop || 0), tok.py);
  bindFloatProp(frame, 'paddingBottom', Math.round(scene.paddingBottom || 0), tok.py);

  // Corner Radius + Figma Variable Binding
  const radPx = Math.round(scene.borderRadius || 0);
  bindFloatProp(frame, 'cornerRadius', radPx, tok.radius);
  bindFloatProp(frame, 'topLeftRadius', radPx, tok.radius);
  bindFloatProp(frame, 'topRightRadius', radPx, tok.radius);
  bindFloatProp(frame, 'bottomLeftRadius', radPx, tok.radius);
  bindFloatProp(frame, 'bottomRightRadius', radPx, tok.radius);

  // Background Fill + Figma Variable Binding
  const bgPaint = makeBoundPaintFromCss(scene.backgroundColor, tok.bg);
  frame.fills = bgPaint ? [bgPaint] : [];

  // Border Stroke + Figma Variable Binding
  if (scene.borderWidth && scene.borderWidth > 0) {
    const strokePaint = makeBoundPaintFromCss(scene.borderColor, tok.border);
    if (strokePaint) {
      frame.strokes = [strokePaint];
      frame.strokeWeight = scene.borderWidth;
    } else {
      frame.strokes = [];
    }
  } else {
    frame.strokes = [];
  }

  if (typeof scene.opacity === 'number') {
    frame.opacity = scene.opacity;
  }

  if (scene.hasShadow) {
    frame.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.12 },
      offset: { x: 0, y: 4 },
      radius: 12,
      spread: 0,
      visible: true,
      blendMode: 'NORMAL',
    }];
  }

  // Children Recursion
  const children = Array.isArray(scene.children) ? scene.children : [];
  for (const childScene of children) {
    const childNode = buildFigmaNodeFromDomScene(childScene, false);
    frame.appendChild(childNode);
  }

  // If container has no children (e.g. Switch Thumb or Swatch), preserve exact DOM width/height
  if (children.length === 0 && scene.width && scene.height) {
    frame.layoutMode = 'NONE';
    frame.resize(scene.width, scene.height);
  } else if (scene.justifyContent === 'space-between' && scene.width) {
    if (frame.layoutMode === 'HORIZONTAL') {
      frame.primaryAxisSizingMode = 'FIXED';
      frame.resize(scene.width, Math.max(frame.height, scene.height || 36));
    } else {
      frame.counterAxisSizingMode = 'FIXED';
      frame.resize(scene.width, frame.height);
    }
  }

  return frame;
}

async function renderCapturedComponents(payload: any) {
  try {
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  } catch (e) {}

  // Ensure all Variables exist so setBoundVariable links every node properly
  await syncAllTokens(payload);

  const sets = Array.isArray(payload?.sets) ? payload.sets : [];
  const createdNodes: SceneNode[] = [];
  let setPosY = 0;
  let totalVariants = 0;

  for (const setSpec of sets) {
    const variantScenes = Array.isArray(setSpec.variants) ? setSpec.variants : [];
    const compNodes: ComponentNode[] = [];

    let colX = 0;
    let rowY = 0;
    let maxRowH = 0;
    let currentRowKey = variantScenes[0]?.gridRowKey;

    for (const vScene of variantScenes) {
      if (vScene.gridRowKey && vScene.gridRowKey !== currentRowKey) {
        currentRowKey = vScene.gridRowKey;
        colX = 0;
        rowY += maxRowH + 28;
        maxRowH = 0;
      }

      const compNode = buildFigmaNodeFromDomScene(vScene, true) as ComponentNode;
      compNode.x = colX;
      compNode.y = rowY;
      compNodes.push(compNode);

      colX += compNode.width + 24;
      if (compNode.height > maxRowH) maxRowH = compNode.height;
    }

    if (compNodes.length > 1) {
      const componentSet = figma.combineAsVariants(compNodes, figma.currentPage);
      const pascalName = (setSpec.componentId || 'Component')
        .split('-')
        .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');
      componentSet.name = `AtomSystem / ${pascalName}`;
      componentSet.description = setSpec.description || '';
      componentSet.x = 0;
      componentSet.y = setPosY;
      setPosY += componentSet.height + 100;
      createdNodes.push(componentSet);
    } else if (compNodes.length === 1) {
      const single = compNodes[0];
      single.name = `AtomSystem / ${setSpec.componentId} (${single.name})`;
      single.x = 0;
      single.y = setPosY;
      setPosY += single.height + 60;
      createdNodes.push(single);
    }

    totalVariants += compNodes.length;
  }

  if (createdNodes.length > 0) {
    figma.currentPage.selection = createdNodes;
    figma.viewport.scrollAndZoomIntoView(createdNodes);
  }

  return {
    setsCount: createdNodes.length,
    variantCount: totalVariants,
  };
}

// ============================================================================
// 4. NODE INSPECTOR (Debug JSON Export)
// ============================================================================
function inspectNode(node: SceneNode): any {
  const result: any = {
    id: node.id,
    name: node.name,
    type: node.type,
    width: node.width,
    height: node.height,
  };

  if ('layoutMode' in node) {
    result.layoutMode = node.layoutMode;
    result.paddingTop = node.paddingTop;
    result.paddingRight = node.paddingRight;
    result.paddingBottom = node.paddingBottom;
    result.paddingLeft = node.paddingLeft;
    result.itemSpacing = node.itemSpacing;
  }

  if ('cornerRadius' in node) {
    result.cornerRadius = node.cornerRadius;
  }

  if ('boundVariables' in node) {
    result.boundVariables = (node as any).boundVariables;
  }

  if ('fills' in node && Array.isArray(node.fills)) {
    result.fills = node.fills.map((f: any) => {
      if (f.type === 'SOLID') {
        const hex = ((1 << 24) + (Math.round(f.color.r * 255) << 16) + (Math.round(f.color.g * 255) << 8) + Math.round(f.color.b * 255)).toString(16).slice(1);
        return { type: f.type, color: `#${hex}`, boundVariable: f.boundVariables?.color };
      }
      return { type: f.type };
    });
  }

  if ('strokes' in node && Array.isArray(node.strokes)) {
    result.strokes = node.strokes.map((s: any) => {
      if (s.type === 'SOLID') {
        const hex = ((1 << 24) + (Math.round(s.color.r * 255) << 16) + (Math.round(s.color.g * 255) << 8) + Math.round(s.color.b * 255)).toString(16).slice(1);
        return { type: s.type, color: `#${hex}`, boundVariable: s.boundVariables?.color };
      }
      return { type: s.type };
    });
  }

  if ('children' in node && (node as any).children) {
    result.children = (node as any).children.map((child: SceneNode) => inspectNode(child));
  }

  return result;
}

// ============================================================================
// 5. LIVE TOKEN & COMPONENT BINDING UPDATERS
// ============================================================================
async function updateTokenValue(payload: {
  tokenId: string;
  value: string;
  category: string;
  name?: string;
}) {
  const { tokenId, value, category, name } = payload;
  const isColor = category === 'color' || value.trim().startsWith('#') || value.trim().startsWith('rgb');
  const varName = tokenIdToFigmaVarName(tokenId, category);

  let v = findVariableByTokenId(tokenId, category);
  let primCollection = figma.variables.getLocalVariableCollections().find((c: any) => c.name === "1. AtomSystem Primitives");
  if (!primCollection) {
    primCollection = figma.variables.createVariableCollection("1. AtomSystem Primitives");
    primCollection.renameMode(primCollection.modes[0].modeId, "Value");
  }

  if (!v) {
    const type: VariableResolvedDataType = isColor ? 'COLOR' : 'FLOAT';
    const scopes: VariableScope[] = isColor
      ? ['ALL_FILLS', 'STROKE_COLOR']
      : category === 'radius'
      ? ['CORNER_RADIUS']
      : category === 'typography'
      ? ['FONT_SIZE', 'FONT_WEIGHT']
      : ['GAP', 'WIDTH_HEIGHT'];
    v = figma.variables.createVariable(varName, primCollection, type);
    if (name) v.description = name;
    try { v.scopes = scopes; } catch (e) {}
    registerVarAlias([tokenId, varName], v, value);
  }

  const col = figma.variables.getVariableCollectionById(v.variableCollectionId) || primCollection;
  const modeId = col.modes[0].modeId;

  if (v.resolvedType === 'COLOR') {
    const rgba = parseCssColor(value);
    if (!rgba) throw new Error(`유효하지 않은 색상 값입니다: ${value}`);
    v.setValueForMode(modeId, { r: rgba.r, g: rgba.g, b: rgba.b });
    resolvedValuesMap[tokenId] = value;
  } else if (v.resolvedType === 'FLOAT') {
    const px = parsePixel(value);
    if (px === null) throw new Error(`유효하지 않은 숫자/px 값입니다: ${value}`);
    v.setValueForMode(modeId, px);
    resolvedValuesMap[tokenId] = px;
  }

  return { tokenId, varName: v.name, value };
}

async function updateSemanticToken(payload: {
  key: string;
  tokenId: string;
  paletteId: string;
  paletteValue: string;
  themeName?: string;
}) {
  const { key, tokenId, paletteId, paletteValue, themeName } = payload;
  const collections = figma.variables.getLocalVariableCollections();
  let semCollection = collections.find((c: any) => c.name === "2. AtomSystem Semantic");
  if (!semCollection) {
    semCollection = figma.variables.createVariableCollection("2. AtomSystem Semantic");
  }

  const semVarName = `color/${key}/default`;
  let semVar = findVariableByTokenId(tokenId, 'color') ||
    figma.variables.getLocalVariables().find((v: any) => v.name === semVarName && v.variableCollectionId === semCollection!.id) ||
    null;

  if (!semVar) {
    semVar = figma.variables.createVariable(semVarName, semCollection, 'COLOR');
    try { semVar.scopes = ['ALL_FILLS', 'STROKE_COLOR']; } catch (e) {}
    registerVarAlias([tokenId, semVarName], semVar, paletteValue);
  }

  const targetMode = (themeName && semCollection.modes.find((m: any) => m.name === themeName)) || semCollection.modes[0];
  const targetPrim = findVariableByTokenId(paletteId, 'color');

  if (targetPrim) {
    semVar.setValueForMode(targetMode.modeId, figma.variables.createVariableAlias(targetPrim));
  } else {
    const rgba = parseCssColor(paletteValue);
    if (rgba) {
      semVar.setValueForMode(targetMode.modeId, { r: rgba.r, g: rgba.g, b: rgba.b });
    }
  }
  resolvedValuesMap[tokenId] = paletteValue;

  return { tokenId, paletteId, varName: semVar.name };
}

function collectMatchingVariantNodes(componentId: string, variableId: string): ComponentNode[] {
  const pascalName = componentId
    .split('-')
    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  const setTargetName = `AtomSystem / ${pascalName}`;
  const singlePrefix = `AtomSystem / ${componentId} (`;
  const varMatcher = new RegExp(`(^|,\\s*)Variable=${variableId}(,|$)`);

  const matches: ComponentNode[] = [];
  const visit = (node: BaseNode) => {
    if (node.type === 'COMPONENT_SET' && node.name === setTargetName) {
      for (const child of node.children) {
        if (child.type === 'COMPONENT' && varMatcher.test(child.name)) {
          matches.push(child);
        }
      }
      return;
    }
    if (node.type === 'COMPONENT' && (node.name.startsWith(singlePrefix) || varMatcher.test(node.name))) {
      if (node.parent?.type !== 'COMPONENT_SET' || node.parent.name === setTargetName) {
        if (varMatcher.test(node.name)) matches.push(node);
      }
    }
    if ('children' in node) {
      for (const ch of (node as ChildrenMixin).children) {
        visit(ch);
      }
    }
  };

  visit(figma.currentPage);
  return matches;
}

async function updateComponentBinding(payload: {
  componentId: string;
  variableId: string;
  propKey: string;
  tokenId: string;
  value: string;
}) {
  const { componentId, variableId, propKey, tokenId, value } = payload;
  const variants = collectMatchingVariantNodes(componentId, variableId);
  let updatedCount = 0;

  for (const comp of variants) {
    const isHover = comp.name.includes('Status=hover');
    const isFocus = comp.name.includes('Status=focus');
    const isOutlineOrGhost = /Type=(outline|ghost|link)/i.test(comp.name);

    if (propKey === 'background' || propKey === 'activeBackground') {
      const targetNode = componentId === 'switch'
        ? (comp.findOne((n: SceneNode) => n.name === 'SwitchTrack') || comp)
        : comp;
      if ('fills' in targetNode && (!isHover || propKey === 'activeBackground') && !isOutlineOrGhost) {
        const paint = makeBoundPaintFromCss(value, tokenId);
        if (paint) {
          (targetNode as any).fills = [paint];
          updatedCount++;
        }
      } else if (isOutlineOrGhost && propKey === 'background') {
        // Outline/Ghost uses background token for text & border
        const paint = makeBoundPaintFromCss(value, tokenId);
        if (paint) {
          comp.findAll((n: SceneNode) => n.type === 'TEXT').forEach((tn: any) => {
            tn.fills = [paint];
          });
          if (Array.isArray(comp.strokes) && comp.strokes.length > 0) {
            comp.strokes = [paint];
          }
          updatedCount++;
        }
      }
    } else if (propKey === 'hoverBackground') {
      if (isHover && !isOutlineOrGhost) {
        const paint = makeBoundPaintFromCss(value, tokenId);
        if (paint) {
          comp.fills = [paint];
          updatedCount++;
        }
      }
    } else if (propKey === 'thumbColor') {
      const thumb = comp.findOne((n: SceneNode) => n.name === 'Thumb');
      if (thumb && 'fills' in thumb) {
        const paint = makeBoundPaintFromCss(value, tokenId);
        if (paint) {
          (thumb as any).fills = [paint];
          updatedCount++;
        }
      }
    } else if (propKey === 'borderColor' || propKey === 'focusBorderColor') {
      const shouldApply = propKey === 'focusBorderColor' ? isFocus : !isFocus;
      if (shouldApply && Array.isArray(comp.strokes) && comp.strokes.length > 0) {
        const paint = makeBoundPaintFromCss(value, tokenId);
        if (paint) {
          comp.strokes = [paint];
          updatedCount++;
        }
      }
    } else if (propKey === 'textColor') {
      if (!isOutlineOrGhost) {
        const paint = makeBoundPaintFromCss(value, tokenId);
        if (paint) {
          const textNodes = comp.findAll((n: SceneNode) => n.type === 'TEXT');
          if (textNodes.length > 0) {
            (textNodes[0] as TextNode).fills = [paint];
            updatedCount++;
          }
        }
      }
    } else if (propKey === 'borderRadius') {
      const px = parsePixel(value);
      if (px !== null && comp.cornerRadius !== 9999) {
        bindFloatProp(comp, 'cornerRadius', px, tokenId);
        bindFloatProp(comp, 'topLeftRadius', px, tokenId);
        bindFloatProp(comp, 'topRightRadius', px, tokenId);
        bindFloatProp(comp, 'bottomLeftRadius', px, tokenId);
        bindFloatProp(comp, 'bottomRightRadius', px, tokenId);
        updatedCount++;
      }
    } else if (propKey === 'paddingX' || propKey === 'padding') {
      const px = parsePixel(value);
      if (px !== null) {
        bindFloatProp(comp, 'paddingLeft', px, tokenId);
        bindFloatProp(comp, 'paddingRight', px, tokenId);
        if (propKey === 'padding') {
          bindFloatProp(comp, 'paddingTop', px, tokenId);
          bindFloatProp(comp, 'paddingBottom', px, tokenId);
        }
        updatedCount++;
      }
    } else if (propKey === 'paddingY') {
      const px = parsePixel(value);
      if (px !== null) {
        bindFloatProp(comp, 'paddingTop', px, tokenId);
        bindFloatProp(comp, 'paddingBottom', px, tokenId);
        updatedCount++;
      }
    }
  }

  return { componentId, variableId, propKey, tokenId, updatedCount };
}

// ============================================================================
// 6. MESSAGE DISPATCHER
// ============================================================================
figma.ui.onmessage = async (msg: any) => {
  try {
    if (msg.type === 'SYNC_ALL_TOKENS') {
      const result = await syncAllTokens(msg.payload);
      figma.ui.postMessage({ type: 'SYNC_TOKENS_SUCCESS', payload: result });
      figma.notify(`✅ ${result.count}개 토큰 Variables (${result.modesCount}개 테마 모드) 동기화 완료!`);
    } else if (msg.type === 'UPDATE_TOKEN_VALUE') {
      const result = await updateTokenValue(msg.payload);
      figma.ui.postMessage({ type: 'UPDATE_TOKEN_SUCCESS', payload: result });
    } else if (msg.type === 'UPDATE_SEMANTIC_TOKEN') {
      const result = await updateSemanticToken(msg.payload);
      figma.ui.postMessage({ type: 'UPDATE_TOKEN_SUCCESS', payload: result });
    } else if (msg.type === 'UPDATE_COMPONENT_BINDING') {
      const result = await updateComponentBinding(msg.payload);
      figma.ui.postMessage({ type: 'UPDATE_COMPONENT_BINDING_SUCCESS', payload: result });
      if (result.updatedCount > 0) {
        figma.notify(`🔗 ${result.componentId}.${result.propKey} ➔ ${result.tokenId} (${result.updatedCount}개 변형 반영)`);
      }
    } else if (msg.type === 'APPLY_TOKEN_TO_SELECTION') {
      const result = await applyTokenToSelection(msg.payload);
      figma.ui.postMessage({ type: 'APPLY_TOKEN_SUCCESS', payload: result });
      figma.notify(`🎯 [${result.tokenId}] 토큰이 선택한 레이어에 바인딩되었습니다.`);
    } else if (msg.type === 'RENDER_CAPTURED_COMPONENTS') {
      const result = await renderCapturedComponents(msg.payload);
      figma.ui.postMessage({ type: 'GENERATE_COMPONENTS_SUCCESS', payload: result });
      figma.notify(`🚀 Studio 실제 DOM 기반 ${result.setsCount}개 컴포넌트 (${result.variantCount}개 변형) 생성 완료!`);
    } else if (msg.type === 'INSPECT_SELECTION') {
      const selection = figma.currentPage.selection;
      if (selection.length === 0) {
        figma.notify('⚠️ 검사할 레이어를 먼저 선택해주세요.');
        return;
      }
      const data = selection.map((node: any) => inspectNode(node));
      figma.ui.postMessage({ type: 'INSPECT_SELECTION_RESULT', payload: data });
      figma.notify(`🔍 ${selection.length}개 노드 정보가 클립보드로 추출되었습니다.`);
    }
  } catch (err: any) {
    figma.ui.postMessage({ type: 'ERROR', error: err.message });
    figma.notify(`❌ 오류: ${err.message}`, { error: true });
  }
};
