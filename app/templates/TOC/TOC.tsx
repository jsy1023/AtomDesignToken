"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  const pathname = usePathname(); // ✅ 페이지 경로 추적

  useEffect(() => {
    const timer = setTimeout(() => {
      /**
       * Document에서 읽히는 h1, h2, h3 태그를 array 형태로 정의
       * */
      const headingElements = Array.from(
        document.querySelectorAll("h1, h2, h3")
      ) as HTMLHeadingElement[];

      const generatedHeadings: Heading[] = headingElements.map((heading) => {
        // id가 없으면 자동 생성
        if (!heading.id) {
          heading.id =
            heading.textContent
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w\-]+/g, "") ?? "";
        }

        return {
          id: heading.id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.replace("H", "")),
        };
      });

      setHeadings(generatedHeadings);
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]); // 페이지 변경사항이 있다면 목차 재정의

  return (
    <nav className="space-y-2 flex flex-col">
      {headings.map((heading, idx) => {
        return (
          <a
            key={`${heading.id}-${idx}`}
            href={`#${heading.id}`}
            style={{ marginLeft: `${(heading.level - 1) * 8}px` }}
          >
            {heading.text}
          </a>
        );
      })}
    </nav>
  );
}
