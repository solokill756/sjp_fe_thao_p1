import type { SelectOption } from '../../config/checkout/checkoutConfig';

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: SelectOption[];
}
const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  options,
}) => {
  return (
    <div className="w-full mb-4 sm:mb-6">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="shadow-sm appearance-none border rounded-lg w-full py-3 sm:py-3 px-3 sm:px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base bg-white"
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
