"use client";
import clsx from "clsx";
import { useState } from "react";

export const Input = ({
  className,
  uniqueClass,
  defaultValue = "",
  placeholder = "값을 입력해주세요",
  label,
  readOnly,
  disabled,
  required,
}: {
  className?: string;
  uniqueClass?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
}) => {
  const [value, setValue] = useState(defaultValue);
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (defaultValue) {
      setValue(defaultValue);
    }
    setValue(e.target.value);
  };

  return (
    <>
      {label ? (
        <p className={clsx("mb-1 text-text-standard", {})}>
          <span
            className={clsx("", {
              "after:content-['*'] after:ml-1 after:text-danger": required,
            })}
          >
            {label}
          </span>
        </p>
      ) : null}
      <input
        type="text"
        className={
          uniqueClass
            ? clsx(
                "transition-all border rounded-input-border px-4 py-2",
                value
                  ? "bg-input-background-value"
                  : "bg-input-background-standard ",
                uniqueClass,
                { "placeholder:text-input-text-placeholder": true },
                { "focus:border-input-border-focus": true },
                { "disabled:bg-input-background-disabled": true },
                className
              )
            : clsx(
                value
                  ? "bg-input-background-value"
                  : "bg-input-background-standard ",
                "transition-all border px-4 py-2 border-input-border-standard text-input-text-value rounded-input-border",
                { "placeholder:text-input-text-placeholder": true },
                { "focus:border-input-border-focus": true },
                { "disabled:bg-input-background-disabled": true },
                className
              )
        }
        value={value}
        onChange={handleValue}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
      />
    </>
  );
};

export const Radio = ({
  name,
  value,
  onChange,
  isChecked,
}: {
  name: string;
  value: string;
  onChange?: () => void;
  isChecked?: boolean;
}) => {
  return (
    <label className="flex gap-2">
      <input type="radio" name={name} onChange={onChange} checked={isChecked} />
      <span>{value}</span>
    </label>
  );
};
