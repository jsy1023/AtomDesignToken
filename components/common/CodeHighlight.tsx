'use client';

import React, { useMemo } from 'react';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml'; // html, jsx
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';

// Register core languages
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('shell', bash);

export interface CodeHighlightProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeHighlight({ code, language = 'typescript', className = '' }: CodeHighlightProps) {
  const highlighted = useMemo(() => {
    try {
      const validLang = hljs.getLanguage(language) ? language : 'typescript';
      return hljs.highlight(code, { language: validLang, ignoreIllegals: true }).value;
    } catch {
      return code;
    }
  }, [code, language]);

  return (
    <pre className={`text-xs font-mono overflow-x-auto leading-relaxed ${className}`}>
      <code
        className={`hljs language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  );
}
