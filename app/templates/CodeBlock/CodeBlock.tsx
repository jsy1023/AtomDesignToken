"use client";
import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // 스타일 파일

const CodeBlock = ({
  language,
  children,
}: {
  language: string;
  children: React.ReactNode;
}) => {
  const codeRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current); // 코드 블록 하이라이트
    }
  }, [children]);

  const handleCopy = async () => {
    if (!codeRef.current) return;

    try {
      await navigator.clipboard.writeText(codeRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // 1.5초 후 메시지 제거
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  return (
    <div className="relative">
      <pre>
        <code ref={codeRef} className={language}>
          {children}
        </code>
      </pre>

      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded hover:bg-gray-200"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CodeBlock;
