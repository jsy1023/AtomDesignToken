import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { getFileSource, getComponentSource } from "@/lib/registry-utils";
import { cn } from "@/lib/utils";
import { CodeBlockClient } from "./CodeBlockClient";

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
    <CodeBlockClient rawCode={code} className={cn("my-6", className)}>
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
        {/* 파일명 헤더 */}
        <div className="flex items-center border-b border-zinc-800 bg-zinc-900/70 px-4 py-2">
          <span className="text-xs font-medium text-zinc-400">
            {name ? `${name}.tsx` : src || "Source"}
          </span>
        </div>
        {/* 코드 본문 */}
        <pre className="no-scrollbar overflow-x-auto p-4 text-sm leading-relaxed">
          <code
            className={`hljs language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
    </CodeBlockClient>
  );
}
