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
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="npm">{`npx atomsystem-add Input`}</CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="javascript">{`import { Input } from "@/app/templates/Input/Input";`}</CodeBlock>
        </CardContent>
      </Card>
      <hr className="my-4 border-fill-border" />
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
              <Card>
                {/* <CardContent>
              <p>
                &nbsp;tailwinds css의 tailwinds.config.ts에 정의된 변수입니다.
                <br /> 해당 변수는 디자인에 따라 자유롭게 정의내리고 활용할 수
                있습니다.
              </p>
            </CardContent> */}
                {/* <CardHeader noMargin>
              <CodeBlock language="typescript">
                {`theme: {
      extend: {
        colors: {
            "input-background-standard": "var(--input-background-standard)",
            "input-background-disabled": "var(--input-background-disabled)",
            "input-background-value": "var(--input-background-value)",
            "input-background-success": "var(--input-background-success)",
            "input-background-error": "var(--input-background-error)",
            "input-border-standard": "var(--input-border-standard)",
            "input-border-focus": "var(--input-border-focus)",
            "input-border-success": "var(--input-border-success)",
            "input-border-error": "var(--input-border-error)",
            "input-text-value": "var(--input-text-value)",
            "input-text-placeholder": "var(--input-text-placeholder)",
            "input-text-success": "var(--input-text-success)",
            "input-text-error": "var(--input-text-error)",
        },
          borderRadius: {
            "input-border": "var(--input-rounded)"
          },
      }
    }`}
              </CodeBlock>
            </CardHeader> */}
                {/* <div className="p-4">
              <ThemeSelector type="all" />
            </div> */}
                <CardContent>
                  <Card type="group" className="flex justify-center">
                    <Input className="w-full" />
                  </Card>
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
