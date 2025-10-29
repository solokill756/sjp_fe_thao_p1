import type { Product } from '../../models/productModel';
import { useTranslation } from 'react-i18next';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import Button from '../common/Button';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import StarRating from '../common/StarRating';
import {
  useAddCartItemMutation,
  useGetCartsQuery,
  useUpdateCartItemMutation,
} from '../../features/api/apiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const { t } = useTranslation('home');
  const [addCartItem, { isLoading: isAdding }] = useAddCartItemMutation();
  const [updateCartItem, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();

  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const {
    data: items,
    isLoading,
    isError,
  } = useGetCartsQuery(userId ?? 0, {
    skip: !userId,
  });
  const handleAddToCart = async () => {
    try {
      console.log('Adding to cart:', product);
      if (product.stockCurrent <= 0 || !userId) {
        toast.error(t('addToCartError', 'Failed to add item to cart.'));
        return;
      }
      const checkExisting = items?.find(
        (item) => item.productId === product.id
      );

      if (checkExisting) {
        await updateCartItem({
          id: checkExisting.id,
          productId: product.id,
          quantity: checkExisting.quantity + 1,
          userId: userId!,
        }).unwrap();
      } else {
        await addCartItem({
          productId: product.id,
          quantity: 1,
          userId: userId!,
        }).unwrap();
      }

      toast.success(t('addToCartSuccess', 'Item added to cart successfully!'));
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast.error(t('addToCartError', 'Failed to add item to cart.'));
    }
  };
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-gray-200 p-4 font-sans transition hover:shadow-lg group',
        viewMode === 'grid'
          ? 'flex flex-col max-w-xs mx-auto'
          : 'flex flex-row gap-4 items-start w-full'
      )}
    >
      <Link
        to={`/product/${product.id}`}
        className={clsx(
          'relative block',
          viewMode === 'grid'
            ? 'mb-4 w-full aspect-square flex items-center justify-center'
            : 'flex-shrink-0 w-40 h-40'
        )}
        tabIndex={-1}
      >
        {product.salePercentage && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1.5 rounded-full z-10">
            {t('salePercentage', '{{sale}}%', { sale: product.salePercentage })}
          </div>
        )}

        <button className="absolute top-0 right-0 text-gray-400 hover:text-red-500 z-10 p-2">
          <FaHeart className={viewMode === 'grid' ? 'w-6 h-6' : 'w-5 h-5'} />
        </button>

        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className={clsx(
            'object-contain transition-transform duration-300 group-hover:scale-105',
            viewMode === 'grid' ? 'w-full h-full' : 'w-full h-full rounded-md'
          )}
        />
      </Link>

      <div
        className={clsx(
          'flex flex-col',
          viewMode === 'list' && 'flex-1 justify-between'
        )}
      >
        <div>
          <Link to={`/product/${product.id}`} tabIndex={-1} className="block">
            <h3
              className={clsx(
                'text-gray-800 font-semibold line-clamp-2',
                viewMode === 'grid' ? 'text-base mb-2 h-12' : 'text-lg mb-2'
              )}
            >
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center mb-2">
            <div className="flex mr-2 gap-0.5">
              <StarRating rating={product.rating} />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">
                {product.reviewCount}
              </span>
              <span className="text-xs text-gray-500">
                {t('reviews', 'reviews')}
              </span>
            </div>
          </div>

          {viewMode === 'list' && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {product.description ||
                t('noDescription', 'No description available.')}
            </p>
          )}

          <div className="flex items-center gap-2 mb-4">
            <span
              className={clsx(
                'font-bold text-red-500',
                viewMode === 'grid' ? 'text-2xl' : 'text-xl'
              )}
            >
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
        </div>

        <div
          className={clsx(
            'flex items-center',
            viewMode === 'grid' ? 'gap-4' : 'justify-between mt-3'
          )}
        >
          {viewMode === 'grid' ? (
            <>
              <Button
                variant="custom"
                onClick={handleAddToCart}
                className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
              >
                <FaShoppingCart className="w-6 h-6" />
              </Button>
              <span
                className={clsx(
                  'text-sm font-bold',
                  product.stockCurrent > 0 ? 'text-green-600' : 'text-red-600'
                )}
              >
                {product.stockCurrent > 0
                  ? t('inStock', 'IN STOCK')
                  : t('outOfStock', 'OUT OF STOCK')}
              </span>
            </>
          ) : (
            <>
              <span
                className={clsx(
                  'text-sm font-bold',
                  product.stockCurrent > 0 ? 'text-green-600' : 'text-red-600'
                )}
              >
                {product.stockCurrent > 0
                  ? t('inStock', 'IN STOCK')
                  : t('outOfStock', 'OUT OF STOCK')}
              </span>
              <Button
                variant="custom"
                className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors shadow-sm"
                disabled={
                  !product.stockCurrent ||
                  isAdding ||
                  isLoading ||
                  isError ||
                  isUpdating
                }
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="w-5 h-5" />
                <span>{t('addToCart', 'Add to Cart')}</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
