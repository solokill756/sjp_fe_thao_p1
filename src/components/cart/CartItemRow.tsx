import QuantitySelector from './QuantitySelectorProps';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import type { CartItem } from '../../models/CartModel';
import Button from '../common/Button';

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (
    id: number,
    newQuantity: number,
    productId: number
  ) => void;
  onRemove: (id: number) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const subtotal = ((item.product?.price ?? 0) * item.quantity).toFixed(2);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1, item.product?.id ?? 0);
    }
  };

  const handleIncrease = () => {
    if (
      item.product?.stockCurrent !== undefined &&
      item.quantity >= item.product.stockCurrent
    ) {
      return;
    }
    onQuantityChange(item.id, item.quantity + 1, item.product?.id ?? 0);
  };

  const { t } = useTranslation('cart');
  return (
    <tr className="border-b border-gray-200">
      {/* Product Cell */}
      <td className="py-6 pr-4 align-middle">
        <div className="flex items-center space-x-4">
          {item.product?.imageUrls?.[0] ? (
            <img
              src={item.product.imageUrls[0]}
              alt={item.product?.name ?? 'No name'}
              className="object-cover w-20 h-20 rounded-md shadow-sm"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
          <div>
            <span className="text-lg font-medium text-gray-900">
              {item.product?.name ?? 'No name'}
            </span>
          </div>
        </div>
      </td>
      {/* Price Cell */}
      <td className="px-4 py-6 text-lg text-gray-700 align-middle whitespace-nowrap">
        $
        {item.product?.price !== undefined
          ? item.product.price.toFixed(2)
          : '0.00'}
      </td>
      {/* Quantity Cell */}
      <td className="px-4 py-6 align-middle">
        <QuantitySelector
          quantity={item.quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
        />
      </td>
      {/* Subtotal Cell */}
      <td className="px-4 py-6 text-lg font-medium text-gray-900 align-middle whitespace-nowrap">
        ${subtotal}
      </td>
      {/* Remove Cell */}
      <td className="pl-4 py-6 align-middle">
        <Button
          variant="custom"
          className="text-red-500 transition-colors rounded-full hover:text-red-700 hover:bg-red-100 p-2"
          onClick={() => onRemove(item.id)}
          aria-label={t(
            'remove',
            `Remove ${item.product?.name ?? 'No name'} from cart`
          )}
        >
          <MdClose className="h-5 w-5" />
        </Button>
      </td>
    </tr>
  );
};

export default CartItemRow;
