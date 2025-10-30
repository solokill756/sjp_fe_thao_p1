import { useTranslation } from 'react-i18next';
import type { Product } from '../../../models/productModel';
import Input from '../../common/Input';
import { useGetCategoriesQuery } from '../../../features/api/apiSlice';

interface ProductInfoFormProps {
  formData: Product;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  mode: 'add' | 'detail';
  formattedDate: string;
}

const ProductInfoForm: React.FC<ProductInfoFormProps> = ({
  formData,
  onInputChange,
  mode,
  formattedDate,
}) => {
  const { t } = useTranslation('adminProductDetail');
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetCategoriesQuery();
  return (
    <div className="w-full lg:w-2/3">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {mode === 'add'
            ? t('new_product_information')
            : t('product_information')}
        </h3>
        <form className="space-y-6">
          <Input
            label={t('product_name')}
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={onInputChange}
            required
          />
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t('product_description')}
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description || ''}
              onChange={onInputChange}
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t('original_price')}
              type="number"
              name="originalPrice"
              value={formData.originalPrice || ''}
              onChange={onInputChange}
              required
            />
            <Input
              label={`${t('sale')} (%)`}
              type="number"
              name="salePercentage"
              value={formData.salePercentage || ''}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Input
                label={t('stock_current')}
                type="number"
                name="stockCurrent"
                value={formData.stockCurrent || ''}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('category')}
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId || ''}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {isLoadingCategories ? (
                  <option>{t('loading_categories')}</option>
                ) : isErrorCategories ? (
                  <option>{t('error_loading_categories')}</option>
                ) : (
                  categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          {mode === 'detail' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('created_at')}
              </label>
              <p className="text-sm text-gray-500 px-1">{formattedDate}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductInfoForm;
