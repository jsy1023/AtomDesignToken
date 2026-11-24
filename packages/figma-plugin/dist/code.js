"use strict";
(() => {
  // src/code.ts
  figma.showUI(__html__, { width: 500, height: 740, themeColors: true });
  function parseCssColor(colorStr) {
    if (!colorStr || colorStr === "transparent" || colorStr === "rgba(0, 0, 0, 0)") return null;
    const s = colorStr.trim();
    if (s.startsWith("#")) {
      let c = s.replace("#", "");
      if (c.length === 3) c = c.split("").map((x) => x + x).join("");
      const num = parseInt(c, 16);
      if (isNaN(num)) return null;
      if (c.length === 8) {
        return {
          r: (num >> 24 & 255) / 255,
          g: (num >> 16 & 255) / 255,
          b: (num >> 8 & 255) / 255,
          a: (num & 255) / 255
        };
      }
      return {
        r: (num >> 16 & 255) / 255,
        g: (num >> 8 & 255) / 255,
        b: (num & 255) / 255,
        a: 1
      };
    }
    const rgbMatch = s.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/);
    if (rgbMatch) {
      return {
        r: Math.min(255, parseFloat(rgbMatch[1])) / 255,
        g: Math.min(255, parseFloat(rgbMatch[2])) / 255,
        b: Math.min(255, parseFloat(rgbMatch[3])) / 255,
        a: rgbMatch[4] !== void 0 ? parseFloat(rgbMatch[4]) : 1
      };
    }
    return null;
  }
  function parsePixel(val) {
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const matched = val.match(/^([\d.]+)px$/);
      if (matched) return parseFloat(matched[1]);
      const num = parseFloat(val);
      if (!isNaN(num)) return num;
    }
    return null;
  }
  var variablesMap = {};
  var resolvedValuesMap = {};
  function registerVarAlias(keys, variable, rawVal) {
    for (const k of keys) {
      if (!k) continue;
      variablesMap[k] = variable;
      if (rawVal !== void 0) resolvedValuesMap[k] = rawVal;
    }
    variablesMap[variable.name] = variable;
    if (rawVal !== void 0) resolvedValuesMap[variable.name] = rawVal;
  }
  function tokenIdToFigmaVarName(tokenId, category) {
    if (tokenId === "--atom-palette-white") return "color/neutral/white";
    if (tokenId.startsWith("--atom-palette-")) {
      return `color/${tokenId.replace(/^--atom-palette-/, "").replace(/-/g, "/")}`;
    }
    if (tokenId.startsWith("--atom-space-") || category === "spacing" || category === "size") {
      return `spacing/${tokenId.replace(/^--atom-space-/, "").replace(/^--atom-/, "")}`;
    }
    if (tokenId.startsWith("--atom-radius-") || category === "radius") {
      return `radius/${tokenId.replace(/^--atom-radius-/, "")}`;
    }
    if (tokenId.startsWith("--atom-typography-") || tokenId.startsWith("--atom-font-weight-") || category === "typography") {
      const key = tokenId.replace(/^--atom-typography-/, "").replace(/^--atom-font-weight-/, "");
      return tokenId.includes("weight") ? `typography/weight/${key}` : `typography/size/${key}`;
    }
    if (tokenId.startsWith("--atom-color-")) {
      const raw = tokenId.replace(/^--atom-color-/, "");
      let state = "default";
      let key = raw;
      if (raw.endsWith("-hover")) {
        state = "hover";
        key = raw.slice(0, -6);
      } else if (raw.endsWith("-subtle")) {
        state = "subtle";
        key = raw.slice(0, -7);
      }
      if (key === "destructive") key = "danger";
      return `color/${key}/${state}`;
    }
    return tokenId.replace(/^--atom-/, "").replace(/-/g, "/");
  }
  function findVariableByTokenId(tokenId, category) {
    if (!tokenId) return null;
    if (variablesMap[tokenId]) return variablesMap[tokenId];
    const expectedName = tokenIdToFigmaVarName(tokenId, category);
    const localVars = figma.variables.getLocalVariables();
    const found = localVars.find((v) => v.name === expectedName || v.name === tokenId);
    if (found) {
      variablesMap[tokenId] = found;
      variablesMap[found.name] = found;
      return found;
    }
    return null;
  }
  async function syncAllTokens(payload) {
    const tokensData = payload?.tokens || payload;
    const studioRegistry = payload?.registry;
    const collections = figma.variables.getLocalVariableCollections();
    let primCollection = collections.find((c) => c.name === "1. AtomSystem Primitives");
    if (!primCollection) {
      primCollection = figma.variables.createVariableCollection("1. AtomSystem Primitives");
      primCollection.renameMode(primCollection.modes[0].modeId, "Value");
    }
    const primModeId = primCollection.modes[0].modeId;
    let semCollection = collections.find((c) => c.name === "2. AtomSystem Semantic");
    if (!semCollection) {
      semCollection = figma.variables.createVariableCollection("2. AtomSystem Semantic");
    }
    const themes = Array.isArray(studioRegistry?.themes) && studioRegistry.themes.length > 0 ? studioRegistry.themes : [{ id: "ocean-blue", name: "Ocean Blue (Light)", mode: "light" }];
    const themeModeIds = {};
    semCollection.renameMode(semCollection.modes[0].modeId, themes[0].name || "Default");
    themeModeIds[themes[0].id] = semCollection.modes[0].modeId;
    for (let i = 1; i < Math.min(themes.length, 4); i++) {
      const th = themes[i];
      const existingMode = semCollection.modes.find((m) => m.name === th.name);
      if (existingMode) {
        themeModeIds[th.id] = existingMode.modeId;
      } else {
        try {
          const newModeId = semCollection.addMode(th.name);
          themeModeIds[th.id] = newModeId;
        } catch (e) {
          break;
        }
      }
    }
    const localVars = figma.variables.getLocalVariables();
    let createdCount = 0;
    const upsertVar = (col, name, type, scopes, desc) => {
      let v = localVars.find((item) => item.name === name && item.variableCollectionId === col.id);
      if (!v) {
        v = figma.variables.createVariable(name, col, type);
        localVars.push(v);
      }
      if (desc) v.description = desc;
      try {
        v.scopes = scopes;
      } catch (e) {
      }
      createdCount++;
      return v;
    };
    if (Array.isArray(studioRegistry?.paletteVariables)) {
      for (const pv of studioRegistry.paletteVariables) {
        if (pv.category === "color" && typeof pv.value === "string" && pv.value.startsWith("#")) {
          const cleanName = pv.id.replace(/^--atom-palette-/, "").replace(/-/g, "/");
          const varName = `color/${cleanName}`;
          const v = upsertVar(primCollection, varName, "COLOR", ["ALL_FILLS", "STROKE_COLOR"], pv.description || pv.name);
          const rgba = parseCssColor(pv.value) || { r: 0.19, g: 0.51, b: 0.96, a: 1 };
          v.setValueForMode(primModeId, { r: rgba.r, g: rgba.g, b: rgba.b });
          registerVarAlias([pv.id, varName], v, pv.value);
        } else if (pv.category === "spacing" || pv.category === "size") {
          const px = parsePixel(pv.value);
          if (px !== null) {
            const key = pv.id.replace(/^--atom-space-/, "").replace(/^--atom-/, "");
            const varName = `spacing/${key}`;
            const v = upsertVar(primCollection, varName, "FLOAT", ["GAP", "WIDTH_HEIGHT"], pv.description || pv.name);
            v.setValueForMode(primModeId, px);
            registerVarAlias([pv.id, varName], v, px);
          }
        } else if (pv.category === "radius") {
          const px = parsePixel(pv.value);
          if (px !== null) {
            const key = pv.id.replace(/^--atom-radius-/, "");
            const varName = `radius/${key}`;
            const v = upsertVar(primCollection, varName, "FLOAT", ["CORNER_RADIUS"], pv.description || pv.name);
            v.setValueForMode(primModeId, px);
            registerVarAlias([pv.id, varName], v, px);
          }
        } else if (pv.category === "typography") {
          const px = parsePixel(pv.value);
          if (px !== null) {
            const key = pv.id.replace(/^--atom-typography-/, "").replace(/^--atom-font-weight-/, "");
            const varName = pv.id.includes("weight") ? `typography/weight/${key}` : `typography/size/${key}`;
            const v = upsertVar(primCollection, varName, "FLOAT", ["FONT_SIZE", "FONT_WEIGHT"], pv.description || pv.name);
            v.setValueForMode(primModeId, px);
            registerVarAlias([pv.id, varName], v, px);
          }
        }
      }
    }
    if (!variablesMap["--atom-palette-white"]) {
      const wv = upsertVar(primCollection, "color/neutral/white", "COLOR", ["ALL_FILLS", "STROKE_COLOR"], "Pure White");
      wv.setValueForMode(primModeId, { r: 1, g: 1, b: 1 });
      registerVarAlias(["--atom-palette-white", "color/neutral/white"], wv, "#ffffff");
    }
    if (Array.isArray(studioRegistry?.statusTokens)) {
      for (const st of studioRegistry.statusTokens) {
        const bindSemanticState = (suffix, varId, defaultPalId, desc) => {
          const semName = `color/${st.key}/${suffix}`;
          const semVar = upsertVar(semCollection, semName, "COLOR", ["ALL_FILLS", "STROKE_COLOR"], desc);
          for (const th of themes) {
            const modeId = themeModeIds[th.id];
            if (!modeId) continue;
            let palIdForTheme = defaultPalId;
            if (suffix === "default" && th.semanticOverrides?.[st.key]) {
              palIdForTheme = th.semanticOverrides[st.key];
            }
            const targetPrim = variablesMap[palIdForTheme];
            if (targetPrim) {
              semVar.setValueForMode(modeId, figma.variables.createVariableAlias(targetPrim));
            } else {
              const hex = resolvedValuesMap[palIdForTheme] || "#3182f6";
              const rgba = parseCssColor(hex) || { r: 0.19, g: 0.51, b: 0.96, a: 1 };
              semVar.setValueForMode(modeId, { r: rgba.r, g: rgba.g, b: rgba.b });
            }
          }
          registerVarAlias([varId, semName], semVar, resolvedValuesMap[defaultPalId] || "#3182f6");
        };
        bindSemanticState("default", st.id, st.paletteId, st.description);
        bindSemanticState("hover", `${st.id}-hover`, st.hoverPaletteId, `${st.name} Hover`);
        bindSemanticState("subtle", `${st.id}-subtle`, st.subtlePaletteId, `${st.name} Subtle`);
        if (st.key === "danger") {
          bindSemanticState("default", "--atom-color-destructive", st.paletteId, st.description);
          bindSemanticState("hover", "--atom-color-destructive-hover", st.hoverPaletteId, `${st.name} Hover`);
          bindSemanticState("subtle", "--atom-color-destructive-subtle", st.subtlePaletteId, `${st.name} Subtle`);
        }
      }
    }
    return { count: createdCount, modesCount: Object.keys(themeModeIds).length };
  }
  function makeBoundPaintFromCss(cssColorStr, tokenId) {
    const rgba = parseCssColor(cssColorStr);
    if (!rgba) return null;
    let paint = {
      type: "SOLID",
      color: { r: rgba.r, g: rgba.g, b: rgba.b },
      opacity: rgba.a
    };
    const v = findVariableByTokenId(tokenId, "color");
    if (v && v.resolvedType === "COLOR") {
      try {
        paint = figma.variables.setBoundVariableForPaint(paint, "color", v);
      } catch (e) {
      }
    }
    return paint;
  }
  function bindFloatProp(node, field, numVal, tokenId) {
    node[field] = numVal;
    const v = findVariableByTokenId(tokenId);
    if (v && v.resolvedType === "FLOAT") {
      try {
        node.setBoundVariable(field, v);
      } catch (e) {
      }
    }
  }
  async function applyTokenToSelection(payload) {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      throw new Error("\uBA3C\uC800 \uD53C\uADF8\uB9C8 \uCE94\uBC84\uC2A4\uC5D0\uC11C \uC801\uC6A9\uD560 \uD504\uB808\uC784\uC774\uB098 \uB3C4\uD615\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694.");
    }
    const { tokenId, value, targetProp } = payload;
    let appliedCount = 0;
    for (const node of selection) {
      if (targetProp === "fill" && "fills" in node) {
        const paint = makeBoundPaintFromCss(value, tokenId);
        if (paint) {
          node.fills = [paint];
          appliedCount++;
        }
      } else if (targetProp === "stroke" && "strokes" in node) {
        const paint = makeBoundPaintFromCss(value, tokenId);
        if (paint) {
          node.strokes = [paint];
          if (!node.strokeWeight) node.strokeWeight = 1;
          appliedCount++;
        }
      } else if (targetProp === "radius" && "cornerRadius" in node) {
        const px = parsePixel(value) ?? 8;
        bindFloatProp(node, "cornerRadius", px, tokenId);
        bindFloatProp(node, "topLeftRadius", px, tokenId);
        bindFloatProp(node, "topRightRadius", px, tokenId);
        bindFloatProp(node, "bottomLeftRadius", px, tokenId);
        bindFloatProp(node, "bottomRightRadius", px, tokenId);
        appliedCount++;
      } else if (targetProp === "padding" && "paddingLeft" in node) {
        const px = parsePixel(value) ?? 12;
        bindFloatProp(node, "paddingLeft", px, tokenId);
        bindFloatProp(node, "paddingRight", px, tokenId);
        bindFloatProp(node, "paddingTop", px, tokenId);
        bindFloatProp(node, "paddingBottom", px, tokenId);
        appliedCount++;
      } else if (targetProp === "gap" && "itemSpacing" in node) {
        const px = parsePixel(value) ?? 8;
        bindFloatProp(node, "itemSpacing", px, tokenId);
        appliedCount++;
      }
    }
    return { appliedCount, tokenId };
  }
  function buildFigmaNodeFromDomScene(scene, isRootComponent) {
    if (scene.kind === "SVG" && scene.svgMarkup) {
      try {
        const svgFrame = figma.createNodeFromSvg(scene.svgMarkup);
        svgFrame.name = scene.name || "Icon";
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
    if (scene.kind === "TEXT") {
      const textNode = figma.createText();
      textNode.name = scene.name || "Text";
      const fontStyle = scene.fontWeight && scene.fontWeight >= 600 ? "Medium" : "Regular";
      textNode.fontName = { family: "Inter", style: fontStyle };
      textNode.fontSize = Math.max(9, Math.round(scene.fontSize || 13));
      textNode.characters = scene.characters || "";
      const paint = makeBoundPaintFromCss(scene.color || "#0f172a", scene.tokenText);
      if (paint) textNode.fills = [paint];
      return textNode;
    }
    const frame = isRootComponent ? figma.createComponent() : figma.createFrame();
    frame.name = scene.name || "Frame";
    frame.layoutMode = scene.layoutMode === "VERTICAL" ? "VERTICAL" : "HORIZONTAL";
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "AUTO";
    if (scene.justifyContent === "space-between") {
      frame.primaryAxisAlignItems = "SPACE_BETWEEN";
    } else if (scene.justifyContent === "flex-end") {
      frame.primaryAxisAlignItems = "MAX";
    } else if (scene.justifyContent === "center") {
      frame.primaryAxisAlignItems = "CENTER";
    } else {
      frame.primaryAxisAlignItems = "MIN";
    }
    if (scene.alignItems === "center") {
      frame.counterAxisAlignItems = "CENTER";
    } else if (scene.alignItems === "flex-end") {
      frame.counterAxisAlignItems = "MAX";
    } else {
      frame.counterAxisAlignItems = "MIN";
    }
    const tok = scene.tokens || {};
    bindFloatProp(frame, "itemSpacing", Math.round(scene.gap || 0), tok.gap);
    bindFloatProp(frame, "paddingLeft", Math.round(scene.paddingLeft || 0), tok.px);
    bindFloatProp(frame, "paddingRight", Math.round(scene.paddingRight || 0), tok.px);
    bindFloatProp(frame, "paddingTop", Math.round(scene.paddingTop || 0), tok.py);
    bindFloatProp(frame, "paddingBottom", Math.round(scene.paddingBottom || 0), tok.py);
    const radPx = Math.round(scene.borderRadius || 0);
    bindFloatProp(frame, "cornerRadius", radPx, tok.radius);
    bindFloatProp(frame, "topLeftRadius", radPx, tok.radius);
    bindFloatProp(frame, "topRightRadius", radPx, tok.radius);
    bindFloatProp(frame, "bottomLeftRadius", radPx, tok.radius);
    bindFloatProp(frame, "bottomRightRadius", radPx, tok.radius);
    const bgPaint = makeBoundPaintFromCss(scene.backgroundColor, tok.bg);
    frame.fills = bgPaint ? [bgPaint] : [];
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
    if (typeof scene.opacity === "number") {
      frame.opacity = scene.opacity;
    }
    if (scene.hasShadow) {
      frame.effects = [{
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.12 },
        offset: { x: 0, y: 4 },
        radius: 12,
        spread: 0,
        visible: true,
        blendMode: "NORMAL"
      }];
    }
    const children = Array.isArray(scene.children) ? scene.children : [];
    for (const childScene of children) {
      const childNode = buildFigmaNodeFromDomScene(childScene, false);
      frame.appendChild(childNode);
    }
    if (children.length === 0 && scene.width && scene.height) {
      frame.layoutMode = "NONE";
      frame.resize(scene.width, scene.height);
    } else if (scene.justifyContent === "space-between" && scene.width) {
      if (frame.layoutMode === "HORIZONTAL") {
        frame.primaryAxisSizingMode = "FIXED";
        frame.resize(scene.width, Math.max(frame.height, scene.height || 36));
      } else {
        frame.counterAxisSizingMode = "FIXED";
        frame.resize(scene.width, frame.height);
      }
    }
    return frame;
  }
  async function renderCapturedComponents(payload) {
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Medium" });
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    } catch (e) {
    }
    await syncAllTokens(payload);
    const sets = Array.isArray(payload?.sets) ? payload.sets : [];
    const createdNodes = [];
    let setPosY = 0;
    let totalVariants = 0;
    for (const setSpec of sets) {
      const variantScenes = Array.isArray(setSpec.variants) ? setSpec.variants : [];
      const compNodes = [];
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
        const compNode = buildFigmaNodeFromDomScene(vScene, true);
        compNode.x = colX;
        compNode.y = rowY;
        compNodes.push(compNode);
        colX += compNode.width + 24;
        if (compNode.height > maxRowH) maxRowH = compNode.height;
      }
      if (compNodes.length > 1) {
        const componentSet = figma.combineAsVariants(compNodes, figma.currentPage);
        const pascalName = (setSpec.componentId || "Component").split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
        componentSet.name = `AtomSystem / ${pascalName}`;
        componentSet.description = setSpec.description || "";
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
      variantCount: totalVariants
    };
  }
  function inspectNode(node) {
    const result = {
      id: node.id,
      name: node.name,
      type: node.type,
      width: node.width,
      height: node.height
    };
    if ("layoutMode" in node) {
      result.layoutMode = node.layoutMode;
      result.paddingTop = node.paddingTop;
      result.paddingRight = node.paddingRight;
      result.paddingBottom = node.paddingBottom;
      result.paddingLeft = node.paddingLeft;
      result.itemSpacing = node.itemSpacing;
    }
    if ("cornerRadius" in node) {
      result.cornerRadius = node.cornerRadius;
    }
    if ("boundVariables" in node) {
      result.boundVariables = node.boundVariables;
    }
    if ("fills" in node && Array.isArray(node.fills)) {
      result.fills = node.fills.map((f) => {
        if (f.type === "SOLID") {
          const hex = ((1 << 24) + (Math.round(f.color.r * 255) << 16) + (Math.round(f.color.g * 255) << 8) + Math.round(f.color.b * 255)).toString(16).slice(1);
          return { type: f.type, color: `#${hex}`, boundVariable: f.boundVariables?.color };
        }
        return { type: f.type };
      });
    }
    if ("strokes" in node && Array.isArray(node.strokes)) {
      result.strokes = node.strokes.map((s) => {
        if (s.type === "SOLID") {
          const hex = ((1 << 24) + (Math.round(s.color.r * 255) << 16) + (Math.round(s.color.g * 255) << 8) + Math.round(s.color.b * 255)).toString(16).slice(1);
          return { type: s.type, color: `#${hex}`, boundVariable: s.boundVariables?.color };
        }
        return { type: s.type };
      });
    }
    if ("children" in node && node.children) {
      result.children = node.children.map((child) => inspectNode(child));
    }
    return result;
  }
  async function updateTokenValue(payload) {
    const { tokenId, value, category, name } = payload;
    const isColor = category === "color" || value.trim().startsWith("#") || value.trim().startsWith("rgb");
    const varName = tokenIdToFigmaVarName(tokenId, category);
    let v = findVariableByTokenId(tokenId, category);
    let primCollection = figma.variables.getLocalVariableCollections().find((c) => c.name === "1. AtomSystem Primitives");
    if (!primCollection) {
      primCollection = figma.variables.createVariableCollection("1. AtomSystem Primitives");
      primCollection.renameMode(primCollection.modes[0].modeId, "Value");
    }
    if (!v) {
      const type = isColor ? "COLOR" : "FLOAT";
      const scopes = isColor ? ["ALL_FILLS", "STROKE_COLOR"] : category === "radius" ? ["CORNER_RADIUS"] : category === "typography" ? ["FONT_SIZE", "FONT_WEIGHT"] : ["GAP", "WIDTH_HEIGHT"];
      v = figma.variables.createVariable(varName, primCollection, type);
      if (name) v.description = name;
      try {
        v.scopes = scopes;
      } catch (e) {
      }
      registerVarAlias([tokenId, varName], v, value);
    }
    const col = figma.variables.getVariableCollectionById(v.variableCollectionId) || primCollection;
    const modeId = col.modes[0].modeId;
    if (v.resolvedType === "COLOR") {
      const rgba = parseCssColor(value);
      if (!rgba) throw new Error(`\uC720\uD6A8\uD558\uC9C0 \uC54A\uC740 \uC0C9\uC0C1 \uAC12\uC785\uB2C8\uB2E4: ${value}`);
      v.setValueForMode(modeId, { r: rgba.r, g: rgba.g, b: rgba.b });
      resolvedValuesMap[tokenId] = value;
    } else if (v.resolvedType === "FLOAT") {
      const px = parsePixel(value);
      if (px === null) throw new Error(`\uC720\uD6A8\uD558\uC9C0 \uC54A\uC740 \uC22B\uC790/px \uAC12\uC785\uB2C8\uB2E4: ${value}`);
      v.setValueForMode(modeId, px);
      resolvedValuesMap[tokenId] = px;
    }
    return { tokenId, varName: v.name, value };
  }
  async function updateSemanticToken(payload) {
    const { key, tokenId, paletteId, paletteValue, themeName } = payload;
    const collections = figma.variables.getLocalVariableCollections();
    let semCollection = collections.find((c) => c.name === "2. AtomSystem Semantic");
    if (!semCollection) {
      semCollection = figma.variables.createVariableCollection("2. AtomSystem Semantic");
    }
    const semVarName = `color/${key}/default`;
    let semVar = findVariableByTokenId(tokenId, "color") || figma.variables.getLocalVariables().find((v) => v.name === semVarName && v.variableCollectionId === semCollection.id) || null;
    if (!semVar) {
      semVar = figma.variables.createVariable(semVarName, semCollection, "COLOR");
      try {
        semVar.scopes = ["ALL_FILLS", "STROKE_COLOR"];
      } catch (e) {
      }
      registerVarAlias([tokenId, semVarName], semVar, paletteValue);
    }
    const targetMode = themeName && semCollection.modes.find((m) => m.name === themeName) || semCollection.modes[0];
    const targetPrim = findVariableByTokenId(paletteId, "color");
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
  function collectMatchingVariantNodes(componentId, variableId) {
    const pascalName = componentId.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
    const setTargetName = `AtomSystem / ${pascalName}`;
    const singlePrefix = `AtomSystem / ${componentId} (`;
    const varMatcher = new RegExp(`(^|,\\s*)Variable=${variableId}(,|$)`);
    const matches = [];
    const visit = (node) => {
      if (node.type === "COMPONENT_SET" && node.name === setTargetName) {
        for (const child of node.children) {
          if (child.type === "COMPONENT" && varMatcher.test(child.name)) {
            matches.push(child);
          }
        }
        return;
      }
      if (node.type === "COMPONENT" && (node.name.startsWith(singlePrefix) || varMatcher.test(node.name))) {
        if (node.parent?.type !== "COMPONENT_SET" || node.parent.name === setTargetName) {
          if (varMatcher.test(node.name)) matches.push(node);
        }
      }
      if ("children" in node) {
        for (const ch of node.children) {
          visit(ch);
        }
      }
    };
    visit(figma.currentPage);
    return matches;
  }
  async function updateComponentBinding(payload) {
    const { componentId, variableId, propKey, tokenId, value } = payload;
    const variants = collectMatchingVariantNodes(componentId, variableId);
    let updatedCount = 0;
    for (const comp of variants) {
      const isHover = comp.name.includes("Status=hover");
      const isFocus = comp.name.includes("Status=focus");
      const isOutlineOrGhost = /Type=(outline|ghost|link)/i.test(comp.name);
      if (propKey === "background" || propKey === "activeBackground") {
        const targetNode = componentId === "switch" ? comp.findOne((n) => n.name === "SwitchTrack") || comp : comp;
        if ("fills" in targetNode && (!isHover || propKey === "activeBackground") && !isOutlineOrGhost) {
          const paint = makeBoundPaintFromCss(value, tokenId);
          if (paint) {
            targetNode.fills = [paint];
            updatedCount++;
          }
        } else if (isOutlineOrGhost && propKey === "background") {
          const paint = makeBoundPaintFromCss(value, tokenId);
          if (paint) {
            comp.findAll((n) => n.type === "TEXT").forEach((tn) => {
              tn.fills = [paint];
            });
            if (Array.isArray(comp.strokes) && comp.strokes.length > 0) {
              comp.strokes = [paint];
            }
            updatedCount++;
          }
        }
      } else if (propKey === "hoverBackground") {
        if (isHover && !isOutlineOrGhost) {
          const paint = makeBoundPaintFromCss(value, tokenId);
          if (paint) {
            comp.fills = [paint];
            updatedCount++;
          }
        }
      } else if (propKey === "thumbColor") {
        const thumb = comp.findOne((n) => n.name === "Thumb");
        if (thumb && "fills" in thumb) {
          const paint = makeBoundPaintFromCss(value, tokenId);
          if (paint) {
            thumb.fills = [paint];
            updatedCount++;
          }
        }
      } else if (propKey === "borderColor" || propKey === "focusBorderColor") {
        const shouldApply = propKey === "focusBorderColor" ? isFocus : !isFocus;
        if (shouldApply && Array.isArray(comp.strokes) && comp.strokes.length > 0) {
          const paint = makeBoundPaintFromCss(value, tokenId);
          if (paint) {
            comp.strokes = [paint];
            updatedCount++;
          }
        }
      } else if (propKey === "textColor") {
        if (!isOutlineOrGhost) {
          const paint = makeBoundPaintFromCss(value, tokenId);
          if (paint) {
            const textNodes = comp.findAll((n) => n.type === "TEXT");
            if (textNodes.length > 0) {
              textNodes[0].fills = [paint];
              updatedCount++;
            }
          }
        }
      } else if (propKey === "borderRadius") {
        const px = parsePixel(value);
        if (px !== null && comp.cornerRadius !== 9999) {
          bindFloatProp(comp, "cornerRadius", px, tokenId);
          bindFloatProp(comp, "topLeftRadius", px, tokenId);
          bindFloatProp(comp, "topRightRadius", px, tokenId);
          bindFloatProp(comp, "bottomLeftRadius", px, tokenId);
          bindFloatProp(comp, "bottomRightRadius", px, tokenId);
          updatedCount++;
        }
      } else if (propKey === "paddingX" || propKey === "padding") {
        const px = parsePixel(value);
        if (px !== null) {
          bindFloatProp(comp, "paddingLeft", px, tokenId);
          bindFloatProp(comp, "paddingRight", px, tokenId);
          if (propKey === "padding") {
            bindFloatProp(comp, "paddingTop", px, tokenId);
            bindFloatProp(comp, "paddingBottom", px, tokenId);
          }
          updatedCount++;
        }
      } else if (propKey === "paddingY") {
        const px = parsePixel(value);
        if (px !== null) {
          bindFloatProp(comp, "paddingTop", px, tokenId);
          bindFloatProp(comp, "paddingBottom", px, tokenId);
          updatedCount++;
        }
      }
    }
    return { componentId, variableId, propKey, tokenId, updatedCount };
  }
  figma.ui.onmessage = async (msg) => {
    try {
      if (msg.type === "SYNC_ALL_TOKENS") {
        const result = await syncAllTokens(msg.payload);
        figma.ui.postMessage({ type: "SYNC_TOKENS_SUCCESS", payload: result });
        figma.notify(`\u2705 ${result.count}\uAC1C \uD1A0\uD070 Variables (${result.modesCount}\uAC1C \uD14C\uB9C8 \uBAA8\uB4DC) \uB3D9\uAE30\uD654 \uC644\uB8CC!`);
      } else if (msg.type === "UPDATE_TOKEN_VALUE") {
        const result = await updateTokenValue(msg.payload);
        figma.ui.postMessage({ type: "UPDATE_TOKEN_SUCCESS", payload: result });
      } else if (msg.type === "UPDATE_SEMANTIC_TOKEN") {
        const result = await updateSemanticToken(msg.payload);
        figma.ui.postMessage({ type: "UPDATE_TOKEN_SUCCESS", payload: result });
      } else if (msg.type === "UPDATE_COMPONENT_BINDING") {
        const result = await updateComponentBinding(msg.payload);
        figma.ui.postMessage({ type: "UPDATE_COMPONENT_BINDING_SUCCESS", payload: result });
        if (result.updatedCount > 0) {
          figma.notify(`\u{1F517} ${result.componentId}.${result.propKey} \u2794 ${result.tokenId} (${result.updatedCount}\uAC1C \uBCC0\uD615 \uBC18\uC601)`);
        }
      } else if (msg.type === "APPLY_TOKEN_TO_SELECTION") {
        const result = await applyTokenToSelection(msg.payload);
        figma.ui.postMessage({ type: "APPLY_TOKEN_SUCCESS", payload: result });
        figma.notify(`\u{1F3AF} [${result.tokenId}] \uD1A0\uD070\uC774 \uC120\uD0DD\uD55C \uB808\uC774\uC5B4\uC5D0 \uBC14\uC778\uB529\uB418\uC5C8\uC2B5\uB2C8\uB2E4.`);
      } else if (msg.type === "RENDER_CAPTURED_COMPONENTS") {
        const result = await renderCapturedComponents(msg.payload);
        figma.ui.postMessage({ type: "GENERATE_COMPONENTS_SUCCESS", payload: result });
        figma.notify(`\u{1F680} Studio \uC2E4\uC81C DOM \uAE30\uBC18 ${result.setsCount}\uAC1C \uCEF4\uD3EC\uB10C\uD2B8 (${result.variantCount}\uAC1C \uBCC0\uD615) \uC0DD\uC131 \uC644\uB8CC!`);
      } else if (msg.type === "INSPECT_SELECTION") {
        const selection = figma.currentPage.selection;
        if (selection.length === 0) {
          figma.notify("\u26A0\uFE0F \uAC80\uC0AC\uD560 \uB808\uC774\uC5B4\uB97C \uBA3C\uC800 \uC120\uD0DD\uD574\uC8FC\uC138\uC694.");
          return;
        }
        const data = selection.map((node) => inspectNode(node));
        figma.ui.postMessage({ type: "INSPECT_SELECTION_RESULT", payload: data });
        figma.notify(`\u{1F50D} ${selection.length}\uAC1C \uB178\uB4DC \uC815\uBCF4\uAC00 \uD074\uB9BD\uBCF4\uB4DC\uB85C \uCD94\uCD9C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.`);
      }
    } catch (err) {
      figma.ui.postMessage({ type: "ERROR", error: err.message });
      figma.notify(`\u274C \uC624\uB958: ${err.message}`, { error: true });
    }
  };
})();
