import React from 'react';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import type { Product } from '../../models/productModel';
import { useTranslation } from 'react-i18next';

interface EditorPickProps {
  products: Product[];
}

const EditorPickSection: React.FC<EditorPickProps> = ({ products }) => {
  const { t } = useTranslation('home');
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('editorsPick', "Editor's Pick")}
          <span className="text-sm font-normal text-gray-500 ml-2">
            {t('getSomeProducts', 'Get some products with created offers')}
          </span>
        </h2>
        <Button
          variant="custom"
          className="text-blue-600 hover:text-blue-800 font-medium bg-transparent w-auto"
        >
          {t('viewAll')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode="grid" />
        ))}
      </div>
    </div>
  );
};

export default EditorPickSection;
