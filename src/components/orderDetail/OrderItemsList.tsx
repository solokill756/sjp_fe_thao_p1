import type { OrderItem } from '../../models/checkoutModel';
import { currencyFormatterUSD } from '../../utils/currencyFormatter';

interface OrderItemsListProps {
  items: OrderItem[];
}

const OrderItemsList: React.FC<OrderItemsListProps> = ({ items }) => {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.productId} className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
          </div>
          <span className="text-gray-800 font-medium">
            {currencyFormatterUSD.format(item.price * item.quantity)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default OrderItemsList;
