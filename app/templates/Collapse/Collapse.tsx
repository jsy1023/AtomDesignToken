"use client";

import { useState } from "react";

export const Collapse = ({
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
        <div key={idx} className="collapse-item">
          <label className="collapse-header">
            {collapse.title}
            <button
              onClick={() => toggleContent(idx)}
              className={`material-symbols-outlined collapse-icon ${
                isActive(idx) ? "open" : "closed"
              }`}
            >
              keyboard_arrow_right
            </button>
          </label>
          {isActive(idx) && (
            <div className="collapse-content">
              {collapse.content}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export const NodeCollapse = ({
  type = "collapse",
  collapses,
}: {
  type?: "accordion" | "collapse";
  collapses: { title: React.ReactNode; content: React.ReactNode }[];
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
        <div key={idx} className="collapse-item">
          <label className="collapse-header">
            {collapse.title}
            <button
              onClick={() => toggleContent(idx)}
              className={`material-symbols-outlined collapse-icon ${
                isActive(idx) ? "open" : "closed"
              }`}
            >
              keyboard_arrow_right
            </button>
          </label>
          {isActive(idx) && (
            <div className="collapse-content">
              {collapse.content}
            </div>
          )}
        </div>
      ))}
    </>
  );
};
