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
            className={`${banner.bgColor} rounded-lg p-6 flex items-center bg-right bg-contain bg-no-repeat`}
            style={{
              backgroundImage: `url(${banner.image})`,
            }}
          >
            <div className="w-1/2">
              <p className="text-orange-600 font-semibold text-sm mb-2">
                {t('bannerTag', banner.tag)}
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                {t('bannerTitle', banner.title)}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {t('bannerSubtitle', banner.subtitle)}
              </p>
              <Button
                variant="custom"
                className="bg-white text-gray-800 px-4 py-2 rounded-md font-semibold text-sm shadow-sm hover:bg-gray-50 transition-colors flex items-center w-auto"
              >
                {t('shopNow')}
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
