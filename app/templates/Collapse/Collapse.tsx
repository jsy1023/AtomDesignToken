"use client";

import { useState } from "react";

const Collapse = ({
  type = "collapse",
  collapses,
}: {
  type?: "accordion" | "collapse";
  collapses: { title: string; content: string }[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number | number[] | null>(
    type === "collapse" ? [] : null
  );

  const toggleContent = (idx: number) => {
    if (type === "accordion") {
      setActiveIndex((prev) => (prev === idx ? null : idx));
    } else {
      setActiveIndex((prev) => {
        const current = prev as number[];
        return current.includes(idx)
          ? current.filter((i) => i !== idx) // 닫기
          : [...current, idx]; // 열기
      });
    }
  };

  const isActive = (idx: number) => {
    return type === "accordion"
      ? activeIndex === idx
      : (activeIndex as number[]).includes(idx);
  };

  return (
    <>
      {collapses.map((collapse, idx) => (
        <div key={idx}>
          <label className="flex justify-between cursor-pointer p-4 border-t border-[var(--color-border)]">
            {collapse.title}
            <button
              onClick={() => toggleContent(idx)}
              className={`material-symbols-outlined cursor-pointer transition-all duration-300 ${
                isActive(idx) ? "rotate-90" : "rotate-0"
              }`}
            >
              keyboard_arrow_right
            </button>
          </label>
          {isActive(idx) && (
            <div className="p-4 bg-[var(--background-wrapper)] border-rounded">
              {collapse.content}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Collapse;
