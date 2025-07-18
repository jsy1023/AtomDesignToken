import { Card, CardContent, CardHeader } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import { NodeCollapse } from "@/app/templates/Collapse/Collapse";
import { Input } from "@/app/templates/Input/Input";
import Tab from "@/app/templates/Tab/Tab";
import token from "@/token.json";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Spacing",
  description:
    "간격은 화면의 요소들 사이 여백을 의미합니다. 이를 통해 시각적 정보 구조를 명확하게 만들고, 가독성을 향상시키며, 여백을 통해 고급스러운 이미지를 전달할 수 있습니다. 마지막으로, 간격은 사용자의 시각 흐름을 설계하는 데 중요한 역할을 합니다.",
  keywords: ["Spacing"],
};

const TokenColor = () => {
  const tokenSpacing = Object.entries(token.spacing);
  const tokenOriginSpacing = token.spacing;

  return (
    <>
      <h1 className="mb-4 text-h1">이론</h1>
      <p>
        &nbsp;간격은 화면의 요소들 사이 여백을 의미합니다. 이를 통해 시각적 정보
        구조를 명확하게 만들고, 가독성을 향상시키며, 여백을 통해 고급스러운
        이미지를 전달할 수 있습니다. 마지막으로, 간격은 사용자의 시각 흐름을
        설계하는 데 중요한 역할을 합니다.
      </p>

      <Tab
        tabs={[
          { id: "token", target: ["token"], tabItem: "TOKEN" },
          { id: "space", target: ["space"], tabItem: "SPACE" },
        ]}
        tabClass="sticky w-full top-0 bg-[var(--background-wrapper)] border-b border-[var(--color-border)] z-10"
        tabNavItemClass={
          "px-[var(--global-padding-x)] py-[var(--global-padding-y)] font-bold "
        }
        tabNavItemActiveClass="border-b border-primary"
        tabContentClass="p-0 border-0 mt-0"
        tabContents={[
          {
            id: "tokenContent",
            tag: "token",
            content: (
              <Card className="my-4">
                <CardHeader>token.json</CardHeader>
                <CardContent noMargin>
                  <CodeBlock language="json">
                    {JSON.stringify(tokenOriginSpacing, null, 2)}
                  </CodeBlock>
                </CardContent>
              </Card>
            ),
          },
          {
            id: "spaceContent",
            tag: "space",
            content: (
              <div className="flex flex-col items-start my-4">
                {/* black */}
                <Card className="my-4 w-full">
                  <NodeCollapse
                    type="accordion"
                    collapses={[
                      {
                        title: <b className="mb-2">Wrapper</b>,
                        content: (
                          <>
                            <p className="mb-4">
                              wrapper, 또는 section 요소의 상하좌우 여백을
                              설정합니다.
                            </p>
                            <div className="flex items-stretch w-full h-[200px]">
                              <div className="w-[var(--spacing-desktop-x)] h-full bg-danger opacity-80"></div>
                              <div className="w-full h-full flex flex-col">
                                <div className="w-full h-[var(--spacing-desktop-y)] bg-danger opacity-80"></div>
                                <div className="w-full h-full bg-white">
                                  content
                                </div>
                                <div className="w-full h-[var(--spacing-desktop-y)] bg-danger opacity-80"></div>
                              </div>
                              <div className="w-[var(--spacing-desktop-x)] h-full bg-danger opacity-80"></div>
                            </div>
                          </>
                        ),
                      },
                      {
                        title: <b className="mb-2">Component</b>,
                        content: (
                          <>
                            <p className="mb-4">
                              component 요소에 공통으로 적용되는 상하좌우 여백을
                              설정합니다.
                            </p>
                            <div className="flex items-stretch w-full h-[32px]">
                              <div className="w-[var(--spacing-global-x)] h-full bg-danger opacity-80"></div>
                              <div className="w-full h-full flex flex-col">
                                <div className="w-full h-[var(--spacing-global-y)] bg-danger opacity-80"></div>
                                <div className="w-full h-full bg-white">
                                  content
                                </div>
                                <div className="w-full h-[var(--spacing-global-y)] bg-danger opacity-80"></div>
                              </div>
                              <div className="w-[var(--spacing-global-x)] h-full bg-danger opacity-80"></div>
                            </div>
                          </>
                        ),
                      },
                    ]}
                  />
                </Card>
              </div>
            ),
          },
        ]}
      />

      <hr className="my-4" />

      <h2>space 사용</h2>
      <p>
        &nbsp;각 컴퍼넌트별로 커스텀 스페이스를 설정해주세요. 단순히
        tailwindscss의 padding, margin 기능을 이용해도 되지만, 공통된 변수로
        정의되어 관리된다면, 디자인 스타일에 따라 요소의 크기를 일괄적으로
        변동하여 규칙적인 시각적 변화를 제공해줄 수 있습니다.
      </p>
    </>
  );
};

export default TokenColor;
