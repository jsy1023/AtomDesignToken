"use client";
import { Collapse } from "@/app/templates/Collapse/Collapse";

const items = [
  { title: "첫 번째 항목", content: "첫 번째 항목의 내용입니다." },
  { title: "두 번째 항목", content: "두 번째 항목의 내용입니다." },
  { title: "세 번째 항목", content: "세 번째 항목의 내용입니다." },
];

export default function CollapseDemo() {
  return <Collapse collapses={items} />;
}
