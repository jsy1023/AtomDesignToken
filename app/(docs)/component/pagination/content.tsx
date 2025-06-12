"use client";

import { Card, CardContent } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";
import Table from "@/app/templates/Table/Table";
import Pagination from "@/app/templates/Pagination/Pagination";
import { useState } from "react";

export default function PaginationContent() {
  const [active, setActive] = useState(1);

  return (
    <>
      <h1 className="mb-4 text-h1">페이지네이션</h1>
      <p>
        &nbsp;페이지네이션은 많은 양의 데이터를 여러 페이지로 나누어 보여주는
        컴포넌트 입니다. 한 번에 모든 데이터를 보여주지 않고, 일정 수만큼 끊어
        사용자에게 점진적으로 제공합니다.
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
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={active}
                        onPageChange={(page) => setActive(page)}
                        pageViewRange={10}
                        pageRange={5}
                        totalCount={80}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className="my-4">
                  <CardContent>
                    <Table
                      tableData={[
                        {
                          Props: "currentPage",
                          Type: "number",
                          Desc: "현재 조회중인 페이지 정보입니다.",
                        },
                        {
                          Props: "onPageChange",
                          Type: "(page:number) => void;",
                          Desc: "페이지 정보를 받아 상위 컴포넌트에 전달합니다.",
                        },
                        {
                          Props: "pageRange",
                          Type: "number",
                          Desc: "페이지네이션을 보여줄 최대 개수정보를 받습니다.",
                        },
                        {
                          Props: "pageViewRange",
                          Type: "number",
                          Desc: "페이지네이션을 보여줄 최대 개수정보를 받습니다.",
                        },
                        {
                          Props: "totalCount",
                          Type: "number",
                          Desc: "데이터의 총 개수를 받아 페이지당 데이터 개수로 나누어 총 페이지네이션 정보를 계산합니다.",
                        },
                        {
                          Props: "pageTotal",
                          Type: "number",
                          Desc: "전체 페이지네이션의 토탈 정보를 받습니다.",
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
                    {`import { Pagination } from "@/app/components/Pagination/Pagination"
<Card>
    <CardContent>
        <div className="flex justify-center">
            <Pagination
            currentPage={active}
            onPageChange={(page) => setActive(page)}
            pageViewRange={10}
            pageRange={5}
            totalCount={80}
            />
        </div>
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
          <CodeBlock language="npm">{`npx atomsystem-add Pagination`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Usage</h2>

      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { Pagination } from "@/app/components/Pagination/Pagination"`}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">{`<Pagination
    currentPage={active}
    onPageChange={(page) => setActive(page)}
    pageViewRange={10}
    pageRange={5}
    totalCount={80}
/> `}</CodeBlock>
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
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={active}
                      onPageChange={(page) => setActive(page)}
                      pageViewRange={10}
                      pageRange={5}
                      totalCount={80}
                    />
                  </div>
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
                    {`import { Pagination } from "@/app/components/Pagination/Pagination"
<Card>
    <CardContent>
        <div className="flex justify-center">
            <Pagination
            currentPage={active}
            onPageChange={(page) => setActive(page)}
            pageViewRange={10}
            pageRange={5}
            totalCount={80}
            />
        </div>
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
