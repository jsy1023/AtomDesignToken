import Link from "next/link";
import { Card } from "@/app/templates/Card/Card";
import { Input } from "@/app/templates/Input/Input";
import Image from "next/image";

import FigmaImage from "@/public/images/logos/figma.svg";
import TokensStudioImage from "@/public/images/logos/tokensStudio.png";
import Styledictionary from "@/public/images/logos/styledictionary.png";

const DocsHome = () => {
  return (
    <div className="py-12">
      <div className="flex items-center">
        <h1 className="text-h1">Atom System</h1>
      </div>
      <p className="text-text-sub mb-4">base Atomic design</p>
      <p className="text-sub">
        &nbsp;아톰그라운드 오픈 소스 디자인 시스템에 오신걸 환영합니다. 아토믹
        디자인 시스템에 대한 설명과 디자인방법론, 디자인리소스와 웹페이지와의
        연결방법까지 모든 디자인 이론과 함께 기술하며 언제든지 복사 붙여넣기를
        통해 프로젝트에 활용하세요.
      </p>
      <hr className="my-4 border-fill-border" />
      <h2 className="mb-4 text-h2">디자인 시스템에 관하여</h2>
      <p className="mb-3 text-sub">
        &nbsp;아톰그라운드 디자인 시스템은 아토믹 디자인 이론을 기반으로
        <span className="text-primary">.json</span>
        파일 하나로 디자인 부터 프론트엔드 연동까지 간편하게 디자인 및 구현하기
        위한 디자인 시스템 입니다.&nbsp;시스템 구성을 위해 다양한 서비스와
        라이브러리에 의존성을 가지고 있습니다. 아래의 사항을 고민하고 있다면
        아토믹 디자인 시스템의 도입을 고민해보세요
      </p>
      <ul className="grid grid-cols-2 border-t border-[var(--color-border)]">
        <li className="p-4">
          &nbsp;아토믹 디자인 시스템은 하나의 프론트엔드 코드로 다양한 시스템에
          도입할 수 있습니다. 여러가지 웹/앱 솔루션을 가지고 있다면 가장
          적합합니다.
        </li>
        <li className="p-4">
          &nbsp;서비스에 사용자 맞춤성을 높이기 위해 다양한 테마를 적용시키고
          싶다면 적합한 방법론/라이브러리입니다. 테마를 변경해보세요, 단순한
          색상변경뿐만 아니라 폰트와, 전체적인 디자인의 양식 변경까지
          가능합니다.
        </li>
        <li className="p-4">
          &nbsp;프로젝트를 빠르게 구축하면서도 자신만의 디자인을 최적화 할 수
          있습니다. 이는 다양한 에이전시의 프로젝트의 사용되기 적합합니다.
        </li>
        <li className="p-4">
          &nbsp;사용자와의 디테일한 상호작용을 설계하고 싶다면 아토믹 디자인
          시스템의 가이드를 따라 세밀하게 정의내릴 수 있습니다.
        </li>
      </ul>
      <hr className="my-4 border-fill-border" />
      <div className="hidden">
        <h2 className="text-h2">디자인 시스템 개요</h2>
        <p>
          &nbsp;아톰그라운드에 디자인 시스템은 간단한 아이디어에서
          시작되었습니다. 디자인 요소 정의하고 요소에 들어가는 여백, 타이포,
          하나하나를 변수화하여 다양한 변화에 적용할 수 있는 시스템 구조를
          구성합니다. 입력창을 정의하고 디자인 시스템을 적용해보겠습니다.
        </p>
        <Card className="my-4">
          <Input className="w-full"></Input>
        </Card>
        <hr className="my-4 border-fill-border" />
      </div>

      <h2 className="mb-4 text-h2">오픈 소스입니다.</h2>
      <div>
        <span className="text-sub">
          &nbsp;atomsystem은 실제 컴포넌트 코드를 제공합니다. 필요에 따라
          컴포넌트를 사용자 정의하고 확장할 수 있는 모든 권한이 있습니다. 이는
          다음을 의미합니다:
        </span>
        <ul className="list-disc ml-8">
          <li className="py-2">
            완전한 투명성: 각 컴포넌트가 어떻게 빌드되는지 정확히 볼 수
            있습니다.
          </li>
          <li className="py-2">
            간편한 사용자 지정: 디자인 및 기능 요구 사항에 맞게 컴포넌트의 모든
            부분을 수정할 수 있습니다.
          </li>
          <li className="py-2">
            AI 통합: 코드에 액세스하면 LLM이 컴포넌트를 쉽게 읽고, 이해하고,
            심지어 개선할 수 있습니다. 일반적인 라이브러리에서는 버튼의 동작을
            변경해야 하는 경우 스타일을 재정의하거나 컴포넌트를 래핑해야 합니다.
            atomsystem을 사용하면 버튼 코드를 직접 편집하기만 하면 됩니다.
          </li>
        </ul>
      </div>
      <hr className="my-4 border-fill-border" />
      <h2 className="mb-4 text-h2">아래의 기술을 사용합니다.</h2>
      <p className="text-sub">
        &nbsp;Figma에 Autolayout과 Component 기능을통해 디자인 적용단계에서
        프론트엔드와 동일한 컴포넌트 구성을 만들어냅니다. 이 때 Token Studio를
        통해 각 컴포넌트 구성의 변수화를 진행합니다. 변수화된 내용은 .json파일로
        전달되며 해당파일을 StyleDictionary 를 통해 css화 시켜 프로젝트에
        적용시킵니다.
      </p>
      <Card className="my-4 py-8">
        <ul className="flex">
          <li className="w-full">
            <div className="flex flex-col">
              <div className="w-24 h-24 self-center">
                <Image src={FigmaImage} alt={"Figma icon"} width={120}></Image>
              </div>
              <Link
                href={"https://www.figma.com"}
                target="_blank"
                className="text-center"
              >
                figma
                <span className="material-symbols-outlined ml-2">
                  <span className="text-base">arrow_outward</span>
                </span>
              </Link>
            </div>
          </li>
          <li className="w-full">
            <div className="flex flex-col">
              <div className="w-24 h-24 self-center">
                <Image
                  src={TokensStudioImage}
                  alt={"TokensStudio icon"}
                  width={120}
                  className="rounded"
                ></Image>
              </div>
              <Link
                href={"https://docs.tokens.studio"}
                target="_blank"
                className="text-center"
              >
                Token Studio
                <span className="material-symbols-outlined ml-2">
                  <span className="text-base">arrow_outward</span>
                </span>
              </Link>
            </div>
          </li>
          <li className="w-full">
            <div className="flex flex-col">
              <div className="w-24 h-24 self-center">
                <Image
                  src={Styledictionary}
                  alt={"Figma icon"}
                  width={120}
                ></Image>
              </div>
              <Link
                href={"https://styledictionary.com"}
                target="_blank"
                className="text-center"
              >
                Style Dictionary
                <span className="material-symbols-outlined ml-2">
                  <span className="text-base">arrow_outward</span>
                </span>
              </Link>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default DocsHome;
