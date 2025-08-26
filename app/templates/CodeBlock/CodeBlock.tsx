"use client";
import { useLayoutEffect, useRef, useState } from "react";
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
  const [isHeightCheck, setHeightCheck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current); // 코드 블록 하이라이트

      if (codeRef.current.offsetHeight >= 600) {
        setHeightCheck(true);
      }
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
      <pre className={`${isOpen ? "max-h-fit" : "max-h-60"}  overflow-hidden`}>
        <code ref={codeRef} className={language}>
          {children}
        </code>
      </pre>

      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-[var(--background-card)] hover:bg-[var(--background-wrapper)] text-[var(--text-standard)] text-xs px-2 py-1 rounded cursor-pointer "
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      {isHeightCheck ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
         w-full cursor-pointer hover:bg-[var(--background-wrapper)] text-center py-2 px-8"
        >
          {isOpen ? "Close" : "Open"}
        </button>
      ) : null}
    </div>
  );
};

export default CodeBlock;
