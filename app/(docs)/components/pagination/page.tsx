import type { Metadata } from "next";
import PaginationContent from "./content";

export const metadata: Metadata = {
  title: "Pagination",
  description:
    "페이지네이션은 많은 양의 데이터를 여러 페이지로 나누어 보여주는 컴포넌트 입니다. 한 번에 모든 데이터를 보여주지 않고, 일정 수만큼 끊어 사용자에게 점진적으로 제공합니다.",
  keywords: ["Table"],
};

const ComponentPagination = () => {
  return <PaginationContent />;
};

export default ComponentPagination;
