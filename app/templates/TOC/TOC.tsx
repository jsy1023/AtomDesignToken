"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      /**
       * Document에서 읽히는 h1, h2, h3 태그를 array 형태로 정의
       * */
      const headingElements = Array.from(
        document.querySelectorAll("h1, h2, h3")
      ) as HTMLHeadingElement[];

      const usedIds = new Set<string>();
      const generatedHeadings: Heading[] = headingElements.map((heading) => {
        let finalId = heading.id;

        // ID가 없거나 중복된 경우 새로 생성
        if (!finalId || usedIds.has(finalId)) {
          const baseId =
            heading.textContent
              ?.toLowerCase()
              .trim()
              .replace(/\s+/g, "-")
              .replace(/[^\w\-가-힣]+/g, "") || "heading";
          
          finalId = baseId;
          let counter = 1;
          while (usedIds.has(finalId)) {
            finalId = `${baseId}-${counter}`;
            counter++;
          }
          heading.id = finalId;
        }

        usedIds.add(finalId);

        return {
          id: finalId,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.replace("H", "")),
        };
      });

      setHeadings(generatedHeadings);
    }, 100); // 딜레이를 약간 주어 DOM이 완전히 안정화된 후 실행

    return () => clearTimeout(timer);
  }, [pathname, mounted]); // 페이지 변경사항이 있거나 마운트된 경우 실행

  useEffect(() => {
    if (!mounted || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // 뷰포트 상단에 가장 가까운 요소를 찾아 활성화
          const topVisible = visibleEntries.reduce((prev, curr) => 
            curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
          );
          setActiveId(topVisible.target.id);
        }
      },
      {
        // 상단 10% ~ 20% 지점을 타겟으로 감지
        rootMargin: "-10% 0% -80% 0%",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings, mounted]);

  if (!mounted) {
    return <nav className="space-y-2 flex flex-col min-h-[100px]" />;
  }

  return (
    <nav className="flex flex-col space-y-1 border-l border-border-standard ml-2 py-1">
      <div className="text-[10px] font-bold text-text-sub/60 uppercase tracking-widest mb-3 px-4">
        On this page
      </div>
      {headings.length > 0 ? (
        headings.map((heading, idx) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={`${heading.id}-${idx}`}
              href={`#${heading.id}`}
              style={{ paddingLeft: `${(heading.level - 1) * 12 + 16}px` }}
              className={`text-xs py-1.5 pr-4 border-l-2 transition-all duration-200 ease-in-out ${
                isActive
                  ? "text-primary bg-primary/5 border-primary font-medium"
                  : "text-text-sub border-transparent hover:text-primary hover:bg-primary/5 hover:border-primary/30"
              }`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  // GSAP scrollTo를 사용하여 부드럽게 이동
                  // element.closest('.overflow-auto') 등을 통해 스크롤 컨테이너를 찾습니다.
                  const container = element.closest('.overflow-auto') || window;
                  
                  gsap.to(container, {
                    duration: 0.8,
                    scrollTo: {
                      y: element,
                      offsetY: 80, // 상단 여백
                      autoKill: true
                    },
                    ease: "power2.inOut"
                  });
                  
                  // 클릭 시 즉시 활성화 상태 업데이트
                  setActiveId(heading.id);
                  
                  // URL 해시 업데이트
                  window.history.pushState(null, "", `#${heading.id}`);
                }
              }}
            >
              {heading.text}
            </a>
          );
        })
      ) : (
        <div className="px-4 text-[10px] text-text-sub/40 italic mt-2">
          목차를 찾을 수 없습니다
        </div>
      )}
    </nav>
  );
}
