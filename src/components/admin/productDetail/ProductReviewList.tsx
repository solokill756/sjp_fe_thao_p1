import { useTranslation } from 'react-i18next';
import type { Review } from '../../../models/review';
import ProductRating from '../product/ProductRating';

interface ProductReviewListProps {
  reviews: Review[] | undefined;
  reviewCount: number;
}

const ProductReviewList: React.FC<ProductReviewListProps> = ({
  reviews,
  reviewCount,
}) => {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const { t } = useTranslation('adminProductDetail');

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {t('reviews')} ({reviewCount})
      </h3>
      <div className="space-y-4 max-h-60 overflow-y-auto">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-800">
                {review.user.firstName && review.user.lastName
                  ? `${review.user.firstName} ${review.user.lastName}`
                  : review.user.email}
              </span>
              <ProductRating rating={review.rating} count={-1} />
            </div>
            <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
            <p className="text-xs text-gray-400">
              {new Date(review.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewList;
