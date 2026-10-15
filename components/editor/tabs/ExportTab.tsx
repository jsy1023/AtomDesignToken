'use client';

import React, { useState } from 'react';
import { useThemeEditor } from '../ThemeEditorProvider';
import { exportToCSS, exportToTailwind, exportToTokensJson } from '@/lib/services/themeEngine';
import { Copy, Check, Download, FileCode, Sparkles } from 'lucide-react';

export function ExportTab() {
  const { theme } = useThemeEditor();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const cssCode = exportToCSS(theme);
  const tailwindCode = exportToTailwind(theme);
  const tokensJson = exportToTokensJson(theme);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([tokensJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'atomsystem-theme-tokens.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <p>
          편집한 색상과 h1~h6 텍스트 스타일을 바로 복사하여 본 프로젝트나 외부 디자인 시스템(Figma Tokens Studio, Tailwind, 바닐라 CSS)에 붙여넣을 수 있습니다.
        </p>
      </div>

      {/* 1. Pure CSS Variables */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-neutral-500" />
            <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              CSS Variables (:root)
            </h4>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(cssCode, 'css')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-850 transition-colors"
          >
            {copiedType === 'css' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">복사 완료</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>CSS 복사</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-3 text-[11px] font-mono rounded-xl bg-neutral-900 text-neutral-200 max-h-40 overflow-y-auto border border-neutral-800">
          <code>{cssCode}</code>
        </pre>
      </div>

      {/* 2. tokens.json (W3C DTCG Format) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-emerald-500" />
            <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              tokens.json (W3C DTCG 호환)
            </h4>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={downloadJson}
              className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-850 transition-colors"
            >
              <Download className="w-3 h-3 text-neutral-500" />
              <span>다운로드</span>
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(tokensJson, 'json')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-850 transition-colors"
            >
              {copiedType === 'json' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">복사 완료</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>JSON 복사</span>
                </>
              )}
            </button>
          </div>
        </div>
        <pre className="p-3 text-[11px] font-mono rounded-xl bg-neutral-900 text-neutral-200 max-h-40 overflow-y-auto border border-neutral-800">
          <code>{tokensJson}</code>
        </pre>
      </div>

      {/* 3. Tailwind Config */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-cyan-500" />
            <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              Tailwind Config Extension
            </h4>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(tailwindCode, 'tailwind')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-850 transition-colors"
          >
            {copiedType === 'tailwind' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">복사 완료</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Config 복사</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-3 text-[11px] font-mono rounded-xl bg-neutral-900 text-neutral-200 max-h-40 overflow-y-auto border border-neutral-800">
          <code>{tailwindCode}</code>
        </pre>
      </div>
    </div>
  );
}
