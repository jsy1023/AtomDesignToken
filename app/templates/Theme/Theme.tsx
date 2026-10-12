"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "../Button/Button";
import { ModalContent } from "../Modal/Modal";

export interface ParsedTokens {
  primary: string;
  primaryHover?: string;
  primaryLight?: string;
  bgSurface?: string;
  bgCanvas?: string;
  textPrimary?: string;
  borderDefault?: string;
  radiusBtn?: string;
  radiusCard?: string;
  fontFamily?: string;
}

export const TOSS_MD_PRESET = `# Toss Style Design Guide (토스 스타일 디자인 가이드)

## 1. Brand & Colors
### Primary / Brand
- primary: #3182F6 # TDS canonical blue500
- primary-hover: #1B64DA
- primary-light: #E8F3FF

### Neutral / Surface
- bg-surface: #FFFFFF
- bg-canvas: #F2F4F6 # grey-100
- text-primary: #191F28 # grey-900
- border-default: #E5E8EB # grey-200

### Semantic
- success: #04C759
- warning: #FF9F00
- danger: #F04452

## 2. Rounded & Radius
- 버튼 곡률: 16px # radius-xl
- 카드 곡률: 20px # radius-2xl
- font-family: "Pretendard Variable", Pretendard, -apple-system, sans-serif
`;

export const DAANGN_MD_PRESET = `# Daangn Style Design Guide (당근 스타일 디자인 가이드)

## 1. Brand & Colors
### Primary / Brand
- primary: #FF6F0F # Daangn Warm Orange
- primary-hover: #E85E00
- primary-light: #FFF2EB

### Neutral / Surface
- bg-surface: #FFFFFF
- bg-canvas: #F8F9FA
- text-primary: #212124
- text-secondary: #4D5159
- border-default: #EAEBEE

### Semantic
- success: #0DCC5A
- warning: #FF9E00
- danger: #FF4D4D

## 2. Rounded & Radius
- 버튼 곡률: 12px
- 카드 곡률: 14px
- font-family: Pretendard, "Noto Sans KR", sans-serif
`;

export const CUSTOM_MD_PRESET = `# Custom Brand Design Guide

## 1. Brand & Colors
### Primary / Brand
- primary: #6366F1 # Indigo Modern
- primary-hover: #4F46E5
- primary-light: #EEF2FF

### Neutral / Surface
- bg-surface: #FFFFFF
- bg-canvas: #F9FAFB
- text-primary: #111827
- border-default: #E5E7EB

## 2. Rounded & Radius
- 버튼 곡률: 10px
- 카드 곡률: 16px
- font-family: "Inter", sans-serif
`;

