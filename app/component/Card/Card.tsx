const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-fillCard p-4 rounded border-fillBoarder border ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
