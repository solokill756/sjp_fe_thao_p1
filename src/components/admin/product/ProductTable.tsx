import { useState } from 'react';
import type { Product } from '../../../models/productModel';
import Pagination from '../../shop/Pagination';
import ProductHeader from './ProductHeader';
import ProductRow from './ProductRow';
import { useTranslation } from 'react-i18next';
import type { SortOption } from '../../../config/shop/shopConfig';

interface ProductTableProps {
  products: Product[];
  itemsPerPage?: number;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  onEditProduct: (productId: number) => void;
  onDeleteProduct: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  itemsPerPage = 9,
  sortOption,
  setSortOption,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const { t } = useTranslation('adminProducts');
  return (
    <div className="w-full lg:flex-1 lg:min-w-0">
      {/* Header */}
      <ProductHeader sortOption={sortOption} setSortOption={setSortOption} />

      {/* Table Responsive */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full min-w-[600px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="p-4 w-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t('product')}
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                {t('price')}
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                {t('status')}
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                {t('rating')}
              </th>
              <th
                scope="col"
                className="p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onEdit={onEditProduct}
                onDelete={onDeleteProduct}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductTable;
