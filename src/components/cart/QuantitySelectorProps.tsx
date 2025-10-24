import { FaMinus, FaPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onDecrease,
  onIncrease,
}) => {
  const { t } = useTranslation('cart');
  return (
    <div className="flex items-center border border-gray-300 rounded-md max-w-min">
      <Button
        variant="custom"
        className="px-3 py-2 text-gray-700 transition-colors rounded-l-md hover:bg-gray-100 disabled:opacity-50"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label={t('decrease', 'Decrease quantity')}
      >
        <FaMinus />
      </Button>
      <span className="w-12 px-3 py-1 text-center text-gray-900 bg-white border-l border-r border-gray-300">
        {quantity}
      </span>
      <Button
        variant="custom"
        className="px-3 py-2 text-gray-700 transition-colors rounded-r-md hover:bg-gray-100"
        onClick={onIncrease}
        aria-label={t('increase', 'Increase quantity')}
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantitySelector;
