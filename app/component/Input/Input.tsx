"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const Input = ({
  className,
  defaultValue = "",
  placeholder = "값을 입력해주세요",
  label,
  readOnly,
  disabled,
  pattern,
  required,
}: {
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
  pattern?: string;
  required?: boolean;
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isValue, setIsValue] = useState(false);
  const [guide, setGuide] = useState("");

  useEffect(() => {});
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (defaultValue) {
      setValue(defaultValue);
    }
    setValue(inputValue);

    if (e.target.checkValidity()) {
      setGuide("유효한 값입니다.");
      setIsValue(true);
    } else {
      setGuide("유효하지 않은 값입니다.");
      setIsValue(false);
    }
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
        className={clsx(
          "transition-all border px-4 py-2 border-input-border-standard text-input-text-value rounded-input-border",
          value ? "bg-input-background-value" : "bg-input-background-standard ",
          { "placeholder:text-input-text-placeholder": true },
          { "focus:border-input-border-focus": true },
          { "disabled:bg-input-background-disabled": true },
          {
            "invalid:border-input-border-error invalid:bg-input-background-error invalid:text-input-text-error":
              required && pattern,
          },
          {
            "valid:border-input-border-success valid:bg-input-background-success valid:text-input-text-success":
              required && pattern,
          },
          className
        )}
        value={value}
        onChange={handleValue}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        pattern={pattern}
        required={required}
      />
      {guide && required && pattern ? (
        <p
          className={`text-sm ${isValue ? "text-input-text-success" : "text-input-text-error"} ml-1 mt-2`}
        >
          {guide}
        </p>
      ) : null}
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
