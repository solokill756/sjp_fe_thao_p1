import React from 'react';

interface ErrorIllustrationProps {
  code: number;
}

const ErrorIllustration: React.FC<ErrorIllustrationProps> = ({ code }) => {
  const getImage = (src: string, fallback: string) => (
    <img
      src={src}
      alt="Error Illustration"
      className="w-96 h-96 object-contain"
      onError={(e) => {
        (e.target as HTMLImageElement).src = fallback;
      }}
    />
  );

  switch (code) {
    case 404:
      return (
        <div className="flex justify-center mb-8">
          {getImage(
            '/404.png',
            'https://illustrations.popsy.co/amber/page-not-found.svg'
          )}
        </div>
      );
    case 403:
      return (
        <div className="flex justify-center mb-8">
          {getImage(
            '/403.png',
            'https://raw.githubusercontent.com/ismaelsadeeq/error-illustrations/main/403.svg'
          )}
        </div>
      );
    case 500:
      return (
        <div className="flex justify-center mb-8">
          {getImage(
            '/500.jpg',
            'https://raw.githubusercontent.com/ismaelsadeeq/error-illustrations/main/500.svg'
          )}
        </div>
      );
    case 0:
      return (
        <div className="flex justify-center mb-8">
          {getImage(
            '/NoInternet.jpg',
            'https://raw.githubusercontent.com/ismaelsadeeq/error-illustrations/main/no-internet.svg'
          )}
        </div>
      );
    default:
      return (
        <div className="flex justify-center mb-8">
          {getImage(
            '/Error.jpg',
            'https://raw.githubusercontent.com/ismaelsadeeq/error-illustrations/main/error.svg'
          )}
        </div>
      );
  }
};

export default ErrorIllustration;
