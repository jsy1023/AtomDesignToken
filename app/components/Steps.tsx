import React from "react";
import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 단계별 설명을 위한 컨테이너입니다.
 * 내부의 h3 요소들이 자동으로 숫자가 매겨집니다.
 */
export function Steps({ children, className, ...props }: StepsProps) {
  return (
    <div
      className={cn(
        "mb-12 ml-4 border-l border-[var(--color-border-standard)] pl-8 [counter-reset:step] [&>h3]:relative [&>h3]:before:absolute [&>h3]:before:-left-[40px] [&>h3]:before:flex [&>h3]:before:h-8 [&>h3]:before:w-8 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:bg-[var(--color-bg-input-standard)] [&>h3]:before:text-[var(--color-text-title)] [&>h3]:before:text-center [&>h3]:before:text-xs [&>h3]:before:font-medium [&>h3]:before:content-[counter(step)] [&>h3]:[counter-increment:step] [&>h3]:before:border [&>h3]:before:border-[var(--color-border-standard)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * 개별 단계 제목입니다. (h3 기반)
 */
export function Step({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
