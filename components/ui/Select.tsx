import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`atom-select ${className}`}>
      <button
        type="button"
        className="atom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="atom-select-arrow" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          ▼
        </span>
      </button>
      {isOpen && (
        <ul className="atom-select-menu" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className="atom-select-option"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange?.(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={['w-full text-xs p-2 rounded-(--radius-sm) border border-(--border-subtle) bg-(--bg-primary) text-(--text-primary) cursor-pointer focus:outline-none focus:border-(--accent-primary) focus:ring-1 focus:ring-(--accent-primary) transition', className].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </select>
    );
  }
);
NativeSelect.displayName = 'NativeSelect';
