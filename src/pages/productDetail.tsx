import ImageGallery from '../components/productDetail/ImageGallery';
import ProductInfo from '../components/productDetail/ProductInfo';
import ProductTabs from '../components/productDetail/ProductTabs ';
import { useParams } from 'react-router-dom';
import { NotFoundPage, ServerErrorPage } from '../components/error';
import { ProductGrid } from '../components/home';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetReviewsByProductQuery,
} from '../features/api/apiSlice';
import { LoadingSpinner } from '../components/common/Loading';

export default function ProductDetail() {
  const { t } = useTranslation('productDetail');
  const { id } = useParams<{ id: string }>();
  const {
    data: productDetailData,
    isLoading: isLoadingProductDetail,
    isError: isErrorProductDetail,
  } = useGetProductByIdQuery(id ? Number(id) : 0, {
    skip: !id,
  });
  const {
    data: relatedProductsData,
    isLoading: isLoadingRelatedProducts,
    isError: isErrorRelatedProducts,
  } = useGetProductsByCategoryQuery(productDetailData?.categoryId ?? 0, {
    skip: !productDetailData?.categoryId,
  });
  const { data: reviewsData, isLoading: isLoadingReviews } =
    useGetReviewsByProductQuery(productDetailData?.id ?? 0, {
      skip: !productDetailData?.id,
    });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!id) {
    return <NotFoundPage />;
  }

  if (isErrorProductDetail) {
    return <ServerErrorPage />;
  }

  if (isLoadingProductDetail || isLoadingReviews || isLoadingRelatedProducts) {
    return <LoadingSpinner fullScreen={true} />;
  }

  if (!productDetailData) {
    return <NotFoundPage />;
  }

  return (
    <div className="font-sans text-gray-800">
      <div className="container mx-auto max-w-6xl p-4 md:p-8">
        {/* Breadcrumbs */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <ImageGallery
              images={productDetailData.imageUrls}
              discountPercentage={productDetailData.salePercentage}
              inStock={productDetailData.stockCurrent > 0}
            />
          </div>

          <div>
            <ProductInfo product={productDetailData} />
          </div>
        </div>

        {/* Component Tabs (Description & Reviews) */}
        <ProductTabs
          description={productDetailData.description}
          reviews={reviewsData}
        />

        {/* Component Sản phẩm liên quan */}
        {relatedProductsData && !isErrorRelatedProducts && (
          <ProductGrid
            products={relatedProductsData}
            title={t('relatedProducts', 'Related Products')}
            viewMode="grid"
            showViewAll={false}
          />
        )}
      </div>
    </div>
  );
}
