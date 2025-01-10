import { Card, CardHeader, CardContent } from "@/app/component/Card/Card";
import { Input } from "@/app/component/Input/Input";
import Link from "next/link";
import version from "@/versonHistory.json";
import CodeBlock from "@/app/component/CodeBlock/CodeBlock";

const ComponentHome = () => {
  return (
    <div className="py-12">
      <h1 className="mb-4">입력창</h1>
      <p>
        &nbsp;입력창은 사용자로부터 데이터를 전달받기 위한 대화형
        컨트롤러입니다. 다양한 종류로 구성되어 있으며 사용자와의 상호작용을 위해
        입력창의 상태전화를 직관적으로 표현해야합니다.
      </p>
      <hr className="my-4" />
      <h2 className="mb-4">입력창의 디자인적 구성요소</h2>
      <p className="mb-4">
        &nbsp;입력창의 구성요소로는 배경색, 선, 글자, 모서리\를 기본으로 각
        상태변화에 따른 값을 가지고 있습니다. 해당 내용을 변수화하여 다양한
        디자인을 적용할 수 있도록 구성합니다.
      </p>
      <Card>
        <CardContent>
          <p>&nbsp;tailwinds css의 tailwinds.config.ts에 정의된 변수입니다.</p>
        </CardContent>
        <CardHeader>
          <CodeBlock language="typescript">
            {`theme: {
  extend: {
    colors: {
      "input-background-standard": "var(--input-background-standard)",
      "input-border-standard": "var(--input-border-standard)",
    },
  }
}`}
          </CodeBlock>
        </CardHeader>
        <CardContent>
          <Input />
        </CardContent>
      </Card>
      <hr className="my-4" />
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

export default ComponentHome;
