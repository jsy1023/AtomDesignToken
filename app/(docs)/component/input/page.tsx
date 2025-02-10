import { Card, CardHeader, CardContent } from "@/app/component/Card/Card";
import { Input } from "@/app/component/Input/Input";
import Link from "next/link";
import version from "@/versonHistory.json";
import CodeBlock from "@/app/component/CodeBlock/CodeBlock";
import { ThemeSelector } from "@/app/component/Theme/Theme";

const ComponentInput = () => {
  return (
    <div className="py-12">
      <h1 className="mb-4">입력창</h1>
      <p>
        &nbsp;입력창은 사용자로부터 데이터를 전달받기 위한 대화형
        컨트롤러입니다. 다양한 종류로 구성되어 있으며 사용자와의 상호작용을 위해
        입력창의 상태전환을 직관적으로 표현해야합니다.
      </p>
      <hr className="my-4" />
      <h2 className="mb-4">입력창의 디자인적 구성요소</h2>
      <p className="mb-4">
        &nbsp;입력창의 구성요소로는 배경색, 선, 글자, 여백, 모서리를 기본으로 각
        상태변화에 따른 값을 가지고 있습니다. 해당 내용을 변수화하여 다양한
        디자인을 적용할 수 있도록 구성합니다.
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
        "input-background-success": "var(--input-background-success)",
        "input-background-error": "var(--input-background-error)",
        "input-border-standard": "var(--input-border-standard)",
        "input-border-focus": "var(--input-border-focus)",
        "input-border-success": "var(--input-border-success)",
        "input-border-error": "var(--input-border-error)",
        "input-text-value": "var(--input-text-value)",
        "input-text-placeholder": "var(--input-text-placeholder)",
        "input-text-success": "var(--input-text-success)",
        "input-text-error": "var(--input-text-error)",
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
          <Card type="group" className="flex justify-center">
            <Input className="w-full" />
          </Card>
        </CardContent>
      </Card>
      <hr className="my-4" />
      <h2 className="mb-4">입력창의 다양한 상태구성</h2>
      <p className="mb-4">
        &nbsp;입력창은 다양한 상태 값을 가지며 이러한 상태를 디자인적으로
        직관적으로 표현함으로서 사용자가 입력창의 상태를 바로 파악하고 다음의
        행위를 유추할 수 있도록 제공해야합니다.
      </p>
      <Card>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Input label="기본(readonly)" readOnly />
          </div>
          <div>
            <Input
              label="활성화:(focus)"
              className="input-focus-custom"
              readOnly
            />
          </div>
          <div>
            <Input label="비활성화" disabled />
          </div>
          <div>
            <Input label="값이 있을 때" defaultValue="디자인시스템" />
          </div>
          <div>
            <Input label="필수인 값일 때" required />
          </div>
          <div></div>
          <div>
            <Input
              label="유효한 값일 떄"
              defaultValue="정상적인 값"
              pattern="정상적인 값"
              required
            />
          </div>
          <div>
            <Input
              label="유효한 값이 아닐 떄"
              defaultValue="비정상적인 값"
              pattern="정상적인 값"
              required
            />
          </div>
        </div>
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
                "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
              }
              target="_blank"
              className="text-primary"
            >
              &nbsp;https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
            </Link>
          </li>
        </ul>
      </Card>
      <hr className="my-4" />
      <ul className="list-disc p-8">
        <li>
          <div className="flex gap-4">
            <p>최종수정일자: {version.page.input.dateTime}</p>
            <p>version: {version.page.input.version}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ComponentInput;
