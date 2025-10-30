import { useTranslation } from 'react-i18next';
import Button from '../../common/Button';
import type { SortOption } from '../../../config/shop/shopConfig';
import { useNavigate } from 'react-router-dom';
interface ProductHeaderProps {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}
const ProductHeader: React.FC<ProductHeaderProps> = ({
  sortOption,
  setSortOption,
}) => {
  const { t } = useTranslation('adminProducts');
  const navigate = useNavigate();
  const onAddProduct = () => {
    navigate('/admin/products/add');
    return;
  };
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
        {t('allProducts')}
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <div className="flex gap-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
          >
            <option value="default">{t('defaultSorting')}</option>
            <option value="price-asc">{t('sortPriceAsc')}</option>
            <option value="price-desc">{t('sortPriceDesc')}</option>
            <option value="rating-desc">{t('sortRatingDesc')}</option>
          </select>
        </div>
        <Button
          variant="custom"
          onClick={onAddProduct}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold whitespace-nowrap hover:bg-indigo-700 transition-colors"
        >
          {t('addProduct')}
        </Button>
      </div>
    </div>
  );
};

export default ProductHeader;
