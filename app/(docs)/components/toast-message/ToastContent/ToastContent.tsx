"use client";

import { Button } from "@/app/templates/Button/Button";
import { Card, CardContent } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";
import Table from "@/app/templates/Table/Table";

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
      <hr className="my-4 border-border" />
      <Tab
        tabs={[
          { id: "preview", target: ["preview"], tabItem: "preview" },
          { id: "code", target: ["code"], tabItem: "code" },
        ]}
        tabClass={"w-full border-border border-b"}
        tabNavItemClass={
          "px-[var(--spacing-global-x)] py-[var(--spacing-global-y)] font-bold"
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
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button
                        type="gray"
                        onClick={() => {
                          toast({
                            status: "standard",
                            message: "기본 알림입니다.",
                          });
                        }}
                      >
                        Standard
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => {
                          toast({
                            status: "primary",
                            message: "Primary 토스트 알림입니다.",
                            desc: "우측 하단에 메시지가 나타납니다.",
                          });
                        }}
                      >
                        Primary
                      </Button>
                      <Button
                        type="secondary"
                        onClick={() => {
                          toast({
                            status: "secondary",
                            message: "Secondary 토스트 알림입니다.",
                          });
                        }}
                      >
                        Secondary
                      </Button>
                      <Button
                        type="success"
                        onClick={() => {
                          toast({
                            status: "success",
                            message: "성공적으로 처리되었습니다.",
                          });
                        }}
                      >
                        Success
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => {
                          toast({
                            status: "danger",
                            message: "에러가 발생했습니다.",
                          });
                        }}
                      >
                        Danger
                      </Button>
                      <Button
                        type="warning"
                        onClick={() => {
                          toast({
                            status: "warning",
                            message: "경고 알림입니다.",
                          });
                        }}
                      >
                        Warning
                      </Button>
                      <Button
                        type="gray"
                        onClick={() => {
                          toast({
                            status: "info",
                            message: "정보 알림입니다.",
                          });
                        }}
                      >
                        Info
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="my-4">
                  <CardContent>
                    <Table
                      tableData={[
                        {
                          Prop: "status",
                          Type: "string",
                          Default: "standard | primary | secondary | success | danger | warning | info | error",
                        },
                        {
                          Prop: "message",
                          Type: "string",
                          Default: "string",
                        },
                        {
                          Prop: "desc",
                          Type: "string",
                          Default: "string",
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
                    {`import { useToast } from "@/app/templates/Toast/Toast";
                    
<Card className="my-4 overflow-hidden ">
  <CardContent>
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        type="primary"
        onClick={() => {
          toast({
            status: "primary",
            message: "Primary 토스트 알림입니다.",
            desc: "우측 하단에 메시지가 나타납니다.",
          });
        }}
      >
        Primary
      </Button>
      {/* 다른 상태별 버튼 추가 가능 */}
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
      <hr className="my-4 border-border" />
      <h2>Installation</h2>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="npm">{`npx atomsystem-add Toast`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4 border-border" />
      <h2>Usage</h2>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { useToast } from "@/app/templates/Toast/Toast";`}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { useToast } from "@/app/templates/Toast/Toast";
                    
<Card className="my-4 overflow-hidden ">
  <CardContent>
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        type="primary"
        onClick={() => {
          toast({
            status: "primary",
            message: "Primary 토스트 알림입니다.",
            desc: "우측 하단에 메시지가 나타납니다.",
          });
        }}
      >
        Primary
      </Button>
    </div>
  </CardContent>
</Card>`}
          </CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4 border-border" />

      <h2>Example</h2>
      <h3 className="mt-4">Default</h3>
      <Tab
        tabs={[
          { id: "preview", target: ["preview"], tabItem: "preview" },
          { id: "code", target: ["code"], tabItem: "code" },
        ]}
        tabClass={"w-full border-border border-b"}
        tabNavItemClass={
          "px-[var(--spacing-global-x)] py-[var(--spacing-global-y)] font-bold"
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
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button
                        type="gray"
                        onClick={() => {
                          toast({
                            status: "standard",
                            message: "기본 알림입니다.",
                          });
                        }}
                      >
                        Standard
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => {
                          toast({
                            status: "primary",
                            message: "Primary 토스트 알림입니다.",
                            desc: "우측 하단에 메시지가 나타납니다.",
                          });
                        }}
                      >
                        Primary
                      </Button>
                      <Button
                        type="success"
                        onClick={() => {
                          toast({
                            status: "success",
                            message: "성공적으로 처리되었습니다.",
                          });
                        }}
                      >
                        Success
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => {
                          toast({
                            status: "danger",
                            message: "에러가 발생했습니다.",
                          });
                        }}
                      >
                        Danger
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
                    {`import { useToast } from "@/app/templates/Toast/Toast";
                    
<Card className="my-4 overflow-hidden ">
  <CardContent>
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        type="gray"
        onClick={() => {
          toast({
            status: "standard",
            message: "기본 알림입니다.",
          });
        }}
      >
        Standard
      </Button>
      <Button
        type="primary"
        onClick={() => {
          toast({
            status: "primary",
            message: "Primary 토스트 알림입니다.",
            desc: "우측 하단에 메시지가 나타납니다.",
          });
        }}
      >
        Primary
      </Button>
      {/* 다른 상태들 생략 */}
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
