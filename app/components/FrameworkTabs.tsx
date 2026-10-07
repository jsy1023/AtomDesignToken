"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface FrameworkTabsProps {
  react?: string;
  vue?: string;
  vanilla?: string;
  angular?: string;
}

const FRAMEWORKS = [
  { id: "react", label: "React / Next.js", icon: "⚛️" },
  { id: "vue", label: "Vue 3", icon: "💚" },
  { id: "vanilla", label: "Vanilla / jQuery", icon: "🌐" },
  { id: "angular", label: "Angular", icon: "🅰️" },
] as const;

export default function FrameworkTabs({ react, vue, vanilla, angular }: FrameworkTabsProps) {
  const codeMap: Record<string, string | undefined> = { react, vue, vanilla, angular };
  
  // 첫 번째로 존재하는 프레임워크 선택
  const availableFrameworks = FRAMEWORKS.filter((f) => !!codeMap[f.id]);
  const [activeTab, setActiveTab] = useState<string>(
    availableFrameworks[0]?.id || "react"
  );
  const [copied, setCopied] = useState(false);

  const activeCode = codeMap[activeTab] || "";

  const handleCopy = async () => {
    if (!activeCode) return;
    await navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl border border-border-standard bg-bg-surface overflow-hidden shadow-sm">
      {/* 탭 헤더 */}
      <div className="flex items-center justify-between border-b border-border-standard bg-bg-canvas px-3 py-2">
        <div className="flex items-center gap-1">
          {availableFrameworks.map((fw) => (
            <button
              key={fw.id}
              onClick={() => setActiveTab(fw.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                activeTab === fw.id
                  ? "bg-bg-surface text-text-title shadow-xs border border-border-standard"
                  : "text-text-sub hover:text-text-title hover:bg-bg-surface/50"
              )}
            >
              <span>{fw.icon}</span>
              <span>{fw.label}</span>
            </button>
          ))}
        </div>

        {/* 복사 버튼 */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium text-text-sub hover:text-text-title hover:bg-bg-surface transition-all border border-transparent hover:border-border-standard"
          title="코드 복사"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-500">복사됨!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>복사</span>
            </>
          )}
        </button>
      </div>

      {/* 코드 영역 */}
      <div className="p-4 bg-[#1e1e1e] text-[#d4d4d4] overflow-x-auto font-mono text-sm leading-relaxed">
        <pre className="!m-0 !p-0 !bg-transparent">
          <code>{activeCode.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
