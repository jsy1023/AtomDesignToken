"use client";
import React from "react";
import clsx from "clsx";
import "./input.css";

export const Input = ({
  type = "text",
  size = "base",
  placeholder = "값을 입력해주세요",
  readOnly,
  disabled,
  required,
}: {
  type?: string;
  size?: "small" | "base" | "large";
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
}) => {
  return (
      <input
        className={clsx("input", size)}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
      />
  );
};
