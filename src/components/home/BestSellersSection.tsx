import React from 'react';

import type { Product } from '../../models/productModel';
import { useTranslation } from 'react-i18next';
import HeaderSection from './HeaderSection';
import ProductGrid from './ProductGrid';

interface BestSellersProps {
  products: Product[];
}

const BestSellersSection: React.FC<BestSellersProps> = ({ products }) => {
  const { t } = useTranslation('home');
  return (
    <div className="mb-8">
      <div className="max-w-7xl mx-auto space-y-8 md:p-8">
        <HeaderSection
          title={t('bestSellers', 'Best Sellers')}
          subTitle={t(
            'bestSellersSubTitle',
            'Our best selling products this week'
          )}
          tag="bestseller"
        />

        <ProductGrid
          products={products}
          title={''}
          viewMode={'grid'}
          showViewAll={false}
        />
      </div>
    </div>
  );
};

export default BestSellersSection;
