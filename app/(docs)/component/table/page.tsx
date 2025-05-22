import type { Metadata } from "next";

import { Card, CardContent } from "@/app/templates/Card/Card";
import { Select } from "@/app/templates/Input/Input";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";
import Table from "@/app/templates/Table/Table";

export const metadata: Metadata = {
  title: "Table",
  description:
    "테이블 컴포넌트는 데이터를 행(row)과 열(column) 형태로 시각화하여 구조적으로 보여주는 UI 요소입니다. 주로 목록, 통계, 비교 자료 등을 표시할 때 사용됩니다..",
  keywords: ["Table"],
};

const ComponentTable = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">테이블</h1>
      <p>
        &nbsp;테이블 컴포넌트는 데이터를 행(row)과 열(column) 형태로 시각화하여
        구조적으로 보여주는 UI 요소입니다. 주로 목록, 통계, 비교 자료 등을
        표시할 때 사용됩니다.
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
                    <Table
                      tableData={[
                        {
                          이름: "김철수",
                          나이: 30,
                          거주지: "서울",
                          직업: "개발자",
                        },
                        {
                          이름: "이영희",
                          나이: 25,
                          거주지: "부산",
                          직업: "디자이너",
                        },
                        {
                          이름: "박민준",
                          나이: 35,
                          거주지: "대구",
                          직업: "마케터",
                        },
                        {
                          이름: "최수진",
                          나이: 28,
                          거주지: "인천",
                          직업: "기획자",
                        },
                        {
                          이름: "정우성",
                          나이: 40,
                          거주지: "광주",
                          직업: "영업",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
                <Card className="my-4">
                  <CardContent>
                    <Table
                      tableData={[
                        {
                          Props: "tableData",
                          Type: "Record<string, any>[]",
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
                    {`import { Table } from "@/app/components/Table/Table"
<Table
  tableData={[
    {
      이름: "김철수",
      나이: 30,
      거주지: "서울",
      직업: "개발자",
    },
    {
      이름: "이영희",
      나이: 25,
      거주지: "부산",
      직업: "디자이너",
    },
    {
      이름: "박민준",
      나이: 35,
      거주지: "대구",
      직업: "마케터",
    },
    {
      이름: "최수진",
      나이: 28,
      거주지: "인천",
      직업: "기획자",
    },
    {
      이름: "정우성",
      나이: 40,
      거주지: "광주",
      직업: "영업",
    },
  ]}
/>`}
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
          <CodeBlock language="npm">{`npx atomsystem-add Table`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Usage</h2>

      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import { Table } from "@/app/components/Table/Table"`}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">{`<Table tableData={[]}/> `}</CodeBlock>
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
                  <Table
                    tableData={[
                      {
                        이름: "김철수",
                        나이: 30,
                        거주지: "서울",
                        직업: "개발자",
                      },
                      {
                        이름: "이영희",
                        나이: 25,
                        거주지: "부산",
                        직업: "디자이너",
                      },
                      {
                        이름: "박민준",
                        나이: 35,
                        거주지: "대구",
                        직업: "마케터",
                      },
                      {
                        이름: "최수진",
                        나이: 28,
                        거주지: "인천",
                        직업: "기획자",
                      },
                      {
                        이름: "정우성",
                        나이: 40,
                        거주지: "광주",
                        직업: "영업",
                      },
                    ]}
                  />
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
                    {`import { Table } from "@/app/components/Table/Table" 

 <Table
    tableData={[
      {
        이름: "김철수",
        나이: 30,
        거주지: "서울",
        직업: "개발자",
      },
      {
        이름: "이영희",
        나이: 25,
        거주지: "부산",
        직업: "디자이너",
      },
      {
        이름: "박민준",
        나이: 35,
        거주지: "대구",
        직업: "마케터",
      },
      {
        이름: "최수진",
        나이: 28,
        거주지: "인천",
        직업: "기획자",
      },
      {
        이름: "정우성",
        나이: 40,
        거주지: "광주",
        직업: "영업",
      },
    ]}
  />
`}
                  </CodeBlock>
                </CardContent>
              </Card>
            ),
          },
        ]}
      />

      <h3 className="mt-4">Non Data</h3>
      <Tab
        tabs={[
          {
            id: "previewNone",
            target: ["previewNone"],
            tabItem: "preview",
          },
          {
            id: "codeNone",
            target: ["codeNone"],
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
            tag: "previewNone",
            content: (
              <Card>
                <CardContent>
                  <Table tableData={[]} />
                </CardContent>
              </Card>
            ),
          },
          {
            id: "codeContentDisabled",
            tag: "codeNone",
            content: (
              <Card className="my-4">
                <CardContent noMargin>
                  <CodeBlock language="typescript">
                    {`import { Table } from "@/app/components/Table/Table" 


<Table tableData={[]} />`}
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

export default ComponentTable;
