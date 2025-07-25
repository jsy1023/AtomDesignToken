import type { Metadata } from "next";

import { Card, CardContent } from "@/app/templates/Card/Card";
import { Radio } from "@/app/templates/Input/Input";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";
import Table from "@/app/templates/Table/Table";

export const metadata: Metadata = {
  title: "Radio",
  description:
    "라디오는 사용자가 여러가지 선택사항 중 한가지 옵션을 선택 할 수 있는 컨트롤러입니다.",
  keywords: ["Button"],
};

const ComponentRadio = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">라디오</h1>
      <p>
        &nbsp;라디오는 사용자가 여러가지 선택사항 중 한가지 선택을 할 수 있는
        컨트롤러입니다. 1개 ~ 10개 사이의 선택사항이 있는 경우 라디오의 사용을
        권장합니다.
      </p>
      <hr className="my-4" />
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
                    <Card type="group" className="flex justify-center gap-4">
                      <Radio defaultChecked name={"food"} value={"김밥"} />
                      <Radio name={"food"} value={"삼겹살"} />
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
                    {`import { Radio } from "@/app/components/Input/Input" 

<Radio defaultChecked name={"food"} value={"김밥"} />
<Radio name={"food"} value={"삼겹살"} />`}
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
          <CodeBlock language="npm">{`npx atomsystem-add Radio`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Usage</h2>

      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { Radio } from "@/app/components/Input/Input" `}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">{`<Radio name={} value={} /> `}</CodeBlock>
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
          "px-[var(--spacing-global-x)] py-[var(--spacing-global-y)] font-bold "
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
                      <Radio
                        label="저녁메뉴"
                        value="떡볶이"
                        name={"condition"}
                        defaultChecked
                      />
                      <Radio value="라면" name={"condition"} />
                      <Radio value="햄버거" name={"condition"} />
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
                    {`import { Radio } from "@/app/components/Input/Input" 
<div className="flex flex-col">
  <Radio
    label="저녁메뉴"
    value="떡볶이"
    name={"condition"}
  />
  <Radio value="라면" name={"condition"} />
  <Radio value="햄버거" name={"condition"} />
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

export default ComponentRadio;
