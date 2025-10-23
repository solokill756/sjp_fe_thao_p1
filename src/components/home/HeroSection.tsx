import React from 'react';
import Button from '../common/Button';

const HeroSection: React.FC = () => {
  const t = (_key: string, fallback: string) => fallback;

  return (
    <div className="bg-[#E9E4F4] rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden font-sans">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 max-w-lg text-center md:text-left">
          <div className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            {t('weekendDiscount', 'Weekend Discount')}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {t(
              'heroTitle',
              'Shopping with us for better quality and the best price'
            )}
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
            {t(
              'heroSubtitle',
              "We have prepared special discounts for you on grocery products. Don't miss these opportunities..."
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Button
              variant="custom"
              className="bg-[#5A31F4] text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t('shopNow', 'Shop Now')}
            </Button>
            <div className="text-left">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">$21.67</span>
                <span className="text-lg text-gray-500 line-through">
                  $26.67
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Don't miss this limited time offer
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center relative w-full mt-8 md:mt-0">
          <img
            src="/bg.png"
            alt="TeeChia Cereal Bag"
            className="w-full max-w-sm h-auto object-contain z-[5]"
          />
          <img
            src="/Tabpanel (1).png"
            alt="Bowl of Cereal"
            className="hidden lg:block absolute w-48 h-48 object-cover rounded-full -right-8 -bottom-8 border-8 border-white shadow-2xl"
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-2.5 h-2.5 bg-purple-600 rounded-full cursor-pointer"></div>
        <div className="w-2.5 h-2.5 bg-gray-400 hover:bg-gray-500 rounded-full cursor-pointer"></div>
      </div>
    </div>
  );
};

export default HeroSection;