// Markdown 텍스트에서 토큰을 추출하는 파서 함수
export const parseMarkdownToTokens = (markdown: string): ParsedTokens => {
  const result: ParsedTokens = {
    primary: "#3182F6",
    radiusBtn: "16px",
    radiusCard: "20px",
    bgSurface: "#FFFFFF",
    bgCanvas: "#F2F4F6",
    textPrimary: "#191F28",
    borderDefault: "#E5E8EB",
  };

  const blue500Match =
    markdown.match(/blue-500:[^#\n]*[#]\s*([#][0-9a-fA-F]{3,8})/i) ||
    markdown.match(/blue-500:[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  const explicitPrimaryMatch = markdown.match(
    /(?:primary|메인 포인트 컬러|Primary Color)[^#\n]*([#][0-9a-fA-F]{3,8})/i
  );

  if (explicitPrimaryMatch && explicitPrimaryMatch[1]) {
    result.primary = explicitPrimaryMatch[1];
  } else if (blue500Match && blue500Match[1]) {
    result.primary = blue500Match[1];
  }

  const hoverMatch =
    markdown.match(/blue-600:[^#\n]*[#]\s*([#][0-9a-fA-F]{3,8})/i) ||
    markdown.match(/primary-hover[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  if (hoverMatch && hoverMatch[1]) {
    result.primaryHover = hoverMatch[1];
  }

  const lightMatch =
    markdown.match(/blue-50:[^#\n]*[#]\s*([#][0-9a-fA-F]{3,8})/i) ||
    markdown.match(/primary-light[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  if (lightMatch && lightMatch[1]) {
    result.primaryLight = lightMatch[1];
  }

  const surfaceMatch =
    markdown.match(/tds-bg-primary:\s*"\{colors\.white\}"/i) ||
    markdown.match(/bg-surface[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  if (surfaceMatch) {
    result.bgSurface = "#FFFFFF";
  }

  const canvasMatch =
    markdown.match(/grey-100:[^#\n]*[#]\s*([#][0-9a-fA-F]{3,8})/i) ||
    markdown.match(/bg-canvas[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  if (canvasMatch && canvasMatch[1]) {
    result.bgCanvas = canvasMatch[1];
  }

  const textMatch =
    markdown.match(/grey-900:[^#\n]*[#]\s*([#][0-9a-fA-F]{3,8})/i) ||
    markdown.match(/text-primary[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  if (textMatch && textMatch[1]) {
    result.textPrimary = textMatch[1];
  }

  // Border Default 추출
  const borderMatch =
    markdown.match(/grey-200:[^#\n]*[#]\s*([#][0-9a-fA-F]{3,8})/i) ||
    markdown.match(/border-default[^#\n]*([#][0-9a-fA-F]{3,8})/i) ||
    markdown.match(/border-secondary[^#\n]*([#][0-9a-fA-F]{3,8})/i) ||
    markdown.match(/(?:테두리|보더|border)[^#\n]*([#][0-9a-fA-F]{3,8})/i);
  if (borderMatch && borderMatch[1]) {
    result.borderDefault = borderMatch[1];
  }

  const btnRadiusMatch =
    markdown.match(/radius-xl:\s*(\d+)\s*px/i) ||
    markdown.match(
      /(?:버튼\s*(?:곡률|라운딩)|radius-btn|btn-radius)[^0-9\n]*(\d+)\s*px/i
    );
  if (btnRadiusMatch && btnRadiusMatch[1]) {
    result.radiusBtn = `${btnRadiusMatch[1]}px`;
  }

  const cardRadiusMatch =
    markdown.match(/radius-2xl:\s*(\d+)\s*px/i) ||
    markdown.match(
      /(?:카드\s*(?:곡률|라운딩)|radius-card|card-radius)[^0-9\n]*(\d+)\s*px/i
    );
  if (cardRadiusMatch && cardRadiusMatch[1]) {
    result.radiusCard = `${cardRadiusMatch[1]}px`;
  }

  const fontMatch =
    markdown.match(/fontFamily:\s*"?([^"\n]+)"?/i) ||
    markdown.match(/font-family[^:\n]*:\s*([^\n]+)/i);
  if (fontMatch && fontMatch[1]) {
    result.fontFamily = fontMatch[1].trim();
  }

  return result;
};

// CSS 변수 주입 함수
export const applyTokensToDOM = (tokens: ParsedTokens) => {
  if (typeof document === "undefined") return;
  const styleId = "atom-markdown-guide-tokens";
  let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  const cssRules = `
    :root {
      --primary: ${tokens.primary} !important;
      --color-primary: ${tokens.primary} !important;
      --atom-color-primary: ${tokens.primary} !important;
      --atom-primary: ${tokens.primary} !important;
      ${tokens.primaryHover ? `--primary-hover: ${tokens.primaryHover} !important; --atom-primary-hover: ${tokens.primaryHover} !important;` : ""}
      ${tokens.primaryLight ? `--primary-light: ${tokens.primaryLight} !important; --atom-primary-light: ${tokens.primaryLight} !important;` : ""}
      ${tokens.bgSurface ? `--bg-surface: ${tokens.bgSurface} !important; --atom-bg-surface: ${tokens.bgSurface} !important; --color-bg-card: ${tokens.bgSurface} !important;` : ""}
      ${tokens.bgCanvas ? `--bg-canvas: ${tokens.bgCanvas} !important; --atom-bg-canvas: ${tokens.bgCanvas} !important; --color-bg-wrapper: ${tokens.bgCanvas} !important;` : ""}
      ${tokens.textPrimary ? `--text-primary: ${tokens.textPrimary} !important; --atom-text-primary: ${tokens.textPrimary} !important; --color-text-standard: ${tokens.textPrimary} !important;` : ""}
      ${tokens.borderDefault ? `
        --border-default: ${tokens.borderDefault} !important;
        --atom-border-default: ${tokens.borderDefault} !important;
        --border-standard: ${tokens.borderDefault} !important;
        --color-border-standard: ${tokens.borderDefault} !important;
      ` : ""}
      ${tokens.radiusBtn ? `--radius-btn: ${tokens.radiusBtn} !important; --atom-radius-btn: ${tokens.radiusBtn} !important;` : ""}
      ${tokens.radiusCard ? `--radius-card: ${tokens.radiusCard} !important; --atom-radius-card: ${tokens.radiusCard} !important; --rounded-card: ${tokens.radiusCard} !important;` : ""}
      ${tokens.fontFamily ? `--font-family-base: ${tokens.fontFamily} !important;` : ""}
    }
  `;

  styleTag.textContent = cssRules;
};

// 독립형 Markdown 에디터 컴포넌트
export const MarkdownEditor = ({
  initialMarkdown,
  onApply,
}: {
  initialMarkdown?: string;
  onApply?: (tokens: ParsedTokens, markdown: string) => void;
}) => {
  const [markdown, setMarkdown] = useState<string>(
    initialMarkdown || TOSS_MD_PRESET
  );
  const [fileName, setFileName] = useState<string>("toss.md");
  const [isDragging, setIsDragging] = useState(false);
  const [parsedTokens, setParsedTokens] = useState<ParsedTokens>(() =>
    parseMarkdownToTokens(initialMarkdown || TOSS_MD_PRESET)
  );
  const [isApplied, setIsApplied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMd = localStorage.getItem("atom-markdown-guide");
      if (savedMd && !initialMarkdown) {
        setMarkdown(savedMd);
        setFileName("custom-guide.md");
      }
    }
  }, [initialMarkdown]);

  useEffect(() => {
    const tokens = parseMarkdownToTokens(markdown);
    setParsedTokens(tokens);
  }, [markdown]);

  const handleApply = () => {
    applyTokensToDOM(parsedTokens);
    if (typeof window !== "undefined") {
      localStorage.setItem("atom-markdown-guide", markdown);
      localStorage.setItem("atom-custom-tokens", JSON.stringify(parsedTokens));
      window.dispatchEvent(new Event("storage"));
    }
    setIsApplied(true);
    setStatusMessage(`토큰이 적용되었습니다. (Primary: ${parsedTokens.primary})`);
    setTimeout(() => setIsApplied(false), 1500);

    if (onApply) {
      onApply(parsedTokens, markdown);
    }
  };

  const handleFileUpload = (file: File) => {
    if (
      !file.name.endsWith(".md") &&
      !file.name.endsWith(".markdown") &&
      !file.name.endsWith(".txt")
    ) {
      setStatusMessage("경고: .md 형식의 마크다운 파일을 업로드해주세요.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        setMarkdown(content);
        setFileName(file.name);
        setStatusMessage(`파일 업로드 완료: ${file.name}`);
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

  const loadPreset = (type: "toss" | "daangn" | "custom") => {
    let presetContent = TOSS_MD_PRESET;
    let name = "toss.md";
    if (type === "daangn") {
      presetContent = DAANGN_MD_PRESET;
      name = "daangn.md";
    } else if (type === "custom") {
      presetContent = CUSTOM_MD_PRESET;
      name = "custom-brand.md";
    }

    setMarkdown(presetContent);
    setFileName(name);
    setStatusMessage(`${name} 프리셋이 로드되었습니다.`);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "design-guide.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      {/* 1. 컨트롤 패널 (프리셋 선택 & 업로드) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-common border border-border-standard">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-text-sub mr-1">
            프리셋 템플릿:
          </span>
          <button
            type="button"
            id="btn-preset-toss"
            data-testid="btn-preset-toss"
            onClick={() => loadPreset("toss")}
            className={`px-3 py-1.5 text-xs font-medium rounded-common border transition-colors ${
              fileName === "toss.md"
                ? "bg-primary text-white border-primary"
                : "bg-bg-card border-border-standard text-text-standard hover:bg-bg-hover"
            }`}
          >
            Toss
          </button>
          <button
            type="button"
            id="btn-preset-daangn"
            data-testid="btn-preset-daangn"
            onClick={() => loadPreset("daangn")}
            className={`px-3 py-1.5 text-xs font-medium rounded-common border transition-colors ${
              fileName === "daangn.md"
                ? "bg-[#FF6F0F] text-white border-[#FF6F0F]"
                : "bg-bg-card border-border-standard text-text-standard hover:bg-bg-hover"
            }`}
          >
            Daangn
          </button>
          <button
            type="button"
            id="btn-preset-custom"
            data-testid="btn-preset-custom"
            onClick={() => loadPreset("custom")}
            className={`px-3 py-1.5 text-xs font-medium rounded-common border transition-colors ${
              fileName === "custom-brand.md"
                ? "bg-[#6366F1] text-white border-[#6366F1]"
                : "bg-bg-card border-border-standard text-text-standard hover:bg-bg-hover"
            }`}
          >
            Custom
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            id="markdown-file-input"
            data-testid="markdown-file-input"
            accept=".md,.markdown,.txt"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 text-xs font-medium rounded-common bg-bg-card border border-border-standard text-text-standard hover:bg-bg-hover flex items-center gap-1"
          >
            <span className="material-symbols-outlined !text-base">upload_file</span>
            <span>.md 파일 열기</span>
          </button>
          <button
            type="button"
            id="btn-download-md"
            data-testid="btn-download-md"
            onClick={handleDownload}
            className="px-3 py-1.5 text-xs font-medium rounded-common bg-bg-card border border-border-standard text-text-standard hover:bg-bg-hover flex items-center gap-1"
          >
            <span className="material-symbols-outlined !text-base">download</span>
            <span>다운로드</span>
          </button>
        </div>
      </div>

      {/* 2. 드래그 앤 드롭 영역 */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-common p-3 text-center cursor-pointer transition-colors flex items-center justify-center gap-2 ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border-standard hover:border-primary/60 hover:bg-bg-hover/40"
        }`}
      >
        <span className="material-symbols-outlined text-primary !text-lg">
          cloud_upload
        </span>
        <span className="text-xs text-text-sub">
          마크다운(.md) 파일을 여기에 드래그 앤 드롭하거나 클릭하여 가져오세요.
        </span>
      </div>

      {/* 3. 에디터 및 실시간 추출 토큰 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 마크다운 텍스트 입력창 */}
        <div className="lg:col-span-2 flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs text-text-sub">
            <span className="font-semibold text-text-standard flex items-center gap-1">
              <span className="material-symbols-outlined !text-base">edit_note</span>
              마크다운 편집
            </span>
            <span className="font-mono">
              {fileName} ({markdown.split("\n").length}줄)
            </span>
          </div>
          <textarea
            id="markdown-editor"
            data-testid="markdown-content-editor"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck={false}
            placeholder="# 디자인 가이드 마크다운을 입력하세요..."
            rows={10}
            className="w-full p-2.5 font-mono text-xs text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800/80 border border-border-standard rounded-common resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary leading-relaxed h-[270px]"
          />
        </div>

        {/* 파싱된 토큰 프리뷰 */}
        <div className="flex flex-col gap-2 p-2.5 bg-zinc-50 dark:bg-zinc-800/80 rounded-common border border-border-standard h-[300px]">
          <div className="flex items-center justify-between pb-1.5 border-b border-border-standard">
            <span className="text-xs font-bold text-text-standard flex items-center gap-1">
              <span className="material-symbols-outlined !text-base">auto_awesome</span>
              추출된 디자인 토큰
            </span>
          </div>

          <div className="flex flex-col gap-1.5 text-xs overflow-y-auto pr-0.5">
            {/* Primary Color */}
            <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-zinc-900 border border-border-standard">
              <div className="flex items-center gap-1.5">
                <div
                  id="preview-token-primary-color"
                  data-testid="preview-token-primary-color"
                  className="w-4 h-4 rounded border border-border-standard shadow-xs shrink-0"
                  style={{ backgroundColor: parsedTokens.primary }}
                />
                <span className="text-text-sub font-medium">Primary</span>
              </div>
              <span id="preview-token-primary-hex" data-testid="preview-token-primary-hex" className="font-mono font-bold text-text-standard">
                {parsedTokens.primary}
              </span>
            </div>

            {/* Hover / Light */}
            {parsedTokens.primaryHover && (
              <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-zinc-900 border border-border-standard">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded border border-border-standard shadow-xs shrink-0"
                    style={{ backgroundColor: parsedTokens.primaryHover }}
                  />
                  <span className="text-text-sub font-medium">Hover</span>
                </div>
                <span className="font-mono text-text-standard">
                  {parsedTokens.primaryHover}
                </span>
              </div>
            )}

            {/* Radius */}
            <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-zinc-900 border border-border-standard">
              <span className="text-text-sub font-medium">버튼 곡률</span>
              <span id="preview-token-radius-btn" data-testid="preview-token-radius-btn" className="font-mono font-bold text-text-standard">
                {parsedTokens.radiusBtn || "16px"}
              </span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-zinc-900 border border-border-standard">
              <span className="text-text-sub font-medium">카드 곡률</span>
              <span id="preview-token-radius-card" data-testid="preview-token-radius-card" className="font-mono font-bold text-text-standard">
                {parsedTokens.radiusCard || "20px"}
              </span>
            </div>

            {/* Background / Text */}
            <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-zinc-900 border border-border-standard">
              <span className="text-text-sub font-medium">배경</span>
              <span className="font-mono text-text-standard">
                {parsedTokens.bgCanvas || "#F2F4F6"}
              </span>
            </div>

            {/* Border */}
            <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-zinc-900 border border-border-standard">
              <div className="flex items-center gap-1.5">
                <div
                  id="preview-token-border-color"
                  data-testid="preview-token-border-color"
                  className="w-4 h-4 rounded border border-border-standard shadow-xs shrink-0"
                  style={{ backgroundColor: parsedTokens.borderDefault || "#E5E8EB" }}
                />
                <span className="text-text-sub font-medium">테두리</span>
              </div>
              <span id="preview-token-border-hex" data-testid="preview-token-border-hex" className="font-mono text-text-standard">
                {parsedTokens.borderDefault || "#E5E8EB"}
              </span>
            </div>
          </div>

          <div className="mt-auto pt-1">
            <Button
              type="primary"
              id="apply-tokens-btn"
              data-testid="apply-tokens-btn"
              onClick={handleApply}
              style={{ width: "100%" }}
            >
              <div className="flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined !text-base">
                  {isApplied ? "check" : "bolt"}
                </span>
                <span>{isApplied ? "적용 완료!" : "토큰 즉시 적용"}</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="text-xs text-text-sub flex items-center gap-1">
          <span className="material-symbols-outlined !text-sm text-primary">
            info
          </span>
          <span>{statusMessage}</span>
        </div>
      )}
    </div>
  );
};

// 모달 트리거 형태의 MD 파일 편집기 (기존 ThemeSelector 대체)
export const ThemeSelector = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ width: "100%" }}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            edit_document
          </span>
          <span>디자인 가이드 (.md) 편집기</span>
        </div>
      </Button>

      <ModalContent
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        modalTitle="디자인 가이드 (.md) 편집기"
        size="large"
        modalFooter={
          <div className="flex justify-end gap-2 w-full">
            <Button type="gray" onClick={() => setIsModalOpen(false)}>
              닫기
            </Button>
          </div>
        }
      >
        <div className="p-2">
          <MarkdownEditor onApply={() => setIsModalOpen(false)} />
        </div>
      </ModalContent>
    </>
  );
};

// 전역 토큰 상태 유지 및 동기화 Provider
export const ThemeProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const applyStoredTokens = () => {
      try {
        const storedTokens = localStorage.getItem("atom-custom-tokens");
        if (storedTokens) {
          const parsed = JSON.parse(storedTokens);
          applyTokensToDOM(parsed);
        }
      } catch (e) {
        console.error("Failed to parse stored tokens:", e);
      }
    };

    applyStoredTokens();
    window.addEventListener("storage", applyStoredTokens);
    setIsMounted(true);

    return () => {
      window.removeEventListener("storage", applyStoredTokens);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return null;
};

