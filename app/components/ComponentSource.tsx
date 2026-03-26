import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { getFileSource, getComponentSource } from "@/lib/registry-utils";
import { cn } from "@/lib/utils";

interface ComponentSourceProps {
  name?: string;
  src?: string;
  language?: string;
  className?: string;
}

/**
 * 서버 사이드에서 소스 코드를 읽어와 하이라이팅하여 표시합니다.
 */
export default async function ComponentSource({
  name,
  src,
  language = "tsx",
  className,
}: ComponentSourceProps) {
  let code = "";

  if (name) {
    code = (await getComponentSource(name)) || "// Source not found";
  } else if (src) {
    code = (await getFileSource(src)) || "// File not found";
  }

  // Server-side highlighting
  const highlighted = hljs.highlight(code, { language }).value;

  return (
    <div className={cn("relative my-6 overflow-hidden rounded-lg border bg-zinc-950 text-zinc-50", className)}>
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
        <div className="text-xs font-medium text-zinc-400">
          {name || src || "Source"}
        </div>
      </div>
      <pre className="no-scrollbar overflow-x-auto p-4 text-sm leading-relaxed">
        <code 
          className={`hljs language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }} 
        />
      </pre>
    </div>
  );
}
