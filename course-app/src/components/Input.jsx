const Input = ({
  heading,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  errors,
  disabled = false
}) => {
  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-1">{heading}</p>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full border rounded-md px-3 py-2 outline-none transition-colors
          ${errors ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-1 focus:ring-blue-500"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      />

      {errors && (
        <p className="text-red-500 text-sm mt-1">{errors}</p>
      )}
    </div>
  );
};

export default Input;