import React from 'react';

interface ErrorIllustrationProps {
  code: number;
}

const errorImages: Record<number, string> = {
  404: '/404.png',
  403: '/403.png',
  500: '/500.jpg',
  0: '/NoInternet.jpg',
};

const ErrorIllustration: React.FC<ErrorIllustrationProps> = ({ code }) => {
  const getImage = (src: string) => (
    <img
      src={src}
      alt="Error Illustration"
      className="w-96 h-96 object-contain"
    />
  );

  return (
    <div className="flex justify-center mb-8">
      {getImage(errorImages[code] || '/Error.jpg')}
    </div>
  );
};

export default ErrorIllustration;
