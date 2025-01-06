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
      className={`bg-inputBackgroundStandard border-inputBorderStandard border px-4 py-2 rounded-xs ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
