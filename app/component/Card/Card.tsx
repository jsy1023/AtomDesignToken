const Card = ({
  children,
  type = "standard",
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "standard" | "group";
}) => {
  return (
    <div
      className={`${type == "standard" ? "bg-fillCard border-fillBoarder" : type == "group" ? "bg-fillGroup border-none" : ""} p-4 rounded  border ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
