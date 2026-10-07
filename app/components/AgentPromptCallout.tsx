"use client";

import React, { useState } from "react";
import { Bot, Copy, Check, Sparkles } from "lucide-react";

interface AgentPromptProps {
  title?: string;
  prompt: string;
}

export default function AgentPromptCallout({
  title = "AI Agent에게 지시하기 (Prompt)",
  prompt,
}: AgentPromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-transparent dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-transparent p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500 text-white shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-text-title flex items-center gap-1.5">
            {title}
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-zinc-800 text-text-title shadow-xs border border-border-standard hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-500">프롬프트 복사 완료!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>프롬프트 복사</span>
            </>
          )}
        </button>
      </div>

      <div className="rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-blue-500/10 p-3.5 font-mono text-xs text-text-body leading-relaxed select-all">
        {prompt}
      </div>
    </div>
  );
}
