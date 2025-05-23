export default function Alert({ message, type = "error", onClose }) {
  const baseClasses = "max-w-md mx-auto px-4 py-3 rounded text-sm font-medium transition-all duration-300 ease-in-out transform";
  const typeClasses =
    type === "success"
      ? "bg-black text-gold border border-gold"
      : "bg-red-100 text-red-800 border border-red-300";

  return (
    <div className={`${baseClasses} ${typeClasses} animate-fade-in`}>
      <div className="flex justify-between items-center">
        <span className="flex-1 text-center">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-gray-400 hover:text-gray-200 focus:outline-none"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
