import { Card, CardContent, CardHeader } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import Tab from "@/app/templates/Tab/Tab";
import token from "@/token.json";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Typography",
  description:
    "타이포그래피는 문자와 글자를 시각적으로 배열하는 기술이자 예술입니다. 글꼴(font), 크기(size), 자간(letter-spacing), 행간(line-height), 정렬(alignment) 등 텍스트의 형태와 구조를 조정하여 가독성과 심미성을 높이는 역할을 합니다.",
  keywords: ["Typography"],
};

const TokenColor = () => {
  const tokenOriginTypo = token.text;

  return (
    <>
      <h1 className="mb-4 text-h1">이론</h1>
      <p>
        &nbsp;타이포그래피는 문자와 글자를 시각적으로 배열하는 기술이자
        예술입니다. 글꼴(font), 크기(size), 자간(letter-spacing),
        행간(line-height), 정렬(alignment) 등 텍스트의 형태와 구조를 조정하여
        가독성과 심미성을 높이는 역할을 합니다.
      </p>

      <Tab
        tabs={[
          { id: "typo", target: ["typo"], tabItem: "TYPO" },
          { id: "token", target: ["token"], tabItem: "TOKEN" },
          { id: "css", target: ["css"], tabItem: "CSS" },
        ]}
        tabClass="sticky w-full top-0 bg-[var(--background-wrapper)] border-b border-[var(--color-border)] z-10"
        tabNavItemClass={
          "px-[var(--spacing-global-x)] py-[var(--spacing-global-y)] font-bold "
        }
        tabNavItemActiveClass="border-b border-primary"
        tabContentClass="p-0 border-0 mt-0"
        tabContents={[
          {
            id: "typoContent",
            tag: "typo",
            content: (
              <div className="flex flex-col items-start my-4">
                {/* black */}
                <Card className="my-4 w-full">
                  <CardContent>
                    <h1>보이지 않는 규칙이, 감동을 만듭니다.</h1>
                    <hr className="my-4" />
                    <h2>보이지 않는 규칙이, 감동을 만듭니다.</h2>
                    <hr className="my-4" />
                    <h3>보이지 않는 규칙이, 감동을 만듭니다.</h3>
                    <hr className="my-4" />
                    <h4>보이지 않는 규칙이, 감동을 만듭니다.</h4>
                    <hr className="my-4" />
                    <h5>보이지 않는 규칙이, 감동을 만듭니다.</h5>
                    <hr className="my-4" />
                    <h6>보이지 않는 규칙이, 감동을 만듭니다.</h6>
                    <hr className="my-4" />
                    <p>
                      사용자는 디자인의 구조를 인식하지 못한 채 자연스럽게
                      몰입합니다. 그 배경에는 타이포, 간격, 색상, 구성 등 보이지
                      않는 수많은 원칙들이 조용히 작동하며, 일관된 경험 속에
                      감동을 만들어냅니다.
                    </p>
                    <hr className="my-4" />
                    <small>
                      *플랫폼마다의 규칙과 경험들로 일관된 사용자 경험을
                      제공합니다.
                    </small>
                  </CardContent>
                </Card>
              </div>
            ),
          },
          {
            id: "tokenContent",
            tag: "token",
            content: (
              <Card className="my-4">
                <CardHeader>token.json</CardHeader>
                <CardContent noMargin>
                  <CodeBlock language="json">
                    {JSON.stringify(tokenOriginTypo, null, 2)}
                  </CodeBlock>
                </CardContent>
              </Card>
            ),
          },
          {
            id: "cssContent",
            tag: "css",
            content: (
              <Card className="my-4">
                <CardContent noMargin>
                  <CodeBlock language="json">
                    {`
h1 {
  font-size: var(--text-h1);
  line-height: var(--text-h1-line-height);
  font-weight: var(--text-h-weight);
}

h2 {
  font-size: var(--text-h2);
  line-height: var(--text-h2-line-height);
  font-weight: var(--text-h-weight);
}

h3 {
  font-size: var(--text-h3);
  line-height: var(--text-h3-line-height);
  font-weight: var(--text-h-weight);
}

h4 {
  font-size: var(--text-h4);
  line-height: var(--text-h4-line-height);
  font-weight: var(--text-h-weight);
}

h5 {
  font-size: var(--text-h5);
  line-height: var(--text-h5-line-height);
  font-weight: var(--text-h-weight);
}

h6 {
  font-size: var(--text-h6);
  line-height: var(--text-h6-line-height);
  font-weight: var(--text-h-weight);
}
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

export default TokenColor;
