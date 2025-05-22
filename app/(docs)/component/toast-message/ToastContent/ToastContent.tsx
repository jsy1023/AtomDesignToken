"use client";

import { Button } from "@/app/templates/Button/Button";
import { Card, CardContent } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";

import { useToast } from "@/app/templates/Toast/Toast";

const ToastContent = () => {
  const toast = useToast();
  return (
    <>
      <h1 className="mb-4 text-h1">토스트 알림</h1>
      <p>
        &nbsp;여러 개의 콘텐츠 영역을 하나의 영역에서 전환하며 보여주는 UI
        요소입니다. 사용자가 클릭하거나 탭을 선택하면 해당 탭에 연결된 콘텐츠만
        보여주고 나머지는 숨깁니다.
      </p>
      <hr className="my-4" />
      <Tab
        tabs={[
          { id: "preview", target: ["preview"], tabItem: "preview" },
          { id: "code", target: ["code"], tabItem: "code" },
        ]}
        tabClass={"w-full border-[var(--color-border)] border-b"}
        tabNavItemClass={
          "px-[var(--global-padding-x)] py-[var(--global-padding-y)] font-bold"
        }
        tabContentClass="p-0 border-0 mt-0"
        tabNavItemActiveClass="border-b border-primary"
        tabContents={[
          {
            id: "previewContent",
            tag: "preview",
            content: (
              <>
                <Card className="my-4 overflow-hidden ">
                  <CardContent>
                    <div className="flex justify-center">
                      <Button
                        type="primary"
                        onClick={() => {
                          toast({
                            status: "success",
                            message: "토스트 알림입니다.",
                            desc: "우측 하단에 메시지가 나타납니다.",
                          });
                        }}
                      >
                        버튼
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="my-4">
                  <CardContent>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="py-2 min-w-24">Prop</th>
                          <th className="py-2">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 min-w-24">status</td>
                          <td className="py-2">
                            &quot;success&quot; | &quot;error&quot;
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 min-w-24">message</td>
                          <td className="py-2">message: string;</td>
                        </tr>
                        <tr>
                          <td className="py-2 min-w-24">decs</td>
                          <td className="py-2">string</td>
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
                    {`import Tab from "@/app/component/Toast/Toast";
                    
<Card className="my-4 overflow-hidden ">
  <CardContent>
    <div className="flex justify-center">
      <Button
        type="primary"
        onClick={() => {
          toast({
            status: "success",
            message: "토스트 알림입니다.",
            desc: "우측 하단에 메시지가 나타납니다.",
          });
        }}
      >
        버튼
      </Button>
    </div>
  </CardContent>
</Card>
`}
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
          <CodeBlock language="npm">{`npx atomsystem-add Toast`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />
      <h2>Usage</h2>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import Tab from "@/app/component/Toast/Toast";`}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import Tab from "@/app/component/Toast/Toast";
                    
<Card className="my-4 overflow-hidden ">
  <CardContent>
    <div className="flex justify-center">
      <Button
        type="primary"
        onClick={() => {
          toast({
            status: "success",
            message: "토스트 알림입니다.",
            desc: "우측 하단에 메시지가 나타납니다.",
          });
        }}
      >
        버튼
      </Button>
    </div>
  </CardContent>
</Card>`}
          </CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Example</h2>
      <h3 className="mt-4">Default</h3>
      <Tab
        tabs={[
          { id: "preview", target: ["preview"], tabItem: "preview" },
          { id: "code", target: ["code"], tabItem: "code" },
        ]}
        tabClass={"w-full border-[var(--color-border)] border-b"}
        tabNavItemClass={
          "px-[var(--global-padding-x)] py-[var(--global-padding-y)] font-bold"
        }
        tabContentClass="p-0 border-0 mt-0"
        tabNavItemActiveClass="border-b border-primary"
        tabContents={[
          {
            id: "previewContent",
            tag: "preview",
            content: (
              <>
                <Card className="my-4 overflow-hidden ">
                  <CardContent>
                    <div className="flex justify-center">
                      <Button
                        type="primary"
                        onClick={() => {
                          toast({
                            status: "success",
                            message: "토스트 알림입니다.",
                            desc: "우측 하단에 메시지가 나타납니다.",
                          });
                        }}
                      >
                        버튼
                      </Button>
                    </div>
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
                    {`import Tab from "@/app/component/Toast/Toast";
                    
<Card className="my-4 overflow-hidden ">
  <CardContent>
    <div className="flex justify-center">
      <Button
        type="primary"
        onClick={() => {
          toast({
            status: "success",
            message: "토스트 알림입니다.",
            desc: "우측 하단에 메시지가 나타납니다.",
          });
        }}
      >
        버튼
      </Button>
    </div>
  </CardContent>
</Card>
`}
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

export default ToastContent;
