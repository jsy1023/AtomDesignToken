import Tab from "@/app/templates/Tab/Tab";
import { Card } from "@/app/templates/Card/Card";
import React from "react";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";

export default function PreviewLayout({
  preview,
  code,
}: {
  preview: React.ReactNode;
  code?: string;
}) {
  return (
    <Tab
      tabContentClass="tab-content has-[.code-block-content]:!p-0 border-t-0"
      expectionValue="code"
      expectionLayout="code-block-content"
      tabs={[
        { id: "preview", target: ["preview"], tabItem: "preview" },
        { id: "code", target: ["code"], tabItem: "code" },
      ]}
      tabContents={[
        {
          id: "previewContent",
          tag: "preview",
          content: (
            <div className="flex justify-center w-full my-4">
              {preview}
            </div>
          ),
        },
        {
          id: "codeContent",
          tag: "code",
          content: (
            <div className="w-full">
              <CodeBlock language="typescript">{`${code}`}</CodeBlock>
            </div>
          ),
        },
      ]}
    />
  );
}

export function CodeLayout({
  code,
  language = "typescript",
}: {
  code?: string;
  language?: string;
}) {
  return (
    <Card className="my-4 overflow-hidden !p-0">
      <CodeBlock language={language}>{`${code}`}</CodeBlock>
    </Card>
  );
}
