export const Input = ({
  className,
  placeholder = "값을 입력해주세요",
}: {
  className?: string;
  placeholder?: string;
}) => {
  return (
    <input
      type="text"
      className={`bg-input-background-standard border-input-border-standard border px-4 py-2 rounded-xs ${className}`}
      placeholder={placeholder}
    />
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
