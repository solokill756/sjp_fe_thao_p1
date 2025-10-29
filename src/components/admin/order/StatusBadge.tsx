import { useTranslation } from 'react-i18next';
import type { OrderStatus } from '../../../config/historyCheckout/historyCheckoutConfig';

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const { t } = useTranslation('adminOrders');
  const statusMap = {
    Processing: {
      text: t('processing'),
      color: 'text-orange-700 bg-orange-100',
    },
    Shipping: { text: t('shipping'), color: 'text-gray-700 bg-gray-200' },
    Delivered: { text: t('delivered'), color: 'text-green-700 bg-green-100' },
    Cancelled: { text: t('cancelled'), color: 'text-red-700 bg-red-100' },
  };
  const { text, color } = statusMap[status] || statusMap.Processing;
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${color}`}>
      {text}
    </span>
  );
};

export default StatusBadge;
