import React from 'react';
import type { Product } from '../../models/productModel';
import { useTranslation } from 'react-i18next';
import HeaderSection from './HeaderSection';
import ProductGrid from './ProductGrid';

interface EditorPickProps {
  products: Product[];
}

const EditorPickSection: React.FC<EditorPickProps> = ({ products }) => {
  const { t } = useTranslation('home');
  return (
    <div className="mb-8">
      <div className="max-w-7xl mx-auto space-y-8 md:p-8">
        <HeaderSection
          title={t('editorsPick', "Editor's Pick")}
          subTitle={t(
            'editorsPickSubTitle',
            'Products handpicked by our editors'
          )}
        />
        <ProductGrid products={products} title={''} viewMode={'grid'} />
      </div>
    </div>
  );
};

export default EditorPickSection;
