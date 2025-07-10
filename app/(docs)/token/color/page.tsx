import { Card, CardContent, CardHeader } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import { NodeCollapse } from "@/app/templates/Collapse/Collapse";
import { Input } from "@/app/templates/Input/Input";
import Tab from "@/app/templates/Tab/Tab";
import token from "@/token.json";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Color",
  description:
    "색상은 강력한 디자인 언어입니다. 웹사이트에서 사용자 행동을 유도하고, 브랜드 색상을 디지털 경험 속에 자연스럽게 녹여내어 브랜드 이미지를 형성합니다. 제품의 계층 구조, 상태, 브랜드를 효과적으로 보여줄 수 있도록, 접근성이 뛰어나고 개인화된 색상 체계를 구축해 보세요.",
  keywords: ["Color"],
};

const TokenColor = () => {
  const tokenColor = Object.entries(token.color);
  const tokenOriginColor = token.color;

  return (
    <>
      <h1 className="mb-4 text-h1">이론</h1>
      <p>
        &nbsp;색상은 강력한 디자인 언어입니다. 웹사이트에서 사용자 행동을
        유도하고, 브랜드 색상을 디지털 경험 속에 자연스럽게 녹여내어 브랜드
        이미지를 형성합니다. 제품의 계층 구조, 상태, 브랜드를 효과적으로 보여줄
        수 있도록, 접근성이 뛰어나고 개인화된 색상 체계를 구축해 보세요.
      </p>
      <hr className="my-4" />
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
                    {JSON.stringify(tokenOriginColor, null, 2)}
                  </CodeBlock>
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
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("black"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">GRAY</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("gray"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">RED</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("red"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">MAGENTA</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("magenta"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">PURPLE</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("purple"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">VIOLET</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("violet"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">DEEPBLUE</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("deepblue"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">BLUE</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("blue"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">SKY</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("sky"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">TEAL</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("teal"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">DEEPGREEN</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("deepgreen"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">GREEN</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("green"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">LIGHTGREEN</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("lightgreen"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">YELLOW</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("yellow"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">AMBER</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("amber"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">ORANGE</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("orange"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">DEEPORANGE</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("deeporange"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      },
                      {
                        title: <b className="mb-2">BROWN</b>,
                        content: (
                          <div className="flex flex-wrap gap-0 gap-y-4">
                            {tokenColor
                              .filter(([name]) => name.startsWith("brown"))
                              .map(([name, obj]) => {
                                return (
                                  <div key={name} className="flex flex-col">
                                    <div
                                      className={`w-32 h-32`}
                                      style={{
                                        backgroundColor: obj.value as string,
                                      }}
                                    ></div>
                                    <p>
                                      <b>{name}</b>
                                    </p>
                                    <small className="text-sub">{`${obj.value}`}</small>
                                  </div>
                                );
                              })}
                          </div>
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

      <h2>팔레트의 사용</h2>
      <p>
        &nbsp;팔레트의 색상은 사용자가 자유롭게 정의합니다. 그러나 다양한
        인터렉션 상황과 컴포넌트에 변화에도 불구하고 일관된 사용자 경험을 가질
        수 있도록 채도와 색상을 구분하여 10단계의 컬러단계를 나누는 것을
        권장합니다.
      </p>

      <hr className="my-4" />

      <h2>팔레트의 적용</h2>
      <p>
        &nbsp;컴포넌트 디자인에 필요한 토큰들을 정의하고 팔레트의 색상을
        적용시킵니다. 해당 토큰과 팔레트의 json 데이터는. token-studio를 통해
        figma와 연동이 되며 이를 통해, 디자인과 프론트엔드 작업을 연동시켜
        작업의 효율성을 향상시킵니다.
      </p>
      <p>&nbsp;하단의 컴포넌트를 참조해주세요</p>

      <Tab
        tabs={[
          { id: "preview", target: ["preview"], tabItem: "preview" },
          { id: "code", target: ["code"], tabItem: "code" },
          { id: "json", target: ["json"], tabItem: "json" },
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
                      <Input className="w-full" />
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
                    {`import { Input } from "@/app/components/Input/Input" 

<Input />`}
                  </CodeBlock>
                </CardContent>
              </Card>
            ),
          },
          {
            id: "jsonContent",
            tag: "json",
            content: (
              <Card className="my-4">
                <CardContent noMargin>
                  <CodeBlock language="json">
                    {`
  "input": {
    "background": {
      "standard": {
        "value": {
          "light": "{color.white}",
          "dark": "{color.black-800}"
        },
        "type": "color"
      },
      "hover": {
        "value": {
          "light": "{color.gray-200}",
          "dark": "{color.black-700}"
        },
        "type": "color"
      },
      "disabled": {
        "value": {
          "light": "{color.gray-500}",
          "dark": "{color.black-600}"
        },
        "type": "color"
      }
    },
    "text": {
      "standard": {
        "value": {
          "light": "{color.black-800}",
          "dark": "{color.gray-500}"
        }
      },
      "disabled": {
        "value": {
          "light": "{color.black-300}",
          "dark": "{color.black-500}"
        }
      }
    },
    "border": {
      "standard": {
        "value": {
          "light": "{color.gray-900}",
          "dark": "{color.black-600}"
        },
        "type": "color"
      },
      "focus": {
        "value": {
          "light": "{color.black-800}",
          "dark": "{color.gray-900}"
        },
        "type": "color"
      }
    },
    "rounded": {
      "value": "{global.rounded.value}",
      "type": "borderRadius"
    }
  },`}
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

export default TokenColor;
