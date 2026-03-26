"use client";
import { Button } from "@/app/templates/Button/Button";

export default function ButtonDisabled() {
  return (
    <div className="flex gap-3 flex-wrap items-center justify-center">
      <Button type="primary" disabled>Primary</Button>
      <Button type="secondary" disabled>Secondary</Button>
      <Button type="outline" disabled>Outline</Button>
    </div>
  );
}
