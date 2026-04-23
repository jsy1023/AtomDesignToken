"use client";
import { Button } from "@/app/templates/Button/Button";

export default function ButtonSizes() {
  return (
    <div className="flex gap-3 items-center justify-center">
      <Button size="small">Small</Button>
      <Button size="base">Base</Button>
      <Button size="large">Large</Button>
    </div>
  );
}
