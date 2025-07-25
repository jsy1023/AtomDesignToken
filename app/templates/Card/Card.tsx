import React from "react";

export const Card = ({
  children,
  type = "standard",
  className = "",
  overflow = "overflow-auto",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "standard" | "group";
  overflow?: "overflow-auto" | "overflow-hidden" | "overflow-none";
}) => {
  // CardHeader와 CardContent의 존재 여부 확인
  const hasCardContent = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === CardHeader ||
        child.type === CardContent ||
        child.type === CardFooter)
  );
  return (
    <div
      className={`${type == "standard" ? "bg-[var(--background-card)] border-[var(--color-border)]" : type == "group" ? "bg-[var(--background-wrapper)] border-none" : ""} ${!hasCardContent ? "p-4" : ""} rounded  border ${className} ${overflow === "overflow-auto" ? `overflow-auto` : overflow === "overflow-hidden" ? "overflow-hidden" : overflow === "overflow-none" ? "" : ""}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  noMargin,
}: {
  children: React.ReactNode;
  noMargin?: boolean;
}) => {
  return <div className={`${noMargin ? "p-0" : "p-4"}`}>{children}</div>;
};

export const CardContent = ({
  children,
  noMargin,
}: {
  children: React.ReactNode;
  noMargin?: boolean;
}) => {
  return <div className={`${noMargin ? "p-0" : "p-4"}`}>{children}</div>;
};

export const CardFooter = ({
  children,
  noMargin,
}: {
  children: React.ReactNode;
  noMargin?: boolean;
}) => {
  return <div className={`${noMargin ? "p-0" : "p-4"}`}>{children}</div>;
};
