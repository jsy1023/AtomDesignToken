import { Card, CardHeader, CardContent } from "@/app/component/Card/Card";
import { Checkbox } from "@/app/component/Input/Input";
import Link from "next/link";
import version from "@/versonHistory.json";
import CodeBlock from "@/app/component/CodeBlock/CodeBlock";
import { ThemeSelector } from "@/app/component/Theme/Theme";

const ComponentCheckbox = () => {
  return (
    <div className="py-12">
      <h1 className="mb-4">체크박스</h1>
      <p>
        &nbsp;체크박스는 사용자가 여러가지 선택사항 중 한가지 이상 선택을 할 수
        있는 컨트롤러입니다. 1개 ~ 10개 사이의 선택사항이 있는 경우 체크박스의
        사용을 권장합니다.
      </p>
      <hr className="my-4" />
      <h2 className="mb-4">체크박스의 디자인적 구성요소</h2>
      <p className="mb-4">
        &nbsp;체크박스의 구성요소로는 배경색, 선, 여백, 기본으로 각 상태변화에
        따른 값을 가지고 있습니다. 해당 내용을 변수화하여 다양한 디자인을 적용할
        수 있도록 구성합니다.
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
        "input-border-standard": "var(--input-border-standard)",
        "input-border-focus": "var(--input-border-focus)",
    },
      borderRadius: {
        "input-rounded": "var(--input-rounded)"
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
            <Checkbox />
            <Checkbox label="체크박스" />
          </Card>
        </CardContent>
      </Card>
      <hr className="my-4" />
      <h2 className="mb-4">체크박스의 기본상태</h2>
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
                "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox"
              }
              target="_blank"
              className="text-primary"
            >
              &nbsp;https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
            </Link>
          </li>
        </ul>
      </Card>
      <hr className="my-4" />
      <ul className="list-disc p-8">
        <li>
          <div className="flex gap-4">
            <p>최종수정일자: {version.page.checkbox.dateTime}</p>
            <p>version: {version.page.checkbox.version}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ComponentCheckbox;
