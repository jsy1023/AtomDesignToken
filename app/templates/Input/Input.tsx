"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Input = ({
  type = "text",
  placeholder = "값을 입력해주세요",
  label,
  readOnly,
  disabled,
  required,
}: {
  type?: string;
  className?: string;
  placeholder?: string;
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
}) => {
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
        type={type}
        className="border rounded focus:outline-none focus:ring-0 bg-[var(--input-background-standard)] disabled:bg-[var(--input-background-disabled)] disabled:cursor-not-allowed border-[var(--input-border-standard)] focus:border-[var(--input-border-focus)] w-full"
        style={{
          color: "var(--input-text-standard)",
          paddingLeft: "var(--global-padding-x)",
          paddingRight: "var(--global-padding-x)",
          paddingTop: "var(--global-padding-y)",
          paddingBottom: "var(--global-padding-y)",
          borderRadius: "var(--input-rounded)",
        }}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
      />
    </>
  );
};

export const Select = ({
  options,
  label,
  required,
  disabled,
}: {
  options: string[];
  label?: string;
  required?: boolean;
  disabled?: boolean;
}) => {
  const [filterValue, setFilterValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(filterValue.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    // 마우스 벗어난 영역 클릭 시 드롭다운 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
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
      <label className="relative w-fit hidden md:block">
        <input
          ref={inputRef}
          type="text"
          value={filterValue}
          placeholder="값을 선택해주세요..."
          onChange={(e) => {
            setFilterValue(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
          className={clsx(
            "transition-all bg-[var(--input-background-standard)] border px-4 py-2 border-[var(--color-border)] text-[var(--text-standard)] rounded-[var(--input-rounded)]",
            { "placeholder:text[var(--input-text-placeholder)]": true },
            { "focus:border-[var(--input-border-focus)]": true },
            {
              "disabled:bg-[var(--input-background-disabled)] disabled:cursor-not-allowed":
                disabled,
            }
          )}
          disabled={disabled}
        />
        <div
          className="absolute flex items-center right-0 top-0 h-full px-2"
          draggable
        >
          <span className="material-symbols-outlined">
            <span className="text-base input-text-value">arrow_drop_down</span>
          </span>
        </div>
      </label>
      {isOpen &&
        createPortal(
          <ul
            ref={dropdownRef}
            className="absolute w-full border rounded bg-[var(--input-background-standard)] border-[var(--input-border-standard)] shadow-md mt-1"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              width: menuPosition.width,
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-[var(--text-standard)] hover:bg-primary/10 cursor-pointer"
                  onClick={() => {
                    setFilterValue(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results</li>
            )}
          </ul>,
          document.body
        )}
      <select
        className={clsx(
          " block transition-all bg-[(--input-background-standard)] border px-4 py-2 border-[var(--color-border)] text-[var(--text-standard)] rounded-input-rounded",
          { "placeholder:text-input-text-placeholder": true },
          { "focus:border-[var(--input-border-focus)]": true },
          { "disabled:bg-[var(--input-background-disabled)]": true },
          { "md:hidden": true }
        )}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const Radio = ({
  name,
  value,
  label,
  className,
  onChange,
  defaultChecked,
}: {
  name: string;
  value: string;
  label?: string;
  className?: string;
  onChange?: () => void;
  defaultChecked?: boolean;
}) => {
  return (
    <>
      {label ? <p>{label}</p> : null}
      <label className="flex items-center gap-2">
        <input
          type="radio"
          className={clsx(
            "relative appearance-none peer w-5 h-5 bg-[var(--input-background-standard)] border border-[var(--color-border)] rounded-full",
            {
              "checked:bg-primary after:w-2.5 after:h-2.5 after:bg-[var(--input-background-standard)] after:content-[''] after:absolute after:rounded-full after:left-1 after:top-1":
                true,
            },
            { "focus:border-input-border-focus": true },
            { "disabled:bg-input-background-disabled": true },
            className
          )}
          name={name}
          onChange={onChange}
          defaultChecked={defaultChecked}
        />
        <span>{value}</span>
      </label>
    </>
  );
};

export const Checkbox = ({
  text,
  label,
  className,
  onChange,
  disabled,
  required,
  defaultChecked,
}: {
  text?: string;
  label?: string;
  className?: string;
  onChange?: () => void;
  disabled?: boolean;
  required?: boolean;
  defaultChecked?: boolean;
}) => {
  return (
    <>
      {label ? <p>{label}</p> : null}
      <label className="relative flex flex-nowrap items-center gap-1">
        <input
          type="checkbox"
          className={clsx(
            "relative appearance-none peer min-w-5 min-h-5 bg-[var(--input-background-standard)] border border-[var(--color-border)] rounded-common",
            { "checked:bg-primary": true },
            { "focus:border-[var(--input-border-focus)]": true },
            {
              "disabled:bg-[var(--input-background-disabled)] disabled:cursor-not-allowed":
                true,
            },
            {
              "after:content-['*'] after:text-danger after:absolute after:-right-1 after:-top-2":
                required,
            },
            className
          )}
          onChange={onChange}
          disabled={disabled}
          required={required}
          defaultChecked={defaultChecked}
        />
        <span className="absolute left-0.5 top-1 invisible  peer-checked:visible fill-[var(--input-background-standard)] ">
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
              "text-[var(--text-standard)] text-nowrap select-none",
              { "!text-[var(--input-text-disabled)]": disabled }
            )}
          >
            {text}
          </span>
        ) : null}
      </label>
    </>
  );
};
