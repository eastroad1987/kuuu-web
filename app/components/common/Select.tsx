interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; title: string }[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = "선택하세요",
  className = "",
  disabled = false,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100 ${className} `}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options &&
        options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
    </select>
  );
}
