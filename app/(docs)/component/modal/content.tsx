"use client";
import { Card, CardContent, CardHeader } from "@/app/templates/Card/Card";
import { Input } from "@/app/templates/Input/Input";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";
import Table from "@/app/templates/Table/Table";
import { Button } from "@/app/templates/Button/Button";
import { useState } from "react";
import { ModalContent } from "@/app/templates/Modal/Modal";
export default function ComponentModalContent() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <h1 className="mb-4 text-h1">모달창</h1>
      <p>
        &nbsp;모달(Modal)은 사용자의 작업 흐름을 중단시키고, 특정 작업이나
        확인을 요구하는 UI 요소입니다.
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
                      <Button onClick={() => setIsOpen(true)} type={"primary"}>
                        모달 열기
                      </Button>
                      <ModalContent
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        modalTitle={"모달제목"}
                        modalFooter={
                          <Button
                            onClick={() => setIsOpen(false)}
                            type={"primary"}
                          >
                            닫기
                          </Button>
                        }
                      >
                        <Input label="이름" />
                      </ModalContent>
                    </Card>
                  </CardContent>
                </Card>

                <Card className="my-4">
                  <CardContent>
                    <Table
                      tableData={[
                        {
                          Prop: "isOpen",
                          Type: "boolean",
                          Describe: "모달 Open/Close 상태 값",
                        },
                        {
                          Prop: "onRequestClose",
                          Type: "()=>void",
                          Describe: "모달 닫기 버튼",
                        },
                        {
                          Prop: "children",
                          Type: "React.ReactNode",
                          Describe: "모달 콘텐츠 내용",
                        },
                        {
                          Prop: "modalTitle",
                          Type: "string",
                          Describe: "모달 제목 정보",
                        },
                        {
                          Prop: "modalFooter",
                          Type: "React.ReactNode",
                          Describe: "모달 하단 컴포넌트 정보",
                        },
                        {
                          Prop: "size",
                          Type: "normal | middle | large | xl | full | full-screen",
                          Describe: "모달 크기 정보",
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
                    {`import { ModalContent } from "@/app/components/Modal/Modal"
                    
<Card className="my-4">
    <CardContent>
    <Card type="group" className="flex justify-center">
        <Button onClick={() => setIsOpen(true)} type={"primary"}>
        모달 열기
        </Button>
        <ModalContent
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        modalTitle={"모달제목"}
        modalFooter={
            <Button
            onClick={() => setIsOpen(false)}
            type={"primary"}
            >
            닫기
            </Button>
        }
        >
        <Input label="이름" />
        </ModalContent>
    </Card>
    </CardContent>
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
          <CodeBlock language="npm">{`npx atomsystem-add Modal`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Usage</h2>

      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { ModalContent } from "@/app/components/Modal/Modal" `}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardHeader>layout.tsx</CardHeader>
        <CardContent noMargin>
          <CodeBlock language="typescript">{`import { Modal } from "../components/Modal/Modal";
//**
// * 상위 공간에 모달 호출할 공간을 적용해줍니다.
// */ 
<Modal /> `}</CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">{`<Card className="my-4">
    <CardContent>
    <Card type="group" className="flex justify-center">
        <Button onClick={() => setIsOpen(true)} type={"primary"}>
        모달 열기
        </Button>
        <ModalContent
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        modalTitle={"모달제목"}
        modalFooter={
            <Button
            onClick={() => setIsOpen(false)}
            type={"primary"}
            >
            닫기
            </Button>
        }
        >
        <Input label="이름" />
        </ModalContent>
    </Card>
    </CardContent>
</Card> `}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Example</h2>

      <h3 className="mt-4">Default</h3>
      <Tab
        tabs={[
          { id: "previewDefault", target: ["preview"], tabItem: "preview" },
          { id: "codeDefault", target: ["code"], tabItem: "code" },
        ]}
        tabClass={"w-full border-[var(--color-border)] border-b"}
        tabNavItemClass={
          "px-[var(--global-padding-x)] py-[var(--global-padding-y)] font-bold "
        }
        tabNavItemActiveClass="border-b border-primary"
        tabContentClass="p-0 border-0 mt-0"
        tabContents={[
          {
            id: "previewContentDefault",
            tag: "preview",
            content: (
              <>
                <Card className="my-4">
                  <CardContent>
                    <Card type="group" className="flex justify-center">
                      <Button onClick={() => setIsOpen(true)} type={"primary"}>
                        모달 열기
                      </Button>
                      <ModalContent
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        modalTitle={"모달제목"}
                        modalFooter={
                          <Button
                            onClick={() => setIsOpen(false)}
                            type={"primary"}
                          >
                            닫기
                          </Button>
                        }
                      >
                        <Input label="이름" />
                      </ModalContent>
                    </Card>
                  </CardContent>
                </Card>
              </>
            ),
          },
          {
            id: "codeContentDefault",
            tag: "code",
            content: (
              <Card className="my-4">
                <CardContent noMargin>
                  <CodeBlock language="typescript">
                    {`import { ModalContent } from "@/app/components/Modal/Modal"
                    
<Card className="my-4">
    <CardContent>
    <Card type="group" className="flex justify-center">
        <Button onClick={() => setIsOpen(true)} type={"primary"}>
        모달 열기
        </Button>
        <ModalContent
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        modalTitle={"모달제목"}
        modalFooter={
            <Button
            onClick={() => setIsOpen(false)}
            type={"primary"}
            >
            닫기
            </Button>
        }
        >
        <Input label="이름" />
        </ModalContent>
    </Card>
    </CardContent>
</Card>`}
                  </CodeBlock>
                </CardContent>
              </Card>
            ),
          },
        ]}
      />
    </>
  );
}
