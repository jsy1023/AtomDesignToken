import type { Metadata } from "next";
import ComponentModalContent from "./content";

export const metadata: Metadata = {
  title: "Modal",
  description:
    "모달(Modal)은 사용자의 작업 흐름을 중단시키고, 특정 작업이나 확인을 요구하는 UI 요소입니다.",
  keywords: ["Modal, react-modal"],
};

const ComponentModal = () => {
  return <ComponentModalContent />;
};

export default ComponentModal;
