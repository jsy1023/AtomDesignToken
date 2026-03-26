import React from "react";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";

interface CalloutProps {
  icon?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  type?: "default" | "note" | "tip" | "danger" | "warning";
  className?: string;
}

const icons = {
  default: <Info className="h-5 w-5" />,
  note: <Info className="h-5 w-5" />,
  tip: <Lightbulb className="h-5 w-5" />,
  danger: <AlertCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
};

export function Callout({
  children,
  icon,
  type = "default",
  title,
  className,
  ...props
}: CalloutProps) {
  const Icon = icon || icons[type];

  return (
    <div
      className={cn(
        "my-6 flex items-start space-x-4 rounded-lg border border-l-4 p-4",
        {
          // Info/Note - Using standard theme colors
          "border-[var(--color-border-standard)] bg-[var(--color-callout-note-bg)] text-[var(--color-callout-note-text)] border-l-[var(--color-info)]": type === "default" || type === "note",
          // Tip - Using success theme colors
          "border-[var(--color-success)] bg-[var(--color-callout-tip-bg)] text-[var(--color-callout-tip-text)] border-l-[var(--color-success)]": type === "tip",
          // Danger - Using danger theme colors
          "border-[var(--color-danger)] bg-[var(--color-callout-danger-bg)] text-[var(--color-callout-danger-text)] border-l-[var(--color-danger)]": type === "danger",
          // Warning - Using warning theme colors
          "border-[var(--color-warning)] bg-[var(--color-callout-warning-bg)] text-[var(--color-callout-warning-text)] border-l-[var(--color-warning)]": type === "warning",
        },
        className
      )}
      {...props}
    >
      {Icon && <div className="mt-1 flex-shrink-0">{Icon}</div>}
      <div className="flex-1">
        {title && <div className="mb-1 font-bold">{title}</div>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
