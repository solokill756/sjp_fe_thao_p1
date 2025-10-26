import { useNavigate } from 'react-router-dom';
import type { OrderStatus } from '../../config/historyCheckout/historyCheckoutConfig';
import type { Order } from '../../models/checkoutModel';
import { currencyFormatterUSD } from '../../utils/currencyFormatter';
import Button from '../common/Button';
import StatusBadge from './StatusBadge';

interface OrderHistoryRowProps {
  order: Order;
}

const OrderHistoryRow: React.FC<OrderHistoryRowProps> = ({ order }) => {
  const navigate = useNavigate();
  const onViewDetails = (orderId: string) => {
    navigate(`/order-history/${orderId}`);
  };
  return (
    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {order.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {new Date(order.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {currencyFormatterUSD.format(order.total)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <StatusBadge status={order.status as OrderStatus} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
        <Button onClick={() => onViewDetails(order.id ?? '')}>
          View Details
        </Button>
      </td>
    </tr>
  );
};

export default OrderHistoryRow;
