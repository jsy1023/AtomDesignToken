"use client";
import clsx from "clsx";

export const Button = ({
  children,
  type = "primary",
  size = "base",
  className,
  style,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  type?: "primary" | "secondary" | "success" | "warning" | "danger" | "gray" | "outline";
  size?: "small" | "base" | "large";
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className={clsx("btn", type, size, className)}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
