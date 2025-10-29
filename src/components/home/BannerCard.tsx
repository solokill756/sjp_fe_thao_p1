import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Banner } from '../../config/home/bannerCardConfig';

interface BannerCardProps extends Banner {
  decoration?: React.ReactNode;
}

const BannerCard: React.FC<BannerCardProps> = ({
  preTitle,
  title,
  imageAlt,
  subtitle,
  imageUrl,
  bgColor,
  preTitleColor,
  decoration,
}) => {
  const { t } = useTranslation('home');
  const hasDecoration = React.Children.count(decoration) > 0;

  return (
    <div
      className="relative rounded-lg shadow-sm overflow-hidden h-full"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label={imageAlt}
      ></div>

      <div className="absolute inset-0 bg-black opacity-10"></div>

      {hasDecoration && (
        <div className="absolute inset-0 z-20">{decoration}</div>
      )}

      <div className="relative z-30 h-full p-6 md:p-8 lg:p-10 space-y-3 flex flex-col justify-center items-start">
        <span
          className="font-bold text-sm uppercase"
          style={{ color: preTitleColor }}
        >
          {t(preTitle)}
        </span>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight ">
          {t(title)}
        </h2>
        <p className="text-gray-600 text-sm">{t(subtitle)}</p>
        <Button
          variant="custom"
          className="bg-white text-gray-900 font-semibold py-2 px-5 rounded-full shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center group text-sm w-auto"
        >
          {t('shopNow', 'Shop Now')}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};
export default BannerCard;
