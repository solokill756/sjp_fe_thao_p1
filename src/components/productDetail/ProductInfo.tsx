import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Product } from '../../models/productModel';
import StarRating from '../common/StarRating';
import Button from '../common/Button';
import {
  FaHeart,
  FaShareAlt,
  FaExchangeAlt,
  FaCreditCard,
  FaShieldAlt,
} from 'react-icons/fa';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { t } = useTranslation('productDetail');
  const [quantity, setQuantity] = useState<number>(1);
  const increaseQuantity = () => setQuantity((prev: number) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1));
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <StarRating rating={product.rating} />
          <span>
            ({product.reviewCount} {t('reviews', 'Reviews')})
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-red-600">
          ${product.price.toFixed(2)}
        </span>

        {product.originalPrice && (
          <span className="text-gray-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      <p className="text-gray-600">{product.description}</p>

      <Button
        variant="custom"
        className="w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-600 transition-colors duration-200 my-2"
      >
        {t('orderWhatsapp', 'Order on WhatsApp')}
      </Button>

      <div className="flex flex-col sm:flex-row items-center gap-4 my-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <Button
            onClick={decreaseQuantity}
            variant="custom"
            className="px-4 py-2 text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-l-md w-auto"
          >
            -
          </Button>
          <span className="px-5 py-2 text-lg font-medium">{quantity}</span>
          <Button
            onClick={increaseQuantity}
            variant="custom"
            className="px-4 py-2 text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-r-md w-auto"
          >
            +
          </Button>
        </div>

        <Button
          variant="custom"
          className="flex-1 w-full sm:w-auto bg-green-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          {t('addToCart', 'Add to cart')}
        </Button>

        <Button
          variant="custom"
          className="flex-1 w-full sm:w-auto bg-gray-800 text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-900 transition-colors duration-200"
        >
          {t('buyNow', 'Buy Now')}
        </Button>
      </div>

      <div className="border border-gray-200 rounded-lg">
        {/* Payment */}
        <div className="flex items-start gap-4 p-4 border-b border-gray-200">
          <FaCreditCard className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
          <div>
            <span className="font-semibold text-gray-800">
              {t('payment', 'Payment')}:{' '}
            </span>
            <span className="text-gray-600 text-sm">
              {t(
                'paymentDetail',
                'Payment upon receipt of goods, Payment by card in the department, Google Pay, Online card, -5% discount in case of payment'
              )}
            </span>
          </div>
        </div>
        {/* Warranty */}
        <div className="flex items-start gap-4 p-4">
          <FaShieldAlt className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
          <div>
            <span className="font-semibold text-gray-800">
              {t('warranty', 'Warranty')}:{' '}
            </span>
            <span className="text-gray-600 text-sm">
              {t(
                'warrantyDetail',
                'The Consumer Protection Act does not provide for the return of this product of proper quality.'
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Wishlist & Compare & Share */}
      <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap mt-4">
        <Button
          variant="custom"
          className="hover:text-green-600 flex items-center gap-1"
        >
          <FaHeart className="w-4 h-4" />
          {t('addToWishlist', 'Add to wishlist')}
        </Button>
        <span className="text-gray-300 hidden sm:inline">|</span>
        <Button
          variant="custom"
          className="hover:text-green-600 flex items-center gap-1"
        >
          <FaShareAlt className="w-4 h-4" />
          {t('shareProduct', 'Share this Product')}
        </Button>
        <span className="text-gray-300 hidden sm:inline">|</span>
        <Button
          variant="custom"
          className="hover:text-green-600 flex items-center gap-1"
        >
          <FaExchangeAlt className="w-4 h-4" />
          {t('compare', 'Compare')}
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
