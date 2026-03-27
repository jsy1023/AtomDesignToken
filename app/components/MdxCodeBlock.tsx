import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { CodeBlockClient } from "./CodeBlockClient";
import { cn } from "@/lib/utils";

interface MdxCodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * MDX 마크다운 코드블록(```tsx 등)에 highlight.js 색상을 적용하는 서버 컴포넌트.
 * mdx-components.tsx의 pre 핸들러에서 사용합니다.
 */
export default async function MdxCodeBlock({ children, className }: MdxCodeBlockProps) {
  // MDX가 넘겨주는 children은 <code>...</code> 요소입니다.
  // mdx-components에서 code를 커스텀 함수로 오버라이드했기 때문에 child.type === "code" 검사는 실패합니다.
  let rawCode = "";
  let language = "plaintext";

  const codeChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child)
  ) as React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;

  if (codeChild) {
    // language-tsx → tsx
    const langClass = codeChild.props.className || "";
    const match = langClass.match(/language-(\w+)/);
    if (match) language = match[1];

    // 텍스트 추출
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(extractText).join("");
      if (React.isValidElement(node))
        return extractText((node.props as { children?: React.ReactNode }).children);
      return "";
    };
    rawCode = extractText(codeChild.props.children);
  }

  // hljs 문법 강조
  let highlighted = rawCode;
  try {
    highlighted = hljs.highlight(rawCode, { language }).value;
  } catch {
    highlighted = hljs.highlightAuto(rawCode).value;
  }

  return (
    <CodeBlockClient rawCode={rawCode} className={cn("my-6", className)}>
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
        {/* 언어 배지 */}
        <div className="flex items-center border-b border-zinc-800 bg-zinc-900/70 px-4 py-2">
          <span className="text-xs font-medium text-zinc-400">{language}</span>
        </div>
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
