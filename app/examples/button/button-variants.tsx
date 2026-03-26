"use client";
import { Button } from "@/app/templates/Button/Button";

export default function ButtonVariants() {
  return (
    <div className="flex gap-3 flex-wrap items-center justify-center">
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="outline">Outline</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">Danger</Button>
      <Button type="gray">Gray</Button>
    </div>
  );
}
