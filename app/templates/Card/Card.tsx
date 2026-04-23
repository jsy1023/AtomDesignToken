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
  className = "",
}: {
  children: React.ReactNode;
  noMargin?: boolean;
  className?: string;
}) => {
  return <div className={`card-header ${noMargin ? "no-margin" : ""} ${className}`}>{children}</div>;
};

export const CardContent = ({
  children,
  noMargin,
  className = "",
}: {
  children: React.ReactNode;
  noMargin?: boolean;
  className?: string;
}) => {
  return <div className={`card-content ${noMargin ? "no-margin" : ""} ${className}`}>{children}</div>;
};

export const CardFooter = ({
  children,
  noMargin,
  className = "",
}: {
  children: React.ReactNode;
  noMargin?: boolean;
  className?: string;
}) => {
  return <div className={`card-footer ${noMargin ? "no-margin" : ""} ${className}`}>{children}</div>;
};
