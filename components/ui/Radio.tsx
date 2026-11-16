import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name?: string;
  value?: string;
  options: RadioOption[];
  onChange?: (val: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name = 'atom-radio-group',
  value,
  options,
  onChange,
  className = '',
}) => {
  return (
    <div className={`atom-radio-group ${className}`} role="radiogroup">
      {options.map((opt) => (
        <label key={opt.value} className="atom-radio-label">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            className="atom-radio"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{opt.label}</span>
            {opt.description && <span className="text-xs text-neutral-500">{opt.description}</span>}
          </div>
        </label>
      ))}
    </div>
  );
};
