"use client";
import React from "react";
import "./input.css";

export const Input = ({
  type = "text",
  placeholder = "값을 입력해주세요",
  readOnly,
  disabled,
  required,
}: {
  type?: string;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
}) => {
  return (
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
      />
  );
};
