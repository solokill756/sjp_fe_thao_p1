import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import { slides } from '../../config/home/HeroSectionConfig';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const { t } = useTranslation('home');
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className="rounded-2xl relative overflow-hidden font-sans">
      <div className="relative h-[500px] md:h-auto min-h-[400px]">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              } ${slide.bgColor}`}
            >
              <div className="p-8 sm:p-12 lg:p-16 h-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                  {/* Phần text */}
                  <div className="flex-1 max-w-lg text-center md:text-left z-10">
                    <div
                      className={`inline-block ${slide.preTitleBgColor} ${slide.preTitleTextColor} px-3 py-1 rounded-full text-sm font-semibold mb-4`}
                    >
                      {t(slide.preTitle)}
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                      {t(slide.title)}
                    </h1>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
                      {t(slide.subtitle)}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                      <Link to="/shop">
                        <Button
                          variant="custom"
                          className={`${slide.buttonColor} ${slide.buttonHoverColor} text-white px-8 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                        >
                          {t('shopNow', 'Shop Now')}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Phần hình ảnh */}
                  <div className="flex-1 flex justify-center items-center relative w-full mt-8 md:mt-0 h-full">
                    <img
                      src={slide.primaryImage}
                      alt={slide.title}
                      className="w-full max-w-sm h-auto object-contain z-[5]"
                    />
                    <img
                      src={slide.secondaryImage}
                      alt="Decorative"
                      className="hidden lg:block absolute w-48 h-48 object-cover rounded-full -right-8 -bottom-8 border-8 border-white shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dấu chấm điều hướng (Pagination) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${
              activeIndex === index
                ? 'bg-purple-600'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
