import { useFormStatus } from 'react-dom';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'custom';
}

export default function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'primary',
  className = 'w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 text-sm sm:text-base',
}: ButtonProps) {
  const { pending } = useFormStatus();
  const baseClasses =
    'focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-offset-2 transition-all duration-300';

  const variantClasses = {
    primary:
      'w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg focus:ring-indigo-500 text-sm sm:text-base',
    secondary:
      'w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg focus:ring-gray-500 text-sm sm:text-base',
    custom: '', // No default styles for custom variant
  };

  const finalClasses =
    variant === 'custom'
      ? `${className}`
      : `${variantClasses[variant]} ${baseClasses} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || pending}
      className={finalClasses}
    >
      {children}
    </button>
  );
}
