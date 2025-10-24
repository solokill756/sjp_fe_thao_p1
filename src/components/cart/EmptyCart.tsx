import { FiShoppingCart } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';

const EmptyCart: React.FC<{ onReturn: () => void }> = ({ onReturn }) => {
  const { t } = useTranslation('cart');
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-24 h-24 mb-8 text-gray-400">
        <FiShoppingCart className="w-full h-full" />
      </div>
      <div className="border border-gray-200 rounded-md px-12 py-5 mb-10">
        <p className="text-2xl font-semibold text-red-600">{t('emptyCart')}</p>
      </div>
      <Button
        variant="primary"
        className="px-8 py-3 text-lg"
        onClick={onReturn}
      >
        {t('returnToShop')}
      </Button>
    </div>
  );
};

export default EmptyCart;
