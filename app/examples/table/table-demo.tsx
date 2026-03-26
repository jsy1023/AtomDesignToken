import Table from "@/app/templates/Table/Table";

const tableData = [
  { 이름: "홍길동", 나이: 28, 직책: "프론트엔드 개발자" },
  { 이름: "김철수", 나이: 34, 직책: "백엔드 개발자" },
  { 이름: "이영희", 나이: 25, 직책: "UI/UX 디자이너" },
  { 이름: "박민준", 나이: 31, 직책: "프로덕트 매니저" },
];

export default function TableDemo() {
  return <Table tableData={tableData} />;
}
