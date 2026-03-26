"use client";
import { Collapse } from "@/app/templates/Collapse/Collapse";

const items = [
  { title: "아코디언 1", content: "하나만 열리는 아코디언 스타일입니다." },
  { title: "아코디언 2", content: "다른 항목을 열면 이전 항목이 닫힙니다." },
  { title: "아코디언 3", content: "아코디언 세 번째 항목의 내용입니다." },
];

export default function CollapseAccordion() {
  return <Collapse type="accordion" collapses={items} />;
}
