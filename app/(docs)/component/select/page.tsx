import type { Metadata } from "next";

import { Card, CardHeader, CardContent } from "@/app/templates/Card/Card";
import { Select } from "@/app/templates/Input/Input";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";

export const metadata: Metadata = {
  title: "Select",
  description:
    "선택창은 여러가지 항목중 단일의 내용을 선택할 수 있는 컨트롤러입니다. 10개 이상의 선택지가 있는 경우에 사용을 권장합니다.",
  keywords: ["Select"],
};

const ComponentSelect = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">선택창</h1>
      <p>
        &nbsp;선택창은 여러가지 항목중 단일의 내용을 선택할 수 있는
        컨트롤러입니다. 10개 이상의 선택지가 있는 경우에 사용을 권장합니다.
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
        tabContentClass={"py-4"}
        tabContents={[
          {
            id: "previewContent",
            tag: "preview",
            content: (
              <>
                <Card>
                  <CardContent>
                    <Card type="group" className="flex justify-center">
                      <Select
                        options={["대한민국", "유럽", "일본", "미국", "중국"]}
                      />
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
                          <td className="py-2">option</td>
                          <td className="py-2">string[]</td>
                          <td className="py-2">-</td>
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
                    {`import { Select } from "@/app/components/Select/Select" 

<Select options={["대한민국", "유럽", "일본", "미국", "중국"]}/>`}
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
          <CodeBlock language="npm">{`npx atomsystem-add Select`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Usage</h2>

      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { Select } from "@/app/components/Select/Select" `}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">{`<Select option={[]}/> `}</CodeBlock>
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
                    <Select
                      options={["대한민국", "유럽", "일본", "미국", "중국"]}
                    />
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
                    {`import { Select } from "@/app/components/Select/Select" 

<Select />`}
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
                    <Select
                      disabled
                      options={["대한민국", "유럽", "일본", "미국", "중국"]}
                    />
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
                    {`import { Select } from "@/app/components/Select/Select" 

<Select disabled />`}
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
              <Card className="my-4">
                <CardContent>
                  <Card type="group" className="flex justify-center">
                    <Select
                      label="국가선택"
                      options={["대한민국", "유럽", "일본", "미국", "중국"]}
                    />
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
                    {`import { Select } from "@/app/components/Select/Select" 

<Select label="국가선택" />`}
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

export default ComponentSelect;
