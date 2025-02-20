import React from "react";

export const Card = ({
  children,
  type = "standard",
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "standard" | "group";
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
      className={`${type == "standard" ? "bg-fill-card border-fill-border" : type == "group" ? "bg-fill-group border-none" : ""} ${!hasCardContent ? "p-4" : ""} rounded  border ${className} overflow-auto`}
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
