"use client";

import React, { useState, useEffect } from 'react';
import defaultTokens from '@/tokens/tokens.json';
import { ChevronRight, ChevronDown, Download, Check } from 'lucide-react';

// Helper to generate CSS variables from parsed token JSON
const generateCssFromTokens = (jsonObj: any) => {
  const dictionary = new Map<string, string>();
  const cssLines: string[] = [];
  
  // Flatten all values
  const flatten = (obj: any, currentPath: string[]) => {
    for (const key in obj) {
      if (key === "$type" || key === "type") continue;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (obj[key].$value !== undefined || obj[key].value !== undefined) {
           const val = obj[key].$value ?? obj[key].value;
           dictionary.set([...currentPath, key].join("."), val);
        } else {
           flatten(obj[key], [...currentPath, key]);
        }
      }
    }
  }
  
  if (jsonObj.global) flatten(jsonObj.global, ["global"]);
  if (jsonObj.white) flatten(jsonObj.white, ["white"]);
  if (jsonObj.dark) flatten(jsonObj.dark, ["dark"]);

  // Resolve {references}
  const resolveValue = (val: string, visited: Set<string> = new Set()): string => {
    if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
      const refPath = val.slice(1, -1);
      if (visited.has(refPath)) return val;
      visited.add(refPath);
      
      const fullPath = refPath.startsWith('global.') ? refPath : `global.${refPath}`;
      const targetVal = dictionary.get(fullPath) || dictionary.get(refPath);
      if (targetVal) {
        return resolveValue(targetVal as string, visited);
      }
    }
    return val;
  }

  // Generate CSS Variable mappings
  for (const [path, value] of dictionary.entries()) {
    const parts = path.split('.');
    
    // Match build-tokens.js: Strip 'global', then strip the top category for the var name.
    let workingParts = [...parts];
    if (workingParts[0] === 'global') {
      workingParts = workingParts.slice(1);
    }
    const varName = `--${workingParts.slice(1).join('-')}`;
    
    let resolved = resolveValue(value as string);
    if (!isNaN(Number(resolved)) && (parts.includes("spacing") || parts.includes("radius") || parts.includes("sizing") || parts.includes("fontSizes") || parts.includes("dimension") || parts.includes("borderRadius"))) {
      resolved = `${resolved}px`;
    }
    
    const rootCategory = parts[0];
    if (rootCategory === 'dark') {
      cssLines.push(`[data-theme='dark'], .dark, [data-theme='dark'] #studio-preview, .dark #studio-preview { ${varName}: ${resolved} !important; }`);
    } else {
      // Apply white (default semantic) and global mapping globally for preview
      cssLines.push(`:root, body, #studio-preview { ${varName}: ${resolved} !important; }`);
    }
  }
  
  return cssLines.join('\n');
};

// Deep update helper
const setIn = (obj: any, path: string[], value: any): any => {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (rest.length === 0) {
    return { ...obj, [head]: { ...obj[head], $value: value } };
  }
  return {
    ...obj,
    [head]: setIn(obj[head] !== undefined ? obj[head] : {}, rest, value)
  };
};

const TokenInput = ({ path, token, onChange, getResolvedColor }: { path: string[], token: any, onChange: (path: string[], value: string) => void, getResolvedColor: (v: string) => string }) => {
  const name = path[path.length - 1];
  const value = token.$value !== undefined ? token.$value : token.value;
  const type = token.$type || token.type;

  const isColor = type === 'color';
  const displayColor = getResolvedColor(value);
  const showSwatch = typeof displayColor === 'string' && (displayColor.startsWith('#') || displayColor.startsWith('rgb'));

  return (
    <div className="flex items-center gap-2 py-1.5 px-2 hover:bg-bg-hover rounded-common transition-colors group">
      <span className="text-text-sub w-[90px] truncate text-xs" title={name}>{name}</span>
      <div className="flex-1 flex items-center gap-2 relative">
        {isColor && (
          <div 
            className="w-4 h-4 rounded-[3px] border border-border-standard shrink-0 shadow-sm"
            style={{ backgroundColor: showSwatch ? displayColor : 'transparent' }}
          />
        )}
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(path, e.target.value)}
          className="flex-1 bg-bg-wrapper border border-border-standard rounded-common px-2 py-1 text-xs text-text-standard focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>
    </div>
  );
};

