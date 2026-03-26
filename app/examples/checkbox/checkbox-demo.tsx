"use client";
import { Checkbox } from "@/app/templates/Form/Form";

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox text="기본 체크박스" />
      <Checkbox text="체크된 상태" defaultChecked />
      <Checkbox text="비활성화" disabled />
    </div>
  );
}
