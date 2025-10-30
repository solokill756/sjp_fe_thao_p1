import { useTranslation } from 'react-i18next';
import CartItemRow from './CartItemRow';
import type { CartItem } from '../../models/CartModel';

interface CartItemsListProps {
  items: CartItem[];
  onQuantityChange: (
    id: number,
    newQuantity: number,
    productId: number
  ) => void;
  onRemove: (id: number) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  items,
  onQuantityChange,
  onRemove,
}) => {
  const { t } = useTranslation('cart');
  return (
    <div className="md:col-span-2">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full text-left">
          <thead className="border-b border-gray-300">
            <tr>
              <th
                scope="col"
                className="py-3 pr-4 text-sm font-semibold text-gray-600 uppercase"
              >
                {t('product', 'Product')}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-sm font-semibold text-gray-600 uppercase"
              >
                {t('price', 'Price')}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-sm font-semibold text-gray-600 uppercase"
              >
                {t('quantity', 'Quantity')}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-sm font-semibold text-gray-600 uppercase"
              >
                {t('subtotal', 'Subtotal')}
              </th>
              <th scope="col" className="pl-4 py-3">
                <span className="sr-only">{t('remove', 'Remove')}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items
              .filter(
                (item) => item.product && item.product.isDeleted === false
              )
              .map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onQuantityChange={onQuantityChange}
                  onRemove={onRemove}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartItemsList;
