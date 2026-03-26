"use client";
import { Button } from "@/app/templates/Button/Button";

export default function ButtonSizes() {
  return (
    <div className="flex gap-3 items-center justify-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
