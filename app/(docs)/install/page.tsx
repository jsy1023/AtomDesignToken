import type { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/app/templates/Card/Card";
import CodeBlock from "@/app/templates/CodeBlock/CodeBlock";
import version from "@/versonHistory.json";

export const metadata: Metadata = {
  title: "Install",
  description: "",
  keywords: ["atomsystem"],
};

const DocsInstall = () => {
  const buildCodeString = `
import StyleDictionary from "style-dictionary";

const valueWithUnit = (val) => {
  return typeof val === "number" ? \`\${val}px\` : val;
};

// register it with register method
StyleDictionary.registerFormat({
  name: "css/variables-multi-context",
  format: ({ dictionary }) => {
    const root = []; // root variables
    const light = []; // light variables
    const dark = []; // dark variables
    // 필요에 따라 테마 추가 작업 필요

    dictionary.allTokens.map((token) => {
      const name = \`--\${token.name}\`;
      const val = token.value;
      if (
        typeof token.value === "object" &&
        (token.value.light || token.value.dark)
      ) {
        if (token.value.light) {
          light.push(\`\${name}: \${valueWithUnit(val.light)};\`);
        }
        if (token.value.dark) {
          dark.push(\`\${name}: \${valueWithUnit(val.dark)};\`);
        }
      } else {
        root.push(\`\${name}: \${valueWithUnit(val)};\`);
      }
    });
    //css 반환
    return \`
    @import "tailwindcss";

    @theme {
        \${root.join("\\n")}
    }
        
    :root{
          \${root.join("\\n")}
    }    
    .light {
        \${light.join("\\n")}
    }
    .dark {
        \${dark.join("\\n")}
    }\`.trim();
  },
});

const sd = new StyleDictionary({
  source: ["token.json"], //경로 설정
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "app/",
      files: [
        {
          destination: "globals.css",
          format: "css/variables-multi-context",
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
`;

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
      <h2 className="mb-2">json 파일 구성</h2>
      <p className="text-sub mb-2">
        &nbsp;컴포넌트 별로 json 변수를 지정합니다. 최초 디자인 후 컴포넌트
        정의를 끝냈다면 다음 유지보수 단계에서 부터는 단순히 json 데이터를
        수정함으로써 유지할 수 있습니다. global token 값에 따라 Component의
        영향을 받도록 구성하면서 디자인의 일관성 또한 유지하도록 설계하였습니다.
      </p>
      <Card>
        <CardHeader>token.json</CardHeader>
        <CardContent noMargin>
          <CodeBlock language="json">
            {`{
  "color": {
    "primary": { "value": "#2196f3", "type": "color" },
    "border": {
      "value": {
        "light": "#ccc",
        "dark": "#444"
      },
      "type": "color"
    }
  }
}
\\ 생략 
`}
          </CodeBlock>
        </CardContent>
      </Card>
      <hr className="my-4 border-fill-border" />
      <h2 className="mb-2">css 파일 구성</h2>
      <p className="text-sub mb-2">
        &nbsp;추가적인 커스텀 클래스를 위해 이용합니다.
      </p>
      <Card>
        <CardHeader>global.css</CardHeader>
        <CardContent noMargin>
          <CodeBlock language="css">{`
:root{
  --color-primary: #2196f3;
} 
  
.light {
    --color-border: #ccc;
}   

.dark {
    --color-border: #444;
}
          `}</CodeBlock>
        </CardContent>
      </Card>
      <hr className="my-4 border-fill-border" />
      <h2 className="mb-2">Build 파일 구성</h2>
      <p className="text-sub mb-2">
        &nbsp;StyleDictionary 라이브러리 커스텀을 통해 json파일을 여러 테마의
        css variables로 변환합니다.
      </p>
      <Card>
        <CardHeader>build-tokens.js</CardHeader>
        <CardContent noMargin>
          <CodeBlock language="javascript">{buildCodeString}</CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocsInstall;
