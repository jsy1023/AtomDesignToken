"use client";
import { Input } from "@/app/templates/Input/Input";
import { Label } from "@/app/templates/Label/Label";



export default function InputDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-2">
        <Label label="Small" />
        <Input size="small" placeholder="Small input" />
      </div>
      <div className="flex flex-col gap-2">
        <Label label="Base" />
        <Input size="base" placeholder="Base input" />
      </div>
      <div className="flex flex-col gap-2">
        <Label label="Large" />
        <Input size="large" placeholder="Large input" />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Label label="읽기 전용" />
        <Input placeholder="읽기 전용" readOnly />
      </div>
      <div className="flex flex-col gap-2">
        <Label label="비활성화" />
        <Input placeholder="비활성화 상태" disabled />
      </div>
    </div>
  );
}
