export const Badge = ({
  children,
  color,
  type,
  className,
}: {
  children: React.ReactNode;
  color: "primary" | "secondary" | "warning" | "danger";
  type?: "default" | "tint";
  className?: string;
}) => {
  switch (type) {
    case "tint":
      return (
        <span
          className={`text-sm px-1.5 rounded ${color === "primary" ? "bg-primary/20 !text-primary" : color === "secondary" ? "bg-secondary/20 !text-secondary" : color === "warning" ? "bg-warning/20 !text-warning" : color === "danger" ? "bg-danger/20 !text-danger" : null} ${className}`}
        >
          {children}
        </span>
      );
    default:
      return (
        <span
          className={`text-sm px-1.5 rounded ${color === "primary" ? "bg-primary !text-white" : color === "secondary" ? "bg-secondary !text-white" : color === "warning" ? "bg-warning !text-white" : color === "danger" ? "bg-danger !text-white" : null} ${className}`}
        >
          {children}
        </span>
      );
  }
};
