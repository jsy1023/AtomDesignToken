import React from "react";

export const Card = ({
  children,
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
      className={`card ${className} ${overflow}`}
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
  return <div className={`card-header ${noMargin ? "no-margin" : ""}`}>{children}</div>;
};

export const CardContent = ({
  children,
  noMargin,
}: {
  children: React.ReactNode;
  noMargin?: boolean;
}) => {
  return <div className={`card-content ${noMargin ? "no-margin" : ""}`}>{children}</div>;
};

export const CardFooter = ({
  children,
  noMargin,
}: {
  children: React.ReactNode;
  noMargin?: boolean;
}) => {
  return <div className={`card-footer ${noMargin ? "no-margin" : ""}`}>{children}</div>;
};
