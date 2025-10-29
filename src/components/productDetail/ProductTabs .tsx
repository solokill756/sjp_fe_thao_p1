import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Review } from '../../models/review';
import StarRating from '../common/StarRating';

interface ProductTabsProps {
  description: string | undefined;
  reviews: Review[] | undefined;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ description, reviews }) => {
  const { t } = useTranslation('productDetail');
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>(
    'description'
  );
  console.log('Reviews in ProductTabs:', reviews);
  return (
    <div className="w-full my-10">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        <button
          className={`py-3 px-6 text-lg font-medium ${
            activeTab === 'description'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('description')}
        >
          {t('descriptionTab', 'Description')}
        </button>
        <button
          className={`py-3 px-6 text-lg font-medium ${
            activeTab === 'reviews'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('reviews')}
        >
          {t('reviewsTab', 'Reviews')} ({reviews ? reviews.length : 0})
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {/* Description */}
        {activeTab === 'description' && description && (
          <div
            className="prose max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold mb-4">
              {t('customerReviews', 'Customer Reviews')}
            </h3>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => {
                const user = review.user || {};
                const displayName =
                  user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.username || t('anonymous', 'Anonymous');
                return (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-4"
                  >
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-gray-800">
                        {displayName}
                      </span>
                      <span className="text-gray-400 mx-2">-</span>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">
                {t('noReviews', 'There are no reviews yet.')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
