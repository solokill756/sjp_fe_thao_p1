import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';

import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  subtotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal }) => {
  const { t } = useTranslation('cart');
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };
  return (
    <div className="md:col-span-1">
      <div className="sticky top-24 bg-gray-50 rounded-lg p-6 lg:p-8 shadow-sm border border-gray-200">
        <h2 className="pb-4 mb-6 text-2xl font-semibold  border-gray-300">
          {t('cartTotals', 'Cart totals')}
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between pt-4 mt-4 text-2xl font-semibold border-t border-gray-300">
            <span className="text-gray-900">{t('total', 'Total')}</span>
            <span className="text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
        </div>
        <Button
          className="w-full px-6 py-4 mt-8 text-lg"
          variant="primary"
          onClick={handleCheckout}
        >
          {t('checkout', 'Proceed to checkout')}
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
