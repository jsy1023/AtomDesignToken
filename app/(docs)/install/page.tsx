import type { Metadata } from "next";
import { Card, CardContent } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import version from "@/versonHistory.json";

export const metadata: Metadata = {
  title: "Install",
  description: "",
  keywords: ["atomsystem"],
};

const DocsInstall = () => {
  return (
    <div className="py-12">
      <h1 className="mb-4 text-h1">설치하기</h1>
      <p className="mb-2">
        &nbsp; npm 명령어를 통해 다운로드 atomsystem을 다운로드 할 수 있습니다.
      </p>
      <Card>
        <CardContent noMargin>
          <CodeBlock language="npm">{`npm i atomsystem`}</CodeBlock>
        </CardContent>
      </Card>
      <hr className="my-4 border-fill-border" />
      <p className="mb-2">
        &nbsp; atomsystem은 react, next.js, tailwinds css를 의존하는 library
        입니다. <br /> 설치 뒤 다운로드해도 되며 npx 명령어를 통해 라이브러리를
        생성할 수 있습니다.
      </p>
      <Card>
        <CardContent noMargin>
          <CodeBlock language="npm">{`npx atomsystem-init`}</CodeBlock>
        </CardContent>
      </Card>
      <p className="my-2">
        &nbsp; npm init을 통해 token.json 파일과 build 로직을 설치합니다.
      </p>
      <hr className="my-4 border-fill-border" />
      <p className="mb-2">
        &nbsp; 컴포넌트는 기본적으로 app/components 폴더에 일괄적으로
        다운로드합니다. 해당 명령어를 입력하면 라이브러리에 모든 컴포넌트를
        다운로드합니다.
      </p>
      <Card>
        <CardContent noMargin>
          <CodeBlock language="npm">{`npx atomsystem-add`}</CodeBlock>
        </CardContent>
      </Card>
      <p className="my-2">
        &nbsp; 각 페이지에서 컴포넌트를 개별적으로 다운로드 받을 수 있습니다.
      </p>
      <hr className="my-4 border-fill-border" />
      <ul className="list-disc p-8">
        <li>
          <div className="flex gap-4">
            <p>
              최종수정일자: {version.page.install.version["0.0.1"].dateTime}
            </p>
            <p>version: {version.page.install.version["0.0.1"].version}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DocsInstall;
