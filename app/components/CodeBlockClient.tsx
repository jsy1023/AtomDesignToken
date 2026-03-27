"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Copy, Check } from "lucide-react";

interface CodeBlockClientProps {
  children: React.ReactNode;
  rawCode: string;
  className?: string;
  /** 접히는 최대 높이 (px). 이 이상이면 접기/펼치기 버튼 표시 */
  collapseHeight?: number;
}

export function CodeBlockClient({
  children,
  rawCode,
  className,
  collapseHeight = 320,
}: CodeBlockClientProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group", className)}>
      {/* 복사 버튼 */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-md bg-zinc-700/80 px-2 py-1 text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-600"
        title="코드 복사"
      >
        {copied ? (
          <><Check className="h-3 w-3 text-green-400" /><span>Copied!</span></>
        ) : (
          <><Copy className="h-3 w-3" /><span>Copy</span></>
        )}
      </button>

      {/* 코드 영역 */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: expanded ? "none" : `${collapseHeight}px` }}
      >
        {children}
      </div>

      {/* Collapse 버튼 — 내용이 collapseHeight 초과여야 의미있으나 항상 표시 */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-center gap-1 rounded-b-lg border-t border-zinc-800 bg-zinc-900 py-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        <ChevronsUpDown className="h-3.5 w-3.5" />
        {expanded ? "접기" : "펼치기"}
      </button>
    </div>
  );
}
