import React from 'react';
import Button from '../common/Button';
import { promotionalBanners } from '../../config/home/promotionalBannersConfig';
import { useTranslation } from 'react-i18next';

const PromotionalBanners: React.FC = () => {
  const { t } = useTranslation('home');
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotionalBanners.map((banner) => (
          <div
            key={banner.id}
            className={`relative rounded-lg overflow-hidden h-56 md:h-64`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${banner.imageUrl})`,
              }}
            ></div>

            <div className="absolute inset-0 bg-black opacity-10"></div>

            <div className="relative z-10 p-6 h-full flex flex-col justify-center">
              <p className="text-orange-600 font-semibold text-sm mb-2">
                {t(banner.preTitle)}
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                {t(banner.title)}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{t(banner.subtitle)}</p>
              <Button
                variant="custom"
                className="bg-white text-gray-800 px-5 py-2 rounded-full font-semibold text-sm shadow-sm hover:bg-gray-50 transition-colors flex items-center w-auto"
              >
                {t('shopNow', 'Shop Now')}
                <span className="ml-2">→</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionalBanners;
