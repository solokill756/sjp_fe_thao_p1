import { StarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface RatingProps {
  rating: number;
  count: number;
}

const ProductRating: React.FC<RatingProps> = ({ rating, count }) => {
  const { t } = useTranslation('adminProducts');
  if (count === 0) {
    return <span className="text-gray-400 text-sm">{t('no_reviews')}</span>;
  }
  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} fill={i < rating ? 'currentColor' : 'none'} />
        ))}
        {count > -1 && <span className="text-gray-500 text-sm">({count})</span>}
      </div>
    </div>
  );
};

export default ProductRating;
