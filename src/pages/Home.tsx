import ProtectedRoute from '../components/common/ProtectedRoute';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import ProductGrid from '../components/home/ProductGrid';

import PromotionalBanners from '../components/home/PromotionalBanners';
import { useTranslation } from 'react-i18next';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../features/api/apiSlice';
import { LoadingSpinner } from '../components/common/Loading';
import { ServerErrorPage } from '../components/error';
import { BestSellersSection, EditorPickSection } from '../components/home';
import FeaturedSection from '../components/home/FeaturedSection';

export default function Home() {
  const { t } = useTranslation('home');
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetCategoriesQuery();
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useGetProductsQuery();

  if (isLoadingProducts || isLoadingCategories) {
    return <LoadingSpinner />;
  }

  if (isErrorProducts || isErrorCategories) {
    return <ServerErrorPage />;
  }

  const featuredProducts = productsData
    ? productsData.filter((product) => product.tags?.includes('featured') || [])
    : [];

  const bestSellerProducts = productsData
    ? productsData.filter(
        (product) => product.tags?.includes('bestseller') || []
      )
    : [];

  const editorPickProducts = productsData
    ? productsData.filter(
        (product) => product.tags?.includes('editorPicks') || []
      )
    : [];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Hero Section */}
          <HeroSection />
          <CategorySection categories={categoriesData || []} />
          {featuredProducts.length > 0 && (
            <FeaturedSection featuredProducts={featuredProducts} />
          )}

          {/* BestSellers Section */}
          {bestSellerProducts.length > 0 && (
            <BestSellersSection products={bestSellerProducts} />
          )}

          {/* EditorPick Section */}
          {editorPickProducts.length > 0 && (
            <EditorPickSection products={editorPickProducts} />
          )}

          {/* Promotional Banners */}
          <PromotionalBanners />
        </div>
      </div>
    </ProtectedRoute>
  );
}
