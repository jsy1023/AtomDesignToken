"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import "./Dropdown.css";

type DropdownPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  position?: DropdownPosition;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dropdown = ({
  trigger,
  children,
  className,
  contentClassName,
  position = "bottom-right",
  isOpen: controlledIsOpen,
  onOpenChange,
}: DropdownProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const nextValue = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(nextValue);
    }
    onOpenChange?.(nextValue);
  };

  const close = () => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(false);
    }
    onOpenChange?.(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, close]);

  return (
    <div className={clsx("dropdown-container", className)} ref={dropdownRef}>
      <div className="dropdown-trigger" onClick={toggle}>
        {trigger}
      </div>
      <div
        className={clsx(
          "dropdown-content",
          position,
          isOpen && "is-open",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const DropdownItem = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div 
      className={clsx("dropdown-item", className)} 
      onClick={onClick}
    >
      {children}
    </div>
  );
};

