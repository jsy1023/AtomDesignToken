/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, FileText, Check, Download, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

import { TOSS_MD_PRESET } from '../constants/tossGuide';

const DAANGN_MD_PRESET = `# Daangn Style Design Guide (당근 스타일 디자인 가이드)

## 1. 디자인 철학
- Warm & Friendly, Clear Readability, Soft Rounding
- 곡률: 10px ~ 14px (소프트 라운딩)

## 2. 색상 시스템 (Color Palette)
### Primary / Brand
- \`primary\`: \`#FF6F0F\` (Daangn Warm Orange)
- \`primary-hover\`: \`#E85E00\`
- \`primary-light\`: \`#FFF2EB\`

### Secondary / Semantic
- \`success\`: \`#0DCC5A\`
- \`warning\`: \`#FF9E00\`
- \`danger\`: \`#FF4D4D\`

### Neutral / Surface
- \`bg-surface\`: \`#FFFFFF\`
- \`bg-canvas\`: \`#F8F9FA\`
- \`text-primary\`: \`#212124\`
- \`text-secondary\`: \`#4D5159\`
- \`border-default\`: \`#EAEBEE\`

## 3. 조형 및 모서리 (Border Radius)
- 버튼 곡률: \`12px\`
- 카드 곡률: \`14px\`
- \`font-family\`: Pretendard, "Noto Sans KR", sans-serif
`;

const CUSTOM_MD_PRESET = `# Custom Brand Design Guide

## 1. 브랜드 및 컨셉
- Brand: My Startup / Modern Clean

## 2. 색상 (Color Palette)
### Primary / Brand
- \`primary\`: \`#6366F1\`
- \`primary-hover\`: \`#4F46E5\`
- \`primary-light\`: \`#EEF2FF\`

### Neutral / Surface
- \`bg-surface\`: \`#FFFFFF\`
- \`bg-canvas\`: \`#F9FAFB\`
- \`text-primary\`: \`#111827\`
- \`border-default\`: \`#E5E7EB\`

## 3. 모서리 (Radius)
- 버튼 곡률: \`10px\`
- 카드 곡률: \`16px\`
- \`font-family\`: "Inter", sans-serif
`;

export interface ParsedTokens {
  primary: string;
  primaryHover?: string;
  primaryLight?: string;
  bgSurface?: string;
  bgCanvas?: string;
  textPrimary?: string;
  radiusBtn?: string;
  radiusCard?: string;
  fontFamily?: string;
}

