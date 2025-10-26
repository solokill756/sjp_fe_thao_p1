interface TextareaInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  rows = 4,
}) => {
  return (
    <div className="w-full mb-4 sm:mb-6">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="shadow-sm appearance-none border rounded-lg w-full py-3 sm:py-3 px-3 sm:px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
        required={required}
      />
    </div>
  );
};

export default TextareaInput;
