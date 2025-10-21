import ProtectedRoute from '../components/common/ProtectedRoute';
import FeaturedSection from '../components/home/FeaturedSection';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import BestSellersSection from '../components/home/BestSellersSection';
import EditorPickSection from '../components/home/EditorPickSection';
import PromotionalBanners from '../components/home/PromotionalBanners';
import { categories, products } from '../components/data/data';

export default function Home() {
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
          <FeaturedSection featuredProducts={featuredProducts} />

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
