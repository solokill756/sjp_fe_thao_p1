import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CheckoutHeader: React.FC = () => {
  const { t } = useTranslation('checkout');
  return (
    <>
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:underline">
          <span>{t('home', 'Home')}</span>
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{t('checkout', 'Checkout')}</span>
      </nav>
    </>
  );
};
export default CheckoutHeader;
