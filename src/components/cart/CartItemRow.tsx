import type { CartItem } from '../../models/CartModel';
import QuantitySelector from './QuantitySelectorProps';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const subtotal = (item.product.price * item.quantity).toFixed(2);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const { t } = useTranslation('cart');
  return (
    <tr className="border-b border-gray-200">
      {/* Product Cell */}
      <td className="py-6 pr-4 align-middle">
        <div className="flex items-center space-x-4">
          <img
            src={item.product.imageUrls[0]}
            alt={item.product.name}
            className="object-cover w-20 h-20 rounded-md shadow-sm"
          />
          <div>
            <span className="text-lg font-medium text-gray-900">
              {item.product.name}
            </span>
          </div>
        </div>
      </td>
      {/* Price Cell */}
      <td className="px-4 py-6 text-lg text-gray-700 align-middle whitespace-nowrap">
        ${item.product.price.toFixed(2)}
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
          aria-label={t('remove', `Remove ${item.product.name} from cart`)}
        >
          <MdClose className="h-5 w-5" />
        </Button>
      </td>
    </tr>
  );
};

export default CartItemRow;
