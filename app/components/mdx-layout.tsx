import Tab from "@/app/templates/Tab/Tab";
import { Card, CardContent } from "@/app/templates/Card/Card";
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
      tabs={[
        { id: "preview", target: ["preview"], tabItem: "preview" },
        { id: "code", target: ["code"], tabItem: "code" },
      ]}
      tabClass={"w-full border-[var(--color-border)] border-b"}
      tabNavItemClass={
        "px-[var(--spacing-global-x)] py-[var(--spacing-global-y)] font-bold "
      }
      tabNavItemActiveClass="border-b border-primary"
      tabContentClass="p-0 border-0 mt-0"
      tabContents={[
        {
          id: "previewContent",
          tag: "preview",
          content: (
            <>
              <Card className="my-4">
                <CardContent>
                  <Card type="group" className="flex justify-center">
                    {preview}
                  </Card>
                </CardContent>
              </Card>
            </>
          ),
        },
        {
          id: "codeContent",
          tag: "code",
          content: (
            <Card className="my-4">
              <CardContent noMargin>
                <CodeBlock language="typescript">{`${code}`}</CodeBlock>
              </CardContent>
            </Card>
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
    <Card className="my-4">
      <CardContent noMargin>
        <CodeBlock language="language">{`${code}`}</CodeBlock>
      </CardContent>
    </Card>
  );
}
