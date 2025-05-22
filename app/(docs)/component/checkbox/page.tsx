import type { Metadata } from "next";

import { Card, CardContent } from "@/app/templates/Card/Card";
import { Checkbox } from "@/app/templates/Input/Input";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";
import Table from "@/app/templates/Table/Table";

export const metadata: Metadata = {
  title: "Checkbox",
  description:
    "체크박스는 사용자가 여러가지 선택사항 중 한가지 이상 선택을 할 수 있는 컨트롤러입니다. 1개 ~ 10개 사이의 선택사항이 있는 경우 체크박스의 사용을 권장합니다.",
  keywords: ["Button"],
};

const ComponentCheckbox = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">체크박스</h1>
      <p>
        &nbsp;체크박스는 사용자가 여러가지 선택사항 중 한가지 이상 선택을 할 수
        있는 컨트롤러입니다. 1개 ~ 10개 사이의 선택사항이 있는 경우 체크박스의
        사용을 권장합니다.
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
                    <Card type="group" className="flex justify-center">
                      <Checkbox defaultChecked />
                    </Card>
                  </CardContent>
                </Card>

                <Card className="my-4">
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
                    {`import { Checkbox } from "@/app/components/Input/Input" 

<Checkbox />`}
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
          <CodeBlock language="npm">{`npx atomsystem-add Checkbox`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Usage</h2>

      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { Checkbox } from "@/app/components/Input/Input" `}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">{`<Checkbox /> `}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Example</h2>

      <h3 className="mt-4">WithText</h3>
      <Tab
        tabs={[
          {
            id: "previewDefault",
            target: ["previewWithText"],
            tabItem: "preview",
          },
          {
            id: "codeDefault",
            target: ["codeWithText"],
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
            id: "previewContentDefault",
            tag: "previewWithText",
            content: (
              <Card>
                <CardContent>
                  <Card type="group" className="flex justify-center">
                    <Checkbox text="정책 및 조건동의" />
                  </Card>
                </CardContent>
              </Card>
            ),
          },
          {
            id: "codeContentDefault",
            tag: "codeWithText",
            content: (
              <Card className="my-4">
                <CardContent noMargin>
                  <CodeBlock language="typescript">
                    {`import { Checkbox } from "@/app/components/Input/Input" 

<Checkbox text="정책 및 조건동의" />`}
                  </CodeBlock>
                </CardContent>
              </Card>
            ),
          },
        ]}
      />

      <h3 className="mt-4">Disabled</h3>
      <Tab
        tabs={[
          {
            id: "previewDisabled",
            target: ["previewDisabled"],
            tabItem: "preview",
          },
          {
            id: "codeDisabled",
            target: ["codeDisabled"],
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
            id: "previewContentDisabled",
            tag: "previewDisabled",
            content: (
              <Card>
                <CardContent>
                  <Card type="group" className="flex justify-center">
                    <Checkbox text="정책 및 조건동의" disabled />
                  </Card>
                </CardContent>
              </Card>
            ),
          },
          {
            id: "codeContentDisabled",
            tag: "codeDisabled",
            content: (
              <Card className="my-4">
                <CardContent noMargin>
                  <CodeBlock language="typescript">
                    {`import { Checkbox } from "@/app/components/Input/Input" 

<Checkbox text="정책 및 조건동의" disabled />`}
                  </CodeBlock>
                </CardContent>
              </Card>
            ),
          },
        ]}
      />

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
                <CardContent>
                  <Card type="group" className="flex flex-col items-center">
                    <div className="flex flex-col">
                      <Checkbox label="정책" text="정책 및 조건동의" />
                    </div>
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
                    {`import { Checkbox } from "@/app/components/Input/Input" 

<div className="flex flex-col">
  <Checkbox label="정책" text="정책 및 조건동의" />
</div>`}
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

export default ComponentCheckbox;
