import type { Metadata } from "next";

import { Button } from "@/cli/template/Button/Button";
import { Card, CardContent, CardHeader } from "@/cli/template/Card/Card";
import CodeBlock from "@/cli/template/CodeBlock/CodeBlock";
import { ThemeSelector } from "@/cli/template/Theme/Theme";
import Link from "next/link";
import version from "@/versonHistory.json";

export const metadata: Metadata = {
  title: "Button",
  description:
    "버튼은 데이터를 전송하거나 상호작용하는 요소로 목적에 따라 다양한 종류의 버튼과 상태정보를 가집니다",
  keywords: ["Button"],
};

const ComponentButton = () => {
  return (
    <div className="py-12">
      <h1 className="mb-4">버튼</h1>
      <p>
        &nbsp;버튼은 데이터를 전송하거나 상호작용하는 요소로 목적에 따라 다양한
        종류의 버튼과 상태정보를 가집니다.
      </p>
      <hr className="my-4" />
      <h2 className="mb-4">버튼의 디자인적 구성요소</h2>
      <p className="mb-4">
        &nbsp;버튼의 구성요소로는 배경색, 선, 여백을 기본으로 각 상태변화에 따른
        값을 가지고 있습니다.
      </p>
      <Card>
        <CardContent>
          <p>
            &nbsp;tailwinds css의 tailwinds.config.ts에 정의된 변수입니다.
            <br /> 해당 변수는 디자인에 따라 자유롭게 정의내리고 활용할 수
            있습니다.
          </p>
        </CardContent>
        <CardHeader noMargin>
          <CodeBlock language="typescript">
            {`theme: {
  extend: {
    colors: {
        "button-primary-standard":"var(--button-primary-standard-background)",
        "button-primary-hover":"var(--button-primary-hover-background)",
        "button-secondary-standard":"var(--button-secondary-standard-background)",
        "button-secondary-hover":"var(--button-secondary-hover-background)",
        "button-success-standard":"var(--button-success-standard-background)",
        "button-success-hover":"var(--button-success-hover-background)",
        "button-danger-standard":"var(--button-danger-standard-background)",
        "button-danger-hover":"var(--button-danger-hover-background)",
        "button-gray-standard":"var(--button-gray-standard-background)",
        "button-gray-hover":"var(--button-gray-hover-background)",
    },
      borderRadius: {
        "common": "var(--rounded-common)",
      },
  }
}`}
          </CodeBlock>
        </CardHeader>
        <div className="p-4">
          <ThemeSelector type="theme" />
        </div>
        <CardContent>
          <Card type="group" className="flex flex-wrap gap-4 justify-center">
            <Button type={"primary"}>버튼</Button>
          </Card>
        </CardContent>
      </Card>
      <hr className="my-4" />
      <h2 className="mb-4">버튼의 기본상태</h2>
      <p className="mb-4">
        &nbsp;버튼의 경우 브랜드의 색상을 표현해주는 primary, secondary와 색상을
        통해 사용자가 행동을 유추할 수 있는 success, danger, warning, gray 등이
        존재합니다.
      </p>
      <Card>
        <table className="w-full">
          <thead>
            <tr>
              <th>구분</th>
              <th>enabled</th>
              <th>hover</th>
              <th>disabled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>primary</td>
              <td>
                <Button type={"primary"}>버튼</Button>
              </td>
              <td>
                <Button
                  type={"primary"}
                  style={{
                    background: "var(--button-primary-hover-background)",
                  }}
                >
                  버튼
                </Button>
              </td>
              <td>
                <Button type={"primary"} disabled>
                  버튼
                </Button>
              </td>
            </tr>
            <tr>
              <td>secondary</td>
              <td>
                <Button type={"secondary"}>버튼</Button>
              </td>
              <td>
                <Button
                  type={"secondary"}
                  style={{
                    background: "var(--button-secondary-hover-background)",
                  }}
                >
                  버튼
                </Button>
              </td>
              <td>
                <Button type={"secondary"} disabled>
                  버튼
                </Button>
              </td>
            </tr>
            <tr>
              <td>success</td>
              <td>
                <Button type={"success"}>버튼</Button>
              </td>
              <td>
                <Button
                  type={"success"}
                  style={{
                    background: "var(--button-success-hover-background)",
                  }}
                >
                  버튼
                </Button>
              </td>
              <td>
                <Button type={"success"} disabled>
                  버튼
                </Button>
              </td>
            </tr>
            <tr>
              <td>danger</td>
              <td>
                <Button type={"danger"}>버튼</Button>
              </td>
              <td>
                <Button
                  type={"danger"}
                  style={{
                    background: "var(--button-danger-hover-background)",
                  }}
                >
                  버튼
                </Button>
              </td>
              <td>
                <Button type={"danger"} disabled>
                  버튼
                </Button>
              </td>
            </tr>
            <tr>
              <td>gray</td>
              <td>
                <Button type={"gray"}>버튼</Button>
              </td>
              <td>
                <Button
                  type={"gray"}
                  style={{
                    background: "var(--button-gray-hover-background)",
                  }}
                >
                  버튼
                </Button>
              </td>
              <td>
                <Button type={"gray"} disabled>
                  버튼
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
      <hr className="my-4" />
      <h2 className="mb-4">참고자료</h2>
      다음에 이론을 기반으로 아토믹 디자인 시스템 이론을 구성하였습니다.
      <Card className="my-4">
        <ul className="list-disc px-8">
          <li>
            mdn,
            <Link
              href={
                "https://developer.mozilla.org/ko/docs/Web/HTML/Element/button"
              }
              target="_blank"
              className="text-primary"
            >
              &nbsp;https://developer.mozilla.org/ko/docs/Web/HTML/Element/button
            </Link>
          </li>
        </ul>
      </Card>
      <hr className="my-4" />
      <ul className="list-disc p-8">
        <li>
          <div className="flex gap-4">
            <p>최종수정일자: {version.page.button.version["0.0.1"].dateTime}</p>
            <p>version: {version.page.button.version["0.0.1"].version}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ComponentButton;
