import { ArrowLeftIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../../common/Button';

interface ProductDetailHeaderProps {
  mode: 'add' | 'detail';
  onBack: () => void;
  onSaveClick: () => void;
  onDeleteClick: () => void;
}
const ProductDetailHeader: React.FC<ProductDetailHeaderProps> = ({
  mode,
  onBack,
  onSaveClick,
  onDeleteClick,
}) => {
  const { t } = useTranslation('adminProductDetail');
  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 group"
      >
        <ArrowLeftIcon className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold">{t('back_to_product_list')}</span>
      </button>
      <div className="flex space-x-3">
        {mode === 'detail' && (
          <Button
            variant="custom"
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold whitespace-nowrap hover:bg-red-100 transition-colors"
            onClick={onDeleteClick}
          >
            {t('delete_product')}
          </Button>
        )}
        <Button
          variant="custom"
          onClick={onSaveClick}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold whitespace-nowrap hover:bg-indigo-700 transition-colors"
        >
          {mode === 'add' ? t('create_product') : t('save_changes')}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailHeader;
