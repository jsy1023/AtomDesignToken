import { Card, CardContent, CardHeader } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import { NodeCollapse } from "@/app/templates/Collapse/Collapse";
import { Input } from "@/app/templates/Form/Form";
import Tab from "@/app/templates/Tab/Tab";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Color",
  description:
    "색상은 강력한 디자인 언어입니다. 웹사이트에서 사용자 행동을 유도하고, 브랜드 색상을 디지털 경험 속에 자연스럽게 녹여내어 브랜드 이미지를 형성합니다. 제품의 계층 구조, 상태, 브랜드를 효과적으로 보여줄 수 있도록, 접근성이 뛰어나고 개인화된 색상 체계를 구축해 보세요.",
  keywords: ["Color"],
};

const TokenColor = () => {
  return (
    <>
      <h1 className="mb-4 text-h1">이론</h1>
      <p>
        &nbsp;색상은 강력한 디자인 언어입니다. 웹사이트에서 사용자 행동을
        유도하고, 브랜드 색상을 디지털 경험 속에 자연스럽게 녹여내어 브랜드
        이미지를 형성합니다. 제품의 계층 구조, 상태, 브랜드를 효과적으로 보여줄
        수 있도록, 접근성이 뛰어나고 개인화된 색상 체계를 구축해 보세요.
      </p>
      <hr className="my-4 border-border" />
      <h2>색상 팔레트</h2>
      <p className="mb-4">
        &nbsp;색상 팔레트는 웹사이트에서 사용되는 색상의 집합을 의미합니다. 색상
        팔레트 안에서 시스템 컬러, 브랜드 컬러, 텍스트 컬러, 배경 컬러, 테마
        컬러 등 다양한 컬러를 사용하여, 색상의 통일성을 유지합니다.
      </p>

      <Tab
        tabs={[
          { id: "token", target: ["token"], tabItem: "TOKEN" },
          { id: "color", target: ["color"], tabItem: "COLOR" },
        ]}
        tabClass="sticky w-full top-0 bg-[var(--background-wrapper)] border-b border-border z-10"
        tabNavItemClass={
          "px-[var(--spacing-global-x)] py-[var(--spacing-global-y)] font-bold "
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
                  <CodeBlock language="json"><></></CodeBlock>
                </CardContent>
              </Card>
            ),
          },
          {
            id: "colorContent",
            tag: "color",
            content: (
              <div className="flex flex-col items-start my-4">
                {/* black */}
                <Card className="my-4 w-full">
                  <NodeCollapse
                    type="accordion"
                    collapses={[
                      {
                        title: <b className="mb-2">BLACK</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">GRAY</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">RED</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">MAGENTA</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">PURPLE</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">VIOLET</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">DEEPBLUE</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">BLUE</b>,
                        content: (<></>)
                      },
                      {
                        title: <b className="mb-2">SKY</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">TEAL</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">DEEPGREEN</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">GREEN</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">LIGHTGREEN</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">YELLOW</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">AMBER</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">ORANGE</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">DEEPORANGE</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">RED</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">DEEPRED</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">WHITE</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">GRAY</b>,
                        content: (<></>),
                      },
                      {
                        title: <b className="mb-2">BLACK</b>,
                        content: (<></>),
                      },
                    ]}
                  />
              </Card>
            </div>
          ),
        },
      ]}
    />
  </>
  );
};

export default TokenColor;