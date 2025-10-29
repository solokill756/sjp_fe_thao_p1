import React from 'react';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import type { Product } from '../../models/productModel';
import { useTranslation } from 'react-i18next';

interface ProductGridProps {
  title: string;
  products: Product[];
  showViewAll?: boolean;
  viewMode: 'grid' | 'list';
}

const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  products,
  showViewAll = true,
  viewMode,
}) => {
  const { t } = useTranslation('home');

  return (
    <div className="mb-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t(title, title)}</h2>
        {showViewAll && (
          <Button
            variant="custom"
            className="text-blue-600 hover:text-blue-800 font-medium bg-transparent w-auto"
          >
            {t('viewAll')}
          </Button>
        )}
      </div>

      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
            : 'flex flex-col gap-4'
        }
      >
        {products.map((product) => (
          <ProductCard product={product} viewMode={viewMode} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
