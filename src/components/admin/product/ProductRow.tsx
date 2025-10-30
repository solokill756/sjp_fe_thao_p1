import { PencilIcon, TrashIcon } from 'lucide-react';
import type { Product } from '../../../models/productModel';
import { useTranslation } from 'react-i18next';
import ProductRating from './ProductRating';
import Button from '../../common/Button';

interface ProductRowProps {
  product: Product;
  onEdit: (productId: number) => void;
  onDelete: (product: Product) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation('adminProducts');
  const statusColor = product.stockCurrent
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';
  const statusText = product.stockCurrent ? t('inStock') : t('outOfStock');

  return (
    <tr className="hover:bg-gray-50">
      {/* Checkbox */}
      <td className="p-4 w-4">
        <input
          type="checkbox"
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
      </td>

      {/* Product Info */}
      <td className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-md object-cover"
              src={product.imageUrls[0]}
              alt={product.name}
            />
          </div>
          <div className="ml-4">
            <div
              className="text-sm font-medium text-gray-900"
              title={product.name}
            >
              {product.name}
            </div>
            <div className="text-sm text-gray-500" title={product.description}>
              {product.description}
            </div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        ${product.price.toFixed(2)}
      </td>

      {/* Stock Status */}
      <td className="p-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}
        >
          {statusText}
        </span>
      </td>

      {/* Rating */}
      <td className="p-4 whitespace-nowrap text-sm text-gray-500">
        <ProductRating rating={product.rating} count={product.reviewCount} />
      </td>

      {/* Actions */}
      <td className="p-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-3">
          <Button
            variant="custom"
            onClick={() => onEdit(product.id)}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            title={t('editProduct')}
          >
            <PencilIcon />
          </Button>
          <Button
            variant="custom"
            onClick={() => onDelete(product)}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            title={t('deleteProduct')}
          >
            <TrashIcon />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
