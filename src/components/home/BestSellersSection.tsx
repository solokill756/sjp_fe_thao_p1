import React from 'react';

import type { Product } from '../../models/productModel';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';
import HeaderSection from './HeaderSection';

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
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={'grid'} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellersSection;
