"use client";

import Link from "next/link";
import Card from "../component/Card/Card";
import Input from "../component/Input/Input";
import Image from "next/image";

import atomicSymbol from "@/public/images/global/logoSymbol.svg";

import FigmaImage from "@/public/images/logos/figma.svg";
import TokensStudioImage from "@/public/images/logos/tokensStudio.png";
import Styledictionary from "@/public/images/logos/styledictionary.png";

import version from "@/versonHistory.json";

const themes = ["default", "dark"];

const DocsHome = () => {
  const handleThemeChange = (theme: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme); // 로컬 스토리지에 새로운 테마 저장
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="py-12">
      <div className="flex items-center">
        <div className="w-16">
          <Image src={atomicSymbol} alt={"atomground"}></Image>
        </div>
        <h1>Atomground Design System</h1>
      </div>
      <p className="text-textSub mb-4">base Atomic Design System</p>
      <p>
        &nbsp;아톰그라운드 오픈 소스 디자인 시스템에 오신걸 환영합니다. 아토믹
        디자인 시스템에 대한 설명과 디자인방법론, 디자인리소스와 웹페이지와의
        연결방법까지 모든 디자인 이론과 함께 기술하며 언제든지 복사 붙여넣기를
        통해 프로젝트에 활용하세요.
        <br />
      </p>
      <hr className="my-4" />
      <h2 className="mb-4">디자인 시스템에 관하여</h2>
      &nbsp;아톰그라운드 디자인 시스템은 아토믹 디자인을 기반으로 디자인부터
      프론트엔드 개발까지 효율적이고 체계적으로 구현하기 위한 방법론입니다.
      시스템 구성을 위해 다양한 서비스와 라이브러리에 의존성을 가지고 있습니다.
      아래의 사항을 고민하고 있다면 아토믹 디자인 시스템의 도입을 고민해보세요
      <ul className="list-disc p-8">
        <li className="mb-2">
          &nbsp;아토믹 디자인 시스템은 하나의 프론트엔드 코드로 다양한 시스템에
          도입할 수 있습니다. 여러가지 웹/앱 솔루션을 가지고 있다면 가장
          적합합니다.
        </li>
        <li>
          &nbsp;서비스에 사용자 맞춤성을 높이기 위해 다양한 테마를 적용시키고
          싶다면 적합한 방법론/라이브러리입니다. 테마를 변경해보세요, 단순한
          색상변경뿐만 아니라 폰트와, 전체적인 디자인의 양식 변경까지
          가능합니다.
          <Card className="my-4">
            <div className="flex gap-8">
              <p>theme 선택</p>
              <div className="flex gap-4">
                {themes.map((theme) => (
                  <button
                    className={`cursor-pointer`}
                    key={theme}
                    onClick={() => handleThemeChange(theme)}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </li>
        <li>
          &nbsp;프로젝트를 빠르게 구축하면서도 자신만의 디자인을 최적화 할 수
          있습니다. 이는 다양한 에이전시의 프로젝트의 사용되기 적합합니다.
        </li>
      </ul>
      <hr className="my-4" />
      <div className="hidden">
        <h2>디자인 시스템 개요</h2>
        <p>
          &nbsp;아톰그라운드에 디자인 시스템은 간단한 아이디어에서
          시작되었습니다. 디자인 요소 정의하고 요소에 들어가는 여백, 타이포,
          하나하나를 변수화하여 다양한 변화에 적용할 수 있는 시스템 구조를
          구성합니다. 입력창을 정의하고 디자인 시스템을 적용해보겠습니다.
        </p>
        <Card className="my-4">
          <Input className="w-full"></Input>
        </Card>
        <hr className="my-4" />
      </div>
      <h2 className="mb-4">아래의 기술을 사용합니다.</h2>
      <p>
        &nbsp;Figma에 Autolayout과 Component 기능을통해 디자인 적용단계에서
        프론트엔드와 동일한 컴포넌트 구성을 만들어냅니다. 이 때 Token Studio를
        통해 각 컴포넌트 구성의 변수화를 진행합니다. 변수화되니 내용은
        .json파일로 전달되며 해당파일을 StyleDictionary 를 통해 css화 시켜
        프로젝트에 적용시킵니다.
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
      <hr className="my-4" />
      <h2 className="mb-4">참고자료</h2>
      다음에 이론을 기반으로 아토믹 디자인 시스템 이론을 구성하였습니다.
      <Card className="my-4">
        <ul className="list-disc px-8">
          <li>
            Brad Frost, Atomic Design,
            <Link
              href={"https://bradfrost.com/blog/post/atomic-design-book/"}
              target="_blank"
              className="text-primary"
            >
              &nbsp;https://bradfrost.com/blog/post/atomic-design-book/
            </Link>
          </li>
          <li>
            Tom Coleman, Component-Driven Development, Aug 17 2020, chromatic,
            <Link
              href={
                "https://www.chromatic.com/blog/component-driven-development/"
              }
              target="_blank"
              className="text-primary"
            >
              &nbsp;
              https://www.chromatic.com/blog/component-driven-development/
            </Link>
          </li>
        </ul>
      </Card>
      <hr className="my-4" />
      <ul className="list-disc p-8">
        <li>
          <div className="flex gap-4">
            <p>최종수정일자: {version.page.index.dateTime}</p>
            <p>version: {version.page.index.version}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DocsHome;
