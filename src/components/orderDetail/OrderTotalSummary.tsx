import type { Order } from '../../models/checkoutModel';
import { currencyFormatterUSD } from '../../utils/currencyFormatter';

interface OrderDetailHeaderProps {
  order: Order;
}

export default function OrderDetailHeader({ order }: OrderDetailHeaderProps) {
  return (
    <div className="mt-6 border-t pt-6 space-y-3">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>{currencyFormatterUSD.format(order.subtotal)}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Shipping</span>
        <span>{currencyFormatterUSD.format(order.shippingCost)}</span>
      </div>
      <div className="flex justify-between text-xl font-bold text-gray-900">
        <span>Total</span>
        <span>{currencyFormatterUSD.format(order.total)}</span>
      </div>
    </div>
  );
}
