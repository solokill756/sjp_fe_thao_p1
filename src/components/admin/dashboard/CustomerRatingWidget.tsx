import { MoreHorizontal, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CustomerRatingData } from '../../../config/admin/dashboard/dashboardConfig';

const CustomerRatingWidget: React.FC<CustomerRatingData> = ({
  rating,
  ratingCount,
}) => {
  const { t } = useTranslation('dashboard');

  const stars = [];
  const roundedRating = Math.round(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        size={16}
        fill="currentColor"
        className={i <= roundedRating ? 'text-yellow-400' : 'text-gray-300'}
      />
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <span className="text-gray-500">{t('customer_rating')}</span>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>
      <h4 className="text-2xl font-bold text-gray-800 mt-3">
        {rating.toFixed(1)}
      </h4>
      <div className="flex items-center space-x-1 text-yellow-400 mt-1">
        {stars}
        <span className="text-xs text-gray-500 ml-1">({ratingCount})</span>
      </div>
    </div>
  );
};

export default CustomerRatingWidget;
