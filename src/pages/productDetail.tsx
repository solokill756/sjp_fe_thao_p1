import { products } from '../data/data';
import ImageGallery from '../components/productDetail/ImageGallery';
import ProductInfo from '../components/productDetail/ProductInfo';
import ProductTabs from '../components/productDetail/ProductTabs ';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from '../components/error';
import { ProductGrid } from '../components/home';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProductDetail() {
  const { t } = useTranslation('productDetail');
  const { id } = useParams();
  const productData = products.find((product) => product.id === id);
  const otherProducts = products.filter((p) => p.id !== id).slice(0, 4);
  if (!productData) {
    return <NotFoundPage />;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="font-sans text-gray-800">
      <div className="container mx-auto max-w-6xl p-4 md:p-8">
        {/* Breadcrumbs */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <ImageGallery images={productData.imageUrls} />
          </div>

          <div>
            <ProductInfo product={productData} />
          </div>
        </div>

        {/* Component Tabs (Description & Reviews) */}
        <ProductTabs
          description={productData.description}
          reviews={productData.reviews}
        />

        {/* Component Sản phẩm liên quan */}
        <ProductGrid
          products={otherProducts}
          title={t('relatedProducts', 'Related Products')}
          viewMode={'grid'}
          showViewAll={false}
        />
      </div>
    </div>
  );
}
