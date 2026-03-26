"use client";
import TOC from "@/app/templates/TOC/TOC";

export default function TocDemo() {
  return (
    <div className="w-full text-sm text-[var(--color-text-sub)]">
      TOC는 현재 페이지의 h1~h3 헤딩을 자동으로 감지하여 목차를 생성합니다.
      실제 페이지에 마운트되어야 정상 동작합니다.
      <div className="mt-4 opacity-50 pointer-events-none">
        <TOC />
      </div>
    </div>
  );
}
