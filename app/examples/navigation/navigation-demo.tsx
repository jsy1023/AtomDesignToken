import { Navigation, NavBrand, NavList, NavItem, NavLink, NavTrigger, NavContainer } from "@/app/templates/Navigation/Navigation";
import Image from "next/image";

export default function NavigationDemo() {
  return (
    <div className="w-full border border-[var(--color-border-standard)] rounded">
      <Navigation>
        <NavBrand href="/">
          <Image
            src="/images/global/logoSymbol.svg"
            alt="Logo"
            width={32}
            height={32}
            draggable="false"
          />
        </NavBrand>
        <NavList>
          <NavItem>
            <NavTrigger>
              소개
            </NavTrigger>
            <NavContainer>
              <div className="grid grid-cols-2 gap-4 w-full">
                <NavItem>
                  <NavLink href="/docs/components/input">
                    <p>설치하기</p>
                    <p className="text-sm">atomsystem의 설치방법</p>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/docs/components/card">
                    <p>아토믹 디자인</p>
                    <p className="text-sm">아토믹 디자인은 모듈단위 서비스를 제공합니다.</p>
                  </NavLink>
                </NavItem>
              </div>
            </NavContainer>
          </NavItem>
          <NavItem>
            <NavTrigger>
              Docs
            </NavTrigger>
            <NavContainer>
              <div className="grid grid-cols-3 gap-4 w-full">
                <NavItem>
                  <NavLink href="/docs/components/input">
                    <p>Input</p>
                    <p className="text-sm">사용자로부터 데이터를 입력받기 위한 기본적인 대화형 컨트롤 요소입니다.</p>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/docs/components/card">
                    <p>Card</p>
                    <p className="text-sm">정보를 논리적으로 그룹화하고 시각적으로 구분하여 보여주는 컨테이너 요소입니다.</p>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/docs/components/checkbox">
                    <p>Chekcbox</p>
                    <p className="text-sm">여러 가지 선택 사항 중 하나 이상을 선택할 수 있게 해주는 컨트롤 요소입니다.</p>
                  </NavLink>
                </NavItem>
              </div>
            </NavContainer>
          </NavItem>
        </NavList>
      </Navigation>
    </div>
  );
}
