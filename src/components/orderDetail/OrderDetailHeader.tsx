import type { OrderStatus } from '../../config/historyCheckout/historyCheckoutConfig';
import type { Order } from '../../models/checkoutModel';
import StatusBadge from '../orderHistory/StatusBadge';

interface OrderDetailHeaderProps {
  order: Order;
}

const OrderDetailHeader: React.FC<OrderDetailHeaderProps> = ({ order }) => {
  return (
    <div className="pb-6 border-b border-gray-300 mb-8">
      <h1 className="text-4xl font-bold text-gray-900">Order Details</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
        <p className="text-lg text-gray-600">
          Order ID:{' '}
          <span className="font-medium text-gray-900">{order.id}</span>
        </p>
        <p className="text-lg text-gray-600 mt-2 sm:mt-0">
          Date:{' '}
          <span className="font-medium text-gray-900">
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : ''}
          </span>
        </p>
        <div className="mt-2 sm:mt-0">
          <StatusBadge status={order.status as OrderStatus} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailHeader;