const TokenGroup = ({ name, data, path, expandedPaths, togglePath, onChange, getResolvedColor }: any) => {
  const isToken = data && (data.$value !== undefined || data.value !== undefined);
  
  if (isToken) {
    return <TokenInput path={path} token={data} onChange={onChange} getResolvedColor={getResolvedColor} />;
  }

  const pathKey = path.join('.');
  // Auto-expand top level groups like global, dark, white
  const isExpanded = expandedPaths.has(pathKey) || path.length === 1;
  const childrenKeys = Object.keys(data).filter(k => k !== '$type' && k !== 'type');

  return (
    <div className="flex flex-col">
      <button 
        onClick={() => togglePath(pathKey)}
        className="flex items-center gap-1 py-1.5 px-1 hover:bg-bg-hover rounded-common text-text-title text-sm font-bold text-left transition-colors"
      >
        <span className="text-text-sub">
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        <span className="capitalize">{name}</span>
      </button>
      
      {isExpanded && (
        <div className="pl-4 border-l border-border-standard ml-2 mt-1 flex flex-col gap-1 mb-2">
          {childrenKeys.map(key => (
            <TokenGroup 
              key={key} 
              name={key} 
              data={data[key]} 
              path={[...path, key]} 
              expandedPaths={expandedPaths} 
              togglePath={togglePath}
              onChange={onChange}
              getResolvedColor={getResolvedColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function TokenEditor() {
  const [tokens, setTokens] = useState<any>(null);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(['global.palette', 'global.palette.color']));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    // Deep clone to avoid mutating default import
    setTokens(JSON.parse(JSON.stringify(defaultTokens)));
  }, []);

  const togglePath = (path: string) => {
    setExpandedPaths(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const resolveTokenForUI = (val: string, currentTokens: any, visited = new Set<string>()): string => {
    if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
      const refPath = val.slice(1, -1);
      if (visited.has(refPath)) return 'transparent'; // Circular reference
      visited.add(refPath);
      
      const pathParts = refPath.startsWith('global.') ? refPath.split('.') : ['global', ...refPath.split('.')];
      
      let current: any = currentTokens;
      for (const p of pathParts) {
        if (current && current[p]) {
          current = current[p];
        } else {
          current = null;
          break;
        }
      }
      
      if (current && (current.$value !== undefined || current.value !== undefined)) {
        const nextVal = current.$value ?? current.value;
        return resolveTokenForUI(nextVal, currentTokens, visited);
      }
    }
    return val;
  };

  const handleTokenChange = (path: string[], newValue: string) => {
    setTokens((prev: any) => setIn(prev, path, newValue));
  };

  const handleApply = () => {
    if (!tokens) return;
    setIsApplying(true);
    try {
      setErrorMsg(null);
      const cssRules = generateCssFromTokens(tokens);
      
      const styleId = 'token-studio-overrides';
      let styleTag = document.getElementById(styleId);

      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
      
      styleTag.innerHTML = cssRules;
      
      // Feedback effect
      setTimeout(() => setIsApplying(false), 500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error generating CSS from tokens');
      setIsApplying(false);
    }
  };

  const handleDownload = () => {
    if (!tokens) return;
    try {
      const jsonText = JSON.stringify(tokens, null, 2);
      const blob = new Blob([jsonText], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tokens.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setErrorMsg('Cannot download invalid tokens');
    }
  };

  if (!tokens) return null;

  return (
    <div className="w-full h-full flex flex-col bg-bg-card border-r border-border-standard">
      <div className="p-4 border-b border-border-standard flex flex-col gap-2">
        <h2 className="font-bold text-text-title" style={{ fontSize: 'var(--font-sizes-h5)' }}>Tokens Studio</h2>
        <p className="text-text-sub text-xs space-y-1">
          Customize design tokens visually. Click <strong>Apply</strong> to preview changes dynamically across layouts.
        </p>
      </div>
      
      <div className="flex-1 w-full bg-bg-card flex flex-col relative overflow-y-auto p-4 custom-scrollbar">
         {['global', 'white', 'dark'].map(rootKey => (
           tokens[rootKey] && (
             <TokenGroup 
               key={rootKey}
               name={rootKey}
               data={tokens[rootKey]}
               path={[rootKey]}
               expandedPaths={expandedPaths}
               togglePath={togglePath}
               onChange={handleTokenChange}
               getResolvedColor={(val: string) => resolveTokenForUI(val, tokens)}
             />
           )
         ))}
      </div>

      <div className="p-4 border-t border-border-standard flex flex-col gap-2 bg-bg-wrapper">
        {errorMsg && (
          <div className="text-danger text-xs font-bold mb-2">
            Error: {errorMsg}
          </div>
        )}
        <div className="flex gap-2 justify-end w-full">
          <button 
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border-standard rounded-common text-sm font-bold text-text-title hover:bg-bg-hover transition-colors"
          >
            <Download size={16} />
            Download
          </button>
          <button 
            onClick={handleApply}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-common text-sm font-bold hover:opacity-90 transition-opacity"
          >
            {isApplying ? <Check size={16} /> : null}
            {isApplying ? 'Applied!' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
}
