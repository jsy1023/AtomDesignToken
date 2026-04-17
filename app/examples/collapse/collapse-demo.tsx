"use client";
import { 
  Collapse, 
  CollapseProvider, 
  CollapseItem, 
  CollapseHeader, 
  CollapseContent 
} from "@/app/templates/Collapse/Collapse";

const items = [
  { id: "1", title: "첫 번째 항목", content: "첫 번째 항목의 내용입니다." },
  { id: "2", title: "두 번째 항목", content: "두 번째 항목의 내용입니다." },
  { id: "3", title: "세 번째 항목", content: "세 번째 항목의 내용입니다." },
];

export default function CollapseDemo() {
  return (
    <CollapseProvider>
      <Collapse>
        {items.map((item) => (
          <CollapseItem key={item.id} value={item.id}>
            <CollapseHeader>{item.title}</CollapseHeader>
            <CollapseContent>{item.content}</CollapseContent>
          </CollapseItem>
        ))}
      </Collapse>
    </CollapseProvider>
  );
}
