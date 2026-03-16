"use client";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Label = ({
    label,
    required,
}: {
    label: string;
    required?: boolean;
}) => {
    return (
        <p className={"mb-1 text-text-standard"}>  
            <span
                className={clsx("", {
                    "after:content-['*'] after:ml-1 after:text-danger": required,
                })}
            >
                {label}
            </span>
        </p>
    );
};

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

export const Select = ({
  options,
  disabled,
}: {
  options: string[];
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

  useLayoutEffect(() => {
    if (isOpen && inputRef.current && dropdownRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      if (Math.abs(menuPosition.width - rect.width) > 0.5) {
        setMenuPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left,
          width: rect.width,
        });
        return;
      }

      let top = rect.bottom + window.scrollY;

      if (rect.bottom + dropdownRect.height > window.innerHeight) {
        top = rect.top + window.scrollY - dropdownRect.height;
      }

      setMenuPosition((prev) => {
        if (
          Math.abs(prev.top - top) < 0.5 &&
          Math.abs(prev.left - rect.left) < 0.5
        ) {
          return prev;
        }
        return {
          top,
          left: rect.left,
          width: rect.width,
        };
      });
    }
  }, [isOpen, filterValue, menuPosition.width]);

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
          className="select hidden sm:block"
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
            className="absolute w-full select-menu"
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
                  className="select-menu-item"
                  onClick={() => {
                    setFilterValue(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="select-menu-item">No results</li>
            )}
          </ul>,
          document.body
        )}
      <select
        className="select block sm:hidden"
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
  checked,
}: {
  name: string;
  value: string;
  label?: string;
  className?: string;
  onChange?: () => void;
  defaultChecked?: boolean;
  checked?: boolean;
}) => {
  return (
    <>
      {label ? <p>{label}</p> : null}
      <label className="flex items-center gap-1">
        <input
          type="radio"
          className={clsx(
            "relative appearance-none radio rounded-full ",
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
          checked={checked}
        />
        <span>{value}</span>
      </label>
    </>
  );
};

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
    <>
      <label className="checkbox gap-1.5">
        <input
          type="checkbox"
          className="appearance-none hidden"
          onChange={onChange}
          disabled={disabled}
          required={required}
          defaultChecked={defaultChecked}
        />
        <span>
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
    </>
  );
};
