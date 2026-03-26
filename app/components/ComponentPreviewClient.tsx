"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, Eye, Code2 } from "lucide-react";

interface ComponentPreviewClientProps {
  children: React.ReactNode; // The live component preview
  source: React.ReactNode;   // The highlighted source code (ComponentSource)
  className?: string;
  previewClassName?: string;
}

/**
 * ComponentPreview의 클라이언트 사이드 인터랙티브 부분입니다.
 * 탭 전환(Preview/Code) 기능을 담당합니다.
 */
export function ComponentPreviewClient({
  children,
  source,
  className,
  previewClassName,
}: ComponentPreviewClientProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className={cn("relative my-6 flex flex-col space-y-4", className)}>
      <div className="flex items-center justify-between border-b pb-1">
        <div className="flex space-x-4">
          <button
            onClick={() => setTab("preview")}
            className={cn(
              "flex items-center space-x-2 border-b-2 py-2 text-sm font-medium transition-colors hover:text-[var(--color-primary)]",
              tab === "preview" 
                ? "border-[var(--color-primary)] text-[var(--color-primary)]" 
                : "border-transparent text-[var(--color-text-sub)]"
            )}
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setTab("code")}
            className={cn(
              "flex items-center space-x-2 border-b-2 py-2 text-sm font-medium transition-colors hover:text-[var(--color-primary)]",
              tab === "code" 
                ? "border-[var(--color-primary)] text-[var(--color-primary)]" 
                : "border-transparent text-[var(--color-text-sub)]"
            )}
          >
            <Code2 className="h-4 w-4" />
            <span>Code</span>
          </button>
        </div>
      </div>

      <div className="relative">
        {tab === "preview" ? (
          <div
            className={cn(
              "preview flex min-h-[350px] w-full items-center justify-center rounded-lg border border-[var(--color-border-standard)] bg-[var(--color-bg-card)] p-10",
              previewClassName
            )}
          >
            {children}
          </div>
        ) : (
          <div className="source animate-in fade-in duration-300">
            {source}
          </div>
        )}
      </div>
    </div>
  );
}
