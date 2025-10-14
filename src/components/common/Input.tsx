interface RadioOption {
  value: string;
  label: string;
  id: string;
}

interface InputProps {
  label: string;
  type?: string;
  name: string;
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  options?: RadioOption[];
  checked?: boolean;
}

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  options = [],
}: InputProps) {
  if (type === 'radio' && options.length > 0) {
    return (
      <div className="w-full mb-4 sm:mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={option.id}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                required={required}
              />
              <label
                htmlFor={option.id}
                className="ml-2 block text-sm text-gray-900"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className="w-full mb-4 sm:mb-6 space-y-3">
        <label className="flex items-start text-sm text-gray-600">
          <input
            type="checkbox"
            name={name}
            checked={value as boolean}
            onChange={onChange}
            className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-0.5 flex-shrink-0"
            required={required}
          />
          <span className="leading-5">{label}</span>
        </label>
      </div>
    );
  }

  return (
    <div className="w-full mb-4 sm:mb-6">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value as string}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow-sm appearance-none border rounded-lg w-full py-3 sm:py-4 px-3 sm:px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
        required={required}
      />
    </div>
  );
}
