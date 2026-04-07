"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Eye, Code2 } from "lucide-react";
import Tab from "@/app/templates/Tab/Tab";

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
}: ComponentPreviewClientProps) {
  const tabs = [
    {
      id: "preview",
      target: ["preview-content"],
      tabItem: (
        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4" />
          <span>Preview</span>
        </div>
      ),
    },
    {
      id: "code",
      target: ["code-content"],
      tabItem: (
        <div className="flex items-center space-x-2">
          <Code2 className="h-4 w-4" />
          <span>Code</span>
        </div>
      ),
    },
  ];

  const tabContents = [
    {
      id: "preview-content",
      tag: "preview-content",
      content: (
        <div>
          {children}
        </div>
      ),
    },
    {
      id: "code-content",
      tag: "code-content",
      content: <div>{source}</div>,
    },
  ];

  return (
    <div className={cn("relative my-6 flex flex-col", className)}>
      <Tab
        tabs={tabs}
        tabContents={tabContents}
      />
    </div>
  );
}
