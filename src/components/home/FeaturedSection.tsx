import { Star, CircleDashed } from 'lucide-react';
import BannerCard from './BannerCard';
import { groceryBanner, needsBanner } from '../../config/home/bannerCardConfig';
import { useTranslation } from 'react-i18next';
import ProductGrid from './ProductGrid';
import HeaderSection from './HeaderSection';

interface FeaturedSectionProps {
  featuredProducts: any[];
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  featuredProducts,
}) => {
  const { t } = useTranslation('home');
  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-8 md:p-8">
        <HeaderSection
          title={t('featuredProducts', 'Featured Products')}
          subTitle={t(
            'featuredProductsSubTitle',
            'Check out our featured products'
          )}
          tag="featured"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 text-left">
          <div className="flex justify-start items-stretch">
            <BannerCard {...groceryBanner} />
          </div>

          <div className="flex justify-start items-stretch">
            <BannerCard {...needsBanner} />
          </div>
        </div>

        <ProductGrid
          title={''}
          products={featuredProducts}
          showViewAll={false}
          viewMode={'grid'}
        />
        <div className="bg-orange-100 rounded-lg p-6 md:p-10 flex flex-col md:flex-row justify-between items-center bg-opacity-60 overflow-hidden relative">
          <CircleDashed
            size={120}
            className="absolute -left-10 -bottom-10 text-orange-300 opacity-50"
          />
          <Star
            size={80}
            className="absolute -right-5 top-0 text-red-300 opacity-60"
          />

          <div className="text-center md:text-left mb-4 md:mb-0 z-10">
            <h3 className="text-2xl font-bold text-gray-900">
              In store or online your health & safety is our top priority
            </h3>
            <p className="text-gray-700">
              The only supermarket that makes your life easier, makes you enjoy
              life and makes it better.
            </p>
          </div>
          <div className="text-7xl font-extrabold text-orange-500 opacity-50 z-10">
            50%
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
