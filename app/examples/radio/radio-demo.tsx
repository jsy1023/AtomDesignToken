"use client";
import { Radio } from "@/app/templates/Form/Form";

export default function RadioDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Radio name="demo" value="옵션 A" defaultChecked />
      <Radio name="demo" value="옵션 B" />
      <Radio name="demo" value="옵션 C" />
    </div>
  );
}
