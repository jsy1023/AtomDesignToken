import type { Metadata } from "next";

import { Card, CardHeader, CardContent } from "@/app/component/Card/Card";
import { Select } from "@/app/component/Input/Input";
import Link from "next/link";
import version from "@/versonHistory.json";
import CodeBlock from "@/app/component/CodeBlock/CodeBlock";
import { ThemeSelector } from "@/app/component/Theme/Theme";

export const metadata: Metadata = {
  title: "Select",
  description:
    "선택창은 여러가지 항목중 단일의 내용을 선택할 수 있는 컨트롤러입니다. 10개 이상의 선택지가 있는 경우에 사용을 권장합니다.",
  keywords: ["Select"],
};

const ComponentSelect = () => {
  return (
    <div className="py-12">
      <h1 className="mb-4">선택창</h1>
      <p>
        &nbsp;선택창은 여러가지 항목중 단일의 내용을 선택할 수 있는
        컨트롤러입니다. 10개 이상의 선택지가 있는 경우에 사용을 권장합니다.
      </p>
      <hr className="my-4" />
      <h2 className="mb-4">선책창의 디자인적 구성요소</h2>
      <p className="mb-4">
        &nbsp;선택창의 디자인 구성요소로는 배경색, 선, 여백을 기본으로 각
        상태변화에 따른 값을 가지고 있습니다.
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
        "input-background-standard": "var(--input-background-standard)",
        "input-background-disabled": "var(--input-background-disabled)",
        "input-background-value": "var(--input-background-value)",
        "input-border-standard": "var(--input-border-standard)",
        "input-border-focus": "var(--input-border-focus)",
        "input-text-value": "var(--input-text-value)",
        "input-text-placeholder": "var(--input-text-placeholder)",
    },
      borderRadius: {
        "input-border": "var(--input-rounded)"
      },
  }
}`}
          </CodeBlock>
        </CardHeader>
        <div className="p-4">
          <ThemeSelector type="all" />
        </div>
        <CardContent>
          <Card
            type="group"
            className="flex flex-col flex-wrap gap-4 justify-center"
          >
            <Select options={["대한민국", "일본", "미국", "대만", "중국"]} />
            <p className="mb-4">
              &nbsp;선택창의 경우 7개 이상의 선택요소가 있을 경우에 사용하므로
              리스트 내 검색기능을 제공합니다.
            </p>
          </Card>
        </CardContent>
      </Card>
      <hr className="my-4" />
      {/* <h2 className="mb-4">체크박스의 활용</h2>
      <p className="mb-4">
        &nbsp;체크박스의 기본상태 정보입니다. true, false를 표현하기 위해
        단순하게 구성되어 있습니다.
      </p>
      <Card>
        <div className="grid grid-cols-3 gap-4">
          <Checkbox label="기본" defaultChecked />
          <Checkbox label="활성화:focus" className="input-focus-custom" />
          <Checkbox label="비활성화" disabled />
        </div>
      </Card>
      <hr className="my-4" /> */}
      <h2 className="mb-4">참고자료</h2>
      다음에 이론을 기반으로 아토믹 디자인 시스템 이론을 구성하였습니다.
      <Card className="my-4">
        <ul className="list-disc px-8">
          <li>
            mdn,
            <Link
              href={
                "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select"
              }
              target="_blank"
              className="text-primary"
            >
              &nbsp;https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
            </Link>
          </li>
        </ul>
      </Card>
      <hr className="my-4" />
      <ul className="list-disc p-8">
        <li>
          <div className="flex gap-4">
            <p>최종수정일자: {version.page.select.version["0.0.1"].dateTime}</p>
            <p>version: {version.page.select.version["0.0.1"].version}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ComponentSelect;
