import type { Product } from '../../models/productModel';

interface ProductCardProps {
  product: Omit<Product, 'description' | 'details'>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-200">
      <img
        src={product.imageUrls[0]}
        alt={product.name}
        className="w-full h-40 object-contain mb-4"
      />
      <h4 className="text-md font-medium text-gray-700 h-12 mb-2 overflow-hidden">
        {product.name}
      </h4>
      <div className="flex justify-center items-baseline gap-2">
        <span className="text-lg font-bold text-green-600">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <span className="text-sm text-gray-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
