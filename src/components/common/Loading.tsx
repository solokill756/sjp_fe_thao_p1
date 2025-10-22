import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  type?: 'spinner' | 'dots' | 'pulse' | 'bars';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const DOTTING_ARRAY = [0, 1, 2];
const BARS_ARRAY = [0, 1, 2, 3];

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  type = 'spinner',
  text,
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const Spinner = () => (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600 ${sizeClasses[size]}`}
    />
  );

  // Dots component
  const Dots = () => {
    const dotSize =
      size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4';
    return (
      <div className="flex space-x-1">
        {DOTTING_ARRAY.map((index) => (
          <div
            key={index}
            className={`${dotSize} bg-indigo-600 rounded-full animate-bounce`}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  };

  const Pulse = () => (
    <div
      className={`animate-pulse bg-indigo-600 rounded-full ${sizeClasses[size]}`}
    />
  );

  const Bars = () => {
    const barWidth =
      size === 'small' ? 'w-1' : size === 'medium' ? 'w-1.5' : 'w-2';
    const barHeight =
      size === 'small' ? 'h-4' : size === 'medium' ? 'h-6' : 'h-8';

    return (
      <div className="flex items-end space-x-1">
        {BARS_ARRAY.map((index) => (
          <div
            key={index}
            className={`${barWidth} ${barHeight} bg-indigo-600 animate-pulse`}
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: '1s',
            }}
          />
        ))}
      </div>
    );
  };

  const renderLoadingAnimation = () => {
    switch (type) {
      case 'dots':
        return <Dots />;
      case 'pulse':
        return <Pulse />;
      case 'bars':
        return <Bars />;
      default:
        return <Spinner />;
    }
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex items-center justify-center';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        {renderLoadingAnimation()}
        {text && (
          <p className="text-gray-600 text-sm font-medium animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export const LoadingSpinner: React.FC<Omit<LoadingProps, 'type'>> = (props) => (
  <Loading {...props} type="spinner" />
);

export const LoadingDots: React.FC<Omit<LoadingProps, 'type'>> = (props) => (
  <Loading {...props} type="dots" />
);

export const LoadingPulse: React.FC<Omit<LoadingProps, 'type'>> = (props) => (
  <Loading {...props} type="pulse" />
);

export const LoadingBars: React.FC<Omit<LoadingProps, 'type'>> = (props) => (
  <Loading {...props} type="bars" />
);

export default Loading;
