"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./select.css";

export const Select = ({
  options = [],
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
        >
          <span className="material-symbols-outlined">
            <span className="text-base">arrow_drop_down</span>
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
