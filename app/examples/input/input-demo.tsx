"use client";
import { Input, Label } from "@/app/templates/Form/Form";

export default function InputDemo() {
  return (
    <div className="flex flex-col gap-4 w-72">
      <div>
        <Label label="기본 입력" />
        <Input placeholder="값을 입력해주세요" />
      </div>
      <div>
        <Label label="읽기 전용" />
        <Input placeholder="읽기 전용" readOnly />
      </div>
      <div>
        <Label label="비활성화" />
        <Input placeholder="비활성화 상태" disabled />
      </div>
    </div>
  );
}
