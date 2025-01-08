const Input = ({
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

export default Input;
