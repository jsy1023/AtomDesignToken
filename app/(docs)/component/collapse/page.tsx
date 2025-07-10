import { Card, CardContent } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import { Collapse } from "@/app/templates/Collapse/Collapse";
import Tab from "@/app/templates/Tab/Tab";
import Table from "@/app/templates/Table/Table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collapse",
  description:
    "웹이나 앱 화면에서 내용을 숨기거나 펼칠 수 있도록 하는 컴포넌트로, 사용자가 필요한 정보만 선택적으로 볼 수 있도록 도와줍니다.",
  keywords: ["Collapse"],
};

const ComponentGlobalNav = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">Collapse</h1>
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
                    <Collapse
                      // type="accordion"
                      collapses={[
                        {
                          title: "디자인 시스템의 중요성",
                          content:
                            "디자인 시스템은 일관된 사용자 경험을 제공하고, 협업 생산성을 극대화하는 핵심 도구입니다.",
                        },
                        {
                          title: "웹 접근성 가이드라인",
                          content:
                            "모든 사용자가 동등하게 콘텐츠에 접근할 수 있도록, WCAG 기준을 준수하는 것이 중요합니다.",
                        },
                        {
                          title: "시간 관리 전략",
                          content:
                            "업무 우선순위를 설정하고, 타임블록 기법을 활용하면 집중력과 생산성이 높아집니다.",
                        },
                        {
                          title: "협업 도구의 활용",
                          content:
                            "Notion, Slack, Figma 같은 협업 도구는 정보 공유와 팀 커뮤니케이션의 효율을 크게 향상시킵니다.",
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
                          Prop: "type",
                          Type: "accordion | collapse",
                        },
                        {
                          Prop: "collapses",
                          Type: "{ title: string; content: string }[];",
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
                    {`import Tab from "@/app/component/Collapse/Collapse";
                    
<Card className="my-4 overflow-hidden ">
  <CardContent noMargin>
    <Collapse
      // type="accordion"
      collapses={[
        {
          title: "디자인 시스템의 중요성",
          content:
            "디자인 시스템은 일관된 사용자 경험을 제공하고, 협업 생산성을 극대화하는 핵심 도구입니다.",
        },
        {
          title: "웹 접근성 가이드라인",
          content:
            "모든 사용자가 동등하게 콘텐츠에 접근할 수 있도록, WCAG 기준을 준수하는 것이 중요합니다.",
        },
        {
          title: "시간 관리 전략",
          content:
            "업무 우선순위를 설정하고, 타임블록 기법을 활용하면 집중력과 생산성이 높아집니다.",
        },
        {
          title: "협업 도구의 활용",
          content:
            "Notion, Slack, Figma 같은 협업 도구는 정보 공유와 팀 커뮤니케이션의 효율을 크게 향상시킵니다.",
        },
      ]}
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
          <CodeBlock language="npm">{`npx atomsystem-add Collapse`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />
      <h2>Usage</h2>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import Tab from "@/app/component/Collapse/Collapse";`}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`
<Collapse
  // type="accordion"
  collapses={[
    {
      title: "디자인 시스템의 중요성",
      content:
        "디자인 시스템은 일관된 사용자 경험을 제공하고, 협업 생산성을 극대화하는 핵심 도구입니다.",
    },
    {
      title: "웹 접근성 가이드라인",
      content:
        "모든 사용자가 동등하게 콘텐츠에 접근할 수 있도록, WCAG 기준을 준수하는 것이 중요합니다.",
    },
    {
      title: "시간 관리 전략",
      content:
        "업무 우선순위를 설정하고, 타임블록 기법을 활용하면 집중력과 생산성이 높아집니다.",
    },
    {
      title: "협업 도구의 활용",
      content:
        "Notion, Slack, Figma 같은 협업 도구는 정보 공유와 팀 커뮤니케이션의 효율을 크게 향상시킵니다.",
    },
  ]}
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
                  <CardContent>
                    <Collapse
                      // type="accordion"
                      collapses={[
                        {
                          title: "디자인 시스템의 중요성",
                          content:
                            "디자인 시스템은 일관된 사용자 경험을 제공하고, 협업 생산성을 극대화하는 핵심 도구입니다.",
                        },
                        {
                          title: "웹 접근성 가이드라인",
                          content:
                            "모든 사용자가 동등하게 콘텐츠에 접근할 수 있도록, WCAG 기준을 준수하는 것이 중요합니다.",
                        },
                        {
                          title: "시간 관리 전략",
                          content:
                            "업무 우선순위를 설정하고, 타임블록 기법을 활용하면 집중력과 생산성이 높아집니다.",
                        },
                        {
                          title: "협업 도구의 활용",
                          content:
                            "Notion, Slack, Figma 같은 협업 도구는 정보 공유와 팀 커뮤니케이션의 효율을 크게 향상시킵니다.",
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
                    {`import Tab from "@/app/component/Collapse/Collapse";
                    
<Card className="my-4 overflow-hidden ">
  <CardContent noMargin>
    <Collapse
      // type="accordion"
      collapses={[
        {
          title: "디자인 시스템의 중요성",
          content:
            "디자인 시스템은 일관된 사용자 경험을 제공하고, 협업 생산성을 극대화하는 핵심 도구입니다.",
        },
        {
          title: "웹 접근성 가이드라인",
          content:
            "모든 사용자가 동등하게 콘텐츠에 접근할 수 있도록, WCAG 기준을 준수하는 것이 중요합니다.",
        },
        {
          title: "시간 관리 전략",
          content:
            "업무 우선순위를 설정하고, 타임블록 기법을 활용하면 집중력과 생산성이 높아집니다.",
        },
        {
          title: "협업 도구의 활용",
          content:
            "Notion, Slack, Figma 같은 협업 도구는 정보 공유와 팀 커뮤니케이션의 효율을 크게 향상시킵니다.",
        },
      ]}
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
      <h3 className="mt-4">Accordion</h3>
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
                    <Collapse
                      type="accordion"
                      collapses={[
                        {
                          title: "디자인 시스템의 중요성",
                          content:
                            "디자인 시스템은 일관된 사용자 경험을 제공하고, 협업 생산성을 극대화하는 핵심 도구입니다.",
                        },
                        {
                          title: "웹 접근성 가이드라인",
                          content:
                            "모든 사용자가 동등하게 콘텐츠에 접근할 수 있도록, WCAG 기준을 준수하는 것이 중요합니다.",
                        },
                        {
                          title: "시간 관리 전략",
                          content:
                            "업무 우선순위를 설정하고, 타임블록 기법을 활용하면 집중력과 생산성이 높아집니다.",
                        },
                        {
                          title: "협업 도구의 활용",
                          content:
                            "Notion, Slack, Figma 같은 협업 도구는 정보 공유와 팀 커뮤니케이션의 효율을 크게 향상시킵니다.",
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
                    {`import Tab from "@/app/component/Collapse/Collapse";
                    
<Card className="my-4 overflow-hidden ">
  <CardContent noMargin>
    <Collapse
      type="accordion"
      collapses={[
        {
          title: "디자인 시스템의 중요성",
          content:
            "디자인 시스템은 일관된 사용자 경험을 제공하고, 협업 생산성을 극대화하는 핵심 도구입니다.",
        },
        {
          title: "웹 접근성 가이드라인",
          content:
            "모든 사용자가 동등하게 콘텐츠에 접근할 수 있도록, WCAG 기준을 준수하는 것이 중요합니다.",
        },
        {
          title: "시간 관리 전략",
          content:
            "업무 우선순위를 설정하고, 타임블록 기법을 활용하면 집중력과 생산성이 높아집니다.",
        },
        {
          title: "협업 도구의 활용",
          content:
            "Notion, Slack, Figma 같은 협업 도구는 정보 공유와 팀 커뮤니케이션의 효율을 크게 향상시킵니다.",
        },
      ]}
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
