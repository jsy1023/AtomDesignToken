import { Metadata } from "next";
import ToastContent from "./ToastContent/ToastContent";

export const metadata: Metadata = {
  title: "ToastMessage",
  description:
    "여러 개의 콘텐츠 영역을 하나의 영역에서 전환하며 보여주는 UI 요소입니다. 사용자가 클릭하거나 탭을 선택하면 해당 탭에 연결된 콘텐츠만 보여주고 나머지는 숨깁니다.",
  keywords: ["Tab"],
};

const ComponentToastMessage = () => {
  return <ToastContent />;
};
export default ComponentToastMessage;