// Markdown 텍스트에서 토큰을 추출하는 파서 함수 (YAML Frontmatter 및 Markdown 완벽 지원)
export const parseMarkdownToTokens = (markdown: string): ParsedTokens => {
  const result: ParsedTokens = {
    primary: '#3182F6',
    radiusBtn: '16px',
    radiusCard: '20px',
    bgSurface: '#FFFFFF',
    bgCanvas: '#F2F4F6',
    textPrimary: '#191F28'
  };

  // 1. Primary Color 추출 (TDS blue-500: ... # #3182F6 또는 primary: #3182F6 등)
  const blue500Match = markdown.match(/blue-500:[^#\n]*[#]\s*([#][0-9a-fA-F]{3,8})/i) ||
                       markdown.match(/blue-500:[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  const explicitPrimaryMatch = markdown.match(/(?:primary|메인 포인트 컬러|Primary Color)[^#\n]*([#][0-9a-fA-F]{3,8})/i);

  if (blue500Match && blue500Match[1] && (markdown.includes('slug: toss') || markdown.includes('토스'))) {
    result.primary = blue500Match[1];
  } else if (explicitPrimaryMatch && explicitPrimaryMatch[1]) {
    result.primary = explicitPrimaryMatch[1];
  } else if (blue500Match && blue500Match[1]) {
    result.primary = blue500Match[1];
  }

  // 2. Primary Hover & Light (blue-50: #E8F3FF 등)
  const hoverMatch = markdown.match(/blue-600:[^#\n]*[#]\s*([#][0-9a-fA-F]{3,8})/i) ||
                     markdown.match(/primary-hover[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  if (hoverMatch && hoverMatch[1]) {
    result.primaryHover = hoverMatch[1];
  }

  const lightMatch = markdown.match(/blue-50:[^#\n]*[#]\s*([#][0-9a-fA-F]{3,8})/i) ||
                     markdown.match(/blue-50:[^#\n]*([#][0-9a-fA-F]{3,8})/i) ||
                     markdown.match(/primary-light[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  if (lightMatch && lightMatch[1]) {
    result.primaryLight = lightMatch[1];
  }

  // 3. Background Surface & Canvas (white, grey-100: #F2F4F6 등)
  const surfaceMatch = markdown.match(/tds-bg-primary:\s*"\{colors\.white\}"/i) ||
                       markdown.match(/bg-surface[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  if (surfaceMatch) {
    result.bgSurface = '#FFFFFF';
  }

  const canvasMatch = markdown.match(/grey-100:[^#\n]*[#]\s*([#][0-9a-fA-F]{3,8})/i) ||
                      markdown.match(/grey-100:[^#\n]*([#][0-9a-fA-F]{3,8})/i) ||
                      markdown.match(/bg-canvas[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  if (canvasMatch && canvasMatch[1]) {
    result.bgCanvas = canvasMatch[1];
  }

  // 4. Text Primary (grey-900: #191F28 등)
  const textMatch = markdown.match(/grey-900:[^#\n]*[#]\s*([#][0-9a-fA-F]{3,8})/i) ||
                    markdown.match(/grey-900:[^#\n]*([#][0-9a-fA-F]{3,8})/i) ||
                    markdown.match(/text-primary[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  if (textMatch && textMatch[1]) {
    result.textPrimary = textMatch[1];
  }

  // 5. Button Radius (radius-xl: 16px 또는 버튼 곡률: 16px)
  const btnRadiusMatch = markdown.match(/radius-xl:\s*(\d+)\s*px/i) ||
                         markdown.match(/(?:버튼\s*(?:곡률|라운딩)|radius-btn|btn-radius)[^0-9\n]*(\d+)\s*px/i);
  if (btnRadiusMatch && btnRadiusMatch[1]) {
    result.radiusBtn = `${btnRadiusMatch[1]}px`;
  }

  // 6. Card Radius (radius-2xl: 20px 또는 카드 곡률: 20px)
  const cardRadiusMatch = markdown.match(/radius-2xl:\s*(\d+)\s*px/i) ||
                          markdown.match(/(?:카드\s*(?:곡률|라운딩)|radius-card|card-radius)[^0-9\n]*(\d+)\s*px/i);
  if (cardRadiusMatch && cardRadiusMatch[1]) {
    result.radiusCard = `${cardRadiusMatch[1]}px`;
  }

  // 7. Font Family
  const fontMatch = markdown.match(/fontFamily:\s*"?([^"\n]+)"?/i) ||
                    markdown.match(/font-family[^:\n]*:\s*([^\n]+)/i);
  if (fontMatch && fontMatch[1]) {
    result.fontFamily = fontMatch[1].trim();
  }

  return result;
};

export function MarkdownGuideEditor() {
  const [markdown, setMarkdown] = useState<string>(TOSS_MD_PRESET);
  const [fileName, setFileName] = useState<string>('toss.md');
  const [isDragging, setIsDragging] = useState(false);
  const [parsedTokens, setParsedTokens] = useState<ParsedTokens>(() => parseMarkdownToTokens(TOSS_MD_PRESET));
  const [isApplied, setIsApplied] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>('Toss 프리셋이 기본 로드되었습니다.');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 마크다운 변경 시 실시간 토큰 추출
  useEffect(() => {
    const tokens = parseMarkdownToTokens(markdown);
    setParsedTokens(tokens);
  }, [markdown]);

  // CSS 변수 주입 함수
  const applyTokensToDOM = (tokens: ParsedTokens) => {
    const styleId = 'token-studio-overrides';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const cssRules = `
      :root, body, #studio-preview {
        --primary: ${tokens.primary} !important;
        --color-primary: ${tokens.primary} !important;
        --atom-color-primary: ${tokens.primary} !important;
        --atom-primary: ${tokens.primary} !important;
        ${tokens.primaryHover ? `--atom-primary-hover: ${tokens.primaryHover} !important;` : ''}
        ${tokens.primaryLight ? `--atom-primary-light: ${tokens.primaryLight} !important;` : ''}
        ${tokens.bgSurface ? `--atom-bg-surface: ${tokens.bgSurface} !important; --bg-surface: ${tokens.bgSurface} !important;` : ''}
        ${tokens.bgCanvas ? `--atom-bg-canvas: ${tokens.bgCanvas} !important; --bg-canvas: ${tokens.bgCanvas} !important;` : ''}
        ${tokens.textPrimary ? `--atom-text-primary: ${tokens.textPrimary} !important; --text-primary: ${tokens.textPrimary} !important;` : ''}
        ${tokens.radiusBtn ? `--atom-radius-btn: ${tokens.radiusBtn} !important; --radius-btn: ${tokens.radiusBtn} !important;` : ''}
        ${tokens.radiusCard ? `--atom-radius-card: ${tokens.radiusCard} !important; --radius-card: ${tokens.radiusCard} !important; --rounded-card: ${tokens.radiusCard} !important;` : ''}
      }
    `;

    styleTag.innerHTML = cssRules;
    setIsApplied(true);
    setStatusMessage(`토큰이 성공적으로 주입되었습니다! (Primary: ${tokens.primary})`);
    setTimeout(() => setIsApplied(false), 1200);
  };

  // 초기 마운트 시 토큰 1회 적용
  useEffect(() => {
    applyTokensToDOM(parsedTokens);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown') && !file.name.endsWith('.txt')) {
      setStatusMessage('경고: .md 형식의 마크다운 파일을 업로드해주세요.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        setMarkdown(content);
        setFileName(file.name);
        const tokens = parseMarkdownToTokens(content);
        setParsedTokens(tokens);
        applyTokensToDOM(tokens);
        setStatusMessage(`파일 업로드 성공: ${file.name}`);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const loadPreset = (type: 'toss' | 'daangn' | 'custom') => {
    let presetContent = TOSS_MD_PRESET;
    let name = 'toss.md';
    if (type === 'daangn') {
      presetContent = DAANGN_MD_PRESET;
      name = 'daangn.md';
    } else if (type === 'custom') {
      presetContent = CUSTOM_MD_PRESET;
      name = 'custom-brand.md';
    }

    setMarkdown(presetContent);
    setFileName(name);
    const tokens = parseMarkdownToTokens(presetContent);
    setParsedTokens(tokens);
    applyTokensToDOM(tokens);
    setStatusMessage(`${name} 프리셋이 로드되고 토큰이 적용되었습니다.`);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'design-guide.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      data-hydrated={isHydrated ? "true" : "false"}
      className="w-full h-full flex flex-col bg-bg-card border-r border-border-standard text-text-standard select-none"
    >
      {/* 1. Header */}
      <div className="p-4 border-b border-border-standard flex flex-col gap-1.5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-primary/10 text-primary rounded-md">
              <FileText size={18} />
            </span>
            <h2 className="font-bold text-base text-text-title">디자인 가이드 .md 임포터</h2>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-hover text-text-sub border border-border-standard truncate max-w-[120px]">
            {fileName}
          </span>
        </div>
        <p className="text-xs text-text-sub">
          디자인 가이드 마크다운을 업로드하거나 편집하면 실시간 토큰으로 변환됩니다.
        </p>
      </div>

      {/* 2. Preset Quick Loader */}
      <div className="px-4 py-2.5 border-b border-border-standard bg-bg-wrapper/50 flex flex-col gap-2 shrink-0">
        <span className="text-[11px] font-semibold text-text-sub flex items-center gap-1">
          <Sparkles size={13} className="text-primary" /> 프리셋 템플릿 빠른 로드
        </span>
        <div className="flex gap-1.5 w-full">
          <button
            type="button"
            id="btn-preset-toss"
            data-testid="btn-preset-toss"
            onClick={() => loadPreset('toss')}
            className={`flex-1 py-1.5 px-2 rounded-common text-xs font-bold transition-all border ${fileName === 'toss.md' ? 'bg-primary text-white border-primary shadow-sm' : 'bg-bg-card border-border-standard text-text-standard hover:bg-bg-hover'}`}
          >
            Toss
          </button>
          <button
            type="button"
            id="btn-preset-daangn"
            data-testid="btn-preset-daangn"
            onClick={() => loadPreset('daangn')}
            className={`flex-1 py-1.5 px-2 rounded-common text-xs font-bold transition-all border ${fileName === 'daangn.md' ? 'bg-[#FF6F0F] text-white border-[#FF6F0F] shadow-sm' : 'bg-bg-card border-border-standard text-text-standard hover:bg-bg-hover'}`}
          >
            Daangn
          </button>
          <button
            type="button"
            id="btn-preset-custom"
            data-testid="btn-preset-custom"
            onClick={() => loadPreset('custom')}
            className={`flex-1 py-1.5 px-2 rounded-common text-xs font-bold transition-all border ${fileName === 'custom-brand.md' ? 'bg-[#6366F1] text-white border-[#6366F1] shadow-sm' : 'bg-bg-card border-border-standard text-text-standard hover:bg-bg-hover'}`}
          >
            Custom
          </button>
        </div>
      </div>

      {/* 3. Drag & Drop File Upload Area */}
      <div className="p-3 border-b border-border-standard shrink-0">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1.5 ${isDragging ? 'border-primary bg-primary/5' : 'border-border-standard hover:border-primary/60 hover:bg-bg-hover/50'}`}
        >
          <UploadCloud size={20} className="text-primary" />
          <div className="text-xs font-medium text-text-title">
            .md 파일 드래그 앤 드롭 또는 <span className="text-primary underline">파일 선택</span>
          </div>
          <span className="text-[10px] text-text-sub">toss.md, daangn.md, brand-guide.md 지원</span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.markdown,.txt"
            className="hidden"
            id="markdown-file-input"
            data-testid="markdown-file-input"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>

      {/* 4. Live Extracted Tokens Summary */}
      <div className="p-3 border-b border-border-standard bg-bg-card shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-text-title">추출된 핵심 토큰 (Live Preview)</span>
          <button
            type="button"
            onClick={() => applyTokensToDOM(parsedTokens)}
            className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
          >
            <RefreshCw size={11} /> 재동기화
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-1.5 rounded bg-bg-wrapper border border-border-standard">
            <div
              className="w-4 h-4 rounded border border-border-standard shrink-0 shadow-xs"
              style={{ backgroundColor: parsedTokens.primary }}
            />
            <div className="truncate">
              <span className="text-[10px] text-text-sub block">Primary</span>
              <span className="font-mono font-bold text-[11px] text-text-title">{parsedTokens.primary}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-bg-wrapper border border-border-standard">
            <div className="w-4 h-4 rounded border border-border-standard shrink-0 bg-primary/20 flex items-center justify-center text-[9px] font-bold">
              R
            </div>
            <div className="truncate">
              <span className="text-[10px] text-text-sub block">Radius</span>
              <span className="font-mono font-bold text-[11px] text-text-title">
                {parsedTokens.radiusBtn || '12px'} / {parsedTokens.radiusCard || '16px'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Markdown Textarea Editor */}
      <div className="flex-1 flex flex-col p-3 min-h-[160px] overflow-hidden">
        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="markdown-editor" className="text-xs font-bold text-text-title">
            마크다운 가이드 직접 작성 / 수정
          </label>
          <span className="text-[10px] text-text-sub font-mono">
            {markdown.split('\n').length} lines
          </span>
        </div>
        <textarea
          id="markdown-editor"
          data-testid="markdown-content-editor"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="# 새로운 디자인 가이드를 입력하세요..."
          className="flex-1 w-full p-2.5 font-mono text-xs text-text-standard bg-bg-wrapper border border-border-standard rounded-common resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary leading-relaxed select-text"
          spellCheck={false}
        />
      </div>

      {/* 6. Status and Action Buttons */}
      <div className="p-3 border-t border-border-standard bg-bg-wrapper flex flex-col gap-2 shrink-0">
        {statusMessage && (
          <div className="flex items-center gap-1.5 text-[11px] text-text-sub">
            <AlertCircle size={13} className="text-primary shrink-0" />
            <span className="truncate">{statusMessage}</span>
          </div>
        )}
        <div className="flex gap-2 w-full">
          <button
            type="button"
            onClick={handleDownloadMd}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 border border-border-standard rounded-common text-xs font-bold text-text-title hover:bg-bg-hover transition-colors"
          >
            <Download size={14} />
            .md 다운로드
          </button>
          <button
            type="button"
            id="apply-tokens-btn"
            data-testid="apply-tokens-btn"
            onClick={() => applyTokensToDOM(parsedTokens)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-primary text-white rounded-common text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            {isApplied ? <Check size={14} /> : <Sparkles size={14} />}
            {isApplied ? '적용 완료!' : '토큰 적용하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
