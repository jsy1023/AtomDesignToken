"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./select.css";

export const Select = ({
  options = [],
  value,
  onValueChange,
  disabled,
  placeholder = "값을 선택해주세요...",
  className,
}: {
  options: string[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
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

  const isControlled = value !== undefined;
  
  // Display value logic: if open, show filter text. if closed, show selected value.
  const displayValue = isOpen ? filterValue : (isControlled ? value : filterValue) || "";

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(filterValue.toLowerCase())
  );

  useLayoutEffect(() => {
    if (isOpen && inputRef.current && dropdownRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      let top = rect.bottom + window.scrollY;

      if (rect.bottom + dropdownRect.height > window.innerHeight) {
        top = rect.top + window.scrollY - dropdownRect.height;
      }

      setMenuPosition({
        top,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen, filterValue]);

  useEffect(() => {
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

  const handleSelect = (option: string) => {
    if (onValueChange) {
      onValueChange(option);
    }
    setFilterValue(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className || ""}`}>
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          placeholder={placeholder}
          onChange={(e) => {
            setFilterValue(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setFilterValue(""); // Clear filter on focus to show all options
            setIsOpen(true);
          }}
          className="select w-full"
          disabled={disabled}
        />
        <div
          className="absolute flex items-center right-0 top-0 h-full px-2 pointer-events-none"
        >
          <span className="material-symbols-outlined text-base text-text-sub">
            arrow_drop_down
          </span>
        </div>
      </div>
      
      {isOpen &&
        createPortal(
          <ul
            ref={dropdownRef}
            className="absolute z-9999 select-menu"
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
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="select-menu-item text-text-sub text-xs">No results</li>
            )}
          </ul>,
          document.body
        )}

      {/* Mobile native fallback */}
      <select
        className="select absolute inset-0 opacity-0 md:hidden"
        value={value}
        onChange={(e) => handleSelect(e.target.value)}
        disabled={disabled}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
