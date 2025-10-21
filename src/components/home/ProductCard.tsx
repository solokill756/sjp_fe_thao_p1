import type { Product } from '../../models/productModel';
import { useTranslation } from 'react-i18next';
import { FaHeart, FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation('home');
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= product.rating ? (
          <FaStar key={i} className="w-4 h-4 text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="w-4 h-4 text-gray-300" />
        )
      );
    }
    return stars;
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 font-sans max-w-xs mx-auto group">
      <div className="relative mb-4">
        {product.salePercentage && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
            {t('salePercentage', '{{sale}}%', { sale: product.salePercentage })}
          </div>
        )}
        <button className="absolute top-0 right-0 text-gray-400 hover:text-red-500 z-10 p-2">
          <FaHeart className="w-6 h-6" />
        </button>
        <div className="aspect-square flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/200x200/ffffff/333?text=Image`;
            }}
          />
        </div>
      </div>

      <h3 className="text-base font-semibold text-gray-800 mb-2 h-12 line-clamp-2">
        {product.name}
      </h3>

      <div className="flex items-center mb-3">
        <div className="flex text-yellow-400 mr-2 gap-0.5">{renderStars()}</div>
        <span className="text-sm text-gray-500">
          {t('reviewCount', '{{count}} reviews', {
            count: product.reviewCount,
          })}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl font-bold text-red-500">
          {t('price', '${{price}}', { price: product.price.toFixed(2) })}
        </span>
        {product.originalPrice && (
          <span className="text-base text-gray-500 line-through">
            {t('originalPrice', '${{price}}', {
              price: product.originalPrice.toFixed(2),
            })}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center font-medium hover:bg-green-600 transition-colors shadow-md hover:shadow-lg">
          <FaShoppingCart className="w-6 h-6" />
        </button>
        {product.inStock ? (
          <span className="text-sm font-bold text-green-600">
            {t('inStock', 'IN STOCK')}
          </span>
        ) : (
          <span className="text-sm font-bold text-red-600">
            {t('outOfStock', 'OUT OF STOCK')}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
