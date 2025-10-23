import { FaRegStar, FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return Array.from({ length: 5 }, (_, i) =>
    i + 1 <= rating ? (
      <FaStar key={i} className="w-4 h-4 text-yellow-400" />
    ) : (
      <FaRegStar key={i} className="w-4 h-4 text-gray-300" />
    )
  );
};

export default StarRating;
