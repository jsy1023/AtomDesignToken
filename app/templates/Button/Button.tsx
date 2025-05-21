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
  type: "primary" | "secondary" | "success" | "danger" | "gray";
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-common text-white transition-all cursor-pointer rounded-[var(--global-rounded)]",
        {
          "bg-[var(--button-main-primary-standard)] hover:bg-[var(--button-main-primary-hover)] active:bg-[var(--button-main-primary-active)] standard:bg-[var(--buttion-main-primary-standard)]/20":
            type == "primary",
        },
        {
          "bg-[var(--button-main-secondary-standard)] hover:bg-[var(--button-main-secondary-hover)] active:bg-[var(--button-main-secondary-active)] standard:bg-[var(--buttion-main-secondary-standard)]/20 ":
            type == "secondary",
        },
        {
          "bg-[var(--button-main-success-standard)] hover:bg-[var(--button-main-success-hover)] active:bg-[var(--button-main-success-active)] standard:bg-[var(--buttion-main-success-standard)]/20":
            type == "success",
        },
        {
          "bg-[var(--button-main-danger-standard)] hover:bg-[var(--button-main-danger-hover)] active:bg-[var(--button-main-danger-active)] standard:bg-[var(--buttion-main-danger-standard)]/20":
            type == "danger",
        },
        {
          "bg-[var(--button-main-gray-standard)] hover:bg-[var(--button-main-gray-hover)] active:bg-[var(--button-main-gray-active)] standard:bg-[var(--buttion-main-gray-standard)]/20":
            type == "gray",
        }
      )}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
