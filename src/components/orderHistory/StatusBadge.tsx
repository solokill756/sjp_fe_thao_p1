import type { OrderStatus } from '../../config/historyCheckout/historyCheckoutConfig';

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const statusStyles: Record<OrderStatus, string> = {
    Delivered: 'bg-green-100 text-green-800',
    Shipping: 'bg-blue-100 text-blue-800',
    Processing: 'bg-yellow-100 text-yellow-800',
    Cancelled: 'bg-red-100 text-red-800',
  };
  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
