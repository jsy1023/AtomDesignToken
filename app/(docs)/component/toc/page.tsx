import type { Metadata } from "next";

import { Card, CardContent } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";
import TOC from "@/app/templates/TOC/TOC";

export const metadata: Metadata = {
  title: "TOC",
  description:
    "웹페이지의 전체 구조를 한눈에 보여주는 목록으로, 페이지의 제목과 위치(페이지 번호 또는 링크)를 정리해 독자가 원하는 내용을 빠르게 찾을 수 있도록 도와줍니다.",
  keywords: ["TOC"],
};

const ComponentToc = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">TOC</h1>
      <p>
        &nbsp;웹페이지의 전체 구조를 한눈에 보여주는 목록으로, 페이지의 제목과
        위치(페이지 번호 또는 링크)를 정리해 원하는 내용을 빠르게 찾을 수 있도록
        도와줍니다.
      </p>
      <hr className="my-4" />
      <Tab
        tabs={[
          { id: "preview", target: ["preview"], tabItem: "preview" },
          { id: "code", target: ["code"], tabItem: "code" },
        ]}
        tabClass={"w-full border-[var(--color-border)] border-b"}
        tabNavItemClass={
          "px-[var(--global-padding-x)] py-[var(--global-padding-y)] font-bold "
        }
        tabNavItemActiveClass="border-b border-primary"
        tabContentClass="p-0 border-0 mt-0"
        tabContents={[
          {
            id: "previewContent",
            tag: "preview",
            content: (
              <>
                <Card className="my-4 ">
                  <TOC />
                </Card>

                {/* <Card className="my-4">
                  <CardContent>
                    <Table
                      tableData={[
                        {
                          Prop: "label",
                          Type: "string",
                          Default: "-",
                        },
                        {
                          Prop: "onChange",
                          Type: "() => void",
                          Default: "-",
                        },
                        {
                          Prop: "value",
                          Type: "string",
                          Default: "-",
                        },
                        {
                          Prop: "defaultChecked",
                          Type: "boolean",
                          Default: "false",
                        },
                        {
                          Prop: "disabled",
                          Type: "boolean",
                          Default: "false",
                        },
                        {
                          Prop: "required",
                          Type: "boolean",
                          Default: "false",
                        },
                      ]}
                    />
                  </CardContent>
                </Card> */}
              </>
            ),
          },
          {
            id: "codeContent",
            tag: "code",
            content: (
              <Card className="my-4">
                <CardContent noMargin>
                  <CodeBlock language="typescript">
                    {`import { TOC } from "@/app/components/TOC/TOC" 

<TOC />`}
                  </CodeBlock>
                </CardContent>
              </Card>
            ),
          },
        ]}
      />

      <hr className="my-4" />
      <h2>Installation</h2>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="npm">{`npx atomsystem-add TOC`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Usage</h2>

      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { TOC } from "@/app/components/TOC/TOC" `}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">{`<TOC />`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Example</h2>
      <h3 className="mt-4">With Label</h3>
      <Tab
        tabs={[
          {
            id: "previewWithLabel",
            target: ["previewWithLabel"],
            tabItem: "preview",
          },
          {
            id: "codeWithLabel",
            target: ["codeWithLabel"],
            tabItem: "code",
          },
        ]}
        tabClass={"w-full border-[var(--color-border)] border-b"}
        tabNavItemClass={
          "px-[var(--global-padding-x)] py-[var(--global-padding-y)] font-bold "
        }
        tabNavItemActiveClass="border-b border-primary"
        tabContentClass={"py-4"}
        tabContents={[
          {
            id: "previewContentWithLabel",
            tag: "previewWithLabel",
            content: (
              <Card>
                <TOC />
              </Card>
            ),
          },
          {
            id: "codeContentWithLabel",
            tag: "codeWithLabel",
            content: (
              <Card className="my-4">
                <CardContent noMargin>
                  <CodeBlock language="typescript">
                    {`import { TOC } from "@/app/components/TOC/TOC" 

<TOC />`}
                  </CodeBlock>
                </CardContent>
              </Card>
            ),
          },
        ]}
      />
    </>
  );
};

export default ComponentToc;
