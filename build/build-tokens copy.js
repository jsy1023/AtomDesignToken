import StyleDictionary from "style-dictionary";
import fs from "fs";
import path from 'path';

// Helper: Deep merge objects
function deepMerge(target, source) {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return target;
  
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  return { ...result, ...source };
}

// Helper: Flatten to map of { dotPath: value } for quick lookup
function flattenToValues(obj, prefix = '', res = {}) {
  for (const key in obj) {
    if (key.startsWith('$')) continue;
    const val = obj[key];
    const currentPath = prefix ? `${prefix}.${key}` : key;
    if (val && (val.$value !== undefined || val.value !== undefined)) {
        res[currentPath] = val.$value || val.value;
    } else if (typeof val === 'object') {
        flattenToValues(val, currentPath, res);
    }
  }
  return res;
}

// 1. Read tokens
const tokensRaw = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));
const themesMetadata = tokensRaw.$themes || [];

// Identify all available sets (top-level keys excluding metadata)
const allSets = Object.keys(tokensRaw).filter(k => !k.startsWith('$'));

// 2. Process each theme dynamically
const cssBlocks = {
  root: new Set(), // For global tokens
};

// Config generator
const getConfig = (tokens) => ({
  tokens: tokens,
  platforms: {
    css: {
      transformGroup: "css",
    }
  }
});

// Iterate through each theme in metadata
for (const theme of themesMetadata) {
  const themeName = theme.name;
  console.log(`Processing theme: ${themeName}`);
  
  // 1. Merge enabled sets for this theme
  // Order matters? "tokens-studio" usually prioritizes order in metadata if it exists, 
  // or keys order. Here we assume generic merge order or use 'global' as base.
  // Actually, we should check `theme.selectedTokenSets` order or priorities.
  // Metadata often has `tokenSetOrder`.
  
  let mergedTokens = {};
  
  // Use global tokenSetOrder if available, otherwise just use keys
  const setOrder = tokensRaw.$metadata?.tokenSetOrder || Object.keys(theme.selectedTokenSets);
  
  // Filter only enabled sets for this theme
  const enabledSets = setOrder.filter(setName => 
    theme.selectedTokenSets[setName] === 'enabled' && allSets.includes(setName)
  );

  enabledSets.forEach(setName => {
    mergedTokens = deepMerge(mergedTokens, tokensRaw[setName]);
  });
  
  // 2. Resolve aliases for this fully merged theme context
  const sd = new StyleDictionary(getConfig(mergedTokens));
  const resolved = await sd.exportPlatform('css');
  
  // Flatten for iteration
  const flatResolved = flattenToValues(resolved);
  
  // 3. Distribute to CSS blocks
  // Logic: For each resolved token, we need to know its "Source Set".
  // We check which set in `enabledSets` contains this path.
  // If multiple sets have it, the last one merged wins (overrides).
  
  if (!cssBlocks[themeName]) cssBlocks[themeName] = new Set();
  
  Object.entries(flatResolved).forEach(([tokenPath, tokenValue]) => {
     // Format variable name
     const varName = '--' + tokenPath.replace(/\./g, '-');
     const line = `${varName}: ${tokenValue};`;
     
     // Find origin set
     // We iterate enabledSets in reverse to find who "owns" this token (the specific override)
     let originSet = null;
     for (let i = enabledSets.length - 1; i >= 0; i--) {
        const setName = enabledSets[i];
        // Check if path exists in tokensRaw[setName]
        // This check needs to be deep.
        const setRoot = tokensRaw[setName];
        const parts = tokenPath.split('.');
        let current = setRoot;
        let exists = true;
        for (const part of parts) {
            if (current?.[part] === undefined) {
                exists = false;
                break;
            }
            current = current[part];
        }
        if (exists) {
            originSet = setName;
            break; 
        }
     }
     
     if (originSet === 'global') {
         cssBlocks.root.add(line);
     } else {
         // It belongs to the theme class (white/dark etc)
         // Note: If origin is NOT global, we assume it's theme specific.
         // If "global" is just a naming convention, we might need stricter logic.
         // But usually 'global' set goes to root.
         cssBlocks[themeName].add(line);
     }
  });
}

// 3. Output
const formatBlock = (lines) => Array.from(lines).join('\n  ');

let cssContent = `@import "tailwindcss";\n\n`;

// @theme block (same as root for tailwind v4 compatibility often?)
// Previous request had both.
cssContent += `@theme {\n  ${formatBlock(cssBlocks.root)}\n}\n\n`;

// :root block
cssContent += `:root {\n  ${formatBlock(cssBlocks.root)}\n}\n\n`;

// Theme blocks
themesMetadata.forEach(theme => {
    const lines = cssBlocks[theme.name];
    if (lines && lines.size > 0) {
        cssContent += `.${theme.name} {\n  ${formatBlock(lines)}\n}\n\n`;
    }
});

const buildPath = path.resolve("app", "globals.css");
const dir = path.dirname(buildPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(buildPath, cssContent.trim());
console.log(`Generated ${buildPath}`);
