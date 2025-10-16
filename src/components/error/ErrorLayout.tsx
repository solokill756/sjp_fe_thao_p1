import React from 'react';
import Button from '../common/Button';

interface ErrorLayoutProps {
  code: number;
  title: string;
  message: string;
  onGoHome: () => void;
  onGoBack?: () => void;
  showBackButton?: boolean;
  illustration: React.ReactNode;
  homeLabel: string;
  backLabel: string;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({
  title,
  message,
  onGoHome,
  onGoBack,
  showBackButton = true,
  illustration,
  homeLabel,
  backLabel,
}) => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center py-8">
      <div className="max-w-2xl w-full text-center px-4">
        <div className="mb-6">{illustration}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-sm mx-auto">
          <Button
            onClick={onGoHome}
            variant="custom"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 min-w-[120px]"
          >
            {homeLabel}
          </Button>

          {showBackButton && onGoBack && (
            <Button
              onClick={onGoBack}
              variant="custom"
              className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-lg transition-all duration-300 min-w-[120px]"
            >
              {backLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorLayout;
