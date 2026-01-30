export const Badge = ({
  children,
  color,
  type,
}: {
  children: React.ReactNode;
  color: "primary" | "secondary" | "warning" | "danger";
  type?: "default" | "tint";
}) => {
  switch (type) {
    case "tint":
      return (
        <span
          className={`badge-tint ${color}`}
        >
          {children}
        </span>
      );
    default:
      return (
        <span
          className={`badge ${color}`}
        >
          {children}
        </span>
      );
  }
};
