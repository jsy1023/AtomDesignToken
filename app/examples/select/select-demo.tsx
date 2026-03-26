"use client";
import { Select, Label } from "@/app/templates/Form/Form";

const options = ["옵션 1", "옵션 2", "옵션 3", "옵션 4", "옵션 5"];

export default function SelectDemo() {
  return (
    <div className="flex flex-col gap-4 w-72">
      <div>
        <Label label="기본 선택" />
        <Select options={options} />
      </div>
      <div>
        <Label label="비활성화" />
        <Select options={options} disabled />
      </div>
    </div>
  );
}
