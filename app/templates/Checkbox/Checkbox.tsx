"use client";
import clsx from "clsx";
import "./checkbox.css";

export const Checkbox = ({
  text,
  onChange,
  disabled,
  required,
  defaultChecked,
}: {
  text?: string;
  className?: string;
  onChange?: () => void;
  disabled?: boolean;
  required?: boolean;
  defaultChecked?: boolean;
}) => {
  return (
    <label className="checkbox-container gap-1.5">
      <input
        type="checkbox"
        className="appearance-none hidden"
        onChange={onChange}
        disabled={disabled}
        required={required}
        defaultChecked={defaultChecked}
      />
      <span className="checkbox-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          strokeWidth="1"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
      {text ? (
        <span
          className={clsx(
            "text-text-standard text-nowrap select-none",
            { "!text-text-disabled": disabled }
          )}
        >
          {text}
        </span>
      ) : null}
    </label>
  );
};
