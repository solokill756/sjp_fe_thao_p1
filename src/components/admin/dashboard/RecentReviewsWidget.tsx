import { useTranslation } from 'react-i18next';
import WidgetCard from '../common/WidgetCard';
import { MoreHorizontal, Star } from 'lucide-react';
import type { Review } from '../../../models/review';

interface RecentReviewsWidgetProps {
  reviews: Review[];
}
const RecentReviewsWidget: React.FC<RecentReviewsWidgetProps> = ({
  reviews,
}) => {
  const { t } = useTranslation('dashboard');
  console.log('Reviews in RecentReviewsWidget:', reviews);
  return (
    <WidgetCard title={t('recent_reviews', 'Recent Reviews')}>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">
                  {review.user.lastName && review.user.firstName
                    ? `${review.user.lastName} ${review.user.firstName}`
                    : review.user.email}
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      fill="currentColor"
                      className={
                        index < review.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="mt-2 text-gray-600 flex justify-between items-center">
              <p className="text-sm">{review.comment}</p>
              <MoreHorizontal size={14} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};

export default RecentReviewsWidget;
