import IntroContent from "./intro.mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "atomsystem",
  description: "아톰시스템은 아토믹 디자인 이론을 기반으로.json파일 하나로 디자인 부터 프론트엔드 연동까지 간편하게 디자인 및 구현하기 위한 디자인 시스템 입니다.",
  keywords: ["DesignSystem"]
};

export default function Page() {
  return <IntroContent />;
}
