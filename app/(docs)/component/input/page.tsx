import type { Metadata } from "next";

import { Card, CardContent } from "@/app/templates/Card/Card";
import { Input } from "@/app/templates/Input/Input";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";

export const metadata: Metadata = {
  title: "Input",
  description:
    "입력창은 사용자로부터 데이터를 전달받기 위한 대화형 컨트롤러입니다. 다양한 종류로 구성되어 있으며 사용자와의 상호작용을 위해 입력창의 상태전환을 직관적으로 표현해야합니다.",
  keywords: ["Inptu"],
};

const ComponentInput = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">입력창</h1>
      <p>
        &nbsp;입력창은 사용자로부터 데이터를 전달받기 위한 대화형
        컨트롤러입니다. 다양한 종류로 구성되어 있으며 사용자와의 상호작용을 위해
        입력창의 상태전환을 직관적으로 표현해야합니다.
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
                      <Input className="w-full" />
                    </Card>
                  </CardContent>
                </Card>

                <Card className="my-4">
                  <CardContent>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="py-2">Prop</th>
                          <th className="py-2">Type</th>
                          <th className="py-2">Default</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2">type</td>
                          <td className="py-2">string</td>
                          <td className="py-2">text</td>
                        </tr>
                        <tr>
                          <td className="py-2">placeholder</td>
                          <td className="py-2">string</td>
                          <td className="py-2">값을 입력해주세요</td>
                        </tr>
                        <tr>
                          <td className="py-2">label</td>
                          <td className="py-2">string</td>
                          <td className="py-2">-</td>
                        </tr>
                        <tr>
                          <td className="py-2">disabled</td>
                          <td className="py-2">boolean</td>
                          <td className="py-2">false</td>
                        </tr>
                        <tr>
                          <td className="py-2">required</td>
                          <td className="py-2">boolean</td>
                          <td className="py-2">false</td>
                        </tr>
                      </tbody>
                    </table>
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
                    {`import { Input } from "@/app/components/Input/Input" 

<Input />`}
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
          <CodeBlock language="npm">{`npx atomsystem-add Input`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Usage</h2>

      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { Input } from "@/app/components/Input/Input" `}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">{`<Input /> `}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Example</h2>

      <h3 className="mt-4">Default</h3>
      <Tab
        tabs={[
          {
            id: "previewDefault",
            target: ["previewDefault"],
            tabItem: "preview",
          },
          {
            id: "codeDefault",
            target: ["codeDefault"],
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
            tag: "previewDefault",
            content: (
              <Card>
                <CardContent>
                  <Card type="group" className="flex justify-center">
                    <Input className="w-full" />
                  </Card>
                </CardContent>
              </Card>
            ),
          },
          {
            id: "codeContentDefault",
            tag: "codeDefault",
            content: (
              <Card className="my-4">
                <CardContent noMargin>
                  <CodeBlock language="typescript">
                    {`import { Input } from "@/app/components/Input/Input" 

<Input />`}
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
                    <Input disabled />
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
                    {`import { Input } from "@/app/components/Input/Input" 

<Input disabled />`}
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
                  <Card type="group">
                    <Input label="Email" />
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
                    {`import { Input } from "@/app/components/Input/Input" 

<Input label="Email" />`}
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

export default ComponentInput;
