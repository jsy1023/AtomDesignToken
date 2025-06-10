import type { Metadata } from "next";

import { Button } from "@/app/templates/Button/Button";
import { Card, CardContent } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";
import Table from "@/app/templates/Table/Table";
import { Badge } from "@/app/templates/Badge/Badge";

export const metadata: Metadata = {
  title: "Badge",
  description:
    "배지는 상태나 수량, 라벨, 알림 등의 정보를 간결하게 전달하는 컴포넌트 입니다.",
  keywords: ["Button"],
};

const ComponentButton = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">배지</h1>
      <p>
        &nbsp;배지는 상태나 수량, 라벨, 알림 등의 정보를 간결하게 전달하는
        컴포넌트 입니다.
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
                <Card className="my-4 flex flex-col items-center gap-4">
                  <div className="flex gap-2">
                    <Badge color="primary">배지</Badge>
                    <Badge color="secondary">배지</Badge>
                    <Badge color="warning">배지</Badge>
                    <Badge color="danger">배지</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Badge color="primary" type="tint">
                      배지
                    </Badge>
                    <Badge color="secondary" type="tint">
                      배지
                    </Badge>
                    <Badge color="warning" type="tint">
                      배지
                    </Badge>
                    <Badge color="danger" type="tint">
                      배지
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Badge color="secondary">
                      <span className="material-symbols-outlined !text-sm !text-white mr-1">
                        check
                      </span>
                      완료
                    </Badge>
                    <Badge
                      className="h-5 rounded-full flex justify-center items-center"
                      color="danger"
                    >
                      99
                      <span className="material-symbols-outlined !text-sm !text-white mr-1">
                        add
                      </span>
                    </Badge>
                  </div>
                </Card>

                <Card className="my-4">
                  <CardContent>
                    <Table
                      tableData={[
                        {
                          Prop: "children",
                          Type: "React.ReactNode",
                          Default: "-",
                        },
                        {
                          Prop: "color",
                          Type: "primary | secondary | warning | danger",
                          Default: "-",
                        },
                        {
                          Prop: "type",
                          Type: "default | tint",
                          Default: "default",
                        },
                        {
                          Prop: "className",
                          Type: "string",
                          Default: "-",
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
                    {`import { Badge } from "@/app/components/Badge/Badge"

<Card className="my-4 flex flex-col items-center gap-4">
  <div className="flex gap-2">
    <Badge color="primary">배지</Badge>
    <Badge color="secondary">배지</Badge>
    <Badge color="warning">배지</Badge>
    <Badge color="danger">배지</Badge>
  </div>
  <div className="flex gap-2">
    <Badge color="primary" type="tint">
      배지
    </Badge>
    <Badge color="secondary" type="tint">
      배지
    </Badge>
    <Badge color="warning" type="tint">
      배지
    </Badge>
    <Badge color="danger" type="tint">
      배지
    </Badge>
  </div>
  <div className="flex gap-2">
    <Badge color="secondary">
      <span className="material-symbols-outlined !text-sm !text-white mr-1">
        check
      </span>
      완료
    </Badge>
    <Badge
      className="h-5 rounded-full flex justify-center items-center"
      color="danger"
    >
      99
      <span className="material-symbols-outlined !text-sm !text-white mr-1">
        add
      </span>
    </Badge>
  </div>
</Card>`}
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
          <CodeBlock language="npm">{`npx atomsystem-add Badge`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Usage</h2>

      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { Badge } from "@/app/components/Badge/Badge" `}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">{`<Badge color="primary">배지</Badge> `}</CodeBlock>
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
              <Card className="flex gap-2 justify-center">
                <Badge color="primary">배지</Badge>
                <Badge color="secondary">배지</Badge>
                <Badge color="warning">배지</Badge>
                <Badge color="danger">배지</Badge>
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
                    {`<Badge color="primary">배지</Badge>
<Badge color="secondary">배지</Badge>
<Badge color="warning">배지</Badge>
<Badge color="danger">배지</Badge>`}
                  </CodeBlock>
                </CardContent>
              </Card>
            ),
          },
        ]}
      />

      <h3 className="mt-4">tint</h3>
      <Tab
        tabs={[
          {
            id: "previewTint",
            target: ["previewTint"],
            tabItem: "preview",
          },
          {
            id: "codeTint",
            target: ["codeTint"],
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
            id: "previewTintContent",
            tag: "previewTint",
            content: (
              <Card className="flex gap-2 justify-center">
                <Badge type="tint" color="primary">
                  배지
                </Badge>
                <Badge type="tint" color="secondary">
                  배지
                </Badge>
                <Badge type="tint" color="warning">
                  배지
                </Badge>
                <Badge type="tint" color="danger">
                  배지
                </Badge>
              </Card>
            ),
          },
          {
            id: "codeTintContent",
            tag: "codeTint",
            content: (
              <Card className="my-4">
                <CardContent noMargin>
                  <CodeBlock language="typescript">
                    {`<Badge type="tint" color="primary">배지</Badge>
<Badge type="tint" color="secondary">배지</Badge>
<Badge type="tint" color="warning">배지</Badge>
<Badge type="tint" color="danger">배지</Badge>`}
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
