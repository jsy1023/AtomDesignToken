import { Card, CardContent } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import GlobalNav from "@/app/templates/GlobalNav/GlobalNav";
import Tab from "@/app/templates/Tab/Tab";
import Table from "@/app/templates/Table/Table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GlobalNav",
  description:
    "웹사이트, 어플리케이션의 전체 구조에서 주요 영역으로 이동할 수 있도록 하는 상위 내비게이션 메뉴입니다.",
  keywords: ["GlobalNav, GlobalNavigation, Navigation "],
};

const ComponentGlobalNav = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">네비게이션</h1>
      <p>
        &nbsp;웹사이트, 어플리케이션의 전체 구조에서 주요 영역으로 이동할 수
        있도록 하는 상위 내비게이션 메뉴입니다.
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
                    <Card type="group" className="!p-0 min-h-40">
                      <GlobalNav
                        navMenu={[
                          {
                            name: "Root Navigation",
                            path: "#",
                            subItems: [
                              {
                                name: "Navigation 1",
                                path: "/component/global-nav",
                              },
                              {
                                name: "Navigation 2",
                                path: "#",
                              },
                              {
                                name: "Navigation 3",
                                path: "#",
                              },
                            ],
                          },
                          {
                            name: "Root Navigation 2",
                            path: "#",
                            subItems: [
                              {
                                name: "Navigation 1",
                                path: "#",
                              },
                              {
                                name: "Navigation 2",
                                path: "#",
                              },
                              {
                                name: "Navigation 3",
                                path: "#",
                              },
                            ],
                          },
                          { name: "Navigation 3", path: "#" },
                        ]}
                      />
                    </Card>
                  </CardContent>
                </Card>

                <Card className="my-4">
                  <CardContent>
                    <Table
                      tableData={[
                        {
                          Prop: "navMenu",
                          Type: "object",
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
                    {`import GlobalNav from "@/app/templates/GlobalNav/GlobalNav";
                    
<GlobalNav
  navMenu={[
    {
      name: "Root Navigation",
      path: "#",
      subItems: [
        {
          name: "Navigation 1",
          path: "/component/global-nav",
        },
        {
          name: "Navigation 2",
          path: "#",
        },
        {
          name: "Navigation 3",
          path: "#",
        },
      ],
    },
    {
      name: "Root Navigation 2",
      path: "#",
      subItems: [
        {
          name: "Navigation 1",
          path: "#",
        },
        {
          name: "Navigation 2",
          path: "#",
        },
        {
          name: "Navigation 3",
          path: "#",
        },
      ],
    },
    { name: "Navigation 3", path: "#" },
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
      <hr className="my-4" />
      <h2>Installation</h2>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="npm">{`npx atomsystem-add GlobalNav`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />
      <h2>Usage</h2>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">
            {`import GlobalNav from "@/app/templates/GlobalNav/GlobalNav" `}
          </CodeBlock>
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardContent noMargin>
          <CodeBlock language="typescript">{`
<GlobalNav
  type="topmenu"
  navMenu={[
    {
      name: "Root Navigation",
      path: "#",
      subItems: [
        {
          name: "Navigation 1",
          path: "/component/global-nav",
        },
        {
          name: "Navigation 2",
          path: "#",
        },
      ],
    },
    {
      name: "Root Navigation 2",
      path: "#",
      subItems: [
        {
          name: "Navigation 1",
          path: "#",
        },
        {
          name: "Navigation 2",
          path: "#",
        },
      ],
    },
    { name: "Navigation 3", path: "#" },
  ]}
/>`}</CodeBlock>
        </CardContent>
      </Card>

      <hr className="my-4" />

      <h2>Example</h2>
      <h3 className="mt-4">sidemenu</h3>
      <Tab
        tabs={[
          { id: "preview", target: ["mainNav"], tabItem: "preview" },
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
            id: "mainContent",
            tag: "mainNav",
            content: (
              <>
                <Card className="my-4">
                  <CardContent>
                    <Card type="group" className="!p-0 min-h-40">
                      <GlobalNav
                        navMenu={[
                          {
                            name: "Root Navigation",
                            path: "#",
                            subItems: [
                              {
                                name: "Navigation 1",
                                path: "/component/global-nav",
                              },
                              {
                                name: "Navigation 2",
                                path: "#",
                              },
                              {
                                name: "Navigation 3",
                                path: "#",
                              },
                            ],
                          },
                          {
                            name: "Root Navigation 2",
                            path: "#",
                            subItems: [
                              {
                                name: "Navigation 1",
                                path: "#",
                              },
                              {
                                name: "Navigation 2",
                                path: "#",
                              },
                              {
                                name: "Navigation 3",
                                path: "#",
                              },
                            ],
                          },
                          { name: "Navigation 3", path: "#" },
                        ]}
                      />
                    </Card>
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
                    {`import GlobalNav from "@/app/templates/GlobalNav/GlobalNav";
                    
<GlobalNav
  navMenu={[
    {
      name: "Root Navigation",
      path: "#",
      subItems: [
        {
          name: "Navigation 1",
          path: "/component/global-nav",
        },
        {
          name: "Navigation 2",
          path: "#",
        },
        {
          name: "Navigation 3",
          path: "#",
        },
      ],
    },
    {
      name: "Root Navigation 2",
      path: "#",
      subItems: [
        {
          name: "Navigation 1",
          path: "#",
        },
        {
          name: "Navigation 2",
          path: "#",
        },
        {
          name: "Navigation 3",
          path: "#",
        },
      ],
    },
    { name: "Navigation 3", path: "#" },
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
      <h3 className="mt-4">topmenu</h3>
      <Tab
        tabs={[
          { id: "preview", target: ["mainNav"], tabItem: "preview" },
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
            id: "mainContent",
            tag: "mainNav",
            content: (
              <>
                <Card className="my-4">
                  <CardContent>
                    <Card type="group" className="!p-0 min-h-40">
                      <GlobalNav
                        type="topmenu"
                        navMenu={[
                          {
                            name: "Root Navigation",
                            path: "#",
                            subItems: [
                              {
                                name: "Navigation 1",
                                path: "/component/global-nav",
                              },
                              {
                                name: "Navigation 2",
                                path: "#",
                              },
                            ],
                          },
                          {
                            name: "Root Navigation 2",
                            path: "#",
                            subItems: [
                              {
                                name: "Navigation 1",
                                path: "#",
                              },
                              {
                                name: "Navigation 2",
                                path: "#",
                              },
                            ],
                          },
                          { name: "Navigation 3", path: "#" },
                        ]}
                      />
                    </Card>
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
                    {`import GlobalNav from "@/app/templates/GlobalNav/GlobalNav";
                    
<GlobalNav
  type="topmenu"
  navMenu={[
    {
      name: "Root Navigation",
      path: "#",
      subItems: [
        {
          name: "Navigation 1",
          path: "/component/global-nav",
        },
        {
          name: "Navigation 2",
          path: "#",
        },
      ],
    },
    {
      name: "Root Navigation 2",
      path: "#",
      subItems: [
        {
          name: "Navigation 1",
          path: "#",
        },
        {
          name: "Navigation 2",
          path: "#",
        },
      ],
    },
    { name: "Navigation 3", path: "#" },
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

      <h3 className="mt-4">menuWithLabel</h3>
      <Tab
        tabs={[
          { id: "preview", target: ["mainNav"], tabItem: "preview" },
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
            id: "mainContent",
            tag: "mainNav",
            content: (
              <>
                <Card className="my-4">
                  <CardContent>
                    <Card type="group" className="!p-0 min-h-40">
                      <GlobalNav
                        type="sidebar"
                        navMenu={[
                          {
                            name: "Root Navigation",
                            path: "#",
                            subItems: [
                              {
                                name: "Navigation 1",
                                path: "/component/global-nav",
                              },
                              {
                                name: "Navigation 2",
                                path: "#",
                              },
                            ],
                          },
                          {
                            name: "Root Navigation 2",
                            path: "#",
                            subItems: [
                              {
                                name: "Navigation 1",
                                path: "#",
                              },
                              {
                                name: "Navigation 2",
                                path: "#",
                              },
                            ],
                          },
                          { name: "label", label: true },
                          { name: "Navigation 3", path: "#" },
                        ]}
                      />
                    </Card>
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
                    {`import GlobalNav from "@/app/templates/GlobalNav/GlobalNav";
                    
<GlobalNav
  type="topmenu"
  navMenu={[
    {
      name: "Root Navigation",
      path: "#",
      subItems: [
        {
          name: "Navigation 1",
          path: "/component/global-nav",
        },
        {
          name: "Navigation 2",
          path: "#",
        },
      ],
    },
    {
      name: "Root Navigation 2",
      path: "#",
      subItems: [
        {
          name: "Navigation 1",
          path: "#",
        },
        {
          name: "Navigation 2",
          path: "#",
        },
      ],
    },
    { name: "label", label: true },
    { name: "Navigation 3", path: "#" },
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
    </>
  );
};
export default ComponentGlobalNav;
