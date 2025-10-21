import ProtectedRoute from '../components/common/ProtectedRoute';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import ProductGrid from '../components/home/ProductGrid';
import BestSellersSection from '../components/home/BestSellersSection';
import EditorPickSection from '../components/home/EditorPickSection';
import SafetyBanner from '../components/home/SafetyBanner';
import PromotionalBanners from '../components/home/PromotionalBanners';
import { categories, products } from '../components/data/data';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation('home');
  const featuredProducts = products
    .filter((p) => p.tags.includes('featured'))
    .slice(0, 6);
  const bestSellerProducts = products
    .filter((p) => p.tags.includes('bestseller'))
    .slice(0, 6);
  const editorPickProducts = products
    .filter((p) => p.tags.includes('editors-pick'))
    .slice(0, 5);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Hero Section */}
          <HeroSection />

          {/* Category Icons */}
          <CategorySection categories={categories} />

          {/* Featured Products */}
          <ProductGrid
            title={t('featuredProducts', 'Featured Products')}
            products={featuredProducts}
            showViewAll={true}
          />

          {/* BestSellers Section */}
          {bestSellerProducts.length > 0 && (
            <BestSellersSection products={bestSellerProducts} />
          )}

          {/* EditorPick Section */}
          {editorPickProducts.length > 0 && (
            <EditorPickSection products={editorPickProducts} />
          )}

          {/* Health & Safety Banner */}
          <SafetyBanner />

          {/* Promotional Banners */}
          <PromotionalBanners />
        </div>
      </div>
    </ProtectedRoute>
  );
}
