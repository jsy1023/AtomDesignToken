"use client";
import clsx from "clsx";

export const Button = ({
  children,
  type,
  style,
  disabled,
}: {
  children: React.ReactNode;
  type: "primary" | "secondary" | "success" | "danger" | "gray";
  style?: React.CSSProperties;
  disabled?: boolean;
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-common text-button-text transition-all",
        {
          "bg-button-primary-standard hover:bg-button-primary-hover disabled:bg-button-primary-disabled":
            type == "primary",
        },
        {
          "bg-button-secondary-standard hover:bg-button-secondary-hover disabled:bg-button-secondary-disabled ":
            type == "secondary",
        },
        {
          "bg-button-success-standard hover:bg-button-success-hover disabled:bg-button-success-disabled":
            type == "success",
        },
        {
          "bg-button-danger-standard hover:bg-button-danger-hover disabled:bg-button-danger-disabled":
            type == "danger",
        },
        {
          "bg-button-gray-standard hover:bg-button-gray-hover disabled:bg-button-gray-disabled":
            type == "gray",
        }
      )}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
