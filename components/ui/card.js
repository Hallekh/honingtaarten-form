
export const Card = ({ children, className }) => (
  <div className={`bg-white rounded-2xl shadow-md p-4 ${className || ''}`}>{children}</div>
);
export const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);
