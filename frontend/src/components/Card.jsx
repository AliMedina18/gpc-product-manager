export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, children }) => {
  return (
    <div className="mb-6">
      {title && <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>}
      {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
      {children}
    </div>
  );
};

export const CardBody = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

export const CardFooter = ({ children }) => {
  return <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">{children}</div>;
};
