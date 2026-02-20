"use client";
import clsx from "clsx";

export const Button = ({
  children,
  type,
  style,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  type: "primary" | "secondary" | "success" | "warning" | "danger" | "gray";
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className={clsx("btn", type)}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
