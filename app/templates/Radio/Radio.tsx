"use client";
import clsx from "clsx";
import "./radio.css";

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
      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="radio"
          className={clsx(
            "relative appearance-none radio rounded-full ",
            {
              "checked:bg-primary after:w-2.5 after:h-2.5 after:bg-[var(--color-bg-input-standard)] after:content-[''] after:absolute after:rounded-full after:left-1 after:top-1":
                true,
            },
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
