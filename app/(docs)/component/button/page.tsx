import type { Metadata } from "next";

import { Button } from "@/app/templates/Button/Button";
import { Card, CardContent } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";
import Table from "@/app/templates/Table/Table";

export const metadata: Metadata = {
  title: "Button",
  description:
    "버튼은 데이터를 전송하거나 상호작용하는 요소로 목적에 따라 다양한 종류의 버튼과 상태정보를 가집니다",
  keywords: ["Button"],
};

const ComponentButton = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">버튼</h1>
      <p>
        &nbsp;버튼은 데이터를 전송하거나 상호작용하는 요소로 목적에 따라 다양한
        종류의 버튼과 상태정보를 가집니다
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
                <Card className="my-4">
                  <CardContent>
                    <Card type="group" className="flex justify-center gap-4">
                      <Button type={"primary"}>버튼</Button>
                      <Button type={"secondary"}>버튼</Button>
                      <Button type={"success"}>버튼</Button>
                      <Button type={"danger"}>버튼</Button>
                      <Button type={"gray"}>버튼</Button>
                    </Card>
                  </CardContent>
                </Card>

                <Card className="my-4">
                  <CardContent>
                    <Table
                      tableData={[
                        {
                          Prop: "type",
                          Type: "primary | secondary | success | danger | gray",
                          Default: "-",
                        },
                        {
                          Prop: "disabled",
                          Type: "boolean",
                          Default: "false",
                        },
                      ]}
                    />
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
                  <CodeBlock language="typescript">
                    {`import { Button } from "@/app/components/Button/Button"

<Button type={"primary"}>버튼</Button>
<Button type={"secondary"}>버튼</Button>
<Button type={"success"}>버튼</Button>
<Button type={"danger"}>버튼</Button>
<Button type={"gray"}>버튼</Button>`}
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
          <CodeBlock language="npm">{`npx atomsystem-add Button`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Usage</h2>

      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { Radio } from "@/app/components/Button/Button" `}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">{`<Button type={"primary"}>버튼</Button> `}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Example</h2>
      <h3 className="mt-4">main</h3>
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
                <CardContent>
                  <Card type="group" className="flex flex-col items-center">
                    <Button type={"primary"}>버튼</Button>
                  </Card>
                </CardContent>
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
                    {`<Button type={"primary"}>버튼</Button>`}
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

export default ComponentButton;
