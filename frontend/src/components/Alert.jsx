export default function Alert({ message, type = "error" }) {
  const baseClasses = "w-full px-4 py-3 rounded text-sm font-medium text-center";
  const typeClasses =
    type === "success"
      ? "bg-green-100 text-green-800 border border-green-300"
      : "bg-red-100 text-red-800 border border-red-300";

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      {message}
    </div>
  );
}
