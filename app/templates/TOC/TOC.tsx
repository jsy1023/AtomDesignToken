"use client";
import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <nav className="space-y-2 flex flex-col">
      {headings.map((heading) => {
        return (
          <a
            key={heading.id}
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
