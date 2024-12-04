const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`bg-fillCard rounded shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;
