import { Card, CardContent } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";
import Table from "@/app/templates/Table/Table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tab",
  description:
    "여러 개의 콘텐츠 영역을 하나의 영역에서 전환하며 보여주는 UI 요소입니다. 사용자가 클릭하거나 탭을 선택하면 해당 탭에 연결된 콘텐츠만 보여주고 나머지는 숨깁니다.",
  keywords: ["Tab"],
};

const ComponentGlobalNav = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">Tab</h1>
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
                  <CardContent noMargin>
                    <Tab
                      tabs={[
                        { id: "trip", target: ["trip"], tabItem: "여행" },
                        { id: "science", target: ["science"], tabItem: "과학" },
                        {
                          id: "business",
                          target: ["business"],
                          tabItem: "비즈니스",
                        },
                        { id: "design", target: ["design"], tabItem: "디자인" },
                      ]}
                      tabContents={[
                        {
                          id: "tripContent",
                          tag: "trip",
                          content: (
                            <p>
                              여행은 편견, 편협함, 그리고 좁은 마음을 치유한다.
                              - 마크 트웨인 (Mark Twain)
                            </p>
                          ),
                        },
                        {
                          id: "scienceContent",
                          tag: "science",
                          content: (
                            <p>
                              우리가 별을 바라보지 않고 발밑만 본다면, 우리는
                              결코 앞으로 나아갈 수 없다. - 스티븐 호킹 (Stephen
                              Hawking)
                            </p>
                          ),
                        },
                        {
                          id: "businessContent",
                          tag: "business",
                          content: (
                            <p>
                              만족한 고객이야말로 최고이 비즈니스 전략이다. -
                              마이클 르보 (Steve Jobs)
                            </p>
                          ),
                        },
                        {
                          id: "designContent",
                          tag: "design",
                          content: (
                            <p>
                              디자인은 단지 어떻게 보이고, 어떻게 느껴지는지가
                              아니다. 디자인은 어떻게 작동하는가이다. - 스티브
                              잡스 (Steve Jobs)
                            </p>
                          ),
                        },
                      ]}
                    ></Tab>
                  </CardContent>
                </Card>

                <Card className="my-4">
                  <CardContent>
                    <Table
                      tableData={[
                        {
                          Prop: "tabs",
                          Type: "Array<{id: string; target: string[]; tabItem: React.ReactNode;}>",
                        },
                        {
                          Prop: "tabClass",
                          Type: "string",
                        },
                        {
                          Prop: "tabNavItemClass",
                          Type: "string",
                        },
                        {
                          Prop: "tabContents",
                          Type: "Array<{id: string; tag: string; content: React.ReactNode;}>",
                        },
                        {
                          Prop: "tabContentClass",
                          Type: "string",
                        },
                        {
                          Prop: "tabContentItem",
                          Type: "string",
                        },
                        {
                          Prop: "expectionValue",
                          Type: "string",
                        },
                        {
                          Prop: "expectionLayout",
                          Type: "string",
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
                    {`import Tab from "@/app/component/Tab/Tab";
                    
<Card className="my-4 overflow-hidden ">
    <CardContent noMargin>
      <Tab
        tabs={[
          { id: "trip", target: ["trip"], tabItem: "여행" },
          { id: "science", target: ["science"], tabItem: "과학" },
          {
            id: "business",
            target: ["business"],
            tabItem: "비즈니스",
          },
          { id: "design", target: ["design"], tabItem: "디자인" },
        ]}
        tabContents={[
          {
            id: "tripContent",
            tag: "trip",
            content: (
              <p>
                여행은 편견, 편협함, 그리고 좁은 마음을 치유한다.
                - 마크 트웨인 (Mark Twain)
              </p>
            ),
          },
          {
            id: "scienceContent",
            tag: "science",
            content: (
              <p>
                우리가 별을 바라보지 않고 발밑만 본다면, 우리는
                결코 앞으로 나아갈 수 없다. - 스티븐 호킹 (Stephen
                Hawking)
              </p>
            ),
          },
          {
            id: "businessContent",
            tag: "business",
            content: (
              <p>
                만족한 고객이야말로 최고이 비즈니스 전략이다. -
                마이클 르보 (Steve Jobs)
              </p>
            ),
          },
          {
            id: "designContent",
            tag: "design",
            content: (
              <p>
                디자인은 단지 어떻게 보이고, 어떻게 느껴지는지가
                아니다. 디자인은 어떻게 작동하는가이다. - 스티브
                잡스 (Steve Jobs)
              </p>
            ),
          },
        ]}
        tabContentClass="p-4 border border-t-0  border-[var(--color-border)] -mt-[1px]"
      />
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
          <CodeBlock language="npm">{`npx atomsystem-add Tab`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />
      <h2>Usage</h2>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import Tab from "@/app/component/Tab/Tab";`}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`
<Tab
  tabs={[
    { id: "trip", target: ["trip"], tabItem: "여행" },
    { id: "science", target: ["science"], tabItem: "과학" },
    {
      id: "business",
      target: ["business"],
      tabItem: "비즈니스",
    },
    { id: "design", target: ["design"], tabItem: "디자인" },
  ]}
  tabContents={[
    {
      id: "tripContent",
      tag: "trip",
      content: (
        <p>
          여행은 편견, 편협함, 그리고 좁은 마음을 치유한다.
          - 마크 트웨인 (Mark Twain)
        </p>
      ),
    },
    {
      id: "scienceContent",
      tag: "science",
      content: (
        <p>
          우리가 별을 바라보지 않고 발밑만 본다면, 우리는
          결코 앞으로 나아갈 수 없다. - 스티븐 호킹 (Stephen
          Hawking)
        </p>
      ),
    },
    {
      id: "businessContent",
      tag: "business",
      content: (
        <p>
          만족한 고객이야말로 최고이 비즈니스 전략이다. -
          마이클 르보 (Steve Jobs)
        </p>
      ),
    },
    {
      id: "designContent",
      tag: "design",
      content: (
        <p>
          디자인은 단지 어떻게 보이고, 어떻게 느껴지는지가
          아니다. 디자인은 어떻게 작동하는가이다. - 스티브
          잡스 (Steve Jobs)
        </p>
      ),
    },
  ]}
  tabContentClass="p-4 border border-t-0  border-[var(--color-border)] -mt-[1px]"
/>`}
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
                  <CardContent noMargin>
                    <Tab
                      tabs={[
                        { id: "trip", target: ["trip"], tabItem: "여행" },
                        { id: "science", target: ["science"], tabItem: "과학" },
                        {
                          id: "business",
                          target: ["business"],
                          tabItem: "비즈니스",
                        },
                        { id: "design", target: ["design"], tabItem: "디자인" },
                      ]}
                      tabContents={[
                        {
                          id: "tripContent",
                          tag: "trip",
                          content: (
                            <p>
                              여행은 편견, 편협함, 그리고 좁은 마음을 치유한다.
                              - 마크 트웨인 (Mark Twain)
                            </p>
                          ),
                        },
                        {
                          id: "scienceContent",
                          tag: "science",
                          content: (
                            <p>
                              우리가 별을 바라보지 않고 발밑만 본다면, 우리는
                              결코 앞으로 나아갈 수 없다. - 스티븐 호킹 (Stephen
                              Hawking)
                            </p>
                          ),
                        },
                        {
                          id: "businessContent",
                          tag: "business",
                          content: (
                            <p>
                              만족한 고객이야말로 최고이 비즈니스 전략이다. -
                              마이클 르보 (Steve Jobs)
                            </p>
                          ),
                        },
                        {
                          id: "designContent",
                          tag: "design",
                          content: (
                            <p>
                              디자인은 단지 어떻게 보이고, 어떻게 느껴지는지가
                              아니다. 디자인은 어떻게 작동하는가이다. - 스티브
                              잡스 (Steve Jobs)
                            </p>
                          ),
                        },
                      ]}
                    ></Tab>
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
                    {`import Tab from "@/app/component/Tab/Tab";
                    
<Card className="my-4 overflow-hidden ">
    <CardContent noMargin>
      <Tab
        tabs={[
          { id: "trip", target: ["trip"], tabItem: "여행" },
          { id: "science", target: ["science"], tabItem: "과학" },
          {
            id: "business",
            target: ["business"],
            tabItem: "비즈니스",
          },
          { id: "design", target: ["design"], tabItem: "디자인" },
        ]}
        tabContents={[
          {
            id: "tripContent",
            tag: "trip",
            content: (
              <p>
                여행은 편견, 편협함, 그리고 좁은 마음을 치유한다.
                - 마크 트웨인 (Mark Twain)
              </p>
            ),
          },
          {
            id: "scienceContent",
            tag: "science",
            content: (
              <p>
                우리가 별을 바라보지 않고 발밑만 본다면, 우리는
                결코 앞으로 나아갈 수 없다. - 스티븐 호킹 (Stephen
                Hawking)
              </p>
            ),
          },
          {
            id: "businessContent",
            tag: "business",
            content: (
              <p>
                만족한 고객이야말로 최고이 비즈니스 전략이다. -
                마이클 르보 (Steve Jobs)
              </p>
            ),
          },
          {
            id: "designContent",
            tag: "design",
            content: (
              <p>
                디자인은 단지 어떻게 보이고, 어떻게 느껴지는지가
                아니다. 디자인은 어떻게 작동하는가이다. - 스티브
                잡스 (Steve Jobs)
              </p>
            ),
          },
        ]}
        tabContentClass="p-4 border border-t-0  border-[var(--color-border)] -mt-[1px]"
      />
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
export default ComponentGlobalNav;
